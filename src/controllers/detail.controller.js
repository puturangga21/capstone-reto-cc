import axios from 'axios';
import * as cheerio from 'cheerio';
import express from 'express';

const router = express.Router();

router.get('/api/detail', async (req, res) => {
  const { articleLink } = req.query;

  if (!articleLink || !articleLink.startsWith(process.env.URL_CNBC_BASE)) {
    return res.status(400).json({
      success: false,
      message:
        'Parameter articleLink salah atau tidak ditemukan, baca dokumentasi yak! ༼ つ ◕_◕ ༽つ',
    });
  }

  try {
    const { data } = await axios.get(articleLink);
    const $ = cheerio.load(data);

    const title = $('h1.mb-4.text-32.font-extrabold').text().trim();
    const author = $('div.mb-1.text-base.font-semibold').text().trim();
    const createdAt = $('div.text-cm.text-gray').text().trim();
    const imgUrl = $('img.mb-3.aspect-video.w-full.object-cover').attr('src');
    const detailTeks = $('div.detail-text p').text().trim();

    if (!title || !author || !createdAt || !imgUrl || !detailTeks) {
      return res.status(404).json({ success: false, message: 'Detail artikel tidak ditemukan' });
    }

    res.status(200).json({
      success: true,
      message: 'Berhasil mengambil detail artikel',
      article: {
        title,
        author,
        createdAt,
        imgUrl,
        detailTeks,
      },
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: 'Gagal mendapatkan data, baca dokumentasi yak! ༼ つ ◕_◕ ༽つ',
    });
  }
});

export default router;
