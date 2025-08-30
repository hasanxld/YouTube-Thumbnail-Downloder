"use client"

import { Button } from "@/components/ui/button"
import { X, Download, Copy, ExternalLink } from "lucide-react"
import { useEffect } from "react"

interface ThumbnailPreviewModalProps {
  isOpen: boolean
  onClose: () => void
  thumbnailUrl: string
  quality: string
  title: string
}

export function ThumbnailPreviewModal({ isOpen, onClose, thumbnailUrl, quality, title }: ThumbnailPreviewModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const downloadThumbnail = async () => {
    try {
      const proxyUrl = `/api/download-thumbnail?url=${encodeURIComponent(thumbnailUrl)}`
      const response = await fetch(proxyUrl)

      if (!response.ok) {
        throw new Error("Failed to download thumbnail")
      }

      const blob = await response.blob()
      const downloadUrl = window.URL.createObjectURL(blob)

      const link = document.createElement("a")
      link.href = downloadUrl
      link.download = `${title.replace(/[^a-zA-Z0-9]/g, "_")}-${quality}.jpg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(downloadUrl)
    } catch (err) {
      console.error("Download failed:", err)
    }
  }

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(thumbnailUrl)
    } catch (err) {
      console.error("Failed to copy URL:", err)
    }
  }

  const openInNewTab = () => {
    window.open(thumbnailUrl, "_blank")
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-background max-w-4xl max-h-[90vh] w-full mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div>
            <h2 className="text-lg font-semibold text-foreground">{quality} Quality Preview</h2>
            <p className="text-sm text-muted-foreground line-clamp-1">{title}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Image */}
        <div className="p-4">
          <div className="flex justify-center">
            <img
              src={thumbnailUrl || "/placeholder.svg"}
              alt={`${quality} quality thumbnail`}
              className="max-w-full max-h-[60vh] object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.style.display = "none"
              }}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between p-4 border-t border-border">
          <div className="text-sm text-muted-foreground">Click and drag to save, or use the buttons below</div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={copyUrl}>
              <Copy className="w-4 h-4 mr-1" />
              Copy URL
            </Button>
            <Button variant="outline" size="sm" onClick={openInNewTab}>
              <ExternalLink className="w-4 h-4 mr-1" />
              Open
            </Button>
            <Button size="sm" onClick={downloadThumbnail}>
              <Download className="w-4 h-4 mr-1" />
              Download
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
