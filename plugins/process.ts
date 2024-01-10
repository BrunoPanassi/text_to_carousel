import process from "process"

export default defineNuxtPlugin(nuxtApp => {
    globalThis.process = process
  })
  