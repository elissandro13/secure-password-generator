const { checkPasswordStrength } = require('../src/checkPasswordStrength');

describe('checkPasswordStrength', () => {
  test('deve retornar "Muito fraca" para senha curta e sem complexidade', () => {
    const result = checkPasswordStrength('abc');
    expect(result.message).toContain('Muito fraca');
    expect(result.valid).toBe(true);
  });

  test('should return "Força da senha: Muito fraca" for passwords with only lowercase letters', () => {
    const result = checkPasswordStrength('weakpassword');
    expect(result.message).toBe('Força da senha: Muito fraca');
    expect(result.valid).toBe(true);
  });

  test('should return "Força da senha: Média" for passwords with lowercase and numbers', () => {
    const result = checkPasswordStrength('medium123');
    expect(result.message).toBe('Força da senha: Média');
    expect(result.valid).toBe(true);
  });

  test('should return "Força da senha: Forte" for passwords with lowercase, uppercase, and numbers', () => {
    const result = checkPasswordStrength('Strong123');
    expect(result.message).toBe('Força da senha: Forte');
    expect(result.valid).toBe(true);
  });

  test('should return "Força da senha: Muito forte" for passwords with all character sets', () => {
    const result = checkPasswordStrength('VeryStrong123!');
    expect(result.message).toBe('Força da senha: Muito forte');
    expect(result.valid).toBe(true);
  });

  test('should return "Força da senha: Muito fraca" for passwords shorter than 8 characters', () => {
    const result = checkPasswordStrength('short');
    expect(result.message).toBe('Força da senha: Muito fraca');
    expect(result.valid).toBe(true);
  });

  test('should return "Força da senha: Média" for passwords with mixed case and numbers', () => {
    const result = checkPasswordStrength('Medium1');
    expect(result.message).toBe('Força da senha: Média');
    expect(result.valid).toBe(true);
  });

  test('should return "Força da senha: Forte" for passwords with all character sets and sufficient length', () => {
    const result = checkPasswordStrength('StrongPass123');
    expect(result.message).toBe('Força da senha: Forte');
    expect(result.valid).toBe(true);
  });

  test('should return "Força da senha: Muito fraca" for passwords with only numbers', () => {
    const result = checkPasswordStrength('12345678');
    expect(result.message).toBe('Força da senha: Muito fraca');
    expect(result.valid).toBe(true);
  });

  test('should return "Força da senha: Média" for passwords with numbers and lowercase letters', () => {
    const result = checkPasswordStrength('password123');
    expect(result.message).toBe('Força da senha: Média');
    expect(result.valid).toBe(true);
  });

  test('should return "Força da senha: Forte" for passwords with numbers, lowercase, and uppercase letters', () => {
    const result = checkPasswordStrength('Password123');
    expect(result.message).toBe('Força da senha: Forte');
    expect(result.valid).toBe(true);
  });

  test('should return "Força da senha: Muito fraca" for passwords with only symbols', () => {
    const result = checkPasswordStrength('!@#$%^&*');
    expect(result.message).toBe('Força da senha: Muito fraca');
    expect(result.valid).toBe(true);
  });

  test('should return "Força da senha: Média" for passwords with symbols and lowercase letters', () => {
    const result = checkPasswordStrength('password!@');
    expect(result.message).toBe('Força da senha: Média');
    expect(result.valid).toBe(true);
  });

  test('should return "Força da senha: Forte" for passwords with symbols, lowercase, and uppercase letters', () => {
    const result = checkPasswordStrength('Password!@');
    expect(result.message).toBe('Força da senha: Forte');
    expect(result.valid).toBe(true);
  });

  test('should return "Força da senha: Forte" for passwords with symbols, lowercase, uppercase, and numbers', () => {
    const result = checkPasswordStrength('Password123!@');
    expect(result.message).toBe('Força da senha: Forte');
    expect(result.valid).toBe(true);
  });
});
