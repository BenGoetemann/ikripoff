import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";

export default defineEventHandler(async (event) => {
  // const query = getQuery(event);
  const client = await serverSupabaseClient(event);
  const user = await serverSupabaseUser(event);

  const { data: contact, error: contactError } = await client
    .from("contact")
    .select(`*`)
    .eq("id", user.id);

  return {
    data: contact,
  };
});
