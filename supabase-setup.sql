-- ============================================================================
--SETUP DATABASE & KEAMANAN SUPABASE: AQUAAGRI.ID (KATALOG & DASHBOARD ADMIN)
-- ============================================================================
-- Cara Pakai:
-- 1. Buka proyek Anda di https://supabase.com/dashboard
-- 2. Klik menu 'SQL Editor' di sebelah kiri, lalu klik '+ New query'
-- 3. Copy-paste SELURUH isi file ini ke dalam kotak SQL Editor
-- 4. Klik tombol 'Run' (warna hijau di pojok kanan bawah)
-- ============================================================================

-- 1. TABEL KATEGORI (categories)
CREATE TABLE IF NOT EXISTS public.categories (
  id TEXT PRIMARY KEY,
  nama TEXT NOT NULL,
  deskripsi TEXT NOT NULL DEFAULT '',
  bg TEXT NOT NULL DEFAULT '',
  svg TEXT NOT NULL DEFAULT '',
  banner_tag TEXT NOT NULL DEFAULT 'KATALOG PRODUK',
  banner_title TEXT NOT NULL DEFAULT '',
  banner_deskripsi TEXT NOT NULL DEFAULT '',
  urutan INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. TABEL PRODUK (products)
CREATE TABLE IF NOT EXISTS public.products (
  id BIGSERIAL PRIMARY KEY,
  nama TEXT NOT NULL,
  harga TEXT NOT NULL,
  harga_coret TEXT DEFAULT '',
  diskon TEXT DEFAULT '',
  gambar TEXT NOT NULL DEFAULT '',
  deskripsi TEXT NOT NULL DEFAULT '',
  kategori TEXT NOT NULL REFERENCES public.categories(id) ON UPDATE CASCADE ON DELETE RESTRICT,
  kelompok TEXT DEFAULT '',
  link_affiliate TEXT NOT NULL DEFAULT '',
  aktif BOOLEAN NOT NULL DEFAULT TRUE,
  urutan INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. TABEL BANNER HOMEPAGE (banners)
CREATE TABLE IF NOT EXISTS public.banners (
  id BIGSERIAL PRIMARY KEY,
  judul TEXT NOT NULL,
  subjudul TEXT DEFAULT '',
  gambar TEXT NOT NULL,
  tipe TEXT NOT NULL DEFAULT 'hero',
  link_tujuan TEXT DEFAULT '',
  urutan INTEGER NOT NULL DEFAULT 1,
  aktif BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. AKTIFKAN KEAMANAN ROW LEVEL SECURITY (RLS)
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.banners ENABLE ROW LEVEL SECURITY;

-- Hapus policy lama jika dijalankan ulang agar tidak error
DROP POLICY IF EXISTS "Publik bisa melihat kategori" ON public.categories;
DROP POLICY IF EXISTS "Admin bisa kelola kategori" ON public.categories;
DROP POLICY IF EXISTS "Publik bisa melihat produk" ON public.products;
DROP POLICY IF EXISTS "Admin bisa kelola produk" ON public.products;
DROP POLICY IF EXISTS "Publik bisa melihat banner" ON public.banners;
DROP POLICY IF EXISTS "Admin bisa kelola banner" ON public.banners;

-- Policy Baca (SELECT): Semua pengunjung website boleh melihat data katalog
CREATE POLICY "Publik bisa melihat kategori" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Publik bisa melihat produk" ON public.products FOR SELECT USING (true);
CREATE POLICY "Publik bisa melihat banner" ON public.banners FOR SELECT USING (true);

-- Policy Tulis (INSERT, UPDATE, DELETE): HANYA Admin yang sudah Login (authenticated)
CREATE POLICY "Admin bisa kelola kategori" ON public.categories FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin bisa kelola produk" ON public.products FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin bisa kelola banner" ON public.banners FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 5. BUAT BUCKET PENYIMPANAN GAMBAR (Supabase Storage: aquaagri-images)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'aquaagri-images',
  'aquaagri-images',
  true,
  2097152,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 2097152,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

DROP POLICY IF EXISTS "Publik bisa melihat gambar aquaagri" ON storage.objects;
DROP POLICY IF EXISTS "Admin bisa upload gambar aquaagri" ON storage.objects;
DROP POLICY IF EXISTS "Admin bisa update gambar aquaagri" ON storage.objects;
DROP POLICY IF EXISTS "Admin bisa hapus gambar aquaagri" ON storage.objects;

CREATE POLICY "Publik bisa melihat gambar aquaagri" ON storage.objects FOR SELECT USING (bucket_id = 'aquaagri-images');
CREATE POLICY "Admin bisa upload gambar aquaagri" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'aquaagri-images');
CREATE POLICY "Admin bisa update gambar aquaagri" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'aquaagri-images');
CREATE POLICY "Admin bisa hapus gambar aquaagri" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'aquaagri-images');

-- 6. ISI DATA AWAL KATEGORI (4 KATEGORI UTAMA)
INSERT INTO public.categories (id, nama, deskripsi, bg, svg, banner_tag, banner_title, banner_deskripsi, urutan) VALUES
('produk-olahan-ikan', 'Produk Olahan Ikan', 'Abon, kerupuk, pempek & aneka olahan gurih', 'cat-olahan-real.jpg', '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>', 'KATEGORI OLAHAN HIGIENIS', 'Produk Olahan Ikan', 'Aneka olahan ikan higienis, lezat, bernutrisi, dan siap saji untuk keluarga.', 1),
('ikan-seafood-segar', 'Ikan & Seafood', 'Kakap merah, udang vaname & hasil laut segar', 'cat-seafood-real.jpg', '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 16s3-2 6-2c4 0 6 2 9 2s5-2 5-2"/><path d="M2 12s3-4 6-4 6 4 6 4 3-4 6-4"/></svg>', 'KATEGORI SEAFOOD SEGAR', 'Ikan & Seafood Segar', 'Tangkapan laut dan seafood segar harian dengan standar cold-chain higienis.', 2),
('pancing-umpan', 'Pancing & Umpan', 'Joran carbon, reel presisi & piranti mancing', 'cat-pancing-real.jpg', '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="15" cy="4.5" r="2"/><path d="M15 6.5v7.5a6 6 0 0 1-12 0v-5"/><path d="M3 11l2.5 2"/></svg>', 'KATEGORI SPORTFISHING', 'Pancing & Umpan', 'Perlengkapan mancing terlengkap: joran carbon, reel presisi, dan aneka umpan.', 3),
('Benih-Pakan-Budidaya', 'Benih, Pakan & Budidaya', 'Pakan bernutrisi, aerator & sarana tambak', 'cat-budidaya-real.jpg', '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.47-3.44 6-7 6-3.56 0-7.56-2.53-8.5-6Z"/><path d="M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33"/><circle cx="15.5" cy="11" r="1" fill="currentColor" stroke="none"/></svg>', 'KATEGORI BUDIDAYA MODERN', 'Benih, Pakan & Budidaya', 'Solusi budidaya modern: pakan bernutrisi, benih unggul, dan sarana tambak.', 4)
ON CONFLICT (id) DO NOTHING;

-- 7. ISI DATA AWAL BANNER HOMEPAGE (5 SLIDE HERO BANNER)
DELETE FROM public.banners WHERE tipe = 'hero';
INSERT INTO public.banners (judul, subjudul, gambar, tipe, urutan, aktif) VALUES
('Solusi Perikanan & Bahari Nusantara', 'Ekosistem Bahari - Kurasi produk bahari berkualitas dari hulu ke hilir.', 'hero-kapal-laut.jpg', 'hero', 1, true),
('Hasil Laut & Tangkapan Ikan Segar Pilihan', 'Standar rantai dingin higienis langsung dari nelayan nusantara.', 'ikan-segar.jpg', 'hero', 2, true),
('Sarana Budidaya & Keramba Jaring Apung Modern', 'Pakan bernutrisi, aerator hemat daya, dan benih unggul.', 'poto-petambak.jpg', 'hero', 3, true),
('Ragam Produk Olahan Ikan Higienis & Bergizi', 'Abon tuna, sambal roa, pempek, dan camilan kaya protein.', 'produk-olahan-ikan.jpg', 'hero', 4, true),
('Perlengkapan Pancing & Hasil Tangkapan Bahari', 'Joran carbon, reel presisi, dan umpan pancing teruji.', 'poto-pemancing-1.jpg', 'hero', 5, true);

