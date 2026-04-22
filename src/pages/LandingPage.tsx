import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, ArrowRight, CheckCircle, Upload, PenLine, Send, Sparkles, Users, Gift, TrendingUp, Palette, Leaf, BarChart2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { DESIGN_SETS } from "@/pages/CreateCardStep2";
import cardBlushBotanical from "@/assets/card-blush-botanical.jpg";
import cardSageAbstract from "@/assets/card-sage-abstract.jpg";
import cardWildflowerInk from "@/assets/card-wildflower-ink.jpg";

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
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-background/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
      <section className="py-8 md:py-10" style={{ backgroundColor: "#faf7f2" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-12">
            {/* Left: Headline + CTAs */}
            <div className="text-center md:text-left" style={{ color: "#2d2420" }}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/15 text-secondary text-xs font-medium mb-3">
                <Sparkles className="h-3.5 w-3.5" />
                Gratitude that gives back
              </div>
              <h1 className="text-3xl sm:text-4xl xl:text-5xl font-bold mb-3 leading-[1.05] tracking-tight" style={{ color: "#2d2420" }}>
                Thank Differently.
                <br />
                <span className="text-primary">Give Meaningfully.</span>
              </h1>
              <p className="text-sm md:text-base mb-5 leading-relaxed max-w-xl md:max-w-none mx-auto" style={{ color: "#2d2420", opacity: 0.75 }}>
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
              <div className="mt-3 text-center md:text-left">
                <Link
                  to="/gift-tracker"
                  className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors underline-offset-4 hover:underline"
                >
                  Planning ahead? Download the gift tracker template
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Right: Product mockup card */}
            <div className="relative flex items-center justify-center min-h-[340px] md:min-h-[380px]">
              {/* Back card (peeking, rotated +3deg) */}
              <div
                className="absolute w-[280px] sm:w-[300px] aspect-[3/4] rounded-2xl shadow-soft border"
                style={{
                  transform: "rotate(3deg) translate(28px, 16px)",
                  backgroundColor: "#f5ede9",
                  borderColor: "rgba(45, 36, 32, 0.06)",
                }}
                aria-hidden="true"
              />

              {/* Front card (rotated -3deg) — rotates through 4 occasions */}
              <div
                className="relative w-[280px] sm:w-[300px] aspect-[3/4] rounded-2xl border overflow-hidden shadow-warm"
                style={{
                  transform: "rotate(-3deg)",
                  borderColor: "rgba(45, 36, 32, 0.08)",
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

              {/* Rotation indicator dots */}
              <div
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1.5"
                aria-hidden="true"
              >
                {HERO_CARDS.map((_, i) => (
                  <span
                    key={i}
                    className="h-1.5 rounded-full transition-all duration-300"
                    style={{
                      width: i === heroIndex ? "16px" : "6px",
                      backgroundColor:
                        i === heroIndex ? "#c17b8a" : "rgba(45, 36, 32, 0.2)",
                    }}
                  />
                ))}
              </div>

              {/* Subtle decorative dots */}
              <div
                className="absolute -top-2 -left-2 h-3 w-3 rounded-full opacity-70"
                style={{ backgroundColor: "#c17b8a" }}
                aria-hidden="true"
              />
              <div
                className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full opacity-70"
                style={{ backgroundColor: "#8faa8b" }}
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Wedding gift tracker callout */}
      <section className="py-12 md:py-16" style={{ backgroundColor: "#faf7f2" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="rounded-3xl border shadow-soft p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10"
            style={{
              backgroundColor: "#fdf6f3",
              borderColor: "rgba(193, 123, 138, 0.2)",
            }}
          >
            <div
              className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: "rgba(193, 123, 138, 0.15)" }}
            >
              <Gift className="h-7 w-7" style={{ color: "#c17b8a" }} />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-bold mb-2 tracking-tight" style={{ color: "#2d2420" }}>
                Getting married? Plan ahead.
              </h2>
              <p className="text-base md:text-lg leading-relaxed" style={{ color: "#2d2420", opacity: 0.75 }}>
                Download the gift tracker before your big day — fill it in as you open gifts, then upload when you're ready to send thank-yous.
              </p>
            </div>
            <Link to="/gift-tracker" className="flex-shrink-0">
              <Button variant="hero" size="lg">
                Download the template
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Social-proof stats strip */}
      <section className="py-8 md:py-10" style={{ backgroundColor: "#2d2420" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10 text-center">
            <div className="flex items-center gap-2 text-white/95 text-base md:text-lg font-medium">
              <span aria-hidden="true">✉️</span>
              <span>
                <span className="font-bold">12,847</span> cards sent
              </span>
            </div>
            <span className="hidden sm:inline text-white/30" aria-hidden="true">·</span>
            <div className="flex items-center gap-2 text-white/95 text-base md:text-lg font-medium">
              <span aria-hidden="true">💚</span>
              <span>
                <span className="font-bold">$38,541</span> donated
              </span>
            </div>
            <span className="hidden sm:inline text-white/30" aria-hidden="true">·</span>
            <div className="flex items-center gap-2 text-white/95 text-base md:text-lg font-medium">
              <span aria-hidden="true">⭐</span>
              <span>
                <span className="font-bold">4.9/5</span> from 340 families
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works — 4-step workflow */}
      <section className="py-20" style={{ backgroundColor: "#f5ede9" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-3" style={{ color: "#2d2420" }}>How It Works</h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "#2d2420", opacity: 0.7 }}>
              From your guest list to a real-world donation in four simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 relative">
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
            ].map((step, index, arr) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative">
                  <div
                    className="h-full rounded-2xl p-6 border transition-all duration-300 hover:shadow-warm hover:-translate-y-1"
                    style={{
                      backgroundColor: "#ffffff",
                      borderColor: "rgba(45, 36, 32, 0.08)",
                    }}
                  >
                    <div className="relative w-14 h-14 mb-5">
                      <div
                        className="h-14 w-14 rounded-2xl flex items-center justify-center text-primary"
                        style={{ backgroundColor: "rgba(193, 123, 138, 0.14)" }}
                      >
                        <Icon className="h-6 w-6" strokeWidth={1.75} />
                      </div>
                      <div className="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shadow-sm">
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
                  {/* Connector arrow between steps (desktop only) */}
                  {index < arr.length - 1 && (
                    <div
                      className="hidden lg:flex absolute top-1/2 -right-2 -translate-y-1/2 z-10 h-7 w-7 rounded-full items-center justify-center"
                      style={{ backgroundColor: "#f5ede9", color: "#8faa8b" }}
                      aria-hidden="true"
                    >
                      <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Thoughtful. Effortless. Impactful.</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Perfect for weddings, celebrations, and life's meaningful moments that deserve appreciation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
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
              {
                title: "Recipient Choice",
                description: "Let recipients choose their favorite charity from your curated list, making the gift even more personal.",
                Icon: Users,
              },
              {
                title: "Time & Impact Tracking",
                description: "See your gratitude's reach with delivery confirmations, charity selections, and cumulative impact reports.",
                Icon: BarChart2,
              },
              {
                title: "Premium Experience",
                description: "No ads, no spam, just beautiful digital-with-soul experiences that recipients will treasure.",
                Icon: Sparkles,
              },
            ].map((feature, index) => {
              const FeatureIcon = feature.Icon;
              return (
                <Card
                  key={index}
                  className="bg-card transition-all duration-300 group"
                  style={{ border: "1px solid #ede8e3" }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#c17b8a")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#ede8e3")}
                >
                  <CardContent className="p-8">
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
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Card Design Gallery */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
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
            <p className="text-xl text-muted-foreground">
              Every design crafted to feel personal. Every send creates a donation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Card 1 — Wedding (Pink Rose Branch) */}
            <div
              className="group rounded-2xl overflow-hidden bg-white transition-all duration-300 hover:-translate-y-1"
              style={{
                border: "1px solid #ede8e3",
                boxShadow: "0 10px 40px -12px rgba(193,123,138,0.15)",
              }}
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
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
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
                <button
                  className="mt-4 w-full py-2 rounded-md text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundColor: "#c17b8a", color: "#fdf6f3" }}
                >
                  Preview Card
                </button>
              </div>
            </div>

            {/* Card 2 — Corporate (Cream + Gold) */}
            <div
              className="group rounded-2xl overflow-hidden bg-white transition-all duration-300 hover:-translate-y-1"
              style={{
                border: "1px solid #ede8e3",
                boxShadow: "0 10px 40px -12px rgba(201,169,110,0.15)",
              }}
            >
              <div
                className="relative flex items-center justify-center"
                style={{ height: "180px", backgroundColor: "#faf6ef" }}
              >
                {/* Corner accents */}
                <div style={{ position: "absolute", top: "16px", left: "16px", width: "20px", height: "20px", borderTop: "1px solid #c9a96e", borderLeft: "1px solid #c9a96e" }} />
                <div style={{ position: "absolute", top: "16px", right: "16px", width: "20px", height: "20px", borderTop: "1px solid #c9a96e", borderRight: "1px solid #c9a96e" }} />
                <div style={{ position: "absolute", bottom: "16px", left: "16px", width: "20px", height: "20px", borderBottom: "1px solid #c9a96e", borderLeft: "1px solid #c9a96e" }} />
                <div style={{ position: "absolute", bottom: "16px", right: "16px", width: "20px", height: "20px", borderBottom: "1px solid #c9a96e", borderRight: "1px solid #c9a96e" }} />
                <div className="flex flex-col items-center">
                  <div style={{ width: "80px", height: "1px", backgroundColor: "#c9a96e", marginBottom: "14px" }} />
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "15px",
                      letterSpacing: "0.28em",
                      color: "#2d2420",
                      fontWeight: 400,
                      textTransform: "uppercase",
                      whiteSpace: "nowrap",
                    }}
                  >
                    A Note of Appreciation
                  </span>
                  <div style={{ width: "80px", height: "1px", backgroundColor: "#c9a96e", marginTop: "14px" }} />
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="inline-block px-3 py-1 rounded-full text-xs"
                    style={{ backgroundColor: "#f5efe2", color: "#8a7340" }}
                  >
                    Corporate & Professional
                  </span>
                  <span
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs"
                    style={{ backgroundColor: "#eef2e8", color: "#3d5a3a" }}
                  >
                    💚 $3 donated to local food bank
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    color: "#2d2420",
                    fontSize: "16px",
                  }}
                >
                  Dear Team,
                </p>
                <p
                  className="mt-1 text-sm leading-relaxed line-clamp-1"
                  style={{ color: "#2d2420", opacity: 0.7 }}
                >
                  Your hard work on Q3 made all the difference…
                </p>
                <button
                  className="mt-4 w-full py-2 rounded-md text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundColor: "#2d2420", color: "#c9a96e" }}
                >
                  Preview Card
                </button>
              </div>
            </div>

            {/* Card 3 — Baby Showers (Sage + Wildflowers) */}
            <div
              className="group rounded-2xl overflow-hidden bg-white transition-all duration-300 hover:-translate-y-1"
              style={{
                border: "1px solid #ede8e3",
                boxShadow: "0 10px 40px -12px rgba(143,170,139,0.18)",
              }}
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
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
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
                <button
                  className="mt-4 w-full py-2 rounded-md text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundColor: "#3d5a3a", color: "#fdf6f3" }}
                >
                  Preview Card
                </button>
              </div>
            </div>

            {/* Card 4 — Galas (Navy + Gold) */}
            <div
              className="group rounded-2xl overflow-hidden bg-white transition-all duration-300 hover:-translate-y-1"
              style={{
                border: "1px solid #ede8e3",
                boxShadow: "0 10px 40px -12px rgba(30,42,58,0.25)",
              }}
            >
              <div
                className="relative flex items-center justify-center"
                style={{ height: "180px", backgroundColor: "#1e2a3a" }}
              >
                <div
                  className="absolute"
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "9999px",
                    border: "1px solid rgba(255,255,255,0.5)",
                    top: "22px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      color: "#ffffff",
                      fontSize: "22px",
                      letterSpacing: "0.05em",
                    }}
                  >
                    TY
                  </span>
                </div>
                <span
                  className="text-center px-4"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: "28px",
                    color: "#c9a96e",
                    fontStyle: "italic",
                    fontWeight: 500,
                    marginTop: "70px",
                    letterSpacing: "0.02em",
                    lineHeight: 1.15,
                  }}
                >
                  L'Chaim & Thank You
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="inline-block px-3 py-1 rounded-full text-xs"
                    style={{ backgroundColor: "#1e2a3a", color: "#c9a96e" }}
                  >
                    Bar/Bat Mitzvahs & Galas
                  </span>
                  <span
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs"
                    style={{ backgroundColor: "#eef2e8", color: "#3d5a3a" }}
                  >
                    💚 $5 donated to Jewish Federation
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    color: "#2d2420",
                    fontSize: "16px",
                  }}
                >
                  Dear David,
                </p>
                <p
                  className="mt-1 text-sm leading-relaxed line-clamp-1"
                  style={{ color: "#2d2420", opacity: 0.7 }}
                >
                  Your presence at Noah's Bar Mitzvah meant everything…
                </p>
                <button
                  className="mt-4 w-full py-2 rounded-md text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundColor: "#c9a96e", color: "#1e2a3a" }}
                >
                  Preview Card
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-16" style={{ backgroundColor: '#f5ede9' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Loved by Hosts Everywhere</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-muted/20 border-none">
              <CardContent className="p-8">
                <div className="w-14 h-14 rounded-full flex items-center justify-center text-white font-semibold text-lg mb-4" style={{ backgroundColor: '#8faa8b' }}>
                  SM
                </div>
                <p className="text-muted-foreground mb-6 italic">
                  "After our wedding, I had 200+ thank-you notes to send. This platform saved me weeks of work and donated $1,000 to our favorite charity. Our guests loved the personal touch!"
                </p>
                <div className="font-semibold">— Sarah & Mike, Newlyweds</div>
              </CardContent>
            </Card>
            <Card className="bg-muted/20 border-none">
              <CardContent className="p-8">
                <div className="w-14 h-14 rounded-full flex items-center justify-center text-white font-semibold text-lg mb-4" style={{ backgroundColor: '#8faa8b' }}>
                  JL
                </div>
                <p className="text-muted-foreground mb-6 italic">
                  "Perfect for baby shower thank-yous! Instead of buying cards and stamps, I redirected that money to children's charities. The e-cards were beautiful and eco-friendly."
                </p>
                <div className="font-semibold">— Jennifer, New Mom</div>
              </CardContent>
            </Card>
            <Card className="bg-muted/20 border-none">
              <CardContent className="p-8">
                <div className="w-14 h-14 rounded-full flex items-center justify-center text-white font-semibold text-lg mb-4" style={{ backgroundColor: '#8faa8b' }}>
                  DP
                </div>
                <p className="text-muted-foreground mb-6 italic">
                  "Used this for my son's bar mitzvah. Guests could choose which charity to support - it sparked amazing conversations about giving back. Truly meaningful."
                </p>
                <div className="font-semibold">— David, Proud Father</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-white" style={{ backgroundColor: '#2d4a35' }}>
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">Start Your Gratitude Campaign</h2>
          <p className="text-xl mb-8 text-white/90">
            Transform your thank-you process into something beautiful, meaningful, and impactful. 
            Your first 3 cards are on us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button variant="hero" size="xl" className="bg-white !text-[#2d4a35] hover:bg-white/90">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="xl" className="!border-white !text-white hover:bg-white/10">
              See Sample Cards
            </Button>
          </div>
          <div className="flex items-center justify-center gap-6 mt-8 text-white/80">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              <span>3 free cards to start</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              <span>No subscription required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              <span>Tax receipts provided</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Heart className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">Thank You for Thank You</span>
            </div>
            <p className="text-muted-foreground mb-6">
              Making every "thank you" a force for good
            </p>
            <div className="flex justify-center gap-8 text-sm text-muted-foreground">
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
