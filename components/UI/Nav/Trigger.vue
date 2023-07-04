<template>
  <div
    @click="navStore.trigger()"
    class="drawer-icon-wrapper"
    :class="
      navStore.open
        ? 'gap-0 w-10 h-10'
        : 'transition-all transform ease-in-out delay-300 gap-2'
    "
  >
    <div
      class="stripe transition-all transform ease-in-out"
      :class="[
        navStore.open
          ? 'absolute rotate-45 duration-300 '
          : 'duration-50 gap delay-100 rotate-0 ',
      ]"
    ></div>
    <div
      class="stripe transition-all transform ease-in-out"
      :class="[
        navStore.open
          ? 'absolute -rotate-45 duration-300 '
          : 'duration-50 gap-5 delay-100 rotate-0 ',
      ]"
    ></div>
  </div>
</template>

<script lang="ts" setup>
const navStore = useNavStore();

</script>

<style lang="css" scoped>.animation {
  @apply transform ease-in-out transition-all duration-300;
}

.drawer-icon-wrapper {
  @apply cursor-pointer relative flex flex-col justify-center items-center w-10 aspect-square;
}

.stripe {
  @apply h-px right-0 w-10 bg-black;
}
</style>
