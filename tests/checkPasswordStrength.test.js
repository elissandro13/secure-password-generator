const { checkPasswordStrength } = require('../src/checkPasswordStrength');

describe('checkPasswordStrength', () => {

  test('should return "Muito fraca" for passwords with only one character type', () => {
    const result = checkPasswordStrength('weakpassword');
    expect(result.message).toBe('Força da senha: Muito fraca');
  });

  test('should return "Muito fraca" for short passwords', () => {
    const result = checkPasswordStrength('Wk1@');
    expect(result.message).toBe('Força da senha: Muito fraca');
  });

  test('should return "Média" for medium passwords', () => {
    const result = checkPasswordStrength('Medium123'); // 9 chars, 3 tipos = score 3 = Média
    expect(result.message).toBe('Força da senha: Média');
  });

  test('should return "Forte" for strong passwords', () => {
    const result = checkPasswordStrength('StrongPass123'); // 13 chars, 3 tipos = score 3+2 = 5 = Forte
    expect(result.message).toBe('Força da senha: Forte');
  });

  test('should return "Forte" for another strong password with symbols', () => {
    const result = checkPasswordStrength('Password!@'); // 10 chars, 3 tipos = score 3+1 = 4 = Forte
    expect(result.message).toBe('Força da senha: Forte');
  });

  test('should return "Muito forte" for very strong passwords', () => {
    const result = checkPasswordStrength('VeryStrong123!'); // 14 chars, 4 tipos = score 4+2 = 6 = Muito forte
    expect(result.message).toBe('Força da senha: Muito forte');
  });

  test('should handle empty input', () => {
    const result = checkPasswordStrength('');
    expect(result.valid).toBe(false);
    expect(result.message).toBe('Senha não informada.');
  });
});