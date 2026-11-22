<?php

namespace App\Http\Controllers;

use App\Models\TeamMember;
use Illuminate\View\View;

class AboutController extends Controller
{
    public function __invoke(): View
    {
        return view('pages.about', [
            'team' => TeamMember::active()->get(),
        ]);
    }
}
