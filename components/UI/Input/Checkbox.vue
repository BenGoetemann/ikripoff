<template>
  <div class="checkbox-wrapper">
    <input
      class="checkbox"
      :class="{ error: hasError }"
      type="checkbox"
      :required="required"
      :name="underlineSpaces(name)"
      :ref="underlineSpaces(name)"
      v-model="inputValue"
    />
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["update"]);

const props = defineProps<{
  name: string;
  required?: boolean;
  error?: boolean;
}>();

const inputValue = ref(false);
const hasError = ref(props.error);

onUpdated(() => {
  emit("update", inputValue.value ? "1" : "0");
});

watch(
  () => props.error,
  (state) => {
    hasError.value = state;
  }
);
</script>

<style lang="css" scoped>.checkbox-wrapper {
  @apply flex-row-center gap-5;
}

.error {
  @apply border-red-500 text-red-500;
}
</style>
