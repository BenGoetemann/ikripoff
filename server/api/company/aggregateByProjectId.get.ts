import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const client = serverSupabaseClient(event);
  const user = await serverSupabaseUser(event); // check if user is real user

  const { data, error } = await client
    .from("projectToCompany")
    .select(`*`)
    .eq("projectId", query.projectId);

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
