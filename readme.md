# CAPSTONE Bangkit ReTo

Selamat datang di dokumentasi API ReTo teman-teman! Dokumen ini berisi informasi lengkap tentang cara menggunakan API
untuk mengakses berita tentang pengelolaan sampah. Silakan dibaca dengan seksama guys!.

Selamat mengerjakan teman-teman! 🌍♻️ Jangan lupa istirahat yang cukup! ❤️

## Daftar Isi

- [API Reference](#api-reference)
- [Endpoint Reference](#endpoint-reference)
- [Contoh Penggunaan](#contoh-penggunaan)
- [Tipe Respon](#tipe-respon)
- [Error Handling](#error-handling)
- [Persyaratan](#persyaratan)

## API Reference

### Base URL

```http
http://localhost:2024/api/
```

### Endpoint Umum

```http
GET /api/{endpoint}?page=1
```

#### Parameter

| Parameter  | Tipe     | Deskripsi                                               | Wajib/Opsional        |
|------------|----------|---------------------------------------------------------|-----------------------|
| `endpoint` | `string` | Nama kategori berita (organik, non-organik, daur-ulang) | **Wajib**             |
| `page`     | `number` | Nomor halaman untuk pagination                          | Opsional (default: 1) |

### Endpoint Detail Artikel

```http
GET /api/{endpoint}/detail?articleLink={full_url}
```

#### Parameter Detail

| Parameter     | Tipe     | Deskripsi            | Wajib/Opsional |
|---------------|----------|----------------------|----------------|
| `endpoint`    | `string` | Nama kategori berita | **Wajib**      |
| `articleLink` | `string` | URL lengkap artikel  | **Wajib**      |

## Endpoint Reference

### Daftar Endpoint Tersedia

#### Kategori Sampah Organik

| Endpoint          | Metode | Deskripsi                    |
|-------------------|--------|------------------------------|
| `/organik`        | GET    | Daftar berita sampah organik |
| `/organik/detail` | GET    | Detail berita sampah organik |

#### Kategori Sampah Non-Organik

| Endpoint              | Metode | Deskripsi                        |
|-----------------------|--------|----------------------------------|
| `/non-organik`        | GET    | Daftar berita sampah non-organik |
| `/non-organik/detail` | GET    | Detail berita sampah non-organik |

#### Kategori Daur Ulang

| Endpoint             | Metode | Deskripsi                |
|----------------------|--------|--------------------------|
| `/daur-ulang`        | GET    | Daftar berita daur ulang |
| `/daur-ulang/detail` | GET    | Detail berita daur ulang |

## Contoh Penggunaan

### Contoh Mendapatkan Daftar Artikel

```http
GET /api/organik?page=1
```

### Contoh Mendapatkan Detail Artikel

```http
GET /api/organik/detail?articleLink=https://www.cnbcindonesia.com/news/contoh-artikel
```

## Tipe Respon

### Respon Daftar Artikel

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

### Respon Detail Artikel

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
  "message": "Deskripsi error spesifik"
}
```

## Catatan Tambahan

- Endpoint masih dalam pengembangan
- Daftar endpoint dapat berubah sewaktu-waktu
- Dokumentasi akan terus diperbarui seiring perkembangan proyek

## Kontributor

- Tim Capstone Bangkit Cloud Computing ReTo

---

Selamat mengerjakan! Semoga bantal kalian bisa dingin terus yaa wkwkw. 🌱♻️
