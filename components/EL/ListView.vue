<template>
  <section class="list-view-wrapper">
    <slot></slot>
  </section>
</template>

<script setup lang="ts"></script>

<style lang="css" scoped>
.list-view-wrapper {
  @apply w-full safe-area-b safe-area-t safe-area-l safe-area-r flex-col-start gap-5;
}
</style>
