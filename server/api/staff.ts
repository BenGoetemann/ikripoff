import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";
import {
  useBackendFormValidator,
  useFormDataValue,
} from "~~/composables/useFormHelper";

export default defineEventHandler(async (event) => {
  const body = await readMultipartFormData(event);
  const client = serverSupabaseClient(event);
  const user = await serverSupabaseUser(event);

  if (!user || !user?.email?.includes("@financesoft.de")) {
    return {
      status: 401,
      data: null,
      error: "Not Autheticated",
    };
  }

  return {
    status: 200,
    data: "Autheticated",
    error: null,
  };
});
