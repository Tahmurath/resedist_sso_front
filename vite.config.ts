import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import path from "path"
import tailwindcss from "@tailwindcss/vite"



// https://vite.dev/config/
export default defineConfig(({ mode }) => {


  const currentMode = mode || process.env.NODE_ENV || 'production'

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      rollupOptions: {
        output: {
          entryFileNames: currentMode === 'production'
              ? `assets/[name]-[hash].js`
              : 'assets/[name].js',
          chunkFileNames: currentMode === 'production'
              ? `assets/[name]-[hash].js`
              : 'assets/[name].js',
          //chunkFileNames: `assets/[name]${mode === 'production' ? '.[hash]' : ''}.js`
        }
      }
    }
  }


})
