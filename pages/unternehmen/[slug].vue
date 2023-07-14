<template>
  <LOOverview>
    <template #header>
      <ELBreadcrumb />
      <UIButtonPrimary shrink icon="plus" text="Projekt anfragen" />
    </template>
    <template #main>
      <UIContainerFluid>
        <UIContainerBorder>
          <FOCompanyUpdate :data="data" class="safe-area-b" />
        </UIContainerBorder>
      </UIContainerFluid>
    </template>
  </LOOverview>
</template>

<script setup lang="ts">
const route = useRoute();
const company = ref();

const { data, pending, error } = await useFetch(`/api/company/get`, {
  method: "GET",
  query: {
    id: route.params.slug,
  },
});

console.log("data", data);
</script>

<style scoped></style>
