<template>
  <div class="kanban-item"><slot></slot></div>
</template>

<script setup lang="ts"></script>

<style lang="css" scoped>
.kanban-item {
  @apply p-5 w-full bg-white shadow-lg hover:shadow-gray-200 shadow-gray-100 rounded-prominent border border-borders hover:cursor-pointer;
}
</style>
