<template>
  <div class="page-wrapper">
    <nav>
      <ELNavBar />
    </nav>
    <main>
      <slot></slot>
    </main>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="css" scoped>
.page-wrapper {
  @apply flex flex-row justify-start items-start;
}

main {
  @apply safe-area-t safe-area-b flex-col-start flex-grow overflow-auto h-screen;
}
</style>
