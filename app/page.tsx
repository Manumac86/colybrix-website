"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowRight,
  Rocket,
  Users,
  Code,
  TrendingUp,
  Zap,
  FileText,
  GitBranch,
  TestTube,
  Brain,
  Target,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

export default function Home() {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.append("access_key", "897b207e-9ae8-4514-80f9-5f50446e4915");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      toast("Message sent successfully");
    }

    if (response.status !== 200) {
      toast("Error sending message", {
        description: "Please try again later",
        duration: 5000,
      });
    }
  };

  return (
    <>
      {/* Hero Section */}
      <video
        src="/hero_video.mp4"
        autoPlay
        muted
        loop
        className="absolute top-0 left-0 w-full h-full object-cover opacity-80 -z-0"
      />
      <section className="container my-8 mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative bg-white/50 dark:bg-black/50 backdrop-blur-sm rounded-2xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl md:text-4xl lg:text-6xl font-bold leading-tight text-balance bg-linear-(--gradient-collybrix) bg-clip-text text-transparent">
              Your technical <br /> Co-Founder for startup acceleration. No
              long-term contract.
            </h1>
            <p className="text-lg md:text-xl text-card-foreground dark:text-muted-foreground leading-relaxed text-pretty max-w-2xl">
              We’re not a consultancy. We’re not an agency. We’re the senior
              technical team you wish you’d had from day one—committed to your
              success, not billing by the hour. AI-powered experts, embedded as
              your co-founders, we turn vision into traction with proven
              execution, supported by our own AI-powered software that helps
              accelerators and startups build solid tech foundations.
            </p>
            <p className="text-lg md:text-xl text-card-foreground dark:text-muted-foreground leading-relaxed text-pretty max-w-2xl">
              From premier PRDs to mentored dev teams using our own proven
              methodologies, adapted to your needs, we will accelerate your path
              from MVP to v1.0 and beyond.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/#contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base text-primary-foreground bg-primary hover:bg-secondary/50 border-none"
                >
                  Partner With Us
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 hover:translate-x-1 " />
                </Button>
              </Link>
              <Link href="/#our-approach">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base bg-transparent border-primary hover:bg-primary/10"
                >
                  Our Approach
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 via-accent/20 to-primary/10 backdrop-blur-3xl border border-border p-8">
              <div className="h-full w-full flex items-center justify-center">
                <Image
                  src="/hero_1.png"
                  alt="Collybrix AI-powered development"
                  className="rounded-xl object-cover w-full h-full"
                  width={884}
                  height={300}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-border relative bg-white/50 dark:bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-secondary">
            <div className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-bold">60%</div>
              <div className="text-sm">Faster Time to Market</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-bold">10+</div>
              <div className="text-sm">Methodologies Adapted</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-bold">100%</div>
              <div className="text-sm">Code Quality Guaranteed</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-bold">MVP→v1.0</div>
              <div className="text-sm">Solid Foundation to Scale</div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section id="our-approach" className="bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 shadow-lg rounded-2xl my-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-accent/20 via-primary/20 to-accent/10 backdrop-blur-3xl border border-border p-8">
                <div className="h-full w-full flex items-center justify-center">
                  <Image
                    src="/hero_2.png"
                    alt="Collybrix mentorship"
                    className="rounded-xl object-cover w-full h-full"
                    width={300}
                    height={300}
                  />
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5">
                <Rocket className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">
                  The Collybrix Advantage
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-card-foreground text-balance">
                Our Approach: <br /> From MVP to market leader.
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We combine AI-powered tools with human expertise to accelerate
                your technical journey while building a solid foundation for
                long-term success.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Target className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-card-foreground">
                      Shorter Time to Market
                    </div>
                    <div className="text-muted-foreground">
                      AI-accelerated development reduces your go-to-market
                      timeline by 60%
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Zap className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-card-foreground">
                      Proven Methodologies
                    </div>
                    <div className="text-muted-foreground">
                      Our own proven methodologies, adapted to your team's
                      needs, ensure quality, testing, and maintainability.
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <TrendingUp className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-card-foreground">
                      Solid Foundation to Scale
                    </div>
                    <div className="text-muted-foreground">
                      A solid technical foundation supports growth from MVP to
                      v1.0 and beyond.
                    </div>
                  </div>
                </li>
              </ul>
              {/* <Link href="/our-approach">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base border-border hover:bg-secondary bg-transparent bg-linear-(--gradient-collybrix) bg-clip-text text-transparent"
                >
                  See How It Works →
                </Button>
              </Link> */}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32"
      >
        <video
          src="/hero_video2.mp4"
          autoPlay
          muted
          loop
          className="absolute top-0 left-0 w-full h-full object-cover opacity-20 -z-0 rounded-2xl"
        />
        <div className="space-y-4 text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
            AI-powered technical excellence.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Our AI agentic platform, combined with our own proven methodologies
            and expert mentorship help accelerators and startups build better,
            faster, and smarter.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6 space-y-4 bg-card border-border hover:border-primary/50 transition-colors">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-card-foreground">
              Premier PRD Generation
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Our AI agentic platform generates Product Requirements Documents
              that set the foundation for successful development cycles.
            </p>
          </Card>

          <Card className="p-6 space-y-4 bg-card border-border hover:border-primary/50 transition-colors">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-card-foreground">
              Tech Team Building
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Build and mentor solid development teams with proven methodologies
              and best practices.
            </p>
          </Card>

          <Card className="p-6 space-y-4 bg-card border-border hover:border-primary/50 transition-colors">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <GitBranch className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-card-foreground">
              Our own proven methodologies
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Our own proven methodologies, adapted to your team's needs, ensure
              quality, testing, and maintainability, faster than ever.
            </p>
          </Card>

          <Card className="p-6 space-y-4 bg-card border-border hover:border-primary/50 transition-colors">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Brain className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-card-foreground">
              AI-Accelerated Development
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Leverage AI agents to speed up development cycles while
              maintaining code quality and best practices.
            </p>
          </Card>

          <Card className="p-6 space-y-4 bg-card border-border hover:border-primary/50 transition-colors">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <TestTube className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-card-foreground">
              Testing & Quality Assurance
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Comprehensive testing strategies from MVP to production, ensuring
              reliability at every stage.
            </p>
          </Card>

          <Card className="p-6 space-y-4 bg-card border-border hover:border-primary/50 transition-colors">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Code className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-card-foreground">
              Solid Tech Foundation
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Build scalable architectures with clean code, proper
              documentation, and maintainable systems.
            </p>
          </Card>
        </div>
      </section>

      {/* Partners Section */}
      {/* <section
        id="partners"
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32"
      >
        <div className="space-y-4 text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
            Trusted by accelerators and startups.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Leading accelerators and ambitious startups partner with Collybrix
            to build exceptional technical teams and products.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6 space-y-4 bg-card border-border hover:border-primary/50 transition-all hover:shadow-lg">
            <div className="flex items-start justify-between">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <span className="font-bold text-white text-xl">S</span>
              </div>
              <div className="text-xs text-muted-foreground">Accelerator</div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-card-foreground mb-2">
                StartupHub Madrid
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Partnered to provide technical mentorship for 20+ cohort
                companies. 85% successfully launched MVPs.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                  Accelerator
                </span>
                <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                  B2B SaaS
                </span>
              </div>
            </div>
          </Card>

          <Card className="p-6 space-y-4 bg-card border-border hover:border-primary/50 transition-all hover:shadow-lg">
            <div className="flex items-start justify-between">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                <span className="font-bold text-white text-xl">E</span>
              </div>
              <div className="text-xs text-muted-foreground">Startup</div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-card-foreground mb-2">
                EcoTrack
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Built scalable carbon tracking platform in 8 weeks. Now serving
                500+ enterprise customers.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                  Climate Tech
                </span>
                <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                  Enterprise
                </span>
              </div>
            </div>
          </Card>

          <Card className="p-6 space-y-4 bg-card border-border hover:border-primary/50 transition-all hover:shadow-lg">
            <div className="flex items-start justify-between">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                <span className="font-bold text-white text-xl">T</span>
              </div>
              <div className="text-xs text-muted-foreground">Accelerator</div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-card-foreground mb-2">
                TechVentures EU
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Integrated Collybrix into their program. Portfolio companies
                report 60% faster development cycles.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                  Accelerator
                </span>
                <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                  Deep Tech
                </span>
              </div>
            </div>
          </Card>

          <Card className="p-6 space-y-4 bg-card border-border hover:border-primary/50 transition-all hover:shadow-lg">
            <div className="flex items-start justify-between">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                <span className="font-bold text-white text-xl">M</span>
              </div>
              <div className="text-xs text-muted-foreground">Startup</div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-card-foreground mb-2">
                MediConnect
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Launched telemedicine platform with comprehensive testing.
                Scaled to 10K+ users with zero downtime.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                  HealthTech
                </span>
                <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                  Mobile
                </span>
              </div>
            </div>
          </Card>

          <Card className="p-6 space-y-4 bg-card border-border hover:border-primary/50 transition-all hover:shadow-lg">
            <div className="flex items-start justify-between">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center">
                <span className="font-bold text-white text-xl">F</span>
              </div>
              <div className="text-xs text-muted-foreground">Startup</div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-card-foreground mb-2">
                FinFlow
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Built fintech infrastructure with XP practices. Passed security
                audits and raised €2M seed round.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                  FinTech
                </span>
                <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                  Infrastructure
                </span>
              </div>
            </div>
          </Card>

          <Card className="p-6 space-y-4 bg-card border-border hover:border-primary/50 transition-all hover:shadow-lg">
            <div className="flex items-start justify-between">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center">
                <span className="font-bold text-white text-xl">A</span>
              </div>
              <div className="text-xs text-muted-foreground">Startup</div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-card-foreground mb-2">
                AIAssist
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Developed AI-powered customer service platform. Achieved 95%
                code coverage and enterprise-ready architecture.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                  AI/ML
                </span>
                <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                  SaaS
                </span>
              </div>
            </div>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <Button
            variant="outline"
            size="lg"
            className="border-border hover:bg-secondary bg-transparent"
          >
            View All Success Stories
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section> */}

      {/* Team Section */}
      <section id="team" className="bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="space-y-4 text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-card-foreground text-balance">
              Meet the experts behind Collybrix.
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Our team combines decades of experience in software development,
              AI, and startup mentorship to accelerate your technical journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 space-y-4 bg-background border-border hover:border-primary/50 transition-all group">
              <div className="aspect-square rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden">
                <Image
                  src="/professional-male-tech-leader-headshot.jpg"
                  alt="Team member"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  width={300}
                  height={300}
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground">
                  Emmanuel Martinez
                </h3>
                <p className="text-sm text-primary font-medium">
                  Co-Founder & CEO
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  15+ years building scalable systems. Software Architecht and
                  XP methodology expert. Mentored 50+ startup engineering teams.
                </p>
              </div>
            </Card>

            <Card className="p-6 space-y-4 bg-background border-border hover:border-primary/50 transition-all group">
              <div className="aspect-square rounded-xl bg-gradient-to-br from-accent/20 to-primary/20 overflow-hidden">
                <Image
                  src="/professional-female-product-manager.png"
                  alt="Team member"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  width={300}
                  height={300}
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground">
                  Marina Martin Hernandez
                </h3>
                <p className="text-sm text-primary font-medium">
                  Co-Founder & CTO
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Software and Telecom Engineer, Backend specialist. Led
                  engineering teams in Startups Ecosystems for over 5 years.
                </p>
              </div>
            </Card>

            <Card className="p-6 space-y-4 bg-background border-border hover:border-primary/50 transition-all group">
              <div className="aspect-square rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden">
                <Image
                  src="/professional-male-software-architect-headshot.jpg"
                  alt="Team member"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  width={300}
                  height={300}
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground">
                  Iñigo Rodriguez Sanz
                </h3>
                <p className="text-sm text-primary font-medium">
                  Co-Founder & COO
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Software and Telecom Engineer. Specializes in AI/ML and
                  Agentic architectures. Built Data Based systems in highly
                  growth Startups Environment.
                </p>
              </div>
            </Card>
          </div>

          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-border text-secondary-foreground px-6 py-3">
              <Users className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">
                Plus a team of 15+ senior engineers and XP coaches ready to
                support your journey
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        id="contact"
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
              Ready to accelerate your technical journey?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              {`Whether you're an accelerator looking for a technical partner or a startup seeking expert guidance, let's
              talk about how Collybrix can help.`}
            </p>
          </div>

          <Card className="p-8 md:p-12 bg-card border-border shadow-lg rounded-2xl">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-foreground"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-foreground"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="company"
                    className="text-sm font-medium text-foreground"
                  >
                    Company/Organization *
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="Your Company Name"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="type"
                    className="text-sm font-medium text-foreground"
                  >
                    I am a... *
                  </label>
                  <select
                    id="type"
                    name="type"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  >
                    <option value="">Select an option</option>
                    <option value="accelerator">Accelerator/Incubator</option>
                    <option value="startup">Startup Founder</option>
                    <option value="investor">Investor</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="stage"
                  className="text-sm font-medium text-foreground"
                >
                  Current Stage
                </label>
                <select
                  id="stage"
                  name="stage"
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                >
                  <option value="">Select stage (optional)</option>
                  <option value="idea">Idea Stage</option>
                  <option value="mvp">Building MVP</option>
                  <option value="launched">MVP Launched</option>
                  <option value="scaling">Scaling (v1.0+)</option>
                  <option value="established">Established Program</option>
                </select>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-foreground"
                >
                  Tell us about your needs *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                  placeholder="Tell us about your technical challenges, goals, or how you'd like to partner with Collybrix..."
                />
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="newsletter"
                  name="newsletter"
                  className="mt-1 h-4 w-4 rounded border-border bg-background text-primary focus:ring-2 focus:ring-primary focus:ring-offset-0"
                />
                <label
                  htmlFor="newsletter"
                  className="text-sm text-muted-foreground leading-relaxed"
                >
                  {`I'd like to receive updates about Collybrix services, case studies, and technical insights. You can
                  unsubscribe at any time.`}
                </label>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  type="submit"
                  size="lg"
                  className="text-base text-primary-foreground bg-primary hover:bg-secondary/50 border-none"
                >
                  Send Message
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Link href="https://calendar.app.google/mnJRSUAvU7nECYDK7">
                  <Button
                    type="button"
                    size="lg"
                    variant="outline"
                    className="text-base bg-transparent border-primary hover:bg-primary/10"
                  >
                    Schedule a Demo Call
                  </Button>
                </Link>
              </div>

              <p className="text-xs text-muted-foreground text-center">
                {`By submitting this form, you agree to our privacy policy. We'll respond within 24 hours.`}
              </p>
            </form>
          </Card>

          {/* <div className="mt-12 grid md:grid-cols-3 gap-6 text-center">
            <div className="space-y-2">
              <div className="text-sm font-medium text-foreground">
                Email Us
              </div>
              <a
                href="mailto:hello@collybrix.com"
                className="text-sm text-primary hover:underline"
              >
                hello@collybrix.com
              </a>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium text-foreground">
                Location
              </div>
              <div className="text-sm text-muted-foreground">Madrid, Spain</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium text-foreground">
                Response Time
              </div>
              <div className="text-sm text-muted-foreground">
                Within 24 hours
              </div>
            </div>
          </div> */}
        </div>
      </section>
    </>
  );
}
