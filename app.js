(function () {
  "use strict";

  const data = window.BUFFETS || [];
  const AREAS = window.AREAS;
  const MEALS = window.MEALS;
  const areaOrder = Object.keys(AREAS);

  const state = { q: "", areas: new Set(), meals: new Set(), budget: null, sort: "area" };

  const $ = (id) => document.getElementById(id);
  const yen = (n) => n.toLocaleString("ja-JP") + "円";
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // 大人料金の最安値（ランチ・ディナーのうち判明しているもの）
  function minAdult(b) {
    const vals = ["lunch", "dinner"]
      .map((m) => b.prices[m] && b.prices[m].adult)
      .filter((v) => typeof v === "number");
    return vals.length ? Math.min(...vals) : null;
  }

  function buildChips(container, entries, set) {
    // 実際にデータがある項目だけチップにする
    entries.forEach(([key, label]) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "chip";
      btn.textContent = label;
      btn.setAttribute("aria-pressed", "false");
      btn.dataset.key = key;
      btn.addEventListener("click", () => {
        set.has(key) ? set.delete(key) : set.add(key);
        btn.setAttribute("aria-pressed", String(set.has(key)));
        render();
      });
      container.appendChild(btn);
    });
  }

  function matches(b) {
    if (state.areas.size && !state.areas.has(b.area)) return false;
    if (state.meals.size && !b.meals.some((m) => state.meals.has(m))) return false;
    if (state.budget) {
      const p = minAdult(b);
      if (p === null || p > state.budget) return false;
    }
    if (state.q) {
      const hay = [b.hotel, b.restaurant, b.city, b.description, b.priceNote, AREAS[b.area], ...b.tags]
        .join(" ")
        .toLowerCase();
      if (!state.q.split(/\s+/).every((w) => hay.includes(w))) return false;
    }
    return true;
  }

  function sorted(list) {
    const byArea = (a, b) => areaOrder.indexOf(a.area) - areaOrder.indexOf(b.area);
    const price = (b, fallback) => (minAdult(b) === null ? fallback : minAdult(b));
    switch (state.sort) {
      case "priceAsc":
        return list.sort((a, b) => price(a, Infinity) - price(b, Infinity));
      case "priceDesc":
        return list.sort((a, b) => price(b, -1) - price(a, -1));
      case "name":
        return list.sort((a, b) => a.hotel.localeCompare(b.hotel, "ja"));
      default:
        return list.sort(byArea);
    }
  }

  function priceBox(label, p) {
    if (!p || typeof p.adult !== "number") {
      return `<div class="price"><div class="k">${label}</div><div class="v na">公式サイトで確認</div></div>`;
    }
    const child = typeof p.child === "number" ? `<div class="c">子ども ${yen(p.child)}〜</div>` : "";
    return `<div class="price"><div class="k">${label}・大人</div><div class="v">${yen(p.adult)}〜</div>${child}</div>`;
  }

  function card(b) {
    const search = "https://www.google.com/search?q=" + encodeURIComponent(`${b.hotel} ${b.restaurant} ブッフェ`);
    const mealBadges = b.meals.map((m) => `<span class="badge meal">${MEALS[m]}</span>`).join("");
    const prices = ["lunch", "dinner"]
      .filter((m) => b.meals.includes(m))
      .map((m) => priceBox(MEALS[m], b.prices[m]))
      .join("");
    return `
      <article class="card" data-area="${esc(b.area)}">
        <div class="card-body">
          <div class="meta"><span class="badge">${esc(AREAS[b.area])}</span>${mealBadges}</div>
          <h3>${esc(b.hotel)}</h3>
          ${b.restaurant ? `<p class="restaurant">${esc(b.restaurant)}</p>` : ""}
          <p class="city">📍 ${esc(b.city)}${b.hours ? `　🕒 ${esc(b.hours)}` : ""}</p>
          <p class="desc">${esc(b.description)}</p>
          <div class="prices">${prices}</div>
          ${b.priceNote ? `<p class="note">※ ${esc(b.priceNote)}</p>` : ""}
          <div class="tags">${b.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
        </div>
        <div class="card-foot">
          <span>確認日 ${esc(b.checked)}</span>
          <span class="links">
            ${b.source ? `<a href="${esc(b.source)}" target="_blank" rel="noopener">出典</a>` : ""}
            <a href="${search}" target="_blank" rel="noopener">最新情報を検索</a>
          </span>
        </div>
      </article>`;
  }

  function render() {
    const list = sorted(data.filter(matches));
    $("count").textContent = `${list.length}件のブッフェが見つかりました（全${data.length}件）`;
    $("list").innerHTML = list.length
      ? list.map(card).join("")
      : `<p class="empty">条件に合うブッフェが見つかりませんでした。条件をゆるめてみてください。</p>`;
  }

  function init() {
    const usedAreas = areaOrder.filter((a) => data.some((b) => b.area === a));
    buildChips($("areaChips"), usedAreas.map((a) => [a, AREAS[a]]), state.areas);
    const usedMeals = Object.keys(MEALS).filter((m) => data.some((b) => b.meals.includes(m)));
    buildChips($("mealChips"), usedMeals.map((m) => [m, MEALS[m]]), state.meals);

    $("q").addEventListener("input", (e) => {
      state.q = e.target.value.trim().toLowerCase();
      render();
    });
    $("budget").addEventListener("change", (e) => {
      state.budget = e.target.value ? Number(e.target.value) : null;
      render();
    });
    $("sort").addEventListener("change", (e) => {
      state.sort = e.target.value;
      render();
    });
    $("reset").addEventListener("click", () => {
      state.q = "";
      state.areas.clear();
      state.meals.clear();
      state.budget = null;
      state.sort = "area";
      $("q").value = "";
      $("budget").value = "";
      $("sort").value = "area";
      document.querySelectorAll(".chip").forEach((c) => c.setAttribute("aria-pressed", "false"));
      render();
    });

    render();
  }

  init();
})();
