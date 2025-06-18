const express = require('express');
const path = require('path');
const { generatePassword, generateReadablePassword } = require('./password');
const { checkPasswordBreach } = require('./check-breach');
const { checkPasswordStrength } = require('./checkPasswordStrength');
const { console } = require('inspector');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '../public')));

app.listen(port, () => console.log(`Servidor rodando em: http://localhost:${port}`));


app.get('/generate', (req, res) => {
  const options = {
    length: parseInt(req.query.length) || 12,
    uppercase: req.query.uppercase !== 'false',
    lowercase: req.query.lowercase !== 'false',
    numbers: req.query.numbers !== 'false',
    symbols: req.query.symbols !== 'false',
  };

  try {
    const password = generatePassword(options);
    res.json({ password });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.get('/check-password-strength', (req, res) => {

  const result = checkPasswordStrength(req.query.password);
  if (!result.valid) {
    return res.status(400).json({ message: result.message });
  }
  return res.json({ message: result.message });
  
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/check-breach', async (req, res) => {
  const password = req.query.password;
  const result = await checkPasswordBreach(password);
  if (!result.valid) {
    return res.status(400).json({ message: result.message });
  }
  return res.json({ message: result.message, count: result.count });
});



app.get('/generate-readable', (req, res) => {
  const options = {
    length: parseInt(req.query.length) || 12,
    uppercase: req.query.uppercase !== 'false',
    lowercase: req.query.lowercase !== 'false',
    numbers: req.query.numbers !== 'false',
    symbols: req.query.symbols !== 'false',
  };
  const password = generateReadablePassword(options);
  res.json({ password });
});