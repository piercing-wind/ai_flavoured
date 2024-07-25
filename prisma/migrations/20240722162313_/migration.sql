-- AlterTable
ALTER TABLE "subscriptionDetail" ADD COLUMN     "chargeAT" INTEGER,
ADD COLUMN     "currentEnd" INTEGER,
ADD COLUMN     "currentStart" INTEGER,
ADD COLUMN     "expiresBy" INTEGER,
ALTER COLUMN "startAt" DROP NOT NULL,
ALTER COLUMN "endAt" DROP NOT NULL,
ALTER COLUMN "createdAt" DROP NOT NULL;
