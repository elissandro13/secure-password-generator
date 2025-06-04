function checkPasswordStrength(password) {
  if (!password) {
    return { valid: false, message: 'Senha não informada.' };
  }

  const length = password.length;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSymbols = /[^A-Za-z0-9]/.test(password);

  let score = 0;
  if (length >= 8) score++;
  if (length >= 12) score++;
  if (hasUppercase) score++;
  if (hasLowercase) score++;
  if (hasNumbers) score++;
  if (hasSymbols) score++;

  let strength = 'Muito fraca';
  if (score >= 5) strength = 'Forte';
  else if (score >= 3) strength = 'Média';

  return { valid: true, message: `Força da senha: ${strength}` };
}

module.exports = { checkPasswordStrength };