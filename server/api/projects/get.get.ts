import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const client = serverSupabaseClient(event);

  const { data, error } = await client
    .from("project")
    .select(
      `
    *,
    projectToFolder (
      *
    ),
    projectToCompany (
      *
    )
    `
    )
    .eq("id", query.id);

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
