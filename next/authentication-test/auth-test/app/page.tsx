import AuthForm from "@/components/auth-form"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8">Supabase Auth Demo</h1>
        <AuthForm />
      </div>
    </main>
  )
}

