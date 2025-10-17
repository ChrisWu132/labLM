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
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-7xl">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-default">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {COPY.app.name}
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild className="rounded-full bg-muted/30 hover:bg-muted/40 text-foreground shadow-sm">
              <Link href="#curriculum">Curriculum</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild className="rounded-full bg-muted/30 hover:bg-muted/40 text-foreground shadow-sm">
              <Link href="#educators">For Educators</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild className="rounded-full bg-muted/30 hover:bg-muted/40 text-foreground shadow-sm">
              <Link href="#implementation">Implementation</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild className="rounded-full bg-muted/30 hover:bg-muted/40 text-foreground shadow-sm">
              <Link href="#faq">FAQ</Link>
            </Button>
            <Link href={LINKS.auth}>
              <Button variant="ghost" size="sm" className="rounded-full bg-muted/30 hover:bg-muted/40 text-foreground shadow-sm">
                Sign In
              </Button>
            </Link>
            
          </nav>
          <Link href={LINKS.auth} className="md:hidden">
            <Button size="sm" className="shadow-default">Demo</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section - Civic-Modern with Playful Accents */}
      <section className="py-20 md:py-32 px-4 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance leading-tight">
                {COPY.hero.headline}
              </h1>
              <p className="text-lg text-muted-foreground mb-8 text-pretty leading-relaxed">
                {COPY.hero.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href={LINKS.auth}>
                  <Button size="lg" className="gap-2 transition-all rounded-full h-12 px-6 text-base font-semibold bg-gradient-to-r from-primary to-accent text-foreground hover:brightness-[1.06] ring-4 ring-primary/30 shadow-[0_10px_30px_rgba(0,0,0,.12)] hover:-translate-y-0.5 active:translate-y-0 border-2 border-foreground">
                    <Sparkles className="w-4 h-4" />
                    {COPY.cta.primary}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" asChild className="border-2 rounded-full h-12 px-6 text-base"
                >
                  <Link href="#curriculum">{COPY.cta.secondary}</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-success/5 rounded-3xl"></div>

              <div className="relative grid grid-cols-2 gap-6 p-8 rounded-3xl border-2 border-primary/10 bg-white/50 backdrop-blur-sm">
                {PROOF_POINTS.map((point, i) => {
                  const icons = [
                    <Clock key="clock" className="w-8 h-8 text-primary" />,
                    <GraduationCap key="grad" className="w-8 h-8 text-accent" />,
                    <Sparkles key="sparkles" className="w-8 h-8 text-success" />,
                    <Award key="award" className="w-8 h-8 text-primary" />
                  ]
                  return (
                    <div key={i} className="flex flex-col gap-3 group">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                        {icons[i]}
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-foreground mb-1">
                          {point.stat}
                        </div>
                        <div className="text-sm text-muted-foreground font-medium leading-tight">
                          {point.label}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
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
                  <div className="w-14 h-14 rounded-full bg-white text-foreground border-2 border-foreground flex items-center justify-center font-bold text-lg shadow-default group-hover:shadow-hover transition-all group-hover:scale-110">
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
      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              {COPY.sections.pricing.badge}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{COPY.sections.pricing.title}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {COPY.sections.pricing.description}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch">
            {PRICING.tiers.map((tier, i) => (
              <Card
                key={i}
                className={`shadow-default hover:shadow-hover transition-all duration-300 border-2 rounded-2xl h-full flex flex-col`}
              >
                <CardHeader className="text-center space-y-4 pt-6">
                  {tier.highlighted && (
                    <Badge className="mb-2 mx-auto bg-gradient-to-r from-primary to-accent text-white border-0">
                      Most Popular
                    </Badge>
                  )}
                  {i === 1 ? (
                    <CardTitle className="text-4xl font-bold">{tier.name}</CardTitle>
                  ) : (
                    <div className="h-6" />
                  )}
                  <div className="text-4xl font-bold">
                    {tier.price}
                    {tier.period && <span className="text-lg font-normal text-muted-foreground">/{tier.period}</span>}
                  </div>
                  <CardDescription className="text-base">{tier.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 flex-1 flex flex-col justify-between pb-10">
                  <ul className="space-y-3">
                    {tier.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href={LINKS.auth} className="block">
                    <Button
                      size="lg"
                      className={`w-full shadow-default hover:shadow-hover transition-all border-2 ${
                        tier.highlighted ? "border-foreground" : ""
                      }`}
                      variant={tier.highlighted ? "default" : "outline"}
                    >
                      {tier.cta}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-4 bg-muted/30">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Common Questions
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{COPY.sections.faq.title}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">{COPY.sections.faq.description}</p>
          </div>
          <Card className="shadow-default border-2">
            <CardContent className="p-0">
              <Accordion type="single" collapsible className="w-full">
                {FAQS.map((faq, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="border-b last:border-0 px-6">
                    <AccordionTrigger className="text-left text-base font-semibold hover:text-primary transition-colors py-6">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed text-base pb-6">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Final CTA removed to eliminate extra whitespace at the bottom */}

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
