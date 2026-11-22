<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Str;

class InsightCategory extends Model
{
    protected $fillable = ['name', 'slug'];

    protected static function booted(): void
    {
        static::saving(function (InsightCategory $category) {
            $category->slug = Str::slug($category->name);
        });
    }

    public function insights(): BelongsToMany
    {
        return $this->belongsToMany(Insight::class);
    }
}
