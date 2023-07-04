<template>
  <button
    class="button-primary"
    :class="{
      disabled: isDisabled,
      success: isSuccess,
      attention: isAttention,
      shrink: isShrinking,
    }"
    :disabled="disabled"
  >
    <icon class="icon" :icon="['fas', icon]" />
    <p>{{ capitalizeWords(text) }}</p>
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  text: string;
  disabled?: boolean;
  icon: string;
  shrink?: boolean;
  success?: boolean;
  attention?: boolean;
}>();

const isDisabled = ref(props.disabled);
const isSuccess = ref(props.success);
const isAttention = ref(props.attention);
const isShrinking = ref(props.shrink);

watch(
  () => props.disabled,
  (selection) => {
    isDisabled.value = selection;
  }
);
</script>

<style lang="postcss">
.icon {
  @apply text-xl;
}

.button-primary {
  @apply pl-7 pr-8 py-3 w-full rounded-subtile font-bold flex-row-center gap-3;
  @apply bg-primary;
}

.success {
  @apply bg-green-300 text-black;
}

.attention {
  @apply bg-attention;
}

.disabled {
  @apply bg-stone-200 text-stone-500;
}

.shrink {
  @apply w-auto;
}
</style>
