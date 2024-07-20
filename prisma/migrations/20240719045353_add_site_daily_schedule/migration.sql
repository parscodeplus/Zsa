-- AlterTable
ALTER TABLE "ProviderDailySchedule" ADD COLUMN     "isWorkingDay" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "ServiceDailySchedule" ADD COLUMN     "isWorkingDay" BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE "SiteDailySchedule" (
    "id" TEXT NOT NULL,
    "dayOfWeek" "Dayofweek" NOT NULL,
    "siteId" TEXT NOT NULL,
    "isWorkingDay" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "SiteDailySchedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteWorkTime" (
    "id" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "siteDailyScheduleId" TEXT NOT NULL,

    CONSTRAINT "SiteWorkTime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteBreakTime" (
    "id" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "siteDailyScheduleId" TEXT NOT NULL,

    CONSTRAINT "SiteBreakTime_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SiteDailySchedule_siteId_idx" ON "SiteDailySchedule"("siteId");

-- CreateIndex
CREATE INDEX "SiteWorkTime_siteDailyScheduleId_idx" ON "SiteWorkTime"("siteDailyScheduleId");

-- CreateIndex
CREATE INDEX "SiteBreakTime_siteDailyScheduleId_idx" ON "SiteBreakTime"("siteDailyScheduleId");

-- AddForeignKey
ALTER TABLE "SiteDailySchedule" ADD CONSTRAINT "SiteDailySchedule_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SiteWorkTime" ADD CONSTRAINT "SiteWorkTime_siteDailyScheduleId_fkey" FOREIGN KEY ("siteDailyScheduleId") REFERENCES "SiteDailySchedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SiteBreakTime" ADD CONSTRAINT "SiteBreakTime_siteDailyScheduleId_fkey" FOREIGN KEY ("siteDailyScheduleId") REFERENCES "SiteDailySchedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;
