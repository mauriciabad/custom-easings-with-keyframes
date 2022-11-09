import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}',
    baseUrl: 'http://localhost:4173',
    projectId: "x4o3zk",
    viewportWidth: 1024,
    viewportHeight: 768,
  }
})
