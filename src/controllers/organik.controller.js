const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');

const router = express.Router();

router.get('/api/organik', async (req, res) => {
  const { page = 1 } = req.query;

  const url = `https://www.cnbcindonesia.com/search?query=sampah%20organik&kanal=news&page=${page}`;

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const articles = [];

    $('div.nhl-list.flex.flex-col.gap-6').each((index, el) => {
      const title = $(el).find('h2.font-semibold.text-23').text().trim();
      const createdAt = $(el).find('span.text-xs.text-gray').text().trim();
      const articleLink = $(el).find('a.group.flex.gap-4.items-center').attr('href');
      const imageUrl = $(el).find('img.w-full.object-cover').attr('src');

      if (title && createdAt && articleLink && imageUrl) {
        articles.push({
          title,
          createdAt,
          articleLink,
          imageUrl,
        });
      } else {
        console.log('Artikel gagal diambil');
      }
    });

    if (articles.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Tidak ada artikel pada halaman ${page}`,
        articles: [],
      });
    }

    res.status(200).json({
      success: true,
      message: 'Berhasil mengambil data',
      page: parseInt(page, 10),
      articles,
    });
  } catch (e) {
    console.error('Error:', e);
    res.status(500).json({ success: false, message: 'Gagal mendapatkan data' });
  }
});

router.get('/api/organik/detail', async (req, res) => {
  const { articleLink } = req.query;

  if (!articleLink.startsWith('https://www.cnbcindonesia.com/news')) {
    return res.status(400).json({
      success: false,
      message: 'Parameter articleLink salah atau tidak ditemukan',
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
      message: 'Gagal mendapatkan data',
    });
  }
});

module.exports = router;
