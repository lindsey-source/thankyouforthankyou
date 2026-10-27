import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, ArrowRight, Upload, PenLine, Send, Palette, Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { DESIGN_SETS } from "@/pages/CreateCardStep2";

/* ---------- Hero rotating-card content ----------
   Each entry reuses the FIRST design from its occasion in DESIGN_SETS
   (so colors/header style stay on-brand) and overrides only the
   per-card copy that the hero shows. */
const HERO_CARDS = [
  {
    occasion: "wedding" as const,
    headline: "With Love & Gratitude",
    greeting: "Dear Emma & James,",
    body:
      "Thank you for celebrating our wedding with us — your presence made our day unforgettable.",
    charity: "💚 $4 donated to Rainforest Alliance",
  },
  {
    occasion: "baby" as const,
    headline: "Little One",
    greeting: "Dear Aunt Rachel,",
    body:
      "Your beautiful gift for baby Lily means so much to us. Thank you for your love and generosity.",
    charity: "💚 $3 donated to UNICEF",
  },
  {
    occasion: "graduation" as const,
    headline: "With Gratitude",
    greeting: "Dear Professor Kim,",
    body:
      "Thank you for guiding me through these years. Your belief in me made all the difference.",
    charity: "💚 $4 donated to Scholarship America",
  },
  {
    occasion: "general" as const,
    headline: "Thank You",
    greeting: "Dear Friend,",
    body:
      "Your kindness and generosity have meant the world to us. We are so grateful for you.",
    charity: "💚 $3 donated to Feeding America",
  },
];

