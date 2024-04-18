/*
  Warnings:

  - The primary key for the `chatSessionId` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `chatId` column on the `chatSessionId` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "chatSessionId" DROP CONSTRAINT "chatSessionId_pkey",
DROP COLUMN "chatId",
ADD COLUMN     "chatId" SERIAL NOT NULL,
ADD CONSTRAINT "chatSessionId_pkey" PRIMARY KEY ("chatId");

-- CreateIndex
CREATE UNIQUE INDEX "chatSessionId_userId_chatId_key" ON "chatSessionId"("userId", "chatId");
