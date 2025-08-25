import { NextApiRequest, NextApiResponse } from "next"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { db } from "../../../lib/firebase"

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

    await addDoc(collection(db, "newsletter"), {
      email: email.toLowerCase().trim(),
      subscribedAt: serverTimestamp(),
      source: "website_signup",
      active: true,
    })

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