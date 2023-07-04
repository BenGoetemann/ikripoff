import {
  serverSupabaseClient,
  serverSupabaseUser,
  serverSupabaseServiceRole,
} from "#supabase/server";

export default defineEventHandler(async (event) => {
  // const query = getQuery(event);
  const client = serverSupabaseServiceRole(event);
  const body = await readBody(event);

  const { data, error } = await client.auth.updateUser({
    email: body.email,
  });

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
