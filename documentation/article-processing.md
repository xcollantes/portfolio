# Article Processing System

This document explains how articles are processed in the portfolio website,
including the recent updates to the access control and exception system.

## Overview

The article processing system handles:

- Article discovery and ordering
- Metadata extraction from YAML frontmatter
- Markdown to HTML conversion
- Access control and verification
- Search engine indexing policies

## Core Components

### 1. Article Processing (`article_configs/process_articles.ts`)

The main processing module handles:

#### Article Discovery

- Reads articles from the `articles/` directory
- Only includes articles explicitly listed in `article_order_config.ts`
- Uses `getArticlePaths()` to get enabled article files

#### Metadata Processing

The `MetadataType` interface defines required YAML frontmatter:

```yaml
---
articleType: "BLOG" | "WORKEXP"
title: "Article Title"
cardDescription: "Brief description for preview card"
cardPageLink: "/articles/article-name"
imagePath: "/path/to/image.webp"
tagIds:
  - python
  - llm
  - webdev
subTitle: "Optional subtitle"
author: "Xavier Collantes"
dateWritten: 2023-07-01
dateLastUpdated: 2023-07-01
cardButtonText: "See more"
---
```

#### Content Processing

- Uses `gray-matter` to parse YAML frontmatter
- Converts Markdown to HTML using `remark` and `remark-html`
- Maintains both raw Markdown and processed HTML versions

### 2. Article Ordering (`article_configs/article_order_config.ts`)

Controls which articles appear on the website:

```typescript
// Work experiences
export const orderedIncludeWorkExp: string[] = [
  "faxion-ai.md",
  "google.md",
  "belva-ai.md",
  // ... more files
]

// Blog posts
export const orderedIncludeBlogs: string[] = [
  "rag-langchain.md",
  "history-ai.md",
  // ... more files
]
```

**Important**: Articles **must** be listed here to be accessible via URL or appear in the interface.

### 3. Filter Configuration (`article_configs/filters_config.ts`)

Defines filterable tags:

```typescript
export const filterDataConfig: FilterDataConfigType[] = [
  { displayText: "Python", tagId: "python" },
  { displayText: "LLM", tagId: "llm" },
  { displayText: "RAG", tagId: "rag" },
  // ... more filters
]
```

Tags in article metadata must exactly match `tagId` values to be filterable.

## Access Control System

### Default Security Policy

By default, **all articles**:

- ✅ Require human verification to access
- ✅ Are marked with `noindex` for search engines
- ✅ Are protected from public discovery

This protects sensitive or personal content from unintended exposure.

### Deny List System (`article_configs/article_exceptions_config.ts`)

The deny list system restricts specific articles that should not be public by default:

#### Restriction Criteria

Add articles that meet **ANY** criteria:

- ✅ Content contains sensitive or private information
- ✅ Content is meant for specific individuals only
- ✅ Content contains experimental or draft material
- ✅ Content includes personal stories not meant for public discovery

#### Deny List Configuration

```typescript
export const articleDenyList: Record<string, ArticleDenyConfig> = {
  "personal-story.md": {
    requireVerification: true,
    blockSearchIndexing: true,
    reason: "Personal experience not meant for public discovery",
  },

  "draft-content.md": {
    requireVerification: true,
    blockSearchIndexing: true,
    reason: "Draft content not ready for public consumption",
  },
}
```

#### Helper Functions

```typescript
// Check if article bypasses verification (true by default unless restricted)
shouldBypassVerification(articleId: string): boolean

// Check if article allows search indexing (true by default unless blocked)
shouldAllowSearchIndexing(articleId: string): boolean

// Get all restricted articles
getRestrictedArticles(): string[]

// Get reason for restriction
getRestrictionReason(articleId: string): string | undefined
```

### When to Restrict Articles

**✅ Add to deny list:**

- Personal stories or experiences
- Content with sensitive company information
- Experimental or draft content
- Content meant only for specific individuals

**❌ Do NOT restrict (keep public):**

- Portfolio pieces showcasing professional work
- Educational tutorials and technical guides
- Public-facing work experiences and achievements
- Blog posts intended for broader audience reach

## Adding New Articles

### 1. Create the Article

1. Add Markdown file to `articles/` directory
2. Use lowercase filename with hyphens: `my-article.md`
3. Include proper YAML frontmatter with all required fields

### 2. Register the Article

1. Add filename to appropriate array in `article_order_config.ts`
2. Ensure `tagIds` match values in `filters_config.ts`

### 3. Configure Access (if needed)

1. **Most articles**: No additional configuration (public by default)
2. **Restricted articles**: Add entry to `articleDenyList` in `article_exceptions_config.ts`

### 4. Update Filters (if needed)

Add new filter options to `filters_config.ts` if introducing new tag categories.

## Security Considerations

### Default Public Articles

- **All articles are public by default** and searchable
- Appear in search results and social media previews
- Content will be cached by search engines
- Only add restrictions for sensitive or personal content

### Restricted Articles

- Require human verification to access
- Blocked from search engine indexing
- Protected from public discovery

### Best Practices

1. **Review carefully** before adding exceptions
2. **Monitor indexing** after deployment
3. **Document reasons** for all exceptions
4. **Regular audits** of exception list
5. **Consider data privacy** implications

## Development Workflow

### Testing Article Processing

```bash
# Build the application to test article processing
npm run build

# Check article paths and metadata
npm run dev
```

### Debugging Common Issues

1. **Article not appearing**: Check if listed in `article_order_config.ts`
2. **Filter not working**: Verify tag matches `filters_config.ts`
3. **Access issues**: Check exception configuration
4. **Metadata errors**: Validate YAML frontmatter syntax

## Integration Points

### Next.js Integration

- `getStaticPaths()` uses `getArticlePathsAsProps()`
- `getStaticProps()` uses `getArticle()` for individual articles
- Article metadata used for SEO and social media cards

### Component Integration

- Article cards use metadata for display
- Filter system uses `tagIds` for categorization
- Analytics tracking uses article metadata

## Future Enhancements

Potential improvements to consider:

1. **Static site generation** for better performance
2. **Content validation** to ensure required fields
3. **Automated testing** for article processing
4. **Content scheduling** for publish dates
5. **Enhanced SEO** metadata support

## Troubleshooting

### Common Issues

- **Build failures**: Check YAML syntax in frontmatter
- **Missing articles**: Verify inclusion in order config
- **Incorrect filtering**: Ensure tag ID matches exactly
- **Access problems**: Review exception configuration

### Debugging Tools

- Check browser console for processing errors
- Review build logs for article parsing issues
- Use development mode to test changes
- Verify file paths and naming conventions
