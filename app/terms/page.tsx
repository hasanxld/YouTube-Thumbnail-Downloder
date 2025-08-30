import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-foreground">Terms of Service</h1>
            <p className="text-xl text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <Card className="p-8 space-y-6">
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using YT Downloader, you accept and agree to be bound by the terms and provision of
                this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Use License</h2>
              <p className="text-muted-foreground leading-relaxed">
                Permission is granted to temporarily download YouTube thumbnails through YT Downloader for personal,
                non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and
                under this license you may not:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to reverse engineer any software contained on the website</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Disclaimer</h2>
              <p className="text-muted-foreground leading-relaxed">
                The materials on YT Downloader are provided on an 'as is' basis. YT Downloader makes no warranties,
                expressed or implied, and hereby disclaims and negates all other warranties including without
                limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or
                non-infringement of intellectual property or other violation of rights.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Limitations</h2>
              <p className="text-muted-foreground leading-relaxed">
                In no event shall YT Downloader or its suppliers be liable for any damages (including, without
                limitation, damages for loss of data or profit, or due to business interruption) arising out of the use
                or inability to use the materials on YT Downloader, even if YT Downloader or an authorized
                representative has been notified orally or in writing of the possibility of such damage.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Accuracy of Materials</h2>
              <p className="text-muted-foreground leading-relaxed">
                The materials appearing on YT Downloader could include technical, typographical, or photographic errors.
                YT Downloader does not warrant that any of the materials on its website are accurate, complete, or
                current.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Links</h2>
              <p className="text-muted-foreground leading-relaxed">
                YT Downloader has not reviewed all of the sites linked to our website and is not responsible for the
                contents of any such linked site. The inclusion of any link does not imply endorsement by YT Downloader
                of the site.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Modifications</h2>
              <p className="text-muted-foreground leading-relaxed">
                YT Downloader may revise these terms of service at any time without notice. By using this website, you
                are agreeing to be bound by the then current version of these terms of service.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Governing Law</h2>
              <p className="text-muted-foreground leading-relaxed">
                These terms and conditions are governed by and construed in accordance with the laws and you irrevocably
                submit to the exclusive jurisdiction of the courts in that state or location.
              </p>
            </section>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
