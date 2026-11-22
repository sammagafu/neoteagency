<?php

namespace Tests\Feature;

use App\Models\Client;
use App\Models\Project;
use App\Models\ProjectReport;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class ProjectReportTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_create_and_send_a_manual_report(): void
    {
        Mail::fake();

        $admin = User::factory()->create();
        $client = Client::query()->create([
            'name' => 'Amina',
            'company' => 'Taskly',
            'email' => 'amina@taskly.test',
            'is_active' => true,
        ]);
        $project = Project::query()->create([
            'title' => 'Taskly Dashboard',
            'slug' => 'taskly-dashboard',
            'client_id' => $client->id,
            'client' => 'Taskly',
            'is_published' => true,
            'progress_percent' => 60,
            'report_status' => 'In progress',
            'report_summary' => 'Shipped widgets.',
        ]);

        $response = $this->actingAs($admin)->post(route('admin.reports.store'), [
            'project_id' => $project->id,
            'period_type' => 'manual',
            'send_now' => '1',
        ]);

        $report = ProjectReport::query()->first();
        $this->assertNotNull($report);
        $response->assertRedirect(route('admin.reports.show', $report));
        $this->assertSame(ProjectReport::STATUS_SENT, $report->fresh()->status);
    }

    public function test_scheduled_weekly_command_sends_enabled_projects(): void
    {
        Mail::fake();

        $client = Client::query()->create([
            'name' => 'James',
            'company' => 'City Arts',
            'email' => 'james@cityarts.test',
            'is_active' => true,
        ]);

        Project::query()->create([
            'title' => 'Festival Site',
            'slug' => 'festival-site',
            'client_id' => $client->id,
            'auto_weekly_report' => true,
            'is_published' => true,
            'progress_percent' => 40,
            'report_summary' => 'Ticketing UX locked.',
        ]);

        $this->artisan('reports:send-scheduled', ['period' => 'weekly', '--sync' => true])
            ->assertSuccessful();

        $this->assertDatabaseCount('project_reports', 1);
        $this->assertSame(ProjectReport::STATUS_SENT, ProjectReport::query()->first()->status);
    }
}
