"use client";

import { useRef, type ReactNode } from "react";
import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { BackgroundColor, Color, TextStyle } from "@tiptap/extension-text-style";
import { Markdown } from "@tiptap/markdown";
import { Bold, Code, Heading1, Heading2, Heading3, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const TEXT_COLORS = [
  { name: "Default", value: null },
  { name: "Black", value: "#111111" },
  { name: "Gray", value: "#6b7280" },
  { name: "Red", value: "#dc2626" },
  { name: "Orange", value: "#ea580c" },
  { name: "Yellow", value: "#ca8a04" },
  { name: "Green", value: "#16a34a" },
  { name: "Blue", value: "#2563eb" },
  { name: "Purple", value: "#7c3aed" },
  { name: "Pink", value: "#db2777" },
];

const BG_COLORS = [
  { name: "None", value: null },
  { name: "Gray", value: "#e5e7eb" },
  { name: "Red", value: "#fecaca" },
  { name: "Orange", value: "#fed7aa" },
  { name: "Yellow", value: "#fef08a" },
  { name: "Green", value: "#bbf7d0" },
  { name: "Blue", value: "#bfdbfe" },
  { name: "Purple", value: "#ddd6fe" },
  { name: "Pink", value: "#fbcfe8" },
];

const ResizableImage = Image.extend({
  renderMarkdown: (node) => {
    const src = String(node.attrs?.src ?? "").replace(/"/g, "&quot;");
    const alt = String(node.attrs?.alt ?? "").replace(/"/g, "&quot;");
    const width = node.attrs?.width;
    const height = node.attrs?.height;
    const widthAttr = width ? ` width="${width}"` : "";
    const heightAttr = height ? ` height="${height}"` : "";
    return `<img src="${src}" alt="${alt}"${widthAttr}${heightAttr} />`;
  },
}).configure({
  allowBase64: true,
  resize: {
    enabled: true,
    directions: ["top-left", "top-right", "bottom-left", "bottom-right"],
    minWidth: 64,
    minHeight: 64,
    alwaysPreserveAspectRatio: true,
  },
});

type PostEditorProps = {
  onMarkdownChange?: (markdown: string) => void;
};

export default function PostEditor({ onMarkdownChange }: PostEditorProps) {
  const imageInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      TextStyle,
      Color,
      BackgroundColor,
      ResizableImage,
      Markdown,
    ],
    content: "",
    editorProps: {
      attributes: {
        class: "admin-editor-content outline-none",
      },
    },
    onUpdate: ({ editor: current }) => {
      onMarkdownChange?.(current.getMarkdown());
    },
  });

  const editorState = useEditorState({
    editor,
    selector: ({ editor: current }) => {
      if (!current) return null;
      return {
        h1: current.isActive("heading", { level: 1 }),
        h2: current.isActive("heading", { level: 2 }),
        h3: current.isActive("heading", { level: 3 }),
        bold: current.isActive("bold"),
        code: current.isActive("code"),
        color: current.getAttributes("textStyle").color as string | undefined,
        backgroundColor: current.getAttributes("textStyle").backgroundColor as
          | string
          | undefined,
      };
    },
  });

  function insertImage(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== "string") return;
      editor
        ?.chain()
        .focus()
        .setImage({ src: reader.result, alt: file.name })
        .run();
    };
    reader.readAsDataURL(file);
  }

  if (!editor) {
    return (
      <div className="min-h-[28rem] rounded-2xl border border-border bg-muted/40" />
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_16rem]">
      <div className="admin-editor min-h-[28rem] rounded-2xl border border-border bg-background px-5 py-4">
        <EditorContent editor={editor} />
      </div>

      <aside className="h-fit space-y-5 rounded-2xl border border-border bg-card p-4 lg:sticky lg:top-6">
        <div>
          <p className="mb-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
            Headings
          </p>
          <div className="grid grid-cols-3 gap-2">
            <ToolButton
              label="H1"
              active={editorState?.h1}
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              icon={<Heading1 className="size-5" />}
            />
            <ToolButton
              label="H2"
              active={editorState?.h2}
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              icon={<Heading2 className="size-5" />}
            />
            <ToolButton
              label="H3"
              active={editorState?.h3}
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              icon={<Heading3 className="size-5" />}
            />
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
            Style
          </p>
          <div className="grid grid-cols-2 gap-2">
            <ToolButton
              label="Bold"
              active={editorState?.bold}
              onClick={() => editor.chain().focus().toggleBold().run()}
              icon={<Bold className="size-5" />}
            />
            <ToolButton
              label="Inline"
              active={editorState?.code}
              onClick={() => editor.chain().focus().toggleCode().run()}
              icon={<Code className="size-5" />}
            />
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
            Text color
          </p>
          <div className="flex flex-wrap gap-2">
            {TEXT_COLORS.map((color) => (
              <button
                key={color.name}
                type="button"
                title={color.name}
                onClick={() => {
                  if (!color.value) {
                    editor.chain().focus().unsetColor().run();
                    return;
                  }
                  editor.chain().focus().setColor(color.value).run();
                }}
                className={cn(
                  "size-7 rounded-full border border-border",
                  color.value ? "" : "bg-background",
                  editorState?.color === color.value && "ring-2 ring-ring ring-offset-2",
                  !color.value && !editorState?.color && "ring-2 ring-ring ring-offset-2",
                )}
                style={color.value ? { backgroundColor: color.value } : undefined}
              />
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
            Text background
          </p>
          <div className="flex flex-wrap gap-2">
            {BG_COLORS.map((color) => (
              <button
                key={color.name}
                type="button"
                title={color.name}
                onClick={() => {
                  if (!color.value) {
                    editor.chain().focus().unsetBackgroundColor().run();
                    return;
                  }
                  editor.chain().focus().setBackgroundColor(color.value).run();
                }}
                className={cn(
                  "size-7 rounded-full border border-border",
                  editorState?.backgroundColor === color.value &&
                    "ring-2 ring-ring ring-offset-2",
                  !color.value &&
                    !editorState?.backgroundColor &&
                    "ring-2 ring-ring ring-offset-2",
                )}
                style={{ backgroundColor: color.value ?? "transparent" }}
              />
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
            Image
          </p>
          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) insertImage(file);
              event.target.value = "";
            }}
          />
          <ToolButton
            label="Add image"
            onClick={() => imageInputRef.current?.click()}
            icon={<ImageIcon className="size-5" />}
            wide
          />
          <p className="mt-2 text-xs text-muted-foreground">
            Drag a corner of the image in the editor to resize it.
          </p>
        </div>
      </aside>
    </div>
  );
}

function ToolButton({
  label,
  icon,
  onClick,
  active,
  wide,
}: {
  label: string;
  icon: ReactNode;
  onClick: () => void;
  active?: boolean;
  wide?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded-lg border px-2 py-2 text-xs font-medium transition-colors",
        wide && "w-full",
        active
          ? "border-foreground bg-foreground text-background"
          : "border-border bg-background text-foreground hover:bg-muted",
      )}
    >
      {icon}
      {label}
    </button>
  );
}
