/*
  Warnings:

  - You are about to drop the column `images` on the `userPromptImage` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "userPromptImage" DROP COLUMN "images";

-- CreateTable
CREATE TABLE "aiImages" (
    "id" TEXT NOT NULL,
    "userPromptImageId" TEXT NOT NULL,
    "fileKey" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,
    "like" BOOLEAN,
    "generator" "Generator" NOT NULL DEFAULT 'user',

    CONSTRAINT "aiImages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "aiImages" ADD CONSTRAINT "aiImages_userPromptImageId_fkey" FOREIGN KEY ("userPromptImageId") REFERENCES "userPromptImage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
