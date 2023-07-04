<template>
  <div class="kanban-column">
    <h3>{{ name }}</h3>
    <div class="kanban-item-wrapper">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  name: string;
}>();
</script>

<style lang="css" scoped>
.kanban-column {
  @apply flex-shrink-0 min-w-[450px] p-1;

  > h3 {
    @apply text-2xl font-medium text-decent my-4;
  }

  > .kanban-item-wrapper {
    @apply flex flex-col gap-5;
  }
}
</style>
