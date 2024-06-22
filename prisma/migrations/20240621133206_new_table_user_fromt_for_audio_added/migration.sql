-- CreateTable
CREATE TABLE "userPromptAudio" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "session" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "audio" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileKey" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,

    CONSTRAINT "userPromptAudio_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "userPromptAudio" ADD CONSTRAINT "userPromptAudio_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userPromptAudio" ADD CONSTRAINT "userPromptAudio_session_fkey" FOREIGN KEY ("session") REFERENCES "session"("session") ON DELETE CASCADE ON UPDATE CASCADE;
