/* =========================================================
   ROGERS MADE — PRODUCTS
   ---------------------------------------------------------
   This is the ONLY file you need to edit to add, change or
   remove products. The home page, shop page, category
   counts and product pages all update automatically.

   TO ADD A PRODUCT
   1. Upload your photos to:  assets/images/products/
   2. Copy the TEMPLATE block at the bottom of this file
      (everything from { to },) and paste it into the
      ROGERS_PRODUCTS list below.
   3. Change the details and save. That's it.

   TO REMOVE A PRODUCT
   Delete its whole block, from { to }, (including the comma).

   TO MARK A PRODUCT AS SOLD
   Change  sold: false  to  sold: true
   The product stays on the site with a SOLD label, and the
   button changes to "Ask about a similar piece".

   PRODUCT FIELDS
   id          Unique short name used in the web address.
               Lowercase letters, numbers and dashes only,
               e.g. "oak-table-lamp". Every id must be different.
   name        Product name shown on the card and product page
   category    One of: "lamps", "signs", "oak-gifts", "bespoke"
   price       A number, e.g. 85 or 42.50 — shown as £85
               Use null to show "Price on request"
   priceFrom   true to show "From £85" (useful for
               personalised or made-to-order sizes)
   summary     One or two sentences for the product card
   description Longer text for the product page. Use a list
               of paragraphs: ["First...", "Second..."]
   images      List of photos. The first is the main image.
               e.g. ["/assets/images/products/lamp-1.jpg"]
               Use [] if you don't have a photo yet.
   details     Optional list of [label, value] pairs shown on
               the product page, e.g. ["Timber", "Solid oak"]
               Use [] to show none.
   badge       Optional small label on the card, e.g.
               "Made to order", "One of a kind". "" for none.
   featured    true to show the product on the home page
               (the first 6 featured products are shown)
   sold        true to show a SOLD label (product stays listed)
   ========================================================= */

window.ROGERS_CATEGORIES = [
  {
    id: "lamps",
    name: "Lamps & Lighting",
    summary: "Handmade lamps and lighting that bring warmth and natural grain into a room.",
    image: "/assets/images/placeholders/lamp-pendant.jpg"
  },
  {
    id: "signs",
    name: "Personalised Signs",
    summary: "Names, dates and words made into solid wood signs for homes and gifts.",
    image: "/assets/images/placeholders/sign-engraved.jpg"
  },
  {
    id: "oak-gifts",
    name: "Oak Gifts",
    summary: "Smaller pieces in solid oak, made to be given and used every day.",
    image: "/assets/images/placeholders/decor-boards.jpg"
  },
  {
    id: "bespoke",
    name: "Bespoke Pieces",
    summary: "One-off pieces designed around your space, your idea and your timber choice.",
    image: "/assets/images/placeholders/measure.jpg"
  }
];

/* ---------------------------------------------------------
   YOUR PRODUCTS
   The Oak House Number Plaque uses real photos. The other
   entries are starter slots, ready for your real pieces.
   Replace the name, text and photos with your own.
   (Starter slots use temporary stock images from
   assets/images/placeholders/.)
   --------------------------------------------------------- */

