<template>
  <form @submit.prevent novalidate>
    <h3>Person</h3>
    <UIInputDropdown
      name="Anrede"
      :value="salutation.value"
      @update="(e) => (salutation.value = e)"
      :error-message="salutation.errorMsg"
      required
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
  :options="titleTypeOptions"
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
    <UIInputText
      type="text"
      name="Kontakt E-Mail Adresse"
      :value="email.value"
      :loading="isPending"
      :disabled="disabled"
      @update="(e) => (email.value = e)"
      :error-message="email.errorMsg"
    />
    <UIButtonPrimary
      :disabled="disabled"
      icon="user"
      shrink
      @click="update"
      text="Person aktualisieren"
    />
    <p class="error-message" v-if="errorMsg">{{ errorMsg }}</p>
  </form>
</template>

<script setup lang="ts">
import { useUrlSpotter } from "~/composables/useFormHelper";
import { useFormToast } from "~/composables/useToastHelper";

const route = useRoute();

const titleTypeOptions: Option<Title>[] = [
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


const props = defineProps<{
  data: any;
}>();

onMounted(() => {
  fillPreloadedValues();
});

const fillPreloadedValues = () => {
  if (props.data.data.length > 0) {
    const contact = props.data.data[0];

    console.log(contact);

    title.value.value = contact.title;
    salutation.value.value = contact.salutation;
    firstName.value.value = contact.firstName;
    lastName.value.value = contact.lastName;
    phone.value.value = contact.phone;
    mobilePhone.value.value = contact.mobilePhone;
    company.value.value = contact.company;
    website.value.value = contact.website;
    email.value.value = contact.email;
  }
};

// Feedback

const errorMsg = ref();
const disabled = ref(false);
const isPending = ref(false);

// Inputs

const title: Ref<InputRef<Title | "">> = ref({
  value: "",
  errorMsg: "",
});


const salutation: Ref<InputRef<Salutation  | "">> = ref({
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

const email: Ref<InputRef<string>> = ref({
  value: "",
  errorMsg: "",
});

const update = async () => {
  resetErrorMessages();
  disabled.value = true;

  let formData = new FormData();

  formData.append("salutation", salutation.value.value);
  formData.append("title", title.value.value);
  formData.append("firstName", firstName.value.value);
  formData.append("lastName", lastName.value.value);
  formData.append("phone", phone.value.value);
  formData.append("mobilePhone", mobilePhone.value.value);
  formData.append("company", company.value.value);
  formData.append("website", website.value.value);
  formData.append("email", email.value.value);
  // error handling
  if (!validateInputs()) {
    disabled.value = false;
    return;
  }

  // request
  const { data, pending, error } = await useFetch("api/contact/information", {
    method: "POST",
    body: formData,
  });

  useFormToast(
    data.value.error,
    "Ihre Kontaktdaten wurden aktualisiert",
    "Ihre Kontaktdaten konnten nicht aktualisiert werden. Grund: "
  );

  isPending.value = pending.value;

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

  if (useUrlSpotter(phone.value.value)) {
    const errorMessage = "Bitte gib eine gültige Telefonnummer an.";
    phone.value.errorMsg = errorMessage;
    errorMessages.value.push(errorMessage);
  }

  if (useUrlSpotter(mobilePhone.value.value)) {
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

const resetErrorMessages = () => {
  errorMsg.value = "";
  title.value.errorMsg = "";
  salutation.value.errorMsg = "";
  firstName.value.errorMsg = "";
  lastName.value.errorMsg = "";
  phone.value.errorMsg = "";
  mobilePhone.value.errorMsg = "";
  company.value.errorMsg = "";
  website.value.errorMsg = "";
  email.value.errorMsg = "";
};
</script>

<style lang="css" scoped></style>