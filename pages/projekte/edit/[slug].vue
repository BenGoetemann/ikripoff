<template>
  <LOOverview>
    <template #header>
      <ELBreadcrumb />
      <WRAdmin>
        <UIButtonPrimary
          shrink
          icon="plus"
          text="Projekt anlegen"
          @click="navigateTo('/projekte/erstellen')"
        />
      </WRAdmin>
    </template>
    <template #main>
      <UIContainerFluid>
        <UIContainerBorder>
          <FOProjectsUpdate :data="data" class="safe-area-b" />
        </UIContainerBorder>
      </UIContainerFluid>
    </template>
  </LOOverview>
</template>

<script setup lang="ts">
const route = useRoute();

const { data, pending, error } = await useFetch(`/api/projects/get`, {
  method: "GET",
  query: {
    id: route.params.slug,
  },
});

definePageMeta({ middleware: ["auth", "user-has-profile"] });
</script>

<style lang="css" scoped>
.search-input-wrapper {
  @apply border-b border-t safe-area-l safe-area-r py-2 border-borders w-full;
  @apply flex flex-row justify-between items-center;

  > div {
    @apply flex flex-row items-center justify-start gap-2;
  }

  > nav {
    @apply flex flex-row-start gap-10;
  }
}
</style>
