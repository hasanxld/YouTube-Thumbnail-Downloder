"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Users, Eye } from "lucide-react"

export function VisitorCounter() {
  const [visitors, setVisitors] = useState(0)
  const [totalViews, setTotalViews] = useState(0)

  useEffect(() => {
    // Get current visitor count from localStorage
    const currentVisitors = Number.parseInt(localStorage.getItem("visitorCount") || "0")
    const currentViews = Number.parseInt(localStorage.getItem("totalViews") || "0")

    // Increment visitor count (simulate new visitor)
    const newVisitorCount = currentVisitors + 1
    const newViewCount = currentViews + 1

    localStorage.setItem("visitorCount", newVisitorCount.toString())
    localStorage.setItem("totalViews", newViewCount.toString())

    setVisitors(newVisitorCount)
    setTotalViews(newViewCount)
  }, [])

  return (
    <Card className="p-4 bg-white border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 text-blue-600">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Total Visitors</p>
            <p className="text-2xl font-bold text-blue-600">{visitors.toLocaleString()}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100 text-purple-600">
            <Eye className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Page Views</p>
            <p className="text-2xl font-bold text-purple-600">{totalViews.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </Card>
  )
}
