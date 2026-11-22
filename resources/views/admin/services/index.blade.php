@extends('layouts.admin')
@section('heading', 'Services')
@section('content')
    <div class="mb-6 flex items-center justify-between">
        <p class="text-sm text-mist">Capability groups on the homepage.</p>
        <a href="{{ route('admin.services.create') }}" class="btn-primary">New service</a>
    </div>
    <div class="overflow-hidden rounded-2xl border border-ink/10 bg-white">
        <table class="min-w-full text-left text-sm">
            <thead class="border-b border-ink/10 bg-paper/60 text-xs uppercase tracking-wide text-mist">
                <tr>
                    <th class="px-4 py-3">Title</th>
                    <th class="px-4 py-3">Order</th>
                    <th class="px-4 py-3">Active</th>
                    <th class="px-4 py-3"></th>
                </tr>
            </thead>
            <tbody>
                @foreach ($services as $service)
                    <tr class="border-b border-ink/5">
                        <td class="px-4 py-3 font-medium">{{ $service->title }}</td>
                        <td class="px-4 py-3">{{ $service->sort_order }}</td>
                        <td class="px-4 py-3">{{ $service->is_active ? 'Yes' : 'No' }}</td>
                        <td class="px-4 py-3 text-right">
                            <a href="{{ route('admin.services.edit', $service) }}" class="text-accent">Edit</a>
                            <form action="{{ route('admin.services.destroy', $service) }}" method="POST" class="ml-3 inline" onsubmit="return confirm('Delete this service?')">
                                @csrf @method('DELETE')
                                <button class="text-red-600">Delete</button>
                            </form>
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
@endsection
