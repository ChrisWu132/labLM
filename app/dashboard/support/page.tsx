import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageSquare, Mail, BookOpen, Users } from "lucide-react"
import Link from "next/link"

export default function SupportPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Support</h1>
        <p className="text-muted-foreground">Get help and connect with the community</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <MessageSquare className="w-8 h-8 text-primary mb-2" />
            <CardTitle>AI Coach</CardTitle>
            <CardDescription>Get instant help from your personal AI coach</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Ask Coach</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Users className="w-8 h-8 text-teal mb-2" />
            <CardTitle>Community</CardTitle>
            <CardDescription>Join our Discord to connect with other learners</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full bg-transparent" asChild>
              <Link href="https://discord.gg/example" target="_blank">
                Join Discord
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <BookOpen className="w-8 h-8 text-amber mb-2" />
            <CardTitle>Documentation</CardTitle>
            <CardDescription>Browse guides and resources</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full bg-transparent">
              View Docs
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Mail className="w-8 h-8 text-primary mb-2" />
            <CardTitle>Email Support</CardTitle>
            <CardDescription>Contact our team directly</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full bg-transparent" asChild>
              <Link href="mailto:support@example.com">Send Email</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
