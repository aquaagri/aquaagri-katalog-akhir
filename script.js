/* ==========================================================
   aquaagri.id — Logika Katalog & Navigasi Terpercaya
   Kategori, Diskon Produk, Carousel Otomatis & Mode Malam HP
   ========================================================== */

// ---------- 1. DATA PRODUK DENGAN SENTUHAN DISKON ----------
// (Format produk tidak diubah sesuai instruksi)

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
    gambar: "assets/products/kerupuk-kulit-ikan-patin.jpg",
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
   {
    id: 12,
    nama: "Siomay Ikan Tenggiri Frozen 10 Pcs Jumbo",
    harga: "Rp59.000",
    hargaCoret: "Rp70.000",
    diskon: "15%",
    gambar: "assets/products/Siomay-Ikan-Tenggiri-Frozen.jpg",
    deskripsi: "Siomay ikan tenggiri asli ukuran jumbo isi 10 pcs dengan tekstur kenyal lembut dan rasa ikan yang gurih terasa. Lengkap dengan bumbu kacang lezat, praktis tinggal dikukus.",
    kategori: "produk-olahan-ikan",
    linkAffiliate: "https://s.shopee.co.id/70KdySvDX6"
  },
   {
    id: 13,
    nama: "Otak Otak Ikan Tenggiri Fresh Frozen Isi 50pcs",
    harga: "Rp18.500",
    hargaCoret: "Rp30.000",
    diskon: "53%",
    gambar: "assets/products/Otak-Otak-Ikan-Tenggiri-Fresh-Frozen.jpg",
    deskripsi: "Otak-otak ikan tenggiri segar beku kemasan hemat isi 50 pcs. Gurih, lembut, bebas bahan pengawet, cocok digoreng maupun dikukus untuk camilan keluarga.",
    kategori: "produk-olahan-ikan",
    linkAffiliate: "https://s.shopee.co.id/5VVqC4JCA4"
  },
  {
    id: 14,
    nama: "Baby Fish Crispy Original Gurih Daun Jeruk 100gr",
    harga: "Rp17.000",
    hargaCoret: "Rp35.000",
    diskon: "51%",
    gambar: "assets/products/Baby-Fish-Crispy-Original.jpg",
    deskripsi: "Camilan bayi ikan air tawar goreng krispi dengan taburan bumbu original gurih dan aroma daun jeruk segar. Renyah tahan lama dan kaya kalsium.",
    kategori: "produk-olahan-ikan",
    linkAffiliate: "https://s.shopee.co.id/9zyFZ82pEA"
  },
  {
    id: 15,
    nama: "Edo Chikuwa Olahan Ikan 250gr",
    harga: "Rp29.000",
    hargaCoret: "Rp45.000",
    diskon: "35%",
    gambar: "assets/products/Edo-Chikuwa-Olahan-Ikan.jpg",
    deskripsi: "Olahan daging ikan putih premium berbentuk tabung khas Jepang (Chikuwa) 250gr. Tekstur kenyal gurih, cocok untuk isian sup tom yum, suki, bakso kuah, atau dibakar.",
    kategori: "produk-olahan-ikan",
    linkAffiliate: "https://s.shopee.co.id/113QqwF09o"
  },
  {
    id: 16,
    nama: "Dimsum Frozen Isi 32 500gr",
    harga: "Rp17.000",
    hargaCoret: "Rp30.000",
    diskon: "43%",
    gambar: "assets/products/Dimsum-Frozen-Isi-32-500gr.jpg",
    deskripsi: "Dimsum olahan ikan dan ayam pilihan isi 32 pcs (500gr) dengan kulit lembut dan isian padat gurih. Praktis dikukus kapan saja untuk hidangan keluarga.",
    kategori: "produk-olahan-ikan",
    linkAffiliate: "https://s.shopee.co.id/2LYoRfy7M5"
  },
  {
    id: 17,
    nama: "Basreng KATAJI Mentah 10Kg",
    harga: "Rp177.000",
    hargaCoret: "Rp200.000",
    diskon: "11%",
    gambar: "assets/products/Basreng-KATAJI-Mentah-10Kg.jpg",
    deskripsi: "Bakso goreng (basreng) ikan mentah kualitas super kemasan usaha 10Kg. Irisan rapi, rasa ikan gurih terasa, renyah mekar saat digoreng dan tidak keras.",
    kategori: "produk-olahan-ikan",
    linkAffiliate: "https://s.shopee.co.id/30oVFLPZpQ"
  },
  {
    id: 18,
    nama: "Basreng Lontong Mentah Juragan Basreng Ikan",
    harga: "Rp25.000",
    hargaCoret: "Rp40.000",
    diskon: "38%",
    gambar: "assets/products/Basreng-Lontong-Mentah-Juragan-Basreng-Ikan.jpg",
    deskripsi: "Adonan basreng ikan bentuk lontong mentah siap iris sesuai selera. Terbuat dari daging ikan pilihan dengan bumbu rempah gurih khas Bandung.",
    kategori: "produk-olahan-ikan",
    linkAffiliate: "https://s.shopee.co.id/5fpGQQVfpS"
  },
  {
    id: 19,
    nama: "Scallop Ikan Isi 40 Butir",
    harga: "Rp15.000",
    hargaCoret: "Rp30.000",
    diskon: "50%",
    gambar: "assets/products/Scallop-Ikan-Isi-40-Butir.jpg",
    deskripsi: "Olahan daging ikan bentuk koin scallop isi 40 butir. Tekstur lembut gurih, sangat disukai anak-anak untuk lauk bekal sekolah atau camilan goreng.",
    kategori: "produk-olahan-ikan",
    linkAffiliate: "https://s.shopee.co.id/3g4C3L31xN"
  },
  {
    id: 20,
    nama: "Pempek Lala 26 Ilir Palembang 40pc",
    harga: "Rp115.000",
    hargaCoret: "Rp150.000",
    diskon: "23%",
    gambar: "assets/products/PEMPEK-Lala-26-Ilir-Palembang-40pc.jpg",
    deskripsi: "Pempek Lala 26 ilir dikirim dalam keadaan beku atau frozen,Terbuat dari ikan segar pilihan tanpa bahan pengawet",
    kategori: "produk-olahan-ikan",
    linkAffiliate: "https://s.shopee.co.id/1BMr5IxrLq"
  },
  {
    id: 21,
    nama: "Pempek Frozen Khas Palembang Paket Hemat 10 Pcs",
    harga: "Rp32.000",
    hargaCoret: "Rp47.000",
    diskon: "32%",
    gambar: "assets/products/Pempek-Frozen-Khas-Palembang-Paket-10-pcs.jpg",
    deskripsi: "Pempek frozen khas Palembang paket hemat 10 pcs.Terbuat dari ikan segar pilihan tanpa bahan pengawet.",
    kategori: "produk-olahan-ikan",
    linkAffiliate: "https://s.shopee.co.id/50ZZejawl9"
  },
  {
    id: 22,
    nama: "Cemilan Baby Crab Crispy Khas Lamongan",
    harga: "Rp30.000",
    hargaCoret: "Rp45.000",
    diskon: "33%",
    gambar: "assets/products/Cemilan-Baby-Crab-Crispy-Khas-Lamongan.jpg",
    deskripsi: "Camilan kepiting bayi yang renyah dan gurih, rasanya enak, cocok sebagai camilan kapan saja.",
    kategori: "produk-olahan-ikan",
    linkAffiliate: "https://s.shopee.co.id/4B0SfUWIWz"
  },
{
    id: 23,
    nama: "Baby Crab Crispy 75gr",
    harga: "Rp14.000",
    hargaCoret: "Rp30.000",
    diskon: "53%",
    gambar: "assets/products/Baby-Crab-Crispy-75gr.jpg",
    deskripsi: "Camilan seafood renyah berbahan dasar baby rajungan utuh, digoreng krispi dan dibumbui dengan rasa yang menggoda!",
    kategori: "produk-olahan-ikan",
    linkAffiliate: "https://s.shopee.co.id/BUJvFWquL"
  },
  {
    id: 24,
    nama: " Sambal Teri",
    harga: "Rp32.000",
    hargaCoret: "Rp40.000",
    diskon: "20%",
    gambar: "assets/products/Sambal-Teri.jpg",
    deskripsi: "Sambal teri yang lezat dan pedas, cocok sebagai pelengkap nasi atau camilan.",
    kategori: "produk-olahan-ikan",
    linkAffiliate: "https://s.shopee.co.id/AAHfqAQLNI"
  },
  {
    id: 25,
    nama: "Sambal Cumi Pedas Gurih",
    harga: "Rp27.000",
    hargaCoret: "Rp35.000",
    diskon: "23%",
    gambar: "assets/products/Sambal-Cumi-Pedas-Gurih.jpg",
    deskripsi: "Sambal cumi pedas gurih yang lezat, cocok sebagai pelengkap nasi atau camilan.",
    kategori: "produk-olahan-ikan",
    linkAffiliate: "https://s.shopee.co.id/6fhnfxX7RM"
  },
   {
    id: 26,
    nama: "Ikan Pindang Bandeng Presto 200gr",
    harga: "Rp20.000",
    hargaCoret: "Rp25.000",
    diskon: "20%",
    gambar: "assets/products/Ikan-Pindang-Bandeng.jpg",
    deskripsi: "Bandeng presto pindang duri lunak 200gr yang diolah higienis dengan bumbu rempah tradisional meresap hingga ke tulang. Praktis tinggal digoreng sebentar.",
    kategori: "produk-olahan-ikan",
    linkAffiliate: "https://s.shopee.co.id/8AWfo4h1jw"
  },



  // --- Kategori: Ikan & Seafood Segar ---
  {
    id: 1,
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
    id: 2,
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
    id: 3,
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
    id: 4,
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
    id: 5,
    nama: "Steak Tuna Merah 500gr (Tanpa Tulang)",
    harga: "Rp55.000",
    hargaCoret: "Rp68.000",
    diskon: "19%",
    gambar: "assets/products/steak-tuna-merah.jpg",
    deskripsi: "Potongan steak daging ikan tuna merah murni tanpa duri dan kulit. Tekstur lembut bernutrisi tinggi kaya asam lemak Omega-3 untuk kesehatan jantung.",
    kategori: "ikan-seafood-segar",
    linkAffiliate: "https://s.shopee.co.id/4B0KYIPg9P"
  },
  {
    id: 6,
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
    id: 7,
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
    id: 8,
    nama: "Ikan Salmon Trout Fillet Segar 200gr",
    harga: "Rp58.000",
    hargaCoret: "Rp72.000",
    diskon: "19%",
    gambar: "assets/products/Ikan-Salmon.jpg",
    deskripsi: "Fillet salmon trout segar dengan guratan marbling cantik dan warna oranye alami. Dikemas higienis vakum kedap udara, sangat cocok untuk pan-sear, sushi, dan MPASI.",
    kategori: "ikan-seafood-segar",
    linkAffiliate: "https://s.shopee.co.id/AUuO71vp7Q"
  },
   {
    id: 9,
    nama: "Lobster Laut Segar 325gr",
    harga: "Rp177.000",
    hargaCoret: "Rp200.000",
    diskon: "11%",
    gambar: "assets/products/Lobster-Laut.jpg",
    deskripsi: "Lobster laut segar pilihan ukuran 325gr dengan daging padat, manis alami, dan tekstur lembut. Dibekukan cepat untuk menjaga mutu kesegaran standar restoran seafood.",
    kategori: "ikan-seafood-segar",
    linkAffiliate: "https://s.shopee.co.id/7ptoCEEyoF"
  },
   {
    id: 10,
    nama: "LOBSTER TAWAR COOK 1KG 20-40 PCS",
    harga: "Rp62.000",
    hargaCoret: "Rp80.000",
    diskon: "22%",
    gambar: "assets/products/Lobster-Tawar.jpg",
    deskripsi: "Lobster air tawar segar yang sudah direbus higienis (cooked frozen) kemasan 1kg isi 20-40 ekor. Daging manis gurih, praktis tinggal dimasak saus padang atau mentega.",
    kategori: "ikan-seafood-segar",
    linkAffiliate: "https://s.shopee.co.id/8fSvBzo9Jd"
  },
   {
    id: 11,
    nama: "Udang Kupas IQF Premium 250gr",
    harga: "Rp57.000",
    hargaCoret: "Rp72.000",
    diskon: "21%",
    gambar: "assets/products/Udang-Kupas.jpg",
    deskripsi: "Udang vaname kupas bersih tanpa kepala dan kulit dengan metode pembekuan IQF 250gr. Praktis langsung masak untuk tumisan, capcay, tempura, maupun MPASI.",
    kategori: "ikan-seafood-segar",
    linkAffiliate: "https://s.shopee.co.id/9APBll7Ud9"
  },
   {
    id: 12,
    nama: "Cumi Besar Segar 1kg",
    harga: "Rp29.000",
    hargaCoret: "Rp50.000",
    diskon: "42%",
    gambar: "assets/products/Cumi-Besar.jpg",
    deskripsi: "Cumi-cumi laut ukuran besar segar 1kg dengan daging tebal, kenyal empuk, dan tidak amis. Cocok untuk cumi bakar, goreng tepung calamari, atau dimasak hitam.",
    kategori: "ikan-seafood-segar",
    linkAffiliate: "https://s.shopee.co.id/3g4FFYb8XA"
  },
  {
    id: 13,
    nama: "Kerang Dara Frozen Fresh 1kg",
    harga: "Rp45.000",
    hargaCoret: "Rp60.000",
    diskon: "25%",
    gambar: "assets/products/Kerang-Dara.jpg",
    deskripsi: "Kerang dara laut segar pilihan 1kg yang telah dibersihkan dan dibekukan cepat. Daging tebal manis gurih, lezat direbus maupun dimasak saus tiram dan asam manis.",
    kategori: "ikan-seafood-segar",
    linkAffiliate: "https://s.shopee.co.id/2VsHrq9UwA"
  },
  {
    id: 14,
    nama: " Kerang Tahu Premium Fresh 500gr",
    harga: "Rp17.000",
    hargaCoret: "Rp25.000",
    diskon: "32%",
    gambar: "assets/products/Kerang-Tahu.jpg",
    deskripsi: "Kerang tahu segar 500gr bercangkang putih bersih dengan tekstur daging kenyal lembut. Sangat lezat untuk sup bening, tumis tauco, atau rebusan jahe.",
    kategori: "ikan-seafood-segar",
    linkAffiliate: "https://s.shopee.co.id/70KhEUyxsA"
  },
   {
    id: 15,
    nama: "Kerang Remis haremis 1kg",
    harga: "Rp45.000",
    hargaCoret: "Rp60.000",
    diskon: "25%",
    gambar: "assets/products/Kerang-Remis.jpg",
    deskripsi: "Kerang remis (haremis) segar pilihan 1kg kaya protein dan mineral. Cocok diolah menjadi sup kuah kaldu gurih atau tumisan pedas.",
    kategori: "ikan-seafood-segar",
    linkAffiliate: "https://s.shopee.co.id/1AwuK7tqA"
  },
   {
    id: 16,
    nama: "Kerang hijau segar 1kg",
    harga: "Rp12.000",
    hargaCoret: "Rp17.000",
    diskon: "29%",
    gambar: "assets/products/Kerang-Hijau.jpg",
    deskripsi: "Kerang hijau laut segar 1kg ukuran besar dan berisi padat. Pilihan favorit untuk olahan kerang saus padang, bumbu kuning, atau rebusan serai.",
    kategori: "ikan-seafood-segar",
    linkAffiliate: "https://s.shopee.co.id/5VVtScExyD"
  },
    {
    id: 17,
    nama: "Ikan Dory Fillet Fresh 1kg",
    harga: "Rp48.000",
    hargaCoret: "Rp60.000",
    diskon: "20%",
    gambar: "assets/products/Ikan-Dory.jpg",
    deskripsi: "Fillet daging ikan dori bersih tanpa tulang dan duri kemasan 1kg. Tekstur daging putih sangat lembut, cocok untuk fish and chips, crispy fillet, maupun tim ikan.",
    kategori: "ikan-seafood-segar",
    linkAffiliate: "https://s.shopee.co.id/AAHkAyyvAV"
  },
    {
    id: 18,
    nama: "Rahang Tuna Beku Segar |200 -1000 Gram/Pcs",
    harga: "Rp20.000",
    hargaCoret: "Rp28.000",
    diskon: "29%",
    gambar: "assets/products/Rahang-Tuna.jpg",
    deskripsi: "Potongan rahang ikan tuna segar berdaging tebal dan juicy kaya kolagen serta Omega-3. Bagian paling favorit untuk menu rahang tuna bakar khas Manado.",
    kategori: "ikan-seafood-segar",
    linkAffiliate: "https://s.shopee.co.id/8fSwOYLmYP"
  },
    {
    id: 19,
    nama: "Ikan Baby Tuna Frozen Fresh 1kg",
    harga: "Rp31.000",
    hargaCoret: "Rp40.000",
    diskon: "22%",
    gambar: "assets/products/Ikan-Baby-Tuna.jpg",
    deskripsi: "Ikan baby tuna segar utuh 1kg hasil tangkapan laut dengan daging padat bernutrisi tinggi. Cocok untuk balado, gulai ikan, pindang, maupun bakar bumbu kecap.",
    kategori: "ikan-seafood-segar",
    linkAffiliate: "https://s.shopee.co.id/8fSwPOHgjS"
  },
    {
    id: 20,
    nama: "Ikan Gurame Frozen Fresh 1kg Sudah Dibersihkan",
    harga: "Rp68.000",
    hargaCoret: "Rp80.000",
    diskon: "15%",
    gambar: "assets/products/Ikan-Gurame.jpg",
    deskripsi: "Ikan gurame segar 1kg yang sudah dibersihkan sisik dan insangnya, siap langsung diolah. Daging tebal lembut tanpa bau tanah, pas untuk gurame bakar atau asam manis.",
    kategori: "ikan-seafood-segar",
    linkAffiliate: "https://s.shopee.co.id/50Ze3C9wFQ"
  },
    {
    id: 21,
    nama: "Ikan Barakuda Fresh 1kg",
    harga: "Rp31.000",
    hargaCoret: "Rp40.000",
    diskon: "22%",
    gambar: "assets/products/Ikan-Barakuda.jpg",
    deskripsi: "Ikan barakuda laut segar 1kg dengan karakter daging putih padat dan gurih. Sangat cocok untuk bahan baku pempek, otak-otak, maupun ikan bakar.",
    kategori: "ikan-seafood-segar",
    linkAffiliate: "https://s.shopee.co.id/3B7zs80NH6"
  },
    {
    id: 22,
    nama: "Ikan Bawal Air Tawar Segar 500gr",
    harga: "Rp25.000",
    hargaCoret: "Rp40.000",
    diskon: "37%",
    gambar: "assets/products/Ikan-Bawal.jpg",
    deskripsi: "Ikan bawal air tawar segar 500gr berdaging tebal dan gurih. Nikmat digoreng kering maupun dibakar dengan olesan bumbu madu atau kecap pedas.",
    kategori: "ikan-seafood-segar",
    linkAffiliate: "https://s.shopee.co.id/4LJxGRmKkS"
  },
    {
    id: 23,
    nama: "Baby Octopus Gurita Segar 1kg",
    harga: "Rp45.000",
    hargaCoret: "Rp55.000",
    diskon: "20%",
    gambar: "assets/products/Baby-Octopus.jpg",
    deskripsi: "Baby octopus (gurita muda) segar 1kg yang telah dibersihkan higienis. Tekstur kenyal empuk, cocok untuk hidangan takoyaki, tumis pedas Korea, atau bakaran.",
    kategori: "ikan-seafood-segar",
    linkAffiliate: "https://s.shopee.co.id/9fLTcWlYrQ"
  },
    {
    id: 24,
    nama: "Ikan Bawal Putih Bawal Laut segar 500gr",
    harga: "Rp35.000",
    hargaCoret: "Rp47.000",
    diskon: "25%",
    gambar: "assets/products/Ikan-Bawal-Putih.jpg",
    deskripsi: "Ikan bawal putih laut segar premium 500gr dengan tekstur daging super lembut dan rasa manis gurih alami. Terbaik untuk menu bawal kukus hongkong (steam) atau goreng.",
    kategori: "ikan-seafood-segar",
    linkAffiliate: "https://s.shopee.co.id/2BFShSOat8"
  },
    {
    id: 25,
    nama: "Ikan Patin Segar 1kg",
    harga: "Rp44.000",
    hargaCoret: "Rp50.000",
    diskon: "12%",
    gambar: "assets/products/Ikan-Patin.jpg",
    deskripsi: "Ikan patin segar pilihan 1kg dengan daging lembut gurih kaya lemak sehat. Sangat lezat diolah menjadi pindang patin, sup ikan, atau patin bakar bambu.",
    kategori: "ikan-seafood-segar",
    linkAffiliate: "https://s.shopee.co.id/AKbAS1xQPH"
  },
    {
    id: 26,
    nama: "Ikan Kuwe Segar 300gr",
    harga: "Rp65.000",
    hargaCoret: "Rp77.000",
    diskon: "15%",
    gambar: "assets/products/Ikan-Kuwe.jpg",
    deskripsi: "Ikan kuwe laut segar 300gr favorit pecinta kuliner bahari karena dagingnya yang padat, gurih, dan tidak mudah hancur saat dibakar di atas bara.",
    kategori: "ikan-seafood-segar",
    linkAffiliate: "https://s.shopee.co.id/60SBGzffo5"
  },
    {
    id: 27,
    nama: "Ikan Layang 1kg",
    harga: "Rp16.000",
    hargaCoret: "Rp30.000",
    diskon: "47%",
    gambar: "assets/products/Ikan-Layang.jpg",
    deskripsi: "Ikan layang laut segar 1kg ekonomis dan kaya protein untuk lauk harian keluarga. Lezat digoreng garing, dimasak pindang, maupun sambal balado.",
    kategori: "ikan-seafood-segar",
    linkAffiliate: "https://s.shopee.co.id/4qGDuPFwBW"
  },
    {
    id: 28,
    nama: "Kerang Tiram/Oyster laut fresh",
    harga: "Rp21.000",
    hargaCoret: "Rp32.000",
    diskon: "34%",
    gambar: "assets/products/Kerang-Tiram.jpg",
    deskripsi: "Kerang tiram (oyster) laut segar pilihan dengan cita rasa khas laut yang kaya nutrisi seng (zinc) dan protein. Cocok untuk tiram bakar keju atau tumis bawang putih.",
    kategori: "ikan-seafood-segar",
    linkAffiliate: "https://s.shopee.co.id/5At4JFTV26"
  },
    {
    id: 29,
    nama: "Ikan Ayam Ayam Premium Segar 750gr",
    harga: "Rp37.000",
    hargaCoret: "Rp45.000",
    diskon: "18%",
    gambar: "assets/products/Ikan-Ayam.jpg",
    deskripsi: "Ikan ayam-ayam (leatherjacket fish) laut segar 750gr dengan tekstur daging putih tebal mirip daging ayam yang sangat lezat saat dibakar.",
    kategori: "ikan-seafood-segar",
    linkAffiliate: "https://s.shopee.co.id/8fSwSUFGkr"
  },
    {
    id: 30,
    nama: "Ikan Baronang Segar 100gr",
    harga: "Rp42.000",
    hargaCoret: "Rp55.000",
    diskon: "24%",
    gambar: "assets/products/Ikan-Baronang.jpg",
    deskripsi: "Ikan baronang laut segar pilihan dengan daging putih manis dan gurih. Sangat populer untuk menu baronang bakar rica atau sambal dabu-dabu.",
    kategori: "ikan-seafood-segar",
    linkAffiliate: "https://s.shopee.co.id/1LgLifLLvz"
  },

  // --- Kategori: Pancing & Umpan ---
  {
    id: 1,
    nama: "Umpan kucur paket 500 gram + free STIK",
    harga: "Rp30.000",
    hargaCoret: "Rp50.000",
    diskon: "40%",
    gambar: "assets/products/umpan-kucur.jpg",
    deskripsi: "Umpan kucur fermentasi khas sungai kemasan 500gr lengkap gratis stik pemasang. Aroma tajam teruji ampuh memikat ikan baung, patin sungai, dan tapah.",
    kategori: "pancing-umpan",
    linkAffiliate: "https://s.shopee.co.id/AKbCKkvGOG"
  },
  {
    id: 2,
    nama: "Reel Pancing VX1000-7000",
    harga: "Rp158.000",
    hargaCoret: "Rp170.000",
    diskon: "7%",
    gambar: "assets/products/reel-pancing.jpg",
    deskripsi: "Reel pancing spinning seri VX1000-7000 dengan putaran halus, bodi kokoh tahan korosi, dan tarikan drag stabil untuk mancing kolam maupun perairan liar.",
    kategori: "pancing-umpan",
    linkAffiliate: "https://s.shopee.co.id/1gJE18BiJL"
  },
   {
    id: 3,
    nama: "Kail Hook Pancing Chinu 1053 Hitam Black Nickel 1",
    harga: "Rp11.000",
    hargaCoret: "Rp20.000",
    diskon: "45%",
    gambar: "assets/products/kail-hook.jpg",
    deskripsi: "Mata kail pancing Chinu 1053 bahan baja karbon berlapis black nickel yang super tajam, kuat, dan tahan karat untuk berbagai ukuran ikan target.",
    kategori: "pancing-umpan",
    linkAffiliate: "https://s.shopee.co.id/60SDBOVOQ3"
  },
   {
    id: 4,
    nama: "Essen PERTAMAX TURBO + Murni",
    harga: "Rp193.000",
    hargaCoret: "Rp210.000",
    diskon: "8%",
    gambar: "assets/products/essen-pertamax.jpg",
    deskripsi: "Essen pancing konsentrat murni beraroma kuat dan tahan lama di dalam air. Dirancang untuk mempercepat sambaran ikan di kolam harian maupun galatama.",
    kategori: "pancing-umpan",
    linkAffiliate: "https://s.shopee.co.id/4qGFnQo9sX"
  },
   {
    id: 5,
    nama: "Siraman Serangga (SIRANGGA)",
    harga: "Rp67.000",
    hargaCoret: "Rp80.000",
    diskon: "16%",
    gambar: "assets/products/siraman-serangga.jpg",
    deskripsi: "Cairan atraktan siraman ekstrak serangga alami untuk campuran umpan pancing. Meningkatkan nafsu makan ikan target secara cepat di air keruh maupun jernih.",
    kategori: "pancing-umpan",
    linkAffiliate: "https://s.shopee.co.id/4VdPOvGq5n"
  },
   {
    id: 6,
    nama: "Joran Tegek kaku limited & super leader",
    harga: "Rp140.000",
    hargaCoret: "Rp170.000",
    diskon: "18%",
    gambar: "assets/products/joran-tegek.jpg",
    deskripsi: "Joran pancing tegek ruas berbahan serat karbon kaku, ringan di tangan, dan berdaya lentur tangguh untuk menaklukkan tarikan ikan nila, mas, dan baronang.",
    kategori: "pancing-umpan",
    linkAffiliate: "https://s.shopee.co.id/1VznpXLrl3"
  },
   {
    id: 7,
    nama: "Paket Timah Pancing Komplit Lengkap 130pcs",
    harga: "Rp41.000",
    hargaCoret: "Rp50.000",
    diskon: "22%",
    gambar: "assets/products/paket-timah.jpg",
    deskripsi: "Satu kotak lengkap berisi 130 pcs pemberat timah pancing berbagai ukuran. Praktis dibawa memancing untuk menyesuaikan arus dan kedalaman air.",
    kategori: "pancing-umpan",
    linkAffiliate: "https://s.shopee.co.id/5fpMnJCFbV"
  },
  {
    id: 8,
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
    id: 9,
    nama: " Biang Varian Aroma BUAH 10ml",
    harga: "Rp17.000",
    hargaCoret: "Rp18.000",
    diskon: "1%",
    gambar: "assets/products/AGA-Fishing.jpg",
    deskripsi: "AGA Fishing Essen Biang Varian Aroma BUAH BUAHAN merupakan cairan konsentrat aroma untuk campuran racikan umpan pancing. Produk ini membantu memperkuat karakter aroma umpan dan dapat disesuaikan dengan jenis racikan, kondisi air, target ikan, serta lokasi memancing.",
    kategori: "pancing-umpan",
    linkAffiliate: "https://s.shopee.co.id/AUuT1SwZlV"
  },
  {
    id: 10,
    nama: "Essen Oplosan Super Ikan NILA 30ml",
    harga: "Rp120.000",
    hargaCoret: "Rp145.000",
    diskon: "17%",
    gambar: "assets/products/aga-essen-uper-ikan-nila.jpg",
    deskripsi: "Essen konsentrat premium dengan aroma khas kuat yang dirancang khusus untuk memikat ikan nila babon di berbagai kondisi air kolam maupun waduk liar.",
    kategori: "pancing-umpan",
    linkAffiliate: "https://s.shopee.co.id/5LCKobxOA1"
  },
  {
    id: 11,
    nama: "257 PCS Umpan Pancing Ikan Set",
    harga: "Rp168.000",
    hargaCoret: "Rp200.000",
    diskon: "17%",
    gambar: "assets/products/Umpan-Pancing-Ikan-Set.jpg",
    deskripsi: "Kotak box ini didesain khusus untuk meletakkan berbagai macam kail yang Anda ingin bawa untuk memancing.",
    kategori: "pancing-umpan",
    linkAffiliate: "https://s.shopee.co.id/9KiVdtyA5p"
  },
  {
    id: 12,
    nama: "AQUASEA Tali Pancing Germany200m",
    harga: "Rp21.000",
    hargaCoret: "Rp50.000",
    diskon: "58%",
    gambar: "assets/products/AQUASEA-Tali-Pancing.jpg",
    deskripsi: "Senar pancing monofilamen teknologi Jerman sepanjang 200 meter yang kuat, lembut, tahan gesekan, dan mudah tenggelam di dalam air.",
    kategori: "pancing-umpan",
    linkAffiliate: "https://s.shopee.co.id/3g48uACWxh"
  },
   {
    id: 13,
    nama: "Tali Pancing Sensor Bright 200m",
    harga: "Rp58.000",
    hargaCoret: "Rp66.000",
    diskon: "12%",
    gambar: "assets/products/Tali-Pancing-Sensor-Bright.jpg",
    deskripsi: "Senar pancing Sensor Bright 200m dengan visibilitas tinggi dan kekuatan simpul ekstra, memudahkan pemancing mendeteksi pergerakan umpan dengan akurat.",
    kategori: "pancing-umpan",
    linkAffiliate: "https://s.shopee.co.id/5fpMnk4dz2"
  },
   {
    id: 14,
    nama: "JELLYFISH UMPAN PENGGANTI LUMUT",
    harga: "Rp25.000",
    hargaCoret: "Rp37.000",
    diskon: "32%",
    gambar: "assets/products/JELLYFISH-Umpan-Pengganti-Lumut.jpg",
    deskripsi: "Umpan praktis pengganti lumut bertekstur serat lembut di dalam air. Sangat efektif untuk memancing ikan nila dan mujair di waduk, sungai, maupun kolam.",
    kategori: "pancing-umpan",
    linkAffiliate: "https://s.shopee.co.id/7AeAaa0h8i"
  },
  {
    id: 15,
    nama: "Siraman Cacing (SIRACING )",
    harga: "Rp62.000",
    hargaCoret: "Rp76.000",
    diskon: "18%",
    gambar: "assets/products/Siraman-Cacing.jpg",
    deskripsi: "Cairan atraktan siraman khusus media umpan cacing dan pelet. Memperkuat jejak aroma amis alami agar ikan target lebih cepat berkumpul di titik lapak.",
    kategori: "pancing-umpan",
    linkAffiliate: "https://s.shopee.co.id/gQgsJszeX"
  },
  {
    id: 16,
    nama: "Umpan pancing Olahan SAWIT GURIH WANGI",
    harga: "Rp25.000",
    hargaCoret: "Rp37.000",
    diskon: "32%",
    gambar: "assets/products/Umpan-Pancing-Olahan-SAWIT-GURIH-WANGI.jpg",
    deskripsi: "Umpan pancing olahan sari buah kelapa sawit matang dengan perpaduan aroma gurih wangi alami yang sangat disukai ikan mas, patin, bawal, dan nilem.",
    kategori: "pancing-umpan",
    linkAffiliate: "https://s.shopee.co.id/8V9YCukvhb"
  },
  {
    id: 17,
    nama: "Tas Pancing Joran Anti Air Waterproof",
    harga: "Rp95.000",
    hargaCoret: "Rp120.000",
    diskon: "21%",
    gambar: "assets/products/Tas-Pancing-Joran-Anti-Air-Waterproof.jpg",
    deskripsi: "Tas joran pancing berbahan kanvas waterproof tebal anti air dengan jahitan kuat. Melindungi joran, reel, dan kotak perkakas pancing agar rapi dan aman dibawa.",
    kategori: "pancing-umpan",
    linkAffiliate: "https://s.shopee.co.id/5fpMpreXv9"
  },
  {
    id: 18,
    nama: "Stopper Pancing premium Kaca Transparan 100pcs",
    harga: "Rp25.000",
    hargaCoret: "Rp37.000",
    diskon: "32%",
    gambar: "assets/products/Stopper-Pancing-premium.jpg",
    deskripsi: "Stopper senar pancing premium isi 100 pcs berbahan silikon kaca transparan yang mencengkeram senar dengan presisi tanpa merusak lapisan senar.",
    kategori: "pancing-umpan",
    linkAffiliate: "https://s.shopee.co.id/30obfIVpnI"
  },
  {
    id: 19,
    nama: " Booster Attractant Essen Ikan Laut Premium Original 100ml",
    harga: "Rp78.000",
    hargaCoret: "Rp95.000",
    diskon: "18%",
    gambar: "assets/products/Booster-Attractant-Essen-Ikan-Laut.jpg",
    deskripsi: "Cairan booster atraktan 100ml khusus mancing laut (saltwater). Aroma amis tajam merangsang insting sambar ikan predator karang dan laut dalam.",
    kategori: "pancing-umpan",
    linkAffiliate: "https://s.shopee.co.id/1B05x4Znq"
  },
  {
    id: 20,
    nama: "Tali Pancing TARANTULA 500m",
    harga: "Rp44.000",
    hargaCoret: "Rp60.000",
    diskon: "27%",
    gambar: "assets/products/Tali-Pancing-TARANTULA-500m.jpg",
    deskripsi: "Senar pancing Tarantula gulungan besar 500 meter berdaya regang rendah dan tahan abrasi tinggi, tangguh untuk mancing sungai, danau, hingga tepi laut.",
    kategori: "pancing-umpan",
    linkAffiliate: "https://s.shopee.co.id/9V25PViy1Y"
  },
   {
    id: 21,
    nama: "Box Umpan Pancing 40CM",
    harga: "Rp128.000",
    hargaCoret: "Rp140.000",
    diskon: "15%",
    gambar: "assets/products/Box-Umpan-Pancing-40CM.jpg",
    deskripsi: "Kotak perkakas pancing (tackle box) ukuran 40cm dengan sekat kompartemen rapi untuk menyimpan kail, lure, timah, stopper, dan peralatan mancing.",
    kategori: "pancing-umpan",
    linkAffiliate: "https://s.shopee.co.id/7ptrRGmvcB"
  },
   {
    id: 22,
    nama: "Umpan Pancing Popper Big Bait 12.5cm 40g",
    harga: "Rp25.000",
    hargaCoret: "Rp40.000",
    diskon: "38%",
    gambar: "assets/products/umpan-pancing-popper-big-bait.jpg",
    deskripsi: "Umpan tiruan (lure) tipe popper 12.5cm berat 40g dengan cipratan air berisik yang memancing sambaran agresif ikan predator laut seperti GT dan barakuda.",
    kategori: "pancing-umpan",
    linkAffiliate: "https://s.shopee.co.id/40h8rgkk1o"
  },
   {
    id: 23,
    nama: "ESSEN SPESIALIS GALATAMA LELE",
    harga: "Rp100.000",
    hargaCoret: "Rp120.000",
    diskon: "17%",
    gambar: "assets/products/essen-spesialis-galatama-lele.jpg",
    deskripsi: "essen corragio sabun blue mix adalah essen yang sudah teruji di kolam galatama dengan semua jenis air dan cuaca.",
    kategori: "pancing-umpan",
    linkAffiliate: "https://s.shopee.co.id/8Kq82bR6XI"
  },
    {
    id: 24,
    nama: "Umpan Pancing Casting Lure",
    harga: "Rp51.000",
    hargaCoret: "Rp65.000",
    diskon: "22%",
    gambar: "assets/products/Umpan-Pancing-Casting-Lure.jpg",
    deskripsi: "Umpan casting lure realistis dengan gerakan renang stabil dan mata kail treble tajam, efektif untuk berburu ikan gabus, hampala, dan kakap bakau.",
    kategori: "pancing-umpan",
    linkAffiliate: "https://s.shopee.co.id/W7GiPysya"
  },
    {
    id: 25,
    nama: "PELET MASYAI SIAP PAKAI SPECIAL MANCING GALATAMA",
    harga: "Rp18.000",
    hargaCoret: "Rp30.000",
    diskon: "40%",
    gambar: "assets/products/pelet-masyai-siap-pakai-special-mancing-galatama.jpg",
    deskripsi: "special buat anda pemancing ikan galatama membutuhkan pelet praktis TANPA ESSEN tambahan bisa memakai pelet yang satu ini.",
    kategori: "pancing-umpan",
    linkAffiliate: "https://s.shopee.co.id/8pmOdsthli"
  },
    {
    id: 26,
    nama: "JERSEY MANCING CUSTOM SATUAN",
    harga: "Rp127.000",
    hargaCoret: "Rp140.000",
    diskon: "10%",
    gambar: "assets/products/JERSEY-MANCING-CUSTOM-SATUAN.jpg",
    deskripsi: "Baju kaos jersey mancing lengan panjang berbahan dry-fit sejuk, cepat kering, dan melindungi kulit dari sinar UV matahari. Bisa custom nama dan desain satuan.",
    kategori: "pancing-umpan",
    linkAffiliate: "https://s.shopee.co.id/qk77zjHNP"
  },
    {
    id: 27,
    nama: "SeaHunter Starfall Power Handle Spinning Fishing Reel",
    harga: "Rp375.000",
    hargaCoret: "Rp400.000",
    diskon: "6%",
    gambar: "assets/products/SeaHunter-Starfall-Power-Handle-Spinning-Fishing-Reel.jpg",
    deskripsi: "Reel spinning SeaHunter Starfall dilengkapi Power Handle ergonomis dan Max Drag 20 kg (3 bantalan rem besi + 3 serat karbon) untuk pertarungan ikan besar.",
    kategori: "pancing-umpan",
    linkAffiliate: "https://s.shopee.co.id/1qceK72Vdo"
  },
    {
    id: 28,
    nama: "SeaHunter Black Arrow Senar PE X8",
    harga: "Rp94.000",
    hargaCoret: "Rp120.000",
    diskon: "22%",
    gambar: "assets/products/SeaHunter-Black-Arrow-Senar-PE-X8.jpg",
    deskripsi: "Senar pancing braided PE X8 kepangan 8 serat teknologi Jepang yang super bulat, halus saat dilempar jauh, dan memiliki kekuatan tarik maksimal.",
    kategori: "pancing-umpan",
    linkAffiliate: "https://s.shopee.co.id/4LJzIqPqsc"
  },
    {
    id: 29,
    nama: "Topi Gunung Outdoor Pria Wanita",
    harga: "Rp26.000",
    hargaCoret: "Rp39.000",
    diskon: "33%",
    gambar: "assets/products/Topi-Gunung-Outdoor-Pria-Wanita.jpg",
    deskripsi: "Topi outdoor rimba pria dan wanita berbahan ringan cepat kering dengan sirkulasi udara sejuk, nyaman dipakai memancing, berkemah, dan aktivitas lapangan.",
    kategori: "pancing-umpan",
    linkAffiliate: "https://s.shopee.co.id/8pmOfMo1lU"
  },
    {
    id: 30,
    nama: "TrailTop Topi Mancing",
    harga: "Rp29.000",
    hargaCoret: "Rp40.000",
    diskon: "28%",
    gambar: "assets/products/TrailTop-Topi-Mancing.jpg",
    deskripsi: "Topi mancing TrailTop berdesain sporty dengan lidah topi lebar pelindung silau matahari di atas perairan, ringan dan nyaman dipakai seharian.",
    kategori: "pancing-umpan",
    linkAffiliate: "https://s.shopee.co.id/30obkZbmiT"
  },
    {
    id: 31,
    nama: "Athleisure Topi Mancing anti UV Masker Jepang",
    harga: "Rp121.000",
    hargaCoret: "Rp150.000",
    diskon: "20%",
    gambar: "assets/products/Topi-Mancing-anti-UV-Masker-Jepang.jpg",
    deskripsi: "Topi mancing full-protection gaya Jepang lengkap dengan penutup leher dan masker wajah anti-UV 360 derajat, menjaga wajah tetap teduh saat memancing di terik matahari.",
    kategori: "pancing-umpan",
    linkAffiliate: "https://s.shopee.co.id/6fhu7d5IWV"
  },
    {
    id: 32,
    nama: "AGA Essen MICRO CACING Premium",
    harga: "Rp45.000",
    hargaCoret: "Rp60.000",
    diskon: "25%",
    gambar: "assets/products/AGA-Essen-MICRO-CACING-Premium.jpg",
    deskripsi: "Essen konsentrat khusus olesan/tetesan umpan cacing 15ml yang melipatgandakan daya pikat aroma cacing untuk mancing ikan lele, bawal, patin, dan nila.",
    kategori: "pancing-umpan",
    linkAffiliate: "https://s.shopee.co.id/8pmOhtMYs8"
  },
  

  // =========================================================================
  // --- Kategori: Benih, Pakan & Budidaya (KATEGORI BUDIDAYA MODERN) ---
  // =========================================================================
  // PANDUAN MUDAH TAMBAH / EDIT PRODUK BUDIDAYA MODERN:
  // Produk di bawah telah dikelompokkan menjadi 4 bagian:
  //   1. kelompok: "pakan"          (Pakan Ikan & Nutrisi)
  //   2. kelompok: "benih"          (Benih & Bibit Ikan)
  //   3. kelompok: "alat-aksesoris" (Alat & Aksesoris Budidaya)
  //   4. kelompok: "suplemen"       (Suplemen & Probiotik Air)
  // Untuk menambah produk baru, cukup copy-paste blok produk pada kelompok
  // yang diinginkan, lalu sesuaikan data produknya.
  // =========================================================================

  // -------------------------------------------------------------------------
  // KELOMPOK 1: PAKAN (kelompok: "pakan")
  // -------------------------------------------------------------------------
  {
    id: 1,
    nama: "Pelet Makanan Ikan Koi 1kg",
    harga: "Rp49.000",
    hargaCoret: "Rp60.000",
    diskon: "25%",
    gambar: "assets/products/Pelet-Makanan-Ikan-Koi-1kg.jpg",
    deskripsi: "Pelet pakan ikan koi apung 1kg bernutrisi seimbang dengan kandungan protein tinggi dan spirulina untuk mendukung pertumbuhan badan ideal serta warna cerah.",
    kategori: "Benih-Pakan-Budidaya",
    kelompok: "pakan",
    linkAffiliate: "https://s.shopee.co.id/4qGFxpHusZ"
  },
  {
    id: 2,
    nama: "Takari Pakan Ikan mix 1 mm- 100 gr",
    harga: "Rp5.000",
    hargaCoret: "Rp12.000",
    diskon: "58%",
    gambar: "assets/products/Takari-Pakan-Ikan-mix-1-mm-100-gr.jpg",
    deskripsi: "Pakan pelet butiran mikro 1mm kemasan 100gr khusus ikan hias kecil. Mudah dicerna, kaya vitamin, dan tidak membuat air akuarium cepat keruh.",
    kategori: "Benih-Pakan-Budidaya",
    kelompok: "pakan",
    linkAffiliate: "https://s.shopee.co.id/40h8yqcyfI"
  },
  {
    id: 3,
    nama: "Makanan Pelet Ikan Predator Carnivore 300gr",
    harga: "Rp95.000",
    hargaCoret: "Rp110.000",
    diskon: "14%",
    gambar: "assets/products/Makanan-Pelet-Ikan-Predator-Carnivore-300gr.jpg",
    deskripsi: "Pelet khusus ikan predator (carnivore) 300gr tinggi protein hewani dan kalsium untuk memacu pertumbuhan channa, arwana, oscar, dan pbass.",
    kategori: "Benih-Pakan-Budidaya",
    kelompok: "pakan",
    linkAffiliate: "https://s.shopee.co.id/9KigDD2lRV"
  },
  {
    id: 4,
    nama: "Pakan Ikan Cacing Sutera/Sutra Kering Tubifex",
    harga: "Rp25.000",
    hargaCoret: "Rp30.000",
    diskon: "17%",
    gambar: "assets/products/Pakan-Ikan-Cacing-Sutera-Sutra-Kering-Tubifex.jpg",
    deskripsi: "Cacing sutera (tubifex) kering beku berbentuk kubus praktis yang higienis, bebas parasit, dan sangat tinggi protein untuk burayak maupun ikan hias.",
    kategori: "Benih-Pakan-Budidaya",
    kelompok: "pakan",
    linkAffiliate: "https://s.shopee.co.id/BURIT7bt9"
  },
  {
    id: 5,
    nama: "Pelet Ikan Koi Color Booster Mix Maggot BSFL (c) 850gr",
    harga: "Rp25.000",
    hargaCoret: "Rp40.000",
    diskon: "38%",
    gambar: "assets/products/Pelet-Ikan-Koi-850gr.jpg",
    deskripsi: "Pelet ikan koi 850gr yang diperkaya ekstrak maggot BSF dan astaxanthin alami untuk mencerahkan corak warna merah-putih koi sekaligus meningkatkan imun.",
    kategori: "Benih-Pakan-Budidaya",
    kelompok: "pakan",
    linkAffiliate: "https://s.shopee.co.id/3B82sAEIJn"
  },
  {
    id: 6,
    nama: "Red Maggot with Beta-carotene",
    harga: "Rp89.000",
    hargaCoret: "Rp100.000",
    diskon: "11%",
    gambar: "assets/products/Red-Maggot-with-Beta-carotene.jpg",
    deskripsi: "Maggot kering premium yang diperkaya Beta-Carotene untuk mendongkrak pigmen warna merah alami dan mempertebal bodi ikan predator maupun ikan hias.",
    kategori: "Benih-Pakan-Budidaya",
    kelompok: "pakan",
    linkAffiliate: "https://s.shopee.co.id/6L54eB24Bp"
  },
  // -> Tambahkan produk PAKAN baru di atas baris ini (gunakan kelompok: "pakan")


  // -------------------------------------------------------------------------
  // KELOMPOK 2: BENIH (kelompok: "benih")
  // -------------------------------------------------------------------------
  {
    id: 1,
    nama: "Bibit Ikan Lele per 100 ekor",
    harga: "Rp78.000",
    hargaCoret: "Rp90.000",
    diskon: "14%",
    gambar: "assets/products/Bibit-Ikan_Lele-per-100-ekor.jpg",
    deskripsi: "Paket 100 ekor bibit ikan lele sehat, lincah, dan bebas jamur hasil pemijahan induk unggul. Pertumbuhan cepat dan daya tahan tinggi di kolam terpal maupun tanah.",
    kategori: "Benih-Pakan-Budidaya",
    kelompok: "benih",
    linkAffiliate: "https://s.shopee.co.id/30ocevlQrn"
  },
  {
    id: 2,
    nama: "gurame soang size 3 jari ikan air tawar",
    harga: "Rp7.000",
    hargaCoret: "Rp10.000",
    diskon: "30%",
    gambar: "assets/products/gurame-soang-size-3-jari-ikan-air-tawar.jpg",
    deskripsi: "Benih ikan gurame jenis soang ukuran 3 jari yang sehat dan aktif makan. Varietas unggulan dengan laju pertumbuhan lebih cepat untuk budidaya kolam.",
    kategori: "Benih-Pakan-Budidaya",
    kelompok: "benih",
    linkAffiliate: "https://s.shopee.co.id/5LCXRLU1aO"
  },
  {
    id: 3,
    nama: "Benih bibit ikan lele Sangkuriang ukuran 2-3 cm per 100 ekor",
    harga: "Rp20.000",
    hargaCoret: "Rp30.000",
    diskon: "33%",
    gambar: "assets/products/Benih-2-3-cm-per-100-ekor.jpg",
    deskripsi: "Paket 100 ekor benih lele Sangkuriang ukuran 2-3 cm berkualitas seragam, gesit, dan hemat pakan (FCR rendah) untuk pembesaran budidaya.",
    kategori: "Benih-Pakan-Budidaya",
    kelompok: "benih",
    linkAffiliate: "https://s.shopee.co.id/4qGGqmbCdF"
  },
  // -> Tambahkan produk BENIH baru di atas baris ini (gunakan kelompok: "benih")


  // -------------------------------------------------------------------------
  // KELOMPOK 3: ALAT & AKSESORIS (kelompok: "alat-aksesoris")
  // -------------------------------------------------------------------------
  {
    id: 1,
    nama: "FFC 15 Mesin Penepung Disk Mill",
    harga: "Rp975.000",
    hargaCoret: "Rp1.200.000",
    diskon: "20%",
    gambar: "assets/products/FFC-15-Mesin-Penepung-Disk-Mill.jpg",
    deskripsi: "Mesin penepung serbaguna FFC-15 (Disk Mill) kapasitas 50-60 kg/jam untuk menggiling bahan baku pakan ikan mandiri seperti jagung, dedak, dan tepung ikan.",
    kategori: "Benih-Pakan-Budidaya",
    kelompok: "alat-aksesoris",
    linkAffiliate: "https://s.shopee.co.id/6q1KMKUKWk"
  },
  {
    id: 2,
    nama: "Paket Bundling Mediatech pH Meter & TDS/EC Automatic Calibration",
    harga: "Rp149.000",
    hargaCoret: "Rp160.000",
    diskon: "7%",
    gambar: "assets/products/Paket-Bundling-Mediatech-pH-Meter.jpg",
    deskripsi: "Alat ukur pH meter dan TDS/EC otomatis dengan kalibrasi otomatis untuk memantau kualitas air kolam ikan.",
    kategori: "Benih-Pakan-Budidaya",
    kelompok: "alat-aksesoris",
    linkAffiliate: "https://s.shopee.co.id/5LCWZwD05e"
  },
  {
    id: 3,
    nama: "PH METER TDS TEMPERATUR 3 IN 1 WATERPROOF EZ 9901",
    harga: "Rp360.000",
    hargaCoret: "Rp400.000",
    diskon: "10%",
    gambar: "assets/products/PH-METER-TDS-TEMPERATUR-3-IN-1-WATERPROOF-EZ-9901.jpg",
    deskripsi: "Alat ukur pH meter, TDS, dan temperatur 3 in 1 waterproof EZ 9901 untuk memantau kualitas air kolam ikan.",
    kategori: "Benih-Pakan-Budidaya",
    kelompok: "alat-aksesoris",
    linkAffiliate: "https://s.shopee.co.id/3g4IbAFr4j"
  },
  {
    id: 4,
    nama: "Water Meter 5 in 1",
    harga: "Rp8.380.000",
    hargaCoret: "Rp9.000.000",
    diskon: "7%",
    gambar: "assets/products/Water-Meter-5-in-1.jpg",
    deskripsi: "Alat ukur kualitas air 5 in 1 untuk memantau pH, TDS, EC, DO, dan temperatur air kolam",
    kategori: "Benih-Pakan-Budidaya",
    kelompok: "alat-aksesoris",
    linkAffiliate: "https://s.shopee.co.id/7ptrZ8aS7U"
  },
  {
    id: 5,
    nama: "Kolam Bulat Tanpa Rangka 2 meter Tinggi 90 cm",
    harga: "Rp176.000",
    hargaCoret: "Rp200.000",
    diskon: "12%",
    gambar: "assets/products/Kolam-Bulat-Tanpa-Rangka.jpg",
    deskripsi: "Kolam bulat tanpa rangka 2 meter tinggi 90 cm untuk budidaya ikan, terbuat dari bahan berkualitas tinggi yang tahan lama dan mudah dipasang.",
    kategori: "Benih-Pakan-Budidaya",
    kelompok: "alat-aksesoris",
    linkAffiliate: "https://s.shopee.co.id/5LCWb08Xp3"
  },
  {
    id: 6,
    nama: "AERATOR MESIN UDARA 2 LUBANG AQUARIUM",
    harga: "Rp50.000",
    hargaCoret: "Rp70.000",
    diskon: "29%",
    gambar: "assets/products/Aerator-Mesin-Udara-2-Lubang-Aquarium.jpg",
    deskripsi: "Aerator mesin udara 2 lubang untuk akuarium, membantu meningkatkan oksigen dalam air dan menjaga kesehatan ikan.",
    kategori: "Benih-Pakan-Budidaya",
    kelompok: "alat-aksesoris",
    linkAffiliate: "https://s.shopee.co.id/60SE57ryYk"
  },
  {
    id: 7,
    nama: "Pompa Udara Aerator Air LP60",
    harga: "Rp1.600.000",
    hargaCoret: "Rp1.800.000",
    diskon: "11%",
    gambar: "assets/products/Pompa-Udara-Aerator-Air-LP60.jpg",
    deskripsi: "Pompa udara aerator air LP60 untuk akuarium, membantu meningkatkan oksigen dalam air dan menjaga kesehatan ikan.",
    kategori: "Benih-Pakan-Budidaya",
    kelompok: "alat-aksesoris",
    linkAffiliate: "https://s.shopee.co.id/1B0wLq4GZ"
  },
  {
    id: 8,
    nama: "Batu Aerator Nano Oxygen Bubble",
    harga: "Rp33.000",
    hargaCoret: "Rp50.000",
    diskon: "34%",
    gambar: "assets/products/Batu-Aerator-Nano-Oxygen-Bubble.jpg",
    deskripsi: "Batu aerator nano oxygen bubble untuk akuarium, membantu meningkatkan oksigen dalam air dan menjaga kesehatan ikan.",
    kategori: "Benih-Pakan-Budidaya",
    kelompok: "alat-aksesoris",
    linkAffiliate: "https://s.shopee.co.id/7KxbfvUWgS"
  },
  {
    id: 9,
    nama: "Aerator silent aquarium oxygen air pump",
    harga: "Rp47.000",
    hargaCoret: "Rp60.000",
    diskon: "22%",
    gambar: "assets/products/Aerator-silent-aquarium-oxygen-air-pump.jpg",
    deskripsi: "Aerator silent aquarium oxygen air pump untuk akuarium, membantu meningkatkan oksigen dalam air dan menjaga kesehatan ikan.",
    kategori: "Benih-Pakan-Budidaya",
    kelompok: "alat-aksesoris",
    linkAffiliate: "https://s.shopee.co.id/5At763o2Wf"
  },
  {
    id: 10,
    nama: "CLEANER PUMP SIPON ALAT PENGURAS",
    harga: "Rp15.000",
    hargaCoret: "Rp25.000",
    diskon: "40%",
    gambar: "assets/products/CLEANER-PUMP-SIPON-ALAT-PENGURAS.jpg",
    deskripsi: "Cleaner pump sipon alat penguras untuk akuarium, membantu membersihkan kotoran dan sisa makanan ikan.",
    kategori: "Benih-Pakan-Budidaya",
    kelompok: "alat-aksesoris",
    linkAffiliate: "https://s.shopee.co.id/1LgOXHL3Vo"
  },
  {
    id: 11,
    nama: "Sipon Alat Penguras Kuras Penyedot Sedot Akuarium",
    harga: "Rp36.000",
    hargaCoret: "Rp47.000",
    diskon: "23%",
    gambar: "assets/products/Sipon-Alat-Penguras-Kuras-Penyedot-Sedot-Akuarium.jpg",
    deskripsi: "Sipon alat penguras kuras penyedot sedot akuarium untuk membersihkan kotoran dan sisa makanan ikan.",
    kategori: "Benih-Pakan-Budidaya",
    kelompok: "alat-aksesoris",
    linkAffiliate: "https://s.shopee.co.id/5At76QPpae"
  },
  {
    id: 12,
    nama: "1 Set aquarium akrilik",
    harga: "Rp99.000",
    hargaCoret: "Rp120.000",
    diskon: "18%",
    gambar: "assets/products/1-Set-aquarium-akrilik.jpg",
    deskripsi: "Satu set akuarium akrilik bening kristal yang ringan, tahan pecah, dan elegan untuk memelihara ikan hias di meja kerja maupun ruang keluarga.",
    kategori: "Benih-Pakan-Budidaya",
    kelompok: "alat-aksesoris",
    linkAffiliate: "https://s.shopee.co.id/113Y928ygk"
  },
  {
    id: 13,
    nama: "Orcarium Lobe Series Akuarium SOLITER",
    harga: "Rp110.000",
    hargaCoret: "Rp140.000",
    diskon: "21%",
    gambar: "assets/products/Orcarium-Lobe-Series-Akuarium-SOLITER.jpg",
    deskripsi: "Akuarium soliter Orcarium Lobe Series berdesain modern minimalis dengan sudut lengkung rapi, sangat ideal untuk display ikan cupang, guppy, dan channa.",
    kategori: "Benih-Pakan-Budidaya",
    kelompok: "alat-aksesoris",
    linkAffiliate: "https://s.shopee.co.id/3qNjWMivha"
  },
  {
    id: 14,
    nama: "bonsai aquascape sintetis (hiasan/dekorasi akuarium)",
    harga: "Rp40.000",
    hargaCoret: "Rp50.000",
    diskon: "20%",
    gambar: "assets/products/bonsai-aquascape-sintetis-hiasan-dekorasi-akuarium.jpg",
    deskripsi: "Bonsai aquascape sintetis untuk hiasan dan dekorasi akuarium, memberikan tampilan yang menarik dan alami.",
    kategori: "Benih-Pakan-Budidaya",
    kelompok: "alat-aksesoris",
    linkAffiliate: "https://s.shopee.co.id/5fpNhx0KQN"
  },
  {
    id: 15,
    nama: "LAMPU CELUP 20 CM",
    harga: "Rp20.000",
    hargaCoret: "Rp30.000",
    diskon: "33%",
    gambar: "assets/products/LAMPU-CELUP-20-CM.jpg",
    deskripsi: "LAMPU CELUP 20 CM untuk penerangan akuarium, memberikan cahaya yang optimal untuk tumbuhan dan ikan.",
    kategori: "Benih-Pakan-Budidaya",
    kelompok: "alat-aksesoris",
    linkAffiliate: "https://s.shopee.co.id/2BFVbXAkzi"
  },
  {
    id: 16,
    nama: "Hiasan Aquascape Aksesoris",
    harga: "Rp29.000",
    hargaCoret: "Rp36.000",
    diskon: "19%",
    gambar: "assets/products/Hiasan-Aquascape-Aksesoris.jpg",
    deskripsi: "Hiasan aquascape aksesoris untuk dekorasi akuarium, memberikan tampilan yang menarik dan alami.",
    kategori: "Benih-Pakan-Budidaya",
    kelompok: "alat-aksesoris",
    linkAffiliate: "https://s.shopee.co.id/1VzooWGZHP"
  },
  {
    id: 17,
    nama: "Lampu Gantung Aquarium Aquascape",
    harga: "Rp49.000",
    hargaCoret: "Rp55.000",
    diskon: "12%",
    gambar: "assets/products/Lampu-Gantung-Aquarium-Aquascape.jpg",
    deskripsi: "Lampu gantung aquarium aquascape untuk penerangan akuarium, memberikan cahaya yang optimal untuk tumbuhan dan ikan.",
    kategori: "Benih-Pakan-Budidaya",
    kelompok: "alat-aksesoris",
    linkAffiliate: "https://s.shopee.co.id/5VVxZxTZK7"
  },
  {
    id: 18,
    nama: "FILTER GANTUNG AKUARIUM AQUASCAPE",
    harga: "Rp54.000",
    hargaCoret: "Rp60.000",
    diskon: "10%",
    gambar: "assets/products/FILTER-GANTUNG-AKUARIUM-AQUASCAPE.jpg",
    deskripsi: "Filter gantung akuarium aquascape untuk menjaga kebersihan air akuarium, memberikan lingkungan yang sehat bagi ikan.",
    kategori: "Benih-Pakan-Budidaya",
    kelompok: "alat-aksesoris",
    linkAffiliate: "https://s.shopee.co.id/3B82nqpC8I"
  },
  {
    id: 19,
    nama: "Akar Kayu Rasamala Size S Aquascape",
    harga: "Rp12.000",
    hargaCoret: "Rp20.000",
    diskon: "12%",
    gambar: "assets/products/Akar-Kayu-Rasamala-Size-S-Aquascape.jpg",
    deskripsi: "Akar kayu rasamala size S untuk aquascape, memberikan tampilan yang menarik dan alami.",
    kategori: "Benih-Pakan-Budidaya",
    kelompok: "alat-aksesoris",
    linkAffiliate: "https://s.shopee.co.id/2qVCPVSxZo"
  },
  {
    id: 20,
    nama: "akar Kayu Santigi Asli Beragam ukuran untuk hiasan akuarium",
    harga: "Rp500.000",
    hargaCoret: "Rp600.000",
    diskon: "17%",
    gambar: "assets/products/Akar-Kayu-Santigi-Asli-Beragam-ukuran-untuk-hiasan-akuarium.jpg",
    deskripsi: "Akar kayu santigi asli beragam ukuran untuk hiasan akuarium, memberikan tampilan yang menarik dan alami.",
    kategori: "Benih-Pakan-Budidaya",
    kelompok: "alat-aksesoris",
    linkAffiliate: "https://s.shopee.co.id/9zyMwroIyp"
  },
  {
    id: 21,
    nama: "Hiasan akuarium Bonsai tema beringin aquascape",
    harga: "Rp60.000",
    hargaCoret: "Rp80.000",
    diskon: "25%",
    gambar: "assets/products/Hiasan-Akuarium-Bonsai-Tema-Beringin-Aquascape.jpg",
    deskripsi: "Hiasan akuarium berbentuk bonsai tema beringin untuk aquascape, memberikan tampilan yang menarik dan alami.",
    kategori: "Benih-Pakan-Budidaya",
    kelompok: "alat-aksesoris",
    linkAffiliate: "https://s.shopee.co.id/4LK0Cb0wsu"
  },
  {
    id: 22,
    nama: "Pompa Air Celup Aquarium 25w",
    harga: "Rp79.000",
    hargaCoret: "Rp100.000",
    diskon: "21%",
    gambar: "assets/products/Pompa-Air-Celup-Aquarium-25w.jpg",
    deskripsi: "Pompa air celup aquarium 25w untuk menjaga aliran air dan oksigenasi dalam akuarium.",
    kategori: "Benih-Pakan-Budidaya",
    kelompok: "alat-aksesoris",
    linkAffiliate: "https://s.shopee.co.id/W7HdiFyGC"
  },
  {
    id: 23,
    nama: "paket 10 pot 10 jenis tanaman aquascape",
    harga: "Rp8.000",
    hargaCoret: "Rp14.000",
    diskon: "43%",
    gambar: "assets/products/Paket-10-Pot-10-Jenis-Tanaman-Aquascape.jpg",
    deskripsi: "Paket 10 pot berisi 10 jenis tanaman aquascape untuk hiasan akuarium.",
    kategori: "Benih-Pakan-Budidaya",
    kelompok: "alat-aksesoris",
    linkAffiliate: "https://s.shopee.co.id/3qNjc36D8S"
  },
  {
    id: 24,
    nama: "kolam Terpal Bulat Fullset Diameter 3 tinggi 1,2 Merk orchid ",
    harga: "Rp1.459.000",
    hargaCoret: "Rp1.600.000",
    diskon: "9%",
    gambar: "assets/products/kolam-terpal-bulat-fullset-orchid.jpg",
    deskripsi: "Paket lengkap (fullset) kolam terpal bulat diameter 3 meter tinggi 1,2 meter bahan semi-karet Orchid tebal lengkap rangka besi wiremesh dan saluran pembuangan.",
    kategori: "Benih-Pakan-Budidaya",
    kelompok: "alat-aksesoris",
    linkAffiliate: "https://s.shopee.co.id/9zyMydrVnc"
  },
  {
    id: 25,
    nama: "Diffuser Aerasi Gelembung Halus Grade B Import",
    harga: "Rp102.000",
    hargaCoret: "Rp130.000",
    diskon: "22%",
    gambar: "assets/products/Diffuser-Aerasi-Gelembung-Halus-Grade-B-Import.jpg",
    deskripsi: "Piringan diffuser aerasi pemecah oksigen gelembung mikro halus (fine bubble) untuk memaksimalkan kadar oksigen terlarut (DO) di kolam bioflok dan tambak.",
    kategori: "Benih-Pakan-Budidaya",
    kelompok: "alat-aksesoris",
    linkAffiliate: "https://s.shopee.co.id/2qVCRs0eYQ"
  },
  {
    id: 26,
    nama: "Drum budidaya ikan 200L",
    harga: "Rp349.000",
    hargaCoret: "Rp400.000",
    diskon: "13%",
    gambar: "assets/products/Drum-budidaya-ikan-200L.jpg",
    deskripsi: "Tong/drum plastik HDPE tebal kapasitas 200 liter tahan cuaca untuk budidaya ikan lahan sempit (budikdamber), tandon air kolam, maupun fermentasi pakan.",
    kategori: "Benih-Pakan-Budidaya",
    kelompok: "alat-aksesoris",
    linkAffiliate: "https://s.shopee.co.id/1VzosSAwtQ"
  },
  {
    id: 27,
    nama: "Jaring Waring Pembatas Kolam 100M x 120CM",
    harga: "Rp279.000",
    hargaCoret: "Rp330.000",
    diskon: "15%",
    gambar: "assets/products/Jaring-Waring-Ukuran.jpg",
    deskripsi: "Waring hitam rajutan kuat anti geser untuk pembatas, peneduh, atau pagar kolam ikan. Tahan terhadap cuaca panas ekstrem dan tidak mudah rapuh.",
    kategori: "Benih-Pakan-Budidaya",
    kelompok: "alat-aksesoris",
    linkAffiliate: "https://s.shopee.co.id/60RwflhpFa"
  },
   {
    id: 28,
    nama: "Serok ikan lipat 80cm",
    harga: "Rp137.000",
    hargaCoret: "Rp150.000",
    diskon: "9%",
    gambar: "assets/products/Serok-ikan-lipat-80cm.jpg",
    deskripsi: "Serok ikan lipat 80cm untuk memudahkan penangkapan ikan di kolam atau akuarium.",
    kategori: "Benih-Pakan-Budidaya",
    kelompok: "alat-aksesoris",
    linkAffiliate: "https://s.shopee.co.id/50Zir3PDts"
  },
   {
    id: 29,
    nama: "baskom sortir ikan",
    harga: "Rp29.000",
    hargaCoret: "Rp38.000",
    diskon: "24%",
    gambar: "assets/products/Baskom-Sortir-Ikan.jpg",
    deskripsi: "Baskom sortir ikan untuk memudahkan pemisahan ikan berdasarkan ukuran atau jenis.",
    kategori: "Benih-Pakan-Budidaya",
    kelompok: "alat-aksesoris",
    linkAffiliate: "https://s.shopee.co.id/7ptuEvo7br"
  },
  {
    id: 30,
    nama: "Box container serbaguna tipe rabbit (untuk kolam ikan hias)",
    harga: "Rp115.000",
    hargaCoret: "Rp130.000",
    diskon: "12%",
    gambar: "assets/products/Box-Container-Serbaguna-Tipe-Rabbit.jpg",
    deskripsi: "Box kontainer plastik tebal tipe Rabbit yang kokoh dan tahan banting, sangat praktis untuk karantina ikan hias, pemijahan, maupun wadah filter chamber.",
    kategori: "Benih-Pakan-Budidaya",
    kelompok: "alat-aksesoris",
    linkAffiliate: "https://s.shopee.co.id/5LCZGVObUx"
  },
  {
    id: 27,
    nama: "Baskom Plastik Besar Kotak",
    harga: "Rp74.000",
    hargaCoret: "Rp100.000",
    diskon: "26%",
    gambar: "assets/products/Baskom-Plastik-Besar-Kotak.jpg",
    deskripsi: "Bak/baskom plastik kotak ukuran besar berbahan tebal dan awet untuk wadah penampungan benih ikan, sortir panen, maupun kultur pakan alami.",
    kategori: "Benih-Pakan-Budidaya",
    kelompok: "alat-aksesoris",
    linkAffiliate: "https://s.shopee.co.id/1gJGtJXEjb"
  },
  // -> Tambahkan produk ALAT & AKSESORIS baru di atas baris ini (gunakan kelompok: "alat-aksesoris")


  // -------------------------------------------------------------------------
  // KELOMPOK 4: SUPLEMEN (kelompok: "suplemen")
  // -------------------------------------------------------------------------
  {
    id: 1,
    nama: "Bakteri Starter Untuk Koi",
    harga: "Rp123.000",
    hargaCoret: "Rp140.000",
    diskon: "12%",
    gambar: "assets/products/Bakteri-Starter-Untuk-Koi.jpg",
    deskripsi: "Bakteri starter aktif pengurai amonia dan nitrit untuk mempercepat kematangan ekosistem air kolam koi baru agar tetap jernih dan sehat.",
    kategori: "Benih-Pakan-Budidaya",
    kelompok: "suplemen",
    linkAffiliate: "https://s.shopee.co.id/7ptsMYD0jf"
  },
  {
    id: 2,
    nama: "BOSTER AQUAENZYM (100 Gram)",
    harga: "Rp25.000",
    hargaCoret: "Rp40.000",
    diskon: "38%",
    gambar: "assets/products/BOSTER-AQUAENZYM-100-Gram.jpg",
    deskripsi: "Suplemen enzim perikanan Boster Aquaenzym 100gr untuk memperbaiki pencernaan ikan dan menguraikan sisa pakan di dasar kolam budidaya.",
    kategori: "Benih-Pakan-Budidaya",
    kelompok: "suplemen",
    linkAffiliate: "https://s.shopee.co.id/1qcfEjfeEd"
  },
  {
    id: 3,
    nama: "Nitrobacter Original Probiotik",
    harga: "Rp12.000",
    hargaCoret: "Rp20.000",
    diskon: "40%",
    gambar: "assets/products/Nitrobacter-Original-Probiotik.jpg",
    deskripsi: "Probiotik bakteri nitrifikasi (Nitrobacter) murni untuk menjernihkan air kolam/akuarium, menghilangkan bau amis, dan menekan gas beracun amonia.",
    kategori: "Benih-Pakan-Budidaya",
    kelompok: "suplemen",
    linkAffiliate: "https://s.shopee.co.id/3qNjdRsvcQ"
  },
  {
    id: 4,
    nama: "AQUAPROENZYM 100g",
    harga: "Rp30.000",
    hargaCoret: "Rp40.000",
    diskon: "25%",
    gambar: "assets/products/AQUAPROENZYM-100g.jpg",
    deskripsi: "Enzim probiotik Aquaproenzym 100g untuk meningkatkan penyerapan nutrisi pakan pada ikan dan udang serta menjaga kestabilan pH air tambak.",
    kategori: "Benih-Pakan-Budidaya",
    kelompok: "suplemen",
    linkAffiliate: "https://s.shopee.co.id/5At7E36yKh"
  },
  {
    id: 5,
    nama: "Tetes Tebu/Molase Asli Murni 100%",
    harga: "Rp18.000",
    hargaCoret: "Rp25.000",
    diskon: "28%",
    gambar: "assets/products/tetes-tebu-molase-asli-murni-100.jpg",
    deskripsi: "Tetes tebu (molase) kental 100% murni sebagai sumber karbon utama untuk pengaktifan bakteri probiotik dan sistem budidaya kolam bioflok.",
    kategori: "Benih-Pakan-Budidaya",
    kelompok: "suplemen",
    linkAffiliate: "https://s.shopee.co.id/2gBmFvejE2"
  },
   {
    id: 6,
    nama: "Mayin Water Stabilizer aquarium",
    harga: "Rp49.000",
    hargaCoret: "Rp60.000",
    diskon: "18%",
    gambar: "assets/products/mayin-water-stabilizer-aquarium.jpg",
    deskripsi: "Cairan kondisioner penjernih dan penstabil parameter air akuarium Mayin. Menetralisir klorin, logam berat, dan mengurangi stres pada ikan baru.",
    kategori: "Benih-Pakan-Budidaya",
    kelompok: "suplemen",
    linkAffiliate: "https://s.shopee.co.id/4qGKKa7KPl"
  },
   {
    id: 7,
    nama: "MAYIN Probiotic & Nitrifying Bacteria Probiotik",
    harga: "Rp50.000",
    hargaCoret: "Rp65.000",
    diskon: "23%",
    gambar: "assets/products/mayin-probiotic-nitrifying-bacteria-probiotik.jpg",
    deskripsi: "Formula bakteri probiotik dan nitrifikasi Mayin konsentrasi tinggi untuk menjaga kejernihan air kristal dan mengurai kotoran organik di filter akuarium.",
    kategori: "Benih-Pakan-Budidaya",
    kelompok: "suplemen",
    linkAffiliate: "https://s.shopee.co.id/AAHqgZ5kSw"
  },
   {
    id: 8,
    nama: "MAYIN Micronutrient Supplement",
    harga: "Rp50.000",
    hargaCoret: "Rp60.000",
    diskon: "18%",
    gambar: "assets/products/mayin-micronutrient-supplement.jpg",
    deskripsi: "Suplemen mikronutrisi dan mineral esensial Mayin untuk memperkuat daya tahan tubuh ikan hias, mencegah penyakit, dan mencerahkan sisik ikan.",
    kategori: "Benih-Pakan-Budidaya",
    kelompok: "suplemen",
    linkAffiliate: "https://s.shopee.co.id/50ZkXDOsLg"
  },
   {
    id: 9,
    nama: "Tetes Tebu/Molase Asli Murni 100%",
    harga: "Rp18.000",
    hargaCoret: "Rp25.000",
    diskon: "28%",
    gambar: "assets/products/tetes-tebu-molase-asli-murni-100.jpg",
    deskripsi: "Tetes tebu (molase) kental 100% murni sebagai sumber karbon utama untuk pengaktifan bakteri probiotik dan sistem budidaya kolam bioflok.",
    kategori: "Benih-Pakan-Budidaya",
    kelompok: "suplemen",
    linkAffiliate: "https://s.shopee.co.id/2gBmFvejE2"
  },
  {
    id: 10,
    nama: "molase tetes tebu murni 5kg",
    harga: "Rp39.000",
    hargaCoret: "Rp45.000",
    diskon: "13%",
    gambar: "assets/products/molase-tetes-tebu-murni-5kg.jpg",
    deskripsi: "Jerigen hemat 5kg molase tetes tebu murni berkualitas pekat untuk kebutuhan rutin aplikasi probiotik tambak udang dan kolam ikan bioflok.",
    kategori: "Benih-Pakan-Budidaya",
    kelompok: "suplemen",
    linkAffiliate: "https://s.shopee.co.id/qk84fa9Kb"
  }
  
  // -> Tambahkan produk SUPLEMEN baru di atas baris ini (gunakan kelompok: "suplemen")

];

