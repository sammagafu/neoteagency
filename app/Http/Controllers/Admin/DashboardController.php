<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\ContactMessage;
use App\Models\Insight;
use App\Models\Project;
use App\Models\ProjectReport;
use App\Models\TeamMember;
use Illuminate\View\View;

class DashboardController extends Controller
{
    public function __invoke(): View
    {
        return view('admin.dashboard', [
            'stats' => [
                'projects' => Project::count(),
                'clients' => Client::where('is_active', true)->count(),
                'reports' => ProjectReport::where('status', ProjectReport::STATUS_SENT)->count(),
                'messages' => ContactMessage::where('is_read', false)->count(),
            ],
            'recentMessages' => ContactMessage::latest()->take(5)->get(),
            'recentProjects' => Project::latest()->take(5)->get(),
            'recentReports' => ProjectReport::with('project')->latest()->take(5)->get(),
        ]);
    }
}
