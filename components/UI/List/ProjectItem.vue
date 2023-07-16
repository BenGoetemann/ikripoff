<template>
  <div class="project-card-wrapper">
    <div class="project-info-wrapper">
      <h3>{{ item.title }}</h3>
      <div class="info-bar-wrapper">
        <div class="info-bar-item">
          <icon :icon="['fas', 'file']" />
          <p>{{ item.projectToFolder.length }} Ordner</p>
        </div>
        <div class="info-bar-item">
          <icon :icon="['fas', 'building']" />
          <p>{{ item.projectToCompany.length }} Companies</p>
        </div>
        <div class="info-bar-item">
          <icon :icon="['fas', 'calendar']" />
          <p>Seit {{ date }}</p>
        </div>
      </div>
      <div class="description-wrapper">
        <p>{{ item.description }}</p>
      </div>
      <UIButtonPrimary
        @click="router.push(`/projekte/${item.id}`)"
        text="Bearbeiten"
        icon="edit"
      />
    </div>
    <div class="image-wrapper">
      <img
        src="https://images.photowall.com/products/58341/foggy-forest-4.jpg?h=699&q=85"
        alt="image"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();

const date = computed(() => {
  return new Date(props.item.timestamp).toLocaleDateString();
});

const props = defineProps<{
  item: any;
}>();
</script>

<style scoped>
h3 {
  @apply text-xl font-bold;
  font-family: "Staff-X-Wide", sans-serif;
  font-weight: 700;
  text-transform: uppercase;
}

.project-card-wrapper {
  @apply w-full bg-decent p-5 flex flex-row justify-between items-center;

  .project-info-wrapper {
    @apply flex-col-start gap-3;
  }

  .image-wrapper {
    @apply h-64 aspect-auto;

    > img {
      @apply object-cover h-full w-full;
    }
  }
}

.info-bar-wrapper {
  @apply flex-row-start gap-4;

  > .info-bar-item {
    @apply flex justify-start items-center gap-2;
  }
}
</style>
