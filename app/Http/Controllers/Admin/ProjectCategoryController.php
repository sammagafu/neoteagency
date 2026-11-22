<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ProjectCategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class ProjectCategoryController extends Controller
{
    public function index(): View
    {
        return view('admin.categories.projects', [
            'categories' => ProjectCategory::orderBy('name')->get(),
            'type' => 'project',
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate(['name' => ['required', 'string', 'max:120']]);
        ProjectCategory::create($data);

        return back()->with('success', 'Category created.');
    }

    public function destroy(ProjectCategory $projectCategory): RedirectResponse
    {
        $projectCategory->delete();

        return back()->with('success', 'Category deleted.');
    }
}
