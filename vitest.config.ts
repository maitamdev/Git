import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    testTimeout: 20000,
    include: ['packages/**/*.test.ts', 'tests/**/*.test.ts'],
  },
  resolve: {
    alias: {
      '@git-academy/shared': path.resolve(__dirname, 'packages/shared/src'),
      '@git-academy/git-engine': path.resolve(__dirname, 'packages/git-engine/src'),
      '@git-academy/git-scenarios': path.resolve(__dirname, 'packages/git-scenarios/src'),
      '@git-academy/exercise-engine': path.resolve(__dirname, 'packages/exercise-engine/src'),
      '@git-academy/github-simulator': path.resolve(__dirname, 'packages/github-simulator/src'),
      '@git-academy/actions-simulator': path.resolve(__dirname, 'packages/actions-simulator/src'),
      '@git-academy/git-internals': path.resolve(__dirname, 'packages/git-internals/src'),
      '@git-academy/git-visualizer': path.resolve(__dirname, 'apps/git-visualizer/src'),
    },
  },
});
