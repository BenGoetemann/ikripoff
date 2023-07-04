import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";
import {  
  useBackendFormValidator,
  useFormDataValue,
} from "~~/composables/useFormHelper";
import { createHash } from "crypto";
import fileType from "file-type";

export default defineEventHandler(async (event) => {
  const ADDRESS_ALREADY_EXISTS = "23505";

  const body = await readMultipartFormData(event);
  const client = serverSupabaseClient(event);
  const user = await serverSupabaseUser(event); // check if user is real user

  const id = useFormDataValue("id", body);
  const salutation = useFormDataValue("salutation", body);
  const title = useFormDataValue("title", body);
  const firstName = useFormDataValue("firstName", body);
  const lastName = useFormDataValue("lastName", body);
  const phone = useFormDataValue("phone", body);
  const mobilePhone = useFormDataValue("mobilePhone", body);
  const company = useFormDataValue("company", body);
  const website = useFormDataValue("website", body);

  const email = user.email;

  const thumbnail = useFormDataValue("profilePicture", body, "image");
  const extention = fileType(Buffer.from(thumbnail, "base64"));

  const street = useFormDataValue("street", body);
  const streetNumber = useFormDataValue("streetNumber", body);
  const postalCode = useFormDataValue("postalCode", body);
  const city = useFormDataValue("city", body);

  const hash = useHash(`${street}${streetNumber}${postalCode}${city}`);

  const validationBody: BackendFormValidationPayload[] = [
    {
      name: "Anrede",
      value: salutation,
      validations: ["url:prevent"],
    },
    {
      name: "Titel",
      value: title,
      validations: ["url:prevent"],
    },
    {
      name: "Vorname",
      value: firstName,
      validations: ["required", "url:prevent"],
    },
    {
      name: "Nachname",
      value: lastName,
      validations: ["required", "url:prevent"],
    },
    {
      name: "Telefon",
      value: phone,
      validations: ["url:prevent", "tel"],
    },
    {
      name: "Mobiltelefon",
      value: mobilePhone,
      validations: ["url:prevent", "tel"],
    },
    {
      name: "Firma",
      value: company,
      validations: ["url:prevent"],
    },
    {
      name: "Website",
      value: website,
      validations: ["url"],
    },
    {
      name: "Straße",
      value: street,
      validations: ["required", "url:prevent"],
    },
    {
      name: "Hausnummer",
      value: streetNumber,
      validations: ["required", "url:prevent"],
    },
    {
      name: "Postleitzahl",
      value: postalCode,
      validations: ["required", "url:prevent"],
    },
    {
      name: "Stadt",
      value: city,
      validations: ["required", "url:prevent"],
    },
  ];

  const isFormValid = useBackendFormValidator(validationBody);

  if (isFormValid) {
    return {
      status: 422,
      data: null,
      error: isFormValid,
    };
  }

  let thumbnailUrl = null;

  if (thumbnail.length > 0) {
    if (
      extention.mime !== "image/webp" &&
      extention.mime !== "image/jpg" &&
      extention.mime !== "image/jpeg" &&
      extention.mime !== "image/png"
    ) {
      console.log("filetype");
      return {
        status: 415,
        data: null,
        error: "Filetype not allowed",
      };
    }

    const { data: thumbnailResponse, error: thumbnailError } =
      await client.storage
        .from("contactThumbnails")
        .upload(`${id}.${extention.ext}`, thumbnail, {
          upsert: true,
          cacheControl: "1",
        });

    if (thumbnailError) {
      console.error("Image Upload Error", thumbnailError);
      return {
        status: 500,
        data: null,
        error: thumbnailError,
      };
    }

    const { data: thumbnailPublicUrl } = await client.storage
      .from("contactThumbnails")
      .getPublicUrl(thumbnailResponse.path);

    thumbnailUrl = thumbnailPublicUrl.publicUrl;
  }

  const { data: addressExists, error: addressExistsError } = await client
    .from("address")
    .select("*")
    .eq("hash", hash);

  if (addressExistsError) {
    return {
      status: 500,
      error: addressExistsError,
    };
  }

  let address = null;
  let addressError = null;

  if (addressExists === null || addressExists.length === 0) {
    const { data: addressUpsert, error: addressUpsertError } = await client
      .from("address")
      .upsert({ street, streetNumber, postalCode, city, hash })
      .select();

    address = addressUpsert;
    addressError = addressUpsertError;
  } else {
    address = addressExists;
    addressError = addressExistsError;
  }

  if (addressError) {
    return {
      status: 500,
      error: addressError,
    };
  }

  const requestBody: any = {
    id,
    salutation,
    title,
    firstName,
    lastName,
    email,
    phone,
    mobilePhone,
    company,
    website,
    addressId: address[0].id,
  };

  if (thumbnail.length > 0) requestBody.thumbnail = thumbnailUrl;

  const { data: contact, error: contactError } = await client
    .from("contact")
    .upsert({ ...requestBody })
    .select();

  if (contactError) {
    return {
      status: 500,
      error: contactError,
    };
  }

  return {
    status: 200,
    data: contact,
    error: contactError,
  };
});

const useHash = (value: any) => {
  let hash = createHash("sha256");
  let code = value;
  code = hash.update(code);
  code = hash.digest(code);
  return code.toString("hex");
};
