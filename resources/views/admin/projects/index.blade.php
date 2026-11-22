@extends('layouts.admin')
@section('heading', 'Projects')
@section('content')
    <div class="mb-6 flex items-center justify-between">
        <p class="text-sm text-mist">Case studies shown on the public site.</p>
        <a href="{{ route('admin.projects.create') }}" class="btn-primary">New project</a>
    </div>
    <div class="overflow-hidden rounded-2xl border border-ink/10 bg-white">
        <table class="min-w-full text-left text-sm">
            <thead class="border-b border-ink/10 bg-paper/60 text-xs uppercase tracking-wide text-mist">
                <tr>
                    <th class="px-4 py-3">Title</th>
                    <th class="px-4 py-3">Status</th>
                    <th class="px-4 py-3">Featured</th>
                    <th class="px-4 py-3"></th>
                </tr>
            </thead>
            <tbody>
                @foreach ($projects as $project)
                    <tr class="border-b border-ink/5">
                        <td class="px-4 py-3 font-medium">{{ $project->title }}</td>
                        <td class="px-4 py-3">{{ $project->is_published ? 'Published' : 'Draft' }}</td>
                        <td class="px-4 py-3">{{ $project->is_featured ? 'Yes' : 'No' }}</td>
                        <td class="px-4 py-3 text-right">
                            <a href="{{ route('admin.projects.edit', $project) }}" class="text-accent">Edit</a>
                            <form action="{{ route('admin.projects.destroy', $project) }}" method="POST" class="ml-3 inline" onsubmit="return confirm('Delete this project?')">
                                @csrf @method('DELETE')
                                <button class="text-red-600">Delete</button>
                            </form>
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
    <div class="mt-6">{{ $projects->links() }}</div>
@endsection
