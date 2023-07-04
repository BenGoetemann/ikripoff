<template>
  <UIContainerFluid>
    <UIContainerBorder>
      <FOSignup />
    </UIContainerBorder>
  </UIContainerFluid>
</template>

<script setup lang="ts">
definePageMeta({ middleware: "user-logged-in" });
</script>

<style lang="css" scoped></style>