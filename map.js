/*
 * 地図のプログラム（ふだんは触らなくてOK）
 * ピンの位置は data.js の lat / lng を使います。lat / lng が null の件は地図に出ません。
 * 一覧の絞り込みと連動して、表示中のブッフェだけピンを出します。
 */
(function () {
  "use strict";

  const el = document.getElementById("map");
  if (!el || typeof L === "undefined") {
    window.BuffetMap = { update() {}, focus() {} };
    return;
  }

  // エリアごとのピンの色（style.css のカード上辺の色とそろえる）
  const AREA_COLORS = {
    naha: "#0e7c86",
    south: "#4aa96c",
    central: "#e3a83b",
    west: "#e8664a",
    north: "#2f7a4f",
    islands: "#c8385a"
  };

  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const yen = (n) => n.toLocaleString("ja-JP") + "円";
  const hasPos = (b) => typeof b.lat === "number" && typeof b.lng === "number";

  function icon(area) {
    const color = AREA_COLORS[area] || AREA_COLORS.naha;
    return L.divIcon({
      className: "pin",
      html: `<span style="--pin:${color}"></span>`,
      iconSize: [28, 36],
      iconAnchor: [14, 34],
      popupAnchor: [0, -30]
    });
  }

  function priceLine(b) {
    const parts = [];
    for (const [key, label] of [["lunch", "ランチ"], ["dinner", "ディナー"]]) {
      if (!b.meals.includes(key)) continue;
      const p = b.prices[key];
      parts.push(`${label} ${p && typeof p.adult === "number" ? yen(p.adult) + "〜" : "要確認"}`);
    }
    return parts.join("／");
  }

  function popupHtml(b) {
    const gmap = `https://www.google.com/maps/search/?api=1&query=${b.lat},${b.lng}`;
    return `
      <div class="popup">
        <p class="popup-area">${esc(window.AREAS[b.area])}</p>
        <h3>${esc(b.hotel)}</h3>
        ${b.restaurant ? `<p class="popup-rest">${esc(b.restaurant)}</p>` : ""}
        <p class="popup-price">${esc(priceLine(b))}</p>
        <p class="popup-links">
          <a href="#${esc(b.id)}" data-jump="${esc(b.id)}">詳細を見る</a>
          <a href="${gmap}" target="_blank" rel="noopener">Googleマップ</a>
        </p>
      </div>`;
  }

  // 沖縄本島の中心あたり
  const map = L.map(el, { scrollWheelZoom: false }).setView([26.35, 127.78], 10);
  L.tileLayer("https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: '<a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank" rel="noopener">地理院タイル</a>'
  }).addTo(map);

  const layer = L.layerGroup().addTo(map);
  const markers = {};

  function update(list) {
    layer.clearLayers();
    for (const k of Object.keys(markers)) delete markers[k];
    const placed = list.filter(hasPos);
    for (const b of placed) {
      markers[b.id] = L.marker([b.lat, b.lng], { icon: icon(b.area), title: b.hotel, alt: b.hotel })
        .bindPopup(popupHtml(b), { maxWidth: 260 })
        .addTo(layer);
    }
    if (placed.length) {
      map.fitBounds(placed.map((b) => [b.lat, b.lng]), { padding: [40, 40], maxZoom: 14, animate: false });
    }
    const note = document.getElementById("mapNote");
    if (note) {
      const missing = list.length - placed.length;
      note.textContent = missing > 0 ? `※ 場所が未確認の${missing}件は地図に表示していません。` : "";
    }
  }

  function focus(id) {
    const m = markers[id];
    if (!m) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    map.setView(m.getLatLng(), 15);
    m.openPopup();
  }

  // ポップアップの「詳細を見る」→ 一覧のカードへ移動して少し強調する
  el.addEventListener("click", (e) => {
    const a = e.target.closest("[data-jump]");
    if (!a) return;
    e.preventDefault();
    const card = document.getElementById(a.dataset.jump);
    if (!card) return;
    card.scrollIntoView({ behavior: "smooth", block: "center" });
    card.classList.remove("flash");
    void card.offsetWidth;
    card.classList.add("flash");
  });

  window.BuffetMap = { update, focus };
})();
