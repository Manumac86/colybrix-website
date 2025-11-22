import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Target,
  Lightbulb,
  Heart,
  Zap,
  Users,
  Code,
  Brain,
  Rocket,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5">
            <Heart className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">Our Story</span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight text-balance">
            Building the future of startup development.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-pretty">
            {`Collybrix was born from a simple observation: startups fail not
            because of bad ideas, but because of poor technical execution and poor market fit. We're
            here to change that.`}
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-card border-y border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12">
            <Card className="p-8 space-y-6 bg-background border-border">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To empower startup accelerators and early-stage companies with
                AI-powered technical expertise, enabling them to build solid
                foundations, ship faster, and scale with confidence. We believe
                every startup deserves world-class technical mentorship.
              </p>
            </Card>

            <Card className="p-8 space-y-6 bg-background border-border">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Lightbulb className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Our Vision
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                A world where technical excellence is accessible to every
                startup, regardless of their resources or location. Where AI and
                human expertise combine to accelerate innovation and reduce the
                time from idea to market-ready product.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* The Story */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
              How Collybrix began.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              At Collybrix, we were born from a single question that followed us
              through years of experience in technology, strategy, and product
              development:{" "}
              <strong>
                Why do companies with so much talent and internal knowledge
                still make decisions disconnected from their data, their people,
                and their vision for the future?
              </strong>
            </p>
          </div>

          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p>
              {`We noticed a pattern: brilliant founders with game-changing ideas
              were struggling with technical execution. They'd rush to build
              MVPs without proper architecture, skip testing to save time, and
              end up with technical debt that would haunt them for years.`}
            </p>
            <p>
              {`Meanwhile, accelerators were doing their best to provide technical
              guidance, but they couldn't scale personalized mentorship to every
              cohort company. The technical expertise gap was real, and it was
              costing startups time, money, and sometimes their entire business.`}
            </p>
            <p>
              {`That's when we asked ourselves: what if we could combine AI's
              scalability with human expertise's depth? What if we could give
              every startup access to the same level of technical mentorship
              that only well-funded companies could afford?`}
            </p>
            <p className="text-foreground font-bold">
              Collybrix was created to change that.
            </p>
            <p className="text-muted-foreground font-medium">
              Today, we partner with accelerators and startups across Europe,
              helping them build better, faster, and smarter.
            </p>
            <p className="text-foreground">
              At Collybrix, technology doesn’t replace human vision —{" "}
              <strong>it amplifies it.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-card border-y border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="space-y-4 text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-card-foreground text-balance">
              Our core values.
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              These principles guide everything we do, from how we build our AI
              tools to how we mentor startup teams.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 space-y-4 bg-background border-border">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Code className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                Technical Excellence
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We never compromise on code quality, testing, or best practices.
                Shortcuts today become problems tomorrow.
              </p>
            </Card>

            <Card className="p-6 space-y-4 bg-background border-border">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                AI + Human
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                AI accelerates, humans guide. We believe the best results come
                from combining both, not choosing one over the other.
              </p>
            </Card>

            <Card className="p-6 space-y-4 bg-background border-border">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                Mentorship First
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {`We don't just build for you—we teach you to build. Our goal is
                to make teams self-sufficient and confident.`}
              </p>
            </Card>

            <Card className="p-6 space-y-4 bg-background border-border">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                Speed with Substance
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Fast shipping matters, but not at the cost of quality. We help
                you move quickly while building solid foundations.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="space-y-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
              What makes us different.
            </h2>
            <p className="text-lg text-muted-foreground text-pretty">
              {`We're not just consultants, and we're not just a software tool.
              We're your technical partner.`}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Rocket className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    AI Agentic Software
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {`Our proprietary AI agents don't just generate code—they
                    understand context, follow best practices, and adapt to your
                    specific needs. From PRDs to production-ready features.`}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Xtreme Programming Experts
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {`We're deeply rooted in XP methodology—pair programming, TDD,
                    continuous integration, and rapid feedback loops. These
                    aren't buzzwords for us; they're how we work.`}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Brain className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Accelerator-Native
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {`We understand the accelerator model inside and out. We know
                    the time constraints, the resource limitations, and the
                    pressure to show traction. We're built for this environment.`}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Code className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    End-to-End Support
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {`From initial PRD to v1.0 and beyond, we're with you every
                    step. Architecture, development, testing, deployment, and
                    scaling—we've got you covered.`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-card border-y border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-card-foreground text-balance">
              Ready to partner with us?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              {`Whether you're an accelerator looking to enhance your technical
              support or a startup seeking expert guidance, we'd love to hear
              from you.`}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/#contact">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 text-base"
                >
                  Start a Conversation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/#partners">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base border-border hover:bg-secondary bg-transparent"
                >
                  View Our Work
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
