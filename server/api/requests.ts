import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  // const query = getQuery(event);
  const client = serverSupabaseClient(event);

  const { data: phases, error: phasesError } = await client
    .from("phase")
    .select(`*`)
    .eq("requestRelevant", true);

  const { data: requests, error: requestsError } = await client.from("request")
    .select(`
    *,
    contact (
      firstName,
      lastName,
      thumbnail
    ),
    property (
      *,
      address (
        *
      )
    )
  `);

  const obj: KanbanObject = {};

  phases.forEach((phase: Phase) => {
    obj[phase.id] = {
      id: phase.id,
      name: phase.name,
      items: [],
    };
  });
  // Merge Multiple Responses into one Object
  requests.forEach((request: RequestInterface) => {
    obj[request.phaseId].items.push(request);
  });
  // ---

  return {
    data: obj || {
      requestError: requestsError,
      phaseError: phasesError,
    },
  };
});
