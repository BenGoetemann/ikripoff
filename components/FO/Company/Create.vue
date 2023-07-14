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
      required
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
    <h3>Adresse</h3>
    <UIInputText
      type="text"
      name="Straße"
      :value="street.value"
      :loading="isPending"
      :disabled="disabled"
      @update="(e) => (street.value = e)"
      :error-message="street.errorMsg"
    />
    <UIInputText
      type="text"
      name="Hausnummer"
      :value="streetNumber.value"
      :loading="isPending"
      :disabled="disabled"
      @update="(e) => (streetNumber.value = e)"
      :error-message="streetNumber.errorMsg"
    />
    <UIInputText
      type="text"
      name="PLZ"
      :value="postalCode.value"
      :loading="isPending"
      :disabled="disabled"
      @update="(e) => (postalCode.value = e)"
      :error-message="postalCode.errorMsg"
    />
    <UIInputText
      class="safe-area-b"
      type="text"
      name="Stadt"
      :value="city.value"
      :loading="isPending"
      :disabled="disabled"
      @update="(e) => (city.value = e)"
      :error-message="city.errorMsg"
    />
    <UIButtonPrimary
      :disabled="disabled"
      icon="user-plus"
      shrink
      @click="updateOrCreateProfile"
      text="Unternehmen erstellen"
    />
    <!-- <p class="error-message" v-if="errorMsg">{{ errorMsg }}</p> -->
  </form>
</template>

<script setup lang="ts">
const router = useRouter();

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

const image = ref({
  value: "",
  preloadedValue: "",
  errorMsg: "",
});

const street: Ref<InputRef<string>> = ref({
  value: "",
  errorMsg: "",
});

const streetNumber: Ref<InputRef<string>> = ref({
  value: "",
  errorMsg: "",
});

const postalCode: Ref<InputRef<string>> = ref({
  value: "",
  errorMsg: "",
});

const city: Ref<InputRef<string>> = ref({
  value: "",
  errorMsg: "",
});

const updateOrCreateProfile = async () => {
  resetErrorMessages();
  disabled.value = true;

  let formData = new FormData();

  formData.append("website", website.value.value);
  formData.append("name", name.value.value);
  formData.append("email", email.value.value);
  formData.append("phone", phone.value.value);
  // formData.append("thumbnail", image.value.value);
  formData.append("street", street.value.value);
  formData.append("streetNumber", streetNumber.value.value);
  formData.append("postalCode", postalCode.value.value);
  formData.append("city", city.value.value);

  // error handling
  if (!validateInputs()) {
    disabled.value = false;
    return;
  }

  // request
  const { data, pending, error }: any = await useFetch("../api/company/create", {
    method: "POST",
    body: formData,
  });

  let ok = data.value.status === 200;

  useFormToast(
    !ok,
    "Das Unternehmen wurde erfolgreich erstellt.",
    "Das Unternehmen konnte nicht erstellt werden. "
  );

  if (ok) await navigateTo("/unternehmen");

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

  if (useUrlSpotter(street.value.value)) {
    const errorMessage = "Bitte geben Sie einen gültigen Straßennamen an.";
    street.value.errorMsg = errorMessage;
    errorMessages.value.push(errorMessage);
  }

  if (useUrlSpotter(streetNumber.value.value)) {
    const errorMessage = "Bitte geben Sie eine gültige Hausnummer an.";
    streetNumber.value.errorMsg = errorMessage;
    errorMessages.value.push(errorMessage);
  }

  if (useUrlSpotter(postalCode.value.value)) {
    const errorMessage = "Bitte geben Sie eine gültige Postleitzahl an.";
    postalCode.value.errorMsg = errorMessage;
    errorMessages.value.push(errorMessage);
  }

  if (useUrlSpotter(city.value.value)) {
    const errorMessage = "Bitte geben Sie eine gültige Stadt an.";
    city.value.errorMsg = errorMessage;
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
  street.value.errorMsg = "";
  streetNumber.value.errorMsg = "";
  postalCode.value.errorMsg = "";
  city.value.errorMsg = "";
};
</script>

<style lang="css" scoped></style>
