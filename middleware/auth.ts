export default defineNuxtRouteMiddleware(async (to, from) => {
    const user = useSupabaseUser();
  
    if (!user.value) {
      return navigateTo("/login");
    }
  
    const userStore = useUserStore();
    if (user.value) {
      userStore.setIsAutheticated(true);
    }
  });
  