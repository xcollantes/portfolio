# Inline Article Callouts

The Inline Article Callout component allows you to embed contextual callouts directly within blog articles. These callouts provide readers with relevant content, tools, and resources at strategic points in your articles.

## Usage

Add article callouts directly in your markdown articles using HTML syntax:

```markdown
<callout
  type="tool"
  title="Try This Amazing Tool"
  description="A brief description of what this tool does and why it's useful in this context."
  url="https://example.com"
  urltext="Get Started">
</callout>
```

## Callout Types

The component supports seven different callout types, each with its own styling and icon:

### 1. Article (`type="article"`)

- **Icon**: Article icon
- **Color**: Blue (#1976d2)
- **Use for**: Related blog posts, tutorials, documentation

```markdown
<callout
  type="article"
  title="Related Reading"
  description="Learn more about this topic in our comprehensive guide."
  url="/articles/related-topic"
  urltext="Read Article">
</callout>
```

### 2. Tool (`type="tool"`)

- **Icon**: Tips and Updates icon
- **Color**: Orange (#ed6c02)
- **Use for**: Software tools, platforms, services

```markdown
<callout
  type="tool"
  title="Development Tool"
  description="This tool can help streamline your development workflow."
  url="https://tool-website.com"
  urltext="Try Tool">
</callout>
```

### 3. Code (`type="code"`)

- **Icon**: Code icon
- **Color**: Green (#2e7d32)
- **Use for**: Code repositories, examples, snippets

```markdown
<callout
  type="code"
  title="Code Example"
  description="Check out this implementation example on GitHub."
  url="https://github.com/user/repo"
  urltext="View Code">
</callout>
```

### 4. Learning (`type="learning"`)

- **Icon**: Book icon
- **Color**: Purple (#7b1fa2)
- **Use for**: Courses, tutorials, educational resources

```markdown
<callout
  type="learning"
  title="Master This Concept"
  description="Take this course to deepen your understanding of the topic."
  url="https://course-platform.com/course"
  urltext="Start Learning">
</callout>
```

### 5. Sponsored (`type="sponsored"`)

- **Icon**: Shopping Cart icon
- **Color**: Red (#d32f2f)
- **Use for**: Sponsored content, affiliate products, paid partnerships

```markdown
<callout
  type="sponsored"
  title="Recommended Tool"
  description="This sponsored tool provides excellent value for development teams."
  url="https://sponsor-tool.com"
  urltext="Try Now">
</callout>
```

### 6. Tip (`type="tip"`)

- **Icon**: Tips and Updates icon
- **Color**: Amber (#f57c00)
- **Use for**: Pro tips, best practices, quick advice

```markdown
<callout
  type="tip"
  title="Pro Tip"
  description="Here's a quick tip to make this process even easier."
  url="https://example.com/tip"
  urltext="Learn More">
</callout>
```

### 7. Testimonial (`type="recommendation"`)

- **Icon**: Person icon
- **Color**: Blue (#1976d2)
- **Use for**: Professional recommendations, testimonials, quotes

```markdown
<callout
  type="recommendation"
  title="Senior Developer at Company"
  description="A professional testimonial about the topic discussed."
  imageurl="/path/to/avatar.jpg"
  personname="John Smith"
  quote="This approach has significantly improved our team's productivity."
  url="/testimonials"
  urltext="View More Testimonials">
</callout>
```

## Properties

### Required Properties

- `type`: One of "article", "tool", "code", "learning", "sponsored", "tip", or "recommendation"
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

<callout
  type="article"
  title="Architecture Deep Dive"
  description="Get a detailed understanding of the system architecture before proceeding with advanced configuration."
  url="/articles/system-architecture"
  urltext="Read Architecture Guide">
</callout>

Now, let's proceed with the configuration steps...
```

### In a Tool Review

When reviewing development tools:

```markdown
## My Experience with Tool X

After using Tool X for several months, I can confidently recommend it for...

<callout
  type="tool"
  title="Try Tool X Free"
  description="Start with their free tier to test if Tool X fits your workflow before committing to a paid plan."
  url="https://toolx.com/signup"
  urltext="Start Free Trial">
</callout>
```

## Technical Implementation

The component is implemented as a custom ReactMarkdown component that:

- Validates input props and provides helpful console warnings
- Uses Material-UI for consistent theming
- Automatically adapts colors for light/dark mode
- Includes smooth hover animations and transitions
- Supports responsive design out of the box

For technical details, see the component source code in `components/InlineArticleCallout.tsx`.
