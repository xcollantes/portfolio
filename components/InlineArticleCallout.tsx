/** Inline article callout for blog articles */

import {
  Article,
  Book,
  Code,
  Link as LinkIcon,
  Person,
  ShoppingCart,
  TipsAndUpdates,
} from "@mui/icons-material"
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Typography,
  useTheme,
} from "@mui/material"
import Link from "next/link"
import { ReactNode } from "react"

// Article callout types and their associated icons
export type ArticleCalloutType =
  | "article"
  | "tool"
  | "code"
  | "learning"
  | "sponsored"
  | "tip"
  | "recommendation"

interface ArticleCalloutProps {
  type: ArticleCalloutType
  title: string
  description: string
  url?: string
  urlText?: string
  children?: ReactNode
  // For testimonial type
  imageUrl?: string
  personName?: string
  quote?: string
}

const getCalloutConfig = (type: ArticleCalloutType) => {
  switch (type) {
    case "article":
      return {
        icon: <Article />,
        label: "Related Article",
        color: "#1976d2",
        bgColor: "rgba(25, 118, 210, 0.1)",
      }
    case "tool":
      return {
        icon: <TipsAndUpdates />,
        label: "Tool",
        color: "#ed6c02",
        bgColor: "rgba(237, 108, 2, 0.1)",
      }
    case "code":
      return {
        icon: <Code />,
        label: "Code Example",
        color: "#2e7d32",
        bgColor: "rgba(46, 125, 50, 0.1)",
      }
    case "learning":
      return {
        icon: <Book />,
        label: "Learning Resource",
        color: "#7b1fa2",
        bgColor: "rgba(123, 31, 162, 0.1)",
      }
    case "sponsored":
      return {
        icon: <ShoppingCart />,
        label: "Sponsored",
        color: "#d32f2f",
        bgColor: "rgba(211, 47, 47, 0.1)",
      }
    case "tip":
      return {
        icon: <TipsAndUpdates />,
        label: "Tip",
        color: "#f57c00",
        bgColor: "rgba(245, 124, 0, 0.1)",
      }
    case "recommendation":
      return {
        icon: <Person />,
        label: "Professional Testimonial",
        color: "#1976d2",
        bgColor: "rgba(25, 118, 210, 0.1)",
      }
  }
}

