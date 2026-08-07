# ER YAPI Tasarım Dili

**Durum:** Onaylanan başlangıç yönü  
**Tasarım yönü:** Showroom Precision  
**Kapsam:** ER YAPI web sitesinin bütün kullanıcıya açık sayfaları

## 1. Tasarımın Ana Fikri

ER YAPI sitesi, klasik bir inşaat firması şablonu veya yoğun bir yapı market e-ticaret sitesi gibi görünmemelidir. Görsel dil, markanın gerçek showroomundan türetilmelidir: porselen beyazı ürünler, grafit teşhir yüzeyleri, krom ve mat siyah armatürler, düzenli ürün sunumu ve aydınlık mağaza atmosferi.

Tasarımın temel cümlesi:

> Ürünü öne çıkaran, güven veren ve mağazadaki düzen hissini dijitale taşıyan sade bir showroom deneyimi.

Site premium görünmeye çalışırken gösterişli veya karmaşık olmamalıdır. Güçlü görünüm; efektlerden değil, doğru fotoğraf, tipografi, boşluk, hizalama ve ürün sunumundan gelmelidir.

## 2. Marka Karakteri

ER YAPI'nın dijital karakteri şu üç kelimeyle tanımlanır:

- Güvenilir
- Düzenli
- Teknik

Bu karakter soğuk, ulaşılmaz veya lüks tüketim markası gibi yorumlanmamalıdır. Site hem evini yenileyen son kullanıcıya hem de ürün arayan usta ve profesyonele anlaşılır gelmelidir.

## 3. Tasarım İlkeleri

### 3.1 Ürün önce gelir

Dekoratif yüzeyler ürün görselleriyle yarışmamalıdır. Ana görsel ağırlık gerçek ürün fotoğraflarında, showroom fotoğraflarında ve marka logolarında olmalıdır.

### 3.2 Sadelik boşluk değil, düzen demektir

Sayfalar gereksiz kartlar, ikonlar ve açıklamalarla doldurulmayacaktır. Bunun yerine net bölüm ayrımları, güçlü başlıklar, kontrollü boşluklar ve tutarlı hizalama kullanılacaktır.

### 3.3 Fiziksel showroom dijital imzadır

Mağazadaki dikey grafit duş teşhir panoları tasarımın ayırt edici motifi olacaktır. Bu fikir; kategori sunumlarında, ürün görsel alanlarında ve bölüm geçişlerinde ölçülü biçimde kullanılabilir. Dekoratif çizgi veya rastgele geometrik şekil olarak tekrarlanmamalıdır.

### 3.4 Marka renkleri birbirine karıştırılmaz

GPD, E.C.A. ve SEREL logoları kendi orijinal renkleriyle gösterilir. Bu markaların renkleri ER YAPI'nın ana arayüz rengi haline getirilmez. Özellikle yoğun E.C.A. mavisi kullanımı sitenin E.C.A. kurumsal sitesi gibi görünmesine neden olmamalıdır.

### 3.5 Gerçek kanıt, yapay içerikten değerlidir

Gerçek mağaza, gerçek ürünler ve doğrulanmış marka ilişkileri gösterilir. Sahte istatistik, yapay müşteri yorumu, uydurma proje, stok inşaat görseli veya kanıtsız kurumsal iddia kullanılmaz.

## 4. Renk Sistemi

Ana renk stratejisi açık, nötr ve ürün odaklıdır. Sıcak vurgu rengi yalnızca aksiyonlarda ve küçük yönlendirme öğelerinde kullanılır.

```css
:root {
  --er-background: oklch(1 0 0);
  --er-surface: oklch(0.965 0.006 255);
  --er-surface-strong: oklch(0.925 0.009 255);
  --er-foreground: oklch(0.18 0.012 255);
  --er-muted-foreground: oklch(0.46 0.012 255);
  --er-border: oklch(0.875 0.008 255);
  --er-primary: oklch(0.62 0.13 52);
  --er-primary-foreground: oklch(0.99 0 0);
}
```

### Renk rolleri

