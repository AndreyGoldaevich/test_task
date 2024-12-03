// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-12-01',
  devtools: { enabled: false },
  css: ['~/assets/scss/main.scss'],

  runtimeConfig: {
    public: {
      baseURL: process.env.SERVER_URL,
    },
  },

  modules: ['@pinia/nuxt'],
})