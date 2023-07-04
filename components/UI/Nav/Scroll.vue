<template>
  <nav class="scroll-menu">
    <slot></slot>
  </nav>
</template>

<style lang="css" scoped>.scroll-menu {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  @apply overflow-auto whitespace-nowrap;
  @apply flex md:gap-4 mb-10 w-full items-center;
  @apply pl-[calc((100%-91.666667%)/2)] pr-[calc((100%-91.666667%)/2)];
  @apply 2xl:pl-[calc((100%-90rem)/2)] 2xl:pr-[calc((100%-90rem)/2)];

  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
