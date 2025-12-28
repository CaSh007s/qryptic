"use client"

import { useState, useRef } from "react"
import { QRCodeSVG } from "qrcode.react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Link as LinkIcon, Image as ImageIcon, FileCode, Loader2, Palette } from "lucide-react"
import { createClient } from "@/utils/supabase/client"
import { toast } from "sonner"

interface QrGeneratorProps {
  onSuccess?: () => void
}

export const QrGenerator = ({ onSuccess }: QrGeneratorProps) => {
  const [url, setUrl] = useState("")
  const [color, setColor] = useState("#000000") // Default Black
  const [bgColor, setBgColor] = useState("#ffffff") // Default White
  const [qrValue, setQrValue] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const qrRef = useRef<SVGSVGElement>(null)
  
  const supabase = createClient()

  const handleGenerate = async () => {
    if (!url) return
    setIsSaving(true)

    // 1. Sanitize URL
    let finalUrl = url.trim()
    if (!/^https?:\/\//i.test(finalUrl)) {
      finalUrl = 'https://' + finalUrl
    }
    setQrValue(finalUrl)

    const { data: { user } } = await supabase.auth.getUser()
    
    if (user) {
      // 2. Title Generation
      let title = finalUrl
      try {
        const urlObj = new URL(finalUrl)
        title = urlObj.hostname
      } catch (e) {
        title = finalUrl.slice(0, 20)
      }

      // 3. Save with Colors
      const { error } = await supabase.from('qr_codes').insert({
        long_url: finalUrl,
        user_id: user.id,
        title: title,
        color: color,
        bgcolor: bgColor 
      })

      if (error) {
        toast.error("Failed to save", { description: error.message })
      } else {
        toast.success("QR Code Saved")
        if (onSuccess) onSuccess()  
      }
    }
    setIsSaving(false)
  }

//Download Handlers
  const downloadSVG = () => {
    if (!qrRef.current) return
    const svgData = new XMLSerializer().serializeToString(qrRef.current)
    const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    triggerDownload(url, "qryptic-code.svg")
  }

  const downloadPNG = () => {
    if (!qrRef.current) return
    const svgData = new XMLSerializer().serializeToString(qrRef.current)
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    const img = new Image()
    const size = 256
    canvas.width = size
    canvas.height = size
    img.onload = () => {
      if (!ctx) return
      ctx.fillStyle = bgColor
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
          
          {/* URL Input */}
          <div className="space-y-2">
            <label className="text-xs font-mono text-zinc-400 ml-1">TARGET_URL</label>
            <div className="relative group">
              <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-zinc-500 group-focus-within:text-zinc-200 transition-colors" />
              <Input
                type="text"
                placeholder="https://example.com"
                className="pl-9 bg-black/40 border-zinc-800 focus-visible:ring-indigo-500/50 focus-visible:border-indigo-500 font-mono transition-all"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
              />
            </div>
          </div>

          {/* Color Pickers */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs font-mono text-zinc-400">FOREGROUND</Label>
              <div className="flex items-center gap-2 bg-black/40 border border-zinc-800 rounded-md p-1 pl-3">
                <div className="w-4 h-4 rounded-full border border-zinc-700" style={{ backgroundColor: color }} />
                <input 
                  type="color" 
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="bg-transparent border-none w-full h-8 cursor-pointer"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-mono text-zinc-400">BACKGROUND</Label>
              <div className="flex items-center gap-2 bg-black/40 border border-zinc-800 rounded-md p-1 pl-3">
                <div className="w-4 h-4 rounded-full border border-zinc-700" style={{ backgroundColor: bgColor }} />
                <input 
                  type="color" 
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="bg-transparent border-none w-full h-8 cursor-pointer"
                />
              </div>
            </div>
          </div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button 
              className="w-full bg-white text-black hover:bg-zinc-200 font-bold tracking-tight transition-all"
              onClick={handleGenerate}
              disabled={isSaving}
            >
              {isSaving ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : "GENERATE_QR"}
            </Button>
          </motion.div>

          {/* Visualization Zone */}
          <div className="relative flex items-center justify-center min-h-[200px] bg-black/20 rounded-lg border border-zinc-800/50 border-dashed overflow-hidden">
            <AnimatePresence mode="wait">
              {qrValue ? (
                <motion.div
                  key="qr-active"
                  initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  className="p-4 rounded-xl shadow-[0_0_40px_-10px_rgba(255,255,255,0.1)]"
                  style={{ backgroundColor: bgColor }}
                >
                  <QRCodeSVG
                    ref={qrRef}
                    value={qrValue}
                    size={180}
                    level="H"
                    fgColor={color}
                    bgColor={bgColor}
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
                  <Palette className="w-8 h-8 opacity-20 mb-2" />
                  [AWAITING_INPUT]
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Download Buttons */}
          {qrValue && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-2 gap-3"
            >
              <Button variant="outline" onClick={downloadPNG}><ImageIcon className="mr-2 h-4 w-4"/> PNG</Button>
              <Button variant="outline" onClick={downloadSVG}><FileCode className="mr-2 h-4 w-4"/> SVG</Button>
            </motion.div>
          )}
        </div>
      </Card>
    </div>
  )
}