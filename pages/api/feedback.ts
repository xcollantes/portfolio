import { NextApiRequest, NextApiResponse } from 'next'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface FeedbackData {
  name: string
  email: string
  subject: string
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { name, email, subject, message }: FeedbackData = req.body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        error: 'Missing required fields: name, email, subject, and message are all required' 
      })
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' })
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Feedback <feedback@xaviercollantes.dev>', // You'll need to verify this domain in Resend
      to: [email], // Send to the person providing feedback (confirmation)
      cc: ['xavier@xaviercollantes.dev'], // Your email to receive feedback
      subject: `Feedback Confirmation: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Thank you for your feedback!</h2>
          <p>Hi ${name},</p>
          <p>We've received your feedback and will review it shortly. Here's a copy of what you submitted:</p>
          
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #555;">Subject: ${subject}</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          
          <p>If you need a direct response, we'll get back to you at: <strong>${email}</strong></p>
          
          <hr style="border: none; height: 1px; background-color: #ddd; margin: 30px 0;">
          <p style="color: #666; font-size: 12px;">
            This is an automated confirmation email. Please do not reply directly to this message.
          </p>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return res.status(500).json({ error: 'Failed to send feedback email' })
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Feedback sent successfully',
      emailId: data?.id 
    })

  } catch (error) {
    console.error('Feedback API error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}