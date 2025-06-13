const { checkPasswordBreach } = require('../src/check-breach');

describe('checkPasswordBreach (real API)', () => {

  test('should return error message for empty password', async () => {
    const result = await checkPasswordBreach('');
    expect(result.valid).toBe(false);
    expect(result.message).toBe('Senha não informada.');
  });

  test('should detect a leaked password', async () => {
    const result = await checkPasswordBreach('123456');
    console.log(result);
    expect(result.valid).toBe(true);
    expect(result.breached).toBe(true);
    expect(result.count).toBeGreaterThan(0);
    expect(result.message).toMatch(/vazada/);
  });

  test('should not detect a breach for a strong, unique password', async () => {
    const unique = 'ZzYyXxWw123!@#abcDEF' + Date.now();
    const result = await checkPasswordBreach(unique);
    console.log(result);
    expect(result.valid).toBe(true);
    expect(result.breached).toBe(false);
    expect(result.message).toMatch(/não encontrada/);
  });
});
