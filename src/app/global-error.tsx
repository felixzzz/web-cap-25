"use client"

import React from "react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex items-center justify-center bg-slate-50 p-6 font-sans">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg border border-slate-200 p-8 text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-red-50 text-red-600 flex items-center justify-center font-bold text-2xl">
            !
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Something went wrong</h2>
          <p className="text-sm text-slate-500">
            {error?.message || "An unexpected error occurred."}
          </p>
          <button
            onClick={() => reset()}
            className="px-5 py-2.5 rounded-xl bg-[#0082C8] hover:bg-[#0070ad] text-white font-semibold text-sm transition-colors shadow-xs"
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  )
}

