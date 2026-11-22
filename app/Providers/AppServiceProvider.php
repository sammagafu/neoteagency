<?php

namespace App\Providers;

use App\Models\SiteSetting;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        View::composer('*', function ($view) {
            static $site = null;

            if ($site === null) {
                try {
                    $site = Schema::hasTable('site_settings')
                        ? SiteSetting::allCached()
                        : [];
                } catch (\Throwable) {
                    $site = [];
                }
            }

            $view->with('site', $site);
        });
    }
}
