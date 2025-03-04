"use server"

import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

// Update the FROM_EMAIL constant to use capmus.com instead of capmus.art
const FROM_EMAIL = "contact@capmus.com"

// You can customize this to any email on your verified domain

export async function sendEmail(formData: FormData) {
  try {
    // Extract form data
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const subject = formData.get("subject") as string
    const message = formData.get("message") as string
    const recipientEmail = (formData.get("recipientEmail") as string) || "develop@supost.com"

    // Validate form data
    if (!name || !email || !subject || !message) {
      return {
        success: false,
        error: "Please fill out all fields",
      }
    }

    // Send email using Resend with verified domain
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL, // Using your verified domain
      to: recipientEmail, // Can be any recipient now
      reply_to: email, // Set the reply-to as the form submitter's email
      subject: `Contact Form: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    })

    if (error) {
      console.error("Error sending email:", error)
      return {
        success: false,
        error: error.message,
      }
    }

    return {
      success: true,
      data,
      recipientEmail,
    }
  } catch (error) {
    console.error("Error in sendEmail:", error)
    return {
      success: false,
      error: "An unexpected error occurred",
    }
  }
}

