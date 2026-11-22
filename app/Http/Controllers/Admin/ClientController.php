<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Client;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class ClientController extends Controller
{
    public function index(): View
    {
        return view('admin.clients.index', [
            'clients' => Client::withCount('projects')->latest()->paginate(20),
        ]);
    }

    public function create(): View
    {
        return view('admin.clients.form', [
            'client' => new Client(['is_active' => true]),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        Client::create($this->validated($request));

        return redirect()->route('admin.clients.index')->with('success', 'Client created.');
    }

    public function edit(Client $client): View
    {
        return view('admin.clients.form', compact('client'));
    }

    public function update(Request $request, Client $client): RedirectResponse
    {
        $client->update($this->validated($request));

        return redirect()->route('admin.clients.index')->with('success', 'Client updated.');
    }

    public function destroy(Client $client): RedirectResponse
    {
        $client->delete();

        return redirect()->route('admin.clients.index')->with('success', 'Client deleted.');
    }

    private function validated(Request $request): array
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'company' => ['nullable', 'string', 'max:160'],
            'email' => ['required', 'email', 'max:160'],
            'phone' => ['nullable', 'string', 'max:40'],
            'notes' => ['nullable', 'string', 'max:2000'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $data['is_active'] = $request->boolean('is_active');

        return $data;
    }
}
