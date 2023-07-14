export default defineNuxtRouteMiddleware((to, from) => {
  const user = useSupabaseUser();
  const userStore = useUserStore();

  if (!user.value) return;

  if (user.value.email?.includes("@financesoft.de")) {
    userStore.setIsAdmin(true);
  } else {
    userStore.setIsAdmin(false);
  }
});
