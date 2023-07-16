import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";
import fetch from "node-fetch";

export default defineEventHandler(async (event) => {
  // const query = getQuery(event);
  const client = await serverSupabaseClient(event);
  const user = await serverSupabaseUser(event);

  const query = new URLSearchParams({
    "filter[archived]": "all",
  }).toString();

  const teamId = process.env.FRAME_IO_TEAM_ID;
  const response = await fetch(
    `https://api.frame.io/v2/teams/${teamId}/projects?${query}`,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + process.env.FRAME_IO_KEY,
      },
    }
  );
  const data = await response.text();
  const projects = JSON.parse(data);

  const rootFolders: any[] = [];

  for (let project of projects) {
    const assetQuery = new URLSearchParams({
      include_deleted: "true",
      type: "folder",
    }).toString();

    const assetId = project.root_asset_id;
    const resp = await fetch(
      `https://api.frame.io/v2/assets/${assetId}?${assetQuery}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + process.env.FRAME_IO_KEY,
        },
      }
    );
    const asset = await resp.text();
    const rootFolder = JSON.parse(asset);

    rootFolders.push(rootFolder);
  }

  const childFolders: any[] = [];

  for (let folder of rootFolders) {
    const assetQuery = new URLSearchParams({
      include_deleted: "true",
      type: "folder",
    }).toString();

    const assetId = folder.id;
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

    childFolders.push(childFolder);
  }

  return {
    data: childFolders,
  };
});
