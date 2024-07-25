/*
  Warnings:

  - Added the required column `subscriptionId` to the `subscriptionDetail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "subscriptionDetail" ADD COLUMN     "subscriptionId" TEXT NOT NULL;
