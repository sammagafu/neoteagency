@extends('layouts.admin')
@section('heading', $member->exists ? 'Edit team member' : 'Add team member')

@section('content')
    <form method="POST" enctype="multipart/form-data"
          action="{{ $member->exists ? route('admin.team.update', $member) : route('admin.team.store') }}"
          class="admin-card max-w-2xl space-y-5">
        @csrf
        @if ($member->exists) @method('PUT') @endif
        <div>
            <label class="admin-label" for="name">Name</label>
            <input id="name" name="name" value="{{ old('name', $member->name) }}" required class="admin-input">
        </div>
        <div>
            <label class="admin-label" for="role">Role</label>
            <input id="role" name="role" value="{{ old('role', $member->role) }}" required class="admin-input">
        </div>
        <div>
            <label class="admin-label" for="bio">Bio</label>
            <textarea id="bio" name="bio" rows="3" class="admin-input">{{ old('bio', $member->bio) }}</textarea>
        </div>
        <div>
            <label class="admin-label" for="photo">Photo</label>
            <input id="photo" name="photo" type="file" accept="image/*" class="admin-input">
        </div>
        <div class="grid gap-4 sm:grid-cols-2">
            <div>
                <label class="admin-label" for="sort_order">Sort order</label>
                <input id="sort_order" name="sort_order" type="number" value="{{ old('sort_order', $member->sort_order ?? 0) }}" class="admin-input">
            </div>
            <div class="flex items-end pb-2">
                <label class="inline-flex items-center gap-2 text-sm"><input type="checkbox" name="is_active" value="1" @checked(old('is_active', $member->is_active))> Active</label>
            </div>
        </div>
        <div class="flex gap-3">
            <button class="btn-primary" type="submit">Save</button>
            <a href="{{ route('admin.team.index') }}" class="btn-secondary">Cancel</a>
        </div>
    </form>
@endsection
