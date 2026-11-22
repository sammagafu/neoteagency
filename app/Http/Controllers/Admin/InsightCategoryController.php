<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\InsightCategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class InsightCategoryController extends Controller
{
    public function index(): View
    {
        return view('admin.categories.insights', [
            'categories' => InsightCategory::orderBy('name')->get(),
            'type' => 'insight',
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate(['name' => ['required', 'string', 'max:120']]);
        InsightCategory::create($data);

        return back()->with('success', 'Category created.');
    }

    public function destroy(InsightCategory $insightCategory): RedirectResponse
    {
        $insightCategory->delete();

        return back()->with('success', 'Category deleted.');
    }
}
