@extends('layouts.admin')
@section('heading', 'Client reports')
@section('subheading', 'Automatic weekly/monthly emails and manual sends')

@section('content')
    <div class="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p class="text-sm text-mist">Weekly runs Mondays 09:00 · Monthly runs on the 1st 09:00 (requires cPanel cron).</p>
        <a href="{{ route('admin.reports.create') }}" class="btn-primary">Create / send report</a>
    </div>

    @if ($eligibleProjects->isNotEmpty())
        <div class="admin-card mb-6">
            <p class="mb-3 text-sm font-medium text-ink">Projects with client accounts</p>
            <div class="flex flex-wrap gap-2">
                @foreach ($eligibleProjects as $project)
                    <span class="rounded-full bg-paper px-3 py-1 text-xs text-mist ring-1 ring-ink/10">
                        {{ $project->title }}
                        @if ($project->auto_weekly_report) · weekly @endif
                        @if ($project->auto_monthly_report) · monthly @endif
                    </span>
                @endforeach
            </div>
        </div>
    @endif

    <div class="overflow-hidden rounded-2xl border border-ink/10 bg-white">
        <table class="min-w-full text-left text-sm">
            <thead class="border-b border-ink/10 bg-paper/60 text-xs uppercase tracking-wide text-mist">
                <tr>
                    <th class="px-4 py-3">Project</th>
                    <th class="px-4 py-3">Type</th>
                    <th class="px-4 py-3">Recipient</th>
                    <th class="px-4 py-3">Status</th>
                    <th class="px-4 py-3">Sent</th>
                    <th class="px-4 py-3"></th>
                </tr>
            </thead>
            <tbody>
                @forelse ($reports as $report)
                    <tr class="border-b border-ink/5">
                        <td class="px-4 py-3 font-medium">{{ $report->project?->title }}</td>
                        <td class="px-4 py-3">{{ $report->periodLabel() }}</td>
                        <td class="px-4 py-3">{{ $report->recipient_email }}</td>
                        <td class="px-4 py-3">
                            <span class="rounded-full px-2 py-0.5 text-xs font-semibold
                                {{ $report->status === 'sent' ? 'bg-accent-soft text-accent-deep' : ($report->status === 'failed' ? 'bg-red-100 text-red-700' : 'bg-paper text-mist') }}">
                                {{ ucfirst($report->status) }}
                            </span>
                        </td>
                        <td class="px-4 py-3">{{ optional($report->sent_at)->format('M j, Y H:i') ?: '—' }}</td>
                        <td class="px-4 py-3 text-right">
                            <a href="{{ route('admin.reports.show', $report) }}" class="text-accent">Open</a>
                        </td>
                    </tr>
                @empty
                    <tr><td colspan="6" class="px-4 py-8 text-mist">No reports yet. Create one or enable auto reports on a project.</td></tr>
                @endforelse
            </tbody>
        </table>
    </div>
    <div class="mt-6">{{ $reports->links() }}</div>
@endsection
