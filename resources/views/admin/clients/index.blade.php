@extends('layouts.admin')
@section('heading', 'Clients')
@section('content')
    <div class="mb-6 flex items-center justify-between">
        <p class="text-sm text-mist">Clients receive automatic project reports by email.</p>
        <a href="{{ route('admin.clients.create') }}" class="btn-primary">Add client</a>
    </div>
    <div class="overflow-hidden rounded-2xl border border-ink/10 bg-white">
        <table class="min-w-full text-left text-sm">
            <thead class="border-b border-ink/10 bg-paper/60 text-xs uppercase tracking-wide text-mist">
                <tr>
                    <th class="px-4 py-3">Name</th>
                    <th class="px-4 py-3">Email</th>
                    <th class="px-4 py-3">Projects</th>
                    <th class="px-4 py-3">Active</th>
                    <th class="px-4 py-3"></th>
                </tr>
            </thead>
            <tbody>
                @forelse ($clients as $client)
                    <tr class="border-b border-ink/5">
                        <td class="px-4 py-3 font-medium">{{ $client->displayName() }}</td>
                        <td class="px-4 py-3">{{ $client->email }}</td>
                        <td class="px-4 py-3">{{ $client->projects_count }}</td>
                        <td class="px-4 py-3">{{ $client->is_active ? 'Yes' : 'No' }}</td>
                        <td class="px-4 py-3 text-right">
                            <a href="{{ route('admin.clients.edit', $client) }}" class="text-accent">Edit</a>
                            <form action="{{ route('admin.clients.destroy', $client) }}" method="POST" class="ml-3 inline" onsubmit="return confirm('Delete this client?')">
                                @csrf @method('DELETE')
                                <button class="text-red-600">Delete</button>
                            </form>
                        </td>
                    </tr>
                @empty
                    <tr><td colspan="5" class="px-4 py-8 text-mist">No clients yet.</td></tr>
                @endforelse
            </tbody>
        </table>
    </div>
    <div class="mt-6">{{ $clients->links() }}</div>
@endsection
