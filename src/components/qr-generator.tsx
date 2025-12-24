"use client"

import { useState, useRef } from "react"
import { QRCodeSVG } from "qrcode.react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Download, Link as LinkIcon, Image as ImageIcon, FileCode } from "lucide-react"

export const QrGenerator = () => {
  const [url, setUrl] = useState("")
  const [qrValue, setQrValue] = useState("")
  const qrRef = useRef<SVGSVGElement>(null)

  const handleGenerate = () => {
    if (!url) return
    setQrValue(url)
  }

  const downloadSVG = () => {
    if (!qrRef.current) return
    const svgData = new XMLSerializer().serializeToString(qrRef.current)
    const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    triggerDownload(url, "qryptic-code.svg")
  }

  const downloadPNG = () => {
    if (!qrRef.current) return
    
    // Create a canvas to convert SVG to PNG
    const svgData = new XMLSerializer().serializeToString(qrRef.current)
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    const img = new Image()
    
    // Add some padding/margin for the PNG so it looks nice
    const size = 256
    canvas.width = size
    canvas.height = size
    
    img.onload = () => {
      if (!ctx) return
      // Fill white background (optional, but safer for PNGs)
      ctx.fillStyle = "white"
      ctx.fillRect(0, 0, size, size)
      ctx.drawImage(img, 0, 0, size, size)
      
      const pngUrl = canvas.toDataURL("image/png")
      triggerDownload(pngUrl, "qryptic-code.png")
    }
    
    img.src = "data:image/svg+xml;base64," + btoa(svgData)
  }

  const triggerDownload = (url: string, filename: string) => {
    const link = document.createElement("a")
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="p-6 bg-zinc-900/50 border-zinc-800 backdrop-blur-xl shadow-2xl">
        <div className="space-y-6">
          
          {/* Input Section */}
          <div className="space-y-2">
            <label className="text-xs font-mono text-zinc-400 ml-1">TARGET_URL</label>
            <div className="relative group">
              <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-zinc-500 group-focus-within:text-zinc-200 transition-colors" />
              <Input
              type="text"
              placeholder="https://example.com"
              className="pl-9 bg-black/40 border-zinc-800 focus-visible:ring-indigo-500/50 focus-visible:border-indigo-500 font-mono transition-all placeholder:text-zinc-700 text-zinc-300"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
            />
            </div>
          </div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button 
              className="w-full bg-white text-black hover:bg-zinc-200 font-bold tracking-tight transition-all"
              onClick={handleGenerate}
            >
              GENERATE_QR
            </Button>
          </motion.div>

          {/* The Materialization Zone */}
          <div className="relative flex items-center justify-center min-h-[200px] bg-black/20 rounded-lg border border-zinc-800/50 border-dashed overflow-hidden">
            <AnimatePresence mode="wait">
              {qrValue ? (
                <motion.div
                  key="qr-active"
                  initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, type: "spring" }}
                  className="p-4 bg-white rounded-xl shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]"
                >
                  <QRCodeSVG
                    ref={qrRef}
                    value={qrValue}
                    size={180}
                    level="H"
                    className="w-full h-full"
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="qr-idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center gap-2 text-zinc-600 font-mono text-xs"
                >
                  <div className="w-12 h-12 rounded-full bg-zinc-900/50 flex items-center justify-center mb-2">
                    <div className="w-2 h-2 bg-zinc-700 rounded-full animate-pulse" />
                  </div>
                  [AWAITING_INPUT]
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Download Options */}
          {qrValue && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-2 gap-3"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  className="w-full border-zinc-800 hover:bg-zinc-900 hover:text-white hover:border-zinc-700 transition-colors"
                  onClick={downloadPNG}
                >
                  <ImageIcon className="mr-2 h-4 w-4" />
                  PNG
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  className="w-full border-zinc-800 hover:bg-zinc-900 hover:text-white hover:border-zinc-700 transition-colors"
                  onClick={downloadSVG}
                >
                  <FileCode className="mr-2 h-4 w-4" />
                  SVG
                </Button>
              </motion.div>
            </motion.div>
          )}
        </div>
      </Card>
    </div>
  )
}