<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->foreignId('client_id')->nullable()->after('id')->constrained()->nullOnDelete();
            $table->boolean('auto_weekly_report')->default(false)->after('published_at');
            $table->boolean('auto_monthly_report')->default(false)->after('auto_weekly_report');
            $table->text('report_summary')->nullable()->after('auto_monthly_report');
            $table->string('report_status')->nullable()->after('report_summary');
            $table->unsignedTinyInteger('progress_percent')->default(0)->after('report_status');
        });
    }

    public function down(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->dropConstrainedForeignId('client_id');
            $table->dropColumn([
                'auto_weekly_report',
                'auto_monthly_report',
                'report_summary',
                'report_status',
                'progress_percent',
            ]);
        });
    }
};
