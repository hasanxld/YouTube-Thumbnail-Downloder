import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-foreground">Privacy Policy</h1>
            <p className="text-xl text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <Card className="p-8 space-y-6">
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Information We Collect</h2>
              <p className="text-muted-foreground leading-relaxed">
                We are committed to protecting your privacy. Our YouTube Thumbnail Downloader operates with minimal data
                collection:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>YouTube URLs you submit for thumbnail extraction</li>
                <li>Download history stored locally in your browser</li>
                <li>Basic usage analytics to improve our service</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">How We Use Your Information</h2>
              <p className="text-muted-foreground leading-relaxed">The information we collect is used solely to:</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Process your thumbnail download requests</li>
                <li>Maintain your download history locally</li>
                <li>Improve our service performance and user experience</li>
                <li>Ensure the security and functionality of our platform</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Data Storage</h2>
              <p className="text-muted-foreground leading-relaxed">
                Your download history is stored locally in your browser using localStorage. This means:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Your data never leaves your device</li>
                <li>We cannot access your download history</li>
                <li>You can clear your history at any time</li>
                <li>Data is automatically removed if you clear your browser data</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Third-Party Services</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use YouTube's public thumbnail URLs to provide our service. We do not store or cache these images on
                our servers. All thumbnail downloads are direct from YouTube's content delivery network.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Your Rights</h2>
              <p className="text-muted-foreground leading-relaxed">You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Clear your download history at any time</li>
                <li>Use our service without creating an account</li>
                <li>Request information about our data practices</li>
                <li>Stop using our service at any time</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us through our contact page.
              </p>
            </section>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
