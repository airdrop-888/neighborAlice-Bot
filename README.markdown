# Neighbor Alice - Auto Clear All Task🌟

Script ini digunakan untuk mengotomatiskan tugas di event airdrop My Neighbor Alice, seperti menampilkan profil pengguna, memeriksa tugas yang tersedia, dan menyelesaikan tugas secara otomatis.

---

## Wajib Connect Discord & X Account

## 📌 Fitur
- ✅ Menampilkan profil pengguna (nickname, wallet, socials) dari API My Neighbor Alice
- 📋 Memeriksa tugas yang tersedia dari event airdrop (Adventure Airdrop)
- ⚡ Menyelesaikan tugas secara otomatis menggunakan token dari `tokens.txt`
- 🔌 Dukungan proxy (`proxy.txt`) untuk koneksi aman (http, socks4, socks5)
- 🎨 Tampilan konsol yang keren dengan banner "Airdrop 888", warna menggunakan chalk, dan emoji
- 🛡️ Validasi token JWT untuk mendeteksi token kadaluarsa atau tidak valid
- 📊 Log detail untuk setiap aksi (profil, tugas, penyelesaian) dengan pesan error yang jelas

---

## 🚀 Cara Penggunaan

1. **Clone repository ini**
```sh
git clone https://github.com/airdrop-888/neighborAlice-Bot.git
cd neighborAlice-Bot
```

---

2. **Install Dependencies**
```sh
npm install axios chalk@4 cfonts http-proxy-agent socks-proxy-agent readline-sync
```

---

3. **Siapkan file tokens**

   - Buat file `tokens.txt` dan isi dengan token JWT, satu token per baris. Contoh:
```sh
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

   - (Opsional) Buat `proxy.txt` jika ingin menggunakan proxy. Contoh:
```sh
http://username:password@host:port
socks5://username:password@host:port
socks4://username:password@host:port
```

---

4. **Jalankan Script**
```sh
npm start
```

---

5. **Ikuti Instruksi**

- Pilih apakah ingin menggunakan proxy (y/n) ❓
- Script akan otomatis:
  - Menampilkan profil pengguna 👤
  - Memeriksa tugas yang tersedia 📋
  - Menyelesaikan tugas yang belum dilakukan 🎯

---

## ⚠️ Disclaimer
Gunakan script ini dengan bijak dan sesuai aturan My Neighbor Alice.  
Developer tidak bertanggung jawab atas penyalahgunaan atau banned akun.

---

## 🤝 Kontribusi
Jika ingin berkontribusi, silakan fork repo ini dan ajukan pull request! Kami terbuka untuk ide baru dan perbaikan.

---

## 📞 Kontak
Jika ada pertanyaan, hubungi: [@balveerxyz](https://t.me/balveerxyz)  
Join channel Telegram gratis: [t.me/airdroplocked](https://t.me/airdroplocked)
