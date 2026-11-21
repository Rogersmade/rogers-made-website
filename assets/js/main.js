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
    for (var i = 0; i < PRODUCTS.length; i++) if (PRODUCTS[i].id === id) return PRODUCTS[i];
    return null;
  }

  function formatMoney(value) {
    var n = Number(value);
    var fixed = n % 1 === 0 ? n.toFixed(0) : n.toFixed(2);
    return (SETTINGS.currency || "£") + fixed;
  }

  function priceHtml(p, cls) {
    if (p.available === false) {
      return '<div class="' + cls + ' on-request"><small>Availability</small>Sold — enquire for similar</div>';
    }
    if (p.price === null || p.price === undefined || p.price === "") {
      return '<div class="' + cls + ' on-request"><small>Price</small>Price on request</div>';
    }
    return '<div class="' + cls + '"><small>' + (p.priceFrom ? "From" : "Price") + "</small>" +
      formatMoney(p.price) + "</div>";
  }

  function productUrl(p) { return "/product?id=" + encodeURIComponent(p.id); }
  function enquireUrl(p) { return "/?enquire=" + encodeURIComponent(p.id) + "#contact"; }

  function cardHtml(p, index) {
    var cat = categoryById(p.category);
    var image = (p.images && p.images[0]) || "";
    var badge = p.available === false ? "Sold" : p.badge;
    var delay = " reveal-delay-" + (index % 3);
    return '' +
      '<article class="product reveal' + delay + '">' +
        '<a class="product-image" href="' + productUrl(p) + '" aria-label="View ' + esc(p.name) + '">' +
          (badge ? '<span class="product-badge">' + esc(badge) + "</span>" : "") +
          (image
            ? picture(image, p.name, [480, 720, 960], "(max-width: 800px) 92vw, (max-width: 1100px) 45vw, 30vw")
            : "PHOTO COMING SOON") +
        "</a>" +
        '<div class="product-info">' +
          (cat ? '<div class="product-category">' + esc(cat.name) + "</div>" : "") +
          '<h3><a href="' + productUrl(p) + '">' + esc(p.name) + "</a></h3>" +
          "<p>" + esc(p.summary) + "</p>" +
          '<div class="product-meta">' +
            priceHtml(p, "product-price") +
            '<div class="product-actions">' +
              '<a class="button button-outline button-small" href="' + productUrl(p) + '">View</a>' +
              '<a class="button button-small" href="' + enquireUrl(p) + '" data-enquire="' + esc(p.id) + '">Enquire</a>' +
            "</div>" +
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

    var options = [{ id: "all", name: "All pieces" }].concat(CATEGORIES);
    filters.innerHTML = options.map(function (c) {
      var count = c.id === "all" ? PRODUCTS.length : PRODUCTS.filter(function (p) { return p.category === c.id; }).length;
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

    root.innerHTML =
      '<div class="product-detail">' +
        '<div class="gallery">' +
          '<div class="gallery-main" data-gallery-main>' +
            (images[0] ? picture(images[0], p.name, [800, 1200, 1600], "(max-width: 900px) 92vw, 50vw", true) : "") +
          "</div>" +
          (images.length > 1
            ? '<div class="gallery-thumbs">' + images.map(function (src, i) {
                return '<button type="button" data-src="' + esc(src) + '" aria-label="Show photo ' + (i + 1) + '"' +
                  (i === 0 ? ' aria-current="true"' : "") + ">" + picture(src, "", [200, 300], "120px") + "</button>";
              }).join("") + "</div>"
            : "") +
        "</div>" +
        '<div class="detail-info">' +
          (cat ? '<div class="eyebrow">' + esc(cat.name) + "</div>" : "") +
          "<h1>" + esc(p.name) + "</h1>" +
          priceHtml(p, "detail-price") +
          '<div class="detail-description">' + paragraphs.map(function (t) { return "<p>" + esc(t) + "</p>"; }).join("") + "</div>" +
          (details ? '<ul class="detail-list">' + details + "</ul>" : "") +
          '<div class="detail-actions">' +
            '<a class="button" href="' + enquireUrl(p) + '">' + (p.available === false ? "Ask about a similar piece" : "Enquire about this piece") + "</a>" +
            '<a class="button button-outline" href="/shop' + (cat ? "?category=" + esc(cat.id) : "") + '">Back to shop</a>' +
          "</div>" +
          '<p class="detail-note">Every piece is made by hand, so grain, colour and small details will vary. Send an enquiry and I\'ll confirm price, timings and delivery or collection with you directly.</p>' +
        "</div>" +
      "</div>";

    var main = root.querySelector("[data-gallery-main]");
    root.querySelectorAll(".gallery-thumbs button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        main.innerHTML = picture(btn.getAttribute("data-src"), p.name, [800, 1200, 1600], "(max-width: 900px) 92vw, 50vw", true);
        root.querySelectorAll(".gallery-thumbs button").forEach(function (b) { b.removeAttribute("aria-current"); });
        btn.setAttribute("aria-current", "true");
      });
    });

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
        messageField.value = "Hi, I'm interested in the " + p.name + ". ";
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

    // Prefill from the address bar, e.g. /?enquire=oak-serving-board#contact
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
    initEnquiryForm();
    observeReveals();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
