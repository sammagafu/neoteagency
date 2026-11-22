<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Project extends Model
{
    protected $fillable = [
        'client_id',
        'title',
        'slug',
        'client',
        'skills',
        'cover',
        'excerpt',
        'results',
        'content',
        'views',
        'is_featured',
        'is_published',
        'sort_order',
        'published_at',
        'auto_weekly_report',
        'auto_monthly_report',
        'report_summary',
        'report_status',
        'progress_percent',
    ];

    protected function casts(): array
    {
        return [
            'is_featured' => 'boolean',
            'is_published' => 'boolean',
            'published_at' => 'datetime',
            'auto_weekly_report' => 'boolean',
            'auto_monthly_report' => 'boolean',
            'progress_percent' => 'integer',
            'results' => 'array',
        ];
    }

    /**
     * @return array<int, array{value: string, label: string}>
     */
    public function resultMetrics(): array
    {
        $results = collect($this->results ?? [])
            ->filter(fn ($row) => filled($row['value'] ?? null) || filled($row['label'] ?? null))
            ->map(fn ($row) => [
                'value' => (string) ($row['value'] ?? ''),
                'label' => (string) ($row['label'] ?? ''),
            ])
            ->values()
            ->all();

        return $results;
    }

    public function clientAccount(): BelongsTo
    {
        return $this->belongsTo(Client::class, 'client_id');
    }

    public function reports(): HasMany
    {
        return $this->hasMany(ProjectReport::class);
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
