// Configurações globais
Cypress.on('uncaught:exception', (err, runnable) => {
  // Retorna false para prevenir que erros não capturados falhem os testes
  // Útil para erros de third-party libraries que não afetam os testes
  if (err.message.includes('Script error')) {
    return false;
  }
  
  // Para outros erros, deixe o Cypress lidar normalmente
  return true;
});

// Hook que executa após cada teste
afterEach(() => {
  // Limpeza após cada teste se necessário
  
  // Capturar screenshot em caso de falha
  if (Cypress.currentTest.state === 'failed') {
    const testName = Cypress.currentTest.title.replace(/\s+/g, '-');
    cy.screenshot(`failed-${testName}`);
  }
});


