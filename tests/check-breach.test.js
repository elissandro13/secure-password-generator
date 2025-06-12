const { checkPasswordStrength, checkPasswordBreach } = require('../src/check-breach');

describe('checkPasswordStrength', () => {
  test('deve retornar "Muito fraca" para senha curta e sem complexidade', () => {
    const result = checkPasswordStrength('abc');
    expect(result.message).toContain('Muito fraca');
    expect(result.valid).toBe(true);
  });
});

describe('checkPasswordBreach', () => {
  test('should return error message for empty password', async () => {
    const result = await checkPasswordBreach('');
    expect(result.valid).toBe(false);
    expect(result.message).toBe('Senha não informada.');
  });

  test('should return breached message for leaked password', async () => {
    const result = await checkPasswordBreach('password123');
    expect(result.valid).toBe(true);
    expect(result.breached).toBe(true);
    expect(result.message).toContain('⚠️ Senha vazada');
  });

  test('should return not breached message for safe password', async () => {
    const result = await checkPasswordBreach('safePassword!');
    expect(result.valid).toBe(true);
    expect(result.breached).toBe(false);
    expect(result.message).toBe('✅ Senha não encontrada em vazamentos.');
  });

  test('should handle API errors gracefully', async () => {
    const result = await checkPasswordBreach('errorPassword');
    expect(result.valid).toBe(false);
    expect(result.message).toBe('Erro ao consultar base de vazamentos.');
  });

  test('should return breached count for leaked password', async () => {
    const result = await checkPasswordBreach('leakedPassword');
    expect(result.valid).toBe(true);
    expect(result.breached).toBe(true);
    expect(result.count).toBeGreaterThan(0);
  });
});
