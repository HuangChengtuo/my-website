import { formatTime } from "@/utils";

export default defineNuxtPlugin(() => {
  return {
    provide: { formatTime }
  }
})
