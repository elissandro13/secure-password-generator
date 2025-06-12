const axios = require('axios');
const { checkPasswordBreach } = require('../src/check-breach');

// Simula o módulo 'axios' para não fazer chamadas reais à internet
jest.mock('axios');

describe('checkPasswordBreach', () => {

  test('should return error message for empty password', async () => {
    const result = await checkPasswordBreach('');
    expect(result.valid).toBe(false);
    expect(result.message).toBe('Senha não informada.');
  });

  test('should return breached message for a leaked password', async () => {
    // O hash SHA1 de "leakedPassword" é 8D1B69739363BEC336423432B22227658C838273
    // O sufixo que a API retornaria é a parte final do hash.
    // A resposta da API simulada DEVE conter esse sufixo.
    const mockResponse = {
      data: '1B69739363BEC336423432B22227658C838273:5' // Suffix:Count
    };
    axios.get.mockResolvedValueOnce(mockResponse);

    const result = await checkPasswordBreach('leakedPassword');

    expect(result.valid).toBe(true);
    expect(result.breached).toBe(true);
    expect(result.count).toBe(5);
    expect(result.message).toContain('⚠️ Senha vazada 5 vezes.');
  });

  test('should return not breached message for a safe password', async () => {
    const mockResponse = {
      data: 'SOMEOTHERSUFFIX:10' // Um sufixo que não vai bater com o da senha
    };
    axios.get.mockResolvedValueOnce(mockResponse);

    const result = await checkPasswordBreach('aVerySafeAndUniquePassword123!$');
    expect(result.valid).toBe(true);
    expect(result.breached).toBe(false);
    expect(result.message).toBe('✅ Senha não encontrada em vazamentos.');
  });

  test('should handle API errors gracefully', async () => {
    // Simula um erro de rede na chamada da API
    axios.get.mockRejectedValueOnce(new Error('Network error'));

    const result = await checkPasswordBreach('anypassword');
    expect(result.valid).toBe(false);
    expect(result.message).toBe('Erro ao consultar base de vazamentos.');
  });
});