// ---------- 2. DAFTAR KATEGORI DENGAN BACKGROUND FOTO ----------

const categories = [
  { 
    id: "produk-olahan-ikan", 
    nama: "Produk Olahan Ikan", 
    svg: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>', 
    deskripsi: "Abon, kerupuk, pempek & aneka olahan gurih",
    bg: "cat-olahan-real.jpg"
  },
  { 
    id: "ikan-seafood-segar", 
    nama: "Ikan & Seafood", 
    svg: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 16s3-2 6-2c4 0 6 2 9 2s5-2 5-2"/><path d="M2 12s3-4 6-4 6 4 6 4 3-4 6-4"/></svg>', 
    deskripsi: "Kakap merah, udang vaname & hasil laut segar",
    bg: "cat-seafood-real.jpg"
  },
  { 
    id: "pancing-umpan", 
    nama: "Pancing & Umpan", 
    svg: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="15" cy="4.5" r="2"/><path d="M15 6.5v7.5a6 6 0 0 1-12 0v-5"/><path d="M3 11l2.5 2"/></svg>', 
    deskripsi: "Joran carbon, reel presisi & piranti mancing",
    bg: "cat-pancing-real.jpg"
  },
  { 
    id: "Benih-Pakan-Budidaya", 
    nama: "Benih, Pakan & Budidaya", 
    svg: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.47-3.44 6-7 6-3.56 0-7.56-2.53-8.5-6Z"/><path d="M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33"/><circle cx="15.5" cy="11" r="1" fill="currentColor" stroke="none"/></svg>', 
    deskripsi: "Pakan bernutrisi, aerator & sarana tambak",
    bg: "cat-budidaya-real.jpg"
  }
];

