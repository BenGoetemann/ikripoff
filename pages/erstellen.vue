<template>
  <LOOverview>
    <template #header>
      <ELBreadcrumb />
      <UIButtonPrimary shrink icon="plus" text="Objekt anlegen" />
    </template>
    <template #main>
      <UIContainerFluid>
        <UIContainerBorder>
          <FOCreateNewProfile class="safe-area-b" />
        </UIContainerBorder>
      </UIContainerFluid>
    </template>
  </LOOverview>
</template>

<script setup lang="ts">
const propertyStore = usePropertyOverviewStore();

definePageMeta({ middleware: ["auth", "user-has-no-profile"] });
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
