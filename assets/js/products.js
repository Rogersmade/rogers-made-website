/* =========================================================
   ROGERS MADE — PRODUCTS
   ---------------------------------------------------------
   This is the ONLY file you need to edit to add, change or
   remove products. The home page, shop page and product
   pages all update automatically.

   TO ADD A PRODUCT
   1. Upload your photos to:  assets/images/products/
   2. Copy one of the product blocks below (from { to },)
   3. Paste it into the list and change the details.

   PRODUCT FIELDS
   id          Unique short name used in the web address.
               Lowercase letters, numbers and dashes only,
               e.g. "oak-table-lamp"
   name        Product name shown on the card
   category    One of: "lamps", "signs", "oak-gifts", "bespoke"
   price       A number, e.g. 85 or 42.50 — shown as £85.00
               Use null to show "Price on request"
   priceFrom   true to show "From £85" (useful for
               personalised or made-to-order sizes)
   summary     One or two sentences for the product card
   description Longer text for the product page. Use an
               array of paragraphs: ["First...", "Second..."]
   images      List of photos. The first is the main image.
               e.g. ["/assets/images/products/lamp-1.jpg"]
   details     Optional list of [label, value] pairs shown on
               the product page, e.g. ["Timber", "Solid oak"]
   badge       Optional small label on the card, e.g.
               "Made to order", "One of a kind", "Sold"
   featured    true to show the product on the home page
   available   false to mark a piece as sold / unavailable
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

window.ROGERS_PRODUCTS = [
  {
    id: "ringed-pendant-light",
    name: "Ringed Hardwood Pendant Light",
    category: "lamps",
    price: null,
    priceFrom: false,
    summary: "Turned hardwood rings around a single warm bulb, made to hang above a table or reading corner.",
    description: [
      "Layered rings of hardwood surround a single bulb, so the grain glows when the light is on.",
      "Each pendant is made to order in the workshop, so final sizes and timber can be discussed when you enquire."
    ],
    images: ["/assets/images/placeholders/lamp-pendant.jpg"],
    details: [
      ["Timber", "Hardwood — to be confirmed"],
      ["Made", "By hand, in the UK"],
      ["Lead time", "Confirmed on enquiry"]
    ],
    badge: "Made to order",
    featured: true,
    available: true
  },
  {
    id: "hardwood-lantern",
    name: "Hardwood Lantern",
    category: "lamps",
    price: null,
    priceFrom: false,
    summary: "A framed hardwood lantern with a soft, diffused glow for shelves, hallways and windowsills.",
    description: [
      "A simple hardwood frame with a diffused panel to soften the light.",
      "Made by hand in the workshop. Get in touch to talk through size and finish."
    ],
    images: ["/assets/images/placeholders/lamp-lantern.jpg"],
    details: [
      ["Timber", "Hardwood — to be confirmed"],
      ["Made", "By hand, in the UK"]
    ],
    badge: "",
    featured: true,
    available: true
  },
  {
    id: "hardwood-bulb-lamp",
    name: "Hardwood Base Bulb Lamp",
    category: "lamps",
    price: null,
    priceFrom: false,
    summary: "An exposed-bulb table lamp on a solid hardwood base. Simple, warm and honest.",
    description: [
      "A solid hardwood base paired with an exposed bulb for a warm, low glow.",
      "Each base is cut and finished by hand, so the grain will be different on every lamp."
    ],
    images: ["/assets/images/placeholders/lamp-bulb.jpg"],
    details: [
      ["Timber", "Hardwood — to be confirmed"],
      ["Made", "By hand, in the UK"]
    ],
    badge: "",
    featured: true,
    available: true
  },
  {
    id: "personalised-engraved-board",
    name: "Personalised Engraved Board",
    category: "signs",
    price: null,
    priceFrom: true,
    summary: "A solid wood board engraved with a name, date or short message of your choice.",
    description: [
      "A solid wood board personalised with the name, date or words you choose.",
      "Tell me what you'd like engraved when you enquire and I'll confirm the layout before making it."
    ],
    images: ["/assets/images/placeholders/sign-engraved.jpg"],
    details: [
      ["Personalisation", "Name, date or message"],
      ["Made", "By hand, in the UK"]
    ],
    badge: "Personalised",
    featured: true,
    available: true
  },
  {
    id: "personalised-house-sign",
    name: "Personalised House Sign",
    category: "signs",
    price: null,
    priceFrom: true,
    summary: "A house name or number sign in solid timber, made to your wording and size.",
    description: [
      "A solid timber sign made with your house name or number.",
      "Share your wording and preferred size and I'll come back to you with options and a price."
    ],
    images: ["/assets/images/placeholders/sign-planks.jpg"],
    details: [
      ["Personalisation", "House name or number"],
      ["Made", "By hand, in the UK"]
    ],
    badge: "Personalised",
    featured: true,
    available: true
  },
  {
    id: "oak-serving-board",
    name: "Oak Serving Board",
    category: "oak-gifts",
    price: null,
    priceFrom: false,
    summary: "A solid oak serving board with a shaped handle, made for the table and the kitchen.",
    description: [
      "Cut from solid oak and shaped by hand, with a handle for carrying to the table.",
      "Can be personalised with initials or a short message. Just ask when you enquire."
    ],
    images: ["/assets/images/placeholders/decor-boards.jpg"],
    details: [
      ["Timber", "Solid oak"],
      ["Made", "By hand, in the UK"]
    ],
    badge: "",
    featured: true,
    available: true
  },
  {
    id: "turned-hardwood-bowl",
    name: "Hardwood Bowl",
    category: "oak-gifts",
    price: null,
    priceFrom: false,
    summary: "A small hardwood bowl for keys, jewellery or dried flowers. A simple, lasting gift.",
    description: [
      "A small bowl shaped from hardwood, finished to bring out the grain.",
      "Every bowl comes from a different piece of timber, so no two are quite the same."
    ],
    images: ["/assets/images/placeholders/gift-bowl.jpg"],
    details: [
      ["Timber", "Hardwood — to be confirmed"],
      ["Made", "By hand, in the UK"]
    ],
    badge: "",
    featured: false,
    available: true
  },
  {
    id: "bespoke-side-table",
    name: "Bespoke Side Table",
    category: "bespoke",
    price: null,
    priceFrom: false,
    summary: "A side table designed around your space, made in the timber and finish you choose.",
    description: [
      "A side table designed to fit your room, from the height and size to the timber and finish.",
      "Start with an enquiry and we'll work through the design together before anything is made."
    ],
    images: ["/assets/images/placeholders/decor-sidetable.jpg"],
    details: [
      ["Design", "Made to your measurements"],
      ["Made", "By hand, in the UK"]
    ],
    badge: "Commission",
    featured: false,
    available: true
  }
];
