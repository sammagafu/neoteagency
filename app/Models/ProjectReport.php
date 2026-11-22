<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProjectReport extends Model
{
    public const PERIOD_WEEKLY = 'weekly';

    public const PERIOD_MONTHLY = 'monthly';

    public const PERIOD_MANUAL = 'manual';

    public const STATUS_DRAFT = 'draft';

    public const STATUS_QUEUED = 'queued';

    public const STATUS_SENT = 'sent';

    public const STATUS_FAILED = 'failed';

    protected $fillable = [
        'project_id',
        'client_id',
        'period_type',
        'period_start',
        'period_end',
        'subject',
        'body',
        'status',
        'recipient_email',
        'scheduled_for',
        'sent_at',
        'error_message',
    ];

    protected function casts(): array
    {
        return [
            'period_start' => 'date',
            'period_end' => 'date',
            'scheduled_for' => 'datetime',
            'sent_at' => 'datetime',
        ];
    }

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }

    public function periodLabel(): string
    {
        return match ($this->period_type) {
            self::PERIOD_WEEKLY => 'Weekly',
            self::PERIOD_MONTHLY => 'Monthly',
            default => 'Manual',
        };
    }
}
