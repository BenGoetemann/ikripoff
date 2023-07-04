<template>
  <div class="nav-item-wrapper group" :class="[active ? 'active' : 'inactive']">
    <img src="~assets/icons/window.svg" alt="" />
    <p :class="hideText ? 'hideText' : 'showText'">
      {{ text }}
    </p>
  </div>
</template>

<script lang="ts" setup>

const props = defineProps<{
  text: string;
  active?: boolean;
  hideText?: boolean;
}>();
</script>

<style lang="css" scoped>
.nav-item-wrapper {
  @apply cursor-pointer no-select flex flex-row justify-start items-center gap-3;
}

p {
  @apply group-hover:text-black leading-[0rem] font-bold;
}

img {
  @apply group-hover:filter-black;
}

.active {
  @apply text-black filter-black;
}

.inactive {
  @apply text-decent;
}

.hideText {
  @apply opacity-0 overflow-hidden transition-opacity duration-500;
}

.showText {
  @apply opacity-100 transition-opacity duration-500;
}
</style>
