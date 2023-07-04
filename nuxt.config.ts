// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1.0, viewport-fit=cover",
      title: "Immokreisel - Verkaufen Sie Ihre Immobilie ohne Makler",
      meta: [
        // <meta name="description" content="My amazing site">
        {
          name: "description",
          content:
            "Mit Immokreisel können Sie Ihre Immobilie selbst und ohne Makler verkaufen. Immokreisel führt Sie durch den Verkaufsprozess Ihrer Immobilie.",
        },
      ],
      // favicon
      link: [{ rel: "icon", type: "image/x-icon", href: "/icon_logo.svg" }],
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
