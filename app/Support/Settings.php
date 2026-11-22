<?php

namespace App\Support;

use App\Models\SiteSetting;

class Settings
{
    public static function get(string $key, ?string $default = null): ?string
    {
        return SiteSetting::get($key, $default);
    }
}
