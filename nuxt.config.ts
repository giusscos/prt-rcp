// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "SpinFood"
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  runtimeConfig: {
    public: {
      supabaseStorageUrl: ''
    }
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@nuxtjs/color-mode',
    '@nuxtjs/supabase',
    'dayjs-nuxt'
  ],
  colorMode: {
    classSuffix: ''
  },
  supabase: {
    // Options
    redirect: false
  }
})