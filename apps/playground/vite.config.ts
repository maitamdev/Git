import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@git-academy/shared': path.resolve(__dirname, '../../packages/shared/src'),
      '@git-academy/git-engine': path.resolve(__dirname, '../../packages/git-engine/src'),
      '@git-academy/git-scenarios': path.resolve(__dirname, '../../packages/git-scenarios/src'),
      '@git-academy/actions-simulator': path.resolve(__dirname, '../../packages/actions-simulator/src'),
      '@git-academy/git-internals': path.resolve(__dirname, '../../packages/git-internals/src'),
      '@git-academy/exercise-engine': path.resolve(__dirname, '../../packages/exercise-engine/src'),
      '@git-academy/github-simulator': path.resolve(__dirname, '../../packages/github-simulator/src'),
      '@git-academy/git-visualizer': path.resolve(__dirname, '../../apps/git-visualizer/src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor-react';
          }
          if (id.includes('generated/course-data') || id.includes('course-data.ts')) {
            return 'course-data';
          }
          if (id.includes('packages/git-scenarios')) {
            return 'git-scenarios';
          }
          if (id.includes('packages/git-engine')) {
            return 'git-engine';
          }
          if (id.includes('packages/github-simulator')) {
            return 'github-simulator';
          }
        },
      },
    },
  },
  server: {
    port: 3000,
    host: true,
  },
});
