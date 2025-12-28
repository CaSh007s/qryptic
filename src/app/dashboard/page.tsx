"use client"

import { useState } from "react"
import { QrGenerator } from "@/components/qr-generator"
import { HistorySheet } from "@/components/history-sheet"

export default function Dashboard() {
  // connects the two components
  const [refreshKey, setRefreshKey] = useState(0)

  const handleSuccess = () => {
    // Incrementing this number forces the History List to re-fetch
    setRefreshKey((prev) => prev + 1)
  }

  return (
    <main className="flex min-h-screen flex-col items-center pt-24 pb-12 px-4 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      {/* Top Bar with History Button */}
      <div className="absolute top-24 right-8 z-20">
        <HistorySheet refreshTrigger={refreshKey} />
      </div>

      <div className="z-10 w-full max-w-md space-y-12 mt-12">
        <div className="space-y-8">
          <h1 className="text-2xl font-bold tracking-tight text-center">CREATE_NEW_QR</h1>
          
          {/* Now valid because QrGenerator accepts onSuccess */}
          <QrGenerator onSuccess={handleSuccess} />
          
        </div>
      </div>
    </main>
  )
}