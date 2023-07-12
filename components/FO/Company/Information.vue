<template>
  <form @submit.prevent novalidate>
    <h3>Unternehmen</h3>
    <UIInputText
      type="text"
      name="Name"
      required
      :value="name.value"
      @update="(e) => (name.value = e)"
      :loading="isPending"
      :disabled="disabled"
      :error-message="name.errorMsg"
    />
    <UIInputText
      type="text"
      name="Website"
      :value="website.value"
      :loading="isPending"
      :disabled="disabled"
      @update="(e) => (website.value = e)"
      :error-message="website.errorMsg"
    />
    <UIInputText
      type="text"
      name="E-Mail"
      :value="email.value"
      :loading="isPending"
      :disabled="disabled"
      @update="(e) => (email.value = e)"
      :error-message="email.errorMsg"
    />
    <UIInputText
      type="text"
      name="Telefonnummer"
      :value="phone.value"
      :loading="isPending"
      :disabled="disabled"
      @update="(e) => (phone.value = e)"
      :error-message="phone.errorMsg"
    />
    <UIButtonPrimary
      :disabled="disabled"
      icon="user"
      shrink
      @click="update"
      text="Aktualisieren"
    />
    <p class="error-message" v-if="errorMsg">{{ errorMsg }}</p>
  </form>
</template>

<script setup lang="ts">
import { useUrlSpotter } from "~/composables/useFormHelper";
import { useFormToast } from "~/composables/useToastHelper";

const route = useRoute();

const props = defineProps<{
  data: any;
}>();

onMounted(() => {
  fillPreloadedValues();
});

const fillPreloadedValues = () => {
  if (props.data.data.length > 0) {
    const company = props.data.data[0];
    name.value.value = company.name;
    website.value.value = company.website;
    email.value.value = company.email;
    phone.value.value = company.phone;
  }
};

// Feedback

const errorMsg = ref();
const disabled = ref(false);
const isPending = ref(false);

// Inputs

const name: Ref<InputRef<string>> = ref({
  value: "",
  errorMsg: "",
});

const website: Ref<InputRef<string>> = ref({
  value: "",
  errorMsg: "",
});

const email: Ref<InputRef<string>> = ref({
  value: "",
  errorMsg: "",
});

const phone: Ref<InputRef<string>> = ref({
  value: "",
  errorMsg: "",
});

const update = async () => {
  resetErrorMessages();
  disabled.value = true;

  let formData = new FormData();

  formData.append("website", website.value.value);
  formData.append("name", name.value.value);
  formData.append("email", email.value.value);
  formData.append("phone", phone.value.value);
  // error handling
  if (!validateInputs()) {
    disabled.value = false;
    return;
  }

  // request
  const { data, pending, error } = await useFetch("../api/company/information", {
    method: "POST",
    body: formData,
    query: { id: route.params.slug },
  });

  console.log(data)

  useFormToast(
    data.value.error,
    "Die Unternehmensdaten wurden aktualisiert",
    "Die Unternehmensdaten konnten nicht aktualisiert werden. Grund: "
  );

  isPending.value = pending.value;

  disabled.value = false;
};

const validateInputs = () => {
  const errorMessages = ref([] as string[]);

  if (!name.value.value) {
    const errorMessage = "Bitte gib einen Unternehmensnamen an.";
    name.value.errorMsg = errorMessage;
    errorMessages.value.push(errorMessage);
  }

  if (useUrlSpotter(name.value.value)) {
    const errorMessage = "Bitte gib einen gültigen Unternehmensnamen an.";
    name.value.errorMsg = errorMessage;
    errorMessages.value.push(errorMessage);
  }

  if (!email.value.value) {
    const errorMessage = "Bitte gib eine E-Mail Adresse an.";
    email.value.errorMsg = errorMessage;
    errorMessages.value.push(errorMessage);
  }

  if (useUrlSpotter(email.value.value)) {
    const errorMessage = "Bitte gib einen gültigen E-Mail Adresse an.";
    email.value.errorMsg = errorMessage;
    errorMessages.value.push(errorMessage);
  }

  if (website.value.value !== "" && !useUrlSpotter(website.value.value)) {
    const errorMessage = "Bitte gib eine gültige Website an.";
    website.value.errorMsg = errorMessage;
    errorMessages.value.push(errorMessage);
  }

  if (
    phone.value.value &&
    (!usePhoneNumberValidator(phone.value.value) ||
      useUrlSpotter(phone.value.value))
  ) {
    const errorMessage = "Bitte gib eine gültige Telefonnummer an.";
    phone.value.errorMsg = errorMessage;
    errorMessages.value.push(errorMessage);
  }

  if (errorMessages.value.length !== 0) {
    errorMsg.value = errorMessages.value.join(" ");
    return false;
  }
  return true;
};

const resetErrorMessages = () => {
  errorMsg.value = "";
  name.value.errorMsg = "";
  website.value.errorMsg = "";
  email.value.errorMsg = "";
  phone.value.errorMsg = "";
};
</script>

<style lang="css" scoped></style>