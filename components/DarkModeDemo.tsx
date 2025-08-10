/** Demo component showcasing dark mode CSS classes and features */

import { Box, Card, CardContent, Typography, Button, TextField, Chip } from "@mui/material"
import { useState } from "react"
import { useDarkMode, DarkModeClassNames, combineDarkModeClasses } from "../hooks/useDarkMode"

export default function DarkModeDemo() {
  const { isDark, toggle } = useDarkMode()
  const [inputValue, setInputValue] = useState("")

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: "auto" }}>
      <Typography variant="h3" className={DarkModeClassNames.textPrimary} sx={{ mb: 3 }}>
        Dark Mode Demo
      </Typography>

      {/* Theme Toggle */}
      <Card className={DarkModeClassNames.card} sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5" className={DarkModeClassNames.textPrimary} sx={{ mb: 2 }}>
            Theme Control
          </Typography>
          <Button
            className={DarkModeClassNames.button}
            onClick={toggle}
            sx={{ mr: 2 }}
          >
            Switch to {isDark ? 'Light' : 'Dark'} Mode
          </Button>
          <Chip
            label={`Current: ${isDark ? 'Dark' : 'Light'} Mode`}
            className={DarkModeClassNames.badge}
          />
        </CardContent>
      </Card>

      {/* Button Examples */}
      <Card className={DarkModeClassNames.card} sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5" className={DarkModeClassNames.textPrimary} sx={{ mb: 2 }}>
            Button Styles
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
            <button className={DarkModeClassNames.button}>
              Primary Button
            </button>
            <button className={DarkModeClassNames.buttonSecondary}>
              Secondary Button
            </button>
            <button className={DarkModeClassNames.buttonOutline}>
              Outline Button
            </button>
          </Box>
        </CardContent>
      </Card>

      {/* Input Examples */}
      <Card className={DarkModeClassNames.card} sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5" className={DarkModeClassNames.textPrimary} sx={{ mb: 2 }}>
            Form Elements
          </Typography>
          <input
            className={DarkModeClassNames.input}
            type="text"
            placeholder="Dark mode input field"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{ width: '100%', marginBottom: '1rem' }}
          />
          <TextField
            label="Material UI TextField"
            variant="outlined"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            fullWidth
          />
        </CardContent>
      </Card>

      {/* Code Example */}
      <Card className={DarkModeClassNames.card} sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5" className={DarkModeClassNames.textPrimary} sx={{ mb: 2 }}>
            Code Block
          </Typography>
          <pre className={DarkModeClassNames.code}>
{`// Example usage of dark mode hook
import { useDarkMode } from '../hooks/useDarkMode'

function MyComponent() {
  const { isDark, toggle } = useDarkMode()
  
  return (
    <div className="dark-mode-card">
      <p>Current mode: {isDark ? 'Dark' : 'Light'}</p>
      <button onClick={toggle}>Toggle Mode</button>
    </div>
  )
}`}
          </pre>
        </CardContent>
      </Card>

      {/* Badge Examples */}
      <Card className={DarkModeClassNames.card} sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5" className={DarkModeClassNames.textPrimary} sx={{ mb: 2 }}>
            Status Badges
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <span className={DarkModeClassNames.badge}>Default</span>
            <span className={DarkModeClassNames.badgeSuccess}>Success</span>
            <span className={DarkModeClassNames.badgeWarning}>Warning</span>
            <span className={DarkModeClassNames.badgeError}>Error</span>
          </Box>
        </CardContent>
      </Card>

      {/* Text Examples */}
      <Card className={DarkModeClassNames.card}>
        <CardContent>
          <Typography variant="h5" className={DarkModeClassNames.textPrimary} sx={{ mb: 2 }}>
            Text Hierarchy
          </Typography>
          <Typography className={DarkModeClassNames.textPrimary} sx={{ mb: 1 }}>
            Primary text - Main content and headings
          </Typography>
          <Typography className={DarkModeClassNames.textSecondary} sx={{ mb: 1 }}>
            Secondary text - Descriptions and less important content
          </Typography>
          <Typography className={DarkModeClassNames.textMuted}>
            Muted text - Captions, timestamps, and subtle information
          </Typography>
          <hr className={DarkModeClassNames.divider} />
          <a href="#" className={DarkModeClassNames.link}>
            This is a themed link
          </a>
        </CardContent>
      </Card>
    </Box>
  )
}