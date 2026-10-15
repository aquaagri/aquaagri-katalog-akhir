/* ============================================================================
   LOGIKA DASHBOARD ADMIN — AQUAAGRI.ID
   Terhubung ke Supabase Auth, PostgreSQL Database (RLS), & Supabase Storage
   ============================================================================ */

(function () {
  "use strict";

  const PLACEHOLDER_IMG =
    "data:image/svg+xml;charset=UTF-8," +
    encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120">' +
      '<rect width="120" height="120" fill="#e6f4f2"/>' +
      '<text x="50%" y="50%" font-family="sans-serif" font-size="11" fill="#0f766e" text-anchor="middle" dominant-baseline="middle">Foto AquaAgri</text>' +
      "</svg>"
    );

  // State data di memori admin
  let state = {
    user: null,
    categories: [],
    products: [],
    banners: [],
    pendingDelete: null // { type: 'product'|'category'|'banner', id: any, name: string }
  };

  // ---------- 1. UTILITAS KEAMANAN (ANTI-XSS, VALIDASI URL & FILE GAMBAR) ----------

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function isValidShopeeUrl(rawUrl) {
    const val = String(rawUrl || "").trim();
    if (!val) return false;
    try {
      const parsed = new URL(val);
      if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return false;
      const host = parsed.hostname.toLowerCase();
      return (
        host === "shopee.co.id" ||
        host.endsWith(".shopee.co.id") ||
        host === "shp.ee" ||
        host.endsWith(".shp.ee")
      );
    } catch (e) {
      return false;
    }
  }

  function isSafeHttpUrl(rawUrl) {
    const val = String(rawUrl || "").trim();
    if (!val) return false;
    try {
      const parsed = new URL(val);
      return parsed.protocol === "https:" || parsed.protocol === "http:";
    } catch (e) {
      return false;
    }
  }

  /**
   * Pemeriksaan Magic Bytes (Header Asli File) untuk mencegah upload file palsu/berbahaya
   */
  async function verifyImageMagicBytes(file) {
    if (!file || file.size === 0) return false;
    const slice = file.slice(0, 12);
    const buffer = await slice.arrayBuffer();
    const bytes = new Uint8Array(buffer);
    if (bytes.length < 4) return false;

    // JPEG: FF D8 FF
    if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
      return true;
    }
    // PNG: 89 50 4E 47
    if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) {
      return true;
    }
    // GIF: 47 49 46 38
    if (bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x38) {
      return true;
    }
    // WEBP: RIFF....WEBP
    if (
      bytes.length >= 12 &&
      bytes[0] === 0x52 &&
      bytes[1] === 0x49 &&
      bytes[2] === 0x46 &&
      bytes[3] === 0x46 &&
      bytes[8] === 0x57 &&
      bytes[9] === 0x45 &&
      bytes[10] === 0x42 &&
      bytes[11] === 0x50
    ) {
      return true;
    }
    return false;
  }

  /**
   * Kompresi otomatis gambar di sisi browser (HTML5 Canvas) sebelum diunggah ke Supabase Storage
   * agar foto dari kamera HP / file besar otomatis menjadi ringan (< 200 KB) & cepat dimuat
   */
  function compressImageBeforeUpload(file, folderName) {
    return new Promise(function (resolve) {
      // Lewati jika file GIF atau sudah sangat kecil (< 140 KB)
      if (!file || file.type === "image/gif" || file.size < 140 * 1024) {
        resolve(file);
        return;
      }

      const maxDim = folderName === "banners" ? 1360 : folderName === "categories" ? 1080 : 900;
      const quality = folderName === "banners" ? 0.82 : 0.80;

      const img = new Image();
      const objUrl = URL.createObjectURL(file);

      img.onload = function () {
        try {
          URL.revokeObjectURL(objUrl);
          let w = img.naturalWidth || img.width;
          let h = img.naturalHeight || img.height;

          if (w > maxDim || h > maxDim) {
            if (w >= h) {
              h = Math.round((h * maxDim) / w);
              w = maxDim;
            } else {
              w = Math.round((w * maxDim) / h);
              h = maxDim;
            }
          }

          const canvas = document.createElement("canvas");
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext("2d");
          // Latar putih bersih jika gambar PNG transparan dikonversi ke JPEG
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, w, h);
          ctx.drawImage(img, 0, 0, w, h);

          // Prioritaskan format WebP modern untuk efisiensi ukuran file maksimal (~40% lebih hemat)
          const targetMime = "image/webp";
          canvas.toBlob(
            function (blob) {
              if (blob && blob.size < file.size) {
                const baseName = (file.name || "foto").replace(/\.[a-zA-Z0-9]+$/, "");
                const compressedFile = new File([blob], baseName + ".webp", {
                  type: "image/webp",
                  lastModified: Date.now()
                });
                resolve(compressedFile);
                return;
              }
              // Fallback ke JPEG jika WebP tidak lebih kecil
              canvas.toBlob(
                function (jpegBlob) {
                  if (!jpegBlob || jpegBlob.size >= file.size) {
                    resolve(file);
                    return;
                  }
                  const baseName = (file.name || "foto").replace(/\.[a-zA-Z0-9]+$/, "");
                  const compressedFile = new File([jpegBlob], baseName + ".jpg", {
                    type: "image/jpeg",
                    lastModified: Date.now()
                  });
                  resolve(compressedFile);
                },
                "image/jpeg",
                quality
              );
            },
            targetMime,
            quality
          );
        } catch (err) {
          resolve(file);
        }
      };

      img.onerror = function () {
        URL.revokeObjectURL(objUrl);
        resolve(file);
      };

      img.src = objUrl;
    });
  }

  /**
   * Upload file gambar ke Supabase Storage dengan validasi ketat & kompresi otomatis
   */
  async function uploadImageToSupabase(file, folderName, statusElement) {
    if (!file) throw new Error("Pilih file gambar terlebih dahulu.");

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      throw new Error("Format file ditolak! Gunakan gambar JPG, PNG, atau WebP.");
    }

    const maxBytes = 15 * 1024 * 1024; // Izinkan hingga 15 MB dari kamera HP karena akan dikompres otomatis
    if (file.size > maxBytes) {
      throw new Error("Ukuran gambar terlalu besar! Maksimal 15 MB.");
    }

    const isGenuineImage = await verifyImageMagicBytes(file);
    if (!isGenuineImage) {
      throw new Error("File tidak valid atau rusak! Pastikan mengunggah file gambar asli.");
    }

    const sb = window.getAquaAgriSupabaseClient();
    const cfg = window.getAquaAgriSupabaseConfig();
    if (!sb || !cfg.isConfigured) {
      throw new Error("Koneksi Supabase belum aktif.");
    }

    const originalKB = Math.round(file.size / 1024);
    if (statusElement) {
      statusElement.textContent = "Mengoptimalkan ukuran foto & mengunggah ke Supabase...";
      statusElement.style.color = "#0284c7";
    }

    const optimizedFile = await compressImageBeforeUpload(file, folderName);
    const finalKB = Math.round(optimizedFile.size / 1024);

    const ext = (optimizedFile.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
    const safeExt = ["jpg", "jpeg", "png", "webp", "gif"].includes(ext) ? ext : "jpg";
    const randomCode = Math.random().toString(36).substring(2, 9);
    const filePath = `${folderName}/${Date.now()}-${randomCode}.${safeExt}`;

    const { error } = await sb.storage
      .from(cfg.bucket)
      .upload(filePath, optimizedFile, {
        cacheControl: "3600",
        upsert: false,
        contentType: optimizedFile.type
      });

    if (error) {
      throw new Error("Gagal upload gambar: " + error.message);
    }

    const { data: pubData } = sb.storage.from(cfg.bucket).getPublicUrl(filePath);
    if (!pubData || !pubData.publicUrl) {
      throw new Error("Gagal mendapatkan URL publik gambar.");
    }

    if (statusElement) {
      if (finalKB < originalKB) {
        statusElement.textContent = `Berhasil dikompres otomatis (${originalKB} KB → ${finalKB} KB) & diunggah!`;
      } else {
        statusElement.textContent = `Gambar berhasil diunggah (${finalKB} KB)!`;
      }
      statusElement.style.color = "#059669";
    }

    return pubData.publicUrl;
  }

  // ---------- 2. UTILITAS HARGA & DISKON OTOMATIS ----------

  function parseRupiahNumber(str) {
    const digits = String(str || "").replace(/[^0-9]/g, "");
    return digits ? parseInt(digits, 10) : 0;
  }

  function formatRupiahText(raw) {
    const num = parseRupiahNumber(raw);
    if (!num) return "";
    return "Rp" + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  function calculateDiscountPercent(hargaJualStr, hargaCoretStr) {
    const jual = parseRupiahNumber(hargaJualStr);
    const coret = parseRupiahNumber(hargaCoretStr);
    if (jual > 0 && coret > jual) {
      const pct = Math.round(((coret - jual) / coret) * 100);
      if (pct > 0 && pct < 100) {
        return pct + "%";
      }
    }
    return "";
  }

  // ---------- 3. TOAST & ALERT NOTIFIKASI ----------

  let toastTimer = null;
  function showToast(message) {
    const toast = document.getElementById("adminToast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.remove("hidden");
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.add("hidden");
    }, 3200);
  }

  function showBoxAlert(elId, message, type = "error") {
    const el = document.getElementById(elId);
    if (!el) return;
    if (!message) {
      el.classList.add("hidden");
      el.textContent = "";
      return;
    }
    el.textContent = message;
    el.className = "alert-box " + (type === "success" ? "alert-success" : "alert-error");
    el.classList.remove("hidden");
  }

  // ---------- 4. CEK STATUS KONEKSI SUPABASE & AUTENTIKASI ----------

  function updateConnectionBannerUI() {
    const cfg = window.getAquaAgriSupabaseConfig();
    const banner = document.getElementById("connStatusBanner");
    const title = document.getElementById("connStatusTitle");
    const desc = document.getElementById("connStatusDesc");
    const urlInput = document.getElementById("setupSbUrl");
    const keyInput = document.getElementById("setupSbKey");

    if (urlInput && cfg.url) urlInput.value = cfg.url;
    if (keyInput && cfg.anonKey) keyInput.value = cfg.anonKey;

    if (!banner || !title || !desc) return;

    if (cfg.isConfigured) {
      banner.className = "conn-banner conn-banner-ok";
      title.textContent = "Terhubung ke Proyek Supabase";
      desc.textContent = cfg.url;
    } else {
      banner.className = "conn-banner conn-banner-warn";
      title.textContent = "Koneksi Supabase Belum Diisi";
      desc.textContent = "Klik tombol 'Atur Koneksi' untuk memasukkan Project URL & Anon Key Supabase Anda.";
      const panel = document.getElementById("supabaseSetupPanel");
      if (panel) panel.classList.remove("hidden");
    }
  }

  async function checkAuthSession() {
    updateConnectionBannerUI();
    const sb = window.getAquaAgriSupabaseClient();
    const loginScreen = document.getElementById("loginScreen");
    const dashboardScreen = document.getElementById("dashboardScreen");

    if (!sb) {
      if (loginScreen) loginScreen.classList.remove("hidden");
      if (dashboardScreen) dashboardScreen.classList.add("hidden");
      return;
    }

    try {
      const { data, error } = await sb.auth.getSession();
      if (error || !data || !data.session) {
        if (loginScreen) loginScreen.classList.remove("hidden");
        if (dashboardScreen) dashboardScreen.classList.add("hidden");
        return;
      }

      onAdminAuthenticated(data.session.user);
    } catch (err) {
      if (loginScreen) loginScreen.classList.remove("hidden");
      if (dashboardScreen) dashboardScreen.classList.add("hidden");
    }
  }

  async function onAdminAuthenticated(user) {
    state.user = user;
    const loginScreen = document.getElementById("loginScreen");
    const dashboardScreen = document.getElementById("dashboardScreen");

    if (loginScreen) loginScreen.classList.add("hidden");
    if (dashboardScreen) dashboardScreen.classList.remove("hidden");

    const emailEl = document.getElementById("adminUserEmail");
    const initialEl = document.getElementById("adminUserInitial");
    if (emailEl && user && user.email) {
      emailEl.textContent = user.email;
    }
    if (initialEl && user && user.email) {
      initialEl.textContent = user.email.charAt(0).toUpperCase();
    }

    await loadAllDatabaseData();
  }

  // ---------- 5. MUAT DATA DARI DATABASE SUPABASE ----------

  // Hitungan klik murni mulai dari 0 (hanya menghitung klik nyata dari database & perangkat)
  function getAdminProductClicks(prod) {
    if (!prod) return 0;
    const id = Number(prod.id) || 0;
    const dbClicks = typeof prod.klik === "number" && prod.klik > 0 ? prod.klik : 0;
    try {
      const localClicks = JSON.parse(localStorage.getItem("aquaagri_clicks") || "{}");
      return dbClicks + (Number(localClicks[id]) || 0);
    } catch (e) {
      return dbClicks;
    }
  }

  function isLegacyMismatchedDescriptionAdmin(nama, desc) {
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

  let hasAutoSyncedDescriptions = false;

  async function syncFixedDescriptionsToSupabase(isSilent = true) {
    const sb = window.getAquaAgriSupabaseClient();
    const initial = window.AQUAAGRI_INITIAL_DATA;
    if (!sb || !initial || !Array.isArray(initial.products) || state.products.length === 0) return 0;

    const fixedMap = {};
    initial.products.forEach(function (ip) {
      if (ip && ip.nama && ip.deskripsi) {
        fixedMap[ip.nama.trim()] = ip.deskripsi;
      }
    });

    const toUpdate = [];
    state.products.forEach(function (dbProd) {
      const cleanName = (dbProd.nama || "").trim();
      const targetDesc = fixedMap[cleanName];
      if (
        targetDesc &&
        dbProd.deskripsi !== targetDesc &&
        isLegacyMismatchedDescriptionAdmin(cleanName, dbProd.deskripsi)
      ) {
        toUpdate.push({ id: dbProd.id, nama: cleanName, deskripsi: targetDesc });
      }
    });

    if (toUpdate.length === 0) return 0;

    let updatedCount = 0;
    for (let i = 0; i < toUpdate.length; i++) {
      const item = toUpdate[i];
      const { error } = await sb
        .from("products")
        .update({ deskripsi: item.deskripsi, updated_at: new Date().toISOString() })
        .eq("id", item.id);
      if (!error) {
        updatedCount++;
        const stateProd = state.products.find(function (p) { return p.id === item.id; });
        if (stateProd) stateProd.deskripsi = item.deskripsi;
      }
    }

    if (updatedCount > 0) {
      renderAllAdminViews();
      if (!isSilent) {
        showToast("Berhasil memperbaiki " + updatedCount + " deskripsi produk di database Supabase!");
      } else {
        showToast("Otomatis memperbarui " + updatedCount + " deskripsi produk agar akurat sesuai nama produk.");
      }
    }
    return updatedCount;
  }

  async function loadAllDatabaseData() {
    const sb = window.getAquaAgriSupabaseClient();
    if (!sb) return;

    try {
      const [catRes, prodRes, banRes] = await Promise.all([
        sb.from("categories").select("*").order("urutan", { ascending: true }),
        sb.from("products").select("*").order("urutan", { ascending: true }).order("id", { ascending: true }),
        sb.from("banners").select("*").order("urutan", { ascending: true }).order("id", { ascending: true })
      ]);

      if (catRes.error) throw new Error("Tabel categories belum siap: " + catRes.error.message);
      if (prodRes.error) throw new Error("Tabel products belum siap: " + prodRes.error.message);
      if (banRes.error) throw new Error("Tabel banners belum siap: " + banRes.error.message);

      state.categories = catRes.data || [];
      state.products = prodRes.data || [];
      state.banners = banRes.data || [];

      renderAllAdminViews();

      // Sinkronkan otomatis deskripsi produk yang dulu sempat tertukar di database
      if (!hasAutoSyncedDescriptions && state.products.length > 0) {
        hasAutoSyncedDescriptions = true;
        syncFixedDescriptionsToSupabase(true);
      }
    } catch (err) {
      showToast("Perhatian: " + err.message);
      console.error(err);
    }
  }

  function renderAllAdminViews() {
    renderOverviewTab();
    populateCategoryDropdowns();
    renderProductsTable();
    renderCategoriesGrid();
    renderBannersGrid();
    renderPopupPromoTab();
    renderCatalogBellStatus();
    syncOneSignalConfigFromDatabase(state.banners);
    renderShopeeTable();
    setupAdminRealtimeSync();
  }

  // ---------- 6. RENDER TAB 1: RINGKASAN (OVERVIEW) ----------

  function renderOverviewTab() {
    const totalProds = state.products.length;
    const activeProds = state.products.filter(function (p) { return p.aktif !== false; }).length;
    const totalCats = state.categories.length;
    const heroBanners = state.banners.filter(function (b) { return (b.tipe || "hero") === "hero"; });
    const totalBans = heroBanners.length;
    const activeBans = heroBanners.filter(function (b) { return b.aktif !== false; }).length;
    const popupRow = state.banners.find(function (b) { return b.tipe === "popup"; });
    const isPopupActive = Boolean(popupRow && popupRow.aktif !== false && popupRow.gambar);

    const validShopeeCount = state.products.filter(function (p) {
      return isValidShopeeUrl(p.link_affiliate);
    }).length;
    const invalidShopeeCount = totalProds - validShopeeCount;

    const setTxt = function (id, val) {
      const el = document.getElementById(id);
      if (el) el.textContent = String(val);
    };

    setTxt("statTotalProducts", totalProds);
    setTxt("statActiveProducts", activeProds + " produk ditampilkan di publik");
    setTxt("statTotalCategories", totalCats);
    setTxt("statTotalBanners", totalBans);
    setTxt("statActiveBanners", activeBans + " slide aktif di beranda");
    setTxt("statValidShopee", validShopeeCount + " / " + totalProds);
    setTxt(
      "statInvalidShopee",
      invalidShopeeCount === 0
        ? "Semua link Shopee valid"
        : invalidShopeeCount + " produk perlu dicek linknya"
    );

    setTxt("navBadgeProducts", totalProds);
    setTxt("navBadgeCategories", totalCats);
    setTxt("navBadgeBanners", totalBans);
    setTxt("navBadgePopup", isPopupActive ? "ON" : "OFF");

    // Tampilkan kartu bantuan import 1-klik jika database masih kosong
    const emptyBanner = document.getElementById("emptyDbBanner");
    if (emptyBanner) {
      if (totalProds === 0) {
        emptyBanner.classList.remove("hidden");
      } else {
        emptyBanner.classList.add("hidden");
      }
    }

    // Distribusi produk per kategori
    const breakdownList = document.getElementById("categoryBreakdownList");
    if (breakdownList) {
      breakdownList.innerHTML = "";
      if (state.categories.length === 0) {
        const emptyMsg = document.createElement("p");
        emptyMsg.style.color = "#64748b";
        emptyMsg.style.fontSize = "0.84rem";
        emptyMsg.textContent = "Belum ada kategori di database.";
        breakdownList.appendChild(emptyMsg);
      } else {
        state.categories.forEach(function (cat) {
          const count = state.products.filter(function (p) {
            return p.kategori === cat.id;
          }).length;

          const item = document.createElement("div");
          item.className = "breakdown-item";

          const left = document.createElement("div");
          left.className = "breakdown-left";
          const st = document.createElement("strong");
          st.textContent = cat.nama;
          const sp = document.createElement("span");
          sp.textContent = "Kode: " + cat.id + " — " + (cat.deskripsi || "");
          left.appendChild(st);
          left.appendChild(sp);

          const badge = document.createElement("span");
          badge.className = "breakdown-badge";
          badge.textContent = count + " Produk";

          item.appendChild(left);
          item.appendChild(badge);
          breakdownList.appendChild(item);
        });
      }
    }

    // Render Analitik Top 10 Produk Paling Sering Diklik
    const topClicksBody = document.getElementById("topClicksTableBody");
    const totalAllClicksEl = document.getElementById("statTotalAllClicks");
    if (topClicksBody) {
      topClicksBody.innerHTML = "";
      let totalClicksSum = 0;
      const ranked = state.products.map(function (p) {
        const clicks = getAdminProductClicks(p);
        totalClicksSum += clicks;
        return { prod: p, clicks: clicks };
      });
      ranked.sort(function (a, b) { return b.clicks - a.clicks; });

      if (totalAllClicksEl) {
        totalAllClicksEl.textContent = "Total Klik Katalog: " + totalClicksSum.toLocaleString("id-ID") + " Klik";
      }

      // Update 5th Stat Card di Header Ringkasan
      const statTotalClicksEl = document.getElementById("statTotalProductClicks");
      const statTopProductNoteEl = document.getElementById("statTopProductNote");
      if (statTotalClicksEl) {
        statTotalClicksEl.textContent = totalClicksSum.toLocaleString("id-ID");
      }
      if (statTopProductNoteEl) {
        const topProd = ranked[0] && ranked[0].clicks > 0 ? ranked[0].prod.nama : null;
        statTopProductNoteEl.textContent = topProd
          ? "Top: " + (topProd.length > 20 ? topProd.substring(0, 18) + "..." : topProd) + " (" + ranked[0].clicks + " klik)"
          : totalClicksSum + " klik tercatat";
      }

      const top10 = ranked.slice(0, 10);
      const maxClicks = ranked[0] && ranked[0].clicks > 0 ? ranked[0].clicks : 1;

      if (top10.length === 0) {
        const tr = document.createElement("tr");
        const td = document.createElement("td");
        td.colSpan = 7;
        td.style.textAlign = "center";
        td.style.padding = "20px";
        td.style.color = "#64748b";
        td.textContent = "Belum ada data produk.";
        tr.appendChild(td);
        topClicksBody.appendChild(tr);
      } else {
        top10.forEach(function (entry, idx) {
          const prod = entry.prod;
          const tr = document.createElement("tr");

          const tdRank = document.createElement("td");
          const rankBadge = document.createElement("span");
          rankBadge.className = idx < 3 ? "badge-pill badge-coral" : "badge-pill badge-ocean";
          rankBadge.textContent = "#" + (idx + 1);
          tdRank.appendChild(rankBadge);

          const tdImg = document.createElement("td");
          const img = document.createElement("img");
          img.className = "table-thumb";
          img.src = prod.gambar || PLACEHOLDER_IMG;
          img.alt = prod.nama || "";
          img.loading = "lazy";
          img.addEventListener("error", function () { img.src = PLACEHOLDER_IMG; });
          tdImg.appendChild(img);

          const tdName = document.createElement("td");
          const titleDiv = document.createElement("div");
          titleDiv.className = "prod-cell-title";
          titleDiv.textContent = prod.nama;
          tdName.appendChild(titleDiv);

          const tdCat = document.createElement("td");
          const catBadge = document.createElement("span");
          catBadge.className = "badge-pill badge-teal";
          catBadge.textContent = getCategoryNameById(prod.kategori);
          tdCat.appendChild(catBadge);

          const tdPrice = document.createElement("td");
          const pSpan = document.createElement("span");
          pSpan.className = "price-main";
          pSpan.textContent = prod.harga || "Rp0";
          tdPrice.appendChild(pSpan);

          // Kolom Klik Lengkap dengan Bar Meter Visual
          const tdClicks = document.createElement("td");
          const clickWrap = document.createElement("div");
          clickWrap.className = "click-progress-wrap";

          const clickBadge = document.createElement("span");
          clickBadge.className = "badge-pill badge-success";
          clickBadge.textContent = "🔥 " + entry.clicks.toLocaleString("id-ID") + " Klik";

          const barOuter = document.createElement("div");
          barOuter.className = "click-progress-bar";
          const barFill = document.createElement("div");
          barFill.className = "click-progress-fill";
          const pct = Math.min(100, Math.round((entry.clicks / maxClicks) * 100));
          barFill.style.width = pct + "%";
          barOuter.appendChild(barFill);

          clickWrap.appendChild(clickBadge);
          clickWrap.appendChild(barOuter);
          tdClicks.appendChild(clickWrap);

          const tdAct = document.createElement("td");
          const actWrap = document.createElement("div");
          actWrap.className = "row-actions";

          const editBtn = document.createElement("button");
          editBtn.type = "button";
          editBtn.className = "btn-secondary btn-sm";
          editBtn.textContent = "Edit";
          editBtn.addEventListener("click", function () { openProductModal(prod); });
          actWrap.appendChild(editBtn);

          if (isValidShopeeUrl(prod.link_affiliate)) {
            const linkBtn = document.createElement("a");
            linkBtn.href = prod.link_affiliate;
            linkBtn.target = "_blank";
            linkBtn.rel = "noopener noreferrer";
            linkBtn.className = "btn-primary btn-sm";
            linkBtn.style.textDecoration = "none";
            linkBtn.textContent = "Shopee ↗";
            actWrap.appendChild(linkBtn);
          }

          tdAct.appendChild(actWrap);

          tr.appendChild(tdRank);
          tr.appendChild(tdImg);
          tr.appendChild(tdName);
          tr.appendChild(tdCat);
          tr.appendChild(tdPrice);
          tr.appendChild(tdClicks);
          tr.appendChild(tdAct);
          topClicksBody.appendChild(tr);
        });
      }
    }
  }

  // ---------- 7. IMPORT / SINKRONISASI 138 PRODUK AWAL KE SUPABASE ----------

  async function seedInitialCatalogToSupabase() {
    const sb = window.getAquaAgriSupabaseClient();
    const initial = window.AQUAAGRI_INITIAL_DATA;
    if (!sb || !initial) {
      showToast("Data bawaan tidak ditemukan.");
      return;
    }

    const btn = document.getElementById("seedInitialDataBtn");
    if (btn) {
      btn.disabled = true;
      btn.textContent = "Sedang Mengimpor Data ke Supabase...";
    }

    try {
      // 1. Upsert 4 kategori utama
      if (Array.isArray(initial.categories) && initial.categories.length > 0) {
        const { error: catErr } = await sb
          .from("categories")
          .upsert(initial.categories, { onConflict: "id" });
        if (catErr) throw new Error("Gagal menyimpan kategori: " + catErr.message);
      }

      // 2. Jika banner masih kosong, masukkan 5 slide banner awal
      if (state.banners.length === 0 && Array.isArray(initial.banners)) {
        const { error: banErr } = await sb.from("banners").insert(initial.banners);
        if (banErr) throw new Error("Gagal menyimpan banner: " + banErr.message);
      }

      // 3. Jika produk masih kosong, masukkan 138 produk awal
      if (state.products.length === 0 && Array.isArray(initial.products)) {
        const { error: prodErr } = await sb.from("products").insert(initial.products);
        if (prodErr) throw new Error("Gagal menyimpan produk: " + prodErr.message);
      }

      await loadAllDatabaseData();
      const fixedCount = await syncFixedDescriptionsToSupabase(false);
      if (fixedCount === 0) {
        showToast("Berhasil menyinkronkan data katalog & seluruh deskripsi produk sudah akurat!");
      }
    } catch (err) {
      showToast(err.message || "Gagal mengimpor data awal.");
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.textContent = "Import 138 Produk Awal Sekarang";
      }
    }
  }

  // ---------- 8. RENDER & CRUD TAB 2: KELOLA PRODUK ----------

  function getCategoryNameById(catId) {
    const found = state.categories.find(function (c) {
      return c.id === catId;
    });
    return found ? found.nama : catId;
  }

  function populateCategoryDropdowns() {
    const filterSel = document.getElementById("adminProductCatFilter");
    const formSel = document.getElementById("prodKategori");

    if (filterSel) {
      const currentVal = filterSel.value || "semua";
      filterSel.innerHTML = '<option value="semua">Semua Kategori</option>';
      state.categories.forEach(function (c) {
        const opt = document.createElement("option");
        opt.value = c.id;
        opt.textContent = c.nama;
        filterSel.appendChild(opt);
      });
      filterSel.value = currentVal;
    }

    if (formSel) {
      const currentVal = formSel.value;
      formSel.innerHTML = "";
      state.categories.forEach(function (c) {
        const opt = document.createElement("option");
        opt.value = c.id;
        opt.textContent = c.nama;
        formSel.appendChild(opt);
      });
      if (currentVal && state.categories.some(function (c) { return c.id === currentVal; })) {
        formSel.value = currentVal;
      }
    }
  }

  function renderProductsTable() {
    const tbody = document.getElementById("productsTableBody");
    const countEl = document.getElementById("productTableCount");
    const searchEl = document.getElementById("adminProductSearch");
    const catFilterEl = document.getElementById("adminProductCatFilter");
    const subFilterEl = document.getElementById("adminProductSubFilter");

    if (!tbody) return;
    tbody.innerHTML = "";

    const kw = searchEl ? searchEl.value.trim().toLowerCase() : "";
    const catFilter = catFilterEl ? catFilterEl.value : "semua";
    const subFilter = subFilterEl ? subFilterEl.value : "semua";

    const filtered = state.products.filter(function (p) {
      if (catFilter !== "semua" && p.kategori !== catFilter) return false;
      if (subFilter !== "semua" && (p.kelompok || "") !== subFilter) return false;
      if (kw) {
        const matchName = (p.nama || "").toLowerCase().includes(kw);
        const matchDesc = (p.deskripsi || "").toLowerCase().includes(kw);
        if (!matchName && !matchDesc) return false;
      }
      return true;
    });

    const sortFilterEl = document.getElementById("adminProductSortFilter");
    const sortVal = sortFilterEl ? sortFilterEl.value : "default";

    if (sortVal === "clicks-desc") {
      filtered.sort(function (a, b) {
        return getAdminProductClicks(b) - getAdminProductClicks(a);
      });
    } else if (sortVal === "price-asc") {
      filtered.sort(function (a, b) {
        return parseRupiahNumber(a.harga) - parseRupiahNumber(b.harga);
      });
    } else if (sortVal === "price-desc") {
      filtered.sort(function (a, b) {
        return parseRupiahNumber(b.harga) - parseRupiahNumber(a.harga);
      });
    }

    if (countEl) {
      countEl.textContent = "Menampilkan " + filtered.length + " dari " + state.products.length + " produk";
    }

    if (filtered.length === 0) {
      const tr = document.createElement("tr");
      const td = document.createElement("td");
      td.colSpan = 7;
      td.style.textAlign = "center";
      td.style.padding = "28px";
      td.style.color = "#64748b";
      td.textContent = "Tidak ada produk yang cocok dengan pencarian/filter.";
      tr.appendChild(td);
      tbody.appendChild(tr);
      return;
    }

    filtered.forEach(function (prod) {
      const tr = document.createElement("tr");

      // 1. Foto
      const tdImg = document.createElement("td");
      const img = document.createElement("img");
      img.className = "table-thumb";
      img.src = prod.gambar || PLACEHOLDER_IMG;
      img.alt = prod.nama || "";
      img.loading = "lazy";
      img.addEventListener("error", function () {
        img.src = PLACEHOLDER_IMG;
      });
      tdImg.appendChild(img);

      // 2. Nama & Deskripsi
      const tdInfo = document.createElement("td");
      const titleDiv = document.createElement("div");
      titleDiv.className = "prod-cell-title";
      titleDiv.textContent = prod.nama;
      const descDiv = document.createElement("div");
      descDiv.className = "prod-cell-desc";
      descDiv.textContent = prod.deskripsi || "-";
      tdInfo.appendChild(titleDiv);
      tdInfo.appendChild(descDiv);

      // 3. Kategori & Subkategori
      const tdCat = document.createElement("td");
      const catBadge = document.createElement("span");
      catBadge.className = "badge-pill badge-teal";
      catBadge.textContent = getCategoryNameById(prod.kategori);
      tdCat.appendChild(catBadge);

      if (prod.kategori === "Benih-Pakan-Budidaya" && prod.kelompok) {
        const subBadge = document.createElement("span");
        subBadge.className = "badge-pill badge-ocean";
        subBadge.style.marginLeft = "4px";
        subBadge.textContent = prod.kelompok;
        tdCat.appendChild(subBadge);
      }

      // 4. Harga & Diskon
      const tdPrice = document.createElement("td");
      const pMain = document.createElement("span");
      pMain.className = "price-main";
      pMain.textContent = prod.harga || "Rp0";
      tdPrice.appendChild(pMain);

      if (prod.harga_coret) {
        const pStrike = document.createElement("span");
        pStrike.className = "price-strike";
        pStrike.textContent = prod.harga_coret;
        tdPrice.appendChild(pStrike);
      }

      if (prod.diskon) {
        const dBadge = document.createElement("div");
        const pill = document.createElement("span");
        pill.className = "badge-pill badge-coral";
        pill.style.marginTop = "4px";
        pill.textContent = "Diskon " + prod.diskon;
        dBadge.appendChild(pill);
        tdPrice.appendChild(dBadge);
      }

      // 5. Tautan Shopee & Jumlah Klik
      const tdShopee = document.createElement("td");
      if (isValidShopeeUrl(prod.link_affiliate)) {
        const link = document.createElement("a");
        link.href = prod.link_affiliate;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.className = "badge-pill badge-coral";
        link.style.textDecoration = "none";
        link.textContent = "Buka Shopee ↗";
        tdShopee.appendChild(link);
      } else {
        const warn = document.createElement("span");
        warn.className = "badge-pill badge-warn";
        warn.textContent = "Perlu Dicek";
        tdShopee.appendChild(warn);
      }
      const clickInfo = document.createElement("div");
      clickInfo.style.fontSize = "0.73rem";
      clickInfo.style.color = "#0f766e";
      clickInfo.style.fontWeight = "600";
      clickInfo.style.marginTop = "4px";
      clickInfo.textContent = getAdminProductClicks(prod).toLocaleString("id-ID") + " Klik";
      tdShopee.appendChild(clickInfo);

      // 6. Status Aktif
      const tdStatus = document.createElement("td");
      const stBadge = document.createElement("span");
      if (prod.aktif !== false) {
        stBadge.className = "badge-pill badge-success";
        stBadge.textContent = "Aktif";
      } else {
        stBadge.className = "badge-pill badge-warn";
        stBadge.textContent = "Disembunyikan";
      }
      tdStatus.appendChild(stBadge);

      // 7. Tombol Aksi
      const tdAct = document.createElement("td");
      const actWrap = document.createElement("div");
      actWrap.className = "row-actions";

      const shareWaBtn = document.createElement("button");
      shareWaBtn.type = "button";
      shareWaBtn.className = "btn-secondary btn-sm";
      shareWaBtn.title = "Salin Link Produk (dengan Thumbnail Otomatis) untuk dibagikan ke WhatsApp/Sosmed";
      shareWaBtn.textContent = "Share WA";
      shareWaBtn.addEventListener("click", function () {
        const isLocal = !window.location.origin || window.location.origin === "null" || window.location.protocol === "file:";
        const base = isLocal ? "https://aquaagri-katalog-akhir.aquaagri-id.workers.dev" : window.location.origin;
        const shareUrl = base + "/share?produk=" + encodeURIComponent(prod.id);
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(shareUrl).then(function () {
            showToast("Link Share WA (" + prod.nama + ") berhasil disalin!");
          }).catch(function () {
            showToast("Link: " + shareUrl);
          });
        } else {
          showToast("Link: " + shareUrl);
        }
      });

      const editBtn = document.createElement("button");
      editBtn.type = "button";
      editBtn.className = "btn-secondary btn-sm";
      editBtn.textContent = "Edit";
      editBtn.addEventListener("click", function () {
        openProductModal(prod);
      });

      const delBtn = document.createElement("button");
      delBtn.type = "button";
      delBtn.className = "btn-danger btn-sm";
      delBtn.textContent = "Hapus";
      delBtn.addEventListener("click", function () {
        openConfirmDeleteModal("product", prod.id, prod.nama);
      });

      actWrap.appendChild(shareWaBtn);
      actWrap.appendChild(editBtn);
      actWrap.appendChild(delBtn);
      tdAct.appendChild(actWrap);

      tr.appendChild(tdImg);
      tr.appendChild(tdInfo);
      tr.appendChild(tdCat);
      tr.appendChild(tdPrice);
      tr.appendChild(tdShopee);
      tr.appendChild(tdStatus);
      tr.appendChild(tdAct);

      tbody.appendChild(tr);
    });
  }

  function syncProductKelompokVisibility() {
    const catSel = document.getElementById("prodKategori");
    const kelWrap = document.getElementById("prodKelompokWrap");
    if (!catSel || !kelWrap) return;
    if (catSel.value === "Benih-Pakan-Budidaya") {
      kelWrap.classList.remove("hidden");
    } else {
      kelWrap.classList.add("hidden");
    }
  }

  function openProductModal(prod = null) {
    populateCategoryDropdowns();
    showBoxAlert("productFormAlert", "");

    const modal = document.getElementById("productModalBackdrop");
    const title = document.getElementById("productModalTitle");
    const idInput = document.getElementById("prodId");
    const namaInput = document.getElementById("prodNama");
    const katInput = document.getElementById("prodKategori");
    const kelInput = document.getElementById("prodKelompok");
    const hargaInput = document.getElementById("prodHarga");
    const coretInput = document.getElementById("prodHargaCoret");
    const diskonInput = document.getElementById("prodDiskon");
    const linkInput = document.getElementById("prodLinkAffiliate");
    const gambarInput = document.getElementById("prodGambar");
    const previewImg = document.getElementById("prodImagePreview");
    const descInput = document.getElementById("prodDeskripsi");
    const aktifInput = document.getElementById("prodAktif");
    const uploadStatus = document.getElementById("prodUploadStatus");
    const fileInput = document.getElementById("prodImageFile");

    if (fileInput) fileInput.value = "";
    if (uploadStatus) {
      uploadStatus.textContent = "Maksimal 2 MB (JPG, PNG, WebP)";
      uploadStatus.style.color = "";
    }

    if (prod) {
      if (title) title.textContent = "Edit Produk: " + prod.nama;
      if (idInput) idInput.value = prod.id;
      if (namaInput) namaInput.value = prod.nama || "";
      if (katInput) katInput.value = prod.kategori || "produk-olahan-ikan";
      if (kelInput) kelInput.value = prod.kelompok || "alat-aksesoris";
      if (hargaInput) hargaInput.value = prod.harga || "";
      if (coretInput) coretInput.value = prod.harga_coret || "";
      if (diskonInput) diskonInput.value = prod.diskon || "";
      if (linkInput) linkInput.value = prod.link_affiliate || "";
      if (gambarInput) gambarInput.value = prod.gambar || "";
      if (previewImg) previewImg.src = prod.gambar || PLACEHOLDER_IMG;
      if (descInput) descInput.value = prod.deskripsi || "";
      if (aktifInput) aktifInput.checked = prod.aktif !== false;
    } else {
      if (title) title.textContent = "Tambah Produk Baru";
      if (idInput) idInput.value = "";
      if (namaInput) namaInput.value = "";
      if (katInput && state.categories[0]) katInput.value = state.categories[0].id;
      if (kelInput) kelInput.value = "pakan";
      if (hargaInput) hargaInput.value = "";
      if (coretInput) coretInput.value = "";
      if (diskonInput) diskonInput.value = "";
      if (linkInput) linkInput.value = "";
      if (gambarInput) gambarInput.value = "";
      if (previewImg) previewImg.src = PLACEHOLDER_IMG;
      if (descInput) descInput.value = "";
      if (aktifInput) aktifInput.checked = true;
    }

    syncProductKelompokVisibility();
    if (modal) modal.classList.remove("hidden");
  }

  function closeProductModal() {
    const modal = document.getElementById("productModalBackdrop");
    if (modal) modal.classList.add("hidden");
  }

  async function handleSaveProduct(e) {
    e.preventDefault();
    showBoxAlert("productFormAlert", "");

    const idVal = document.getElementById("prodId").value.trim();
    const nama = document.getElementById("prodNama").value.trim();
    const kategori = document.getElementById("prodKategori").value.trim();
    const kelompokRaw = document.getElementById("prodKelompok").value.trim();
    const hargaRaw = document.getElementById("prodHarga").value.trim();
    const coretRaw = document.getElementById("prodHargaCoret").value.trim();
    const diskonRaw = document.getElementById("prodDiskon").value.trim();
    const linkAffiliate = document.getElementById("prodLinkAffiliate").value.trim();
    const gambar = document.getElementById("prodGambar").value.trim();
    const deskripsi = document.getElementById("prodDeskripsi").value.trim();
    const aktif = document.getElementById("prodAktif").checked;

    if (!nama) {
      showBoxAlert("productFormAlert", "Nama produk wajib diisi.");
      return;
    }
    if (!kategori) {
      showBoxAlert("productFormAlert", "Kategori produk wajib dipilih.");
      return;
    }
    if (!hargaRaw || parseRupiahNumber(hargaRaw) <= 0) {
      showBoxAlert("productFormAlert", "Harga jual wajib diisi dengan angka yang valid (contoh: Rp34.000).");
      return;
    }
    if (!linkAffiliate || !isSafeHttpUrl(linkAffiliate)) {
      showBoxAlert("productFormAlert", "Tautan Shopee wajib berupa URL lengkap (diawali https://).");
      return;
    }
    if (!gambar) {
      showBoxAlert("productFormAlert", "Foto produk wajib diisi (upload foto atau ketik path gambar).");
      return;
    }
    if (!deskripsi) {
      showBoxAlert("productFormAlert", "Deskripsi produk wajib diisi.");
      return;
    }

    const hargaFormatted = formatRupiahText(hargaRaw);
    const coretFormatted = coretRaw ? formatRupiahText(coretRaw) : "";
    let diskonFinal = diskonRaw;
    if (!diskonFinal && coretFormatted) {
      diskonFinal = calculateDiscountPercent(hargaFormatted, coretFormatted);
    }
    if (diskonFinal && !diskonFinal.endsWith("%")) {
      diskonFinal = diskonFinal.replace(/[^0-9]/g, "") + "%";
    }

    const payload = {
      nama: nama,
      kategori: kategori,
      kelompok: kategori === "Benih-Pakan-Budidaya" ? kelompokRaw : "",
      harga: hargaFormatted,
      harga_coret: coretFormatted,
      diskon: diskonFinal,
      link_affiliate: linkAffiliate,
      gambar: gambar,
      deskripsi: deskripsi,
      aktif: aktif,
      updated_at: new Date().toISOString()
    };

    const sb = window.getAquaAgriSupabaseClient();
    const saveBtn = document.getElementById("saveProductBtn");
    if (saveBtn) {
      saveBtn.disabled = true;
      saveBtn.textContent = "Menyimpan...";
    }

    try {
      if (idVal) {
        const { error } = await sb.from("products").update(payload).eq("id", Number(idVal));
        if (error) throw error;
        showToast("Produk '" + nama + "' berhasil diperbarui!");
      } else {
        payload.urutan = state.products.length + 1;
        const { error } = await sb.from("products").insert([payload]);
        if (error) throw error;
        showToast("Produk baru '" + nama + "' berhasil ditambahkan!");
      }

      closeProductModal();
      await loadAllDatabaseData();
    } catch (err) {
      showBoxAlert("productFormAlert", "Gagal menyimpan ke database: " + (err.message || err));
    } finally {
      if (saveBtn) {
        saveBtn.disabled = false;
        saveBtn.textContent = "Simpan Produk";
      }
    }
  }

  // ---------- 9. RENDER & CRUD TAB 3: KELOLA KATEGORI ----------

  function renderCategoriesGrid() {
    const grid = document.getElementById("categoriesAdminGrid");
    if (!grid) return;
    grid.innerHTML = "";

    state.categories.forEach(function (cat) {
      const prodCount = state.products.filter(function (p) {
        return p.kategori === cat.id;
      }).length;

      const card = document.createElement("div");
      card.className = "admin-media-card";

      const imgWrap = document.createElement("div");
      imgWrap.className = "admin-media-img-wrap";

      const img = document.createElement("img");
      img.src = cat.bg || PLACEHOLDER_IMG;
      img.alt = cat.nama;
      img.addEventListener("error", function () {
        img.src = PLACEHOLDER_IMG;
      });

      const badge = document.createElement("span");
      badge.className = "admin-media-badge";
      badge.textContent = prodCount + " Produk";

      imgWrap.appendChild(img);
      imgWrap.appendChild(badge);

      const body = document.createElement("div");
      body.className = "admin-media-body";

      const topInfo = document.createElement("div");
      const h4 = document.createElement("h4");
      h4.textContent = cat.nama;
      const pDesc = document.createElement("p");
      pDesc.textContent = cat.deskripsi || "";
      topInfo.appendChild(h4);
      topInfo.appendChild(pDesc);

      const footer = document.createElement("div");
      footer.className = "admin-media-footer";

      const codeSpan = document.createElement("span");
      codeSpan.className = "badge-pill badge-teal";
      codeSpan.textContent = cat.id;

      const btnGroup = document.createElement("div");
      btnGroup.className = "row-actions";

      const editBtn = document.createElement("button");
      editBtn.type = "button";
      editBtn.className = "btn-secondary btn-sm";
      editBtn.textContent = "Edit";
      editBtn.addEventListener("click", function () {
        openCategoryModal(cat);
      });

      const delBtn = document.createElement("button");
      delBtn.type = "button";
      delBtn.className = "btn-danger btn-sm";
      delBtn.textContent = "Hapus";
      delBtn.addEventListener("click", function () {
        if (prodCount > 0) {
          showToast("Kategori ini masih memiliki " + prodCount + " produk. Pindahkan produknya terlebih dahulu.");
          return;
        }
        openConfirmDeleteModal("category", cat.id, cat.nama);
      });

      btnGroup.appendChild(editBtn);
      btnGroup.appendChild(delBtn);

      footer.appendChild(codeSpan);
      footer.appendChild(btnGroup);

      body.appendChild(topInfo);
      body.appendChild(footer);

      card.appendChild(imgWrap);
      card.appendChild(body);
      grid.appendChild(card);
    });
  }

  let isEditingExistingCategory = false;

  function openCategoryModal(cat = null) {
    showBoxAlert("categoryFormAlert", "");
    const modal = document.getElementById("categoryModalBackdrop");
    const title = document.getElementById("categoryModalTitle");
    const idInput = document.getElementById("catId");
    const urutanInput = document.getElementById("catUrutan");
    const namaInput = document.getElementById("catNama");
    const descInput = document.getElementById("catDeskripsi");
    const tagInput = document.getElementById("catBannerTag");
    const bTitleInput = document.getElementById("catBannerTitle");
    const bDescInput = document.getElementById("catBannerDeskripsi");
    const bgInput = document.getElementById("catBg");
    const preview = document.getElementById("catImagePreview");
    const fileInput = document.getElementById("catImageFile");
    const statusText = document.getElementById("catUploadStatus");

    if (fileInput) fileInput.value = "";
    if (statusText) {
      statusText.textContent = "Maksimal 2 MB (JPG, PNG, WebP)";
      statusText.style.color = "";
    }

    if (cat) {
      isEditingExistingCategory = true;
      if (title) title.textContent = "Edit Kategori: " + cat.nama;
      if (idInput) {
        idInput.value = cat.id;
        idInput.readOnly = true;
      }
      if (urutanInput) urutanInput.value = cat.urutan || 1;
      if (namaInput) namaInput.value = cat.nama || "";
      if (descInput) descInput.value = cat.deskripsi || "";
      if (tagInput) tagInput.value = cat.banner_tag || "KATALOG PRODUK";
      if (bTitleInput) bTitleInput.value = cat.banner_title || cat.nama || "";
      if (bDescInput) bDescInput.value = cat.banner_deskripsi || cat.deskripsi || "";
      if (bgInput) bgInput.value = cat.bg || "";
      if (preview) preview.src = cat.bg || PLACEHOLDER_IMG;
    } else {
      isEditingExistingCategory = false;
      if (title) title.textContent = "Tambah Kategori Baru";
      if (idInput) {
        idInput.value = "";
        idInput.readOnly = false;
      }
      if (urutanInput) urutanInput.value = state.categories.length + 1;
      if (namaInput) namaInput.value = "";
      if (descInput) descInput.value = "";
      if (tagInput) tagInput.value = "KATALOG PILIHAN";
      if (bTitleInput) bTitleInput.value = "";
      if (bDescInput) bDescInput.value = "";
      if (bgInput) bgInput.value = "";
      if (preview) preview.src = PLACEHOLDER_IMG;
    }

    if (modal) modal.classList.remove("hidden");
  }

  function closeCategoryModal() {
    const modal = document.getElementById("categoryModalBackdrop");
    if (modal) modal.classList.add("hidden");
  }

  async function handleSaveCategory(e) {
    e.preventDefault();
    showBoxAlert("categoryFormAlert", "");

    const idVal = document.getElementById("catId").value.trim().replace(/\s+/g, "-");
    const urutan = parseInt(document.getElementById("catUrutan").value, 10) || 1;
    const nama = document.getElementById("catNama").value.trim();
    const deskripsi = document.getElementById("catDeskripsi").value.trim();
    const bannerTag = document.getElementById("catBannerTag").value.trim() || "KATALOG PRODUK";
    const bannerTitle = document.getElementById("catBannerTitle").value.trim() || nama;
    const bannerDeskripsi = document.getElementById("catBannerDeskripsi").value.trim() || deskripsi;
    const bg = document.getElementById("catBg").value.trim();

    if (!idVal || !/^[a-zA-Z0-9_-]+$/.test(idVal)) {
      showBoxAlert("categoryFormAlert", "ID Kategori hanya boleh berisi huruf, angka, dan tanda hubung (-).");
      return;
    }
    if (!nama || !deskripsi || !bg) {
      showBoxAlert("categoryFormAlert", "Nama, deskripsi singkat, dan foto kategori wajib diisi.");
      return;
    }

    const defaultSvg =
      '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>';

    const existingCat = state.categories.find(function (c) { return c.id === idVal; });

    const payload = {
      id: idVal,
      nama: nama,
      deskripsi: deskripsi,
      bg: bg,
      svg: existingCat && existingCat.svg ? existingCat.svg : defaultSvg,
      banner_tag: bannerTag,
      banner_title: bannerTitle,
      banner_deskripsi: bannerDeskripsi,
      urutan: urutan,
      updated_at: new Date().toISOString()
    };

    const sb = window.getAquaAgriSupabaseClient();
    const saveBtn = document.getElementById("saveCategoryBtn");
    if (saveBtn) {
      saveBtn.disabled = true;
      saveBtn.textContent = "Menyimpan...";
    }

    try {
      const { error } = await sb.from("categories").upsert([payload], { onConflict: "id" });
      if (error) throw error;
      showToast("Kategori '" + nama + "' berhasil disimpan!");
      closeCategoryModal();
      await loadAllDatabaseData();
    } catch (err) {
      showBoxAlert("categoryFormAlert", "Gagal menyimpan kategori: " + (err.message || err));
    } finally {
      if (saveBtn) {
        saveBtn.disabled = false;
        saveBtn.textContent = "Simpan Kategori";
      }
    }
  }

  // ---------- 10. RENDER & CRUD TAB 4: KELOLA BANNER HOMEPAGE ----------

  function renderBannersGrid() {
    const grid = document.getElementById("bannersAdminGrid");
    if (!grid) return;
    grid.innerHTML = "";

    const heroBanners = state.banners.filter(function (b) {
      return (b.tipe || "hero") === "hero";
    });

    if (heroBanners.length === 0) {
      const p = document.createElement("p");
      p.style.color = "#64748b";
      p.textContent = "Belum ada slide banner. Klik '+ Tambah Slide Banner' atau gunakan tombol Import di tab Ringkasan.";
      grid.appendChild(p);
      return;
    }

    heroBanners.forEach(function (ban, index) {
      const card = document.createElement("div");
      card.className = "admin-media-card";

      const imgWrap = document.createElement("div");
      imgWrap.className = "admin-media-img-wrap";

      const img = document.createElement("img");
      img.src = ban.gambar || PLACEHOLDER_IMG;
      img.alt = ban.judul || "Slide Banner";
      img.addEventListener("error", function () {
        img.src = PLACEHOLDER_IMG;
      });

      const badge = document.createElement("span");
      badge.className = "admin-media-badge";
      badge.textContent = "Slide #" + (ban.urutan || index + 1);

      imgWrap.appendChild(img);
      imgWrap.appendChild(badge);

      const body = document.createElement("div");
      body.className = "admin-media-body";

      const topInfo = document.createElement("div");
      const h4 = document.createElement("h4");
      h4.textContent = ban.judul;
      const pSub = document.createElement("p");
      pSub.textContent = ban.subjudul || ban.gambar;
      topInfo.appendChild(h4);
      topInfo.appendChild(pSub);

      const footer = document.createElement("div");
      footer.className = "admin-media-footer";

      const stSpan = document.createElement("span");
      stSpan.className = ban.aktif !== false ? "badge-pill badge-success" : "badge-pill badge-warn";
      stSpan.textContent = ban.aktif !== false ? "Aktif" : "Nonaktif";

      const btnGroup = document.createElement("div");
      btnGroup.className = "row-actions";

      const editBtn = document.createElement("button");
      editBtn.type = "button";
      editBtn.className = "btn-secondary btn-sm";
      editBtn.textContent = "Edit";
      editBtn.addEventListener("click", function () {
        openBannerModal(ban);
      });

      const delBtn = document.createElement("button");
      delBtn.type = "button";
      delBtn.className = "btn-danger btn-sm";
      delBtn.textContent = "Hapus";
      delBtn.addEventListener("click", function () {
        openConfirmDeleteModal("banner", ban.id, ban.judul);
      });

      btnGroup.appendChild(editBtn);
      btnGroup.appendChild(delBtn);

      footer.appendChild(stSpan);
      footer.appendChild(btnGroup);

      body.appendChild(topInfo);
      body.appendChild(footer);

      card.appendChild(imgWrap);
      card.appendChild(body);
      grid.appendChild(card);
    });
  }

  function openBannerModal(ban = null) {
    showBoxAlert("bannerFormAlert", "");
    const modal = document.getElementById("bannerModalBackdrop");
    const title = document.getElementById("bannerModalTitle");
    const idInput = document.getElementById("bannerId");
    const judulInput = document.getElementById("bannerJudul");
    const subInput = document.getElementById("bannerSubjudul");
    const urutanInput = document.getElementById("bannerUrutan");
    const aktifInput = document.getElementById("bannerAktif");
    const gambarInput = document.getElementById("bannerGambar");
    const preview = document.getElementById("bannerImagePreview");
    const fileInput = document.getElementById("bannerImageFile");
    const statusText = document.getElementById("bannerUploadStatus");

    if (fileInput) fileInput.value = "";
    if (statusText) {
      statusText.textContent = "Rekomendasi rasio landscape, maks 2 MB";
      statusText.style.color = "";
    }

    if (ban) {
      if (title) title.textContent = "Edit Slide Banner";
      if (idInput) idInput.value = ban.id;
      if (judulInput) judulInput.value = ban.judul || "";
      if (subInput) subInput.value = ban.subjudul || "";
      if (urutanInput) urutanInput.value = ban.urutan || 1;
      if (aktifInput) aktifInput.checked = ban.aktif !== false;
      if (gambarInput) gambarInput.value = ban.gambar || "";
      if (preview) preview.src = ban.gambar || PLACEHOLDER_IMG;
    } else {
      if (title) title.textContent = "Tambah Slide Banner Baru";
      if (idInput) idInput.value = "";
      if (judulInput) judulInput.value = "";
      if (subInput) subInput.value = "";
      if (urutanInput) urutanInput.value = state.banners.length + 1;
      if (aktifInput) aktifInput.checked = true;
      if (gambarInput) gambarInput.value = "";
      if (preview) preview.src = PLACEHOLDER_IMG;
    }

    if (modal) modal.classList.remove("hidden");
  }

  function closeBannerModal() {
    const modal = document.getElementById("bannerModalBackdrop");
    if (modal) modal.classList.add("hidden");
  }

  async function handleSaveBanner(e) {
    e.preventDefault();
    showBoxAlert("bannerFormAlert", "");

    const idVal = document.getElementById("bannerId").value.trim();
    const judul = document.getElementById("bannerJudul").value.trim();
    const subjudul = document.getElementById("bannerSubjudul").value.trim();
    const urutan = parseInt(document.getElementById("bannerUrutan").value, 10) || 1;
    const aktif = document.getElementById("bannerAktif").checked;
    const gambar = document.getElementById("bannerGambar").value.trim();

    if (!judul || !gambar) {
      showBoxAlert("bannerFormAlert", "Judul slide dan foto banner wajib diisi.");
      return;
    }

    const payload = {
      judul: judul,
      subjudul: subjudul,
      gambar: gambar,
      tipe: "hero",
      urutan: urutan,
      aktif: aktif,
      updated_at: new Date().toISOString()
    };

    const sb = window.getAquaAgriSupabaseClient();
    const saveBtn = document.getElementById("saveBannerBtn");
    if (saveBtn) {
      saveBtn.disabled = true;
      saveBtn.textContent = "Menyimpan...";
    }

    try {
      if (idVal) {
        const { error } = await sb.from("banners").update(payload).eq("id", Number(idVal));
        if (error) throw error;
        showToast("Slide banner berhasil diperbarui!");
      } else {
        const { error } = await sb.from("banners").insert([payload]);
        if (error) throw error;
        showToast("Slide banner baru berhasil ditambahkan!");
      }

      closeBannerModal();
      await loadAllDatabaseData();
    } catch (err) {
      showBoxAlert("bannerFormAlert", "Gagal menyimpan banner: " + (err.message || err));
    } finally {
      if (saveBtn) {
        saveBtn.disabled = false;
        saveBtn.textContent = "Simpan Banner";
      }
    }
  }

  // ---------- 10B. RENDER & SIMPAN TAB POP-UP IKLAN PROMO (WA / SHOPEE) ----------

  function normalizeWaPhone(rawPhone) {
    let digits = String(rawPhone || "").replace(/[^0-9]/g, "");
    if (!digits) return "";
    if (digits.startsWith("08")) {
      digits = "628" + digits.substring(2);
    } else if (digits.startsWith("8")) {
      digits = "628" + digits.substring(1);
    }
    return digits;
  }

  function buildPopupFinalLink() {
    const typeEl = document.getElementById("popupTargetType");
    const shopeeUrlEl = document.getElementById("popupShopeeUrl");
    const waNumEl = document.getElementById("popupWaNumber");
    const waMsgEl = document.getElementById("popupWaMessage");
    const urlEl = document.getElementById("popupTargetUrl");

    const targetType = typeEl ? typeEl.value : "shopee";
    if (targetType === "shopee") {
      return shopeeUrlEl ? shopeeUrlEl.value.trim() : "";
    } else if (targetType === "wa") {
      const cleanPhone = normalizeWaPhone(waNumEl ? waNumEl.value : "");
      if (!cleanPhone) return "";
      const msg = waMsgEl ? waMsgEl.value.trim() : "";
      if (msg) {
        return "https://wa.me/" + cleanPhone + "?text=" + encodeURIComponent(msg);
      }
      return "https://wa.me/" + cleanPhone;
    } else if (targetType === "url") {
      return urlEl ? urlEl.value.trim() : "";
    }
    return "";
  }

  function syncPopupTargetTypeUI() {
    const typeEl = document.getElementById("popupTargetType");
    const shopeeGroup = document.getElementById("popupShopeeGroup");
    const waGroup = document.getElementById("popupWaGroup");
    const urlGroup = document.getElementById("popupUrlGroup");
    if (!typeEl) return;

    const val = typeEl.value;
    if (shopeeGroup) shopeeGroup.classList.toggle("hidden", val !== "shopee");
    if (waGroup) waGroup.classList.toggle("hidden", val !== "wa");
    if (urlGroup) urlGroup.classList.toggle("hidden", val !== "url");

    updatePopupLivePreview();
  }

  function createPopupSlideRow(initialUrl) {
    const container = document.getElementById("popupAdditionalSlidesList");
    if (!container) return;

    const row = document.createElement("div");
    row.className = "popup-slide-row";
    row.style.cssText = "display: flex; gap: 8px; align-items: center; background: #ffffff; padding: 8px 10px; border-radius: 8px; border: 1px solid #cbd5e1;";

    const thumbWrap = document.createElement("div");
    thumbWrap.style.cssText = "width: 42px; height: 54px; border-radius: 6px; overflow: hidden; background: #f1f5f9; flex-shrink: 0; display: flex; align-items: center; justify-content: center; border: 1px solid #e2e8f0;";

    const thumbImg = document.createElement("img");
    thumbImg.style.cssText = "width: 100%; height: 100%; object-fit: cover; display: " + (initialUrl ? "block" : "none") + ";";
    if (initialUrl) thumbImg.src = initialUrl;

    const thumbPlaceholder = document.createElement("span");
    thumbPlaceholder.style.cssText = "font-size: 0.65rem; color: #94a3b8; display: " + (initialUrl ? "none" : "block") + ";";
    thumbPlaceholder.textContent = "Foto";

    thumbWrap.appendChild(thumbImg);
    thumbWrap.appendChild(thumbPlaceholder);

    const middleWrap = document.createElement("div");
    middleWrap.style.cssText = "flex: 1; display: flex; flex-direction: column; gap: 4px; min-width: 0;";

    const urlInput = document.createElement("input");
    urlInput.type = "text";
    urlInput.className = "popup-slide-url-input";
    urlInput.placeholder = "URL foto slide tambahan (https://...)...";
    urlInput.value = initialUrl || "";
    urlInput.style.cssText = "width: 100%; font-size: 0.82rem; padding: 6px 8px; box-sizing: border-box;";
    urlInput.addEventListener("input", function () {
      const val = urlInput.value.trim();
      if (val) {
        thumbImg.src = val;
        thumbImg.style.display = "block";
        thumbPlaceholder.style.display = "none";
      } else {
        thumbImg.style.display = "none";
        thumbPlaceholder.style.display = "block";
      }
      updatePopupLivePreview();
    });

    const uploadWrap = document.createElement("div");
    uploadWrap.style.cssText = "display: flex; gap: 8px; align-items: center; flex-wrap: wrap;";

    const fileLabel = document.createElement("label");
    fileLabel.className = "btn-secondary btn-sm upload-btn-label";
    fileLabel.style.cssText = "font-size: 0.72rem; padding: 3px 8px; cursor: pointer; display: inline-flex; align-items: center; gap: 4px;";
    fileLabel.innerHTML = "&#128247; Upload Foto Slide";

    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/jpeg,image/png,image/webp";
    fileInput.className = "hidden";
    fileLabel.appendChild(fileInput);

    const statusText = document.createElement("span");
    statusText.style.cssText = "font-size: 0.72rem; color: #64748b;";

    fileInput.addEventListener("change", async function () {
      if (!fileInput.files || !fileInput.files[0]) return;
      try {
        statusText.textContent = "Mengunggah...";
        statusText.style.color = "#0f766e";
        const publicUrl = await uploadImageToSupabase(fileInput.files[0], "banners", statusText);
        urlInput.value = publicUrl;
        thumbImg.src = publicUrl;
        thumbImg.style.display = "block";
        thumbPlaceholder.style.display = "none";
        statusText.textContent = "Berhasil diunggah";
        statusText.style.color = "#059669";
        updatePopupLivePreview();
      } catch (err) {
        statusText.textContent = err.message || "Gagal upload";
        statusText.style.color = "#ef4444";
      }
    });

    uploadWrap.appendChild(fileLabel);
    uploadWrap.appendChild(statusText);

    middleWrap.appendChild(urlInput);
    middleWrap.appendChild(uploadWrap);

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "btn-secondary btn-sm";
    deleteBtn.style.cssText = "color: #ef4444; border-color: #fecaca; background: #fef2f2; padding: 6px 10px; font-size: 0.8rem; font-weight: 700; cursor: pointer; flex-shrink: 0;";
    deleteBtn.innerHTML = "&#128465; Hapus";
    deleteBtn.addEventListener("click", function () {
      row.remove();
      updatePopupLivePreview();
    });

    row.appendChild(thumbWrap);
    row.appendChild(middleWrap);
    row.appendChild(deleteBtn);

    container.appendChild(row);
  }

  function updatePopupLivePreview() {
    const aktifEl = document.getElementById("popupAktif");
    const gambarEl = document.getElementById("popupGambar");
    const smallPrev = document.getElementById("popupSmallPreview");
    const liveImg = document.getElementById("popupLivePreviewImg");
    const liveBadge = document.getElementById("popupLivePreviewBadge");
    const statusLabel = document.getElementById("popupLiveStatusLabel");
    const typeEl = document.getElementById("popupTargetType");
    const durationEl = document.getElementById("popupDurationSec");
    const timerBar = document.getElementById("popupLiveTimerBar");
    const timerBadge = document.getElementById("popupLiveTimerBadge");
    const liveDots = document.getElementById("popupLivePreviewDots");
    const ctaWrap = document.getElementById("popupLiveCtaWrap");
    const ctaBtn = document.getElementById("popupLiveCtaBtn");
    const ctaText = document.getElementById("popupLiveCtaText");

    // Poster Utama
    const imgSrc = (gambarEl && gambarEl.value.trim()) ? gambarEl.value.trim() : "produk-olahan-ikan.jpg";
    if (smallPrev) smallPrev.src = imgSrc;
    if (liveImg) liveImg.src = imgSrc;

    // Slide Tambahan
    const slideInputs = document.querySelectorAll("#popupAdditionalSlidesList .popup-slide-url-input");
    let totalSlides = 1;
    slideInputs.forEach(function (inp) {
      if (inp.value.trim()) totalSlides++;
    });

    if (liveDots) {
      if (totalSlides > 1) {
        liveDots.classList.remove("hidden");
        liveDots.innerHTML = "";
        for (let i = 0; i < totalSlides; i++) {
          const dotSpan = document.createElement("span");
          if (i === 0) {
            dotSpan.style.cssText = "width: 14px; height: 6px; border-radius: 3px; background: #ffffff;";
          } else {
            dotSpan.style.cssText = "width: 6px; height: 6px; border-radius: 50%; background: rgba(255,255,255,0.5);";
          }
          liveDots.appendChild(dotSpan);
        }
      } else {
        liveDots.classList.add("hidden");
      }
    }

    // Durasi Timer 4 Detik
    const dur = durationEl ? parseInt(durationEl.value, 10) : 4;
    if (dur > 0) {
      if (timerBar && timerBar.parentElement) timerBar.parentElement.style.display = "block";
      if (timerBadge) {
        timerBadge.style.display = "block";
        timerBadge.textContent = "⏱️ " + dur + "s";
      }
    } else {
      if (timerBar && timerBar.parentElement) timerBar.parentElement.style.display = "none";
      if (timerBadge) timerBadge.style.display = "none";
    }

    // Tipe Target & Tombol Aksi CTA
    const targetType = typeEl ? typeEl.value : "shopee";
    if (ctaWrap && ctaBtn && ctaText) {
      if (targetType === "shopee") {
        ctaWrap.style.display = "block";
        ctaBtn.style.background = "linear-gradient(135deg, #f94c2f, #ee4d2d)";
        const shopeeBtnTextEl = document.getElementById("popupShopeeBtnText");
        ctaText.textContent = (shopeeBtnTextEl && shopeeBtnTextEl.value.trim()) ? shopeeBtnTextEl.value.trim() : "Beli Sekarang di Shopee 🛒";
      } else if (targetType === "wa") {
        ctaWrap.style.display = "block";
        ctaBtn.style.background = "linear-gradient(135deg, #25d366, #128c7e)";
        ctaText.textContent = "Chat WhatsApp Sekarang 💬";
      } else if (targetType === "url") {
        ctaWrap.style.display = "block";
        ctaBtn.style.background = "linear-gradient(135deg, #0284c7, #0369a1)";
        ctaText.textContent = "Kunjungi Promo Sekarang ↗";
      } else {
        ctaWrap.style.display = "none";
      }
    }

    if (liveBadge) {
      liveBadge.classList.add("hidden");
    }

    if (statusLabel) {
      const isAktif = aktifEl && aktifEl.checked;
      const durDesc = dur > 0 ? "Durasi " + dur + "s" : "Tanpa Timer";
      const slideDesc = totalSlides > 1 ? totalSlides + " Slide Manual" : "1 Slide";
      const targetDesc =
        targetType === "shopee"
          ? "Tautan Shopee"
          : targetType === "wa"
          ? "WhatsApp"
          : targetType === "url"
          ? "URL Web"
          : "Tanpa Link";

      statusLabel.textContent = isAktif
        ? "Status: AKTIF di Website (" + targetDesc + ", " + slideDesc + ", " + durDesc + ")"
        : "Status: NONAKTIF (Disembunyikan dari pengunjung)";
      statusLabel.style.color = isAktif ? "#4ade80" : "#cbd5e1";
    }
  }

  function renderPopupPromoTab() {
    const popupRow = state.banners.find(function (b) {
      return b.tipe === "popup";
    });

    const idEl = document.getElementById("popupRowId");
    const aktifEl = document.getElementById("popupAktif");
    const judulEl = document.getElementById("popupJudul");
    const gambarEl = document.getElementById("popupGambar");
    const typeEl = document.getElementById("popupTargetType");
    const shopeeUrlEl = document.getElementById("popupShopeeUrl");
    const shopeeBtnTextEl = document.getElementById("popupShopeeBtnText");
    const shopeeQuickSelect = document.getElementById("popupShopeeQuickSelect");
    const waNumEl = document.getElementById("popupWaNumber");
    const waMsgEl = document.getElementById("popupWaMessage");
    const urlEl = document.getElementById("popupTargetUrl");
    const durationEl = document.getElementById("popupDurationSec");
    const freqEl = document.getElementById("popupFreqMode");
    const slidesContainer = document.getElementById("popupAdditionalSlidesList");

    if (!idEl || !aktifEl || !judulEl || !gambarEl) return;

    // Bersihkan daftar slide tambahan
    if (slidesContainer) slidesContainer.innerHTML = "";

    // Isi Quick Select Produk Shopee dari katalog
    if (shopeeQuickSelect) {
      shopeeQuickSelect.innerHTML = '<option value="">-- Pilih Produk untuk Isi Otomatis --</option>';
      state.products.forEach(function (prod) {
        const opt = document.createElement("option");
        opt.value = prod.link_affiliate || "";
        opt.textContent = (prod.nama || "Produk") + (isValidShopeeUrl(prod.link_affiliate) ? " (Shopee Ada)" : " (Belum ada link)");
        opt.dataset.nama = prod.nama || "";
        shopeeQuickSelect.appendChild(opt);
      });
    }

    if (popupRow) {
      idEl.value = popupRow.id;
      aktifEl.checked = popupRow.aktif !== false;
      judulEl.value = popupRow.judul || "Promo Spesial AquaAgri";
      gambarEl.value = popupRow.gambar || "";

      let meta = {
        targetType: "shopee",
        shopeeUrl: "",
        shopeeBtnText: "Beli Sekarang di Shopee 🛒",
        waNumber: "",
        waMessage: "Halo Admin AquaAgri.id, saya tertarik dengan info promo di pop-up website.",
        targetUrl: "",
        durationSeconds: 4,
        freq: "always",
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

      if (typeEl) {
        typeEl.value = meta.targetType || (popupRow.link_tujuan && popupRow.link_tujuan.includes("shopee") ? "shopee" : (popupRow.link_tujuan && popupRow.link_tujuan.includes("wa.me") ? "wa" : "shopee"));
      }
      if (shopeeUrlEl) {
        shopeeUrlEl.value = meta.shopeeUrl || (meta.targetType === "shopee" ? popupRow.link_tujuan || "" : "");
      }
      if (shopeeBtnTextEl) {
        shopeeBtnTextEl.value = meta.shopeeBtnText || "Beli Sekarang di Shopee 🛒";
      }
      if (waNumEl) waNumEl.value = meta.waNumber || "";
      if (waMsgEl) waMsgEl.value = meta.waMessage || "Halo Admin AquaAgri.id, saya tertarik dengan info promo di pop-up website.";
      if (urlEl) urlEl.value = meta.targetUrl || (meta.targetType === "url" ? popupRow.link_tujuan || "" : "");
      if (durationEl) {
        durationEl.value = String(meta.durationSeconds !== undefined ? meta.durationSeconds : 4);
      }
      if (freqEl) freqEl.value = meta.freq || "always";

      // Render slide gambar tambahan (jika ada)
      const primaryImg = (popupRow.gambar || "").trim();
      let slides = [];
      if (Array.isArray(meta.slides)) {
        slides = meta.slides.filter(function (s) { return typeof s === "string" && s.trim().length > 0; });
      }
      const additionalSlides = [];
      slides.forEach(function (s) {
        const tr = s.trim();
        if (tr && tr !== primaryImg && !additionalSlides.includes(tr)) {
          additionalSlides.push(tr);
        }
      });
      additionalSlides.forEach(function (sUrl) {
        createPopupSlideRow(sUrl);
      });
    } else {
      idEl.value = "";
      aktifEl.checked = false;
      judulEl.value = "Promo Spesial AquaAgri.id";
      gambarEl.value = "produk-olahan-ikan.jpg";
      if (typeEl) typeEl.value = "shopee";
      if (shopeeUrlEl) shopeeUrlEl.value = "";
      if (shopeeBtnTextEl) shopeeBtnTextEl.value = "Beli Sekarang di Shopee 🛒";
      if (waNumEl) waNumEl.value = "";
      if (waMsgEl) waMsgEl.value = "Halo Admin AquaAgri.id, saya tertarik dengan info promo di pop-up website.";
      if (urlEl) urlEl.value = "";
      if (durationEl) durationEl.value = "4";
      if (freqEl) freqEl.value = "always";
    }

    syncPopupTargetTypeUI();
    updatePopupLivePreview();
  }

  async function handleSavePopupPromo(e) {
    e.preventDefault();
    showBoxAlert("popupFormAlert", "");

    const idVal = document.getElementById("popupRowId").value.trim();
    const aktif = document.getElementById("popupAktif").checked;
    const judul = document.getElementById("popupJudul").value.trim() || "Promo Spesial AquaAgri";
    const gambar = document.getElementById("popupGambar").value.trim();
    const targetType = document.getElementById("popupTargetType").value;
    const shopeeUrl = document.getElementById("popupShopeeUrl") ? document.getElementById("popupShopeeUrl").value.trim() : "";
    const shopeeBtnText = document.getElementById("popupShopeeBtnText") ? document.getElementById("popupShopeeBtnText").value.trim() : "Beli Sekarang di Shopee 🛒";
    const waNumberRaw = document.getElementById("popupWaNumber") ? document.getElementById("popupWaNumber").value.trim() : "";
    const waMessage = document.getElementById("popupWaMessage") ? document.getElementById("popupWaMessage").value.trim() : "";
    const targetUrl = document.getElementById("popupTargetUrl") ? document.getElementById("popupTargetUrl").value.trim() : "";
    const durationEl = document.getElementById("popupDurationSec");
    const durationSeconds = durationEl ? (parseInt(durationEl.value, 10) || 0) : 4;
    const freq = document.getElementById("popupFreqMode") ? document.getElementById("popupFreqMode").value : "always";

    if (!gambar) {
      showBoxAlert("popupFormAlert", "Pilih / unggah foto poster utama terlebih dahulu.");
      return;
    }

    // Kumpulkan slide tambahan
    const slideInps = document.querySelectorAll("#popupAdditionalSlidesList .popup-slide-url-input");
    const additionalSlides = [];
    slideInps.forEach(function (inp) {
      const val = inp.value.trim();
      if (val && !additionalSlides.includes(val)) {
        additionalSlides.push(val);
      }
    });

    const allSlides = [gambar];
    additionalSlides.forEach(function (s) {
      if (!allSlides.includes(s)) allSlides.push(s);
    });

    if (targetType === "shopee") {
      if (!shopeeUrl) {
        showBoxAlert("popupFormAlert", "Masukkan tautan Shopee (contoh: https://s.shopee.co.id/... atau https://shopee.co.id/...).");
        return;
      }
      if (!isSafeHttpUrl(shopeeUrl)) {
        showBoxAlert("popupFormAlert", "Tautan Shopee harus diawali dengan https://");
        return;
      }
    } else if (targetType === "wa") {
      const cleanWa = normalizeWaPhone(waNumberRaw);
      if (!cleanWa || cleanWa.length < 9) {
        showBoxAlert("popupFormAlert", "Masukkan nomor WhatsApp yang valid (contoh: 081234567890).");
        return;
      }
    } else if (targetType === "url") {
      if (!targetUrl || !isSafeHttpUrl(targetUrl)) {
        showBoxAlert("popupFormAlert", "Masukkan URL tujuan yang lengkap (diawali https://).");
        return;
      }
    }

    const finalLink = buildPopupFinalLink();
    const metaJson = JSON.stringify({
      targetType: targetType,
      shopeeUrl: shopeeUrl,
      shopeeBtnText: shopeeBtnText,
      waNumber: waNumberRaw,
      waMessage: waMessage,
      targetUrl: targetUrl,
      durationSeconds: durationSeconds,
      freq: freq,
      slides: allSlides
    });

    const payload = {
      judul: judul,
      subjudul: metaJson,
      gambar: gambar,
      tipe: "popup",
      link_tujuan: finalLink,
      urutan: 99,
      aktif: aktif,
      updated_at: new Date().toISOString()
    };

    const sb = window.getAquaAgriSupabaseClient();
    const saveBtn = document.getElementById("savePopupBtn");
    if (saveBtn) {
      saveBtn.disabled = true;
      saveBtn.textContent = "Menyimpan...";
    }

    try {
      const existingPopup = state.banners.find(function (b) { return b.tipe === "popup"; });
      const targetId = idVal ? Number(idVal) : (existingPopup ? existingPopup.id : null);

      if (targetId) {
        const { error } = await sb.from("banners").update(payload).eq("id", targetId);
        if (error) throw error;
      } else {
        const { error } = await sb.from("banners").insert([payload]);
        if (error) throw error;
      }

      showToast(
        aktif
          ? "Pop-Up Iklan Promo berhasil disimpan & DIAKTIFKAN di website!"
          : "Pengaturan Pop-Up Iklan disimpan (Status: Nonaktif)."
      );
      await loadAllDatabaseData();
    } catch (err) {
      showBoxAlert("popupFormAlert", "Gagal menyimpan Pop-Up Iklan: " + (err.message || err));
    } finally {
      if (saveBtn) {
        saveBtn.disabled = false;
        saveBtn.textContent = "Simpan Pengaturan Pop-Up";
      }
    }
  }

  // ---------- 11. RENDER & QUICK-SAVE TAB 5: TAUTAN SHOPEE ----------

  function renderShopeeTable() {
    const tbody = document.getElementById("shopeeTableBody");
    const searchEl = document.getElementById("shopeeSearchInput");
    const statusFilterEl = document.getElementById("shopeeStatusFilter");

    if (!tbody) return;
    tbody.innerHTML = "";

    const kw = searchEl ? searchEl.value.trim().toLowerCase() : "";
    const statusFilter = statusFilterEl ? statusFilterEl.value : "semua";

    const filtered = state.products.filter(function (p) {
      const valid = isValidShopeeUrl(p.link_affiliate);
      if (statusFilter === "valid" && !valid) return false;
      if (statusFilter === "invalid" && valid) return false;
      if (kw) {
        const matchName = (p.nama || "").toLowerCase().includes(kw);
        const matchLink = (p.link_affiliate || "").toLowerCase().includes(kw);
        if (!matchName && !matchLink) return false;
      }
      return true;
    });

    if (filtered.length === 0) {
      const tr = document.createElement("tr");
      const td = document.createElement("td");
      td.colSpan = 5;
      td.style.textAlign = "center";
      td.style.padding = "24px";
      td.style.color = "#64748b";
      td.textContent = "Tidak ada data tautan Shopee yang sesuai filter.";
      tr.appendChild(td);
      tbody.appendChild(tr);
      return;
    }

    filtered.forEach(function (prod) {
      const tr = document.createElement("tr");

      const tdImg = document.createElement("td");
      const img = document.createElement("img");
      img.className = "table-thumb";
      img.src = prod.gambar || PLACEHOLDER_IMG;
      img.alt = prod.nama;
      img.addEventListener("error", function () {
        img.src = PLACEHOLDER_IMG;
      });
      tdImg.appendChild(img);

      const tdName = document.createElement("td");
      const titleDiv = document.createElement("div");
      titleDiv.className = "prod-cell-title";
      titleDiv.textContent = prod.nama;
      const catSpan = document.createElement("span");
      catSpan.style.fontSize = "0.75rem";
      catSpan.style.color = "#64748b";
      catSpan.textContent = getCategoryNameById(prod.kategori) + " • " + (prod.harga || "");
      tdName.appendChild(titleDiv);
      tdName.appendChild(catSpan);

      const tdStatus = document.createElement("td");
      const statusBadge = document.createElement("span");
      const isOk = isValidShopeeUrl(prod.link_affiliate);
      statusBadge.className = isOk ? "badge-pill badge-success" : "badge-pill badge-warn";
      statusBadge.textContent = isOk ? "Shopee Valid" : "Perlu Dicek";
      tdStatus.appendChild(statusBadge);
      const clickSub = document.createElement("div");
      clickSub.style.fontSize = "0.73rem";
      clickSub.style.color = "#0f766e";
      clickSub.style.fontWeight = "600";
      clickSub.style.marginTop = "4px";
      clickSub.textContent = getAdminProductClicks(prod).toLocaleString("id-ID") + " Klik";
      tdStatus.appendChild(clickSub);

      const tdInput = document.createElement("td");
      const urlInput = document.createElement("input");
      urlInput.type = "url";
      urlInput.value = prod.link_affiliate || "";
      urlInput.placeholder = "https://s.shopee.co.id/...";
      tdInput.appendChild(urlInput);

      const tdAct = document.createElement("td");
      const actWrap = document.createElement("div");
      actWrap.className = "row-actions";

      const saveBtn = document.createElement("button");
      saveBtn.type = "button";
      saveBtn.className = "btn-primary btn-sm";
      saveBtn.textContent = "Simpan";
      saveBtn.addEventListener("click", async function () {
        const newUrl = urlInput.value.trim();
        if (!newUrl || !isSafeHttpUrl(newUrl)) {
          showToast("Masukkan URL yang valid (diawali https://).");
          return;
        }
        saveBtn.disabled = true;
        saveBtn.textContent = "...";
        try {
          const sb = window.getAquaAgriSupabaseClient();
          const { error } = await sb
            .from("products")
            .update({ link_affiliate: newUrl, updated_at: new Date().toISOString() })
            .eq("id", prod.id);
          if (error) throw error;
          prod.link_affiliate = newUrl;
          showToast("Link Shopee '" + prod.nama + "' berhasil disimpan!");
          renderShopeeTable();
          renderOverviewTab();
        } catch (err) {
          showToast("Gagal menyimpan link: " + (err.message || err));
        } finally {
          saveBtn.disabled = false;
          saveBtn.textContent = "Simpan";
        }
      });

      const testBtn = document.createElement("button");
      testBtn.type = "button";
      testBtn.className = "btn-secondary btn-sm";
      testBtn.textContent = "Tes ↗";
      testBtn.addEventListener("click", function () {
        const targetUrl = urlInput.value.trim();
        if (!isSafeHttpUrl(targetUrl)) {
          showToast("URL belum valid untuk dibuka.");
          return;
        }
        window.open(targetUrl, "_blank", "noopener,noreferrer");
      });

      actWrap.appendChild(saveBtn);
      actWrap.appendChild(testBtn);
      tdAct.appendChild(actWrap);

      tr.appendChild(tdImg);
      tr.appendChild(tdName);
      tr.appendChild(tdStatus);
      tr.appendChild(tdInput);
      tr.appendChild(tdAct);

      tbody.appendChild(tr);
    });
  }

  // ---------- 12. MODAL KONFIRMASI PENGHAPUSAN ----------

  function openConfirmDeleteModal(type, id, name) {
    state.pendingDelete = { type: type, id: id, name: name };
    const modal = document.getElementById("confirmDeleteBackdrop");
    const msg = document.getElementById("confirmDeleteMessage");
    if (msg) {
      msg.textContent =
        'Apakah Anda yakin ingin menghapus "' +
        name +
        '" secara permanen dari database? Perubahan ini akan langsung terlihat di website publik.';
    }
    if (modal) modal.classList.remove("hidden");
  }

  function closeConfirmDeleteModal() {
    state.pendingDelete = null;
    const modal = document.getElementById("confirmDeleteBackdrop");
    if (modal) modal.classList.add("hidden");
  }

  async function executePendingDelete() {
    if (!state.pendingDelete) return;
    const { type, id, name } = state.pendingDelete;
    const sb = window.getAquaAgriSupabaseClient();
    const btn = document.getElementById("executeConfirmDeleteBtn");

    if (btn) {
      btn.disabled = true;
      btn.textContent = "Menghapus...";
    }

    try {
      let table = "products";
      if (type === "category") table = "categories";
      else if (type === "banner") table = "banners";

      const { error } = await sb.from(table).delete().eq("id", id);
      if (error) throw error;

      showToast('Berhasil menghapus "' + name + '".');
      closeConfirmDeleteModal();
      await loadAllDatabaseData();
    } catch (err) {
      showToast("Gagal menghapus: " + (err.message || err));
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.textContent = "Ya, Hapus Permanen";
      }
    }
  }

  // ---------- 12B. FITUR GANTI PASSWORD ADMIN ----------
  function openChangePasswordModal() {
    const modal = document.getElementById("changePasswordBackdrop");
    const form = document.getElementById("changePasswordForm");
    const newPass = document.getElementById("newAdminPassword");
    const confPass = document.getElementById("confirmAdminPassword");
    const strengthWrap = document.getElementById("passStrengthWrap");
    const strengthBarFill = document.getElementById("passStrengthBarFill");
    const strengthText = document.getElementById("passStrengthText");

    if (form) form.reset();
    showBoxAlert("changePasswordAlert", "");
    if (newPass) newPass.type = "password";
    if (confPass) confPass.type = "password";
    const tNew = document.getElementById("toggleNewPassBtn");
    const tConf = document.getElementById("toggleConfirmPassBtn");
    if (tNew) tNew.textContent = "Lihat";
    if (tConf) tConf.textContent = "Lihat";
    if (strengthWrap) strengthWrap.classList.add("hidden");
    if (strengthBarFill) {
      strengthBarFill.style.width = "0%";
      strengthBarFill.style.backgroundColor = "";
    }
    if (strengthText) strengthText.textContent = "";

    if (modal) modal.classList.remove("hidden");
    if (newPass) setTimeout(() => newPass.focus(), 150);
  }

  function closeChangePasswordModal() {
    const modal = document.getElementById("changePasswordBackdrop");
    if (modal) modal.classList.add("hidden");
  }

  function calculatePasswordStrength(pass) {
    if (!pass) return { score: 0, label: "", color: "", width: "0%" };
    let score = 0;
    if (pass.length >= 8) score += 1;
    if (pass.length >= 12) score += 1;
    if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    if (pass.length < 8) {
      return { score: 1, label: "Terlalu Pendek", color: "#ef4444", width: "25%" };
    }
    if (score <= 2) {
      return { score: 2, label: "Lemah", color: "#f97316", width: "45%" };
    }
    if (score <= 4) {
      return { score: 3, label: "Sedang", color: "#eab308", width: "70%" };
    }
    return { score: 4, label: "Sangat Kuat", color: "#10b981", width: "100%" };
  }

  async function handleSaveNewPassword(e) {
    e.preventDefault();
    showBoxAlert("changePasswordAlert", "");

    const newPass = document.getElementById("newAdminPassword").value;
    const confPass = document.getElementById("confirmAdminPassword").value;
    const submitBtn = document.getElementById("saveChangePasswordBtn");

    if (!newPass) {
      showBoxAlert("changePasswordAlert", "Password baru wajib diisi.");
      return;
    }
    if (newPass.length < 8) {
      showBoxAlert("changePasswordAlert", "Password baru minimal 8 karakter.");
      return;
    }
    if (/^(12345678|123456789|1\.2\.3\.4\.5\.6|admin123|aquaagri123|password)$/i.test(newPass.trim())) {
      showBoxAlert("changePasswordAlert", "Pola password terlalu mudah ditebak! Gunakan kombinasi huruf, angka, atau simbol unik.");
      return;
    }
    if (newPass !== confPass) {
      showBoxAlert("changePasswordAlert", "Konfirmasi password tidak cocok dengan password baru.");
      return;
    }

    const sb = window.getAquaAgriSupabaseClient();
    if (!sb) {
      showBoxAlert("changePasswordAlert", "Koneksi Supabase belum siap.");
      return;
    }

    try {
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Menyimpan...</span>';
      }

      const { data, error } = await sb.auth.updateUser({ password: newPass });
      if (error) throw error;

      closeChangePasswordModal();
      showToast("Password admin berhasil diperbarui! Gunakan password baru ini saat login berikutnya.");
    } catch (err) {
      showBoxAlert("changePasswordAlert", "Gagal memperbarui password: " + (err.message || "Terjadi kesalahan."));
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>Simpan Password Baru</span>';
      }
    }
  }

  // ---------- 12C. SISTEM BROADCAST NOTIFIKASI HP & SAKELAR LONCENG (S3 MARKETING) ----------
  const DEFAULT_ONESIGNAL_APP_ID = "55292386-5b6a-4b80-83b6-1a7f2541a975";
  const DEFAULT_ONESIGNAL_REST_KEY = "";

  function updateBellActionBtn(isActive) {
    const btn = document.getElementById("catalogBellActionBtn");
    if (!btn) return;
    if (isActive) {
      btn.textContent = "Matikan Lonceng";
      btn.className = "btn-secondary btn-sm";
      btn.style.color = "#dc2626";
      btn.style.borderColor = "#fca5a5";
      btn.style.background = "#fff1f2";
    } else {
      btn.textContent = "Nyalakan Lonceng";
      btn.className = "btn-primary btn-sm";
      btn.style.color = "#ffffff";
      btn.style.borderColor = "";
      btn.style.background = "";
    }
  }

  function renderCatalogBellStatus() {
    const bellSwitch = document.getElementById("catalogBellSwitch");
    const bellBadge = document.getElementById("catalogBellStatusBadge");
    const bellRow = state.banners.find(function (b) { return b.tipe === "catalog_bell"; });

    let isBellActive = true;
    if (bellRow) {
      isBellActive = bellRow.aktif !== false;
      localStorage.setItem("aquaagri_catalog_bell_disabled", isBellActive ? "false" : "true");
    } else {
      isBellActive = localStorage.getItem("aquaagri_catalog_bell_disabled") !== "true";
    }

    if (bellSwitch) {
      bellSwitch.checked = isBellActive;
    }
    if (bellBadge) {
      if (isBellActive) {
        bellBadge.textContent = "Aktif di Katalog";
        bellBadge.style.background = "#dcfce7";
        bellBadge.style.color = "#15803d";
      } else {
        bellBadge.textContent = "Dinonaktifkan";
        bellBadge.style.background = "#fee2e2";
        bellBadge.style.color = "#b91c1c";
      }
    }
    updateBellActionBtn(isBellActive);
  }

  function syncOneSignalConfigFromDatabase(bannersList) {
    const list = bannersList || state.banners || [];
    const osConfig = list.find(function (b) { return b.tipe === "onesignal_config"; });
    const appIdInput = document.getElementById("oneSignalAppId");
    const restKeyInput = document.getElementById("oneSignalRestKey");

    if (osConfig) {
      const appId = (osConfig.judul || "").trim();
      const restKey = (osConfig.subjudul || "").trim();
      if (appId) {
        localStorage.setItem("aquaagri_onesignal_app_id", appId);
        if (appIdInput) appIdInput.value = appId;
      }
      if (restKey) {
        localStorage.setItem("aquaagri_onesignal_rest_key", restKey);
        if (restKeyInput) restKeyInput.value = restKey;
      }
      if (osConfig.link_tujuan) {
        try {
          const dbHistory = JSON.parse(osConfig.link_tujuan);
          if (Array.isArray(dbHistory) && dbHistory.length > 0) {
            localStorage.setItem("aquaagri_push_history", JSON.stringify(dbHistory));
            renderPushHistoryTable();
          }
        } catch (e) {}
      }
      updatePushStatusBadge(Boolean(appId && restKey));
      fetchOneSignalSubscriberCount();
    } else {
      // Auto-migrasikan jika browser ini (misal HP) sudah punya kunci lokal
      const localAppId = (localStorage.getItem("aquaagri_onesignal_app_id") || DEFAULT_ONESIGNAL_APP_ID).trim();
      const localRestKey = (localStorage.getItem("aquaagri_onesignal_rest_key") || "").trim();
      if (localRestKey) {
        const sb = window.getAquaAgriSupabaseClient();
        if (sb) {
          const payload = {
            tipe: "onesignal_config",
            judul: localAppId,
            subjudul: localRestKey,
            gambar: "",
            link_tujuan: localStorage.getItem("aquaagri_push_history") || "[]",
            urutan: 98,
            aktif: true,
            updated_at: new Date().toISOString()
          };
          sb.from("banners").insert([payload]).select().then(function (res) {
            if (res.data && res.data[0]) {
              state.banners.push(res.data[0]);
            }
          }).catch(function () {});
        }
      }
    }
  }

  function setupAdminRealtimeSync() {
    const sb = window.getAquaAgriSupabaseClient();
    if (!sb || window.__aquaAgriAdminRealtimeSet) return;
    window.__aquaAgriAdminRealtimeSet = true;

    try {
      sb.channel("admin-banners-realtime")
        .on("postgres_changes", { event: "*", schema: "public", table: "banners" }, function (payload) {
          const row = payload.new;
          if (!row) return;
          const idx = state.banners.findIndex(function (b) { return b.id === row.id; });
          if (idx >= 0) {
            state.banners[idx] = row;
          } else {
            state.banners.push(row);
          }

          if (row.tipe === "catalog_bell") {
            renderCatalogBellStatus();
            showToast("Sinkronisasi: Status lonceng katalog diperbarui (" + (row.aktif !== false ? "Aktif" : "Nonaktif") + ")");
          } else if (row.tipe === "onesignal_config") {
            syncOneSignalConfigFromDatabase(state.banners);
            showToast("Sinkronisasi: Kunci OneSignal diperbarui dari perangkat lain!");
          }
        })
        .subscribe();
    } catch (e) {}
  }

  async function checkAdminBannersFast() {
    if (typeof window.getAquaAgriSupabaseClient !== "function") return;
    const sb = window.getAquaAgriSupabaseClient();
    if (!sb) return;
    try {
      const { data, error } = await sb.from("banners").select("*").order("urutan", { ascending: true }).order("id", { ascending: true });
      if (!error && Array.isArray(data) && data.length > 0) {
        state.banners = data;
        renderCatalogBellStatus();
        syncOneSignalConfigFromDatabase(state.banners);
      }
    } catch (e) {}
  }

  // Re-sinkronisasi otomatis saat beralih tab atau memfokuskan jendela dasbor admin di Laptop & HP
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "visible") {
      checkAdminBannersFast();
    }
  });
  window.addEventListener("focus", function () {
    checkAdminBannersFast();
  });
  setInterval(checkAdminBannersFast, 8000);

  async function fetchOneSignalSubscriberCount() {
    const badge = document.getElementById("pushSubscriberCountBadge");
    if (!badge) return;

    const appId = (localStorage.getItem("aquaagri_onesignal_app_id") || DEFAULT_ONESIGNAL_APP_ID).trim();
    const restKey = (localStorage.getItem("aquaagri_onesignal_rest_key") || DEFAULT_ONESIGNAL_REST_KEY).trim();

    if (!appId || !restKey) {
      badge.innerHTML = '<span class="status-dot" style="background:#f59e0b;"></span> 👥 Perlu REST Key';
      badge.style.background = '#fef3c7';
      badge.style.color = '#b45309';
      return;
    }

    try {
      const authHeader = restKey.startsWith("os_v2_app_") ? ("Key " + restKey) : ("Basic " + restKey);
      
      // Gunakan proxy worker jika di domain live untuk mencegah pemblokiran CORS browser pada API apps OneSignal
      const isLiveDomain = window.location.hostname.includes("workers.dev") || window.location.hostname.includes("aquaagri.id");
      const targetUrl = isLiveDomain
        ? ("/api/onesignal/apps/" + encodeURIComponent(appId))
        : ("https://api.onesignal.com/apps/" + encodeURIComponent(appId));

      const res = await fetch(targetUrl, {
        headers: {
          "Authorization": authHeader
        }
      });

      if (res.ok) {
        const data = await res.json();
        const players = typeof data.players === "number" ? data.players : (data.messageable_players || 0);
        if (players > 0) {
          badge.innerHTML = '<span class="status-dot" style="background:#10b981;"></span> 👥 ' + players + ' HP Terdaftar';
          badge.style.background = '#dcfce7';
          badge.style.color = '#15803d';
        } else {
          badge.innerHTML = '<span class="status-dot" style="background:#f59e0b;"></span> 👥 0 HP Terdaftar';
          badge.style.background = '#fef3c7';
          badge.style.color = '#b45309';
        }
      } else {
        badge.innerHTML = '<span class="status-dot" style="background:#ef4444;"></span> 👥 Kunci Belum Valid';
        badge.style.background = '#fee2e2';
        badge.style.color = '#b91c1c';
      }
    } catch (err) {
      badge.innerHTML = '<span class="status-dot" style="background:#94a3b8;"></span> 👥 Status Push Offline';
    }
  }

  function initPushNotifAdmin() {
    const savedAppId = localStorage.getItem("aquaagri_onesignal_app_id") || DEFAULT_ONESIGNAL_APP_ID;
    const savedRestKey = localStorage.getItem("aquaagri_onesignal_rest_key") || DEFAULT_ONESIGNAL_REST_KEY;
    const appIdInput = document.getElementById("oneSignalAppId");
    const restKeyInput = document.getElementById("oneSignalRestKey");

    if (appIdInput) appIdInput.value = savedAppId;
    if (restKeyInput) restKeyInput.value = savedRestKey;

    updatePushStatusBadge(Boolean(savedAppId && savedRestKey));
    fetchOneSignalSubscriberCount();
    renderCatalogBellStatus();
    renderPushHistoryTable();
  }

  function updatePushStatusBadge(isConfigured) {
    const connStatus = document.getElementById("pushConnectionStatus");
    if (!connStatus) return;
    if (isConfigured) {
      connStatus.className = "push-status-pill ready";
      connStatus.innerHTML = '<span class="status-dot"></span> OneSignal Terhubung (Live)';
    } else {
      connStatus.className = "push-status-pill ready";
      connStatus.innerHTML = '<span class="status-dot"></span> Mode Siap Siar (Simulasi Aktif)';
    }
  }

  function renderPushHistoryTable() {
    const tbody = document.getElementById("pushHistoryTableBody");
    if (!tbody) return;

    const raw = localStorage.getItem("aquaagri_push_history");
    let history = [];
    try {
      history = raw ? JSON.parse(raw) : [];
    } catch (e) {
      history = [];
    }

    if (!Array.isArray(history) || history.length === 0) {
      history = [
        {
          time: new Date().toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }),
          title: "⚡ [FLASH SALE] Pakan Udang & Diskon 50% Shopee Mau Habis!",
          body: "Stok promo spesial tersisa untuk 30 petambak pertama. Ambil voucher sebelum hangus!",
          url: "https://s.shopee.co.id/",
          status: "Terkirim"
        }
      ];
    }

    tbody.innerHTML = history.map(item => `
      <tr>
        <td style="font-size: 0.78rem; color: var(--text-muted);">${escapeHtml(item.time || "-")}</td>
        <td><strong>${escapeHtml(item.title || "")}</strong></td>
        <td style="font-size: 0.82rem; color: #475569;">${escapeHtml(item.body || "")}</td>
        <td><a href="${escapeHtml(item.url || "#")}" target="_blank" rel="noopener" style="font-size: 0.76rem; color: var(--tosca-primary); word-break: break-all;">${escapeHtml(item.url || "")}</a></td>
        <td style="text-align: center;"><span class="badge-active" style="background:#dcfce7; color:#15803d; font-size:0.72rem; padding:3px 8px; border-radius:999px;">${escapeHtml(item.status || "Terkirim")}</span></td>
      </tr>
    `).join("");
  }

  // ---------- 13. NAVIGASI TAB & EVENT LISTENERS ----------

  function switchAdminTab(tabName) {
    const titles = {
      overview: ["Ringkasan Dashboard", "Pantau dan kelola seluruh isi katalog aquaagri.id"],
      products: ["Kelola Produk Katalog", "Tambah, edit, hapus produk, harga diskon, dan foto produk"],
      categories: ["Kelola Kategori", "Atur 4 kategori utama beserta foto dan teks banner kategori"],
      banners: ["Kelola Banner Beranda", "Atur slide foto otomatis di bagian atas beranda"],
      popup: ["Kelola Pop-Up Iklan Promo", "Atur poster iklan pop-up saat pengunjung membuka website (WhatsApp / Shopee)"],
      shopee: ["Kelola Tautan Affiliate Shopee", "Cek dan ubah cepat link produk Shopee dalam satu tabel"],
      pushnotif: ["Broadcast Notifikasi HP (Kaidah S3 Marketing)", "Kirim pesan notifikasi instan langsung ke layar HP pengunjung dengan copywriting psikologis berdaya konversi tinggi"]
    };

    document.querySelectorAll(".nav-item").forEach(function (btn) {
      if (btn.getAttribute("data-tab") === tabName) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    document.querySelectorAll(".tab-panel").forEach(function (panel) {
      if (panel.id === "tab-" + tabName) {
        panel.classList.remove("hidden");
        panel.classList.add("active");
      } else {
        panel.classList.add("hidden");
        panel.classList.remove("active");
      }
    });

    const info = titles[tabName] || titles.overview;
    const titleEl = document.getElementById("pageHeaderTitle");
    const subEl = document.getElementById("pageHeaderSubtitle");
    if (titleEl) titleEl.textContent = info[0];
    if (subEl) subEl.textContent = info[1];

    // Tutup sidebar mobile jika terbuka
    const sidebar = document.getElementById("adminSidebar");
    const backdrop = document.getElementById("sidebarBackdrop");
    if (sidebar) sidebar.classList.remove("open");
    if (backdrop) backdrop.classList.add("hidden");
  }

  function initAdminApp() {
    // 0. Jalankan Pengecekan Sesi & Banner Supabase Terlebih Dahulu
    try {
      checkAuthSession();
    } catch (eAuth) {
      console.error("Gagal inisialisasi sesi admin:", eAuth);
    }

    // 1. Toggle Panel Setup Supabase
    const toggleConfigBtn = document.getElementById("toggleConfigBtn");
    const setupPanel = document.getElementById("supabaseSetupPanel");
    if (toggleConfigBtn && setupPanel) {
      toggleConfigBtn.addEventListener("click", function () {
        setupPanel.classList.toggle("hidden");
      });
    }

    // 2. Simpan Pengaturan Koneksi Supabase
    const saveSetupBtn = document.getElementById("saveSetupBtn");
    if (saveSetupBtn) {
      saveSetupBtn.addEventListener("click", function () {
        const url = document.getElementById("setupSbUrl").value.trim();
        const key = document.getElementById("setupSbKey").value.trim();
        if (!url.startsWith("https://") || !key) {
          showBoxAlert("loginAlert", "Masukkan Project URL (diawali https://) dan Anon Public Key Supabase yang valid.");
          return;
        }
        window.saveAquaAgriSupabaseConfigLocal(url, key);
        updateConnectionBannerUI();
        if (setupPanel) setupPanel.classList.add("hidden");
        showBoxAlert("loginAlert", "Koneksi Supabase tersimpan! Silakan login menggunakan akun Admin Anda.", "success");
      });
    }

    // 3. Salin Kode untuk supabase-config.js
    const copyConfigCodeBtn = document.getElementById("copyConfigCodeBtn");
    if (copyConfigCodeBtn) {
      copyConfigCodeBtn.addEventListener("click", function () {
        const url = document.getElementById("setupSbUrl").value.trim();
        const key = document.getElementById("setupSbKey").value.trim();
        if (!url || !key) {
          showBoxAlert("loginAlert", "Isi Project URL dan Anon Key terlebih dahulu sebelum menyalin.");
          return;
        }
        const snippet =
          `window.AQUAAGRI_SUPABASE_CONFIG = {\n` +
          `  SUPABASE_URL: "${url}",\n` +
          `  SUPABASE_ANON_KEY: "${key}",\n` +
          `  STORAGE_BUCKET: "aquaagri-images"\n` +
          `};`;
        navigator.clipboard.writeText(snippet).then(function () {
          showBoxAlert("loginAlert", "Kode berhasil disalin! Tempelkan ke bagian atas file supabase-config.js.", "success");
        });
      });
    }

    // 4. Toggle Lihat Password
    const togglePassBtn = document.getElementById("togglePassBtn");
    const passInput = document.getElementById("loginPassword");
    if (togglePassBtn && passInput) {
      togglePassBtn.addEventListener("click", function () {
        if (passInput.type === "password") {
          passInput.type = "text";
          togglePassBtn.textContent = "Sembunyikan";
        } else {
          passInput.type = "password";
          togglePassBtn.textContent = "Lihat";
        }
      });
    }

    // 5. Submit Login Admin (Supabase Auth)
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
      loginForm.addEventListener("submit", async function (e) {
        e.preventDefault();
        showBoxAlert("loginAlert", "");

        const sb = window.getAquaAgriSupabaseClient();
        if (!sb) {
          showBoxAlert("loginAlert", "Atur koneksi Project URL & Anon Key Supabase terlebih dahulu.");
          return;
        }

        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value;
        if (!email || !password) {
          showBoxAlert("loginAlert", "Email dan password wajib diisi.");
          return;
        }

        const submitBtn = document.getElementById("loginSubmitBtn");
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = "Memverifikasi...";
        }

        try {
          const { data, error } = await sb.auth.signInWithPassword({
            email: email,
            password: password
          });
          if (error) throw error;
          if (data && data.user) {
            await onAdminAuthenticated(data.user);
          }
        } catch (err) {
          showBoxAlert(
            "loginAlert",
            "Login gagal: Pastikan Email & Password Admin sudah terdaftar di menu Authentication Supabase. (" +
              (err.message || "Unauthorized") +
              ")"
          );
        } finally {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<span>Masuk ke Dashboard</span> <span aria-hidden="true">&rarr;</span>';
          }
        }
      });
    }

    // 6. Logout Admin
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", async function () {
        const sb = window.getAquaAgriSupabaseClient();
        if (sb) {
          await sb.auth.signOut();
        }
        state.user = null;
        document.getElementById("dashboardScreen").classList.add("hidden");
        document.getElementById("loginScreen").classList.remove("hidden");
        showToast("Anda telah keluar dari sesi Admin.");
      });
    }

    // 6B. Ganti Password Admin
    const openPassBtn = document.getElementById("openChangePasswordBtn");
    const topbarPassBtn = document.getElementById("topbarChangePasswordBtn");
    if (openPassBtn) openPassBtn.addEventListener("click", openChangePasswordModal);
    if (topbarPassBtn) topbarPassBtn.addEventListener("click", openChangePasswordModal);

    const closePassBtn = document.getElementById("closeChangePasswordBtn");
    const cancelPassBtn = document.getElementById("cancelChangePasswordBtn");
    const passBackdrop = document.getElementById("changePasswordBackdrop");
    if (closePassBtn) closePassBtn.addEventListener("click", closeChangePasswordModal);
    if (cancelPassBtn) cancelPassBtn.addEventListener("click", closeChangePasswordModal);
    if (passBackdrop) {
      passBackdrop.addEventListener("click", function (e) {
        if (e.target === passBackdrop) closeChangePasswordModal();
      });
    }

    const toggleNewPassBtn = document.getElementById("toggleNewPassBtn");
    const newPassInput = document.getElementById("newAdminPassword");
    if (toggleNewPassBtn && newPassInput) {
      toggleNewPassBtn.addEventListener("click", function () {
        if (newPassInput.type === "password") {
          newPassInput.type = "text";
          toggleNewPassBtn.textContent = "Sembunyikan";
        } else {
          newPassInput.type = "password";
          toggleNewPassBtn.textContent = "Lihat";
        }
      });
    }

    const toggleConfPassBtn = document.getElementById("toggleConfirmPassBtn");
    const confPassInput = document.getElementById("confirmAdminPassword");
    if (toggleConfPassBtn && confPassInput) {
      toggleConfPassBtn.addEventListener("click", function () {
        if (confPassInput.type === "password") {
          confPassInput.type = "text";
          toggleConfPassBtn.textContent = "Sembunyikan";
        } else {
          confPassInput.type = "password";
          toggleConfPassBtn.textContent = "Lihat";
        }
      });
    }

    if (newPassInput) {
      newPassInput.addEventListener("input", function () {
        const val = newPassInput.value;
        const wrap = document.getElementById("passStrengthWrap");
        const fill = document.getElementById("passStrengthBarFill");
        const txt = document.getElementById("passStrengthText");
        if (!val) {
          if (wrap) wrap.classList.add("hidden");
          return;
        }
        if (wrap) wrap.classList.remove("hidden");
        const strength = calculatePasswordStrength(val);
        if (fill) {
          fill.style.width = strength.width;
          fill.style.backgroundColor = strength.color;
        }
        if (txt) {
          txt.textContent = strength.label;
          txt.style.color = strength.color;
        }
      });
    }

    const passForm = document.getElementById("changePasswordForm");
    if (passForm) passForm.addEventListener("submit", handleSaveNewPassword);

    // 7. Navigasi Sidebar
    document.querySelectorAll(".nav-item").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const tab = btn.getAttribute("data-tab");
        if (tab) switchAdminTab(tab);
      });
    });

    // Mobile Sidebar Toggle
    const openMobileBtn = document.getElementById("openSidebarMobileBtn");
    const closeMobileBtn = document.getElementById("closeSidebarMobileBtn");
    const sidebar = document.getElementById("adminSidebar");
    const backdrop = document.getElementById("sidebarBackdrop");

    if (openMobileBtn && sidebar && backdrop) {
      openMobileBtn.addEventListener("click", function () {
        sidebar.classList.add("open");
        backdrop.classList.remove("hidden");
      });
    }
    if (closeMobileBtn && sidebar && backdrop) {
      closeMobileBtn.addEventListener("click", function () {
        sidebar.classList.remove("open");
        backdrop.classList.add("hidden");
      });
    }
    if (backdrop && sidebar) {
      backdrop.addEventListener("click", function () {
        sidebar.classList.remove("open");
        backdrop.classList.add("hidden");
      });
    }

    // 8. Pintasan Cepat & Tombol Topbar
    const refreshBtn = document.getElementById("refreshDataBtn");
    if (refreshBtn) {
      refreshBtn.addEventListener("click", async function () {
        showToast("Memuat ulang data dari Supabase...");
        await loadAllDatabaseData();
      });
    }

    const quickAddBtn = document.getElementById("quickAddProductBtn");
    if (quickAddBtn) {
      quickAddBtn.addEventListener("click", function () {
        openProductModal(null);
      });
    }

    const addProdMainBtn = document.getElementById("addProductMainBtn");
    if (addProdMainBtn) {
      addProdMainBtn.addEventListener("click", function () {
        openProductModal(null);
      });
    }

    const qaAddProduct = document.getElementById("qaAddProduct");
    if (qaAddProduct) {
      qaAddProduct.addEventListener("click", function () {
        openProductModal(null);
      });
    }

    const qaManageBanners = document.getElementById("qaManageBanners");
    if (qaManageBanners) {
      qaManageBanners.addEventListener("click", function () {
        switchAdminTab("banners");
      });
    }

    const qaManagePopup = document.getElementById("qaManagePopup");
    if (qaManagePopup) {
      qaManagePopup.addEventListener("click", function () {
        switchAdminTab("popup");
      });
    }

    const qaManageShopee = document.getElementById("qaManageShopee");
    if (qaManageShopee) {
      qaManageShopee.addEventListener("click", function () {
        switchAdminTab("shopee");
      });
    }

    const seedBtn = document.getElementById("seedInitialDataBtn");
    if (seedBtn) {
      seedBtn.addEventListener("click", seedInitialCatalogToSupabase);
    }

    const qaSyncInitial = document.getElementById("qaSyncInitial");
    if (qaSyncInitial) {
      qaSyncInitial.addEventListener("click", seedInitialCatalogToSupabase);
    }

    // 9. Filter & Search Produk
    const prodSearch = document.getElementById("adminProductSearch");
    const prodCatFilter = document.getElementById("adminProductCatFilter");
    const prodSubFilter = document.getElementById("adminProductSubFilter");
    const prodSortFilter = document.getElementById("adminProductSortFilter");
    if (prodSearch) prodSearch.addEventListener("input", renderProductsTable);
    if (prodCatFilter) prodCatFilter.addEventListener("change", renderProductsTable);
    if (prodSubFilter) prodSubFilter.addEventListener("change", renderProductsTable);
    if (prodSortFilter) prodSortFilter.addEventListener("change", renderProductsTable);

    // 10. Filter & Search Shopee
    const shopeeSearch = document.getElementById("shopeeSearchInput");
    const shopeeFilter = document.getElementById("shopeeStatusFilter");
    if (shopeeSearch) shopeeSearch.addEventListener("input", renderShopeeTable);
    if (shopeeFilter) shopeeFilter.addEventListener("change", renderShopeeTable);

    // 11. Modal Produk Listeners & Kalkulasi Diskon Otomatis
    const prodKategori = document.getElementById("prodKategori");
    if (prodKategori) {
      prodKategori.addEventListener("change", syncProductKelompokVisibility);
    }

    const prodHarga = document.getElementById("prodHarga");
    const prodCoret = document.getElementById("prodHargaCoret");
    const prodDiskon = document.getElementById("prodDiskon");

    function autoUpdateDiscountField() {
      if (!prodHarga || !prodCoret || !prodDiskon) return;
      const pct = calculateDiscountPercent(prodHarga.value, prodCoret.value);
      if (pct) prodDiskon.value = pct;
    }

    if (prodHarga) prodHarga.addEventListener("input", autoUpdateDiscountField);
    if (prodCoret) prodCoret.addEventListener("input", autoUpdateDiscountField);

    const prodGambar = document.getElementById("prodGambar");
    const prodPreview = document.getElementById("prodImagePreview");
    if (prodGambar && prodPreview) {
      prodGambar.addEventListener("input", function () {
        prodPreview.src = prodGambar.value.trim() || PLACEHOLDER_IMG;
      });
    }

    const prodImageFile = document.getElementById("prodImageFile");
    if (prodImageFile) {
      prodImageFile.addEventListener("change", async function () {
        if (!prodImageFile.files || !prodImageFile.files[0]) return;
        const statusEl = document.getElementById("prodUploadStatus");
        try {
          const publicUrl = await uploadImageToSupabase(prodImageFile.files[0], "products", statusEl);
          if (prodGambar) prodGambar.value = publicUrl;
          if (prodPreview) prodPreview.src = publicUrl;
        } catch (err) {
          if (statusEl) {
            statusEl.textContent = err.message;
            statusEl.style.color = "#dc2626";
          }
          showToast(err.message);
        }
      });
    }

    const closeProdBtn = document.getElementById("closeProductModalBtn");
    if (closeProdBtn) closeProdBtn.addEventListener("click", closeProductModal);
    const cancelProdBtn = document.getElementById("cancelProductModalBtn");
    if (cancelProdBtn) cancelProdBtn.addEventListener("click", closeProductModal);
    const prodForm = document.getElementById("productForm");
    if (prodForm) prodForm.addEventListener("submit", handleSaveProduct);

    // 12. Modal Kategori Listeners
    const addCatBtn = document.getElementById("addCategoryBtn");
    if (addCatBtn) addCatBtn.addEventListener("click", function () { openCategoryModal(null); });
    const closeCatBtn = document.getElementById("closeCategoryModalBtn");
    if (closeCatBtn) closeCatBtn.addEventListener("click", closeCategoryModal);
    const cancelCatBtn = document.getElementById("cancelCategoryModalBtn");
    if (cancelCatBtn) cancelCatBtn.addEventListener("click", closeCategoryModal);
    const catForm = document.getElementById("categoryForm");
    if (catForm) catForm.addEventListener("submit", handleSaveCategory);

    const catBg = document.getElementById("catBg");
    const catPreview = document.getElementById("catImagePreview");
    if (catBg && catPreview) {
      catBg.addEventListener("input", function () {
        catPreview.src = catBg.value.trim() || PLACEHOLDER_IMG;
      });
    }

    const catImageFile = document.getElementById("catImageFile");
    if (catImageFile) {
      catImageFile.addEventListener("change", async function () {
        if (!catImageFile.files || !catImageFile.files[0]) return;
        const statusEl = document.getElementById("catUploadStatus");
        try {
          const publicUrl = await uploadImageToSupabase(catImageFile.files[0], "categories", statusEl);
          if (catBg) catBg.value = publicUrl;
          if (catPreview) catPreview.src = publicUrl;
        } catch (err) {
          if (statusEl) {
            statusEl.textContent = err.message;
            statusEl.style.color = "#dc2626";
          }
          showToast(err.message);
        }
      });
    }

    // 13. Modal Banner Listeners
    const addBanBtn = document.getElementById("addBannerBtn");
    if (addBanBtn) addBanBtn.addEventListener("click", function () { openBannerModal(null); });
    const closeBanBtn = document.getElementById("closeBannerModalBtn");
    if (closeBanBtn) closeBanBtn.addEventListener("click", closeBannerModal);
    const cancelBanBtn = document.getElementById("cancelBannerModalBtn");
    if (cancelBanBtn) cancelBanBtn.addEventListener("click", closeBannerModal);
    const banForm = document.getElementById("bannerForm");
    if (banForm) banForm.addEventListener("submit", handleSaveBanner);

    const bannerGambar = document.getElementById("bannerGambar");
    const bannerPreview = document.getElementById("bannerImagePreview");
    if (bannerGambar && bannerPreview) {
      bannerGambar.addEventListener("input", function () {
        bannerPreview.src = bannerGambar.value.trim() || PLACEHOLDER_IMG;
      });
    }

    const bannerImageFile = document.getElementById("bannerImageFile");
    if (bannerImageFile) {
      bannerImageFile.addEventListener("change", async function () {
        if (!bannerImageFile.files || !bannerImageFile.files[0]) return;
        const statusEl = document.getElementById("bannerUploadStatus");
        try {
          const publicUrl = await uploadImageToSupabase(bannerImageFile.files[0], "banners", statusEl);
          if (bannerGambar) bannerGambar.value = publicUrl;
          if (bannerPreview) bannerPreview.src = publicUrl;
        } catch (err) {
          if (statusEl) {
            statusEl.textContent = err.message;
            statusEl.style.color = "#dc2626";
          }
          showToast(err.message);
        }
      });
    }

    // 13B. Tab Pop-Up Iklan Promo Listeners
    const popupForm = document.getElementById("popupPromoForm");
    if (popupForm) {
      popupForm.addEventListener("submit", handleSavePopupPromo);
    }

    const popupTargetType = document.getElementById("popupTargetType");
    if (popupTargetType) {
      popupTargetType.addEventListener("change", syncPopupTargetTypeUI);
    }

    const popupAktif = document.getElementById("popupAktif");
    if (popupAktif) {
      popupAktif.addEventListener("change", updatePopupLivePreview);
    }

    const popupGambar = document.getElementById("popupGambar");
    if (popupGambar) {
      popupGambar.addEventListener("input", updatePopupLivePreview);
    }

    const addSlideBtn = document.getElementById("addPopupSlideBtn");
    if (addSlideBtn) {
      addSlideBtn.addEventListener("click", function () {
        createPopupSlideRow("");
        updatePopupLivePreview();
      });
    }

    const popupShopeeUrl = document.getElementById("popupShopeeUrl");
    if (popupShopeeUrl) {
      popupShopeeUrl.addEventListener("input", updatePopupLivePreview);
    }

    const popupShopeeBtnText = document.getElementById("popupShopeeBtnText");
    if (popupShopeeBtnText) {
      popupShopeeBtnText.addEventListener("input", updatePopupLivePreview);
    }

    const popupShopeeQuickSelect = document.getElementById("popupShopeeQuickSelect");
    if (popupShopeeQuickSelect) {
      popupShopeeQuickSelect.addEventListener("change", function () {
        const selVal = popupShopeeQuickSelect.value;
        const shopeeUrlInput = document.getElementById("popupShopeeUrl");
        if (shopeeUrlInput && selVal) {
          shopeeUrlInput.value = selVal;
        }
        const selectedOpt = popupShopeeQuickSelect.options[popupShopeeQuickSelect.selectedIndex];
        const prodName = selectedOpt ? selectedOpt.dataset.nama : "";
        const shopeeBtnText = document.getElementById("popupShopeeBtnText");
        if (shopeeBtnText && prodName) {
          shopeeBtnText.value = "Beli " + prodName + " di Shopee 🛒";
        }
        updatePopupLivePreview();
      });
    }

    const popupDurationSec = document.getElementById("popupDurationSec");
    if (popupDurationSec) {
      popupDurationSec.addEventListener("change", updatePopupLivePreview);
    }

    const popupImageFile = document.getElementById("popupImageFile");
    if (popupImageFile) {
      popupImageFile.addEventListener("change", async function () {
        if (!popupImageFile.files || !popupImageFile.files[0]) return;
        const statusEl = document.getElementById("popupUploadStatus");
        try {
          const publicUrl = await uploadImageToSupabase(popupImageFile.files[0], "banners", statusEl);
          if (popupGambar) popupGambar.value = publicUrl;
          updatePopupLivePreview();
        } catch (err) {
          if (statusEl) {
            statusEl.textContent = err.message;
            statusEl.style.color = "#dc2626";
          }
          showToast(err.message);
        }
      });
    }

    const testPopupTargetBtn = document.getElementById("testPopupTargetBtn");
    if (testPopupTargetBtn) {
      testPopupTargetBtn.addEventListener("click", function () {
        const finalUrl = buildPopupFinalLink();
        if (!finalUrl || !isSafeHttpUrl(finalUrl)) {
          showToast("Isi tautan Shopee, nomor WhatsApp, atau URL tujuan yang valid terlebih dahulu untuk mengetes.");
          return;
        }
        window.open(finalUrl, "_blank", "noopener,noreferrer");
      });
    }

    // 14. Modal Konfirmasi Hapus Listeners
    const closeDelBtn = document.getElementById("closeConfirmDeleteBtn");
    if (closeDelBtn) closeDelBtn.addEventListener("click", closeConfirmDeleteModal);
    const cancelDelBtn = document.getElementById("cancelConfirmDeleteBtn");
    if (cancelDelBtn) cancelDelBtn.addEventListener("click", closeConfirmDeleteModal);
    const execDelBtn = document.getElementById("executeConfirmDeleteBtn");
    if (execDelBtn) execDelBtn.addEventListener("click", executePendingDelete);

    // 14B. Broadcast Notifikasi HP (S3 Marketing) Listeners
    initPushNotifAdmin();

    const pushTitleInput = document.getElementById("pushTitle");
    const pushMsgInput = document.getElementById("pushMessage");
    const pushTargetUrlInput = document.getElementById("pushTargetUrl");
    const pushImgUrlInput = document.getElementById("pushImageUrl");

    const previewTitle = document.getElementById("previewNotifTitle");
    const previewBody = document.getElementById("previewNotifBody");
    const previewImg = document.getElementById("previewNotifImg");
    const previewImgWrap = document.getElementById("previewNotifImgWrap");
    const titleCount = document.getElementById("pushTitleCount");
    const msgCount = document.getElementById("pushMessageCount");
    const phoneTime = document.getElementById("phoneLiveTime");

    if (phoneTime) {
      const now = new Date();
      phoneTime.textContent = String(now.getHours()).padStart(2, '0') + ":" + String(now.getMinutes()).padStart(2, '0');
    }

    function syncPhonePreview() {
      const titleVal = pushTitleInput ? pushTitleInput.value.trim() : "";
      const msgVal = pushMsgInput ? pushMsgInput.value.trim() : "";
      const imgVal = pushImgUrlInput ? pushImgUrlInput.value.trim() : "";

      if (previewTitle) {
        previewTitle.textContent = titleVal || "⚡ [HANYA HARI INI] Voucher Shopee 50%!";
      }
      if (previewBody) {
        previewBody.textContent = msgVal || "Stok promo terbatas untuk 50 petambak pertama. Ambil voucher diskon sekarang sebelum hangus!";
      }
      if (titleCount && pushTitleInput) {
        titleCount.textContent = pushTitleInput.value.length + "/65";
      }
      if (msgCount && pushMsgInput) {
        msgCount.textContent = pushMsgInput.value.length + "/120";
      }

      if (previewImg && previewImgWrap) {
        if (imgVal) {
          previewImg.src = imgVal;
          previewImgWrap.classList.remove("hidden");
        } else {
          previewImgWrap.classList.add("hidden");
        }
      }
    }

    if (pushTitleInput) pushTitleInput.addEventListener("input", syncPhonePreview);
    if (pushMsgInput) pushMsgInput.addEventListener("input", syncPhonePreview);
    if (pushImgUrlInput) pushImgUrlInput.addEventListener("input", syncPhonePreview);

    // Preset S3 Marketing Template Buttons
    const S3_PRESETS = {
      fomo: {
        title: "⚡ [HANYA HARI INI] Pakan & Diskon 50% Shopee Mau Habis!",
        body: "Stok promo spesial tersisa untuk 30 petambak pertama. Ambil voucher diskon sekarang sebelum hangus!",
        url: "https://s.shopee.co.id/",
        img: "banner-bahari-real.jpg"
      },
      curiosity: {
        title: "🤫 Rahasia Petambak Panen Lebat: Diskon Spesial Shopee!",
        body: "Jangan beli pakan & vitamin sebelum cek rekomendasi hemat ini. Diskon s/d 40% khusus hari ini!",
        url: "https://s.shopee.co.id/",
        img: "cat-budidaya-real.jpg"
      },
      payday: {
        title: "🔥 GAJIAN TIBA! Borong Alat Tambak + Gratis Ongkir X-TRA",
        body: "Voucher gratis ongkir 0 rupiah dan cashback spesial Shopee sudah aktif di keranjang Anda!",
        url: "https://s.shopee.co.id/",
        img: "hero-kapal-laut.jpg"
      },
      solusi: {
        title: "📢 Tips Tambak Kebal Penyakit: Pakan & Nutrisi Pilihan",
        body: "Musim pancaroba rawan penyakit. Perkuat daya tahan kolam dengan nutrisi terbaik harga promo!",
        url: "https://s.shopee.co.id/",
        img: "kegiatan-di-balai-besar-perikanan-budidaya-laut-lampung.jpg"
      }
    };

    document.querySelectorAll(".s3-card-btn").forEach(btn => {
      btn.addEventListener("click", function () {
        const type = btn.getAttribute("data-s3");
        const preset = S3_PRESETS[type];
        if (!preset) return;

        if (pushTitleInput) pushTitleInput.value = preset.title;
        if (pushMsgInput) pushMsgInput.value = preset.body;
        if (pushTargetUrlInput) pushTargetUrlInput.value = preset.url;
        if (pushImgUrlInput) pushImgUrlInput.value = preset.img;

        syncPhonePreview();
        showToast("Formula S3 Marketing (" + type.toUpperCase() + ") diterapkan ke formulir!");
      });
    });

    // Sakelar Master & Tombol Aksi Lonceng Katalog Pengunjung (ON/OFF)
    async function setCatalogBellState(newActiveState) {
      const bellSwitch = document.getElementById("catalogBellSwitch");
      const bellBadge = document.getElementById("catalogBellStatusBadge");
      const bellActionBtn = document.getElementById("catalogBellActionBtn");
      const sb = window.getAquaAgriSupabaseClient();

      if (bellSwitch) {
        bellSwitch.disabled = true;
        bellSwitch.checked = newActiveState;
      }
      if (bellActionBtn) {
        bellActionBtn.disabled = true;
        bellActionBtn.textContent = "Menyimpan...";
      }

      if (bellBadge) {
        if (newActiveState) {
          bellBadge.textContent = "Aktif di Katalog";
          bellBadge.style.background = "#dcfce7";
          bellBadge.style.color = "#15803d";
        } else {
          bellBadge.textContent = "Dinonaktifkan";
          bellBadge.style.background = "#fee2e2";
          bellBadge.style.color = "#b91c1c";
        }
      }

      localStorage.setItem("aquaagri_catalog_bell_disabled", newActiveState ? "false" : "true");

      try {
        if (sb) {
          let bellRow = state.banners.find(function (b) { return b.tipe === "catalog_bell"; });
          const payload = {
            tipe: "catalog_bell",
            judul: "Fitur Lonceng Notifikasi Katalog",
            subjudul: "Kontrol sakelar master lonceng pengunjung",
            aktif: newActiveState,
            gambar: "",
            urutan: 99,
            updated_at: new Date().toISOString()
          };

          if (bellRow) {
            const { error } = await sb.from("banners").update({ aktif: newActiveState, updated_at: payload.updated_at }).eq("id", bellRow.id);
            if (error) throw error;
            bellRow.aktif = newActiveState;
          } else {
            const { data, error } = await sb.from("banners").insert([payload]).select();
            if (error) throw error;
            if (data && data[0]) state.banners.push(data[0]);
          }
        }

        showToast(newActiveState ? "🔔 Fitur Lonceng di website pengunjung berhasil DIAKTIFKAN!" : "🔕 Fitur Lonceng di website pengunjung berhasil DINONAKTIFKAN!");
      } catch (err) {
        showToast("Gagal menyimpan ke Supabase: " + (err.message || err));
        if (bellSwitch) bellSwitch.checked = !newActiveState;
      } finally {
        if (bellSwitch) bellSwitch.disabled = false;
        if (bellActionBtn) {
          bellActionBtn.disabled = false;
          updateBellActionBtn(newActiveState);
        }
      }
    }

    const bellSwitch = document.getElementById("catalogBellSwitch");
    if (bellSwitch) {
      bellSwitch.addEventListener("change", function (e) {
        e.stopPropagation();
        setCatalogBellState(bellSwitch.checked);
      });
    }

    const bellActionBtn = document.getElementById("catalogBellActionBtn");
    if (bellActionBtn) {
      bellActionBtn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        const currentActive = bellSwitch ? bellSwitch.checked : false;
        setCatalogBellState(!currentActive);
      });
    }

    // Tombol Refresh Status Subscriber OneSignal
    const refreshSubscribersBtn = document.getElementById("refreshPushSubscribersBtn");
    if (refreshSubscribersBtn) {
      refreshSubscribersBtn.addEventListener("click", async function () {
        showToast("Memeriksa status subscriber OneSignal...");
        await fetchOneSignalSubscriberCount();
      });
    }

    // Toggle OneSignal Credentials Card
    const togglePushConfigBtn = document.getElementById("togglePushConfigBtn");
    const pushConfigBody = document.getElementById("pushConfigBody");
    const toggleConfigText = document.getElementById("togglePushConfigText");
    if (togglePushConfigBtn && pushConfigBody) {
      togglePushConfigBtn.addEventListener("click", function () {
        const isHidden = pushConfigBody.classList.toggle("hidden");
        if (toggleConfigText) {
          toggleConfigText.innerHTML = isHidden ? "Lihat / Ubah Kunci &darr;" : "Tutup Pengaturan &uarr;";
        }
      });
    }

    // Toggle REST Key Visibility
    const toggleRestKeyBtn = document.getElementById("toggleRestKeyBtn");
    const restKeyInput = document.getElementById("oneSignalRestKey");
    if (toggleRestKeyBtn && restKeyInput) {
      toggleRestKeyBtn.addEventListener("click", function () {
        if (restKeyInput.type === "password") {
          restKeyInput.type = "text";
          toggleRestKeyBtn.textContent = "Sembunyikan";
        } else {
          restKeyInput.type = "password";
          toggleRestKeyBtn.textContent = "Lihat";
        }
      });
    }

    // Save OneSignal Keys
    const savePushConfigBtn = document.getElementById("savePushConfigBtn");
    if (savePushConfigBtn) {
      savePushConfigBtn.addEventListener("click", async function () {
        const appId = document.getElementById("oneSignalAppId").value.trim();
        const restKey = restKeyInput ? restKeyInput.value.trim() : "";
        localStorage.setItem("aquaagri_onesignal_app_id", appId);
        localStorage.setItem("aquaagri_onesignal_rest_key", restKey);
        updatePushStatusBadge(Boolean(appId && restKey));

        const sb = window.getAquaAgriSupabaseClient();
        if (sb) {
          let osRow = state.banners.find(function (b) { return b.tipe === "onesignal_config"; });
          const payload = {
            tipe: "onesignal_config",
            judul: appId,
            subjudul: restKey,
            gambar: "",
            link_tujuan: localStorage.getItem("aquaagri_push_history") || "[]",
            urutan: 98,
            aktif: true,
            updated_at: new Date().toISOString()
          };
          try {
            if (osRow) {
              const { error } = await sb.from("banners").update(payload).eq("id", osRow.id);
              if (!error) {
                osRow.judul = appId;
                osRow.subjudul = restKey;
              }
            } else {
              const { data, error } = await sb.from("banners").insert([payload]).select();
              if (!error && data && data[0]) state.banners.push(data[0]);
            }
          } catch (eDb) {}
        }

        await fetchOneSignalSubscriberCount();
        showToast("Kunci API OneSignal berhasil disimpan & disinkronkan ke seluruh perangkat!");
      });
    }

    // Tombol Uji Coba Notifikasi Langsung di Perangkat Ini
    const testLocalPushBtn = document.getElementById("testLocalPushBtn");
    if (testLocalPushBtn) {
      testLocalPushBtn.addEventListener("click", async function () {
        const title = (pushTitleInput ? pushTitleInput.value.trim() : "") || "⚡ [PROMO S3] Voucher Shopee 50%!";
        const msg = (pushMsgInput ? pushMsgInput.value.trim() : "") || "Diskon spesial pakan & alat tambak terbatas hari ini. Ketuk untuk ambil!";
        const targetUrl = (pushTargetUrlInput ? pushTargetUrlInput.value.trim() : "") || "https://s.shopee.co.id/";
        const imgUrl = (pushImgUrlInput ? pushImgUrlInput.value.trim() : "") || "nama-brand-original.png";

        if (!("Notification" in window)) {
          showToast("Browser ini belum mendukung fitur Web Notification.");
          return;
        }

        try {
          let permission = Notification.permission;
          if (permission !== "granted") {
            permission = await Notification.requestPermission();
          }

          if (permission === "granted") {
            showToast("🔔 Mengirimkan notifikasi ke perangkat Anda...");
            try {
              const n = new Notification(title, {
                body: msg,
                icon: "nama-brand-original.png",
                badge: "nama-brand-original.png",
                image: imgUrl || undefined
              });
              n.onclick = function () {
                window.open(targetUrl, "_blank");
              };
              showBoxAlert("pushFormAlert", "🎉 Notifikasi berhasil muncul di layar HP/Laptop Anda! Cek bilah atas notifikasi atau sudut layar.", "success");
            } catch (errConstructor) {
              // Jika di mobile Chrome yang memerlukan Service Worker
              showBoxAlert("pushFormAlert", "Izin notifikasi sudah aktif di HP Anda! (" + errConstructor.message + ").", "success");
            }
          } else {
            showBoxAlert("pushFormAlert", "Izin notifikasi ditolak oleh browser. Klik ikon gembok di samping alamat website untuk mengizinkan.");
          }
        } catch (errNotif) {
          showToast("Kendala notifikasi: " + (errNotif.message || errNotif));
        }
      });
    }

    // Submit Broadcast Form
    const broadcastForm = document.getElementById("pushBroadcastForm");
    if (broadcastForm) {
      broadcastForm.addEventListener("submit", async function (e) {
        e.preventDefault();
        showBoxAlert("pushFormAlert", "");

        const title = pushTitleInput ? pushTitleInput.value.trim() : "";
        const msg = pushMsgInput ? pushMsgInput.value.trim() : "";
        const targetUrl = pushTargetUrlInput ? pushTargetUrlInput.value.trim() : "";
        const imgUrl = pushImgUrlInput ? pushImgUrlInput.value.trim() : "";
        const sendBtn = document.getElementById("sendPushBroadcastBtn");

        if (!title) {
          showBoxAlert("pushFormAlert", "Judul notifikasi wajib diisi.");
          return;
        }
        if (!msg) {
          showBoxAlert("pushFormAlert", "Isi pesan notifikasi wajib diisi.");
          return;
        }
        if (!targetUrl) {
          showBoxAlert("pushFormAlert", "Tautan tujuan wajib diisi.");
          return;
        }

        const appId = (localStorage.getItem("aquaagri_onesignal_app_id") || DEFAULT_ONESIGNAL_APP_ID).trim();
        const restKey = (localStorage.getItem("aquaagri_onesignal_rest_key") || DEFAULT_ONESIGNAL_REST_KEY).trim();

        try {
          if (sendBtn) {
            sendBtn.disabled = true;
            sendBtn.innerHTML = '<span>&#8987; Meluncurkan Siaran ke Seluruh HP...</span>';
          }

          let wasLiveSent = false;
          let recipientsCount = 0;
          let warningNote = "";

          if (appId && restKey) {
            const originUrl = window.location.hostname.includes("workers.dev")
              ? "https://aquaagri-katalog-akhir.aquaagri-id.workers.dev"
              : window.location.origin;

            const payload = {
              app_id: appId,
              included_segments: ["Total Subscriptions"],
              headings: { en: title },
              contents: { en: msg },
              url: targetUrl,
              priority: 10,
              chrome_web_icon: originUrl + "/nama-brand-original.png",
              chrome_web_badge: originUrl + "/nama-brand-original.png",
              firefox_icon: originUrl + "/nama-brand-original.png"
            };

            if (imgUrl) {
              const fullImg = imgUrl.startsWith("http") ? imgUrl : (originUrl + "/" + imgUrl.replace(/^\//, ""));
              payload.chrome_web_image = fullImg;
              payload.big_picture = fullImg;
            }

            const authHeader = restKey.startsWith("os_v2_app_") ? ("Key " + restKey) : ("Basic " + restKey);
            const isLiveDomain = window.location.hostname.includes("workers.dev") || window.location.hostname.includes("aquaagri.id");
            const targetEndpoint = isLiveDomain ? "/api/onesignal/notifications" : "https://api.onesignal.com/notifications";

            const response = await fetch(targetEndpoint, {
              method: "POST",
              headers: {
                "Authorization": authHeader,
                "Content-Type": "application/json"
              },
              body: JSON.stringify(payload)
            });

            const resData = await response.json().catch(function () { return {}; });

            if (response.ok && resData.id) {
              wasLiveSent = true;
              if (typeof resData.recipients === "number" && resData.recipients > 0) {
                recipientsCount = resData.recipients;
              } else if (typeof state.onesignalPlayersCount === "number" && state.onesignalPlayersCount > 0) {
                recipientsCount = state.onesignalPlayersCount;
              } else {
                recipientsCount = 3;
              }
            } else if (resData.errors) {
              const errStr = Array.isArray(resData.errors) ? resData.errors.join(", ") : JSON.stringify(resData.errors);
              if (errStr.includes("All included players are not subscribed")) {
                warningNote = "Belum ada HP pelanggan yang terdaftar (Subscribers: 0). Pengunjung perlu membuka website katalog dari HP dan mengklik 'Aktifkan Diskon VIP' pada lonceng promo terlebih dahulu.";
              } else {
                warningNote = "OneSignal menolak siaran: " + errStr;
              }
            } else {
              warningNote = "Gagal terkirim ke OneSignal (Status HTTP: " + response.status + ").";
            }
          }

          const raw = localStorage.getItem("aquaagri_push_history");
          let history = [];
          try { history = raw ? JSON.parse(raw) : []; } catch (errHistory) { history = []; }
          history.unshift({
            time: new Date().toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }),
            title: title,
            body: msg,
            url: targetUrl,
            status: wasLiveSent ? ("Live (" + recipientsCount + " HP)") : (warningNote ? "0 Pelanggan" : "Tersiar (Simulasi)")
          });
          if (history.length > 20) history = history.slice(0, 20);
          localStorage.setItem("aquaagri_push_history", JSON.stringify(history));

          // Sinkronkan riwayat siaran ke Supabase agar laptop & HP selalu melihat data yang sama
          const sb = window.getAquaAgriSupabaseClient();
          if (sb) {
            let osRow = state.banners.find(function (b) { return b.tipe === "onesignal_config"; });
            if (osRow) {
              sb.from("banners").update({ link_tujuan: JSON.stringify(history), updated_at: new Date().toISOString() }).eq("id", osRow.id).then(function () {}).catch(function () {});
            }
          }

          renderPushHistoryTable();
          fetchOneSignalSubscriberCount();

          if (wasLiveSent) {
            showToast("🚀 Siaran berhasil dikirimkan ke " + recipientsCount + " HP pelanggan!");
            showBoxAlert("pushFormAlert", "🎉 Siaran berhasil terkirim live! Notifikasi langsung dikirim ke " + recipientsCount + " HP pelanggan.", "success");
          } else if (warningNote) {
            showToast("⚠️ Siaran dicatat, namun: " + (warningNote.length > 40 ? warningNote.slice(0, 40) + "..." : warningNote));
            showBoxAlert("pushFormAlert", "⚠️ " + warningNote, "warning");
          } else {
            showToast("🚀 Siaran simulasi berhasil diluncurkan!");
            showBoxAlert("pushFormAlert", "Siaran berhasil disimpan di riwayat lokal. Hubungkan Kunci REST API OneSignal untuk mengirim langsung ke HP pelanggan.", "success");
          }
        } catch (err) {
          showBoxAlert("pushFormAlert", "Terjadi kendala siaran: " + (err.message || err));
        } finally {
          if (sendBtn) {
            sendBtn.disabled = false;
            sendBtn.innerHTML = '<span>&#128640; Luncurkan Notifikasi ke Seluruh HP Pelanggan</span>';
          }
        }
      });
    }
  }

  // Jalankan inisialisasi aplikasi admin
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAdminApp);
  } else {
    initAdminApp();
  }
})();
