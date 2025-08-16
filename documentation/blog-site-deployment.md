# Blog-Only Site Deployment Guide

This guide explains how to deploy a blog-focused version of the portfolio site using the same codebase with environment-based configuration.

## Overview

The blog-only site reuses 100% of the existing portfolio codebase but renders a blog-focused layout using environment variables. This approach:

- ✅ Eliminates code duplication
- ✅ Maintains single source of truth for content
- ✅ Uses same components and styling
- ✅ Supports automatic deployments
- ✅ Provides SEO-optimized experience

## Site Modes

### Portfolio Mode (Default)

- Full portfolio layout with personal branding
- Experience cards and recommendations
- Traditional portfolio structure
- Domain: `xaviercollantes.dev`

### Blog-Only Mode

- Blog-focused clean layout
- Article-centric design
- Simplified navigation
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

- **PortfolioLayout**: Original design with recommendations and experience cards
- **BlogLayout**: Clean blog-focused design
- Both layouts use the same article components and functionality

### Dynamic Meta Tags

Meta tags automatically adjust based on site configuration:

- Title, description, and Open Graph tags
- Different base URLs for each site
- SEO optimization for both contexts

## Benefits

1. **Single Codebase**: No code duplication between sites
2. **Consistent Content**: Articles and data stay synchronized
3. **Easy Maintenance**: Updates apply to both sites
4. **SEO Optimized**: Each site has appropriate meta tags and structure
5. **Scalable**: Easy to add more site modes in the future

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

## Future Enhancements

- Add more site modes (documentation, minimal, etc.)
- Implement different themes per site mode
- Add site-specific analytics tracking
- Create automated testing for different modes
