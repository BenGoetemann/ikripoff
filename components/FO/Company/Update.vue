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
      type="text"
      name="Stadt"
      :value="city.value"
      :loading="isPending"
      :disabled="disabled"
      @update="(e) => (city.value = e)"
      :error-message="city.errorMsg"
    />

    <h3>Kontakte verwalten</h3>

    <section class="relation-wrapper">
      <div>
        <UIChipSelectable
          @toggle="tradeContact(contact)"
          v-for="(contact, index) in contacts"
          :key="index"
          :contact="contact"
        >
          {{
            contact.firstName +
            " " +
            contact.lastName +
            " <" +
            contact.email +
            ">"
          }}
        </UIChipSelectable>
      </div>

      <div>
        <UIChipSelectable
          @toggle="tradeContact(contact)"
          remove
          v-for="(contact, index) in contactsToCompany"
          :key="index"
          :contact="contact"
        >
          {{
            contact.firstName +
            " " +
            contact.lastName +
            " <" +
            contact.email +
            ">"
          }}
        </UIChipSelectable>
      </div>
    </section>

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
import { formatDiagnosticsWithColorAndContext } from "typescript";
import { useUrlSpotter } from "~/composables/useFormHelper";
import { useFormToast } from "~/composables/useToastHelper";

const route = useRoute();

const props = defineProps<{
  data: any;
}>();

const contactsToCompany: Ref<any> = ref(new Set());
const contacts: Ref<any> = ref(new Set());
const removeContacts: Ref<any> = ref(new Set());

const {
  data: contactsInCompanyResponse,
  pending: contactsInCompanyPending,
  error: contactsInCompanyError,
}: any = await useFetch("../api/contact/aggregateByCompanyId", {
  method: "GET",
  query: { companyId: route.params.slug },
});

const {
  data: contactsResponse,
  pending: contactsPending,
  error: contactsError,
}: any = await useFetch("/api/contact/aggregate", { method: "GET" });

onMounted(() => {
  fillPreloadedValues();

  if (contactsInCompanyResponse.value.data) {
    contactsInCompanyResponse.value.data.forEach((contact: any) => {
      contactsToCompany.value.add(contact);
    });
  }

  if (contactsResponse.value.data) {
    contactsResponse.value.data.forEach((contact: any) => {
      contacts.value.add(contact);
    });
  }
});

const tradeContact = (contact: any) => {
  if (contactsToCompany.value.has(contact)) {
    contactsToCompany.value.delete(contact);
    contacts.value.add(contact);
    removeContacts.value.add(contact);
  } else {
    contactsToCompany.value.add(contact);
    contacts.value.delete(contact);
    removeContacts.value.delete(contact);
  }
};

const fillPreloadedValues = () => {
  if (props.data.data.length > 0) {
    const company = props.data.data[0];
    name.value.value = company.name;
    website.value.value = company.website;
    email.value.value = company.email;
    phone.value.value = company.phone;
    street.value.value = company.street;
    streetNumber.value.value = company.streetNumber;
    postalCode.value.value = company.postalCode;
    city.value.value = company.city;
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

const street = ref({
  value: "",
  errorMsg: "",
});

const streetNumber = ref({
  value: "",
  errorMsg: "",
});

const postalCode = ref({
  value: "",
  errorMsg: "",
});

const city = ref({
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
  formData.append("street", street.value.value);
  formData.append("streetNumber", streetNumber.value.value);
  formData.append("postalCode", postalCode.value.value);
  formData.append("city", city.value.value);

  formData.append(
    "contacts",
    JSON.stringify(Array.from(contactsToCompany.value))
  );
  formData.append(
    "removeContacts",
    JSON.stringify(Array.from(removeContacts.value))
  );

  // error handling
  if (!validateInputs()) {
    disabled.value = false;
    return;
  }

  // request
  const { data, pending, error } = await useFetch("../api/company/update", {
    method: "POST",
    body: formData,
    query: { id: route.params.slug },
  });

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
