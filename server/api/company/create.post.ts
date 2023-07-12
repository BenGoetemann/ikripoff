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

  const name = useFormDataValue("name", body);
  const website = useFormDataValue("website", body);
  const email = useFormDataValue("email", body);
  const phone = useFormDataValue("phone", body);

  const thumbnail = useFormDataValue("thumbnail", body, "image");
  const extention = fileType(Buffer.from(thumbnail, "base64"));

  const street = useFormDataValue("street", body);
  const streetNumber = useFormDataValue("streetNumber", body);
  const postalCode = useFormDataValue("postalCode", body);
  const city = useFormDataValue("city", body);

  const validationBody: BackendFormValidationPayload[] = [
    {
      name: "Name",
      value: name,
      validations: ["required", "url:prevent"],
    },
    {
      name: "Website",
      value: website,
      validations: ["url"],
    },
    {
      name: "E-Mail",
      value: email,
      validations: ["required", "url:prevent"],
    },
    {
      name: "Telefon",
      value: phone,
      validations: ["url:prevent", "tel"],
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

  const requestBody: any = {
    name,
    website,
    email,
    phone,
    street,
    streetNumber,
    postalCode,
    city,
  };

  const { data: company, error: companyError } = await client
    .from("company")
    .upsert({ ...requestBody })
    .select();

  if (companyError) {
    return {
      status: 500,
      error: companyError,
    };
  }

  return {
    status: 200,
    data: company,
    error: companyError,
  };
});
