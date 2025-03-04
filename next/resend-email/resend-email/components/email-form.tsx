"use client"

import { useState } from "react"
import { sendEmail } from "@/app/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function EmailForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)

    try {
      const result = await sendEmail(formData)

      if (result.success) {
        toast({
          title: "Email sent!",
          description: `Your message has been sent successfully to ${result.recipientEmail}.`,
        })
        // Reset the form
        const form = document.getElementById("contact-form") as HTMLFormElement
        form.reset()
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to send email. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <form id="contact-form" action={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="recipientEmail">Recipient Email</Label>
          <Input
            id="recipientEmail"
            name="recipientEmail"
            type="email"
            placeholder="recipient@example.com"
            defaultValue="develop@supost.com"
            required
          />
          <p className="text-xs text-muted-foreground">Email will be sent from contact@capmus.com</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" placeholder="Your name" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Your Email</Label>
          <Input id="email" name="email" type="email" placeholder="your.email@example.com" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Input id="subject" name="subject" placeholder="Message subject" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea id="message" name="message" placeholder="Your message here..." className="min-h-[120px]" required />
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </form>
      <Toaster />
    </>
  )
}

