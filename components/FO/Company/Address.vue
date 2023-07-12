<template>
  <form @submit.prevent novalidate>
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
      icon="location-dot"
      shrink
      @click="update"
      text="Addresse Aktualisieren"
    />
    <!-- <p class="error-message" v-if="errorMsg">{{ errorMsg }}</p> -->
  </form>
</template>

<script setup lang="ts">
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
  const { data, pending, error } = await useFetch("../api/company/address", {
    method: "POST",
    body: formData,
    query: {
      id: route.params.slug,
    },
  });

  console.log(data);

  isPending.value = pending.value;

  useFormToast(
    data.value.error,
    "Die Adresse wurde aktualisiert",
    "Die Adresse konnte nicht aktualisiert werden. Grund: "
  );

  disabled.value = false;
};

const validateInputs = () => {
  const errorMessages = ref([] as string[]);

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
  street.value.errorMsg = "";
  streetNumber.value.errorMsg = "";
  postalCode.value.errorMsg = "";
  city.value.errorMsg = "";
};
</script>

<style lang="css" scoped></style>
