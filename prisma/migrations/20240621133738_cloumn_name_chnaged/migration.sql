/*
  Warnings:

  - You are about to drop the column `audio` on the `userPromptAudio` table. All the data in the column will be lost.
  - Added the required column `audioUrl` to the `userPromptAudio` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "userPromptAudio" DROP COLUMN "audio",
ADD COLUMN     "audioUrl" TEXT NOT NULL;
