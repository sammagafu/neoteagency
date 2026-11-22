# Neotelabs

Digital agency website rebuilt on **Laravel** + **Tailwind CSS**, with a secured admin CMS for managing the public site. Ready for **cPanel** hosting.

## Stack

- Laravel 13
- Tailwind CSS 3
- Blade templates
- SQLite locally / MySQL on cPanel
- Vite asset pipeline

## Local setup

```bash
composer install
cp .env.example .env
php artisan key:generate
touch database/database.sqlite
php artisan migrate --seed
php artisan storage:link
npm install
npm run build
php artisan serve
```

- Site: http://127.0.0.1:8000  
- Admin: http://127.0.0.1:8000/login  
  - Email: `admin@neotelabs.com`  
  - Password: `password`

## What admins can manage

Projects, insights, services, team, contact messages, categories, site-wide settings, **clients**, and **project reports**.

### Automatic client reports

1. Create a client under Admin → Clients.
2. Attach the client to a project and enable **Auto weekly** / **Auto monthly**.
3. Keep **progress notes** updated — they feed the email body.
4. On cPanel, add the Laravel scheduler cron (see `DEPLOY-CPANEL.md`).

Manual send is available from Admin → Reports or the project edit screen.

### Motion

The public site uses WOW-style scroll animations (Animate.css) and parallax hero layers.

## cPanel

See [DEPLOY-CPANEL.md](DEPLOY-CPANEL.md) for production deployment steps.
