import WritePostForm from "./WritePostForm";

export default function AdminWriteAliasPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 pb-24">
      <div className="mb-8 space-y-1">
        <p className="text-sm text-muted-foreground">Admin</p>
        <h1 className="font-serif text-4xl">Write a post</h1>
        <p className="text-muted-foreground">
          Use the toolbox. Headings, bold, colors, and images are saved as Markdown
          behind the scenes.
        </p>
      </div>
      <WritePostForm />
    </main>
  );
}
