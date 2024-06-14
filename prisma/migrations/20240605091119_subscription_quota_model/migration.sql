-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('free', 'premium', 'unlimited');

-- DropEnum
DROP TYPE "SubscriptionName";

-- CreateTable
CREATE TABLE "subscriptionQuota" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "subscription" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "renewal" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "subscriptionStatus" "SubscriptionStatus" NOT NULL DEFAULT 'free',
    "aiChatWithDoc" INTEGER NOT NULL DEFAULT 2,
    "aipresentation" INTEGER NOT NULL DEFAULT 1,
    "gpt3_5Questions" INTEGER NOT NULL DEFAULT 1000,
    "gpt4Question" INTEGER NOT NULL DEFAULT 0,
    "gpt4oQuestion" INTEGER NOT NULL DEFAULT 0,
    "aiImages" INTEGER NOT NULL DEFAULT 0,
    "aiVoices" INTEGER DEFAULT 0,

    CONSTRAINT "subscriptionQuota_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "subscriptionQuota" ADD CONSTRAINT "subscriptionQuota_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
