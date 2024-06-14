-- DropForeignKey
ALTER TABLE "messageHistory" DROP CONSTRAINT "messageHistory_chatId_fkey";

-- AddForeignKey
ALTER TABLE "messageHistory" ADD CONSTRAINT "messageHistory_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "chatSessionId"("chatId") ON DELETE CASCADE ON UPDATE CASCADE;
