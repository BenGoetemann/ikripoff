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
          <UIListProjectItem
            v-if="projectData.data"
            :item="projectData.data[0]"
          />
        </UIContainerBorder>
      </UIContainerFluid>
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
      <ELListView>
        <UIListAssetItem
          v-for="(asset, index) in folderData.assets"
          :key="index"
          :item="asset"
        />
      </ELListView>
    </template>
  </LOOverview>
</template>

<script setup lang="ts">
const route = useRoute();
const projectStore = useProjectOverviewStore();

const {
  data: projectData,
  pending: projectPending,
  error: projectError,
} = await useFetch(`/api/projects/get`, {
  method: "GET",
  query: {
    id: route.params.slug,
  },
});

const {
  data: folderData,
  pending: folderPending,
  error: folderError,
} = await useFetch(`/api/folders/aggregateByProjectId`, {
  method: "GET",
  query: {
    projectId: route.params.slug,
  },
});

if (projectData.value.error || folderData.value.error) {
  useErrorToast("Projekt nicht gefunden");
}

definePageMeta({ middleware: ["auth", "user-has-profile"] });
</script>

<style lang="css" scoped>
h1 {
  @apply text-xl font-bold;
  font-family: "Staff-X-Wide", sans-serif;
  font-weight: 700;
  text-transform: uppercase;
}
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
