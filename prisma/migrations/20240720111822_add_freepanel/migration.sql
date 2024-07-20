-- CreateEnum
CREATE TYPE "EmailType" AS ENUM ('WELCOME', 'EXPIRATION_WARNING', 'PROMOTION');

-- CreateEnum
CREATE TYPE "EmailStatus" AS ENUM ('PENDING', 'SENT', 'FAILED');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "freePanelEndDate" TIMESTAMP(3),
ADD COLUMN     "freePanelStartDate" TIMESTAMP(3),
ADD COLUMN     "isFreePanelActive" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "FreePanel" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FreePanel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScheduledEmail" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "emailType" "EmailType" NOT NULL,
    "sendAt" TIMESTAMP(3) NOT NULL,
    "status" "EmailStatus" NOT NULL DEFAULT 'PENDING',
    "subject" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ScheduledEmail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "FreePanel_userId_idx" ON "FreePanel"("userId");

-- CreateIndex
CREATE INDEX "ScheduledEmail_userId_idx" ON "ScheduledEmail"("userId");

-- AddForeignKey
ALTER TABLE "FreePanel" ADD CONSTRAINT "FreePanel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduledEmail" ADD CONSTRAINT "ScheduledEmail_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
