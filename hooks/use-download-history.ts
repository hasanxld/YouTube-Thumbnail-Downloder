"use client"

import { useState, useEffect } from "react"

interface HistoryItem {
  id: string
  videoId: string
  title: string
  thumbnailUrl: string
  quality: string
  downloadedAt: string
  originalUrl: string
}

export function useDownloadHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([])

  useEffect(() => {
    // Load history from localStorage on mount
    const savedHistory = localStorage.getItem("thumbnail-download-history")
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory))
    }
  }, [])

  const addToHistory = (item: Omit<HistoryItem, "id" | "downloadedAt">) => {
    const newItem: HistoryItem = {
      ...item,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      downloadedAt: new Date().toISOString(),
    }

    const updatedHistory = [newItem, ...history].slice(0, 100) // Keep only last 100 items
    setHistory(updatedHistory)
    localStorage.setItem("thumbnail-download-history", JSON.stringify(updatedHistory))
  }

  const removeFromHistory = (id: string) => {
    const updatedHistory = history.filter((item) => item.id !== id)
    setHistory(updatedHistory)
    localStorage.setItem("thumbnail-download-history", JSON.stringify(updatedHistory))
  }

  const clearHistory = () => {
    setHistory([])
    localStorage.removeItem("thumbnail-download-history")
  }

  return {
    history,
    addToHistory,
    removeFromHistory,
    clearHistory,
  }
}
