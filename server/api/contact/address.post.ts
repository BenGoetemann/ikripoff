import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";
import { createHash } from "crypto";
import {
  useBackendFormValidator,
  useFormDataValue,
} from "~~/composables/useFormHelper";

export default defineEventHandler(async (event) => {
  const ADDRESS_ALREADY_EXISTS = "23505";

  const body = await readMultipartFormData(event);
  const client = serverSupabaseClient(event);
  const user = await serverSupabaseUser(event); // check if user is real user

  const street = useFormDataValue("street", body);
  const streetNumber = useFormDataValue("streetNumber", body);
  const postalCode = useFormDataValue("postalCode", body);
  const city = useFormDataValue("city", body);

  const hash = useHash(`${street}${streetNumber}${postalCode}${city}`);

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

    console.log(addressUpsertError, addressUpsert);
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

  const { data: contact, error: contactError } = await client
    .from("contact")
    .update({ addressId: address[0].id })
    .eq("id", user.id);

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
