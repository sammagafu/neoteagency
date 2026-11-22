@extends('layouts.admin')
@section('heading', $service->exists ? 'Edit service' : 'New service')

@section('content')
    <form method="POST"
          action="{{ $service->exists ? route('admin.services.update', $service) : route('admin.services.store') }}"
          class="admin-card max-w-2xl space-y-5">
        @csrf
        @if ($service->exists) @method('PUT') @endif
        <div>
            <label class="admin-label" for="title">Title</label>
            <input id="title" name="title" value="{{ old('title', $service->title) }}" required class="admin-input">
        </div>
        <div>
            <label class="admin-label" for="description">Description</label>
            <textarea id="description" name="description" rows="3" class="admin-input">{{ old('description', $service->description) }}</textarea>
        </div>
        <div>
            <label class="admin-label" for="items_text">Items (one per line)</label>
            <textarea id="items_text" name="items_text" rows="6" class="admin-input">{{ old('items_text', collect($service->items ?? [])->implode("\n")) }}</textarea>
        </div>
        <div class="grid gap-4 sm:grid-cols-2">
            <div>
                <label class="admin-label" for="sort_order">Sort order</label>
                <input id="sort_order" name="sort_order" type="number" value="{{ old('sort_order', $service->sort_order ?? 0) }}" class="admin-input">
            </div>
            <div class="flex items-end pb-2">
                <label class="inline-flex items-center gap-2 text-sm"><input type="checkbox" name="is_active" value="1" @checked(old('is_active', $service->is_active))> Active</label>
            </div>
        </div>
        <div class="flex gap-3">
            <button class="btn-primary" type="submit">Save</button>
            <a href="{{ route('admin.services.index') }}" class="btn-secondary">Cancel</a>
        </div>
    </form>
@endsection
