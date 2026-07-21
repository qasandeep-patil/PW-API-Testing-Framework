import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './tests',

  // Run tests in parallel
  fullyParallel: true,

  // Fail the build on CI if test.only is left in the code
  forbidOnly: !!process.env.CI,

  // Retry failed tests on CI
  retries: process.env.CI ? 2 : 0,

  // Run tests sequentially on CI
  workers: process.env.CI ? 1 : 1,

  // Reporters
  reporter: [
    ['list'],
    ['html'],
    ['junit', { outputFile: 'test-results/junit.xml' }]
  ],


  use: {
    
    
  },

  
  projects: [
    {
      name: 'api-testing',
      testMatch: 'get_api*',
      dependencies: ['smoke-tests']
      
    },{

      name: 'smoke-tests',
      testMatch: 'smoke*'
    }
  ],

  
});