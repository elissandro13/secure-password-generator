const { generatePassword, generateReadablePassword } = require('../src/password');

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

  test('should include numbers when specified', () => {
    const pwd = generatePassword({ numbers: true, lowercase: false, uppercase: false, symbols: false });
    expect(pwd).toMatch(/^[0-9]+$/);
  });

  test('should include symbols when specified', () => {
    const pwd = generatePassword({ symbols: true, lowercase: false, uppercase: false, numbers: false });
    expect(pwd).toMatch(/^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/);
  });

  test('should include uppercase letters when specified', () => {
    const pwd = generatePassword({ uppercase: true, lowercase: false, numbers: false, symbols: false });
    expect(pwd).toMatch(/^[A-Z]+$/);
  });

  test('should generate password with mixed character sets', () => {
    const pwd = generatePassword({ lowercase: true, uppercase: true, numbers: true, symbols: true });
    expect(pwd).toMatch(/[a-z]/);
    expect(pwd).toMatch(/[A-Z]/);
    expect(pwd).toMatch(/[0-9]/);
    expect(pwd).toMatch(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/);
  });

  test('should generate password with minimum length of 1', () => {
    const pwd = generatePassword({ length: 1 });
    expect(pwd).toHaveLength(1);
  });

  test('should generate password with maximum length of 100', () => {
    const pwd = generatePassword({ length: 100 });
    expect(pwd).toHaveLength(100);
  });

  test('should generate password with default options when no arguments are passed', () => {
    const pwd = generatePassword();
    expect(pwd).toHaveLength(12);
    expect(pwd).toMatch(/[a-z]/);
    expect(pwd).toMatch(/[A-Z]/);
    expect(pwd).toMatch(/[0-9]/);
    expect(pwd).toMatch(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/);
  });

  test('should generate unique passwords on multiple calls', () => {
    const pwd1 = generatePassword();
    const pwd2 = generatePassword();
    expect(pwd1).not.toEqual(pwd2);
  });

  test('should throw error for invalid length', () => {
    expect(() => generatePassword({ length: -1 })).toThrow();
    expect(() => generatePassword({ length: 0 })).toThrow();
  });

  test('should throw error for invalid character set configuration', () => {
    expect(() => generatePassword({ lowercase: false, uppercase: false, numbers: false, symbols: false })).toThrow();
  });

  test('should generate password with specific length and mixed character sets', () => {
    const pwd = generatePassword({ length: 15, lowercase: true, uppercase: true, numbers: true, symbols: true });
    expect(pwd).toHaveLength(15);
    expect(pwd).toMatch(/[a-z]/);
    expect(pwd).toMatch(/[A-Z]/);
    expect(pwd).toMatch(/[0-9]/);
    expect(pwd).toMatch(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/);
  });

  test('should generate password with only uppercase and numbers', () => {
    const pwd = generatePassword({ uppercase: true, numbers: true, lowercase: false, symbols: false });
    expect(pwd).toMatch(/[A-Z]/);
    expect(pwd).toMatch(/[0-9]/);
  });

  test('should generate password with only symbols and lowercase', () => {
    const pwd = generatePassword({ symbols: true, lowercase: true, uppercase: false, numbers: false });
    expect(pwd).toMatch(/[a-z]/);
    expect(pwd).toMatch(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/);
  });

  test('should generate password with only numbers and symbols', () => {
    const pwd = generatePassword({ numbers: true, symbols: true, lowercase: false, uppercase: false });
    expect(pwd).toMatch(/[0-9]/);
    expect(pwd).toMatch(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/);
  });
});

describe('generateReadablePassword', () => {
  test('should generate a readable password with default settings', () => {
    const pwd = generateReadablePassword();
    expect(pwd).toMatch(/^[A-Z][a-z]{2,}[0-9][!@#$]$/);
    expect(pwd).toHaveLength(10); // 3 syllables + 1 number + 1 symbol
  });

  test('should capitalize the first letter of the password', () => {
    const pwd = generateReadablePassword();
    expect(pwd.charAt(0)).toMatch(/[A-Z]/);
  });

  test('should include a number and a symbol in the password', () => {
    const pwd = generateReadablePassword();
    expect(pwd).toMatch(/[0-9]/);
    expect(pwd).toMatch(/[!@#$]/);
  });

  test('should generate unique readable passwords on multiple calls', () => {
    const pwd1 = generateReadablePassword();
    const pwd2 = generateReadablePassword();
    expect(pwd1).not.toEqual(pwd2);
  });
});