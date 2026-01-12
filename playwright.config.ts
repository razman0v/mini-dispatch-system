import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false, // Для работы с БД лучше пока выключить параллельность
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000', // Адрес твоего NestJS
    trace: 'on-first-retry',
  },
});