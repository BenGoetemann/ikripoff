<template>
    <div class="list-card-wrapper">
      <p>{{ item.name }}</p>
      <div class="button-section">
        <UIButtonPrimary
          @click="router.push(null)"
          text="Review"
          icon="edit"
        />
        <UIButtonPrimary
          @click="navigateTo(item.original, {
            external: true,
            open: {
                target: '_blank'
            }
          })"
          text="Download"
          icon="download"
        />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  const router = useRouter();
  
  const props = defineProps<{
    item: any;
  }>();
  </script>
  
  <style scoped>
  p {
    @apply text-3xl font-bold;
    font-family: "Staff-X-Wide", sans-serif;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 14px;
  }
  
  .list-card-wrapper {
    @apply w-full h-20 bg-decent p-5 flex flex-row justify-between items-center;
  }

  .button-section {
    @apply flex-row-start gap-3;
  }
  </style>
  