// Mapping Banner Foto, Tag, Judul & Deskripsi Lengkap Tiap Kategori & Semua Produk
const categoryBanners = {
  "semua": {
    bg: "banner-bahari-real.jpg",
    tag: "KATALOG LENGKAP BAHARI",
    title: "Semua Produk aquaagri.id",
    deskripsi: "Pusat hasil laut segar, olahan higienis, piranti pancing, dan sarana budidaya bahari."
  },
  "produk-olahan-ikan": {
    bg: "cat-olahan-real.jpg",
    tag: "KATEGORI OLAHAN HIGIENIS",
    title: "Produk Olahan Ikan",
    deskripsi: "Aneka olahan ikan higienis, lezat, bernutrisi, dan siap saji untuk keluarga."
  },
  "ikan-seafood-segar": {
    bg: "cat-seafood-real.jpg",
    tag: "KATEGORI SEAFOOD SEGAR",
    title: "Ikan & Seafood Segar",
    deskripsi: "Tangkapan laut dan seafood segar harian dengan standar cold-chain higienis."
  },
  "pancing-umpan": {
    bg: "cat-pancing-real.jpg",
    tag: "KATEGORI SPORTFISHING",
    title: "Pancing & Umpan",
    deskripsi: "Perlengkapan mancing terlengkap: joran carbon, reel presisi, dan aneka umpan."
  },
  "Benih-Pakan-Budidaya": {
    bg: "cat-budidaya-real.jpg",
    tag: "KATEGORI BUDIDAYA MODERN",
    title: "Benih, Pakan & Budidaya",
    deskripsi: "Solusi budidaya modern: pakan bernutrisi, benih unggul, dan sarana tambak."
  }
};

// Kelompok Produk Khusus Kategori Budidaya Modern
const BUDIDAYA_GROUPS = [
  {
    id: "pakan",
    nama: "Pakan Ikan & Nutrisi",
    label: "Pakan"
  },
  {
    id: "benih",
    nama: "Benih & Bibit Ikan",
    label: "Benih"
  },
  {
    id: "alat-aksesoris",
    nama: "Alat & Perlengkapan Budidaya",
    label: "Alat & Aksesoris"
  },
  {
    id: "suplemen",
    nama: "Suplemen & Probiotik Air",
    label: "Suplemen"
  }
];

// Normalisasi nama kelompok/subkategori agar fleksibel saat diedit (mendukung huruf besar/kecil & variasi penulisan)
function normalizeBudidayaSubcategory(rawVal) {
  if (!rawVal) return "";
  const val = String(rawVal).trim().toLowerCase();
  if (val === "pakan" || val.includes("pakan")) return "pakan";
  if (val === "benih" || val === "bibit" || val.includes("benih") || val.includes("bibit")) return "benih";
  if (val === "suplemen" || val === "suplement" || val.includes("suplemen") || val.includes("probiotik")) return "suplemen";
  if (val === "alat-aksesoris" || val === "alat" || val === "aksesoris" || val.includes("alat") || val.includes("aksesoris")) return "alat-aksesoris";
  return val;
}

function getBudidayaSubcategory(produk) {
  // 1. Prioritaskan properti `kelompok` atau `subkategori` yang ditulis langsung pada produk
  const explicitGroup = normalizeBudidayaSubcategory(produk.kelompok || produk.subkategori);
  if (explicitGroup) return explicitGroup;

  // 2. Fallback otomatis berdasarkan kata kunci nama/deskripsi jika lupa menulis `kelompok`
  const teks = ((produk.nama || "") + " " + (produk.deskripsi || "")).toLowerCase();
  if (/\b(pelet|pakan|maggot|cacing|tubifex|makanan ikan)\b/.test(teks)) return "pakan";
  if (/\b(benih|bibit|anakan|larva)\b/.test(teks)) return "benih";
  if (/\b(probiotik|bakteri|starter|molase|tetes tebu|enzym|aquaenzym|aquaproenzym|boster|vitamin|suplemen|obat)\b/.test(teks)) return "suplemen";

  return "alat-aksesoris";
}

// Inisialisasi properti kelompok/subkategori pada produk budidaya
products.forEach(function (p) {
  if (p.kategori === "Benih-Pakan-Budidaya") {
    const resolved = getBudidayaSubcategory(p);
    p.kelompok = resolved;
    p.subkategori = resolved;
  }
});

// Placeholder gambar cadangan
const PLACEHOLDER_IMG =
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300">' +
    '<rect width="300" height="300" fill="#edf7fa"/>' +
    '<text x="50%" y="50%" font-family="sans-serif" font-size="15" fill="#2e98b0" text-anchor="middle" dominant-baseline="middle">Foto Produk aquaagri.</text>' +
    '</svg>'
  );

// ---------- 3. STATE APLIKASI ----------

let currentCategory = "semua";
let currentKeyword = "";

// ---------- 4. INISIALISASI DOM ----------

