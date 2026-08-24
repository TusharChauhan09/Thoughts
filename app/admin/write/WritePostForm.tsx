"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { createBlogPost } from "../actions";
import PostEditor from "./PostEditor";

function todayInputValue() {
  return new Date().toISOString().slice(0, 10);
}

export default function WritePostForm() {
  const markdownRef = useRef("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(todayInputValue);
  const [bannerUrl, setBannerUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  function onBannerChange(file: File | undefined) {
    if (!file) {
      setBannerUrl(null);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") setBannerUrl(reader.result);
    };
    reader.readAsDataURL(file);
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setPending(true);

    const formData = new FormData();
    formData.set("title", title);
    formData.set("date", date);
    formData.set("content", markdownRef.current);
    if (bannerUrl) formData.set("bannerUrl", bannerUrl);

    const result = await createBlogPost(formData);
    if (result?.error) {
      setPending(false);
      setError(result.error);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="banner">
          Banner image
        </label>
        <input
          id="banner"
          type="file"
          accept="image/*"
          className="block w-full text-sm text-muted-foreground file:mr-3 file:rounded-lg file:border-0 file:bg-secondary file:px-3 file:py-2 file:text-sm file:font-medium file:text-secondary-foreground"
          onChange={(event) => onBannerChange(event.target.files?.[0])}
        />
        {bannerUrl && (
          <div className="relative min-h-56 overflow-hidden rounded-2xl border border-border">
            <img src={bannerUrl} alt="Banner preview" className="h-56 w-full object-cover" />
            {title && (
              <p className="absolute right-5 bottom-5 rounded-md bg-background/80 px-2 py-1 text-sm">
                {title}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-[1fr_12rem]">
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="How to Fuck Around and Find Out"
            className="h-11 w-full rounded-lg border border-input bg-background px-3 font-serif text-2xl outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="date">
            Date
          </label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">Post</p>
        <PostEditor onMarkdownChange={(markdown) => (markdownRef.current = markdown)} />
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <Button type="submit" size="lg" disabled={pending}>
        {pending ? "Publishing..." : "Publish post"}
      </Button>
    </form>
  );
}
