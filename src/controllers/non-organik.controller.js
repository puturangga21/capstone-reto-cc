import puppeteer from 'puppeteer';

export const getNonOrganic = async (req, res) => {
  const { page = 1 } = req.query;
  const baseUrl = process.env.BASE_ARTICLE_URL;
  const url = `${baseUrl}/page/${page}/?s=non+organik`;

  try {
    // buka browser dan buka tab baru
    const browser = await puppeteer.launch();
    const pageInstance = await browser.newPage();

    // pergi ke url tujuan
    await pageInstance.goto(url);

    // ambil data
    const articles = await pageInstance.$$eval('article', (articles) => {
      return articles.map((article) => {
        const img = article.querySelector('img')?.getAttribute('data-src');
        const title = article.querySelector('header > h3 > a')?.innerText;
        const description = article
          .querySelector('div.mt-4 > div.text-sm > p, div.mt-4 > div.text-sm')
          ?.innerText.trim();
        const articleLink = article.querySelector('div > a')?.getAttribute('href');

        if (img && title && description && articleLink) {
          return { img, title, description, articleLink };
        } else {
          console.log('Artikel gagal diambil');
        }
      });
    });

    // cek dulu kalo halaman kosong
    if (articles.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Tidak ada artikel pada halaman ${page}`,
        articles: [],
      });
    }

    // response kalo sukses
    res.status(200).json({
      success: true,
      message: 'Berhasil mengambil data',
      page: parseInt(page, 10),
      articles,
    });
    await browser.close();
  } catch (e) {
    console.error('Error:', e);
    res.status(500).json({
      success: false,
      message: 'Gagal mendapatkan data, baca dokumentasi yak! ༼ つ ◕_◕ ༽つ',
    });
  }
};
