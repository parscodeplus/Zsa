-- CreateTable
CREATE TABLE "SuggestedService" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "SuggestedService_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SuggestedService_name_key" ON "SuggestedService"("name");

-- AddForeignKey
ALTER TABLE "SuggestedService" ADD CONSTRAINT "SuggestedService_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
