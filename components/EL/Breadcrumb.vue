<template>
  <div class="breadcrup-menu-wrapper">
    {{ route.path }}
    </div>
</template>

<script setup lang="ts">
const route = useRoute();
const router = useRouter();
</script>

<style lang="css" scoped>

</style>