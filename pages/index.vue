<template>
  <ELBreadcrumb />
</template>

<script setup lang="ts">
const navStore = useNavStore();
definePageMeta({ middleware: ["auth", "user-has-profile"] });
</script>

<style lang="css" scoped></style>
