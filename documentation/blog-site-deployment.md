# Blog-Only Site Deployment Guide

This guide explains how to deploy a blog-focused version of the portfolio site using the same codebase with environment-based configuration.

## Overview

The blog-only site reuses 100% of the existing portfolio codebase but renders a magazine-style blog layout using environment variables. This approach:

- ✅ Eliminates code duplication
- ✅ Maintains single source of truth for content
- ✅ Uses same components and styling with conditional layouts
- ✅ Supports automatic deployments
- ✅ Provides SEO-optimized experience
- ✅ Magazine-style responsive design
- ✅ Mixed content ordering (blogs + work experience)

## Site Modes

### Portfolio Mode (Default)

- Full portfolio layout with personal branding
- Separate sections for work experiences and blogs
- Recommendations and portfolio features
- Traditional card layouts
- Domain: `xaviercollantes.dev`

### Blog-Only Mode

- Magazine-style blog layout with larger images
- Scroll-responsive navbar that transitions from large title to compact nav
- Mixed content flow (blogs and work experiences together)
- No section headers - unified article stream
- Clickable card articles (no separate buttons)
- Mobile-responsive design
- Domain: `blog.xaviercollantes.dev`

## Environment Configuration

### Required Environment Variables

```env
# Site Configuration
NEXT_PUBLIC_SITE_MODE=portfolio|blog-only

# Authentication (same for both sites)
NEXT_PUBLIC_AUTH_USERS=true

# Google Analytics (same for both sites)
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-HB7XXXXXXX
```

### Portfolio Site Configuration

```env
NEXT_PUBLIC_SITE_MODE=portfolio
```

### Blog Site Configuration

```env
NEXT_PUBLIC_SITE_MODE=blog-only
```

## Vercel Deployment Setup

### Step 1: Create Two Vercel Projects

1. **Portfolio Project** (existing)

   - Project name: `portfolio`
   - Domain: `xaviercollantes.dev`
   - Git: Connect to your portfolio repository

2. **Blog Project** (new)
   - Project name: `portfolio-blog`
   - Domain: `blog.xaviercollantes.dev`
   - Git: Connect to the same portfolio repository

### Step 2: Configure Environment Variables

#### Portfolio Project Settings

```
NEXT_PUBLIC_SITE_MODE = portfolio
NEXT_PUBLIC_AUTH_USERS = true
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID = G-HB7XXXXXXX
```

#### Blog Project Settings

```
NEXT_PUBLIC_SITE_MODE = blog-only
NEXT_PUBLIC_AUTH_USERS = true
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID = G-HB7XXXXXXX
```

### Step 3: Domain Configuration

#### Set up custom domain for blog

1. In Vercel dashboard, go to blog project
2. Navigate to Settings → Domains
3. Add custom domain: `blog.xaviercollantes.dev`
4. Configure DNS:
   ```
   Type: CNAME
   Name: blog
   Value: cname.vercel-dns.com
   ```

### Step 4: Automatic Deployments

Both projects will auto-deploy when you push to the main branch:

1. **Portfolio site** rebuilds with portfolio layout
2. **Blog site** rebuilds with blog-only layout
3. Same content, different presentation

## GitHub Actions (Optional)

For more control, you can set up GitHub Actions to deploy both sites:

```yaml
# .github/workflows/deploy-sites.yml
name: Deploy Both Sites

on:
  push:
    branches: [main]

jobs:
  deploy-portfolio:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy Portfolio to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PORTFOLIO_PROJECT_ID }}

  deploy-blog:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy Blog to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.BLOG_PROJECT_ID }}
```

## Local Development

### Testing Portfolio Mode

```bash
# Default mode (portfolio)
npm run dev
# Visit http://localhost:3000
```

### Testing Blog Mode

```bash
# Set environment variable for blog mode
NEXT_PUBLIC_SITE_MODE=blog-only npm run dev
# Visit http://localhost:3000
```

### Using .env.local for testing

Create `.env.local` file:

```env
NEXT_PUBLIC_SITE_MODE=blog-only
```

## How It Works

### Conditional Rendering

The main `pages/index.tsx` uses conditional rendering:

```typescript
export default function Page(props: IndexPropTypes) {
  // Render different layouts based on site mode
  if (isBlogOnlyMode()) {
    return <BlogLayout {...props} />
  }

  return <PortfolioLayout {...props} />
}
```

### Layout Components

- **PortfolioLayout**: Original design with recommendations and separate experience/blog sections
- **BlogLayout**: Magazine-style blog-focused design with scroll-responsive navbar
- **LongCard**: Conditional rendering - magazine layout for blog mode, traditional cards for portfolio
- **BlogNavbar**: Scroll-responsive navbar that starts large and becomes compact when scrolling

### Article Ordering System

Articles are configured in `article_configs/article_order_config.ts`:

```typescript
// Portfolio mode: Uses separate arrays combined
export const orderedIncludeArticlesConfig = [
  ...orderedIncludeWorkExp,    // Work experiences first
  ...orderedIncludeBlogs,      // Then blogs
]

// Blog mode: Uses mixed ordering
export const orderedIncludeBlogSite: string[] = [
  "rag-langchain.md",          // Blog
  "qdrant_awsvector.md",       // Blog
  "history-ai.md",             // Blog
  "google.md",                 // Work Experience (mixed in)
  "llms-for-non-techies.md",   // Blog
  "vectorstores.md",           // Blog
  "faxion-ai.md",              // Work Experience (mixed in)
  // ... continues with mixed content
]
```

### Build-Time Configuration

The article processing (`article_configs/process_articles.ts`) automatically selects the appropriate article order:

