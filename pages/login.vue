<template>
  <UIContainerFluid>
    <UIContainerBorder>
      <section class="signup-section">
          <FOLogin />
        <NuxtLink to="/signup"
          ><p class="text-sm mt-2">
            Not A Member? <span>Sign Up For Free!</span>
          </p></NuxtLink
        >
      </section>
    </UIContainerBorder>
  </UIContainerFluid>
</template>

<script setup lang="ts">
const user = useSupabaseUser();
const client = useSupabaseAuthClient();
const router = useRouter();
const userStore = useUserStore();

const loginFormVisible = ref(false);

const loginWithGoogle = async (provider: "google") => {
  // TODO: Abstract in Composable
  const { error } = await client.auth.signInWithOAuth({ provider });
  if (error) {
    return alert("Something went wrong!");
  }
};

const showLoginForm = () => {
  loginFormVisible.value = !loginFormVisible.value;
};

watch(user, () => {
  if (user.value) {
    router.push("/immobilien");
    userStore.setIsAutheticated(true);
  }
});

definePageMeta({ middleware: "user-logged-in" });
</script>

<style lang="css" scoped>

</style>
