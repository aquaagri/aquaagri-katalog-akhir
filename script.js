/* ==========================================================
   AquaAgri.id — Logika Katalog & Navigasi Terpercaya
   Kategori, Diskon Produk, & Redirect Shopee
   ========================================================== */

// ---------- 1. DATA PRODUK DENGAN SENTUHAN DISKON ----------

const products = [
  // --- Kategori: Produk Olahan Ikan ---
  {
    id: 1,
    nama: "Abon Ikan Tuna Pedas 100gr",
    harga: "Rp34.000",
    hargaCoret: "Rp42.000",
    diskon: "19%",
    gambar: "assets/products/abon-ikan.jpg",
    deskripsi: "Dibuat dari 100% daging tuna segar pilihan dengan racikan bumbu pedas gurih khas nusantara. Bebas pengawet, cocok untuk lauk praktis dan bekal keluarga.",
    kategori: "produk-olahan-ikan",
    linkAffiliate: "https://s.shopee.co.id/6L4k4e0L0t"
  },
  {
    id: 2,
    nama: "Kerupuk Ikan Tenggiri Mentah 500gr",
    harga: "Rp22.000",
    hargaCoret: "Rp28.000",
    diskon: "21%",
    gambar: "assets/products/ikan-tenggiri-mentah.jpg",
    deskripsi: "Kerupuk ikan tenggiri kualitas super dengan cita rasa ikan asli yang gurih, renyah, dan mekar sempurna saat digoreng. Kaya nutrisi dan higienis.",
    kategori: "produk-olahan-ikan",
    linkAffiliate: "https://s.shopee.co.id/7KxHgFK2xJ"
  },
  {
    id: 3,
    nama: "Sambal Ikan Roa Asli Khas Manado 150gr",
    harga: "Rp36.000",
    hargaCoret: "Rp45.000",
    diskon: "20%",
    gambar: "assets/products/sambal-roa.jpg",
    deskripsi: "Sambal ikan roa asap autentik khas Manado dengan racikan rempah tradisional pilihan. Cita rasa pedas mantap dan aroma asap yang sangat menggugah selera.",
    kategori: "produk-olahan-ikan",
    linkAffiliate: "https://s.shopee.co.id/6L4kV6TNMv"
  },
  {
    id: 4,
    nama: "Ikan Wader Goreng Crispy 100gr",
    harga: "Rp16.000",
    hargaCoret: "Rp20.000",
    diskon: "20%",
    gambar: "assets/products/Ikan-Wader-Goreng-Crispy.jpg",
    deskripsi: "Ikan wader air tawar segar digoreng renyah dengan balutan bumbu gurih rempah. Camilan kaya kalsium alami yang lezat disantap bersama nasi hangat.",
    kategori: "produk-olahan-ikan",
    linkAffiliate: "https://s.shopee.co.id/6q15oXrPRj"
  },
  {
    id: 5,
    nama: "Kerupuk Kulit Ikan Patin Original 230gr",
    harga: "Rp46.000",
    hargaCoret: "Rp55.000",
    diskon: "16%",
    gambar: "assets/products/Kerupuk-Kulit-Ikan-Patin .jpg",
    deskripsi: "Kerupuk kulit ikan patin pilihan yang diolah bersih dan digoreng garing renyah. Tidak berbau amis, gurih alami, dan merupakan camilan berprotein tinggi.",
    kategori: "produk-olahan-ikan",
    linkAffiliate: "https://s.shopee.co.id/LnZwHBJCs"
  },
  {
    id: 6,
    nama: "Kerupuk Tulang Lele Kaya Kalsium",
    harga: "Rp13.000",
    hargaCoret: "Rp17.000",
    diskon: "23%",
    gambar: "assets/products/Kerupuk-Tulang-Lele.jpg",
    deskripsi: "Inovasi olahan bernutrisi tinggi dari tulang ikan lele segar yang diproses secara higienis. Renyah, gurih nikmat, dan sangat kaya kalsium alami.",
    kategori: "produk-olahan-ikan",
    linkAffiliate: "https://s.shopee.co.id/5q8WV2nDKy"
  },
  {
    id: 7,
    nama: "Kerupuk Stik Ikan Tongkol Gurih 500gr",
    harga: "Rp12.000",
    hargaCoret: "Rp16.000",
    diskon: "25%",
    gambar: "assets/products/Kerupuk-Stik-Ikan-Tongkol.jpg",
    deskripsi: "Stik kerupuk ikan tongkol bertekstur renyah dengan cita rasa gurih ikan yang terasa nyata. Sangat cocok sebagai camilan santai maupun teman bersantap.",
    kategori: "produk-olahan-ikan",
    linkAffiliate: "https://s.shopee.co.id/9pefGpWMQm"
  },
  {
    id: 8,
    nama: "Maksor Pedas Spesial Cap Ikan Tawes 1 Ball",
    harga: "Rp25.000",
    hargaCoret: "Rp32.000",
    diskon: "22%",
    gambar: "assets/products/Maksor-Pedas-Special-Cap-Ikan-Tawes.jpg",
    deskripsi: "Makaroni olahan bumbu gurih ikan tawes dengan perpaduan rasa pedas manis istimewa. Kemasan 1 ball grosir ekonomis untuk persediaan camilan keluarga.",
    kategori: "produk-olahan-ikan",
    linkAffiliate: "https://s.shopee.co.id/AUuM4aQ7Ib"
  },
  {
    id: 9,
    nama: "Kerupuk Kemplang Mini Tenggiri 200gr",
    harga: "Rp15.000",
    hargaCoret: "Rp19.000",
    diskon: "21%",
    gambar: "assets/products/Kerupuk-Kemplan-Tenggiri.jpg",
    deskripsi: "Kemplang panggang mini khas Palembang dengan bahan baku utama ikan tenggiri segar. Tekstur renyah berongga dengan aroma panggangan khas yang sedap.",
    kategori: "produk-olahan-ikan",
    linkAffiliate: "https://s.shopee.co.id/4qG1QWT9X0"
  },
  {
    id: 10,
    nama: "Ikan Cakalang Suwir Rica Khas Manado",
    harga: "Rp48.000",
    hargaCoret: "Rp59.000",
    diskon: "18%",
    gambar: "assets/products/Ikan-Cakalang-Suwir-Rica-Khas-Manado.jpg",
    deskripsi: "Suwiran daging ikan cakalang asap asli dengan racikan bumbu rica-rica merah khas Manado. Pedas gurih meresap, higienis, dan praktis siap saji.",
    kategori: "produk-olahan-ikan",
    linkAffiliate: "https://s.shopee.co.id/BU9tio9xn"
  },
  {
    id: 11,
    nama: "Baso Ikan Sinar Bahari Bandung 40 Butir",
    harga: "Rp24.000",
    hargaCoret: "Rp30.000",
    diskon: "20%",
    gambar: "assets/products/Baso-Ikan-Sinar-Bahari-Bandung.jpg",
    deskripsi: "Baso ikan kenyal dan gurih khas Bandung isi 40 butir. Terbuat dari olahan daging ikan segar pilihan berstandar mutu tinggi tanpa bahan pengawet berbahaya.",
    kategori: "produk-olahan-ikan",
    linkAffiliate: "https://s.shopee.co.id/9V1p1QZKrx"
  },

  // --- Kategori: Ikan & Seafood Segar ---
  {
    id: 12,
    nama: "Kepala Ikan Kakap Merah Segar 1kg",
    harga: "Rp44.000",
    hargaCoret: "Rp55.000",
    diskon: "20%",
    gambar: "assets/products/kepala-kakap-merah.jpg",
    deskripsi: "Kepala kakap merah hasil tangkapan laut segar, dibersihkan higienis dan dibekukan dengan teknologi flash-freezing untuk bahan utama sup atau gulai istimewa.",
    kategori: "ikan-seafood-segar",
    linkAffiliate: "https://s.shopee.co.id/3LR8wC3aMw"
  },
  {
    id: 13,
    nama: "Udang Vaname Segar Fresh 500gr",
    harga: "Rp45.000",
    hargaCoret: "Rp55.000",
    diskon: "18%",
    gambar: "assets/products/udang-vaname.jpg",
    deskripsi: "Udang vaname segar hasil tambak budidaya terkelola. Ukuran seragam, berdaging padat kenyal dengan rasa manis gurih alami, siap diolah.",
    kategori: "ikan-seafood-segar",
    linkAffiliate: "https://s.shopee.co.id/9zy2stK622"
  },
  {
    id: 14,
    nama: "Ikan Cakalang Bersih Segar Beku 1kg",
    harga: "Rp46.000",
    hargaCoret: "Rp56.000",
    diskon: "18%",
    gambar: "assets/products/Ikan-Cakalang.jpg",
    deskripsi: "Ikan cakalang laut utuh yang telah dibersihkan insang dan kotorannya. Pembekuan cepat mempertahankan kesegaran, tekstur padat, serta kandungan protein tinggi.",
    kategori: "ikan-seafood-segar",
    linkAffiliate: "https://s.shopee.co.id/2LYgLoyWyK"
  },
  {
    id: 15,
    nama: "Kepiting Bakau Jumbo Fresh Frozen",
    harga: "Rp126.000",
    hargaCoret: "Rp150.000",
    diskon: "16%",
    gambar: "assets/products/Kepiting-Bakau.jpg",
    deskripsi: "Kepiting bakau pilihan ukuran jumbo dengan capit tebal dan daging padat manis. Mutu ekspor standar restoran seafood premium.",
    kategori: "ikan-seafood-segar",
    linkAffiliate: "https://s.shopee.co.id/9pehIBhlZN"
  },
  {
    id: 16,
    nama: "Steak Tuna Merah 500gr (Tanpa Tulang)",
    harga: "Rp55.000",
    hargaCoret: "Rp68.000",
    diskon: "19%",
    gambar: "assets/products/Steak-Tuna-Merah .jpg",
    deskripsi: "Potongan steak daging ikan tuna merah murni tanpa duri dan kulit. Tekstur lembut bernutrisi tinggi kaya asam lemak Omega-3 untuk kesehatan jantung.",
    kategori: "ikan-seafood-segar",
    linkAffiliate: "https://s.shopee.co.id/4B0KYIPg9P"
  },
  {
    id: 17,
    nama: "Ikan Gabus Segar Pilihan 1kg",
    harga: "Rp50.000",
    hargaCoret: "Rp62.000",
    diskon: "19%",
    gambar: "assets/products/Ikan-Gabus.jpg",
    deskripsi: "Ikan gabus air tawar segar kaya kandungan albumin alami untuk regenerasi sel dan pemulihan tubuh. Daging putih lembut dan tebal tanpa banyak duri halus.",
    kategori: "ikan-seafood-segar",
    linkAffiliate: "https://s.shopee.co.id/1gIzZxNVa3"
  },
  {
    id: 18,
    nama: "Ikan Kembung Banjar Segar 1kg",
    harga: "Rp29.000",
    hargaCoret: "Rp36.000",
    diskon: "19%",
    gambar: "assets/products/Ikan-Kembung.jpg",
    deskripsi: "Ikan kembung banjar segar ukuran konsumsi harian keluarga (isi 6-8 ekor/kg). Sangat bergizi, lezat digoreng krispi, dibakar kecap, atau dibumbu pesmol.",
    kategori: "ikan-seafood-segar",
    linkAffiliate: "https://s.shopee.co.id/2qUwyTjnab"
  },
  {
    id: 19,
    nama: "Ikan Salmon Trout Fillet Segar 200gr",
    harga: "Rp58.000",
    hargaCoret: "Rp72.000",
    diskon: "19%",
    gambar: "assets/products/Ikan-Salmon.jpg",
    deskripsi: "Fillet salmon trout segar dengan guratan marbling cantik dan warna oranye alami. Dikemas higienis vakum kedap udara, sangat cocok untuk pan-sear, sushi, dan MPASI.",
    kategori: "ikan-seafood-segar",
    linkAffiliate: "https://s.shopee.co.id/AUuO71vp7Q"
  },

  // --- Kategori: Pancing & Umpan ---
  {
    id: 20,
    nama: "Joran Pancing Carbon Solid 200cm",
    harga: "Rp174.000",
    hargaCoret: "Rp210.000",
    diskon: "17%",
    gambar: "assets/products/joran-pancing-carbon.jpg",
    deskripsi: "Joran pancing berbahan high-modulus carbon yang sangat ringan, kuat, dan lentur presisi. Sensitivitas tinggi untuk mendeteksi getaran sambaran ikan.",
    kategori: "pancing-umpan",
    linkAffiliate: "https://s.shopee.co.id/1qcLKGwOZz"
  },
  {
    id: 21,
    nama: "Umpan Mancing Ikan Mas & Nila 30g",
    harga: "Rp14.000",
    hargaCoret: "Rp18.000",
    diskon: "22%",
    gambar: "assets/products/umpan-mancing-ikan-mas.jpg",
    deskripsi: "Formula pelet umpan aroma wangi perangsang nafsu makan ikan air tawar. Mudah dibentuk, merekat kuat di kail, dan cepat menarik perhatian ikan di kolam pancing.",
    kategori: "pancing-umpan",
    linkAffiliate: "https://s.shopee.co.id/20vlXdm0ow"
  },
  {
    id: 22,
    nama: " Essen Garut Id",
    harga: "Rp34.000",
    hargaCoret: "Rp58.000",
    diskon: "41%",
    gambar: "assets/products/essen-garut.jpg",
    deskripsi: "Essen Oplosan siap gacor dari essen garut.id spesial mancing Ikan Mas.",
    kategori: "pancing-umpan",
    linkAffiliate: "https://s.shopee.co.id/5VVmqQLy0T"
  },
  {
    id: 21,
    nama: "Umpan Mancing Ikan Mas & Nila 30g",
    harga: "Rp14.000",
    hargaCoret: "Rp18.000",
    diskon: "22%",
    gambar: "assets/products/umpan-mancing-ikan-mas.jpg",
    deskripsi: "Formula pelet umpan aroma wangi perangsang nafsu makan ikan air tawar. Mudah dibentuk, merekat kuat di kail, dan cepat menarik perhatian ikan di kolam pancing.",
    kategori: "pancing-umpan",
    linkAffiliate: "https://s.shopee.co.id/20vlXdm0ow"
  },
  {
    id: 22,
    nama: "Essen Oplosan Super Ikan NILA 30ml",
    harga: "Rp120.000",
    hargaCoret: "Rp145.000",
    diskon: "17%",
    gambar: "assets/products/AGA-Essen -uper Ikan-NILA.jpg",
    deskripsi: "Essen konsentrat premium dengan aroma khas kuat yang dirancang khusus untuk memikat ikan nila babon di berbagai kondisi air kolam maupun waduk liar.",
    kategori: "pancing-umpan",
    linkAffiliate: "https://s.shopee.co.id/5LCKobxOA1"
  },

  // --- Kategori: Benih, Pakan & Budidaya ---
  {
    id: 23,
    nama: "Aerator Aquarium & Kolam Ikan Koi 4 Cabang",
    harga: "Rp150.000",
    hargaCoret: "Rp185.000",
    diskon: "19%",
    gambar: "assets/products/aerator-4-lubang.jpg",
    deskripsi: "Mesin pompa aerasi 4 cabang bertenaga stabil dengan suara halus (silent operation) dan hemat daya listrik. Menjaga suplai oksigen terlarut kolam tetap prima.",
    kategori: "Benih-Pakan-Budidaya",
    linkAffiliate: "https://s.shopee.co.id/1BMeZfH9oP"
  },
  {
    id: 24,
    nama: "Jaring Waring Pembatas Kolam 100M x 120CM",
    harga: "Rp279.000",
    hargaCoret: "Rp330.000",
    diskon: "15%",
    gambar: "assets/products/Jaring-Waring-Ukuran.jpg",
    deskripsi: "Waring hitam rajutan kuat anti geser untuk pembatas, peneduh, atau pagar kolam ikan. Tahan terhadap cuaca panas ekstrem dan tidak mudah rapuh.",
    kategori: "Benih-Pakan-Budidaya",
    linkAffiliate: "https://s.shopee.co.id/60RwflhpFa"
  }
];

