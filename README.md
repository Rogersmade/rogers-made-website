# Rogers Made website

*Made from wood. Made with purpose.*

A fast, static website for Rogers Made, hosted on Netlify with no build step. Customers browse products and send an enquiry to order. Enquiries arrive through Netlify Forms.

## Pages

| Page | File | What it does |
| --- | --- | --- |
| Home | `index.html` | Hero, collection tiles (photos in `assets/images/collection/`), enquiry form |
| Workshop | `workshop.html` | The four stages of making and the workshop story (photos in `assets/images/workshop/`) |
| My Story | `my-story.html` | The story behind Rogers Made (photos in `assets/images/story/`) |
| Shop | `shop.html` | All products, filterable by category (e.g. `/shop?category=lamps`) |
| Product | `product.html` | One product's page, e.g. `/product?id=oak-house-number-plaque` |
| Thank you | `thank-you.html` | Shown if the form is sent without JavaScript |
| 404 | `404.html` | Page not found |

## Adding or editing products

All products are in **`assets/js/products.js`**. The home page, shop, category counts and product pages update automatically.

1. Upload your photos to `assets/images/products/` (see "Product photos" below).
2. In `products.js`, copy the **TEMPLATE** block at the bottom of the file, paste it into the `ROGERS_PRODUCTS` list and edit it:

```js
{
  id: "oak-table-lamp",                 // unique, lowercase, dashes
  name: "Oak Table Lamp",
  category: "lamps",                    // lamps | signs | oak-gifts | bespoke
  price: null,                          // null = "Price on request", or a number like 95
  priceFrom: false,                     // true shows "From £95"
  summary: "Short text for the card.",
  description: ["First paragraph.", "Second paragraph."],
  images: ["/assets/images/products/oak-table-lamp-1.jpg"],
  details: [["Timber", "Solid oak"], ["Size", "40cm tall"]],
  badge: "One of a kind",               // optional, "" for none
  featured: true,                       // show on the home page (first 6)
  sold: false                           // true shows a SOLD label
},
```

- **Remove a product:** delete its whole block, from `{` to `},`.
- **Set a price:** change `price: null` to a number, e.g. `price: 85`.
- **Mark as sold:** change `sold: false` to `sold: true`. The product stays on the site with a gold SOLD label, and its button becomes "Ask about a similar piece".

Every listed product is a genuine Rogers Made piece with its own photos: the Handmade Oak House Number Plaque, the three Christmas lights and the Personalised Oak Keyring. The earlier placeholder "starter slots" have been removed.

Category names, descriptions and images are at the top of the same file (`ROGERS_CATEGORIES`).

## Product photos

- Put photos in `assets/images/products/`.
- Use simple lowercase file names with dashes and no spaces, e.g. `oak-table-lamp-1.jpg`.
- List them in the product's `images`, starting with `/assets/images/products/`. The first photo is the main one on the card. Extra photos appear as thumbnails on the product page, where customers can step through them with the arrows (or swipe on mobile) and tap the main photo to view it full screen.
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
