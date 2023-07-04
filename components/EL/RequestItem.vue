<template>
  <UIKanbanItem>
    <div class="request-item-wrapper">
      <figure>
        <div class="request-image-wrapper">
          <img :src="thumbnail" alt="" />
        </div>
        <div class="request-header">
          <div class="request-detail-wrapper">
            <p class="request-contact-name">{{ name }}</p>
            <div class="request-date">
              <icon :icon="['fas', 'calendar']" />
              <p>{{ usePrettyfiedDate(requestDate) }}</p>
            </div>
          </div>
        </div>
      </figure>
      <section class="description">
        <div class="platform-chip-wrapper">
          <div
            v-for="(platform, index) in platforms"
            :key="index"
            class="platform-chip"
          >
            <p>{{ platform }}</p>
          </div>
        </div>
        <p>{{ propertyAddress }}</p>
        <div v-if="unreadMessage" class="request-count-wrapper">
          <icon :icon="['fas', 'message']" />
          <p>1 neue Nachricht</p>
        </div>
      </section>
      <div v-if="isNewRequest" class="attention-tag">
        <p>Neue Anfrage</p>
      </div>
    </div>
  </UIKanbanItem>
</template>

<script setup lang="ts">
const props = defineProps<{
  platforms: string[];
  name: string;
  thumbnail: string;
  propertyAddress: string;
  requestDate: string;
  unreadMessage: boolean;
  isNewRequest?: boolean;
}>();
</script>

<style lang="css" scoped>
.request-item-wrapper {
  @apply w-full aspect-video flex-col-start gap-5 relative;
  > figure {
    @apply w-96 flex-row-start gap-4;

    > .request-image-wrapper {
      @apply w-3/12;
      > img {
        @apply object-cover rounded-full w-full aspect-square no-drag no-select;
      }
    }

    .request-header {
      @apply w-9/12 h-full flex-row-start gap-2;

      > .request-detail-wrapper {
        @apply w-full h-full flex flex-col justify-center items-start gap-1 font-medium;

        > .request-contact-name {
          @apply font-bold;
        }

        > .request-date {
          @apply text-sm text-decent flex-row-center gap-2;
        }
      }
    }
  }

  > .description {
    @apply gap-2 flex-col-start w-96 whitespace-nowrap;

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

  & .attention-tag {
    @apply absolute w-auto flex-row-center gap-2 top-0 right-0 bg-primary text-sm rounded-subtile px-2 py-1;
  }
}
</style>
