/*
  Warnings:

  - You are about to drop the `aiModelType` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "aiModelType" DROP CONSTRAINT "aiModelType_userId_fkey";

-- DropTable
DROP TABLE "aiModelType";

-- DropEnum
DROP TYPE "aiModel";
