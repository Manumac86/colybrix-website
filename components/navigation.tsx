"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navigationLinks = [
  { href: "/#our-approach", label: "Our Approach" },
  { href: "/#services", label: "Services" },
  { href: "/#partners", label: "Partners" },
  { href: "/#team", label: "Team", testId: "team-link" },
  { href: "/about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                data-testid={link.testId}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {/* Mobile Menu Button */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  aria-label="Open navigation menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>
                    <Logo />
                  </SheetTitle>
                </SheetHeader>
                <nav
                  className="flex flex-col gap-4 mt-8"
                  aria-label="Mobile navigation"
                >
                  {navigationLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      data-testid={link.testId}
                      onClick={() => setOpen(false)}
                      className="text-lg text-muted-foreground hover:text-foreground transition-colors py-2 px-2 rounded-md hover:bg-accent"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>

            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