// ---------- 2. DAFTAR KATEGORI ----------

const categories = [
  { id: "produk-olahan-ikan", nama: "Produk Olahan Ikan", ikon: "🍥🐠", deskripsi: "Abon, kerupuk, sambal roa & aneka olahan" },
  { id: "ikan-seafood-segar", nama: "Ikan & Seafood Segar", ikon: "🦐🐟", deskripsi: "Kakap, salmon, udang, kepiting & tuna segar" },
  { id: "pancing-umpan", nama: "Pancing & Umpan", ikon: "🎣🌊", deskripsi: "Joran carbon, umpan pelet & essen oplosan" },
  { id: "Benih-Pakan-Budidaya", nama: "Benih, Pakan & Budidaya", ikon: "🌱🧰", deskripsi: "Aerator hemat listrik, jaring waring & sarana kolam" }
];

// Placeholder gambar cadangan
const PLACEHOLDER_IMG =
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300">' +
    '<rect width="300" height="300" fill="#edf7fa"/>' +
    '<text x="50%" y="50%" font-family="sans-serif" font-size="15" fill="#2e98b0" text-anchor="middle" dominant-baseline="middle">Foto Produk AquaAgri</text>' +
    '</svg>'
  );

// ---------- 3. STATE APLIKASI ----------

