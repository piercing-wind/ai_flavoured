/*
  Warnings:

  - Added the required column `presentationImage` to the `aipresentationData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "aipresentationData" ADD COLUMN     "presentationImage" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "subscriptionQuota" ADD COLUMN     "textToSpeech" INTEGER NOT NULL DEFAULT 0;
