<template>
  <div class="input-wrapper">
    <label :for="underlineSpaces(name)"
      ><p>
        {{ capitalizeWords(name) }} {{ required ? "" : "- optional" }}
      </p></label
    >
    <textarea
      class="input"
      :class="{ error: hasError, disabled: isDisabled }"
      :required="required"
      :disabled="disabled"
      :placeholder="name"
      :name="underlineSpaces(name)"
      :ref="underlineSpaces(name)"
      :rows="5"
      v-model="inputValue"
    />
    <p class="error-message" v-if="hasError">{{ errorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["update"]);

const props = defineProps<{
  name: string;
  value?: string;
  required?: boolean;
  disabled?: boolean;
  errorMessage?: string;
}>();

const inputValue = ref("");
const hasError = ref(props.errorMessage);
const isDisabled = ref(props.disabled);

onUpdated(() => {
  emit("update", inputValue.value.trim());
});

watch(
  () => props.errorMessage,
  (selection) => {
    hasError.value = selection;
  }
);

watch(
  () => props.disabled,
  (value) => {
    isDisabled.value = value;
  }
);

watch(
  () => props.value,
  (value) => {
    inputValue.value = value;
  }
);
</script>

<style lang="css" scoped>
/* textarea {
  @apply w-full px-5 py-3 rounded-md;
  @apply bg-stone-200 border-2 border-stone-200;
} */

.error {
  @apply border-2 border-red-500;
}

.error-message {
  @apply text-sm text-red-500;
}
</style>
