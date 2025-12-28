"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/utils/supabase/client"
import { QrCard } from "@/components/qr-card"
import { Loader2 } from "lucide-react"

interface QrCode {
  id: string
  title: string
  long_url: string
  created_at: string
  color: string
  bgcolor: string
}

interface QrHistoryListProps {
  refreshTrigger?: number
}

export const QrHistoryList = ({ refreshTrigger = 0 }: QrHistoryListProps) => {
  const [codes, setCodes] = useState<QrCode[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchCodes = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data } = await supabase
        .from("qr_codes")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

      if (data) setCodes(data as unknown as QrCode[]) 
      setLoading(false)
    }

    fetchCodes()
    
    const channel = supabase
      .channel('realtime-qr-codes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'qr_codes' }, () => {
        fetchCodes()
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [refreshTrigger])

  const removeCodeFromList = (id: string) => {
    setCodes((current) => current.filter((c) => c.id !== id))
  }

  if (loading) {
    return <div className="flex justify-center p-8"><Loader2 className="animate-spin text-zinc-600" /></div>
  }

  if (codes.length === 0) {
    return (
      <div className="text-center p-8 border border-dashed border-zinc-800 rounded-xl">
        <p className="text-zinc-500 font-mono text-sm">NO_ARCHIVES_FOUND</p>
      </div>
    )
  }

  return (
    <div className="space-y-4 w-full max-w-md">
      <h2 className="text-sm font-mono text-zinc-500 ml-1">HISTORY_LOG</h2>
      <div className="grid gap-3">
        {codes.map((code) => (
          <QrCard
            key={code.id}
            id={code.id}
            title={code.title || "Untitled"}
            url={code.long_url}
            createdAt={code.created_at}
            color={code.color}
            bgColor={code.bgcolor}
            onDelete={removeCodeFromList}
          />
        ))}
      </div>
    </div>
  )
}