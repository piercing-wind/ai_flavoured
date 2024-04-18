-- AlterTable
ALTER TABLE "chatSessionId" ADD COLUMN     "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "messageHistory" (
    "id" SERIAL NOT NULL,
    "chatId" VARCHAR(255) NOT NULL,
    "message" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "messageHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "messageHistory_chatId_idx" ON "messageHistory"("chatId");

-- AddForeignKey
ALTER TABLE "messageHistory" ADD CONSTRAINT "messageHistory_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "chatSessionId"("chatId") ON DELETE RESTRICT ON UPDATE CASCADE;
