<template>
  <span v-if="userStore.getIsAdmin">
    <slot></slot>
  </span>
</template>

<script setup lang="ts">

const userStore = useUserStore()

</script>

<style scoped></style>
