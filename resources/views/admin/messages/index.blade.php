@extends('layouts.admin')
@section('heading', 'Messages')
@section('content')
    <div class="overflow-hidden rounded-2xl border border-ink/10 bg-white">
        <table class="min-w-full text-left text-sm">
            <thead class="border-b border-ink/10 bg-paper/60 text-xs uppercase tracking-wide text-mist">
                <tr>
                    <th class="px-4 py-3">From</th>
                    <th class="px-4 py-3">Email</th>
                    <th class="px-4 py-3">Received</th>
                    <th class="px-4 py-3"></th>
                </tr>
            </thead>
            <tbody>
                @forelse ($messages as $message)
                    <tr class="border-b border-ink/5 {{ $message->is_read ? '' : 'bg-accent-soft/40' }}">
                        <td class="px-4 py-3 font-medium">{{ $message->name }}</td>
                        <td class="px-4 py-3">{{ $message->email }}</td>
                        <td class="px-4 py-3">{{ $message->created_at->format('M j, Y H:i') }}</td>
                        <td class="px-4 py-3 text-right">
                            <a href="{{ route('admin.messages.show', $message) }}" class="text-accent">Open</a>
                        </td>
                    </tr>
                @empty
                    <tr><td colspan="4" class="px-4 py-8 text-mist">No messages yet.</td></tr>
                @endforelse
            </tbody>
        </table>
    </div>
    <div class="mt-6">{{ $messages->links() }}</div>
@endsection
