<template>
  <form @submit.prevent novalidate>
    <UIInputText
      type="password"
      name="Password"
      required
      autocomplete="new-password"
      @update="(e) => (password.value = e)"
      :error-message="password.errorMsg"
    />
    <UIInputText
      type="password"
      name="Confirm Password"
      required
      autocomplete="new-password"
      @update="(e) => (passwordConfirmation.value = e)"
      :error-message="passwordConfirmation.errorMsg"
    />
    <UIButtonPrimary
      :disabled="disabled"
      icon="key"
      shrink
      @click="update"
      text="Passwort zurücksetzen"
    />
    <p class="error-message" v-if="errorMsg">{{ errorMsg }}</p>
  </form>
</template>

<script setup lang="ts">
const { auth } = useSupabaseAuthClient();
const user = useSupabaseUser();
const router = useRouter();

// Feedback

const errorMsg = ref();
const status = ref();
const disabled = ref(false);

const password = ref({
  value: "",
  errorMsg: "",
});

const passwordConfirmation = ref({
  value: "",
  errorMsg: "",
});

const update = async () => {
  const loginRequest = {
    password: password.value.value,
    passwordConfirmation: password.value.value,
  };

  disabled.value = true;

  // error handling

  if (!validateInputs()) {
    disabled.value = false;
    return;
  }

  // request

  const { data, error } = await auth.updateUser({
    password: password.value.value,
  });

  useSimpleToast(
    error,
    "Passwort erfolgreich geändert",
    "Passwort zurücksetzen fehlgeschlagen: "
  );

  if (!error) {
    router.push("/profil");
  }

  status.value = "";
  disabled.value = false;
};

const validateInputs = () => {
  const errorMessages = ref([] as string[]);

  if (!password.value.value) {
    const errorMessage = "Bitte gib ein neues Passwort an.";
    password.value.errorMsg = errorMessage;
    errorMessages.value.push(errorMessage);
  }

  if (password.value.value.length < 6) {
    const errorMessage = "Das Passwort muss mindestens 6 Zeichen beinhalten.";
    password.value.errorMsg = errorMessage;
    errorMessages.value.push(errorMessage);
  }

  if (!passwordConfirmation.value.value) {
    const errorMessage = "Bitte bestätige dein neues Passwort.";
    passwordConfirmation.value.errorMsg = errorMessage;
    errorMessages.value.push(errorMessage);
  }

  if (password.value.value !== passwordConfirmation.value.value) {
    const errorMessage = "Die Passwörter stimmen nicht überein.";
    passwordConfirmation.value.errorMsg = errorMessage;
    errorMessages.value.push(errorMessage);
  }

  if (errorMessages.value.length !== 0) {
    errorMsg.value = errorMessages.value.join(" ");
    return false;
  }
  return true;
};
</script>

<style lang="css" scoped></style>