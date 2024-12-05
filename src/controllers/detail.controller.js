import puppeteer from 'puppeteer';

export const getDetailNews = async (req, res) => {
  const { articleLink } = req.query;

  if (!articleLink || !articleLink.startsWith(process.env.BASE_ARTICLE_URL)) {
    return res.status(400).json({
      success: false,
      message:
        'Parameter articleLink salah atau tidak ditemukan, baca dokumentasi yak! ༼ つ ◕_◕ ༽つ',
    });
  }

  try {
    // buka browser dan buka tab baru
    const browser = await puppeteer.launch({
      executablePath: '/usr/bin/chromium-browser',
    });
    const pageInstance = await browser.newPage();

    // pergi ke url tujuan
    await pageInstance.goto(articleLink);

    // ambil data
    const title = await pageInstance.$eval('article > header > h1', (el) => el.innerText);
    const author = await pageInstance.$eval('header > div > span > span a', (el) => el.innerText);
    const createdAt = await pageInstance.$eval('span > a > time.published', (el) => el.innerText);
    const imgUrl = await pageInstance.$eval('figure.aligncenter > img', (el) =>
      el.getAttribute('data-src')
    );
    const detailTeks = await pageInstance.$$eval('div.prose > *', (elements) =>
      elements.map((el) => el.innerText.trim()).filter((text) => text !== '')
    );

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
    await browser.close();
  } catch (e) {
    res.status(500).json({
      success: false,
      message: 'Gagal mendapatkan data, baca dokumentasi yak! ༼ つ ◕_◕ ༽つ',
    });
  }
};
