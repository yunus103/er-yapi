# ER YAPI Site Planı ve Uygulama Yol Haritası

**Durum:** Planlama kararı  
**Uygulama başlangıcı:** Kullanıcı onayından sonra  
**Temel yaklaşım:** Mevcut Next.js + Sanity boilerplate yapısını koruyarak ER YAPI'ya uyarlamak

## 1. Proje Özeti

ER YAPI için hazırlanacak web sitesi bir e-ticaret sitesi değildir. Site; GPD, E.C.A. ve SEREL ürünlerini düzenli bir katalog yapısında gösterecek, ER YAPI'nın mağaza güvenini yansıtacak ve ziyaretçiyi ürün hakkında fiyat/stok bilgisi almaya veya mağazayla iletişime geçmeye yönlendirecektir.

Mevcut boilerplate'in Sanity bağlantısı, singleton sayfa yaklaşımı, GROQ sorguları, ISR/webhook altyapısı, SEO yardımcıları, ortak UI bileşenleri ve `PageHero` yapısı korunacaktır. Yeni bir CMS veya paralel içerik sistemi kurulmayacaktır.

## 2. Alınan Kararlar

| Konu | Karar |
|---|---|
| Site tipi | Kurumsal ürün kataloğu |
| Online satış | Yok |
| Fiyat gösterimi | Yok |
| Sepet ve ödeme | Yok |
| Ana aksiyon | Fiyat/stok bilgisi alma ve iletişim |
| Tasarım yönü | Showroom Precision |
| Markalar | GPD, E.C.A., SEREL |
| Markalar sayfası | Oluşturulmayacak |
| Marka gösterimi | Ana sayfadaki tek bir bölümde |
| Hizmetler | Mevcut yapı korunacak, şimdilik geliştirilmeyecek ve ana navigasyonda kullanılmayacak |
| Blog | Mevcut yapı korunacak ve tasarım sistemine uyarlanacak |
| Projeler | Ürünler yapısına dönüştürülecek |
| İçerik yönetimi | Görünür editoryal içerikler Sanity'den düzenlenebilir olacak |
| Başlangıç içeriği | Yeni ve uyarlanan şemalarda anlamlı `initialValue` değerleri kullanılacak |

## 3. Ana Navigasyon

```text
Ana Sayfa
Ürünler
Hakkımızda
Blog
İletişim
```

Navigasyonda Markalar, Projeler veya Hizmetler bağlantısı bulunmayacaktır.

## 4. Site Haritası

```text
/
├── /urunler
│   └── /urunler/[slug]
├── /hakkimizda
├── /blog
│   └── /blog/[slug]
└── /iletisim
```

### Route kararları

- `/projeler` ve `/projeler/[slug]` ürün yapısına dönüştürülecektir.
- Yeni public yapı `/urunler` ve `/urunler/[slug]` olacaktır.
- Proje henüz yeni olduğu ve eski ER YAPI URL'leri indekslenmediği için eski `/projeler` rotası için yönlendirme zorunlu değildir.
- Hizmetler route ve şemaları kod tabanından silinmeyecektir; bu aşamanın kapsamı dışında bırakılacaktır.
- Ayrı marka route'ları oluşturulmayacaktır.

## 5. Ürün Bilgi Mimarisi

Ürünler üç ana kategori altında düzenlenecektir.

### 5.1 Isıtma ve Soğutma

- Kombi
- Klima
- Isı pompası
- Radyatör ve havlupan
- Su ısıtıcıları
- Merkezi ve yardımcı ısıtma sistemleri

### 5.2 Banyo ve Armatür

- Banyo ve lavabo bataryaları
- Duş sistemleri
- Klozet ve lavabolar
- Gömme rezervuarlar
- Banyo aksesuarları

### 5.3 Tesisat ve Teknik Ürünler

- Valfler
- Kolektörler
- Doğalgaz sayaçları
- Tamamlayıcı ürünler
- Endüstriyel ürünler

Alt kategoriler Sanity üzerinden yönetilebilir ve sıralanabilir olacaktır. Yeni ürün grupları eklemek için frontend kodu değiştirmek gerekmemelidir.

## 6. Sanity İçerik Modeli

### 6.1 `product`

