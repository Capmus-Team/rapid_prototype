import EmailForm from "@/components/email-form"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
      <div className="w-full max-w-md">
        <h1 className="mb-2 text-3xl font-bold text-center">Contact Form</h1>
        <p className="mb-6 text-center text-muted-foreground">
          Send emails to any recipient using your verified domain
        </p>
        <EmailForm />
      </div>
    </main>
  )
}

