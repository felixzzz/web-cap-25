import { NextResponse } from "next/server"
import { API_URL } from "@/lib/constant"
import fs from "fs"
import path from "path"

// Fallback persistence file on disk for local development
const LOCAL_STORAGE_PATH = path.join(
  process.cwd(),
  "src/app/[locale]/test/product-flow-2/_data/customFlowStorage.json"
)

function readLocalFallback() {
  try {
    if (fs.existsSync(LOCAL_STORAGE_PATH)) {
      const data = fs.readFileSync(LOCAL_STORAGE_PATH, "utf-8")
      return JSON.parse(data)
    }
  } catch {}
  return { coordinates: {}, nodes: {} }
}

function writeLocalFallback(data: any) {
  try {
    fs.writeFileSync(LOCAL_STORAGE_PATH, JSON.stringify(data, null, 2), "utf-8")
  } catch {}
}

export async function GET() {
  try {
    const res = await fetch(`${API_URL}/api/product-flow/layout`, {
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    })

    if (res.ok) {
      const data = await res.json()
      if (data?.data && (data.data.coordinates || data.data.nodes)) {
        return NextResponse.json(data)
      }
    }
  } catch {
    // Fall through to local fallback
  }

  const localData = readLocalFallback()
  return NextResponse.json({
    status: true,
    data: {
      coordinates: localData.coordinates || {},
      nodes: localData.nodes || {},
    },
  })
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { coordinates, nodes } = body

    const localData = readLocalFallback()
    if (coordinates && typeof coordinates === "object") {
      localData.coordinates = coordinates
    }
    if (nodes && typeof nodes === "object") {
      localData.nodes = nodes
    }
    writeLocalFallback(localData)

    try {
      const res = await fetch(`${API_URL}/api/product-flow/layout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ coordinates, nodes }),
      })

      if (res.ok) {
        const data = await res.json()
        return NextResponse.json(data)
      }
    } catch {
      // In local dev without backend connection, local storage is saved successfully
    }

    return NextResponse.json({
      status: true,
      message: "Layout coordinates and node texts saved successfully.",
      data: localData,
    })
  } catch (err: any) {
    return NextResponse.json(
      { status: false, message: err?.message || "Internal server error" },
      { status: 500 }
    )
  }
}