Mevcut `project` dokümanı ürün ihtiyaçlarına göre `product` yapısına dönüştürülecektir.

Planlanan temel alanlar:

- Ürün adı
- Slug
- Marka referansı
- Ana kategori/alt kategori referansı
- Ürün kodu
- Seri veya koleksiyon bilgisi
- Kısa açıklama
- Ana görsel
- Görsel galerisi
- Zengin içerik
- Teknik özellikler
- Teknik doküman veya katalog bağlantıları
- Öne çıkan ürün seçeneği
- Sıralama bilgisi
- SEO alanları

Ürüne özel gerçek bilgiler `initialValue` ile uydurulmayacaktır. Yeni ürün dokümanlarında yalnızca güvenli sistem varsayılanları kullanılabilir; örneğin `featured: false` veya standart CTA davranışı.

### 6.2 `productCategory`

Kategori sistemi frontend içine sabitlenmeyecektir.

Planlanan alanlar:

- Kategori adı
- Slug
- Üst kategori referansı
- Kısa açıklama
- Görsel
- Sıralama
- Aktif/pasif durumu

Üç ana kategori ilk Sanity kurulumunda hazır başlangıç verisi veya tanımlı içerik olarak oluşturulacaktır.

### 6.3 `brand`

Ayrı bir Markalar sayfası bulunmasa da ürün ilişkisi ve ana sayfa marka bölümü için marka dokümanı kullanılacaktır.

Planlanan alanlar:

- Marka adı
- Logo
- Kısa açıklama
- Harici web sitesi bağlantısı
- Sıralama
- Ana sayfada gösterme seçeneği

Başlangıç markaları GPD, E.C.A. ve SEREL olacaktır. Marka dokümanları public detay route'u üretmeyecektir.

### 6.4 `productsPage`

Mevcut `projectsPage` singleton'ı ürünler sayfasına dönüştürülecektir. `PageHero`, giriş içeriği, bölüm metinleri, filtre alanı açıklaması, boş durum mesajı ve CTA içerikleri Sanity'den yönetilecektir.

### 6.5 `homePage`

`featuredProjects` ve proje bölümü alanları ürün karşılıklarına dönüştürülecektir:

- `productsTitle`
- `productsSubtitle`
- `featuredProducts`
- `categoriesTitle`
- `featuredCategories`
- `brandsTitle`
- `featuredBrands`
- Showroom/tanıtım bölümü içerikleri

Bu alanların başlıkları, açıklamaları, görselleri ve CTA metinleri Sanity'den düzenlenebilir olacaktır.

## 7. Sanity İçerik Yönetimi Sözleşmesi

### 7.1 Sanity'den yönetilecek içerikler

- Sayfa başlıkları ve alt başlıkları
- Bölüm başlıkları ve açıklamaları
- CTA metinleri ve bağlantıları
- Ürün, kategori ve marka içerikleri
- Öne çıkan ürün/kategori/marka seçimleri
- Görseller ve alt metinleri
- Hakkımızda metinleri
- Blog içerikleri
- İletişim içerikleri
- SEO başlıkları ve açıklamaları

Arayüzün mekanik ifadeleri dışında kullanıcıya sunulan editoryal metinler component içine hardcode edilmeyecektir.

### 7.2 `initialValue` yaklaşımı

Singleton ve yeni içerik şemaları ilk açılışta boş sayfa üretmemelidir. Sanity `initialValue` özelliğiyle marka bağlamına uygun başlangıç metinleri sağlanacaktır.

Önerilen başlangıç içerikleri:

| Alan | Başlangıç değeri |
|---|---|
| Ana sayfa hero başlığı | Banyo, ısıtma ve tesisat ürünleri tek adreste. |
| Ana sayfa hero açıklaması | GPD, E.C.A. ve SEREL ürünlerini ER YAPI'da inceleyin. |
| Ana hero CTA | Ürünleri İncele |
| Kategori bölümü başlığı | Ürün Grupları |
| Ürün bölümü başlığı | Öne Çıkan Ürünler |
| Marka bölümü başlığı | Çalıştığımız Markalar |
| Ürünler PageHero başlığı | Ürünler |
| Ürünler açıklaması | Isıtma, soğutma, banyo ve tesisat ürünlerini marka ve kategoriye göre inceleyin. |
| Ürün boş durum mesajı | Ürünler çok yakında eklenecek. |
| Hakkımızda PageHero başlığı | ER YAPI Hakkında |
| Blog PageHero başlığı | Blog |
| İletişim PageHero başlığı | İletişim |
| Ürün iletişim CTA | Fiyat ve Stok Bilgisi Al |

