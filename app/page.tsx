import { Header } from "@/components/header"
import { ThumbnailDownloader } from "@/components/thumbnail-downloader"
import { FeatureGrid } from "@/components/feature-grid"
import { DownloadStats } from "@/components/download-stats"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Hero Section */}
          <section className="text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">YouTube Thumbnail Downloader</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Download high-quality YouTube thumbnails in multiple resolutions. Fast, free, and easy to use.
            </p>
          </section>

          {/* Download Stats */}
          <DownloadStats />

          {/* Main Downloader */}
          <ThumbnailDownloader />

          {/* Features */}
          <FeatureGrid />
        </div>
      </main>
      <Footer />
    </div>
  )
}
