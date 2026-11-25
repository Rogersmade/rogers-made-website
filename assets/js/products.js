/* =========================================================
   ROGERS MADE — PRODUCTS
   ---------------------------------------------------------
   This is the ONLY file you need to edit to add, change or
   remove products. The shop, product pages, basket and
   checkout all update automatically.

   TO ADD A PRODUCT
   1. Upload your photos to:  assets/images/products/
   2. Copy the TEMPLATE block at the bottom of this file
      (everything from { to },) and paste it into the
      ROGERS_PRODUCTS list below.
   3. Change the details and save. That's it.

   TO REMOVE A PRODUCT
   Delete its whole block, from { to }, (including the comma).

   PRODUCT FIELDS
   id          Unique short name used in the web address.
               Lowercase letters, numbers and dashes only.
   name        Product name
   category    One of the category ids below, e.g. "lamps"
   price       Price in pounds, e.g. 25 or 12.50
   delivery    UK delivery charge in pounds, e.g. 4.95
               (0 = free). A basket pays ONE delivery charge:
               the highest charge of the items in it.
   deliveryNote  Optional text shown next to the delivery cost,
               e.g. "Collection or local delivery only"
   stock       How many you have. 0 shows "Sold out" and
               the product can't be added to the basket.
   personalisation  Optional. If set, the product page shows
               a box for the customer's names / wording, and
               this text is the hint inside the box.
               Leave it out ("" or delete the line) for no box.
   summary     One sentence used for search engines and sharing
   description Paragraphs for the product page:
               ["First paragraph.", "Second paragraph."]
   features    Optional bullet list: ["Solid oak", "Handmade"]
   images      Up to FIVE photos. The first is the main image.
               To show a photo in full without cropping (e.g. a
               chart), write it as:
               { src: "/assets/images/products/chart.jpg", fit: "contain" }
   details     Optional [label, value] pairs, e.g. ["Size", "20cm"]
   badge       Optional small label on the card, "" for none
   ========================================================= */

window.ROGERS_CATEGORIES = [
  {
    id: "lamps",
    name: "Lamps & Lighting",
    summary: "Handmade oak lamps that bring warmth, colour and natural grain into a room."
  },
  {
    id: "christmas",
    name: "Christmas",
    summary: "Handmade Christmas lamps and personalised oak decorations for the festive season."
  },
  {
    id: "signs",
    name: "Personalised Signs",
    summary: "Names, numbers and words made into solid oak signs for homes, doors and desks."
  },
  {
    id: "oak-gifts",
    name: "Oak Gifts",
    summary: "Keyrings, tealight holders and smaller pieces in solid oak, made to be given and used every day."
  },
  {
    id: "furniture",
    name: "Upcycled Furniture",
    summary: "Vintage furniture, carefully restored and refinished by hand."
  },
  {
    id: "bespoke",
    name: "Bespoke Pieces",
    summary: "One-off pieces designed around your space, your idea and your timber choice."
  }
];

/* ---------------------------------------------------------
   YOUR PRODUCTS
   Taken from the Rogers Made shop on Numonday.
   Delivery charges are starting values — change them to
   suit your postage costs.
   --------------------------------------------------------- */

