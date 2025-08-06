# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Linting
npm run lint
```

## Project Architecture

This is a Next.js portfolio website built with TypeScript, Material-UI, and a custom article management system.

### Key Architectural Components

**Article Management System**: The core feature is a sophisticated article processing system with access control:
- Articles are stored as Markdown files in `articles/` directory with YAML frontmatter
- `article_configs/process_articles.ts` handles Markdown processing and metadata extraction
- Articles must be explicitly included in `article_configs/article_order_config.ts` to be accessible
- Default security policy requires human verification for all articles
- Exception system in `article_configs/article_exceptions_config.ts` allows specific articles to bypass verification and be publicly searchable

**Access Control & Security**: 
- `middleware.ts` implements verification system that requires users to pass a simple check before accessing articles
- Articles can be configured as exceptions to bypass verification via `shouldBypassVerification()`
- Only exception articles are indexed by search engines; others have `noindex`
- NextAuth integration available but currently disabled in favor of simple verification

**Content Types**:
- Articles support two types: "BLOG" and "WORKEXP" (work experience)
- Recommendations system with LinkedIn-style endorsements stored in `recommendations/ordered_recommendations.yaml`
- Filter system allows tagging and categorization via `article_configs/filters_config.ts`

**Component Architecture**:
- Material-UI theming with custom dark mode (`themes/theme.ts`, `contexts/colorMode.tsx`)
- Responsive design with different navbar configurations for different pages
- Analytics integration with custom tracking (`components/AnalyticsUtils.ts`)
- Toast notification system (`contexts/toastContext.tsx`)

### Environment Setup

Copy `.env.production.example` to set up environment variables. Key variables include authentication providers, analytics IDs, and API keys.

## Article Management

### Adding New Articles

1. Create Markdown file in `articles/` with proper YAML frontmatter (see `MetadataType` interface)
2. Add filename to `article_configs/article_order_config.ts` (required for accessibility)
3. Ensure `tagIds` match values in `article_configs/filters_config.ts`
4. For public articles: add exception in `article_configs/article_exceptions_config.ts`

### Article Access Control

By default, articles require verification. To make articles public:
- Add to `articleExceptions` with `bypassVerification: true` and `allowSearchIndexing: true`
- Only add articles that meet criteria: professional work, educational content, no sensitive information
- Use helper functions: `shouldBypassVerification()`, `shouldAllowSearchIndexing()`

### Special Features

**GitHub Gists**: Articles support automatic embedding of GitHub gists by URL
**Custom Images**: Markdown images support height specification and priority loading flags
**Embedded Content**: Raw HTML iframe embedding supported via rehype-raw plugin

## Key Files & Directories

- `article_configs/`: Article processing, ordering, filtering, and exception configuration
- `components/`: Reusable React components with Material-UI styling
- `contexts/`: React context providers for theming, filtering, and notifications
- `pages/`: Next.js pages including dynamic article routing
- `middleware.ts`: Access control and verification logic
- `themes/`: Material-UI theme configuration
- `recommendations/`: YAML-based recommendation system
- `documentation/`: Detailed technical documentation for various systems

## Deployment Notes

- Deployed on Vercel with environment variable configuration
- Uses Next.js static generation for performance
- Security headers configured in `next.config.js`
- Sitemap generation via API route
- Analytics with both Google Analytics and Vercel Analytics