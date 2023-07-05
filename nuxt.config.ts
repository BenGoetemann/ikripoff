// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1.0, viewport-fit=cover",
      title: "Format 54 - Videoproduktion mit Herz",
      meta: [
        // <meta name="description" content="My amazing site">
        {
          name: "description",
          content:
            "Videoproduktion von A bis Z – wir begleiten Sie von der ersten Idee bis zum fertigen Film und erzählen Geschichten, die bewegen. Versprochen!",
        },
      ],
      // favicon
      link: [{ rel: "icon", type: "image/x-icon", href: "/_nuxt/assets/images/ci/format-54-logo-white-icon.svg" }],
    },
  },
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],
  nitro: { preset: "netlify" },
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@nuxt/image-edge",
    '@nuxtjs/supabase'
  ],
  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
    configPath: "tailwind.config",
    exposeConfig: false,
    injectPosition: 0,
    viewer: true,
  },
  pinia: {
    autoImports: ["defineStore", "acceptHMRUpdate"],
  },
  imports: {
    dirs: ["stores"],
  },
  build:{
    // vue-toastification - old commonjs module 
    transpile: ['vue-toastification'],
  }
});
