import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "@/components/ui/sonner";
import { Suspense } from "react";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Collybrix - Madrid Technical Accelerator",
  description:
    "Join Madrid's premier technical accelerator for early-stage startups. Get mentorship, resources, and network to build, scale, and succeed.",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          {/* Navigation */}
          <Suspense fallback={null}>
            <div className="min-h-screen bg-background">
              <Navigation />
              {children}
              <Footer />
            </div>
          </Suspense>

          {/* Footer */}
          <Analytics />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
