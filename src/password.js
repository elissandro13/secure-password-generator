function generatePassword(options = {}) {
    const length = options.length || 12;
    const includeUppercase = options.uppercase ?? true;
    const includeLowercase = options.lowercase ?? true;
    const includeNumbers = options.numbers ?? true;
    const includeSymbols = options.symbols ?? true;
  
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()-_=+[]{};:,.<>?';
  
    let chars = '';
    if (includeUppercase) chars += upper;
    if (includeLowercase) chars += lower;
    if (includeNumbers) chars += numbers;
    if (includeSymbols) chars += symbols;
  
    if (!chars) throw new Error('No character sets selected');
  
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  }
  
  module.exports = { generatePassword };