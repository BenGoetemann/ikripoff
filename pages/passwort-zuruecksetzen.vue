<template>
  <UIContainerFluid>
    <UIContainerBorder>
      <section class="reset-section">
        <FOPasswordReset />
      </section>
    </UIContainerBorder>
  </UIContainerFluid>
</template>

<script setup lang="ts">
definePageMeta({ middleware: "auth" });
</script>

<style lang="css" scoped></style>
