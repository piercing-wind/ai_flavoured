-- CreateEnum
CREATE TYPE "aiModel" AS ENUM ('gpt_3_5_turbo_0125', 'gpt_4_turbo');

-- CreateTable
CREATE TABLE "aiModelType" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "aiModel" "aiModel" NOT NULL DEFAULT 'gpt_3_5_turbo_0125',

    CONSTRAINT "aiModelType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "aiModelType_userId_key" ON "aiModelType"("userId");

-- AddForeignKey
ALTER TABLE "aiModelType" ADD CONSTRAINT "aiModelType_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
