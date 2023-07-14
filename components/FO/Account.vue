<template>
  <form @submit.prevent novalidate>
    <h3>Account</h3>
    <UIInputText
      type="text"
      name="email"
      required
      :value="email.value"
      :loading="isPending"
      :disabled="disabled"
      @update="(e) => (email.value = e)"
      :error-message="email.errorMsg"
    />
    <UIButtonPrimary
      :disabled="disabled"
      icon="key"
      shrink
      @click="update"
      text="E-Mail aktualisieren"
    />
    <UIButtonPrimary
      :disabled="disabled"
      icon="key"
      attention
      shrink
      @click="resetPassword"
      text="Passwort zurücksetzen"
    />
    <UIButtonPrimary
      @click="deleteAccount"
      attention
      shrink
      icon="trash"
      text="Account löschen"
      class="safe-area-b"
    />
    <!-- <p class="error-message" v-if="errorMsg">{{ errorMsg }}</p> -->
  </form>
</template>

<script setup lang="ts">
import { useToast } from "vue-toastification";
import { useUrlSpotter } from "~/composables/useFormHelper";
import { useFormToast } from "~/composables/useToastHelper";
const route = useRoute();
const user = useSupabaseUser();
const { auth } = useSupabaseAuthClient();

const props = defineProps<{
  data: any;
}>();

onMounted(() => {
  fillValues();
});

const fillValues = () => {
  email.value.value = user.value.email;
};

// Feedback
const errorMsg = ref();
const disabled = ref(false);
const isPending = ref(false);

// Inputs
const email: Ref<InputRef<string>> = ref({
  value: "",
  errorMsg: "",
});

const resetPassword = async () => {
  if (confirm("Passwort wirklich zurücksetzen?") === true) {
    const { data, pending, error } = await useFetch(
      "api/account/resetPassword",
      {
        method: "POST",
      }
    );
    useFormToast(
      data.value.error,
      "Passwort-Reset E-Mail wurde versendet",
      "Passwort zurücksetzen fehlgeschlagen"
    );
  }
};

const deleteAccount = async () => {
  if (
    confirm(
      "Account wird samt aller Anzeigen und Konversationen unwiderruflich gelöscht. Wirklich fortfahren?"
    ) === false
  )
    return;
  const data: any = await $fetch("api/account/delete", {
    method: "POST",
    body: JSON.stringify({
      id: user.value!.id,
    })
  }).then((res) => {
    signOutUser();
  }).catch((err) => {
    console.log(err);
  });
};

const update = async () => {
  disabled.value = true;

  // error handling
  if (!validateInputs()) {
    disabled.value = false;
    return;
  }

  const { data: accountData, error: accountError } = await auth.updateUser({
    email: email.value.value,
  });

  if (!accountError) {
    useToast().success("Bestätigungs-E-Mail wurde versendet");
  } else {
    useToast().error("Kontoaktualisierung fehlgeschlagen");
  }

  disabled.value = false;
};

const validateInputs = () => {
  const errorMessages = ref([] as string[]);

  if (!email.value.value) {
    const errorMessage = "Bitte gib eine E-Mail Adresse an.";
    email.value.errorMsg = errorMessage;
    errorMessages.value.push(errorMessage);
  }

  if (
    !useEmailValidator(email.value.value) ||
    useUrlSpotter(email.value.value)
  ) {
    const errorMessage = "Bitte gib eine gültige E-Mail Adresse an.";
    email.value.errorMsg = errorMessage;
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