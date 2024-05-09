/*
  Warnings:

  - The values [gpt_3_5_turbo_0125,gpt_4_turbo] on the enum `aiModel` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "aiModel_new" AS ENUM ('gpt-3.5-turbo-0125', 'gpt-4-turbo');
ALTER TABLE "aiModelType" ALTER COLUMN "aiModel" DROP DEFAULT;
ALTER TABLE "aiModelType" ALTER COLUMN "aiModel" TYPE "aiModel_new" USING ("aiModel"::text::"aiModel_new");
ALTER TYPE "aiModel" RENAME TO "aiModel_old";
ALTER TYPE "aiModel_new" RENAME TO "aiModel";
DROP TYPE "aiModel_old";
ALTER TABLE "aiModelType" ALTER COLUMN "aiModel" SET DEFAULT 'gpt-3.5-turbo-0125';
COMMIT;

-- AlterTable
ALTER TABLE "aiModelType" ALTER COLUMN "aiModel" SET DEFAULT 'gpt-3.5-turbo-0125';
