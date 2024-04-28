/*
  Warnings:

  - Added the required column `chatId` to the `UserFile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserFile" ADD COLUMN     "chatId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "UserFile" ADD CONSTRAINT "UserFile_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "chatSessionId"("chatId") ON DELETE RESTRICT ON UPDATE CASCADE;
