import nodemailer from "nodemailer";
import { contactInfo } from "@/lib/site-data";

export type ContactFormPayload = {
  name: string;
  email: string;
  company: string;
  details: string;
  budget: string;
};

function getTransport() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  const port = Number(process.env.SMTP_PORT || 587);
  const rejectUnauthorized = process.env.SMTP_TLS_REJECT_UNAUTHORIZED === "true";

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    tls: {
      servername: host,
      rejectUnauthorized,
    },
  });
}

function getFromAddress() {
  return process.env.SMTP_FROM || contactInfo.email;
}

function getInboxAddress() {
  return process.env.CONTACT_TO || contactInfo.email;
}

export function isEmailConfigured() {
  return getTransport() !== null;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildAdminHtml(data: ContactFormPayload) {
  return `
    <h2>New contact form submission</h2>
    <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
    <p><strong>Company:</strong> ${escapeHtml(data.company || "—")}</p>
    <p><strong>Budget:</strong> ${escapeHtml(data.budget || "—")}</p>
    <p><strong>Project details:</strong></p>
    <p>${escapeHtml(data.details).replaceAll("\n", "<br />")}</p>
  `;
}

function buildUserHtml(data: ContactFormPayload) {
  return `
    <p>Hi ${escapeHtml(data.name)},</p>
    <p>Thank you for contacting Neotelabs. We've received your message and will get back to you within 24 hours.</p>
    <p><strong>Here's a copy of what you sent:</strong></p>
    <blockquote style="border-left:3px solid #e11d2e;padding-left:16px;margin:16px 0;">
      ${escapeHtml(data.details).replaceAll("\n", "<br />")}
    </blockquote>
    <p><strong>Company:</strong> ${escapeHtml(data.company || "—")}<br />
    <strong>Budget:</strong> ${escapeHtml(data.budget || "—")}</p>
    <p>Best regards,<br />The Neotelabs Team<br />
    <a href="mailto:${contactInfo.email}">${contactInfo.email}</a><br />
    ${contactInfo.phone}</p>
  `;
}

export async function sendContactEmails(data: ContactFormPayload) {
  const transport = getTransport();
  if (!transport) {
    throw new Error("Email service is not configured.");
  }

  const from = getFromAddress();
  const inbox = getInboxAddress();

  await transport.sendMail({
    from: `Neotelabs <${from}>`,
    to: inbox,
    replyTo: data.email,
    subject: `New enquiry from ${data.name}`,
    text: [
      "New contact form submission",
      "",
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Company: ${data.company || "—"}`,
      `Budget: ${data.budget || "—"}`,
      "",
      "Project details:",
      data.details,
    ].join("\n"),
    html: buildAdminHtml(data),
  });

  await transport.sendMail({
    from: `Neotelabs <${from}>`,
    to: data.email,
    replyTo: inbox,
    subject: "We received your message — Neotelabs",
    text: [
      `Hi ${data.name},`,
      "",
      "Thank you for contacting Neotelabs. We've received your message and will get back to you within 24 hours.",
      "",
      "Here's a copy of what you sent:",
      "",
      data.details,
      "",
      `Company: ${data.company || "—"}`,
      `Budget: ${data.budget || "—"}`,
      "",
      "Best regards,",
      "The Neotelabs Team",
      contactInfo.email,
      contactInfo.phone,
    ].join("\n"),
    html: buildUserHtml(data),
  });
}