window.ROGERS_PRODUCTS = [
  {
    id: "christmas-led-lamp",
    name: "Christmas LED Lamp",
    category: "christmas",
    price: 25,
    delivery: 4.95,
    stock: 6,
    personalisation: "Your family name for the front of the lamp, and which design you'd like: Moon & Sleigh, Star Tree or Tree of Life.",
    summary: "Handmade Christmas LED lamps with a solid oak base and laser-cut festive designs, personalised with your family name.",
    description: [
      "Bring a little Christmas magic into your home with these beautifully handcrafted festive LED lamps from Rogers Made.",
      "Each lamp is individually made using a solid oak base, carefully finished to show the natural character and grain of the wood. The decorative Christmas designs are laser-cut from basswood, creating stunning silhouettes that come to life with a warm, cosy LED glow.",
      "From magical Christmas trees and woodland scenes to festive stars and winter landscapes, each design makes a lovely addition to your Christmas decorations. There are currently three designs available: Moon & Sleigh, Star Tree and Tree of Life.",
      "Whether you're decorating your own home or searching for a thoughtful Christmas gift, these unique wooden lamps are a lovely way to bring warmth and character to the festive season. Every piece is made with care in my workshop, combining traditional woodworking with modern laser-cutting techniques."
    ],
    features: [
      "Handmade using solid oak",
      "Intricate laser-cut festive wooden designs",
      "Warm USB LED lighting. Supplied with a USB lead (no plug), which can be plugged into a laptop, power bank or USB plug",
      "Personalised with your family name on the front",
      "Unique natural wood grain, so no two pieces are exactly alike",
      "Perfect for mantelpieces, shelves, bedside tables or Christmas displays"
    ],
    images: [
      "/assets/images/products/christmas-led-lamp-1.jpg",
      "/assets/images/products/christmas-led-lamp-2.jpg",
      "/assets/images/products/christmas-led-lamp-3.jpg",
      "/assets/images/products/christmas-led-lamp-4.jpg",
      "/assets/images/products/christmas-led-lamp-5.jpg"
    ],
    details: [
      ["Base", "Solid oak"],
      ["Design", "Laser-cut basswood"],
      ["Size", "Approx. 20cm high x 14cm wide"],
      ["Power", "USB lead (plug not included)"]
    ],
    badge: "Personalised"
  },
  {
    id: "personalised-christmas-oak-decoration",
    name: "Personalised Christmas Oak Decoration",
    category: "christmas",
    price: 10,
    delivery: 3.50,
    stock: 6,
    personalisation: "The name you'd like on the decoration, and the shape: bauble, cat or paw print.",
    summary: "Layered solid oak and basswood Christmas tree decorations, personalised with your chosen name.",
    description: [
      "Add a personal touch to your Christmas tree with these beautifully handcrafted wooden decorations, individually made by Rogers Made.",
      "Each decoration is made using a combination of solid oak and basswood, creating a lovely layered effect with natural wood grain and contrasting details. Measuring approximately 7cm x 7cm, each decoration is carefully laser cut, assembled and finished by hand.",
      "Whether it's a personalised decoration for a family member, a special gift for a loved one or a little something for your four-legged friend, these decorations make a lovely addition to any Christmas tree.",
      "Each piece is individually handmade, so the natural grain and appearance of the wood will vary slightly, making every decoration unique."
    ],
    features: [
      "Genuine solid oak backing",
      "Layered basswood front detailing",
      "Personalised with your chosen name",
      "Natural wood finish showing the character of the timber",
      "Complete with rustic hanging twine"
    ],
    images: [
      "/assets/images/products/personalised-christmas-oak-decoration-1.jpg",
      "/assets/images/products/personalised-christmas-oak-decoration-2.jpg",
      "/assets/images/products/personalised-christmas-oak-decoration-3.jpg",
      "/assets/images/products/personalised-christmas-oak-decoration-4.jpg",
      "/assets/images/products/personalised-christmas-oak-decoration-5.jpg"
    ],
    details: [
      ["Timber", "Solid oak and basswood"],
      ["Size", "Approx. 7cm x 7cm"],
      ["Hanging", "Rustic twine"]
    ],
    badge: "Personalised"
  },
  {
    id: "personalised-oak-name-sign",
    name: "Personalised Oak Name Sign – Desk, Door or Wall",
    category: "signs",
    price: 24,
    delivery: 4.95,
    stock: 20,
    personalisation: "Name, font choice (1–4), your hobby, interest or profession, display option (desk stand, rope or screw caps) and screw cap colour if needed (brown, white or silver).",
    summary: "A handmade solid oak name sign, personalised with your name, font and a design for your hobby, interest or profession.",
    description: [
      "Add a personal touch to your home, office, bedroom, workshop or workspace with a handmade solid oak personalised name sign, individually made to order by Rogers Made.",
      "Each sign is crafted from quality oak and personalised with your chosen name, your choice of four stylish fonts, and an engraved or printed design representing your hobby, interest or profession, added as a small feature at the end of your name.",
      "Choose how you'd like to display it: a desk sign with oak stand, a wall or door sign with decorative rope, or a wall or door sign fixed with brown, white or silver screw caps for a more permanent finish.",
      "Choose from four Rogers Made signature fonts: 1 Brittany Signature, 2 Cinzel Decorative, 3 Playlist Script or 4 Amsterdam Four. The options chart is in the photos.",
      "A great personalised gift for birthdays, Christmas, new homes, offices, bedrooms, children's rooms, workshops or anyone who deserves something made especially for them."
    ],
    images: [
      "/assets/images/products/personalised-oak-name-sign-1.jpg",
      "/assets/images/products/personalised-oak-name-sign-2.jpg",
      "/assets/images/products/personalised-oak-name-sign-3.jpg",
      "/assets/images/products/personalised-oak-name-sign-4.jpg",
      { src: "/assets/images/products/personalised-oak-name-sign-5.jpg", fit: "contain" }
    ],
    details: [
      ["Timber", "Solid oak"],
      ["Fonts", "1 Brittany Signature, 2 Cinzel Decorative, 3 Playlist Script, 4 Amsterdam Four"],
      ["Display", "Desk stand, rope, or screw caps"],
      ["Made", "To order in my workshop"]
    ],
    badge: "Made to order"
  },
  {
    id: "personalised-oak-house-sign",
    name: "Personalised Oak House Sign",
    category: "signs",
    price: 29,
    delivery: 4.95,
    stock: 5,
    personalisation: "Your house number or name and road name, plus your choice of font, solar light option and screw cap colour from the options chart.",
    summary: "A beautiful solid oak engraved house number or name sign, with any number and road name.",
    description: [
      "A beautiful solid oak engraved house number or name sign. Any number and road name can be added.",
      "See the photos for the options chart: choose your font, whether you'd like a solar LED light, and your screw cap colour, then add your choices in the personalisation box."
    ],
    images: [
      "/assets/images/products/personalised-oak-house-sign-1.jpg",
      "/assets/images/products/personalised-oak-house-sign-2.jpg",
      "/assets/images/products/personalised-oak-house-sign-3.jpg",
      "/assets/images/products/personalised-oak-house-sign-4.jpg",
      { src: "/assets/images/products/personalised-oak-house-sign-5.jpg", fit: "contain" }
    ],
    details: [
      ["Timber", "Solid oak"],
      ["Finish", "Engraved"],
      ["Made", "To order in my workshop"]
    ],
    badge: "Personalised"
  },
  {
    id: "oak-feature-lamp-red",
    name: "Oak Feature Lamp – Red",
    category: "lamps",
    price: 67,
    delivery: 6.95,
    stock: 1,
    summary: "A handmade solid oak and red acrylic LED statement lamp.",
    description: [
      "Bring warmth, character and a striking splash of colour into your home with this unique handmade lamp from Rogers Made.",
      "Carefully crafted from solid oak, this distinctive lamp combines the natural beauty of timber with a vibrant red acrylic panel and warm LED illumination. The sculptural oak design shows off the natural grain and character of the wood, and when lit, the red acrylic creates a glowing feature, casting warm, atmospheric light into the room.",
      "Each lamp is individually handcrafted in my workshop, with careful attention to the natural grain, shape and character of the oak. It looks equally striking switched off or illuminated.",
      "A statement piece for a living room, bedroom, home office or contemporary interior, and a thoughtful gift for someone who appreciates handmade craftsmanship, natural materials and unusual lighting."
    ],
    features: [
      "Handmade from solid oak",
      "Distinctive sculptural design",
      "Vibrant red acrylic light panel",
      "Warm LED illumination",
      "5v USB lead that plugs into a laptop, power bank or USB adapter (adapter not included)"
    ],
    images: [
      "/assets/images/products/oak-feature-lamp-red-1.jpg",
      "/assets/images/products/oak-feature-lamp-red-2.jpg",
      "/assets/images/products/oak-feature-lamp-red-3.jpg",
      "/assets/images/products/oak-feature-lamp-red-4.jpg",
      "/assets/images/products/oak-feature-lamp-red-5.jpg"
    ],
    details: [
      ["Timber", "Solid oak"],
      ["Light", "Red acrylic with LED"],
      ["Power", "5v USB lead (adapter not included)"]
    ],
    badge: "One of a kind"
  },
  {
    id: "oak-feature-lamp-blue",
    name: "Oak Feature Lamp – Blue",
    category: "lamps",
    price: 66,
    delivery: 6.95,
    stock: 1,
    summary: "A handmade solid oak and blue acrylic LED statement lamp, like a winding river of light.",
    description: [
      "Bring a touch of contemporary style and atmospheric lighting into your home with this unique handmade lamp from Rogers Made.",
      "Combining the natural beauty of solid oak with striking blue acrylic, the flowing design creates the impression of a winding river of light running through the oak. When lit, the vibrant blue glow contrasts beautifully with the warm tones and grain of the timber.",
      "Each lamp is individually handcrafted in my workshop using solid oak, chosen for its natural character and distinctive grain. The combination of traditional woodworking and contemporary acrylic lighting makes it a real conversation piece, switched on or off.",
      "Perfect for a living room, bedroom, home office or contemporary interior, and a wonderful gift for someone who appreciates handmade pieces and unusual lighting."
    ],
    features: [
      "Handmade solid oak construction",
      "Unique flowing blue acrylic design",
      "Vibrant blue LED illumination",
      "Contemporary sculptural design",
      "USB lead that plugs into a laptop, power bank or USB adapter (adapter not included)"
    ],
    images: [
      "/assets/images/products/oak-feature-lamp-blue-1.jpg",
      "/assets/images/products/oak-feature-lamp-blue-2.jpg",
      "/assets/images/products/oak-feature-lamp-blue-3.jpg",
      "/assets/images/products/oak-feature-lamp-blue-4.jpg",
      "/assets/images/products/oak-feature-lamp-blue-5.jpg"
    ],
    details: [
      ["Timber", "Solid oak"],
      ["Light", "Blue acrylic with LED"],
      ["Power", "USB lead (adapter not included)"]
    ],
    badge: "One of a kind"
  },
  {
    id: "personalised-oak-keyring",
    name: "Personalised Oak Keyring",
    category: "oak-gifts",
    price: 11,
    delivery: 3.50,
    stock: 7,
    personalisation: "The name to engrave, your hobby or interest, font (1–4), ring colour, and clip or traditional ring.",
    summary: "A handmade solid oak keyring engraved with your name and a design based on your hobby or passion.",
    description: [
      "Make your keyring genuinely personal with a handmade solid oak keyring featuring your name and a custom hobby or passion design.",
      "Instead of simply adding a name, you can choose something that represents you: your favourite hobby, interest, passion or pastime. Your name is engraved into the oak alongside a carefully designed illustration based on your chosen interest. Whether you're into motorbikes, fishing, football, gardening, woodworking, cars, dogs, cycling, DIY or something completely different, I can create a design around what you love.",
      "Each keyring is made from solid oak in my workshop and finished to show the natural character of the timber, so no two are exactly the same. The engraving is permanently marked into the oak for a crisp, tactile finish.",
      "A great personalised gift for birthdays, Father's Day, Mother's Day, Christmas, partners, friends, family and hobby enthusiasts. The full options chart is in the photos."
    ],
    features: [
      "The name you would like engraved",
      "Your favourite hobby, interest or passion",
      "Your chosen font",
      "Your chosen keyring colour",
      "Clip or traditional keyring fitting"
    ],
    featuresTitle: "Simply tell me",
    images: [
      "/assets/images/products/personalised-oak-keyring-1.jpg",
      "/assets/images/products/personalised-oak-keyring-2.jpg",
      "/assets/images/products/personalised-oak-keyring-3.jpg",
      "/assets/images/products/personalised-oak-keyring-4.jpg",
      { src: "/assets/images/products/personalised-oak-keyring-5.jpg", fit: "contain" }
    ],
    details: [
      ["Timber", "Solid oak"],
      ["Finish", "Engraved name and interest design"],
      ["Made", "To order in my workshop"]
    ],
    badge: "Personalised"
  },
  {
    id: "nathan-sideboard",
    name: "Refurbished Nathan Sideboard – Emerald Green",
    category: "furniture",
    price: 406,
    delivery: 0,
    deliveryNote: "Collection, or free local delivery within 15 miles of Swindon",
    stock: 1,
    summary: "An original Nathan sideboard, refurbished in rich emerald green with its warm timber drawer fronts retained.",
    description: [
      "A beautifully refurbished original Nathan sideboard, given a fresh contemporary look while keeping the character and quality of the original piece.",
      "The exterior has been carefully prepared, primed and professionally spray painted in a rich emerald green, creating a smooth, even finish while keeping the original detailing. The original Nathan timber drawer fronts have been retained, so the warm wood grain stays on display in striking contrast to the green.",
      "It has also been fitted with new contemporary feet for a modern, elevated look, and finished with wax protection and a semi-sheen finish.",
      "A unique statement piece for a living room, dining room, hallway or bedroom. Please note: this is a vintage, refurbished piece and may show some minor signs of its previous life, which are part of its character and history."
    ],
    features: [
      "Original Nathan furniture",
      "Carefully prepared, primed and professionally spray painted",
      "Rich emerald green finish",
      "Original timber drawer fronts retained",
      "New contemporary feet",
      "Wax protection with a semi-sheen finish"
    ],
    images: [
      "/assets/images/products/nathan-sideboard-1.jpg",
      "/assets/images/products/nathan-sideboard-2.jpg",
      "/assets/images/products/nathan-sideboard-3.jpg",
      "/assets/images/products/nathan-sideboard-4.jpg",
      "/assets/images/products/nathan-sideboard-5.jpg"
    ],
    details: [
      ["Width", "102 cm"],
      ["Height", "75 cm"],
      ["Depth", "45 cm"],
      ["Delivery", "Collection or local delivery within 15 miles of Swindon only"]
    ],
    badge: "One of a kind"
  },
  {
    id: "oak-tealight-holder-blue-gold",
    name: "Oak Tealight Holder – Blue & Gold",
    category: "oak-gifts",
    price: 14,
    delivery: 3.95,
    stock: 1,
    summary: "A long solid oak tealight holder with a blue and gold finish, protected with hard wax.",
    description: [
      "A long solid oak tealight holder with a blue and gold finish, protected with hard wax oil."
    ],
    images: [
      "/assets/images/products/oak-tealight-holder-blue-gold-1.jpg",
      "/assets/images/products/oak-tealight-holder-blue-gold-2.jpg"
    ],
    details: [
      ["Timber", "Solid oak"],
      ["Finish", "Blue and gold, hard wax"]
    ],
    badge: "One of a kind"
  },
  {
    id: "oak-tealight-holder-leaf",
    name: "Oak Tealight Holder – Leaf Pattern",
    category: "oak-gifts",
    price: 12,
    delivery: 3.95,
    stock: 1,
    summary: "A solid oak tealight holder with leaf patterns and beautiful wood grain.",
    description: [
      "A solid oak tealight holder with leaf patterns and beautiful wood grain, protected with a hard wax finish."
    ],
    images: [
      "/assets/images/products/oak-tealight-holder-leaf-1.jpg",
      "/assets/images/products/oak-tealight-holder-leaf-2.jpg"
    ],
    details: [
      ["Timber", "Solid oak"],
      ["Finish", "Leaf pattern, hard wax"]
    ],
    badge: "One of a kind"
  },
  {
    id: "oak-tealight-holder-gold-orange",
    name: "Oak Tealight Holder – Gold & Orange",
    category: "oak-gifts",
    price: 12,
    delivery: 3.95,
    stock: 1,
    summary: "A solid oak tealight holder with beautiful wood grain and a gold and orange finish.",
    description: [
      "A solid oak tealight holder with beautiful wood grain and a gold and orange finish, protected with hard wax."
    ],
    images: [
      "/assets/images/products/oak-tealight-holder-gold-orange-1.jpg"
    ],
    details: [
      ["Timber", "Solid oak"],
      ["Finish", "Gold and orange, hard wax"]
    ],
    badge: "One of a kind"
  }
];

/* ---------------------------------------------------------
   TEMPLATE — copy this block into the list above
   (paste it before the final ];  and keep the comma after })

  {
    id: "my-new-product",
    name: "My New Product",
    category: "oak-gifts",
    price: 20,
    delivery: 3.95,
    stock: 3,
    personalisation: "",
    summary: "One sentence about the product.",
    description: [
      "First paragraph for the product page.",
      "Second paragraph for the product page."
    ],
    features: [],
    images: [
      "/assets/images/products/my-new-product-1.jpg",
      "/assets/images/products/my-new-product-2.jpg"
    ],
    details: [
      ["Timber", "Solid oak"],
      ["Size", "30cm tall"]
    ],
    badge: ""
  },

   --------------------------------------------------------- */
