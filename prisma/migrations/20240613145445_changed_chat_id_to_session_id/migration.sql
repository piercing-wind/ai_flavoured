/*
  Warnings:

  - You are about to drop the column `chatId` on the `UserFile` table. All the data in the column will be lost.
  - You are about to drop the column `chatId` on the `messageHistory` table. All the data in the column will be lost.
  - You are about to drop the `chatSessionId` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserFile" DROP CONSTRAINT "UserFile_chatId_fkey";

-- DropForeignKey
ALTER TABLE "aipresentationData" DROP CONSTRAINT "aipresentationData_presentationSession_fkey";

-- DropForeignKey
ALTER TABLE "chatSessionId" DROP CONSTRAINT "chatSessionId_userId_fkey";

-- DropForeignKey
ALTER TABLE "messageHistory" DROP CONSTRAINT "messageHistory_chatId_fkey";

-- DropIndex
DROP INDEX "messageHistory_chatId_idx";

-- AlterTable
ALTER TABLE "UserFile" DROP COLUMN "chatId",
ADD COLUMN     "sessionId" TEXT NOT NULL DEFAULT 'presentation';

-- AlterTable
ALTER TABLE "messageHistory" DROP COLUMN "chatId",
ADD COLUMN     "sessionId" VARCHAR(255) NOT NULL DEFAULT 'presentation';

-- DropTable
DROP TABLE "chatSessionId";

-- CreateTable
CREATE TABLE "sessionId" (
    "sessionId" TEXT NOT NULL,
    "sessionType" TEXT NOT NULL DEFAULT 'presentation',
    "chatName" TEXT,
    "userId" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sessionId_pkey" PRIMARY KEY ("sessionId")
);

-- CreateIndex
CREATE UNIQUE INDEX "sessionId_userId_sessionId_key" ON "sessionId"("userId", "sessionId");

-- CreateIndex
CREATE INDEX "messageHistory_sessionId_idx" ON "messageHistory"("sessionId");

-- AddForeignKey
ALTER TABLE "UserFile" ADD CONSTRAINT "UserFile_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "sessionId"("sessionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessionId" ADD CONSTRAINT "sessionId_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messageHistory" ADD CONSTRAINT "messageHistory_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "sessionId"("sessionId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aipresentationData" ADD CONSTRAINT "aipresentationData_presentationSession_fkey" FOREIGN KEY ("presentationSession") REFERENCES "sessionId"("sessionId") ON DELETE CASCADE ON UPDATE CASCADE;
