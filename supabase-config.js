/* ============================================================================
   KONFIGURASI SUPABASE — AQUAAGRI.ID
   ============================================================================
   PANDUAN UNTUK PEMULA:
   1. Buka dashboard proyek Anda di https://supabase.com/dashboard
   2. Masuk ke menu: Project Settings (ikon gerigi) -> API
   3. Salin (Copy) "Project URL" lalu tempel di bagian SUPABASE_URL di bawah.
   4. Salin (Copy) "anon" / "public" key lalu tempel di bagian SUPABASE_ANON_KEY.
   
   CATATAN KEAMANAN:
   - Kunci "anon public" AMAN ditaruh di sini karena database Anda sudah dikunci
     menggunakan Row Level Security (RLS) dari file supabase-setup.sql.
   - Pengunjung biasa hanya bisa MELIHAT katalog (SELECT).
   - Hanya Admin yang sudah login resmi yang bisa Tambah/Edit/Hapus/Upload.
   - JANGAN PERNAH menaruh kunci "service_role" (rahasia) di file ini!
   ============================================================================ */

window.AQUAAGRI_SUPABASE_CONFIG = {
  // Tempel Project URL Supabase Anda di antara tanda kutip di bawah ini:
  SUPABASE_URL: "https://uqihzgskwxdurcwjpvbc.supabase.co",

  // Tempel Anon Public Key Supabase Anda di antara tanda kutip di bawah ini:
  SUPABASE_ANON_KEY: "sb_publishable_XOjGorIRGBqztcldte1AzQ_GwOyFKXQ",

  // Nama bucket penyimpanan gambar di Supabase Storage (jangan diubah):
  STORAGE_BUCKET: "aquaagri-images"
};

/**
 * Mengambil konfigurasi Supabase aktif (mendukung pengaturan dari file ini
 * maupun pengaturan yang disimpan lewat layar Setup di Dashboard Admin).
 */
window.getAquaAgriSupabaseConfig = function () {
  const fileConfig = window.AQUAAGRI_SUPABASE_CONFIG || {};
  let savedUrl = "";
  let savedKey = "";

  try {
    savedUrl = (localStorage.getItem("aquaagri_sb_url") || "").trim();
    savedKey = (localStorage.getItem("aquaagri_sb_anon_key") || "").trim();
  } catch (e) {}

  const url = (fileConfig.SUPABASE_URL || savedUrl || "").trim().replace(/\/+$/, "");
  const anonKey = (fileConfig.SUPABASE_ANON_KEY || savedKey || "").trim();
  const bucket = (fileConfig.STORAGE_BUCKET || "aquaagri-images").trim();

  return {
    url: url,
    anonKey: anonKey,
    bucket: bucket,
    isConfigured: Boolean(url && anonKey && url.startsWith("https://"))
  };
};

/**
 * Menyimpan URL dan Anon Key ke browser lokal (memudahkan pengujian di laptop)
 */
window.saveAquaAgriSupabaseConfigLocal = function (url, anonKey) {
  const cleanUrl = String(url || "").trim().replace(/\/+$/, "");
  const cleanKey = String(anonKey || "").trim();
  try {
    if (cleanUrl && cleanKey) {
      localStorage.setItem("aquaagri_sb_url", cleanUrl);
      localStorage.setItem("aquaagri_sb_anon_key", cleanKey);
    } else {
      localStorage.removeItem("aquaagri_sb_url");
      localStorage.removeItem("aquaagri_sb_anon_key");
    }
  } catch (e) {}
  window._aquaAgriSbClient = null;
  window._aquaAgriSbClientKey = null;
};

/**
 * Membuat atau mengambil instance Supabase Client
 */
window.getAquaAgriSupabaseClient = function () {
  const cfg = window.getAquaAgriSupabaseConfig();
  if (!cfg.isConfigured) return null;
  if (!window.supabase || typeof window.supabase.createClient !== "function") {
    return null;
  }

  const cacheKey = cfg.url + "::" + cfg.anonKey;
  if (window._aquaAgriSbClient && window._aquaAgriSbClientKey === cacheKey) {
    return window._aquaAgriSbClient;
  }

  try {
    window._aquaAgriSbClient = window.supabase.createClient(cfg.url, cfg.anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        storageKey: "aquaagri_admin_auth"
      }
    });
    window._aquaAgriSbClientKey = cacheKey;
    return window._aquaAgriSbClient;
  } catch (err) {
    console.error("Gagal menginisialisasi koneksi Supabase:", err);
    return null;
  }
};
