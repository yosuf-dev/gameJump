import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
<<<<<<< HEAD
  base: '/gameJump/'
})
=======
  base: "/gameJump/",

  server: {
    watch: {
      usePolling: true,
    },
  },
})
>>>>>>> 7888d51 (Deploy)
