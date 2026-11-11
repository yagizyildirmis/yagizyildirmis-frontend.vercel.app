# Kampüs Etkinlikleri — Vize Projesi

React + TypeScript ile hazırlanmış kampüs etkinlikleri arayüzü. Sayfalar React Router ile açılır; etkinlik verisi `EventsContext` üzerinden paylaşılır ve ekleme, silme, güncelleme işlemleri sayfalar arasında korunur.

## Kurulum ve çalıştırma

```bash
cd frontend
npm install
npm run dev
```

Üretim derlemesi için `npm run build` kullanılır.

## Route listesi

| Adres | Sayfa |
| --- | --- |
| `/` | Ana sayfa |
| `/events` | Etkinlik listesi, arama ve kategori filtresi |
| `/events/:id` | Etkinlik detayı |
| `/login` | Giriş formu |
| `/register` | Kayıt formu |
| `/forgot-password` | Şifre yenileme formu |
| `/admin` | Etkinlik yönetimi |
| `/admin/new` | Etkinlik ekleme |
| `/admin/:id/edit` | Etkinlik güncelleme |
| `*` | Sayfa bulunamadı |

## Uygulama notları

- Giriş, kayıt ve şifre yenileme ekranları bu sprintte form doğrulaması ve demo mesajı gösterir; gerçek kullanıcı hesabı veya e-posta gönderimi yapılmaz.
- Yönetim sayfası bu sprintte doğrudan açılır. Yetkilendirme henüz eklenmemiştir.
- Etkinlik değişiklikleri `EventsContext` belleğinde tutulur; sayfa geçişlerinde korunur, tarayıcı yenilendiğinde başlangıç verisine döner.
- Canlı Vercel adresi: yayınlama sonrası eklenecek.

## Vercel'e yükleme

Vercel projesini içe aktarırken **Root Directory** değerini `frontend` seçin. Build komutu `npm run build`, çıktı klasörü `dist` olmalıdır. `frontend/vercel.json`, React Router adreslerinin doğrudan açılabilmesi için SPA rewrite kuralını içerir. Canlı adresi yayınlamadan sonra bu README'ye ekleyin.

## Backend (Sprint 7)

Backend, frontend'den ayrı olarak `localhost:3000` adresinde çalışan Express REST API'sidir. Bu sprintte API Vercel'e yüklenmez; frontend'in yayın ayarları değişmez.

```bash
cd backend
npm install
npm run dev
```

Sağlık kontrolü: `GET http://localhost:3000/health`

Etkinlik listesi ve detayları `GET /events`, `GET /events/:id` ile okunur. Yeni etkinlik `POST /events` ile eklenir. Kategori filtresi için `GET /events?category=Atölye` kullanılabilir. Bu sprintte veriler sunucu belleğinde tutulur; sunucu yeniden başlatılınca başlangıçtaki altı etkinlik geri yüklenir. İstek örnekleri `backend/requests/kampus-api.json` Postman koleksiyonundadır.
