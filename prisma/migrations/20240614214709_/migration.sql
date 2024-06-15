-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "FildType" AS ENUM ('CHECKBOX', 'TEXTBox_SingleLine', 'TEXTBox_MultipleLines', 'TEXTBox_DigitsOnly', 'DROPDOWN_Selection', 'DATE', 'BARCODE', 'HTML_Custom');

-- CreateEnum
CREATE TYPE "Dayofweek" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "password" TEXT,
    "sendLoginInfo" BOOLEAN NOT NULL DEFAULT false,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "isTwoFactorEnabled" BOOLEAN NOT NULL DEFAULT false,
    "categoryId" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Site" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "logo" TEXT DEFAULT 'https://public.blob.vercel-storage.com/eEZHAoPTOBSYGBE3/JRajRyC-PhBHEinQkupt02jqfKacBVHLWJq7Iy.png',
    "font" TEXT NOT NULL DEFAULT 'font-cal',
    "image" TEXT DEFAULT 'https://public.blob.vercel-storage.com/eEZHAoPTOBSYGBE3/hxfcV5V-eInX3jbVUhjAt1suB7zB88uGd1j20b.png',
    "imageBlurhash" TEXT DEFAULT 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAhCAYAAACbffiEAAAACXBIWXMAABYlAAAWJQFJUiTwAAABfUlEQVR4nN3XyZLDIAwE0Pz/v3q3r55JDlSBplsIEI49h76k4opexCK/juP4eXjOT149f2Tf9ySPgcjCc7kdpBTgDPKByKK2bTPFEdMO0RDrusJ0wLRBGCIuelmWJAjkgPGDSIQEMBDCfA2CEPM80+Qwl0JkNxBimiaYGOTUlXYI60YoehzHJDEm7kxjV3whOQTD3AaCuhGKHoYhyb+CBMwjIAFz647kTqyapdV4enGINuDJMSScPmijSwjCaHeLcT77C7EC0C1ugaCTi2HYfAZANgj6Z9A8xY5eiYghDMNQBJNCWhASot0jGsSCUiHWZcSGQjaWWCDaGMOWnsCcn2QhVkRuxqqNxMSdUSElCDbp1hbNOsa6Ugxh7xXauF4DyM1m5BLtCylBXgaxvPXVwEoOBjeIFVODtW74oj1yBQah3E8tyz3SkpolKS9Geo9YMD1QJR1Go4oJkgO1pgbNZq0AOUPChyjvh7vlXaQa+X1UXwKxgHokB2XPxbX+AnijwIU4ahazAAAAAElFTkSuQmCC',
    "subdomain" TEXT,
    "customDomain" TEXT,
    "message404" TEXT DEFAULT 'Blimey! You''ve found a page that doesn''t exist.',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Site_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "oauth_token_secret" TEXT,
    "oauth_token" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expire" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("identifier")
);

