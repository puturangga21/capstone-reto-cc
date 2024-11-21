import express from 'express';
import dotenv from 'dotenv';

import detailController from './controllers/detail.controller.js';
import organikController from './controllers/organik.controller.js';
import nonOrganikController from './controllers/non-organik.controller.js';

dotenv.config();

const app = express();
const PORT = 2024;

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.send(
    'Selamat menjalankan Capstone teman-teman! ❤️\nBiar ga bingung, baca dokumentasi ini yaa!\nAkhir kata, jangan lupa tidur, dan semoga bantal kalian dingin terus malam ini!'
  );
});

app.use(detailController);
app.use(organikController);
app.use(nonOrganikController);

app.listen(PORT, () => {
  console.log(`Server API ReTo berjalan pada http://localhost:${PORT} 🟢`);
});
