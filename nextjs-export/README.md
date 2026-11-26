# Next.js static export (arsip)

Folder ini berisi **hasil export statis** dari aplikasi Next.js di root repo
(`npm run build` dengan `output: "export"`).

Kenapa dipindah ke sini? Sebelumnya file-file ini ada di root repo
(`index.html`, `_next/`, folder per-halaman, `.htaccess`). Karena Hostinger
men-deploy isi repo ke `public_html`, file tersebut menimpa/menutupi instalasi
WordPress di sana:

- `index.html` menutupi homepage WordPress (`index.php`).
- `.htaccess` berisi `DirectoryIndex index.html` + `Options -Indexes`, sehingga
  `/wp-admin/` dan `/wp-includes/` (yang hanya punya `index.php`) balas **403
  Forbidden** — wp-admin seolah hilang.

Jadi jangan salin isi folder ini ke `public_html` di atas instalasi WordPress.
Untuk build ulang: `npm run build` (hasilnya di `out/`, sudah di-`.gitignore`).
