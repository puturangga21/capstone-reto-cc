import axios from 'axios';
import * as cheerio from 'cheerio';

export const getAllOrganic = async (req, res) => {
  const { page = 1 } = req.query;

  const url = `${process.env.URL_CNBC_ORGANIK}&page=${page}`;

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
    res.status(500).json({
      success: false,
      message: 'Gagal mendapatkan data, baca dokumentasi yak! ༼ つ ◕_◕ ༽つ',
    });
  }
};
