# Import the Dirt & Dawn store into WordPress — full steps

Everything below happens in wp-admin. No coding, no copy-paste of page content.
Files: `dirt-dawn-theme.zip`, `products.csv`, `pages.xml` (this folder).

## 1. Install the theme (1 min)
1. wp-admin → **Appearance → Themes → Add New → Upload Theme**.
2. Choose `dirt-dawn-theme.zip` → **Install Now** → **Activate**.
3. When prompted "This theme recommends WooCommerce", install WooCommerce from
   Plugins → Add New (search "WooCommerce") if not already installed, and run
   its setup wizard (country, currency, shipping).

## 2. Import the products (2 min)
1. wp-admin → **Products → All Products → Import**.
2. Upload `products.csv`. Keep defaults ("Column mapping" auto-matches);
   check **"Images downloaded from external sources"** so the product photos
   are pulled in automatically. Click **Run the importer**.
3. 31 products land with names, prices, descriptions, Size/Color attributes,
   categories and photos (photos load from the GitHub repo).

## 3. Import the pages (1 min)
1. wp-admin → **Tools → Import → WordPress** (click "Install importer" if asked).
2. Upload `pages.xml` → import. All 9 policy/contact pages are created and
   published with full formatted content (Terms, Privacy, Shipping, Returns,
   Cancellation, Payment, Warranty, Cookies, Contact).

## 4. Finish-up clicks (~5 min)
1. **Settings → Reading** → "Your homepage displays": **A static page** →
   Homepage: *(create any blank page titled "Home" first)* → Save. The theme's
   `front-page.php` hero + category tiles + New Arrivals show automatically.
2. **Settings → Permalinks** → "Post name" → Save (clean URLs like the store).
3. **Appearance → Menus** → create a menu (Shop, Story, Contact) → assign to
   "Primary Menu". Without a menu the theme falls back to sensible links.
4. **Products → Categories** → set a thumbnail for each of the 8 categories if
   you want category-page headers to have images (optional).
5. **WooCommerce → Settings → Payment** → install your NMI gateway plugin and
   paste your gateway keys. Visa/Mastercard/Amex badges are already in the footer.

## What the theme includes
- Header with DIRT & DAWN wordmark, "Built for the Outdoors" tagline, nav, live cart count.
- Homepage: full-width dawn-trail hero ("Chase Your Dawn."), 8 category tiles, New Arrivals grid.
- Footer: brand card, Shop + Policies columns, Visa/Mastercard/Amex badges.
- WooCommerce-styled shop grid, product page, cart and checkout in the brand
  palette (bone #F4F2EC, charcoal #20211E, earth #5C5140, sand #D8CEBD, clay #B4562F).

## Notes
- Product images load from GitHub during import; after import they live in your
  Media Library, so you can delete the GitHub link dependency.
- Product reviews and stock quantities come from the same values as the store.
