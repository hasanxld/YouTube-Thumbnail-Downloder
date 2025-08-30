import Link from "next/link"
import { Download } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-primary flex items-center justify-center">
              <Download className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold text-gray-900">YT Downloader</span>
          </div>

          <div className="flex items-center space-x-6 text-sm text-gray-700">
            <Link href="/privacy" className="hover:text-blue-600 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-blue-600 transition-colors">
              Terms of Service
            </Link>
            <Link href="/contact" className="hover:text-blue-600 transition-colors">
              Contact
            </Link>
          </div>

          <p className="text-sm text-gray-700">© 2024 YT Downloader. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
