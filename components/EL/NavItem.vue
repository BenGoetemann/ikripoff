<template>
  <UINavItem
    @click="navItemClicked"
    :text="text"
    :iconUrl="iconUrl"
    :active="isActive"
    :hideText="isNavBarClosed"
  />
</template>

<script lang="ts" setup>
const router = useRouter();
const navStore = useNavStore();

const props = defineProps<{
  text: string;
  prevent?: boolean;
  override?: string;
}>();

const isActive = computed(() => {
  return navStore.currentPage === hyphenSpaces(props.text) ? true : false;
});

const isNavBarClosed = computed(() => {
  return navStore.open ? false : true;
});

const navItemClicked = () => {
  if (props.prevent) return;
  router.push({
    path: "/" + hyphenSpaces(props.override ? props.override : props.text),
  });
  navStore.setCurrentPage(
    hyphenSpaces(props.override ? props.override : props.text)
  );
};
</script>

<style lang="css" scoped></style>
