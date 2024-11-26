import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import authRoute from './routes/auth.route.js';
import detailRoute from './routes/detail.route.js';
import organicRoute from './routes/organik.route.js';
import nonOrganicRoute from './routes/non-organik.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cookieParser());

app.get('/', async (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.send(
    'Selamat menjalankan Capstone teman-teman! ❤️\nBiar ga bingung, baca dokumentasi ini yaa!\nAkhir kata, jangan lupa tidur, dan semoga bantal kalian dingin terus malam ini!'
  );
});

app.use(authRoute);
app.use(detailRoute);
app.use(organicRoute);
app.use(nonOrganicRoute);

app.listen(PORT, () => {
  console.log(`Server API ReTo berjalan pada http://localhost:${PORT} 🟢`);
});
