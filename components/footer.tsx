import { MapPin } from "lucide-react";
import { Logo } from "./logo";

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Logo />
            </div>
            <p className="text-sm text-muted-foreground">
              Technical partner for startup accelerators. AI-powered
              development, XP mentorship, solid foundations.
            </p>
            <div className="inline-flex items-center gap-2 rounded-full border border-border text-secondary-foreground px-4 py-1.5">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">
                Based in Madrid, Spain
              </span>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-card-foreground mb-4">
              Services
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="/#services"
                  className="hover:text-foreground transition-colors"
                >
                  PRD Generation
                </a>
              </li>
              <li>
                <a
                  href="/#services"
                  data-testid="team-building-link"
                  className="hover:text-foreground transition-colors"
                >
                  Team Building
                </a>
              </li>
              <li>
                <a
                  href="/#services"
                  className="hover:text-foreground transition-colors"
                >
                  XP Mentorship
                </a>
              </li>
              <li>
                <a
                  href="/#services"
                  className="hover:text-foreground transition-colors"
                >
                  AI Development
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-card-foreground mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="/#"
                  className="hover:text-foreground transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/#partners"
                  className="hover:text-foreground transition-colors"
                >
                  Partners
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Case Studies
                </a>
              </li>
              <li>
                <a
                  href="/#contact"
                  className="hover:text-foreground transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-card-foreground mb-4">Connect</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="mailto:emartinez@collybrix.com"
                  className="hover:text-foreground transition-colors"
                >
                  Email Us
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/collybrix"
                  className="hover:text-foreground transition-colors"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© 2025 Collybrix. All rights reserved. Based in Madrid, Spain.</p>
        </div>
      </div>
    </footer>
  );
};
