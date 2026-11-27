# Kredit foto kategori (homepage)

Foto yang dipakai kartu kategori di homepage. Sumbernya **Burst**
(https://burst.shopify.com) — foto asli, boleh dipakai komersial, tanpa
atribusi wajib. Kredit dicatat sebagai bukti asal-usul.

| Kategori (slug) | Berkas | Sumber |
| --- | --- | --- |
| `apparel` | `cat-apparel.jpg` | Burst — "Clothes on rack" (gantungan baju) |
| `equipment` | `cat-equipment.jpg` | Burst — "Backpack on white" |
| `electronics` | `cat-electronics.jpg` | Burst — "Fitness tracker band" |
| `recovery` | `cat-recovery.jpg` | Burst — "Blue foam roller" |
| `accessories` | `cat-accessories.jpg` | Burst — "Aviator sunglasses on slate" |
| `footwear` | `cat-footwear.jpg` | Burst — "Black running shoes" |

Gambar `hero-trail.jpg` dan `story-runner.jpg` tetap dari koleksi lama
(lihat `stock/CREDITS.md`).

Cara mengganti: taruh berkas baru dengan nama yang sama di folder ini, lalu
deploy. Pemetaan slug kategori ke berkas ada di `functions.php`
(`dirt_dawn_category_image()`).
