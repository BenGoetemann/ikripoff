<template>
  <LOOverview>
    <template #header>
      <ELBreadcrumb />
      <UIButtonPrimary shrink icon="plus" text="Projekt anfragen" />
    </template>
    <template #main>
      <div class="flex-row-start mb-4 safe-area-l safe-area-r">
        <ELUIToggle type="tab" :store="requestStore" text="Übersicht" />
      </div>
      <div class="search-input-wrapper">
        <div>
          <icon class="text-xl" :icon="['fas', 'magnifying-glass']" />
          <UIInputSearch callToAction="Anfrage suchen" name="Test" />
        </div>
        <nav>
          <ELUIToggle type="mode" :store="requestStore" text="Kanban Board" />
          <ELUIToggle type="mode" :store="requestStore" text="List View" />
          <!-- <ELUIToggle type="mode" :store="requestStore" text="Filter" /> -->
        </nav>
      </div>
      <ELKanbanBoard v-if="requestStore.mode === 'kanban-board'">
        <UIKanbanColumn
          v-for="(item, index) in items"
          :key="index"
          :name="item.name"
        >
          <ELRequestItem
            v-for="request in item.items"
            :name="`${request.contact.firstName} ${request.contact.lastName}`"
            :key="request.id"
            :requestDate="request.timestamp"
            :propertyAddress="`${request.property.address.street} ${request.property.address.streetNumber}, ${request.property.address.postalCode} ${request.property.address.city}`"
            :unreadMessage="request.unreadMessage"
            :thumbnail="request.contact.thumbnail"
            :platforms="['Immobilienscout24']"
            :isNewRequest="item.name === 'Neue Anfragen'"
          />
          <!-- TODO: I dont like the fact, that i compare a german string. Fix that.  -->
        </UIKanbanColumn>
      </ELKanbanBoard>
      <ELListView v-if="requestStore.mode === 'list-view'" />
    </template>
  </LOOverview>
</template>

<script setup lang="ts">
const requestStore = useRequestOverviewStore();

const items: any = ref([]);

const {
  data: requests,
  pending,
  error,
}: any = await useFetch("/api/requests", {
  method: "GET",
});

onMounted(async () => {
  items.value = requests.value.data;
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
