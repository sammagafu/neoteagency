<?php

namespace App\Http\Controllers;

use App\Models\Insight;
use App\Models\InsightCategory;
use Illuminate\Http\Request;
use Illuminate\View\View;

class InsightController extends Controller
{
    public function index(Request $request): View
    {
        $query = Insight::published()->with('categories')->latest('published_at');

        if ($request->filled('category')) {
            $query->whereHas('categories', fn ($q) => $q->where('slug', $request->string('category')));
        }

        return view('insights.index', [
            'insights' => $query->paginate(9),
            'categories' => InsightCategory::orderBy('name')->get(),
            'activeCategory' => $request->string('category')->toString(),
        ]);
    }

    public function show(Insight $insight): View
    {
        abort_unless($insight->is_published, 404);

        $insight->increment('views');
        $insight->load('categories');

        return view('insights.show', compact('insight'));
    }
}
