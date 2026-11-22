@extends('layouts.admin')
@section('heading', 'Site settings')
@section('subheading', 'Update public site copy and contact details')

@section('content')
    <form method="POST" action="{{ route('admin.settings.update') }}" class="admin-card max-w-3xl space-y-5">
        @csrf
        @method('PUT')

        @foreach ([
            'site_name' => 'Site name',
            'tagline' => 'Tagline',
            'hero_headline' => 'Hero headline',
            'hero_subheadline' => 'Hero subheadline',
            'about_blurb' => 'About blurb',
            'email' => 'Email',
            'phone' => 'Phone',
            'address' => 'Address',
            'twitter' => 'Twitter URL',
            'facebook' => 'Facebook URL',
            'instagram' => 'Instagram URL',
            'linkedin' => 'LinkedIn URL',
        ] as $key => $label)
            <div>
                <label class="admin-label" for="{{ $key }}">{{ $label }}</label>
                @if (in_array($key, ['hero_subheadline', 'about_blurb', 'address']))
                    <textarea id="{{ $key }}" name="{{ $key }}" rows="3" class="admin-input">{{ old($key, $settings[$key] ?? '') }}</textarea>
                @else
                    <input id="{{ $key }}" name="{{ $key }}" value="{{ old($key, $settings[$key] ?? '') }}" class="admin-input" @if($key==='site_name') required @endif>
                @endif
                @error($key) <p class="mt-1 text-sm text-red-600">{{ $message }}</p> @enderror
            </div>
        @endforeach

        <button type="submit" class="btn-primary">Save settings</button>
    </form>
@endsection
