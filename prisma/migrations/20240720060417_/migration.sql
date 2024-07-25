/*
  Warnings:

  - You are about to drop the column `subscriptionCreatedBy` on the `subscriptionDetail` table. All the data in the column will be lost.
  - You are about to drop the column `transactionId` on the `subscriptionDetail` table. All the data in the column will be lost.
  - Added the required column `userEmail` to the `subscriptionDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `subscriptionDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subscriptionDetailId` to the `transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "subscriptionDetail" DROP CONSTRAINT "subscriptionDetail_transactionId_fkey";

-- DropIndex
DROP INDEX "subscriptionDetail_transactionId_key";

-- AlterTable
ALTER TABLE "subscriptionDetail" DROP COLUMN "subscriptionCreatedBy",
DROP COLUMN "transactionId",
ADD COLUMN     "userEmail" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "transaction" ADD COLUMN     "subscriptionDetailId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_subscriptionDetailId_fkey" FOREIGN KEY ("subscriptionDetailId") REFERENCES "subscriptionDetail"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
