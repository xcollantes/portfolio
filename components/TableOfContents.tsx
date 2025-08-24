/** Table of Contents component for blog articles. */

import { Box, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material"
import { useEffect, useState } from "react"

interface TOCItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  markdownContent: string
}

export default function TableOfContents({ markdownContent }: TableOfContentsProps) {
  const [tocItems, setTocItems] = useState<TOCItem[]>([])
  const [activeId, setActiveId] = useState<string>("")

  // Extract headers from markdown content.
  useEffect(() => {
    // Remove code blocks (both fenced and indented) to avoid parsing # inside them
    const contentWithoutCodeBlocks = markdownContent
      .replace(/```[\s\S]*?```/g, '') // Remove fenced code blocks
      .replace(/^\s{4,}.*$/gm, '') // Remove indented code blocks
    
    const headerRegex = /^(#{1,6})\s+(.+)$/gm
    const items: TOCItem[] = []
    let match

    while ((match = headerRegex.exec(contentWithoutCodeBlocks)) !== null) {
      const level = match[1].length // Number of # characters
      const text = match[2].trim()

      // Skip H6 headers as they are used for captions
      if (level === 6) {
        continue
      }

      // Create a URL-friendly ID from the header text
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') // Remove non-word characters except spaces and hyphens
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
        .trim()

      items.push({ id, text, level })
    }

    setTocItems(items)
  }, [markdownContent])

  // Track active section based on scroll position.
  useEffect(() => {
    const handleScroll = () => {
      const headers = tocItems.map(item => document.getElementById(item.id)).filter(Boolean)

      if (headers.length === 0) return

      // Find the header that's currently in view
      let activeHeader = headers[0]
      for (const header of headers) {
        if (header && header.offsetTop <= window.scrollY + 100) {
          activeHeader = header
        } else {
          break
        }
      }

      if (activeHeader) {
        setActiveId(activeHeader.id)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Set initial active header

    return () => window.removeEventListener('scroll', handleScroll)
  }, [tocItems])

  const handleClick = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  if (tocItems.length === 0) {
    return null
  }

  return (
    <Box
      sx={{
        position: 'sticky',
        top: 24,
        maxHeight: 'calc(100vh - 48px)',
        overflowY: 'auto',
        width: 250,
        padding: 2,
        backgroundColor: (theme) => theme.palette.mode === 'dark'
          ? 'rgba(255, 255, 255, 0.02)'
          : 'rgba(0, 0, 0, 0.02)',
        borderRadius: 2,
        border: (theme) => `1px solid ${theme.palette.mode === 'dark'
          ? 'rgba(255, 255, 255, 0.1)'
          : 'rgba(0, 0, 0, 0.1)'}`,
      }}
    >
      <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
        Contents
      </Typography>

      <List dense sx={{ p: 0 }}>
        {tocItems.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton
              onClick={() => handleClick(item.id)}
              sx={{
                py: 0.5,
                px: 1,
                ml: (item.level - 2) * 1.5, // Indent based on header level (h2 = 0, h3 = 1.5, etc.)
                borderRadius: 1,
                backgroundColor: activeId === item.id
                  ? (theme) => theme.palette.mode === 'dark'
                    ? 'rgba(59, 130, 246, 0.2)'
                    : 'rgba(37, 99, 235, 0.1)'
                  : 'transparent',
                '&:hover': {
                  backgroundColor: (theme) => theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.1)'
                    : 'rgba(0, 0, 0, 0.05)',
                },
              }}
            >
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  variant: item.level === 2 ? 'body2' : 'caption',
                  fontWeight: item.level === 2 ? 'medium' : 'normal',
                  color: activeId === item.id
                    ? (theme) => theme.palette.mode === 'dark'
                      ? 'var(--primary-dark)'
                      : 'var(--primary-light)'
                    : 'text.primary',
                  sx: {
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}