/*
  Warnings:

  - Added the required column `role` to the `messageHistory` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MessageRole" AS ENUM ('system', 'human');

-- AlterTable
ALTER TABLE "messageHistory" ADD COLUMN     "role" "MessageRole" NOT NULL;
