@extends('layouts.admin')
@section('heading', $client->exists ? 'Edit client' : 'Add client')

@section('content')
    <form method="POST"
          action="{{ $client->exists ? route('admin.clients.update', $client) : route('admin.clients.store') }}"
          class="admin-card max-w-2xl space-y-5">
        @csrf
        @if ($client->exists) @method('PUT') @endif
        <div>
            <label class="admin-label" for="name">Contact name</label>
            <input id="name" name="name" value="{{ old('name', $client->name) }}" required class="admin-input">
        </div>
        <div>
            <label class="admin-label" for="company">Company</label>
            <input id="company" name="company" value="{{ old('company', $client->company) }}" class="admin-input">
        </div>
        <div class="grid gap-4 sm:grid-cols-2">
            <div>
                <label class="admin-label" for="email">Email</label>
                <input id="email" name="email" type="email" value="{{ old('email', $client->email) }}" required class="admin-input">
            </div>
            <div>
                <label class="admin-label" for="phone">Phone</label>
                <input id="phone" name="phone" value="{{ old('phone', $client->phone) }}" class="admin-input">
            </div>
        </div>
        <div>
            <label class="admin-label" for="notes">Notes</label>
            <textarea id="notes" name="notes" rows="3" class="admin-input">{{ old('notes', $client->notes) }}</textarea>
        </div>
        <label class="inline-flex items-center gap-2 text-sm"><input type="checkbox" name="is_active" value="1" @checked(old('is_active', $client->is_active))> Active</label>
        <div class="flex gap-3">
            <button class="btn-primary" type="submit">Save</button>
            <a href="{{ route('admin.clients.index') }}" class="btn-secondary">Cancel</a>
        </div>
    </form>
@endsection
