<template>
  <form @submit.prevent novalidate>
    <h3>Person</h3>
    <UIInputDropdown
      name="Anrede"
      :value="salutation.value"
      @update="(e) => (salutation.value = e)"
      :error-message="salutation.errorMsg"
      :loading="isPending"
      :disabled="disabled"
      :options="[
        {
          value: 'Herr',
          label: 'Herr',
        },
        {
          value: 'Frau',
          label: 'Frau',
        },
        {
          value: 'Hallo',
          label: 'Hallo',
        },
      ]"
    />
    <UIInputDropdown
      name="Titel"
      :value="title.value"
      @update="(e) => (title.value = e)"
      :error-message="title.errorMsg"
      :loading="isPending"
      :disabled="disabled"
      :options="titleOptions"
    />

    <UIInputText
      type="text"
      name="Vorname"
      required
      :value="firstName.value"
      @update="(e) => (firstName.value = e)"
      :loading="isPending"
      :disabled="disabled"
      :error-message="firstName.errorMsg"
    />
    <UIInputText
      type="text"
      name="Nachname"
      required
      :value="lastName.value"
      :loading="isPending"
      :disabled="disabled"
      @update="(e) => (lastName.value = e)"
      :error-message="lastName.errorMsg"
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
    <UIInputText
      type="text"
      name="Handynummer"
      :value="mobilePhone.value"
      :loading="isPending"
      :disabled="disabled"
      @update="(e) => (mobilePhone.value = e)"
      :error-message="mobilePhone.errorMsg"
    />
    <UIInputText
      type="text"
      name="Unternehmen"
      :value="company.value"
      :loading="isPending"
      :disabled="disabled"
      @update="(e) => (company.value = e)"
      :error-message="company.errorMsg"
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
    <h3>Profilbild</h3>
    <UIInputImage
      :value="image.preloadedValue"
      @update="(e) => (image.value = e)"
      :error-message="image.errorMsg"
      :loading="isPending"
      name="profile picture"
    />
    <h3>Adresse</h3>
    <UIInputText
      type="text"
      name="Straße"
      required
      :value="street.value"
      :loading="isPending"
      :disabled="disabled"
      @update="(e) => (street.value = e)"
      :error-message="street.errorMsg"
    />
    <UIInputText
      type="text"
      name="Hausnummer"
      required
      :value="streetNumber.value"
      :loading="isPending"
      :disabled="disabled"
      @update="(e) => (streetNumber.value = e)"
      :error-message="streetNumber.errorMsg"
    />
    <UIInputText
      type="text"
      name="PLZ"
      required
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
      required
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
      text="Profil erstellen"
    />
    <!-- <p class="error-message" v-if="errorMsg">{{ errorMsg }}</p> -->
  </form>
</template>

<script setup lang="ts">
const user = useSupabaseUser();
const router = useRouter();

const titleOptions: Option<Title>[] = [
  {
    value: "dr.",
    label: "Dr.",
  },
  {
    value: "prof.",
    label: "Prof.",
  },
  {
    value: "prof. dr.",
    label: "Prof. Dr.",
  },
];

// Feedback

const errorMsg = ref();
const disabled = ref(false);
const isPending = ref(false);

// Inputs

const image = ref({
  value: "",
  preloadedValue: "",
  errorMsg: "",
});

const salutation: Ref<InputRef<Salutation | "">> = ref({
  value: "",
  errorMsg: "",
});

const title: Ref<InputRef<Title | "">> = ref({
  value: "",
  errorMsg: "",
});

const firstName: Ref<InputRef<string>> = ref({
  value: "",
  errorMsg: "",
});

const lastName: Ref<InputRef<string>> = ref({
  value: "",
  errorMsg: "",
});

const phone: Ref<InputRef<string>> = ref({
  value: "",
  errorMsg: "",
});

const mobilePhone: Ref<InputRef<string>> = ref({
  value: "",
  errorMsg: "",
});

const company: Ref<InputRef<string>> = ref({
  value: "",
  errorMsg: "",
});

