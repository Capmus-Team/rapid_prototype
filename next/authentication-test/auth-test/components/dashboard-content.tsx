"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { User } from "@supabase/supabase-js"

export default function DashboardContent() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

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
      setUser(session?.user ?? null)
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome to Your Dashboard</CardTitle>
        <CardDescription>Manage your account and view your activity</CardDescription>
      </CardHeader>

      <Tabs defaultValue="overview" className="w-full">
        <CardContent>
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <h3 className="font-medium text-blue-800">Account Status</h3>
                <p className="text-sm text-blue-600">Active</p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <h3 className="font-medium text-green-800">Email Verified</h3>
                <p className="text-sm text-green-600">{user?.email_confirmed_at ? "Yes" : "No"}</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border">
              <h3 className="font-medium mb-2">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm">
                  Update Profile
                </Button>
                <Button variant="outline" size="sm">
                  Security Settings
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <div className="bg-white p-4 rounded-lg border">
              <h3 className="font-medium mb-2">Recent Activity</h3>
              <div className="space-y-2">
                <div className="text-sm p-2 bg-gray-50 rounded">
                  <p className="font-medium">Account Login</p>
                  <p className="text-gray-500">Just now</p>
                </div>
                <div className="text-sm p-2 bg-gray-50 rounded">
                  <p className="font-medium">Email Verified</p>
                  <p className="text-gray-500">Today</p>
                </div>
                <div className="text-sm p-2 bg-gray-50 rounded">
                  <p className="font-medium">Account Created</p>
                  <p className="text-gray-500">Today</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <div className="bg-white p-4 rounded-lg border">
              <h3 className="font-medium mb-2">Account Settings</h3>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  Change Password
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  Update Email
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start text-red-500 hover:text-red-700">
                  Delete Account
                </Button>
              </div>
            </div>
          </TabsContent>
        </CardContent>
      </Tabs>

      <CardFooter className="border-t p-4 text-sm text-gray-500">Last login: {new Date().toLocaleString()}</CardFooter>
    </Card>
  )
}

