import { useState } from 'react'
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Alert,
  CircularProgress,
  Snackbar
} from '@mui/material'
import { Send as SendIcon } from '@mui/icons-material'

interface FeedbackFormData {
  name: string
  email: string
  subject: string
  message: string
}

interface FeedbackFormProps {
  onSuccess?: () => void
  onError?: (error: string) => void
}

export default function FeedbackForm({ onSuccess, onError }: FeedbackFormProps) {
  const [formData, setFormData] = useState<FeedbackFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Partial<FeedbackFormData>>({})
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const validateForm = (): boolean => {
    const newErrors: Partial<FeedbackFormData> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters long'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof FeedbackFormData) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }))

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }))
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)
    setShowError(false)

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send feedback')
      }

      // Success - reset form and show success message
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      })
      setShowSuccess(true)
      onSuccess?.()

    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unexpected error occurred'
      setErrorMessage(message)
      setShowError(true)
      onError?.(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Paper elevation={3} sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>

        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={formData.name}
            onChange={handleInputChange('name')}
            error={!!errors.name}
            helperText={errors.name}
            disabled={loading}
            required
          />

          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            value={formData.email}
            onChange={handleInputChange('email')}
            error={!!errors.email}
            helperText={errors.email || 'You\'ll receive a confirmation email'}
            disabled={loading}
            required
          />

          <TextField
            label="Subject"
            variant="outlined"
            fullWidth
            value={formData.subject}
            onChange={handleInputChange('subject')}
            error={!!errors.subject}
            helperText={errors.subject}
            disabled={loading}
            required
          />

          <TextField
            label="Message"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={formData.message}
            onChange={handleInputChange('message')}
            error={!!errors.message}
            helperText={errors.message || `${formData.message.length}/1000 characters`}
            inputProps={{ maxLength: 1000 }}
            disabled={loading}
            required
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            startIcon={loading ? <CircularProgress size={16} color="inherit" /> : <SendIcon />}
            disabled={loading}
            sx={{ mt: 1 }}
          >
            {loading ? 'Sending...' : 'Send Feedback'}
          </Button>
        </Box>
      </Paper>

      {/* Success Snackbar */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setShowSuccess(false)}
          severity="success"
          sx={{ width: '100%' }}
        >
          Feedback sent successfully! Check your email for confirmation.
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
      <Snackbar
        open={showError}
        autoHideDuration={8000}
        onClose={() => setShowError(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setShowError(false)}
          severity="error"
          sx={{ width: '100%' }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  )
}

export type { FeedbackFormData, FeedbackFormProps }