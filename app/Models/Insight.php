<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Str;

class Insight extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'cover',
        'excerpt',
        'content',
        'views',
        'is_published',
        'published_at',
    ];

    protected function casts(): array
    {
        return [
            'is_published' => 'boolean',
            'published_at' => 'datetime',
        ];
    }

    protected static function booted(): void
    {
        static::saving(function (Insight $insight) {
            if (blank($insight->slug)) {
                $insight->slug = Str::slug($insight->title);
            }
        });
    }

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(InsightCategory::class);
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('is_published', true);
    }

    public function coverUrl(): string
    {
        if (! $this->cover) {
            return asset('images/portfolio/work-2.png');
        }

        if (str_starts_with($this->cover, 'http') || str_starts_with($this->cover, '/')) {
            return str_starts_with($this->cover, '/') ? asset(ltrim($this->cover, '/')) : $this->cover;
        }

        if (str_starts_with($this->cover, 'images/')) {
            return asset($this->cover);
        }

        return asset('storage/'.$this->cover);
    }

}
