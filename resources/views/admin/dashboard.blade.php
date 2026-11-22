@extends('layouts.admin')

@section('heading', 'Dashboard')
@section('subheading', 'Manage Neotelabs content, clients, and project reports')

@section('content')
    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        @foreach ([
            ['Projects', $stats['projects'], route('admin.projects.index')],
            ['Clients', $stats['clients'], route('admin.clients.index')],
            ['Reports sent', $stats['reports'], route('admin.reports.index')],
            ['Unread messages', $stats['messages'], route('admin.messages.index')],
        ] as [$label, $value, $url])
            <a href="{{ $url }}" class="admin-card transition hover:border-accent/40">
                <p class="text-xs font-semibold uppercase tracking-[0.18em] text-mist">{{ $label }}</p>
                <p class="mt-3 font-display text-4xl font-semibold text-ink">{{ $value }}</p>
            </a>
        @endforeach
    </div>

    <div class="mt-8 grid gap-6 lg:grid-cols-3">
        <div class="admin-card">
            <div class="mb-4 flex items-center justify-between">
                <h2 class="font-display text-lg font-semibold">Recent messages</h2>
                <a href="{{ route('admin.messages.index') }}" class="text-sm text-accent">View all</a>
            </div>
            <div class="space-y-3">
                @forelse ($recentMessages as $message)
                    <a href="{{ route('admin.messages.show', $message) }}" class="block rounded-xl border border-ink/5 px-3 py-3 hover:bg-paper">
                        <div class="flex items-center justify-between gap-3">
                            <p class="font-medium text-ink">{{ $message->name }}</p>
                            @unless ($message->is_read)
                                <span class="rounded-full bg-accent-soft px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent-deep">New</span>
                            @endunless
                        </div>
                        <p class="mt-1 truncate text-sm text-mist">{{ $message->message }}</p>
                    </a>
                @empty
                    <p class="text-sm text-mist">No messages yet.</p>
                @endforelse
            </div>
        </div>

        <div class="admin-card">
            <div class="mb-4 flex items-center justify-between">
                <h2 class="font-display text-lg font-semibold">Recent projects</h2>
                <a href="{{ route('admin.projects.create') }}" class="text-sm text-accent">Add project</a>
            </div>
            <div class="space-y-3">
                @forelse ($recentProjects as $project)
                    <a href="{{ route('admin.projects.edit', $project) }}" class="flex items-center justify-between rounded-xl border border-ink/5 px-3 py-3 hover:bg-paper">
                        <div>
                            <p class="font-medium text-ink">{{ $project->title }}</p>
                            <p class="text-sm text-mist">{{ $project->is_published ? 'Published' : 'Draft' }}</p>
                        </div>
                        <span class="text-mist">Edit</span>
                    </a>
                @empty
                    <p class="text-sm text-mist">No projects yet.</p>
                @endforelse
            </div>
        </div>

        <div class="admin-card">
            <div class="mb-4 flex items-center justify-between">
                <h2 class="font-display text-lg font-semibold">Recent reports</h2>
                <a href="{{ route('admin.reports.create') }}" class="text-sm text-accent">Send report</a>
            </div>
            <div class="space-y-3">
                @forelse ($recentReports as $report)
                    <a href="{{ route('admin.reports.show', $report) }}" class="block rounded-xl border border-ink/5 px-3 py-3 hover:bg-paper">
                        <p class="font-medium text-ink">{{ $report->project?->title }}</p>
                        <p class="text-sm text-mist">{{ $report->periodLabel() }} · {{ ucfirst($report->status) }}</p>
                    </a>
                @empty
                    <p class="text-sm text-mist">No reports yet.</p>
                @endforelse
            </div>
        </div>
    </div>
@endsection
