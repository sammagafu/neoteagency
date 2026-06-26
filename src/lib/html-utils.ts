/** Strip HTML tags for plain-text previews */
export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

export function isEmptyHtml(html: string): boolean {
  return stripHtml(html).length === 0;
}

/** Wrap plain text (legacy seed data) as a paragraph for Quill */
export function toEditorHtml(value: string): string {
  if (!value) return "";
  if (/<[a-z][\s\S]*>/i.test(value)) return value;
  return `<p>${value.replace(/\n/g, "<br>")}</p>`;
}
