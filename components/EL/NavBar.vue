<template>
  <nav>
    <div
      class="icon"
      @click="navStore.trigger()"
      :class="
        navStore.open ? 'rotate-0	 transform-it' : 'rotate-180 transform-it'
      "
    >
      <icon :icon="['fas', 'chevron-left']" />
    </div>
    <div
      class="nav-content"
      :class="
        navStore.open ? 'w-64 transform-it' : 'w-8 transform-it overflow-hidden'
      "
    >
      <section class="mt-2">
        <img
          v-if="navStore.open"
          src="~assets/images/ci/text_logo.svg"
          alt=""
          :class="
            navStore.open ? 'visible transform-it delay-500 ' : 'collapse'
          "
        />
        <img
          v-if="!navStore.open"
          src="~assets/images/ci/icon_logo.svg"
          alt=""
          :class="navStore.open ? 'collapse' : 'visible delay-500 transform-it'"
        />
      </section>

      <section
        class="nav-item-section"
        :class="
          navStore.open
            ? 'pl-0 transform-it'
            : 'pl-[0.4rem] transform-it overflow-hidden'
        "
      >
        <ELNavItem text="Immobilien" />
        <ELNavItem text="Anfragen" />
        <ELNavItem text="Kalender" />
        <ELNavItem text="Services" />
        <ELNavItem text="Profil" />
        <ELNavItem prevent text="Logout" @click="signOutUser" />
        <ELNavItem text="Login" />
      </section>
    </div>
  </nav>
</template>

<script setup lang="ts">
const navStore = useNavStore();
</script>

<style lang="css" scoped>
nav {
  @apply flex-col-start relative;
  @apply h-screen border-r border-borders;
  @apply safe-area-t safe-area-b safe-area-l safe-area-r;

  > .nav-content {
    @apply flex flex-col-start h-full;
  }
}

img {
  @apply h-8 w-auto;
}

.icon {
  @apply w-6 aspect-square rounded-full border text-sm bg-white z-20 top-[3.23rem] -right-3 border-borders flex-col-center absolute;
}

.nav-item-section {
  @apply py-20 gap-10 flex-col-start overflow-hidden;
}
</style>
