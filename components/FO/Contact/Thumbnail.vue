<template>
  <form @submit.prevent novalidate>
    <h3>Profilbild</h3>
    <UIInputImage
      :value="image.preloadedValue"
      @update="(e) => (image.value = e)"
      :error-message="image.errorMsg"
      :loading="isPending"
      name="profile picture"
    />
    <UIButtonPrimary
      :disabled="disabled"
      icon="camera"
      shrink
      @click="update"
      text="Profilbild aktualisieren"
    />
    <p class="error-message" v-if="errorMsg">{{ errorMsg }}</p>
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
    const contact = props.data.data[0];
    const lastUpdatedAt = props.data.data[0].lastThumbnailUpdate;
    image.value.preloadedValue = contact.thumbnail + `?${useDateNow()}`;
  }
};

// Feedback

const errorMsg = ref();
const disabled = ref(false);
const isPending = ref(false);
// Inputs

const image = ref({
  value: undefined,
  preloadedValue: undefined,
  errorMsg: "",
});

const update = async () => {
  resetErrorMessages();
  disabled.value = true;

  let formData = new FormData();

  formData.append("profilePicture", image.value.value);

  // error handling
  if (!validateInputs()) {
    disabled.value = false;
    return;
  }

  // request
  const { data, pending, error } = await useFetch("api/contact/thumbnail", {
    method: "POST",
    body: formData,
  });

  isPending.value = pending.value;

  useFormToast(
    data.value.error,
    "Ihr Profilbild wurde aktualisiert",
    "Ihr Profilbild konnte nicht aktualisiert werden. Grund: "
  );

  disabled.value = false;
};

const validateInputs = () => {
  const errorMessages = ref([] as string[]);

  if (!image.value.value) {
    const errorMessage =
      "Sie müssen ein neues Profilbild wählen um es zu aktualisieren.";
    image.value.errorMsg = errorMessage;
    errorMessages.value.push(errorMessage);
  }

  if (errorMessages.value.length !== 0) {
    errorMsg.value = errorMessages.value.join(" ");
    return false;
  }
  return true;
};

const resetErrorMessages = () => {
  image.value.errorMsg = "";
  errorMsg.value = "";
};
</script>

<style lang="css" scoped></style>