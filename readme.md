# CAPSTONE Bangkit ReTo

Selamat datang di dokumentasi API ReTo teman-teman! Dokumen ini berisi informasi lengkap tentang cara menggunakan API
untuk mengakses berita tentang pengelolaan sampah. Silakan dibaca dengan seksama guys, semangattt!

Selamat mengerjakan teman-teman! 🌍♻️ Jangan lupa istirahat yang cukup! ❤️

## Daftar Isi

- [API Reference](#api-reference)
- [Endpoint Reference](#endpoint-reference)
- [Contoh Penggunaan](#contoh-penggunaan)
- [Error Handling](#error-handling)

## API Reference

### Base URL

```http
http://localhost:2024/api/
```

### Endpoint Umum

```http
GET /api/{endpoint}?page=1
```

- endpoint ini masih sementara ya, karena masih tahap development
- tapi secara penggunaan nanti bakal sama kok

#### Parameter

| Parameter  | Tipe     | Deskripsi                                               | Wajib/Opsional        |
|------------|----------|---------------------------------------------------------|-----------------------|
| `endpoint` | `string` | Nama kategori berita (organik, non-organik, daur-ulang) | **Wajib**             |
| `page`     | `number` | Nomor halaman untuk pagination                          | Opsional (default: 1) |

### Endpoint Detail Artikel

```http
GET /api/detail?articleLink={full_url}
```

#### Parameter Detail

| Parameter     | Tipe     | Deskripsi                                                                              | Wajib/Opsional |
|---------------|----------|----------------------------------------------------------------------------------------|----------------|
| `articleLink` | `string` | Digunakan untuk menampung `articleLink`                                                | **Wajib**      |
| `full_url`    | `string` | URL lengkap artikel, value bisa dilihat di response list artikel, bagian `articleLink` | **Wajib**      |

## Endpoint Reference

### Daftar Endpoint Tersedia

| Endpoint               | Metode | Deskripsi                        |
|------------------------|--------|----------------------------------|
| `/organik`             | GET    | Daftar berita sampah organik     |
| `/non-organik`         | GET    | Daftar berita sampah non-organik |
| `/daur-ulang`          | GET    | Daftar berita daur ulang         |
| `/detail?articleLink=` | GET    | Detail berita sampah organik     |

## Contoh Penggunaan

### Contoh Mendapatkan Daftar Artikel

```http
GET /api/organik?page=1
```

### Contoh Response Daftar Artikel

```json
{
  "success": true,
  "message": "Berhasil mengambil data",
  "page": 1,
  "articles": [
    {
      "title": "Wujudkan Kepahlawanan, Local Hero Pertamina Penggerak Perekonomian",
      "createdAt": "1 minggu yang lalu",
      "articleLink": "https://www.cnbcindonesia.com/news/20241111105403-4-587203/wujudkan-kepahlawanan-local-hero-pertamina-penggerak-perekonomian",
      "imageUrl": "https://akcdn.detik.net.id/visual/2024/11/11/dok-pertamina_43.jpeg?w=200&q=90"
    }
  ]
}
```

#### Poin Penting

- value `articleLink` digunakan untuk parameter `articleLink` pada endpoint `detail`
- contoh nya bisa dilihat pada endpoint dibawah ini

### Contoh Mendapatkan Detail Artikel

```http
GET /api/organik/detail?articleLink=https://www.cnbcindonesia.com/news/contoh-artikel
```

### Contoh Response Detail Artikel

```json
{
  "success": true,
  "message": "Berhasil mengambil detail artikel",
  "article": {
    "title": "Wujudkan Kepahlawanan, Local Hero Pertamina Penggerak Perekonomian",
    "author": "Teti Purwanti, CNBC Indonesia",
    "createdAt": "11 November 2024 10:57",
    "imgUrl": "https://akcdn.detik.net.id/visual/2024/11/11/dok-pertamina_169.jpeg?w=715&q=90",
    "detailTeks": "Konten Artikel Lengkap"
  }
}
```

## Error Handling

### Jenis Error yang Mungkin Terjadi

| Kode Status | Deskripsi                        |
|-------------|----------------------------------|
| 200         | Berhasil                         |
| 400         | Parameter salah atau tidak valid |
| 404         | Artikel tidak ditemukan          |
| 500         | Kesalahan server internal        |

### Contoh Respon Error

```json
{
  "success": false,
  "message": "Gagal mendapatkan data, baca dokumentasi yak! ༼ つ ◕_◕ ༽つ"
}
```

## Catatan Tambahan

- Endpoint masih dalam pengembangan
- Daftar endpoint dapat berubah sewaktu-waktu
- Dokumentasi akan terus diperbarui seiring perkembangan proyek

## Kontributor

- Tim Capstone Bangkit Cloud Computing ReTo

<table>
  <tr>
    <td align="center"><a href="https://github.com/puturangga21"><img src="https://avatars.githubusercontent.com/u/61723244?v=4" width="100px;" alt=""/><br /><sub><b>Rangga Sutha</b></sub></a>
    <td align="center"><a href=""><img src="https://placehold.jp/3d4070/ffffff/150x150.png" width="100px;" alt=""/><br /><sub><b>Edgar Kusuma</b></sub></a>
  </tr>
</table>

---

Selamat mengerjakan! Semoga bantal kalian bisa dingin terus yaa wkwkw. 🌱♻️