Bu değerler yalnızca başlangıç içeriğidir. Sanity editörü tarafından değiştirilebilir ve mevcut editoryal veriyi hiçbir zaman otomatik olarak ezmez.

## 8. `project → product` Dönüşüm Kapsamı

Dönüşüm yalnızca dosya veya route adını değiştirmekten ibaret değildir. Aşağıdaki zincir birlikte güncellenecektir:

- Sanity `project` dokümanı
- `projectsPage` singleton'ı
- Sanity schema registry ve Studio sidebar yapısı
- `homePage` proje referansları
- GROQ sorguları
- TypeScript tipleri
- Ana sayfa proje componentleri
- `/projeler` liste route'u
- `/projeler/[slug]` detay route'u
- Navigasyon iç referansları
- Metadata ve canonical yollar
- Sitemap kayıtları
- JSON-LD yapısı (`CreativeWork` yerine uygun `Product` verisi)
- Cache tag isimleri
- Sanity webhook type/tag eşlemeleri
- Revalidation projection ve listeyi etkileyen alanlar
- Öne çıkan içerik fallback sorguları
- İlgili ürün sorguları

Boilerplate'in mevcut dar cache invalidation yaklaşımı korunacak; ürün gövdesindeki sıradan bir değişiklik gereksiz yere bütün sitemap veya tüm site cache'ini temizlemeyecektir.

## 9. Sayfa Planları

### 9.1 Ana Sayfa

Önerilen bölüm sırası:

1. Mevcut `PageHero`
2. Üç ana ürün kategorisi
3. Öne çıkan ürünler
4. GPD, E.C.A. ve SEREL marka bölümü
5. ER YAPI/showroom tanıtımı
6. Blog önizlemesi
7. İletişim CTA'sı

Başlıklar, açıklamalar, görseller, seçimler ve CTA'lar `homePage` üzerinden yönetilecektir.

### 9.2 Ürünler

- `PageHero`
- Ürün adı veya koduyla arama
- Marka filtresi
- Ana kategori ve alt kategori filtresi
- Ürün listesi
- Sonuç bulunamadı/ürün eklenmedi durumu
- İletişim CTA'sı

Ürün kartında fiyat, stok adedi, sepet veya indirim rozeti bulunmayacaktır.

### 9.3 Ürün Detayı

- `PageHero`
- Ürün görsel galerisi
- Marka, kategori ve ürün kodu
- Kısa açıklama
- Teknik özellikler
- Zengin ürün içeriği
- Varsa katalog ve teknik dokümanlar
- Fiyat/stok bilgisi CTA'sı
- İlgili ürünler

### 9.4 Hakkımızda

- `PageHero`
- ER YAPI tanıtımı
- Mağaza/showroom yaklaşımı
- Ürün grupları ve çalışma anlayışı
- Gerçek mağaza görselleri
- Ürünler veya iletişime yönlendiren CTA

Doğrulanmamış kuruluş yılı, ekip, proje sayısı veya müşteri metriği kullanılmayacaktır.

### 9.5 Blog

Mevcut blog liste ve detay yapısı korunacaktır. Yapısal bir CMS dönüşümü yapılmayacak; sayfalar ER YAPI tasarım diline uyarlanacaktır.

### 9.6 İletişim

Mevcut Sanity tabanlı içerik ve iletişim yapısı korunacaktır. Sayfa yalnızca ortak ER YAPI tasarım sistemine uyarlanacaktır.

## 10. Uygulama Sırası

### Faz 1 — Proje ve marka temeli

- Boilerplate proje kimliğini ER YAPI olarak güncelle
- Barlow Condensed ve Source Sans 3 fontlarını kur
- ER YAPI OKLCH tema tokenlarını `globals.css` içinde tanımla
- Global spacing, radius ve temel component görünümünü tasarım diline bağla
- Header ve footer navigasyonunu onaylanan site haritasına göre kur
- Mevcut `PageHero` ve ortak UI parçalarını yeni tema altında tutarlı hale getir

