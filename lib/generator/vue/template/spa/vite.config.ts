import { defineConfig, loadEnv } from 'vite'
import { name } from './package.json'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { createHtmlPlugin } from 'vite-plugin-html'
import eslintPlugin from 'vite-plugin-eslint'

const resolve = (dir: string) => path.join(__dirname, dir)
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const config = loadEnv(mode, process.cwd())
  console.log('=======', { command, mode, name, config })
  return {
    base: command === 'serve' ? '/' : config.VITE_CDN_URL,
    define: {
      __DEV__: command === 'serve',
    },
    build: {
      minify: mode === 'production' ? 'esbuild' : false,
      emptyOutDir: true,
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "./src/styles/reset.scss" as *;`,
        },
      },
    },
    resolve: {
      alias: {
        '@': resolve('src'),
      },
      extensions: ['.js', '.json', '.ts', '.vue'],
    },
    plugins: [
      vue(),
      createHtmlPlugin({
        minify: mode === 'production',
        inject: {
          data: {
            title: 'Vue3单页面应用',
            injectVconsole: mode !== 'production' ? `<script src="/vconsole.min.js"></script>` : '',
            executeVconsole: mode !== 'production' ? '<script>new VConsole()</script>' : '',
          },
        },
      }),
      eslintPlugin({
        include: ['src/**/*.ts', 'src/**/*.vue', 'src/*.ts', 'src/*.vue'],
      }),
    ],
    server: {
      port: 3001,
      open: true,
      host: '0.0.0.0',
      proxy: {},
    },
  }
})
