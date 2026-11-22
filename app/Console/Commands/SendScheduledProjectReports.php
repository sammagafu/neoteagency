<?php

namespace App\Console\Commands;

use App\Jobs\SendProjectReportJob;
use App\Models\Project;
use App\Models\ProjectReport;
use App\Services\ProjectReportBuilder;
use Illuminate\Console\Command;

class SendScheduledProjectReports extends Command
{
    protected $signature = 'reports:send-scheduled {period : weekly|monthly} {--sync : Send immediately instead of queueing}';

    protected $description = 'Generate and send automatic weekly or monthly client project reports';

    public function handle(ProjectReportBuilder $builder): int
    {
        $period = $this->argument('period');

        if (! in_array($period, [ProjectReport::PERIOD_WEEKLY, ProjectReport::PERIOD_MONTHLY], true)) {
            $this->error('Period must be weekly or monthly.');

            return self::FAILURE;
        }

        $query = Project::query()
            ->with('clientAccount')
            ->whereHas('clientAccount', fn ($q) => $q->where('is_active', true)->whereNotNull('email'))
            ->when(
                $period === ProjectReport::PERIOD_WEEKLY,
                fn ($q) => $q->where('auto_weekly_report', true),
                fn ($q) => $q->where('auto_monthly_report', true),
            );

        $count = 0;

        $query->each(function (Project $project) use ($builder, $period, &$count) {
            $alreadySent = ProjectReport::query()
                ->where('project_id', $project->id)
                ->where('period_type', $period)
                ->where('status', ProjectReport::STATUS_SENT)
                ->when(
                    $period === ProjectReport::PERIOD_WEEKLY,
                    fn ($q) => $q->where('sent_at', '>=', now()->startOfWeek()),
                    fn ($q) => $q->where('sent_at', '>=', now()->startOfMonth()),
                )
                ->exists();

            if ($alreadySent) {
                $this->line("Skipped {$project->title} — already sent this {$period} cycle.");

                return;
            }

            $report = $builder->build($project, $period);

            if ($this->option('sync')) {
                SendProjectReportJob::dispatchSync($report->id);
            } else {
                SendProjectReportJob::dispatch($report->id);
            }

            $count++;
            $this->info("Queued {$period} report for {$project->title} → {$report->recipient_email}");
        });

        $this->info("Done. {$count} report(s) queued.");

        return self::SUCCESS;
    }
}
