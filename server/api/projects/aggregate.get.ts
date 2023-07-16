import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";
import {
  useBackendFormValidator,
  useFormDataValue,
} from "~~/composables/useFormHelper";

export default defineEventHandler(async (event) => {
  const body = await readMultipartFormData(event);
  const client = serverSupabaseClient(event);

  const { data: project, error: projectError }: any = await client.from(
    "project"
  ).select(`
    *,
    projectToFolder (
        *
        ),
    projectToCompany (
        company (
            *
        )
        )
    `);

  if (projectError) {
    console.log(projectError);
    return {
      status: 500,
      data: null,
      error: projectError,
    };
  }

  return {
    status: 200,
    data: project,
    error: projectError,
  };
});
