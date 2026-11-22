@extends('layouts.admin')
@section('heading', 'Team')
@section('content')
    <div class="mb-6 flex items-center justify-between">
        <p class="text-sm text-mist">People shown on the About page.</p>
        <a href="{{ route('admin.team.create') }}" class="btn-primary">Add member</a>
    </div>
    <div class="overflow-hidden rounded-2xl border border-ink/10 bg-white">
        <table class="min-w-full text-left text-sm">
            <thead class="border-b border-ink/10 bg-paper/60 text-xs uppercase tracking-wide text-mist">
                <tr>
                    <th class="px-4 py-3">Name</th>
                    <th class="px-4 py-3">Role</th>
                    <th class="px-4 py-3">Active</th>
                    <th class="px-4 py-3"></th>
                </tr>
            </thead>
            <tbody>
                @foreach ($members as $member)
                    <tr class="border-b border-ink/5">
                        <td class="px-4 py-3 font-medium">{{ $member->name }}</td>
                        <td class="px-4 py-3">{{ $member->role }}</td>
                        <td class="px-4 py-3">{{ $member->is_active ? 'Yes' : 'No' }}</td>
                        <td class="px-4 py-3 text-right">
                            <a href="{{ route('admin.team.edit', $member) }}" class="text-accent">Edit</a>
                            <form action="{{ route('admin.team.destroy', $member) }}" method="POST" class="ml-3 inline" onsubmit="return confirm('Remove this member?')">
                                @csrf @method('DELETE')
                                <button class="text-red-600">Delete</button>
                            </form>
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
    <div class="mt-6">{{ $members->links() }}</div>
@endsection
