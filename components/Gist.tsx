/** GitHub Gist component that fetches and displays gist content using CodeSnippet. */

import GitHubIcon from "@mui/icons-material/GitHub"
import OpenInNewIcon from "@mui/icons-material/OpenInNew"
import {
  Alert,
  Avatar,
  Box,
  CircularProgress,
  Link,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from "@mui/material"
import React, { useEffect, useState } from "react"
import CodeSnippet from "./CodeSnippet"
import {
  fetchGistData,
  getLanguageFromFilename,
  getPrimaryGistFile,
  GistData
} from "./GistUtils"

export interface GistProps {
  /** GitHub gist ID or URL. */
  gistId: string
  /** Optional specific filename to display (if gist has multiple files). */
  filename?: string
  /** Optional title override. */
  title?: string
  /** Maximum height before scrolling. */
  maxHeight?: string
  /** Show line numbers. */
  showLineNumbers?: boolean
  /** Show view raw link. */
  showViewRaw?: boolean
  /** Show gist metadata (author, description, link to GitHub). */
  showMetadata?: boolean
}

export default function Gist({
  gistId,
  filename,
  title,
  maxHeight = "400px",
  showLineNumbers = true,
  showViewRaw = true,
  showMetadata = true,
}: GistProps) {
  const theme = useTheme()
  const [gistData, setGistData] = useState<GistData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<string>("")

  useEffect(() => {
    const loadGist = async () => {
      try {
        setLoading(true)
        setError(null)

        const data = await fetchGistData(gistId)
        if (!data) {
          setError("Failed to load gist. Please check the gist ID or URL.")
          return
        }

        setGistData(data)

        // Determine which file to show
        if (filename) {
          // User specified a filename
          if (data.files[filename]) {
            setSelectedFile(filename)
          } else {
            setError(`File "${filename}" not found in gist.`)
            return
          }
        } else {
          // Show primary file or first file
          const primaryFile = getPrimaryGistFile(data)
          if (primaryFile) {
            setSelectedFile(primaryFile.filename)
          }
        }
      } catch (err) {
        setError("An error occurred while loading the gist.")
        console.error("Gist loading error:", err)
      } finally {
        setLoading(false)
      }
    }

    loadGist()
  }, [gistId, filename])

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 4,
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: "6px",
          my: 2,
        }}
      >
        <CircularProgress size={24} sx={{ mr: 2 }} />
        <Typography variant="body2" color="text.secondary">
          Loading gist...
        </Typography>
      </Box>
    )
  }

  if (error || !gistData) {
    return (
      <Alert severity="error" sx={{ my: 2 }}>
        {error || "Failed to load gist"}
      </Alert>
    )
  }

  const files = Object.values(gistData.files)
  const currentFile = gistData.files[selectedFile]

  if (!currentFile) {
    return (
      <Alert severity="error" sx={{ my: 2 }}>
        No file selected or file not found in gist.
      </Alert>
    )
  }

  // Determine language for syntax highlighting
  const language = currentFile.language?.toLowerCase() ||
    getLanguageFromFilename(currentFile.filename)

  // Handle file tabs if multiple files
  const handleFileChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedFile(newValue)
  }

  return (
    <Box sx={{ my: 2 }}>
      {/* Gist metadata */}
      {showMetadata && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            mb: 1,
            p: 2,
            backgroundColor: theme.palette.mode === "dark"
              ? "rgba(255, 255, 255, 0.05)"
              : "rgba(0, 0, 0, 0.02)",
            borderRadius: "6px 6px 0 0",
            border: `1px solid ${theme.palette.divider}`,
            borderBottom: "none",
          }}
        >
          <GitHubIcon sx={{ fontSize: 20, color: theme.palette.text.secondary }} />

          <Avatar
            src={gistData.owner.avatar_url}
            alt={gistData.owner.login}
            sx={{ width: 24, height: 24 }}
          />

          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {gistData.description || "Untitled gist"}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              by{" "}
              <Link
                href={gistData.owner.html_url}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ textDecoration: "none" }}
              >
                {gistData.owner.login}
              </Link>
            </Typography>
          </Box>

          <Link
            href={gistData.html_url}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              color: theme.palette.text.secondary,
              textDecoration: "none",
              fontSize: "12px",
              "&:hover": {
                color: theme.palette.primary.main,
              },
            }}
          >
            View on GitHub
            <OpenInNewIcon sx={{ fontSize: 12 }} />
          </Link>
        </Box>
      )}

      {/* File tabs if multiple files */}
      {files.length > 1 && (
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            backgroundColor: theme.palette.mode === "dark"
              ? "#2d333b"
              : "#f6f8fa",
            borderLeft: `1px solid ${theme.palette.divider}`,
            borderRight: `1px solid ${theme.palette.divider}`,
            borderTop: showMetadata ? "none" : `1px solid ${theme.palette.divider}`,
            borderRadius: showMetadata ? "0" : "6px 6px 0 0",
          }}
        >
          <Tabs
            value={selectedFile}
            onChange={handleFileChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              minHeight: 40,
              "& .MuiTab-root": {
                minHeight: 40,
                fontSize: "12px",
                fontFamily: "'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, monospace",
                textTransform: "none",
                color: theme.palette.text.secondary,
                "&.Mui-selected": {
                  color: theme.palette.text.primary,
                },
              },
            }}
          >
            {files.map((file) => (
              <Tab
                key={file.filename}
                label={file.filename}
                value={file.filename}
              />
            ))}
          </Tabs>
        </Box>
      )}

      {/* Code content */}
      <Box
        sx={{
          "& > div": {
            borderRadius: showMetadata || files.length > 1 ? "0 0 6px 6px" : "6px",
            borderTop: showMetadata || files.length > 1 ? "none" : undefined,
            my: 0,
          }
        }}
      >
        <CodeSnippet
          code={currentFile.content}
          language={language}
          filename={currentFile.filename}
          title={title}
          maxHeight={maxHeight}
          showLineNumbers={showLineNumbers}
          showViewRaw={showViewRaw}
        />
      </Box>
    </Box>
  )
}