window.ROGERS_PRODUCTS = [
  {
    id: "lamp-01",
    name: "Handmade Lamp No. 1",
    category: "lamps",
    price: null,
    priceFrom: false,
    summary: "Photos and full details for this piece are on their way. Enquire to ask about it.",
    description: [
      "Full details for this piece are being added.",
      "Send an enquiry and I'll share photos, sizes, timber and a price with you directly."
    ],
    images: ["/assets/images/placeholders/lamp-pendant.jpg"],
    details: [
      ["Made", "By hand in my UK workshop"]
    ],
    badge: "",
    featured: true,
    sold: false
  },
  {
    id: "lamp-02",
    name: "Handmade Lamp No. 2",
    category: "lamps",
    price: null,
    priceFrom: false,
    summary: "Photos and full details for this piece are on their way. Enquire to ask about it.",
    description: [
      "Full details for this piece are being added.",
      "Send an enquiry and I'll share photos, sizes, timber and a price with you directly."
    ],
    images: ["/assets/images/placeholders/lamp-lantern.jpg"],
    details: [
      ["Made", "By hand in my UK workshop"]
    ],
    badge: "",
    featured: true,
    sold: false
  },
  {
    id: "lamp-03",
    name: "Handmade Lamp No. 3",
    category: "lamps",
    price: null,
    priceFrom: false,
    summary: "Photos and full details for this piece are on their way. Enquire to ask about it.",
    description: [
      "Full details for this piece are being added.",
      "Send an enquiry and I'll share photos, sizes, timber and a price with you directly."
    ],
    images: ["/assets/images/placeholders/lamp-bulb.jpg"],
    details: [
      ["Made", "By hand in my UK workshop"]
    ],
    badge: "",
    featured: true,
    sold: false
  },
  {
    id: "oak-house-number-plaque",
    name: "Handmade Oak House Number Plaque",
    category: "signs",
    price: null,
    priceFrom: false,
    summary: "Handmade in oak, shown here with the number 10, a script street name and decorative scrollwork.",
    description: [
      "A handmade oak house number plaque, shown here displaying the number 10 in a bold serif numeral, with a flowing script street name beneath and decorative scrollwork either side.",
      "Made by hand from oak, so the grain on every plaque is its own.",
      "Send an enquiry to ask about this piece, or tell me the number and wording you'd like, and I'll confirm the design, size and price with you before anything is made."
    ],
    images: [
      "/assets/images/products/oak-house-number-plaque-1.jpg",
      "/assets/images/products/oak-house-number-plaque-2.jpg",
      "/assets/images/products/oak-house-number-plaque-3.jpg",
      "/assets/images/products/oak-house-number-plaque-4.jpg",
      "/assets/images/products/oak-house-number-plaque-5.jpg"
    ],
    details: [
      ["Timber", "Oak"],
      ["Shown", "House number 10"],
      ["Made", "By hand in my UK workshop"]
    ],
    badge: "Handmade",
    featured: true,
    sold: false
  },
  {
    id: "sign-02",
    name: "Personalised Sign No. 2",
    category: "signs",
    price: null,
    priceFrom: false,
    summary: "Photos and full details for this piece are on their way. Enquire with the wording you'd like.",
    description: [
      "Full details for this piece are being added.",
      "Tell me the wording you'd like when you enquire, and I'll confirm the design, size and price with you before anything is made."
    ],
    images: ["/assets/images/placeholders/sign-planks.jpg"],
    details: [
      ["Made", "By hand in my UK workshop"]
    ],
    badge: "Personalised",
    featured: true,
    sold: false
  },
  {
    id: "oak-gift-01",
    name: "Oak Gift No. 1",
    category: "oak-gifts",
    price: null,
    priceFrom: false,
    summary: "Photos and full details for this piece are on their way. Enquire to ask about it.",
    description: [
      "Full details for this piece are being added.",
      "Send an enquiry and I'll share photos, sizes and a price with you directly."
    ],
    images: ["/assets/images/placeholders/decor-boards.jpg"],
    details: [
      ["Made", "By hand in my UK workshop"]
    ],
    badge: "",
    featured: true,
    sold: false
  },
  {
    id: "oak-gift-02",
    name: "Oak Gift No. 2",
    category: "oak-gifts",
    price: null,
    priceFrom: false,
    summary: "Photos and full details for this piece are on their way. Enquire to ask about it.",
    description: [
      "Full details for this piece are being added.",
      "Send an enquiry and I'll share photos, sizes and a price with you directly."
    ],
    images: ["/assets/images/placeholders/gift-bowl.jpg"],
    details: [
      ["Made", "By hand in my UK workshop"]
    ],
    badge: "",
    featured: false,
    sold: false
  },
  {
    id: "bespoke-01",
    name: "Bespoke Piece No. 1",
    category: "bespoke",
    price: null,
    priceFrom: false,
    summary: "Photos and full details for this piece are on their way. Enquire to talk through your own idea.",
    description: [
      "Full details for this piece are being added.",
      "Bespoke pieces start with a conversation. Send an enquiry with your idea and we'll work through the design, timber, size and price together before anything is made."
    ],
    images: ["/assets/images/placeholders/decor-sidetable.jpg"],
    details: [
      ["Made", "By hand in my UK workshop"]
    ],
    badge: "Commission",
    featured: false,
    sold: false
  }
];

/* ---------------------------------------------------------
   TEMPLATE — copy this block into the list above
   (paste it before the final ];  and keep the comma after })

  {
    id: "my-new-product",
    name: "My New Product",
    category: "lamps",
    price: null,
    priceFrom: false,
    summary: "One or two sentences for the product card.",
    description: [
      "First paragraph for the product page.",
      "Second paragraph for the product page."
    ],
    images: [
      "/assets/images/products/my-new-product-1.jpg",
      "/assets/images/products/my-new-product-2.jpg"
    ],
    details: [
      ["Timber", "Solid oak"],
      ["Size", "30cm tall"]
    ],
    badge: "",
    featured: false,
    sold: false
  },

   --------------------------------------------------------- */
