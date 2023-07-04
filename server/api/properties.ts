import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  // const query = getQuery(event);
  const client = serverSupabaseClient(event);

  const { data: phases, error: phasesError } = await client
    .from("phase")
    .select(`*`)
    .eq("propertyRelevant", true);

  const { data: properties, error: propertiesError } = await client.from(
    "property"
  ).select(`
  *,
  address (
      *
  )
`);

console.log(properties, propertiesError)

  const obj: KanbanObject = {};

  phases.forEach((phase: Phase) => {
    obj[phase.id] = {
      id: phase.id,
      name: phase.name,
      items: [],
    };
  });
  // Merge Multiple Responses into one Object
  properties.forEach((property: RequestInterface) => {
    obj[property.phaseId].items.push(property);
  });
  // ---

  return {
    data: obj || {
      requestError: propertiesError,
      phaseError: phasesError,
    },
  };
});
