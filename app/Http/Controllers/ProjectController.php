<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\ProjectCategory;
use Illuminate\Http\Request;
use Illuminate\View\View;

class ProjectController extends Controller
{
    public function index(Request $request): View
    {
        $query = Project::published()->with('categories')->orderBy('sort_order')->latest('published_at');

        if ($request->filled('category')) {
            $query->whereHas('categories', fn ($q) => $q->where('slug', $request->string('category')));
        }

        return view('projects.index', [
            'projects' => $query->paginate(9),
            'categories' => ProjectCategory::orderBy('name')->get(),
            'activeCategory' => $request->string('category')->toString(),
        ]);
    }

    public function show(Project $project): View
    {
        abort_unless($project->is_published, 404);

        $project->increment('views');
        $project->load('categories');

        $related = Project::published()
            ->where('id', '!=', $project->id)
            ->with('categories')
            ->take(3)
            ->get();

        return view('projects.show', compact('project', 'related'));
    }
}
