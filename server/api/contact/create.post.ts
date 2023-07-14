import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";
import {  
  useBackendFormValidator,
  useFormDataValue,
} from "~~/composables/useFormHelper";

export default defineEventHandler(async (event) => {
  const body = await readMultipartFormData(event);
  const client = serverSupabaseClient(event);
  const user = await serverSupabaseUser(event); // check if user is real user

  const id = user!.id;
  const salutation = useFormDataValue("salutation", body);
  const title = useFormDataValue("title", body);
  const firstName = useFormDataValue("firstName", body);
  const lastName = useFormDataValue("lastName", body);
  const phone = useFormDataValue("phone", body);
  const mobilePhone = useFormDataValue("mobilePhone", body);
  const email = user!.email;

  const validationBody: BackendFormValidationPayload[] = [
    {
      name: "Anrede",
      value: salutation,
      validations: ["required", "url:prevent"],
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
  ];

  const isFormValid = useBackendFormValidator(validationBody);

  if (isFormValid) {
    return {
      status: 422,
      data: null,
      error: isFormValid,
    };
  }

  // let thumbnailUrl = null;

  // if (thumbnail.length > 0) {
  //   if (
  //     extention.mime !== "image/webp" &&
  //     extention.mime !== "image/jpg" &&
  //     extention.mime !== "image/jpeg" &&
  //     extention.mime !== "image/png"
  //   ) {
  //     console.log("filetype");
  //     return {
  //       status: 415,
  //       data: null,
  //       error: "Filetype not allowed",
  //     };
  //   }

  //   const { data: thumbnailResponse, error: thumbnailError } =
  //     await client.storage
  //       .from("contactThumbnails")
  //       .upload(`${id}.${extention.ext}`, thumbnail, {
  //         upsert: true,
  //         cacheControl: "1",
  //       });

  //   if (thumbnailError) {
  //     console.error("Image Upload Error", thumbnailError);
  //     return {
  //       status: 500,
  //       data: null,
  //       error: thumbnailError,
  //     };
  //   }

  //   const { data: thumbnailPublicUrl } = await client.storage
  //     .from("contactThumbnails")
  //     .getPublicUrl(thumbnailResponse.path);

  //   thumbnailUrl = thumbnailPublicUrl.publicUrl;
  // }

  const requestBody: any = {
    id,
    salutation,
    title,
    firstName,
    lastName,
    phone,
    mobilePhone,
    email
  };

  // if (thumbnail.length > 0) requestBody.thumbnail = thumbnailUrl;

  const { data: contact, error: contactError } = await client
    .from("contact")
    .upsert({ ...requestBody })
    .select();

  if (contactError) {
    return {
      status: 500,
      data: null,
      error: contactError,
    };
  }

  return {
    status: 200,
    data: contact,
    error: contactError,
  };
});
