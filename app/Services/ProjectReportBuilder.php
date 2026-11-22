<?php

namespace App\Services;

use App\Models\Project;
use App\Models\ProjectReport;
use Carbon\CarbonInterface;
use Illuminate\Support\Carbon;

class ProjectReportBuilder
{
    public function build(
        Project $project,
        string $periodType,
        ?CarbonInterface $periodStart = null,
        ?CarbonInterface $periodEnd = null,
        ?string $customBody = null,
        ?string $customSubject = null,
    ): ProjectReport {
        $project->loadMissing('clientAccount');

        [$start, $end] = $this->resolvePeriod($periodType, $periodStart, $periodEnd);

        $client = $project->clientAccount;
        $clientLabel = $client?->displayName() ?: ($project->client ?: 'Client');
        $periodLabel = match ($periodType) {
            ProjectReport::PERIOD_WEEKLY => 'Weekly',
            ProjectReport::PERIOD_MONTHLY => 'Monthly',
            default => 'Project',
        };

        $subject = $customSubject ?: sprintf(
            '%s %s report — %s',
            $periodLabel,
            $project->title,
            $end->format('M j, Y')
        );

        $body = $customBody ?: $this->defaultBody($project, $clientLabel, $periodLabel, $start, $end);

        return ProjectReport::query()->create([
            'project_id' => $project->id,
            'client_id' => $client?->id,
            'period_type' => $periodType,
            'period_start' => $start->toDateString(),
            'period_end' => $end->toDateString(),
            'subject' => $subject,
            'body' => $body,
            'status' => ProjectReport::STATUS_DRAFT,
            'recipient_email' => $client?->email,
        ]);
    }

    /**
     * @return array{0: Carbon, 1: Carbon}
     */
    private function resolvePeriod(
        string $periodType,
        ?CarbonInterface $periodStart,
        ?CarbonInterface $periodEnd,
    ): array {
        if ($periodStart && $periodEnd) {
            return [Carbon::parse($periodStart)->startOfDay(), Carbon::parse($periodEnd)->endOfDay()];
        }

        if ($periodType === ProjectReport::PERIOD_MONTHLY) {
            $end = now()->subMonth()->endOfMonth();
            $start = $end->copy()->startOfMonth();

            return [$start, $end];
        }

        if ($periodType === ProjectReport::PERIOD_WEEKLY) {
            $end = now()->subDay()->endOfDay();
            $start = $end->copy()->subDays(6)->startOfDay();

            return [$start, $end];
        }

        $end = now()->endOfDay();
        $start = now()->startOfDay();

        return [$start, $end];
    }

    private function defaultBody(
        Project $project,
        string $clientLabel,
        string $periodLabel,
        Carbon $start,
        Carbon $end,
    ): string {
        $progress = max(0, min(100, (int) $project->progress_percent));
        $status = $project->report_status ?: 'In progress';
        $summary = trim((string) $project->report_summary) ?: 'Work continued on agreed deliverables with steady progress toward the next milestone.';

        return <<<HTML
<p>Hello {$clientLabel},</p>
<p>Here is your <strong>{$periodLabel}</strong> project report for <strong>{$project->title}</strong> covering {$start->format('M j, Y')} – {$end->format('M j, Y')}.</p>
<ul>
    <li><strong>Status:</strong> {$status}</li>
    <li><strong>Progress:</strong> {$progress}%</li>
</ul>
<p><strong>Highlights this period</strong></p>
<p>{$summary}</p>
<p>If you have questions or want to adjust priorities for the next cycle, reply to this email and we will align quickly.</p>
<p>— Neotelabs</p>
HTML;
    }
}
