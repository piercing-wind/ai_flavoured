/*
  Warnings:

  - The `subscription` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "timeZone" TEXT NOT NULL DEFAULT 'str',
DROP COLUMN "subscription",
ADD COLUMN     "subscription" "SubscriptionStatus" NOT NULL DEFAULT 'free';
