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

  test('should generate password with minimum length of 3', () => {
    expect(() => generatePassword({ length: 3 })).toThrow();
    
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
    expect(() => generatePassword({ length: 0 })).toThrow();
  });

    test('should throw error for negative length', () => {
    expect(() => generatePassword({ length: -1 })).toThrow();
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

    // 1. Verifica o comprimento total
    expect(pwd).toHaveLength(12);

    // 2. Verifica se CADA TIPO de caractere está presente, não importa a ordem
    expect(pwd).toMatch(/[A-Z]/);       // Contém ao menos uma letra maiúscula
    expect(pwd).toMatch(/[a-z]/);       // Contém ao menos uma letra minúscula
    expect(pwd).toMatch(/[0-9]/);       // Contém ao menos um número
    expect(pwd).toMatch(/[!@#$%^&*]/); // Contém ao menos um símbolo do conjunto esperado
  });

  test('should include a capital letter when enabled', () => { 
    const pwd = generateReadablePassword({ numbers: true, symbols: true, lowercase: false, uppercase: true });
    expect(pwd).toMatch(/[A-Z]/); // Correto: procura por uma maiúscula em QUALQUER LUGAR
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