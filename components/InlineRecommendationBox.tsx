/** Inline recommendation box for blog articles */

import {
  Article,
  Book,
  Code,
  Link as LinkIcon,
  ShoppingCart,
  TipsAndUpdates,
} from "@mui/icons-material"
import {
  Box,
  Card,
  CardContent,
  Chip,
  Typography,
  useTheme,
} from "@mui/material"
import Link from "next/link"
import { ReactNode } from "react"

// Recommendation types and their associated icons
export type RecommendationType = 
  | "article"
  | "tool"
  | "code"
  | "learning"
  | "product"
  | "tip"

interface RecommendationBoxProps {
  type: RecommendationType
  title: string
  description: string
  url?: string
  urlText?: string
  children?: ReactNode
}

const getRecommendationConfig = (type: RecommendationType) => {
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
    case "product":
      return {
        icon: <ShoppingCart />,
        label: "Product",
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
  }
}

export default function InlineRecommendationBox({
  type,
  title,
  description,
  url,
  urlText = "Learn more",
  children,
}: RecommendationBoxProps) {
  const theme = useTheme()
  const config = getRecommendationConfig(type)

  const isDarkMode = theme.palette.mode === "dark"

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
            {/* Type chip and title */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 1,
                flexWrap: "wrap",
              }}
            >
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
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: "bold",
                  color: isDarkMode ? "white" : "text.primary",
                  flex: 1,
                }}
              >
                {title}
              </Typography>
            </Box>

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