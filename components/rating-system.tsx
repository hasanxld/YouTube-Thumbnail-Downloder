"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, ThumbsUp, Heart } from "lucide-react"

interface RatingData {
  totalRatings: number
  averageRating: number
  starCounts: { [key: number]: number }
  likes: number
  hearts: number
}

export function RatingSystem() {
  const [ratings, setRatings] = useState<RatingData>({
    totalRatings: 0,
    averageRating: 0,
    starCounts: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    likes: 0,
    hearts: 0,
  })
  const [userRating, setUserRating] = useState<number>(0)
  const [hasRated, setHasRated] = useState(false)
  const [hasLiked, setHasLiked] = useState(false)
  const [hasHearted, setHasHearted] = useState(false)

  useEffect(() => {
    // Load ratings from localStorage
    const savedRatings = localStorage.getItem("siteRatings")
    const userRatedBefore = localStorage.getItem("userHasRated") === "true"
    const userLikedBefore = localStorage.getItem("userHasLiked") === "true"
    const userHeartedBefore = localStorage.getItem("userHasHearted") === "true"
    const savedUserRating = Number.parseInt(localStorage.getItem("userRating") || "0")

    if (savedRatings) {
      setRatings(JSON.parse(savedRatings))
    } else {
      // Initialize with some sample data
      const initialRatings = {
        totalRatings: 1247,
        averageRating: 4.6,
        starCounts: { 1: 12, 2: 23, 3: 89, 4: 456, 5: 667 },
        likes: 2341,
        hearts: 1876,
      }
      setRatings(initialRatings)
      localStorage.setItem("siteRatings", JSON.stringify(initialRatings))
    }

    setHasRated(userRatedBefore)
    setHasLiked(userLikedBefore)
    setHasHearted(userHeartedBefore)
    setUserRating(savedUserRating)
  }, [])

  const handleStarRating = (rating: number) => {
    if (hasRated) return

    const newRatings = { ...ratings }

    // Add new rating
    newRatings.starCounts[rating]++
    newRatings.totalRatings++

    // Recalculate average
    const totalStars = Object.entries(newRatings.starCounts).reduce(
      (sum, [stars, count]) => sum + Number.parseInt(stars) * count,
      0,
    )
    newRatings.averageRating = totalStars / newRatings.totalRatings

    setRatings(newRatings)
    setUserRating(rating)
    setHasRated(true)

    // Save to localStorage
    localStorage.setItem("siteRatings", JSON.stringify(newRatings))
    localStorage.setItem("userHasRated", "true")
    localStorage.setItem("userRating", rating.toString())
  }

  const handleLike = () => {
    if (hasLiked) return

    const newRatings = { ...ratings, likes: ratings.likes + 1 }
    setRatings(newRatings)
    setHasLiked(true)

    localStorage.setItem("siteRatings", JSON.stringify(newRatings))
    localStorage.setItem("userHasLiked", "true")
  }

  const handleHeart = () => {
    if (hasHearted) return

    const newRatings = { ...ratings, hearts: ratings.hearts + 1 }
    setRatings(newRatings)
    setHasHearted(true)

    localStorage.setItem("siteRatings", JSON.stringify(newRatings))
    localStorage.setItem("userHasHearted", "true")
  }

  const renderStars = (rating: number, interactive = false) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        } ${interactive && !hasRated ? "cursor-pointer hover:text-yellow-400 hover:fill-yellow-400" : ""}`}
        onClick={interactive && !hasRated ? () => handleStarRating(i + 1) : undefined}
      />
    ))
  }

  return (
    <Card className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-800 mb-2">Rate Our Service</h3>
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="flex gap-1">{renderStars(Math.round(ratings.averageRating))}</div>
            <span className="text-lg font-semibold text-gray-700">{ratings.averageRating.toFixed(1)}</span>
          </div>
          <p className="text-sm text-gray-600">Based on {ratings.totalRatings.toLocaleString()} reviews</p>
        </div>

        {!hasRated && (
          <div className="text-center space-y-3">
            <p className="text-sm font-medium text-gray-700">Rate your experience:</p>
            <div className="flex justify-center gap-1">{renderStars(userRating, true)}</div>
          </div>
        )}

        {hasRated && (
          <div className="text-center p-3 bg-green-100 text-green-800 text-sm font-medium">
            Thank you for rating us {userRating} stars! ⭐
          </div>
        )}

        <div className="flex justify-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handleLike}
            disabled={hasLiked}
            className={`flex items-center gap-2 ${hasLiked ? "bg-blue-100 text-blue-600 border-blue-300" : ""}`}
          >
            <ThumbsUp className={`w-4 h-4 ${hasLiked ? "fill-blue-600" : ""}`} />
            {ratings.likes.toLocaleString()}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleHeart}
            disabled={hasHearted}
            className={`flex items-center gap-2 ${hasHearted ? "bg-red-100 text-red-600 border-red-300" : ""}`}
          >
            <Heart className={`w-4 h-4 ${hasHearted ? "fill-red-600" : ""}`} />
            {ratings.hearts.toLocaleString()}
          </Button>
        </div>

        {/* Rating breakdown */}
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((stars) => (
            <div key={stars} className="flex items-center gap-2 text-sm">
              <span className="w-8 text-gray-600">{stars}★</span>
              <div className="flex-1 bg-gray-200 h-2 overflow-hidden">
                <div
                  className="h-full bg-yellow-400 transition-all duration-300"
                  style={{
                    width: `${ratings.totalRatings > 0 ? (ratings.starCounts[stars] / ratings.totalRatings) * 100 : 0}%`,
                  }}
                />
              </div>
              <span className="w-8 text-gray-600 text-right">{ratings.starCounts[stars]}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