-- 8. ISI DATA AWAL 138 PRODUK KATALOG AQUAAGRI.ID
DELETE FROM public.products;
INSERT INTO public.products (nama, harga, harga_coret, diskon, gambar, deskripsi, kategori, kelompok, link_affiliate, aktif, urutan) VALUES
('Abon Ikan Tuna Pedas 100gr', 'Rp34.000', 'Rp42.000', '19%', 'assets/products/abon-ikan.jpg', 'Dibuat dari 100% daging tuna segar pilihan dengan racikan bumbu pedas gurih khas nusantara. Bebas pengawet, cocok untuk lauk praktis dan bekal keluarga.', 'produk-olahan-ikan', '', 'https://s.shopee.co.id/6L4k4e0L0t', true, 1),
('Kerupuk Ikan Tenggiri Mentah 500gr', 'Rp22.000', 'Rp28.000', '21%', 'assets/products/ikan-tenggiri-mentah.jpg', 'Kerupuk ikan tenggiri kualitas super dengan cita rasa ikan asli yang gurih, renyah, dan mekar sempurna saat digoreng. Kaya nutrisi dan higienis.', 'produk-olahan-ikan', '', 'https://s.shopee.co.id/7KxHgFK2xJ', true, 2),
('Sambal Ikan Roa Asli Khas Manado 150gr', 'Rp36.000', 'Rp45.000', '20%', 'assets/products/sambal-roa.jpg', 'Sambal ikan roa asap autentik khas Manado dengan racikan rempah tradisional pilihan. Cita rasa pedas mantap dan aroma asap yang sangat menggugah selera.', 'produk-olahan-ikan', '', 'https://s.shopee.co.id/6L4kV6TNMv', true, 3),
('Ikan Wader Goreng Crispy 100gr', 'Rp16.000', 'Rp20.000', '20%', 'assets/products/Ikan-Wader-Goreng-Crispy.jpg', 'Ikan wader air tawar segar digoreng renyah dengan balutan bumbu gurih rempah. Camilan kaya kalsium alami yang lezat disantap bersama nasi hangat.', 'produk-olahan-ikan', '', 'https://s.shopee.co.id/6q15oXrPRj', true, 4),
('Kerupuk Kulit Ikan Patin Original 230gr', 'Rp46.000', 'Rp55.000', '16%', 'assets/products/kerupuk-kulit-ikan-patin.jpg', 'Kerupuk kulit ikan patin pilihan yang diolah bersih dan digoreng garing renyah. Tidak berbau amis, gurih alami, dan merupakan camilan berprotein tinggi.', 'produk-olahan-ikan', '', 'https://s.shopee.co.id/LnZwHBJCs', true, 5),
('Kerupuk Tulang Lele Kaya Kalsium', 'Rp13.000', 'Rp17.000', '23%', 'assets/products/Kerupuk-Tulang-Lele.jpg', 'Inovasi olahan bernutrisi tinggi dari tulang ikan lele segar yang diproses secara higienis. Renyah, gurih nikmat, dan sangat kaya kalsium alami.', 'produk-olahan-ikan', '', 'https://s.shopee.co.id/5q8WV2nDKy', true, 6),
('Kerupuk Stik Ikan Tongkol Gurih 500gr', 'Rp12.000', 'Rp16.000', '25%', 'assets/products/Kerupuk-Stik-Ikan-Tongkol.jpg', 'Stik kerupuk ikan tongkol bertekstur renyah dengan cita rasa gurih ikan yang terasa nyata. Sangat cocok sebagai camilan santai maupun teman bersantap.', 'produk-olahan-ikan', '', 'https://s.shopee.co.id/9pefGpWMQm', true, 7),
('Maksor Pedas Spesial Cap Ikan Tawes 1 Ball', 'Rp25.000', 'Rp32.000', '22%', 'assets/products/Maksor-Pedas-Special-Cap-Ikan-Tawes.jpg', 'Makaroni olahan bumbu gurih ikan tawes dengan perpaduan rasa pedas manis istimewa. Kemasan 1 ball grosir ekonomis untuk persediaan camilan keluarga.', 'produk-olahan-ikan', '', 'https://s.shopee.co.id/AUuM4aQ7Ib', true, 8),
('Kerupuk Kemplang Mini Tenggiri 200gr', 'Rp15.000', 'Rp19.000', '21%', 'assets/products/Kerupuk-Kemplan-Tenggiri.jpg', 'Kemplang panggang mini khas Palembang dengan bahan baku utama ikan tenggiri segar. Tekstur renyah berongga dengan aroma panggangan khas yang sedap.', 'produk-olahan-ikan', '', 'https://s.shopee.co.id/4qG1QWT9X0', true, 9),
('Ikan Cakalang Suwir Rica Khas Manado', 'Rp48.000', 'Rp59.000', '18%', 'assets/products/Ikan-Cakalang-Suwir-Rica-Khas-Manado.jpg', 'Suwiran daging ikan cakalang asap asli dengan racikan bumbu rica-rica merah khas Manado. Pedas gurih meresap, higienis, dan praktis siap saji.', 'produk-olahan-ikan', '', 'https://s.shopee.co.id/BU9tio9xn', true, 10),
('Baso Ikan Sinar Bahari Bandung 40 Butir', 'Rp24.000', 'Rp30.000', '20%', 'assets/products/Baso-Ikan-Sinar-Bahari-Bandung.jpg', 'Baso ikan kenyal dan gurih khas Bandung isi 40 butir. Terbuat dari olahan daging ikan segar pilihan berstandar mutu tinggi tanpa bahan pengawet berbahaya.', 'produk-olahan-ikan', '', 'https://s.shopee.co.id/9V1p1QZKrx', true, 11),
('Siomay Ikan Tenggiri Frozen 10 Pcs Jumbo', 'Rp59.000', 'Rp70.000', '15%', 'assets/products/Siomay-Ikan-Tenggiri-Frozen.jpg', 'Siomay ikan tenggiri frozen 10 pcs jumbo dengan tekstur lembut dan rasa gurih. Sangat cocok untuk camilan atau hidangan utama.', 'produk-olahan-ikan', '', 'https://s.shopee.co.id/70KdySvDX6', true, 12),
('Otak Otak Ikan Tenggiri Fresh Frozen Isi 50pcs', 'Rp18.500', 'Rp30.000', '53%', 'assets/products/Otak-Otak-Ikan-Tenggiri-Fresh-Frozen.jpg', 'Otak otak ikan tenggiri fresh frozen isi 50pcs dengan tekstur lembut dan rasa gurih. Sangat cocok untuk camilan atau hidangan utama.', 'produk-olahan-ikan', '', 'https://s.shopee.co.id/5VVqC4JCA4', true, 13),
('Baby Fish Crispy Original Gurih Daun Jeruk 100gr', 'Rp17.000', 'Rp35.000', '51%', 'assets/products/Baby-Fish-Crispy-Original.jpg', 'Baby fish crispy original gurih daun jeruk 100gr. Sangat cocok untuk camilan atau hidangan utama.', 'produk-olahan-ikan', '', 'https://s.shopee.co.id/9zyFZ82pEA', true, 14),
('Edo Chikuwa Olahan Ikan 250gr', 'Rp29.000', 'Rp45.000', '35%', 'assets/products/Edo-Chikuwa-Olahan-Ikan.jpg', 'Edo chikuwa olahan ikan 250 gr. Sangat cocok untuk camilan atau hidangan utama.', 'produk-olahan-ikan', '', 'https://s.shopee.co.id/113QqwF09o', true, 15),
('Dimsum Frozen Isi 32 500gr', 'Rp17.000', 'Rp30.000', '43%', 'assets/products/Dimsum-Frozen-Isi-32-500gr.jpg', 'Dimsum frozen isi 32 pcs 500gr. Sangat cocok untuk camilan atau hidangan utama.', 'produk-olahan-ikan', '', 'https://s.shopee.co.id/2LYoRfy7M5', true, 16),
('Basreng KATAJI Mentah 10Kg', 'Rp177.000', 'Rp200.000', '11%', 'assets/products/Basreng-KATAJI-Mentah-10Kg.jpg', 'Basreng KATAJI mentah 10Kg. Sangat cocok untuk camilan atau hidangan utama.', 'produk-olahan-ikan', '', 'https://s.shopee.co.id/30oVFLPZpQ', true, 17),
('Basreng Lontong Mentah Juragan Basreng Ikan', 'Rp25.000', 'Rp40.000', '38%', 'assets/products/Basreng-Lontong-Mentah-Juragan-Basreng-Ikan.jpg', 'Basreng lontong mentah juragan basreng ikan. Sangat cocok untuk camilan atau hidangan utama.', 'produk-olahan-ikan', '', 'https://s.shopee.co.id/5fpGQQVfpS', true, 18),
('Scallop Ikan Isi 40 Butir', 'Rp15.000', 'Rp30.000', '50%', 'assets/products/Scallop-Ikan-Isi-40-Butir.jpg', 'Scallop ikan isi 40 butir. Sangat cocok untuk camilan atau hidangan utama.', 'produk-olahan-ikan', '', 'https://s.shopee.co.id/3g4C3L31xN', true, 19),
('Pempek Lala 26 Ilir Palembang 40pc', 'Rp115.000', 'Rp150.000', '23%', 'assets/products/PEMPEK-Lala-26-Ilir-Palembang-40pc.jpg', 'Pempek Lala 26 ilir dikirim dalam keadaan beku atau frozen,Terbuat dari ikan segar pilihan tanpa bahan pengawet', 'produk-olahan-ikan', '', 'https://s.shopee.co.id/1BMr5IxrLq', true, 20),
('Pempek Frozen Khas Palembang Paket Hemat 10 Pcs', 'Rp32.000', 'Rp47.000', '32%', 'assets/products/Pempek-Frozen-Khas-Palembang-Paket-10-pcs.jpg', 'Pempek frozen khas Palembang paket hemat 10 pcs.Terbuat dari ikan segar pilihan tanpa bahan pengawet.', 'produk-olahan-ikan', '', 'https://s.shopee.co.id/50ZZejawl9', true, 21),
('Cemilan Baby Crab Crispy Khas Lamongan', 'Rp30.000', 'Rp45.000', '33%', 'assets/products/Cemilan-Baby-Crab-Crispy-Khas-Lamongan.jpg', 'Camilan kepiting bayi yang renyah dan gurih, rasanya enak, cocok sebagai camilan kapan saja.', 'produk-olahan-ikan', '', 'https://s.shopee.co.id/4B0SfUWIWz', true, 22),
('Baby Crab Crispy 75gr', 'Rp14.000', 'Rp30.000', '53%', 'assets/products/Baby-Crab-Crispy-75gr.jpg', 'Camilan seafood renyah berbahan dasar baby rajungan utuh, digoreng krispi dan dibumbui dengan rasa yang menggoda!', 'produk-olahan-ikan', '', 'https://s.shopee.co.id/BUJvFWquL', true, 23),
('Sambal Teri', 'Rp32.000', 'Rp40.000', '20%', 'assets/products/Sambal-Teri.jpg', 'Sambal teri yang lezat dan pedas, cocok sebagai pelengkap nasi atau camilan.', 'produk-olahan-ikan', '', 'https://s.shopee.co.id/AAHfqAQLNI', true, 24),
('Sambal Cumi Pedas Gurih', 'Rp27.000', 'Rp35.000', '23%', 'assets/products/Sambal-Cumi-Pedas-Gurih.jpg', 'Sambal cumi pedas gurih yang lezat, cocok sebagai pelengkap nasi atau camilan.', 'produk-olahan-ikan', '', 'https://s.shopee.co.id/6fhnfxX7RM', true, 25),
('Ikan Pindang Bandeng Presto 200gr', 'Rp20.000', 'Rp25.000', '20%', 'assets/products/Ikan-Pindang-Bandeng.jpg', 'Ikan pindang bandeng presto 200gr dengan daging lembut dan gurih. Sangat cocok untuk dimasak dengan berbagai cara seperti dipanggang, direndam dalam saus, atau dijadikan bagian dari hidangan seafood premium.', 'produk-olahan-ikan', '', 'https://s.shopee.co.id/8AWfo4h1jw', true, 26),
('Kepala Ikan Kakap Merah Segar 1kg', 'Rp44.000', 'Rp55.000', '20%', 'assets/products/kepala-kakap-merah.jpg', 'Kepala kakap merah hasil tangkapan laut segar, dibersihkan higienis dan dibekukan dengan teknologi flash-freezing untuk bahan utama sup atau gulai istimewa.', 'ikan-seafood-segar', '', 'https://s.shopee.co.id/3LR8wC3aMw', true, 27),
('Udang Vaname Segar Fresh 500gr', 'Rp45.000', 'Rp55.000', '18%', 'assets/products/udang-vaname.jpg', 'Udang vaname segar hasil tambak budidaya terkelola. Ukuran seragam, berdaging padat kenyal dengan rasa manis gurih alami, siap diolah.', 'ikan-seafood-segar', '', 'https://s.shopee.co.id/9zy2stK622', true, 28),
('Ikan Cakalang Bersih Segar Beku 1kg', 'Rp46.000', 'Rp56.000', '18%', 'assets/products/Ikan-Cakalang.jpg', 'Ikan cakalang laut utuh yang telah dibersihkan insang dan kotorannya. Pembekuan cepat mempertahankan kesegaran, tekstur padat, serta kandungan protein tinggi.', 'ikan-seafood-segar', '', 'https://s.shopee.co.id/2LYgLoyWyK', true, 29),
('Kepiting Bakau Jumbo Fresh Frozen', 'Rp126.000', 'Rp150.000', '16%', 'assets/products/Kepiting-Bakau.jpg', 'Kepiting bakau pilihan ukuran jumbo dengan capit tebal dan daging padat manis. Mutu ekspor standar restoran seafood premium.', 'ikan-seafood-segar', '', 'https://s.shopee.co.id/9pehIBhlZN', true, 30),
('Steak Tuna Merah 500gr (Tanpa Tulang)', 'Rp55.000', 'Rp68.000', '19%', 'assets/products/steak-tuna-merah.jpg', 'Potongan steak daging ikan tuna merah murni tanpa duri dan kulit. Tekstur lembut bernutrisi tinggi kaya asam lemak Omega-3 untuk kesehatan jantung.', 'ikan-seafood-segar', '', 'https://s.shopee.co.id/4B0KYIPg9P', true, 31),
('Ikan Gabus Segar Pilihan 1kg', 'Rp50.000', 'Rp62.000', '19%', 'assets/products/Ikan-Gabus.jpg', 'Ikan gabus air tawar segar kaya kandungan albumin alami untuk regenerasi sel dan pemulihan tubuh. Daging putih lembut dan tebal tanpa banyak duri halus.', 'ikan-seafood-segar', '', 'https://s.shopee.co.id/1gIzZxNVa3', true, 32),
('Ikan Kembung Banjar Segar 1kg', 'Rp29.000', 'Rp36.000', '19%', 'assets/products/Ikan-Kembung.jpg', 'Ikan kembung banjar segar ukuran konsumsi harian keluarga (isi 6-8 ekor/kg). Sangat bergizi, lezat digoreng krispi, dibakar kecap, atau dibumbu pesmol.', 'ikan-seafood-segar', '', 'https://s.shopee.co.id/2qUwyTjnab', true, 33),
('Ikan Salmon Trout Fillet Segar 200gr', 'Rp58.000', 'Rp72.000', '19%', 'assets/products/Ikan-Salmon.jpg', 'Fillet salmon trout segar dengan guratan marbling cantik dan warna oranye alami. Dikemas higienis vakum kedap udara, sangat cocok untuk pan-sear, sushi, dan MPASI.', 'ikan-seafood-segar', '', 'https://s.shopee.co.id/AUuO71vp7Q', true, 34),
('Lobster Laut Segar 325gr', 'Rp177.000', 'Rp200.000', '11%', 'assets/products/Lobster-Laut.jpg', 'Lobster laut segar dengan daging lembut dan gurih. Sangat cocok untuk dimasak dengan berbagai cara seperti dipanggang, direndam dalam saus, atau dijadikan bagian dari hidangan seafood premium.', 'ikan-seafood-segar', '', 'https://s.shopee.co.id/7ptoCEEyoF', true, 35),
('LOBSTER TAWAR COOK 1KG 20-40 PCS', 'Rp62.000', 'Rp80.000', '22%', 'assets/products/Lobster-Tawar.jpg', 'Lobster tawar cook 1kg 20-40 pcs dengan daging lembut dan gurih. Sangat cocok untuk dimasak dengan berbagai cara seperti dipanggang, direndam dalam saus, atau dijadikan bagian dari hidangan seafood premium.', 'ikan-seafood-segar', '', 'https://s.shopee.co.id/8fSvBzo9Jd', true, 36),
('Udang Kupas IQF Premium 250gr', 'Rp57.000', 'Rp72.000', '21%', 'assets/products/Udang-Kupas.jpg', 'Udang kupas IQF premium 250gr dengan daging lembut dan gurih. Sangat cocok untuk dimasak dengan berbagai cara seperti dipanggang, direndam dalam saus, atau dijadikan bagian dari hidangan seafood premium.', 'ikan-seafood-segar', '', 'https://s.shopee.co.id/9APBll7Ud9', true, 37),
('Cumi Besar Segar 1kg', 'Rp29.000', 'Rp50.000', '42%', 'assets/products/Cumi-Besar.jpg', 'Cumi besar segar 1kg dengan daging lembut dan gurih. Sangat cocok untuk dimasak dengan berbagai cara seperti dipanggang, direndam dalam saus, atau dijadikan bagian dari hidangan seafood premium.', 'ikan-seafood-segar', '', 'https://s.shopee.co.id/3g4FFYb8XA', true, 38),
('Kerang Dara Frozen Fresh 1kg', 'Rp45.000', 'Rp60.000', '25%', 'assets/products/Kerang-Dara.jpg', 'Kerang dara frozen fresh dengan daging lembut dan gurih. Sangat cocok untuk dimasak dengan berbagai cara seperti dipanggang, direndam dalam saus, atau dijadikan bagian dari hidangan seafood premium.', 'ikan-seafood-segar', '', 'https://s.shopee.co.id/2VsHrq9UwA', true, 39),
('Kerang Tahu Premium Fresh 500gr', 'Rp17.000', 'Rp25.000', '32%', 'assets/products/Kerang-Tahu.jpg', 'Kerang tahu premium fresh 500gr dengan daging lembut dan gurih. Sangat cocok untuk dimasak dengan berbagai cara seperti dipanggang, direndam dalam saus, atau dijadikan bagian dari hidangan seafood premium.', 'ikan-seafood-segar', '', 'https://s.shopee.co.id/70KhEUyxsA', true, 40),
('Kerang Remis haremis 1kg', 'Rp45.000', 'Rp60.000', '25%', 'assets/products/Kerang-Remis.jpg', 'Remis Laya pensi haremis 1kg dengan daging lembut dan gurih.', 'ikan-seafood-segar', '', 'https://s.shopee.co.id/1AwuK7tqA', true, 41),
('Kerang hijau segar 1kg', 'Rp12.000', 'Rp17.000', '29%', 'assets/products/Kerang-Hijau.jpg', 'Kerang hijau segar 1kg dengan daging lembut dan gurih. Sangat cocok untuk dimasak dengan berbagai cara seperti dipanggang, direndam dalam saus, atau dijadikan bagian dari hidangan seafood premium.', 'ikan-seafood-segar', '', 'https://s.shopee.co.id/5VVtScExyD', true, 42),
('Ikan Dory Fillet Fresh 1kg', 'Rp48.000', 'Rp60.000', '20%', 'assets/products/Ikan-Dory.jpg', 'Ikan Dory fillet fresh 1kg dengan daging lembut dan gurih. Sangat cocok untuk dimasak dengan berbagai cara seperti dipanggang, direndam dalam saus, atau dijadikan bagian dari hidangan seafood premium.', 'ikan-seafood-segar', '', 'https://s.shopee.co.id/AAHkAyyvAV', true, 43),
('Rahang Tuna Beku Segar |200 -1000 Gram/Pcs', 'Rp20.000', 'Rp28.000', '29%', 'assets/products/Rahang-Tuna.jpg', 'Rahang tuna beku segar 200-1000 gram per pcs dengan daging lembut dan gurih. Sangat cocok untuk dimasak dengan berbagai cara seperti dipanggang, direndam dalam saus, atau dijadikan bagian dari hidangan seafood premium.', 'ikan-seafood-segar', '', 'https://s.shopee.co.id/8fSwOYLmYP', true, 44),
('Ikan Baby Tuna Frozen Fresh 1kg', 'Rp31.000', 'Rp40.000', '22%', 'assets/products/Ikan-Baby-Tuna.jpg', 'Ikan baby tuna beku segar 1kg dengan daging lembut dan gurih.', 'ikan-seafood-segar', '', 'https://s.shopee.co.id/8fSwPOHgjS', true, 45),
('Ikan Gurame Frozen Fresh 1kg Sudah Dibersihkan', 'Rp68.000', 'Rp80.000', '15%', 'assets/products/Ikan-Gurame.jpg', 'Ikan gurame beku segar 1kg dengan daging lembut dan gurih.', 'ikan-seafood-segar', '', 'https://s.shopee.co.id/50Ze3C9wFQ', true, 46),
('Ikan Barakuda Fresh 1kg', 'Rp31.000', 'Rp40.000', '22%', 'assets/products/Ikan-Barakuda.jpg', 'Ikan barakuda fresh 1kg dengan daging lembut dan gurih.', 'ikan-seafood-segar', '', 'https://s.shopee.co.id/3B7zs80NH6', true, 47),
('Ikan Bawal Air Tawar Segar 500gr', 'Rp25.000', 'Rp40.000', '37%', 'assets/products/Ikan-Bawal.jpg', 'Ikan bawal air tawar segar 500gr dengan daging lembut dan gurih.', 'ikan-seafood-segar', '', 'https://s.shopee.co.id/4LJxGRmKkS', true, 48),
('Baby Octopus Gurita Segar 1kg', 'Rp45.000', 'Rp55.000', '20%', 'assets/products/Baby-Octopus.jpg', 'Baby octopus gurita segar 1kg dengan daging lembut dan gurih.', 'ikan-seafood-segar', '', 'https://s.shopee.co.id/9fLTcWlYrQ', true, 49),
('Ikan Bawal Putih Bawal Laut segar 500gr', 'Rp35.000', 'Rp47.000', '25%', 'assets/products/Ikan-Bawal-Putih.jpg', 'Ikan bawal putih bawal laut segar 500gr dengan daging lembut dan gurih.', 'ikan-seafood-segar', '', 'https://s.shopee.co.id/2BFShSOat8', true, 50),
('Ikan Patin Segar 1kg', 'Rp44.000', 'Rp50.000', '12%', 'assets/products/Ikan-Patin.jpg', 'Ikan patin segar 1kg dengan daging lembut dan gurih.', 'ikan-seafood-segar', '', 'https://s.shopee.co.id/AKbAS1xQPH', true, 51),
('Ikan Kuwe Segar 300gr', 'Rp65.000', 'Rp77.000', '15%', 'assets/products/Ikan-Kuwe.jpg', 'Ikan kuwe segar 300gr dengan daging lembut dan gurih.', 'ikan-seafood-segar', '', 'https://s.shopee.co.id/60SBGzffo5', true, 52),
('Ikan Layang 1kg', 'Rp16.000', 'Rp30.000', '47%', 'assets/products/Ikan-Layang.jpg', 'Ikan layang 1kg dengan daging lembut dan gurih.', 'ikan-seafood-segar', '', 'https://s.shopee.co.id/4qGDuPFwBW', true, 53),
('Kerang Tiram/Oyster laut fresh', 'Rp21.000', 'Rp32.000', '34%', 'assets/products/Kerang-Tiram.jpg', 'Kerang tiram/oyster laut fresh dengan daging lembut dan gurih.', 'ikan-seafood-segar', '', 'https://s.shopee.co.id/5At4JFTV26', true, 54),
('Ikan Ayam Ayam Premium Segar 750gr', 'Rp37.000', 'Rp45.000', '18%', 'assets/products/Ikan-Ayam.jpg', 'Ikan ayam ayam premium segar 750gr dengan daging lembut dan gurih.', 'ikan-seafood-segar', '', 'https://s.shopee.co.id/8fSwSUFGkr', true, 55),
('Ikan Baronang Segar 100gr', 'Rp42.000', 'Rp55.000', '24%', 'assets/products/Ikan-Baronang.jpg', 'Ikan baronang segar 100gr dengan daging lembut dan gurih.', 'ikan-seafood-segar', '', 'https://s.shopee.co.id/1LgLifLLvz', true, 56),
('Umpan kucur paket 500 gram + free STIK', 'Rp30.000', 'Rp50.000', '40%', 'assets/products/umpan-kucur.jpg', 'Umpan kucur paket 500 gram + free STIK', 'pancing-umpan', '', 'https://s.shopee.co.id/AKbCKkvGOG', true, 57),
('Reel Pancing VX1000-7000', 'Rp158.000', 'Rp170.000', '7%', 'assets/products/reel-pancing.jpg', 'Reel pancing VX1000-7000 dengan desain ergonomis dan performa tinggi.', 'pancing-umpan', '', 'https://s.shopee.co.id/1gJE18BiJL', true, 58),
('Kail Hook Pancing Chinu 1053 Hitam Black Nickel 1', 'Rp11.000', 'Rp20.000', '45%', 'assets/products/kail-hook.jpg', 'Kail hook pancing Chinu 1053 hitam black nickel 1 dengan desain ergonomis dan performa tinggi.', 'pancing-umpan', '', 'https://s.shopee.co.id/60SDBOVOQ3', true, 59),
('Essen PERTAMAX TURBO + Murni', 'Rp193.000', 'Rp210.000', '8%', 'assets/products/essen-pertamax.jpg', 'Essen PERTAMAX TURBO + Murni dengan kualitas terbaik untuk memancing.', 'pancing-umpan', '', 'https://s.shopee.co.id/4qGFnQo9sX', true, 60),
('Siraman Serangga (SIRANGGA)', 'Rp67.000', 'Rp80.000', '16%', 'assets/products/siraman-serangga.jpg', 'Siraman serangga (SIRANGGA) dengan kualitas terbaik untuk memancing.', 'pancing-umpan', '', 'https://s.shopee.co.id/4VdPOvGq5n', true, 61),
('Joran Tegek kaku limited & super leader', 'Rp140.000', 'Rp170.000', '18%', 'assets/products/joran-tegek.jpg', 'Joran tegek kaku limited & super leader dengan desain ergonomis dan performa tinggi.', 'pancing-umpan', '', 'https://s.shopee.co.id/1VznpXLrl3', true, 62),
('Paket Timah Pancing Komplit Lengkap 130pcs', 'Rp41.000', 'Rp50.000', '22%', 'assets/products/paket-timah.jpg', 'Paket timah pancing komplit lengkap 130pcs dengan kualitas terbaik untuk memancing.', 'pancing-umpan', '', 'https://s.shopee.co.id/5fpMnJCFbV', true, 63),
('Essen Garut Id', 'Rp34.000', 'Rp58.000', '41%', 'assets/products/essen-garut.jpg', 'Essen Oplosan siap gacor dari essen garut.id spesial mancing Ikan Mas.', 'pancing-umpan', '', 'https://s.shopee.co.id/5VVmqQLy0T', true, 64),
('Biang Varian Aroma BUAH 10ml', 'Rp17.000', 'Rp18.000', '1%', 'assets/products/AGA-Fishing.jpg', 'AGA Fishing Essen Biang Varian Aroma BUAH BUAHAN merupakan cairan konsentrat aroma untuk campuran racikan umpan pancing. Produk ini membantu memperkuat karakter aroma umpan dan dapat disesuaikan dengan jenis racikan, kondisi air, target ikan, serta lokasi memancing.', 'pancing-umpan', '', 'https://s.shopee.co.id/AUuT1SwZlV', true, 65),
('Essen Oplosan Super Ikan NILA 30ml', 'Rp120.000', 'Rp145.000', '17%', 'assets/products/aga-essen-uper-ikan-nila.jpg', 'Essen konsentrat premium dengan aroma khas kuat yang dirancang khusus untuk memikat ikan nila babon di berbagai kondisi air kolam maupun waduk liar.', 'pancing-umpan', '', 'https://s.shopee.co.id/5LCKobxOA1', true, 66),
('257 PCS Umpan Pancing Ikan Set', 'Rp168.000', 'Rp200.000', '17%', 'assets/products/Umpan-Pancing-Ikan-Set.jpg', 'Kotak box ini didesain khusus untuk meletakkan berbagai macam kail yang Anda ingin bawa untuk memancing.', 'pancing-umpan', '', 'https://s.shopee.co.id/9KiVdtyA5p', true, 67),
('AQUASEA Tali Pancing Germany200m', 'Rp21.000', 'Rp50.000', '58%', 'assets/products/AQUASEA-Tali-Pancing.jpg', 'Tali pancing berkualitas tinggi dari Germany dengan panjang 200 meter, cocok untuk memancing ikan di berbagai jenis air.', 'pancing-umpan', '', 'https://s.shopee.co.id/3g48uACWxh', true, 68),
('Tali Pancing Sensor Bright 200m', 'Rp58.000', 'Rp66.000', '12%', 'assets/products/Tali-Pancing-Sensor-Bright.jpg', 'Tali pancing berkualitas tinggi dari Germany dengan panjang 200 meter, cocok untuk memancing ikan di berbagai jenis air.', 'pancing-umpan', '', 'https://s.shopee.co.id/5fpMnk4dz2', true, 69),
('JELLYFISH UMPAN PENGGANTI LUMUT', 'Rp25.000', 'Rp37.000', '32%', 'assets/products/JELLYFISH-Umpan-Pengganti-Lumut.jpg', 'Umpan pengganti lumut berkualitas tinggi untuk memancing ikan di berbagai jenis air.', 'pancing-umpan', '', 'https://s.shopee.co.id/7AeAaa0h8i', true, 70),
('Siraman Cacing (SIRACING )', 'Rp62.000', 'Rp76.000', '18%', 'assets/products/Siraman-Cacing.jpg', 'Umpan pengganti lumut berkualitas tinggi untuk memancing ikan di berbagai jenis air.', 'pancing-umpan', '', 'https://s.shopee.co.id/gQgsJszeX', true, 71),
('Umpan pancing Olahan SAWIT GURIH WANGI', 'Rp25.000', 'Rp37.000', '32%', 'assets/products/Umpan-Pancing-Olahan-SAWIT-GURIH-WANGI.jpg', 'Umpan pengganti lumut berkualitas tinggi untuk memancing ikan di berbagai jenis air.', 'pancing-umpan', '', 'https://s.shopee.co.id/8V9YCukvhb', true, 72),
('Tas Pancing Joran Anti Air Waterproof', 'Rp95.000', 'Rp120.000', '21%', 'assets/products/Tas-Pancing-Joran-Anti-Air-Waterproof.jpg', 'Umpan pengganti lumut berkualitas tinggi untuk memancing ikan di berbagai jenis air.', 'pancing-umpan', '', 'https://s.shopee.co.id/5fpMpreXv9', true, 73),
('Stopper Pancing premium Kaca Transparan 100pcs', 'Rp25.000', 'Rp37.000', '32%', 'assets/products/Stopper-Pancing-premium.jpg', 'Stopper pancing kualitas premium berbahan kaca transparan yang dirancang untuk penggunaan lebih halus', 'pancing-umpan', '', 'https://s.shopee.co.id/30obfIVpnI', true, 74),
('Booster Attractant Essen Ikan Laut Premium Original 100ml', 'Rp78.000', 'Rp95.000', '18%', 'assets/products/Booster-Attractant-Essen-Ikan-Laut.jpg', 'Booster Attractant Terbaik untuk Memancing Ikan Liar di Laut', 'pancing-umpan', '', 'https://s.shopee.co.id/1B05x4Znq', true, 75),
('Tali Pancing TARANTULA 500m', 'Rp44.000', 'Rp60.000', '27%', 'assets/products/Tali-Pancing-TARANTULA-500m.jpg', 'Tali pancing berkualitas tinggi untuk memancing ikan di berbagai jenis air.', 'pancing-umpan', '', 'https://s.shopee.co.id/9V25PViy1Y', true, 76),
('Box Umpan Pancing 40CM', 'Rp128.000', 'Rp140.000', '15%', 'assets/products/Box-Umpan-Pancing-40CM.jpg', 'Box umpan pancing 40cm untuk menyimpan dan mengangkut umpan pancing.', 'pancing-umpan', '', 'https://s.shopee.co.id/7ptrRGmvcB', true, 77),
('Umpan Pancing Popper Big Bait 12.5cm 40g', 'Rp25.000', 'Rp40.000', '38%', 'assets/products/umpan-pancing-popper-big-bait.jpg', 'Umpan pancing popper big bait 12.5cm 40g', 'pancing-umpan', '', 'https://s.shopee.co.id/40h8rgkk1o', true, 78),
('ESSEN SPESIALIS GALATAMA LELE', 'Rp100.000', 'Rp120.000', '17%', 'assets/products/essen-spesialis-galatama-lele.jpg', 'essen corragio sabun blue mix adalah essen yang sudah teruji di kolam galatama dengan semua jenis air dan cuaca.', 'pancing-umpan', '', 'https://s.shopee.co.id/8Kq82bR6XI', true, 79),
('Umpan Pancing Casting Lure', 'Rp51.000', 'Rp65.000', '22%', 'assets/products/Umpan-Pancing-Casting-Lure.jpg', 'Umpan pancing casting lure untuk memancing ikan di berbagai jenis air.', 'pancing-umpan', '', 'https://s.shopee.co.id/W7GiPysya', true, 80),
('PELET MASYAI SIAP PAKAI SPECIAL MANCING GALATAMA', 'Rp18.000', 'Rp30.000', '40%', 'assets/products/pelet-masyai-siap-pakai-special-mancing-galatama.jpg', 'special buat anda pemancing ikan galatama membutuhkan pelet praktis TANPA ESSEN tambahan bisa memakai pelet yang satu ini.', 'pancing-umpan', '', 'https://s.shopee.co.id/8pmOdsthli', true, 81),
('JERSEY MANCING CUSTOM SATUAN', 'Rp127.000', 'Rp140.000', '10%', 'assets/products/JERSEY-MANCING-CUSTOM-SATUAN.jpg', 'UMPAN MANCING GALATAMA LELE PATIN MAS', 'pancing-umpan', '', 'https://s.shopee.co.id/qk77zjHNP', true, 82),
('SeaHunter Starfall Power Handle Spinning Fishing Reel', 'Rp375.000', 'Rp400.000', '6%', 'assets/products/SeaHunter-Starfall-Power-Handle-Spinning-Fishing-Reel.jpg', 'Max Drag 20 kg: 3 set bantalan rem komposit (3 besi + 3 serat karbon) untuk pengereman halus', 'pancing-umpan', '', 'https://s.shopee.co.id/1qceK72Vdo', true, 83),
('SeaHunter Black Arrow Senar PE X8', 'Rp94.000', 'Rp120.000', '22%', 'assets/products/SeaHunter-Black-Arrow-Senar-PE-X8.jpg', 'Bahan berkualitas tinggi yang diimpor dari Jepang, dengan teknologi tenun kompresi kepadatan tinggi.', 'pancing-umpan', '', 'https://s.shopee.co.id/4LJzIqPqsc', true, 84),
('Topi Gunung Outdoor Pria Wanita', 'Rp26.000', 'Rp39.000', '33%', 'assets/products/Topi-Gunung-Outdoor-Pria-Wanita.jpg', 'Topi gunung outdoor yang nyaman dan tahan lama, cocok untuk aktivitas di luar ruangan.', 'pancing-umpan', '', 'https://s.shopee.co.id/8pmOfMo1lU', true, 85),
('TrailTop Topi Mancing', 'Rp29.000', 'Rp40.000', '28%', 'assets/products/TrailTop-Topi-Mancing.jpg', 'Topi gunung outdoor yang nyaman dan tahan lama, cocok untuk aktivitas di luar ruangan.', 'pancing-umpan', '', 'https://s.shopee.co.id/30obkZbmiT', true, 86),
('Athleisure Topi Mancing anti UV Masker Jepang', 'Rp121.000', 'Rp150.000', '20%', 'assets/products/Topi-Mancing-anti-UV-Masker-Jepang.jpg', 'Topi gunung outdoor yang nyaman dan tahan lama, cocok untuk aktivitas di luar ruangan.', 'pancing-umpan', '', 'https://s.shopee.co.id/6fhu7d5IWV', true, 87),
('AGA Essen MICRO CACING Premium', 'Rp45.000', 'Rp60.000', '25%', 'assets/products/AGA-Essen-MICRO-CACING-Premium.jpg', 'Campuran Umpan Pancing Ikan Khusus Media Cacing 15ml', 'pancing-umpan', '', 'https://s.shopee.co.id/8pmOhtMYs8', true, 88),
('Pelet Makanan Ikan Koi 1kg', 'Rp49.000', 'Rp60.000', '25%', 'assets/products/Pelet-Makanan-Ikan-Koi-1kg.jpg', 'Mesin pompa aerasi 4 cabang bertenaga stabil dengan suara halus (silent operation) dan hemat daya listrik. Menjaga suplai oksigen terlarut kolam tetap prima.', 'Benih-Pakan-Budidaya', 'pakan', 'https://s.shopee.co.id/4qGFxpHusZ', true, 89),
('Takari Pakan Ikan mix 1 mm- 100 gr', 'Rp5.000', 'Rp12.000', '58%', 'assets/products/Takari-Pakan-Ikan-mix-1-mm-100-gr.jpg', 'Makanan Ikan Pelet Ikan Makanan Pakan Ikan Hias', 'Benih-Pakan-Budidaya', 'pakan', 'https://s.shopee.co.id/40h8yqcyfI', true, 90),
('Makanan Pelet Ikan Predator Carnivore 300gr', 'Rp95.000', 'Rp110.000', '14%', 'assets/products/Makanan-Pelet-Ikan-Predator-Carnivore-300gr.jpg', 'Makanan pelet ikan predator carnivore 300gr untuk menjaga kesehatan ikan dan kualitas air akuarium.', 'Benih-Pakan-Budidaya', 'pakan', 'https://s.shopee.co.id/9KigDD2lRV', true, 91),
('Pakan Ikan Cacing Sutera/Sutra Kering Tubifex', 'Rp25.000', 'Rp30.000', '17%', 'assets/products/Pakan-Ikan-Cacing-Sutera-Sutra-Kering-Tubifex.jpg', 'Pakan ikan cacing sutera/sutra kering tubifex untuk menjaga kesehatan ikan dan kualitas air akuarium.', 'Benih-Pakan-Budidaya', 'pakan', 'https://s.shopee.co.id/BURIT7bt9', true, 92),
('Pelet Ikan Koi Color Booster Mix Maggot BSFL (c) 850gr', 'Rp25.000', 'Rp40.000', '38%', 'assets/products/Pelet-Ikan-Koi-850gr.jpg', 'Pelet ikan koi color booster mix maggot BSFL (c) 850gr untuk menjaga kesehatan ikan dan kualitas air akuarium.', 'Benih-Pakan-Budidaya', 'pakan', 'https://s.shopee.co.id/3B82sAEIJn', true, 93),
('Red Maggot with Beta-carotene', 'Rp89.000', 'Rp100.000', '11%', 'assets/products/Red-Maggot-with-Beta-carotene.jpg', 'Red Maggot with Beta-carotene untuk menjaga kesehatan ikan dan kualitas air akuarium.', 'Benih-Pakan-Budidaya', 'pakan', 'https://s.shopee.co.id/6L54eB24Bp', true, 94),
('Bibit Ikan Lele per 100 ekor', 'Rp78.000', 'Rp90.000', '14%', 'assets/products/Bibit-Ikan_Lele-per-100-ekor.jpg', 'Bibit Ikan Lele per 100 ekor untuk menjaga kesehatan ikan dan kualitas air akuarium.', 'Benih-Pakan-Budidaya', 'benih', 'https://s.shopee.co.id/30ocevlQrn', true, 95),
('gurame soang size 3 jari ikan air tawar', 'Rp7.000', 'Rp10.000', '30%', 'assets/products/gurame-soang-size-3-jari-ikan-air-tawar.jpg', 'gurame soang size 3 jari ikan air tawar untuk menjaga kesehatan ikan dan kualitas air akuarium.', 'Benih-Pakan-Budidaya', 'benih', 'https://s.shopee.co.id/5LCXRLU1aO', true, 96),
('Benih bibit ikan lele Sangkuriang ukuran 2-3 cm per 100 ekor', 'Rp20.000', 'Rp30.000', '33%', 'assets/products/Benih-2-3-cm-per-100-ekor.jpg', 'Benih bibit ikan lele Sangkuriang ukuran 2-3 cm per 100 ekor untuk menjaga kesehatan ikan dan kualitas air akuarium.', 'Benih-Pakan-Budidaya', 'benih', 'https://s.shopee.co.id/4qGGqmbCdF', true, 97),
('FFC 15 Mesin Penepung Disk Mill', 'Rp975.000', 'Rp1.200.000', '20%', 'assets/products/FFC-15-Mesin-Penepung-Disk-Mill.jpg', 'Alat Serbaguna Kompak Kapasitas 50-60 kg/jam Berat 18 kg', 'Benih-Pakan-Budidaya', 'alat-aksesoris', 'https://s.shopee.co.id/6q1KMKUKWk', true, 98),
('Paket Bundling Mediatech pH Meter & TDS/EC Automatic Calibration', 'Rp149.000', 'Rp160.000', '7%', 'assets/products/Paket-Bundling-Mediatech-pH-Meter.jpg', 'Alat ukur pH meter dan TDS/EC otomatis dengan kalibrasi otomatis untuk memantau kualitas air kolam ikan.', 'Benih-Pakan-Budidaya', 'alat-aksesoris', 'https://s.shopee.co.id/5LCWZwD05e', true, 99),
('PH METER TDS TEMPERATUR 3 IN 1 WATERPROOF EZ 9901', 'Rp360.000', 'Rp400.000', '10%', 'assets/products/PH-METER-TDS-TEMPERATUR-3-IN-1-WATERPROOF-EZ-9901.jpg', 'Alat ukur pH meter, TDS, dan temperatur 3 in 1 waterproof EZ 9901 untuk memantau kualitas air kolam ikan.', 'Benih-Pakan-Budidaya', 'alat-aksesoris', 'https://s.shopee.co.id/3g4IbAFr4j', true, 100),
('Water Meter 5 in 1', 'Rp8.380.000', 'Rp9.000.000', '7%', 'assets/products/Water-Meter-5-in-1.jpg', 'Alat ukur kualitas air 5 in 1 untuk memantau pH, TDS, EC, DO, dan temperatur air kolam', 'Benih-Pakan-Budidaya', 'alat-aksesoris', 'https://s.shopee.co.id/7ptrZ8aS7U', true, 101),
('Kolam Bulat Tanpa Rangka 2 meter Tinggi 90 cm', 'Rp176.000', 'Rp200.000', '12%', 'assets/products/Kolam-Bulat-Tanpa-Rangka.jpg', 'Kolam bulat tanpa rangka 2 meter tinggi 90 cm untuk budidaya ikan, terbuat dari bahan berkualitas tinggi yang tahan lama dan mudah dipasang.', 'Benih-Pakan-Budidaya', 'alat-aksesoris', 'https://s.shopee.co.id/5LCWb08Xp3', true, 102),
('AERATOR MESIN UDARA 2 LUBANG AQUARIUM', 'Rp50.000', 'Rp70.000', '29%', 'assets/products/Aerator-Mesin-Udara-2-Lubang-Aquarium.jpg', 'Aerator mesin udara 2 lubang untuk akuarium, membantu meningkatkan oksigen dalam air dan menjaga kesehatan ikan.', 'Benih-Pakan-Budidaya', 'alat-aksesoris', 'https://s.shopee.co.id/60SE57ryYk', true, 103),
('Pompa Udara Aerator Air LP60', 'Rp1.600.000', 'Rp1.800.000', '11%', 'assets/products/Pompa-Udara-Aerator-Air-LP60.jpg', 'Pompa udara aerator air LP60 untuk akuarium, membantu meningkatkan oksigen dalam air dan menjaga kesehatan ikan.', 'Benih-Pakan-Budidaya', 'alat-aksesoris', 'https://s.shopee.co.id/1B0wLq4GZ', true, 104),
('Batu Aerator Nano Oxygen Bubble', 'Rp33.000', 'Rp50.000', '34%', 'assets/products/Batu-Aerator-Nano-Oxygen-Bubble.jpg', 'Batu aerator nano oxygen bubble untuk akuarium, membantu meningkatkan oksigen dalam air dan menjaga kesehatan ikan.', 'Benih-Pakan-Budidaya', 'alat-aksesoris', 'https://s.shopee.co.id/7KxbfvUWgS', true, 105),
('Aerator silent aquarium oxygen air pump', 'Rp47.000', 'Rp60.000', '22%', 'assets/products/Aerator-silent-aquarium-oxygen-air-pump.jpg', 'Aerator silent aquarium oxygen air pump untuk akuarium, membantu meningkatkan oksigen dalam air dan menjaga kesehatan ikan.', 'Benih-Pakan-Budidaya', 'alat-aksesoris', 'https://s.shopee.co.id/5At763o2Wf', true, 106),
('CLEANER PUMP SIPON ALAT PENGURAS', 'Rp15.000', 'Rp25.000', '40%', 'assets/products/CLEANER-PUMP-SIPON-ALAT-PENGURAS.jpg', 'Cleaner pump sipon alat penguras untuk akuarium, membantu membersihkan kotoran dan sisa makanan ikan.', 'Benih-Pakan-Budidaya', 'alat-aksesoris', 'https://s.shopee.co.id/1LgOXHL3Vo', true, 107),
('Sipon Alat Penguras Kuras Penyedot Sedot Akuarium', 'Rp36.000', 'Rp47.000', '23%', 'assets/products/Sipon-Alat-Penguras-Kuras-Penyedot-Sedot-Akuarium.jpg', 'Sipon alat penguras kuras penyedot sedot akuarium untuk membersihkan kotoran dan sisa makanan ikan.', 'Benih-Pakan-Budidaya', 'alat-aksesoris', 'https://s.shopee.co.id/5At76QPpae', true, 108),
('1 Set aquarium akrilik', 'Rp99.000', 'Rp120.000', '18%', 'assets/products/1-Set-aquarium-akrilik.jpg', '1 set aquarium akrilik 2 meter tinggi 90 cm untuk budidaya ikan, terbuat dari bahan berkualitas tinggi yang tahan lama dan mudah dipasang.', 'Benih-Pakan-Budidaya', 'alat-aksesoris', 'https://s.shopee.co.id/113Y928ygk', true, 109),
('Orcarium Lobe Series Akuarium SOLITER', 'Rp110.000', 'Rp140.000', '21%', 'assets/products/Orcarium-Lobe-Series-Akuarium-SOLITER.jpg', 'Orcarium Lobe Series Akuarium SOLITER untuk budidaya ikan, terbuat dari bahan berkualitas tinggi yang tahan lama dan mudah dipasang.', 'Benih-Pakan-Budidaya', 'alat-aksesoris', 'https://s.shopee.co.id/3qNjWMivha', true, 110),
('bonsai aquascape sintetis (hiasan/dekorasi akuarium)', 'Rp40.000', 'Rp50.000', '20%', 'assets/products/bonsai-aquascape-sintetis-hiasan-dekorasi-akuarium.jpg', 'Bonsai aquascape sintetis untuk hiasan dan dekorasi akuarium, memberikan tampilan yang menarik dan alami.', 'Benih-Pakan-Budidaya', 'alat-aksesoris', 'https://s.shopee.co.id/5fpNhx0KQN', true, 111),
('LAMPU CELUP 20 CM', 'Rp20.000', 'Rp30.000', '33%', 'assets/products/LAMPU-CELUP-20-CM.jpg', 'LAMPU CELUP 20 CM untuk penerangan akuarium, memberikan cahaya yang optimal untuk tumbuhan dan ikan.', 'Benih-Pakan-Budidaya', 'alat-aksesoris', 'https://s.shopee.co.id/2BFVbXAkzi', true, 112),
('Hiasan Aquascape Aksesoris', 'Rp29.000', 'Rp36.000', '19%', 'assets/products/Hiasan-Aquascape-Aksesoris.jpg', 'Hiasan aquascape aksesoris untuk dekorasi akuarium, memberikan tampilan yang menarik dan alami.', 'Benih-Pakan-Budidaya', 'alat-aksesoris', 'https://s.shopee.co.id/1VzooWGZHP', true, 113),
('Lampu Gantung Aquarium Aquascape', 'Rp49.000', 'Rp55.000', '12%', 'assets/products/Lampu-Gantung-Aquarium-Aquascape.jpg', 'Lampu gantung aquarium aquascape untuk penerangan akuarium, memberikan cahaya yang optimal untuk tumbuhan dan ikan.', 'Benih-Pakan-Budidaya', 'alat-aksesoris', 'https://s.shopee.co.id/5VVxZxTZK7', true, 114),
('FILTER GANTUNG AKUARIUM AQUASCAPE', 'Rp54.000', 'Rp60.000', '10%', 'assets/products/FILTER-GANTUNG-AKUARIUM-AQUASCAPE.jpg', 'Filter gantung akuarium aquascape untuk menjaga kebersihan air akuarium, memberikan lingkungan yang sehat bagi ikan.', 'Benih-Pakan-Budidaya', 'alat-aksesoris', 'https://s.shopee.co.id/3B82nqpC8I', true, 115),
('Akar Kayu Rasamala Size S Aquascape', 'Rp12.000', 'Rp20.000', '12%', 'assets/products/Akar-Kayu-Rasamala-Size-S-Aquascape.jpg', 'Akar kayu rasamala size S untuk aquascape, memberikan tampilan yang menarik dan alami.', 'Benih-Pakan-Budidaya', 'alat-aksesoris', 'https://s.shopee.co.id/2qVCPVSxZo', true, 116),
('akar Kayu Santigi Asli Beragam ukuran untuk hiasan akuarium', 'Rp500.000', 'Rp600.000', '17%', 'assets/products/Akar-Kayu-Santigi-Asli-Beragam-ukuran-untuk-hiasan-akuarium.jpg', 'Akar kayu santigi asli beragam ukuran untuk hiasan akuarium, memberikan tampilan yang menarik dan alami.', 'Benih-Pakan-Budidaya', 'alat-aksesoris', 'https://s.shopee.co.id/9zyMwroIyp', true, 117),
('Hiasan akuarium Bonsai tema beringin aquascape', 'Rp60.000', 'Rp80.000', '25%', 'assets/products/Hiasan-Akuarium-Bonsai-Tema-Beringin-Aquascape.jpg', 'Hiasan akuarium berbentuk bonsai tema beringin untuk aquascape, memberikan tampilan yang menarik dan alami.', 'Benih-Pakan-Budidaya', 'alat-aksesoris', 'https://s.shopee.co.id/4LK0Cb0wsu', true, 118),
('Pompa Air Celup Aquarium 25w', 'Rp79.000', 'Rp100.000', '21%', 'assets/products/Pompa-Air-Celup-Aquarium-25w.jpg', 'Pompa air celup aquarium 25w untuk menjaga aliran air dan oksigenasi dalam akuarium.', 'Benih-Pakan-Budidaya', 'alat-aksesoris', 'https://s.shopee.co.id/W7HdiFyGC', true, 119),
('paket 10 pot 10 jenis tanaman aquascape', 'Rp8.000', 'Rp14.000', '43%', 'assets/products/Paket-10-Pot-10-Jenis-Tanaman-Aquascape.jpg', 'Paket 10 pot berisi 10 jenis tanaman aquascape untuk hiasan akuarium.', 'Benih-Pakan-Budidaya', 'alat-aksesoris', 'https://s.shopee.co.id/3qNjc36D8S', true, 120),
('kolam Terpal Bulat Fullset Diameter 3 tinggi 1,2 Merk orchid', 'Rp1.459.000', 'Rp1.600.000', '9%', 'assets/products/kolam-terpal-bulat-fullset-orchid.jpg', 'kolam Terpal Bulat Fullset Diameter 3 tinggi 1,2 Merk orchid', 'Benih-Pakan-Budidaya', 'alat-aksesoris', 'https://s.shopee.co.id/9zyMydrVnc', true, 121),
('Diffuser Aerasi Gelembung Halus Grade B Import', 'Rp102.000', 'Rp130.000', '22%', 'assets/products/Diffuser-Aerasi-Gelembung-Halus-Grade-B-Import.jpg', 'Diffuser Aerasi Gelembung Halus Grade B Import untuk menjaga kesehatan ikan dan kualitas air akuarium.', 'Benih-Pakan-Budidaya', 'alat-aksesoris', 'https://s.shopee.co.id/2qVCRs0eYQ', true, 122),
('Drum budidaya ikan 200L', 'Rp349.000', 'Rp400.000', '13%', 'assets/products/Drum-budidaya-ikan-200L.jpg', 'Drum budidaya ikan 200L untuk menjaga kesehatan ikan dan kualitas air akuarium.', 'Benih-Pakan-Budidaya', 'alat-aksesoris', 'https://s.shopee.co.id/1VzosSAwtQ', true, 123),
('Jaring Waring Pembatas Kolam 100M x 120CM', 'Rp279.000', 'Rp330.000', '15%', 'assets/products/Jaring-Waring-Ukuran.jpg', 'Waring hitam rajutan kuat anti geser untuk pembatas, peneduh, atau pagar kolam ikan. Tahan terhadap cuaca panas ekstrem dan tidak mudah rapuh.', 'Benih-Pakan-Budidaya', 'alat-aksesoris', 'https://s.shopee.co.id/60RwflhpFa', true, 124),
('Serok ikan lipat 80cm', 'Rp137.000', 'Rp150.000', '9%', 'assets/products/Serok-ikan-lipat-80cm.jpg', 'Serok ikan lipat 80cm untuk memudahkan penangkapan ikan di kolam atau akuarium.', 'Benih-Pakan-Budidaya', 'alat-aksesoris', 'https://s.shopee.co.id/50Zir3PDts', true, 125),
('baskom sortir ikan', 'Rp29.000', 'Rp38.000', '24%', 'assets/products/Baskom-Sortir-Ikan.jpg', 'Baskom sortir ikan untuk memudahkan pemisahan ikan berdasarkan ukuran atau jenis.', 'Benih-Pakan-Budidaya', 'alat-aksesoris', 'https://s.shopee.co.id/7ptuEvo7br', true, 126),
('Box container serbaguna tipe rabbit (untuk kolam ikan hias)', 'Rp115.000', 'Rp130.000', '12%', 'assets/products/Box-Container-Serbaguna-Tipe-Rabbit.jpg', 'Box container serbaguna tipe rabbit (untuk kolam ikan hias) untuk berbagai keperluan di kolam ikan hias. Tahan terhadap cuaca panas ekstrem dan tidak mudah rapuh.', 'Benih-Pakan-Budidaya', 'alat-aksesoris', 'https://s.shopee.co.id/5LCZGVObUx', true, 127),
('Baskom Plastik Besar Kotak', 'Rp74.000', 'Rp100.000', '26%', 'assets/products/Baskom-Plastik-Besar-Kotak.jpg', 'Baskom plastik besar kotak untuk berbagai keperluan di kolam ikan hias. Tahan terhadap cuaca panas ekstrem dan tidak mudah rapuh.', 'Benih-Pakan-Budidaya', 'alat-aksesoris', 'https://s.shopee.co.id/1gJGtJXEjb', true, 128),
('Bakteri Starter Untuk Koi', 'Rp123.000', 'Rp140.000', '12%', 'assets/products/Bakteri-Starter-Untuk-Koi.jpg', 'Bakteri starter untuk koi untuk menjaga kesehatan ikan dan menjaga kualitas air.', 'Benih-Pakan-Budidaya', 'suplemen', 'https://s.shopee.co.id/7ptsMYD0jf', true, 129),
('BOSTER AQUAENZYM (100 Gram)', 'Rp25.000', 'Rp40.000', '38%', 'assets/products/BOSTER-AQUAENZYM-100-Gram.jpg', 'BOSTER AQUAENZYM (100 Gram) untuk menjaga kesehatan ikan dan kualitas air akuarium.', 'Benih-Pakan-Budidaya', 'suplemen', 'https://s.shopee.co.id/1qcfEjfeEd', true, 130),
('Nitrobacter Original Probiotik', 'Rp12.000', 'Rp20.000', '40%', 'assets/products/Nitrobacter-Original-Probiotik.jpg', 'Nitrobacter Original Probiotik untuk menjaga kesehatan ikan dan kualitas air akuarium.', 'Benih-Pakan-Budidaya', 'suplemen', 'https://s.shopee.co.id/3qNjdRsvcQ', true, 131),
('AQUAPROENZYM 100g', 'Rp30.000', 'Rp40.000', '25%', 'assets/products/AQUAPROENZYM-100g.jpg', 'AQUAPROENZYM 100g untuk menjaga kesehatan ikan dan kualitas air akuarium.', 'Benih-Pakan-Budidaya', 'suplemen', 'https://s.shopee.co.id/5At7E36yKh', true, 132),
('Tetes Tebu/Molase Asli Murni 100%', 'Rp18.000', 'Rp25.000', '28%', 'assets/products/tetes-tebu-molase-asli-murni-100.jpg', 'Tetes Tebu/Molase Asli Murni 100% untuk menjaga kesehatan ikan dan kualitas air akuarium.', 'Benih-Pakan-Budidaya', 'suplemen', 'https://s.shopee.co.id/2gBmFvejE2', true, 133),
('Mayin Water Stabilizer aquarium', 'Rp49.000', 'Rp60.000', '18%', 'assets/products/mayin-water-stabilizer-aquarium.jpg', 'Mayin Water Stabilizer aquarium untuk menjaga kesehatan ikan dan kualitas air akuarium.', 'Benih-Pakan-Budidaya', 'suplemen', 'https://s.shopee.co.id/4qGKKa7KPl', true, 134),
('MAYIN Probiotic & Nitrifying Bacteria Probiotik', 'Rp50.000', 'Rp65.000', '23%', 'assets/products/mayin-probiotic-nitrifying-bacteria-probiotik.jpg', 'MAYIN Probiotic & Nitrifying Bacteria Probiotik untuk menjaga kesehatan ikan dan kualitas air akuarium.', 'Benih-Pakan-Budidaya', 'suplemen', 'https://s.shopee.co.id/AAHqgZ5kSw', true, 135),
('MAYIN Micronutrient Supplement', 'Rp50.000', 'Rp60.000', '18%', 'assets/products/mayin-micronutrient-supplement.jpg', 'MAYIN Micronutrient Supplement untuk menjaga kesehatan ikan dan kualitas air akuarium.', 'Benih-Pakan-Budidaya', 'suplemen', 'https://s.shopee.co.id/50ZkXDOsLg', true, 136),
('Tetes Tebu/Molase Asli Murni 100%', 'Rp18.000', 'Rp25.000', '28%', 'assets/products/tetes-tebu-molase-asli-murni-100.jpg', 'Tetes Tebu/Molase Asli Murni 100% untuk menjaga kesehatan ikan dan kualitas air akuarium.', 'Benih-Pakan-Budidaya', 'suplemen', 'https://s.shopee.co.id/2gBmFvejE2', true, 137),
('molase tetes tebu murni 5kg', 'Rp39.000', 'Rp45.000', '13%', 'assets/products/molase-tetes-tebu-murni-5kg.jpg', 'molase tetes tebu murni 5kg untuk menjaga kesehatan ikan dan kualitas air akuarium.', 'Benih-Pakan-Budidaya', 'suplemen', 'https://s.shopee.co.id/qk84fa9Kb', true, 138);

-- SELESAI! Seluruh tabel, keamanan RLS, bucket gambar, dan 138 produk berhasil disiapkan.