const website: Ref<InputRef<string>> = ref({
  value: "",
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

  formData.append("id", user.value!.id);
  formData.append("salutation", salutation.value.value);
  formData.append("title", title.value.value);
  formData.append("profilePicture", image.value.value);
  formData.append("firstName", firstName.value.value);
  formData.append("lastName", lastName.value.value);
  formData.append("phone", phone.value.value);
  formData.append("mobilePhone", mobilePhone.value.value);
  formData.append("company", company.value.value);
  formData.append("website", website.value.value);
  formData.append("street", street.value.value);
  formData.append("streetNumber", streetNumber.value.value);
  formData.append("postalCode", postalCode.value.value);
  formData.append("city", city.value.value);

  // error handling
  if (!validateInputs()) {
    disabled.value = false;
    return;
  }

  console.log("test");

  // request
  const { data, pending, error } = await useFetch("api/contact/create", {
    method: "POST",
    body: formData,
  });

  console.log("data: ", data);

  useFormToast(
    data.value.error,
    "Ihr Profil wurde erfolgreich erstellt.",
    "Ihr Profil konnte nicht erstellt werden. Grund: "
  );

  router.push("/profil");

  disabled.value = false;
};

const validateInputs = () => {
  const errorMessages = ref([] as string[]);

  if (!salutation.value.value) {
    const errorMessage = "Bitte gib eine Anrede an.";
    salutation.value.errorMsg = errorMessage;
    errorMessages.value.push(errorMessage);
  }

  if (!firstName.value.value) {
    const errorMessage = "Bitte gib einen Vornamen an.";
    firstName.value.errorMsg = errorMessage;
    errorMessages.value.push(errorMessage);
  }

  if (useUrlSpotter(firstName.value.value)) {
    const errorMessage = "Bitte gib einen gültigen Vornamen an.";
    firstName.value.errorMsg = errorMessage;
    errorMessages.value.push(errorMessage);
  }

  if (!lastName.value.value) {
    const errorMessage = "Bitte gib einen Nachnamen an.";
    lastName.value.errorMsg = errorMessage;
    errorMessages.value.push(errorMessage);
  }

  if (useUrlSpotter(lastName.value.value)) {
    const errorMessage = "Bitte gib einen gültigen Nachnamen an.";
    lastName.value.errorMsg = errorMessage;
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

  if (
    phone.value.value &&
    (!usePhoneNumberValidator(mobilePhone.value.value) ||
      useUrlSpotter(mobilePhone.value.value))
  ) {
    const errorMessage = "Bitte gib eine gültige Mobilfunknummer an.";
    mobilePhone.value.errorMsg = errorMessage;
    errorMessages.value.push(errorMessage);
  }

  if (useUrlSpotter(company.value.value)) {
    const errorMessage = "Bitte gib einen gültigen Firmennamen an.";
    company.value.errorMsg = errorMessage;
    errorMessages.value.push(errorMessage);
  }

  if (website.value.value !== "" && !useUrlSpotter(website.value.value)) {
    const errorMessage = "Bitte gib eine gültige Website an.";
    website.value.errorMsg = errorMessage;
    errorMessages.value.push(errorMessage);
  }

  //////

  if (!street.value.value) {
    const errorMessage = "Bitte geben Sie einen Straßennamen an.";
    street.value.errorMsg = errorMessage;
    errorMessages.value.push(errorMessage);
  }

  if (useUrlSpotter(street.value.value)) {
    const errorMessage = "Bitte geben Sie einen gültigen Straßennamen an.";
    street.value.errorMsg = errorMessage;
    errorMessages.value.push(errorMessage);
  }

  if (!streetNumber.value.value) {
    const errorMessage = "Bitte geben Sie eine Hausnummer an.";
    streetNumber.value.errorMsg = errorMessage;
    errorMessages.value.push(errorMessage);
  }

  if (useUrlSpotter(streetNumber.value.value)) {
    const errorMessage = "Bitte geben Sie eine gültige Hausnummer an.";
    streetNumber.value.errorMsg = errorMessage;
    errorMessages.value.push(errorMessage);
  }

  if (!postalCode.value.value) {
    const errorMessage = "Bitte geben Sie eine Postleitzahl an.";
    postalCode.value.errorMsg = errorMessage;
    errorMessages.value.push(errorMessage);
  }

  if (useUrlSpotter(postalCode.value.value)) {
    const errorMessage = "Bitte geben Sie eine gültige Postleitzahl an.";
    postalCode.value.errorMsg = errorMessage;
    errorMessages.value.push(errorMessage);
  }

  if (!city.value.value) {
    const errorMessage = "Bitte geben Sie eine Stadt an.";
    city.value.errorMsg = errorMessage;
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
  salutation.value.errorMsg = "";
  firstName.value.errorMsg = "";
  lastName.value.errorMsg = "";
  street.value.errorMsg = "";
  streetNumber.value.errorMsg = "";
  postalCode.value.errorMsg = "";
  city.value.errorMsg = "";
};
</script>

<style lang="css" scoped></style>