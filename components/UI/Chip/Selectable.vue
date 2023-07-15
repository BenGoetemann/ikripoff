<template>
  <div class="chip-selectable-wrapper">
    <p><slot></slot></p>
    <icon
      @click="toggle"
      v-if="remove"
      class="text-xl text-red-900"
      :icon="['fas', 'circle-minus']"
    />
    <icon
      @click="toggle"
      v-else
      class="text-xl text-primary"
      :icon="['fas', 'circle-plus']"
    />
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["toggle"]);

const props = defineProps<{
  remove: boolean;
}>();

const toggle = () => {
  emit("toggle");
};
</script>

<style scoped>
.chip-selectable-wrapper {
  @apply flex flex-row items-center justify-start gap-3 no-select;
}
</style>
