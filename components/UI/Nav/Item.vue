<template>
  <div class="nav-item-wrapper group" :class="[active ? 'active' : 'inactive']">
    
    <img v-if="iconUrl" :src="useLocalAsset(iconUrl)" alt="Icon" />
    <p :class="hideText ? 'hideText' : 'showText'">
      {{ text }}
    </p>
  </div>
</template>

<script lang="ts" setup>

const props = defineProps<{
  text: string;
  iconUrl?: string;
  active?: boolean;
  hideText?: boolean;
}>();
</script>

<style lang="css" scoped>
.nav-item-wrapper {
  @apply cursor-pointer no-select flex flex-row justify-start items-center gap-3;
  font-family: 'Staff-X-Wide', sans-serif;
  font-weight: 700; 
  text-transform: uppercase;
  font-size: 14px;

}

.nav-item-wrapper img {
  @apply w-5 h-5;
}

p {
  @apply leading-[0rem] font-bold text-white;
}

img {
;
}

.active {
  @apply text-secondary;
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

.active .showText {
  @apply text-secondary;
}

</style>
