<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Str;

class Project extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'client',
        'skills',
        'cover',
        'excerpt',
        'content',
        'views',
        'is_featured',
        'is_published',
        'sort_order',
        'published_at',
    ];

    protected function casts(): array
    {
        return [
            'is_featured' => 'boolean',
            'is_published' => 'boolean',
            'published_at' => 'datetime',
        ];
    }

    protected static function booted(): void
    {
        static::saving(function (Project $project) {
            if (blank($project->slug)) {
                $project->slug = Str::slug($project->title);
            }
        });
    }

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(ProjectCategory::class);
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('is_published', true);
    }

    public function coverUrl(): string
    {
        if (! $this->cover) {
            return asset('images/portfolio/work-1.png');
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
