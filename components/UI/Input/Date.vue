<template>
  <div class="input-wrapper">
    <label :for="underlineSpaces(name)"
      ><p>
        {{ capitalizeWords(name) }} {{ required ? "" : "- optional" }}
      </p></label
    >
    <input
      class="input"
      type="date"
      :disabled="disabled"
      :class="{ error: hasError, loading: isLoading, disabled: isDisabled }"
      autocomplete="bday"
      :required="required"
      :name="underlineSpaces(name)"
      :ref="underlineSpaces(name)"
      v-model="inputValue"
    />
    <p class="error-message" v-if="hasError">{{ errorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { Ref } from "@vue/runtime-dom";

const emit = defineEmits(["update"]);

const props = defineProps<{
  name: string;
  required?: boolean;
  errorMessage?: string;
  value?: string;
  loading?: boolean;
  disabled?: boolean;
}>();

const inputValue: Ref<string | undefined> = ref("");
const hasError = ref(props.errorMessage);
const isLoading = ref(props.loading);
const isDisabled = ref(props.disabled);

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
