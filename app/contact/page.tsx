import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MessageSquare, HelpCircle, Bug } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-foreground">Contact Us</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have a question, suggestion, or need help? We'd love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <Card className="p-8">
              <form className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-foreground">
                    Name
                  </label>
                  <Input id="name" placeholder="Your full name" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">
                    Email
                  </label>
                  <Input id="email" type="email" placeholder="your.email@example.com" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-foreground">
                    Subject
                  </label>
                  <Input id="subject" placeholder="What's this about?" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-foreground">
                    Message
                  </label>
                  <Textarea id="message" placeholder="Tell us more about your question or feedback..." rows={6} />
                </div>

                <Button type="submit" className="w-full">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6">
              <Card className="p-6">
                <div className="flex items-start space-x-4">
                  <MessageSquare className="w-6 h-6 text-accent mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">General Inquiries</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Have questions about our service or need general information? We're here to help with any
                      questions you might have.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start space-x-4">
                  <Bug className="w-6 h-6 text-accent mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Bug Reports</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Found a bug or experiencing technical issues? Let us know and we'll work to fix it as soon as
                      possible.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start space-x-4">
                  <HelpCircle className="w-6 h-6 text-accent mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Feature Requests</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Have an idea for a new feature or improvement? We'd love to hear your suggestions to make our
                      service better.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground">Frequently Asked Questions</h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-medium text-foreground">Is this service free?</h4>
                      <p className="text-xs text-muted-foreground">
                        Yes, our YouTube thumbnail downloader is completely free to use.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-foreground">Do I need to create an account?</h4>
                      <p className="text-xs text-muted-foreground">
                        No registration is required. You can start downloading thumbnails immediately.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-foreground">What formats are supported?</h4>
                      <p className="text-xs text-muted-foreground">
                        We support all YouTube thumbnail resolutions from default to maximum quality.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
