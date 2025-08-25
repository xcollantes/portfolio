/** Newsletter signup component for collecting email subscriptions. */

import EmailIcon from "@mui/icons-material/Email"
import SubscriptionsIcon from "@mui/icons-material/Subscriptions"
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import { useState } from "react"
import { useToastNotification } from "../hooks/useToastNotification"

interface NewsletterSignupProps {
  variant?: "compact" | "full"
  title?: string
  subtitle?: string
}

export default function NewsletterSignup({ 
  variant = "full",
  title = "Stay Updated",
  subtitle = "Get the latest articles and insights delivered to your inbox."
}: NewsletterSignupProps) {
  const [email, setEmail] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)
  const toast = useToastNotification()

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email.trim()) {
      toast.error("Email is required")
      return
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address")
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.toLowerCase().trim() }),
      })

      const data = await response.json()

      if (data.success) {
        setSuccess(true)
        setEmail("")
        toast.success("Successfully subscribed to newsletter!")
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setSuccess(false)
        }, 5000)
      } else {
        toast.error(data.message || "Failed to subscribe. Please try again.")
      }

    } catch (error) {
      console.error("Error subscribing to newsletter:", error)
      toast.error("Failed to subscribe. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <Paper 
        elevation={2} 
        sx={{ 
          p: variant === "compact" ? 2 : 3, 
          textAlign: "center",
          backgroundColor: "success.light",
          color: "success.contrastText"
        }}
      >
        <Stack spacing={2} alignItems="center">
          <SubscriptionsIcon sx={{ fontSize: 40 }} />
          <Typography variant="h6">
            Successfully Subscribed!
          </Typography>
          <Typography variant="body2">
            Thank you for subscribing to our newsletter. You'll receive updates in your inbox.
          </Typography>
        </Stack>
      </Paper>
    )
  }

  return (
    <Paper elevation={2} sx={{ p: variant === "compact" ? 2 : 3 }}>
      <Stack spacing={2}>
        {variant === "full" && (
          <Box textAlign="center">
            <Typography variant="h5" component="h2" gutterBottom>
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
          </Box>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              fullWidth
              type="email"
              label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <EmailIcon sx={{ mr: 1, color: "action.active" }} />
                ),
              }}
              placeholder="your.email@example.com"
              disabled={loading}
              autoComplete="email"
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={loading || !email.trim()}
              startIcon={loading ? <CircularProgress size={20} /> : <SubscriptionsIcon />}
              sx={{
                textTransform: "none",
                fontWeight: "bold",
              }}
            >
              {loading ? "Subscribing..." : "Subscribe to Newsletter"}
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Paper>
  )
}