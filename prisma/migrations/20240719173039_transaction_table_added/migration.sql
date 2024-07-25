-- CreateTable
CREATE TABLE "subscriptionDetail" (
    "id" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "startAt" INTEGER NOT NULL,
    "endAt" INTEGER NOT NULL,
    "createdAt" INTEGER NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "subscriptionCreatedBy" JSONB NOT NULL,
    "transactionId" TEXT NOT NULL,

    CONSTRAINT "subscriptionDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transaction" (
    "id" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "international" BOOLEAN NOT NULL DEFAULT false,
    "paymentMethod" TEXT NOT NULL,
    "vpa" TEXT,
    "email" TEXT,
    "contact" TEXT,
    "cardId" TEXT,
    "bank" TEXT,
    "wallet" TEXT,
    "tokenId" TEXT,
    "fee" INTEGER,
    "tax" INTEGER,
    "errorCode" TEXT,
    "errorDes" TEXT,
    "upiTnxID" TEXT,
    "rrn" TEXT,

    CONSTRAINT "transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "subscriptionDetail_transactionId_key" ON "subscriptionDetail"("transactionId");

-- AddForeignKey
ALTER TABLE "subscriptionDetail" ADD CONSTRAINT "subscriptionDetail_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
