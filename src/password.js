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

function generateReadablePassword(options = {}) {
  const syllables = ["ba","be","bi","bo","bu","ca","ce","ci","co","cu","da","de","di","do","du","fa","fe","fi","fo","fu","ga","ge","gi","go","gu","la","le","li","lo","lu","ma","me","mi","mo","mu","na","ne","ni","no","nu","pa","pe","pi","po","pu","ra","re","ri","ro","ru","sa","se","si","so","su","ta","te","ti","to","tu"];
  const numbers = '0123456789';
  const symbols = '!@#$';

  let password = '';
  for (let i = 0; i < 3; i++) {
    password += syllables[Math.floor(Math.random() * syllables.length)];
  }
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += symbols[Math.floor(Math.random() * symbols.length)];

  // capitaliza a primeira letra
  password = password.charAt(0).toUpperCase() + password.slice(1);
  return password;
}

module.exports = { generatePassword, generateReadablePassword };
