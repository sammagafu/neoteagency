<?php

namespace App\Jobs;

use App\Mail\ProjectReportMail;
use App\Models\ProjectReport;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Mail;
use Throwable;

class SendProjectReportJob implements ShouldQueue
{
    use Queueable;

    public function __construct(public int $reportId) {}

    public function handle(): void
    {
        $report = ProjectReport::query()->with(['project', 'client'])->findOrFail($this->reportId);

        if (! $report->recipient_email) {
            $report->update([
                'status' => ProjectReport::STATUS_FAILED,
                'error_message' => 'Missing recipient email. Assign an active client with an email address.',
            ]);

            return;
        }

        $report->update([
            'status' => ProjectReport::STATUS_QUEUED,
            'error_message' => null,
        ]);

        Mail::to($report->recipient_email)->send(new ProjectReportMail($report));

        $report->update([
            'status' => ProjectReport::STATUS_SENT,
            'sent_at' => now(),
            'error_message' => null,
        ]);
    }

    public function failed(?Throwable $exception): void
    {
        ProjectReport::query()->whereKey($this->reportId)->update([
            'status' => ProjectReport::STATUS_FAILED,
            'error_message' => $exception?->getMessage(),
        ]);
    }
}