document.addEventListener("DOMContentLoaded", function () {
  const homeView = document.getElementById("homeView");
  const categoryView = document.getElementById("categoryView");
  const searchView = document.getElementById("searchView");
  const aboutView = document.getElementById("aboutView");
  const vipPromoView = document.getElementById("vipPromoView");
  const vipPromoBackBtn = document.getElementById("vipPromoBackBtn");
  const vipBottomBackBtn = document.getElementById("vipBottomBackBtn");
  const vipBottomExploreBtn = document.getElementById("vipBottomExploreBtn");
  const vipViewAllProductsBtn = document.getElementById("vipViewAllProductsBtn");
  const vipActivateNotifBtn = document.getElementById("vipActivateNotifBtn");
  const aboutBackBtn = document.getElementById("aboutBackBtn");
  const aboutBottomBackBtn = document.getElementById("aboutBottomBackBtn");
  const aboutExploreBtn = document.getElementById("aboutExploreBtn");
  const aboutProductCount = document.getElementById("aboutProductCount");
  const aboutCategoryCount = document.getElementById("aboutCategoryCount");

  function updateAboutStats() {
    if (aboutProductCount && Array.isArray(products)) {
      aboutProductCount.textContent = products.length;
    }
    if (aboutCategoryCount && Array.isArray(categories)) {
      aboutCategoryCount.textContent = categories.length;
    }
  }
  const categoryGrid = document.getElementById("categoryGrid");
  const productGrid = document.getElementById("productGrid");
  const categoryTitle = document.getElementById("categoryTitle");
  const categoryCount = document.getElementById("categoryCount");
  const emptyState = document.getElementById("emptyState");
  const backBtn = document.getElementById("backBtn");
  const brandLogo = document.getElementById("brandLogo");
  const mainHeader = document.getElementById("mainHeader");
  const topbarSearchInterfaceRow = document.getElementById("topbarSearchInterfaceRow");
  const topbarCategorySearchRow = document.getElementById("topbarCategorySearchRow");

  function updateHeaderOffset() {
    if (mainHeader) {
      document.body.style.paddingTop = mainHeader.offsetHeight + "px";
    }
  }

  // Elemen Header Banner Kategori
  const categoryBannerImg = document.getElementById("categoryBannerImg");
  const categoryBannerTag = document.getElementById("categoryBannerTag");
  const categoryHeaderDesc = document.getElementById("categoryHeaderDesc");
  const categoryChipsNav = document.getElementById("categoryChipsNav");
  const budidayaSubchipsNav = document.getElementById("budidayaSubchipsNav");
  let currentBudidayaSub = "semua";
  const categorySearchClearBtn = document.getElementById("categorySearchClearBtn");
  const categoryBackNavBtn = document.getElementById("categoryBackNavBtn");

  // Elemen Pencarian
  const searchInput = document.getElementById("searchInput");
  const homeSearchTrigger = document.getElementById("homeSearchTrigger");
  const searchInputCategory = document.getElementById("searchInputCategory");
  const filterSelect = document.getElementById("filterSelect");

  // Elemen Mobile Search Interface (Mega Bar)
  const searchInterfaceInput = document.getElementById("searchInterfaceInput");
  const searchBackBtn = document.getElementById("searchBackBtn");
  const searchClearBtn = document.getElementById("searchClearBtn");
  const searchCameraBtn = document.getElementById("searchCameraBtn");
  const cameraFileInput = document.getElementById("cameraFileInput");
  const searchMicBtn = document.getElementById("searchMicBtn");
  const searchSubmitBtn = document.getElementById("searchSubmitBtn");
  const searchChipsScroll = document.getElementById("searchChipsScroll");
  const searchProductGrid = document.getElementById("searchProductGrid");
  const searchResultCount = document.getElementById("searchResultCount");
  const searchEmptyState = document.getElementById("searchEmptyState");
  const searchToast = document.getElementById("searchToast");

  const sampleCarouselViewport = document.getElementById("sampleCarouselViewport");
  const sampleCarouselTrack = document.getElementById("sampleCarouselTrack");
  const samplePrevBtn = document.getElementById("samplePrevBtn");
  const sampleNextBtn = document.getElementById("sampleNextBtn");

  const themeToggleBtn = document.getElementById("themeToggleBtn");
  const themeMoonIcon = document.getElementById("themeMoonIcon");
  const themeText = document.getElementById("themeText");

  // ---------- 5. SISTEM MODE TAMPILAN (DEFAULT TIDAK OTOMATIS MODE MALAM) ----------

  function initTheme() {
    const savedTheme = localStorage.getItem("aquaagri_theme");
    // DEFAULT SELALU TERANG, KECUALI JIKA USER PERNAH MEMILIH 'dark'
    if (savedTheme === "dark") {
      setDarkMode(true, false);
    } else {
      setDarkMode(false, false);
    }
  }

  function setDarkMode(isDark, savePreference = true) {
    if (isDark) {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
      if (themeMoonIcon) {
        themeMoonIcon.innerHTML = '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>';
      }
      if (themeText) themeText.textContent = "Terang";
      if (savePreference) localStorage.setItem("aquaagri_theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      document.body.classList.add("light-mode");
      if (themeMoonIcon) {
        themeMoonIcon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
      }
      if (themeText) themeText.textContent = "Malam";
      if (savePreference) localStorage.setItem("aquaagri_theme", "light");
    }
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", function () {
      const isCurrentlyDark = document.body.classList.contains("dark-mode");
      setDarkMode(!isCurrentlyDark, true);
    });
  }

  initTheme();

  // ---------- 6. RENDER 4 KATEGORI UTAMA DENGAN BACKGROUND FOTO & ANIMASI PANAH KURSOR ----------

  function renderCategories() {
    if (!categoryGrid) return;
    categoryGrid.innerHTML = "";
    categories.forEach(function (cat) {
      const card = document.createElement("div");
      card.className = "category-card-clean";
      card.setAttribute("role", "button");
      card.setAttribute("tabindex", "0");
      card.setAttribute("aria-label", "Buka kategori " + cat.nama);

      // 1. Foto kategori realistis & berkualitas tinggi
      const bgImg = document.createElement("img");
      bgImg.className = "cat-clean-bg";
      bgImg.src = cat.bg;
      bgImg.alt = cat.nama;
      bgImg.loading = "lazy";

      // 2. Lapisan gradasi gelap transparan agar tulisan sangat nyaman dibaca
      const overlay = document.createElement("div");
      overlay.className = "cat-clean-overlay";

      // 3. Efek kilauan animasi modern saat disorot (hover sheen)
      const sheen = document.createElement("div");
      sheen.className = "cat-clean-sheen";
      sheen.setAttribute("aria-hidden", "true");

      // 4. Ikon kategori melayang di pojok kiri atas
      const iconPill = document.createElement("div");
      iconPill.className = "cat-clean-icon-pill";
      iconPill.innerHTML = cat.svg || "";
      iconPill.setAttribute("aria-hidden", "true");

      // 5. Animasi panah komputer kecil di pojok kanan atas (tidak mengganggu layar)
      const arrowBtn = document.createElement("div");
      arrowBtn.className = "cat-arrow-small";
      arrowBtn.setAttribute("aria-hidden", "true");
      arrowBtn.setAttribute("title", "Kunjungi " + cat.nama);
      arrowBtn.innerHTML = `
        <svg class="cat-arrow-icon" viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      `;

      // 6. Kontainer teks di bagian bawah: Nama kategori & Deskripsi ringkas
      const infoBox = document.createElement("div");
      infoBox.className = "cat-clean-info";

      const title = document.createElement("h3");
      title.className = "cat-clean-name";
      title.textContent = cat.nama;

      const desc = document.createElement("p");
      desc.className = "cat-clean-desc";
      desc.textContent = cat.deskripsi;

      infoBox.appendChild(title);
      infoBox.appendChild(desc);

      // Gabungkan seluruh elemen ke dalam kartu
      card.appendChild(bgImg);
      card.appendChild(overlay);
      card.appendChild(sheen);
      card.appendChild(iconPill);
      card.appendChild(arrowBtn);
      card.appendChild(infoBox);

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

    initCategorySpotlightCycle();
  }

  // ---------- SISTEM SPOTLIGHT ANIMASI 4 KATEGORI (2,5 DETIK BERGANTIAN) ----------
  let categorySpotlightTimer = null;
  let activeSpotlightIndex = 0;
  let isSpotlightHovered = false;

  function initCategorySpotlightCycle() {
    if (!categoryGrid) return;
    const cards = categoryGrid.querySelectorAll(".category-card-clean");
    if (!cards || cards.length === 0) return;

    if (categorySpotlightTimer) {
      clearInterval(categorySpotlightTimer);
      categorySpotlightTimer = null;
    }

    // Kategori pertama langsung aktif (sesuai contoh gambar terlampir)
    activeSpotlightIndex = 0;
    cards.forEach(function (c, idx) {
      if (idx === 0) {
        c.classList.add("category-card-spotlight");
      } else {
        c.classList.remove("category-card-spotlight");
      }
    });

    // Jalankan pergantian spotlight setiap kategori durasi 2,5 detik (2500ms)
    categorySpotlightTimer = setInterval(function () {
      if (isSpotlightHovered) return;
      const allCards = categoryGrid.querySelectorAll(".category-card-clean");
      if (!allCards || allCards.length === 0) return;

      allCards[activeSpotlightIndex].classList.remove("category-card-spotlight");
      activeSpotlightIndex = (activeSpotlightIndex + 1) % allCards.length;
      allCards[activeSpotlightIndex].classList.add("category-card-spotlight");
    }, 2500);

    categoryGrid.addEventListener("mouseenter", function () {
      isSpotlightHovered = true;
    });
    categoryGrid.addEventListener("mouseleave", function () {
      isSpotlightHovered = false;
    });
    categoryGrid.addEventListener("touchstart", function () {
      isSpotlightHovered = true;
    }, { passive: true });
    categoryGrid.addEventListener("touchend", function () {
      setTimeout(function () {
        isSpotlightHovered = false;
      }, 1500);
    }, { passive: true });
  }

  // ---------- 7. CAROUSEL PRODUK UNGGULAN (20 PRODUK PALING SERING DI-KLIK) ----------

  // Urutan prioritas tampilan awal slider apabila jumlah klik asli masih sama-sama 0
  const featuredDefaultOrder = {
    1: 20, 3: 19, 2: 18, 11: 17, 12: 16,
    18: 15, 19: 14, 25: 13, 26: 12, 4: 11,
    5: 10, 13: 9, 14: 8, 20: 7, 21: 6,
    27: 5, 28: 4, 6: 3, 7: 2, 15: 1
  };

  function getProductClickCount(prodId) {
    const prodObj = products.find(function (p) { return Number(p.id) === Number(prodId); });
    const dbClicks = prodObj && typeof prodObj.klik === "number" && prodObj.klik > 0 ? prodObj.klik : 0;
    try {
      const savedClicks = JSON.parse(localStorage.getItem("aquaagri_clicks") || "{}");
      return dbClicks + (Number(savedClicks[prodId]) || 0);
    } catch (e) {
      return dbClicks;
    }
  }

  function recordProductClick(prodId) {
    if (!prodId) return;
    try {
      const savedClicks = JSON.parse(localStorage.getItem("aquaagri_clicks") || "{}");
      savedClicks[prodId] = (Number(savedClicks[prodId]) || 0) + 1;
      localStorage.setItem("aquaagri_clicks", JSON.stringify(savedClicks));
    } catch (e) {}

    // Kirim pencatatan klik ke Supabase secara asinkron (jika RPC tersedia)
    try {
      if (typeof window.getAquaAgriSupabaseClient === "function") {
        const sb = window.getAquaAgriSupabaseClient();
        if (sb) {
          sb.rpc("increment_product_click", { product_id: Number(prodId) }).then(function () {}).catch(function () {});
        }
      }
    } catch (e) {}
  }

  function getTopClickedProducts(limit = 20) {
    const list = [...products];
    list.sort(function (a, b) {
      const diff = getProductClickCount(b.id) - getProductClickCount(a.id);
      if (diff !== 0) return diff;
      return (featuredDefaultOrder[b.id] || 0) - (featuredDefaultOrder[a.id] || 0);
    });
    return list.slice(0, limit);
  }

  function renderSampleCarousel() {
    if (!sampleCarouselTrack) return;
    sampleCarouselTrack.innerHTML = "";

    // Tampilkan tepat 20 produk yang paling sering di-klik pengunjung
    const samples = getTopClickedProducts(20);

    samples.forEach(function (prod) {
      const card = document.createElement("div");
      card.className = "featured-clean-card";
      card.setAttribute("role", "button");
      card.setAttribute("tabindex", "0");
      card.setAttribute("aria-label", "Detail " + prod.nama);

      const imgBox = document.createElement("div");
      imgBox.className = "featured-clean-img-box";

      if (prod.diskon) {
        const disc = document.createElement("span");
        disc.className = "featured-clean-disc";
        disc.textContent = "-" + prod.diskon;
        imgBox.appendChild(disc);
      }

      const img = document.createElement("img");
      img.className = "featured-clean-img";
      img.src = prod.gambar || PLACEHOLDER_IMG;
      img.alt = prod.nama;
      img.loading = "lazy";
      img.addEventListener("error", function () {
        img.src = PLACEHOLDER_IMG;
      });
      imgBox.appendChild(img);

      const body = document.createElement("div");
      body.className = "featured-clean-body";

      const name = document.createElement("h4");
      name.className = "featured-clean-name";
      name.textContent = prod.nama;
      name.title = prod.nama;

      const priceRow = document.createElement("div");
      priceRow.className = "featured-clean-price-row";

      const price = document.createElement("span");
      price.className = "featured-clean-price";
      price.textContent = prod.harga;
      priceRow.appendChild(price);

      if (prod.hargaCoret) {
        const coret = document.createElement("span");
        coret.className = "featured-clean-price-coret";
        coret.textContent = prod.hargaCoret;
        priceRow.appendChild(coret);
      }

      const btn = document.createElement("button");
      btn.className = "featured-clean-btn";
      btn.type = "button";
      btn.innerHTML = '<span>Lihat Produk</span> <span aria-hidden="true">→</span>';
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        openAffiliateLink(prod);
      });

      body.appendChild(name);
      body.appendChild(priceRow);
      body.appendChild(btn);

      card.appendChild(imgBox);
      card.appendChild(body);

      // Klik kartu membuka modal detail produk
      card.addEventListener("click", function () {
        openProductDetailModal(prod);
      });
      card.addEventListener("keydown", function (e) {
        if ((e.key === "Enter" || e.key === " ") && e.target === card) {
          e.preventDefault();
          openProductDetailModal(prod);
        }
      });

      sampleCarouselTrack.appendChild(card);
    });

    initSampleAutoScroll();
  }

  // Kontrol Auto-Scroll Carousel Produk Unggulan (3 Detik Berganti)
  let sampleScrollTimer = null;
  let isSamplePaused = false;

  function initSampleAutoScroll() {
    if (!sampleCarouselViewport) return;

    function stepScroll(direction = 1) {
      const firstCard = sampleCarouselTrack ? sampleCarouselTrack.querySelector(".featured-clean-card") : null;
      const scrollStep = firstCard ? (firstCard.offsetWidth + 10) : 158;
      const maxScroll = sampleCarouselViewport.scrollWidth - sampleCarouselViewport.clientWidth;
      
      if (direction === 1) {
        if (sampleCarouselViewport.scrollLeft >= maxScroll - 10) {
          sampleCarouselViewport.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          sampleCarouselViewport.scrollBy({ left: scrollStep, behavior: "smooth" });
        }
      } else {
        if (sampleCarouselViewport.scrollLeft <= 10) {
          sampleCarouselViewport.scrollTo({ left: maxScroll, behavior: "smooth" });
        } else {
          sampleCarouselViewport.scrollBy({ left: -scrollStep, behavior: "smooth" });
        }
      }
    }

    function startAutoScroll() {
      stopAutoScroll();
      sampleScrollTimer = setInterval(function () {
        if (!isSamplePaused) {
          stepScroll(1);
        }
      }, 2000); // Tepat 2 detik berganti secara otomatis
    }

    function stopAutoScroll() {
      if (sampleScrollTimer) clearInterval(sampleScrollTimer);
    }

    // Jeda otomatis jika kursor hover atau disentuh di layar HP
    sampleCarouselViewport.addEventListener("mouseenter", function () { isSamplePaused = true; });
    sampleCarouselViewport.addEventListener("mouseleave", function () { isSamplePaused = false; });
    sampleCarouselViewport.addEventListener("touchstart", function () { isSamplePaused = true; }, { passive: true });
    sampleCarouselViewport.addEventListener("touchend", function () {
      setTimeout(function () { isSamplePaused = false; }, 2000);
    }, { passive: true });

    if (samplePrevBtn) {
      samplePrevBtn.addEventListener("click", function () {
        stepScroll(-1);
      });
    }
    if (sampleNextBtn) {
      sampleNextBtn.addEventListener("click", function () {
        stepScroll(1);
      });
    }

    startAutoScroll();
  }

  // ---------- 8. CAROUSEL OTOMATIS: POTRET EKOSISTEM BAHARI ----------
  // (Petambak, Produk Olahan Ikan, Pemancing, Ikan Segar, Pembudidaya)

  function initStoryCarousel() {
    const storyTrack = document.getElementById("storyTrack");
    const storyPrevBtn = document.getElementById("storyPrevBtn");
    const storyNextBtn = document.getElementById("storyNextBtn");
    const storyDots = document.getElementById("storyDots");
    const storyBox = document.getElementById("storyCarousel");

    if (!storyTrack) return;
    const slides = storyTrack.querySelectorAll(".story-slide");
    if (slides.length === 0) return;

    let currentSlide = 0;
    let storyTimer = null;
    let isStoryPaused = false;

    function showSlide(index) {
      if (index >= slides.length) currentSlide = 0;
      else if (index < 0) currentSlide = slides.length - 1;
      else currentSlide = index;

      slides.forEach(function (slide, i) {
        if (i === currentSlide) {
          slide.classList.add("active");
        } else {
          slide.classList.remove("active");
        }
      });

      if (storyDots) {
        const dots = storyDots.querySelectorAll(".story-dot");
        dots.forEach(function (dot, i) {
          if (i === currentSlide) {
            dot.classList.add("active");
          } else {
            dot.classList.remove("active");
          }
        });
      }
    }

    function nextStorySlide() {
      showSlide(currentSlide + 1);
    }

    function prevStorySlide() {
      showSlide(currentSlide - 1);
    }

    function startStoryTimer() {
      stopStoryTimer();
      storyTimer = setInterval(function () {
        if (!isStoryPaused) {
          nextStorySlide();
        }
      }, 4500);
    }

    function stopStoryTimer() {
      if (storyTimer) clearInterval(storyTimer);
    }

    if (storyNextBtn) {
      storyNextBtn.addEventListener("click", function () {
        nextStorySlide();
        startStoryTimer();
      });
    }

    if (storyPrevBtn) {
      storyPrevBtn.addEventListener("click", function () {
        prevStorySlide();
        startStoryTimer();
      });
    }

    if (storyDots) {
      const dots = storyDots.querySelectorAll(".story-dot");
      dots.forEach(function (dot, i) {
        dot.addEventListener("click", function () {
          showSlide(i);
          startStoryTimer();
        });
      });
    }

    if (storyBox) {
      storyBox.addEventListener("mouseenter", function () { isStoryPaused = true; });
      storyBox.addEventListener("mouseleave", function () { isStoryPaused = false; });
      
      // Swipe gesture di layar sentuh HP
      let touchStartX = 0;
      storyBox.addEventListener("touchstart", function (e) {
        touchStartX = e.touches[0].clientX;
        isStoryPaused = true;
      }, { passive: true });

      storyBox.addEventListener("touchend", function (e) {
        const diffX = e.changedTouches[0].clientX - touchStartX;
        if (diffX > 45) {
          prevStorySlide();
        } else if (diffX < -45) {
          nextStorySlide();
        }
        setTimeout(function () { isStoryPaused = false; }, 2000);
      }, { passive: true });
    }

    startStoryTimer();
  }

  // ---------- 8B. SLIDER FOTO OTOMATIS HERO BANNER ----------
  let activeHeroTimer = null;
  function initHeroSlider() {
    if (activeHeroTimer) {
      clearInterval(activeHeroTimer);
      activeHeroTimer = null;
    }
    const heroCard = document.querySelector(".hero-clean-card");
    const visualSlider = document.getElementById("heroVisualSlider");
    if (!visualSlider) return;

    const slides = visualSlider.querySelectorAll(".hero-slide-item");
    const dotsWrap = document.getElementById("heroSlideDots");
    if (slides.length <= 1) return;

    let currentHeroSlide = 0;
    let isHeroPaused = false;

    function showHeroSlide(index) {
      if (index >= slides.length) currentHeroSlide = 0;
      else if (index < 0) currentHeroSlide = slides.length - 1;
      else currentHeroSlide = index;

      slides.forEach(function (slide, i) {
        if (i === currentHeroSlide) {
          slide.classList.add("active");
        } else {
          slide.classList.remove("active");
        }
      });

      if (dotsWrap) {
        const dots = dotsWrap.querySelectorAll(".hero-dot");
        dots.forEach(function (dot, i) {
          if (i === currentHeroSlide) {
            dot.classList.add("active");
          } else {
            dot.classList.remove("active");
          }
        });
      }
    }

    function nextHeroSlide() {
      showHeroSlide(currentHeroSlide + 1);
    }

    function prevHeroSlide() {
      showHeroSlide(currentHeroSlide - 1);
    }

    function startHeroTimer() {
      stopHeroTimer();
      activeHeroTimer = setInterval(function () {
        if (!isHeroPaused) {
          nextHeroSlide();
        }
      }, 7000);
    }

    function stopHeroTimer() {
      if (activeHeroTimer) {
        clearInterval(activeHeroTimer);
        activeHeroTimer = null;
      }
    }

    if (dotsWrap) {
      const dots = dotsWrap.querySelectorAll(".hero-dot");
      dots.forEach(function (dot, i) {
        dot.addEventListener("click", function (e) {
          e.stopPropagation();
          showHeroSlide(i);
          startHeroTimer();
        });
      });
    }

    if (heroCard) {
      heroCard.addEventListener("mouseenter", function () { isHeroPaused = true; });
      heroCard.addEventListener("mouseleave", function () { isHeroPaused = false; });

      // Swipe touch gesture untuk layar sentuh ponsel
      let touchStartX = 0;
      heroCard.addEventListener("touchstart", function (e) {
        touchStartX = e.touches[0].clientX;
        isHeroPaused = true;
      }, { passive: true });

      heroCard.addEventListener("touchend", function (e) {
        const diffX = e.changedTouches[0].clientX - touchStartX;
        if (diffX > 40) {
          prevHeroSlide();
        } else if (diffX < -40) {
          nextHeroSlide();
        }
        setTimeout(function () { isHeroPaused = false; }, 2000);
      }, { passive: true });
    }

    startHeroTimer();
  }

  // ---------- 9. PEMBUATAN KARTU PRODUK KATALOG ----------

  function createProductCard(produk) {
    const card = document.createElement("div");
    card.className = "product-card";

    const imgWrap = document.createElement("div");
    imgWrap.className = "product-img-wrap";

    const img = document.createElement("img");
    img.className = "product-image";
    img.src = produk.gambar || PLACEHOLDER_IMG;
    img.alt = produk.nama;
    img.loading = "lazy";
    img.decoding = "async";
    img.addEventListener("error", function () {
      img.src = PLACEHOLDER_IMG;
    });

    imgWrap.appendChild(img);

    if (produk.diskon) {
      const discBadge = document.createElement("span");
      discBadge.className = "product-discount-badge";
      discBadge.textContent = "Diskon " + produk.diskon;
      imgWrap.appendChild(discBadge);
    }

    const body = document.createElement("div");
    body.className = "product-body";

    const nama = document.createElement("h3");
    nama.className = "product-name";
    nama.textContent = produk.nama;

    const desc = document.createElement("p");
    desc.className = "product-desc";
    desc.textContent = produk.deskripsi;
    desc.title = produk.deskripsi;

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

    desc.title = "Klik untuk menampilkan deskripsi lengkap";
    desc.addEventListener("click", function (e) {
      e.stopPropagation();
      desc.classList.toggle("expanded");
    });

    const btn = document.createElement("button");
    btn.className = "product-btn";
    btn.type = "button";
    btn.innerHTML = '<span>Lihat Produk</span> <span style="font-size:0.8em; opacity:0.85;">&rarr;</span>';
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      openAffiliateLink(produk);
    });

    body.appendChild(nama);
    body.appendChild(desc);
    body.appendChild(priceRow);
    body.appendChild(btn);

    card.appendChild(imgWrap);
    card.appendChild(body);

    // Klik produk untuk menampilkan deskripsi lengkap via Modal
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-label", "Lihat detail " + produk.nama);
    card.addEventListener("click", function () {
      openProductDetailModal(produk);
    });
    card.addEventListener("keydown", function (e) {
      if ((e.key === "Enter" || e.key === " ") && e.target === card) {
        e.preventDefault();
        openProductDetailModal(produk);
      }
    });

    return card;
  }

  // ---------- 10. RENDER PRODUK DI HALAMAN KATEGORI ----------

  function renderProducts(list) {
    if (!productGrid) return;
    productGrid.innerHTML = "";

    if (list.length === 0) {
      if (emptyState) emptyState.classList.remove("hidden");
      if (categoryCount) categoryCount.textContent = "0 produk ditemukan";
      productGrid.classList.remove("product-grid-grouped");
      return;
    }
    if (emptyState) emptyState.classList.add("hidden");

    // JIKA KATEGORI BUDIDAYA MODERN & MEMILIH SUB-FILTER TERTENTU (Pakan, Benih, Alat & Aksesoris, Suplemen):
    // Tampilkan produk dari sub-kategori terpilih dengan header minimalis & profesional
    if (currentCategory === "Benih-Pakan-Budidaya" && currentBudidayaSub !== "semua") {
      const activeGroup = BUDIDAYA_GROUPS.find(function (g) {
        return g.id === currentBudidayaSub;
      });

      const subProducts = list.filter(function (p) {
        return getBudidayaSubcategory(p) === currentBudidayaSub;
      });

      if (subProducts.length === 0) {
        if (emptyState) emptyState.classList.remove("hidden");
        if (categoryCount) categoryCount.textContent = "0 produk ditemukan";
        productGrid.classList.remove("product-grid-grouped");
        return;
      }

      productGrid.classList.add("product-grid-grouped");

      const section = document.createElement("div");
      section.className = "budidaya-group-section";
      section.setAttribute("data-sub-group", currentBudidayaSub);

      const header = document.createElement("div");
      header.className = "budidaya-group-header";

      const title = document.createElement("h3");
      title.className = "budidaya-group-title";
      title.textContent = activeGroup ? activeGroup.nama : "Kategori Produk";

      const badge = document.createElement("span");
      badge.className = "budidaya-group-badge";
      badge.textContent = subProducts.length + " Produk";

      header.appendChild(title);
      header.appendChild(badge);

      const innerGrid = document.createElement("div");
      innerGrid.className = "product-grid";

      subProducts.forEach(function (produk) {
        innerGrid.appendChild(createProductCard(produk));
      });

      section.appendChild(header);
      section.appendChild(innerGrid);
      productGrid.appendChild(section);

      if (categoryCount) {
        categoryCount.textContent = "Menampilkan " + subProducts.length + " produk pilihan (" + (activeGroup ? activeGroup.label : "") + ")";
      }
      return;
    }

    // KASUS DEFAULT / 'SEMUA' DI BUDIDAYA MODERN & KATEGORI LAIN:
    // Tampilkan KESELURUHAN PRODUK TANPA PENGELOMPOKAN dalam satu grid mengalir alami
    productGrid.classList.remove("product-grid-grouped");

    if (categoryCount) {
      categoryCount.textContent = "Menampilkan " + list.length + " produk pilihan";
    }

    list.forEach(function (produk) {
      productGrid.appendChild(createProductCard(produk));
    });
  }

  // ---------- 11. FILTER, PENCARIAN & PENGURUTAN HARGA/DISKON ----------

  let currentCategorySort = "default";
  let currentSearchSort = "default";

  function parsePriceToNumber(hargaStr) {
    return Number(String(hargaStr || "").replace(/[^0-9]/g, "")) || 0;
  }

  function parseDiscountToNumber(diskonStr) {
    return Number(String(diskonStr || "").replace(/[^0-9]/g, "")) || 0;
  }

  function sortProductsList(list, sortMode) {
    if (!Array.isArray(list) || !sortMode || sortMode === "default") {
      return list;
    }
    const copy = list.slice();
    copy.sort(function (a, b) {
      if (sortMode === "price-asc") {
        return parsePriceToNumber(a.harga) - parsePriceToNumber(b.harga);
      }
      if (sortMode === "price-desc") {
        return parsePriceToNumber(b.harga) - parsePriceToNumber(a.harga);
      }
      if (sortMode === "discount-desc") {
        const diff = parseDiscountToNumber(b.diskon) - parseDiscountToNumber(a.diskon);
        if (diff !== 0) return diff;
        return parsePriceToNumber(a.harga) - parsePriceToNumber(b.harga);
      }
      if (sortMode === "popular") {
        const clickDiff = getProductClickCount(b.id) - getProductClickCount(a.id);
        if (clickDiff !== 0) return clickDiff;
        const featDiff = (featuredDefaultOrder[b.id] || 0) - (featuredDefaultOrder[a.id] || 0);
        if (featDiff !== 0) return featDiff;
        return parseDiscountToNumber(b.diskon) - parseDiscountToNumber(a.diskon);
      }
      return 0;
    });
    return copy;
  }

  function getFilteredProducts() {
    const keyword = currentKeyword.trim().toLowerCase();

    const filtered = products.filter(function (produk) {
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

    return sortProductsList(filtered, currentCategorySort);
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

  // ---------- 12. NAVIGASI HALAMAN (BERANDA, KATEGORI & SEARCH INTERFACE) ----------

  let activeSearchChip = { type: "cat", value: "semua" };

  function showSearchToast(message) {
    if (!searchToast) return;
    searchToast.textContent = message;
    searchToast.classList.remove("hidden");
    setTimeout(function () {
      searchToast.classList.add("hidden");
    }, 2800);
  }

  /**
   * Menggeser baris scroll horizontal secara halus & presisi ke posisi tengah
   * saat salah satu tombol kategori atau urutan harga disentuh/diaktifkan di mobile
   */
  function scrollPillToCenter(element, container) {
    if (!element) return;
    const parent = container || element.closest(
      ".category-chips-nav, .budidaya-subchips-nav, .sort-pills-scroll, .search-chips-scroll, .search-unified-sort"
    ) || element.parentElement;
    if (!parent) return;

    function executeScroll() {
      try {
        const parentWidth = parent.clientWidth;
        if (parentWidth <= 0) return;

        let elLeft = 0;
        if (element.offsetParent === parent) {
          elLeft = element.offsetLeft;
        } else {
          const parentRect = parent.getBoundingClientRect();
          const elRect = element.getBoundingClientRect();
          elLeft = (elRect.left - parentRect.left) + parent.scrollLeft;
        }

        const elWidth = element.offsetWidth || 50;
        const targetScrollLeft = elLeft - (parentWidth / 2) + (elWidth / 2);

        parent.scrollTo({
          left: Math.max(0, Math.round(targetScrollLeft)),
          behavior: "smooth"
        });
      } catch (e) {
        try {
          element.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
        } catch (err) {}
      }
    }

    // Jalankan segera dan jadwalkan ulang dalam 40ms untuk menjamin layout stabil
    executeScroll();
    setTimeout(executeScroll, 40);
  }

  function openCategory(categoryId, categoryName) {
    const isAlreadyInCategory = categoryView && !categoryView.classList.contains("hidden");

    currentCategory = categoryId;
    currentKeyword = searchInputCategory ? searchInputCategory.value : "";

    const bannerInfo = categoryBanners[categoryId] || categoryBanners["semua"];
    if (categoryBannerImg) {
      categoryBannerImg.src = bannerInfo.bg;
      categoryBannerImg.alt = bannerInfo.title;
    }
    if (categoryBannerTag) {
      categoryBannerTag.textContent = bannerInfo.tag;
    }
    if (categoryTitle) {
      categoryTitle.textContent = categoryName || bannerInfo.title;
    }
    if (categoryHeaderDesc) {
      categoryHeaderDesc.textContent = bannerInfo.deskripsi;
    }

    // 1. Tampilkan categoryView terlebih dahulu agar kontainer dan chip memiliki dimensi (clientWidth > 0)
    if (homeView) homeView.classList.add("hidden");
    if (searchView) searchView.classList.add("hidden");
    if (aboutView) aboutView.classList.add("hidden");
    if (vipPromoView) vipPromoView.classList.add("hidden");
    if (categoryView) categoryView.classList.remove("hidden");

    if (aboutSlideTimer) {
      clearInterval(aboutSlideTimer);
      aboutSlideTimer = null;
    }

    document.body.classList.remove("search-active");
    document.body.classList.add("category-active");
    const floatingBellEl = document.getElementById("notifFloatingBell");
    if (floatingBellEl) floatingBellEl.classList.add("hidden");

    if (topbarSearchInterfaceRow) topbarSearchInterfaceRow.classList.add("hidden");
    if (topbarCategorySearchRow) topbarCategorySearchRow.classList.remove("hidden");
    updateHeaderOffset();

    // 2. Aktifkan & geser otomatis chip kategori yang dipilih
    if (categoryId === "Benih-Pakan-Budidaya") {
      if (categoryChipsNav) {
        categoryChipsNav.classList.add("hidden");
      }
      if (budidayaSubchipsNav) {
        budidayaSubchipsNav.classList.remove("hidden");
        currentBudidayaSub = "semua";
        const budiChips = budidayaSubchipsNav.querySelectorAll(".budi-chip-btn");
        budiChips.forEach(function (btn) {
          if (btn.getAttribute("data-sub") === "semua") {
            btn.classList.add("active");
            scrollPillToCenter(btn, budidayaSubchipsNav);
          } else {
            btn.classList.remove("active");
          }
        });
      }
    } else {
      // Kategori lainnya: tampilkan chips kategori utama & sembunyikan sub-chips budidaya
      if (categoryChipsNav) {
        categoryChipsNav.classList.remove("hidden");
        const chips = categoryChipsNav.querySelectorAll(".cat-chip-btn");
        chips.forEach(function (btn) {
          if (btn.getAttribute("data-cat") === categoryId) {
            btn.classList.add("active");
            scrollPillToCenter(btn, categoryChipsNav);
          } else {
            btn.classList.remove("active");
          }
        });
      }
      if (budidayaSubchipsNav) {
        budidayaSubchipsNav.classList.add("hidden");
        currentBudidayaSub = "semua";
      }
    }

    if (filterSelect) {
      filterSelect.value = categoryId;
    }

    refreshProductView();
    setActiveBottomNav("tab-katalog");

    // Hanya reset posisi layar ke atas jika berpindah dari halaman lain
    if (!isAlreadyInCategory) {
      window.scrollTo(0, 0);
    }
  }

  function goHome() {
    document.body.classList.remove("search-active");
    document.body.classList.remove("category-active");
    currentCategory = "semua";
    currentKeyword = "";
    currentBudidayaSub = "semua";
    if (categoryChipsNav) {
      categoryChipsNav.classList.remove("hidden");
    }
    if (budidayaSubchipsNav) {
      budidayaSubchipsNav.classList.add("hidden");
    }
    if (searchInput) searchInput.value = "";
    if (searchInputCategory) searchInputCategory.value = "";

    if (categoryView) categoryView.classList.add("hidden");
    if (searchView) searchView.classList.add("hidden");
    if (aboutView) aboutView.classList.add("hidden");
    if (vipPromoView) vipPromoView.classList.add("hidden");
    if (homeView) homeView.classList.remove("hidden");

    if (aboutSlideTimer) {
      clearInterval(aboutSlideTimer);
      aboutSlideTimer = null;
    }

    if (topbarSearchInterfaceRow) topbarSearchInterfaceRow.classList.add("hidden");
    if (topbarCategorySearchRow) topbarCategorySearchRow.classList.add("hidden");
    updateHeaderOffset();

    // Re-evaluasi lonceng di beranda
    if (typeof checkCatalogBellFast === "function") {
      checkCatalogBellFast();
    }

    setActiveBottomNav("tab-home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openAboutView() {
    document.body.classList.remove("search-active");
    document.body.classList.add("category-active");
    const floatingBellEl = document.getElementById("notifFloatingBell");
    if (floatingBellEl) floatingBellEl.classList.add("hidden");
    updateAboutStats();
    if (homeView) homeView.classList.add("hidden");
    if (categoryView) categoryView.classList.add("hidden");
    if (searchView) searchView.classList.add("hidden");
    if (vipPromoView) vipPromoView.classList.add("hidden");
    if (aboutView) aboutView.classList.remove("hidden");

    if (topbarSearchInterfaceRow) topbarSearchInterfaceRow.classList.add("hidden");
    if (topbarCategorySearchRow) topbarCategorySearchRow.classList.add("hidden");
    updateHeaderOffset();

    initAboutSlider();
    setActiveBottomNav("tab-about");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ---------- SISTEM HALAMAN EKSKLUSIF PROMO VIP & VOUCHER DISKON ----------

  function renderVipPromoProducts() {
    const vipGrid = document.getElementById("vipProductsGrid");
    if (!vipGrid) return;
    vipGrid.innerHTML = "";

    if (!Array.isArray(products) || products.length === 0) {
      vipGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 24px;">Memuat produk promo...</p>';
      return;
    }

    // Ambil produk aktif yang memiliki diskon, diurutkan dari diskon terbesar
    const promoList = products.filter(function (p) {
      return p.aktif !== false;
    }).sort(function (a, b) {
      const discA = parseDiscountToNumber(a.diskon);
      const discB = parseDiscountToNumber(b.diskon);
      if (discB !== discA) return discB - discA;
      return parsePriceToNumber(a.harga) - parsePriceToNumber(b.harga);
    }).slice(0, 8);

    if (promoList.length === 0) {
      vipGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 24px;">Belum ada produk promo diskon saat ini.</p>';
      return;
    }

    promoList.forEach(function (p) {
      vipGrid.appendChild(createProductCard(p));
    });
  }

  function openVipPromoView() {
    document.body.classList.remove("search-active");
    document.body.classList.add("category-active");
    const floatingBellEl = document.getElementById("notifFloatingBell");
    if (floatingBellEl) floatingBellEl.classList.add("hidden");

    if (homeView) homeView.classList.add("hidden");
    if (categoryView) categoryView.classList.add("hidden");
    if (searchView) searchView.classList.add("hidden");
    if (aboutView) aboutView.classList.add("hidden");
    if (vipPromoView) vipPromoView.classList.remove("hidden");

    if (aboutSlideTimer) {
      clearInterval(aboutSlideTimer);
      aboutSlideTimer = null;
    }

    if (topbarSearchInterfaceRow) topbarSearchInterfaceRow.classList.add("hidden");
    if (topbarCategorySearchRow) topbarCategorySearchRow.classList.add("hidden");
    updateHeaderOffset();

    renderVipPromoProducts();
    setActiveBottomNav("tab-promo");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function initVipPromoFromBanners(bannerRows) {
    let vipRow = null;
    if (Array.isArray(bannerRows)) {
      vipRow = bannerRows.find(function (b) { return b.tipe === "vip_promo"; });
    }

    // Fallback ke cache localStorage jika offline atau belum tersinkron
    if (!vipRow) {
      try {
        const cached = localStorage.getItem("aquaagri_vip_promo_data");
        if (cached) vipRow = JSON.parse(cached);
      } catch (e) {}
    }

    if (!vipRow) return;

    // Simpan ke cache lokal
    try {
      localStorage.setItem("aquaagri_vip_promo_data", JSON.stringify(vipRow));
    } catch (e) {}

    let meta = {
      desc: "Nikmati potongan harga spesial mitra resmi Shopee Indonesia, voucher diskon belanja, dan katalog harga promo terbatas untuk produk perikanan & budidaya pilihan.",
      voucherDiscount: "50% OFF",
      voucherTitle: "Voucher Diskon Spesial Shopee",
      voucherDesc: "Khusus transaksi via tautan resmi toko Shopee AquaAgri. Ambil voucher sekarang sebelum kuota diskon habis!",
      voucherCode: "KODE: VIPAQUA",
      shopeeUrl: "https://shopee.co.id",
      shopeeBtnText: "Klaim Voucher di Shopee 🛒"
    };

    if (vipRow.subjudul) {
      try {
        const parsed = JSON.parse(vipRow.subjudul);
        if (parsed && typeof parsed === "object") {
          meta = Object.assign(meta, parsed);
        }
      } catch (e) {
        if (typeof vipRow.subjudul === "string" && vipRow.subjudul.length > 0) {
          meta.desc = vipRow.subjudul;
        }
      }
    }

    const heroTitleEl = document.getElementById("vipPromoHeroTitle");
    const heroDescEl = document.getElementById("vipPromoHeroDesc");
    const ticketDiscEl = document.getElementById("vipTicketDiscount");
    const ticketCodeEl = document.getElementById("vipTicketCode");
    const ticketTitleEl = document.getElementById("vipTicketTitle");
    const ticketDescEl = document.getElementById("vipTicketDesc");
    const ticketClaimBtn = document.getElementById("vipTicketClaimBtn");
    const ticketBtnText = document.getElementById("vipTicketBtnText");
    const bannerCard = document.getElementById("vipPromoBannerCard");
    const bannerImg = document.getElementById("vipPromoBannerImg");

    if (heroTitleEl) heroTitleEl.textContent = vipRow.judul || "Voucher Diskon & Promo Eksklusif";
    if (heroDescEl) heroDescEl.textContent = meta.desc || "";
    if (ticketDiscEl) ticketDiscEl.textContent = meta.voucherDiscount || "50% OFF";
    if (ticketCodeEl) ticketCodeEl.textContent = meta.voucherCode || "KODE: VIPAQUA";
    if (ticketTitleEl) ticketTitleEl.textContent = meta.voucherTitle || "Voucher Diskon Spesial Shopee";
    if (ticketDescEl) ticketDescEl.textContent = meta.voucherDesc || "";

    const targetShopeeUrl = meta.shopeeUrl || vipRow.link_tujuan || "https://shopee.co.id";
    if (ticketClaimBtn) {
      ticketClaimBtn.href = targetShopeeUrl;
    }
    if (ticketBtnText) {
      ticketBtnText.textContent = meta.shopeeBtnText || "Klaim Voucher di Shopee 🛒";
    }

    if (vipRow.gambar && vipRow.gambar.trim().length > 0) {
      if (bannerCard) bannerCard.classList.remove("hidden");
      if (bannerImg) {
        bannerImg.src = vipRow.gambar.trim();
        bannerImg.alt = vipRow.judul || "Banner Promo VIP";
      }
    } else {
      if (bannerCard) bannerCard.classList.add("hidden");
    }
  }

  function setActiveBottomNav(tabId) {
    const navItems = document.querySelectorAll(".bottom-nav-item");
    if (!navItems || navItems.length === 0) return;
    navItems.forEach(function (item) {
      if (item.getAttribute("data-tab") === tabId) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  }

  // ---------- SISTEM SLIDE FOTO OTOMATIS: HALAMAN KOMITMEN KAMI (DINAMIS & REALTIME) ----------
  function escapeHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  const DEFAULT_ABOUT_DOCS = [
    {
      badge: "Edukasi Riset BBPBL Lampung",
      judul: "Sinergi Edukasi Riset di BBPBL Lampung",
      subjudul: "Studi lapangan dan alih teknologi budidaya laut modern bersama Balai Besar Perikanan Budidaya Laut.",
      gambar: "kegiatan-di-balai-besar-perikanan-budidaya-laut-lampung.jpg",
      urutan: 1,
      aktif: true
    },
    {
      badge: "Sinergi Kemitraan Komunitas",
      judul: "Komitmen Resmi Kemitraan Petambak",
      subjudul: "Kerja sama pembinaan kelompok perikanan dan generasi muda demi rantai pasok yang adil dan transparan.",
      gambar: "assets/kegiatan-sosial/kegiatan-kemitraan-maninjau.jpg",
      urutan: 2,
      aktif: true
    },
    {
      badge: "Budidaya Ikan Unggul",
      judul: "Pengembangan Budidaya Modern",
      subjudul: "Teknologi kolam dan pakan teruji menghasilkan ikan sehat, bermutu tinggi, dan berdaya saing kuat.",
      gambar: "poto-pembudidaya.jpg",
      urutan: 3,
      aktif: true
    },
    {
      badge: "Panen Keramba Apung",
      judul: "Ketekunan Petambak Keramba Apung",
      subjudul: "Bermitra langsung menjaga kelestarian keramba apung serta mutu panen sehat dan berkelanjutan.",
      gambar: "poto-petambak.jpg",
      urutan: 4,
      aktif: true
    },
    {
      badge: "Tangkapan Laut Cold-Chain",
      judul: "Standar Kesegaran Tangkapan Nelayan",
      subjudul: "Sistem rantai dingin higienis menjaga nutrisi prima dan kesegaran alami laut hingga ke meja Anda.",
      gambar: "ikan-segar.jpg",
      urutan: 5,
      aktif: true
    },
    {
      badge: "Olahan Ikan Bergizi UMKM",
      judul: "Dukungan UMKM Olahan Pesisir",
      subjudul: "Mendukung UMKM lokal menghasilkan olahan ikan bersih, lezat, dan bebas bahan kimia berbahaya.",
      gambar: "produk-olahan-ikan.jpg",
      urutan: 6,
      aktif: true
    },
    {
      badge: "Sahabat Sportfishing",
      judul: "Dukungan Penuh Pecinta Bahari",
      subjudul: "Menyediakan piranti pancing berkualitas teruji dengan semangat sportfishing yang bertanggung jawab.",
      gambar: "poto-pemancing-1.jpg",
      urutan: 7,
      aktif: true
    },
    {
      badge: "Kelestarian Ekosistem Bahari",
      judul: "Harmoni Perairan Nusantara",
      subjudul: "Menghubungkan rantai pasok kelautan Indonesia dengan integritas, transparansi, dan cinta kelestarian.",
      gambar: "banner-bahari-real.jpg",
      urutan: 8,
      aktif: true
    }
  ];

  let aboutSlideIndex = 0;
  let aboutSlideTimer = null;
  let isAboutSlidePaused = false;
  let isAboutSliderDragging = false;
  let isAboutSliderEventsBound = false;

  function goToAboutSlide(index) {
    const track = document.getElementById("aboutSliderTrack");
    const dotsWrap = document.getElementById("aboutSliderDots");
    if (!track) return;
    const slides = track.querySelectorAll(".about-slide");
    const total = slides.length;
    if (total === 0) return;

    if (index >= total) index = 0;
    if (index < 0) index = total - 1;
    aboutSlideIndex = index;

    track.style.transition = "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)";
    track.style.transform = "translateX(-" + (aboutSlideIndex * 100) + "%)";

    slides.forEach(function (slide, i) {
      if (i === aboutSlideIndex) {
        slide.classList.add("active");
      } else {
        slide.classList.remove("active");
      }
    });

    if (dotsWrap) {
      const dots = dotsWrap.querySelectorAll(".about-slide-dot");
      dots.forEach(function (dot, i) {
        if (i === aboutSlideIndex) {
          dot.classList.add("active");
        } else {
          dot.classList.remove("active");
        }
      });
    }
  }

  function nextAboutSlide() {
    goToAboutSlide(aboutSlideIndex + 1);
  }

  function prevAboutSlide() {
    goToAboutSlide(aboutSlideIndex - 1);
  }

  function startAboutSlideTimer() {
    stopAboutSlideTimer();
    const aboutViewEl = document.getElementById("aboutView");
    if (aboutViewEl && aboutViewEl.classList.contains("hidden")) return;

    aboutSlideTimer = setInterval(function () {
      if (!isAboutSlidePaused && !isAboutSliderDragging) {
        nextAboutSlide();
      }
    }, 3500); // Bergeser otomatis setiap 3,5 detik secara halus
  }

  function stopAboutSlideTimer() {
    if (aboutSlideTimer) {
      clearInterval(aboutSlideTimer);
      aboutSlideTimer = null;
    }
  }

  function bindAboutSliderInteractions() {
    const sliderBox = document.getElementById("aboutSliderBox");
    const track = document.getElementById("aboutSliderTrack");
    const prevBtn = document.getElementById("aboutSlidePrevBtn");
    const nextBtn = document.getElementById("aboutSlideNextBtn");
    const dotsWrap = document.getElementById("aboutSliderDots");

    if (!sliderBox || !track || isAboutSliderEventsBound) return;

    if (prevBtn) {
      prevBtn.addEventListener("click", function (e) {
        e.preventDefault();
        prevAboutSlide();
        startAboutSlideTimer();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", function (e) {
        e.preventDefault();
        nextAboutSlide();
        startAboutSlideTimer();
      });
    }

    if (dotsWrap) {
      dotsWrap.addEventListener("click", function (e) {
        const dot = e.target.closest(".about-slide-dot");
        if (!dot) return;
        const idx = parseInt(dot.getAttribute("data-index"), 10);
        if (!isNaN(idx)) {
          goToAboutSlide(idx);
          startAboutSlideTimer();
        }
      });
    }

    sliderBox.addEventListener("mouseenter", function () {
      isAboutSlidePaused = true;
    });
    sliderBox.addEventListener("mouseleave", function () {
      isAboutSlidePaused = false;
    });

    // Touch Swipe Gestures untuk Layar Sentuh HP (Android & iPhone)
    let touchStartX = 0;
    let touchStartY = 0;
    let touchDeltaX = 0;
    let isHorizontalGesture = false;

    sliderBox.addEventListener("touchstart", function (e) {
      if (!e.touches || e.touches.length === 0) return;
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchDeltaX = 0;
      isHorizontalGesture = false;
      isAboutSliderDragging = true;
      isAboutSlidePaused = true;
      stopAboutSlideTimer();
    }, { passive: true });

    sliderBox.addEventListener("touchmove", function (e) {
      if (!isAboutSliderDragging || !e.touches || e.touches.length === 0) return;
      const currentX = e.touches[0].clientX;
      const currentY = e.touches[0].clientY;
      const dx = currentX - touchStartX;
      const dy = currentY - touchStartY;

      if (!isHorizontalGesture) {
        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 7) {
          isHorizontalGesture = true;
        } else if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 7) {
          isAboutSliderDragging = false;
          return;
        }
      }

      if (isHorizontalGesture) {
        touchDeltaX = dx;
        const boxWidth = sliderBox.offsetWidth || 350;
        const percentOffset = (touchDeltaX / boxWidth) * 100;
        track.style.transition = "none";
        track.style.transform = "translateX(calc(-" + (aboutSlideIndex * 100) + "% + " + percentOffset + "%))";
      }
    }, { passive: true });

    function onTouchEnd() {
      if (!isAboutSliderDragging) return;
      isAboutSliderDragging = false;

      const boxWidth = sliderBox.offsetWidth || 350;
      const threshold = Math.max(35, boxWidth * 0.12);

      if (isHorizontalGesture && touchDeltaX < -threshold) {
        nextAboutSlide();
      } else if (isHorizontalGesture && touchDeltaX > threshold) {
        prevAboutSlide();
      } else {
        goToAboutSlide(aboutSlideIndex);
      }

      touchDeltaX = 0;
      isHorizontalGesture = false;
      setTimeout(function () {
        isAboutSlidePaused = false;
        startAboutSlideTimer();
      }, 1200);
    }

    sliderBox.addEventListener("touchend", onTouchEnd, { passive: true });
    sliderBox.addEventListener("touchcancel", onTouchEnd, { passive: true });

    // Mouse Drag Gestures untuk Komputer / Desktop
    let mouseStartX = 0;
    let mouseDeltaX = 0;
    let isMouseDown = false;

    sliderBox.addEventListener("mousedown", function (e) {
      if (e.target.closest("#aboutSlidePrevBtn, #aboutSlideNextBtn, .about-slide-dot")) return;
      isMouseDown = true;
      mouseStartX = e.clientX;
      mouseDeltaX = 0;
      stopAboutSlideTimer();
      sliderBox.style.cursor = "grabbing";
    });

    window.addEventListener("mousemove", function (e) {
      if (!isMouseDown) return;
      mouseDeltaX = e.clientX - mouseStartX;
      if (Math.abs(mouseDeltaX) > 4) {
        const boxWidth = sliderBox.offsetWidth || 350;
        const percentOffset = (mouseDeltaX / boxWidth) * 100;
        track.style.transition = "none";
        track.style.transform = "translateX(calc(-" + (aboutSlideIndex * 100) + "% + " + percentOffset + "%))";
      }
    });

    window.addEventListener("mouseup", function () {
      if (!isMouseDown) return;
      isMouseDown = false;
      sliderBox.style.cursor = "";

      const boxWidth = sliderBox.offsetWidth || 350;
      const threshold = Math.max(35, boxWidth * 0.12);

      if (mouseDeltaX < -threshold) {
        nextAboutSlide();
      } else if (mouseDeltaX > threshold) {
        prevAboutSlide();
      } else {
        goToAboutSlide(aboutSlideIndex);
      }
      mouseDeltaX = 0;
      setTimeout(function () {
        startAboutSlideTimer();
      }, 1200);
    });

    isAboutSliderEventsBound = true;
  }

  function initAboutSlider() {
    bindAboutSliderInteractions();
    goToAboutSlide(aboutSlideIndex);
    startAboutSlideTimer();
  }

  function renderDynamicAboutSlider(docsList) {
    const track = document.getElementById("aboutSliderTrack");
    const dotsWrap = document.getElementById("aboutSliderDots");
    if (!track) return;

    const list = Array.isArray(docsList) && docsList.length > 0
      ? docsList.filter(function (d) { return d.aktif !== false && d.gambar; })
      : DEFAULT_ABOUT_DOCS;

    if (list.length === 0) return;

    let trackHtml = "";
    let dotsHtml = "";

    list.forEach(function (doc, idx) {
      const badge = doc.link_tujuan || doc.badge || "Komitmen Bahari";
      const title = doc.judul || "Dokumentasi Dedikasi";
      const desc = doc.subjudul || "";
      const img = doc.gambar || "kegiatan-di-balai-besar-perikanan-budidaya-laut-lampung.jpg";
      const activeCls = idx === 0 ? " active" : "";

      trackHtml += `
        <div class="about-slide${activeCls}">
          <div class="about-slide-img-box">
            <span class="about-slide-badge">${escapeHtml(badge)}</span>
            <img src="${escapeHtml(img)}" alt="${escapeHtml(title)}" class="about-slide-img" loading="${idx === 0 ? "eager" : "lazy"}" draggable="false">
          </div>
          <div class="about-slide-body">
            <h4 class="about-slide-title">${escapeHtml(title)}</h4>
            <p class="about-slide-desc">${escapeHtml(desc)}</p>
          </div>
        </div>
      `;

      dotsHtml += `<button class="about-slide-dot${activeCls}" data-index="${idx}" aria-label="Slide ${idx + 1}"></button>`;
    });

    track.innerHTML = trackHtml;
    if (dotsWrap) dotsWrap.innerHTML = dotsHtml;

    initAboutSlider();
  }

  function initAboutDocsFromBanners(bannerRows) {
    let docs = [];

    if (Array.isArray(bannerRows) && bannerRows.length > 0) {
      const fromDb = bannerRows.filter(function (b) { return b.tipe === "about_doc" && b.aktif !== false; });
      if (fromDb.length > 0) {
        docs = fromDb;
        try {
          localStorage.setItem("aquaagri_about_docs_data", JSON.stringify(fromDb));
        } catch (e) {}
      }
    }

    if (docs.length === 0) {
      try {
        const cached = localStorage.getItem("aquaagri_about_docs_data");
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) {
            docs = parsed;
          }
        }
      } catch (e) {}
    }

    if (docs.length === 0) {
      docs = DEFAULT_ABOUT_DOCS;
    }

    docs.sort(function (a, b) {
      return (Number(a.urutan) || 0) - (Number(b.urutan) || 0);
    });

    renderDynamicAboutSlider(docs);
  }

  // ---------- SISTEM RIWAYAT PENCARIAN TERAKHIR (RECENT SEARCHES) ----------
  const RECENT_SEARCH_KEY = "aquaagri_recent_searches";
  const searchRecentWrap = document.getElementById("searchRecentWrap");
  const searchRecentChips = document.getElementById("searchRecentChips");
  const searchClearHistoryBtn = document.getElementById("searchClearHistoryBtn");

  function getRecentSearches() {
    try {
      const data = localStorage.getItem(RECENT_SEARCH_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  function saveRecentSearches(list) {
    try {
      localStorage.setItem(RECENT_SEARCH_KEY, JSON.stringify(list));
    } catch (e) {}
  }

  function addRecentSearch(keyword) {
    const clean = String(keyword || "").trim();
    if (!clean || clean.length < 2) return;
    let list = getRecentSearches().filter(function (item) {
      return item.toLowerCase() !== clean.toLowerCase();
    });
    list.unshift(clean);
    if (list.length > 5) list = list.slice(0, 5);
    saveRecentSearches(list);
    renderRecentSearches();
  }

  function removeRecentSearch(keyword) {
    let list = getRecentSearches().filter(function (item) {
      return item.toLowerCase() !== keyword.toLowerCase();
    });
    saveRecentSearches(list);
    renderRecentSearches();
  }

  function renderRecentSearches() {
    if (!searchRecentWrap || !searchRecentChips) return;
    const list = getRecentSearches();
    if (!list || list.length === 0) {
      searchRecentWrap.classList.add("hidden");
      searchRecentChips.innerHTML = "";
      return;
    }

    searchRecentChips.innerHTML = "";
    list.forEach(function (kw) {
      const chipBtn = document.createElement("button");
      chipBtn.type = "button";
      chipBtn.className = "recent-chip-btn";
      chipBtn.innerHTML = `<span>${kw}</span><span class="recent-chip-remove" title="Hapus">✕</span>`;

      chipBtn.addEventListener("click", function (e) {
        if (e.target && e.target.classList.contains("recent-chip-remove")) {
          e.stopPropagation();
          removeRecentSearch(kw);
          return;
        }
        if (searchInterfaceInput) {
          searchInterfaceInput.value = kw;
        }
        addRecentSearch(kw);
        renderSearchInterfaceProducts();
      });

      searchRecentChips.appendChild(chipBtn);
    });

    searchRecentWrap.classList.remove("hidden");
  }

  if (searchClearHistoryBtn) {
    searchClearHistoryBtn.addEventListener("click", function () {
      saveRecentSearches([]);
      renderRecentSearches();
    });
  }

  // ---------- 13. LOGIKA MOBILE SEARCH INTERFACE (MEGA BAR & CHIPS) ----------

  function openSearchInterface(initialKeyword = "") {
    document.body.classList.add("search-active");
    if (homeView) homeView.classList.add("hidden");
    if (categoryView) categoryView.classList.add("hidden");
    if (aboutView) aboutView.classList.add("hidden");
    if (vipPromoView) vipPromoView.classList.add("hidden");
    if (searchView) searchView.classList.remove("hidden");

    if (aboutSlideTimer) {
      clearInterval(aboutSlideTimer);
      aboutSlideTimer = null;
    }

    if (topbarCategorySearchRow) topbarCategorySearchRow.classList.add("hidden");
    if (topbarSearchInterfaceRow) topbarSearchInterfaceRow.classList.remove("hidden");
    updateHeaderOffset();

    const searchSortPillsEl = document.getElementById("searchSortPills");
    if (searchSortPillsEl) {
      const searchSortBtns = searchSortPillsEl.querySelectorAll(".sort-pill-btn");
      searchSortBtns.forEach(function (b) {
        if (b.getAttribute("data-sort") === currentSearchSort) {
          b.classList.add("active");
        } else {
          b.classList.remove("active");
        }
      });
    }

    if (searchInterfaceInput) {
      searchInterfaceInput.value = initialKeyword;
      setTimeout(function () {
        searchInterfaceInput.focus();
      }, 50);
    }

    renderRecentSearches();
    renderSearchInterfaceProducts();
    setActiveBottomNav("tab-search");
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  function closeSearchInterface() {
    document.body.classList.remove("search-active");
    if (searchView) searchView.classList.add("hidden");
    if (aboutView) aboutView.classList.add("hidden");
    if (vipPromoView) vipPromoView.classList.add("hidden");
    if (homeView) homeView.classList.remove("hidden");

    if (topbarSearchInterfaceRow) topbarSearchInterfaceRow.classList.add("hidden");
    if (topbarCategorySearchRow) topbarCategorySearchRow.classList.add("hidden");
    updateHeaderOffset();

    setActiveBottomNav("tab-home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function getSearchFilteredProducts() {
    const query = searchInterfaceInput ? searchInterfaceInput.value.trim().toLowerCase() : "";

    const filtered = products.filter(function (p) {
      // 1. Cek filter dari activeSearchChip
      if (activeSearchChip.type === "cat" && activeSearchChip.value !== "semua") {
        if (p.kategori !== activeSearchChip.value) return false;
      } else if (activeSearchChip.type === "kw") {
        const kw = activeSearchChip.value.toLowerCase();
        const matchChip = p.nama.toLowerCase().includes(kw) || p.deskripsi.toLowerCase().includes(kw);
        if (!matchChip) return false;
      }

      // 2. Cek text input query
      if (query) {
        const catName = getCategoryName(p.kategori).toLowerCase();
        const matchQuery = p.nama.toLowerCase().includes(query) ||
                           p.deskripsi.toLowerCase().includes(query) ||
                           catName.includes(query);
        if (!matchQuery) return false;
      }

      return true;
    });

    return sortProductsList(filtered, currentSearchSort);
  }

  function renderSearchInterfaceProducts() {
    if (!searchProductGrid) return;
    searchProductGrid.innerHTML = "";

    const list = getSearchFilteredProducts();

    if (searchResultCount) {
      searchResultCount.textContent = list.length + " Produk";
    }

    if (searchClearBtn) {
      const q = searchInterfaceInput ? searchInterfaceInput.value.trim() : "";
      if (q.length > 0) {
        searchClearBtn.classList.remove("hidden");
      } else {
        searchClearBtn.classList.add("hidden");
      }
    }

    if (list.length === 0) {
      if (searchEmptyState) searchEmptyState.classList.remove("hidden");
      return;
    }

    if (searchEmptyState) searchEmptyState.classList.add("hidden");

    list.forEach(function (produk) {
      searchProductGrid.appendChild(createProductCard(produk));
    });
  }

  // ---------- 14. EVENT LISTENERS ----------

  if (backBtn) backBtn.addEventListener("click", goHome);
  if (categoryBackNavBtn) categoryBackNavBtn.addEventListener("click", goHome);
  if (brandLogo) {
    brandLogo.addEventListener("click", goHome);
    brandLogo.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        goHome();
      }
    });
  }

  // PENCARIAN DARI BERANDA: Langsung membuka Search Interface tanpa jeda!
  if (homeSearchTrigger) {
    homeSearchTrigger.addEventListener("click", function () {
      openSearchInterface(searchInput ? searchInput.value : "");
    });
  }
  if (searchInput) {
    searchInput.addEventListener("focus", function () {
      openSearchInterface(searchInput.value);
    });
    searchInput.addEventListener("click", function () {
      openSearchInterface(searchInput.value);
    });
    searchInput.addEventListener("input", function () {
      openSearchInterface(searchInput.value);
    });
  }

  // Tombol kembali di search interface
  if (searchBackBtn) {
    searchBackBtn.addEventListener("click", closeSearchInterface);
  }

  // Input search interface real-time
  if (searchInterfaceInput) {
    searchInterfaceInput.addEventListener("input", function () {
      const q = searchInterfaceInput.value.trim();
      // Jika pengguna mulai mengetik kata kunci baru dan sebelumnya memilih chip spesifik,
      // reset chip aktif ke "Semua Kategori" agar pencarian menjangkau seluruh katalog dan tidak 0 produk
      if (q && activeSearchChip.value !== "semua" && searchChipsScroll) {
        const chips = searchChipsScroll.querySelectorAll(".search-chip");
        chips.forEach(function (c) { c.classList.remove("active"); });
        const allChip = searchChipsScroll.querySelector('.search-chip[data-value="semua"]');
        if (allChip) allChip.classList.add("active");
        activeSearchChip = { type: "cat", value: "semua" };
      }
      renderSearchInterfaceProducts();
    });
    searchInterfaceInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        addRecentSearch(searchInterfaceInput.value);
        renderSearchInterfaceProducts();
      }
    });
  }

  // Tombol hapus (clear) di search interface
  if (searchClearBtn) {
    searchClearBtn.addEventListener("click", function () {
      if (searchInterfaceInput) {
        searchInterfaceInput.value = "";
        searchInterfaceInput.focus();
        renderSearchInterfaceProducts();
      }
    });
  }

  // Tombol submit search
  if (searchSubmitBtn) {
    searchSubmitBtn.addEventListener("click", function () {
      if (searchInterfaceInput) {
        addRecentSearch(searchInterfaceInput.value);
      }
      renderSearchInterfaceProducts();
    });
  }

  // Chips di search interface (horizontal scrollable dengan auto-center)
  if (searchChipsScroll) {
    const chips = searchChipsScroll.querySelectorAll(".search-chip");
    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        chips.forEach(function (c) { c.classList.remove("active"); });
        chip.classList.add("active");
        const type = chip.getAttribute("data-type");
        const val = chip.getAttribute("data-value");
        activeSearchChip = { type: type, value: val };
        scrollPillToCenter(chip, searchChipsScroll);
        renderSearchInterfaceProducts();
      });
    });
  }

  // Kamera Search Pintar (Analisis Nama File + Profil Visual Warna & Tekstur HTML5 Canvas)
  function analyzeCameraImageForSearch(file) {
    return new Promise(function (resolve) {
      const rawName = (file && file.name ? file.name : "").toLowerCase();
      // 1. Cek kecocokan langsung dengan nama gambar produk di katalog
      const exactImgMatch = products.find(function (p) {
        const base = (p.gambar || "").split("/").pop().toLowerCase().replace(/\.[a-z0-9]+$/, "");
        const cleanFile = rawName.replace(/\.[a-z0-9]+$/, "");
        return base && cleanFile && (cleanFile.includes(base) || base.includes(cleanFile));
      });
      if (exactImgMatch) {
        resolve({ keyword: exactImgMatch.nama.split(" ").slice(0, 2).join(" "), label: exactImgMatch.nama });
        return;
      }

      // 2. Cek kata kunci spesifik perikanan pada nama file foto
      const knownKeywords = [
        "abon", "kerupuk", "sambal", "roa", "pempek", "baso", "bakso", "siomay", "otak", "dimsum",
        "basreng", "scallop", "chikuwa", "bandeng", "salmon", "udang", "kepiting", "kakap", "cumi",
        "lobster", "kerang", "dori", "dory", "tuna", "gurame", "barakuda", "bawal", "gurita", "octopus",
        "patin", "kuwe", "layang", "tiram", "oyster", "baronang", "joran", "reel", "senar", "tali",
        "umpan", "lure", "minnow", "popper", "kail", "hook", "pelampung", "essen", "siraman", "timah",
        "tas", "stopper", "box", "jersey", "topi", "aerator", "jaring", "waring", "pelet", "pakan",
        "benih", "bibit", "lele", "nila", "maggot", "cacing", "mesin", "aquarium", "akuarium", "kolam",
        "terpal", "diffuser", "drum", "baskom", "bakteri", "probiotik", "enzim", "molase", "mayin"
      ];
      for (let i = 0; i < knownKeywords.length; i++) {
        if (rawName.includes(knownKeywords[i])) {
          const kw = knownKeywords[i];
          const label = kw.charAt(0).toUpperCase() + kw.slice(1);
          resolve({ keyword: label, label: "Produk " + label });
          return;
        }
      }

      // 3. Analisis piksel visual (warna dominan, saturasi & kontras) menggunakan HTML5 Canvas
      const img = new Image();
      const objUrl = URL.createObjectURL(file);
      img.onload = function () {
        try {
          const canvas = document.createElement("canvas");
          const size = 64;
          canvas.width = size;
          canvas.height = size;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, size, size);
          URL.revokeObjectURL(objUrl);

          const data = ctx.getImageData(0, 0, size, size).data;
          let sumR = 0, sumG = 0, sumB = 0, sumSat = 0, edgeDiff = 0;
          const totalPixels = size * size;

          for (let p = 0; p < data.length; p += 4) {
            const r = data[p], g = data[p + 1], b = data[p + 2];
            sumR += r;
            sumG += g;
            sumB += b;
            const maxC = Math.max(r, g, b);
            const minC = Math.min(r, g, b);
            sumSat += maxC > 0 ? (maxC - minC) / maxC : 0;
            if (p >= 4) {
              edgeDiff += Math.abs(r - data[p - 4]) + Math.abs(g - data[p - 3]) + Math.abs(b - data[p - 2]);
            }
          }

          const avgR = sumR / totalPixels;
          const avgG = sumG / totalPixels;
          const avgB = sumB / totalPixels;
          const avgSat = sumSat / totalPixels;
          const avgEdge = edgeDiff / totalPixels;

          // Klasifikasi cerdas berdasarkan profil warna & kontras objek perikanan
          if (avgR > avgG + 22 && avgG > avgB + 15 && avgSat > 0.28) {
            // Warna keemasan / kecokelatan / oranye hangat -> Produk Olahan Ikan (Kerupuk, Abon, Gorengan)
            resolve({ chipType: "cat", chipValue: "produk-olahan-ikan", keyword: "", label: "Produk Olahan Ikan" });
          } else if (avgR > avgB + 28 && avgR > 135 && avgSat > 0.22) {
            // Warna kemerahan / oranye muda -> Udang, Salmon, Lobster, Kakap Merah
            resolve({ chipType: "cat", chipValue: "Ikan-Segar-Seafood", keyword: "", label: "Ikan Segar & Seafood" });
          } else if (avgB >= avgR - 8 && avgB > 95) {
            // Dominan biru / perak / nuansa laut -> Ikan Segar & Hasil Laut
            resolve({ chipType: "cat", chipValue: "Ikan-Segar-Seafood", keyword: "", label: "Ikan Segar & Hasil Laut" });
          } else if (avgG >= avgR && avgG > avgB + 10) {
            // Dominan hijau / organik / kolam -> Sarana Budidaya, Pakan & Benih
            resolve({ chipType: "cat", chipValue: "Benih-Pakan-Budidaya", keyword: "", label: "Sarana Budidaya & Pakan" });
          } else if (avgEdge > 42 || avgSat < 0.16) {
            // Kontras garis tajam atau warna metalik/gelap -> Alat Pancing & Aksesoris
            resolve({ chipType: "cat", chipValue: "Alat-Pancing", keyword: "", label: "Alat Pancing & Perlengkapan" });
          } else {
            resolve({ chipType: "cat", chipValue: "produk-olahan-ikan", keyword: "", label: "Rekomendasi Katalog" });
          }
        } catch (err) {
          URL.revokeObjectURL(objUrl);
          resolve({ keyword: "Ikan", label: "Katalog Ikan" });
        }
      };
      img.onerror = function () {
        URL.revokeObjectURL(objUrl);
        resolve({ keyword: "Ikan", label: "Katalog Ikan" });
      };
      img.src = objUrl;
    });
  }

  if (searchCameraBtn && cameraFileInput) {
    searchCameraBtn.addEventListener("click", function () {
      cameraFileInput.click();
    });
    cameraFileInput.addEventListener("change", async function () {
      if (cameraFileInput.files && cameraFileInput.files[0]) {
        const file = cameraFileInput.files[0];
        showSearchToast("Menganalisis foto produk...");
        const result = await analyzeCameraImageForSearch(file);

        if (result.chipType && result.chipValue && searchChipsScroll) {
          const chips = searchChipsScroll.querySelectorAll(".search-chip");
          chips.forEach(function (c) {
            if (c.getAttribute("data-value") === result.chipValue) {
              c.classList.add("active");
            } else {
              c.classList.remove("active");
            }
          });
          activeSearchChip = { type: result.chipType, value: result.chipValue };
        }

        if (searchInterfaceInput) {
          searchInterfaceInput.value = result.keyword !== undefined ? result.keyword : "";
        }

        renderSearchInterfaceProducts();
        showSearchToast("Hasil scan foto: Menampilkan " + (result.label || "rekomendasi produk"));
        cameraFileInput.value = "";
      }
    });
  }

  // Mikrofon Voice Search
  if (searchMicBtn) {
    searchMicBtn.addEventListener("click", function () {
      const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRec) {
        try {
          const rec = new SpeechRec();
          rec.lang = "id-ID";
          rec.start();
          showSearchToast("Mendengarkan suara... Silakan sebutkan produk");
          rec.onresult = function (event) {
            const transcript = event.results[0][0].transcript;
            if (searchInterfaceInput) {
              searchInterfaceInput.value = transcript;
              renderSearchInterfaceProducts();
            }
          };
          rec.onerror = function () {
            showSearchToast("Coba sebutkan: Abon tuna, Joran, atau Udang");
          };
        } catch (err) {
          showSearchToast("Coba sebutkan: Abon tuna, Joran, atau Udang");
        }
      } else {
        showSearchToast("Fitur suara aktif: Coba sebutkan Abon tuna atau Joran");
      }
    });
  }

  // Category view chips nav
  if (categoryChipsNav) {
    const catChips = categoryChipsNav.querySelectorAll(".cat-chip-btn");
    catChips.forEach(function (btn) {
      btn.addEventListener("click", function () {
        const catId = btn.getAttribute("data-cat");
        scrollPillToCenter(btn, categoryChipsNav);
        openCategory(catId);
      });
    });
  }

  // Sub-kategori chips khusus budidaya modern (Pakan, Benih, Alat & Aksesoris, Suplemen)
  if (budidayaSubchipsNav) {
    const budiChips = budidayaSubchipsNav.querySelectorAll(".budi-chip-btn");
    budiChips.forEach(function (btn) {
      btn.addEventListener("click", function () {
        currentBudidayaSub = btn.getAttribute("data-sub");
        budiChips.forEach(function (b) {
          b.classList.remove("active");
        });
        btn.classList.add("active");
        scrollPillToCenter(btn, budidayaSubchipsNav);
        refreshProductView();
      });
    });
  }

  // Pencarian real-time di halaman kategori
  if (searchInputCategory) {
    searchInputCategory.addEventListener("input", function () {
      currentKeyword = searchInputCategory.value;
      if (categorySearchClearBtn) {
        if (currentKeyword.trim().length > 0) {
          categorySearchClearBtn.classList.remove("hidden");
        } else {
          categorySearchClearBtn.classList.add("hidden");
        }
      }
      refreshProductView();
    });
  }

  if (categorySearchClearBtn) {
    categorySearchClearBtn.addEventListener("click", function () {
      if (searchInputCategory) {
        searchInputCategory.value = "";
        currentKeyword = "";
        categorySearchClearBtn.classList.add("hidden");
        refreshProductView();
      }
    });
  }

  // Filter dropdown kategori (fallback sinkron)
  if (filterSelect) {
    filterSelect.addEventListener("change", function () {
      openCategory(filterSelect.value);
    });
  }

  // Tombol Urutkan Produk di Halaman Kategori (Semua, Harga Termurah, Harga Tertinggi, Diskon Terbesar, Terpopuler)
  const categorySortBar = document.getElementById("categorySortBar");
  if (categorySortBar) {
    const sortBtns = categorySortBar.querySelectorAll(".sort-pill-btn");
    const sortScrollContainer = categorySortBar.querySelector(".sort-pills-scroll");
    sortBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        sortBtns.forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        currentCategorySort = btn.getAttribute("data-sort") || "default";
        scrollPillToCenter(btn, sortScrollContainer || btn.parentElement);
        refreshProductView();
      });
    });
  }

  // Tombol & Navigasi Urutkan Produk di Halaman Pencarian (Format Pil Elegan & Terpadu)
  const searchSortPills = document.getElementById("searchSortPills");
  if (searchSortPills) {
    const searchSortBtns = searchSortPills.querySelectorAll(".sort-pill-btn");
    let isSortDown = false;
    let startSortX = 0;
    let scrollSortLeft = 0;
    let hasDraggedSort = false;

    searchSortBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (hasDraggedSort) {
          return;
        }
        searchSortBtns.forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        currentSearchSort = btn.getAttribute("data-sort") || "default";
        scrollPillToCenter(btn, searchSortPills);
        renderSearchInterfaceProducts();
      });
    });

    // Dukungan geser halus dengan mouse / trackpad (drag-to-scroll)
    searchSortPills.addEventListener("mousedown", function (e) {
      isSortDown = true;
      hasDraggedSort = false;
      searchSortPills.classList.add("is-dragging");
      startSortX = e.pageX - searchSortPills.offsetLeft;
      scrollSortLeft = searchSortPills.scrollLeft;
    });
    window.addEventListener("mouseup", function () {
      if (isSortDown) {
        isSortDown = false;
        searchSortPills.classList.remove("is-dragging");
        setTimeout(function () { hasDraggedSort = false; }, 60);
      }
    });
    searchSortPills.addEventListener("mousemove", function (e) {
      if (!isSortDown) return;
      const x = e.pageX - searchSortPills.offsetLeft;
      const walk = (x - startSortX) * 1.5;
      if (Math.abs(walk) > 5) {
        hasDraggedSort = true;
      }
      e.preventDefault();
      searchSortPills.scrollLeft = scrollSortLeft - walk;
    });
  }

  // Dropdown Urutkan Produk di Halaman Pencarian (Fallback sinkronisasi jika ada)
  const searchSortSelect = document.getElementById("searchSortSelect");
  if (searchSortSelect) {
    searchSortSelect.addEventListener("change", function () {
      currentSearchSort = searchSortSelect.value || "default";
      if (searchSortPills) {
        const searchSortBtns = searchSortPills.querySelectorAll(".sort-pill-btn");
        searchSortBtns.forEach(function (b) {
          if (b.getAttribute("data-sort") === currentSearchSort) {
            b.classList.add("active");
          } else {
            b.classList.remove("active");
          }
        });
      }
      renderSearchInterfaceProducts();
    });
  }

  // ---------- 14. REDIRECT AFFILIATE SHOPEE ----------

  function openAffiliateLink(produk) {
    if (!produk || !produk.linkAffiliate) {
      showNotifToast("ℹ️ Tautan produk sedang diperbarui.");
      return;
    }
    if (produk.id) {
      recordProductClick(produk.id);
    }
    try {
      const url = new URL(produk.linkAffiliate);
      if (url.protocol !== "http:" && url.protocol !== "https:") {
        showNotifToast("ℹ️ Tautan produk tidak valid.");
        return;
      }
      window.open(url.href, "_blank", "noopener,noreferrer");
    } catch (error) {
      showNotifToast("ℹ️ Tautan produk tidak valid.");
    }
  }

  // ============================================================
  // 15. MODAL DETAIL PRODUK (DESKRIPSI LENGKAP, SHARE WA & SALIN LINK)
  // ============================================================

  const modalBackdrop = document.getElementById("modalBackdrop");
  const productDetailModal = document.getElementById("productDetailModal");
  const modalCloseBtn = document.getElementById("modalCloseBtn");
  const modalProductCategory = document.getElementById("modalProductCategory");
  const modalProductDiscount = document.getElementById("modalProductDiscount");
  const modalProductImage = document.getElementById("modalProductImage");
  const modalProductTitle = document.getElementById("modalProductTitle");
  const modalProductPrice = document.getElementById("modalProductPrice");
  const modalProductPriceCoret = document.getElementById("modalProductPriceCoret");
  const modalProductDesc = document.getElementById("modalProductDesc");
  const modalProductShopeeLink = document.getElementById("modalProductShopeeLink");
  const modalShareMainBtn = document.getElementById("modalShareMainBtn");
  const modalShareOptionsPanel = document.getElementById("modalShareOptionsPanel");
  const modalShareCopyBtn = document.getElementById("modalShareCopyBtn");
  const modalShareCopyLabel = document.getElementById("modalShareCopyLabel");
  const modalShareWaBtn = document.getElementById("modalShareWaBtn");
  const modalShareFbBtn = document.getElementById("modalShareFbBtn");
  const modalShareIgBtn = document.getElementById("modalShareIgBtn");

  function buildProductShareUrl(produk) {
    const prodId = produk && produk.id ? produk.id : 1;
    const isLocalFile = !window.location.origin || window.location.origin === "null" || window.location.protocol === "file:";
    const baseOrigin = isLocalFile
      ? "https://aquaagri-katalog-akhir.aquaagri-id.workers.dev"
      : window.location.origin;
    return baseOrigin + "/share?produk=" + encodeURIComponent(prodId);
  }

  function copyTextToClipboard(text) {
    if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      try {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }

  function openProductDetailModal(produk) {
    if (!produk || !productDetailModal || !modalBackdrop) return;

    if (produk.id) {
      recordProductClick(produk.id);
    }

    if (modalProductCategory) {
      modalProductCategory.textContent = getCategoryName(produk.kategori);
    }

    if (modalProductDiscount) {
      if (produk.diskon) {
        modalProductDiscount.textContent = produk.diskon;
        modalProductDiscount.classList.remove("hidden");
      } else {
        modalProductDiscount.classList.add("hidden");
      }
    }

    if (modalProductImage) {
      modalProductImage.src = produk.gambar || "placeholder.jpg";
      modalProductImage.alt = produk.nama || "Produk AquaAgri";
    }

    if (modalProductTitle) {
      modalProductTitle.textContent = produk.nama || "Detail Produk";
    }

    if (modalProductPrice) {
      modalProductPrice.textContent = produk.harga || "";
    }

    if (modalProductPriceCoret) {
      if (produk.hargaCoret) {
        modalProductPriceCoret.textContent = produk.hargaCoret;
        modalProductPriceCoret.classList.remove("hidden");
      } else {
        modalProductPriceCoret.classList.add("hidden");
      }
    }

    if (modalProductDesc) {
      modalProductDesc.textContent = produk.deskripsi || "Tidak ada deskripsi tersedia.";
    }

    if (modalProductShopeeLink) {
      modalProductShopeeLink.onclick = function (e) {
        e.preventDefault();
        openAffiliateLink(produk);
      };
    }

    // Reset pilihan bagikan link saat modal dibuka
    if (modalShareOptionsPanel) {
      modalShareOptionsPanel.classList.add("hidden");
    }
    if (modalShareMainBtn) {
      modalShareMainBtn.classList.remove("active");
      modalShareMainBtn.setAttribute("aria-expanded", "false");
    }
    if (modalShareCopyLabel) {
      modalShareCopyLabel.textContent = "Salin Link";
    }

    // Tombol Utama "Bagikan Link" (Buka/Tutup Pilihan Media Sosial Meta & Salin Link)
    if (modalShareMainBtn && modalShareOptionsPanel) {
      modalShareMainBtn.onclick = function (e) {
        e.preventDefault();
        const isHidden = modalShareOptionsPanel.classList.contains("hidden");
        if (isHidden) {
          modalShareOptionsPanel.classList.remove("hidden");
          modalShareMainBtn.classList.add("active");
          modalShareMainBtn.setAttribute("aria-expanded", "true");
        } else {
          modalShareOptionsPanel.classList.add("hidden");
          modalShareMainBtn.classList.remove("active");
          modalShareMainBtn.setAttribute("aria-expanded", "false");
        }
      };
    }

    // Opsi 1: Salin Link ke Clipboard
    if (modalShareCopyBtn) {
      modalShareCopyBtn.onclick = function (e) {
        e.preventDefault();
        const shareUrl = buildProductShareUrl(produk);
        copyTextToClipboard(shareUrl)
          .then(function () {
            if (modalShareCopyLabel) {
              modalShareCopyLabel.textContent = "✓ Tersalin!";
              setTimeout(function () {
                modalShareCopyLabel.textContent = "Salin Link";
              }, 2200);
            }
            showSearchToast("Link produk berhasil disalin!");
          })
          .catch(function () {
            showSearchToast("Link: " + shareUrl);
          });
      };
    }

    // Opsi 2: Bagikan ke WhatsApp (Meta)
    if (modalShareWaBtn) {
      modalShareWaBtn.onclick = function (e) {
        e.preventDefault();
        const shareUrl = buildProductShareUrl(produk);
        const discInfo = produk.diskon ? " (Diskon " + produk.diskon + ")" : "";
        const waText =
          "Cek produk *" +
          (produk.nama || "Pilihan AquaAgri") +
          "* — *" +
          (produk.harga || "") +
          "*" +
          discInfo +
          " di Katalog Resmi *aquaagri.id*:\n" +
          shareUrl;
        const waUrl = "https://wa.me/?text=" + encodeURIComponent(waText);
        window.open(waUrl, "_blank", "noopener,noreferrer");
      };
    }

    // Opsi 3: Bagikan ke Facebook (Meta)
    if (modalShareFbBtn) {
      modalShareFbBtn.onclick = function (e) {
        e.preventDefault();
        const shareUrl = buildProductShareUrl(produk);
        const fbUrl = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(shareUrl);
        window.open(fbUrl, "_blank", "noopener,noreferrer,width=600,height=500");
      };
    }

    // Opsi 4: Bagikan ke Instagram (Meta)
    if (modalShareIgBtn) {
      modalShareIgBtn.onclick = function (e) {
        e.preventDefault();
        const shareUrl = buildProductShareUrl(produk);
        copyTextToClipboard(shareUrl)
          .then(function () {
            showSearchToast("Link produk disalin! Tempel di Story / DM Instagram 📸");
            setTimeout(function () {
              window.open("https://www.instagram.com/", "_blank", "noopener,noreferrer");
            }, 600);
          })
          .catch(function () {
            window.open("https://www.instagram.com/", "_blank", "noopener,noreferrer");
          });
      };
    }

    // Tampilkan modal dengan animasi halus
    modalBackdrop.classList.remove("hidden");
    productDetailModal.classList.remove("hidden");
    // Trigger reflow untuk animasi transition css
    void productDetailModal.offsetWidth;
    modalBackdrop.classList.add("open");
    productDetailModal.classList.add("open");

    document.body.style.overflow = "hidden";
  }

  function closeProductDetailModal() {
    if (!productDetailModal || !modalBackdrop) return;

    modalBackdrop.classList.remove("open");
    productDetailModal.classList.remove("open");

    if (modalShareOptionsPanel) {
      modalShareOptionsPanel.classList.add("hidden");
    }
    if (modalShareMainBtn) {
      modalShareMainBtn.classList.remove("active");
      modalShareMainBtn.setAttribute("aria-expanded", "false");
    }

    setTimeout(function () {
      modalBackdrop.classList.add("hidden");
      productDetailModal.classList.add("hidden");
    }, 250);

    document.body.style.overflow = "";
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", closeProductDetailModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener("click", closeProductDetailModal);
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeProductDetailModal();
    }
  });

  // ============================================================
  // FITUR NAVIGASI CEPAT: CARA PESAN (4 LANGKAH MUDAH BELANJA)
  // ============================================================

  function scrollToCaraPesan() {
    // Jika sedang berada di halaman kategori, pencarian, atau tentang aquaagri, kembali ke beranda lebih dulu
    const isCategoryOpen = categoryView && !categoryView.classList.contains("hidden");
    const isSearchOpen = searchView && !searchView.classList.contains("hidden");
    const isAboutOpen = aboutView && !aboutView.classList.contains("hidden");

    if (isCategoryOpen || isSearchOpen || isAboutOpen) {
      goHome();
    }
    const section = document.getElementById("panduanBelanja");
    if (section) {
      setTimeout(function () {
        const topbar = document.getElementById("mainHeader") || document.querySelector(".topbar");
        const headerHeight = topbar ? Math.ceil(topbar.getBoundingClientRect().height) : 56;
        // Jarak aman presisi (14px) agar judul 'TRANSAKSI MUDAH & TERPERCAYA' pas tepat di bawah header dan tidak terpotong
        const clearOffset = headerHeight + 14;
        const targetPos = section.getBoundingClientRect().top + window.pageYOffset - clearOffset;
        window.scrollTo({
          top: Math.max(0, Math.round(targetPos)),
          behavior: "smooth"
        });
        section.classList.remove("highlight-pulse");
        void section.offsetWidth;
        section.classList.add("highlight-pulse");
        setTimeout(function () {
          section.classList.remove("highlight-pulse");
        }, 1800);
      }, (isCategoryOpen || isSearchOpen || isAboutOpen) ? 80 : 20);
    }
  }

  const caraPesanNavBtn = document.getElementById("caraPesanNavBtn");
  if (caraPesanNavBtn) {
    caraPesanNavBtn.addEventListener("click", scrollToCaraPesan);
  }

  const heroCaraPesanBtn = document.getElementById("heroCaraPesanBtn");
  if (heroCaraPesanBtn) {
    heroCaraPesanBtn.addEventListener("click", scrollToCaraPesan);
  }

  const heroJelajahiBtn = document.getElementById("heroJelajahiBtn");
  if (heroJelajahiBtn) {
    heroJelajahiBtn.addEventListener("click", function () {
      const searchSec = document.querySelector(".search-bar-clean");
      if (searchSec) {
        const topbar = document.getElementById("mainHeader") || document.querySelector(".topbar");
        const headerHeight = topbar ? Math.ceil(topbar.getBoundingClientRect().height) : 54;
        // Jarak aman presisi (10px) agar search bar pas tepat di bawah header dan tidak kepotong sama head
        const clearOffset = headerHeight + 10;
        const targetPos = searchSec.getBoundingClientRect().top + window.pageYOffset - clearOffset;
        window.scrollTo({
          top: Math.max(0, Math.round(targetPos)),
          behavior: "smooth"
        });
      }
    });
  }

  const viewAllProdsBtn = document.getElementById("viewAllProdsBtn");
  if (viewAllProdsBtn) {
    viewAllProdsBtn.addEventListener("click", function () {
      openCategory("semua", "Semua Produk");
    });
  }

  // Tombol Tentang AquaAgri mengarahkan ke halaman baru Komitmen Kami (aboutView)
  const aboutAquaAgriBtn = document.getElementById("aboutAquaAgriBtn");
  if (aboutAquaAgriBtn) {
    aboutAquaAgriBtn.addEventListener("click", openAboutView);
  }

  if (aboutBackBtn) {
    aboutBackBtn.addEventListener("click", goHome);
  }

  if (aboutBottomBackBtn) {
    aboutBottomBackBtn.addEventListener("click", goHome);
  }

  if (aboutExploreBtn) {
    aboutExploreBtn.addEventListener("click", function () {
      openCategory("semua", "Semua Produk");
    });
  }

  // Tombol Interaktif Halaman Promo VIP
  if (vipPromoBackBtn) {
    vipPromoBackBtn.addEventListener("click", goHome);
  }
  if (vipBottomBackBtn) {
    vipBottomBackBtn.addEventListener("click", goHome);
  }
  if (vipBottomExploreBtn) {
    vipBottomExploreBtn.addEventListener("click", function () {
      openCategory("semua", "Semua Produk");
    });
  }
  if (vipViewAllProductsBtn) {
    vipViewAllProductsBtn.addEventListener("click", function () {
      openCategory("semua", "Semua Produk");
    });
  }
  if (vipActivateNotifBtn) {
    vipActivateNotifBtn.addEventListener("click", function () {
      playAquaAgriRingtone();
      const bell = document.getElementById("notifFloatingBell");
      if (bell) {
        bell.click();
      } else {
        const promptBanner = document.getElementById("notifPushPrompt");
        if (promptBanner) promptBanner.classList.remove("hidden");
      }
      showSearchToast("🔔 Notifikasi Flash Sale VIP Diaktifkan");
    });
  }

  // ---------- 16. INISIALISASI HALAMAN AWAL & SINKRONISASI SUPABASE ----------

  function rebuildCategoryChipsAndSelect() {
    if (categoryChipsNav) {
      categoryChipsNav.innerHTML = "";
      const allBtn = document.createElement("button");
      allBtn.className = "cat-chip-btn" + (currentCategory === "semua" ? " active" : "");
      allBtn.setAttribute("data-cat", "semua");
      allBtn.type = "button";
      allBtn.textContent = "Semua";
      allBtn.addEventListener("click", function () {
        scrollPillToCenter(allBtn, categoryChipsNav);
        openCategory("semua");
      });
      categoryChipsNav.appendChild(allBtn);

      categories.forEach(function (cat) {
        const btn = document.createElement("button");
        btn.className = "cat-chip-btn" + (currentCategory === cat.id ? " active" : "");
        btn.setAttribute("data-cat", cat.id);
        btn.type = "button";
        btn.textContent = cat.nama;
        btn.addEventListener("click", function () {
          scrollPillToCenter(btn, categoryChipsNav);
          openCategory(cat.id, cat.nama);
        });
        categoryChipsNav.appendChild(btn);
      });
    }

    if (filterSelect) {
      filterSelect.innerHTML = '<option value="semua">Semua Kategori (Semua Produk)</option>';
      categories.forEach(function (cat) {
        const opt = document.createElement("option");
        opt.value = cat.id;
        opt.textContent = cat.nama;
        filterSelect.appendChild(opt);
      });
      filterSelect.value = currentCategory;
    }
  }

  function renderDynamicHeroBanners(bannerRows) {
    const visualSlider = document.getElementById("heroVisualSlider");
    if (!visualSlider || !Array.isArray(bannerRows) || bannerRows.length === 0) return;

    const activeBanners = bannerRows.filter(function (b) {
      return b.aktif !== false && b.gambar && (b.tipe || "hero") === "hero";
    });
    if (activeBanners.length === 0) return;

    visualSlider.innerHTML = "";

    activeBanners.forEach(function (ban, idx) {
      const slideDiv = document.createElement("div");
      slideDiv.className = "hero-slide-item" + (idx === 0 ? " active" : "");
      const img = document.createElement("img");
      img.src = ban.gambar;
      img.alt = ban.judul || "Banner AquaAgri.id";
      img.className = "hero-clean-img";
      img.loading = idx === 0 ? "eager" : "lazy";
      slideDiv.appendChild(img);
      visualSlider.appendChild(slideDiv);
    });

    const dotsWrap = document.createElement("div");
    dotsWrap.className = "hero-slide-indicators";
    dotsWrap.id = "heroSlideDots";
    dotsWrap.setAttribute("aria-label", "Indikator slide banner");

    activeBanners.forEach(function (_, idx) {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "hero-dot" + (idx === 0 ? " active" : "");
      dot.setAttribute("data-slide", String(idx));
      dot.setAttribute("aria-label", "Slide " + (idx + 1));
      dotsWrap.appendChild(dot);
    });

    visualSlider.appendChild(dotsWrap);
    initHeroSlider();
  }

  // ---------- DETEKSI LINK SHARE PRODUK WA/SOSMED (CARA A: LANGSUNG BUKA POP-UP PRODUK) ----------
  let hasOpenedSharedProduct = false;

  function getSharedProductIdFromUrl() {
    if (typeof window.__INITIAL_PRODUCT_ID__ === "number" && window.__INITIAL_PRODUCT_ID__ > 0) {
      return window.__INITIAL_PRODUCT_ID__;
    }
    try {
      const params = new URLSearchParams(window.location.search);
      const raw = params.get("produk") || params.get("product") || params.get("id");
      if (raw && /^\d+$/.test(String(raw).trim())) {
        return Number(String(raw).trim());
      }
      if (window.location.pathname && window.location.pathname.indexOf("/produk/") === 0) {
        const seg = window.location.pathname.replace("/produk/", "").split("/")[0];
        if (seg && /^\d+$/.test(seg)) return Number(seg);
      }
    } catch (e) {}
    return null;
  }

  function checkAndOpenSharedProduct() {
    if (hasOpenedSharedProduct) return;
    const targetId = getSharedProductIdFromUrl();
    if (!targetId) return;

    const foundProd = products.find(function (p) {
      return Number(p.id) === Number(targetId);
    });
    if (foundProd) {
      hasOpenedSharedProduct = true;
      setTimeout(function () {
        openProductDetailModal(foundProd);
      }, 180);
    }
  }

  // ---------- SISTEM POP-UP POSTER IKLAN / PROMO (DARI DASHBOARD ADMIN) ----------
  // ---------- SISTEM POP-UP POSTER IKLAN / PROMO (MULTI-SLIDE MANUAL, 4s AUTO-CLOSE & SHOPEE) ----------
  function initPromoPopupFromBanners(bannerRows) {
    if (!Array.isArray(bannerRows) || bannerRows.length === 0) return;
    // Jika pengunjung datang dari klik Link Produk Spesifik di WA, prioritaskan menampilkan Pop-Up Produk tersebut
    if (getSharedProductIdFromUrl()) return;

    const popupRow = bannerRows.find(function (b) {
      return b.tipe === "popup" && b.aktif !== false && b.gambar;
    });
    if (!popupRow) return;

    const overlay = document.getElementById("promoPopupOverlay");
    const card = document.getElementById("promoPopupCard");
    const track = document.getElementById("promoPopupTrack");
    const prevBtn = document.getElementById("promoPopupPrevBtn");
    const nextBtn = document.getElementById("promoPopupNextBtn");
    const dotsWrap = document.getElementById("promoPopupDots");
    const timerWrap = document.getElementById("promoPopupTimerWrap");
    const timerBar = document.getElementById("promoPopupTimerBar");
    const timerBadge = document.getElementById("promoPopupTimerBadge");
    const actionWrap = document.getElementById("promoPopupActionWrap");
    const ctaBtn = document.getElementById("promoPopupCtaBtn");
    const ctaText = document.getElementById("promoPopupCtaText");
    const badge = document.getElementById("promoPopupBadge");
    const badgeText = document.getElementById("promoPopupBadgeText");
    const closeBtn = document.getElementById("promoPopupCloseBtn");

    if (!overlay || !card || !closeBtn) return;

    // Cek pengaturan metadata (disimpan pada subjudul JSON jika ada)
    let meta = {
      targetType: "shopee",
      shopeeUrl: "",
      shopeeBtnText: "Beli Sekarang di Shopee 🛒",
      waNumber: "",
      waMessage: "",
      targetUrl: "",
      badgeLabel: "",
      freq: "always",
      durationSeconds: 4,
      slides: []
    };

    if (popupRow.subjudul) {
      try {
        const parsed = JSON.parse(popupRow.subjudul);
        if (parsed && typeof parsed === "object") {
          meta = Object.assign(meta, parsed);
        }
      } catch (e) {}
    }

    const sessionKey = "aquaagri_popup_closed_" + popupRow.id + "_" + (popupRow.updated_at || "");
    if (meta.freq === "session") {
      try {
        if (sessionStorage.getItem(sessionKey) === "1") return;
      } catch (e) {}
    }

    // 1. Kumpulkan daftar gambar (Slide Manual: Utama + Slide Tambahan)
    let slidesList = [];
    if (Array.isArray(meta.slides) && meta.slides.length > 0) {
      slidesList = meta.slides.filter(function (s) { return typeof s === "string" && s.trim().length > 0; });
    }
    if (slidesList.length === 0 && popupRow.gambar) {
      slidesList = [popupRow.gambar.trim()];
    } else if (slidesList.length > 0 && popupRow.gambar && !slidesList.includes(popupRow.gambar.trim())) {
      slidesList.unshift(popupRow.gambar.trim());
    }

    if (slidesList.length === 0) return;

    // Render slide gambar ke dalam track
    if (track) {
      track.innerHTML = "";
      slidesList.forEach(function (imgSrc, idx) {
        const slideDiv = document.createElement("div");
        slideDiv.className = "promo-popup-slide" + (idx === 0 ? " active" : "");
        const slideImg = document.createElement("img");
        slideImg.src = imgSrc;
        slideImg.alt = (popupRow.judul || "Promo Spesial") + " - Slide " + (idx + 1);
        slideImg.className = "promo-popup-img";
        slideImg.loading = idx === 0 ? "eager" : "lazy";
        slideDiv.appendChild(slideImg);
        track.appendChild(slideDiv);
      });
    }

    // Navigasi Slide Manual
    let currentSlide = 0;
    const totalSlides = slidesList.length;

    function goToSlide(idx) {
      if (idx < 0) idx = totalSlides - 1;
      if (idx >= totalSlides) idx = 0;
      currentSlide = idx;
      if (track) {
        track.style.transform = "translateX(-" + (currentSlide * 100) + "%)";
      }
      if (dotsWrap) {
        const dots = dotsWrap.querySelectorAll(".promo-popup-dot");
        dots.forEach(function (d, dIdx) {
          d.classList.toggle("active", dIdx === currentSlide);
        });
      }
    }

    if (totalSlides > 1) {
      if (prevBtn) {
        prevBtn.classList.remove("hidden");
        prevBtn.onclick = function (e) {
          e.stopPropagation();
          cancelAutoClose("manual-interaction");
          goToSlide(currentSlide - 1);
        };
      }
      if (nextBtn) {
        nextBtn.classList.remove("hidden");
        nextBtn.onclick = function (e) {
          e.stopPropagation();
          cancelAutoClose("manual-interaction");
          goToSlide(currentSlide + 1);
        };
      }
      if (dotsWrap) {
        dotsWrap.innerHTML = "";
        dotsWrap.classList.remove("hidden");
        slidesList.forEach(function (_, dIdx) {
          const dot = document.createElement("button");
          dot.type = "button";
          dot.className = "promo-popup-dot" + (dIdx === 0 ? " active" : "");
          dot.setAttribute("aria-label", "Pindah ke slide " + (dIdx + 1));
          dot.onclick = function (e) {
            e.stopPropagation();
            cancelAutoClose("manual-interaction");
            goToSlide(dIdx);
          };
          dotsWrap.appendChild(dot);
        });
      }

      // Dukungan Touch Swipe Gestures pada HP
      let touchStartX = 0;
      let touchEndX = 0;
      const viewport = document.getElementById("promoPopupSliderViewport") || card;
      if (viewport) {
        viewport.addEventListener("touchstart", function (e) {
          cancelAutoClose("touch");
          if (e.changedTouches && e.changedTouches[0]) {
            touchStartX = e.changedTouches[0].clientX;
          }
        }, { passive: true });

        viewport.addEventListener("touchend", function (e) {
          if (e.changedTouches && e.changedTouches[0]) {
            touchEndX = e.changedTouches[0].clientX;
            const diffX = touchStartX - touchEndX;
            if (Math.abs(diffX) > 40) {
              if (diffX > 0) {
                goToSlide(currentSlide + 1);
              } else {
                goToSlide(currentSlide - 1);
              }
            }
          }
        }, { passive: true });
      }
    } else {
      if (prevBtn) prevBtn.classList.add("hidden");
      if (nextBtn) nextBtn.classList.add("hidden");
      if (dotsWrap) dotsWrap.classList.add("hidden");
    }

    // 2. Tautan Shopee, WhatsApp, atau URL Eksternal
    let finalTargetLink = (popupRow.link_tujuan || "").trim();
    const targetType = meta.targetType || (finalTargetLink.includes("shopee") ? "shopee" : (finalTargetLink.includes("wa.me") ? "wa" : "url"));

    if (actionWrap && ctaBtn && ctaText && finalTargetLink && targetType !== "none") {
      actionWrap.classList.remove("hidden");
      ctaBtn.href = finalTargetLink;
      if (targetType === "shopee") {
        ctaBtn.className = "promo-popup-cta-btn shopee";
        ctaText.textContent = meta.shopeeBtnText || "Beli Sekarang di Shopee 🛒";
      } else if (targetType === "wa") {
        ctaBtn.className = "promo-popup-cta-btn wa";
        ctaText.textContent = meta.waBtnText || "Chat WhatsApp Sekarang 💬";
      } else {
        ctaBtn.className = "promo-popup-cta-btn url";
        ctaText.textContent = meta.urlBtnText || "Kunjungi Promo Sekarang ↗";
      }
      ctaBtn.onclick = function (e) {
        e.stopPropagation();
        cancelAutoClose("cta-click");
      };
    } else if (actionWrap) {
      actionWrap.classList.add("hidden");
    }

    // Badge Label Tambahan
    if (badge && badgeText && meta.badgeLabel && finalTargetLink) {
      badgeText.textContent = meta.badgeLabel;
      badge.classList.remove("hidden");
    } else if (badge) {
      badge.classList.add("hidden");
    }

    // 3. Durasi 4 Detik & Deteksi Sentuhan (Auto-close jika tidak disentuh)
    let autoCloseTimer = null;
    let countdownInterval = null;
    let isInteracted = false;
    const durationSeconds = typeof meta.durationSeconds === "number" ? meta.durationSeconds : 4;

    function cancelAutoClose(reason) {
      if (isInteracted) return;
      isInteracted = true;
      if (autoCloseTimer) {
        clearTimeout(autoCloseTimer);
        autoCloseTimer = null;
      }
      if (countdownInterval) {
        clearInterval(countdownInterval);
        countdownInterval = null;
      }
      if (timerBar) {
        timerBar.style.transition = "none";
        timerBar.style.width = "100%";
        timerBar.style.opacity = "0.4";
      }
      if (timerBadge) {
        timerBadge.textContent = "✨ Promo Aktif";
        setTimeout(function () {
          if (timerBadge) timerBadge.style.opacity = "0";
        }, 1200);
      }
    }

    function startAutoCloseTimer() {
      if (durationSeconds <= 0) {
        if (timerWrap) timerWrap.classList.add("hidden");
        if (timerBadge) timerBadge.classList.add("hidden");
        return;
      }

      if (timerWrap) timerWrap.classList.remove("hidden");
      if (timerBadge) {
        timerBadge.classList.remove("hidden");
        timerBadge.textContent = "⏱️ " + durationSeconds + "s";
      }

      // Animasi bar progres
      if (timerBar) {
        timerBar.style.transition = "none";
        timerBar.style.width = "100%";
        void timerBar.offsetWidth;
        timerBar.style.transition = "width " + durationSeconds + "s linear";
        timerBar.style.width = "0%";
      }

      let remainingSec = durationSeconds;
      countdownInterval = setInterval(function () {
        if (isInteracted) {
          clearInterval(countdownInterval);
          return;
        }
        remainingSec--;
        if (timerBadge && remainingSec >= 0) {
          timerBadge.textContent = "⏱️ " + remainingSec + "s";
        }
        if (remainingSec <= 0) {
          clearInterval(countdownInterval);
        }
      }, 1000);

      autoCloseTimer = setTimeout(function () {
        if (!isInteracted) {
          closePromoPopup();
        }
      }, durationSeconds * 1000);
    }

    // Pasang sensor interaksi (sentuh / klik / gerak kursor) untuk membatalkan timer 4 detik
    ["touchstart", "pointerdown", "mouseenter", "wheel"].forEach(function (evtName) {
      card.addEventListener(evtName, function () {
        cancelAutoClose(evtName);
      }, { passive: true });
    });

    function closePromoPopup() {
      cancelAutoClose("closed");
      overlay.classList.remove("open");
      if (meta.freq === "session") {
        try {
          sessionStorage.setItem(sessionKey, "1");
        } catch (e) {}
      }
      setTimeout(function () {
        overlay.classList.add("hidden");
      }, 280);
    }

    function openPromoTarget() {
      if (!finalTargetLink) return;
      try {
        const parsedUrl = new URL(finalTargetLink);
        if (parsedUrl.protocol === "https:" || parsedUrl.protocol === "http:") {
          window.open(parsedUrl.href, "_blank", "noopener,noreferrer");
        }
      } catch (e) {}
    }

    // Klik gambar slide membuka link target jika ada
    card.onclick = function (e) {
      cancelAutoClose("card-click");
      // Jangan trigger jika mengeklik tombol navigasi atau tombol CTA
      if (e.target.closest("#promoPopupPrevBtn") || e.target.closest("#promoPopupNextBtn") || e.target.closest(".promo-popup-dot") || e.target.closest("#promoPopupCtaBtn")) {
        return;
      }
      if (finalTargetLink && targetType !== "none") {
        openPromoTarget();
      }
    };

    closeBtn.onclick = function (e) {
      e.stopPropagation();
      closePromoPopup();
    };

    overlay.onclick = function (e) {
      if (e.target === overlay) {
        closePromoPopup();
      }
    };

    // Buka pop-up dengan animasi halus setelah delay 450ms
    setTimeout(function () {
      overlay.classList.remove("hidden");
      void overlay.offsetWidth;
      overlay.classList.add("open");
      startAutoCloseTimer();
    }, 450);
  }

  // Simpan peta deskripsi lokal yang sudah diperbaiki untuk fallback cerdas jika baris Supabase masih memakai teks template lama
  const localFixedDescriptionsByName = {};
  products.forEach(function (p) {
    if (p && p.nama && p.deskripsi) {
      localFixedDescriptionsByName[p.nama.trim()] = p.deskripsi;
    }
  });

  function isLegacyMismatchedDescription(nama, desc) {
    if (!desc) return true;
    const d = String(desc).trim();
    const n = String(nama || "").trim();
    if (d.toLowerCase() === n.toLowerCase()) return true;
    if (d.includes("untuk menjaga kesehatan ikan dan kualitas air akuarium")) return true;
    if (d.includes("dimasak dengan berbagai cara seperti dipanggang, direndam dalam saus")) return true;
    if (d.endsWith("dengan daging lembut dan gurih.")) return true;
    if (d.includes("Sangat cocok untuk camilan atau hidangan utama.")) return true;
    if (d.includes("Umpan pengganti lumut berkualitas tinggi untuk memancing")) return true;
    if (d === "UMPAN MANCING GALATAMA LELE PATIN MAS") return true;
    if (d === "Makanan Ikan Pelet Ikan Makanan Pakan Ikan Hias") return true;
    if (d.includes("Tali pancing berkualitas tinggi") && d.includes("untuk memancing ikan di berbagai jenis air")) return true;
    if (d.includes("dengan desain ergonomis dan performa tinggi.")) return true;
    if (d.includes("dengan kualitas terbaik untuk memancing.")) return true;
    if (d.includes("untuk menyimpan dan mengangkut umpan pancing.")) return true;
    if (d.includes("untuk memancing ikan di berbagai jenis air.")) return true;
    if (d.includes("Max Drag 20 kg: 3 set bantalan rem komposit") && !n.includes("Starfall")) return true;
    if (d.includes("Mesin pompa aerasi 4 cabang") && !n.includes("Aerator")) return true;
    if (d.includes("Booster Attractant Terbaik untuk Memancing Ikan Liar di Laut")) return true;
    if (d.includes("Campuran Umpan Pancing Ikan Khusus Media Cacing 15ml")) return true;
    if (d.includes("Stopper pancing kualitas premium berbahan kaca transparan")) return true;
    if (d.includes("Topi gunung outdoor yang nyaman dan tahan lama")) return true;
    if (d.includes("Orcarium Lobe Series Akuarium SOLITER untuk budidaya ikan")) return true;
    if (d.includes("Box container serbaguna tipe rabbit (untuk kolam ikan hias) untuk berbagai keperluan")) return true;
    return false;
  }

  async function syncCatalogFromSupabase() {
    if (typeof window.getAquaAgriSupabaseClient !== "function") return;
    const sb = window.getAquaAgriSupabaseClient();
    if (!sb) return;

    try {
      const [catRes, prodRes, banRes] = await Promise.all([
        sb.from("categories").select("*").order("urutan", { ascending: true }),
        sb.from("products").select("*").eq("aktif", true).order("urutan", { ascending: true }).order("id", { ascending: true }),
        sb.from("banners").select("*").order("urutan", { ascending: true }).order("id", { ascending: true })
      ]);

      // 1. Perbarui daftar kategori & banner kategori jika tersedia di database
      if (!catRes.error && Array.isArray(catRes.data) && catRes.data.length > 0) {
        categories.length = 0;
        catRes.data.forEach(function (row) {
          categories.push({
            id: row.id,
            nama: row.nama,
            svg: row.svg || "",
            deskripsi: row.deskripsi || "",
            bg: row.bg || "cat-olahan-real.jpg"
          });
          categoryBanners[row.id] = {
            bg: row.bg || "banner-bahari-real.jpg",
            tag: row.banner_tag || "KATALOG PRODUK",
            title: row.banner_title || row.nama,
            deskripsi: row.banner_deskripsi || row.deskripsi || ""
          };
        });
        rebuildCategoryChipsAndSelect();
        renderCategories();
      }

      // 2. Perbarui daftar produk jika tersedia di database
      if (!prodRes.error && Array.isArray(prodRes.data) && prodRes.data.length > 0) {
        products.length = 0;
        prodRes.data.forEach(function (row) {
          const cleanName = (row.nama || "").trim();
          let resolvedDesc = row.deskripsi || "";
          if (localFixedDescriptionsByName[cleanName] && isLegacyMismatchedDescription(cleanName, resolvedDesc)) {
            resolvedDesc = localFixedDescriptionsByName[cleanName];
          }

          const item = {
            id: row.id,
            nama: row.nama || "",
            harga: row.harga || "Rp0",
            hargaCoret: row.harga_coret || "",
            diskon: row.diskon || "",
            gambar: row.gambar || "",
            deskripsi: resolvedDesc,
            kategori: row.kategori || "produk-olahan-ikan",
            kelompok: row.kelompok || "",
            linkAffiliate: row.link_affiliate || "",
            klik: Number(row.klik) || 0
          };
          if (item.kategori === "Benih-Pakan-Budidaya") {
            const resolved = getBudidayaSubcategory(item);
            item.kelompok = resolved;
            item.subkategori = resolved;
          }
          products.push(item);
        });

        renderSampleCarousel();
        refreshProductView();
        renderSearchInterfaceProducts();
        renderVipPromoProducts();
        checkAndOpenSharedProduct();
      }

      // 3. Perbarui slide Hero Banner beranda & Pop-Up Iklan Promo jika tersedia di database
      if (!banRes.error && Array.isArray(banRes.data) && banRes.data.length > 0) {
        renderDynamicHeroBanners(banRes.data);
        initPromoPopupFromBanners(banRes.data);
        initVipPromoFromBanners(banRes.data);
        initAboutDocsFromBanners(banRes.data);

        // Sinkronisasi status sakelar Lonceng Diskon dari database Supabase
        const bellConfig = banRes.data.find(function (b) { return b.tipe === "catalog_bell"; });
        const isBellActive = bellConfig ? (bellConfig.aktif !== false) : (localStorage.getItem("aquaagri_catalog_bell_disabled") !== "true");
        applyCatalogBellVisibility(isBellActive);

        // Berlangganan Supabase Realtime agar perubahan sakelar di admin HP langsung bereaksi seketika di laptop
        const sbClient = window.getAquaAgriSupabaseClient();
        if (sbClient && !window.__aquaAgriRealtimeSubscribed) {
          window.__aquaAgriRealtimeSubscribed = true;
          try {
            sbClient.channel("catalog-bell-realtime")
              .on("postgres_changes", { event: "*", schema: "public", table: "banners" }, function (payload) {
                const row = payload.new;
                if (row && row.tipe === "catalog_bell") {
                  applyCatalogBellVisibility(row.aktif !== false);
                }
                if (row && row.tipe === "vip_promo") {
                  initVipPromoFromBanners([row]);
                }
                if (row && row.tipe === "about_doc") {
                  initAboutDocsFromBanners([row]);
                }
              })
              .subscribe();
          } catch (eRealtime) {}
        }
      }

      updateAboutStats();
    } catch (err) {
      // Tetap gunakan data bawaan jika jaringan sedang offline
      console.warn("Menggunakan data katalog bawaan:", err);
    }
  }

  // Bersihkan hanya Service Worker lama dan JANGAN hapus Service Worker resmi OneSignal
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.getRegistrations().then(function (registrations) {
      registrations.forEach(function (reg) {
        const swUrl = (reg.active && reg.active.scriptURL) || "";
        if (!swUrl.includes("OneSignal") && !swUrl.includes("onesignal")) {
          reg.unregister();
        }
      });
    }).catch(function () {});
  }

  updateHeaderOffset();
  window.addEventListener("resize", updateHeaderOffset);

  updateAboutStats();
  renderCategories();
  renderSampleCarousel();
  initStoryCarousel();
  initHeroSlider();
  initVipPromoFromBanners([]);
  initAboutDocsFromBanners([]);

  // ============================================================
  // FITUR TOMBOL KEMBALI KE ATAS (BACK TO TOP FLOATING FAB)
  // Menandakan kembali ke atas saat scroll ke bawah di semua kategori produk & halaman
  // ============================================================
  const backToTopBtn = document.getElementById("backToTopBtn");
  if (backToTopBtn) {
    let bttTicking = false;
    function checkBackToTopScroll() {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
      if (scrollY > 600) {
        backToTopBtn.classList.add("visible");
      } else {
        backToTopBtn.classList.remove("visible");
      }
      bttTicking = false;
    }

    window.addEventListener("scroll", function () {
      if (!bttTicking) {
        window.requestAnimationFrame(checkBackToTopScroll);
        bttTicking = true;
      }
    }, { passive: true });

    backToTopBtn.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  // ==========================================================================
  // SISTEM NOTIFIKASI S3 MARKETING (VIP PROMO & VOUCHER SHOPEE)
  // ==========================================================================
  function showNotifToast(message) {
    let t = document.getElementById("notifGlobalToast");
    if (!t) {
      t = document.createElement("div");
      t.id = "notifGlobalToast";
      t.style.cssText = "position:fixed; top:24px; left:50%; transform:translateX(-50%); background:#0f172a; color:#fff; padding:12px 22px; border-radius:14px; font-size:0.86rem; font-weight:600; z-index:9999; box-shadow:0 12px 35px rgba(0,0,0,0.35); border:1.5px solid #14b8a6; text-align:center; max-width:92%; transition:all 0.3s ease;";
      document.body.appendChild(t);
    }
    t.textContent = message;
    t.style.opacity = "1";
    t.style.display = "block";
    setTimeout(() => {
      t.style.opacity = "0";
      setTimeout(() => { if (t) t.style.display = "none"; }, 300);
    }, 4500);
  }

  // Kontrol Terpusat Visibilitas Lonceng & Banner Notifikasi (Sinkron Lintas Perangkat)
  function applyCatalogBellVisibility(isActive) {
    const promptBanner = document.getElementById("notifPushPrompt");
    const floatingBell = document.getElementById("notifFloatingBell");
    const isBellDisabled = !isActive;

    localStorage.setItem("aquaagri_catalog_bell_disabled", isBellDisabled ? "true" : "false");

    // Sembunyikan lonceng diskon VIP di semua 4 kategori produk, pencarian, dan halaman sub
    const isCatOpen = categoryView && !categoryView.classList.contains("hidden");
    const isSearchOpen = searchView && !searchView.classList.contains("hidden");
    const isAboutOpen = aboutView && !aboutView.classList.contains("hidden");
    const isPromoOpen = vipPromoView && !vipPromoView.classList.contains("hidden");
    const isSubPage = isCatOpen || isSearchOpen || isAboutOpen || isPromoOpen ||
                      document.body.classList.contains("category-active") ||
                      document.body.classList.contains("search-active");

    if (isBellDisabled || isSubPage) {
      if (promptBanner && isBellDisabled) promptBanner.classList.add("hidden");
      if (floatingBell) floatingBell.classList.add("hidden");
      if (isBellDisabled && window.__bellPromptTimer) {
        clearTimeout(window.__bellPromptTimer);
        window.__bellPromptTimer = null;
      }
      return;
    }

    // AKTIF DI BERANDA: Tampilkan lonceng melayang (kecuali jika banner prompt sedang terbuka)
    if (floatingBell && (!promptBanner || promptBanner.classList.contains("hidden"))) {
      floatingBell.classList.remove("hidden");
    }
    // Munculkan prompt otomatis setelah 3.5 detik jika pengunjung belum pernah berinteraksi
    const notifStatus = localStorage.getItem("aquaagri_notif_status");
    if (!notifStatus && !window.__bellPromptTimer) {
      window.__bellPromptTimer = setTimeout(function () {
        if (localStorage.getItem("aquaagri_catalog_bell_disabled") === "true") return;
        if (document.body.classList.contains("category-active") || document.body.classList.contains("search-active")) return;
        const promoPopup = document.getElementById("promoPopupOverlay");
        const prodModal = document.getElementById("productDetailModal");
        const isPromoOpenNow = promoPopup && !promoPopup.classList.contains("hidden");
        const isProdOpenNow = prodModal && !prodModal.classList.contains("hidden");
        if (!isPromoOpenNow && !isProdOpenNow) {
          if (floatingBell) floatingBell.classList.add("hidden");
          if (promptBanner) promptBanner.classList.remove("hidden");
        } else {
          if (floatingBell) floatingBell.classList.remove("hidden");
        }
      }, 3500);
    }
  }

  // Cek Cepat Status Lonceng dari Supabase (Kilat tanpa menunggu seluruh katalog)
  async function checkCatalogBellFast() {
    if (typeof window.getAquaAgriSupabaseClient !== "function") return;
    const sb = window.getAquaAgriSupabaseClient();
    if (!sb) return;
    try {
      const { data, error } = await sb.from("banners").select("aktif").eq("tipe", "catalog_bell").limit(1);
      if (!error && Array.isArray(data) && data.length > 0) {
        applyCatalogBellVisibility(data[0].aktif !== false);
      }
    } catch (e) {}
  }

  // ---------- DETEKSI PERANGKAT IOS & MODE STANDALONE (PWA) ----------
  function isIosDevice() {
    return (
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
    );
  }

  function isStandaloneApp() {
    return (
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true
    );
  }

  // Pengendali Modal Panduan Pasang iOS
  function openIosInstallModal() {
    const iosModal = document.getElementById("iosInstallModal");
    if (iosModal) {
      iosModal.classList.remove("hidden");
      document.body.classList.add("modal-open");
    }
  }

  function closeIosInstallModal() {
    const iosModal = document.getElementById("iosInstallModal");
    if (iosModal) {
      iosModal.classList.add("hidden");
      document.body.classList.remove("modal-open");
    }
  }

  // ============================================================
  // SISTEM AUDIO RINGTONE UNIVERSAL (HP ANDROID, IPHONE & KOMPUTER)
  // Memutar suara ramah "Terima Kasih" saat pengunjung:
  // 1. Mengklik "Aktifkan Diskon & Voucher Gratis"
  // 2. Mengklik "Pemasangan Aplikasi" (Android, iPhone Safari, atau Komputer)
  // Aman, non-blocking, kompatibel WebKit iOS & Android Chrome
  // ============================================================
  let aquaAgriRingtoneAudio = null;
  let lastRingtonePlayedTime = 0;

  function initAquaAgriRingtone() {
    if (!aquaAgriRingtoneAudio) {
      aquaAgriRingtoneAudio = document.getElementById("aquaAgriRingtone");
      if (!aquaAgriRingtoneAudio) {
        try {
          aquaAgriRingtoneAudio = new Audio("ringtone-terimakasih.mp3");
        } catch (eAudio) {}
      }
      if (aquaAgriRingtoneAudio) {
        aquaAgriRingtoneAudio.preload = "auto";
        try {
          aquaAgriRingtoneAudio.volume = 1.0;
        } catch (eVol) {}
      }
    }
    return aquaAgriRingtoneAudio;
  }

  function playAquaAgriRingtone() {
    try {
      const now = Date.now();
      // Debounce 500ms mencegah suara restart jika tombol tertekan 2 kali berturut-turut
      if (now - lastRingtonePlayedTime < 500) {
        return;
      }
      lastRingtonePlayedTime = now;

      const audio = initAquaAgriRingtone();
      if (!audio) return;

      // Reset waktu putar ke detik awal
      try {
        audio.currentTime = 0;
      } catch (eTime) {}

      // Putar audio secara sinkron saat user gesture (wajib untuk iOS WebKit & Android)
      const playPromise = audio.play();
      if (playPromise !== undefined && typeof playPromise.catch === "function") {
        playPromise.catch(function (err) {
          // Tangani secara senyap jika perangkat dalam mode hening (Silent Switch) atau hemat baterai
          console.log("Ringtone audio notice:", err);
        });
      }
    } catch (err) {
      console.warn("Ringtone error notice:", err);
    }
  }
  window.playAquaAgriRingtone = playAquaAgriRingtone;

  // Siapkan preload audio pada interaksi/sentuhan pertama agar seketika berbunyi tanpa jeda jaringan
  (function setupAudioPreloadOnFirstTouch() {
    const unlock = function () {
      try {
        const audio = initAquaAgriRingtone();
        if (audio && typeof audio.load === "function") {
          audio.load();
        }
      } catch (e) {}
      window.removeEventListener("touchstart", unlock, { passive: true });
      window.removeEventListener("pointerdown", unlock, { passive: true });
      window.removeEventListener("click", unlock, { passive: true });
    };
    window.addEventListener("touchstart", unlock, { passive: true, once: true });
    window.addEventListener("pointerdown", unlock, { passive: true, once: true });
    window.addEventListener("click", unlock, { passive: true, once: true });
  })();

  const iosCloseBtn = document.getElementById("iosModalCloseBtn");
  const iosUnderstoodBtn = document.getElementById("iosGuideUnderstoodBtn");
  const iosModalEl = document.getElementById("iosInstallModal");

  if (iosCloseBtn) iosCloseBtn.addEventListener("click", closeIosInstallModal);
  if (iosUnderstoodBtn) {
    iosUnderstoodBtn.addEventListener("click", function () {
      playAquaAgriRingtone();
      closeIosInstallModal();
    });
  }
  if (iosModalEl) {
    iosModalEl.addEventListener("click", function (e) {
      if (e.target === iosModalEl) closeIosInstallModal();
    });
  }

  function initS3MarketingPushPrompt() {
    const promptBanner = document.getElementById("notifPushPrompt");
    const subscribeBtn = document.getElementById("notifSubscribeBtn");
    const dismissBtn = document.getElementById("notifDismissBtn");
    const floatingBell = document.getElementById("notifFloatingBell");

    if (!promptBanner || !subscribeBtn) return;

    function isBellDisabled() {
      return localStorage.getItem("aquaagri_catalog_bell_disabled") === "true";
    }

    // Default status awal saat halaman pertama kali dibuka:
    // Jika dinonaktifkan (atau belum disinkronkan), JANGAN tampilkan lonceng sampai Supabase mengonfirmasi
    if (isBellDisabled()) {
      promptBanner.classList.add("hidden");
      if (floatingBell) floatingBell.classList.add("hidden");
    } else if (localStorage.getItem("aquaagri_catalog_bell_disabled") === "false") {
      // Jika di sesi sebelumnya sudah terkonfirmasi aktif
      if (floatingBell) floatingBell.classList.remove("hidden");
    }

    function showPrompt() {
      if (isBellDisabled()) return;
      if (floatingBell) floatingBell.classList.add("hidden");
      promptBanner.classList.remove("hidden");
    }

    function hidePrompt() {
      promptBanner.classList.add("hidden");
      if (!isBellDisabled() && floatingBell) {
        floatingBell.classList.remove("hidden");
      }
    }

    // Klik Aktifkan Diskon & Voucher (CTA S3 Marketing)
    subscribeBtn.addEventListener("click", async function () {
      playAquaAgriRingtone();
      hidePrompt();

      const isIos = isIosDevice();
      const isStandalone = isStandaloneApp();

      // KONDISI 1: Pengguna iPhone membuka di Safari biasa (Belum dipasang ke Layar Utama)
      // Sesuai standar keamanan resmi Apple WebKit, Web Push Notifications DILARANG di Safari tab biasa.
      // Pengguna harus menambahkan ke Layar Utama terlebih dahulu.
      if (isIos && !isStandalone) {
        showNotifToast("📱 Khusus iPhone: Pasang ke Layar Utama terlebih dahulu agar notifikasi diskon aktif.");
        openIosInstallModal();
        return;
      }

      // KONDISI 2: Pengguna Android / Desktop ATAU Pengguna iPhone di PWA Standalone
      function triggerInstallSequence() {
        if (!isIos && !isStandalone) {
          setTimeout(function () {
            if (typeof window.__triggerSafePwaInstall === "function") {
              window.__triggerSafePwaInstall(true);
            }
          }, 500);
        }
      }

      // 1. Daftarkan pelanggan ke notifikasi push OneSignal terlebih dahulu
      if (window.OneSignalDeferred) {
        window.OneSignalDeferred.push(async function(OneSignal) {
          try {
            const perm = await OneSignal.Notifications.requestPermission();
            if (perm) {
              try {
                if (OneSignal.User && OneSignal.User.PushSubscription) {
                  await OneSignal.User.PushSubscription.optIn();
                }
              } catch (eOpt) {}
              localStorage.setItem("aquaagri_notif_status", "granted");
              showNotifToast("🎉 Selamat! Notifikasi Diskon & Voucher VIP AquaAgri aktif.");
            } else {
              localStorage.setItem("aquaagri_notif_status", "denied");
              showNotifToast("ℹ️ Notifikasi belum diizinkan. Anda tetap dapat menikmati seluruh diskon katalog kami.");
            }
          } catch (eOneSignal) {
            console.log("OneSignal push permission error:", eOneSignal);
            if (isIos) {
              showNotifToast("ℹ️ Di iPhone, pastikan izin notifikasi aktif di Pengaturan iOS Anda.");
            }
          } finally {
            triggerInstallSequence();
          }
        });
      } else if ("Notification" in window) {
        try {
          const permission = await Notification.requestPermission();
          if (permission === "granted") {
            localStorage.setItem("aquaagri_notif_status", "granted");
            showNotifToast("🎉 Selamat! Notifikasi Diskon & Voucher VIP AquaAgri aktif.");
          } else {
            localStorage.setItem("aquaagri_notif_status", "denied");
            showNotifToast("ℹ️ Notifikasi belum diizinkan. Anda tetap dapat menikmati seluruh diskon katalog kami.");
          }
        } catch (err) {
          showNotifToast("🎉 Selamat! Akses Diskon & Promo AquaAgri aktif!");
        } finally {
          triggerInstallSequence();
        }
      } else {
        localStorage.setItem("aquaagri_notif_status", "granted");
        showNotifToast("🎉 Selamat! Akses Promo & Diskon VIP AquaAgri aktif!");
        triggerInstallSequence();
      }
    });

    if (dismissBtn) {
      dismissBtn.addEventListener("click", function () {
        localStorage.setItem("aquaagri_notif_status", "dismissed");
        hidePrompt();
      });
    }

    if (floatingBell) {
      floatingBell.addEventListener("click", function () {
        showPrompt();
      });
    }
  }

  // ---------- SISTEM PWA / WEBAPK (PASANG APLIKASI DI ANDROID & IPHONE) ----------
  function initPwaInstallation() {
    window.__deferredPwaPrompt = null;
    const footerBtn = document.getElementById("pwaFooterInstallBtn");
    const pwaBar = document.getElementById("pwaInstallBar");
    const barInstallBtn = document.getElementById("pwaBarInstallBtn");
    const barCloseBtn = document.getElementById("pwaBarCloseBtn");

    const isIos = isIosDevice();
    const isStandalone = isStandaloneApp();

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/OneSignalSDKWorker.js").catch(function () {});
    }

    // Jika sudah terpasang sebagai aplikasi standalone (PWA aktif)
    if (isStandalone) {
      localStorage.setItem("aquaagri_pwa_installed", "true");
      if (pwaBar) pwaBar.classList.add("hidden");
      if (footerBtn) footerBtn.classList.add("hidden");

      // Khusus iPhone yang baru pertama kali dibuka dari Layar Utama:
      // Tampilkan toast ramah mengarahkan ke lonceng notifikasi
      if (isIos && localStorage.getItem("aquaagri_notif_status") !== "granted" && !localStorage.getItem("aquaagri_ios_welcome_toast")) {
        localStorage.setItem("aquaagri_ios_welcome_toast", "true");
        setTimeout(function () {
          showNotifToast("🎉 Aplikasi AquaAgri aktif di iPhone! Ketuk lonceng Diskon VIP untuk menerima update diskon.");
        }, 2200);
      }
      return;
    }

    // KONDISI KHUSUS IPHONE (IOS SAFARI)
    if (isIos) {
      // Tampilkan tombol pasang di footer khusus pengguna iPhone
      if (footerBtn) {
        footerBtn.textContent = "📱 Pasang Aplikasi AquaAgri di iPhone";
        footerBtn.classList.remove("hidden");
      }

      // Bar penawaran bawah khusus iPhone jika belum ditutup dalam 5 hari
      const dismissed = localStorage.getItem("aquaagri_pwa_dismissed");
      const isRecent = dismissed && (Date.now() - Number(dismissed) < 5 * 24 * 60 * 60 * 1000);
      if (!isRecent && pwaBar) {
        const pwaTitle = pwaBar.querySelector(".pwa-bar-title");
        const pwaSub = pwaBar.querySelector(".pwa-bar-sub");
        if (pwaTitle) pwaTitle.textContent = "Aplikasi AquaAgri di iPhone";
        if (pwaSub) pwaSub.textContent = "Akses Cepat & Notifikasi Diskon";
        setTimeout(function () {
          if (!isStandaloneApp()) {
            pwaBar.classList.remove("hidden");
          }
        }, 4500);
      }
    }

    // LISTENER ANDROID / DESKTOP CHROME (BEFOREINSTALLPROMPT)
    window.addEventListener("beforeinstallprompt", function (e) {
      e.preventDefault();
      window.__deferredPwaPrompt = e;

      if (!isStandaloneApp() && footerBtn) footerBtn.classList.remove("hidden");

      // Cek apakah pengunjung sudah pernah menutup bar ini dalam 5 hari terakhir
      const dismissed = localStorage.getItem("aquaagri_pwa_dismissed");
      const isRecent = dismissed && (Date.now() - Number(dismissed) < 5 * 24 * 60 * 60 * 1000);

      // Hanya tampilkan bar bawah jika belum ditutup dan setelah delay 4,5 detik
      if (!isRecent && pwaBar && !isStandaloneApp()) {
        setTimeout(function () {
          if (window.__deferredPwaPrompt && !isStandaloneApp()) {
            pwaBar.classList.remove("hidden");
          }
        }, 4500);
      }
    });

    // Fungsi pasang PWA universal (otomatis menyesuaikan Android atau iPhone)
    window.__triggerSafePwaInstall = async function (isSilentFallback = true) {
      if (!isSilentFallback) {
        playAquaAgriRingtone();
      }

      if (isStandaloneApp()) {
        if (!isSilentFallback) {
          showNotifToast("✅ Aplikasi AquaAgri sudah terpasang di HP Anda.");
        }
        return true;
      }

      // Jika di iPhone / iPad, tampilkan panduan resmi Apple
      if (isIosDevice()) {
        openIosInstallModal();
        return true;
      }

      // Jika di Android dengan prompt native
      const promptEvent = window.__deferredPwaPrompt;
      if (promptEvent) {
        try {
          promptEvent.prompt();
          const choice = await promptEvent.userChoice;
          if (choice && choice.outcome === "accepted") {
            localStorage.setItem("aquaagri_pwa_installed", "true");
            if (pwaBar) pwaBar.classList.add("hidden");
            if (footerBtn) footerBtn.classList.add("hidden");
          }
        } catch (err) {
          console.warn("PWA install prompt error:", err);
        }
        window.__deferredPwaPrompt = null;
        return true;
      }

      // Fallback
      if (!isSilentFallback) {
        showNotifToast("📱 Pasang Cepat: Ketuk menu browser (titik 3) lalu pilih 'Tambahkan ke Layar Utama'");
      }
      return false;
    };

    async function handleInstallClick() {
      playAquaAgriRingtone();
      if (typeof window.__triggerSafePwaInstall === "function") {
        await window.__triggerSafePwaInstall(false);
      }
    }

    if (footerBtn) footerBtn.addEventListener("click", handleInstallClick);
    if (barInstallBtn) barInstallBtn.addEventListener("click", handleInstallClick);

    if (barCloseBtn) {
      barCloseBtn.addEventListener("click", function () {
        if (pwaBar) {
          pwaBar.classList.add("hiding");
          setTimeout(function () {
            pwaBar.classList.add("hidden");
            pwaBar.classList.remove("hiding");
          }, 350);
        }
        localStorage.setItem("aquaagri_pwa_dismissed", String(Date.now()));
      });
    }

    window.addEventListener("appinstalled", function () {
      if (pwaBar) pwaBar.classList.add("hidden");
      if (footerBtn) footerBtn.classList.add("hidden");
      window.__deferredPwaPrompt = null;
      showNotifToast("🎉 Aplikasi AquaAgri berhasil terpasang di HP Anda!");
    });
  }

  // Jalankan inisialisasi PWA terlebih dahulu agar trigger siap saat CTA diklik
  initPwaInstallation();

  // Inisialisasi Sistem Notifikasi S3 Marketing
  initS3MarketingPushPrompt();

  // Jalankan pemeriksaan cepat status lonceng dari database seketika
  checkCatalogBellFast();

  // Re-sinkronisasi lonceng otomatis saat pengunjung kembali membuka tab di HP/Laptop
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "visible") {
      checkCatalogBellFast();
    }
  });
  window.addEventListener("focus", function () {
    checkCatalogBellFast();
  });
  // Cadangan polling ultra-hemat: hanya berjalan tiap 60 detik jika tab aktif & realtime belum terhubung
  setInterval(function () {
    if (document.visibilityState === "visible" && !window.__aquaAgriRealtimeSubscribed) {
      checkCatalogBellFast();
    }
  }, 60000);

  // Cek apakah pengunjung membuka link share produk spesifik (Cara A)
  checkAndOpenSharedProduct();

  // Sinkronisasi otomatis dengan database Supabase
  syncCatalogFromSupabase();

  // ---------- SISTEM BOTTOM NAVIGATION BAR (SIMPLE, MODERN & ELEGAN) ----------
  function initBottomNavBar() {
    const navHome = document.getElementById("bottomNavHome");
    const navKatalog = document.getElementById("bottomNavKatalog");
    const navSearch = document.getElementById("bottomNavSearch");
    const navPromo = document.getElementById("bottomNavPromo");
    const navAbout = document.getElementById("bottomNavAbout");

    if (navHome) {
      navHome.addEventListener("click", function () {
        goHome();
      });
    }

    if (navKatalog) {
      navKatalog.addEventListener("click", function () {
        openCategory("semua", "Semua Produk");
      });
    }

    if (navSearch) {
      navSearch.addEventListener("click", function () {
        openSearchInterface();
        if (searchInterfaceInput) {
          setTimeout(function () {
            searchInterfaceInput.focus();
          }, 150);
        }
      });
    }

    if (navPromo) {
      navPromo.addEventListener("click", function () {
        openVipPromoView();
      });
    }

    if (navAbout) {
      navAbout.addEventListener("click", function () {
        openAboutView();
      });
    }
  }

  initBottomNavBar();
});

