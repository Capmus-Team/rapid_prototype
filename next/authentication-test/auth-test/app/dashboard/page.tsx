import Profile from "@/components/profile"
import DashboardContent from "@/components/dashboard-content"

export default function Dashboard() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-gray-50">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-8">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Profile />
          </div>

          <div className="md:col-span-2">
            <DashboardContent />
          </div>
        </div>
      </div>
    </main>
  )
}