- **Porselen beyazı:** Ana sayfa yüzeyi ve ürünlerin nefes aldığı zemin.
- **Mineral gri:** Bölüm ayrımları, filtre alanları ve alternatif yüzeyler.
- **Grafit:** Başlıklar, gövde metni, header/footer ve güçlü kontrast gereken alanlar.
- **Nikel gri:** İkincil metin, çizgi ve teknik detaylar.
- **Fırçalanmış pirinç:** Ana aksiyon, aktif filtre ve küçük vurgu. Sayfanın yaklaşık yüzde 5–8'inden fazlasını kaplamamalıdır.

Tam sayfa sıcak krem, sarı-siyah yapı market paleti, mor-mavi yapay zekâ gradyanları veya yoğun marka mavisi kullanılmayacaktır.

## 5. Tipografi

### Başlık fontu

**Barlow Condensed** kullanılacaktır. Ürün ve yapı sektörüne uygun mekanik karakter taşır; az yer kaplayarak güçlü başlık hiyerarşisi kurar.

Kullanım alanları:

- Sayfa başlıkları
- Ana bölüm başlıkları
- Kategori isimleri
- Gerektiğinde kısa CTA vurguları

### Gövde fontu

**Source Sans 3** kullanılacaktır. Türkçe metinlerde, ürün adlarında ve teknik bilgilerde yüksek okunabilirlik sağlar.

Kullanım alanları:

- Gövde metinleri
- Navigasyon
- Butonlar
- Ürün adları ve ürün kodları
- Formlar, filtreler ve teknik özellikler

### Tipografi kuralları

- Gövde metinlerinde tamamen büyük harf kullanılmaz.
- Başlıklar gereksiz büyütülmez; ürün görsellerinin önüne geçmez.
- Çok sıkı harf aralığı kullanılmaz.
- Her bölümde küçük, harf aralıklı üst etiket tekrarı yapılmaz.
- Ürün kodları için ayrı bir monospace font kullanılmaz; Source Sans 3'ün uygun ağırlığı yeterlidir.

## 6. Yerleşim ve Kompozisyon

- Ana düzen ferah ve aydınlık olacaktır.
- İçerik genişliği sayfalar arasında tutarlı kalacaktır.
- Büyük masaüstü alanlarında ürünler gereksiz yere dev kartlara dönüşmeyecektir.
- Ürün listelerinde görsel oranları ve metin başlangıç çizgileri tutarlı olacaktır.
- Kartlar gerektiği yerde kullanılacak; her bölüm aynı kart şablonuna sokulmayacaktır.
- Köşe yuvarlaklıkları kontrollü olacaktır. Büyük ve aşırı yuvarlatılmış kutular kullanılmayacaktır.
- İnce sınır veya yüzey farkı tercih edilecek; aynı öğede geniş gölge ve belirgin border birlikte kullanılmayacaktır.

## 7. Görsel Dil

### Kullanılacak görseller

- Müşteriden alınan orijinal showroom fotoğrafları
- Üretici tarafından sağlanan veya kullanım izni bulunan ürün görselleri
- GPD, E.C.A. ve SEREL'in onaylı logoları
- Ürün detay fotoğrafları ve varsa teknik çizimler

### Fotoğraf yaklaşımı

- Ürünler mümkün olduğunda açık veya nötr zemin üzerinde gösterilir.
- Krom, mat siyah ve seramik yüzeylerin malzeme hissi korunur.
- Ürün görselleri gereksiz renk filtrelerinden geçirilmez.
- Showroom fotoğrafları geniş ve temiz kırpımlarla kullanılır.
- Aynı bölümde çok sayıda zayıf görsel yerine az sayıda güçlü görsel tercih edilir.

Google Maps üzerindeki kullanıcı fotoğrafları görsel referanstır; müşteriden orijinal dosyalar alınmadan doğrudan site içeriği olarak kullanılmaz.

## 8. Arayüz Karakteri

### Header ve navigasyon

Navigasyon kısa ve nettir:

- Ana Sayfa
- Ürünler
- Hakkımızda
- Blog
- İletişim

