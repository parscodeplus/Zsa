/*
  Warnings:

  - You are about to drop the `customFeatures` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "customFeatures" DROP CONSTRAINT "customFeatures_userId_fkey";

-- DropTable
DROP TABLE "customFeatures";

-- CreateTable
CREATE TABLE "FeatureGroup" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "FeatureGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomFeature" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "shortDesc" TEXT,
    "longDesc" TEXT,
    "image" TEXT,
    "status" "FeatureStatus" NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "warningMessage" TEXT DEFAULT '??? ????? ?????? ??? ????',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,
    "groupId" TEXT NOT NULL,

    CONSTRAINT "CustomFeature_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "FeatureGroup_name_idx" ON "FeatureGroup"("name");

-- CreateIndex
CREATE INDEX "CustomFeature_userId_idx" ON "CustomFeature"("userId");

-- CreateIndex
CREATE INDEX "CustomFeature_groupId_idx" ON "CustomFeature"("groupId");

-- AddForeignKey
ALTER TABLE "CustomFeature" ADD CONSTRAINT "CustomFeature_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomFeature" ADD CONSTRAINT "CustomFeature_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "FeatureGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;
