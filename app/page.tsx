import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle2,
  Sparkles,
  Code2,
  Award,
  ArrowRight,
  Zap,
  Users,
  BookOpen,
  GraduationCap,
  Shield,
  BarChart,
  Clock
} from "lucide-react"
import {
  LABS,
  FAQS,
  PROOF_POINTS,
  PRICING,
  EDUCATOR_BENEFITS,
  WHY_AI_LITERACY,
  IMPLEMENTATION_STEPS,
  COPY,
  LINKS
} from "@/lib/constants"

const iconMap = {
  compass: Sparkles,
  code: Code2,
  award: Award,
} as const

const colorMap = {
  1: "text-primary",
  2: "text-teal",
  3: "text-amber",
  4: "text-primary",
  5: "text-teal",
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
            <Link href="#curriculum" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Curriculum
            </Link>
            <Link href="#educators" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              For Educators
            </Link>
            <Link href="#implementation" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Implementation
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
              <Button size="sm">Request Demo</Button>
            </Link>
          </nav>
          <Link href={LINKS.auth} className="md:hidden">
            <Button size="sm">Demo</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section - Civic-Modern with Playful Accents */}
      <section className="py-20 md:py-32 px-4 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 hover:bg-primary/15 transition-colors">
                <Sparkles className="w-3 h-3 mr-1.5" />
                {COPY.hero.badge}
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance leading-tight">
                {COPY.hero.headline}
              </h1>
              <p className="text-lg text-muted-foreground mb-6 text-pretty leading-relaxed">
                {COPY.hero.description}
              </p>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-4 mb-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  <span>Standards-Aligned</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-success" />
                  <span>COPPA/FERPA Ready</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-success" />
                  <span>100+ Schools</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href={LINKS.auth}>
                  <Button size="lg" className="gap-2 shadow-default hover:shadow-hover transition-all">
                    {COPY.cta.primary}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" asChild className="border-2">
                  <Link href="#curriculum">{COPY.cta.secondary}</Link>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                No credit card required. District pricing available.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {PROOF_POINTS.map((point, i) => (
                <Card key={i} className="shadow-default hover:shadow-hover transition-shadow border-2">
                  <CardHeader className="pb-4">
                    <div className="text-3xl font-bold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">
                      {point.stat}
                    </div>
                    <CardDescription className="font-medium">{point.label}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why AI Literacy Matters - Value Pillars */}
      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
              Why This Matters
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{COPY.sections.why.title}</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {COPY.sections.why.description}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {WHY_AI_LITERACY.map((item, i) => (
              <Card key={i} className="shadow-default hover:shadow-hover transition-all duration-300 hover:-translate-y-1 border-2">
                <CardHeader className="space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                    {i === 0 && <Shield className="w-7 h-7 text-primary" />}
                    {i === 1 && <Zap className="w-7 h-7 text-accent" />}
                    {i === 2 && <GraduationCap className="w-7 h-7 text-success" />}
                  </div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">{item.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Overview */}
      <section id="curriculum" className="py-24 px-4 bg-gradient-to-b from-muted/20 to-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Project-Based Learning
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{COPY.sections.curriculum.title}</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {COPY.sections.curriculum.description}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {LABS.map((lab) => {
              const Icon = iconMap[lab.icon as keyof typeof iconMap] || Sparkles
              const gradients = [
                "from-primary/10 to-accent/5",
                "from-accent/10 to-success/5",
                "from-success/10 to-primary/5",
                "from-primary/10 to-success/5",
                "from-accent/10 to-primary/5"
              ]
              return (
                <Card
                  key={lab.number}
                  className="shadow-default hover:shadow-hover transition-all duration-300 hover:-translate-y-1 border-2 group"
                >
                  <CardHeader className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradients[lab.number - 1]} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <Icon className="w-7 h-7 text-primary" />
                      </div>
                      <Badge variant="secondary" className="text-xs font-medium px-3">
                        <Clock className="w-3 h-3 mr-1 inline" />
                        {lab.duration}
                      </Badge>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-accent mb-1">LAB {lab.number}</div>
                      <CardTitle className="text-xl mb-2">
                        {lab.title}
                      </CardTitle>
                    </div>
                    <CardDescription className="text-base leading-relaxed">{lab.description}</CardDescription>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {lab.concepts.map((concept) => (
                        <Badge key={concept} variant="outline" className="text-xs font-normal border-muted-foreground/20">
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

      {/* For Educators */}
      <section id="educators" className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-success/10 text-success border-success/20">
              Teacher-Ready
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{COPY.sections.educators.title}</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {COPY.sections.educators.description}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {EDUCATOR_BENEFITS.map((benefit, i) => {
              const iconColors = ["text-primary", "text-accent", "text-success", "text-primary"]
              const iconBgs = [
                "from-primary/10 to-primary/5",
                "from-accent/10 to-accent/5",
                "from-success/10 to-success/5",
                "from-primary/10 to-accent/5"
              ]
              return (
                <Card key={i} className="shadow-default hover:shadow-hover transition-all duration-300 border-2">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${iconBgs[i]} flex items-center justify-center shrink-0`}>
                        {i === 0 && <BookOpen className={`w-7 h-7 ${iconColors[i]}`} />}
                        {i === 1 && <Users className={`w-7 h-7 ${iconColors[i]}`} />}
                        {i === 2 && <BarChart className={`w-7 h-7 ${iconColors[i]}`} />}
                        {i === 3 && <Clock className={`w-7 h-7 ${iconColors[i]}`} />}
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">{benefit.title}</CardTitle>
                        <CardDescription className="text-base leading-relaxed mb-4">
                          {benefit.description}
                        </CardDescription>
                        <ul className="space-y-2.5">
                          {benefit.features.map((feature, j) => (
                            <li key={j} className="flex items-start gap-2.5 text-sm">
                              <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                              <span className="text-foreground/80">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Implementation & Support */}
      <section id="implementation" className="py-24 px-4 bg-gradient-to-b from-muted/20 to-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
              8-Week Timeline
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{COPY.sections.implementation.title}</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {COPY.sections.implementation.description}
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            {IMPLEMENTATION_STEPS.map((step, i) => (
              <div key={i} className="flex gap-6 mb-10 last:mb-0 group">
                <div className="flex-shrink-0 relative">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent text-white flex items-center justify-center font-bold text-lg shadow-default group-hover:shadow-hover transition-all group-hover:scale-110">
                    {step.step}
                  </div>
                  {i < IMPLEMENTATION_STEPS.length - 1 && (
                    <div className="absolute top-14 left-7 w-0.5 h-10 bg-gradient-to-b from-primary/30 to-accent/10"></div>
                  )}
                </div>
                <div className="flex-1 pt-1">
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">{step.description}</p>
                  {step.duration && (
                    <Badge variant="secondary" className="text-xs font-medium px-3">
                      <Clock className="w-3 h-3 mr-1 inline" />
                      {step.duration}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{COPY.sections.pricing.title}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {COPY.sections.pricing.description}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {PRICING.tiers.map((tier, i) => (
              <Card
                key={i}
                className={tier.highlighted ? "border-2 border-primary" : ""}
              >
                <CardHeader className="text-center">
                  {tier.highlighted && (
                    <Badge className="mb-4 mx-auto bg-primary/10 text-primary border-primary/20">
                      Most Popular
                    </Badge>
                  )}
                  <CardTitle className="text-2xl mb-2">{tier.name}</CardTitle>
                  <div className="text-3xl font-bold mb-2">
                    {tier.price}
                    {tier.period && <span className="text-lg font-normal text-muted-foreground">/{tier.period}</span>}
                  </div>
                  <CardDescription>{tier.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {tier.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href={LINKS.auth} className="block">
                    <Button
                      size="lg"
                      className="w-full"
                      variant={tier.highlighted ? "default" : "outline"}
                    >
                      {tier.cta}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
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
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={LINKS.auth}>
              <Button size="lg" variant="secondary" className="gap-2">
                Request Demo
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href={LINKS.contact}>
              <Button size="lg" variant="outline" className="gap-2 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                Contact Sales
              </Button>
            </Link>
          </div>
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
              <h4 className="font-semibold mb-3">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#curriculum" className="hover:text-foreground transition-colors">
                    Curriculum
                  </Link>
                </li>
                <li>
                  <Link href="#educators" className="hover:text-foreground transition-colors">
                    For Educators
                  </Link>
                </li>
                <li>
                  <Link href="#implementation" className="hover:text-foreground transition-colors">
                    Implementation
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href={LINKS.helpCenter} className="hover:text-foreground transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href={LINKS.community} className="hover:text-foreground transition-colors">
                    Teacher Community
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
              <h4 className="font-semibold mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href={LINKS.contact} className="hover:text-foreground transition-colors">
                    Contact Us
                  </Link>
                </li>
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
