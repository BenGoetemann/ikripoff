/*
  Warnings:

  - You are about to drop the column `salutation` on the `Contact` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "salutation",
ADD COLUMN     "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "title" VARCHAR(50),
ADD COLUMN     "website" VARCHAR(100),
ALTER COLUMN "firstName" DROP NOT NULL,
ALTER COLUMN "phone" DROP NOT NULL,
ALTER COLUMN "mobilePhone" DROP NOT NULL,
ALTER COLUMN "company" DROP NOT NULL;
