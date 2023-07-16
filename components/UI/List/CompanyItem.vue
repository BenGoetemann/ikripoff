<template>
  <div class="list-card-wrapper">
    <p>{{ item.name }}</p>
    <div>
      <UIButtonPrimary
        @click="router.push(`/unternehmen/${item.id}`)"
        text="Bearbeiten"
        icon="edit"
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
</style>
