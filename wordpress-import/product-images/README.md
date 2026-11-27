# Gambar produk Dirt & Dawn

Setiap produk punya gambarnya sendiri di sini, dan **setiap gambar hanya
menampilkan produknya** — tanpa model, tanpa latar pemandangan.

## Kenapa digambar sendiri, bukan foto stok

Untuk jenis barang di toko ini, bank foto gratis hampir selalu menampilkan model
yang memakai barangnya atau pemandangan alam, bukan barangnya saja:

- Pixabay diblokir dari lingkungan kerja ini dan tetap butuh kunci API.
- Pexels dan Unsplash bisa diakses, tetapi hasil untuk apparel/gear hampir
  seluruhnya foto model ("woman in black sports bra and black shorts").
- Wikimedia Commons memberi foto asli, tetapi hasil penelusurannya berupa foto
  orang, gambar tidak relevan, dan kualitas rendah — tidak layak untuk toko.
- Foto produk di latar putih yang benar-benar bersih (iStock, Pixta, Dreamstime,
  Adobe Stock, FreePixel) semuanya berbayar atau memblokir akses.

Karena itu gambar dibuat sendiri dengan palet merek, sehingga seluruh grid
konsisten dan setiap gambar bersih dari unsur lain. Ini juga menghapus seluruh
ketergantungan lisensi pihak ketiga untuk foto produk.

## Cara membangun ulang

```bash
scripts/render-product-images.sh          # SVG -> PNG 700x700
scripts/build-product-catalog.py          # katalog produk -> products-catalog.json
scripts/import-products-remote.sh         # unggah + importer (butuh kredensial FTP)
```

- `svg/` — sumber vektor, dibuat oleh `scripts/build-product-images.py`.
- `png/` — hasil render 700×700, ini yang dipakai WordPress.

Menambah varian baru: tambahkan bentuk dan entri di `CATALOGUE` pada
`scripts/build-product-images.py`, lalu rujuk slug-nya di katalog produk.

## Mengganti dengan foto asli nanti

Kalau nanti ada foto produk asli (dari pemasok atau hasil pemotretan sendiri),
letakkan berkasnya di `png/` dengan nama slug yang sama, jalankan
`scripts/import-products-remote.sh`, dan gambarnya langsung terpasang.
