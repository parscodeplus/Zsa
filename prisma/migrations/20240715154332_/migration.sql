/*
  Warnings:

  - You are about to drop the column `duration` on the `service` table. All the data in the column will be lost.
  - Added the required column `durationId` to the `service` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "service" DROP COLUMN "duration",
ADD COLUMN     "durationId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "duration" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "duration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "duration_title_key" ON "duration"("title");

-- AddForeignKey
ALTER TABLE "service" ADD CONSTRAINT "service_durationId_fkey" FOREIGN KEY ("durationId") REFERENCES "duration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
