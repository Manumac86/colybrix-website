import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Navigation() {
  return (
    <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="font-mono text-lg font-bold text-primary-foreground">
                C
              </span>
            </div>
            <span className="text-xl font-bold text-foreground">Collybrix</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/#services"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Services
            </Link>
            <Link
              href="/#how-it-works"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="/#partners"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Partners
            </Link>
            <Link
              href="/#team"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Team
            </Link>
            <Link
              href="/about"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
            <Link
              href="/#contact"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </Link>
          </div>
          <Button
            size="sm"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
}
