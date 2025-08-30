"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Download, Search, AlertCircle, CheckCircle, Copy, Eye, Package, ChevronLeft, ChevronRight } from "lucide-react"
import { useDownloadHistory } from "@/hooks/use-download-history"
import { ThumbnailPreviewModal } from "@/components/thumbnail-preview-modal"

interface ThumbnailData {
  videoId: string
  title: string
  thumbnails: {
    default: string
    medium: string
    high: string
    standard: string
    maxres: string
  }
}

export function ThumbnailDownloader() {
  const [url, setUrl] = useState("")
  const [thumbnailData, setThumbnailData] = useState<ThumbnailData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [downloadingQuality, setDownloadingQuality] = useState<string | null>(null)
  const [isBatchDownloading, setIsBatchDownloading] = useState(false)
  const [previewModal, setPreviewModal] = useState<{ quality: string; url: string; title: string } | null>(null)
  const { addToHistory } = useDownloadHistory()
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const extractVideoId = (url: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/v\/([^&\n?#]+)/,
      /youtube\.com\/shorts\/([^&\n?#]+)/,
    ]

    for (const pattern of patterns) {
      const match = url.match(pattern)
      if (match) return match[1]
    }
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setThumbnailData(null)

    if (!url.trim()) {
      setError("Please enter a YouTube URL")
      return
    }

    const videoId = extractVideoId(url)
    if (!videoId) {
      setError("Invalid YouTube URL. Please check the URL and try again.")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/thumbnail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to fetch thumbnail")
      }

      const data: ThumbnailData = await response.json()
      setThumbnailData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch thumbnail. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const downloadThumbnail = async (thumbnailUrl: string, quality: string, filename: string) => {
    setDownloadingQuality(quality)
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
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(downloadUrl)

      if (thumbnailData) {
        addToHistory({
          videoId: thumbnailData.videoId,
          title: thumbnailData.title,
          thumbnailUrl,
          quality,
          originalUrl: url,
        })
      }
    } catch (err) {
      console.error("Download failed:", err)
      setError("Failed to download thumbnail. Please try again.")
    } finally {
      setDownloadingQuality(null)
    }
  }

  const downloadAllThumbnails = async () => {
    if (!thumbnailData) return

    setIsBatchDownloading(true)
    const qualities = Object.keys(thumbnailData.thumbnails)

    try {
      for (const quality of qualities) {
        const thumbnailUrl = thumbnailData.thumbnails[quality as keyof typeof thumbnailData.thumbnails]
        const filename = `${thumbnailData.title.replace(/[^a-zA-Z0-9]/g, "_")}-${quality}-${thumbnailData.videoId}.jpg`

        await downloadThumbnail(thumbnailUrl, quality, filename)
        await new Promise((resolve) => setTimeout(resolve, 500))
      }
    } catch (err) {
      console.error("Batch download failed:", err)
      setError("Some downloads may have failed. Please try individual downloads.")
    } finally {
      setIsBatchDownloading(false)
    }
  }

  const copyThumbnailUrl = async (thumbnailUrl: string, quality: string) => {
    try {
      await navigator.clipboard.writeText(thumbnailUrl)
      console.log(`${quality} thumbnail URL copied to clipboard`)
    } catch (err) {
      console.error("Failed to copy URL:", err)
    }
  }

  const getQualityInfo = (quality: string) => {
    const qualityMap: Record<string, { label: string; dimensions: string }> = {
      default: { label: "Default", dimensions: "120×90" },
      medium: { label: "Medium", dimensions: "320×180" },
      high: { label: "High", dimensions: "480×360" },
      standard: { label: "Standard", dimensions: "640×480" },
      maxres: { label: "Maximum", dimensions: "1280×720" },
    }
    return qualityMap[quality] || { label: quality, dimensions: "Unknown" }
  }

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: "smooth" })
    }
  }

  return (
    <section className="space-y-8">
      <Card className="p-8 bg-white border-gray-200">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="youtube-url" className="text-sm font-medium text-gray-800">
              YouTube Video URL
            </label>
            <div className="flex gap-4">
              <Input
                id="youtube-url"
                type="url"
                placeholder="https://www.youtube.com/watch?v=... or https://youtu.be/..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1 bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                disabled={isLoading}
              />
              <Button
                type="submit"
                disabled={isLoading}
                className="px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent animate-spin mr-2" />
                ) : (
                  <Search className="w-4 h-4 mr-2" />
                )}
                {isLoading ? "Loading..." : "Get Thumbnails"}
              </Button>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 border border-red-200">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}
        </form>
      </Card>

      {thumbnailData && (
        <Card className="p-8 bg-white border-gray-200">
          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Thumbnails Ready for Download</h3>
                  <p className="text-gray-700">{thumbnailData.title}</p>
                  <p className="text-sm text-gray-500 mt-1">Video ID: {thumbnailData.videoId}</p>
                </div>
              </div>
              <Button
                onClick={downloadAllThumbnails}
                disabled={isBatchDownloading || downloadingQuality !== null}
                className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                {isBatchDownloading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent animate-spin" />
                ) : (
                  <Package className="w-4 h-4" />
                )}
                {isBatchDownloading ? "Downloading All..." : "Download All"}
              </Button>
            </div>

            <div className="relative">
              <Button
                onClick={scrollLeft}
                variant="outline"
                size="sm"
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg border-gray-300 text-gray-700 hover:text-gray-900"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>

              <Button
                onClick={scrollRight}
                variant="outline"
                size="sm"
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg border-gray-300 text-gray-700 hover:text-gray-900"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>

              <div className="overflow-x-auto pb-4 px-8" ref={scrollContainerRef}>
                <div className="flex gap-6 min-w-max">
                  {Object.entries(thumbnailData.thumbnails).map(([quality, thumbnailUrl]) => {
                    const qualityInfo = getQualityInfo(quality)
                    const isDownloading = downloadingQuality === quality

                    return (
                      <div key={quality} className="flex-shrink-0 w-80 space-y-4">
                        <div className="aspect-video bg-gray-100 overflow-hidden relative group cursor-pointer border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300">
                          <img
                            src={thumbnailUrl || "/placeholder.svg"}
                            alt={`${qualityInfo.label} quality thumbnail`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.style.display = "none"
                            }}
                          />
                          {isDownloading && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                              <div className="w-8 h-8 border-2 border-white border-t-transparent animate-spin" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={() =>
                                setPreviewModal({
                                  quality: qualityInfo.label,
                                  url: thumbnailUrl,
                                  title: thumbnailData.title,
                                })
                              }
                              className="bg-white/90 text-gray-800 hover:bg-white shadow-lg"
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              Preview
                            </Button>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-3 border border-blue-200 shadow-sm">
                            <p className="text-sm font-medium text-gray-800">{qualityInfo.label} Quality</p>
                            <p className="text-xs text-gray-600">{qualityInfo.dimensions}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              onClick={() =>
                                downloadThumbnail(
                                  thumbnailUrl,
                                  quality,
                                  `${thumbnailData.title.replace(/[^a-zA-Z0-9]/g, "_")}-${quality}-${thumbnailData.videoId}.jpg`,
                                )
                              }
                              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                              disabled={isDownloading || isBatchDownloading}
                            >
                              {isDownloading ? (
                                <div className="w-4 h-4 border-2 border-white border-t-transparent animate-spin mr-2" />
                              ) : (
                                <Download className="w-4 h-4 mr-2" />
                              )}
                              {isDownloading ? "Downloading..." : "Download"}
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => copyThumbnailUrl(thumbnailUrl, qualityInfo.label)}
                              disabled={isDownloading || isBatchDownloading}
                              title="Copy thumbnail URL"
                              className="bg-gray-100 hover:bg-gray-200 text-gray-700 shadow-md hover:shadow-lg transition-all duration-300"
                            >
                              <Copy className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
            <div className="text-center text-sm text-gray-500">
              Use the arrow buttons or scroll horizontally to see all thumbnail qualities
            </div>
          </div>
        </Card>
      )}

      {previewModal && (
        <ThumbnailPreviewModal
          isOpen={true}
          onClose={() => setPreviewModal(null)}
          thumbnailUrl={previewModal.url}
          quality={previewModal.quality}
          title={previewModal.title}
        />
      )}
    </section>
  )
}
