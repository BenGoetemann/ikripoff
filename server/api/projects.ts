import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";
import fetch from "node-fetch";

export default defineEventHandler(async (event) => {
  // const query = getQuery(event);
  const client = await serverSupabaseClient(event);
  const user = await serverSupabaseUser(event);
  
  // const query = new URLSearchParams({include: 'user_role'}).toString();

  // const accountId = process.env.FRAME_IO_ACCOUNT_ID;
  // const response = await fetch(
  //   `https://api.frame.io/v2/accounts/${accountId}/teams?${query}`,
  //   {
  //     method: 'GET',
  //     headers: {
  //       Authorization: `Bearer ${process.env.FRAME_IO_KEY}`
  //     }
  //   }
  // );

  const query = new URLSearchParams({
    'filter[archived]': 'all'
  }).toString();

  const teamId = process.env.FRAME_IO_TEAM_ID;
  const response = await fetch(
    `https://api.frame.io/v2/teams/${teamId}/projects?${query}`,
    {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + process.env.FRAME_IO_KEY,
      }
    }
  );
  const data = await response.text();

  // const { data: contact, error: contactError } = await client
  //   .from("contact")
  //   .select(`*`)
  //   .eq("id", user.id);

  return {
    data: JSON.parse(data),
  };
});
