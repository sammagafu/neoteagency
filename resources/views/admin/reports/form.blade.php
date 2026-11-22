@extends('layouts.admin')
@section('heading', 'Create report')

@section('content')
    <form method="POST" action="{{ route('admin.reports.store') }}" class="admin-card max-w-3xl space-y-5">
        @csrf
        <div>
            <label class="admin-label" for="project_id">Project</label>
            <select id="project_id" name="project_id" required class="admin-input">
                <option value="">Select project</option>
                @foreach ($projects as $project)
                    <option value="{{ $project->id }}" @selected((string) old('project_id', $selectedProjectId) === (string) $project->id)>
                        {{ $project->title }}
                        @if ($project->clientAccount) — {{ $project->clientAccount->email }} @else — no client @endif
                    </option>
                @endforeach
            </select>
        </div>
        <div class="grid gap-4 sm:grid-cols-3">
            <div>
                <label class="admin-label" for="period_type">Type</label>
                <select id="period_type" name="period_type" class="admin-input">
                    @foreach (['manual' => 'Manual', 'weekly' => 'Weekly', 'monthly' => 'Monthly'] as $value => $label)
                        <option value="{{ $value }}" @selected(old('period_type', $report->period_type) === $value)>{{ $label }}</option>
                    @endforeach
                </select>
            </div>
            <div>
                <label class="admin-label" for="period_start">Period start</label>
                <input id="period_start" name="period_start" type="date" value="{{ old('period_start', optional($report->period_start)->format('Y-m-d')) }}" class="admin-input">
            </div>
            <div>
                <label class="admin-label" for="period_end">Period end</label>
                <input id="period_end" name="period_end" type="date" value="{{ old('period_end', optional($report->period_end)->format('Y-m-d')) }}" class="admin-input">
            </div>
        </div>
        <div>
            <label class="admin-label" for="subject">Subject (optional)</label>
            <input id="subject" name="subject" value="{{ old('subject') }}" class="admin-input" placeholder="Leave blank to auto-generate">
        </div>
        <div>
            <label class="admin-label" for="body">Body HTML (optional)</label>
            <textarea id="body" name="body" rows="10" class="admin-input font-mono text-sm" placeholder="Leave blank to use progress notes from the project">{{ old('body') }}</textarea>
        </div>
        <label class="inline-flex items-center gap-2 text-sm">
            <input type="checkbox" name="send_now" value="1" checked> Send immediately
        </label>
        <div class="flex gap-3">
            <button class="btn-primary" type="submit">Create report</button>
            <a href="{{ route('admin.reports.index') }}" class="btn-secondary">Cancel</a>
        </div>
    </form>
@endsection