let currentCategory = "semua";
let currentKeyword = "";

// ---------- 4. INISIALISASI DOM ----------

document.addEventListener("DOMContentLoaded", function () {
  const homeView = document.getElementById("homeView");
  const categoryView = document.getElementById("categoryView");
  const categoryGrid = document.getElementById("categoryGrid");
  const productGrid = document.getElementById("productGrid");
  const categoryTitle = document.getElementById("categoryTitle");
  const categoryCount = document.getElementById("categoryCount");
  const emptyState = document.getElementById("emptyState");
  const backBtn = document.getElementById("backBtn");
  const brandLogo = document.getElementById("brandLogo");

  const searchInput = document.getElementById("searchInput");
  const searchInputCategory = document.getElementById("searchInputCategory");
  const filterSelect = document.getElementById("filterSelect");

  if (
    !homeView || !categoryView || !categoryGrid || !productGrid ||
    !categoryTitle || !emptyState || !backBtn || !searchInput ||
    !searchInputCategory || !filterSelect
  ) {
    return;
  }

  // ---------- 5. RENDER KATEGORI DI BERANDA ----------

  function renderCategories() {
    categoryGrid.innerHTML = "";
    categories.forEach(function (cat) {
      const card = document.createElement("div");
      card.className = "category-card";
      card.setAttribute("role", "button");
      card.setAttribute("tabindex", "0");
      card.setAttribute("aria-label", "Buka kategori " + cat.nama);

      const icon = document.createElement("span");
      icon.className = "category-icon";
      icon.textContent = cat.ikon;

      const name = document.createElement("span");
      name.className = "category-name";
      name.textContent = cat.nama;

      const badge = document.createElement("span");
      badge.className = "category-badge";
      badge.textContent = "Lihat Produk & Promo →";

      card.appendChild(icon);
      card.appendChild(name);
      card.appendChild(badge);

      card.addEventListener("click", function () {
        openCategory(cat.id, cat.nama);
      });
      card.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openCategory(cat.id, cat.nama);
        }
      });

      categoryGrid.appendChild(card);
    });
  }

  // ---------- 6. PEMBUATAN KARTU PRODUK DENGAN SENTUHAN DISKON ----------

  function createProductCard(produk) {
    const card = document.createElement("div");
    card.className = "product-card";

    // Bungkus foto + badge diskon
    const imgWrap = document.createElement("div");
    imgWrap.className = "product-img-wrap";

    const img = document.createElement("img");
    img.className = "product-image";
    img.src = produk.gambar || PLACEHOLDER_IMG;
    img.alt = produk.nama;
    img.loading = "lazy";
    img.addEventListener("error", function () {
      img.src = PLACEHOLDER_IMG;
    });

    imgWrap.appendChild(img);

    // Tambahkan label diskon jika ada
    if (produk.diskon) {
      const discBadge = document.createElement("span");
      discBadge.className = "product-discount-badge";
      discBadge.textContent = "Diskon " + produk.diskon;
      imgWrap.appendChild(discBadge);
    }

    // Bagian isi kartu
    const body = document.createElement("div");
    body.className = "product-body";

    const nama = document.createElement("h3");
    nama.className = "product-name";
    nama.textContent = produk.nama;

    const desc = document.createElement("p");
    desc.className = "product-desc";
    desc.textContent = produk.deskripsi;

    // Baris harga: harga promo + harga coret
    const priceRow = document.createElement("div");
    priceRow.className = "product-price-row";

    const harga = document.createElement("span");
    harga.className = "product-price";
    harga.textContent = produk.harga;

    priceRow.appendChild(harga);

    if (produk.hargaCoret) {
      const coret = document.createElement("span");
      coret.className = "product-price-coret";
      coret.textContent = produk.hargaCoret;
      priceRow.appendChild(coret);
    }

    const btn = document.createElement("button");
    btn.className = "product-btn";
    btn.type = "button";
    btn.textContent = "Lihat Produk";
    btn.addEventListener("click", function () {
      openAffiliateLink(produk);
    });

    body.appendChild(nama);
    body.appendChild(desc);
    body.appendChild(priceRow);
    body.appendChild(btn);

    card.appendChild(imgWrap);
    card.appendChild(body);

    return card;
  }

  // ---------- 7. RENDER PRODUK DI HALAMAN KATEGORI ----------

  function renderProducts(list) {
    productGrid.innerHTML = "";

    if (list.length === 0) {
      emptyState.classList.remove("hidden");
      if (categoryCount) categoryCount.textContent = "0 produk ditemukan";
      return;
    }
    emptyState.classList.add("hidden");

    if (categoryCount) {
      categoryCount.textContent = "Menampilkan " + list.length + " produk pilihan";
    }

    list.forEach(function (produk) {
      productGrid.appendChild(createProductCard(produk));
    });
  }

  // ---------- 8. FILTER & PENCARIAN ----------

  function getFilteredProducts() {
    const keyword = currentKeyword.trim().toLowerCase();

    return products.filter(function (produk) {
      const cocokKategori =
        currentCategory === "semua" || produk.kategori === currentCategory;

      if (!cocokKategori) return false;
      if (!keyword) return true;

      const catNama = getCategoryName(produk.kategori).toLowerCase();

      return (
        produk.nama.toLowerCase().includes(keyword) ||
        produk.deskripsi.toLowerCase().includes(keyword) ||
        catNama.includes(keyword)
      );
    });
  }

  function getCategoryName(id) {
    if (id === "semua") return "Semua Produk";
    const found = categories.find(function (c) {
      return c.id === id;
    });
    return found ? found.nama : "Katalog Produk";
  }

  function refreshProductView() {
    renderProducts(getFilteredProducts());
  }

  // ---------- 9. NAVIGASI HALAMAN (BERANDA & KATEGORI) ----------

  function openCategory(categoryId, categoryName) {
    currentCategory = categoryId;
    currentKeyword = searchInput ? searchInput.value : "";

    categoryTitle.textContent = categoryName || getCategoryName(categoryId);
    filterSelect.value = categoryId;
    searchInputCategory.value = currentKeyword;

    // Sembunyikan beranda, buka halaman kategori produk
    homeView.classList.add("hidden");
    categoryView.classList.remove("hidden");

    refreshProductView();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goHome() {
    currentCategory = "semua";
    currentKeyword = "";
    if (searchInput) searchInput.value = "";
    if (searchInputCategory) searchInputCategory.value = "";

    // Sembunyikan halaman kategori, kembalikan beranda
    categoryView.classList.add("hidden");
    homeView.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ---------- 10. EVENT LISTENERS ----------

  backBtn.addEventListener("click", goHome);
  brandLogo.addEventListener("click", goHome);
  brandLogo.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      goHome();
    }
  });

  // Pencarian dari beranda langsung membuka halaman kategori
  searchInput.addEventListener("input", function () {
    const keyword = searchInput.value;
    if (keyword.trim().length > 0) {
      openCategory("semua", "Hasil Pencarian");
      searchInputCategory.value = keyword;
      currentKeyword = keyword;
      refreshProductView();
    }
  });

  // Pencarian real-time di halaman kategori
  searchInputCategory.addEventListener("input", function () {
    currentKeyword = searchInputCategory.value;
    refreshProductView();
  });

  // Filter dropdown kategori
  filterSelect.addEventListener("change", function () {
    currentCategory = filterSelect.value;
    categoryTitle.textContent = getCategoryName(currentCategory);
    refreshProductView();
  });

  // ---------- 11. REDIRECT AFFILIATE SHOPEE ----------

  function openAffiliateLink(produk) {
    if (!produk || !produk.linkAffiliate) {
      alert("Tautan produk belum tersedia.");
      return;
    }
    try {
      const url = new URL(produk.linkAffiliate);
      if (url.protocol !== "http:" && url.protocol !== "https:") {
        alert("Tautan produk tidak valid.");
        return;
      }
      window.open(url.href, "_blank", "noopener,noreferrer");
    } catch (error) {
      alert("Tautan produk tidak valid.");
    }
  }

  // ---------- 12. INISIALISASI HALAMAN AWAL ----------

  renderCategories();
});
