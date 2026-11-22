@extends('layouts.admin')
@section('heading', $project->exists ? 'Edit project' : 'New project')

@section('content')
    <form method="POST" enctype="multipart/form-data"
          action="{{ $project->exists ? route('admin.projects.update', $project) : route('admin.projects.store') }}"
          class="admin-card max-w-3xl space-y-5">
        @csrf
        @if ($project->exists) @method('PUT') @endif

        <div>
            <label class="admin-label" for="title">Title</label>
            <input id="title" name="title" value="{{ old('title', $project->title) }}" required class="admin-input">
            @error('title') <p class="mt-1 text-sm text-red-600">{{ $message }}</p> @enderror
        </div>
        <div class="grid gap-4 sm:grid-cols-2">
            <div>
                <label class="admin-label" for="client_id">Client account</label>
                <select id="client_id" name="client_id" class="admin-input">
                    <option value="">— None —</option>
                    @foreach ($clients as $client)
                        <option value="{{ $client->id }}" @selected((string) old('client_id', $project->client_id) === (string) $client->id)>
                            {{ $client->displayName() }} · {{ $client->email }}
                        </option>
                    @endforeach
                </select>
                <p class="mt-1 text-xs text-mist">Required for automatic weekly/monthly reports.</p>
            </div>
            <div>
                <label class="admin-label" for="client">Client label (public)</label>
                <input id="client" name="client" value="{{ old('client', $project->client) }}" class="admin-input">
            </div>
        </div>
        <div>
            <label class="admin-label" for="skills">Skills</label>
            <input id="skills" name="skills" value="{{ old('skills', $project->skills) }}" class="admin-input">
        </div>
        <div>
            <label class="admin-label" for="excerpt">Excerpt</label>
            <textarea id="excerpt" name="excerpt" rows="2" class="admin-input">{{ old('excerpt', $project->excerpt) }}</textarea>
        </div>
        <div>
            <label class="admin-label">Results / metrics</label>
            <p class="mt-1 text-xs text-mist">Shown on the public case study (value + short label).</p>
            <div class="mt-3 space-y-3">
                @php
                    $resultRows = old('results', $project->results ?? []);
                    $resultRows = array_values(is_array($resultRows) ? $resultRows : []);
                    while (count($resultRows) < 4) {
                        $resultRows[] = ['value' => '', 'label' => ''];
                    }
                @endphp
                @foreach ($resultRows as $i => $row)
                    <div class="grid gap-3 sm:grid-cols-2">
                        <input name="results[{{ $i }}][value]" value="{{ $row['value'] ?? '' }}" placeholder="e.g. +38%" class="admin-input">
                        <input name="results[{{ $i }}][label]" value="{{ $row['label'] ?? '' }}" placeholder="e.g. Task completion" class="admin-input">
                    </div>
                @endforeach
            </div>
        </div>
        <div>
            <label class="admin-label" for="content">Content (HTML allowed)</label>
            <textarea id="content" name="content" rows="10" class="admin-input font-mono text-sm">{{ old('content', $project->content) }}</textarea>
        </div>
        <div>
            <label class="admin-label" for="cover">Cover image</label>
            <input id="cover" name="cover" type="file" accept="image/*" class="admin-input">
            @if ($project->cover)
                <p class="mt-2 text-sm text-mist">Current: {{ $project->cover }}</p>
            @endif
        </div>
        <div>
            <label class="admin-label">Categories</label>
            <div class="mt-2 flex flex-wrap gap-3">
                @foreach ($categories as $category)
                    <label class="inline-flex items-center gap-2 text-sm">
                        <input type="checkbox" name="categories[]" value="{{ $category->id }}"
                               @checked(in_array($category->id, old('categories', $selectedCategories)))>
                        {{ $category->name }}
                    </label>
                @endforeach
            </div>
        </div>

        <div class="rounded-2xl border border-accent/20 bg-accent-soft/40 p-4 space-y-4">
            <p class="font-display text-base font-semibold text-ink">Client reporting</p>
            <div class="grid gap-4 sm:grid-cols-2">
                <div>
                    <label class="admin-label" for="report_status">Current status</label>
                    <input id="report_status" name="report_status" value="{{ old('report_status', $project->report_status) }}" placeholder="In progress / QA / Launched" class="admin-input">
                </div>
                <div>
                    <label class="admin-label" for="progress_percent">Progress %</label>
                    <input id="progress_percent" name="progress_percent" type="number" min="0" max="100" value="{{ old('progress_percent', $project->progress_percent ?? 0) }}" class="admin-input">
                </div>
            </div>
            <div>
                <label class="admin-label" for="report_summary">Latest progress notes</label>
                <textarea id="report_summary" name="report_summary" rows="4" class="admin-input" placeholder="What shipped this period, blockers, next steps…">{{ old('report_summary', $project->report_summary) }}</textarea>
            </div>
            <div class="flex flex-wrap gap-4">
                <label class="inline-flex items-center gap-2 text-sm"><input type="checkbox" name="auto_weekly_report" value="1" @checked(old('auto_weekly_report', $project->auto_weekly_report))> Auto weekly report (Mondays 09:00)</label>
                <label class="inline-flex items-center gap-2 text-sm"><input type="checkbox" name="auto_monthly_report" value="1" @checked(old('auto_monthly_report', $project->auto_monthly_report))> Auto monthly report (1st 09:00)</label>
            </div>
        </div>

        <div class="grid gap-4 sm:grid-cols-3">
            <div>
                <label class="admin-label" for="sort_order">Sort order</label>
                <input id="sort_order" name="sort_order" type="number" value="{{ old('sort_order', $project->sort_order ?? 0) }}" class="admin-input">
            </div>
            <div>
                <label class="admin-label" for="published_at">Published at</label>
                <input id="published_at" name="published_at" type="datetime-local"
                       value="{{ old('published_at', optional($project->published_at)->format('Y-m-d\TH:i')) }}" class="admin-input">
            </div>
            <div class="flex flex-col justify-end gap-2 pb-1">
                <label class="inline-flex items-center gap-2 text-sm"><input type="checkbox" name="is_published" value="1" @checked(old('is_published', $project->is_published))> Published</label>
                <label class="inline-flex items-center gap-2 text-sm"><input type="checkbox" name="is_featured" value="1" @checked(old('is_featured', $project->is_featured))> Featured</label>
            </div>
        </div>
        <div class="flex gap-3">
            <button class="btn-primary" type="submit">Save</button>
            <a href="{{ route('admin.projects.index') }}" class="btn-secondary">Cancel</a>
        </div>
    </form>

    @if ($project->exists && $project->client_id)
        <form method="POST" action="{{ route('admin.projects.send-report', $project) }}" class="mt-4 max-w-3xl">
            @csrf
            <button class="btn-secondary" type="submit">Send report now to client</button>
        </form>
    @endif
@endsection
