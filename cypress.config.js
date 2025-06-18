const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    viewportWidth: 1280,
    viewportHeight: 720,
    
    // Timeouts otimizados para CI
    defaultCommandTimeout: 8000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    pageLoadTimeout: 20000,
    
    // Configurações para CI
    video: process.env.CI ? true : false,
    screenshotOnRunFailure: true,
    trashAssetsBeforeRuns: true,
    
    // Pastas
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    fixturesFolder: 'cypress/fixtures',
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',
    
    // Configurações de retry para CI
    retries: {
      runMode: 2,  // Retry 2 vezes em CI
      openMode: 0  // Sem retry em desenvolvimento
    },
    
    // Configurações experimentais
    experimentalMemoryManagement: true,
    
    setupNodeEvents(on, config) {
      // Task para logs
      on('task', {
        log(message) {
          console.log(message);
          return null;
        }
      });
      
      // Configuração condicional para diferentes ambientes
      if (config.env.environment === 'ci') {
        config.baseUrl = 'http://localhost:3000';
        config.video = true;
        config.screenshotOnRunFailure = true;
      }
      
      return config;
    },
    
    // Variáveis de ambiente
    env: {
      environment: process.env.NODE_ENV || 'development'
    }
  }
});