import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";
import {
  useBackendFormValidator,
  useFormDataValue,
} from "~~/composables/useFormHelper";

export default defineEventHandler(async (event) => {
  const body = await readMultipartFormData(event);
  const client = serverSupabaseClient(event);
  const user = await serverSupabaseUser(event); // check if user is real user

  const salutation = useFormDataValue("salutation", body);
  const title = useFormDataValue("title", body);
  const firstName = useFormDataValue("firstName", body);
  const lastName = useFormDataValue("lastName", body);
  const phone = useFormDataValue("phone", body);
  const mobilePhone = useFormDataValue("mobilePhone", body);
  const company = useFormDataValue("company", body);
  const website = useFormDataValue("website", body);
  const email = useFormDataValue("email", body);

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
      name: "Kontakt E-Mail",
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

  const { data: contact, error: contactError } = await client
    .from("contact")
    .update({
      salutation,
      title,
      firstName,
      lastName,
      phone,
      mobilePhone,
      company,
      website,
      email,
    })
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
