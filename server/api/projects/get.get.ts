import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const client = serverSupabaseClient(event);
  const user = await serverSupabaseUser(event); 

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


    const { data: contact, error: contactError }: any = await client
    .from("contact")
    .select("*")
    .eq("id", user!.id);

  // check if user is related to project

  const isProjectRelatedToUser: boolean[] = [];

  for (const e of data[0].projectToCompany) {
    if (e.companyId === contact[0].companyId) {
      isProjectRelatedToUser.push(true);
    }
  }

  // grant access for admin users

  if (user!.email?.includes(process.env.ADMIN_EMAIL as string)) {
    isProjectRelatedToUser.push(true);
    console.log("admin user")
  }

  if (!isProjectRelatedToUser.includes(true)) {
    return {
      status: 403,
      data: null,
      assets: null,
      error: "Unauthorized",
    };
  }


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
