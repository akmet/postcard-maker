import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { ViteWebfontDownload } from 'vite-plugin-webfont-dl';

const host = process.env.TAURI_DEV_HOST;

export default defineConfig({
  base: './',
  plugins: [
    vue(),
    ViteWebfontDownload(['https://fonts.googleapis.com/css?family=ABeeZee|Abel&display=swap'], {
      injectAsStyleTag: true,
      minifyCss: true,
      embedFonts: false,
      async: true,
      cache: true,
      proxy: false,
      assetsSubfolder: 'fonts'
    })
  ],
  // prevent vite from obscuring rust errors
  clearScreen: false,
  server: {
    // make sure this port matches the devUrl port in tauri.conf.json file
    port: 5173,
    // Tauri expects a fixed port, fail if that port is not available
    strictPort: true,
    // if the host Tauri is expecting is set, use it
    host: host || false,
    hmr: host
      ? {
          protocol: 'ws',
          host,
          port: 1421
        }
      : undefined,

    watch: {
      // tell vite to ignore watching `src-tauri`
      ignored: ['**/src-tauri/**']
    }
  },
  // Env variables starting with the item of `envPrefix` will be exposed in tauri's source code through `import.meta.env`.
  envPrefix: ['VITE_', 'TAURI_ENV_*'],
  build: {
    // Tauri uses Chromium on Windows and WebKit on macOS and Linux
    target: process.env.TAURI_ENV_PLATFORM == 'windows' ? 'chrome107' : 'safari16',
    // don't minify for debug builds
    minify: !process.env.TAURI_ENV_DEBUG ? 'esbuild' : false,
    // produce sourcemaps for debug builds
    sourcemap: !!process.env.TAURI_ENV_DEBUG
  }
});
