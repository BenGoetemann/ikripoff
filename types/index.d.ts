export {};

declare global {
  type TextInput =
    | "email"
    | "number"
    | "password"
    | "search"
    | "tel"
    | "text"
    | "url";

  type Salutation = "Herr" | "Frau" | "Hallo";
  type Title = "dr." | "prof." | "prof. dr.";

  type Option<T> = {
    value: T;
    label: string;
  };

  type InputRef<T> = {
    value: T;
    errorMsg?: string;
    error?: boolean;
  };

  interface KanbanObject {
    [key: string]: {
      id: string;
      name: string;
      items: PropertyDatabaseInterface[] | Request[];
    };
  }

  type FormValidation = "required" | "url:prevent" | "email" | "tel" | "url";

  interface BackendFormValidationPayload {
    name: string;
    value: any;
    validations: FormValidation[];
  }

  interface FrontendFormValidationPayload {
    name: string;
    value: ref<InputRef<any>>;
    validations: FormValidation[];
  }

  interface UserCredentials {
    email: string;
    password: string;
  }

  interface Contact {
    id: string;
    salutation?: Salutation;
    title?: Title;
    firstName?: string;
    lastName: string;
    email: string;
    phone?: string;
    mobilePhone?: string;
    company?: string;
    addressId?: string;
    website?: string;
    thumbnail?: string;
  }

  interface Phase {
    id: string;
    name: string;
  }

  interface RequestInterface {
    id: string;
    propertyId: string;
    targetId: string;
    contactId: string;
    phaseId: string;
    unreadMessage: boolean;
    thumbnail?: string;
    timestamp: string;
  }

  type EventType =
    | "buyerPhaseChange"
    | "appointmentSelectionReceived"
    | "appointmentFormSent"
    | "virtualTourSent"
    | "purchasePriceOfferFormSent"
    | "purchasePriceOfferReceived";

  interface ActionTemplate {
    id: string;
    actionName: string;
    actionBody: string;
    eventName: string;
    eventBody: string;
    phaseId: string;
    phaseIdTo: string;
  }

  interface Action {
    id: string;
    actionTemplateId: string;
    requestId: string;
  }

  interface Subscription {
    id: string;
    type: string;
    contactId: string;
    // Add additional fields specific to Subscription interface if needed
  }

  interface Note {
    id: string;
    requestId: string;
    body: string;
  }

  interface TimeSlot {
    id: string;
    requestId: string;
    timeFrom: Date;
    timeTo: Date;
    maxParticipants: number;
    availableSlots: number;
  }

  interface Appointment {
    id: string;
    timeSlotId: string;
    contactId: string;
  }

  interface Message {
    id: string;
    requestId: string;
    contactId: string;
    body: string;
  }

  interface Event {
    id: string;
    requestId: string;
    actionId: string;
    body: string;
  }

  type ApartmentType =
    | "apartment"
    | "attic"
    | "maisonette"
    | "penthouse"
    | "loft"
    | "terrace"
    | "lowerGroundFloor"
    | "groundFloor"
    | "upperGroundFloor"
    | "floor"
    | "other";

  type HouseType =
    | "singleFamily"
    | "midTerrace"
    | "endTerrace"
    | "multiFamily"
    | "bungalow"
    | "semiDetached"
    | "farm"
    | "villa"
    | "other";

  type PlotType = "plot";

  type OfficeType =
  | "loft"
  | "studio"
  | "office"
  | "officeBuilding"
  | "doctorsOffice"
  | "doctorsOfficeBuilding";

  type GastronomyType = "restaurant" | "guestHouse" | "hotel" | "bar" | "cafe" | "club";

  type RetailType =
  | "store"
  | "mall"
  | "departmentStore"
  | "kiosk"
  | "exhibitionSpace"
  | "salesArea";

  type IndustrialType =
  | "hall"
  | "industrialHall"
  | "storage"
  | "coldStorage"
  | "highBayStorage"
  | "shippingStorage"
  | "shop"
  | "service";

  type ParkingType =
  | "garage"
  | "undergroundGarage"
  | "carport"
  | "outdoor"
  | "carPark"
  | "duplex";

  type CommercialPlotType = "recreation" | "commercial" | "agriculture";

  type CommercialInvestmentType =
  | "mall"
  | "supermarket"
  | "commercialBuilding"
  | "officeBuilding"
  | "industrial";


  interface PropertyDatabaseInterface {
    id: string; // id of property for updates
    contactId: string; // points to owner profile
    phaseId: string; // points to phase
    estateSyncId?: string; // points to EstateSync property
    addressId?: string;
    apartmentType?: string;
    availableFrom?: string;
    commission?: string;
    commissionDescription?: string;
    condition?: string;
    condoFee?: number;
    constructionYear?: number;
    description?: string;
    energyCertificateStatus?: string;
    floor?: number;
    furnishingDescription?: string;
    hasBalcony?: boolean;
    hasBuiltInKitchen?: boolean;
    hasCellar?: boolean;
    hasGarden?: boolean;
    hasGuestToilet?: boolean;
    hasLift?: boolean;
    heatingType?: string;
    interiorQuality?: string;
    isAccessible?: boolean;
    isListed?: boolean;
    isRented?: boolean;
    isSuitableAsHolidayHome?: boolean;
    lastRefurbished?: number;
    livingArea?: number;
    locationDescription?: string;
    miscellaneousDescription?: string;
    monthlyRentalIncome?: number;
    numberOfBathrooms?: number;
    numberOfBedrooms?: number;
    numberOfFloors?: number;
    numberOfParkingSpaces?: number;
    numberOfRooms?: number;
    parkingSpacePurchasePrice?: number;
    parkingSpaceType?: string;
    plotArea?: number;
    purchasePrice: number;
    purchasePriceOnRequest?: boolean;
    requiresWBS?: boolean;
    residentialEnergyCertificateId?: string; // maybe desctructure fields into this table instaed of having a seperate table
    title: string;
    usableArea?: number;
    houseType?: string;
    hasLodgerFlat?: boolean;
    buildingRegulation?: string;
    development?: string;
    divisibleFrom?: number;
    floorSpaceIndex?: number;
    commercialEnergyCertificateId?: string; // maybe desctructure fields into this table instaed of having a seperate table
    drivingTimeToAirport?: number;
    drivingTimeToFreeway?: number;
    drivingTimeToTrainStation?: number;
    numberOfFloors?: number;
    flooringType?: string;
    hasAirConditioning?: boolean;
    hasCanteen?: boolean;
    hasKitchen?: boolean;
    hasNetworkCables?: boolean;
    officeType?: string;
    gastronomyType?: string;
    numberOfBeds?: number;
    numberOfSeats?: number;
    hasTerrace?: boolean;
    retailType?: string;
    hasRamp?: boolean;
    industrialType?: string;
    hallHeight?: number;
    parkingArea?: number;
    commercialPlotType?: string;
    actualYearlyRentalIncome?: number;
    additionalCosts?: number;
    livingArea?: number;
    listingType: string;
    rentableArea?: number;
    residentialInvestmentType?: string;
    targetYearlyRentalIncome?: number;
    totalArea?: number;
    thumbnail?: string;
  }

  interface Property {
    id?: string; // id of property for updates
    contactId?: string; // points to owner profile
    phaseId?: string; // points to phase
    address?: Address;
    apartmentType: string; // ---
    availableFrom?: string;
    commission?: string;
    commissionDescription?: string;
    condition?: string;
    constructionYear?: number;
    description?: string;
    energyCertificateStatus?: string;
    furnishingDescription?: string;
    hasCellar?: boolean;
    heatingType?: string;
    interiorQuality?: string;
    isListed?: boolean;
    lastRefurbished?: number;
    locationDescription?: string;
    miscellaneousDescription?: string;
    numberOfFloors?: number;
    numberOfParkingSpaces?: number;
    purchasePrice: number; // ---
    purchasePriceOnRequest?: boolean;
    title: string; // ---
    usableArea?: number;
  }

  interface ApartmentBuy extends Property {
    availableFrom?: string;
    condoFee?: number;
    floor?: number;
    hasBalcony?: boolean;
    hasBuiltInKitchen?: boolean;
    hasGarden?: boolean;
    hasGuestToilet?: boolean;
    hasLift?: boolean;
    isAccessible?: boolean;
    isRented?: boolean;
    isSuitableAsHolidayHome?: boolean;
    lastRefurbished?: number;
    livingArea: number;
    locationDescription?: string;
    monthlyRentalIncome?: number;
    numberOfBathrooms?: number;
    numberOfBedrooms?: number;
    numberOfRooms: number;
    parkingSpacePurchasePrice?: number;
    parkingSpaceType?: string;
    requiresWBS?: boolean;
    residentialEnergyCertificate?: ResidentialEnergyCertificate;
  }

  interface HouseBuy extends Property {
    availableFrom?: string;
    hasGuestToilet?: boolean;
    hasLodgerFlat?: boolean;
    houseType?: string;
    livingArea: number;
    numberOfBathrooms?: number;
    numberOfBedrooms?: number;
    numberOfRooms?: number;
    plotArea: number;
    monthlyRentalIncome?: number;
    residentialEnergyCertificate?: ResidentialEnergyCertificate;
  }

  interface PlotBuy extends Property {
    buildingRegulation?: string;
    development?: string;
    divisibleFrom?: number;
    floorSpaceIndex?: number;
    plotArea: number;
    siteCoverageIndex?: number;
  }

  interface OfficeBuy extends Property {
    commercialEnergyCertificate?: CommercialEnergyCertificate;
    divisibleFrom?: number;
    drivingTimeToAirport?: number;
    drivingTimeToFreeway?: number;
    drivingTimeToTrainStation?: number;
    flooringType?: string;
    hasAirConditioning?: boolean;
    hasCanteen?: boolean;
    hasKitchen?: boolean;
    hasNetworkCables?: boolean;
    hasLift?: boolean;
    lastRefurbished?: number;
    numberOfFloors?: number;
    officeType?: string;
    parkingSpacePurchasePrice?: number;
    walkingTimeToPublicTransit?: number;
    usableArea: number;
  }

  interface GastronomyBuy extends Property {
    commercialEnergyCertificate?: CommercialEnergyCertificate;
    drivingTimeToAirport?: number;
    drivingTimeToFreeway?: number;
    drivingTimeToTrainStation?: number;
    gastronomyType?: string;
    hasTerrace?: boolean;
    numberOfBeds?: number;
    numberOfFloors?: number;
    numberOfSeats?: number;
    parkingSpacePurchasePrice?: number;
    usableArea: number;
    totalArea: number;
    walkingTimeToPublicTransit?: number;
  }

  interface RetailBuy extends Property {
    commercialEnergyCertificate?: CommercialEnergyCertificate;
    drivingTimeToAirport?: number;
    drivingTimeToFreeway?: number;
    drivingTimeToTrainStation?: number;
    numberOfFloors?: number;
    numberOfParkingSpaces?: number;
    parkingSpacePurchasePrice?: number;
    retailType?: string;
    usableArea: number;
    totalArea: number;
    walkingTimeToPublicTransit?: number;
  }

  interface IndustrialBuy extends Property {
    commercialEnergyCertificate?: CommercialEnergyCertificate;
    drivingTimeToAirport?: number;
    drivingTimeToFreeway?: number;
    drivingTimeToTrainStation?: number;
    hallHeight?: number;
    industrialType?: string;
    numberOfFloors?: number;
    parkingArea?: number;
    plotArea?: number;
    usableArea: number;
    totalArea: number;
    walkingTimeToPublicTransit?: number;
  }

  interface ParkingSpaceBuy extends Property {
    parkingSpaceType: string;
  }

  interface CommercialPlotBuy extends Property {
    commercialEnergyCertificate?: CommercialEnergyCertificate;
    commercialPlotType?: string;
    drivingTimeToAirport?: number;
    drivingTimeToFreeway?: number;
    drivingTimeToTrainStation?: number;
    numberOfFloors?: number;
    plotArea: number;
    walkingTimeToPublicTransit?: number;
  }

  interface OtherCommercialBuy extends Property {
    commercialEnergyCertificate?: CommercialEnergyCertificate;
    drivingTimeToAirport?: number;
    drivingTimeToFreeway?: number;
    drivingTimeToTrainStation?: number;
    numberOfFloors?: number;
    usableArea: number;
    totalArea: number;
    walkingTimeToPublicTransit?: number;
  }

  interface ResidentialInvestmentBuy extends Property {
    actualYearlyRentalIncome?: number;
    additionalCosts?: number;
    constructionYear: number;
    livingArea?: number;
    rentableArea?: number;
    residentialInvestmentType?: string;
    targetYearlyRentalIncome?: number;
    totalArea: number;
  }

  interface CommercialInvestmentBuy extends Property {
    actualYearlyRentalIncome?: number;
    additionalCosts?: number;
    constructionYear: number;
    livingArea?: number;
    rentableArea?: number;
    targetYearlyRentalIncome?: number;
    totalArea: number;
  }

  type ListingType =
    | "apartmentBuy"
    | "houseBuy"
    | "plotBuy"
    | "officeBuy"
    | "gastronomyBuy"
    | "retailBuy"
    | "industrialBuy"
    | "parkingSpaceBuy"
    | "commercialPlotBuy"
    | "otherCommercialBuy"
    | "residentialInvestmentBuy"
    | "commercialInvestmentBuy";

  type PropertyType =
    | "apartment"
    | "house"
    | "plot"
    | "office"
    | "gastronomy"
    | "retail"
    | "industrial"
    | "parkingSpace"
    | "otherCommercial"
    | "residentialInvestment"
    | "commercialInvestment";

  type ListingFields =
    | ApartmentBuy
    | HouseBuy
    | PlotBuy
    | OfficeBuy
    | GastronomyBuy
    | RetailBuy
    | IndustrialBuy
    | ParkingSpaceBuy
    | CommercialPlotBuy
    | OtherCommercialBuy
    | ResidentialInvestmentBuy
    | CommercialInvestmentBuy;

  // FROM HERE TYPE CHECKS

  interface PropertyEstateSyncInterface {
    type: ListingType;
    fields: ListingFields;
    attachments: EstateSyncAttachment[];
    contactId: string;
    externalId: string;
  }

  interface EstateSyncPropertyResponsePayload
    extends PropertyEstateSyncInterface {
    id: string;
    createdAt: string;
    updatedAt: string;
    processingStatus: string;
  }

  interface ResidentialEnergyCertificate {
    id?: string;
    type: string;
    prior2014?: boolean;
    energySource: string;
    energyNeed?: number;
    energyConsumption?: number;
    energyClass?: string;
    warmWaterIncluded?: boolean;
  }

  interface CommercialEnergyCertificate {
    id?: string;
    type: string;
    prior2014?: boolean;
    energySource: string;
    energyNeed?: number;
    powerNeed?: number;
    heatNeed?: number;
    powerConsumption?: number;
    heatConsumption?: number;
  }

  interface Address {
    id?: string;
    street: string;
    streetNumber: string;
    postalCode: string;
    city: string;
    region?: string;
    country?: string;
    publish: boolean;
  }

  interface EstateSyncAttachment {
    type: string;
    url: string;
    watermarkUrl?: string;
    watermarkCaption?: string;
    title: string;
    isBlueprint: boolean;
  }
}
