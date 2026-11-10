import { NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path")
  const secret = request.nextUrl.searchParams.get("secret")
  const validSecret =
    process.env.REVALIDATE_SECRET ||
    process.env.FLOW_BUILDER_SECRET ||
    "cap25-product-flow-secret-2026"

  // Allow without secret if in development, otherwise check token
  if (
    process.env.NODE_ENV !== "development" &&
    secret &&
    secret !== validSecret
  ) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 })
  }

  if (!path) {
    return NextResponse.json(
      { message: "Path parameter is required (e.g. ?path=/sustainability/procycle)" },
      { status: 400 }
    )
  }

  try {
    // Revalidate the specified route path
    revalidatePath(path)
    revalidatePath(`/[locale]${path}`, "page")

    return NextResponse.json({
      revalidated: true,
      path,
      now: Date.now(),
      message: `Cache for ${path} successfully purged!`,
    })
  } catch (err: any) {
    return NextResponse.json(
      { message: "Error revalidating", error: err?.message },
      { status: 500 }
    )
  }
}

