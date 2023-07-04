import {
  serverSupabaseServiceRole,
  serverSupabaseUser,
} from "#supabase/server";
import { useFormDataValue } from "~~/composables/useFormHelper";

export default defineEventHandler(async (event) => {
  const body = await readMultipartFormData(event);
  const client = serverSupabaseServiceRole(event);
  const user = await serverSupabaseUser(event); // check if user is real user

  const email = useFormDataValue("email", body);

  const { data, error } = await client
    .from("contact")
    .update({ email })
    .eq("id", user.id)
    .select("*");

  if (error) {
    return {
      status: 500,
      error,
    };
  }

  return {
    status: 200,
    data,
    error,
  };
});
