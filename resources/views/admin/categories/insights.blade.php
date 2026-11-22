@extends('layouts.admin')
@section('heading', 'Insight categories')

@section('content')
    <div class="grid gap-6 lg:grid-cols-2">
        <form method="POST" action="{{ route('admin.insight-categories.store') }}" class="admin-card space-y-4">
            @csrf
            <div>
                <label class="admin-label" for="name">Category name</label>
                <input id="name" name="name" required class="admin-input">
            </div>
            <button class="btn-primary" type="submit">Add category</button>
        </form>
        <div class="admin-card">
            <ul class="divide-y divide-ink/10">
                @forelse ($categories as $category)
                    <li class="flex items-center justify-between py-3">
                        <span>{{ $category->name }}</span>
                        <form method="POST" action="{{ route('admin.insight-categories.destroy', $category) }}" onsubmit="return confirm('Delete category?')">
                            @csrf @method('DELETE')
                            <button class="text-sm text-red-600">Delete</button>
                        </form>
                    </li>
                @empty
                    <li class="py-3 text-sm text-mist">No categories yet.</li>
                @endforelse
            </ul>
        </div>
    </div>
@endsection
