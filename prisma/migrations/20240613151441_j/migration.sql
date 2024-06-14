/*
  Warnings:

  - You are about to drop the column `sessionId` on the `UserFile` table. All the data in the column will be lost.
  - You are about to drop the column `sessionId` on the `messageHistory` table. All the data in the column will be lost.
  - You are about to drop the `sessionId` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `session` to the `UserFile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `session` to the `messageHistory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserFile" DROP CONSTRAINT "UserFile_sessionId_fkey";

-- DropForeignKey
ALTER TABLE "aipresentationData" DROP CONSTRAINT "aipresentationData_presentationSession_fkey";

-- DropForeignKey
ALTER TABLE "messageHistory" DROP CONSTRAINT "messageHistory_sessionId_fkey";

-- DropForeignKey
ALTER TABLE "sessionId" DROP CONSTRAINT "sessionId_userId_fkey";

-- DropIndex
DROP INDEX "messageHistory_sessionId_idx";

-- AlterTable
ALTER TABLE "UserFile" DROP COLUMN "sessionId",
ADD COLUMN     "session" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "messageHistory" DROP COLUMN "sessionId",
ADD COLUMN     "session" VARCHAR(255) NOT NULL;

-- DropTable
DROP TABLE "sessionId";

-- CreateTable
CREATE TABLE "session" (
    "session" TEXT NOT NULL,
    "sessionType" TEXT NOT NULL,
    "chatName" TEXT,
    "userId" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "session_pkey" PRIMARY KEY ("session")
);

-- CreateIndex
CREATE UNIQUE INDEX "session_userId_session_key" ON "session"("userId", "session");

-- CreateIndex
CREATE INDEX "messageHistory_session_idx" ON "messageHistory"("session");

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFile" ADD CONSTRAINT "UserFile_session_fkey" FOREIGN KEY ("session") REFERENCES "session"("session") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messageHistory" ADD CONSTRAINT "messageHistory_session_fkey" FOREIGN KEY ("session") REFERENCES "session"("session") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aipresentationData" ADD CONSTRAINT "aipresentationData_presentationSession_fkey" FOREIGN KEY ("presentationSession") REFERENCES "session"("session") ON DELETE CASCADE ON UPDATE CASCADE;
