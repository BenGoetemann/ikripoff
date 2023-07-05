<template>
  <form v-if="status === 'default'" @submit.prevent novalidate>
    <UIInputText
      type="email"
      name="E-Mail Adresse"
      required
      @update="(e) => (email.value = e)"
      :error-message="email.errorMsg"
    />
    <UIInputText
      type="password"
      name="Passwort"
      required
      autocomplete="new-password"
      @update="(e) => (password.value = e)"
      :error-message="password.errorMsg"
    />
    <UIInputText
      type="password"
      name="Passwort bestätigen"
      required
      autocomplete="new-password"
      @update="(e) => (passwordConfirmation.value = e)"
      :error-message="passwordConfirmation.errorMsg"
    />
    <UIInputCheckbox
      name="Privacy"
      required
      @update="(e) => (privacyConsent.value = e)"
      :error="privacyConsent.error"
    >
      Ich stimme zu, dass ich die Datenschutzerklärung gelesen und akzeptiert habe.
    </UIInputCheckbox>
    <UIButtonPrimary
      :disabled="disabled"
      icon="user-plus"
      shrink
      @click="signUpWithEmail()"
      text="Registrieren"
    />
    <!-- <p class="error-message" v-if="errorMsg">{{ errorMsg }}</p> -->
  </form>
  <div v-else-if="status === 'success'">
    <UIIcon name="check-circle" size="2x" />
    <p class="success-message">
      Bitte bestätige deine E-Mail-Adresse, indem du auf den Link in der E-Mail klickst, die wir dir gerade gesendet haben.
    </p>
  </div>

</template>

<script setup lang="ts">
const errorMsg = ref();
const status = ref("default");
const disabled = ref(false);

// Inputs

const email: Ref<InputRef<string>> = ref({
  value: "",
  errorMsg: "",
});

const password: Ref<InputRef<string>> = ref({
  value: "",
  errorMsg: "",
});

const passwordConfirmation: Ref<InputRef<string>> = ref({
  value: "",
  errorMsg: "",
});

const privacyConsent: Ref<InputRef<string>> = ref({
  value: false,
  error: false,
});

const signUpWithEmail = async () => {
  const loginRequest = {
    email: email.value.value,
    password: password.value.value,
  };

  disabled.value = true;

  // error handling

  if (!validateInputs()) {
    disabled.value = false;
    return;
  }

  // request

  const { error } = await signUpUser(loginRequest);

  useFormToast(error, "Eine Bestätigungsmail wurde an deine E-Mail-Adresse gesendet.", "Versenden der Bestätigungsmail fehlgeschlagen: ")

  if(!error) {
    status.value = "success";
  }
  disabled.value = false;
};

const validateInputs = () => {
  const errorMessages = ref([] as string[]);

  if (!email.value.value) {
    const errorMessage = "Please provide your email address.";
    email.value.errorMsg = errorMessage;
    errorMessages.value.push(errorMessage);
  }

  if (!password.value.value) {
    const errorMessage = "Please provide a password.";
    password.value.errorMsg = errorMessage;
    errorMessages.value.push(errorMessage);
  }

  if (!passwordConfirmation.value.value) {
    const errorMessage = "Please confirm your password.";
    passwordConfirmation.value.errorMsg = errorMessage;
    errorMessages.value.push(errorMessage);
  }

  if (password.value.value !== passwordConfirmation.value.value) {
    const errorMessage = "Your confirmation password doesn't match.";
    passwordConfirmation.value.errorMsg = errorMessage;
    errorMessages.value.push(errorMessage);
  }

  if (!privacyConsent.value.value) {
    privacyConsent.value.error = true;
    errorMessages.value.push("Please agree the privacy agreement.");
  }

  if (errorMessages.value.length !== 0) {
    errorMsg.value = errorMessages.value.join(" ");
    return false;
  }
  return true;
};
</script>

<style lang="css" scoped></style>