-- CreateTable
CREATE TABLE "aipresentationData" (
    "id" TEXT NOT NULL,
    "presentationSession" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "pptxData" JSONB NOT NULL,
    "imageSearch" TEXT NOT NULL,
    "waterMark" BOOLEAN NOT NULL DEFAULT true,
    "variant" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "aipresentationData_pkey" PRIMARY KEY ("id")
);
