# Deploying Neotelabs on cPanel

This Laravel + Tailwind site is built for shared cPanel hosting (PHP 8.2+ and MySQL).

## 1. Upload

Upload the project so the Laravel root is above (or inside) your web root. Preferred layout:

```
/home/USER/neoteagency/     ← Laravel root (app, bootstrap, vendor, …)
/home/USER/public_html/     ← document root pointing at /neoteagency/public
```

If you cannot change the document root, upload the full project into `public_html` and keep the root `.htaccess` (it forwards all requests into `/public`).

## 2. PHP & Composer

- Select PHP 8.2 or 8.3 in MultiPHP Manager.
- Enable extensions: `pdo_mysql`, `mbstring`, `openssl`, `tokenizer`, `xml`, `ctype`, `json`, `bcmath`, `fileinfo`, `gd` or `imagick`.
- On the server (SSH or Terminal):

```bash
composer install --no-dev --optimize-autoloader
cp .env.example .env
php artisan key:generate
```

Build assets on your machine (or CI) before upload if Node is unavailable on cPanel:

```bash
npm ci
npm run build
```

Commit/upload the resulting `public/build` folder.

## 3. Environment (`.env`)

```env
APP_NAME=Neotelabs
APP_ENV=production
APP_DEBUG=false
APP_URL=https://your-domain.com

DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=your_cpanel_db
DB_USERNAME=your_cpanel_user
DB_PASSWORD=your_cpanel_password

SESSION_DRIVER=database
CACHE_STORE=database
QUEUE_CONNECTION=database
FILESYSTEM_DISK=public
```

Create the MySQL database and user in cPanel → MySQL Databases.

## 4. Migrate, seed, storage

```bash
php artisan migrate --force
php artisan db:seed --force
php artisan storage:link
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

Default admin login after seeding:

- Email: `admin@neotelabs.com`
- Password: `password`

Change this immediately in Admin → Profile / password.

## 5. Permissions

```bash
chmod -R 775 storage bootstrap/cache
```

Ensure the cPanel user owns these directories.

## 6. Cron (required for automatic reports)

In cPanel → Cron Jobs, run Laravel’s scheduler every minute:

```bash
* * * * * cd /home/USER/neoteagency && /usr/local/bin/php artisan schedule:run >> /dev/null 2>&1
```

Adjust the PHP path if MultiPHP uses a versioned binary (e.g. `ea-php83`).

This enables:

- **Weekly client reports** — Mondays at 09:00 app timezone
- **Monthly client reports** — 1st of each month at 09:00

Also configure real SMTP in `.env` (`MAIL_MAILER=smtp`, host, username, password) so report emails leave the server. With `QUEUE_CONNECTION=database`, run a queue worker or use `reports:send-scheduled weekly --sync` / `monthly --sync` if you prefer sync sending from the scheduler (the scheduled commands already dispatch jobs; for shared hosting without a long-running worker, set `QUEUE_CONNECTION=sync` in production).

## 7. Admin

Visit `https://your-domain.com/login` then use `/admin` to manage:

- Projects (case studies) + progress notes / auto weekly+monthly toggles
- Clients (report recipients)
- Client reports (history + manual send)
- Insights
- Services
- Team members
- Contact messages
- Site settings (hero copy, contact details, social links)

Public registration is disabled; create additional users with:

```bash
php artisan tinker
>>> \App\Models\User::create(['name'=>'Editor','email'=>'editor@neotelabs.com','password'=>bcrypt('strong-password'),'email_verified_at'=>now()]);
```

