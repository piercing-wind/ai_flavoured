/*
  Warnings:

  - The primary key for the `chatSessionId` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "chatSessionId" DROP CONSTRAINT "chatSessionId_pkey",
ALTER COLUMN "chatId" DROP DEFAULT,
ALTER COLUMN "chatId" SET DATA TYPE TEXT,
ADD CONSTRAINT "chatSessionId_pkey" PRIMARY KEY ("chatId");
DROP SEQUENCE "chatSessionId_chatId_seq";
