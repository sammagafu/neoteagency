<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\View\View;

class ServiceController extends Controller
{
    public function index(): View
    {
        return view('admin.services.index', [
            'services' => Service::orderBy('sort_order')->paginate(20),
        ]);
    }

    public function create(): View
    {
        return view('admin.services.form', [
            'service' => new Service(['is_active' => true, 'sort_order' => 0, 'items' => []]),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        Service::create($this->validated($request));

        return redirect()->route('admin.services.index')->with('success', 'Service created.');
    }

    public function edit(Service $service): View
    {
        return view('admin.services.form', compact('service'));
    }

    public function update(Request $request, Service $service): RedirectResponse
    {
        $service->update($this->validated($request));

        return redirect()->route('admin.services.index')->with('success', 'Service updated.');
    }

    public function destroy(Service $service): RedirectResponse
    {
        $service->delete();

        return redirect()->route('admin.services.index')->with('success', 'Service deleted.');
    }

    private function validated(Request $request): array
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:120'],
            'description' => ['nullable', 'string'],
            'items_text' => ['nullable', 'string'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $items = collect(preg_split('/\r\n|\r|\n/', (string) ($data['items_text'] ?? '')))
            ->map(fn ($line) => trim($line))
            ->filter()
            ->values()
            ->all();

        return [
            'title' => $data['title'],
            'slug' => Str::slug($data['title']),
            'description' => $data['description'] ?? null,
            'items' => $items,
            'sort_order' => $data['sort_order'] ?? 0,
            'is_active' => $request->boolean('is_active'),
        ];
    }
}
