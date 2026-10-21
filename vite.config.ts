/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    rollupOptions: {
      output: {
        // めったに変わらない React と、よく増える単語データを分けておく（更新時にキャッシュを使い回せる）
        manualChunks(id) {
          if (id.includes('node_modules/react')) return 'react'
          if (id.endsWith('/src/words.ts')) return 'words'
          // 読み物・文法・まちがえやすい単語などの学習データもまとめて分ける
          if (/\/src\/(reading|grammar|confusing|definitions|emoji|twisters|sounds)\.ts$/.test(id)) return 'content'
        },
      },
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.ts'],
    testTimeout: 20000, // App 全体のテストは重いので余裕をもたせる
  },
})
