import { defineConfig, loadEnv } from 'vite'
import { name } from './package.json'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import { glob } from 'glob'

const resolve = (dir: string) => path.join(__dirname, dir)
const ROOT_PATH = path.resolve(__dirname, './')
const PAGE_PATH = path.resolve(ROOT_PATH, 'src/pages/')
const HTML_PATH = path.resolve(PAGE_PATH, '**/*.html')

const allEntry = glob.sync(HTML_PATH, {
  windowsPathsNoEscape: true,
})
const multiPages = p => {
  const pages = {}
  p.forEach(htmlUrl => {
    const key = path.relative(PAGE_PATH, htmlUrl).replace(/(\.html)$/, '')
    pages[key.split('/')[1]] = htmlUrl
  })
  return pages
}
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const config = loadEnv(mode, process.cwd())
  console.log('=======', { command, mode, name, config, input: multiPages(allEntry) })
  return {
    root: PAGE_PATH,
    publicDir: path.resolve(ROOT_PATH, 'public'),
    envDir: ROOT_PATH,
    base: command === 'serve' ? '/' : config.VITE_CDN_URL,
    define: {
      __DEV__: command === 'serve',
    },
    build: {
      minify: mode === 'production' ? 'esbuild' : false,
      outDir: resolve('dist'),
      rollupOptions: {
        input: multiPages(allEntry),
        output: {
          entryFileNames: 'js/[name]-[hash].js',
          chunkFileNames: 'js/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash].[ext]',
        },
      },
      emptyOutDir: true,
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "./src/common/styles/reset.scss" as *;`,
        },
      },
    },
    resolve: {
      alias: {
        '@': resolve('src'),
      },
    },
    plugins: [
      vue(),
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
