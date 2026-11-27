# Foto produk Dirt & Dawn

`photos/` berisi satu foto asli untuk setiap produk, dan **setiap foto hanya
menampilkan produknya** — tanpa model, tanpa ilustrasi.

Sumber: **Burst** (https://burst.shopify.com), perpustakaan foto gratis Shopify.
Foto asli, boleh dipakai komersial, tanpa atribusi wajib. Judul asli, ID, dan
tautan setiap foto dicatat di `PHOTO-CREDITS.md`.

## Cara memilih foto

1. `scripts/source-burst-photos.py <istilah.json> <keluaran>` mencari dan
   mengunduh calon dari Burst, menyaring judul yang menyebut orang/tangan/kaki.
2. `scripts/make-contact-sheet.py` menyusun contact sheet untuk dinilai manual —
   penyaringan otomatis saja tidak cukup, beberapa foto tetap menampilkan orang.
3. `scripts/curate-product-photos.py` menyalin berkas terpilih dengan nama slug
   produk dan menulis `PHOTO-CREDITS.md`.
4. `scripts/build-product-catalog.py` menyusun `products-catalog.json`.
5. `scripts/import-products-remote.sh` mengunggah dan memasang semuanya.

## Kenapa Burst

Untuk jenis barang di toko ini, bank foto gratis lain hampir selalu menampilkan
model atau pemandangan: Pixabay diblokir dari lingkungan kerja ini dan tetap
butuh kunci API; Pexels dan Unsplash hasil untuk apparel/gear sebagian besar foto
model; Wikimedia Commons kualitasnya tidak layak untuk toko. Foto produk di latar
putih yang bersih dari iStock, Pixta, Dreamstime, Adobe Stock, dan FreePixel
semuanya berbayar atau memblokir akses. Burst adalah satu-satunya sumber gratis
yang memberi foto produk asli dalam jumlah cukup.

## Batas yang perlu diketahui

Tidak semua jenis barang punya foto produk-saja yang gratis. Burst tidak
menyediakan jaket, gilet, headlamp, tongkat trekking, atau beanie dalam bentuk
foto produk. Karena itu katalog **disesuaikan dengan foto yang tersedia**: nama
dan deskripsi setiap produk mengikuti barang yang benar-benar tampak di fotonya,
dan produk tanpa foto yang cocok tidak dipakai. Katalog berisi 31 produk di
kategori Apparel, Equipment, Accessories, Electronics, Recovery, dan Footwear.

## Mengganti dengan foto sendiri nanti

Letakkan berkas baru di `photos/` dengan nama slug yang sama (mis. `tee-charcoal.jpg`),
jalankan `scripts/import-products-remote.sh`, dan fotonya langsung terpasang.
