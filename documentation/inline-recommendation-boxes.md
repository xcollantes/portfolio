# Inline Recommendation Boxes

The Inline Recommendation Box component allows you to embed contextual recommendations directly within blog articles. These boxes provide readers with relevant content, tools, and resources at strategic points in your articles.

## Usage

Add recommendation boxes directly in your markdown articles using HTML syntax:

```markdown
<recommendationbox
  type="tool"
  title="Try This Amazing Tool"
  description="A brief description of what this tool does and why it's useful in this context."
  url="https://example.com"
  urltext="Get Started">
</recommendationbox>
```

## Recommendation Types

The component supports six different recommendation types, each with its own styling and icon:

### 1. Article (`type="article"`)

- **Icon**: Article icon
- **Color**: Blue (#1976d2)
- **Use for**: Related blog posts, tutorials, documentation

```markdown
<recommendationbox
  type="article"
  title="Related Reading"
  description="Learn more about this topic in our comprehensive guide."
  url="/articles/related-topic"
  urltext="Read Article">
</recommendationbox>
```

### 2. Tool (`type="tool"`)

- **Icon**: Tips and Updates icon
- **Color**: Orange (#ed6c02)
- **Use for**: Software tools, platforms, services

```markdown
<recommendationbox
  type="tool"
  title="Development Tool"
  description="This tool can help streamline your development workflow."
  url="https://tool-website.com"
  urltext="Try Tool">
</recommendationbox>
```

### 3. Code (`type="code"`)

- **Icon**: Code icon
- **Color**: Green (#2e7d32)
- **Use for**: Code repositories, examples, snippets

```markdown
<recommendationbox
  type="code"
  title="Code Example"
  description="Check out this implementation example on GitHub."
  url="https://github.com/user/repo"
  urltext="View Code">
</recommendationbox>
```

### 4. Learning (`type="learning"`)

- **Icon**: Book icon
- **Color**: Purple (#7b1fa2)
- **Use for**: Courses, tutorials, educational resources

```markdown
<recommendationbox
  type="learning"
  title="Master This Concept"
  description="Take this course to deepen your understanding of the topic."
  url="https://course-platform.com/course"
  urltext="Start Learning">
</recommendationbox>
```

### 5. Product (`type="product"`)

- **Icon**: Shopping Cart icon
- **Color**: Red (#d32f2f)
- **Use for**: Physical products, software products, books

```markdown
<recommendationbox
  type="product"
  title="Recommended Book"
  description="This book provides in-depth coverage of advanced techniques."
  url="https://amazon.com/book"
  urltext="Buy Now">
</recommendationbox>
```

### 6. Tip (`type="tip"`)

- **Icon**: Tips and Updates icon
- **Color**: Amber (#f57c00)
- **Use for**: Pro tips, best practices, quick advice

```markdown
<recommendationbox
  type="tip"
  title="Pro Tip"
  description="Here's a quick tip to make this process even easier."
  url="https://example.com/tip"
  urltext="Learn More">
</recommendationbox>
```

## Properties

### Required Properties

- `type`: One of "article", "tool", "code", "learning", "product", or "tip"
- `title`: The title of the recommendation
- `description`: A brief description explaining the recommendation

### Optional Properties

- `url`: External or internal link URL
- `urltext`: Custom text for the link button (defaults to "Learn more")

## Design Features

- **Dark Mode Support**: Automatically adapts to light and dark themes
- **Responsive Design**: Works on all screen sizes
- **Hover Effects**: Subtle animations on hover for better interactivity
- **Accessibility**: Proper color contrast and semantic HTML
- **Type-specific Styling**: Each type has unique colors and icons for quick recognition

## Best Practices

1. **Strategic Placement**: Place recommendation boxes at natural transition points in your content
2. **Contextual Relevance**: Ensure recommendations are directly related to the surrounding content
3. **Balanced Usage**: Don't overuse - 2-3 per article is typically optimal
4. **Clear Descriptions**: Write concise but informative descriptions
5. **Varied Types**: Use different types to create visual variety and categorize different kinds of recommendations

## Examples in Context

### Within a Tutorial

When explaining a complex concept, you might add:

```markdown
## Advanced Configuration

To configure advanced settings, you'll need to understand the underlying architecture.

<recommendationbox
  type="article"
  title="Architecture Deep Dive"
  description="Get a detailed understanding of the system architecture before proceeding with advanced configuration."
  url="/articles/system-architecture"
  urltext="Read Architecture Guide">
</recommendationbox>

Now, let's proceed with the configuration steps...
```

### In a Tool Review

When reviewing development tools:

```markdown
## My Experience with Tool X

After using Tool X for several months, I can confidently recommend it for...

<recommendationbox
  type="tool"
  title="Try Tool X Free"
  description="Start with their free tier to test if Tool X fits your workflow before committing to a paid plan."
  url="https://toolx.com/signup"
  urltext="Start Free Trial">
</recommendationbox>
```

## Technical Implementation

The component is implemented as a custom ReactMarkdown component that:

- Validates input props and provides helpful console warnings
- Uses Material-UI for consistent theming
- Automatically adapts colors for light/dark mode
- Includes smooth hover animations and transitions
- Supports responsive design out of the box

For technical details, see the component source code in `components/InlineRecommendationBox.tsx`.
