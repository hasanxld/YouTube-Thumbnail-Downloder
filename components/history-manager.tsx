"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Trash2, Download, Search, Calendar, ExternalLink } from "lucide-react"

interface HistoryItem {
  id: string
  videoId: string
  title: string
  thumbnailUrl: string
  quality: string
  downloadedAt: string
  originalUrl: string
}

export function HistoryManager() {
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [filteredHistory, setFilteredHistory] = useState<HistoryItem[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    // Load history from localStorage
    const savedHistory = localStorage.getItem("thumbnail-download-history")
    if (savedHistory) {
      const parsedHistory = JSON.parse(savedHistory)
      setHistory(parsedHistory)
      setFilteredHistory(parsedHistory)
    }
  }, [])

  useEffect(() => {
    // Filter history based on search term
    if (searchTerm.trim() === "") {
      setFilteredHistory(history)
    } else {
      const filtered = history.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.videoId.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredHistory(filtered)
    }
  }, [searchTerm, history])

  const clearAllHistory = () => {
    setHistory([])
    setFilteredHistory([])
    localStorage.removeItem("thumbnail-download-history")
  }

  const removeHistoryItem = (id: string) => {
    const updatedHistory = history.filter((item) => item.id !== id)
    setHistory(updatedHistory)
    setFilteredHistory(
      updatedHistory.filter(
        (item) =>
          searchTerm.trim() === "" ||
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.videoId.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    )
    localStorage.setItem("thumbnail-download-history", JSON.stringify(updatedHistory))
  }

  const downloadThumbnail = async (url: string, filename: string) => {
    try {
      const response = await fetch(url)
      const blob = await response.blob()
      const downloadUrl = window.URL.createObjectURL(blob)

      const link = document.createElement("a")
      link.href = downloadUrl
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(downloadUrl)
    } catch (err) {
      console.error("Download failed:", err)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (history.length === 0) {
    return (
      <Card className="p-12 text-center">
        <div className="space-y-4">
          <div className="w-16 h-16 bg-muted mx-auto flex items-center justify-center">
            <Download className="w-8 h-8 text-gray-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">No Download History</h3>
          <p className="text-gray-700 max-w-md mx-auto">
            Start downloading YouTube thumbnails to see your history here. All your downloads will be tracked
            automatically.
          </p>
          <Button asChild className="mt-4">
            <a href="/">Start Downloading</a>
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Search and Actions */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input
                placeholder="Search by title or video ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              {filteredHistory.length} of {history.length} items
            </span>
            <Button variant="destructive" size="sm" onClick={clearAllHistory} className="flex items-center gap-2">
              <Trash2 className="w-4 h-4" />
              Clear All
            </Button>
          </div>
        </div>
      </Card>

      {/* History Grid */}
      {filteredHistory.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-gray-700">No items match your search criteria.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHistory.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="aspect-video bg-muted">
                <img
                  src={item.thumbnailUrl || "/placeholder.svg"}
                  alt={`Thumbnail for ${item.title}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.style.display = "none"
                  }}
                />
              </div>

              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-medium text-gray-900 line-clamp-2 leading-tight">{item.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">Quality: {item.quality}</p>
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Calendar className="w-3 h-3" />
                  {formatDate(item.downloadedAt)}
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      downloadThumbnail(item.thumbnailUrl, `thumbnail-${item.quality}-${item.videoId}.jpg`)
                    }
                    className="flex-1"
                  >
                    <Download className="w-3 h-3 mr-1" />
                    Download
                  </Button>

                  <Button size="sm" variant="outline" asChild>
                    <a href={item.originalUrl} target="_blank" rel="noopener noreferrer" className="flex items-center">
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </Button>

                  <Button size="sm" variant="destructive" onClick={() => removeHistoryItem(item.id)}>
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
