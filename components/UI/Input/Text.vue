<template>
  <div class="input-wrapper">
    <label v-if="!hideLabel" :for="underlineSpaces(name)"
      ><p>
        {{ capitalizeWords(name) }} {{ required ? "" : "- optional" }}
      </p></label
    >
    <input
      v-on:keydown.enter.prevent
      class="input"
      :type="type"
      :disabled="disabled"
      :class="{ error: hasError, disabled: isDisabled, loading: isLoading }"
      :inputmode="defineInputMode"
      :autocomplete="autocomplete ? autocomplete : defineAutocompleteMode"
      :required="required"
      :placeholder="capitalizeWords(name)"
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
  type: TextInput;
  name: string;
  required?: boolean;
  errorMessage?: string;
  autocomplete?: string;
  value?: string;
  disabled?: boolean;
  loading?: boolean;
  hideLabel?: boolean;
}>();

const inputValue: Ref<string | undefined> = ref("");
const hasError = ref(props.errorMessage);
const isDisabled = ref(props.disabled);
const isLoading = ref(props.loading);

const defineInputMode = computed(() => {
  switch (props.type) {
    case "email":
      return "email";
    case "number":
      return "numeric";
    case "tel":
      return "tel";
    case "url":
      return "url";
    case "search":
      return "search";
    default:
      return "text";
  }
});

const defineAutocompleteMode = computed(() => {
  switch (props.type) {
    case "email":
      return "email";
    case "password":
      return "current-password";
    default:
      return "on";
  }
});

onUpdated(() => {
  emit("update", inputValue.value);
});

watch(
  () => props.errorMessage,
  (selection) => {
    console.log(selection);
    hasError.value = selection;
  }
);

watch(
  () => props.value,
  (test) => {
    inputValue.value = test;
  }
);

watch(
  () => props.loading,
  (value) => {
    isLoading.value = value;
  }
);

watch(
  () => props.disabled,
  (value) => {
    isDisabled.value = value;
  }
);
</script>

<style lang="css" scoped>
</style>
