const express = require('express');

const organikController = require('./controllers/organik.controller');

const app = express();
const PORT = 2024;

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.send(
    'Selamat menjalankan Capstone teman-teman! ❤️\nBiar ga bingung, baca dokumentasi ini yaa!\nAkhir kata, jangan lupa tidur, dan semoga bantal kalian dingin terus malam ini!'
  );
});

app.use(organikController);

app.listen(PORT, () => {
  console.log(`Server API ReTo berjalan pada http://localhost:${PORT} 🟢`);
});
