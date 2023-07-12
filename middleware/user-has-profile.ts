export default defineNuxtRouteMiddleware(async (to, from) => {
  const { data: contactResponse, error: contactError } = await useFetch(
    "/api/contact/get",
    {
      method: "GET",
    }
  );

  if (contactResponse.value.data?.length === 0) {
    return navigateTo("/profil/erstellen");
  }
});
