import { Header } from "@/components/header"
import { HistoryManager } from "@/components/history-manager"
import { Footer } from "@/components/footer"

export default function HistoryPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-gray-900">Download History</h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              View and manage your previously downloaded YouTube thumbnails.
            </p>
          </div>

          <HistoryManager />
        </div>
      </main>
      <Footer />
    </div>
  )
}
