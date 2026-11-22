<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

// --sync keeps cPanel hosts working without a long-running queue worker
Schedule::command('reports:send-scheduled weekly --sync')
    ->weeklyOn(1, '09:00')
    ->timezone(config('app.timezone', 'UTC'))
    ->withoutOverlapping()
    ->appendOutputTo(storage_path('logs/scheduled-reports.log'));

Schedule::command('reports:send-scheduled monthly --sync')
    ->monthlyOn(1, '09:00')
    ->timezone(config('app.timezone', 'UTC'))
    ->withoutOverlapping()
    ->appendOutputTo(storage_path('logs/scheduled-reports.log'));
