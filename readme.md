# CAPSTONE Bangkit ReTo

Selamat datang di dokumentasi API ReTo teman-teman! Dokumen ini berisi informasi lengkap tentang cara menggunakan API
untuk mengakses berita tentang pengelolaan sampah dan fitur autentikasi. Silakan dibaca dengan seksama guys, semangat!

Selamat mengerjakan teman-teman! 🌍♻️ Jangan lupa istirahat yang cukup! ❤️

## Daftar Isi

- [API Reference](#api-reference)
- [Endpoint Reference](#endpoint-reference)
- [Autentikasi](#contoh-penggunaan-endpoint-autentikasi)
- [Berita](#contoh-penggunaan-endpoint-berita)
- [Error Handling](#error-handling)

## API Reference

### Base URL

```http
http://34.101.128.116/api/
```

- endpoint ini masih sementara ya, karena masih tahap development
- tapi secara penggunaan nanti bakal sama kok

## Endpoint Reference

### Daftar Endpoint Tersedia

#### Endpoint Berita

| Endpoint               | Metode | Deskripsi                        |
|------------------------|--------|----------------------------------|
| `/organik`             | GET    | Daftar berita sampah organik     |
| `/non-organik`         | GET    | Daftar berita sampah non-organik |
| `/daur-ulang`          | GET    | Daftar berita daur ulang         |
| `/detail?articleLink=` | GET    | Detail berita sampah             |

#### Endpoint Autentikasi

| Endpoint          | Metode | Deskripsi                  | Request Body          |
|-------------------|--------|----------------------------|-----------------------|
| `/register`       | POST   | Mendaftarkan user baru     | `{ email, password }` |
| `/login`          | POST   | Login pengguna             | `{ email, password }` |
| `/logout`         | POST   | Logout pengguna            | Tidak memerlukan body |
| `/reset-password` | POST   | Kirim email reset password | `{ email }`           |

## Contoh Penggunaan Endpoint Autentikasi

### Registrasi Pengguna

```http
POST /api/register
```

#### Request Body

```json
{
  "email": "edgarkusuma@gmail.com",
  "password": "passwordMinimal6Karakter"
}
```

#### Response Sukses

```json
{
  "message": "Email verifikasi terkirim! user berhasil dibuat!",
  "user": {
    "id": "user_id",
    "email": "edgarkusuma@gmail.com"
  }
}
```

#### Response Gagal

```json
{
  "error": [
    "Format email tidak valid"
  ]
}
```

### Login Pengguna

```http
POST /api/login
```

#### Request Body

```json
{
  "email": "edgarkusuma@gmail.com",
  "password": "passwordMinimal6Karakter"
}
```

#### Response Sukses

```json
{
  "message": "User berhasil login",
  "userCredential": {
    ...
  }
}
```

#### Response Gagal

```json
{
  "error": [
    "Format email tidak valid"
  ]
}
```

### Logout Pengguna

```http
POST /api/logout
```

#### Response Sukses

```json
{
  "message": "User berhasil logout"
}
```

### Reset Password

```http
POST /api/reset-password
```

#### Request Body

```json
{
  "email": "user@example.com"
}
```

#### Response Sukses

```json
{
  "message": "Email reset password berhasil dikirim!"
}
```

## Validasi Input

Ini spesifikasi dari setiap endpoint autentikasi. Silahkan dibaca temen-temen:

### Skema Validasi Registrasi dan Login

| Field    | Tipe   | Aturan Validasi      | 
|----------|--------|----------------------|
| Email    | String | - Wajib diisi        | 
|          |        | - Format email valid | 
| Password | String | - Wajib diisi        | 
|          |        | - Minimal 6 karakter |

### Skema Validasi Reset Password

| Field | Tipe   | Aturan Validasi      | 
|-------|--------|----------------------|
| Email | String | - Wajib diisi        | 
|       |        | - Format email valid | 

## Contoh Penggunaan Endpoint Berita

### Mendapatkan Daftar Artikel

```http
GET /api/organik?page=1
```

#### Parameter

| Parameter  | Tipe     | Deskripsi                                               | Wajib/Opsional        |
|------------|----------|---------------------------------------------------------|-----------------------|
| `endpoint` | `string` | Nama kategori berita (organik, non-organik, daur-ulang) | **Wajib**             |
| `page`     | `number` | Nomor halaman untuk pagination                          | Opsional (default: 1) |

#### Response Body

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

### Mendapatkan Detail Artikel

```http
GET /api/detail?articleLink=https://www.cnbcindonesia.com/news/contoh-artikel
```

#### Parameter Detail

| Parameter     | Tipe     | Deskripsi                                                                              | Wajib/Opsional |
|---------------|----------|----------------------------------------------------------------------------------------|----------------|
| `articleLink` | `string` | Digunakan untuk menampung `articleLink`                                                | **Wajib**      |
| `full_url`    | `string` | URL lengkap artikel, value bisa dilihat di response list artikel, bagian `articleLink` | **Wajib**      |

#### Response Body

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

| Kode Status | Deskripsi                           |
|-------------|-------------------------------------|
| 200         | Berhasil                            |
| 400         | Parameter salah atau tidak valid    |
| 401         | Tidak terautentikasi                |
| 404         | Artikel atau sumber tidak ditemukan |
| 422         | Validasi data gagal                 |
| 500         | Kesalahan server internal           |

### Contoh Response Error

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
- Gunakan fitur autentikasi untuk mengamankan akses aplikasi

## Kontributor

### Tim Capstone Bangkit Cloud Computing ReTo

<table>
  <tr>
    <td align="center"><a href="https://github.com/puturangga21"><img src="https://avatars.githubusercontent.com/u/61723244?v=4" width="100px;" alt=""/><br /><sub><b>Rangga Sutha</b></sub></a>
    <td align="center"><a href="https://github.com/edgarkusuma07"><img src="https://avatars.githubusercontent.com/u/114984440?v=4" width="100px;" alt=""/><br /><sub><b>Edgar Kusuma</b></sub></a>
  </tr>
</table>

---

Selamat mengerjakan! Semoga bantal kalian bisa dingin terus yaa wkwkw. 🌱♻️