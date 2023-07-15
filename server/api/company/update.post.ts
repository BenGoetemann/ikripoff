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

  const street = useFormDataValue("street", body);
  const streetNumber = useFormDataValue("streetNumber", body);
  const postalCode = useFormDataValue("postalCode", body);
  const city = useFormDataValue("city", body);

  const contactArray = useFormDataValue("contacts", body);
  const contacts = contactArray ? JSON.parse(contactArray) : [];

  const removeContactArray = useFormDataValue("removeContacts", body);
  const removeContacts = removeContactArray
    ? JSON.parse(removeContactArray)
    : [];

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
    {
      name: "Straße",
      value: street,
      validations: ["url:prevent"],
    },
    {
      name: "Hausnummer",
      value: streetNumber,
      validations: ["url:prevent"],
    },
    {
      name: "Postleitzahl",
      value: postalCode,
      validations: ["url:prevent"],
    },
    {
      name: "Stadt",
      value: city,
      validations: ["url:prevent"],
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
      street,
      streetNumber,
      postalCode,
      city,
    })
    .eq("id", query.id)
    .select();

  for (const contact of contacts) {
    const { data: contactData, error: contactError }: any = await client
      .from("contact")
      .update({ companyId: company[0].id })
      .eq("id", contact.id);

    if (contactError) {
      return {
        status: 500,
        data: null,
        error: contactError,
      };
    }
  }

  for (const contact of removeContacts) {
    const { data: contactData, error: contactError }: any = await client
      .from("contact")
      .update({ companyId: null })
      .eq("id", contact.id);

    if (contactError) {
      return {
        status: 500,
        data: null,
        error: contactError,
      };
    }
  }

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
