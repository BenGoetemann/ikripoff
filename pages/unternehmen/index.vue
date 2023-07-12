<template>
  <LOOverview>
    <template #header>
      <ELBreadcrumb />
      <UIButtonPrimary shrink icon="plus" text="Projekt anfragen" />
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
          <!-- <ELUIToggle type="mode" :store="projectStore" text="Kanban Board" /> -->
          <ELUIToggle type="mode" :store="projectStore" text="List View" />
          <!-- <ELUIToggle type="mode" :store="projectStore" text="Filter" /> -->
        </nav>
      </div>
      <!-- <ELKanbanBoard v-if="!pending && projectStore.mode === 'kanban-board'">
        <UIKanbanColumn
          v-for="(item, index) in items"
          :key="index"
          :name="item.name"
        >
          <ELPropertyItem
            v-for="property in item.items"
            :key="property.id"
            :address="`${property.address.street} ${property.address.streetNumber}, ${property.address.postalCode} ${property.address.city}`"
            :requestCount="1"
            :thumbnail="property.thumbnail"
            :platforms="['Immobilienscout24', 'Immonet']"
          />
        </UIKanbanColumn>
      </ELKanbanBoard> -->

      <ELListView v-if="projectStore.mode === 'list-view'">
        <UIListItem v-for="item in data.data" :key="item.id" :item="item" />
      </ELListView>
      <div class="safe-area-l">
        <UIButtonPrimary
          shrink
          icon="plus"
          text="Unternehmen erstellen"
          @click="router.push('unternehmen/erstellen')"
        />
      </div>
    </template>
  </LOOverview>
</template>

<script setup lang="ts">
const projectStore = useProjectOverviewStore();

const router = useRouter();

const items: any = ref([]);

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
