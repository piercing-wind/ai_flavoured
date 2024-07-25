/*
  Warnings:

  - Added the required column `createdAt` to the `transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "transaction" ADD COLUMN     "createdAt" TEXT NOT NULL;