Header'ın görevi ürünlere ve iletişime hızlı erişim sağlamaktır. Geniş mega menü veya çok katmanlı kurumsal menü kullanılmaz.

### PageHero

Boilerplate'te bulunan mevcut `PageHero` ortak sayfa başlangıcı olarak korunacaktır. Yeniden bir hero mimarisi kurulmayacak; bileşen ER YAPI renkleri, tipografisi ve gerçek görselleriyle tasarım sistemine uyarlanacaktır.

### Ürün sunumu

Ürün kartları katalog hissi taşımalıdır. Kartın odağı ürün görseli ve ürün adıdır. Fiyat, indirim, sepet veya e-ticaret işaretleri bulunmaz.

### Marka bölümü

GPD, E.C.A. ve SEREL tek bir ana sayfa bölümünde, eşit ve sakin bir sunumla gösterilir. Ayrı bir Markalar sayfası oluşturulmaz.

### Hareket

Hareket düşük yoğunlukta kullanılacaktır. Birkaç anlamlı geçiş yeterlidir; her bölümde aynı aşağıdan belirme animasyonu tekrarlanmaz. Ürün keşfini yavaşlatan veya görseli gizleyen animasyonlardan kaçınılır.

## 9. Sayfalara Uygulanışı

### Ana Sayfa

Showroom hissini ve üç ana ürün grubunu tanıtır. Güçlü ürün/showroom görselleri, öne çıkan ürünler ve birlikte çalışılan markalar ana görsel malzemeyi oluşturur.

### Ürünler

Arama ve filtreleme sade tutulur. Ürün sayısı arttığında da sayfa düzeni bozulmamalıdır. Marka, ana kategori ve alt kategori ürün keşfinin temelidir.

### Ürün Detayı

Ürün galerisi, ürün adı, marka, kod, açıklama ve teknik bilgiler net bir hiyerarşiyle sunulur. Ana aksiyon fiyat ve stok bilgisi almaktır.

### Hakkımızda

ER YAPI'nın mağazasını, ürün yaklaşımını ve çalışma biçimini anlatır. Doğrulanmamış tarihçe, ekip veya başarı rakamları eklenmez.

### Blog

Boilerplate'in mevcut blog yapısı korunur ve yeni görsel sisteme uyarlanır. Blog kartları ürün kartlarını birebir taklit etmez; içerik okuma deneyimi önceliklidir.

### İletişim

Mevcut Sanity tabanlı iletişim yapısı korunur. Sayfa, genel tasarım sistemine uyarlanır ve mağazaya ulaşmayı kolaylaştırır.

## 10. Kaçınılacak Tasarım Kalıpları

- Gradyan yazılar
- Glassmorphism ve dekoratif blur kartları
- Her bölümde aynı ikonlu üçlü kart düzeni
- Sahte metrikler ve müşteri yorumları
- Büyük yuvarlak ikonların başlık üstünde tekrarlanması
- Stok gökdelen, şantiye veya baret fotoğrafları
- Yoğun sarı-siyah yapı market görünümü
- Tam ekran koyu temanın bütün siteye yayılması
- Krem zemin, serif başlık ve terracotta vurgu şeklindeki jenerik yapay zekâ estetiği
- İçeriği olmayan dekoratif çizgiler, numaralar ve etiketler

## 11. Sanity İçerik Sözleşmesi

Görünür editoryal içerikler Sanity üzerinden yönetilebilir olmalıdır. Buna sayfa başlıkları, bölüm başlıkları, açıklamalar, CTA metinleri, görseller ve sıralanabilir içerik seçimleri dahildir.

Yeni şemalarda sayfanın ilk kurulumda boş görünmemesi için marka bağlamına uygun `initialValue` değerleri bulunacaktır. Bu değerler editöre başlangıç içeriği sağlar ve daha sonra Sanity Studio'dan değiştirilebilir. Lorem ipsum, sahte ürün, doğrulanmamış adres veya doğrulanmamış firma iddiası başlangıç içeriği olarak kullanılmaz.

