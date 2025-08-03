# Article Overlay Images

This document explains how to implement and configure overlay images for article
cards in the portfolio website.

## Overview

Article overlay images are background images that appear behind the text on
article preview cards. When enabled, they provide a visual preview of the
article content while maintaining readability through a semi-transparent overlay
and white text.

## How Overlay Images Work

### Visual Design

When an overlay image is configured:

- The image serves as the card's background with `cover` sizing
- A semi-transparent gray overlay (`rgba(128, 128, 128, 0.48)`) is applied
- All text becomes white for contrast against the dark overlay
- The image is centered and covers the entire card area

### Technical Implementation

Overlay images are handled by the `LongCard` component:

- Controlled by the `useBackgroundImage` prop
- Image path comes from article metadata's `imagePath` field
- CSS properties ensure proper scaling and positioning
- Text remains accessible with high contrast styling

## File Structure and Organization

### Directory Structure

Images must be organized in the following structure:

```text
public/
└── articles/
    └── images/
        └── [article-name]/
            ├── overlay-image.webp
            └── other-images.webp
```

### Naming Conventions

- **Directory name**: Must match the article filename (without `.md`)
- **Image files**: Use descriptive names, preferably the article name or main
  concept
- **File extensions**: Prefer `.webp` for optimal compression and quality

### Directory Examples

```text
public/articles/images/
├── anderson-podcast/
│   └── andersonpodcast.png
├── history-ai/
│   └── aimovie-preview.webp
└── llm-leaderboards/
    └── hg.webp
```

## Adding Overlay Images

### 1. Create Image Directory

Create a directory under `public/articles/images/` with the exact name of your
article file (without the `.md` extension):

```bash
mkdir public/articles/images/my-article-name
```

### 2. Add Your Image

Place your overlay image in the directory:

```bash
cp my-overlay-image.webp public/articles/images/my-article-name/
```

### 3. Update Article Metadata

Add the `imagePath` field to your article's YAML frontmatter:

```yaml
---
articleType: "BLOG"
title: "My Article Title"
cardDescription: "Article description"
cardPageLink: "/articles/my-article-name"
imagePath: "/articles/images/my-article-name/my-overlay-image.webp"
tagIds:
  - tag1
  - tag2
---
```

### 4. Enable Background Images (if needed)

Overlay images are automatically used when the `ExperienceCards` component has
`useBackgroundImages={true}` prop enabled.

## Image Guidelines

### Visual Requirements

**✅ RECOMMENDED:**

- **Dark or medium-toned images**: Ensure white text remains readable
- **Images with depth**: Photos with background blur or gradient work well
- **Subtle textures**: Abstract patterns or professional photography
- **High contrast areas**: Images that won't compete with text overlay
- **Professional appearance**: Images that match the site's aesthetic

**❌ AVOID:**

- **White or very light images**: White text will be invisible
- **Images with text**: Overlay text will conflict and create confusion
- **Busy patterns**: Complex designs that distract from the content
- **Low contrast**: Images where gray overlay won't provide enough contrast
- **Inappropriate content**: Images not suitable for professional portfolio

### Technical Requirements

**File Format:**

- **Primary**: `.webp` (best compression and quality)
- **Alternative**: `.png` or `.jpg` if WEBP not available

**Dimensions:**

- **Minimum**: 800x600 pixels
- **Recommended**: 1200x800 pixels or higher
- **Aspect ratio**: 3:2 or 16:9 work well for card layouts

**File Size:**

- **Target**: Under 500KB for optimal loading
- **Maximum**: 1MB (larger files will slow page load)
- **Compression**: Use tools like ImageOptim or online compressors

### Content Guidelines

**Good overlay image examples:**

- Professional workspace photos
- Technology-related imagery (servers, code, devices)
- Abstract tech patterns or backgrounds
- Subtle gradients or textures
- Photos with natural depth of field

**Poor overlay image choices:**

- Screenshots with text
- White/light colored backgrounds
- Images with prominent text elements
- Overly bright or saturated images
- Personal photos inappropriate for professional context

## Development and Testing

### Local Testing

1. **Add your image** to the appropriate directory
2. **Update article metadata** with correct `imagePath`
3. **Run development server**: `npm run dev`
4. **Check card appearance** on the homepage
5. **Test on mobile** to ensure proper scaling

### Debugging Common Issues

**Image not appearing:**

- Verify file path matches metadata exactly
- Check file exists in correct directory
- Ensure proper file extension

**Text not readable:**

- Image too light: choose darker image or add darker overlay
- Poor contrast: select image with better contrast areas
- Text positioning: image content may conflict with text areas

**Performance issues:**

- File too large: compress image
- Wrong format: convert to WEBP
- Multiple large images: optimize all overlay images

## Best Practices

### Image Selection

1. **Preview first**: Test image with gray overlay before committing
2. **Consider context**: Choose images relevant to article content
3. **Maintain consistency**: Use similar style/tone across articles
4. **Test on devices**: Verify appearance on desktop and mobile

### File Management

1. **Organize properly**: Use correct directory structure
2. **Name descriptively**: Use clear, descriptive filenames
3. **Compress images**: Optimize for web before uploading
4. **Version control**: Keep images in Git for consistency

### Accessibility

1. **High contrast**: Ensure text remains readable
2. **Alt text**: Provide meaningful descriptions
3. **Fallback**: Design works without images if they fail to load
4. **Screen readers**: Text content is still accessible

## Integration with Analytics

Overlay images are tracked through the analytics system:

- **Card interactions** are monitored
- **Visual engagement** metrics are captured
- **Performance impact** is measured

## Future Enhancements

Potential improvements to consider:

1. **Dynamic overlays**: Adjust overlay opacity based on image brightness
2. **Multiple images**: Support for different images per device type
3. **Lazy loading**: Improve performance with deferred loading
4. **Image optimization**: Automatic compression and format conversion
5. **Content-aware cropping**: Smart cropping for different aspect ratios

## Troubleshooting

### Common Issues and Solutions

**Overlay image not showing:**

- Check file path in metadata
- Verify file exists in correct location
- Ensure `useBackgroundImages` prop is enabled

**Poor text readability:**

- Choose darker base image
- Avoid images with high contrast patterns
- Test with actual content text

**Slow loading:**

- Compress image files
- Use WEBP format
- Consider smaller dimensions

**Mobile display issues:**

- Test responsive behavior
- Verify image scales properly
- Check text remains readable on small screens

### Getting Help

If you encounter issues:

1. **Check browser console** for loading errors
2. **Verify file paths** match exactly
3. **Test in incognito mode** to rule out caching
4. **Compare with working examples** in the codebase

## Examples

### Working Implementations

Current articles with overlay images:

- **`anderson-podcast.md`**: Uses portrait-style image with good contrast
- **`history-ai.md`**: Movie poster style with dramatic lighting
- **`llm-leaderboards.md`**: Tech interface screenshot with dark background

These provide good examples of effective overlay image usage in the portfolio
system.
