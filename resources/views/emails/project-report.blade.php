<x-mail::message>
# {{ $report->periodLabel() }} project report

**Project:** {{ $project->title }}  
@if ($report->period_start && $report->period_end)
**Period:** {{ $report->period_start->format('M j, Y') }} – {{ $report->period_end->format('M j, Y') }}
@endif

{!! $report->body !!}

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
