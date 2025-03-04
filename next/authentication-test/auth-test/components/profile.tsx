"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import type { User } from "@supabase/supabase-js"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Profile() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }

    getUser()

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        router.push("/")
        router.refresh()
      }
      setUser(session?.user ?? null)
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [router])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!user) {
    router.push("/")
    return null
  }

  // Get first letter of email for avatar
  const firstLetter = user.email ? user.email[0].toUpperCase() : "U"

  return (
    <Card>
      <CardHeader className="flex flex-col items-center pb-2">
        <Avatar className="h-20 w-20 mb-2">
          <AvatarImage src={user.user_metadata?.avatar_url} />
          <AvatarFallback className="text-xl bg-primary text-primary-foreground">{firstLetter}</AvatarFallback>
        </Avatar>
        <div className="text-center">
          <h2 className="text-xl font-semibold">{user.email}</h2>
          <p className="text-sm text-muted-foreground">User</p>
        </div>
      </CardHeader>

      <CardContent className="px-4 py-2">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">User ID:</span>
            <span className="font-mono text-xs truncate max-w-[150px]" title={user.id}>
              {user.id.substring(0, 8)}...
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Status:</span>
            <span className="text-green-600">Active</span>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button variant="outline" className="w-full" onClick={handleSignOut}>
          Sign Out
        </Button>
      </CardFooter>
    </Card>
  )
}

