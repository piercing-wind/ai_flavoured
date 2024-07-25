/*
  Warnings:

  - A unique constraint covering the columns `[subscriptionId]` on the table `subscriptionDetail` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "subscriptionDetail_subscriptionId_key" ON "subscriptionDetail"("subscriptionId");
