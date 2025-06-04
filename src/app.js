const express = require('express');
const path = require('path');
const { generatePassword } = require('./password');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '../public')));

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

app.listen(port, () => console.log(`Listening on localhost:${port}`));
