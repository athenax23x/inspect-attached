#!/usr/bin/env python3
"""Susun katalog produk Dirt & Dawn dari foto produk asli yang tersedia.

Nama dan deskripsi setiap produk mengikuti barang yang benar-benar tampak pada
fotonya (foto diambil dari Burst, lihat product-images/PHOTO-CREDITS.md), jadi
tidak ada produk yang fotonya tidak sesuai.

Pakai: build-product-catalog.py
"""

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "wordpress-import" / "products-catalog.json"
PHOTOS = ROOT / "wordpress-import" / "product-images" / "photos"


def p(sku, name, price, photo, categories, short, specs, sale=None, tags=None, stock=25):
    return {
        "sku": sku,
        "name": name,
        "regular_price": f"{price:.2f}",
        "sale_price": f"{sale:.2f}" if sale else "",
        "image": photo,
        "categories": categories,
        "short_description": short,
        "description": short + "\n\n" + "\n".join(f"• {s}" for s in specs),
        "tags": tags or [],
        "stock": stock,
    }


APPAREL = ["Apparel"]
EQUIPMENT = ["Equipment"]
ACCESSORIES = ["Accessories"]
ELECTRONICS = ["Electronics"]
RECOVERY = ["Recovery"]
FOOTWEAR = ["Footwear"]

