function checkPasswordStrength(password) {
  if (!password) {
    return { valid: false, message: 'Senha não informada.' };
  }

  const length = password.length;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSymbols = /[^A-Za-z0-9]/.test(password);

  const types = (hasUppercase ? 1 : 0) + (hasLowercase ? 1 : 0) + (hasNumbers ? 1 : 0) + (hasSymbols ? 1 : 0);

  if (length < 8 || types < 2) {
    return { valid: true, message: `Força da senha: Muito fraca` };
  }
  
  let score = types;
  if (length >= 10) score++;
  if (length >= 12) score++;

  let strength = 'Média';
  if (score >= 6) { // Ex: VeryStrong123! (4 tipos + 2 de tamanho)
    strength = 'Muito forte';
  } else if (score >= 4) { // Ex: Password!@ (3 tipos + 1 de tamanho)
    strength = 'Forte';
  } // Qualquer outra coisa (Ex: Medium123 - 3 tipos, sem ponto de tamanho) cai em Média.

  return { valid: true, message: `Força da senha: ${strength}` };
}

module.exports = { checkPasswordStrength };