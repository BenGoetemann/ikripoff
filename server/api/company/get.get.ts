import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";

export default defineEventHandler(async (event) => {

  console.log("hello from get company")


  const query = getQuery(event);
  const client = serverSupabaseClient(event);

  console.log(query)

  const { data, error } = await client
    .from("company")
    .select('*')
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
