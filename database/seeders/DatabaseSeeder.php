<?php

namespace Database\Seeders;

use App\Models\Client;
use App\Models\Insight;
use App\Models\InsightCategory;
use App\Models\Project;
use App\Models\ProjectCategory;
use App\Models\Service;
use App\Models\SiteSetting;
use App\Models\TeamMember;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::query()->updateOrCreate(
            ['email' => 'admin@neotelabs.com'],
            [
                'name' => 'Neote Admin',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );

        SiteSetting::setMany([
            'site_name' => 'Neotelabs',
            'tagline' => 'We innovate',
            'hero_headline' => 'We narrow the gap between Products & Customers',
            'hero_subheadline' => 'A digital studio in Dar es Salaam crafting strategy, brand, and technology that moves markets.',
            'about_blurb' => 'We are a digital service agency. We are a young and creative team dedicated to raise the bar of your product just a bit higher to the top position in the market.',
            'email' => 'info@neotelabs.com',
            'phone' => '+255766328259',
            'address' => 'Warioba streets, Mwai Kibaki road. Dar es Salaam, Tanzania',
            'twitter' => 'https://twitter.com',
            'facebook' => 'https://facebook.com',
            'instagram' => 'https://instagram.com',
            'linkedin' => 'https://linkedin.com',
        ]);

        $services = [
            [
                'title' => 'Strategy',
                'description' => 'Clarity before craft. We align goals, audience, and offer so every decision has direction.',
                'items' => ['Goal Alignment', 'Product Positioning', 'Target Audience', 'Value Proposition / USP', 'Customer Road Map', 'Online Marketing Strategy'],
                'sort_order' => 1,
            ],
            [
                'title' => 'Branding & Design',
                'description' => 'Visual systems and product experiences that feel inevitable for your brand.',
                'items' => ['Brand Identity', 'Graphic Design', 'Product Design', 'UI & UX Design', 'Customer Experience Design'],
                'sort_order' => 2,
            ],
            [
                'title' => 'Technology',
                'description' => 'Robust, maintainable builds with performance and craft baked in from day one.',
                'items' => ['Technical Strategy', 'Full-Stack Development', 'Quality Assurance', 'Interactive Prototyping', 'Applications Development'],
                'sort_order' => 3,
            ],
            [
                'title' => 'Content Creations',
                'description' => 'Stories and channels that earn attention and keep customers coming back.',
                'items' => ['Content strategy', 'Social Media Channels', 'Copywriting', 'Story Telling'],
                'sort_order' => 4,
            ],
        ];

        foreach ($services as $service) {
            Service::query()->updateOrCreate(
                ['slug' => \Illuminate\Support\Str::slug($service['title'])],
                array_merge($service, ['is_active' => true])
            );
        }

        $uiux = ProjectCategory::query()->firstOrCreate(['name' => 'UI/UX']);
        $product = ProjectCategory::query()->firstOrCreate(['name' => 'Product']);
        $branding = ProjectCategory::query()->firstOrCreate(['name' => 'Branding']);
        $illustration = ProjectCategory::query()->firstOrCreate(['name' => 'Illustration']);

        $tasklyClient = Client::query()->updateOrCreate(
            ['email' => 'hello@taskly.example'],
            ['name' => 'Amina Okello', 'company' => 'Taskly', 'phone' => '+255700000001', 'is_active' => true]
        );
        $cityArtsClient = Client::query()->updateOrCreate(
            ['email' => 'ops@cityarts.example'],
            ['name' => 'James Mushi', 'company' => 'City Arts', 'phone' => '+255700000002', 'is_active' => true]
        );

        $projects = [
            ['title' => 'Taskly Dashboard', 'client' => 'Taskly', 'client_id' => $tasklyClient->id, 'skills' => 'UI/UX, Product Design', 'cover' => 'images/portfolio/work-1.png', 'categories' => [$uiux->id], 'featured' => true, 'weekly' => true, 'monthly' => true, 'progress' => 72, 'status' => 'In progress', 'summary' => 'Shipped the analytics widgets and tightened mobile navigation. Next: onboarding flow QA.'],
            ['title' => 'Film & Art Festival', 'client' => 'City Arts', 'client_id' => $cityArtsClient->id, 'skills' => 'Product, Branding', 'cover' => 'images/portfolio/work-2.png', 'categories' => [$product->id], 'featured' => true, 'weekly' => true, 'monthly' => false, 'progress' => 55, 'status' => 'Design review', 'summary' => 'Festival landing page and ticketing UX locked. Content migration starts next week.'],
            ['title' => 'Dark Wishky Wine', 'client' => 'Wishky', 'client_id' => null, 'skills' => 'Branding, Packaging', 'cover' => 'images/portfolio/work-3.png', 'categories' => [$branding->id], 'featured' => true, 'weekly' => false, 'monthly' => false, 'progress' => 100, 'status' => 'Launched', 'summary' => 'Brand system delivered and signed off.'],
            ['title' => 'Swiss Style Poster', 'client' => 'Studio Swiss', 'client_id' => null, 'skills' => 'Illustration', 'cover' => 'images/portfolio/work-4.png', 'categories' => [$illustration->id], 'featured' => false, 'weekly' => false, 'monthly' => false, 'progress' => 40, 'status' => 'In progress', 'summary' => null],
            ['title' => 'Liarch Architecture Firm', 'client' => 'Liarch', 'client_id' => null, 'skills' => 'UI/UX, Web', 'cover' => 'images/portfolio/work-5.png', 'categories' => [$uiux->id], 'featured' => false, 'weekly' => false, 'monthly' => false, 'progress' => 30, 'status' => 'Discovery', 'summary' => null],
            ['title' => 'FG Print Brand', 'client' => 'FG Print', 'client_id' => null, 'skills' => 'Branding, Motion', 'cover' => 'images/portfolio/work-6.png', 'categories' => [$branding->id], 'featured' => false, 'weekly' => false, 'monthly' => false, 'progress' => 20, 'status' => 'Kickoff', 'summary' => null],
        ];

        foreach ($projects as $index => $item) {
            $project = Project::query()->updateOrCreate(
                ['slug' => \Illuminate\Support\Str::slug($item['title'])],
                [
                    'title' => $item['title'],
                    'client' => $item['client'],
                    'client_id' => $item['client_id'],
                    'skills' => $item['skills'],
                    'cover' => $item['cover'],
                    'excerpt' => 'Creativity is at the heart of this engagement — strategy, design, and craft working as one.',
                    'content' => '<p>We partnered with '.$item['client'].' to define the problem, shape the concept, and ship a polished digital experience. Research informed every milestone. Design systems kept the work coherent. Engineering delivered with performance and maintainability in mind.</p><p>The result is a product experience that feels intentional — clear for customers, distinctive in market, and ready to scale.</p>',
                    'is_featured' => $item['featured'],
                    'is_published' => true,
                    'sort_order' => $index + 1,
                    'published_at' => now()->subDays(30 - $index),
                    'auto_weekly_report' => $item['weekly'],
                    'auto_monthly_report' => $item['monthly'],
                    'progress_percent' => $item['progress'],
                    'report_status' => $item['status'],
                    'report_summary' => $item['summary'],
                ]
            );
            $project->categories()->sync($item['categories']);
        }

        $growth = InsightCategory::query()->firstOrCreate(['name' => 'Growth']);
        $design = InsightCategory::query()->firstOrCreate(['name' => 'Design']);
        $tech = InsightCategory::query()->firstOrCreate(['name' => 'Technology']);

        $insights = [
            [
                'title' => 'Closing the gap between product and customer',
                'excerpt' => 'Why the strongest digital products begin with audience truth — not feature lists.',
                'cover' => 'images/portfolio/work-1.png',
                'categories' => [$growth->id],
            ],
            [
                'title' => 'Design systems that survive real teams',
                'excerpt' => 'How to keep brand consistency without slowing product velocity.',
                'cover' => 'images/portfolio/work-2.png',
                'categories' => [$design->id],
            ],
            [
                'title' => 'Building for cPanel without compromising craft',
                'excerpt' => 'A practical look at shipping modern Laravel experiences on shared hosting.',
                'cover' => 'images/portfolio/work-3.png',
                'categories' => [$tech->id],
            ],
        ];

        foreach ($insights as $index => $item) {
            $insight = Insight::query()->updateOrCreate(
                ['slug' => \Illuminate\Support\Str::slug($item['title'])],
                [
                    'title' => $item['title'],
                    'excerpt' => $item['excerpt'],
                    'cover' => $item['cover'],
                    'content' => '<p>'.$item['excerpt'].'</p><p>At Neotelabs we treat insight as a working tool — something that shapes briefs, critiques, and launches. This piece captures how we think about the problem and the moves that tend to work in market.</p>',
                    'is_published' => true,
                    'published_at' => now()->subDays(10 - $index),
                ]
            );
            $insight->categories()->sync($item['categories']);
        }

        $team = [
            ['name' => 'Stephan Bowie', 'role' => 'Designer', 'photo' => 'images/team/team-1-m.png', 'sort_order' => 1],
            ['name' => 'Robert Downey Jr', 'role' => 'Developer', 'photo' => 'images/team/team-2-m.png', 'sort_order' => 2],
            ['name' => 'Laura Cox', 'role' => 'Strategy Lead', 'photo' => 'images/team/team-3-m.png', 'sort_order' => 3],
            ['name' => 'Alex Rivera', 'role' => 'Product Designer', 'photo' => 'images/team/team-4-m.png', 'sort_order' => 4],
        ];

        foreach ($team as $member) {
            TeamMember::query()->updateOrCreate(
                ['name' => $member['name']],
                array_merge($member, [
                    'bio' => 'Part of the Neotelabs crew — creative, go-getter, results-obsessed.',
                    'is_active' => true,
                ])
            );
        }
    }
}
