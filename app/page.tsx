import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Sparkles, Code2, Award, ArrowRight, Zap } from "lucide-react"
import { LABS, FAQS, PROOF_POINTS, PRICING, SAMPLE_PROJECTS, COPY, LINKS } from "@/lib/constants"

const iconMap = {
  compass: Sparkles,
  code: Code2,
  award: Award,
} as const

const colorMap = {
  1: "text-primary",
  2: "text-teal",
  3: "text-amber",
} as const

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-7xl">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-lg">{COPY.app.name}</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#modules" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Labs
            </Link>
            <Link href="#proof" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              How It Works
            </Link>
            <Link href="#faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              FAQ
            </Link>
            <Link href={LINKS.auth}>
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href={LINKS.auth}>
              <Button size="sm">Start Free</Button>
            </Link>
          </nav>
          <Link href={LINKS.auth} className="md:hidden">
            <Button size="sm">Start</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-32 px-4">
        <div className="container mx-auto max-w-5xl text-center">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
            {COPY.hero.badge}
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
            {COPY.hero.headline}
            <br />
            <span className="text-primary">{COPY.hero.subheadline}</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            {COPY.hero.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href={LINKS.auth}>
              <Button size="lg" className="gap-2">
                {COPY.cta.primary}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" asChild>
              <Link href="#modules">{COPY.cta.view}</Link>
            </Button>
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
            {PROOF_POINTS.map((point, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl font-bold text-foreground">{point.stat}</div>
                <div>{point.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Labs Overview */}
      <section id="modules" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{COPY.sections.modules.title}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {COPY.sections.modules.description}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {LABS.map((lab) => {
              const Icon = iconMap[lab.icon as keyof typeof iconMap]
              const color = colorMap[lab.number as keyof typeof colorMap]
              return (
                <Card key={lab.number} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className={`w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center ${color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex flex-col gap-1 items-end">
                        <Badge variant="secondary" className="text-xs">
                          {lab.duration}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {lab.difficulty}
                        </Badge>
                      </div>
                    </div>
                    <CardTitle className="text-xl">
                      Lab {lab.number}: {lab.title}
                    </CardTitle>
                    <CardDescription className="text-sm leading-relaxed mb-3">{lab.description}</CardDescription>
                    <div className="flex flex-wrap gap-1">
                      {lab.concepts.map((concept) => (
                        <Badge key={concept} variant="secondary" className="text-xs font-normal">
                          {concept}
                        </Badge>
                      ))}
                    </div>
                  </CardHeader>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Proof Section - Learning Outcomes */}
      <section id="proof" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{COPY.sections.proof.title}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{COPY.sections.proof.description}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {SAMPLE_PROJECTS.map((project, i) => {
              const icons = [Sparkles, Code2, Zap]
              const Icon = icons[i]
              return (
                <Card key={i} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div
                      className={`w-full h-48 bg-gradient-to-br ${project.gradient} rounded-lg mb-4 flex items-center justify-center`}
                    >
                      <Icon className={`w-16 h-16 ${i === 0 ? "text-primary" : i === 1 ? "text-teal" : "text-amber"}`} />
                    </div>
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{COPY.sections.pricing.title}</h2>
            <p className="text-lg text-muted-foreground">{COPY.sections.pricing.description}</p>
          </div>
          <Card className="max-w-lg mx-auto border-2 border-primary">
            <CardHeader className="text-center pb-8">
              <Badge className="mb-4 mx-auto bg-primary/10 text-primary border-primary/20">
                {COPY.sections.pricing.badge}
              </Badge>
              <CardTitle className="text-3xl mb-2">Start Learning</CardTitle>
              <div className="text-4xl font-bold mb-2">
                Free
                <span className="text-lg font-normal text-muted-foreground"> to start</span>
              </div>
              <CardDescription>{PRICING.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-8">
                {PRICING.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href={LINKS.auth} className="block">
                <Button size="lg" className="w-full">
                  {COPY.cta.enroll}
                </Button>
              </Link>
              <p className="text-xs text-center text-muted-foreground mt-4">{PRICING.guarantee}</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{COPY.sections.faq.title}</h2>
            <p className="text-lg text-muted-foreground">{COPY.sections.faq.description}</p>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left text-base">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{COPY.sections.finalCta.title}</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">{COPY.sections.finalCta.description}</p>
          <Link href={LINKS.auth}>
            <Button size="lg" variant="secondary" className="gap-2">
              {COPY.cta.secondary}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-semibold">{COPY.app.name}</span>
              </div>
              <p className="text-sm text-muted-foreground">{COPY.app.tagline}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Learning</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#modules" className="hover:text-foreground transition-colors">
                    View Labs
                  </Link>
                </li>
                <li>
                  <Link href="#proof" className="hover:text-foreground transition-colors">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="#faq" className="hover:text-foreground transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href={LINKS.helpCenter} className="hover:text-foreground transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href={LINKS.community} className="hover:text-foreground transition-colors">
                    Community
                  </Link>
                </li>
                <li>
                  <Link href={LINKS.contact} className="hover:text-foreground transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href={LINKS.privacy} className="hover:text-foreground transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href={LINKS.terms} className="hover:text-foreground transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href={LINKS.refund} className="hover:text-foreground transition-colors">
                    Refund Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>{COPY.footer.copyright}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
