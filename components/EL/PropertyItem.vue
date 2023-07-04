<template>
  <UIKanbanItem>
    <div class="property-item-wrapper">
      <figure>
        <img :src="thumbnail" alt="" />
      </figure>
      <section class="description">
        <p>
          {{ address }}
        </p>
        <div class="platform-chip-wrapper">
          <div
            v-for="(platform, index) in platforms"
            :key="index"
            class="platform-chip"
          >
            <p>{{ platform }}</p>
          </div>
        </div>
        <div class="request-count-wrapper">
          <icon :icon="['fas', 'message']" />
          <p>10 neue Anfragen</p>
        </div>
      </section>
    </div>
  </UIKanbanItem>
</template>

<script setup lang="ts">
const props = defineProps<{
  address: string;
  platforms: string[];
  thumbnail: string;
  requestCount: number;
}>();
</script>

<style lang="css" scoped>
.property-item-wrapper {
  @apply w-full aspect-square flex-col-start gap-4;

  > figure {
    @apply w-full h-60;

    > img {
      @apply object-cover w-full h-full no-drag no-select;
    }
  }

  > .description {
    @apply gap-4 flex-col-start w-96 whitespace-nowrap;

    > p {
      @apply w-full truncate font-bold;
    }

    > .platform-chip-wrapper {
      @apply flex-row-start gap-2;

      > .platform-chip {
        @apply text-sm font-medium inline-block px-2 py-1 rounded-subtile bg-decent w-auto no-drag no-select;
      }
    }
    > .request-count-wrapper {
      @apply font-bold text-attention flex flex-row justify-start items-center gap-2;
    }
  }
}
</style>
