import { type NextRequest, NextResponse } from "next/server"

interface ThumbnailResponse {
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

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 })
    }

    // Extract video ID from URL
    const videoId = extractVideoId(url)
    if (!videoId) {
      return NextResponse.json({ error: "Invalid YouTube URL" }, { status: 400 })
    }

    // Generate thumbnail URLs
    const thumbnails = {
      default: `https://img.youtube.com/vi/${videoId}/default.jpg`,
      medium: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
      high: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      standard: `https://img.youtube.com/vi/${videoId}/sddefault.jpg`,
      maxres: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    }

    // Try to fetch video title using oEmbed API
    let title = "YouTube Video"
    try {
      const oembedResponse = await fetch(
        `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`,
      )
      if (oembedResponse.ok) {
        const oembedData = await oembedResponse.json()
        title = oembedData.title || title
      }
    } catch (error) {
      console.log("Failed to fetch video title:", error)
      // Continue with default title
    }

    // Verify that at least one thumbnail exists
    try {
      const testResponse = await fetch(thumbnails.high, { method: "HEAD" })
      if (!testResponse.ok) {
        return NextResponse.json({ error: "Video not found or thumbnails not available" }, { status: 404 })
      }
    } catch (error) {
      return NextResponse.json({ error: "Failed to verify thumbnail availability" }, { status: 500 })
    }

    const response: ThumbnailResponse = {
      videoId,
      title,
      thumbnails,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

function extractVideoId(url: string): string | null {
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
