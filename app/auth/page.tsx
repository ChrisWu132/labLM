"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sparkles, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase-client"
import { useToast } from "@/hooks/use-toast"

export default function AuthPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [userType, setUserType] = useState<"student" | "teacher">("student")

  const handleEmailPasswordAuth = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      toast({
        title: "Missing fields",
        description: "Please enter both email and password",
        variant: "destructive",
      })
      return
    }

    if (password.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const supabase = createClient()

      // Determine redirect URL based on user type
      const redirectUrl = userType === "teacher"
        ? "/dashboard/teacher"
        : "/dashboard/orientation"

      if (isSignUp) {
        // Sign up new user
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}${redirectUrl}`,
            data: {
              user_type: userType, // Store user type in metadata
            }
          },
        })

        if (error) throw error

        // Check if email confirmation is required
        if (data?.user?.identities?.length === 0) {
          toast({
            title: "Email already registered",
            description: "Please sign in instead",
            variant: "destructive",
          })
          setIsSignUp(false)
          return
        }

        toast({
          title: "Account created!",
          description: `Welcome, ${userType}! Redirecting...`,
        })

        // Redirect immediately (most Supabase configs don't require email confirmation)
        setTimeout(() => {
          router.push(redirectUrl)
          router.refresh()
        }, 1000)
      } else {
        // Sign in existing user
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (error) throw error

        toast({
          title: "Welcome back!",
          description: "Redirecting to dashboard...",
        })

        // Redirect based on user type
        router.push(redirectUrl)
        router.refresh()
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || `Failed to ${isSignUp ? "sign up" : "sign in"}. Please try again.`,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/30">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-6 h-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl">{isSignUp ? "Create Account" : "Welcome Back"}</CardTitle>
          <CardDescription>
            {isSignUp
              ? "Join VibeCode Study and start learning with AI"
              : "Sign in to continue your learning journey"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleEmailPasswordAuth} className="space-y-4">
            {/* User Type Selection */}
            <div className="space-y-2">
              <Label>I am a...</Label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setUserType("student")}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    userType === "student"
                      ? "border-primary bg-primary/10 font-medium"
                      : "border-border hover:border-primary/50"
                  }`}
                  disabled={isLoading}
                >
                  🎓 Student
                </button>
                <button
                  type="button"
                  onClick={() => setUserType("teacher")}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    userType === "teacher"
                      ? "border-primary bg-primary/10 font-medium"
                      : "border-border hover:border-primary/50"
                  }`}
                  disabled={isLoading}
                >
                  👨‍🏫 Teacher
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
                minLength={6}
              />
              {isSignUp && (
                <p className="text-xs text-muted-foreground">Must be at least 6 characters</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {isSignUp ? "Creating account..." : "Signing in..."}
                </>
              ) : (
                <>{isSignUp ? "Create Account" : "Sign In"}</>
              )}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-sm text-primary hover:underline"
                disabled={isLoading}
              >
                {isSignUp ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
              </button>
            </div>
          </form>

          <p className="text-xs text-center text-muted-foreground">
            By continuing, you agree to our{" "}
            <a href="#" className="underline hover:text-foreground">
              Terms
            </a>{" "}
            and{" "}
            <a href="#" className="underline hover:text-foreground">
              Privacy Policy
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
