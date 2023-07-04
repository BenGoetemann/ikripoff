<template>
  <UINavItem @click="uiToggleClicked" :text="text" :active="isActive" />
</template>

<script lang="ts" setup>
const props = defineProps<{
  text: string;
  store: any;
  type: "tab" | "mode";
  prevent?: boolean;
  override?: string;
}>();

const isActive = computed(() => {
  if (props.type === "tab")
    return props.store.tab === hyphenSpaces(props.text) ? true : false;
  if (props.type === "mode")
    return props.store.mode === hyphenSpaces(props.text) ? true : false;
});

const uiToggleClicked = () => {
  if (props.prevent) return;

  if (props.type === "mode")
    props.store.setMode(
      hyphenSpaces(props.override ? props.override : props.text)
    );

  if (props.type === "tab")
    props.store.setTab(
      hyphenSpaces(props.override ? props.override : props.text)
    );
};
</script>

<style lang="css" scoped></style>
