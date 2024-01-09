// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import { loadEnv } from "vite"
const env = loadEnv(import.meta.env.MODE, process.cwd(), "")
export default defineNuxtConfig({
  devtools: { enabled: true },
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    '@pinia/nuxt'
    //...
  ],
  vite: {
    define: {
      "process.env": env
    },
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
})
