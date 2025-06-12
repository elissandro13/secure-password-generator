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
  const targetLength = parseInt(options.length) || 12;
  const includeNumbers = options.numbers !== 'false';
  const includeSymbols = options.symbols !== 'false';
  const includeUppercase = options.uppercase !== 'false';
  const includeLowercase = options.lowercase !== 'false';

  const syllables = ["ba","be","bi","bo","bu","ca","ce","ci","co","cu","da","de","di","do","du","fa","fe","fi","fo","fu","ga","ge","gi","go","gu","la","le","li","lo","lu","ma","me","mi","mo","mu","na","ne","ni","no","nu","pa","pe","pi","po","pu","ra","re","ri","ro","ru","sa","se","si","so","su","ta","te","ti","to","tu"];
  const numbers = '0123456789';
  const symbols = '!@#$';

  let password = '';
  while (password.length < targetLength - 2) {
    let syllable = syllables[Math.floor(Math.random() * syllables.length)];

    if (!includeLowercase) syllable = syllable.toUpperCase();
    if (!includeUppercase && includeLowercase) syllable = syllable.toLowerCase();
    if (includeUppercase && includeLowercase) {
      // Alternar ou capitalizar a primeira
      if (password.length === 0) syllable = syllable.charAt(0).toUpperCase() + syllable.slice(1);
    }

    password += syllable;
  }

  if (includeNumbers) {
    password += numbers[Math.floor(Math.random() * numbers.length)];
  }

  if (includeSymbols) {
    password += symbols[Math.floor(Math.random() * symbols.length)];
  }

  password = password.substring(0, targetLength);
  return password;
}

module.exports = { generatePassword, generateReadablePassword };
