type RichTextProps = {
  html: string;
  className?: string;
};

export function RichText({ html, className = "" }: RichTextProps) {
  if (!html || html === "<p><br></p>") return null;

  return (
    <div
      className={`rich-text ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
