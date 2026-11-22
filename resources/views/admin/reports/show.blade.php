@extends('layouts.admin')
@section('heading', 'Report detail')

@section('content')
    <div class="admin-card max-w-3xl space-y-4">
        <div class="flex flex-wrap items-start justify-between gap-3">
            <div>
                <p class="font-display text-xl font-semibold">{{ $report->subject }}</p>
                <p class="mt-1 text-sm text-mist">
                    {{ $report->periodLabel() }} · {{ $report->project?->title }} · {{ ucfirst($report->status) }}
                </p>
            </div>
            <div class="flex gap-2">
                @if ($report->status !== 'sent')
                    <form method="POST" action="{{ route('admin.reports.send', $report) }}">
                        @csrf
                        <button class="btn-primary" type="submit">Send now</button>
                    </form>
                @endif
                <form method="POST" action="{{ route('admin.reports.destroy', $report) }}" onsubmit="return confirm('Delete report?')">
                    @csrf @method('DELETE')
                    <button class="btn-secondary text-red-600" type="submit">Delete</button>
                </form>
            </div>
        </div>

        <dl class="grid gap-3 text-sm sm:grid-cols-2">
            <div><dt class="text-mist">Recipient</dt><dd class="font-medium">{{ $report->recipient_email ?: '—' }}</dd></div>
            <div><dt class="text-mist">Client</dt><dd class="font-medium">{{ $report->client?->displayName() ?: '—' }}</dd></div>
            <div><dt class="text-mist">Period</dt><dd class="font-medium">
                @if ($report->period_start && $report->period_end)
                    {{ $report->period_start->format('M j, Y') }} – {{ $report->period_end->format('M j, Y') }}
                @else — @endif
            </dd></div>
            <div><dt class="text-mist">Sent at</dt><dd class="font-medium">{{ optional($report->sent_at)->format('M j, Y H:i') ?: '—' }}</dd></div>
        </dl>

        @if ($report->error_message)
            <div class="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{{ $report->error_message }}</div>
        @endif

        <div class="rounded-xl border border-ink/10 bg-paper/50 p-4 prose-site text-sm">
            {!! $report->body !!}
        </div>

        <a href="{{ route('admin.reports.index') }}" class="btn-secondary">Back to reports</a>
    </div>
@endsection
