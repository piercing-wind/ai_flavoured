/*
  Warnings:

  - A unique constraint covering the columns `[presentationSession]` on the table `aipresentationData` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "aipresentationData_presentationSession_key" ON "aipresentationData"("presentationSession");

-- AddForeignKey
ALTER TABLE "aipresentationData" ADD CONSTRAINT "aipresentationData_presentationSession_fkey" FOREIGN KEY ("presentationSession") REFERENCES "chatSessionId"("chatId") ON DELETE CASCADE ON UPDATE CASCADE;
