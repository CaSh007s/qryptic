"use client"

import { useState } from "react"
import { QRCodeSVG } from "qrcode.react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Download, Link as LinkIcon } from "lucide-react"

export const QrGenerator = () => {
  const [url, setUrl] = useState("")
  const [qrValue, setQrValue] = useState("")

  const handleGenerate = () => {
    if (!url) return
    setQrValue(url)
  }

  const handleDownload = () => {
    const svg = document.getElementById("qr-code-svg")
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg)
      const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = "qryptic-code.svg"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="p-6 bg-zinc-900/50 border-zinc-800 backdrop-blur-xl">
        <div className="space-y-6">
          
          {/* Input Section */}
          <div className="space-y-2">
            <label className="text-xs font-mono text-zinc-400 ml-1">TARGET_URL</label>
            <div className="relative">
              <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
              <Input
                type="text"
                placeholder="https://example.com"
                className="pl-9 bg-black/40 border-zinc-800 focus-visible:ring-zinc-700 font-mono"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
              />
            </div>
          </div>

          <Button 
            className="w-full bg-white text-black hover:bg-zinc-200 font-bold tracking-tight"
            onClick={handleGenerate}
          >
            GENERATE_QR
          </Button>

          {/* The Materialization Zone */}
          <div className="relative flex items-center justify-center min-h-[200px] bg-black/20 rounded-lg border border-zinc-800/50 border-dashed">
            <AnimatePresence mode="wait">
              {qrValue ? (
                <motion.div
                  key="qr-active"
                  initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, type: "spring" }}
                  className="p-4 bg-white rounded-xl shadow-2xl"
                >
                  <QRCodeSVG
                    id="qr-code-svg"
                    value={qrValue}
                    size={160}
                    level="H" // High error correction
                    className="w-full h-full"
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="qr-idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-zinc-600 font-mono text-xs"
                >
                  [WAITING_FOR_DATA]
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Actions */}
          {qrValue && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Button
                variant="outline"
                className="w-full border-zinc-800 hover:bg-zinc-900 hover:text-white"
                onClick={handleDownload}
              >
                <Download className="mr-2 h-4 w-4" />
                DOWNLOAD.SVG
              </Button>
            </motion.div>
          )}
        </div>
      </Card>
    </div>
  )
}