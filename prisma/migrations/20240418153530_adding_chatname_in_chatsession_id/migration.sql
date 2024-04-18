/*
  Warnings:

  - Added the required column `chatName` to the `chatSessionId` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "chatSessionId" ADD COLUMN     "chatName" TEXT NOT NULL;
