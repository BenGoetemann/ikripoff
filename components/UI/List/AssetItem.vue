<template>
  <div class="list-card-wrapper">
    <div class="info-section">
      <figure>
        <img :src="item.thumb" alt="" />
      </figure>
      <p>{{ item.name }}</p>
    </div>
    <div class="button-section">
      <UIButtonPrimary
        @click="
          navigateTo(`https://app.frame.io/reviews/${item.id}`, {
            external: true,
            open: {
              target: '_blank',
            },
          })
        "
        text="Review"
        icon="edit"
      />
      <UIButtonPrimary
        @click="
          navigateTo(item.original, {
            external: true,
            open: {
              target: '_blank',
            },
          })
        "
        text="Download"
        icon="download"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { on } from "events";

const router = useRouter();

onMounted(() => {
  console.log(props.item);
});

const props = defineProps<{
  item: any;
}>();
</script>

<style scoped>
p {
  font-family: "Staff-X-Wide", sans-serif;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 14px;
}

.list-card-wrapper {
  @apply w-full h-20 bg-decent p-5 flex flex-row justify-between items-center;
}

.button-section {
  @apply flex-row-start gap-3;
}

.info-section {
  @apply flex-row-center gap-5;

  > figure {
    @apply w-16 h-full;

    > img {
      @apply w-full h-full object-cover;
    }
  }
}
</style>
