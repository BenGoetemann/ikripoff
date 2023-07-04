import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";
import { createHash } from "crypto";
import fileType from "file-type";
import { useFormDataValue } from "~~/composables/useFormHelper";

export default defineEventHandler(async (event) => {
  const body = await readMultipartFormData(event);
  const client = serverSupabaseClient(event);
  const user = await serverSupabaseUser(event); // check if user is real user

  const thumbnail = useFormDataValue("profilePicture", body, "image");
  const extention = fileType(Buffer.from(thumbnail, "base64"));

  if (
    extention.mime !== "image/webp" &&
    extention.mime !== "image/jpg" &&
    extention.mime !== "image/jpeg" &&
    extention.mime !== "image/png"
  ) {
    console.log("filetype not allowed:" + extention.mime);
    return {
      status: 415,
      error: "Filetype not allowed",
    };
  }

  const { data: thumbnailResponse, error: thumbnailError } =
    await client.storage
      .from("contactThumbnails")
      .upload(`${user.id}.${extention.ext}`, thumbnail, {
        upsert: true,
        cacheControl: "3600",
      });

  if (thumbnailError) {
    return {
      status: 500,
      error: thumbnailError,
    };
  }

  const { data: thumbnailPublicUrl } = await client.storage
    .from("contactThumbnails")
    .getPublicUrl(thumbnailResponse.path);

  const { data: contact, error: contactError } = await client
    .from("contact")
    .update({
      thumbnail: thumbnailPublicUrl.publicUrl,
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
