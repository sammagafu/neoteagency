<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Str;

class ProjectCategory extends Model
{
    protected $fillable = ['name', 'slug'];

    protected static function booted(): void
    {
        static::saving(function (ProjectCategory $category) {
            $category->slug = Str::slug($category->name);
        });
    }

    public function projects(): BelongsToMany
    {
        return $this->belongsToMany(Project::class);
    }
}
