@extends('layouts.admin')
@section('heading', 'Message')

@section('content')
    <div class="admin-card max-w-3xl space-y-4">
        <div>
            <p class="text-xs uppercase tracking-wide text-mist">From</p>
            <p class="font-medium">{{ $message->name }} · <a href="mailto:{{ $message->email }}" class="text-accent">{{ $message->email }}</a></p>
        </div>
        @if ($message->organization)
            <div>
                <p class="text-xs uppercase tracking-wide text-mist">Organization</p>
                <p>{{ $message->organization }}</p>
            </div>
        @endif
        @if ($message->phone)
            <div>
                <p class="text-xs uppercase tracking-wide text-mist">Phone</p>
                <p>{{ $message->phone }}</p>
            </div>
        @endif
        <div>
            <p class="text-xs uppercase tracking-wide text-mist">Message</p>
            <p class="mt-1 whitespace-pre-wrap leading-relaxed">{{ $message->message }}</p>
        </div>
        <div class="flex gap-3 pt-2">
            <a href="{{ route('admin.messages.index') }}" class="btn-secondary">Back</a>
            <form action="{{ route('admin.messages.destroy', $message) }}" method="POST" onsubmit="return confirm('Delete this message?')">
                @csrf @method('DELETE')
                <button class="btn-primary bg-red-600 hover:bg-red-700" type="submit">Delete</button>
            </form>
        </div>
    </div>
@endsection
