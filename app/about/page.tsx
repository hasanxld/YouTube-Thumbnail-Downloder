import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Download, Zap, Shield, History, Users, Globe } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-6">
            <h1 className="text-4xl font-bold text-gray-900">About YT Downloader</h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
              The fastest and most reliable way to download YouTube thumbnails in high quality. Built with modern web
              technologies for optimal performance.
            </p>
          </div>

          <Card className="p-8">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed">
                We believe that accessing YouTube thumbnails should be simple, fast, and free. Our platform provides
                content creators, designers, and researchers with an easy way to download high-quality thumbnails for
                their projects without any hassle or registration requirements.
              </p>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 text-center space-y-4">
              <Download className="w-12 h-12 text-accent mx-auto" />
              <h3 className="text-lg font-semibold text-gray-900">Multiple Formats</h3>
              <p className="text-sm text-gray-600">
                Download thumbnails in various resolutions from default to maximum quality.
              </p>
            </Card>

            <Card className="p-6 text-center space-y-4">
              <Zap className="w-12 h-12 text-accent mx-auto" />
              <h3 className="text-lg font-semibold text-gray-900">Lightning Fast</h3>
              <p className="text-sm text-gray-600">
                Optimized for speed with instant thumbnail retrieval and download.
              </p>
            </Card>

            <Card className="p-6 text-center space-y-4">
              <Shield className="w-12 h-12 text-accent mx-auto" />
              <h3 className="text-lg font-semibold text-gray-900">Privacy First</h3>
              <p className="text-sm text-gray-600">No registration required. Your data stays private and secure.</p>
            </Card>

            <Card className="p-6 text-center space-y-4">
              <History className="w-12 h-12 text-accent mx-auto" />
              <h3 className="text-lg font-semibold text-gray-900">Download History</h3>
              <p className="text-sm text-gray-600">Keep track of your downloads with our built-in history feature.</p>
            </Card>

            <Card className="p-6 text-center space-y-4">
              <Users className="w-12 h-12 text-accent mx-auto" />
              <h3 className="text-lg font-semibold text-gray-900">User Friendly</h3>
              <p className="text-sm text-gray-600">Clean, intuitive interface designed for ease of use.</p>
            </Card>

            <Card className="p-6 text-center space-y-4">
              <Globe className="w-12 h-12 text-accent mx-auto" />
              <h3 className="text-lg font-semibold text-gray-900">Always Available</h3>
              <p className="text-sm text-gray-600">Access our service 24/7 from anywhere in the world.</p>
            </Card>
          </div>

          <Card className="p-8">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Technical Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Supported Formats</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Default (120x90)</li>
                    <li>• Medium Quality (320x180)</li>
                    <li>• High Quality (480x360)</li>
                    <li>• Standard Definition (640x480)</li>
                    <li>• Maximum Resolution (1280x720)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Features</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Instant thumbnail preview</li>
                    <li>• Batch download support</li>
                    <li>• Download history tracking</li>
                    <li>• Mobile responsive design</li>
                    <li>• No watermarks or ads</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
