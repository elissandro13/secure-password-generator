const request = require('supertest');
const express = require('express');
const path = require('path');
const { generatePassword, generateReadablePassword } = require('../src/password');
const { checkPasswordBreach } = require('../src/check-breach');
const { checkPasswordStrength } = require('../src/checkPasswordStrength');

// Configuração da aplicação para testes
const app = express();
app.use(express.static(path.join(__dirname, '../public')));

// Rotas da aplicação
app.get('/generate', (req, res) => {
  const options = {
    length: parseInt(req.query.length) || 12,
    uppercase: req.query.uppercase !== 'false',
    lowercase: req.query.lowercase !== 'false',
    numbers: req.query.numbers !== 'false',
    symbols: req.query.symbols !== 'false',
  };

  try {
    const password = generatePassword(options);
    res.json({ password });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.get('/check-password-strength', (req, res) => {
  const result = checkPasswordStrength(req.query.password);
  if (!result.valid) {
    return res.status(400).json({ message: result.message });
  }
  return res.json({ message: result.message });
});

app.get('/check-breach', async (req, res) => {
  const password = req.query.password;
  const result = await checkPasswordBreach(password);
  if (!result.valid) {
    return res.status(400).json({ message: result.message });
  }
  return res.json({ message: result.message, count: result.count });
});

app.get('/generate-readable', (req, res) => {
  const options = {
    length: parseInt(req.query.length) || 12,
    uppercase: req.query.uppercase !== 'false',
    lowercase: req.query.lowercase !== 'false',
    numbers: req.query.numbers !== 'false',
    symbols: req.query.symbols !== 'false',
  };
  
  try {
    const password = generateReadablePassword(options);
    res.json({ password });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

describe('Password Generator API - Integration Tests', () => {

  // Teste 1: Fluxo completo de geração de senha aleatória
  describe('POST /generate - Complete Random Password Generation Flow', () => {
    test('should generate password with all character types and validate response structure', async () => {
      const response = await request(app)
        .get('/generate')
        .query({
          length: 16,
          uppercase: 'true',
          lowercase: 'true',
          numbers: 'true',
          symbols: 'true'
        })
        .expect(200)
        .expect('Content-Type', /json/);

      // Verifica estrutura da resposta
      expect(response.body).toHaveProperty('password');
      expect(typeof response.body.password).toBe('string');
      expect(response.body.password).toHaveLength(16);

      // Verifica se contém todos os tipos de caracteres solicitados
      expect(response.body.password).toMatch(/[A-Z]/); // Maiúscula
      expect(response.body.password).toMatch(/[a-z]/); // Minúscula
      expect(response.body.password).toMatch(/[0-9]/); // Número
      expect(response.body.password).toMatch(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/); // Símbolo

      // Verifica se não contém caracteres inválidos
      expect(response.body.password).toMatch(/^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/);
    });

    test('should handle edge cases and parameter validation', async () => {
      // Teste com comprimento mínimo
      const minResponse = await request(app)
        .get('/generate')
        .query({ length: 4 })
        .expect(200);
      
      expect(minResponse.body.password).toHaveLength(4);

      // Teste com comprimento máximo
      const maxResponse = await request(app)
        .get('/generate')
        .query({ length: 64 })
        .expect(200);
      
      expect(maxResponse.body.password).toHaveLength(64);

      // Teste com parâmetros inválidos
      await request(app)
        .get('/generate')
        .query({ length: 2 })
        .expect(400)
        .expect((res) => {
          expect(res.body).toHaveProperty('error');
          expect(res.body.error).toMatch(/greater than four/);
        });
    });
  });

  // Teste 2: Fluxo completo de geração de senha legível
  describe('POST /generate-readable - Complete Readable Password Generation Flow', () => {
    test('should generate readable password and validate syllable-based structure', async () => {
      const response = await request(app)
        .get('/generate-readable')
        .query({
          length: 20,
          uppercase: 'true',
          lowercase: 'true',
          numbers: 'true',
          symbols: 'true'
        })
        .expect(200)
        .expect('Content-Type', /json/);

      expect(response.body).toHaveProperty('password');
      expect(response.body.password).toHaveLength(20);

      // Verifica se contém elementos legíveis (sílabas)
      const syllablePattern = /[a-zA-Z]{2,}/;
      expect(response.body.password).toMatch(syllablePattern);

      // Verifica tipos de caracteres quando solicitados
      expect(response.body.password).toMatch(/[0-9]/); // Número
      expect(response.body.password).toMatch(/[!@#$]/); // Símbolo limitado
    });

    test('should generate different passwords on multiple calls', async () => {
      const responses = await Promise.all([
        request(app).get('/generate-readable').query({ length: 12 }),
        request(app).get('/generate-readable').query({ length: 12 }),
        request(app).get('/generate-readable').query({ length: 12 })
      ]);

      responses.forEach(res => expect(res.status).toBe(200));
      
      const passwords = responses.map(res => res.body.password);
      
      // Verifica se todas são diferentes
      expect(new Set(passwords).size).toBe(3);
    });
  });

  // Teste 3: Fluxo completo de verificação de força de senha
  describe('GET /check-password-strength - Complete Password Strength Check Flow', () => {
    test('should evaluate password strength correctly across different scenarios', async () => {
      // Teste com senha muito fraca
      const weakResponse = await request(app)
        .get('/check-password-strength')
        .query({ password: 'weak' })
        .expect(200);
      
      expect(weakResponse.body.message).toMatch(/Muito fraca/);

      // Teste com senha média
      const mediumResponse = await request(app)
        .get('/check-password-strength')
        .query({ password: 'Medium123' })
        .expect(200);
      
      expect(mediumResponse.body.message).toMatch(/Média/);

      // Teste com senha forte
      const strongResponse = await request(app)
        .get('/check-password-strength')
        .query({ password: 'StrongPassword123!' })
        .expect(200);
      
      expect(strongResponse.body.message).toMatch(/Muito forte|Forte/);
    });

    test('should handle invalid inputs gracefully', async () => {
      // Senha vazia
      await request(app)
        .get('/check-password-strength')
        .query({ password: '' })
        .expect(400)
        .expect((res) => {
          expect(res.body.message).toMatch(/não informada/);
        });

      // Sem parâmetro de senha
      await request(app)
        .get('/check-password-strength')
        .expect(400);
    });
  });

  // Teste 4: Integração com API externa - Verificação de vazamentos
  describe('GET /check-breach - External API Integration Flow', () => {
    test('should integrate with HaveIBeenPwned API and detect known breached passwords', async () => {
      // Testa com senha conhecidamente vazada
      const breachedResponse = await request(app)
        .get('/check-breach')
        .query({ password: '123456' })
        .expect(200);

      expect(breachedResponse.body).toHaveProperty('message');
      expect(breachedResponse.body).toHaveProperty('count');
      expect(breachedResponse.body.message).toMatch(/vazada/);
      expect(breachedResponse.body.count).toBeGreaterThan(0);
    }, 10000); // Timeout maior para API externa

    test('should handle unique passwords and API errors gracefully', async () => {
      // Testa com senha única (muito provavelmente não vazada)
      const uniquePassword = `UniquePass${Date.now()}${Math.random()}!@#`;
      
      const uniqueResponse = await request(app)
        .get('/check-breach')
        .query({ password: uniquePassword })
        .expect(200);

      expect(uniqueResponse.body.message).toMatch(/não encontrada/);
      expect(uniqueResponse.body.count).toBe(0);

      // Testa entrada inválida
      await request(app)
        .get('/check-breach')
        .query({ password: '' })
        .expect(400)
        .expect((res) => {
          expect(res.body.message).toMatch(/não informada/);
        });
    }, 10000);
  });

  // Teste 5: Teste de comportamento integrado - Fluxo completo do usuário
  describe('Complete User Journey - End-to-End Behavior Test', () => {
    test('should support complete user workflow: generate -> check strength -> check breach', async () => {
      // Passo 1: Gerar uma senha forte
      const generateResponse = await request(app)
        .get('/generate')
        .query({
          length: 16,
          uppercase: 'true',
          lowercase: 'true',
          numbers: 'true',
          symbols: 'true'
        })
        .expect(200);

      const generatedPassword = generateResponse.body.password;
      expect(generatedPassword).toBeDefined();
      expect(generatedPassword).toHaveLength(16);

      // Passo 2: Verificar força da senha gerada
      const strengthResponse = await request(app)
        .get('/check-password-strength')
        .query({ password: generatedPassword })
        .expect(200);

      // Senha gerada deve ser forte
      expect(strengthResponse.body.message).toMatch(/Forte|Muito forte/);

      // Passo 3: Verificar se a senha não foi vazada
      const breachResponse = await request(app)
        .get('/check-breach')
        .query({ password: generatedPassword })
        .expect(200);

      // Senha gerada aleatoriamente não deve ter sido vazada
      expect(breachResponse.body.count).toBe(0);
      expect(breachResponse.body.message).toMatch(/não encontrada/);

      // Verificação adicional: testar consistency
      // Gerar outra senha com os mesmos parâmetros deve resultar em senha diferente
      const secondGenerateResponse = await request(app)
        .get('/generate')
        .query({
          length: 16,
          uppercase: 'true',
          lowercase: 'true',
          numbers: 'true',
          symbols: 'true'
        })
        .expect(200);

      expect(secondGenerateResponse.body.password).not.toBe(generatedPassword);
    }, 15000); // Timeout maior para fluxo completo

    test('should handle various character set combinations consistently', async () => {
      const testCases = [
        { uppercase: 'true', lowercase: 'false', numbers: 'false', symbols: 'false' },
        { uppercase: 'false', lowercase: 'true', numbers: 'false', symbols: 'false' },
        { uppercase: 'false', lowercase: 'false', numbers: 'true', symbols: 'false' },
        { uppercase: 'false', lowercase: 'false', numbers: 'false', symbols: 'true' }
      ];

      for (const testCase of testCases) {
        const response = await request(app)
          .get('/generate')
          .query({ ...testCase, length: 8 })
          .expect(200);

        expect(response.body.password).toHaveLength(8);
        
        // Verificar se contém apenas o tipo de caractere solicitado
        if (testCase.uppercase === 'true') {
          expect(response.body.password).toMatch(/^[A-Z]+$/);
        }
        if (testCase.lowercase === 'true') {
          expect(response.body.password).toMatch(/^[a-z]+$/);
        }
        if (testCase.numbers === 'true') {
          expect(response.body.password).toMatch(/^[0-9]+$/);
        }
        if (testCase.symbols === 'true') {
          expect(response.body.password).toMatch(/^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/);
        }
      }
    });
  });
});

// Setup
beforeAll(() => {
  // Setup global para todos os testes
  jest.setTimeout(20000);
});

