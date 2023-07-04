-- AlterTable
ALTER TABLE "Address" ALTER COLUMN "region" DROP NOT NULL,
ALTER COLUMN "country" DROP NOT NULL,
ALTER COLUMN "publish" SET DEFAULT false;

-- CreateTable
CREATE TABLE "Property" (
    "id" TEXT NOT NULL,
    "contactId" TEXT NOT NULL,
    "phaseId" TEXT NOT NULL,
    "estateSyncId" TEXT,
    "address_id" TEXT,
    "apartmentType" TEXT NOT NULL,
    "availableFrom" TEXT,
    "commission" TEXT,
    "commissionDescription" TEXT,
    "condition" TEXT,
    "condoFee" INTEGER,
    "constructionYear" INTEGER,
    "description" TEXT,
    "energyCertificateStatus" TEXT,
    "floor" INTEGER,
    "furnishingDescription" TEXT,
    "hasBalcony" BOOLEAN,
    "hasBuiltInKitchen" BOOLEAN,
    "hasCellar" BOOLEAN,
    "hasGarden" BOOLEAN,
    "hasGuestToilet" BOOLEAN,
    "hasLift" BOOLEAN,
    "heatingType" TEXT,
    "interiorQuality" TEXT,
    "isAccessible" BOOLEAN,
    "isListed" BOOLEAN,
    "isRented" BOOLEAN,
    "isSuitableAsHolidayHome" BOOLEAN,
    "lastRefurbished" INTEGER,
    "livingArea" INTEGER,
    "locationDescription" TEXT,
    "miscellaneousDescription" TEXT,
    "monthlyRentalIncome" INTEGER,
    "numberOfBathrooms" INTEGER,
    "numberOfBedrooms" INTEGER,
    "numberOfFloors" INTEGER,
    "numberOfParkingSpaces" INTEGER,
    "numberOfRooms" INTEGER,
    "parkingSpacePurchasePrice" INTEGER,
    "parkingSpaceType" TEXT,
    "plotArea" INTEGER,
    "purchasePrice" INTEGER NOT NULL,
    "purchasePriceOnRequest" BOOLEAN,
    "requiresWBS" BOOLEAN,
    "residentialEnergyCertificateId" TEXT,
    "title" TEXT NOT NULL,
    "usableArea" INTEGER,
    "houseType" TEXT,
    "hasLodgerFlat" BOOLEAN,
    "buildingRegulation" TEXT,
    "development" TEXT,
    "divisibleFrom" INTEGER,
    "floorSpaceIndex" INTEGER,
    "commercialEnergyCertificateId" TEXT,
    "drivingTimeToAirport" INTEGER,
    "drivingTimeToFreeway" INTEGER,
    "drivingTimeToTrainStation" INTEGER,
    "flooringType" TEXT,
    "hasAirConditioning" BOOLEAN,
    "hasCanteen" BOOLEAN,
    "hasKitchen" BOOLEAN,
    "hasNetworkCables" BOOLEAN,
    "officeType" TEXT,
    "gastronomyType" TEXT,
    "numberOfBeds" INTEGER,
    "numberOfSeats" INTEGER,
    "hasTerrace" BOOLEAN,
    "retailType" TEXT,
    "hasRamp" BOOLEAN,
    "industrialType" TEXT,
    "hallHeight" INTEGER,
    "parkingArea" INTEGER,
    "commercialPlotType" TEXT,
    "actualYearlyRentalIncome" INTEGER,
    "additionalCosts" INTEGER,
    "rentableArea" INTEGER,
    "residentialInvestmentType" TEXT,
    "targetYearlyRentalIncome" INTEGER,
    "totalArea" INTEGER,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResidentialEnergyCertificate" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "prior2014" BOOLEAN,
    "energySource" TEXT NOT NULL,
    "energyNeed" INTEGER,
    "energyConsumption" INTEGER,
    "energyClass" TEXT,
    "warmWaterIncluded" BOOLEAN,
    "propertyId" TEXT,

    CONSTRAINT "ResidentialEnergyCertificate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommercialEnergyCertificate" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "prior2014" BOOLEAN,
    "energySource" TEXT NOT NULL,
    "energyNeed" INTEGER,
    "powerNeed" INTEGER,
    "heatNeed" INTEGER,
    "powerConsumption" INTEGER,
    "heatConsumption" INTEGER,
    "propertyId" TEXT,

    CONSTRAINT "CommercialEnergyCertificate_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ResidentialEnergyCertificate" ADD CONSTRAINT "ResidentialEnergyCertificate_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommercialEnergyCertificate" ADD CONSTRAINT "CommercialEnergyCertificate_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE SET NULL ON UPDATE CASCADE;
