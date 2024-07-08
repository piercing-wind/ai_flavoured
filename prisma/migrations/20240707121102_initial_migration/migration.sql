-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "MessageRole" AS ENUM ('aiflavoured', 'human');

-- CreateEnum
CREATE TYPE "Generator" AS ENUM ('user', 'aiflavoured');

-- CreateEnum
CREATE TYPE "ImageGenerator" AS ENUM ('sdxl', 'dalle');

-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('free', 'premium', 'unlimited');

-- CreateEnum
CREATE TYPE "SubscriptionType" AS ENUM ('monthly', 'annually');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "password" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "subscription" "SubscriptionStatus" NOT NULL DEFAULT 'free',
    "accountCreationTimestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "timeZone" TEXT NOT NULL,
    "isTwoFAEnabled" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResetPasswordToken" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ResetPasswordToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TwoFAToken" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TwoFAToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TwoFAConfirmation" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "TwoFAConfirmation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "session" TEXT NOT NULL,
    "sessionType" TEXT NOT NULL,
    "chatName" TEXT,
    "userId" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "session_pkey" PRIMARY KEY ("session")
);

-- CreateTable
CREATE EXTENSION IF NOT EXISTS vector;
CREATE TABLE "AIMemory" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "metadata" JSONB NOT NULL,
    "vector" vector(3072),

    CONSTRAINT "AIMemory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserFile" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "fileKey" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "session" TEXT NOT NULL,
    "theme" TEXT,
    "generator" "Generator" NOT NULL DEFAULT 'user',
    "fileType" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserFile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messageHistory" (
    "id" SERIAL NOT NULL,
    "session" VARCHAR(255) NOT NULL,
    "title" TEXT,
    "message" TEXT NOT NULL,
    "role" "MessageRole" NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "messageHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "aipresentationData" (
    "id" TEXT NOT NULL,
    "presentationSession" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "pptxData" JSONB NOT NULL,
    "presentationImage" JSONB NOT NULL,
    "imageSearch" TEXT NOT NULL,
    "waterMark" BOOLEAN NOT NULL DEFAULT true,
    "variant" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "aipresentationData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userPromptImage" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "session" TEXT NOT NULL,
    "prompt" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "userPromptImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "aiImages" (
    "id" TEXT NOT NULL,
    "userPromptImageId" TEXT NOT NULL,
    "fileKey" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,
    "like" BOOLEAN,
    "upscaled" BOOLEAN,
    "generator" "Generator" NOT NULL DEFAULT 'user',
    "imageModel" "ImageGenerator" NOT NULL,

    CONSTRAINT "aiImages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userPromptAudio" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "session" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "audioUrl" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileKey" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "userPromptAudio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscriptionQuota" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "subscription" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "renewal" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "subscriptionStatus" "SubscriptionStatus" NOT NULL DEFAULT 'free',
    "aiChatWithDoc" INTEGER NOT NULL DEFAULT 2,
    "aipresentation" INTEGER NOT NULL DEFAULT 1,
    "gpt3_5Question" INTEGER NOT NULL DEFAULT 1000,
    "gpt4Question" INTEGER NOT NULL DEFAULT 0,
    "gpt4oQuestion" INTEGER NOT NULL DEFAULT 0,
    "aiImages" INTEGER NOT NULL DEFAULT 0,
    "aiVoices" INTEGER DEFAULT 0,
    "textToSpeech" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "subscriptionQuota_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "support" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "submittedBy" TEXT NOT NULL,
    "file" TEXT[],

    CONSTRAINT "support_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_email_token_key" ON "VerificationToken"("email", "token");

-- CreateIndex
CREATE UNIQUE INDEX "ResetPasswordToken_token_key" ON "ResetPasswordToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "ResetPasswordToken_email_token_key" ON "ResetPasswordToken"("email", "token");

-- CreateIndex
CREATE UNIQUE INDEX "TwoFAToken_token_key" ON "TwoFAToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "TwoFAToken_email_token_key" ON "TwoFAToken"("email", "token");

-- CreateIndex
CREATE UNIQUE INDEX "TwoFAConfirmation_userId_key" ON "TwoFAConfirmation"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "session_userId_session_key" ON "session"("userId", "session");

-- CreateIndex
CREATE UNIQUE INDEX "UserFile_userId_fileKey_key" ON "UserFile"("userId", "fileKey");

-- CreateIndex
CREATE INDEX "messageHistory_session_idx" ON "messageHistory"("session");

-- CreateIndex
CREATE UNIQUE INDEX "aipresentationData_presentationSession_key" ON "aipresentationData"("presentationSession");

-- CreateIndex
CREATE UNIQUE INDEX "subscriptionQuota_userId_key" ON "subscriptionQuota"("userId");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TwoFAConfirmation" ADD CONSTRAINT "TwoFAConfirmation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFile" ADD CONSTRAINT "UserFile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFile" ADD CONSTRAINT "UserFile_session_fkey" FOREIGN KEY ("session") REFERENCES "session"("session") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messageHistory" ADD CONSTRAINT "messageHistory_session_fkey" FOREIGN KEY ("session") REFERENCES "session"("session") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aipresentationData" ADD CONSTRAINT "aipresentationData_presentationSession_fkey" FOREIGN KEY ("presentationSession") REFERENCES "session"("session") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userPromptImage" ADD CONSTRAINT "userPromptImage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userPromptImage" ADD CONSTRAINT "userPromptImage_session_fkey" FOREIGN KEY ("session") REFERENCES "session"("session") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aiImages" ADD CONSTRAINT "aiImages_userPromptImageId_fkey" FOREIGN KEY ("userPromptImageId") REFERENCES "userPromptImage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userPromptAudio" ADD CONSTRAINT "userPromptAudio_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userPromptAudio" ADD CONSTRAINT "userPromptAudio_session_fkey" FOREIGN KEY ("session") REFERENCES "session"("session") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriptionQuota" ADD CONSTRAINT "subscriptionQuota_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
