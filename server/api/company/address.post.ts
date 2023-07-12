import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";
import {
  useBackendFormValidator,
  useFormDataValue,
} from "~~/composables/useFormHelper";

export default defineEventHandler(async (event) => {
  console.log("Hello from address.post.ts");

  const query = getQuery(event);

  const body = await readMultipartFormData(event);
  const client = serverSupabaseClient(event);

  const street = useFormDataValue("street", body);
  const streetNumber = useFormDataValue("streetNumber", body);
  const postalCode = useFormDataValue("postalCode", body);
  const city = useFormDataValue("city", body);

  console.log(body);

  const validationBody: BackendFormValidationPayload[] = [
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

  const { data: company, error: companyError } = await client
    .from("company")
    .update({ street, streetNumber, postalCode, city })
    .eq("id", query.id);

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
