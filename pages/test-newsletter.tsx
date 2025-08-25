/** Test page for newsletter signup component - can be deleted after testing */

import { Container, Stack, Typography } from "@mui/material"
import Head from "next/head"
import NewsletterSignup from "../components/NewsletterSignup"

export default function TestNewsletter() {
  return (
    <>
      <Head>
        <title>Newsletter Test - Xavier Collantes</title>
      </Head>

      <Container maxWidth="md" sx={{ py: 4 }}>
        <Stack spacing={4}>
          <Typography variant="h4" component="h1" textAlign="center">
            Newsletter Component Test
          </Typography>

          <div>
            <Typography variant="h6" gutterBottom>
              Full Variant:
            </Typography>
            <NewsletterSignup variant="full" />
          </div>

          <div>
            <Typography variant="h6" gutterBottom>
              Compact Variant:
            </Typography>
            <NewsletterSignup 
              variant="compact"
              title="Quick Subscribe"
              subtitle="Join our mailing list"
            />
          </div>
        </Stack>
      </Container>
    </>
  )
}