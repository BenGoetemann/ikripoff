<template>
  <form @submit.prevent novalidate>
      <UIInputText
        type="email"
        required
        name="E-Mail"
        @update="(e) => (email = e)"
      />
      <UIInputText
        required
        type="password"
        name="Passwort"
        @update="(e) => (password = e)"
      />
      <UIButtonPrimary
        :disabled="disabled"
        icon="right-to-bracket"
        shrink
        @click="loginWithEmail()"
        text="Login"
      />
      <p class="error-message" v-if="errorMsg">{{ errorMsg }}</p>
  </form>
</template>

<script setup lang="ts">
const { auth } = useSupabaseAuthClient();

const email = ref();
const password = ref();
const errorMsg = ref();
const disabled = ref(false);

const loginWithEmail = async () => {
  disabled.value = true;

  const loginRequest = {
    email: email.value,
    password: password.value,
  };

  const { error } = await signInUser(loginRequest);

  disabled.value = false;

  if (error) errorMsg.value = error.message;
};
</script>

<style lang="css" scoped>
</style>
