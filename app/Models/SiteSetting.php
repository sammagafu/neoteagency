<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class SiteSetting extends Model
{
    protected $fillable = ['key', 'value'];

    public static function get(string $key, ?string $default = null): ?string
    {
        $settings = Cache::rememberForever('site_settings', function () {
            return static::query()->pluck('value', 'key')->all();
        });

        return $settings[$key] ?? $default;
    }

    public static function setMany(array $values): void
    {
        foreach ($values as $key => $value) {
            static::query()->updateOrCreate(
                ['key' => $key],
                ['value' => $value]
            );
        }

        Cache::forget('site_settings');
    }

    public static function allCached(): array
    {
        return Cache::rememberForever('site_settings', function () {
            return static::query()->pluck('value', 'key')->all();
        });
    }
}
