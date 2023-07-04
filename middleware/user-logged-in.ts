export default defineNuxtRouteMiddleware((to, from) => {
  const user = useSupabaseUser();
  const userStore = useUserStore();

  if (user.value) {
    userStore.setIsAutheticated(true);
    return navigateTo("/immobilien");
  }
});
