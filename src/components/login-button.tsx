"use client"

import { Button } from "@/components/ui/button"
import { createClient } from "@/utils/supabase/client"
import { Chrome } from "lucide-react"

export default function LoginButton() {
  const handleLogin = async () => {
    const supabase = createClient()
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    })
  }

  return (
    <Button onClick={handleLogin} variant="outline" className="gap-2">
      <Chrome className="w-4 h-4" />
      Login with Google
    </Button>
  )
}