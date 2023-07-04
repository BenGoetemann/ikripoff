import { error } from "console";

export const useEmailValidator = (email: string) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

export const useYoutubeLinkValidator = (url: string) => {
  return url.match(/^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/i);
};

export const useUrlSpotter = (value: string) => {
  return value
    .toString()
    .match(/^(https?:\/\/)?([\w.-]+)\.([a-z]{2,6})(\/[\w.-]*)*\/?$/);
};

export const usePhoneNumberValidator = (email: string) => {
  return email.match(/^[\d ()+-]+$/);
};

export const useBackendFormValidator = (
  data: BackendFormValidationPayload[]
) => {
  const errorMessages: string[] = [];

  data.forEach((e: BackendFormValidationPayload) => {
    if (e.validations.includes("required") && !e.value) {
      errorMessages.push(`Das Feld ${e.name} ist ein Pflichtfeld.`);
    }

    if (e.validations.includes("email") && !useEmailValidator(e.value)) {
      errorMessages.push(
        `Bitte gib bei dem Feld ${e.name} eine gültige E-Mail Adresse an.`
      );
    }

    if (
      e.validations.includes("tel") &&
      e.value &&
      !usePhoneNumberValidator(e.value)
    ) {
      errorMessages.push(
        `Bitte gib bei dem Feld ${e.name} eine gültige Telefonnummer an.`
      );
    }

    if (e.validations.includes("url") && e.value && !useUrlSpotter(e.value)) {
      errorMessages.push(
        `Bitte gib bei dem Feld ${e.name} eine gültige URL an.`
      );
    }

    if (e.validations.includes("url:prevent") && useUrlSpotter(e.value)) {
      errorMessages.push(`Du kannst in dem Feld ${e.name} keine URL angeben.`);
    }
  });

  if (errorMessages.length !== 0) {
    return errorMessages;
  }

  return null;
};

export const useFrontendFormValidator = (
  data: FrontendFormValidationPayload[]
) => {
  let errorMessages: string[] = [];

  data.forEach((e: FrontendFormValidationPayload) => {
    if (e.validations.includes("required") && !e.value.value) {
      e.value.errorMsg = `Das Feld ${e.name} ist ein Pflichtfeld.`;
      errorMessages.push(e.value.errorMsg);
    }

    if (e.validations.includes("email") && !useEmailValidator(e.value.value)) {
      e.value.errorMsg = `Bitte gib bei dem Feld ${e.name} eine gültige E-Mail Adresse an.`;
      errorMessages.push(e.value.errorMsg);
    }

    if (
      e.validations.includes("tel") &&
      !usePhoneNumberValidator(e.value.value)
    ) {
      e.value.errorMsg = `Bitte gib bei dem Feld ${e.name} eine gültige Telefonnummer an.`;
      errorMessages.push(e.value.errorMsg);
    }

    if (e.validations.includes("url") && !useUrlSpotter(e.value.value)) {
      e.value.errorMsg = `Bitte gib bei dem Feld ${e.name} eine gültige URL an.`;
      errorMessages.push(e.value.errorMsg);
    }

    if (e.validations.includes("url:prevent") && useUrlSpotter(e.value.value)) {
      e.value.errorMsg = `Du kannst in dem Feld ${e.name} keine URL angeben.`;
      errorMessages.push(e.value.errorMsg);
    }

    console.log(e);
  });

  console.log(errorMessages);

  if (errorMessages.length !== 0) {
    return errorMessages;
  }
  return true;
};

export const useFormDataValue = (
  key: string,
  formData: any,
  type?: "image"
) => {
  if (type === "image") return formData?.find((e: any) => e.name === key)?.data;
  return formData
    ?.find((e: any) => e.name === key)
    ?.data.toString()
    .trim();
};

