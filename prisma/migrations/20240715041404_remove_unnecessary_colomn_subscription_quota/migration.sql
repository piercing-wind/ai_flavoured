/*
  Warnings:

  - You are about to drop the column `aiVoices` on the `subscriptionQuota` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "subscriptionQuota" DROP COLUMN "aiVoices",
ALTER COLUMN "aipresentation" SET DEFAULT 0,
ALTER COLUMN "gpt3_5Question" SET DEFAULT 10,
ALTER COLUMN "gpt4oQuestion" SET DEFAULT 2,
ALTER COLUMN "aiImages" SET DEFAULT 2,
ALTER COLUMN "textToSpeech" SET DEFAULT 1;
