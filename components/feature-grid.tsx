import { Card } from "@/components/ui/card"
import { Download, Zap, Shield, History } from "lucide-react"

const features = [
  {
    icon: Download,
    title: "Multiple Resolutions",
    description: "Download thumbnails in various qualities from default to maximum resolution.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Get your thumbnails instantly with our optimized download system.",
  },
  {
    icon: Shield,
    title: "Safe & Secure",
    description: "No registration required. Your privacy is protected at all times.",
  },
  {
    icon: History,
    title: "Download History",
    description: "Keep track of all your downloaded thumbnails with our history feature.",
  },
]

export function FeatureGrid() {
  return (
    <section className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Downloader?</h2>
        <p className="text-gray-700 max-w-2xl mx-auto">
          Fast, reliable, and user-friendly YouTube thumbnail downloader with advanced features.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="p-6 text-center space-y-4">
            <div className="w-12 h-12 bg-accent text-accent-foreground mx-auto flex items-center justify-center">
              <feature.icon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
            <p className="text-sm text-gray-700 leading-relaxed">{feature.description}</p>
          </Card>
        ))}
      </div>
    </section>
  )
}
