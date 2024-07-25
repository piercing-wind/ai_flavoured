-- AlterTable
ALTER TABLE "subscriptionDetail" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "subscriptionQuota" ALTER COLUMN "textToSpeech" SET DEFAULT 200;
