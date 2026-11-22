@extends('layouts.admin')
@section('heading', $project->exists ? 'Edit project' : 'New project')

@section('content')
    <form method="POST" enctype="multipart/form-data"
          action="{{ $project->exists ? route('admin.projects.update', $project) : route('admin.projects.store') }}"
          class="admin-card max-w-3xl space-y-5">
        @csrf
        @if ($project->exists) @method('PUT') @endif

        <div>
            <label class="admin-label" for="title">Title</label>
            <input id="title" name="title" value="{{ old('title', $project->title) }}" required class="admin-input">
            @error('title') <p class="mt-1 text-sm text-red-600">{{ $message }}</p> @enderror
        </div>
        <div class="grid gap-4 sm:grid-cols-2">
            <div>
                <label class="admin-label" for="client">Client</label>
                <input id="client" name="client" value="{{ old('client', $project->client) }}" class="admin-input">
            </div>
            <div>
                <label class="admin-label" for="skills">Skills</label>
                <input id="skills" name="skills" value="{{ old('skills', $project->skills) }}" class="admin-input">
            </div>
        </div>
        <div>
            <label class="admin-label" for="excerpt">Excerpt</label>
            <textarea id="excerpt" name="excerpt" rows="2" class="admin-input">{{ old('excerpt', $project->excerpt) }}</textarea>
        </div>
        <div>
            <label class="admin-label" for="content">Content (HTML allowed)</label>
            <textarea id="content" name="content" rows="10" class="admin-input font-mono text-sm">{{ old('content', $project->content) }}</textarea>
        </div>
        <div>
            <label class="admin-label" for="cover">Cover image</label>
            <input id="cover" name="cover" type="file" accept="image/*" class="admin-input">
            @if ($project->cover)
                <p class="mt-2 text-sm text-mist">Current: {{ $project->cover }}</p>
            @endif
        </div>
        <div>
            <label class="admin-label">Categories</label>
            <div class="mt-2 flex flex-wrap gap-3">
                @foreach ($categories as $category)
                    <label class="inline-flex items-center gap-2 text-sm">
                        <input type="checkbox" name="categories[]" value="{{ $category->id }}"
                               @checked(in_array($category->id, old('categories', $selectedCategories)))>
                        {{ $category->name }}
                    </label>
                @endforeach
            </div>
        </div>
        <div class="grid gap-4 sm:grid-cols-3">
            <div>
                <label class="admin-label" for="sort_order">Sort order</label>
                <input id="sort_order" name="sort_order" type="number" value="{{ old('sort_order', $project->sort_order ?? 0) }}" class="admin-input">
            </div>
            <div>
                <label class="admin-label" for="published_at">Published at</label>
                <input id="published_at" name="published_at" type="datetime-local"
                       value="{{ old('published_at', optional($project->published_at)->format('Y-m-d\TH:i')) }}" class="admin-input">
            </div>
            <div class="flex flex-col justify-end gap-2 pb-1">
                <label class="inline-flex items-center gap-2 text-sm"><input type="checkbox" name="is_published" value="1" @checked(old('is_published', $project->is_published))> Published</label>
                <label class="inline-flex items-center gap-2 text-sm"><input type="checkbox" name="is_featured" value="1" @checked(old('is_featured', $project->is_featured))> Featured</label>
            </div>
        </div>
        <div class="flex gap-3">
            <button class="btn-primary" type="submit">Save</button>
            <a href="{{ route('admin.projects.index') }}" class="btn-secondary">Cancel</a>
        </div>
    </form>
@endsection
