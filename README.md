# Rogers Made website

*Made from wood. Made with purpose.*

A fast, static website for Rogers Made, hosted on Netlify with no build step. Customers browse products and send an enquiry to order. Enquiries arrive through Netlify Forms.

## Pages

| Page | File | What it does |
| --- | --- | --- |
| Home | `index.html` | Hero, featured products, categories, workshop, story, commissions, enquiry form |
| Shop | `shop.html` | All products, filterable by category (e.g. `/shop?category=lamps`) |
| Product | `product.html` | One product's page, e.g. `/product?id=oak-serving-board` |
| Thank you | `thank-you.html` | Shown if the form is sent without JavaScript |
| 404 | `404.html` | Page not found |

## Adding or editing products

All products are in **`assets/js/products.js`**. The home page, shop and product pages update automatically.

1. Upload your photos to `assets/images/products/`.
2. In `products.js`, copy an existing product block, paste it into the list and edit it:

```js
{
  id: "oak-table-lamp",                 // unique, lowercase, dashes
  name: "Oak Table Lamp",
  category: "lamps",                    // lamps | signs | oak-gifts | bespoke
  price: 95,                            // or null for "Price on request"
  priceFrom: false,                     // true shows "From £95"
  summary: "Short text for the card.",
  description: ["First paragraph.", "Second paragraph."],
  images: ["/assets/images/products/oak-lamp-1.jpg"],
  details: [["Timber", "Solid oak"], ["Size", "40cm tall"]],
  badge: "One of a kind",               // optional, "" for none
  featured: true,                       // show on the home page (up to 6)
  available: true                       // false marks it as sold
},
```

The example products and photos currently on the site are **placeholders**. Replace them with your own pieces, photos and prices. Delete any you don't need.

Category names, descriptions and images are at the top of the same file (`ROGERS_CATEGORIES`).

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
