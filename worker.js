// AquaAgri Cloudflare Worker - v1.0.6 (Add local push notification test button & broadcast simulator)
const SUPABASE_URL = "https://uqihzgskwxdurcwjpvbc.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_XOjGorIRGBqztcldte1AzQ_GwOyFKXQ";

function escapeHtmlAttr(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Tangani route /share?produk=ID atau /produk/ID untuk Dynamic Open Graph Thumbnail WhatsApp & Sosmed
    let prodId = url.searchParams.get("produk") || url.searchParams.get("id");
    if (!prodId && url.pathname.startsWith("/produk/")) {
      prodId = url.pathname.replace("/produk/", "").split("/")[0];
    }

    if (prodId && /^\d+$/.test(String(prodId).trim())) {
      const cleanId = String(prodId).trim();
      try {
        // Ambil halaman utama "/" dari binding ASSETS (hindari "/index.html" karena Cloudflare melakukan 307 redirect ke "/")
        const rootAssetUrl = new URL("/", url.origin);
        let indexRes = await env.ASSETS.fetch(
          new Request(rootAssetUrl.toString(), {
            method: "GET",
            headers: { Accept: "text/html,application/xhtml+xml" }
          })
        );

        if (indexRes.status >= 300 && indexRes.status < 400) {
          const loc = indexRes.headers.get("location");
          if (loc) {
            indexRes = await env.ASSETS.fetch(new Request(new URL(loc, url.origin).toString()));
          }
        }

        let html = await indexRes.text();
        if (!html || html.length < 100) {
          return Response.redirect(`${url.origin}/?produk=${cleanId}`, 302);
        }

        // Ambil detail produk langsung dari Supabase REST API untuk merender Open Graph Meta Tags spesifik produk
        const apiEndpoint = `${SUPABASE_URL}/rest/v1/products?id=eq.${cleanId}&select=id,nama,harga,harga_coret,diskon,gambar,deskripsi&limit=1`;
        const apiRes = await fetch(apiEndpoint, {
          headers: {
            apikey: SUPABASE_ANON_KEY,
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
            Accept: "application/json"
          }
        });

        if (apiRes.ok) {
          const rows = await apiRes.json();
          if (Array.isArray(rows) && rows.length > 0) {
            const p = rows[0];
            const discText = p.diskon ? ` (Diskon ${p.diskon})` : "";
            const ogTitle = `${p.nama} — ${p.harga || ""}${discText} | aquaagri.id`;
            const ogDesc = p.deskripsi
              ? `${p.deskripsi} — Beli resmi & aman di Katalog aquaagri.id (Mitra Resmi Shopee Indonesia).`
              : "Temukan produk perikanan & bahari berkualitas terjamin di Katalog Resmi aquaagri.id.";

            let rawImg = (p.gambar || "banner-bahari-real.jpg").trim();
            let ogImgUrl = rawImg;
            if (!/^https?:\/\//i.test(rawImg)) {
              const encodedPath = rawImg
                .replace(/^\//, "")
                .split("/")
                .map((seg) => encodeURIComponent(seg))
                .join("/");
              ogImgUrl = `${url.origin}/${encodedPath}`;
            }

            const shareUrl = `${url.origin}/share?produk=${cleanId}`;

            html = html
              .replace(
                /<title>[\s\S]*?<\/title>/i,
                `<title>${escapeHtmlAttr(ogTitle)}</title>`
              )
              .replace(
                /<meta property="og:title"[^>]*>/i,
                `<meta property="og:title" content="${escapeHtmlAttr(ogTitle)}">`
              )
              .replace(
                /<meta property="og:description"[^>]*>/i,
                `<meta property="og:description" content="${escapeHtmlAttr(ogDesc)}">`
              )
              .replace(
                /<meta property="og:image"[^>]*>/i,
                `<meta property="og:image" content="${escapeHtmlAttr(ogImgUrl)}">`
              )
              .replace(
                /<meta property="og:url"[^>]*>/i,
                `<meta property="og:url" content="${escapeHtmlAttr(shareUrl)}">`
              )
              .replace(
                /<meta name="twitter:title"[^>]*>/i,
                `<meta name="twitter:title" content="${escapeHtmlAttr(ogTitle)}">`
              )
              .replace(
                /<meta name="twitter:description"[^>]*>/i,
                `<meta name="twitter:description" content="${escapeHtmlAttr(ogDesc)}">`
              )
              .replace(
                /<meta name="twitter:image"[^>]*>/i,
                `<meta name="twitter:image" content="${escapeHtmlAttr(ogImgUrl)}">`
              );

            const numericPrice = Number(String(p.harga || "").replace(/[^0-9]/g, "")) || 0;
            const productSchema = {
              "@context": "https://schema.org",
              "@type": "Product",
              "name": p.nama,
              "image": [ogImgUrl],
              "description": p.deskripsi || p.nama,
              "brand": {
                "@type": "Brand",
                "name": "aquaagri.id"
              },
              "offers": {
                "@type": "Offer",
                "url": shareUrl,
                "priceCurrency": "IDR",
                "price": numericPrice,
                "priceValidUntil": "2027-12-31",
                "itemCondition": "https://schema.org/NewCondition",
                "availability": "https://schema.org/InStock",
                "seller": {
                  "@type": "Organization",
                  "name": "Shopee Indonesia"
                }
              }
            };

            const schemaTag = `<script type="application/ld+json">\n${JSON.stringify(productSchema, null, 2)}\n</script>\n`;

            html = html.replace(
              "</head>",
              `${schemaTag}<script>window.__INITIAL_PRODUCT_ID__ = ${Number(cleanId)};</script>\n</head>`
            );
          } else {
            // Jika produk tidak ditemukan di baris, tetap suntikkan ID
            html = html.replace(
              "</head>",
              `<script>window.__INITIAL_PRODUCT_ID__ = ${Number(cleanId)};</script>\n</head>`
            );
          }
        } else {
          // Jika API gagal, fallback suntikkan ID
          html = html.replace(
            "</head>",
            `<script>window.__INITIAL_PRODUCT_ID__ = ${Number(cleanId)};</script>\n</head>`
          );
        }

        return new Response(html, {
          status: 200,
          headers: {
            "content-type": "text/html; charset=utf-8",
            "cache-control": "public, max-age=60"
          }
        });
      } catch (err) {
        return Response.redirect(`${url.origin}/?produk=${cleanId}`, 302);
      }
    }

    return env.ASSETS.fetch(request);
  }
};
