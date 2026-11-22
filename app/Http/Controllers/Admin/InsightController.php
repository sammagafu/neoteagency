<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Insight;
use App\Models\InsightCategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\View\View;

class InsightController extends Controller
{
    public function index(): View
    {
        return view('admin.insights.index', [
            'insights' => Insight::with('categories')->latest()->paginate(12),
        ]);
    }

    public function create(): View
    {
        return view('admin.insights.form', [
            'insight' => new Insight(['is_published' => true, 'published_at' => now()]),
            'categories' => InsightCategory::orderBy('name')->get(),
            'selectedCategories' => [],
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $insight = Insight::create($this->validated($request));
        $insight->categories()->sync($request->input('categories', []));

        return redirect()->route('admin.insights.index')->with('success', 'Insight created.');
    }

    public function edit(Insight $insight): View
    {
        return view('admin.insights.form', [
            'insight' => $insight,
            'categories' => InsightCategory::orderBy('name')->get(),
            'selectedCategories' => $insight->categories()->pluck('insight_categories.id')->all(),
        ]);
    }

    public function update(Request $request, Insight $insight): RedirectResponse
    {
        $insight->update($this->validated($request));
        $insight->categories()->sync($request->input('categories', []));

        return redirect()->route('admin.insights.index')->with('success', 'Insight updated.');
    }

    public function destroy(Insight $insight): RedirectResponse
    {
        $insight->delete();

        return redirect()->route('admin.insights.index')->with('success', 'Insight deleted.');
    }

    private function validated(Request $request): array
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:160'],
            'excerpt' => ['nullable', 'string', 'max:500'],
            'content' => ['nullable', 'string'],
            'cover' => ['nullable', 'image', 'max:4096'],
            'is_published' => ['nullable', 'boolean'],
            'published_at' => ['nullable', 'date'],
            'categories' => ['nullable', 'array'],
            'categories.*' => ['integer', 'exists:insight_categories,id'],
        ]);

        $data['slug'] = Str::slug($data['title']);
        $data['is_published'] = $request->boolean('is_published');
        $data['published_at'] = $data['published_at'] ?? now();

        if ($request->hasFile('cover')) {
            $data['cover'] = $request->file('cover')->store('insights', 'public');
        } else {
            unset($data['cover']);
        }

        return $data;
    }
}
