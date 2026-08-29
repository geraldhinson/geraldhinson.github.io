# Gerald site — simple Astro version

The design goal is intentionally boring:

> Everything under `src/pages` is a page.

The site uses only Astro, HTML, CSS, Markdown, and a small amount of ordinary JavaScript inside `.astro` files.

## Run locally

```bash
npm install
npm run dev
```

Astro will normally serve the site at:

```text
http://localhost:4321/
```

## Add a technical blog post

Create `src/pages/tech-blog/my-post.md` with frontmatter like:

```markdown
---
layout: ../../layouts/PostLayout.astro
title: "My Post"
description: "Short description"
date: 2026-08-27
---

Post body here.
```

It automatically becomes `/tech-blog/my-post/` and appears in the tech-blog index.

## Add a faith blog post

Same idea under `src/pages/faith-blog/`.

## Add a project

Edit `src/pages/projects/index.astro` and add an object to the `projects` array.

## Add a repository

Edit `src/pages/repositories/index.astro` and add an object to the `repositories` array.

## Change styling

Edit `src/styles/site.css`.

## Change shared navigation/layout

Edit `src/layouts/BaseLayout.astro`.