export const useOptionValue = (
  type: ListingType | "listingType"
): Option<any>[] => {
  const listingTypeOptions: Option<ListingType>[] = [
    {
      value: "apartmentBuy",
      label: "Wohnung",
    },
    {
      value: "houseBuy",
      label: "Haus",
    },
    {
      value: "plotBuy",
      label: "Grundstück",
    },
    {
      value: "officeBuy",
      label: "Büro",
    },
    {
      value: "gastronomyBuy",
      label: "Gastronomie",
    },
    {
      value: "retailBuy",
      label: "Einzelhandel",
    },
    {
      value: "industrialBuy",
      label: "Gewerbe",
    },
    {
      value: "parkingSpaceBuy",
      label: "Stellplatz",
    },
    {
      value: "commercialPlotBuy",
      label: "Gewerbegrundstück",
    },
    {
      value: "otherCommercialBuy",
      label: "Sonstige Gewerbe",
    },
    {
      value: "residentialInvestmentBuy",
      label: "Wohnanlage",
    },
    {
      value: "commercialInvestmentBuy",
      label: "Gewerbeanlage",
    },
  ];

  const apartmentTypeOptions: Option<ApartmentType>[] = [
    {
      value: "apartment",
      label: "Wohnung",
    },
    {
      value: "floor",
      label: "Etagenwohnung",
    },
    {
      value: "penthouse",
      label: "Penthouse",
    },
    {
      value: "maisonette",
      label: "Maisonette",
    },
    {
      value: "attic",
      label: "Dachgeschoss",
    },
    {
      value: "loft",
      label: "Loft",
    },
    {
      value: "groundFloor",
      label: "Erdgeschoss",
    },
    {
      value: "lowerGroundFloor",
      label: "Souterrain",
    },
    {
      value: "upperGroundFloor",
      label: "Hochparterre",
    },
    {
      value: "other",
      label: "Sonstige",
    },
    {
      value: "terrace",
      label: "Reihenhauswohnungen",
    },
  ];

  const houseTypeOptions: Option<HouseType>[] = [
    {
      value: "singleFamily",
      label: "Einfamilienhaus",
    },
    {
      value: "midTerrace",
      label: "Reihenmittelhaus",
    },
    {
      value: "endTerrace",
      label: "Reihenendhaus",
    },
    {
      value: "multiFamily",
      label: "Mehrfamilienhaus",
    },
    {
      value: "bungalow",
      label: "Bungalow",
    },
    {
      value: "semiDetached",
      label: "Doppelhaushälfte",
    },
    {
      value: "farm",
      label: "Bauernhaus",
    },
    {
      value: "villa",
      label: "Villa",
    },
    {
      value: "other",
      label: "Sonstige",
    },
  ];

  const officeTypeOptions: Option<OfficeType>[] = [
    {
      value: "loft",
      label: "Loft",
    },
    {
      value: "studio",
      label: "Studio",
    },
    {
      value: "office",
      label: "Büro",
    },
    {
      value: "officeBuilding",
      label: "Bürogebäude",
    },
    {
      value: "doctorsOffice",
      label: "Arztpraxis",
    },
    {
      value: "doctorsOfficeBuilding",
      label: "Ärztehaus",
    },
  ];

  const gastronomyTypeOptions: Option<GastronomyType>[] = [
    {
      value: "restaurant",
      label: "Restaurant",
    },
    {
      value: "guestHouse",
      label: "Gasthaus",
    },
    {
      value: "hotel",
      label: "Hotel",
    },
    {
      value: "bar",
      label: "Bar",
    },
    {
      value: "cafe",
      label: "Café",
    },
    {
      value: "club",
      label: "Club",
    },
  ];

  const retailTypeOptions: Option<RetailType>[] = [
    {
      value: "store",
      label: "Geschäft",
    },
    {
      value: "mall",
      label: "Einkaufszentrum",
    },
    {
      value: "departmentStore",
      label: "Kaufhaus",
    },
    {
      value: "kiosk",
      label: "Kiosk",
    },
    {
      value: "exhibitionSpace",
      label: "Ausstellungsfläche",
    },
    {
      value: "salesArea",
      label: "Verkaufsfläche",
    },
  ];

  const industrialTypeOptions: Option<IndustrialType>[] = [
    {
      value: "hall",
      label: "Halle",
    },
    {
      value: "industrialHall",
      label: "Industriehalle",
    },
    {
      value: "storage",
      label: "Lager",
    },
    {
      value: "coldStorage",
      label: "Kühlhaus",
    },
    {
      value: "highBayStorage",
      label: "Hochregallager",
    },
    {
      value: "shippingStorage",
      label: "Versandlager",
    },
    {
      value: "shop",
      label: "Geschäft",
    },
    {
      value: "service",
      label: "Dienstleistung",
    },
  ];

  const parkingTypeOptions: Option<ParkingType>[] = [
    {
      value: "garage",
      label: "Garage",
    },
    {
      value: "undergroundGarage",
      label: "Tiefgarage",
    },
    {
      value: "carport",
      label: "Carport",
    },
    {
      value: "outdoor",
      label: "Freiluft",
    },
    {
      value: "carPark",
      label: "Parkhaus",
    },
    {
      value: "duplex",
      label: "Duplex",
    },
  ];

  const commercialPlotTypeOptions: Option<CommercialPlotType>[] = [
    {
      value: "recreation",
      label: "Erholung",
    },
    {
      value: "commercial",
      label: "Gewerbe",
    },
    {
      value: "agriculture",
      label: "Landwirtschaft",
    },
  ];

  const commercialInvestmentTypeOptions: Option<CommercialInvestmentType>[] = [
    {
      value: "mall",
      label: "Einkaufszentrum",
    },
    {
      value: "supermarket",
      label: "Supermarkt",
    },
    {
      value: "commercialBuilding",
      label: "Gewerbegebäude",
    },
    {
      value: "officeBuilding",
      label: "Bürogebäude",
    },
    {
      value: "industrial",
      label: "Industriegebäude",
    },
  ];
  
  
  

  let options: Option<any>[];

  switch (type) {
    case "listingType":
      options = listingTypeOptions;
      break;
    case "apartmentBuy":
      options = apartmentTypeOptions;
      break;
    case "houseBuy":
      options = houseTypeOptions;
      break;
    case "officeBuy":
      options = officeTypeOptions;
      break;
    case "gastronomyBuy":
      options = gastronomyTypeOptions;
      break;
    case "retailBuy":
      options = retailTypeOptions;
      break;
    case "industrialBuy":
      options = industrialTypeOptions;
      break;
    case "parkingSpaceBuy":
      options = parkingTypeOptions;
      break;
    case "commercialPlotBuy":
      options = commercialPlotTypeOptions;
      break;
    case "commercialInvestmentBuy":
      options = commercialInvestmentTypeOptions;
      break;
    default:
      options = [{
        value: "other",
        label: "Sonstige",
      }];
      break;
  }

  return options;
};
