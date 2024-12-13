# CAPSTONE Bangkit ReTo

Welcome to the ReTo API documentation guys! This document contains complete information on how to use the API to access
news about waste management and authentication features. Please read it carefully guys, keep up the spirit!

Good luck with your work, friends! 🌍♻️ Don't forget to get enough rest! ❤️

## List of contents

- [API Reference](#api-reference)
- [Endpoint Reference](#endpoint-reference)
- [Authentication](#contoh-penggunaan-endpoint-autentikasi)
- [News](#contoh-penggunaan-endpoint-berita)
- [Error Handling](#error-handling)

## API Reference

### Base URL

```http
https://www.reto.my.id/api
```

## Endpoint Reference

### List of Available Endpoints

#### News Endpoint

| Endpoint               | Method | Description                    |
|------------------------|--------|--------------------------------|
| `/organik`             | GET    | List of organic waste news     |
| `/non-organik`         | GET    | List of non-organic waste news |
| `/daur-ulang`          | GET    | Recycling news list            |
| `/detail?articleLink=` | GET    | Waste news details             |

#### Authentication Endpoint

| Endpoint    | Method | Description            | Request Body          |
|-------------|--------|------------------------|-----------------------|
| `/register` | POST   | Registering a new user | `{ email, password }` |
| `/login`    | POST   | User Login             | `{ email, password }` |
| `/logout`   | POST   | User Logout            | No body required      |

## Authentication Endpoint Usage Examples

### User Registration

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

#### Response Success

```json
{
  "message": "Email verifikasi terkirim! user berhasil dibuat!",
  "user": {
    "id": "user_id",
    "email": "edgarkusuma@gmail.com"
  }
}
```

#### Response Failed

```json
{
  "error": [
    "Format email tidak valid"
  ]
}
```

### User Login

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

#### Response Success

```json
{
  "message": "User berhasil login",
  "userCredential": {
    ...
  }
}
```

#### Response Failed

```json
{
  "error": [
    "Format email tidak valid"
  ]
}
```

### User Logout

```http
POST /api/logout
```

#### Response Success

```json
{
  "message": "User berhasil logout"
}
```

## Input Validation

Here are the specifications of each authentication endpoint. Please read it, friends:

### Registration and Login Validation Scheme

| Field    | Type   | Validation Rules       | 
|----------|--------|------------------------|
| Email    | String | - Required             | 
|          |        | - Valid email format   | 
| Password | String | - Required             | 
|          |        | - Minimum 6 characters |

## Example of Using News Endpoints

### Get Article List

```http
GET /api/organik?page=1
```

#### Parameter

| Parameter  | Type     | Description                                           | Required/Optional     |
|------------|----------|-------------------------------------------------------|-----------------------|
| `endpoint` | `string` | News category name (organik, non-organik, daur-ulang) | **Required**          |
| `page`     | `number` | Page numbers for pagination                           | Optional (default: 1) |

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

#### Key Points

- value `articleLink` is used for the `articleLink` parameter on the `detail` endpoint
- an example can be seen in the endpoint below

### Get Article Details

```http
GET /api/detail?articleLink=https://www.example.com
```

#### Detail Parameters

| Parameter     | Type     | Description                                                                                    | Required/Optional |
|---------------|----------|------------------------------------------------------------------------------------------------|-------------------|
| `articleLink` | `string` | Used to hold `articleLink`                                                                     | **Required**      |
| `full_url`    | `string` | Full URL of the article, value can be seen in the article response list, `articleLink` section | **Required**      |

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

### Types of Errors That May Occur

| Status Code | Description                    |
|-------------|--------------------------------|
| 200         | Success                        |
| 400         | Invalid or incorrect parameter |
| 401         | Not authenticated              |
| 404         | Article or source not found    |
| 422         | Data validation failed         |
| 500         | Internal server error          |

### Response Error Example

```json
{
  "success": false,
  "message": "Gagal mendapatkan data, baca dokumentasi yak! ༼ つ ◕_◕ ༽つ"
}
```

## Additional Notes

- The list of endpoints is subject to change at any time
- Documentation will continue to be updated as the project progresses.

## Contributors

### Team Capstone Bangkit Cloud Computing ReTo

<table>
  <tr>
    <td align="center"><a href="https://github.com/puturangga21"><img src="https://avatars.githubusercontent.com/u/61723244?v=4" width="100px;" alt=""/><br /><sub><b>Rangga Sutha</b></sub></a>
    <td align="center"><a href="https://github.com/edgarkusuma07"><img src="https://avatars.githubusercontent.com/u/114984440?v=4" width="100px;" alt=""/><br /><sub><b>Edgar Kusuma</b></sub></a>
  </tr>
</table>

---

Good luck! Hopefully your pillows can stay cool forever, haha. 🌱♻️