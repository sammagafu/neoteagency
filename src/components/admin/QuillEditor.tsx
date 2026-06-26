"use client";

import { useEffect, useRef } from "react";
import { isEmptyHtml, toEditorHtml } from "@/lib/html-utils";

type QuillEditorProps = {
  name: string;
  label?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
};

const toolbarOptions = [
  [{ header: [2, 3, false] }],
  ["bold", "italic", "underline"],
  [{ list: "ordered" }, { list: "bullet" }],
  ["link"],
  ["clean"],
];

export function QuillEditor({
  name,
  label,
  value,
  onChange,
  required = false,
  placeholder,
}: QuillEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<InstanceType<typeof import("quill").default> | null>(
    null,
  );
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    let mounted = true;

    async function init() {
      const { default: Quill } = await import("quill");
      await import("quill/dist/quill.snow.css");

      if (!mounted || !containerRef.current || quillRef.current) return;

      const editor = new Quill(containerRef.current, {
        theme: "snow",
        placeholder,
        modules: { toolbar: toolbarOptions },
      });

      editor.root.innerHTML = toEditorHtml(value);

      editor.on("text-change", () => {
        const html = editor.root.innerHTML;
        onChangeRef.current(isEmptyHtml(html) ? "" : html);
      });

      quillRef.current = editor;
    }

    init();

    return () => {
      mounted = false;
      quillRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="quill-field">
      {label && (
        <span className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted">
          {label}
        </span>
      )}
      <div className="quill-editor-wrap overflow-hidden rounded-lg border border-border bg-background">
        <div ref={containerRef} />
      </div>
      <input
        type="hidden"
        name={name}
        value={value}
        required={required}
        readOnly
      />
    </div>
  );
}
