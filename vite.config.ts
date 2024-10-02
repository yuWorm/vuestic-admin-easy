import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'url'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { vuestic } from '@vuestic/compiler/vite'
import { viteMockServe } from 'vite-plugin-mock'
import { convertEnv } from './build/utils'
import { ViteEnvs } from './build/types'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const viteEnv = convertEnv(env) as ViteEnvs
  return {
    base: './',
    build: {
      sourcemap: true,
    },
    plugins: [
      vuestic({
        devtools: true,
        cssLayers: true,
      }),
      vue(),
      VueI18nPlugin({
        include: resolve(dirname(fileURLToPath(import.meta.url)), './src/i18n/locales/**'),
      }),
      viteMockServe({
        mockPath: 'mock',
        enable: viteEnv?.VITE_IS_MOCK,
        watchFiles: true,
      }),
    ],
    resolve: {
      alias: [
        { find: '@', replacement: resolve(__dirname, './src') },
        { find: '~', replacement: resolve(__dirname) },
        {
          find: 'vue',
          replacement: 'vue/dist/vue.esm-bundler.js', // compile template
        },
        {
          find: 'vue-i18n',
          replacement: 'vue-i18n/dist/vue-i18n.cjs.js', // Resolve the i18n warning issue
        },
      ],
      extensions: ['.ts', '.js'],
    },
  }
})
