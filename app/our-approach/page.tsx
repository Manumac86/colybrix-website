import Image from "next/image";

export default function OurApproachPage() {
  return (
    <section
      id="how-it-works"
      className="our-approach container mx-auto px-4 sm:px-6 lg:px-8"
    >
      {/* <!-- Section 1: Problem/Context --> */}
      <section className="py-16 md:py-20 relative overflow-hidden backdrop-blur-sm ">
        {/* Hero content overlay */}
        <div className="relative z-0 ">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl md:text-4xl lg:text-6xl font-bold leading-tight text-balance bg-linear-(--gradient-collybrix) bg-clip-text text-transparent">
                90% of startups fail. 70% from preventable technical mistakes.
              </h1>
              <h2 className="text-2xl md:text-3xl font-bold leading-tight text-balance">
                Your brilliant idea won't matter if your tech foundation
                crumbles.
              </h2>
              <p className="text-lg md:text-xl text-card-foreground dark:text-muted-foreground leading-relaxed text-pretty max-w-2xl">
                You've got{" "}
                <strong className="text-secondary">18 months of runway</strong>.
                Your MVP is held together with duct tape. Your team is
                firefighting{" "}
                <strong className="text-secondary">instead of building</strong>.
                Sound familiar? You're not alone—
                <strong>58% of startup CTOs</strong> report{" "}
                <strong>
                  <span className="text-primary">critical technical debt </span>
                </strong>{" "}
                within Year 1.
              </p>
              <p className="text-lg md:text-xl text-card-foreground dark:text-muted-foreground leading-relaxed text-pretty max-w-2xl">
                The real killer?{" "}
                <strong className="text-primary">
                  Rebuilding your MVP costs €45,000
                </strong>{" "}
                and <strong className="text-primary">3x more time</strong>.
              </p>
              <div className="">
                <p className="text-lg md:text-xl text-card-foreground dark:text-muted-foreground leading-relaxed text-pretty mt-4">
                  Technical debt isn't just code—it's your startup's death by a
                  thousand cuts. We've mentored 10+ teams through this exact
                  crisis. <br />
                  The solution isn't choosing between speed or quality—it's
                  having{" "}
                  <strong className="text-primary">
                    the right methodology and tools
                  </strong>{" "}
                  to achieve both. <br />
                  Build fast <strong className="text-secondary">
                    AND
                  </strong>{" "}
                  build right. It's possible, and we'll show you how.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 via-accent/20 to-primary/10 backdrop-blur-3xl border border-border p-8">
                <div className="h-full w-full flex items-center justify-center">
                  <Image
                    src="/getimg_ai_img-zndRMiRRkUMW1hQ23yg6P.jpeg"
                    alt="Collybrix AI-powered development"
                    className="rounded-xl object-cover w-full h-full"
                    width={884}
                    height={300}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 border-border bg-white/70 dark:bg-black/70  relative backdrop-blur-sm shadow-lg dark:shadow-secondary/10 rounded-2xl my-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-secondary">
            <div className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-bold">90%</div>
              <div className="text-sm">Startup Failure Rate</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-bold">70%</div>
              <div className="text-sm">
                Fail from Technical Execution Problems
              </div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-bold">3x</div>
              <div className="text-sm">Time to Market</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-bold">25%</div>
              <div className="text-sm">CTO Time Wasted on Technical Debt</div>
            </div>
          </div>
        </div>
      </section>

      <section className="md:py-20 relative overflow-hidden backdrop-blur-sm">
        <div className="py-12 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold leading-tight text-balance bg-linear-(--gradient-collybrix) bg-clip-text text-transparent">
              Without Collybrix
            </h2>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold leading-tight text-balance bg-linear-(--gradient-collybrix) bg-clip-text text-transparent">
              With Collybrix
            </h2>
          </div>
          <Image
            src="/getimg_ai_img-r8ieFMzgpfdpUdpf4mpbG.png"
            alt="Collybrix AI-powered development"
            className="rounded-xl object-cover w-full h-full"
            width={884}
            height={300}
          />
        </div>
      </section>

      {/* Section 2: Methodology */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-20 relative overflow-hidden backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-5xl md:text-4xl lg:text-6xl font-bold leading-tight text-balance bg-linear-(--gradient-collybrix) bg-clip-text text-transparent">
            30 battle-tested methodologies. One perfect fit for your team.
          </h2>
          <p className="text-2xl md:text-3xl font-bold leading-tight text-balance">
            From "Micro Tomato" for juniors to "Rocket Sprint" for seniors.
          </p>

          <div className="methodology-selector">[Interactive component]</div>

          <div className="results-grid">[Key metrics]</div>

          <button className="cta-primary">
            Match your team's methodology →
          </button>
        </div>
      </section>

      {/* Section 3: Platform */}
      <div className="platform-section">
        <div className="container">
          <h2>7 AI agents that code like seniors, think like CTOs.</h2>
          <p className="subheadline">
            10x development speed. Zero compromise on quality.
          </p>

          <div className="agents-visualization">[Animated AI workflow]</div>

          <div className="platform-metrics">[Key statistics]</div>

          <button className="cta-primary">Request your demo →</button>
        </div>
      </div>
    </section>
  );
}