### Faz 2 — Sanity ürün altyapısı

- `brand` ve `productCategory` içerik tiplerini ekle
- `project` yapısını `product` yapısına dönüştür
- `projectsPage` yapısını `productsPage` yapısına dönüştür
- `homePage` proje alanlarını ürün, kategori ve marka alanlarına dönüştür
- Yeni sayfa alanlarına anlamlı `initialValue` içerikleri ekle
- Schema registry, Studio structure ve singleton ayarlarını güncelle

### Faz 3 — Veri erişimi, route ve SEO dönüşümü

- Ürün ve kategori GROQ sorgularını yaz
- TypeScript tiplerini ürün modeline göre güncelle
- `/projeler` route zincirini `/urunler` olarak dönüştür
- Cache tag ve webhook eşlemelerini ürün modeline geçir
- Sitemap ve canonical URL'leri güncelle
- Product JSON-LD yapısını ekle
- Ana sayfa featured product veri akışını tamamla

### Faz 4 — Ana Sayfa

- Onaylanan bölüm sırasını uygula
- Ürün kategorileri bölümünü tasarla
- Öne çıkan ürünleri bağla
- Marka bölümünü bağla
- Showroom/tanıtım ve iletişim CTA alanlarını tasarla
- İlk masaüstü ve mobil görsel kontrolü yap

### Faz 5 — Ürünler ve Ürün Detayı

- Ürün listeleme düzenini tasarla
- Arama ve filtreleme davranışını ekle
- Ürün kartı sistemini oluştur
- Ürün detay sayfasını tasarla
- Teknik özellik, doküman ve ilgili ürün yapılarını bağla
- Boş veri ve az ürün durumlarını doğrula

### Faz 6 — Hakkımızda

- Sayfayı tasarım diline göre tasarla
- Bütün metin ve görsel alanlarını Sanity'ye bağla
- Gerçek içerik gelmeden sayfanın boş görünmemesini `initialValue` ile sağla

### Faz 7 — Blog

- Mevcut blog liste sayfasını ER YAPI tasarımına uyarla
- Blog detay okuma deneyimini uyarla
- Mevcut kategori, SEO ve cache davranışını koru

### Faz 8 — İletişim

- Mevcut sayfayı ER YAPI tasarım sistemine uyarla
- Mevcut Sanity içerik akışını koru
- Form, harita ve iletişim aksiyonlarının görsel uyumunu tamamla

### Faz 9 — Son kontrol ve teslim

- Header/footer ve bütün navigasyon bağlantılarını doğrula
- Eski proje adları, route'ları ve referanslarını tara
- TypeScript, hedefli ESLint ve production build çalıştır
- Sitemap, metadata, canonical ve JSON-LD çıktılarını doğrula
- Sanity webhook ürün create/update/delete senaryolarını kontrol et
- Masaüstü ve mobil tarayıcı QA yap
- Boş, az ve çok ürün senaryolarını kontrol et

## 11. Uygulama Dışı Kapsam

Bu ilk sürümde aşağıdakiler yapılmayacaktır:

- E-ticaret, sepet veya ödeme
- Ürün fiyatı ve canlı stok yönetimi
- Ayrı Markalar sayfası
- Hizmetler sayfasının yeniden tasarlanması
- Karmaşık animasyon veya 3D/WebGL deneyimi
- Üretici sitelerinden otomatik ürün scraping/import sistemi
- Sahte ürün veya kurumsal içerik üretimi
- Mevcut boilerplate mimarisini gereksiz yere yeniden kurma

## 12. Çalışma ve Onay Yöntemi

Uygulama tek seferde bütün siteyi değiştirmek yerine fazlar halinde yürütülecektir.

Her ana fazda:

1. İlgili veri ve component zinciri incelenir.
2. Sadece o fazın kapsamı uygulanır.
3. Teknik kontroller yapılır.
4. Görsel sonuç kullanıcıya gösterilir.
5. Onaydan sonra sonraki sayfa veya faza geçilir.

Bu iki plan dokümanı uygulama boyunca ana karar kaynağıdır. Yeni bir karar mevcut kapsamı değiştirirse ilgili doküman da aynı değişiklikle güncellenmelidir.

