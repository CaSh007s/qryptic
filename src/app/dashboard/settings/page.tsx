"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/utils/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

export default function SettingsPage() {
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const supabase = createClient()

  useEffect(() => {
    const getProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setName(user.user_metadata?.full_name || "")
        setEmail(user.email || "")
      }
    }
    getProfile()
  }, [])

  const handleUpdate = async () => {
    setLoading(true)
    const { error } = await supabase.auth.updateUser({
      data: { full_name: name }
    })
    
    if (error) {
      alert("Error updating profile")
    } else {
      alert("Profile updated successfully")
      // Force a reload to update the navbar avatar
      window.location.reload()
    }
    setLoading(false)
  }

  return (
    <div className="flex min-h-screen flex-col items-center p-24 bg-background">
      <div className="w-full max-w-2xl space-y-8">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Manage your public profile information.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            
            <div className="space-y-2">
              <Label>Email</Label>
              <Input value={email} disabled className="bg-black/20 border-zinc-800 text-zinc-500" />
              <p className="text-xs text-zinc-500">Email cannot be changed directly.</p>
            </div>

            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                className="bg-black/40 border-zinc-800" 
              />
            </div>

            <div className="pt-4 flex justify-end">
              <Button onClick={handleUpdate} className="bg-white text-black hover:bg-zinc-200">
                {loading ? <Loader2 className="animate-spin h-4 w-4" /> : "Save Changes"}
              </Button>
            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  )
}