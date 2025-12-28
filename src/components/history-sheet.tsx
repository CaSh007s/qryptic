"use client"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { History } from "lucide-react"
import { QrHistoryList } from "@/components/qr-history-list"

interface HistorySheetProps {
  refreshTrigger: number
}

export function HistorySheet({ refreshTrigger }: HistorySheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2 border-zinc-800 hover:bg-zinc-800 hover:text-white transition-all">
          <History className="h-4 w-4" />
          History
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px] bg-zinc-950 border-zinc-800 text-zinc-200 overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-white">Access Logs</SheetTitle>
          <SheetDescription className="text-zinc-500">
            Your recently generated Qryptic codes.
          </SheetDescription>
        </SheetHeader>
        
        {/* The List lives here now */}
        <QrHistoryList refreshTrigger={refreshTrigger} />
        
      </SheetContent>
    </Sheet>
  )
}