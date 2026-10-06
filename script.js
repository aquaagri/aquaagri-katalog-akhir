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
   {
    id: 12,
    nama: "Siomay Ikan Tenggiri Frozen 10 Pcs Jumbo",
    harga: "Rp59.000",
    hargaCoret: "Rp70.000",
    diskon: "15%",
    gambar: "assets/products/Siomay-Ikan-Tenggiri-Frozen.jpg",
    deskripsi: "Siomay ikan tenggiri frozen 10 pcs jumbo dengan tekstur lembut dan rasa gurih. Sangat cocok untuk camilan atau hidangan utama.",
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
    deskripsi: "Otak otak ikan tenggiri fresh frozen isi 50pcs dengan tekstur lembut dan rasa gurih. Sangat cocok untuk camilan atau hidangan utama.",
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
    deskripsi: "Baby fish crispy original gurih daun jeruk 100gr. Sangat cocok untuk camilan atau hidangan utama.",
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
    deskripsi: "Edo chikuwa olahan ikan 250 gr. Sangat cocok untuk camilan atau hidangan utama.",
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
    deskripsi: "Dimsum frozen isi 32 pcs 500gr. Sangat cocok untuk camilan atau hidangan utama.",
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
    deskripsi: "Basreng KATAJI mentah 10Kg. Sangat cocok untuk camilan atau hidangan utama.",
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
    deskripsi: "Basreng lontong mentah juragan basreng ikan. Sangat cocok untuk camilan atau hidangan utama.",
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
    deskripsi: "Scallop ikan isi 40 butir. Sangat cocok untuk camilan atau hidangan utama.",
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
    id: 23,
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
    id: 24,
    nama: "Essen Oplosan Super Ikan NILA 30ml",
    harga: "Rp120.000",
    hargaCoret: "Rp145.000",
    diskon: "17%",
    gambar: "assets/products/AGA-Essen -uper Ikan-NILA.jpg",
    deskripsi: "Essen konsentrat premium dengan aroma khas kuat yang dirancang khusus untuk memikat ikan nila babon di berbagai kondisi air kolam maupun waduk liar.",
    kategori: "pancing-umpan",
    linkAffiliate: "https://s.shopee.co.id/5LCKobxOA1"
  },
  {
    id: 25,
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
    id: 24,
    nama: "AQUASEA Tali Pancing Germany200m",
    harga: "Rp21.000",
    hargaCoret: "Rp50.000",
    diskon: "58%",
    gambar: "assets/products/AQUASEA-Tali-Pancing.jpg",
    deskripsi: "Tali pancing berkualitas tinggi dari Germany dengan panjang 200 meter, cocok untuk memancing ikan di berbagai jenis air.",
    kategori: "pancing-umpan",
    linkAffiliate: "https://s.shopee.co.id/3g48uACWxh"
  },

  // --- Kategori: Benih, Pakan & Budidaya ---
  {
    id: 25,
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
    id: 26,
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

// ---------- 2. DAFTAR KATEGORI DENGAN BACKGROUND FOTO ----------

const categories = [
  { 
    id: "produk-olahan-ikan", 
    nama: "Produk Olahan Ikan", 
    ikon: "🍥", 
    deskripsi: "Abon, kerupuk, pempek & aneka olahan gurih",
    bg: "cat-olahan-real.jpg"
  },
  { 
    id: "ikan-seafood-segar", 
    nama: "Ikan & Seafood", 
    ikon: "🦐", 
    deskripsi: "Kakap merah, udang vaname & hasil laut segar",
    bg: "cat-seafood-real.jpg"
  },
  { 
    id: "pancing-umpan", 
    nama: "Pancing & Umpan", 
    ikon: "🎣", 
    deskripsi: "Joran carbon, reel presisi & piranti mancing",
    bg: "cat-pancing-real.jpg"
  },
  { 
    id: "Benih-Pakan-Budidaya", 
    nama: "Benih, Pakan & Budidaya", 
    ikon: "🌱", 
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
    deskripsi: "Pusat terpercaya ekosistem bahari nusantara: hasil laut segar harian, aneka olahan ikan bernutrisi, piranti pancing andalan, hingga sarana budidaya modern siap kirim terpercaya."
  },
  "produk-olahan-ikan": {
    bg: "cat-olahan-real.jpg",
    tag: "KATEGORI OLAHAN HIGIENIS",
    title: "Produk Olahan Ikan",
    deskripsi: "Ragam olahan ikan higienis bernutrisi tinggi: abon tuna, kerupuk tenggiri, sambal roa asap khas Manado, siomay, hingga baso ikan siap saji."
  },
  "ikan-seafood-segar": {
    bg: "cat-seafood-real.jpg",
    tag: "KATEGORI SEAFOOD SEGAR",
    title: "Ikan & Seafood Segar",
    deskripsi: "Tangkapan laut dan perairan segar kualitas cold-chain higienis: fillet salmon trout, udang vaname, kepiting bakau, hingga kakap merah segar."
  },
  "pancing-umpan": {
    bg: "cat-pancing-real.jpg",
    tag: "KATEGORI SPORTFISHING",
    title: "Pancing & Umpan",
    deskripsi: "Dukungan piranti sportfishing terlengkap: joran carbon lentur prima, senar tangguh, reel presisi, umpan tiruan, serta essen aroma pikat teruji."
  },
  "Benih-Pakan-Budidaya": {
    bg: "cat-budidaya-real.jpg",
    tag: "KATEGORI BUDIDAYA MODERN",
    title: "Benih, Pakan & Budidaya",
    deskripsi: "Sarana budidaya dan keramba modern: pakan apung kaya protein, benih sehat, aerator hemat daya, dan perlengkapan budidaya berkualitas."
  }
};

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
  const categoryGrid = document.getElementById("categoryGrid");
  const productGrid = document.getElementById("productGrid");
  const categoryTitle = document.getElementById("categoryTitle");
  const categoryCount = document.getElementById("categoryCount");
  const emptyState = document.getElementById("emptyState");
  const backBtn = document.getElementById("backBtn");
  const brandLogo = document.getElementById("brandLogo");

  // Elemen Header Banner Kategori
  const categoryBannerImg = document.getElementById("categoryBannerImg");
  const categoryBannerTag = document.getElementById("categoryBannerTag");
  const categoryHeaderDesc = document.getElementById("categoryHeaderDesc");
  const categoryChipsNav = document.getElementById("categoryChipsNav");
  const categorySearchClearBtn = document.getElementById("categorySearchClearBtn");

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
  const themeIcon = document.getElementById("themeIcon");
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
      if (themeIcon) themeIcon.textContent = "☀️";
      if (themeText) themeText.textContent = "Terang";
      if (savePreference) localStorage.setItem("aquaagri_theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      document.body.classList.add("light-mode");
      if (themeIcon) themeIcon.textContent = "🌙";
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
      iconPill.textContent = cat.ikon;
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
  }

  // ---------- 7. CAROUSEL PRODUK UNGGULAN (PILIHAN TERBAIK UNTUK ANDA) ----------

  function renderSampleCarousel() {
    if (!sampleCarouselTrack) return;
    sampleCarouselTrack.innerHTML = "";

    // Ambil produk-produk pilihan terbaik dari masing-masing kategori
    const samples = [];
    categories.forEach(function (cat) {
      const prodsInCat = products.filter(function (p) {
        return p.kategori === cat.id;
      });
      samples.push(...prodsInCat.slice(0, 2));
    });

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
      }, 3000); // Tepat 3 detik berganti secara otomatis
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
    btn.textContent = "Lihat Produk";
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
      return;
    }
    if (emptyState) emptyState.classList.add("hidden");

    if (categoryCount) {
      categoryCount.textContent = "Menampilkan " + list.length + " produk pilihan";
    }

    list.forEach(function (produk) {
      productGrid.appendChild(createProductCard(produk));
    });
  }

  // ---------- 11. FILTER & PENCARIAN ----------

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

  function openCategory(categoryId, categoryName) {
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

    // Perbarui status chip kategori yang aktif di halaman kategori
    if (categoryChipsNav) {
      const chips = categoryChipsNav.querySelectorAll(".cat-chip-btn");
      chips.forEach(function (btn) {
        if (btn.getAttribute("data-cat") === categoryId) {
          btn.classList.add("active");
        } else {
          btn.classList.remove("active");
        }
      });
    }

    if (filterSelect) {
      filterSelect.value = categoryId;
    }

    if (homeView) homeView.classList.add("hidden");
    if (searchView) searchView.classList.add("hidden");
    if (categoryView) categoryView.classList.remove("hidden");

    refreshProductView();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goHome() {
    currentCategory = "semua";
    currentKeyword = "";
    if (searchInput) searchInput.value = "";
    if (searchInputCategory) searchInputCategory.value = "";

    if (categoryView) categoryView.classList.add("hidden");
    if (searchView) searchView.classList.add("hidden");
    if (homeView) homeView.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ---------- 13. LOGIKA MOBILE SEARCH INTERFACE (MEGA BAR & CHIPS) ----------

  function openSearchInterface(initialKeyword = "") {
    if (homeView) homeView.classList.add("hidden");
    if (categoryView) categoryView.classList.add("hidden");
    if (searchView) searchView.classList.remove("hidden");

    if (searchInterfaceInput) {
      searchInterfaceInput.value = initialKeyword;
      setTimeout(function () {
        searchInterfaceInput.focus();
      }, 50);
    }

    renderSearchInterfaceProducts();
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  function closeSearchInterface() {
    if (searchView) searchView.classList.add("hidden");
    if (homeView) homeView.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function getSearchFilteredProducts() {
    const query = searchInterfaceInput ? searchInterfaceInput.value.trim().toLowerCase() : "";

    return products.filter(function (p) {
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
      renderSearchInterfaceProducts();
    });
    searchInterfaceInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
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
      renderSearchInterfaceProducts();
    });
  }

  // Chips di search interface (horizontal scrollable)
  if (searchChipsScroll) {
    const chips = searchChipsScroll.querySelectorAll(".search-chip");
    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        chips.forEach(function (c) { c.classList.remove("active"); });
        chip.classList.add("active");
        const type = chip.getAttribute("data-type");
        const val = chip.getAttribute("data-value");
        activeSearchChip = { type: type, value: val };
        renderSearchInterfaceProducts();
      });
    });
  }

  // Kamera Search (Upload / Scan foto produk)
  if (searchCameraBtn && cameraFileInput) {
    searchCameraBtn.addEventListener("click", function () {
      cameraFileInput.click();
    });
    cameraFileInput.addEventListener("change", function () {
      if (cameraFileInput.files && cameraFileInput.files[0]) {
        showSearchToast("📸 Foto produk diterima! Menampilkan rekomendasi...");
        if (searchInterfaceInput) {
          searchInterfaceInput.value = "Ikan";
        }
        renderSearchInterfaceProducts();
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
          showSearchToast("🎙️ Mendengarkan suara... Silakan sebutkan produk");
          rec.onresult = function (event) {
            const transcript = event.results[0][0].transcript;
            if (searchInterfaceInput) {
              searchInterfaceInput.value = transcript;
              renderSearchInterfaceProducts();
            }
          };
          rec.onerror = function () {
            showSearchToast("🎙️ Coba sebutkan: Abon tuna, Joran, atau Udang");
          };
        } catch (err) {
          showSearchToast("🎙️ Coba sebutkan: Abon tuna, Joran, atau Udang");
        }
      } else {
        showSearchToast("🎙️ Fitur suara aktif: Coba sebutkan Abon tuna / Joran");
      }
    });
  }

  // Category view chips nav
  if (categoryChipsNav) {
    const catChips = categoryChipsNav.querySelectorAll(".cat-chip-btn");
    catChips.forEach(function (btn) {
      btn.addEventListener("click", function () {
        const catId = btn.getAttribute("data-cat");
        openCategory(catId);
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

  // ---------- 14. REDIRECT AFFILIATE SHOPEE ----------

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

  // ============================================================
  // 15. MODAL DETAIL PRODUK (DESKRIPSI LENGKAP & SPESIFIKASI)
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

  function openProductDetailModal(produk) {
    if (!produk || !productDetailModal || !modalBackdrop) return;

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
    // Jika sedang berada di halaman kategori, kembali ke beranda
    if (categoryView && !categoryView.classList.contains("hidden")) {
      goHome();
    }
    const section = document.getElementById("panduanBelanja");
    if (section) {
      setTimeout(function () {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
        section.classList.remove("highlight-pulse");
        void section.offsetWidth;
        section.classList.add("highlight-pulse");
        setTimeout(function () {
          section.classList.remove("highlight-pulse");
        }, 1800);
      }, 60);
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
      const catSec = document.querySelector(".categories-clean");
      if (catSec) {
        catSec.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }

  const viewAllProdsBtn = document.getElementById("viewAllProdsBtn");
  if (viewAllProdsBtn) {
    viewAllProdsBtn.addEventListener("click", function () {
      openCategory("semua", "Semua Produk");
    });
  }

  const aboutAquaAgriBtn = document.getElementById("aboutAquaAgriBtn");
  if (aboutAquaAgriBtn) {
    aboutAquaAgriBtn.addEventListener("click", scrollToCaraPesan);
  }

  // ---------- 16. INISIALISASI HALAMAN AWAL ----------

  renderCategories();
  renderSampleCarousel();
  initStoryCarousel();
});
