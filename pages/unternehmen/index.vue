<template>
  <LOOverview>
    <template #header>
      <ELBreadcrumb />
      <UIButtonPrimary shrink icon="plus" text="Projekt anlegen" @click="navigateTo('/projekte/erstellen')" />
    </template>
    <template #main>
      <div class="flex-row-start mb-4 safe-area-l safe-area-r">
        <ELUIToggle type="tab" :store="projectStore" text="Übersicht" />
      </div>
      <div class="search-input-wrapper">
        <div>
          <icon class="text-xl" :icon="['fas', 'magnifying-glass']" />
          <UIInputSearch callToAction="Projekt suchen" name="Test" />
        </div>
        <nav>
          <ELUIToggle type="mode" :store="projectStore" text="List View" />
        </nav>
      </div>
      <ELListView v-if="projectStore.mode === 'list-view'">
        <UIListCompanyItem v-for="item in data.data" :key="item.id" :item="item" />
      </ELListView>
      <div class="safe-area-l">
        <UIButtonPrimary
          shrink
          icon="plus"
          text="Unternehmen erstellen"
          @click="navigateTo('unternehmen/erstellen')"
        />
      </div>
    </template>
  </LOOverview>
</template>

<script setup lang="ts">
const projectStore = useProjectOverviewStore();

const { data, pending, error }: any = await useFetch("/api/company/aggregate", {
  method: "GET",
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
