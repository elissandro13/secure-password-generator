const { checkPasswordStrength } = require('../src/checkPasswordStrength.js');

describe('checkPasswordStrength', () => {
  test('deve retornar "Muito fraca" para senha curta e sem complexidade', () => {
    const result = checkPasswordStrength('abc');
    expect(result.message).toContain('Muito fraca');
    expect(result.valid).toBe(true);
  });
});
