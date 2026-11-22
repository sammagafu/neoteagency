<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Jobs\SendProjectReportJob;
use App\Models\Project;
use App\Models\ProjectReport;
use App\Services\ProjectReportBuilder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class ProjectReportController extends Controller
{
    public function index(): View
    {
        return view('admin.reports.index', [
            'reports' => ProjectReport::with(['project', 'client'])->latest()->paginate(20),
            'eligibleProjects' => Project::query()
                ->with('clientAccount')
                ->whereNotNull('client_id')
                ->orderBy('title')
                ->get(),
        ]);
    }

    public function create(Request $request): View
    {
        return view('admin.reports.form', [
            'report' => new ProjectReport([
                'period_type' => ProjectReport::PERIOD_MANUAL,
                'period_start' => now()->subDays(7)->toDateString(),
                'period_end' => now()->toDateString(),
            ]),
            'projects' => Project::with('clientAccount')->orderBy('title')->get(),
            'selectedProjectId' => $request->integer('project_id') ?: null,
        ]);
    }

    public function store(Request $request, ProjectReportBuilder $builder): RedirectResponse
    {
        $data = $request->validate([
            'project_id' => ['required', 'exists:projects,id'],
            'period_type' => ['required', 'in:weekly,monthly,manual'],
            'period_start' => ['nullable', 'date'],
            'period_end' => ['nullable', 'date', 'after_or_equal:period_start'],
            'subject' => ['nullable', 'string', 'max:255'],
            'body' => ['nullable', 'string'],
            'send_now' => ['nullable', 'boolean'],
        ]);

        $project = Project::with('clientAccount')->findOrFail($data['project_id']);

        $report = $builder->build(
            $project,
            $data['period_type'],
            $data['period_start'] ?? null,
            $data['period_end'] ?? null,
            $data['body'] ?? null,
            $data['subject'] ?? null,
        );

        if ($request->boolean('send_now')) {
            SendProjectReportJob::dispatchSync($report->id);
            $report->refresh();

            return redirect()
                ->route('admin.reports.show', $report)
                ->with('success', $report->status === ProjectReport::STATUS_SENT
                    ? 'Report created and sent.'
                    : 'Report created but sending failed: '.($report->error_message ?: 'unknown error'));
        }

        return redirect()->route('admin.reports.show', $report)->with('success', 'Report draft created.');
    }

    public function show(ProjectReport $report): View
    {
        $report->load(['project', 'client']);

        return view('admin.reports.show', compact('report'));
    }

    public function destroy(ProjectReport $report): RedirectResponse
    {
        $report->delete();

        return redirect()->route('admin.reports.index')->with('success', 'Report deleted.');
    }

    public function send(ProjectReport $report): RedirectResponse
    {
        SendProjectReportJob::dispatchSync($report->id);
        $report->refresh();

        return back()->with(
            'success',
            $report->status === ProjectReport::STATUS_SENT
                ? 'Report sent to '.$report->recipient_email
                : 'Send failed: '.($report->error_message ?: 'unknown error')
        );
    }

    public function sendProjectNow(Project $project, ProjectReportBuilder $builder): RedirectResponse
    {
        abort_unless($project->client_id && $project->clientAccount?->email, 422, 'Project needs an active client email.');

        $report = $builder->build($project, ProjectReport::PERIOD_MANUAL);
        SendProjectReportJob::dispatchSync($report->id);
        $report->refresh();

        return redirect()
            ->route('admin.reports.show', $report)
            ->with('success', $report->status === ProjectReport::STATUS_SENT
                ? 'Report sent to '.$report->recipient_email
                : 'Send failed: '.($report->error_message ?: 'unknown error'));
    }
}
