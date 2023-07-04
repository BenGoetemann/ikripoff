<template>
  <div class="input-wrapper">
    <!-- <label :for="underlineSpaces(name)"
      ><p>
        {{ capitalizeWords(name) }} {{ required ? "" : "- optional" }}
      </p></label
    > -->
    <div v-if="isLoading" class="image-input loading"></div>
    <div v-else :class="{ error: hasError }" class="image-input">
      <input type="file" @change="onInputChange" accept=".jpg,.jpeg,.png" />
      <div class="image-wrapper">
        <img v-if="imageURL" :src="imageURL" alt="" />
        <div class="image-upload-prompt" v-else>
          <p class="max-w-[100px]">
            {{ capitalizeWords("click to upload your player image") }}
          </p>
        </div>
      </div>
    </div>
    <p class="error-message" v-if="hasError">{{ errorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["update"]);
const imageURL = ref("");

const props = defineProps<{
  name: string;
  errorMessage?: string;
  value?: any;
  loading?: boolean;
  required?: boolean;
}>();

const hasError = ref(props.errorMessage);
const isLoading = ref(props.loading);

const onInputChange = (e: any) => {
  imageURL.value = URL.createObjectURL(e.target.files[0]);
  emit("update", e.target.files[0]);
};

watch(
  () => props.errorMessage,
  (selection) => {
    hasError.value = selection;
  }
);

watch(
  () => props.value,
  (selection) => {
    imageURL.value = selection;
  }
);

watch(
  () => props.loading,
  (selection) => {
    isLoading.value = selection;
  }
);
</script>

<style lang="css" scoped>.image-input,
img {
  @apply w-64 aspect-square rounded-subtile bg-borders;
  @apply flex-col-center relative;
}

.image-input {
  &.loading {
    @apply bg-stone-300 animate-pulse;
  }
}

input {
  @apply absolute w-full h-full opacity-0 z-10;
}

.image-wrapper {
  @apply w-full aspect-square absolute z-0;

  > img {
    @apply w-full h-full object-cover;
  }

  > .image-upload-prompt {
    @apply w-full h-full flex-col-center text-center;

    > p {
      @apply text-[#6A7280];
    }
  }
}

.error {
  @apply border-2 border-red-500;
}

.error-message {
  @apply text-sm text-red-500;
}
</style>
