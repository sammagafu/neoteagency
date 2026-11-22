# Neotelabs — cPanel deployment guide

Laravel + Tailwind site for shared **cPanel** hosting (PHP **8.2+**, MySQL).

---

## Ready-made upload package

From the project root (on a machine with PHP, Composer, and Node):

```bash
chmod +x scripts/package-for-cpanel.sh
./scripts/package-for-cpanel.sh
```

This produces `neotelabs-cpanel-*.zip` (also linked as `neotelabs-cpanel-latest.zip`) containing:

- App code + `vendor/` (production, no-dev)
- Built `public/build` assets, fonts, videos, images
- Root + `public/.htaccess`
- `.env.cpanel.example` and `UPLOAD-TO-CPANEL.txt`

Upload that zip in cPanel → File Manager → Extract.

---

## Quick checklist

1. Upload zip / code  
2. Point document root to `public` (or use root `.htaccess`)  
3. PHP 8.2/8.3 + required extensions  
4. Copy `.env.cpanel.example` → `.env` → fill values → `key:generate`  
5. Create MySQL DB → migrate + seed + `storage:link`  
6. Permissions on `storage` & `bootstrap/cache`  
7. Cron for scheduler (client reports)  
8. SMTP for mail  
9. Change default admin password  

---

## 1. Upload the project

**Preferred** (document root → `public`):

```text
/home/USER/neoteagency/          ← full Laravel app
/home/USER/public_html/          ← symlink or set as neoteagency/public
```

In cPanel → Domains / Subdomains → set **Document Root** to:

```text
/home/USER/neoteagency/public
```

**Fallback** (cannot change document root): upload everything into `public_html`. Keep the **root** `.htaccess` that rewrites into `/public`.

Upload at least:

- `app/`, `bootstrap/`, `config/`, `database/`, `public/`, `resources/`, `routes/`, `vendor/` (or install Composer on server)
- `.env.cpanel.example` (rename/copy to `.env`), `artisan`, `composer.json`, `composer.lock`
- Pre-built `public/build/` (CSS/JS), `public/fonts/`, `public/videos/`, `public/images/`

---

## 2. PHP version & extensions

cPanel → **MultiPHP Manager** → select **PHP 8.2 or 8.3**.

Enable:

`pdo_mysql`, `mbstring`, `openssl`, `tokenizer`, `xml`, `ctype`, `json`, `bcmath`, `fileinfo`, `gd` (or imagick), `curl`, `zip`

---

## 3. Composer & app key

SSH / Terminal in the Laravel root:

```bash
cd ~/neoteagency   # or ~/public_html if that is the Laravel root

composer install --no-dev --optimize-autoloader
cp .env.example .env
php artisan key:generate
```

If Composer isn’t on the server, run `composer install` locally and upload `vendor/`.

---

## 4. Build frontend assets

cPanel often has no Node. Build on your machine (or CI), then upload `public/build`:

```bash
npm ci
npm run build
```

Fonts and hero video are already under `public/fonts` and `public/videos` — upload those too.

---

## 5. Configure `.env`

```bash
cp .env.cpanel.example .env
# edit .env — APP_URL, DB_*, MAIL_*
php artisan key:generate
```

Key values (also documented in `.env.cpanel.example`):

```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://your-domain.com

DB_CONNECTION=mysql
DB_HOST=localhost
DB_DATABASE=cpanel_db_name
DB_USERNAME=cpanel_db_user
DB_PASSWORD=cpanel_db_password

QUEUE_CONNECTION=sync

MAIL_MAILER=smtp
MAIL_HOST=mail.your-domain.com
MAIL_PORT=587
MAIL_USERNAME=info@neotelabs.co.tz
MAIL_PASSWORD=your-mail-password
MAIL_FROM_ADDRESS=info@neotelabs.co.tz
```

Use **`QUEUE_CONNECTION=sync`** on shared hosting unless you run a long-lived queue worker.

Create the database/user in cPanel → **MySQL® Databases**, then assign the user to the DB with all privileges.

---

## 6. Database, storage, caches

```bash
php artisan migrate --force
php artisan db:seed --force
php artisan storage:link
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

Default admin (change immediately):

| Field    | Value                 |
|----------|-----------------------|
| URL      | `/login` → `/admin`   |
| Email    | `admin@neotelabs.com` |
| Password | `password`            |

---

## 7. Permissions

```bash
chmod -R 775 storage bootstrap/cache
```

Owner should be your cPanel user.

---

## 8. Cron (automatic weekly / monthly reports)

cPanel → **Cron Jobs** → every minute:

```bash
* * * * * cd /home/USER/neoteagency && /usr/local/bin/php artisan schedule:run >> /dev/null 2>&1
```

If MultiPHP uses a versioned binary, use that path instead, e.g.:

```bash
/usr/local/bin/ea-php83 artisan schedule:run
```

Schedules:

- Weekly reports — Mondays **09:00** (app timezone)  
- Monthly reports — **1st** of month **09:00**

SMTP must work for emails to leave the server.

---

## 9. Verify after go-live

- [ ] Homepage loads (video + CSS)  
- [ ] `/about`, `/case-study`, `/insights`, `/contact`  
- [ ] `/login` → admin dashboard  
- [ ] Contact form submits  
- [ ] `php artisan schedule:list` shows report commands  
- [ ] Admin password changed  

---

## 10. Updates later

```bash
# upload changed files, then:
composer install --no-dev --optimize-autoloader
php artisan migrate --force
php artisan config:cache
php artisan route:cache
php artisan view:cache
# re-upload public/build if frontend changed
```

---

## Troubleshooting

| Symptom | Fix |
|--------|-----|
| 500 / blank blank | `APP_DEBUG=true` briefly; check `storage/logs/laravel.log`; permissions |
| CSS/JS missing | Ensure `public/build` uploaded; run `npm run build` again |
| Images 404 | `php artisan storage:link`; check `public/images` |
| DB connection refused | Use `localhost` and cPanel DB credentials |
| Mail not sending | Fix SMTP; test with `php artisan tinker` → `Mail::raw(...)` |
| Reports not sending | Cron path + `QUEUE_CONNECTION=sync` + SMTP |

---

## Admin areas

After login: Projects (+ results/metrics), Clients, Reports, Insights, Services, Team, Messages, Settings.
