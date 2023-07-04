/*
  Warnings:

  - A unique constraint covering the columns `[residentialEnergyCertificateId]` on the table `Property` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[commercialEnergyCertificateId]` on the table `Property` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "CommercialEnergyCertificate" DROP CONSTRAINT "CommercialEnergyCertificate_propertyId_fkey";

-- DropForeignKey
ALTER TABLE "ResidentialEnergyCertificate" DROP CONSTRAINT "ResidentialEnergyCertificate_propertyId_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "Property_residentialEnergyCertificateId_key" ON "Property"("residentialEnergyCertificateId");

-- CreateIndex
CREATE UNIQUE INDEX "Property_commercialEnergyCertificateId_key" ON "Property"("commercialEnergyCertificateId");

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_residentialEnergyCertificateId_fkey" FOREIGN KEY ("residentialEnergyCertificateId") REFERENCES "ResidentialEnergyCertificate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_commercialEnergyCertificateId_fkey" FOREIGN KEY ("commercialEnergyCertificateId") REFERENCES "CommercialEnergyCertificate"("id") ON DELETE SET NULL ON UPDATE CASCADE;
