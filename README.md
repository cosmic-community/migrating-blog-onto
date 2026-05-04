# Crimewire Blog

![App Preview](https://imgix.cosmicjs.com/056d1520-4804-11f1-a330-bd8a29342713-autopilot-photo-1464349095431-e9a21285b5f3-1777931753323.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A modern, responsive blog platform built with Next.js 16 and powered by [Cosmic](https://www.cosmicjs.com). Inspired by the Crimewire blog design with magazine-style layouts.

## Features

- 📝 Featured posts and category-based browsing
- 👤 Author profiles with social links and bios
- 🏷️ Category pages with colored badges
- 📱 Fully responsive design
- ⚡ Server-side rendering with Next.js 16
- 🎨 Modern UI with Tailwind CSS
- 🔍 SEO-optimized pages

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=69f9156aa963c4f5f0d9525d&clone_repository=69f91686a963c4f5f0d952c1)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "I am migrating my blog onto Cosmicjs"

### Code Generation Prompt

> "Build a Next.js application for a website called 'Migrating blog onto'. The content is managed in Cosmic CMS with the following object types: categories, authors, posts. Create a beautiful, modern, responsive design with a homepage and pages for each content type."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Cosmic SDK** - Content management
- **React 19** - UI library

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account with bucket configured

### Installation

```bash
bun install
```

Set up environment variables (automatic with Cosmic).

```bash
bun run dev
```

## Cosmic SDK Examples

```typescript
// Fetch all posts with author and category
const { objects } = await cosmic.objects
  .find({ type: 'posts' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

## Cosmic CMS Integration

This app uses three content types: posts, authors, and categories. Posts reference authors and categories via object metafields with depth=1 for nested data.

## Deployment

Deploy to Vercel or Netlify with environment variables: `COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, `COSMIC_WRITE_KEY`.

<!-- README_END -->