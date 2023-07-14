<template>
  <div class="input-wrapper">
    <label :for="underlineSpaces(name)"
      ><p>
        {{ capitalizeWords(name) }} {{ required ? "" : "- optional" }}
      </p></label
    >
    <select
      class="input"
      :class="{ error: hasError, disabled: isDisabled, loading: isLoading }"
      autocomplete="bday"
      :disabled="disabled"
      :required="required"
      :name="underlineSpaces(name)"
      :ref="underlineSpaces(name)"
      v-model="inputValue"
    >
      <option value="" disabled selected>Select your option</option>
      <option
        v-for="(option, index) in options"
        :key="index"
        :value="option.value"
      >
        {{ capitalizeWords(option.label) }}
      </option>
    </select>
    <p class="error-message" v-if="hasError">{{ errorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["update"]);

const props = defineProps<{
  name: string;
  options: Option<any>[];
  required?: boolean;
  errorMessage?: string;
  value?: string;
  disabled?: boolean;
  loading?: boolean;
}>();

const inputValue = ref("");
const hasError = ref(props.errorMessage);
const isDisabled = ref(props.disabled);
const isLoading = ref(props.loading);

onUpdated(() => {
  emit("update", inputValue.value);
});

watch(
  () => props.errorMessage,
  (selection) => {
    hasError.value = selection;
  }
);

watch(
  () => props.value,
  (value) => {
    inputValue.value = value;
  }
);

watch(
  () => props.disabled,
  (value) => {
    isDisabled.value = value;
  }
);

watch(
  () => props.loading,
  (value) => {
    isLoading.value = value;
  }
);
</script>

<style lang="css" scoped>.error-message {
  @apply text-sm text-red-500;
}
</style>
