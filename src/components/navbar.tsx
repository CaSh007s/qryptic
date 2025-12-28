"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { createClient } from "@/utils/supabase/client"
import { User } from "@supabase/supabase-js"
import { QrypticLogo } from "@/components/qryptic-logo"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { Loader2, LogOut, Settings, User as UserIcon } from "lucide-react"
import { useRouter } from "next/navigation"

export function Navbar() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    // 1. Check active session immediately
    const checkUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        setUser(session?.user ?? null)
      } catch (error) {
        console.error("Navbar session error:", error)
      } finally {
        setLoading(false)
      }
    }
    
    checkUser()

    // 2. Listen for login/logout events real-time
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/login")
    router.refresh()
  }

  const getInitials = () => {
    if (!user?.user_metadata?.full_name) return "U"
    return user.user_metadata.full_name
      .split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  return (
    <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/50 backdrop-blur-xl transition-all">
      <div className="container flex h-16 items-center justify-between px-6 mx-auto">
        
        {/* LOGO */}
        <Link href={user ? "/dashboard" : "/"} className="flex items-center gap-2">
          <div className="scale-75 origin-left">
            <QrypticLogo />
          </div>
        </Link>

        {/* RIGHT SIDE ACTIONS */}
        <div className="flex items-center gap-4">
          {loading ? (
            // Loading Spinner
            <Loader2 className="w-5 h-5 animate-spin text-zinc-500" />
          ) : user ? (
            // LOGGED IN: Show Avatar & Menu
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-zinc-800 transition-colors">
                  <Avatar className="h-9 w-9 border border-zinc-700">
                    <AvatarImage src={user.user_metadata?.avatar_url} />
                    <AvatarFallback className="bg-zinc-900 text-zinc-200 text-xs font-mono">
                      {getInitials()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-zinc-950 border-zinc-800 text-zinc-200 p-2" align="end">
                <DropdownMenuLabel className="font-normal mb-2">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none text-white">
                      {user.user_metadata?.full_name || "Qryptic User"}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground truncate">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-zinc-800" />
                <DropdownMenuItem onClick={() => router.push("/dashboard")} className="focus:bg-zinc-900 cursor-pointer rounded-md">
                  <UserIcon className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="focus:bg-zinc-900 cursor-pointer rounded-md">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-zinc-800" />
                <DropdownMenuItem onClick={handleLogout} className="text-red-400 focus:text-red-400 focus:bg-red-950/20 cursor-pointer rounded-md">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            // LOGGED OUT: Show nothing
             <></>
          )}
        </div>
      </div>
    </header>
  )
}