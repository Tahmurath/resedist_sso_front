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
          entryFileNames: currentMode === 'development'
              ? `assets/[name]-[hash].js`
              : 'assets/[name].js',
          chunkFileNames: currentMode === 'development'
              ? `assets/[name]-[hash].js`
              : 'assets/[name].js',
          //chunkFileNames: `assets/[name]${mode === 'production' ? '.[hash]' : ''}.js`
        }
      }
    },
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:4000',
          changeOrigin: true,
          secure: false, // برای localhost بدون HTTPS
        },
      },
    },
    // server: {
    //   proxy: {
    //     '/api': {  // همه درخواست‌های شروع‌شده با /api را پروکسی کن
    //       target: 'http://localhost:4000',  // آدرس backend
    //       changeOrigin: true,  // origin را تغییر بده تا backend فکر کند درخواست از خودش است
    //       rewrite: (path) => path.replace(/^\/api/, '/api')  // اگر لازم باشد، path را بازنویسی کن (اختیاری)
    //     }
    //   }
    // }
  }


})