PRODUCTS = [
    # --- Apparel -----------------------------------------------------------
    p("TEE-CHARCOAL", "Dawn Patrol Tee", 45, "tee-charcoal", APPAREL + ["Tees"],
      "A featherweight merino-blend tee in charcoal that breathes on the climb and dries fast.",
      ["Merino / Tencel blend, 140 gsm", "Flatlock seams, strap-friendly shoulders",
       "Naturally odour resistant", "Weight: 132 g (size M)", "Machine wash cold, hang dry"],
      tags=["New"], stock=42),
    p("TEE-FOREST", "Dawn Patrol Tee — Forest", 45, "tee-forest", APPAREL + ["Tees"],
      "The Dawn Patrol Tee in forest green, same featherweight merino blend.",
      ["Merino / Tencel blend, 140 gsm", "Flatlock seams, strap-friendly shoulders",
       "Naturally odour resistant", "Weight: 132 g (size M)"],
      stock=38),
    p("TEE-RED", "Cadence Run Tee", 39, "tee-red", APPAREL + ["Tees"],
      "A lightweight running tee in clay red with a soft handfeel and a relaxed shoulder.",
      ["Recycled polyester, 120 gsm", "Relaxed shoulder, straight hem",
       "Moisture wicking", "Weight: 118 g (size M)"],
      stock=34),
    p("TEE-NAVY", "Base Layer Tee — Navy", 35, "tee-navy", APPAREL + ["Tees"],
      "A plain navy base layer tee for hot days and layering under a shell.",
      ["Cotton-modal blend, 150 gsm", "Crew neck, straight hem",
       "Soft against the skin", "Weight: 140 g (size M)"],
      stock=36),
    p("SHORTS-TEAL", "Ridge Shorts", 68, "shorts-teal", APPAREL + ["Shorts"],
      "Quick-drying trail shorts in teal with a drawcord waist and a bonded liner.",
      ["Recycled ripstop shell, DWR finish", "Bonded inner brief",
       "Drawcord waist, zip rear pocket", "Inseam: 5 in / 12.7 cm", "Weight: 118 g (size M)"],
      sale=56, stock=31),
    p("SHORTS-PATTERN", "Trail Shorts — Leaf Print", 62, "shorts-pattern", APPAREL + ["Shorts"],
      "The Ridge short in a leaf print, for days when plain black is not the point.",
      ["Recycled ripstop shell, DWR finish", "Bonded inner brief",
       "Two drop-in pockets", "Inseam: 5 in / 12.7 cm", "Weight: 120 g (size M)"],
      tags=["New"], stock=24),
    p("BRA-WHITE", "Cadence Sports Bra", 58, "bra-white", APPAREL + ["Sports Bras"],
      "Medium-support sports bra in white, with a wide underband and no hardware.",
      ["Recycled nylon / elastane", "Medium support, no hardware",
       "Wide underband, bonded edges", "Removable pads", "Weight: 92 g (size M)"],
      stock=28),
    p("BRA-BLACK", "Trail Support Bra", 64, "bra-black", APPAREL + ["Sports Bras"],
      "A black high-support bra with a strappy back and adjustable straps.",
      ["Recycled nylon / elastane", "High support",
       "Strappy back, adjustable straps", "Bonded edges, no hardware", "Weight: 104 g (size M)"],
      stock=22),
    p("TIGHTS", "Long Haul Tights", 88, "tights", APPAREL + ["Tights"],
      "Compression tights with a drawcord waist and two thigh pockets.",
      ["Nylon / elastane, 240 gsm", "Graduated compression",
       "Flat drawcord waist", "Two thigh pockets, one zipped", "Weight: 196 g (size M)"],
      stock=26),
    p("TIGHTS-WARM", "Storm Cell Tights", 96, "tights-warm", APPAREL + ["Tights"],
      "Water-repellent winter tights with a brushed inner face.",
      ["Brushed-back nylon / elastane", "DWR finish",
       "Flat drawcord waist", "Reflective print at the ankle", "Weight: 224 g (size M)"],
      stock=20),

    # --- Equipment ---------------------------------------------------------
    p("PACK-28", "Wander Pack 28L", 185, "backpack-28", EQUIPMENT + ["Backpacks"],
      "A 28-litre pack for long day routes and fast overnighters.",
      ["28 L total volume", "Ventilated back panel",
       "Dual side compression", "Hydration sleeve, 3 L", "Weight: 780 g"],
      stock=14),
    p("PACK-20", "Wander Pack 20L", 155, "backpack-20", EQUIPMENT + ["Backpacks"],
      "A 20-litre version of the Wander Pack for shorter days.",
      ["20 L total volume", "Ventilated back panel",
       "Dual side compression", "Hydration sleeve, 2 L", "Weight: 640 g"],
      stock=18),
    p("PACK-DAY", "Day Pack 12L", 115, "backpack-day", EQUIPMENT + ["Backpacks"],
      "A compact 12-litre day pack with a front organiser panel.",
      ["12 L total volume", "Front organiser panel",
       "Padded laptop sleeve", "Weight: 520 g"],
      tags=["New"], stock=20),
    p("BOTTLE-500", "Soft Flask 500 ml", 22, "bottle-500", EQUIPMENT + ["Hydration"],
      "A 500 ml bottle that collapses as you drink, so it stops sloshing.",
      ["500 ml capacity", "Collapses as it empties",
       "Wide bite valve", "BPA-free TPU", "Weight: 46 g"],
      stock=60),
    p("BOTTLE-250", "Soft Flask 250 ml", 18, "bottle-250", EQUIPMENT + ["Hydration"],
      "The 250 ml flask for short races and top-ups.",
      ["250 ml capacity", "Collapses as it empties",
       "Wide bite valve", "BPA-free TPU", "Weight: 32 g"],
      stock=48),
    p("BOTTLE-STEEL", "Insulated Steel Flask 600 ml", 34, "bottle-steel", EQUIPMENT + ["Hydration"],
      "A double-walled steel flask that keeps water cold all day.",
      ["600 ml capacity", "Double-walled, vacuum insulated",
       "Keeps cold 24 h, hot 12 h", "Leak-proof screw cap", "Weight: 320 g"],
      stock=32),
    p("MAT", "Training Mat", 45, "mat", EQUIPMENT + ["Mats"],
      "A rolled training mat for warm-ups, stretching and post-run work.",
      ["183 x 61 cm", "6 mm closed-cell foam",
       "Non-slip textured surface", "Carry strap included", "Weight: 900 g"],
      stock=26),

    # --- Recovery ----------------------------------------------------------
    p("ROLLER-BLUE", "Recovery Roller", 55, "roller-blue", RECOVERY + ["Massage & Rollers"],
      "A hollow-core foam roller for post-run legs.",
      ["Length: 33 cm", "Hollow EVA core, firm density",
       "Textured surface", "Weight: 420 g"],
      stock=28),
    p("ROLLER-BLACK", "Grid Roller", 62, "roller-black", RECOVERY + ["Massage & Rollers"],
      "A grid-pattern roller that works deeper into the quads and calves.",
      ["Length: 33 cm", "Grid surface for deeper pressure",
       "Hollow core", "Weight: 440 g"],
      stock=24),
    p("ROLLER-TEAL", "Deep Tissue Roller", 58, "roller-teal", RECOVERY + ["Massage & Rollers"],
      "A denser roller for heavy legs and long descents.",
      ["Length: 30 cm", "High-density foam",
       "Dense nub surface", "Weight: 380 g"],
      tags=["New"], stock=20),

    # --- Accessories -------------------------------------------------------
    p("SOCKS-WHITE", "Merino Trail Socks", 26, "socks-white", ACCESSORIES + ["Socks"],
      "Cushioned merino trail socks in white, sold as a pair.",
      ["Merino blend, 200-needle", "Cushioned heel and toe",
       "Seamless toe", "Sold as one pair", "Weight: 68 g per pair"],
      stock=55),
    p("SOCKS-PATTERN", "Patterned Crew Socks", 22, "socks-pattern", ACCESSORIES + ["Socks"],
      "Crew socks in a woven pattern, with a dense cushion underfoot.",
      ["Cotton / nylon blend", "Dense underfoot cushion",
       "Seamless toe", "Sold as one pair", "Weight: 78 g per pair"],
      stock=44),
    p("SOCKS-STRIPE", "Striped Crew Socks", 22, "socks-stripe", ACCESSORIES + ["Socks"],
      "Crew socks with a fine stripe, cushioned underfoot for long days.",
      ["Merino blend, 200-needle", "Extra heel and toe cushion",
       "Seamless toe", "Sold as one pair", "Weight: 74 g per pair"],
      tags=["New"], stock=40),
    p("CAP", "Dawn Chorus Cap", 34, "cap", ACCESSORIES + ["Headwear"],
      "A soft, packable cap with a foldable brim.",
      ["Recycled polyester, 100 gsm", "Foldable soft brim",
       "Moisture-wicking sweatband", "Adjustable rear strap", "Weight: 62 g"],
      stock=40),
    p("GLASSES-AVIATOR", "Horizon Glasses", 145, "glasses-aviator", ACCESSORIES + ["Eyewear"],
      "Lightweight sunglasses with a dark lens and grippy temples.",
      ["Smoke lens, cat. 3", "UV400 protection",
       "Hydrophilic nose and temples", "Weight: 26 g"],
      stock=24),
    p("GLASSES-WHITE", "Horizon Photochromic", 178, "glasses-white", ACCESSORIES + ["Eyewear"],
      "Horizon Glasses in a light frame with a photochromic lens for dawn-to-dusk runs.",
      ["Photochromic lens, cat. 1-3", "UV400 protection",
       "Hydrophilic nose and temples", "Weight: 28 g"],
      stock=18),
    p("GLASSES-TORTOISE", "Horizon Tortoise", 152, "glasses-tortoise", ACCESSORIES + ["Eyewear"],
      "The Horizon frame in tortoise shell, with the same smoke lens.",
      ["Smoke lens, cat. 3", "UV400 protection",
       "Tortoise frame", "Weight: 27 g"],
      tags=["New"], stock=20),

    # --- Electronics -------------------------------------------------------
    p("WATCH", "Dawn Field Watch", 219, "watch", ELECTRONICS + ["Watches"],
      "A field watch with a leather band and a readable dial, for days off the clock.",
      ["Stainless case, 38 mm", "Leather band, quick-release",
       "Water resistant to 5 ATM", "Japanese quartz movement", "Weight: 58 g"],
      stock=14),
    p("TRACKER", "Cadence Fitness Tracker", 89, "tracker", ELECTRONICS + ["Fitness Trackers"],
      "A slim band tracker for daily steps, sleep and heart rate.",
      ["Slim band, adjustable strap", "Heart rate and sleep tracking",
       "Up to 10 days battery", "Water resistant to 5 ATM", "Weight: 24 g"],
      tags=["New"], stock=22),

    # --- Footwear ----------------------------------------------------------
    p("SHOE-TRAIL", "Summit Trail Shoe", 165, "shoe-trail", FOOTWEAR + ["Trail Shoes"],
      "A trail shoe with an aggressive lug pattern for loose ground.",
      ["4 mm lugs, sticky rubber", "Rock plate underfoot",
       "Reinforced toe cap", "Weight: 298 g (size 42)"],
      stock=18),
    p("SHOE-ROAD", "Cadence Road Shoe", 145, "shoe-road", FOOTWEAR + ["Road Shoes"],
      "A light road shoe for daily miles on tarmac.",
      ["Compression-moulded midsole", "Breathable knit upper",
       "Weight: 245 g (size 42)"],
      tags=["New"], stock=20),
]


def main() -> int:
    skus = [x["sku"] for x in PRODUCTS]
    assert len(skus) == len(set(skus)), "SKU duplikat"
    photos = [x["image"] for x in PRODUCTS]
    assert len(photos) == len(set(photos)), "Foto dipakai lebih dari sekali"

    missing = [x["image"] for x in PRODUCTS if not (PHOTOS / f"{x['image']}.jpg").is_file()]
    if missing:
        print(f"PERINGATAN: foto belum ada: {missing}")

    OUT.write_text(json.dumps(PRODUCTS, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"{len(PRODUCTS)} produk, {len(set(photos))} foto -> {OUT}")

    counts = {}
    for item in PRODUCTS:
        for cat in item["categories"]:
            counts[cat] = counts.get(cat, 0) + 1
    print("\nProduk per kategori:")
    for cat in sorted(counts):
        flag = "  <-- tipis" if counts[cat] < 2 else ""
        print(f"  {cat:22} {counts[cat]}{flag}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
