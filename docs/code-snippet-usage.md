# CodeSnippet Component Usage

The `CodeSnippet` component provides GitHub gist-style code display with copy functionality and language detection. It automatically integrates with the article markdown system.

## Features

- 🎨 **GitHub gist-inspired design** with authentic styling
- 📋 **One-click copy functionality** with visual feedback
- 🔢 **Line numbers** for easy reference
- 📁 **Filename display** in header
- 🔗 **View raw** functionality to open code in new tab
- 💖 **"Hosted with ❤️ by portfolio"** footer like GitHub gists
- 🌙 **Dark mode support** with proper color schemes
- 📱 **Responsive design** with custom scrollbars
- ♿ **Accessible** with proper ARIA labels and tooltips

## Automatic Integration

The component automatically handles code blocks in your markdown articles. Just use standard markdown fenced code blocks:

### Basic Code Block

```javascript
function greet(name) {
  return `Hello, ${name}!`;
}
```

### With Language Specification

```python
def calculate_fibonacci(n):
    if n <= 1:
        return n
    return calculate_fibonacci(n-1) + calculate_fibonacci(n-2)
```

### With Filename (using comment)

```typescript
// utils.ts
export interface User {
  id: string;
  name: string;
  email: string;
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
```

```python
# data_processor.py
import pandas as pd
from typing import List, Dict

def process_data(data: List[Dict]) -> pd.DataFrame:
    """Process raw data into a pandas DataFrame."""
    df = pd.DataFrame(data)
    return df.dropna().reset_index(drop=True)
```

## Direct Component Usage

You can also use the component directly in React/TSX files:

```tsx
import CodeSnippet from "@/components/CodeSnippet";

// Basic usage
<CodeSnippet
  code="console.log('Hello, World!');"
  language="javascript"
/>

// With filename and line numbers (default)
<CodeSnippet
  code="const app = express();"
  language="typescript"
  filename="server.ts"
/>

// Custom configuration
<CodeSnippet
  code={longCodeString}
  language="python"
  filename="data_processor.py"
  maxHeight="300px"
  showLineNumbers={true}
  showViewRaw={true}
/>

// Minimal version without line numbers
<CodeSnippet
  code="npm install react"
  language="bash"
  showLineNumbers={false}
  showViewRaw={false}
/>
```

## Supported Languages

The component recognizes and displays proper names for:

- JavaScript/TypeScript
- Python
- Bash/Shell
- JSON/YAML
- HTML/CSS
- JSX/TSX
- SQL
- Markdown
- And more...

## Filename Detection

The component can automatically detect filenames from comments at the beginning of code blocks:

- JavaScript/TypeScript: `// filename.js`
- Python/Shell: `# filename.py`
- HTML: `<!-- filename.html -->`
- CSS: `/* filename.css */`

## Styling

The component now closely matches GitHub gist styling and automatically adapts to your theme's dark/light mode. It includes:

- **Authentic GitHub gist appearance** with proper spacing and colors
- **Line numbers** with GitHub-style background colors
- **Professional monospace fonts** (SF Mono, Monaco, Cascadia Code)
- **Custom scrollbars** with theme-appropriate colors
- **Interactive elements** with hover effects and visual feedback
- **Footer section** mimicking "hosted with ❤️ by GitHub" style
- **View raw functionality** to open code in a new tab
- **Syntax highlighting** placeholders for future enhancement

### Color Schemes

**Light Mode:**
- Header/Footer: `#f6f8fa` background
- Line numbers: `#f6f8fa` background
- Code area: `#ffffff` background
- Borders: Material UI divider colors

**Dark Mode:**
- Header/Footer: `#2d333b` / `#21262d` backgrounds
- Line numbers: `#161b22` background
- Code area: `#0d1117` background
- Syntax colors: GitHub dark theme inspired colors

## Integration with Articles

To use in your articles, simply add code blocks to your markdown files. The component will automatically render them with the enhanced styling and functionality.

Example in an article:

```markdown
Here's how to create a simple Express server:

```typescript
// server.ts
import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

The code above demonstrates basic Express setup...
```

This will render with the full CodeSnippet styling, copy functionality, and show "TypeScript" as the language with "server.ts" as the filename.