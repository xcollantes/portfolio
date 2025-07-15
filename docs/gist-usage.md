# GitHub Gist Integration

The portfolio now supports seamless integration with GitHub gists, allowing you to embed live gist content that automatically fetches from GitHub's API and displays with your existing CodeSnippet styling.

## Features

- 🔄 **Live fetching** from GitHub's gist API
- 🎨 **Seamless integration** with existing CodeSnippet styling
- 👤 **Author information** with avatar and GitHub profile links
- 📁 **Multi-file support** with tabbed interface for gists with multiple files
- 🌙 **Dark mode support** matching your theme
- 📱 **Responsive design** optimized for all screen sizes
- 🔗 **Direct GitHub links** to view the original gist
- 🚀 **Automatic language detection** for syntax highlighting
- ⚡ **Loading states** and error handling

## Automatic Integration in Markdown

The easiest way to embed gists is directly in your markdown articles. The system automatically detects gist URLs and renders them as embedded components.

### Gist URL in Paragraph

Simply paste a gist URL on its own line:

```markdown
Here's my awesome React hook:

https://gist.github.com/xcollantes/abc123def456789

This hook handles all the state management for you.
```

### Gist URL as Link

You can also use markdown link syntax:

```markdown
Check out this [useful utility function](https://gist.github.com/xcollantes/abc123def456789).
```

### Supported URL Formats

All of these URL formats work automatically:

- `https://gist.github.com/username/gist_id`
- `https://gist.github.com/gist_id`
- `gist_id` (just the ID)

## Direct Component Usage

For more control, you can use the Gist component directly in React/TSX files:

```tsx
import { Gist } from "@/components";

// Basic usage with gist URL
<Gist gistId="https://gist.github.com/xcollantes/abc123def456789" />

// Using just the gist ID
<Gist gistId="abc123def456789" />

// Show specific file from multi-file gist
<Gist
  gistId="abc123def456789"
  filename="utils.ts"
/>

// Customize appearance
<Gist
  gistId="abc123def456789"
  maxHeight="300px"
  showLineNumbers={false}
  showMetadata={false}
  title="Custom Title"
/>

// Minimal version
<Gist
  gistId="abc123def456789"
  showMetadata={false}
  showViewRaw={false}
/>
```

## Component Props

| Prop              | Type      | Default      | Description                                           |
| ----------------- | --------- | ------------ | ----------------------------------------------------- |
| `gistId`          | `string`  | **required** | GitHub gist ID or URL                                 |
| `filename`        | `string`  | `undefined`  | Specific filename to display (for multi-file gists)   |
| `title`           | `string`  | `undefined`  | Optional title override                               |
| `maxHeight`       | `string`  | `"400px"`    | Maximum height before scrolling                       |
| `showLineNumbers` | `boolean` | `true`       | Show line numbers                                     |
| `showViewRaw`     | `boolean` | `true`       | Show view raw button                                  |
| `showMetadata`    | `boolean` | `true`       | Show gist metadata (author, description, GitHub link) |

## Multi-File Gists

When a gist contains multiple files, the component automatically:

- Shows a tabbed interface to switch between files
- Prioritizes certain file types (`.md`, `.js`, `.ts`, `.py`, etc.)
- Allows you to specify which file to display using the `filename` prop

Example with multiple files:

```tsx
// Will show the first preferred file (usually .md or .js)
<Gist gistId="multi-file-gist-id" />

// Show specific file
<Gist gistId="multi-file-gist-id" filename="package.json" />
```

## Advanced Usage

### Custom Error Handling

The component includes built-in error handling, but you can wrap it for custom error states:

```tsx
import { Gist } from "@/components"
import { ErrorBoundary } from "react-error-boundary"

;<ErrorBoundary fallback={<div>Failed to load gist</div>}>
  <Gist gistId="potentially-problematic-gist" />
</ErrorBoundary>
```

### Loading States

The component shows a loading spinner automatically, but you can also check loading state:

```tsx
import { useState, useEffect } from "react"
import { fetchGistData } from "@/components/GistUtils"

function MyComponent() {
  const [gistExists, setGistExists] = useState(null)

  useEffect(() => {
    fetchGistData("gist-id").then((data) => {
      setGistExists(!!data)
    })
  }, [])

  return gistExists ? <Gist gistId="gist-id" /> : <div>Gist not available</div>
}
```

## API Rate Limits

GitHub's public API has rate limits:

- **60 requests per hour** for unauthenticated requests
- **5,000 requests per hour** for authenticated requests

For production use with many gists, consider:

1. Adding GitHub token authentication
2. Implementing caching
3. Using static generation for known gists

### Adding GitHub Token (Optional)

To increase rate limits, you can modify the `fetchGistData` function in `components/GistUtils.ts`:

```typescript
const response = await fetch(`https://api.github.com/gists/${id}`, {
  headers: {
    Authorization: `token ${process.env.GITHUB_TOKEN}`,
  },
})
```

## Examples in Articles

Here are some real-world examples of how to use gists in your articles:

### Code Tutorial

```markdown
# Building a React Hook

Here's the custom hook we'll be building:

https://gist.github.com/xcollantes/react-hook-example

Let's break down how it works...
```

### Configuration Files

```markdown
# Setting Up Your Environment

Add this configuration to your project:

https://gist.github.com/xcollantes/config-example

Make sure to update the API endpoints for your environment.
```

### Code Snippets Collection

```markdown
# Useful TypeScript Utilities

I've collected some useful TypeScript utilities in this gist:

https://gist.github.com/xcollantes/typescript-utils

Each file contains a different utility function you can use in your projects.
```

## Styling

The gist component automatically inherits your theme's styling and matches the GitHub gist appearance:

- **Header section** with author info and metadata
- **Tab interface** for multi-file gists (matching VS Code style)
- **Code area** with syntax highlighting using your existing CodeSnippet component
- **Footer section** with copy functionality and GitHub link

### Dark Mode

The component automatically adapts to your theme's dark/light mode:

- Dark mode uses GitHub's dark theme colors
- Light mode uses GitHub's light theme colors
- All interactive elements follow your theme's color scheme

## Troubleshooting

### Gist Not Loading

1. **Check the gist ID** - Make sure it's correct and the gist is public
2. **Network issues** - Check browser console for network errors
3. **Rate limits** - Wait a bit if you've hit GitHub's rate limit
4. **Invalid gist** - The gist might have been deleted or made private

### Performance Issues

1. **Too many gists** - Consider static generation for known gists
2. **Large files** - Use the `maxHeight` prop to limit display height
3. **Rate limits** - Implement caching or add GitHub token authentication

### Display Issues

1. **Language detection** - The component falls back to filename extension for language detection
2. **File selection** - For multi-file gists, specify the `filename` prop if needed
3. **Layout problems** - Check that parent containers have proper width constraints

## Best Practices

1. **Use descriptive text** around gist embeds to provide context
2. **Keep gists focused** - One concept per gist works best
3. **Update gists regularly** - Keep embedded content current
4. **Consider file organization** - Name files clearly in multi-file gists
5. **Test responsiveness** - Ensure gists look good on mobile devices
6. **Provide fallbacks** - Consider what happens if the gist fails to load

## Integration with Existing CodeSnippet

The Gist component leverages your existing `CodeSnippet` component, so all the styling and functionality you've already built is automatically available:

- Copy to clipboard functionality
- Syntax highlighting
- Line numbers
- View raw functionality
- Dark mode support
- Custom scrollbars

This ensures a consistent experience across all code displays in your portfolio.
