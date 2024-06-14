-- DropForeignKey
ALTER TABLE "UserFile" DROP CONSTRAINT "UserFile_session_fkey";

-- CreateTable
CREATE TABLE "userPromptImage" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "session" TEXT NOT NULL,
    "fileKey" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "generator" "Generator" NOT NULL DEFAULT 'user',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "userPromptImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "userPromptImage_userId_fileKey_key" ON "userPromptImage"("userId", "fileKey");

-- AddForeignKey
ALTER TABLE "UserFile" ADD CONSTRAINT "UserFile_session_fkey" FOREIGN KEY ("session") REFERENCES "session"("session") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userPromptImage" ADD CONSTRAINT "userPromptImage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userPromptImage" ADD CONSTRAINT "userPromptImage_session_fkey" FOREIGN KEY ("session") REFERENCES "session"("session") ON DELETE CASCADE ON UPDATE CASCADE;
