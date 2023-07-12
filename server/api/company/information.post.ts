import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";
import {
  useBackendFormValidator,
  useFormDataValue,
} from "~~/composables/useFormHelper";

export default defineEventHandler(async (event) => {
  const body = await readMultipartFormData(event);
  const query = await getQuery(event);
  const client = serverSupabaseClient(event);
  const user = await serverSupabaseUser(event); // check if user is real user

  const name = useFormDataValue("name", body);
  const phone = useFormDataValue("phone", body);
  const website = useFormDataValue("website", body);
  const email = useFormDataValue("email", body);

  const validationBody: BackendFormValidationPayload[] = [
    {
      name: "Titel",
      value: name,
      validations: ["url:prevent"],
    },
    {
      name: "Telefon",
      value: phone,
      validations: ["url:prevent", "tel"],
    },
    {
      name: "Website",
      value: website,
      validations: ["url"],
    },
    {
      name: "E-Mail",
      value: email,
      validations: ["url:prevent", "email"],
    },
  ];

  const isFormValid = useBackendFormValidator(validationBody);

  if (isFormValid) {
    return {
      status: 422,
      error: isFormValid,
    };
  }

  const { data: company, error: companyError } = await client
    .from("company")
    .update({
      name,
      phone,
      website,
      email,
    })
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
