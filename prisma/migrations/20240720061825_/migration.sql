/*
  Warnings:

  - You are about to drop the column `subscriptionDetailId` on the `transaction` table. All the data in the column will be lost.
  - Added the required column `subscriptionId` to the `transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "transaction" DROP CONSTRAINT "transaction_subscriptionDetailId_fkey";

-- AlterTable
ALTER TABLE "transaction" DROP COLUMN "subscriptionDetailId",
ADD COLUMN     "subscriptionId" TEXT NOT NULL;
