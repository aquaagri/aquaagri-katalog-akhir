# PANDUAN LENGKAP WEBSITE & DASHBOARD ADMIN AQUAAGRI.ID

Dokumen ini disimpan sebagai panduan permanen untuk pemilik **AquaAgri.id** (dan panduan instan bagi asisten AI apabila di masa depan ingin menambahkan fitur baru).

---

## 1. Tautan Penting (Simpan / Bookmark)

1. **Website Katalog Publik (Untuk Pengunjung):**
   https://aquaagri-katalog-akhir.aquaagri-id.workers.dev/
2. **Dashboard Admin Online (Bisa Dibuka dari HP & Laptop):**
   https://aquaagri-katalog-akhir.aquaagri-id.workers.dev/admin.html
3. **Database & Penyimpanan Foto (Supabase Dashboard):**
   https://supabase.com/dashboard *(Login dengan GitHub -> Proyek: `aquaagri katalog`)*
4. **Hosting Website (Cloudflare Dashboard):**
   https://dash.cloudflare.com *(Menu: Workers & Pages -> `aquaagri-katalog-akhir`)*
5. **Repositori Kode (GitHub):**
   https://github.com/aquaagri/aquaagri-katalog-akhir

---

## 2. Cara Mengelola Isi Katalog Sehari-hari (Tanpa Coding!)

Untuk mengubah isi katalog, Anda **tidak perlu membuka kode atau GitHub**:
1. Buka **https://aquaagri-katalog-akhir.aquaagri-id.workers.dev/admin.html**
2. Login menggunakan:
   - **Email:** `aquaagri.id@gmail.com`
   - **Password:** *(Password Admin yang dibuat di menu Authentication Supabase)*
3. Gunakan menu di sebelah kiri:
   - **Ringkasan:** Melihat jumlah produk, kategori, banner, dan status link Shopee.
   - **Produk Katalog:** Tambah produk baru, upload foto produk dari HP/laptop, ubah harga, harga coret, diskon, deskripsi, atau hapus produk.
   - **Kategori:** Ubah nama kategori, foto kartu kategori, dan teks banner kategori.
   - **Banner Beranda:** Tambah/ubah/hapus foto slide otomatis di bagian paling atas halaman utama.
   - **Pop-Up Iklan:** Pasang poster iklan/promo potret di tengah layar saat pengunjung membuka website (mendukung klik langsung ke **Nomor WhatsApp + Pesan Otomatis** atau **Link Shopee/URL**).
   - **Tautan Shopee:** Cek dan ubah cepat link affiliate Shopee semua produk dalam satu tabel.

Begitu Anda klik **Simpan**, perubahan **langsung tampil otomatis** di website pengunjung detik itu juga!

---

## 3. Struktur File di Folder `C:\aquaagri katalog akhir (admin)`

Selalu gunakan folder **`C:\aquaagri katalog akhir (admin)`** ini jika ingin menambah fitur baru:

- `index.html`, `style.css`, `script.js` — Tampilan & logika **Website Katalog Pengunjung** (otomatis mengambil data terbaru dari Supabase lewat fungsi `syncCatalogFromSupabase()` di bagian bawah `script.js`).
- `admin.html`, `admin.css`, `admin.js` — Tampilan & logika **Dashboard Admin**.
- `supabase-config.js` — Menyimpan `SUPABASE_URL` (`https://uqihzgskwxdurcwjpvbc.supabase.co`) dan `SUPABASE_ANON_KEY`.
- `seed-data.js` — Data cadangan 138 produk awal katalog.
- `supabase-setup.sql` — Skrip struktur tabel database (`categories`, `products`, `banners`), kebijakan keamanan *Row Level Security (RLS)*, dan bucket penyimpanan gambar `aquaagri-images`.
- `.github/workflows/supabase-keepalive.yml` — Robot otomatis GitHub yang menyapa database Supabase setiap 3 hari sekali agar database tidak pernah *pause* (beku).

---

## 4. Cara Menambahkan Fitur Baru di Masa Depan (Dengan Bantuan AI)

Jika suatu hari Anda membuka percakapan baru dengan AI untuk menambah fitur baru:
1. Buka folder **`C:\aquaagri katalog akhir (admin)`** di aplikasi editor/AI.
2. Katakan kepada AI:
   > *"Baca file `PANDUAN-ADMIN-AQUAAGRI.md` terlebih dahulu. Saya ingin menambahkan fitur [sebutkan fitur baru] di website pengunjung (`index.html`/`script.js`) dan jika perlu buatkan juga pengaturannya di Dashboard Admin (`admin.html`/`admin.js`), lalu push ke GitHub."*
