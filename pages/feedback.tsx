import { Box, Container, Typography } from '@mui/material'
import Head from 'next/head'
import { FeedbackForm } from '../components'

export default function FeedbackPage() {
  return (
    <>
      <Head>
        <title>Feedback - Xavier Collantes</title>
        <meta name="description" content="Send feedback, suggestions, or report issues" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Feedback
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto', mb: 2 }}>
            Found a bug? Have a suggestion? I'd love to hear from you.
          </Typography>
        </Box>

        <FeedbackForm
          onSuccess={() => {
            // Could add additional success handling here if needed
            console.log('Feedback sent successfully')
          }}
          onError={(error) => {
            // Could add additional error handling here if needed
            console.error('Feedback error:', error)
          }}
        />
      </Container>
    </>
  )
}