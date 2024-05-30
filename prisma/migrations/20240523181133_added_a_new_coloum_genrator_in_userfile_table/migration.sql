-- CreateEnum
CREATE TYPE "Generator" AS ENUM ('user', 'aiflavoured');

-- AlterTable
ALTER TABLE "UserFile" ADD COLUMN     "generator" "Generator" NOT NULL DEFAULT 'user';

