<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\Project;
use App\Models\ProjectCategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\View\View;

class ProjectController extends Controller
{
    public function index(): View
    {
        return view('admin.projects.index', [
            'projects' => Project::with(['categories', 'clientAccount'])->latest()->paginate(12),
        ]);
    }

    public function create(): View
    {
        return view('admin.projects.form', [
            'project' => new Project([
                'is_published' => true,
                'published_at' => now(),
                'progress_percent' => 0,
            ]),
            'categories' => ProjectCategory::orderBy('name')->get(),
            'selectedCategories' => [],
            'clients' => Client::active()->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $project = Project::create($this->validated($request));
        $project->categories()->sync($request->input('categories', []));

        return redirect()->route('admin.projects.index')->with('success', 'Project created.');
    }

    public function edit(Project $project): View
    {
        return view('admin.projects.form', [
            'project' => $project,
            'categories' => ProjectCategory::orderBy('name')->get(),
            'selectedCategories' => $project->categories()->pluck('project_categories.id')->all(),
            'clients' => Client::active()->get(),
        ]);
    }

    public function update(Request $request, Project $project): RedirectResponse
    {
        $project->update($this->validated($request, $project));
        $project->categories()->sync($request->input('categories', []));

        return redirect()->route('admin.projects.index')->with('success', 'Project updated.');
    }

    public function destroy(Project $project): RedirectResponse
    {
        $project->delete();

        return redirect()->route('admin.projects.index')->with('success', 'Project deleted.');
    }

    private function validated(Request $request, ?Project $project = null): array
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:160'],
            'client_id' => ['nullable', 'exists:clients,id'],
            'client' => ['nullable', 'string', 'max:120'],
            'skills' => ['nullable', 'string', 'max:200'],
            'excerpt' => ['nullable', 'string', 'max:500'],
            'content' => ['nullable', 'string'],
            'cover' => ['nullable', 'image', 'max:4096'],
            'is_featured' => ['nullable', 'boolean'],
            'is_published' => ['nullable', 'boolean'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'published_at' => ['nullable', 'date'],
            'auto_weekly_report' => ['nullable', 'boolean'],
            'auto_monthly_report' => ['nullable', 'boolean'],
            'report_summary' => ['nullable', 'string'],
            'report_status' => ['nullable', 'string', 'max:120'],
            'progress_percent' => ['nullable', 'integer', 'min:0', 'max:100'],
            'results' => ['nullable', 'array', 'max:6'],
            'results.*.value' => ['nullable', 'string', 'max:40'],
            'results.*.label' => ['nullable', 'string', 'max:80'],
            'categories' => ['nullable', 'array'],
            'categories.*' => ['integer', 'exists:project_categories,id'],
        ]);

        $data['slug'] = Str::slug($data['title']);
        $data['is_featured'] = $request->boolean('is_featured');
        $data['is_published'] = $request->boolean('is_published');
        $data['auto_weekly_report'] = $request->boolean('auto_weekly_report');
        $data['auto_monthly_report'] = $request->boolean('auto_monthly_report');
        $data['sort_order'] = $data['sort_order'] ?? 0;
        $data['progress_percent'] = $data['progress_percent'] ?? 0;
        $data['published_at'] = $data['published_at'] ?? now();
        $data['client_id'] = $data['client_id'] ?: null;
        $data['results'] = collect($data['results'] ?? [])
            ->map(fn ($row) => [
                'value' => trim((string) ($row['value'] ?? '')),
                'label' => trim((string) ($row['label'] ?? '')),
            ])
            ->filter(fn ($row) => $row['value'] !== '' || $row['label'] !== '')
            ->values()
            ->all();

        if ($data['client_id']) {
            $linked = Client::find($data['client_id']);
            if ($linked && blank($data['client'] ?? null)) {
                $data['client'] = $linked->company ?: $linked->name;
            }
        }

        if ($request->hasFile('cover')) {
            $data['cover'] = $request->file('cover')->store('projects', 'public');
        } else {
            unset($data['cover']);
        }

        return $data;
    }
}
