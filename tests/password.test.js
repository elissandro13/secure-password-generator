const { generatePassword } = require('../src/password');

describe('generatePassword', () => {
  test('should generate password of default length', () => {
    const pwd = generatePassword();
    expect(pwd).toHaveLength(12);
  });

  test('should generate password with specific length', () => {
    const pwd = generatePassword({ length: 20 });
    expect(pwd).toHaveLength(20);
  });

  test('should only contain lowercase when specified', () => {
    const pwd = generatePassword({ lowercase: true, uppercase: false, numbers: false, symbols: false });
    expect(pwd).toMatch(/^[a-z]+$/);
  });

  test('should throw error if no character sets selected', () => {
    expect(() => generatePassword({ lowercase: false, uppercase: false, numbers: false, symbols: false })).toThrow();
  });

  // Adicione mais testes até completar pelo menos 15
});