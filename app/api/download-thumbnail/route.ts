import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const thumbnailUrl = searchParams.get("url")

    if (!thumbnailUrl) {
      return NextResponse.json({ error: "URL parameter is required" }, { status: 400 })
    }

    // Validate that it's a YouTube thumbnail URL
    if (!thumbnailUrl.includes("img.youtube.com")) {
      return NextResponse.json({ error: "Invalid thumbnail URL" }, { status: 400 })
    }

    // Fetch the thumbnail
    const response = await fetch(thumbnailUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    })

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch thumbnail" }, { status: response.status })
    }

    const imageBuffer = await response.arrayBuffer()
    const contentType = response.headers.get("content-type") || "image/jpeg"

    return new NextResponse(imageBuffer, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": "attachment",
        "Cache-Control": "public, max-age=31536000",
      },
    })
  } catch (error) {
    console.error("Download proxy error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
