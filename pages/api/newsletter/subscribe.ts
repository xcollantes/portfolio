import { NextApiRequest, NextApiResponse } from "next"
import { doc, updateDoc, arrayUnion, serverTimestamp } from "firebase/firestore"
import { Resend } from "resend"
import { db } from "../../../lib/firebase"

const resend = new Resend(process.env.RESEND_API_KEY)
const email = process.env.EMAIL_TO_NOTIFY

interface NewsletterSubscriptionRequest {
  email: string
}

interface NewsletterSubscriptionResponse {
  success: boolean
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NewsletterSubscriptionResponse>
) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed"
    })
  }

  try {
    const { email }: NewsletterSubscriptionRequest = req.body

    if (!email || typeof email !== "string") {
      return res.status(400).json({
        success: false,
        message: "Email is required"
      })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address"
      })
    }

    if (!db) {
      return res.status(503).json({
        success: false,
        message: "Database not configured"
      })
    }

    const signupsDocRef = doc(db, "newsletter", "signups")
    const trimmedEmail = email.toLowerCase().trim()

    // Update existing document by adding email to array
    await updateDoc(signupsDocRef, {
      emails: arrayUnion(trimmedEmail),
      lastUpdated: serverTimestamp()
    })

    // Send notification email to you about the new signup
    try {
      await resend.emails.send({
        from: 'Portfolio Newsletter <newsletter@xaviercollantes.dev>',
        to: [email],
        subject: '🎉 New Newsletter Signup!',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">New Newsletter Subscription</h2>
            <p>Someone just signed up for your newsletter!</p>

            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #2563eb;">
              <p><strong>Email:</strong> ${trimmedEmail}</p>
              <p><strong>Time:</strong> ${new Date().toLocaleString('en-US', {
                timeZone: 'America/New_York',
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                timeZoneName: 'short'
              })}</p>
              <p><strong>Source:</strong> Website signup form</p>
            </div>

            <p style="margin-top: 20px; color: #64748b; font-size: 14px;">
              This notification was sent automatically from your portfolio newsletter system.
            </p>
          </div>
        `,
      })
    } catch (emailError) {
      // Log email error but don't fail the subscription
      console.warn('Failed to send notification email:', emailError)
    }

    return res.status(200).json({
      success: true,
      message: "Successfully subscribed to newsletter"
    })

  } catch (error) {
    console.error("Error adding newsletter subscription:", error)
    return res.status(500).json({
      success: false,
      message: "Failed to subscribe. Please try again."
    })
  }
}