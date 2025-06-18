// Comandos customizados para os testes

// Comando para verificar se uma senha atende aos critérios
Cypress.Commands.add('checkPasswordCriteria', (password, criteria) => {
  if (criteria.uppercase) {
    expect(password).to.match(/[A-Z]/, 'Password should contain uppercase letters');
  }
  
  if (criteria.lowercase) {
    expect(password).to.match(/[a-z]/, 'Password should contain lowercase letters');
  }
  
  if (criteria.numbers) {
    expect(password).to.match(/[0-9]/, 'Password should contain numbers');
  }
  
  if (criteria.symbols) {
    expect(password).to.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, 'Password should contain symbols');
  }
});

// Comando para configurar parâmetros de geração de senha
Cypress.Commands.add('configurePasswordGeneration', (options = {}) => {
  const {
    length = 12,
    uppercase = true,
    lowercase = true,
    numbers = true,
    symbols = true
  } = options;
  
  // Configurar comprimento
  if (length !== 12) {
    cy.get('#length').invoke('val', length).trigger('input');
    cy.get('#length-value').should('contain.text', length.toString());
  }
  
  // Configurar checkboxes
  if (uppercase) {
    cy.get('#uppercase').check();
  } else {
    cy.get('#uppercase').uncheck();
  }
  
  if (lowercase) {
    cy.get('#lowercase').check();
  } else {
    cy.get('#lowercase').uncheck();
  }
  
  if (numbers) {
    cy.get('#numbers').check();
  } else {
    cy.get('#numbers').uncheck();
  }
  
  if (symbols) {
    cy.get('#symbols').check();
  } else {
    cy.get('#symbols').uncheck();
  }
});

// Comando para navegar entre abas
Cypress.Commands.add('switchTab', (tabName) => {
  cy.get(`[data-tab="${tabName}"]`).click();
  cy.get(`[data-tab="${tabName}"]`).should('have.class', 'active');
  cy.get(`#${tabName}`).should('not.have.class', 'hidden');
});

// Comando para testar força de senha
Cypress.Commands.add('testPasswordStrength', (password, expectedStrength) => {
  cy.switchTab('check');
  cy.get('#password-check').clear().type(password);
  cy.get('#check-strength').click();
  
  cy.get('#check-result').should('be.visible');
  cy.get('#check-result').should('contain.text', expectedStrength);
});

// Comando para testar vazamento de senha
Cypress.Commands.add('testPasswordBreach', (password, shouldBeBreached = false) => {
  cy.switchTab('check');
  cy.get('#password-check').clear().type(password);
  cy.get('#check-breach').click();
  
  cy.get('#check-result', { timeout: 15000 }).should('be.visible');
  
  if (shouldBeBreached) {
    cy.get('#check-result').should('contain.text', 'vazada');
    cy.get('#check-result').should('have.class', 'danger');
  } else {
    cy.get('#check-result').should('contain.text', 'não encontrada');
    cy.get('#check-result').should('have.class', 'safe');
  }
});

// Comando para esperar a aplicação carregar completamente
Cypress.Commands.add('waitForAppLoad', () => {
  cy.get('.container').should('be.visible');
  cy.get('h2').should('contain.text', 'Gerador de Senhas');
  cy.get('#generated-password').should('not.be.empty');
});

// Comando para gerar senha e validar
Cypress.Commands.add('generateAndValidatePassword', (options = {}) => {
  const {
    length = 12,
    method = 'random', // 'random' ou 'readable'
    ...criteria
  } = options;
  
  cy.configurePasswordGeneration({ length, ...criteria });
  
  if (method === 'readable') {
    cy.get('.btn-readable').click();
  } else {
    cy.get('#refresh').click();
  }
  
  cy.get('#generated-password').invoke('val').then((password) => {
    expect(password).to.have.length(length);
    cy.checkPasswordCriteria(password, criteria);
  });
});

// Overwrite do comando visit para aguardar carregamento
Cypress.Commands.overwrite('visit', (originalFn, url, options) => {
  originalFn(url, options);
  cy.waitForAppLoad();
});