# Deploy ke Hostinger (WordPress + Git)

## Kenapa wp-admin hilang setelah `git push`

Repo ini sebelumnya mengirim **hasil export Next.js** ke `public_html`, termasuk
file `.htaccess` ini:

```apache
Options -Indexes
DirectoryIndex index.html
```

`DirectoryIndex index.html` memaksa Apache/LiteSpeed mencari `index.html` di
setiap folder yang dibuka. Folder `/wp-admin/` dan `/wp-includes/` hanya punya
`index.php`, jadi keduanya dianggap tidak punya file index — dan karena
`Options -Indexes` mematikan directory listing, jawabannya **403 Forbidden**.
Itulah "wp-admin hilang". Selain itu `index.html` di root `public_html` menutupi
homepage WordPress (`index.php`), jadi yang tampil adalah halaman statis Next.js.

### Perbaikan yang sudah dilakukan di repo

- Semua hasil export Next.js dipindah ke `nextjs-export/` (root repo sekarang
  hanya berisi source + paket tema, aman untuk di-deploy).
- `.htaccess` lama dipindah ke `nextjs-export/.htaccess` — tidak ada lagi
  `DirectoryIndex index.html` di root.
- Tema WordPress: `wordpress-theme/dirt-dawn/` (source) dan
  `wordpress-theme/dirt-dawn-theme.zip` (siap upload). Bikin ulang zip dengan
  `npm run theme:zip`.
- Workflow `.github/workflows/deploy-wordpress-theme.yml` hanya mengirim folder
  tema ke `wp-content/themes/dirt-dawn` — file inti WordPress tidak disentuh.

## Langkah 1 — Pulihkan wp-admin (sekali saja)

hPanel → **Files → File Manager** → masuk ke `public_html`:

1. Rename `.htaccess` menjadi `.htaccess.bak`. WordPress akan membuat ulang
   file ini sendiri; kalau perlu isinya cukup aturan permalink standar:

   ```apache
   # BEGIN WordPress
   <IfModule mod_rewrite.c>
   RewriteEngine On
   RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]
   RewriteBase /
   RewriteRule ^index\.php$ - [L]
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteCond %{REQUEST_FILENAME} !-d
   RewriteRule . /index.php [L]
   </IfModule>
   # END WordPress
   ```

2. Rename `index.html` menjadi `index.html.bak` (kalau ada). Homepage WordPress
   (`index.php`) langsung aktif lagi.
3. Hapus juga `_next/`, `404.html`, `sitemap.xml`, folder-folder halaman statis
   (`shop/`, `product/`, `cart/`, dst.) dan file `*.txt` sisa export di
   `public_html` — kalau tidak, URL seperti `/shop/` bisa menabrak halaman
   WordPress. **Jangan hapus** `wp-admin/`, `wp-includes/`, `wp-content/`,
   `wp-config.php`, `index.php`, `wp-*.php`, dan folder `wp-content/uploads/`.
4. Cek `wp-content/themes/` — kalau tema Dirt & Dawn sudah terdaftar, lewati
   Langkah 2 Opsi C.
5. wp-admin → **Settings → Permalinks → Save Changes** (membuat ulang
   `.htaccess` WordPress).
6. Tes `https://DOMAIN-ANDA/wp-admin/` → harus muncul halaman login.

Kalau folder `wp-admin/` atau `wp-includes/` benar-benar sudah terhapus:
download WordPress versi yang sama dari wordpress.org, extract, lalu upload
hanya file/folder inti yang hilang lewat File Manager. **Jangan timpa**
`wp-config.php` dan folder `wp-content/` (berisi uploads, plugin, tema).

## Langkah 2 — Deploy tema lewat Git

### Opsi A — GitHub Actions + FTP (otomatis, direkomendasikan)

1. hPanel → **Files → FTP Accounts** → catat Host, Username, Password (buat
   akun FTP baru kalau perlu password-nya tidak kamu tahu).
2. GitHub repo → **Settings → Secrets and variables → Actions → New repository
   secret**, buat tiga secret: `FTP_SERVER` (mis. `ftp.domainanda.com` atau IP
   hosting), `FTP_USERNAME`, `FTP_PASSWORD`.
3. Tidak perlu edit file apa pun: workflow memakai
   `wp-content/themes/dirt-dawn/`, dan itu benar kalau akun FTP kamu di-jail ke
   `public_html` (default Hostinger). Kalau akun FTP berakar di home directory,
   buat repository **variable** `FTP_SERVER_DIR` =
   `domains/DOMAIN-ANDA/public_html/wp-content/themes/dirt-dawn/`.
4. Push ke `master` (atau jalankan workflow-nya manual dari tab **Actions**).
   Hanya isi `wordpress-theme/dirt-dawn/` yang di-upload — wp-admin tidak pernah
   tersentuh. Kalau koneksi FTPS ditolak, ubah `protocol: ftps` menjadi
   `protocol: ftp`.

### Opsi B — Fitur Git bawaan Hostinger

Fitur ini men-deploy **seluruh isi branch** ke folder tujuan, jadi branch-nya
harus berisi hanya tema (bukan seluruh repo):

```bash
git subtree push --prefix=wordpress-theme/dirt-dawn origin deploy/wordpress-theme
```

Lalu hPanel → **Advanced → Git** → pilih branch `deploy/wordpress-theme` dengan
deploy directory `wp-content/themes/dirt-dawn`. Jalankan perintah di atas setiap
kali tema berubah.

### Opsi C — Upload manual (tanpa Git)

wp-admin → **Appearance → Themes → Add New → Upload Theme** →
`wordpress-theme/dirt-dawn-theme.zip` → Install → Activate. Isi produk/halaman
mengikuti `wordpress-import/IMPORT-STEPS.md`.

## Langkah 3 — Verifikasi

- `https://DOMAIN-ANDA/wp-admin/` → halaman login muncul, bisa masuk.
- Homepage menampilkan hero "Chase Your Dawn." dan grid kategori dari tema.
- WooCommerce → Products menampilkan produk hasil import.
- `https://DOMAIN-ANDA/wp-json/` mengembalikan JSON (permalink & rewrite aktif).

## Kalau masih bermasalah

| Gejala | Penyebab yang paling sering |
| --- | --- |
| wp-admin 403 Forbidden | Masih ada `.htaccess` dengan `DirectoryIndex index.html`, atau `.htaccess` di dalam `wp-admin/` dari plugin security |
| Homepage masih tampilan Next.js | `index.html` (atau folder halaman statis) masih ada di `public_html` |
| Tema tidak muncul di Appearance → Themes | File tema tidak lengkap — `style.css` harus ada di root folder tema (`wp-content/themes/dirt-dawn/style.css`) |
| Perubahan tema tidak muncul setelah push | Workflow gagal (cek tab Actions + kredensial FTP) atau cache plugin |
| Website 500 | `wp-config.php` tertimpa; pulihkan dari backup Hostinger (hPanel → Files → Backups) |