-- CreateTable
CREATE TABLE "PasswordResetToken" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PasswordResetToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TwoFactorToken" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TwoFactorToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TwoFactorConfirmation" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "TwoFactorConfirmation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT DEFAULT '',
    "isVisibleOnMainPage" BOOLEAN NOT NULL DEFAULT true,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "position" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "isOnMainPage" BOOLEAN NOT NULL DEFAULT false,
    "price" DECIMAL(65,30) NOT NULL,
    "salesTax" DECIMAL(65,30) NOT NULL,
    "directLink" TEXT NOT NULL,
    "maxBookingPerSlot" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "providerId" TEXT NOT NULL,

    CONSTRAINT "service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "barcode" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "vat" DECIMAL(65,30) NOT NULL,
    "productLocation" TEXT NOT NULL,
    "isOnBookingPage" BOOLEAN NOT NULL DEFAULT false,
    "addToBookingPrice" BOOLEAN NOT NULL DEFAULT false,
    "serviceId" TEXT NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "membership" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "durationDays" INTEGER NOT NULL DEFAULT 0,
    "durationMonths" INTEGER NOT NULL DEFAULT 0,
    "durationYears" INTEGER NOT NULL DEFAULT 0,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "price" DECIMAL(65,30) NOT NULL,
    "salesTax" DECIMAL(65,30) NOT NULL,
    "totalSessions" INTEGER NOT NULL DEFAULT 0,
    "maxActiveBookings" INTEGER NOT NULL DEFAULT 1,
    "isVisibleOnBooking" BOOLEAN NOT NULL DEFAULT true,
    "showAfterMembership" TEXT NOT NULL DEFAULT '',
    "bookingLink" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,

    CONSTRAINT "membership_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "serviceQuestion" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "fieldType" "FildType" NOT NULL DEFAULT 'CHECKBOX',
    "defaultValue" TEXT NOT NULL DEFAULT '',
    "isOptional" BOOLEAN NOT NULL DEFAULT false,
    "isVisibleForAll" BOOLEAN NOT NULL DEFAULT true,
    "isVisibleOnBooking" BOOLEAN NOT NULL DEFAULT true,
    "addToInvoice" BOOLEAN NOT NULL DEFAULT false,
    "position" INTEGER NOT NULL DEFAULT 0,
    "serviceId" TEXT NOT NULL,

    CONSTRAINT "serviceQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "provider" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "maxCapacity" INTEGER NOT NULL,
    "bookingLink" TEXT NOT NULL,
    "isOnBookingPage" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "provider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "description" TEXT,
    "slug" TEXT NOT NULL,
    "userId" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "siteId" TEXT,
    "companyWorkingHoursId" TEXT NOT NULL,
    "visibility" TEXT NOT NULL DEFAULT 'PUBLIC',
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "publishDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "category" TEXT NOT NULL DEFAULT '',
    "keywords" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "image" TEXT DEFAULT 'https://public.blob.vercel-storage.com/eEZHAoPTOBSYGBE3/hxfcV5V-eInX3jbVUhjAt1suB7zB88uGd1j20b.png',
    "imageBlurhash" TEXT DEFAULT 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAhCAYAAACbffiEAAAACXBIWXMAABYlAAAWJQFJUiTwAAABfUlEQVR4nN3XyZLDIAwE0Pz/v3q3r55JDlSBplsIEI49h76k4opexCK/juP4eXjOT149f2Tf9ySPgcjCc7kdpBTgDPKByKK2bTPFEdMO0RDrusJ0wLRBGCIuelmWJAjkgPGDSIQEMBDCfA2CEPM80+Qwl0JkNxBimiaYGOTUlXYI60YoehzHJDEm7kxjV3whOQTD3AaCuhGKHoYhyb+CBMwjIAFz647kTqyapdV4enGINuDJMSScPmijSwjCaHeLcT77C7EC0C1ugaCTi2HYfAZANgj6Z9A8xY5eiYghDMNQBJNCWhASot0jGsSCUiHWZcSGQjaWWCDaGMOWnsCcn2QhVkRuxqqNxMSdUSElCDbp1hbNOsa6Ugxh7xXauF4DyM1m5BLtCylBXgaxvPXVwEoOBjeIFVODtW74oj1yBQah3E8tyz3SkpolKS9Geo9YMD1QJR1Go4oJkgO1pgbNZq0AOUPChyjvh7vlXaQa+X1UXwKxgHokB2XPxbX+AnijwIU4ahazAAAAAElFTkSuQmCC',
    "thumbnail" TEXT NOT NULL DEFAULT '',
    "links" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "companyImage" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "socialMediaLinks" JSONB NOT NULL DEFAULT '{}',
    "policies" TEXT NOT NULL,
    "aboutUs" TEXT NOT NULL,
    "contactUs" TEXT NOT NULL,
    "faq" JSONB NOT NULL DEFAULT '{}',

    CONSTRAINT "company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "companyWorkingHours" (
    "id" TEXT NOT NULL,
    "companyId" INTEGER NOT NULL,
    "dayOfWeek" "Dayofweek" NOT NULL DEFAULT 'MONDAY',
    "isOpen" BOOLEAN NOT NULL,
    "openTime" TIME NOT NULL,
    "closeTime" TIME NOT NULL,
    "breakStart" TIME NOT NULL,
    "breakEnd" TIME NOT NULL,

    CONSTRAINT "companyWorkingHours_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userGroup" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "permissions" JSONB NOT NULL DEFAULT '{}',
    "userId" TEXT,

    CONSTRAINT "userGroup_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Site_subdomain_key" ON "Site"("subdomain");

-- CreateIndex
CREATE UNIQUE INDEX "Site_customDomain_key" ON "Site"("customDomain");

-- CreateIndex
CREATE INDEX "Site_userId_idx" ON "Site"("userId");

-- CreateIndex
CREATE INDEX "Account_userId_idx" ON "Account"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE INDEX "Session_userId_idx" ON "Session"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_email_token_key" ON "VerificationToken"("identifier", "email", "token");

-- CreateIndex
CREATE UNIQUE INDEX "PasswordResetToken_token_key" ON "PasswordResetToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "PasswordResetToken_email_token_key" ON "PasswordResetToken"("email", "token");

-- CreateIndex
CREATE UNIQUE INDEX "TwoFactorToken_token_key" ON "TwoFactorToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "TwoFactorToken_email_token_key" ON "TwoFactorToken"("email", "token");

-- CreateIndex
CREATE UNIQUE INDEX "TwoFactorConfirmation_userId_key" ON "TwoFactorConfirmation"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "category_name_key" ON "category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "service_name_key" ON "service"("name");

-- CreateIndex
CREATE UNIQUE INDEX "product_name_key" ON "product"("name");

-- CreateIndex
CREATE UNIQUE INDEX "product_barcode_key" ON "product"("barcode");

-- CreateIndex
CREATE UNIQUE INDEX "membership_name_key" ON "membership"("name");

-- CreateIndex
CREATE UNIQUE INDEX "provider_name_key" ON "provider"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Post_title_key" ON "Post"("title");

-- CreateIndex
CREATE INDEX "Post_siteId_idx" ON "Post"("siteId");

-- CreateIndex
CREATE INDEX "Post_userId_idx" ON "Post"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Post_slug_siteId_key" ON "Post"("slug", "siteId");

-- CreateIndex
CREATE UNIQUE INDEX "company_name_key" ON "company"("name");

-- CreateIndex
CREATE UNIQUE INDEX "companyWorkingHours_companyId_key" ON "companyWorkingHours"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "userGroup_name_key" ON "userGroup"("name");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Site" ADD CONSTRAINT "Site_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TwoFactorConfirmation" ADD CONSTRAINT "TwoFactorConfirmation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service" ADD CONSTRAINT "service_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service" ADD CONSTRAINT "service_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "provider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "membership" ADD CONSTRAINT "membership_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "serviceQuestion" ADD CONSTRAINT "serviceQuestion_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_companyWorkingHoursId_fkey" FOREIGN KEY ("companyWorkingHoursId") REFERENCES "companyWorkingHours"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "companyWorkingHours" ADD CONSTRAINT "companyWorkingHours_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userGroup" ADD CONSTRAINT "userGroup_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
