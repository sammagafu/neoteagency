<?php

namespace App\Mail;

use App\Models\ProjectReport;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ProjectReportMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public ProjectReport $report) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: $this->report->subject,
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'emails.project-report',
            with: [
                'report' => $this->report,
                'project' => $this->report->project,
                'client' => $this->report->client,
            ],
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
