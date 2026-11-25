/* =========================================================
   Rogers Made — site behaviour
   You shouldn't need to edit this file. Products live in
   products.js and contact details live in settings.js.
   ========================================================= */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var SETTINGS = window.ROGERS_SETTINGS || { social: {}, currency: "£" };
  var PRODUCTS = window.ROGERS_PRODUCTS || [];
  var CATEGORIES = window.ROGERS_CATEGORIES || [];

  // Photos can be listed as "/path.jpg" or { src: "/path.png", fit: "contain" }.
  // "contain" photos (e.g. charts) are shown in full instead of cropped.
  var CONTAIN = {};
  var MAX_PHOTOS = 5;
  PRODUCTS.forEach(function (p) {
    if (!Array.isArray(p.images)) return;
    p.images = p.images.map(function (im) {
      if (im && typeof im === "object") {
        if (im.fit === "contain") CONTAIN[im.src] = true;
        return im.src || "";
      }
      return im;
    }).filter(Boolean).slice(0, MAX_PHOTOS);
  });

  // Links to products that were renamed keep working
  var OLD_IDS = {
    "oak-house-number-plaque": "personalised-oak-house-sign",
    "christmas-tree-of-life-light": "christmas-led-lamp",
    "christmas-moon-sleigh-light": "christmas-led-lamp",
    "christmas-star-tree-light": "christmas-led-lamp"
  };

  /* ---------- Helpers ---------- */

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  // Serve local images through Netlify Image CDN so large phone
  // photos are resized and compressed automatically.
  // If the CDN isn't available (e.g. opening the files locally) the
  // original image is used instead.
  var useImageCdn = location.protocol.indexOf("http") === 0;

  function imgUrl(src, width) {
    if (!src) return "";
    if (!useImageCdn || /^https?:\/\//.test(src) || src.charAt(0) !== "/") return src;
    return "/.netlify/images?url=" + encodeURIComponent(src) + "&w=" + width + "&q=75";
  }

  function srcset(src, widths) {
    if (!useImageCdn || !src || src.charAt(0) !== "/") return "";
    return widths.map(function (w) { return imgUrl(src, w) + " " + w + "w"; }).join(", ");
  }

  function picture(src, alt, widths, sizes, eager) {
    var set = srcset(src, widths);
    return '<img src="' + esc(imgUrl(src, widths[widths.length - 1])) + '"' +
      (CONTAIN[src] ? ' class="fit-contain"' : "") +
      (set ? ' srcset="' + esc(set) + '" sizes="' + esc(sizes) + '"' : "") +
      ' alt="' + esc(alt) + '"' +
      (set ? ' data-fallback="' + esc(src) + '" onerror="this.onerror=null;this.removeAttribute(\'srcset\');this.src=this.dataset.fallback"' : "") +
      (eager ? "" : ' loading="lazy"') + ' decoding="async">';
  }

  function categoryById(id) {
    for (var i = 0; i < CATEGORIES.length; i++) if (CATEGORIES[i].id === id) return CATEGORIES[i];
    return null;
  }

  function productById(id) {
    if (OLD_IDS[id]) id = OLD_IDS[id];
    for (var i = 0; i < PRODUCTS.length; i++) if (PRODUCTS[i].id === id) return PRODUCTS[i];
    return null;
  }

  // How many can be bought. Products without a stock number
  // are treated as made to order (no limit shown).
  function stockOf(p) {
    if (p.sold === true || p.available === false) return 0;
    var n = Number(p.stock);
    return p.stock === undefined || p.stock === null || p.stock === "" || isNaN(n) ? 99 : Math.max(0, Math.floor(n));
  }

  function isSold(p) {
    return stockOf(p) <= 0;
  }

  function deliveryOf(p) {
    var n = Number(p.delivery);
    return isNaN(n) || n < 0 ? 0 : n;
  }

  function hasPrice(p) {
    return !(p.price === null || p.price === undefined || p.price === "" || isNaN(Number(p.price)));
  }

  function formatMoney(value) {
    var n = Number(value);
    var fixed = n % 1 === 0 ? n.toFixed(0) : n.toFixed(2);
    return (SETTINGS.currency || "£") + fixed;
  }

  // Always two decimal places, e.g. £4.95 or £25.00 (basket & checkout)
  function money(value) {
    return (SETTINGS.currency || "£") + (Math.round(Number(value) * 100) / 100).toFixed(2);
  }

  function priceHtml(p, cls) {
    if (!hasPrice(p)) {
      return '<div class="' + cls + ' on-request"><small>Price</small>Price on request</div>';
    }
    return '<div class="' + cls + '"><small>' + (p.priceFrom ? "From" : "Price") + "</small>" +
      formatMoney(p.price) + "</div>";
  }

  function deliveryText(p) {
    var d = deliveryOf(p);
    return d === 0 ? "Free" : money(d);
  }

  function stockHtml(p) {
    var n = stockOf(p);
    if (n <= 0) return '<p class="stock-status is-out"><i aria-hidden="true"></i>Sold out</p>';
    if (n >= 99) return '<p class="stock-status"><i aria-hidden="true"></i>Made to order</p>';
    if (n === 1) return '<p class="stock-status is-low"><i aria-hidden="true"></i>In stock — only 1 available</p>';
    return '<p class="stock-status"><i aria-hidden="true"></i>In stock — ' + n + " available</p>";
  }

  function productUrl(p) { return "/product?id=" + encodeURIComponent(p.id); }
  function enquireUrl(p) { return "/?enquire=" + encodeURIComponent(p.id) + "#contact"; }

  function cardHtml(p, index) {
    var cat = categoryById(p.category);
    var image = (p.images && p.images[0]) || "";
    var sold = isSold(p);
    var badge = sold ? "Sold out" : p.badge;
    var delay = " reveal-delay-" + (index % 3);
    return '' +
      '<article class="product reveal' + delay + (sold ? " is-sold" : "") + '">' +
        '<a class="product-image" href="' + productUrl(p) + '" tabindex="-1" aria-hidden="true">' +
          (badge ? '<span class="product-badge' + (sold ? " sold" : "") + '">' + esc(badge) + "</span>" : "") +
          (image
            ? picture(image, "", [480, 720, 960], "(max-width: 800px) 92vw, (max-width: 1100px) 45vw, 30vw")
            : "PHOTO COMING SOON") +
        "</a>" +
        '<div class="product-info">' +
          (cat ? '<div class="product-category">' + esc(cat.name) + "</div>" : "") +
          '<h3><a href="' + productUrl(p) + '">' + esc(p.name) + "</a></h3>" +
          '<div class="product-meta">' +
            priceHtml(p, "product-price") +
            '<a class="button button-outline button-small" href="' + productUrl(p) + '" aria-label="View product: ' + esc(p.name) + '">View product</a>' +
          "</div>" +
        "</div>" +
      "</article>";
  }

  var ARROW = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  /* ---------- Reveal on scroll ---------- */

  var observer = "IntersectionObserver" in window
    ? new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 })
    : null;

  function observeReveals(root) {
    var items = (root || document).querySelectorAll(".reveal:not(.is-visible)");
    items.forEach(function (el) {
      if (observer) observer.observe(el); else el.classList.add("is-visible");
    });
  }

  /* ---------- Navigation ---------- */

  function initNav() {
    var toggle = document.querySelector(".nav-toggle");
    var backdrop = document.querySelector(".nav-backdrop");

    // Shrink the header logo once the page is scrolled
    var compact = false;
    function onScroll() {
      var y = window.scrollY, next = compact ? y > 10 : y > 60;
      if (next !== compact) { compact = next; document.body.classList.toggle("header-compact", next); }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    if (!toggle) return;

    function setOpen(open) {
      document.body.classList.toggle("nav-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }

    toggle.addEventListener("click", function () {
      setOpen(!document.body.classList.contains("nav-open"));
    });
    if (backdrop) backdrop.addEventListener("click", function () { setOpen(false); });
    document.querySelectorAll(".site-nav a").forEach(function (a) {
      a.addEventListener("click", function () { setOpen(false); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setOpen(false);
    });
  }

  /* ---------- Contact details & socials ---------- */

  var ICONS = {
    instagram: '<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r=".6" fill="currentColor"/>',
    facebook: '<path d="M14.5 8.5h2.5V5h-2.6C11.7 5 10 6.8 10 9.4V11H7.5v3.4H10V21h3.5v-6.6h2.8l.5-3.4h-3.3V9.6c0-.7.4-1.1 1-1.1z"/>',
    tiktok: '<path d="M15.5 3.5c.4 2.3 1.9 3.8 4.2 4v3.1c-1.6 0-3-.5-4.2-1.3v6.1a5.7 5.7 0 1 1-5.7-5.7v3.2a2.5 2.5 0 1 0 2.5 2.5V3.5z"/>',
    pinterest: '<circle cx="12" cy="12" r="8.5"/><path d="M10.5 20.2l1.6-7M10 10.4c.3-1.6 1.5-2.6 3-2.6 1.8 0 2.9 1.2 2.9 2.9 0 2-1.1 3.7-2.7 3.7-1 0-1.6-.6-1.4-1.6"/>',
    youtube: '<rect x="2.5" y="5.5" width="19" height="13" rx="3.5"/><path d="M10 9.2v5.6l4.8-2.8z" fill="currentColor"/>',
    etsy: '<path d="M8.5 5.5h7.5M8.5 5.5v13h7.5M8.5 12h5.5"/>'
  };
  var LABELS = { instagram: "Instagram", facebook: "Facebook", tiktok: "TikTok", pinterest: "Pinterest", youtube: "YouTube", etsy: "Etsy" };

  function initContactDetails() {
    var social = SETTINGS.social || {};
    var links = Object.keys(LABELS).filter(function (k) { return social[k]; });

    document.querySelectorAll("[data-socials]").forEach(function (el) {
      if (!links.length) {
        var wrap = el.closest("[data-socials-wrap]");
        if (wrap) wrap.hidden = true;
        el.hidden = true;
        return;
      }
      el.innerHTML = links.map(function (k) {
        return '<a href="' + esc(social[k]) + '" target="_blank" rel="noopener" aria-label="Rogers Made on ' + LABELS[k] + '">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
          ICONS[k] + "</svg></a>";
      }).join("");
    });

    document.querySelectorAll("[data-social-list]").forEach(function (el) {
      el.innerHTML = links.map(function (k) {
        return '<li><a href="' + esc(social[k]) + '" target="_blank" rel="noopener">' + LABELS[k] + "</a></li>";
      }).join("");
      if (!links.length) el.hidden = true;
    });

    document.querySelectorAll("[data-setting]").forEach(function (el) {
      var key = el.getAttribute("data-setting");
      var value = SETTINGS[key];
      var row = el.closest("[data-setting-row]") || el;
      if (!value) { row.hidden = true; return; }
      if (key === "email") {
        el.innerHTML = '<a href="mailto:' + esc(value) + '">' + esc(value) + "</a>";
      } else if (key === "phone") {
        el.innerHTML = '<a href="tel:' + esc(String(value).replace(/[^\d+]/g, "")) + '">' + esc(value) + "</a>";
      } else {
        el.textContent = value;
      }
    });

    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  /* ---------- Home: featured & categories ---------- */

  function initFeatured() {
    var grid = document.querySelector("[data-featured-products]");
    if (!grid) return;
    var featured = PRODUCTS.filter(function (p) { return p.featured; });
    if (!featured.length) featured = PRODUCTS.slice(0, 6);
    featured = featured.slice(0, 6);

    if (!featured.length) {
      grid.innerHTML = '<div class="empty-state"><h3>New pieces are on the bench</h3>' +
        "<p>The first collection is being made in the workshop. In the meantime, get in touch to commission something of your own.</p>" +
        '<a class="button" href="#contact" data-enquiry-type="Custom commission">Start an enquiry</a></div>';
      return;
    }
    grid.innerHTML = featured.map(cardHtml).join("");
    observeReveals(grid);
  }

  function initCategories() {
    var wrap = document.querySelector("[data-categories]");
    if (!wrap) return;
    wrap.innerHTML = CATEGORIES.map(function (c, i) {
      var count = PRODUCTS.filter(function (p) { return p.category === c.id; }).length;
      return '<a class="category reveal reveal-delay-' + (i % 3) + '" href="/shop?category=' + encodeURIComponent(c.id) + '">' +
        picture(c.image, "", [600, 1000, 1400], i === 0 ? "(max-width: 900px) 92vw, 50vw" : "(max-width: 900px) 92vw, 40vw") +
        '<div class="category-body"><div>' +
          '<span class="category-number">0' + (i + 1) + (count ? " — " + count + (count === 1 ? " piece" : " pieces") : "") + "</span>" +
          "<h3>" + esc(c.name) + "</h3>" +
          "<p>" + esc(c.summary) + "</p>" +
        '</div><span class="category-arrow">' + ARROW + "</span></div></a>";
    }).join("");
    observeReveals(wrap);
  }

  /* ---------- Shop page ---------- */

  function initShop() {
    var grid = document.querySelector("[data-shop-grid]");
    var filters = document.querySelector("[data-shop-filters]");
    if (!grid || !filters) return;

    var title = document.querySelector("[data-shop-title]");
    var intro = document.querySelector("[data-shop-intro]");
    var defaultTitle = title ? title.innerHTML : "";
    var defaultIntro = intro ? intro.textContent : "";

    // Categories with no products are left out of the filter bar
    var startCat = new URLSearchParams(location.search).get("category");
    var options = [{ id: "all", name: "All pieces" }].concat(CATEGORIES);
    filters.innerHTML = options.map(function (c) {
      var count = c.id === "all" ? PRODUCTS.length : PRODUCTS.filter(function (p) { return p.category === c.id; }).length;
      if (!count && c.id !== startCat) return "";
      return '<button type="button" class="filter" data-filter="' + esc(c.id) + '" aria-pressed="false">' +
        esc(c.name) + '<span class="count">' + count + "</span></button>";
    }).join("");

    function render(categoryId, push) {
      var cat = categoryById(categoryId);
      if (!cat) categoryId = "all";
      filters.querySelectorAll(".filter").forEach(function (b) {
        b.setAttribute("aria-pressed", b.getAttribute("data-filter") === categoryId ? "true" : "false");
      });

      var list = categoryId === "all" ? PRODUCTS : PRODUCTS.filter(function (p) { return p.category === categoryId; });

      if (title) title.innerHTML = cat ? esc(cat.name) : defaultTitle;
      if (intro) intro.textContent = cat ? cat.summary : defaultIntro;
      document.title = (cat ? cat.name + " | " : "Shop | ") + "Rogers Made";

      if (!list.length) {
        grid.innerHTML = '<div class="empty-state"><h3>New pieces coming soon</h3>' +
          "<p>There's nothing listed in " + esc(cat ? cat.name : "the shop") + " right now, but I can make something for you.</p>" +
          '<a class="button" href="/?type=commission#contact">Request a commission</a></div>';
      } else {
        grid.innerHTML = list.map(cardHtml).join("");
        observeReveals(grid);
      }

      if (push) {
        var url = categoryId === "all" ? "/shop" : "/shop?category=" + encodeURIComponent(categoryId);
        history.pushState({ category: categoryId }, "", url);
      }
    }

    filters.addEventListener("click", function (e) {
      var btn = e.target.closest(".filter");
      if (btn) render(btn.getAttribute("data-filter"), true);
    });

    window.addEventListener("popstate", function () {
      render(new URLSearchParams(location.search).get("category") || "all", false);
    });

    render(new URLSearchParams(location.search).get("category") || "all", false);
  }

  /* ---------- Product gallery & photo viewer ---------- */

  var CHEVRON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>';
  var ZOOM = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>';
  var CLOSE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';

  // Calls back with -1 / 1 when the element is swiped left or right
  function onSwipe(el, callback) {
    var startX = null, startY = null;
    el.addEventListener("touchstart", function (e) {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    }, { passive: true });
    el.addEventListener("touchend", function (e) {
      if (startX === null) return;
      var dx = e.changedTouches[0].clientX - startX;
      var dy = e.changedTouches[0].clientY - startY;
      startX = null;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.3) callback(dx < 0 ? 1 : -1);
    }, { passive: true });
  }

  function initGallery(root, images, photoAlt) {
    var main = root.querySelector("[data-gallery-main]");
    if (!main || !images[0]) return;

    var holder = main.querySelector("[data-gallery-image]");
    var count = main.querySelector("[data-gallery-count]");
    var thumbs = root.querySelectorAll(".gallery-thumbs button");
    var current = 0;
    var swiped = false;

    function show(i) {
      current = (i + images.length) % images.length;
      holder.innerHTML = picture(images[current], photoAlt(current), [800, 1200, 1600], "(max-width: 900px) 92vw, 50vw", true);
      if (count) count.textContent = (current + 1) + " / " + images.length;
      thumbs.forEach(function (b, n) {
        if (n === current) b.setAttribute("aria-current", "true"); else b.removeAttribute("aria-current");
      });
    }

    thumbs.forEach(function (btn) {
      btn.addEventListener("click", function () { show(Number(btn.getAttribute("data-index"))); });
    });
    main.querySelectorAll("[data-gallery-step]").forEach(function (btn) {
      btn.addEventListener("click", function () { show(current + Number(btn.getAttribute("data-gallery-step"))); });
    });
    if (images.length > 1) {
      onSwipe(main, function (dir) {
        swiped = true;
        setTimeout(function () { swiped = false; }, 400);
        show(current + dir);
      });
    }
    main.querySelector("[data-gallery-open]").addEventListener("click", function (e) {
      if (swiped) { swiped = false; e.preventDefault(); return; }
      openViewer(images, current, photoAlt, show);
    });

    // Preload the next photos so switching feels instant
    if (images.length > 1 && useImageCdn) {
      setTimeout(function () {
        images.slice(1).forEach(function (src) { new Image().src = imgUrl(src, 1200); });
      }, 1500);
    }
  }

  function openViewer(images, start, photoAlt, onChange) {
    var multi = images.length > 1;
    var current = start;
    var opener = document.activeElement;

    var box = document.createElement("div");
    box.className = "viewer";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-modal", "true");
    box.setAttribute("aria-label", "Photo viewer");
    box.innerHTML =
      '<div class="viewer-stage" data-viewer-stage></div>' +
      '<button type="button" class="viewer-close" aria-label="Close photo viewer">' + CLOSE + "</button>" +
      (multi
        ? '<button type="button" class="viewer-arrow prev" data-step="-1" aria-label="Previous photo">' + CHEVRON + "</button>" +
          '<button type="button" class="viewer-arrow next" data-step="1" aria-label="Next photo">' + CHEVRON + "</button>" +
          '<div class="viewer-count" aria-live="polite" data-viewer-count></div>'
        : "");

    var stage = box.querySelector("[data-viewer-stage]");
    var countEl = box.querySelector("[data-viewer-count]");

    function show(i) {
      current = (i + images.length) % images.length;
      stage.innerHTML = picture(images[current], photoAlt(current), [1000, 1536], "100vw", true);
      if (countEl) countEl.textContent = (current + 1) + " / " + images.length;
      if (onChange) onChange(current);
    }

    function close() {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("viewer-open");
      box.remove();
      if (opener && opener.focus) opener.focus();
    }

    function onKey(e) {
      if (e.key === "Escape") close();
      else if (multi && e.key === "ArrowRight") show(current + 1);
      else if (multi && e.key === "ArrowLeft") show(current - 1);
      else if (e.key === "Tab") {
        var focusable = box.querySelectorAll("button");
        var first = focusable[0], last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }

    box.querySelector(".viewer-close").addEventListener("click", close);
    box.querySelectorAll("[data-step]").forEach(function (btn) {
      btn.addEventListener("click", function () { show(current + Number(btn.getAttribute("data-step"))); });
    });
    stage.addEventListener("click", function (e) { if (e.target === stage) close(); });
    if (multi) onSwipe(stage, function (dir) { show(current + dir); });
    document.addEventListener("keydown", onKey);

    show(current);
    document.body.appendChild(box);
    document.body.classList.add("viewer-open");
    box.querySelector(".viewer-close").focus();
  }

  /* ---------- Basket (saved in this browser) ---------- */

  var BASKET_KEY = "rogers-made-basket";

  // Each line: { key, id, qty, note }. Lines for the same product
  // with different personalisation are kept separate.
  function readBasket() {
    var lines = [];
    try { lines = JSON.parse(localStorage.getItem(BASKET_KEY)) || []; } catch (e) { lines = []; }
    if (!Array.isArray(lines)) lines = [];
    var used = {};
    return lines.filter(function (l) {
      var p = l && productById(l.id);
      if (!p || isSold(p) || !hasPrice(p)) return false;
      l.id = p.id;
      l.note = String(l.note || "").slice(0, 500);
      var left = stockOf(p) - (used[p.id] || 0);
      l.qty = Math.min(Math.max(1, Math.floor(Number(l.qty)) || 1), left);
      if (l.qty < 1) return false;
      used[p.id] = (used[p.id] || 0) + l.qty;
      if (!l.key) l.key = p.id + "-" + Math.random().toString(36).slice(2, 8);
      return true;
    });
  }

  function saveBasket(lines) {
    try { localStorage.setItem(BASKET_KEY, JSON.stringify(lines)); } catch (e) { /* storage unavailable */ }
    updateBasketCount();
  }

  function qtyInBasket(lines, id, exceptKey) {
    return lines.reduce(function (n, l) { return n + (l.id === id && l.key !== exceptKey ? l.qty : 0); }, 0);
  }

  function addToBasket(p, qty, note) {
    var lines = readBasket();
    note = String(note || "").trim();
    var room = stockOf(p) - qtyInBasket(lines, p.id);
    qty = Math.min(qty, room);
    if (qty < 1) return 0;
    var same = null;
    lines.forEach(function (l) { if (l.id === p.id && l.note === note) same = l; });
    if (same) same.qty += qty;
    else lines.push({ key: p.id + "-" + Date.now().toString(36), id: p.id, qty: qty, note: note });
    saveBasket(lines);
    return qty;
  }

  // Totals. One delivery charge per order: the highest charge
  // of the products in the basket.
  function basketTotals(lines) {
    var items = 0, subtotal = 0, delivery = 0, notes = [];
    lines.forEach(function (l) {
      var p = productById(l.id);
      items += l.qty;
      subtotal += Number(p.price) * l.qty;
      delivery = Math.max(delivery, deliveryOf(p));
      if (p.deliveryNote && notes.indexOf(p.deliveryNote) === -1) notes.push(p.deliveryNote);
    });
    subtotal = Math.round(subtotal * 100) / 100;
    return { items: items, subtotal: subtotal, delivery: delivery, total: Math.round((subtotal + delivery) * 100) / 100, notes: notes };
  }

  function updateBasketCount() {
    var count = basketTotals(readBasket()).items;
    document.querySelectorAll("[data-basket-count]").forEach(function (el) {
      el.textContent = count;
      el.hidden = count === 0;
    });
    document.querySelectorAll("[data-basket-link]").forEach(function (el) {
      el.setAttribute("aria-label", "Basket, " + count + (count === 1 ? " item" : " items"));
    });
  }

  var MINUS = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M6 12h12"/></svg>';
  var PLUS = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M6 12h12M12 6v12"/></svg>';

  function qtyHtml(id, value, max, label, key) {
    var k = key ? ' data-qty-key="' + esc(key) + '"' : "";
    return '<div class="qty">' +
      '<button type="button" data-step="-1"' + k + ' aria-label="Decrease quantity' + (label ? " of " + esc(label) : "") + '"' + (value <= 1 ? " disabled" : "") + ">" + MINUS + "</button>" +
      '<input type="number" inputmode="numeric" id="' + esc(id) + '" name="quantity" min="1" max="' + max + '" value="' + value + '"' + k +
        (label ? ' aria-label="Quantity of ' + esc(label) + '"' : "") + ">" +
      '<button type="button" data-step="1"' + k + ' aria-label="Increase quantity' + (label ? " of " + esc(label) : "") + '"' + (value >= max ? " disabled" : "") + ">" + PLUS + "</button>" +
    "</div>";
  }

  /* ---------- Product page ---------- */

  function initProduct() {
    var root = document.querySelector("[data-product-detail]");
    if (!root) return;

    var id = new URLSearchParams(location.search).get("id");
    var p = productById(id);

    if (!p) {
      root.innerHTML = '<div class="empty-state"><h3>This piece couldn\'t be found</h3>' +
        "<p>It may have been sold or renamed. Have a look through the shop, or get in touch about something similar.</p>" +
        '<a class="button" href="/shop">Browse the shop</a></div>';
      return;
    }

    var cat = categoryById(p.category);
    var images = (p.images && p.images.length) ? p.images : [""];
    var paragraphs = Array.isArray(p.description) ? p.description : [p.description || p.summary];
    var multi = images.length > 1;
    var sold = isSold(p);
    var canBuy = !sold && hasPrice(p);

    function photoAlt(i) {
      return multi ? p.name + " — photo " + (i + 1) + " of " + images.length : p.name;
    }

    document.title = p.name + " | Rogers Made";
    var meta = document.querySelector('meta[name="description"]');
    if (meta && p.summary) meta.setAttribute("content", p.summary);

    var crumb = document.querySelector("[data-breadcrumb]");
    if (crumb) {
      crumb.innerHTML = '<a href="/">Home</a><span>/</span><a href="/shop">Shop</a>' +
        (cat ? '<span>/</span><a href="/shop?category=' + esc(cat.id) + '">' + esc(cat.name) + "</a>" : "");
    }

    var details = (p.details || []).map(function (d) {
      return "<li><span>" + esc(d[0]) + "</span><span>" + esc(d[1]) + "</span></li>";
    }).join("");
    var features = (p.features || []).map(function (f) { return "<li>" + esc(f) + "</li>"; }).join("");

    var buyForm = canBuy
      ? '<form class="buy-form" data-buy-form novalidate>' +
          (p.personalisation
            ? '<div class="field">' +
                '<label for="personalisation">Personalisation</label>' +
                '<p class="field-hint" id="personalisation-hint">' + esc(p.personalisation) + "</p>" +
                '<textarea id="personalisation" name="personalisation" rows="4" maxlength="500" required aria-describedby="personalisation-hint personalisation-error" placeholder="Type your names, wording or instructions here"></textarea>' +
                '<div class="field-error" id="personalisation-error">Please add your personalisation details so I know what to make.</div>' +
              "</div>"
            : "") +
          '<div class="buy-row">' +
            '<div class="field qty-field"><label for="quantity">Quantity</label>' + qtyHtml("quantity", 1, stockOf(p)) + "</div>" +
            '<button class="button buy-button" type="submit">Add to basket</button>' +
          "</div>" +
          '<div class="buy-status" role="status" aria-live="polite" data-buy-status></div>' +
        "</form>"
      : '<div class="detail-actions">' +
          '<a class="button" href="' + enquireUrl(p) + '">Ask about a similar piece</a>' +
          '<a class="button button-outline" href="/shop">Back to shop</a>' +
        "</div>";

    root.innerHTML =
      '<div class="product-detail">' +
        '<div class="gallery">' +
          (sold ? '<span class="product-badge sold detail-sold">Sold out</span>' : "") +
          '<div class="gallery-main" data-gallery-main>' +
            (images[0]
              ? '<button type="button" class="gallery-zoom" data-gallery-open aria-label="View larger photo">' +
                  '<span data-gallery-image>' + picture(images[0], photoAlt(0), [800, 1200, 1600], "(max-width: 900px) 92vw, 50vw", true) + "</span>" +
                  '<span class="gallery-zoom-hint" aria-hidden="true">' + ZOOM + "</span>" +
                "</button>"
              : "") +
            (multi
              ? '<button type="button" class="gallery-arrow prev" data-gallery-step="-1" aria-label="Previous photo">' + CHEVRON + "</button>" +
                '<button type="button" class="gallery-arrow next" data-gallery-step="1" aria-label="Next photo">' + CHEVRON + "</button>" +
                '<span class="gallery-count" aria-live="polite" data-gallery-count>1 / ' + images.length + "</span>"
              : "") +
          "</div>" +
          (multi
            ? '<div class="gallery-thumbs">' + images.map(function (src, i) {
                return '<button type="button" data-index="' + i + '" aria-label="Show photo ' + (i + 1) + " of " + images.length + '"' +
                  (i === 0 ? ' aria-current="true"' : "") + ">" + picture(src, "", [200, 300], "120px") + "</button>";
              }).join("") + "</div>"
            : "") +
        "</div>" +
        '<div class="detail-info">' +
          (cat ? '<div class="eyebrow">' + esc(cat.name) + "</div>" : "") +
          "<h1>" + esc(p.name) + "</h1>" +
          '<div class="detail-pricing">' +
            priceHtml(p, "detail-price") +
            '<div class="detail-price detail-delivery"><small>Delivery</small>' + deliveryText(p) +
              '<span>' + esc(p.deliveryNote || "UK delivery") + "</span></div>" +
          "</div>" +
          stockHtml(p) +
          buyForm +
          '<div class="detail-description">' + paragraphs.map(function (t) { return "<p>" + esc(t) + "</p>"; }).join("") + "</div>" +
          (features ? '<h2 class="detail-subhead">' + esc(p.featuresTitle || "Features") + '</h2><ul class="detail-features">' + features + "</ul>" : "") +
          (details ? '<ul class="detail-list">' + details + "</ul>" : "") +
          '<p class="detail-note">Every piece is made by hand, so grain, colour and small details will vary. One delivery charge per order: if you buy more than one piece, you pay the highest delivery charge in your basket.</p>' +
        "</div>" +
      "</div>";

    initGallery(root, images, photoAlt);
    if (canBuy) initBuyForm(root.querySelector("[data-buy-form]"), p);

    var related = document.querySelector("[data-related]");
    if (related) {
      var others = PRODUCTS.filter(function (o) { return o.id !== p.id && o.category === p.category; });
      if (others.length < 3) {
        others = others.concat(PRODUCTS.filter(function (o) { return o.id !== p.id && o.category !== p.category; }));
      }
      others = others.slice(0, 3);
      if (others.length) {
        related.querySelector("[data-related-grid]").innerHTML = others.map(cardHtml).join("");
        observeReveals(related);
      } else {
        related.hidden = true;
      }
    }
  }

  // Keeps a quantity box between 1 and its max, and the -/+ buttons in step
  function wireQty(wrap, onChange) {
    var input = wrap.querySelector("input");
    var minus = wrap.querySelector('[data-step="-1"]');
    var plus = wrap.querySelector('[data-step="1"]');
    function set(v, fire) {
      var max = Math.max(1, Number(input.max) || 1);
      v = Math.min(max, Math.max(1, Math.floor(Number(v)) || 1));
      input.value = v;
      minus.disabled = v <= 1;
      plus.disabled = v >= max;
      if (fire && onChange) onChange(v);
    }
    minus.addEventListener("click", function () { set(Number(input.value) - 1, true); });
    plus.addEventListener("click", function () { set(Number(input.value) + 1, true); });
    input.addEventListener("change", function () { set(input.value, true); });
    return set;
  }

  function initBuyForm(form, p) {
    var status = form.querySelector("[data-buy-status]");
    var note = form.querySelector('[name="personalisation"]');
    var qtyInput = form.querySelector('[name="quantity"]');
    var button = form.querySelector(".buy-button");
    var setQty = wireQty(form.querySelector(".qty"));

    function refresh() {
      var room = stockOf(p) - qtyInBasket(readBasket(), p.id);
      qtyInput.max = Math.max(1, room);
      setQty(qtyInput.value);
      var full = room < 1;
      button.disabled = full;
      qtyInput.disabled = full;
      return room;
    }

    if (refresh() < 1) {
      status.innerHTML = '<p>All available stock of this piece is already in your basket. <a href="/basket">View basket</a></p>';
    }

    if (note) {
      note.addEventListener("input", function () {
        if (note.value.trim()) note.closest(".field").classList.remove("invalid");
      });
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (note && !note.value.trim()) {
        note.closest(".field").classList.add("invalid");
        note.setAttribute("aria-invalid", "true");
        note.focus();
        return;
      }
      if (note) note.setAttribute("aria-invalid", "false");
      var added = addToBasket(p, Number(qtyInput.value) || 1, note ? note.value : "");
      if (!added) {
        status.innerHTML = "<p>Sorry, there's no more stock of this piece available.</p>";
        refresh();
        return;
      }
      status.innerHTML = '<p class="buy-added"><span class="tick" aria-hidden="true">✓</span>' +
        (added === 1 ? "Added to your basket." : added + " added to your basket.") +
        ' <a href="/basket">View basket &amp; checkout</a></p>';
      if (note) note.value = "";
      qtyInput.value = 1;
      refresh();
    });
  }

  /* ---------- Basket page ---------- */

  function lineHtml(l, lines, editable) {
    var p = productById(l.id);
    var max = stockOf(p) - qtyInBasket(lines, p.id, l.key);
    var image = (p.images && p.images[0]) || "";
    return '<article class="basket-item">' +
      '<a class="basket-thumb" href="' + productUrl(p) + '" tabindex="-1" aria-hidden="true">' +
        (image ? picture(image, "", [200, 400], "120px") : "") + "</a>" +
      '<div class="basket-main">' +
        '<h3><a href="' + productUrl(p) + '">' + esc(p.name) + "</a></h3>" +
        '<div class="basket-unit">' + money(p.price) + (editable ? " each" : " each × " + l.qty) + "</div>" +
        (l.note
          ? '<div class="basket-note"><small>Personalisation</small><p>' + esc(l.note) + "</p></div>"
          : "") +
        (editable ? '<button type="button" class="basket-remove" data-remove="' + esc(l.key) + '" aria-label="Remove ' + esc(p.name) + ' from basket">Remove</button>' : "") +
      "</div>" +
      (editable ? '<div class="basket-qty">' + qtyHtml("qty-" + l.key, l.qty, Math.max(1, max), p.name, l.key) + "</div>" : "") +
      '<div class="basket-line">' + money(Number(p.price) * l.qty) + "</div>" +
    "</article>";
  }

  function summaryRowsHtml(t) {
    return '<dl class="summary-rows">' +
      "<div><dt>Subtotal <span>(" + t.items + (t.items === 1 ? " item" : " items") + ")</span></dt><dd>" + money(t.subtotal) + "</dd></div>" +
      "<div><dt>Delivery</dt><dd>" + (t.delivery === 0 ? "Free" : money(t.delivery)) + "</dd></div>" +
      '<div class="summary-total"><dt>Total</dt><dd>' + money(t.total) + "</dd></div>" +
    "</dl>" +
    (t.notes.length ? t.notes.map(function (n) { return '<p class="summary-note">' + esc(n) + "</p>"; }).join("") : "");
  }

  function emptyBasketHtml() {
    return '<div class="empty-state"><h3>Your basket is empty</h3>' +
      "<p>Have a look through the shop and add something made by hand.</p>" +
      '<a class="button" href="/shop">Browse the shop</a></div>';
  }

  function initBasketPage() {
    var root = document.querySelector("[data-basket]");
    if (!root) return;

    function render(focusSel) {
      var lines = readBasket();
      saveBasket(lines);
      if (!lines.length) { root.innerHTML = emptyBasketHtml(); return; }
      var t = basketTotals(lines);
      root.innerHTML =
        '<div class="basket-layout">' +
          '<div class="basket-items">' +
            '<div class="basket-head" aria-hidden="true"><span>Product</span><span>Quantity</span><span>Total</span></div>' +
            lines.map(function (l) { return lineHtml(l, lines, true); }).join("") +
            '<a class="text-link basket-continue" href="/shop">Continue shopping</a>' +
          "</div>" +
          '<aside class="basket-summary" aria-label="Order summary">' +
            "<h2>Order summary</h2>" +
            summaryRowsHtml(t) +
            '<a class="button summary-button" href="/checkout">Continue to checkout</a>' +
            '<p class="summary-small">One delivery charge per order: the highest delivery charge of the items in your basket.</p>' +
          "</aside>" +
        "</div>";

      root.querySelectorAll(".basket-qty").forEach(function (wrap) {
        var key = wrap.querySelector("input").getAttribute("data-qty-key");
        wireQty(wrap, function (v) {
          var all = readBasket();
          all.forEach(function (l) { if (l.key === key) l.qty = v; });
          saveBasket(all);
          var step = document.activeElement && document.activeElement.getAttribute("data-step");
          render(step
            ? 'button[data-qty-key="' + key + '"][data-step="' + step + '"]'
            : 'input[data-qty-key="' + key + '"]');
        });
      });

      if (focusSel) {
        var el = root.querySelector(focusSel);
        if (el && el.disabled) el = el.parentNode.querySelector("input");
        if (el) el.focus();
      }
    }

    root.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-remove]");
      if (!btn) return;
      var key = btn.getAttribute("data-remove");
      saveBasket(readBasket().filter(function (l) { return l.key !== key; }));
      render();
      var next = root.querySelector(".basket-remove") || root.querySelector(".button");
      if (next) next.focus();
    });

    window.addEventListener("storage", function (e) { if (e.key === BASKET_KEY) render(); });
    render();
  }

  /* ---------- Checkout page ----------
     Payment isn't connected yet. The form sends an order request
     (through Netlify Forms) and clearly tells the customer that
     nothing has been paid. Card payment (Stripe) can be added in
     the payment section later. */

  function initCheckout() {
    var form = document.querySelector("form[data-checkout-form]");
    if (!form) return;

    var layout = document.querySelector("[data-checkout-layout]");
    var summary = document.querySelector("[data-checkout-summary]");
    var empty = document.querySelector("[data-checkout-empty]");
    var success = document.querySelector("[data-order-success]");
    var status = form.querySelector("[data-form-status]");
    var submit = form.querySelector('[type="submit"]');

    function orderText(lines, t) {
      return lines.map(function (l) {
        var p = productById(l.id);
        return l.qty + " x " + p.name + " (" + money(p.price) + " each) = " + money(Number(p.price) * l.qty) +
          (l.note ? "\n   Personalisation: " + l.note.replace(/\s*\n\s*/g, " / ") : "");
      }).join("\n") +
      "\n\nSubtotal: " + money(t.subtotal) +
      "\nDelivery: " + (t.delivery === 0 ? "Free" : money(t.delivery)) +
      (t.notes.length ? " (" + t.notes.join("; ") + ")" : "") +
      "\nTotal payable: " + money(t.total);
    }

    function render() {
      var lines = readBasket();
      if (!lines.length) {
        layout.hidden = true;
        empty.hidden = false;
        empty.innerHTML = emptyBasketHtml();
        return null;
      }
      var t = basketTotals(lines);
      summary.innerHTML =
        '<div class="summary-headline"><h2>Order summary</h2><a class="text-link" href="/basket">Edit basket</a></div>' +
        '<div class="checkout-items">' + lines.map(function (l) { return lineHtml(l, lines, false); }).join("") + "</div>" +
        summaryRowsHtml(t).replace("<dt>Total</dt>", "<dt>Total payable</dt>");
      submit.textContent = "Send order request — " + money(t.total);
      return { lines: lines, totals: t };
    }

    function validateField(field) {
      var wrap = field.closest(".field");
      if (!wrap) return true;
      var ok = field.checkValidity() && (!field.required || field.value.trim() !== "");
      wrap.classList.toggle("invalid", !ok);
      field.setAttribute("aria-invalid", ok ? "false" : "true");
      return ok;
    }

    form.querySelectorAll("input, textarea").forEach(function (field) {
      field.addEventListener("blur", function () { if (field.value) validateField(field); });
      field.addEventListener("input", function () { if (field.closest(".field.invalid")) validateField(field); });
    });

    render();
    window.addEventListener("storage", function (e) { if (e.key === BASKET_KEY) render(); });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      status.className = "form-status";
      status.textContent = "";

      var firstInvalid = null;
      form.querySelectorAll("[required]").forEach(function (f) {
        if (!validateField(f) && !firstInvalid) firstInvalid = f;
      });
      if (firstInvalid) { firstInvalid.focus(); return; }

      var order = render();
      if (!order) return;

      var d = new Date();
      var ref = "RM-" + String(d.getFullYear()).slice(2) + ("0" + (d.getMonth() + 1)).slice(-2) + ("0" + d.getDate()).slice(-2) +
        "-" + Math.floor(1000 + Math.random() * 9000);
      form.querySelector('[name="order"]').value = orderText(order.lines, order.totals);
      form.querySelector('[name="order-reference"]').value = ref;
      form.querySelector('[name="subtotal"]').value = money(order.totals.subtotal);
      form.querySelector('[name="delivery"]').value = order.totals.delivery === 0 ? "Free" : money(order.totals.delivery);
      form.querySelector('[name="total"]').value = money(order.totals.total);

      submit.disabled = true;
      var label = submit.textContent;
      submit.textContent = "Sending…";

      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(new FormData(form)).toString()
      })
        .then(function (res) {
          if (!res.ok) throw new Error("Request failed with status " + res.status);
          var nameField = form.querySelector('[name="name"]');
          success.querySelector("[data-order-ref]").textContent = ref;
          success.querySelector("[data-order-name]").textContent = nameField.value.trim().split(" ")[0];
          success.querySelector("[data-order-email]").textContent = form.querySelector('[name="email"]').value.trim();
          success.querySelector("[data-order-total]").textContent = money(order.totals.total);
          saveBasket([]);
          layout.hidden = true;
          success.hidden = false;
          window.scrollTo({ top: 0, behavior: "smooth" });
          success.focus({ preventScroll: true });
        })
        .catch(function () {
          status.className = "form-status error";
          status.textContent = "Sorry, your order request couldn't be sent just now. Your basket is saved, so please try again in a moment" +
            (SETTINGS.email ? ", or email " + SETTINGS.email + " directly." : ".");
          submit.disabled = false;
          submit.textContent = label;
        });
    });
  }

  /* ---------- Enquiry form ---------- */

  function initEnquiryForm() {
    var form = document.querySelector("form[data-enquiry-form]");
    if (!form) return;

    var typeField = form.querySelector('[name="enquiry-type"]');
    var productField = form.querySelector('[name="product"]');
    var messageField = form.querySelector('[name="message"]');
    var success = document.querySelector("[data-form-success]");
    var status = form.querySelector("[data-form-status]");
    var submit = form.querySelector('[type="submit"]');

    function setType(value) {
      if (!typeField || !value) return;
      for (var i = 0; i < typeField.options.length; i++) {
        if (typeField.options[i].value === value) { typeField.value = value; return; }
      }
    }

    function prefillProduct(id) {
      var p = productById(id);
      if (!p) return;
      if (productField) productField.value = p.name;
      setType(p.category === "signs" ? "Personalised sign" : p.category === "bespoke" ? "Custom commission" : "Order a product");
      if (messageField && !messageField.value) {
        messageField.value = p.enquiryMessage || ("Hi, I'm interested in the " + p.name + ". ");
      }
    }

    function goToForm() {
      var contact = document.getElementById("contact");
      if (contact) contact.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(function () {
        var first = form.querySelector('[name="name"]');
        if (first && !first.value) first.focus({ preventScroll: true });
      }, 600);
    }

    // Prefill from the address bar, e.g. /?enquire=oak-house-number-plaque#contact
    var params = new URLSearchParams(location.search);
    if (params.get("enquire")) prefillProduct(params.get("enquire"));
    if (params.get("type") === "commission") setType("Custom commission");
    if (params.get("type") === "sign") setType("Personalised sign");

    // On the home page, enquiry buttons fill the form without reloading
    document.addEventListener("click", function (e) {
      var link = e.target.closest("[data-enquire], [data-enquiry-type]");
      if (!link) return;
      e.preventDefault();
      if (link.hasAttribute("data-enquire")) prefillProduct(link.getAttribute("data-enquire"));
      if (link.hasAttribute("data-enquiry-type")) setType(link.getAttribute("data-enquiry-type"));
      if (success && success.classList.contains("show")) resetForm();
      goToForm();
    });

    function validateField(field) {
      var wrap = field.closest(".field");
      if (!wrap) return true;
      var ok = field.checkValidity() && (!field.required || field.value.trim() !== "");
      wrap.classList.toggle("invalid", !ok);
      field.setAttribute("aria-invalid", ok ? "false" : "true");
      return ok;
    }

    form.querySelectorAll("input, select, textarea").forEach(function (field) {
      field.addEventListener("blur", function () { if (field.value) validateField(field); });
      field.addEventListener("input", function () {
        if (field.closest(".field.invalid")) validateField(field);
      });
    });

    function resetForm() {
      form.reset();
      form.hidden = false;
      if (success) success.classList.remove("show");
    }

    var again = document.querySelector("[data-form-again]");
    if (again) again.addEventListener("click", function () { resetForm(); goToForm(); });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      status.className = "form-status";
      status.textContent = "";

      var fields = form.querySelectorAll("[required]");
      var firstInvalid = null;
      fields.forEach(function (f) {
        if (!validateField(f) && !firstInvalid) firstInvalid = f;
      });
      if (firstInvalid) { firstInvalid.focus(); return; }

      submit.disabled = true;
      var label = submit.textContent;
      submit.textContent = "Sending…";

      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(new FormData(form)).toString()
      })
        .then(function (res) {
          if (!res.ok) throw new Error("Request failed with status " + res.status);
          form.hidden = true;
          if (success) {
            success.classList.add("show");
            success.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        })
        .catch(function () {
          status.className = "form-status error";
          status.textContent = "Sorry, your message couldn't be sent just now. Please try again in a moment" +
            (SETTINGS.email ? ", or email " + SETTINGS.email + " directly." : ".");
        })
        .then(function () {
          submit.disabled = false;
          submit.textContent = label;
        });
    });
  }

  /* ---------- Start ---------- */

  function start() {
    initNav();
    initContactDetails();
    initFeatured();
    initCategories();
    initShop();
    initProduct();
    initBasketPage();
    initCheckout();
    updateBasketCount();
    initEnquiryForm();
    observeReveals();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
