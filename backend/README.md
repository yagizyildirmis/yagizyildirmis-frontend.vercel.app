# Kampüs Etkinlikleri API — Sprint 7

Node.js ve Express ile hazırlanmış REST API. Bu sprintte veriler bellekte tutulur; sunucu her yeniden başladığında `src/data/events.js` içindeki altı başlangıç etkinliği yüklenir. Gerçek veritabanı bağlantısı bu sprintin kapsamında değildir.

## Kurulum ve çalıştırma

```bash
cd backend
npm install
npm run dev
```

Sunucu varsayılan olarak `http://localhost:3000` adresinde açılır. Portu `.env` dosyasındaki `PORT` değeriyle değiştirebilirsiniz. `.env.example` örnek dosyadır; gerçek `.env` Git'e eklenmemelidir.

Sağlık kontrolü: `GET http://localhost:3000/health`

## REST sözleşmesi

| Method | Endpoint | Amaç | Başarılı yanıt | Hata yanıtı |
| --- | --- | --- | --- | --- |
| GET | `/health` | Sunucunun durumunu ve öğrenci numarasını gösterir | 200 | — |
| GET | `/events` | Etkinlikleri listeler | 200 | — |
| GET | `/events?category=Atölye` | Kategoriye göre filtreler | 200 | — |
| GET | `/events/:id` | Tek etkinliği getirir | 200 | 404 |
| POST | `/events` | Yeni etkinlik ekler | 201 | 400 |
| PATCH | `/events/:id` | Etkinliği günceller (Sprint 9) | 200 | 404 |
| DELETE | `/events/:id` | Etkinliği siler (Sprint 9) | 204 | 404 |

GET ve POST adresleri bu sprintte uygulanmıştır. PATCH ve DELETE sözleşmede sonraki sprint için listelenmiştir.

## POST örneği

`Content-Type: application/json` başlığıyla şu gövdeyi gönderin:

```json
{
  "title": "Postman İletişim Atölyesi",
  "category": "Atölye",
  "date": "2026-12-01",
  "time": "13:00",
  "location": "Bilgisayar Laboratuvarı 1",
  "description": "REST API üzerinden eklenen örnek etkinlik.",
  "capacity": 24
}
```

`title`, `category` ve `date` zorunludur. Eksikse 400 ve `{ "error": { "message": "..." } }` biçiminde JSON döner. Bulunmayan etkinlik veya route için de hata yanıtı aynı `error.message` yapısını kullanır.

## Postman

`requests/kampus-api.json` dosyasını Postman'de **Import** ile içe aktarın. Koleksiyonda sağlık kontrolü, liste, detay, 404, başarılı POST ve eksik alanlı POST olmak üzere altı istek bulunur. İsteklerin adresi `http://localhost:3000` temel URL'sini kullanır.
