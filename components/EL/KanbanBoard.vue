<template>
  <div class="kanban-container">
    <div class="kanban-board">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="css" scoped>
.kanban-container {
  @apply w-full overflow-x-auto safe-area-b;
}

.kanban-board {
  @apply flex flex-nowrap gap-1 safe-area-l;
}
</style>
