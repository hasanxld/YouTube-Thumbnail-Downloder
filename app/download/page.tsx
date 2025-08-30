import { Header } from "@/components/header"
import { ThumbnailDownloader } from "@/components/thumbnail-downloader"
import { Footer } from "@/components/footer"

export default function DownloadPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-foreground">Download YouTube Thumbnails</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Enter any YouTube video URL to instantly download high-quality thumbnails in multiple resolutions.
            </p>
          </div>

          <ThumbnailDownloader />

          {/* Instructions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-accent text-accent-foreground mx-auto flex items-center justify-center text-xl font-bold">
                1
              </div>
              <h3 className="font-semibold text-foreground">Paste URL</h3>
              <p className="text-sm text-muted-foreground">
                Copy and paste any YouTube video URL into the input field above.
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-accent text-accent-foreground mx-auto flex items-center justify-center text-xl font-bold">
                2
              </div>
              <h3 className="font-semibold text-foreground">Choose Quality</h3>
              <p className="text-sm text-muted-foreground">
                Select from multiple thumbnail resolutions including HD and maximum quality.
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-accent text-accent-foreground mx-auto flex items-center justify-center text-xl font-bold">
                3
              </div>
              <h3 className="font-semibold text-foreground">Download</h3>
              <p className="text-sm text-muted-foreground">
                Click download to save the thumbnail to your device instantly.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
