const crypto = require('crypto');
const axios = require('axios');

async function checkPasswordBreach(password) {
  if (!password) {
    return { valid: false, message: 'Senha não informada.' };
  }

  const sha1 = crypto.createHash('sha1').update(password).digest('hex').toUpperCase();
  const prefix = sha1.slice(0, 5);
  const suffix = sha1.slice(5);

  try {
    const res = await axios.get(`https://api.pwnedpasswords.com/range/${prefix}`, {
      headers: { 'Add-Padding': 'true' }
    });

    const lines = res.data.split('\n');
    for (const line of lines) {
      const [hashSuffix, count] = line.split(':');
      if (hashSuffix === suffix) {
        return { valid: true, breached: true, count: parseInt(count), message: `⚠️ Senha vazada ${count} vezes.` };
      }
    }

    return { valid: true, breached: false, count: 0, message: '✅ Senha não encontrada em vazamentos.' };
  } catch (error) {
    console.error('Erro ao consultar API de vazamentos:', error.message);
    return { valid: false, message: 'Erro ao consultar base de vazamentos.' };
  }
}

module.exports = { checkPasswordBreach };