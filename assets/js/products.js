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
               To show a photo in full without cropping (e.g. a
               chart), write it as:
               { src: "/assets/images/products/chart.png", fit: "contain" }
   details     Optional list of [label, value] pairs shown on
               the product page, e.g. ["Timber", "Solid oak"]
               Use [] to show none.
   badge       Optional small label on the card, e.g.
               "Made to order", "One of a kind". "" for none.
   featured    true to show the product on the home page
               (the first 6 featured products are shown)
   sold        true to show a SOLD label (product stays listed)
   enquiryMessage  Optional starting text for the enquiry form
               when someone enquires about this product. Use \n
               for a new line.
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
   Every product below is a genuine Rogers Made piece shown
   with your own photos. Add new pieces using the TEMPLATE
   at the bottom of this file.
   --------------------------------------------------------- */

window.ROGERS_PRODUCTS = [
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
    id: "christmas-tree-of-life-light",
    name: "Christmas Tree of Life Light",
    category: "lamps",
    price: null,
    priceFrom: false,
    summary: "A gold Tree of Life cut-out lit from behind, on a solid wood base reading \"Christmas with the Rogers\".",
    description: [
      "A round Tree of Life cut-out, finished in gold, with a small heart at the centre of the trunk. It stands in a solid wood base and glows warmly from a candle-style light set behind it.",
      "Green lettering reads \"Christmas with the\" across the top of the base, with \"ROGERS\" in bold raised letters on the front.",
      "Send an enquiry to ask about this piece, and I'll confirm the details and price with you directly."
    ],
    images: [
      "/assets/images/products/christmas-tree-of-life-light-1.jpg",
      "/assets/images/products/christmas-lights-collection.jpg",
      "/assets/images/products/christmas-moon-sleigh-light-1.jpg",
      "/assets/images/products/christmas-moon-sleigh-light-2.jpg",
      "/assets/images/products/christmas-star-tree-light-1.jpg",
      "/assets/images/products/christmas-star-tree-light-2.jpg"
    ],
    details: [
      ["Shown", "\"Christmas with the Rogers\""],
      ["Base", "Solid wood"],
      ["Made", "By hand in my UK workshop"]
    ],
    badge: "Christmas",
    featured: true,
    sold: false
  },
  {
    id: "christmas-moon-sleigh-light",
    name: "Christmas Moon & Sleigh Light",
    category: "lamps",
    price: null,
    priceFrom: false,
    summary: "A gold crescent moon scene with Santa's sleigh and reindeer, lit from behind on a solid wood base.",
    description: [
      "A gold crescent moon cut-out with Santa's sleigh and reindeer flying across the top, a hanging lantern, stars, and a snowy winter scene below with a cottage, fir trees and a reindeer.",
      "It stands in a solid wood base with red \"Christmas with the\" lettering, and glows warmly from a candle-style light set behind it. The photos show two lettering styles: a single line, and a two-line script \"Christmas With The\".",
      "Send an enquiry to ask about this piece, and I'll confirm the details and price with you directly."
    ],
    images: [
      "/assets/images/products/christmas-moon-sleigh-light-1.jpg",
      "/assets/images/products/christmas-moon-sleigh-light-2.jpg",
      "/assets/images/products/christmas-lights-collection.jpg"
    ],
    details: [
      ["Shown", "\"Christmas with the\" in red"],
      ["Base", "Solid wood"],
      ["Made", "By hand in my UK workshop"]
    ],
    badge: "Christmas",
    featured: true,
    sold: false
  },
  {
    id: "christmas-star-tree-light",
    name: "Christmas Star Tree Light",
    category: "lamps",
    price: null,
    priceFrom: false,
    summary: "A Christmas tree made of solid and outline stars, lit from behind on a solid wood base.",
    description: [
      "A Christmas tree shape built from stacked wooden stars, solid stars mixed with smaller outline stars, standing in a solid wood base.",
      "Red \"Christmas with the\" lettering sits across the front, and a warm candle-style light glows behind the stars. The photos show two lettering styles: a single line, and a two-line script \"Christmas With The\".",
      "Send an enquiry to ask about this piece, and I'll confirm the details and price with you directly."
    ],
    images: [
      "/assets/images/products/christmas-star-tree-light-1.jpg",
      "/assets/images/products/christmas-star-tree-light-2.jpg",
      "/assets/images/products/christmas-lights-collection.jpg"
    ],
    details: [
      ["Shown", "\"Christmas with the\" in red"],
      ["Base", "Solid wood"],
      ["Made", "By hand in my UK workshop"]
    ],
    badge: "Christmas",
    featured: true,
    sold: false
  },
  {
    id: "personalised-oak-keyring",
    name: "Personalised Oak Keyring",
    category: "oak-gifts",
    price: null,
    priceFrom: false,
    summary: "A handmade oak keyring engraved with your name or wording, in your choice of font, interest logo and ring colour.",
    description: [
      "A solid oak keyring, made by hand and engraved with the name or wording of your choice. The photos show real examples, including \"TOMMY\" with a DIY tools logo and \"SARAH\" with a flower.",
      "Choose your font: 1 Brittany Signature (elegant, handwritten script), 2 Bebas Neue (bold, clean and modern), 3 Cooper Black (chunky, retro and friendly) or 4 Cinzel (classic, traditional and stylish).",
      "Add an optional interest logo, a small engraved logo for your favourite hobby, passion or interest. Choose from Home, Dogs, Cats, Football, Motorbikes, Cars, Fishing, Golf, DIY, Woodworking, Gaming, Music, Photography, Outdoors, Travel, Books, Beer, BBQ, Gardening, Horses, Cycling, Running, Gym, Love/Heart, Cooking, Art, Yoga and Other. Don't see your interest? Just let me know and I can create a custom logo to match your hobby or passion.",
      "Choose your ring: a cable ring in black, green, silver, red or blue, or a clip ring where available.",
      "The full options chart is in the photos. Send an enquiry with your text, font number, logo and ring choice, and I'll confirm the details and price with you before anything is made."
    ],
    images: [
      "/assets/images/products/personalised-oak-keyrings-1.jpg",
      "/assets/images/products/personalised-oak-keyrings-2.jpg",
      "/assets/images/products/personalised-oak-keyrings-3.jpg",
      { src: "/assets/images/products/personalised-oak-keyrings-options-chart.png", fit: "contain" }
    ],
    details: [
      ["Timber", "Oak"],
      ["Text", "Your name or wording"],
      ["Font", "1 Brittany Signature, 2 Bebas Neue, 3 Cooper Black or 4 Cinzel"],
      ["Interest logo", "Optional, from the chart or a custom logo"],
      ["Ring colour", "Black, green, silver, red or blue"],
      ["Attachment", "Standard ring, or clip ring where available"],
      ["Made", "By hand in my UK workshop"]
    ],
    badge: "Personalised",
    featured: true,
    sold: false,
    enquiryMessage: "Hi, I'd like to order a Personalised Oak Keyring.\n\nText / name: \nFont (1 Brittany Signature, 2 Bebas Neue, 3 Cooper Black, 4 Cinzel): \nInterest logo (optional): \nRing colour (black, green, silver, red or blue): \nStandard ring or clip ring: \n"
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
