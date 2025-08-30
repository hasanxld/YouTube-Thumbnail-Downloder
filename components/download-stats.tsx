"use client"

import { Card } from "@/components/ui/card"
import { Download, History, Clock, Star } from "lucide-react"
import { useEffect, useState } from "react"

interface DownloadStats {
  totalDownloads: number
  todayDownloads: number
  favoriteQuality: string
  lastDownload: string | null
}

export function DownloadStats() {
  const [stats, setStats] = useState<DownloadStats>({
    totalDownloads: 0,
    todayDownloads: 0,
    favoriteQuality: "high",
    lastDownload: null,
  })

  useEffect(() => {
    // Load stats from localStorage
    const history = localStorage.getItem("thumbnail-download-history")
    if (history) {
      const downloads = JSON.parse(history)
      const today = new Date().toDateString()

      const todayDownloads = downloads.filter(
        (item: any) => new Date(item.downloadedAt).toDateString() === today,
      ).length

      const qualityCounts = downloads.reduce((acc: any, item: any) => {
        acc[item.quality] = (acc[item.quality] || 0) + 1
        return acc
      }, {})

      const favoriteQuality = Object.keys(qualityCounts).reduce(
        (a, b) => (qualityCounts[a] > qualityCounts[b] ? a : b),
        "high",
      )

      const lastDownload = downloads.length > 0 ? downloads[0].downloadedAt : null

      setStats({
        totalDownloads: downloads.length,
        todayDownloads,
        favoriteQuality,
        lastDownload,
      })
    }
  }, [])

  const formatLastDownload = (dateString: string | null) => {
    if (!dateString) return "Never"
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))

    if (diffHours < 1) return "Just now"
    if (diffHours < 24) return `${diffHours}h ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card className="p-4 text-center bg-white border-gray-200">
        <Download className="w-6 h-6 text-blue-600 mx-auto mb-2" />
        <p className="text-2xl font-bold text-gray-900">{stats.totalDownloads}</p>
        <p className="text-xs text-gray-600">Total Downloads</p>
      </Card>

      <Card className="p-4 text-center bg-white border-gray-200">
        <Clock className="w-6 h-6 text-purple-600 mx-auto mb-2" />
        <p className="text-2xl font-bold text-gray-900">{stats.todayDownloads}</p>
        <p className="text-xs text-gray-600">Today</p>
      </Card>

      <Card className="p-4 text-center bg-white border-gray-200">
        <Star className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
        <p className="text-sm font-bold text-gray-900 capitalize">{stats.favoriteQuality}</p>
        <p className="text-xs text-gray-600">Favorite Quality</p>
      </Card>

      <Card className="p-4 text-center bg-white border-gray-200">
        <History className="w-6 h-6 text-green-600 mx-auto mb-2" />
        <p className="text-sm font-bold text-gray-900">{formatLastDownload(stats.lastDownload)}</p>
        <p className="text-xs text-gray-600">Last Download</p>
      </Card>
    </div>
  )
}
