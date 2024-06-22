/*
  Warnings:

  - You are about to drop the column `fileKey` on the `userPromptImage` table. All the data in the column will be lost.
  - You are about to drop the column `fileName` on the `userPromptImage` table. All the data in the column will be lost.
  - You are about to drop the column `fileType` on the `userPromptImage` table. All the data in the column will be lost.
  - You are about to drop the column `generator` on the `userPromptImage` table. All the data in the column will be lost.
  - You are about to drop the column `like` on the `userPromptImage` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `userPromptImage` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "userPromptImage_userId_fileKey_key";

-- AlterTable
ALTER TABLE "userPromptImage" DROP COLUMN "fileKey",
DROP COLUMN "fileName",
DROP COLUMN "fileType",
DROP COLUMN "generator",
DROP COLUMN "like",
DROP COLUMN "url",
ADD COLUMN     "images" JSONB NOT NULL DEFAULT '{}';
