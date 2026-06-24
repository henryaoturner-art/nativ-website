import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

// Blog posts are plain markdown files in /content/blog/<slug>.md with frontmatter.
// Adding a post = dropping one .md file here. No code change needed.
const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type BlogMeta = {
  slug: string;
  title: string;
  date: string; // ISO YYYY-MM-DD (publication date)
  updated?: string; // ISO, drives schema dateModified
  excerpt: string;
  description: string; // meta description
  tag: string;
  readTime: string;
  author: string;
  image?: string; // cover image path under /public, e.g. "/blog/<slug>.jpg"
};

export type BlogPost = BlogMeta & { html: string };

function readMeta(file: string): BlogMeta {
  const slug = file.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
  const { data } = matter(raw);
  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? "",
    updated: data.updated ?? undefined,
    excerpt: data.excerpt ?? "",
    description: data.description ?? data.excerpt ?? "",
    tag: data.tag ?? "",
    readTime: data.readTime ?? "",
    author: data.author ?? "nativ",
    image: data.image ?? undefined,
  };
}

export function getAllPosts(): BlogMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map(readMeta)
    .sort((a, b) => (a.date < b.date ? 1 : -1)); // newest first
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getPost(slug: string): BlogPost | null {
  const file = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { content } = matter(raw);
  const meta = readMeta(`${slug}.md`);
  const html = marked.parse(content) as string;
  return { ...meta, html };
}
