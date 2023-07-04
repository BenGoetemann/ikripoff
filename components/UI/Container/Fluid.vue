<template>
  <div class="fluidContainer">
    <slot></slot>
  </div>
</template>

<style lang="css" scoped>.fluidContainer {
  @apply w-full h-full flex justify-center items-center flex-col;
}
</style>