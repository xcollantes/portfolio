---
title: GitHub Gist Integration Demo
author: Xavier Collantes
dateWritten: 2025-07-15
cardDescription: Demonstration of the new GitHub gist embedding functionality in the portfolio.
cardPageLink: "/articles/gist-example"
imagePath: ""
articleType: BLOG
tagIds: ["github", "code", "integration", "gist", "demo"]
---

This article demonstrates the new GitHub gist integration functionality. You can
now embed GitHub gists directly in your markdown articles, and they will be
automatically fetched and displayed with the same styling as your existing code
snippets.

## How It Works

Simply paste a GitHub gist URL in your markdown, and it will be automatically
converted to an embedded gist component:

https://gist.github.com/xcollantes/f5cdf741d350db22e42f3c7eb39b10cc

The system automatically fetches the content from GitHub's API and displays it
with:

- Author information and avatar
- Gist description and metadata
- Syntax highlighting based on file type
- Copy to clipboard functionality
- Link back to the original gist on GitHub

## Multi-File Gists

For gists with multiple files, the component shows a tabbed interface:

https://gist.github.com/xcollantes/f5cdf741d350db22e42f3c7eb39b10cc

You can navigate between different files using the tabs at the top.

## Link Format Support

You can also use markdown link syntax:

Check out this [useful JavaScript
utility](https://gist.github.com/xcollantes/f5cdf741d350db22e42f3c7eb39b10cc)
for handling arrays.

## Benefits

- **Live content**: Always shows the latest version of the gist
- **Consistent styling**: Matches your existing CodeSnippet component design
- **Dark mode support**: Automatically adapts to your theme
- **Responsive**: Works perfectly on mobile devices
- **No maintenance**: No need to manually update code when gists change

## Technical Implementation

The implementation includes:

1. **GistUtils.ts** - Utility functions for fetching and processing gist data
2. **Gist.tsx** - React component for displaying gists
3. **ReactMarkdownCustom.tsx** - Updated to detect and render gist URLs
4. **Automatic integration** - Works seamlessly in markdown content

For more detailed documentation, see `docs/gist-usage.md`.
