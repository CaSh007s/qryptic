"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { QrypticLogo } from "@/components/qryptic-logo"

export default function SignupPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // 1. Sign up with Supabase
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name, // Saving their name to metadata
        },
      },
    })

    if (error) {
      toast.error("Signup Failed", {
        description: error.message,
      })
      setLoading(false)
    } else {
      // 2. Success!
      toast.success("Account Created!", {
        description: "You can now log in with your credentials.",
      })
      
      // Optional: Auto-redirect to login so they can sign in
      setTimeout(() => {
        router.push("/login")
      }, 1500)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-black selection:bg-indigo-500/30">
      
      {/* Background decoration */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      
      <div className="z-10 w-full max-w-md space-y-8">
        
        {/* Header */}
        <div className="flex flex-col items-center space-y-2 text-center">
          <Link href="/" className="mb-4 scale-150">
            <QrypticLogo />
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Create an account
          </h1>
          <p className="text-sm text-zinc-400">
            Join Qryptic to start tracking your connections
          </p>
        </div>

        <Card className="p-6 bg-zinc-900/50 border-zinc-800 backdrop-blur-xl">
          <div className="space-y-6">
            
            {/* DISABLED GOOGLE BUTTON */}
            <div className="relative group">
              <Button 
                variant="outline" 
                className="w-full border-zinc-800 bg-zinc-900/20 text-zinc-600 cursor-not-allowed hover:bg-zinc-900/20 hover:text-zinc-600 relative opacity-70"
                disabled={true}
              >
                <span className="absolute -top-2 -right-2 bg-indigo-500 text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold tracking-wider z-10 shadow-lg shadow-indigo-500/20">
                  SOON
                </span>
                <svg className="mr-2 h-4 w-4 opacity-50" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                  <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                </svg>
                Google (Coming Soon)
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-zinc-800" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-zinc-950 px-2 text-zinc-500">Or continue with</span>
              </div>
            </div>

            <form onSubmit={handleSignup} className="space-y-4">
              
              {/* Name Input */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-zinc-300">Full Name</Label>
                <Input 
                  id="name" 
                  type="text" 
                  placeholder="John Doe"
                  className="bg-black/40 border-zinc-800 focus-visible:ring-indigo-500/50 focus-visible:border-indigo-500 placeholder:text-zinc-700 placeholder:opacity-50"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-zinc-300">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="name@example.com"
                  className="bg-black/40 border-zinc-800 focus-visible:ring-indigo-500/50 focus-visible:border-indigo-500 placeholder:text-zinc-700 placeholder:opacity-50"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-zinc-300">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••"
                  className="bg-black/40 border-zinc-800 focus-visible:ring-indigo-500/50 focus-visible:border-indigo-500 placeholder:text-zinc-700 placeholder:opacity-50"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-white text-black hover:bg-zinc-200 font-bold tracking-wide mt-2"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "CREATE ACCOUNT"
                )}
              </Button>
            </form>
          </div>
        </Card>

        <p className="text-center text-sm text-zinc-500">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-white hover:text-indigo-400 transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}