# Rogers Made website

*Made from wood. Made with purpose.*

A fast, static website for Rogers Made, hosted on Netlify with no build step. Customers browse the shop, add pieces to a basket and send an order request from the checkout. Enquiries and order requests arrive through Netlify Forms.

## Pages

| Page | File | What it does |
| --- | --- | --- |
| Home | `index.html` | Hero, collection tiles (photos in `assets/images/collection/`), enquiry form |
| Workshop | `workshop.html` | The four stages of making and the workshop story (photos in `assets/images/workshop/`) |
| My Story | `my-story.html` | The story behind Rogers Made (photos in `assets/images/story/`) |
| Shop | `shop.html` | All products, filterable by category (e.g. `/shop?category=lamps`) |
| Product | `product.html` | One product, e.g. `/product?id=personalised-oak-keyring`: photos, price, delivery, stock, personalisation box, quantity and Add to basket |
| Basket | `basket.html` | Items, personalisation, quantities, remove, delivery and total |
| Checkout | `checkout.html` | Customer details, delivery address, order summary and a payment placeholder |
| Thank you | `thank-you.html` | Shown if the enquiry form is sent without JavaScript |
| 404 | `404.html` | Page not found |

## Basket, delivery & checkout

- The basket is saved in the customer's browser, so it's still there if they leave and come back.
- **Delivery:** each product has its own delivery charge. An order pays **one** delivery charge: the highest charge of the items in the basket.
- **Payment isn't connected yet.** The checkout sends an **order request** (Forms → `order-request` in the Netlify dashboard). It includes the items, personalisation, delivery address and total, and is clearly marked **NOT PAID**. The customer is told that no payment has been taken and that you'll be in touch to arrange payment. Stock numbers don't go down automatically, so update `stock` in `products.js` when something sells.
- Card payment (e.g. Stripe) can be added later in the Payment section of `checkout.html` (`#payment-element`) and in `initCheckout` in `assets/js/main.js`.

## Adding or editing products

All products are in **`assets/js/products.js`**. The shop, product pages, basket and checkout update automatically.

1. Upload your photos to `assets/images/products/` (see "Product photos" below).
2. In `products.js`, copy the **TEMPLATE** block at the bottom of the file, paste it into the `ROGERS_PRODUCTS` list and edit it:

```js
{
  id: "oak-table-lamp",                 // unique, lowercase, dashes
  name: "Oak Table Lamp",
  category: "lamps",                    // lamps | christmas | signs | oak-gifts | furniture | bespoke
  price: 65,                            // in pounds
  delivery: 6.95,                       // UK delivery charge, 0 = free
  stock: 1,                             // 0 shows "Sold out"
  personalisation: "",                  // hint text to show a personalisation box, "" for none
  summary: "One sentence about the piece.",
  description: ["First paragraph.", "Second paragraph."],
  features: ["Solid oak", "USB lead"],  // optional bullet list
  images: ["/assets/images/products/oak-table-lamp-1.jpg"],   // up to 5
  details: [["Timber", "Solid oak"], ["Size", "40cm tall"]],
  badge: "One of a kind"                // optional, "" for none
},
```

- **Remove a product:** delete its whole block, from `{` to `},`.
- **Change a price or delivery charge:** edit `price` or `delivery`.
- **Sold out:** set `stock: 0`. The product stays listed with a Sold out label.

The 11 products were copied from the Rogers Made shop on Numonday (names, descriptions, prices, stock and photos). The delivery charges are starting values. Change them to match your postage costs.

Category names and descriptions are at the top of the same file (`ROGERS_CATEGORIES`). Categories with no products are hidden from the shop filters.

## Product photos

- Put photos in `assets/images/products/`.
- Use simple lowercase file names with dashes and no spaces, e.g. `oak-table-lamp-1.jpg`.
- List them in the product's `images`, starting with `/assets/images/products/`. Use up to five photos per product. The first photo is the main one on the card. Extra photos appear as thumbnails on the product page, where customers can step through them with the arrows (or swipe on mobile) and tap the main photo to view it full screen.
- Phone photos are fine. They're resized automatically. Landscape or square photos look best on the cards.

## Contact details & social links

Edit **`assets/js/settings.js`** to add your email, phone and social links (Instagram, Facebook, TikTok, Pinterest, YouTube, Etsy). Anything left blank is hidden automatically.

## Enquiries

The enquiry form uses Netlify Forms. Submissions appear in the Netlify dashboard under Forms. You can turn on email notifications there too.

Buttons can pre-fill the form:
- `/?enquire=PRODUCT-ID#contact` fills in that product
- `/?type=commission#contact` selects "Custom commission"
- `/?type=sign#contact` selects "Personalised sign"

## Images

Product images are resized automatically by Netlify's Image CDN, so large phone photos are fine. Placeholder photography in `assets/images/placeholders/` comes from Pexels and Unsplash (free licences). Swap it for your own workshop photos by replacing the files with the same names, or by updating the paths in `index.html`.
