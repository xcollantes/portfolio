/**
 * Analytics Test Page
 * 
 * Temporary page for testing Google Analytics implementation.
 * Remove this file after GA4 is working properly.
 */

import { Container, Typography, Button, Box, Paper } from "@mui/material"
import { sendGAEvent } from "@next/third-parties/google"
import { useEffect, useState } from "react"
import { trackUserInteraction, trackPageView } from "../components/AnalyticsUtils"

export default function AnalyticsTest() {
  const [events, setEvents] = useState<string[]>([])

  useEffect(() => {
    // Track page view for this test page
    trackPageView('/analytics-test', 'Analytics Test Page')
    addEvent('Page view tracked')
  }, [])

  const addEvent = (event: string) => {
    setEvents(prev => [`${new Date().toLocaleTimeString()} - ${event}`, ...prev])
  }

  const testEvents = [
    {
      name: "Test Button Click",
      action: () => {
        trackUserInteraction('click', 'test_button', 'test_page')
        addEvent('Button click tracked')
      }
    },
    {
      name: "Test Custom Event",
      action: () => {
        sendGAEvent("custom_test_event", {
          test_parameter: "test_value",
          timestamp: Date.now()
        })
        addEvent('Custom event sent')
      }
    },
    {
      name: "Test Standard GA4 Event",
      action: () => {
        sendGAEvent("select_content", {
          content_type: "test",
          content_id: "analytics_test_button"
        })
        addEvent('Standard GA4 event sent')
      }
    },
    {
      name: "Test Engagement Event",
      action: () => {
        sendGAEvent("user_engagement", {
          engagement_time_msec: 30000, // 30 seconds
          page_path: '/analytics-test'
        })
        addEvent('Engagement event sent')
      }
    }
  ]

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        🔍 Google Analytics Test Page
      </Typography>
      
      <Typography variant="body1" paragraph>
        This page helps test your Google Analytics 4 setup. Use the buttons below to send test events, 
        then check your GA4 Real-time reports to see if they appear.
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          GA4 Setup Information
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          <strong>GA4 Property ID:</strong> G-HB7D403D67
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          <strong>How to check:</strong>
        </Typography>
        <ol>
          <li>Open your browser's Developer Tools (F12)</li>
          <li>Go to the Network tab</li>
          <li>Filter by "collect" or "gtag"</li>
          <li>Click the test buttons below</li>
          <li>Look for network requests to Google Analytics</li>
          <li>Check GA4 Real-time reports: <a href="https://analytics.google.com/analytics/web/" target="_blank" rel="noopener noreferrer">analytics.google.com</a></li>
        </ol>
      </Paper>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Test Events
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {testEvents.map((event, index) => (
            <Button
              key={index}
              variant="outlined"
              onClick={event.action}
              sx={{ mb: 1 }}
            >
              {event.name}
            </Button>
          ))}
        </Box>
      </Box>

      <Paper sx={{ p: 2, backgroundColor: '#1e1e1e', color: '#00ff00', fontFamily: 'monospace' }}>
        <Typography variant="h6" gutterBottom sx={{ color: '#ffffff' }}>
          Event Log
        </Typography>
        <Box sx={{ maxHeight: '200px', overflowY: 'auto' }}>
          {events.length === 0 ? (
            <Typography variant="body2" sx={{ color: '#666' }}>
              No events logged yet...
            </Typography>
          ) : (
            events.map((event, index) => (
              <Box key={index} sx={{ fontSize: '0.875rem', mb: 0.5 }}>
                {event}
              </Box>
            ))
          )}
        </Box>
      </Paper>

      <Box sx={{ mt: 3, p: 2, backgroundColor: 'warning.light', borderRadius: 1 }}>
        <Typography variant="body2" color="text.primary">
          <strong>Remember:</strong> This is a test page. Delete /pages/analytics-test.tsx after confirming GA4 works.
        </Typography>
      </Box>
    </Container>
  )
}