```typescript
const articlesToInclude = isBlogOnlyMode()
  ? orderedIncludeBlogSite     // Mixed blog + work experience order
  : orderedIncludeArticlesConfig // Separate sections order
```

### Dynamic Meta Tags

Meta tags automatically adjust based on site configuration:

- Title, description, and Open Graph tags
- Different base URLs for each site
- SEO optimization for both contexts

## Managing Article Order for Blog Site

### Overview

The blog site uses a custom article ordering system that allows mixing blog posts and work experience articles in a single flow, creating a more natural reading experience.

### Configuration File

All article ordering is managed in `article_configs/article_order_config.ts`:

```typescript
// BLOG SITE SPECIFIC ORDER (for blog-only mode)
// Both WORKEXP and BLOG articles can be mixed in any order
export const orderedIncludeBlogSite: string[] = [
  "rag-langchain.md",          // Blog: AI/ML content
  "qdrant_awsvector.md",       // Blog: Technical comparison
  "history-ai.md",             // Blog: Educational content
  "google.md",                 // Work Experience: Mixed in strategically
  "llms-for-non-techies.md",   // Blog: Accessible AI content
  "vectorstores.md",           // Blog: Technical tutorial
  "git-worktree.md",           // Blog: Developer tools
  "faxion-ai.md",              // Work Experience: AI startup experience
  "measuring-tokens.md",       // Blog: Technical guide
  "portfolio.md",              // Work Experience: Meta content
  // ... continue mixing as desired
]
```

### Best Practices for Article Ordering

1. **Start Strong**: Place your best technical content first (RAG, Vector DBs)
2. **Mix Strategically**: Intersperse work experience to break up similar content
3. **Consider Flow**: Group related topics when possible
4. **Mobile Experience**: Remember users scroll through on mobile
5. **Update Regularly**: Reorder as you publish new content

### Article Types

- **Blog Articles** (`articleType: "BLOG"`): Technical tutorials, insights, guides
- **Work Experience** (`articleType: "WORKEXP"`): Project showcases, case studies

### How to Add/Reorder Articles

1. **Add to appropriate base array** (`orderedIncludeBlogs` or `orderedIncludeWorkExp`)
2. **Position in blog site array** (`orderedIncludeBlogSite`) at desired location
3. **Consider content flow** - technical depth, topic relationships, engagement

### Example Mixed Flow Strategy

```typescript
// Good mixed flow example:
[
  "rag-langchain.md",          // Hook with popular AI topic
  "qdrant_awsvector.md",       // Deep technical follow-up
  "google.md",                 // Work experience break
  "llms-for-non-techies.md",   // Accessible content
  "faxion-ai.md",              // Related work experience
  "measuring-tokens.md",       // Technical continuation
]
```

This creates natural content clusters while maintaining reader engagement through variety.

## Benefits

1. **Single Codebase**: No code duplication between sites
2. **Consistent Content**: Articles and data stay synchronized
3. **Easy Maintenance**: Updates apply to both sites
4. **SEO Optimized**: Each site has appropriate meta tags and structure
5. **Scalable**: Easy to add more site modes in the future
6. **Flexible Ordering**: Mix any content types in blog mode
7. **Magazine Experience**: Large images and modern layout in blog mode

## Troubleshooting

### Environment Variables Not Working

- Ensure variables start with `NEXT_PUBLIC_` for client-side access
- Clear `.next` cache: `rm -rf .next`
- Restart development server

### Build Issues

- Run `npm run build` to check for TypeScript errors
- Verify all imports are correct in new components

### Domain Issues

- Check DNS propagation (can take up to 24 hours)
- Verify CNAME record points to `cname.vercel-dns.com`
- Ensure SSL certificate is issued (automatic in Vercel)

## Current Implementation Status

### ✅ Completed Features

- **Dual Site Architecture**: Single codebase serves both portfolio and blog sites
- **Magazine Layout**: Large images (400x280px) with external text content
- **Scroll-Responsive Navbar**: Transitions from large title to compact navigation
- **Mixed Article Ordering**: Blog and work experience articles flow together seamlessly
- **Mobile Responsive**: Stacks vertically on mobile, horizontal on desktop
- **Clickable Cards**: Entire article cards are clickable (no separate buttons)
- **Dark Mode Support**: Full theme compatibility across both site modes
- **Conditional Navigation**: Hides portfolio-specific menu items in blog mode

### 🏗️ Architecture Components

- **BlogLayout.tsx**: Magazine-style layout with scroll-responsive navbar
- **BlogNavbar.tsx**: Navbar that transitions based on scroll position
- **LongCard.tsx**: Conditional rendering for magazine vs traditional layouts
- **article_order_config.ts**: Centralized article ordering with mixed content support
- **siteConfig.ts**: Environment-based site mode configuration

### 📊 Content Management

- **Portfolio Mode**: Work experiences → Blogs (separate sections)
- **Blog Mode**: Mixed flow following `orderedIncludeBlogSite` order
- **Dynamic Ordering**: Different article sequences for each site mode
- **Build-Time Selection**: Articles chosen based on environment variables

### 🎯 SEO & Performance

- **Conditional Meta Tags**: Different titles, descriptions per site mode
- **Optimized Images**: Proper sizing and responsive loading
- **Clean URLs**: Same routing works for both site modes
- **Fast Transitions**: Smooth animations and hover effects

## Future Enhancements

- Add more site modes (documentation, minimal, etc.)
- Implement different themes per site mode
- Add site-specific analytics tracking (separate GA4 properties)
- Create automated testing for different modes
- Add newsletter signup for blog mode
- Implement reading time estimates for articles
