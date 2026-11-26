import type { Product } from "./types";

const APPAREL_SIZES = ["XS", "S", "M", "L", "XL"];
const OS = ["One Size"];

const p = (x: Product) => x;

export const PRODUCTS: Product[] = [
  p({
    id: "p1", slug: "dawn-patrol-tee", name: "Dawn Patrol Tee", category: "apparel", subcategory: "Tees",
    price: 45, image: "/stock/prod-tee-b.jpg",
    description: "A featherweight merino-blend tee that breathes on the climb and dries before you reach the summit. Cut long, seams placed away from pack straps.",
    details: ["Merino / Tencel blend, 140 gsm", "Flatlock seams, strap-friendly shoulders", "Naturally odour resistant", "Weight: 132 g (M)"],
    sizes: APPAREL_SIZES, colors: ["Bone", "Forest"], isNew: true, stock: 42,
  }),
  p({
    id: "p2", slug: "ridge-shorts", name: "Ridge 5\" Shorts", category: "apparel", subcategory: "Shorts",
    price: 68, compareAtPrice: 82, image: "/stock/prod-shorts-b.jpg",
    description: "Quick-drying trail shorts with a bonded liner, deep drop-in pockets and a laser-cut vent at the back knee.",
    details: ["Recycled ripstop, DWR finish", "Bonded boxer liner", "Two drop-in pockets + zip pocket", "Inseam: 5\""],
    sizes: APPAREL_SIZES, colors: ["Charcoal", "Sand"], stock: 31,
  }),
  p({
    id: "p3", slug: "storm-cell-jacket", name: "Storm Cell Jacket", category: "apparel", subcategory: "Jackets",
    price: 210, image: "/stock/prod-jacket.jpg",
    description: "A 2.5-layer shell that packs into its own chest pocket. Fully taped seams, helmet-compatible hood, storm flap over the zip.",
    details: ["2.5-layer waterproof, 20k/20k", "Fully taped seams", "Packs into chest pocket (214 g)", "Adjustable helmet-compatible hood"],
    sizes: APPAREL_SIZES, colors: ["Forest", "Charcoal"], stock: 18,
  }),
  p({
    id: "p4", slug: "long-haul-tights", name: "Long Haul Tights", category: "apparel", subcategory: "Tights",
    price: 88, image: "/stock/prod-tights.jpg",
    description: "Brushed-feel tights for cold starts. High waist, side stash pockets and reflective piping down the calf.",
    details: ["Thermal recycled knit", "Wide comfort waistband", "Reflective calf piping", "Two side stash pockets"],
    sizes: APPAREL_SIZES, colors: ["Charcoal"], stock: 24,
  }),
  p({
    id: "p5", slug: "first-light-vest", name: "First Light Vest", category: "apparel", subcategory: "Vests & Layers",
    price: 125, image: "/stock/prod-gilet.jpg",
    description: "Wind-blocking gilet with a mesh back. Wear it over the Dawn Patrol Tee and forget about the forecast.",
    details: ["Windfront front panel, mesh back", " Packs into rear pocket", "Two-way front zip", "Weight: 98 g (M)"],
    sizes: APPAREL_SIZES, colors: ["Earth", "Bone"], isNew: true, stock: 21,
  }),
  p({
    id: "p6", slug: "cadence-bra", name: "Cadence Sports Bra", category: "apparel", subcategory: "Sports Bras",
    price: 58, image: "/stock/prod-shorts.jpg",
    description: "Medium-support bra with a racer back that plays nicely with vest straps. Encapsulated padding, no underwire.",
    details: ["Medium support, racer back", "Moisture-wicking knit", "Removable cups", "Flat seams at strap line"],
    sizes: APPAREL_SIZES, colors: ["Sand", "Charcoal"], stock: 35,
  }),
  p({
    id: "p7", slug: "summit-race-vest-12", name: "Summit Race Vest 12L", category: "equipment", subcategory: "Race Vests",
    price: 165, image: "/stock/prod-vest.jpg",
    description: "Our flagship 12-litre race vest. Body-wrapping fit that stops bouncing on descents, with twin 500 ml soft flasks up front.",
    details: ["12 L capacity, 285 g", "Includes 2 × 500 ml soft flasks", "Four stretch rear pockets", "Pole quiver included"],
    sizes: OS, colors: ["Charcoal", "Earth"], stock: 14,
  }),
  p({
    id: "p8", slug: "wander-pack-28", name: "Wander Pack 28L", category: "equipment", subcategory: "Backpacks",
    price: 185, image: "/stock/prod-vest-b.jpg",
    description: "A day-pack for long days out: ventilated back panel, roll-top lid and a hip belt that actually carries weight.",
    details: ["28 L roll-top", "Ventilated frame back panel", "Hydration sleeve, 2 L compatible", "Recycled 210D ripstop"],
    sizes: OS, colors: ["Forest"], stock: 11,
  }),
  p({
    id: "p9", slug: "softflask-500", name: "Soft Flask 500 ml", category: "equipment", subcategory: "Hydration",
    price: 22, image: "/stock/prod-flask.jpg",
    description: "Collapsible 500 ml flask with a high-flow bite valve that seals itself. Fits every vest pocket we make.",
    details: ["500 ml, collapses flat", "Self-sealing bite valve", "BPA / PVC free", "Dishwasher safe"],
    sizes: OS, colors: ["Clear"], stock: 96,
  }),
  p({
    id: "p10", slug: "carbon-poles", name: "Carbon Poles (pair)", category: "equipment", subcategory: "Trekking Poles",
    price: 195, image: "/stock/prod-polepair.jpg",
    description: "215 grams per pole, three folding sections, cork grips. For the climbs that decide your race.",
    details: ["100% carbon shaft", "215 g per pole, folds to 35 cm", "Cork grip, EVA extension", "Trail baskets included"],
    sizes: ["110 cm", "120 cm", "130 cm"], colors: ["Charcoal"], isNew: true, stock: 9,
  }),
  p({
    id: "p11", slug: "trail-fuel-box", name: "Trail Fuel Box (12 pack)", category: "nutrition", subcategory: "Energy Gels",
    price: 38, image: "/stock/cat-nutrition.jpg",
    description: "Twelve gels and bars chosen for long ultras: real food taste, gentle carb mix, nothing you need to chew through a storm.",
    details: ["6 gels + 4 bars + 2 chews", "2:1 glucose–fructose mix", "Vegan, no artificial sweeteners", "440 g box"],
    sizes: OS, colors: ["—"], stock: 58,
    sourcingNote: "Image shown is a neutral category photo from our own library, not the actual product; a licensed product photo is needed before listing live.",
  }),
  p({
    id: "p12", slug: "organizer-cubes", name: "Base Camp Organizer Cubes", category: "equipment", subcategory: "Packing Cubes",
    price: 42, image: "/stock/cat-equipment.jpg",
    description: "A three-piece set of ultralight cubes in sand and forest. Sorted kit is faster kit at 4 a.m.",
    details: ["Set of 3 (S/M/L)", "30D recycled silnylon", "Colour-coded zips", "58 g total"],
    sizes: OS, colors: ["Sand", "Forest"], stock: 27,
  }),
  p({
    id: "p13", slug: "dawn-cap", name: "Dawn Chorus Cap", category: "accessories", subcategory: "Headwear",
    price: 34, image: "/stock/prod-cap-b.jpg",
    description: "A 5-panel running cap in washed cotton twill with a sweat-wicking band and reflective heel loop.",
    details: ["Washed cotton twill", "Moisture-wicking sweatband", "Reflective rear tab", "Adjustable strap, one size"],
    sizes: OS, colors: ["Charcoal", "Sand"], stock: 64,
  }),
  p({
    id: "p14", slug: "horizon-glasses", name: "Horizon Glasses", category: "accessories", subcategory: "Eyewear",
    price: 145, image: "/stock/prod-sunglasses-b.jpg",
    description: "Category-3 lenses with aphotochromic option, 26 grams, and grips that hold at tempo on gravel descents.",
    details: ["Cat-3 polarized lenses", "Photochromic upgrade available", "26 g, TR90 frame", "Anti-fog vented lens"],
    sizes: OS, colors: ["Amber", "Smoke"], isNew: true, stock: 22,
  }),
  p({
    id: "p15", slug: "night-runner-headlamp", name: "Night Runner 800", category: "lighting", subcategory: "Headlamps",
    price: 78, image: "/stock/prod-headlamp.jpg",
    description: "800 lumens, red rear strobe and a battery that reads out its remaining life. Built for the hours before dawn.",
    details: ["800 lm max output", "Rear red strobe", "USB-C, 6 h at mid", "IPX5, 96 g"],
    sizes: OS, colors: ["Charcoal"], stock: 40,
  }),
  p({
    id: "p16", slug: "merino-sock-2p", name: "Merino Trail Socks (2 pack)", category: "accessories", subcategory: "Socks",
    price: 26, image: "/stock/prod-socks2.jpg",
    description: "Cushioned merino socks with a seamless toe and arch band. Two pairs, because one pair is never dry.",
    details: ["62% merino wool blend", "Seamless toe, arch band", "Two pairs per pack", "Mid-cuff height"],
    sizes: ["S", "M", "L"], colors: ["Sand", "Charcoal"], stock: 88,
  }),
  p({
    id: "p17", slug: "summit-gloves", name: "Ridgeline Gloves", category: "accessories", subcategory: "Gloves",
    price: 48, image: "/stock/prod-gloves.jpg",
    description: "Touchscreen-compatible trail gloves with a windproof back and grippy palm for poles and scrambles.",
    details: ["Windproof back panel", "Touchscreen fingertips", "Silicone palm grip", "Machine washable"],
    sizes: ["S", "M", "L"], colors: ["Charcoal"], stock: 30,
  }),
  p({
    id: "p18", slug: "recovery-roller", name: "Downhill Recovery Roller", category: "recovery", subcategory: "Massage & Rollers",
    price: 55, image: "/stock/cat-recovery.jpg",
    description: "A firm, travel-size foam roller that fits sideways in the Wander Pack. Post-race legs will thank you.",
    details: ["33 cm travel size", "Firm EVA, hollow core", "Fits 28 L pack sideways", "445 g"],
    sizes: OS, colors: ["Earth"], stock: 19,
  }),
  p({
    id: "p19", slug: "dawn-patrol-tee-striped", name: "Dawn Patrol Tee — Forest Stripe", category: "apparel", subcategory: "Tees",
    price: 45, compareAtPrice: 55, image: "/stock/prod-tee-b.jpg",
    description: "The Dawn Patrol in a limited forest stripe. Same featherweight merino blend, same pack-friendly cut.",
    details: ["Merino / Tencel blend, 140 gsm", "Flatlock seams", "Limited seasonal colourway", "Weight: 132 g (M)"],
    sizes: APPAREL_SIZES, colors: ["Forest Stripe"], stock: 16,
  }),
  p({
    id: "p20", slug: "ridge-shorts-long", name: "Ridge 7\" Shorts", category: "apparel", subcategory: "Shorts",
    price: 72, image: "/stock/prod-shorts-b.jpg",
    description: "The Ridge in a longer cut for cooler days and busier trails. Same bonded liner, one more zip pocket.",
    details: ["Recycled ripstop, DWR finish", "Bonded boxer liner", "Three pockets, one zipped", "Inseam: 7\""],
    sizes: APPAREL_SIZES, colors: ["Charcoal", "Forest"], stock: 23,
  }),
  p({
    id: "p21", slug: "storm-cell-pants", name: "Storm Cell Pants", category: "apparel", subcategory: "Jackets",
    price: 235, image: "/stock/prod-rainpants3.jpg",
    description: "The Storm Cell shell, full length. Side zips from hip to knee so you can pull them on over shoes.",
    details: ["2.5-layer waterproof, 20k/20k", "Hip-to-knee side zips", "Ankle storm gussets", "Weight: 268 g (M)"],
    sizes: APPAREL_SIZES, colors: ["Charcoal"], isNew: true, stock: 12,
  }),
  p({
    id: "p22", slug: "wander-pack-20", name: "Wander Pack 20L", category: "equipment", subcategory: "Backpacks",
    price: 155, image: "/stock/prod-vest-b.jpg",
    description: "The 28-litre Wander's fast little sibling, for summit mornings and quick overnight escapes.",
    details: ["20 L, 380 g", "Ventilated back panel", "Two mesh side pockets", "Hydration compatible"],
    sizes: OS, colors: ["Sand"], stock: 17,
  }),
  p({
    id: "p23", slug: "race-vest-5", name: "Summit Race Vest 5L", category: "equipment", subcategory: "Race Vests",
    price: 125, image: "/stock/prod-vest.jpg",
    description: "A minimal vest for short, fast efforts. Flask up front, everything else behind.",
    details: ["5 L capacity, 198 g", "Includes 2 × 350 ml flasks", "One rear stretch pocket", "Pole quiver compatible"],
    sizes: OS, colors: ["Earth"], stock: 20,
  }),
  p({
    id: "p24", slug: "horizon-photochromic", name: "Horizon Photochromic", category: "accessories", subcategory: "Eyewear",
    price: 178, image: "/stock/prod-sunglasses.jpg",
    description: "Horizon frames with lenses that lighten as the sun drops. Forest to ridge line, no swaps.",
    details: ["Photochromic Cat-2→3 lens", "26 g, TR90 frame", "Anti-fog vented lens", "Includes hard case"],
    sizes: OS, colors: ["Smoke"], stock: 15,
  }),

  // ---- Third-party products (researched Nov 2026; awaiting owner approval before going live) ----
  p({
    id: "p25", slug: "garmin-forerunner-165", name: "Garmin Forerunner 165", category: "electronics", subcategory: "GPS Watches",
    price: 249, image: "/stock/cat-electronics.jpg",
    description: "Easy-to-use GPS running watch with a bright 1.2\" AMOLED display, race-adaptive training plans and wrist-based running power. Up to 11 days of battery life in smartwatch mode, 19 hours in GPS mode.",
    details: ["1.2\" AMOLED touch display, 390×390", "Multi-band GPS, 25+ sport profiles", "Wrist-based running power and dynamics", "Up to 11 days smartwatch / 19 h GPS"],
    sizes: OS, colors: ["Slate", "Whitestone"], isNew: true, stock: 0,
    sourcingNote: "Third-party brand. Price $249.99 SRP (Garmin press release, Feb 2024). Image shown is a neutral category photo from our own library, not the actual product; needs owner approval for resale and a licensed product photo before listing live.",
  }),
  p({
    id: "p26", slug: "polar-h10-strap", name: "Polar H10 Heart Rate Strap", category: "electronics", subcategory: "Heart Rate",
    price: 89, image: "/stock/cat-electronics.jpg",
    description: "The gold-standard ECG chest strap: maximum-accuracy heart rate over Bluetooth and ANT+, with internal memory for training without a watch. Up to 400 hours on one coin cell.",
    details: ["ECG accuracy, Bluetooth + ANT+", "Internal session memory", "Up to 400 h battery (CR2025)", "Waterproof to 30 m, machine-washable strap"],
    sizes: OS, colors: ["Black"], isNew: true, stock: 0,
    sourcingNote: "Third-party brand. Price $89.21 (Polar US, Nov 2026). Image shown is a neutral category photo from our own library, not the actual product; needs owner approval for resale and a licensed product photo before listing live.",
  }),
  p({
    id: "p27", slug: "petzl-actik-core", name: "Petzl Actik Core Headlamp", category: "lighting", subcategory: "Headlamps",
    price: 88, image: "/stock/prod-headlamp.jpg",
    description: "625-lumen rechargeable headlamp with a mixed wide-plus-focused beam, red night vision and a reflective headband. CORE battery or three AAAs — it detects the source either way.",
    details: ["625 lm max, 88 g", "CORE rechargeable battery (USB-C)", "Hybrid: also runs on 3 × AAA", "IPX4, red strobe, 100 h on low"],
    sizes: OS, colors: ["Charcoal"], isNew: true, stock: 0,
    sourcingNote: "Third-party brand. Price $87.95 (Petzl US, Nov 2026). Image shown is a neutral placeholder from our own photo library, not the actual product; needs owner approval for resale and a licensed product photo before listing live.",
  }),
  p({
    id: "p28", slug: "nathan-hypernight-vest", name: "Nathan Hypernight Reflective Vest Lite", category: "lighting", subcategory: "Safety & Reflective",
    price: 35, image: "/stock/prod-gilet.jpg",
    description: "Featherlight reflective vest with a V-shaped front reflection that lights up under headlights. Body-hugging elastic, full arm swing, one-size fit.",
    details: ["360° reflectivity, EN 1150 compliant", "Body-hugging elastic design", "Adjustable shoulder straps", "One size fits most, 68 g"],
    sizes: OS, colors: ["Safety Yellow"], isNew: true, stock: 0,
    sourcingNote: "Third-party brand. Price $34.95 (Running Warehouse, Nov 2026). Image shown is a neutral placeholder from our own photo library, not the actual product; needs owner approval for resale and a licensed product photo before listing live.",
  }),
  p({
    id: "p29", slug: "gu-energy-gel-8", name: "GU Original Energy Gel (box of 8)", category: "nutrition", subcategory: "Energy Gels",
    price: 13, image: "/stock/cat-nutrition.jpg",
    description: "The classic pocket gel: quick, sustained carbs in a packet that disappears into any vest pocket. Gluten-free, dairy-free, vegan; caffeinated and caffeine-free flavours.",
    details: ["Box of 8 single-serve gels", "Vegan, gluten-free, dairy-free", "Caffeine-free and caffeinated options", "Fits race vest gel pockets"],
    sizes: OS, colors: ["Assorted"], isNew: true, stock: 0,
    sourcingNote: "Third-party brand. Price $12.80 (GU Energy, Nov 2026). Image shown is a neutral category photo from our own library, not the actual product; needs owner approval for resale and a licensed product photo before listing live.",
  }),
  p({
    id: "p30", slug: "nuun-sport-tube", name: "Nuun Sport Electrolytes (10 tablets)", category: "nutrition", subcategory: "Hydration & Electrolytes",
    price: 8, image: "/stock/cat-nutrition.jpg",
    description: "Drop, dissolve, drink: five key electrolytes with 1 g of sugar per 16 oz serve. For before, during and after long days out.",
    details: ["10 tablets per tube", "300 mg sodium + 150 mg potassium per serve", "1 g sugar, 15 calories", "Vegan, gluten-free, Informed-Sport certified"],
    sizes: OS, colors: ["Assorted"], isNew: true, stock: 0,
    sourcingNote: "Third-party brand. Price $7.50/tube (REI Co-op listing, Nov 2026). Image shown is a neutral category photo from our own library, not the actual product; needs owner approval for resale and a licensed product photo before listing live.",
  }),
  p({
    id: "p31", slug: "triggerpoint-mb1", name: "TriggerPoint MB1 Massage Ball", category: "recovery", subcategory: "Massage & Rollers",
    price: 20, image: "/stock/cat-recovery.jpg",
    description: "A 2.6-inch layered-density foam ball that grips tissue and hits the spots a roller can't — piriformis, calves, feet. Travels anywhere.",
    details: ["2.6\" diameter, 1.2 oz", "Layered EVA foam densities", "Slip-resistant on any surface", "1-year warranty"],
    sizes: OS, colors: ["Green/Black"], isNew: true, stock: 0,
    sourcingNote: "Third-party brand. Price $19.99 MSRP (TriggerPoint US, Nov 2026). Image shown is a neutral category photo from our own library, not the actual product; needs owner approval for resale and a licensed product photo before listing live.",
  }),
];

export const productBySlug = (slug: string) => PRODUCTS.find((x) => x.slug === slug);
export const productById = (id: string) => PRODUCTS.find((x) => x.id === id);
export const newArrivals = () => PRODUCTS.filter((x) => x.isNew);

export const discountCodes: Record<string, number> = { DAWN10: 0.1, FIRSTRUN: 0.15 };

export const SHIPPING_METHODS = {
  standard: { label: "Standard", price: 6 },
  express: { label: "Express", price: 14 },
} as const;
