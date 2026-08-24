"use server";

import { redirect } from "next/navigation";
import { db } from "@/lib/db";

function toSlug(title: string) {
  const slug = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug || "post";
}

function readTimeFromMarkdown(markdown: string) {
  const words = markdown
    .replace(/<[^>]+>/g, " ")
    .replace(/[#*_`>-]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.ceil(words / 200));
}

export async function createBlogPost(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const date = String(formData.get("date") ?? "");
  const content = String(formData.get("content") ?? "").trim();
  const bannerUrl = String(formData.get("bannerUrl") ?? "").trim() || null;

  if (!title) {
    return { error: "Title is required" };
  }

  if (!content) {
    return { error: "Write some post content before publishing" };
  }

  const publishedAt = date ? new Date(`${date}T12:00:00`) : new Date();
  const baseSlug = toSlug(title);
  let slug = baseSlug;
  let attempt = 1;

  while (await db.blog.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${attempt}`;
    attempt += 1;
  }

  const post = await db.blog.create({
    data: {
      title,
      slug,
      content,
      bannerUrl,
      readTime: readTimeFromMarkdown(content),
      published: true,
      publishedAt,
    },
  });

  redirect(`/blog/${post.id}`);
}
