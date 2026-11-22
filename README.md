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

Projects, insights, services, team, contact messages, categories, and site-wide settings (hero copy, contact info, social links).

## cPanel

See [DEPLOY-CPANEL.md](DEPLOY-CPANEL.md) for production deployment steps.
