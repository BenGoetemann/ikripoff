import {
  serverSupabaseClient,
  serverSupabaseUser,
  serverSupabaseServiceRole,
} from "#supabase/server";

export default defineEventHandler(async (event) => {
  // const query = getQuery(event);
  const client = serverSupabaseServiceRole(event);
  const body = await readBody(event);
  const userId = body.id;

  const { error: contactError } = await client
    .from("contact")
    .delete()
    .eq("id", userId);

  if (contactError) {
    return {
      status: 500,
      error: contactError,
    };
  }

  const { data: profileImageRemovalData, error: profileImageRemovalError } =
    await client.storage.from("contactThumbnails").remove([`${userId}.jpg`]);

  if (profileImageRemovalError) {
    return {
      status: 500,
      error: profileImageRemovalError,
    };
  }

  const { data, error } = await client.auth.admin.deleteUser(userId);

  return {
    status: 200,
    data,
    error,
  };
});
