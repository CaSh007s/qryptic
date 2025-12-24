"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Chrome, Loader2 } from "lucide-react"
import { toast } from "sonner"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [username, setUsername] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    
    if (error) {
      toast.error("Login Failed", {
        description: error.message,
      })
      setLoading(false)
    } else {
      toast.success("Welcome back", {
        description: "Redirecting to dashboard...",
      })
      router.push("/dashboard")
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    const { error } = await supabase.auth.signUp({ 
      email, 
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
        data: {
          full_name: fullName,
          username: username,
        }
      }
    })
    
    if (error) {
      toast.error("Signup Failed", {
        description: error.message,
      })
      setLoading(false)
    } else {
      toast.success("Account Created", {
        description: "Please check your email for the confirmation link.",
      })
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${location.origin}/auth/callback` },
    })

    if (error) {
      toast.error("Google Login Failed", {
        description: error.message
      })
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-background relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <Card className="w-[400px] z-10 border-zinc-800 bg-zinc-950/50 backdrop-blur-xl shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">Access Terminal</CardTitle>
          <CardDescription>Enter credentials to unlock the dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 bg-zinc-900/50">
              <TabsTrigger value="login" className="data-[state=active]:bg-zinc-800 data-[state=active]:text-white">Login</TabsTrigger>
              <TabsTrigger value="signup" className="data-[state=active]:bg-zinc-800 data-[state=active]:text-white">Sign Up</TabsTrigger>
            </TabsList>

            {/* LOGIN FORM */}
            <TabsContent value="login" className="space-y-4">
              <form onSubmit={handleEmailLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-login">Email</Label>
                  <Input 
                    id="email-login" 
                    type="email" 
                    placeholder="user@example.com"
                    className="bg-black/40 border-zinc-800 focus-visible:ring-indigo-500/50"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-login">Password</Label>
                  <Input 
                    id="password-login" 
                    type="password" 
                    className="bg-black/40 border-zinc-800 focus-visible:ring-indigo-500/50"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-white text-black hover:bg-zinc-200 font-bold transition-all hover:scale-[1.02] active:scale-[0.98]" 
                  disabled={loading}
                >
                  {loading ? <Loader2 className="animate-spin h-4 w-4" /> : "Sign In"}
                </Button>
              </form>
            </TabsContent>

            {/* SIGNUP FORM */}
            <TabsContent value="signup" className="space-y-4">
              <form onSubmit={handleSignUp} className="space-y-4">
                
                {/* FULL NAME */}
                <div className="space-y-2">
                  <Label htmlFor="fullname">Full Name</Label>
                  <Input 
                    id="fullname" 
                    type="text" 
                    placeholder="John Doe" 
                    className="bg-black/40 border-zinc-800 focus-visible:ring-indigo-500/50"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required 
                  />
                </div>

                {/* NEW USERNAME FIELD */}
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input 
                    id="username" 
                    type="text" 
                    placeholder="johnny_d" // Generic placeholder
                    className="bg-black/40 border-zinc-800 focus-visible:ring-indigo-500/50"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required 
                  />
                </div>

                {/* EMAIL */}
                <div className="space-y-2">
                  <Label htmlFor="email-signup">Email</Label>
                  <Input 
                    id="email-signup" 
                    type="email" 
                    placeholder="name@example.com"
                    className="bg-black/40 border-zinc-800 focus-visible:ring-indigo-500/50"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                  />
                </div>

                {/* PASSWORD */}
                <div className="space-y-2">
                  <Label htmlFor="password-signup">Password</Label>
                  <Input 
                    id="password-signup" 
                    type="password" 
                    className="bg-black/40 border-zinc-800 focus-visible:ring-indigo-500/50"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-white text-black hover:bg-zinc-200 font-bold transition-all hover:scale-[1.02] active:scale-[0.98]" 
                  disabled={loading}
                >
                  {loading ? <Loader2 className="animate-spin h-4 w-4" /> : "Create Account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-zinc-800" /></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-zinc-950 px-2 text-zinc-500">Or continue with</span></div>
          </div>

          <Button 
            variant="outline" 
            onClick={handleGoogleLogin} 
            className="w-full border-zinc-800 hover:bg-zinc-900 hover:text-white gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Chrome className="h-4 w-4" /> Google
          </Button>

        </CardContent>
      </Card>
    </div>
  )
}