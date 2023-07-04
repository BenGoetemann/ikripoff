<template>
  <section class="overview-layout-wrapper">
    <header>
      <slot name="header"></slot>
    </header>
    <main>
      <slot name="main">
        
      </slot>
    </main>
  </section>
</template>

<script setup lang="ts"></script>

<style lang="css" scoped>
.overview-layout-wrapper {
  @apply w-full flex-col-start gap-[4.5rem];
}

header {
  @apply flex flex-row justify-between items-center w-full safe-area-l safe-area-r;
}

main {
  @apply flex-col-start w-full h-full;
}
</style>
