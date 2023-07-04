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
      type="number"
      :disabled="disabled"
      :class="{ error: hasError, disabled: isDisabled, loading: isLoading }"
      inputmode="numeric"
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
  name: string;
  required?: boolean;
  errorMessage?: string;
  autocomplete?: string;
  value?: number;
  disabled?: boolean;
  loading?: boolean;
  hideLabel?: boolean;
}>();

const inputValue: Ref<number | undefined> = ref();
const hasError = ref(props.errorMessage);
const isDisabled = ref(props.disabled);
const isLoading = ref(props.loading);

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
