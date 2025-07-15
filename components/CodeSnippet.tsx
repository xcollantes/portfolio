/** Code snippet component with GitHub gist styling and proper syntax highlighting. */

import { useState } from "react"
import {
  Box,
  Typography,
  IconButton,
  useTheme,
  Theme,
  Tooltip,
  Link,
} from "@mui/material"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import CheckIcon from "@mui/icons-material/Check"
import OpenInNewIcon from "@mui/icons-material/OpenInNew"
import FavoriteIcon from "@mui/icons-material/Favorite"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import {
  vscDarkPlus,
  vs
} from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { useToastNotification } from "../hooks/useToastNotification"

export interface CodeSnippetProps {
  /** Code content to display. */
  code: string
  /** Programming language for syntax highlighting and display. */
  language?: string
  /** Optional filename to display in header. */
  filename?: string
  /** Optional title/description. */
  title?: string
  /** Maximum height before scrolling. */
  maxHeight?: string
  /** Show line numbers. */
  showLineNumbers?: boolean
  /** Show view raw link. */
  showViewRaw?: boolean
}

export default function CodeSnippet({
  code,
  language = "text",
  filename,
  title,
  maxHeight = "400px",
  showLineNumbers = true,
  showViewRaw = true,
}: CodeSnippetProps) {
  const theme: Theme = useTheme()
  const toast = useToastNotification()
  const [copied, setCopied] = useState<boolean>(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      toast.success("Code copied to clipboard!")

      // Reset copy state after 2 seconds
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Failed to copy code:", error)
      toast.error("Failed to copy code")
    }
  }

  const handleViewRaw = () => {
    const blob = new Blob([code], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    window.open(url, '_blank')
    setTimeout(() => URL.revokeObjectURL(url), 100)
  }

  const getLanguageDisplay = (lang: string): string => {
    const languageMap: { [key: string]: string } = {
      javascript: "JavaScript",
      typescript: "TypeScript",
      python: "Python",
      bash: "Bash",
      shell: "Shell",
      json: "JSON",
      yaml: "YAML",
      css: "CSS",
      html: "HTML",
      jsx: "JSX",
      tsx: "TSX",
      sql: "SQL",
      markdown: "Markdown",
      text: "Text",
    }
    return languageMap[lang.toLowerCase()] || lang
  }

  // Get the appropriate syntax highlighting style based on theme
  const syntaxStyle = theme.palette.mode === "dark" ? vscDarkPlus : vs

  // Custom style overrides to match the GitHub gist appearance
  const customSyntaxStyle = {
    ...syntaxStyle,
    'pre[class*="language-"]': {
      ...syntaxStyle['pre[class*="language-"]'],
      margin: 0,
      padding: '12px 16px',
      backgroundColor: 'transparent',
      fontSize: '12px',
      fontFamily: "'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, monospace",
      lineHeight: '1.45',
      overflow: 'visible',
    },
    'code[class*="language-"]': {
      ...syntaxStyle['code[class*="language-"]'],
      fontSize: '12px',
      fontFamily: "'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, monospace",
      lineHeight: '1.45',
      backgroundColor: 'transparent',
    },
  }

  return (
    <Box
      sx={{
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: "6px",
        backgroundColor: theme.palette.background.paper,
        overflow: "hidden",
        my: 2,
        fontFamily: "monospace",
        fontSize: "12px",
        boxShadow: theme.palette.mode === "dark"
          ? "0 1px 3px rgba(0,0,0,0.3)"
          : "0 1px 3px rgba(0,0,0,0.1)",
      }}
    >
      {/* Header */}
      {(filename || title) && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 16px",
            backgroundColor: theme.palette.mode === "dark"
              ? "#2d333b"
              : "#f6f8fa",
            borderBottom: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {filename && (
              <Typography
                variant="body2"
                sx={{
                  fontFamily: "'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, monospace",
                  fontWeight: 600,
                  color: theme.palette.text.primary,
                  fontSize: "14px",
                }}
              >
                {filename}
              </Typography>
            )}
            {title && !filename && (
              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.text.secondary,
                  fontStyle: "italic",
                  fontSize: "13px",
                }}
              >
                {title}
              </Typography>
            )}
          </Box>

          {showViewRaw && (
            <Tooltip title="View raw">
              <IconButton
                size="small"
                onClick={handleViewRaw}
                sx={{
                  color: theme.palette.text.secondary,
                  fontSize: "12px",
                  "&:hover": {
                    color: theme.palette.primary.main,
                  },
                }}
              >
                <OpenInNewIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      )}

      {/* Code Content with Syntax Highlighting */}
      <Box
        sx={{
          backgroundColor: theme.palette.mode === "dark"
            ? "#0d1117"
            : "#ffffff",
          maxHeight: maxHeight,
          overflow: "auto",

          // Custom scrollbar styling
          "&::-webkit-scrollbar": {
            width: "8px",
            height: "8px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: theme.palette.mode === "dark"
              ? "rgba(255, 255, 255, 0.05)"
              : "rgba(0, 0, 0, 0.05)",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: theme.palette.mode === "dark"
              ? "rgba(255, 255, 255, 0.2)"
              : "rgba(0, 0, 0, 0.2)",
            borderRadius: "4px",
            "&:hover": {
              backgroundColor: theme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.3)"
                : "rgba(0, 0, 0, 0.3)",
            },
          },
        }}
      >
        <SyntaxHighlighter
          language={language}
          style={customSyntaxStyle}
          showLineNumbers={showLineNumbers}
          customStyle={{
            margin: 0,
            backgroundColor: 'transparent',
            maxHeight: 'none',
            overflow: 'visible',
          }}
          lineNumberStyle={{
            color: theme.palette.text.disabled,
            backgroundColor: theme.palette.mode === "dark" ? "#161b22" : "#f6f8fa",
            paddingRight: '8px',
            borderRight: `1px solid ${theme.palette.divider}`,
            marginRight: '8px',
            fontSize: '12px',
            fontFamily: "'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, monospace",
            userSelect: 'none',
          }}
          wrapLines={true}
          wrapLongLines={true}
        >
          {code}
        </SyntaxHighlighter>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "8px 16px",
          backgroundColor: theme.palette.mode === "dark"
            ? "#21262d"
            : "#f6f8fa",
          borderTop: `1px solid ${theme.palette.divider}`,
          fontSize: "12px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <Typography
            variant="caption"
            sx={{
              color: theme.palette.text.secondary,
              fontSize: "11px",
            }}
          >
            {filename || "snippet"} hosted with
          </Typography>
          <FavoriteIcon
            sx={{
              fontSize: 12,
              color: "#e25555",
              mx: 0.5,
            }}
          />
          <Link
            href="https://github.com/xcollantes/portfolio"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: theme.palette.text.secondary,
              textDecoration: "none",
              fontSize: "11px",
              "&:hover": {
                color: theme.palette.primary.main,
                textDecoration: "underline",
              },
            }}
          >
            by portfolio
          </Link>
        </Box>

        <Tooltip title={copied ? "Copied!" : "Copy to clipboard"}>
          <IconButton
            size="small"
            onClick={copyToClipboard}
            sx={{
              color: theme.palette.text.secondary,
              "&:hover": {
                color: theme.palette.primary.main,
              },
            }}
          >
            {copied ? (
              <CheckIcon sx={{ fontSize: 14 }} />
            ) : (
              <ContentCopyIcon sx={{ fontSize: 14 }} />
            )}
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  )
}