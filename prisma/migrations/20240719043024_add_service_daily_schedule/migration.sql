-- CreateEnum
CREATE TYPE "FeatureStatus" AS ENUM ('FREE', 'POPULAR', 'MARKETING', 'NEW');

-- CreateTable
CREATE TABLE "customFeatures" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "shortDesc" TEXT,
    "longDesc" TEXT,
    "image" TEXT,
    "status" "FeatureStatus" NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "warningMessage" TEXT DEFAULT 'این ویژگی رایگان نمی باشد',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "customFeatures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceDailySchedule" (
    "id" TEXT NOT NULL,
    "dayOfWeek" "Dayofweek" NOT NULL,
    "serviceId" TEXT NOT NULL,

    CONSTRAINT "ServiceDailySchedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceWorkTime" (
    "id" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "serviceDailyScheduleId" TEXT NOT NULL,

    CONSTRAINT "ServiceWorkTime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceBreakTime" (
    "id" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "serviceDailyScheduleId" TEXT NOT NULL,

    CONSTRAINT "ServiceBreakTime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProviderDailySchedule" (
    "id" TEXT NOT NULL,
    "dayOfWeek" "Dayofweek" NOT NULL,
    "providerId" TEXT NOT NULL,

    CONSTRAINT "ProviderDailySchedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkTime" (
    "id" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "providerDailyScheduleId" TEXT NOT NULL,

    CONSTRAINT "WorkTime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BreakTime" (
    "id" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "providerDailyScheduleId" TEXT NOT NULL,

    CONSTRAINT "BreakTime_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "customFeatures_userId_idx" ON "customFeatures"("userId");

-- CreateIndex
CREATE INDEX "ServiceDailySchedule_serviceId_idx" ON "ServiceDailySchedule"("serviceId");

-- CreateIndex
CREATE INDEX "ServiceWorkTime_serviceDailyScheduleId_idx" ON "ServiceWorkTime"("serviceDailyScheduleId");

-- CreateIndex
CREATE INDEX "ServiceBreakTime_serviceDailyScheduleId_idx" ON "ServiceBreakTime"("serviceDailyScheduleId");

-- CreateIndex
CREATE INDEX "ProviderDailySchedule_providerId_idx" ON "ProviderDailySchedule"("providerId");

-- CreateIndex
CREATE INDEX "WorkTime_providerDailyScheduleId_idx" ON "WorkTime"("providerDailyScheduleId");

-- CreateIndex
CREATE INDEX "BreakTime_providerDailyScheduleId_idx" ON "BreakTime"("providerDailyScheduleId");

-- AddForeignKey
ALTER TABLE "customFeatures" ADD CONSTRAINT "customFeatures_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceDailySchedule" ADD CONSTRAINT "ServiceDailySchedule_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceWorkTime" ADD CONSTRAINT "ServiceWorkTime_serviceDailyScheduleId_fkey" FOREIGN KEY ("serviceDailyScheduleId") REFERENCES "ServiceDailySchedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceBreakTime" ADD CONSTRAINT "ServiceBreakTime_serviceDailyScheduleId_fkey" FOREIGN KEY ("serviceDailyScheduleId") REFERENCES "ServiceDailySchedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProviderDailySchedule" ADD CONSTRAINT "ProviderDailySchedule_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "provider"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkTime" ADD CONSTRAINT "WorkTime_providerDailyScheduleId_fkey" FOREIGN KEY ("providerDailyScheduleId") REFERENCES "ProviderDailySchedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BreakTime" ADD CONSTRAINT "BreakTime_providerDailyScheduleId_fkey" FOREIGN KEY ("providerDailyScheduleId") REFERENCES "ProviderDailySchedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;