const LandingPage = () => {
  const { isLoaded, isSignedIn } = useAuth();

  // Rotate the hero demo card through 4 occasions every 4s.
  const [heroIndex, setHeroIndex] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => {
      setHeroIndex((i) => (i + 1) % HERO_CARDS.length);
    }, 4000);
    return () => window.clearInterval(id);
  }, []);
  const heroCard = HERO_CARDS[heroIndex];
  const heroDesign = DESIGN_SETS[heroCard.occasion]?.[0] ?? DESIGN_SETS.general[0];

  return (
    <div className="homepage min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-background/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <img src="/logo.png" alt="Thank You for Thank You" style={{ height: '72px', mixBlendMode: 'multiply' }} className="w-auto" />
            </div>
            <div className="flex items-center gap-4">
              {isLoaded && isSignedIn ? (
                <Link to="/dashboard">
                  <Button variant="hero" size="lg">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="ghost">Sign In</Button>
                  </Link>
                  <Link to="/signup">
                    <Button variant="hero" size="lg">
                      Start for Free
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="homepage-hero bg-background">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-20 md:gap-16 lg:gap-24">
            {/* Left: Headline + CTAs */}
            <div className="text-center md:text-left" style={{ color: "#2d2420" }}>
              <h1 className="text-4xl sm:text-5xl xl:text-6xl mb-8 leading-[1.25]" style={{ color: "#2d2420" }}>
                Thank Differently.
                <br />
                <span className="text-primary">Give Meaningfully.</span>
              </h1>
              <p className="text-sm md:text-base mb-10 leading-loose max-w-md mx-auto md:mx-0" style={{ color: "#2d2420", opacity: 0.75 }}>
                Every thank-you you send plants a seed of generosity. Your heartfelt note arrives
                alongside a real donation to a cause that matters — making your gratitude twice as meaningful.
              </p>
              <div className="flex flex-col items-center md:items-start gap-3">
                <Link to="/signup">
                  <Button variant="hero" size="default">
                    Start sending thank-yous
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <a
                  href="#how-it-works"
                  className="text-sm underline-offset-4 hover:underline"
                  style={{ color: "#2d2420", opacity: 0.7 }}
                >
                  See how it works
                </a>
              </div>
              <p className="mt-3 text-sm text-stone-500 text-center md:text-left">
                Free to start · No credit card required
              </p>

            </div>

            {/* Right: Product mockup card */}
            <div className="relative flex items-center justify-center min-h-[450px] md:min-h-[480px]">
              {/* Back card (peeking, rotated +3deg) */}
              <div
                className="absolute w-[280px] sm:w-[300px] aspect-[3/4] rounded-xl shadow-soft border border-border"
                style={{
                  transform: "rotate(3deg) translate(28px, 16px)",
                  backgroundColor: "hsl(var(--muted))",
                }}
                aria-hidden="true"
              />

              {/* Front card (rotated -3deg) — rotates through 4 occasions */}
              <div
                className="relative w-[280px] sm:w-[300px] aspect-[3/4] rounded-xl border border-border overflow-hidden shadow-soft"
                style={{
                  transform: "rotate(-3deg)",
                  backgroundColor: heroDesign.bg,
                }}
                role="img"
                aria-label={`Example ${heroCard.occasion} thank-you e-card preview`}
              >
                {/* Crossfading content keyed on occasion */}
                <div
                  key={heroCard.occasion}
                  className="absolute inset-0 animate-fade-in"
                >
                  {/* Header band — uses the design's headerBg + ink */}
                  <div
                    className="relative flex flex-col items-center justify-center"
                    style={{
                      height: "180px",
                      background: heroDesign.headerBg,
                    }}
                  >
                    <span
                      className="text-center px-4"
                      style={{
                        fontFamily:
                          heroDesign.fontChoice === "dancing"
                            ? "'Dancing Script', cursive"
                            : heroDesign.fontChoice === "inter"
                            ? "'Inter', system-ui, sans-serif"
                            : "'Playfair Display', Georgia, serif",
                        fontSize: heroDesign.fontChoice === "dancing" ? "40px" : "30px",
                        color: heroDesign.ink,
                        letterSpacing: "0.04em",
                        lineHeight: 1.1,
                      }}
                    >
                      {heroCard.headline}
                    </span>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        marginTop: "14px",
                        opacity: 0.6,
                      }}
                      aria-hidden="true"
                    >
                      <div style={{ width: "30px", height: "1px", backgroundColor: heroDesign.accent }} />
                      <div
                        style={{
                          width: "4px",
                          height: "4px",
                          backgroundColor: heroDesign.accent,
                          transform: "rotate(45deg)",
                        }}
                      />
                      <div style={{ width: "30px", height: "1px", backgroundColor: heroDesign.accent }} />
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-5 flex flex-col h-[58%]">
                    <p
                      className="text-xl mb-2"
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        color: heroDesign.ink,
                      }}
                    >
                      {heroCard.greeting}
                    </p>
                    <p
                      className="text-sm leading-relaxed flex-1"
                      style={{ color: heroDesign.inkSoft, opacity: 0.85 }}
                    >
                      {heroCard.body}
                    </p>

                    {/* Donation badge */}
                    <div className="mt-3">
                      <div
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                        style={{
                          backgroundColor: heroDesign.donationBg,
                          color: heroDesign.donationColor,
                        }}
                      >
                        {heroCard.charity}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Gift tracker callout */}
      <section className="bg-muted/30">
        <div className="max-w-3xl mx-auto px-6 sm:px-10 text-center">
          <h2 className="text-3xl md:text-4xl mb-8 text-foreground">
            Having an Event? Plan ahead.
          </h2>
          <p className="text-sm md:text-base leading-loose text-muted-foreground max-w-md mx-auto mb-10">
            Download the gift tracker before your big day — fill it in as you open gifts, then upload when you're ready to send thank-yous.
          </p>
          <Link to="/gift-tracker">
            <Button variant="hero" size="lg">
              Download the template
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Social-proof stats strip */}
      <section className="homepage-stats bg-brand-dark text-brand-cream">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-10 sm:gap-16 text-center">
            <div className="flex items-center gap-2 text-brand-cream text-base md:text-lg font-medium">
              <span aria-hidden="true">✉️</span>
              <span>
                <span className="font-bold">12,847</span> cards sent
              </span>
            </div>
            <span className="hidden sm:inline text-brand-cream/30" aria-hidden="true">·</span>
            <div className="flex items-center gap-2 text-brand-cream text-base md:text-lg font-medium">
              <span aria-hidden="true">💚</span>
              <span>
                <span className="font-bold">$38,541</span> donated
              </span>
            </div>
            <span className="hidden sm:inline text-brand-cream/30" aria-hidden="true">·</span>
            <div className="flex items-center gap-2 text-brand-cream text-base md:text-lg font-medium">
              <span aria-hidden="true">⭐</span>
              <span>
                <span className="font-bold">4.9/5</span> from 340 families
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works — 4-step workflow */}
      <section id="how-it-works" className="bg-background scroll-mt-20">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">
          <div className="text-center mb-20">
            <h2 className="text-5xl mb-4" style={{ color: "#2d2420" }}>How It Works</h2>
            <p className="text-sm md:text-base leading-loose max-w-md mx-auto" style={{ color: "#2d2420", opacity: 0.7 }}>
              From your guest list to a real-world donation in four simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 lg:gap-16 max-w-4xl mx-auto">
            {[
              {
                icon: Upload,
                title: "Upload Your Guest List",
                description: "Drop in a CSV with names and emails. We'll handle the rest.",
              },
              {
                icon: PenLine,
                title: "Write Your Message",
                description: "Compose a heartfelt thank-you and pick a card design you love.",
              },
              {
                icon: Send,
                title: "We Send the Cards",
                description: "Personalized e-cards delivered to every guest in your list.",
              },
              {
                icon: Heart,
                title: "Costs Become Donations",
                description: "What you saved on paper and postage goes directly to charity.",
              },
            ].map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative">
                  <div
                    className="h-full rounded-lg p-8 sm:p-10 border border-border bg-card shadow-soft"
                  >
                    <div className="relative w-14 h-14 mb-5">
                      <div
                        className="h-14 w-14 rounded-2xl flex items-center justify-center text-primary"
                        style={{ backgroundColor: "rgba(193, 123, 138, 0.14)" }}
                      >
                        <Icon className="h-6 w-6" strokeWidth={1.75} />
                      </div>
                      <div className="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center border border-border shadow-soft">
                        {index + 1}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold mb-2" style={{ color: "#2d2420" }}>
                      {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "#2d2420", opacity: 0.7 }}>
                      {step.description}
                    </p>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section>
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">
          <div className="text-center mb-20">
            <h2 className="text-5xl text-foreground mb-5">Thoughtful. Effortless. Impactful.</h2>
            <p className="text-sm md:text-base leading-loose text-muted-foreground max-w-md mx-auto">
              Perfect for weddings, celebrations, and life's meaningful moments that deserve appreciation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10 lg:gap-16">
            {[
              {
                title: "Perfect for Life's Moments",
                description: "Ideal for weddings, baby showers, birthdays, bar/bat mitzvahs, and any celebration worth remembering.",
                Icon: Heart,
              },
              {
                title: "Artist-Designed Cards",
                description: "Choose from elegant designs created by talented artists, many partnered with the charities you support.",
                Icon: Palette,
              },
              {
                title: "Redirect Savings to Good",
                description: "Skip paper, printing, envelopes, and postage. Redirect those savings into meaningful charitable donations.",
                Icon: Leaf,
              },
            ].map((feature, index) => {
              const FeatureIcon = feature.Icon;
              return (
                <Card
                  key={index}
                  className="bg-card border-border rounded-lg shadow-soft"
                >
                  <CardContent className="p-8 lg:p-10">
                    <div
                      className="mb-5 inline-flex items-center justify-center rounded-md transition-colors duration-300"
                      style={{
                        width: "44px",
                        height: "44px",
                        backgroundColor: "#f5ede9",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e8c4b8")}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#f5ede9")}
                    >
                      <FeatureIcon size={20} color="#c17b8a" strokeWidth={1.75} />
                    </div>
                    <h3
                      className="text-xl mb-3"
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontWeight: 500,
                        color: "#2d2420",
                      }}
                    >
                      {feature.title}
                    </h3>
                    <p className="text-sm leading-loose text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Card Design Gallery */}
      <section id="card-gallery" className="bg-muted/30 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">
          <div className="text-center mb-20">
            <h2
              className="text-4xl mb-4"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 500,
                color: "#2d2420",
              }}
            >
              Beautiful Cards, Meaningful Impact
            </h2>
            <p className="text-sm md:text-base leading-loose text-muted-foreground max-w-md mx-auto">
              Every design crafted to feel personal. Every send creates a donation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-20 max-w-4xl mx-auto">
            {/* Card 1 — Wedding (Pink Rose Branch) */}
            <div
              className="group rounded-lg overflow-hidden bg-card border border-border shadow-soft"
            >
              <div
                className="relative flex items-center justify-center"
                style={{
                  height: "180px",
                  background:
                    "linear-gradient(180deg, #fdf6f3 0%, #f9d9d2 100%)",
                }}
              >
                <svg
                  viewBox="0 0 200 120"
                  className="absolute inset-0 w-full h-full opacity-90"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M30 100 C 60 80, 90 70, 170 30" stroke="#a87a6a" strokeWidth="0.9" />
                  <path d="M70 78 C 64 72, 64 66, 70 64 C 74 68, 74 74, 70 78 Z" fill="#a8b89a" opacity="0.8" />
                  <path d="M105 60 C 99 54, 99 48, 105 46 C 109 50, 109 56, 105 60 Z" fill="#a8b89a" opacity="0.8" />
                  <path d="M140 44 C 134 38, 134 32, 140 30 C 144 34, 144 40, 140 44 Z" fill="#a8b89a" opacity="0.8" />
                  <g transform="translate(60 70)">
                    <circle cx="0" cy="0" r="6" fill="#c17b8a" opacity="0.85" />
                    <circle cx="0" cy="0" r="3.5" fill="#b06070" opacity="0.9" />
                    <circle cx="0" cy="0" r="1.5" fill="#8b4a5a" />
                  </g>
                  <g transform="translate(100 50)">
                    <circle cx="0" cy="0" r="7" fill="#c17b8a" opacity="0.85" />
                    <circle cx="0" cy="0" r="4" fill="#b06070" opacity="0.9" />
                    <circle cx="0" cy="0" r="1.5" fill="#8b4a5a" />
                  </g>
                  <g transform="translate(150 32)">
                    <circle cx="0" cy="0" r="6" fill="#c17b8a" opacity="0.85" />
                    <circle cx="0" cy="0" r="3.5" fill="#b06070" opacity="0.9" />
                    <circle cx="0" cy="0" r="1.5" fill="#8b4a5a" />
                  </g>
                </svg>
                <span
                  className="relative z-10 text-center px-4"
                  style={{
                    fontFamily: "'Dancing Script', cursive",
                    fontSize: "38px",
                    color: "#b06070",
                    letterSpacing: "0.03em",
                    lineHeight: 1.1,
                  }}
                >
                  With Love & Gratitude
                </span>
              </div>
              <div className="p-8 sm:p-10">
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span
                    className="inline-block px-3 py-1 rounded-full text-xs"
                    style={{ backgroundColor: "#f5ede9", color: "#8b4a5a" }}
                  >
                    Perfect for Weddings
                  </span>
                  <span
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs"
                    style={{ backgroundColor: "#eef2e8", color: "#3d5a3a" }}
                  >
                    💚 $4 donated to Rainforest Alliance
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    color: "#2d2420",
                    fontSize: "16px",
                  }}
                >
                  Dear Emma & James,
                </p>
                <p
                  className="mt-1 text-sm leading-relaxed line-clamp-1"
                  style={{ color: "#2d2420", opacity: 0.7 }}
                >
                  Your wedding was the most beautiful day…
                </p>

              </div>
            </div>

            {/* Card 3 — Baby Showers (Sage + Wildflowers) */}
            <div
              className="group rounded-lg overflow-hidden bg-card border border-border shadow-soft"
            >
              <div
                className="relative flex items-center justify-center"
                style={{
                  height: "180px",
                  background:
                    "linear-gradient(180deg, #eef2e8 0%, #c5d4bc 100%)",
                }}
              >
                <svg
                  viewBox="0 0 200 120"
                  className="absolute inset-0 w-full h-full opacity-80"
                  fill="none"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M28 110 C 30 90, 32 70, 30 48" stroke="#5e7a5a" strokeWidth="0.8" />
                  <path d="M30 70 C 24 66, 22 60, 26 56 C 30 60, 32 66, 30 70 Z" fill="#5e7a5a" opacity="0.7" />
                  <path d="M30 56 C 36 52, 38 46, 34 42 C 30 46, 30 52, 30 56 Z" fill="#5e7a5a" opacity="0.7" />
                  <circle cx="30" cy="44" r="2" fill="#c17b8a" opacity="0.7" />
                  <circle cx="33" cy="40" r="1.6" fill="#c17b8a" opacity="0.7" />
                  <circle cx="27" cy="40" r="1.6" fill="#c17b8a" opacity="0.7" />

                  <path d="M172 110 C 170 90, 168 70, 170 48" stroke="#5e7a5a" strokeWidth="0.8" />
                  <path d="M170 70 C 176 66, 178 60, 174 56 C 170 60, 168 66, 170 70 Z" fill="#5e7a5a" opacity="0.7" />
                  <path d="M170 56 C 164 52, 162 46, 166 42 C 170 46, 170 52, 170 56 Z" fill="#5e7a5a" opacity="0.7" />
                  <circle cx="170" cy="44" r="2" fill="#fbeaa0" opacity="0.85" />
                  <circle cx="173" cy="40" r="1.6" fill="#fbeaa0" opacity="0.85" />
                  <circle cx="167" cy="40" r="1.6" fill="#fbeaa0" opacity="0.85" />
                </svg>
                <span
                  className="relative z-10 text-center px-4"
                  style={{
                    fontFamily: "'Dancing Script', cursive",
                    fontSize: "40px",
                    color: "#3d5a3a",
                    letterSpacing: "0.03em",
                    lineHeight: 1.1,
                  }}
                >
                  Welcome, Little One
                </span>
              </div>
              <div className="p-8 sm:p-10">
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span
                    className="inline-block px-3 py-1 rounded-full text-xs"
                    style={{ backgroundColor: "#eef2e8", color: "#3d5a3a" }}
                  >
                    Baby Showers & Birthdays
                  </span>
                  <span
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs"
                    style={{ backgroundColor: "#eef2e8", color: "#3d5a3a" }}
                  >
                    💚 $3 donated to UNICEF
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    color: "#2d2420",
                    fontSize: "16px",
                  }}
                >
                  Dear Sarah,
                </p>
                <p
                  className="mt-1 text-sm leading-relaxed line-clamp-1"
                  style={{ color: "#2d2420", opacity: 0.7 }}
                >
                  We're so thrilled to celebrate baby Lily…
                </p>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* One quiet, editorial testimonial */}
      <section>
        <div className="max-w-3xl mx-auto px-6 sm:px-10 text-center">
          <h2 className="text-4xl md:text-5xl text-foreground mb-16">Loved by Hosts Everywhere</h2>
          <blockquote className="max-w-xl mx-auto">
            <p className="text-base leading-loose text-muted-foreground mb-10 italic">
              "After our wedding, I had 200+ thank-you notes to send. This platform saved me weeks of work and donated $1,000 to our favorite charity. Our guests loved the personal touch!"
            </p>
            <cite className="text-sm not-italic text-foreground">— Sarah &amp; Mike, Newlyweds</cite>
          </blockquote>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brand-sage-soft text-brand-dark">
        <div className="max-w-3xl mx-auto text-center px-6 sm:px-10">
          <h2 className="text-4xl md:text-5xl mb-8">Start Your Gratitude Campaign</h2>
          <p className="text-sm md:text-base leading-loose mb-10 text-muted-foreground max-w-md mx-auto">
            Transform your thank-you process into something beautiful, meaningful, and impactful.
            Your first 3 cards are on us.
          </p>
          <Link to="/signup">
            <Button variant="hero" size="xl">
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background py-20">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Heart className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">Thank You for Thank You</span>
            </div>
            <p className="text-muted-foreground mb-6">
              Making every "thank you" a force for good
            </p>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-5 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">About Us</a>
              <a href="#" className="hover:text-primary transition-colors">Contact</a>
              <Link to="/help" className="hover:text-primary transition-colors">Help</Link>
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
