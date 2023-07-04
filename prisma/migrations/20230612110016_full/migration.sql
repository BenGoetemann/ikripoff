/*
  Warnings:

  - You are about to alter the column `type` on the `CommercialEnergyCertificate` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `energySource` on the `CommercialEnergyCertificate` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - The `addressId` column on the `Contact` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `address_id` on the `Property` table. All the data in the column will be lost.
  - You are about to alter the column `availableFrom` on the `Property` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `commission` on the `Property` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `commissionDescription` on the `Property` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `condition` on the `Property` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `energyCertificateStatus` on the `Property` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `furnishingDescription` on the `Property` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `heatingType` on the `Property` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `interiorQuality` on the `Property` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `parkingSpaceType` on the `Property` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - The `residentialEnergyCertificateId` column on the `Property` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to alter the column `title` on the `Property` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `houseType` on the `Property` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `buildingRegulation` on the `Property` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `development` on the `Property` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - The `commercialEnergyCertificateId` column on the `Property` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to alter the column `flooringType` on the `Property` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `officeType` on the `Property` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `gastronomyType` on the `Property` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `retailType` on the `Property` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `industrialType` on the `Property` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `commercialPlotType` on the `Property` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `residentialInvestmentType` on the `Property` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `type` on the `ResidentialEnergyCertificate` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `energySource` on the `ResidentialEnergyCertificate` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `energyClass` on the `ResidentialEnergyCertificate` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - Changed the type of `contactId` on the `Property` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `phaseId` on the `Property` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Contact" DROP CONSTRAINT "Contact_addressId_fkey";

-- DropForeignKey
ALTER TABLE "Property" DROP CONSTRAINT "Property_commercialEnergyCertificateId_fkey";

-- DropForeignKey
ALTER TABLE "Property" DROP CONSTRAINT "Property_residentialEnergyCertificateId_fkey";

-- AlterTable
ALTER TABLE "CommercialEnergyCertificate" ADD COLUMN     "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "type" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "energySource" SET DATA TYPE VARCHAR(50);

-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "addressId",
ADD COLUMN     "addressId" UUID;

-- AlterTable
ALTER TABLE "Property" DROP COLUMN "address_id",
ADD COLUMN     "addressId" UUID,
ADD COLUMN     "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "contactId",
ADD COLUMN     "contactId" UUID NOT NULL,
DROP COLUMN "phaseId",
ADD COLUMN     "phaseId" UUID NOT NULL,
ALTER COLUMN "availableFrom" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "commission" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "commissionDescription" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "condition" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "energyCertificateStatus" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "furnishingDescription" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "heatingType" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "interiorQuality" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "parkingSpaceType" SET DATA TYPE VARCHAR(50),
DROP COLUMN "residentialEnergyCertificateId",
ADD COLUMN     "residentialEnergyCertificateId" UUID,
ALTER COLUMN "title" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "houseType" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "buildingRegulation" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "development" SET DATA TYPE VARCHAR(50),
DROP COLUMN "commercialEnergyCertificateId",
ADD COLUMN     "commercialEnergyCertificateId" UUID,
ALTER COLUMN "flooringType" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "officeType" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "gastronomyType" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "retailType" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "industrialType" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "commercialPlotType" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "residentialInvestmentType" SET DATA TYPE VARCHAR(50);

-- AlterTable
ALTER TABLE "ResidentialEnergyCertificate" ADD COLUMN     "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "type" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "energySource" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "energyClass" SET DATA TYPE VARCHAR(50);

-- CreateTable
CREATE TABLE "Phase" (
    "id" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "Phase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActionTemplate" (
    "id" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actionName" VARCHAR(50) NOT NULL,
    "actionBody" TEXT NOT NULL,
    "eventName" VARCHAR(50) NOT NULL,
    "eventBody" TEXT NOT NULL,
    "phaseId" UUID NOT NULL,
    "phaseIdTo" UUID NOT NULL,

    CONSTRAINT "ActionTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Request" (
    "id" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "propertyId" UUID NOT NULL,
    "targetId" TEXT NOT NULL,
    "contactId" UUID NOT NULL,
    "phaseId" UUID NOT NULL,
    "unreadMessage" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Request_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Action" (
    "id" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actionTemplateId" UUID NOT NULL,
    "requestId" UUID NOT NULL,

    CONSTRAINT "Action_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" VARCHAR(50) NOT NULL,
    "contactId" UUID NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Note" (
    "id" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "requestId" TEXT NOT NULL,
    "body" TEXT NOT NULL,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TimeSlot" (
    "id" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "timeFrom" TIMESTAMP(3) NOT NULL,
    "timeTo" TIMESTAMP(3) NOT NULL,
    "maxParticipants" INTEGER NOT NULL,
    "availableSlots" INTEGER NOT NULL,
    "requestId" TEXT NOT NULL,

    CONSTRAINT "TimeSlot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appointment" (
    "id" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "timeSlotId" TEXT NOT NULL,
    "contactId" TEXT NOT NULL,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "requestId" TEXT NOT NULL,
    "contactId" TEXT NOT NULL,
    "body" TEXT NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_contactId_key" ON "Subscription"("contactId");

-- CreateIndex
CREATE UNIQUE INDEX "Property_residentialEnergyCertificateId_key" ON "Property"("residentialEnergyCertificateId");

-- CreateIndex
CREATE UNIQUE INDEX "Property_commercialEnergyCertificateId_key" ON "Property"("commercialEnergyCertificateId");

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActionTemplate" ADD CONSTRAINT "ActionTemplate_phaseId_fkey" FOREIGN KEY ("phaseId") REFERENCES "Phase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActionTemplate" ADD CONSTRAINT "ActionTemplate_phaseIdTo_fkey" FOREIGN KEY ("phaseIdTo") REFERENCES "Phase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_phaseId_fkey" FOREIGN KEY ("phaseId") REFERENCES "Phase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_actionTemplateId_fkey" FOREIGN KEY ("actionTemplateId") REFERENCES "ActionTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "Request"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_phaseId_fkey" FOREIGN KEY ("phaseId") REFERENCES "Phase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_residentialEnergyCertificateId_fkey" FOREIGN KEY ("residentialEnergyCertificateId") REFERENCES "ResidentialEnergyCertificate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_commercialEnergyCertificateId_fkey" FOREIGN KEY ("commercialEnergyCertificateId") REFERENCES "CommercialEnergyCertificate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "Request"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeSlot" ADD CONSTRAINT "TimeSlot_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "Request"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_timeSlotId_fkey" FOREIGN KEY ("timeSlotId") REFERENCES "TimeSlot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "Request"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
