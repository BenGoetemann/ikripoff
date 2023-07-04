/*
  Warnings:

  - You are about to drop the column `propertyId` on the `CommercialEnergyCertificate` table. All the data in the column will be lost.
  - You are about to drop the column `propertyId` on the `ResidentialEnergyCertificate` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CommercialEnergyCertificate" DROP COLUMN "propertyId";

-- AlterTable
ALTER TABLE "ResidentialEnergyCertificate" DROP COLUMN "propertyId";
