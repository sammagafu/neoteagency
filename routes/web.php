<?php

use App\Http\Controllers\AboutController;
use App\Http\Controllers\Admin\ContactMessageController as AdminMessageController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\InsightCategoryController as AdminInsightCategoryController;
use App\Http\Controllers\Admin\InsightController as AdminInsightController;
use App\Http\Controllers\Admin\ProjectCategoryController as AdminProjectCategoryController;
use App\Http\Controllers\Admin\ProjectController as AdminProjectController;
use App\Http\Controllers\Admin\ServiceController as AdminServiceController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\TeamMemberController as AdminTeamController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\InsightController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use Illuminate\Support\Facades\Route;

Route::get('/', HomeController::class)->name('home');
Route::get('/about', AboutController::class)->name('about');
Route::get('/contact', [ContactController::class, 'show'])->name('contact');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

Route::get('/case-study', [ProjectController::class, 'index'])->name('projects.index');
Route::get('/case-study/{project:slug}', [ProjectController::class, 'show'])->name('projects.show');

Route::get('/insights', [InsightController::class, 'index'])->name('insights.index');
Route::get('/insights/{insight:slug}', [InsightController::class, 'show'])->name('insights.show');

Route::get('/dashboard', fn () => redirect()->route('admin.dashboard'))
    ->middleware('auth')
    ->name('dashboard');

Route::middleware(['auth'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', DashboardController::class)->name('dashboard');

    Route::resource('projects', AdminProjectController::class)->except(['show']);
    Route::resource('insights', AdminInsightController::class)->except(['show']);
    Route::resource('team', AdminTeamController::class)->except(['show']);
    Route::resource('services', AdminServiceController::class)->except(['show']);

    Route::get('project-categories', [AdminProjectCategoryController::class, 'index'])->name('project-categories.index');
    Route::post('project-categories', [AdminProjectCategoryController::class, 'store'])->name('project-categories.store');
    Route::delete('project-categories/{projectCategory}', [AdminProjectCategoryController::class, 'destroy'])->name('project-categories.destroy');

    Route::get('insight-categories', [AdminInsightCategoryController::class, 'index'])->name('insight-categories.index');
    Route::post('insight-categories', [AdminInsightCategoryController::class, 'store'])->name('insight-categories.store');
    Route::delete('insight-categories/{insightCategory}', [AdminInsightCategoryController::class, 'destroy'])->name('insight-categories.destroy');

    Route::get('messages', [AdminMessageController::class, 'index'])->name('messages.index');
    Route::get('messages/{message}', [AdminMessageController::class, 'show'])->name('messages.show');
    Route::delete('messages/{message}', [AdminMessageController::class, 'destroy'])->name('messages.destroy');

    Route::get('settings', [SettingController::class, 'edit'])->name('settings.edit');
    Route::put('settings', [SettingController::class, 'update'])->name('settings.update');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
