-- CreateTable
CREATE TABLE "chatSessionId" (
    "chatId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "chatSessionId_pkey" PRIMARY KEY ("chatId")
);

-- CreateIndex
CREATE UNIQUE INDEX "chatSessionId_userId_chatId_key" ON "chatSessionId"("userId", "chatId");

-- AddForeignKey
ALTER TABLE "chatSessionId" ADD CONSTRAINT "chatSessionId_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
