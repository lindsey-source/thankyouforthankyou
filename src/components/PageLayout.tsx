import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

interface PageLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

/**
 * Shared layout for simple content pages (About, Privacy, Terms, Contact).
 * Warm cream background, serif headline, generous spacing — matches the
 * homepage's calm editorial feel.
 */
const PageLayout: React.FC<PageLayoutProps> = ({ title, subtitle, children }) => (
  <div className="min-h-screen bg-background flex flex-col">
    {/* Navigation */}
    <nav className="border-b border-border/60">
      <div className="max-w-3xl mx-auto px-6 sm:px-10">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-primary" strokeWidth={1.5} />
            <span className="text-lg font-semibold text-foreground">Thank You for Thank You</span>
          </Link>
          <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Back to home
          </Link>
        </div>
      </div>
    </nav>

    {/* Content */}
    <main className="flex-1 py-16 sm:py-24">
      <div className="max-w-3xl mx-auto px-6 sm:px-10">
        <h1 className="text-4xl sm:text-5xl text-foreground mb-4">{title}</h1>
        {subtitle && <p className="text-lg text-muted-foreground mb-12">{subtitle}</p>}
        {!subtitle && <div className="mb-12" />}
        <div className="space-y-10 text-foreground/90 leading-relaxed">{children}</div>
      </div>
    </main>

    {/* Footer */}
    <footer className="bg-background border-t border-border/60 py-12">
      <div className="max-w-3xl mx-auto px-6 sm:px-10 text-center">
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-muted-foreground">
          <Link to="/about" className="hover:text-primary transition-colors">About</Link>
          <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
          <Link to="/help" className="hover:text-primary transition-colors">Help</Link>
          <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  </div>
);

export default PageLayout;
