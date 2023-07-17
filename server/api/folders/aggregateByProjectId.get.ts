import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const client = serverSupabaseClient(event);
  const user = await serverSupabaseUser(event); // check if user is real user

  const { data, error }: any = await client
    .from("project")
    .select(
      `*,
        projectToFolder (
          *
        ), 
        projectToCompany (
          *
        )`
    )
    .eq("id", query.projectId);

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

  const assets: any[] = [];

  for (let folder of data[0].projectToFolder) {
    const assetQuery = new URLSearchParams({
      include_deleted: "false",
    }).toString();

    const assetId = folder.folderId;
    const resp = await fetch(
      `https://api.frame.io/v2/assets/${assetId}/children?${assetQuery}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + process.env.FRAME_IO_KEY,
        },
      }
    );
    const asset = await resp.text();
    const childFolder = JSON.parse(asset);

    // childFolders.push(childFolder);
    for (const asset of childFolder) {
      assets.push(asset);
    }
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
    assets,
    error,
  };
});
