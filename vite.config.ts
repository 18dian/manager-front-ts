import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import ElementPlus from 'unplugin-element-plus/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: 'localhost',
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:3000'
      }
    }
  },
  plugins: [
    vue(),
    AutoImport({
      // resolvers: [ElementPlusResolver()],
      imports: ['vue', 'pinia', 'vue-router'],
      eslintrc: {
        enabled: true, // Default `false`
        filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
      resolvers: [ElementPlusResolver()],
      dts: true //auto generation auto-imports.d.ts file
    }),
    ElementPlus({
      useSource: true
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ]
});