export default function InlineArticleCallout({
  type,
  title,
  description,
  url,
  urlText = "Learn more",
  children,
  imageUrl,
  personName,
  quote,
}: ArticleCalloutProps) {
  const theme = useTheme()
  const config = getCalloutConfig(type)

  const isDarkMode = theme.palette.mode === "dark"

  // Special layout for testimonial type
  if (type === "recommendation") {
    return (
      <Card
        sx={{
          my: 3,
          mx: 0,
          backgroundColor: isDarkMode
            ? `rgba(${config.color.slice(1).match(/.{2}/g)?.map(hex => parseInt(hex, 16)).join(", ")}, 0.15)`
            : config.bgColor,
          border: `1px solid ${isDarkMode ? config.color + "40" : config.color + "30"}`,
          borderLeft: `4px solid ${config.color}`,
          borderRadius: 2,
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            backgroundColor: isDarkMode
              ? `rgba(${config.color.slice(1).match(/.{2}/g)?.map(hex => parseInt(hex, 16)).join(", ")}, 0.2)`
              : config.bgColor.replace("0.1", "0.15"),
            borderColor: config.color,
            transform: "translateY(-1px)",
            boxShadow: isDarkMode
              ? `0 4px 12px rgba(${config.color.slice(1).match(/.{2}/g)?.map(hex => parseInt(hex, 16)).join(", ")}, 0.3)`
              : `0 4px 12px ${config.color}20`,
          },
        }}
        elevation={0}
      >
        <CardContent sx={{ py: 2, "&:last-child": { pb: 2 } }}>
          {/* Type chip */}
          <Box sx={{ mb: 1 }}>
            <Chip
              label={config.label}
              size="small"
              sx={{
                backgroundColor: `${config.color}15`,
                color: config.color,
                fontWeight: "medium",
                fontSize: "0.75rem",
              }}
            />
          </Box>

          {/* Header with avatar and person info */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            {imageUrl && (
              <Avatar
                src={imageUrl}
                alt={personName || "Recommender"}
                sx={{
                  width: 56,
                  height: 56,
                  border: `2px solid ${config.color}30`,
                }}
              />
            )}
            <Box sx={{ flex: 1 }}>
              {personName && (
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: "bold",
                    color: isDarkMode ? "white" : "text.primary",
                    mb: 0.5,
                  }}
                >
                  {personName}
                </Typography>
              )}
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: "bold",
                  color: isDarkMode ? "white" : "text.primary",
                }}
              >
                {title}
              </Typography>
            </Box>
          </Box>

          {/* Quote */}
          {quote && (
            <Box
              sx={{
                position: "relative",
                pl: 3,
                mb: 2,
                borderLeft: `3px solid ${config.color}30`,
                fontStyle: "italic",
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: isDarkMode ? "grey.300" : "text.secondary",
                  lineHeight: 1.6,
                  position: "relative",
                }}
              >
                "{quote}"
              </Typography>
            </Box>
          )}

          {/* Description */}
          <Typography
            variant="body2"
            sx={{
              color: isDarkMode ? "grey.300" : "text.secondary",
              lineHeight: 1.5,
              mb: children ? 1 : 0,
            }}
          >
            {description}
          </Typography>

          {/* Children content */}
          {children && (
            <Box sx={{ mt: 1, color: isDarkMode ? "grey.300" : "text.secondary" }}>
              {children}
            </Box>
          )}

          {/* Link */}
          {url && (
            <Box sx={{ mt: 2 }}>
              <Link
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  color: config.color,
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  fontWeight: "medium",
                  transition: "opacity 0.2s ease-in-out",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "0.8"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "1"
                }}
              >
                <LinkIcon sx={{ fontSize: 16 }} />
                {urlText}
              </Link>
            </Box>
          )}
        </CardContent>
      </Card>
    )
  }

  const cardStyles = {
    my: 3,
    mx: 0,
    backgroundColor: isDarkMode
      ? `rgba(${config.color.slice(1).match(/.{2}/g)?.map(hex => parseInt(hex, 16)).join(", ")}, 0.15)`
      : config.bgColor,
    border: `1px solid ${isDarkMode ? config.color + "40" : config.color + "30"}`,
    borderLeft: `4px solid ${config.color}`,
    borderRadius: 2,
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      backgroundColor: isDarkMode
        ? `rgba(${config.color.slice(1).match(/.{2}/g)?.map(hex => parseInt(hex, 16)).join(", ")}, 0.2)`
        : config.bgColor.replace("0.1", "0.15"),
      borderColor: config.color,
      transform: "translateY(-1px)",
      boxShadow: isDarkMode
        ? `0 4px 12px rgba(${config.color.slice(1).match(/.{2}/g)?.map(hex => parseInt(hex, 16)).join(", ")}, 0.3)`
        : `0 4px 12px ${config.color}20`,
    },
  }

  const content = (
    <Card sx={cardStyles} elevation={0}>
      <CardContent sx={{ py: 2, "&:last-child": { pb: 2 } }}>
        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
          {/* Icon */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 40,
              height: 40,
              borderRadius: "50%",
              backgroundColor: `${config.color}20`,
              color: config.color,
              flexShrink: 0,
            }}
          >
            {config.icon}
          </Box>

          {/* Content */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            {/* Type chip */}
            <Box sx={{ mb: 1 }}>
              <Chip
                label={config.label}
                size="small"
                sx={{
                  backgroundColor: `${config.color}15`,
                  color: config.color,
                  fontWeight: "medium",
                  fontSize: "0.75rem",
                }}
              />
            </Box>

            {/* Title */}
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: "bold",
                color: isDarkMode ? "white" : "text.primary",
                mb: 1,
              }}
            >
              {title}
            </Typography>

            {/* Description */}
            <Typography
              variant="body2"
              sx={{
                color: isDarkMode ? "grey.300" : "text.secondary",
                lineHeight: 1.5,
                mb: children ? 1 : 0,
              }}
            >
              {description}
            </Typography>

            {/* Children content */}
            {children && (
              <Box sx={{ mt: 1, color: isDarkMode ? "grey.300" : "text.secondary" }}>
                {children}
              </Box>
            )}

            {/* Link */}
            {url && (
              <Box sx={{ mt: 1 }}>
                <Link
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    color: config.color,
                    textDecoration: "none",
                    fontSize: "0.875rem",
                    fontWeight: "medium",
                    transition: "opacity 0.2s ease-in-out",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = "0.8"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = "1"
                  }}
                >
                  <LinkIcon sx={{ fontSize: 16 }} />
                  {urlText}
                </Link>
              </Box>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  )

  return content
}