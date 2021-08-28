import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import { imageUrlPlugin } from './plugins/imageUrlPlugin'

export default defineConfig({
  build: {
    outDir: 'build',
    rollupOptions: {
      output: {
        entryFileNames: `js/[name].[hash].js`,
        chunkFileNames: `js/[name].[hash].js`,
        assetFileNames: `assets/[name].[ext]`
      }
    }
  },
  plugins: [reactRefresh(), imageUrlPlugin()]
})