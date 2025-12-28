"use client"

import { QRCodeSVG } from "qrcode.react"
import { formatDistanceToNow } from "date-fns"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Trash2, ExternalLink } from "lucide-react"
import { createClient } from "@/utils/supabase/client"
import { toast } from "sonner"
import { motion } from "framer-motion"

// We need to install date-fns for nice time formatting: npm install date-fns

interface QrCardProps {
  id: string
  title: string
  url: string
  createdAt: string
  onDelete: (id: string) => void
}

export const QrCard = ({ id, title, url, createdAt, onDelete }: QrCardProps) => {
  const supabase = createClient()

  const handleDelete = async () => {
    const { error } = await supabase.from("qr_codes").delete().eq("id", id)
    if (error) {
      toast.error("Failed to delete", { description: error.message })
    } else {
      toast.success("Deleted", { description: "QR Code removed from history" })
      onDelete(id) // Update the UI instantly
    }
  }

  const handleDownload = () => {
    // Quick SVG download logic
    const svg = document.getElementById(`qr-${id}`)
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg)
      const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `${title || "qr-code"}.svg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <motion.div layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
      <Card className="flex items-center p-4 bg-zinc-900/40 border-zinc-800 hover:border-zinc-700 transition-colors group">
        
        {/* Mini QR Preview */}
        <div className="bg-white p-2 rounded-md mr-4 shrink-0">
          <QRCodeSVG 
            id={`qr-${id}`}
            value={url} 
            size={60} 
            level="M" 
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 overflow-hidden mr-4">
          <h3 className="font-bold text-zinc-200 truncate">{title}</h3>
          <p className="text-xs text-zinc-500 truncate font-mono">{url}</p>
          <p className="text-[10px] text-zinc-600 mt-1 uppercase tracking-wider">
            {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
          </p>
        </div>

        {/* Actions (Visible on Hover) */}
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="ghost" size="icon" onClick={handleDownload} className="h-8 w-8 hover:bg-zinc-800 hover:text-white">
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleDelete} className="h-8 w-8 hover:bg-red-900/20 hover:text-red-400 text-zinc-600">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

      </Card>
    </motion.div>
  )
}