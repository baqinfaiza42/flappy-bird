# flappy-bird
# 🐦 Flappy Bird Clone (HTML5 Canvas)

Sebuah replika game legendaris **Flappy Bird** yang dibuat menggunakan teknologi web standar: **HTML5, CSS3, dan JavaScript murni (Vanilla JS)** tanpa menggunakan *framework* atau *library* tambahan. 

Proyek ini sangat cocok untuk pelajari dasar-dasar pengembangan game (*game development*) berbasis web, manipulasi HTML5 Canvas, sistem deteksi tabrakan (*collision detection*), dan implementasi logika fisika sederhana (gravitasi & akselerasi).

---

## 🚀 Fitur Utama
* **Fisika Gameplay yang Akurat:** Implementasi gaya gravitasi dan lompatan yang responsif mirip dengan game aslinya.
* **Generasi Rintangan Otomatis:** Pipa akan muncul secara acak dengan tinggi celah yang bervariasi.
* **Sistem Skor Real-time:** Skor otomatis bertambah setiap kali burung berhasil melewati pipa.
* **Responsif:** Mendukung kontrol menggunakan **Tombol Spasi (Keyboard)** untuk PC dan **Ketukan Layar (Click/Tap)** untuk perangkat layar sentuh.
* **Desain Retro Modern:** Menggunakan palet warna klasik Flappy Bird dengan performa game yang halus berbasis `requestAnimationFrame`.

---

## 🕹️ Cara Bermain

1. **Memulai/Melompat:** Tekan tombol `Spasi` pada keyboard atau klik/ketuk layar game.
2. **Misi:** Jaga agar burung tetap terbang dan lewati celah di antara pipa-pipa hijau.
3. **Kalah:** Game over jika burung menabrak pipa, batas atas layar, atau jatuh ke tanah.
4. **Restart:** Tekan kembali tombol `Spasi` atau ketuk layar setelah game over untuk mencoba lagi.

---

## 🛠️ Teknologi yang Digunakan

* **HTML5:** Untuk struktur halaman dan elemen `<canvas>` sebagai arena game.
* **CSS3:** Untuk styling tampilan, penataan letak (*centering*), dan desain overlay Game Over.
* **JavaScript (ES6):** Mengatur seluruh logika game, animasi render canvas, *event listeners*, dan kalkulasi fisika.

---

## 📂 Struktur Repositori

```text
├── index.html          # Struktur utama & elemen Canvas
├── style.css           # Desain tampilan & layout retro
└── script.js           # Logika game, fisika burung, & sistem skor
