<?php

namespace App\Http\Controllers;

use App\Models\Insight;
use App\Models\Project;
use App\Models\Service;
use Illuminate\View\View;

class HomeController extends Controller
{
    public function __invoke(): View
    {
        return view('pages.home', [
            'services' => Service::active()->take(6)->get(),
            'projects' => Project::published()
                ->with('categories')
                ->orderByDesc('is_featured')
                ->orderBy('sort_order')
                ->orderByDesc('published_at')
                ->take(3)
                ->get(),
            'insights' => Insight::published()
                ->with('categories')
                ->latest('published_at')
                ->take(3)
                ->get(),
        ]);
    }
}
