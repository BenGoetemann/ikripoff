<template>
  <div class="checkbox-wrapper">
    <input
      class="checkbox"
      :class="{ error: hasError }"
      type="radio"
      :value="underlineSpaces(name)"
      :required="required"
      name="radio"
      :id="underlineSpaces(name)"
      :ref="underlineSpaces(name)"
      v-model="inputValue"
    />
    <p><slot></slot></p>
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
  emit("update", inputValue.value);
});

watch(
  () => props.error,
  (state) => {
    hasError.value = state;
  }
);
watch(
  () => inputValue.value,
  (state) => {
    console.log(state);
  }
);
</script>

<style lang="css" scoped>.checkbox-wrapper {
  @apply flex-row-center gap-3;
}
.checkbox {
  @apply rounded-md w-8 h-8 border-stone-200 bg-stone-200;
  @apply focus:ring-0 checked:bg-black;
}

p {
  @apply text-[.7rem];
}

.error {
  @apply border-red-500 text-red-500;
}
</style>
