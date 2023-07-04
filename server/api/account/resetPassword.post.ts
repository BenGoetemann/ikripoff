import {
  serverSupabaseClient,
  serverSupabaseUser,
  serverSupabaseServiceRole,
} from "#supabase/server";

export default defineEventHandler(async (event) => {
  // const query = getQuery(event);
  const client = serverSupabaseServiceRole(event);
  const body = await readBody(event);
  const user = await serverSupabaseUser(event);

  const { data, error } = await client.auth.resetPasswordForEmail(user.email, {
    redirectTo: "http://localhost:3000/passwort-zuruecksetzen",
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
