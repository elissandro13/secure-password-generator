describe('Password Generator - Cypress E2E Tests', () => {
  
  beforeEach(() => {
    // Visitar a página antes de cada teste
    cy.visit('http://localhost:3000');
    
    // Aguardar a página carregar completamente
    cy.get('.container').should('be.visible');
    cy.get('h2').should('contain.text', 'Gerador de Senhas');
  });

  // Teste 1: Verificar carregamento inicial e geração automática de senha
  it('should load the page and generate initial password automatically', () => {
    // Verificar se os elementos principais estão presentes
    cy.get('.container').should('be.visible');
    cy.get('h2').should('contain.text', 'Gerador de Senhas');
    
    // Verificar se as abas estão presentes
    cy.get('.tab-btn').should('have.length', 2);
    cy.get('.tab-btn').first().should('have.class', 'active');
    cy.get('.tab-btn').first().should('contain.text', 'Criar Senha');
    cy.get('.tab-btn').last().should('contain.text', 'Analisar Senha');
    
    
    cy.get('#generated-password').invoke('val').should('have.length', 12); // Comprimento padrão
   

    // Verificar se os controles estão funcionando
    cy.get('#copy').should('be.visible');
    cy.get('#refresh').should('be.visible');
    
    // Verificar se os checkboxes estão marcados por padrão
    cy.get('#uppercase').should('be.checked');
    cy.get('#lowercase').should('be.checked');
    cy.get('#numbers').should('be.checked');
    cy.get('#symbols').should('be.checked');
    
    // Verificar se o slider está no valor padrão
    cy.get('#length').should('have.value', '12');
    cy.get('#length-value').should('contain.text', '12');
  });

  // Teste 2: Testar geração de senha com diferentes configurações
  it('should generate passwords with different configurations', () => {
    // Testar mudança de comprimento
    cy.get('#length').invoke('val', 20).trigger('input');
    cy.get('#length-value').should('contain.text', '20');
    
    // Gerar nova senha
    cy.get('#refresh').click();
    
    // Verificar se a nova senha tem o comprimento correto
    cy.get('#generated-password').invoke('val').should('have.length', 20);
    
    // Testar apenas maiúsculas
    cy.get('#lowercase').uncheck();
    cy.get('#numbers').uncheck();
    cy.get('#symbols').uncheck();
    cy.get('#uppercase').should('be.checked');
    
    // Gerar senha apenas com maiúsculas
    cy.get('#refresh').click();
    
    // Verificar se a senha contém apenas maiúsculas
    cy.get('#generated-password').invoke('val').then((password) => {
      expect(password).to.match(/^[A-Z]+$/);
    });
    
    // Testar combinação personalizada
    cy.get('#lowercase').check();
    cy.get('#numbers').check();
    cy.get('#symbols').uncheck();
    
    cy.get('#refresh').click();
    
    // Verificar se a senha contém maiúsculas, minúsculas e números, mas não símbolos
    cy.get('#generated-password').invoke('val').then((password) => {
      expect(password).to.match(/[A-Z]/); // Contém maiúscula
      expect(password).to.match(/[a-z]/); // Contém minúscula
      expect(password).to.match(/[0-9]/); // Contém número
      expect(password).to.not.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/); // Não contém símbolos
    });
  });

  // Teste 3: Testar funcionalidades de botões (copiar e atualizar)
  it('should test copy and refresh button functionalities', () => {
    let initialPassword;
    
    
    // Testar botão de refresh
    cy.get('#refresh').click();
    
    // Verificar se uma nova senha foi gerada (diferente da anterior)
    cy.get('#generated-password').invoke('val').then((newPassword) => {
      expect(newPassword).to.not.equal(initialPassword);
      expect(newPassword).to.have.length(12); // Comprimento padrão
    });
    
    // Testar botão de copiar
    cy.get('#copy').click();
    
    // Verificar se o campo está selecionado (indicando que foi tentado copiar)
    cy.get('#generated-password').should('be.focused');
    
    // Testar geração através do formulário
    cy.get('.btn-random').first().click();
    
   
    // Testar geração de senha legível
    cy.get('.btn-readable').first().click();
    
    // Verificar se senha legível foi gerada
    cy.get('#generated-password').invoke('val').then((readablePassword) => {
      expect(readablePassword).to.have.length(12);
      // Senha legível deve conter padrões de sílabas
      expect(readablePassword).to.match(/[a-zA-Z]/);
    });
  });

  // Teste 4: Testar funcionalidade de análise de senha
  it('should test password strength analysis functionality', () => {
    // Mudar para aba de análise
    cy.get('[data-tab="check"]').click();
    
    // Verificar se mudou para a aba correta
    cy.get('[data-tab="check"]').should('have.class', 'active');
    cy.get('#check').should('not.have.class', 'hidden');
    cy.get('#generate').should('have.class', 'hidden');
    
    // Testar senha fraca
    cy.get('#password-check').type('123');
    cy.get('#check-strength').click();
    
    // Verificar resultado de senha fraca
    cy.get('#check-result').should('be.visible');
    cy.get('#check-result').should('contain.text', 'Muito fraca');
    cy.get('#check-result').should('have.class', 'danger');
    
    // Limpar campo e testar senha média
    cy.get('#password-check').clear();
    cy.get('#password-check').type('Password123');
    cy.get('#check-strength').click();
    
    // Verificar resultado de senha média/forte
    cy.get('#check-result').should('be.visible');
    cy.get('#check-result').should('contain.text', 'Força da senha:');
    
    // Limpar campo e testar senha forte
    cy.get('#password-check').clear();
    cy.get('#password-check').type('SuperSecure123!@#');
    cy.get('#check-strength').click();
    
    // Verificar resultado de senha forte
    cy.get('#check-result').should('be.visible');
    cy.get('#check-result').should('contain.text', 'forte');
    cy.get('#check-result').should('have.class', 'safe');
  });

  // Teste 5: Testar verificação de vazamento e fluxo completo do usuário
  it('should test password breach check and complete user flow', () => {
    // Voltar para aba de geração
    cy.get('[data-tab="generate"]').click();
    
    // Configurar para gerar senha forte
    cy.get('#length').invoke('val', 16).trigger('input');
    cy.get('#uppercase').check();
    cy.get('#lowercase').check();
    cy.get('#numbers').check();
    cy.get('#symbols').check();
    
    // Gerar senha forte
    cy.get('#refresh').click();
    
    let generatedPassword;
    cy.get('#generated-password').invoke('val').then((password) => {
      generatedPassword = password;
      expect(password).to.have.length(16);
    });
    
    // Ir para aba de análise
    cy.get('[data-tab="check"]').click();
    
    // Usar a senha gerada para análise
    cy.get('#generated-password').invoke('val').then((password) => {
      cy.get('#password-check').type(password);
      
      // Verificar força da senha gerada
      cy.get('#check-strength').click();
      cy.get('#check-result').should('contain.text', 'forte');
      
      // Verificar vazamento da senha gerada (deve ser segura)
      cy.get('#check-breach').click();
      
      // Aguardar resposta da API (pode demorar)
      cy.get('#check-result', { timeout: 10000 }).should('be.visible');
      cy.get('#check-result').should('contain.text', 'não encontrada');
      cy.get('#check-result').should('have.class', 'safe');
    });
    
    // Testar com senha conhecidamente vazada
    cy.get('#password-check').clear();
    cy.get('#password-check').type('123456');
    
    cy.get('#check-breach').click();
    
    // Verificar detecção de vazamento
    cy.get('#check-result', { timeout: 10000 }).should('be.visible');
    cy.get('#check-result').should('contain.text', 'vazada');
    cy.get('#check-result').should('have.class', 'danger');
    
    // Testar responsividade das abas
    cy.get('[data-tab="generate"]').click();
    cy.get('#generate').should('not.have.class', 'hidden');
    cy.get('#check').should('have.class', 'hidden');
    
    cy.get('[data-tab="check"]').click();
    cy.get('#check').should('not.have.class', 'hidden');
    cy.get('#generate').should('have.class', 'hidden');
    
    // Testar comportamento em diferentes tamanhos de tela
    cy.viewport(768, 1024); // Tablet
    cy.get('.container').should('be.visible');
    
    cy.viewport(375, 667); // Mobile
    cy.get('.container').should('be.visible');
    
    // Voltar ao desktop
    cy.viewport(1280, 720);
  });
});