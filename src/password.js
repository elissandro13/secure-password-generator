function generatePassword(options = {}) {
  const length = options.length ?? 12;

  if (typeof length !== 'number' || length < 4) {
    throw new Error('Password length must be greater than four.');
  }

  // Verifica se nenhuma opção de caractere foi explicitamente definida
  const noOptionsSet = [options.uppercase, options.lowercase, options.numbers, options.symbols]
    .every(v => v === undefined || v === false);

  const includeUppercase = noOptionsSet || options.uppercase === true;
  const includeLowercase = noOptionsSet || options.lowercase === true;
  const includeNumbers = noOptionsSet || options.numbers === true;
  const includeSymbols = noOptionsSet || options.symbols === true;

  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lower = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()-_=+[]{};:,.<>?';

  let chars = '';
  let guaranteedChars = [];

  if (includeUppercase) {
    chars += upper;
    guaranteedChars.push(upper[Math.floor(Math.random() * upper.length)]);
  }
  if (includeLowercase) {
    chars += lower;
    guaranteedChars.push(lower[Math.floor(Math.random() * lower.length)]);
  }
  if (includeNumbers) {
    chars += numbers;
    guaranteedChars.push(numbers[Math.floor(Math.random() * numbers.length)]);
  }
  if (includeSymbols) {
    chars += symbols;
    guaranteedChars.push(symbols[Math.floor(Math.random() * symbols.length)]);
  }

  const remainingLength = length - guaranteedChars.length;
  let randomChars = [];
  if (remainingLength > 0) {
    randomChars = Array.from({ length: remainingLength }, () =>
      chars[Math.floor(Math.random() * chars.length)]
    );
  }

  const finalPassword = [...guaranteedChars, ...randomChars];
  for (let i = finalPassword.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [finalPassword[i], finalPassword[j]] = [finalPassword[j], finalPassword[i]];
  }

  return finalPassword.join('').substring(0, length);
}


function generateReadablePassword(options = {}) {

  const noOptionsSet = [options.uppercase, options.lowercase, options.numbers, options.symbols]
    .every(v => v === undefined || v === false);

  const length = options.length ?? 12;
  const includeUppercase = noOptionsSet || options.uppercase === true;
  const includeLowercase = noOptionsSet || options.lowercase === true;
  const includeNumbers = noOptionsSet || options.numbers === true;
  const includeSymbols = noOptionsSet || options.symbols === true;

  if (isNaN(length) || length < 4) {
    throw new Error('Password length must be a number and greater than 3.');
  }

  const syllables = [
    "ba", "be", "bi", "bo", "bu", "ca", "ce", "ci", "co", "cu",
    "da", "de", "di", "do", "du", "fa", "fe", "fi", "fo", "fu",
    "ga", "ge", "gi", "go", "gu", "la", "le", "li", "lo", "lu",
    "ma", "me", "mi", "mo", "mu", "na", "ne", "ni", "no", "nu",
    "pa", "pe", "pi", "po", "pu", "ra", "re", "ri", "ro", "ru",
    "sa", "se", "si", "so", "su", "ta", "te", "ti", "to", "tu"
  ];

  const numberChars = '0123456789';
  const symbolChars = '!@#$';

  let password = [];
  let currentLength = 0;

  if (includeSymbols) {
    password.push(symbolChars[Math.floor(Math.random() * symbolChars.length)]);
    currentLength++;
  }

  if (includeNumbers) {
    password.push(numberChars[Math.floor(Math.random() * numberChars.length)]);
    currentLength++;
  }

  while (currentLength < length) {
    let syllable = syllables[Math.floor(Math.random() * syllables.length)];

    if (currentLength + syllable.length > length) {
      const fallback = "abcdefghijklmnopqrstuvwxyz";
      password.push(fallback[Math.floor(Math.random() * fallback.length)]);
      currentLength++;
      continue;
    }

    password.push(syllable);
    currentLength += syllable.length;
  }

  // Embaralhar
  for (let i = password.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [password[i], password[j]] = [password[j], password[i]];
  }

  let finalPasswordStr = password.join('').substring(0, length);


  if (includeUppercase && !includeLowercase) {
    finalPasswordStr = finalPasswordStr.toUpperCase();
  } else if (!includeUppercase && includeLowercase) {
    finalPasswordStr = finalPasswordStr.toLowerCase();
  } else if (includeUppercase && includeLowercase) {
    finalPasswordStr = finalPasswordStr.charAt(0).toUpperCase() + finalPasswordStr.slice(1);
  }

  return finalPasswordStr;
}

module.exports = { generatePassword, generateReadablePassword };