# 🪵⚖️ Seesaw (Tahtarevalli) Uygulaması
Bu proje, verilen case kapsamında farklı ağırlıklardaki topların tahtarevallinin sol ve sağ tarafına bırakılması, denge durumunun hesaplanması ve kullanıcıya etkileşimli bir arayüz sunulması için geliştirilmiştir. Animasyon ve ses efektleri kullanıldı. 

## 🧠 Thought Process & Tasarım Süreci
- İşe başlamadan önce flow.txt dosyasında izleyeceğim yolu adım adım taslak halinde çıkardım.
- Mantık, template ve script'leri yazarak projeyi bitirmeyi hedefledim.
- Öncelikle bana gerekli olacak sabitleri ve değişkenleri çıkarttım. 
- Ardından gerekli olacak temel fonksiyonların listesini çıkardım. (Random değer üreten fonksiyon, yerleşecek topun konumunun set edildiği fonksiyon vb.)
- problemi fiziksel denge mantığıyla ele aldım: ağırlık × mesafe çarpımı üzerinden tork hesaplanıyor.
- Uygulamanın modüler bir yapıda olması için stil ve script klasörleri oluşturdum.
- Animasyonları CSS transition ile gerçekleştirdim.

## ⚙️ Design Decisions (Mimari Kararlar)
### 1. Component / Module Yapısı
- `./index.html` — projenin iskeletinin bulunduğu, deploy edilen temel html dosyası.
- `./styles/` — css kodlarımın bulunduğu dizin.
- `./assets/` — projede kullanılan ses ve resimlerin bulunduğu dizin.
- `./src/` — dinamik işlemlerin sağlandığı, oyunun yönetildiği scriptlerin bulunduğu dizin.
- `./src/main.js` — tüm scriptleri kullandığım ana js dosyası.  
- `./src/operations` —  tahtrevalli, topların logları ve topların operasyonlarının yapıldığı dosyaları barındıran klasör.
- `./src/store` — projede kullandığım sabitlerin ve değişkenlerin bulunduğu klasör.
- `./src/utils` — projede kullandığım temel ve sabit fonksiyonların bulunduğu dizin.

## 🔄 Trade-offs & Limitations
- Gerçek dünya fizik simülasyonundaki tüm faktörler uygulanmadı; basitleştirilmiş tork modeli tercih edildi.

## 🤖 AI Assistance
- Copilot ile bazı satır tamamlamalarını yaptım. Çoğu örneği hiç kullanmadım çünkü benim kod planlamam, mimarim ve izleyeceğim yol projeye başlamadan önce belirliydi.
- ChatGPT ile bazı fonksiyon isimlendirmeleri ve bazı küçük optimizasyonlarda destek alındı.
- Fizik hesaplamaları, oyun akışı ve UI tasarımının tüm çekirdek kısmını kendim geliştirdim.

📈 Geliştirme Adımları

- Mantık oluşturuldu
- Temel layout oluşturuldu
- Top oluşturma ve bırakma mekanizması eklendi
- Denge hesaplama fonksiyonu yazıldı
- UI animasyonları uygulandı
- Log paneli eklendi