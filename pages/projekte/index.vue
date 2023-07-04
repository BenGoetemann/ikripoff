<template>
  <LOOverview>
    <template #header>
      <ELBreadcrumb />
      <UIButtonPrimary shrink icon="plus" text="Objekt anlegen" />
    </template>
    <template #main>
      <div class="flex-row-start mb-4 safe-area-l safe-area-r">
        <ELUIToggle type="tab" :store="propertyStore" text="Übersicht" />
      </div>
      <div class="search-input-wrapper">
        <div>
          <icon class="text-xl" :icon="['fas', 'magnifying-glass']" />
          <UIInputSearch callToAction="Projekt suchen" name="Test" />
        </div>
        <nav>
          <ELUIToggle type="mode" :store="propertyStore" text="Kanban Board" />
          <ELUIToggle type="mode" :store="propertyStore" text="List View" />
          <!-- <ELUIToggle type="mode" :store="propertyStore" text="Filter" /> -->
        </nav>
      </div>
      <ELKanbanBoard v-if="!pending && propertyStore.mode === 'kanban-board'">
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
      </ELKanbanBoard>

      <ELListView v-if="propertyStore.mode === 'list-view'" />
    </template>
  </LOOverview>
</template>

<script setup lang="ts">
const propertyStore = usePropertyOverviewStore();

const items: any = ref([]);

const {
  data: properties,
  pending,
  error,
}: any = await useFetch("/api/properties", {
  method: "GET",
});

onMounted(async () => {
  items.value = properties.value.data;
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
