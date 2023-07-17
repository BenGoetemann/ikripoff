import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const body = await readMultipartFormData(event);
  const client = serverSupabaseClient(event);
  const user = await serverSupabaseUser(event);

  const { data: contact, error: contactError }: any = await client
    .from("contact")
    .select("*")
    .eq("id", user!.id);

  console.log("user ======> ", user);

  const { data: projects, error: projectError }: any = await client.from(
    "project"
  ).select(`
    *,
    projectToFolder (
        *
        ),
    projectToCompany (
            *
        )
    `);

  if (projectError) {
    return {
      status: 500,
      data: null,
      error: projectError,
    };
  }

  if (user!.email?.includes("@financesoft.de")) {
    return {
      status: 200,
      data: projects,
      error: projectError,
    };
  }

  const projectArr: any = [];

  for (const project of projects) {
    for (const e of project.projectToCompany) {
      if (e.companyId === contact[0].companyId) {
        projectArr.push(project);
      }
    }
  }

  return {
    status: 200,
    data: projectArr,
    error: projectError,
  };
});
