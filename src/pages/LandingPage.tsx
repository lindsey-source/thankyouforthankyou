import React from "react";
import { Button } from "@/components/ui/button";
import { Heart, ArrowRight, Upload, PenLine, Send, Palette, Leaf, Gem, Baby, Cake, GraduationCap, Flower2, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { DESIGN_SETS } from "@/pages/CreateCardStep2";
import { HeaderArt } from "@/components/CardDesigner/HeaderArt";
import { HeroEnvelope } from "@/components/stationery/HeroEnvelope";
import { IconCircle } from "@/components/stationery/IconCircle";

const OCCASIONS = [
  { label: "Wedding", Icon: Gem, tone: "blush" as const },
  { label: "Baby", Icon: Baby, tone: "sky" as const },
  { label: "Birthday", Icon: Cake, tone: "butter" as const },
  { label: "Graduation", Icon: GraduationCap, tone: "sage" as const },
  { label: "Memorial", Icon: Flower2, tone: "lilac" as const },
];

const STEPS = [
  { Icon: Upload, tone: "blush" as const, title: "Upload your guest list", description: "Drop in a spreadsheet of names and emails." },
  { Icon: PenLine, tone: "sage" as const, title: "Write your message", description: "Choose a design and say thank you your way." },
  { Icon: Send, tone: "sky" as const, title: "We send the cards", description: "A personal e-card arrives for every guest." },
  { Icon: Heart, tone: "butter" as const, title: "Postage becomes giving", description: "What you'd spend on stamps goes to charity." },
];

const FEATURES = [
  { Icon: Mail, tone: "lilac" as const, title: "For life's moments", description: "Weddings, babies, birthdays, milestones and more." },
  { Icon: Palette, tone: "blush" as const, title: "Artist-designed", description: "Elegant cards, many made with partner charities." },
  { Icon: Leaf, tone: "sage" as const, title: "Savings to good", description: "Skip paper and postage. Give that instead." },
];

const SectionHeading = ({ eyebrow, title, intro }: { eyebrow?: string; title: string; intro?: string }) => (
  <div className="text-center mb-16">
    {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
    <h2 className="section-heading text-4xl md:text-5xl mb-6">{title}</h2>
    <hr className="gold-hairline mb-6" />
    {intro && <p className="text-sm md:text-base leading-loose text-muted-foreground max-w-md mx-auto">{intro}</p>}
  </div>
);

const LandingPage = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const weddingGalleryDesign = DESIGN_SETS.wedding[0];

  return (
    <div className="homepage min-h-screen">
      {/* Navigation */}
      <nav className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
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


      {/* Hero */}
      <section className="homepage-hero paper-grain">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-20 md:gap-16 lg:gap-24">
            <div className="text-center md:text-left">
              <p className="eyebrow mb-6">The postage you save becomes the gift</p>
              <h1 className="text-4xl sm:text-5xl xl:text-6xl mb-8 leading-[1.2] text-foreground">
                Thank Differently.
                <br />
                <span className="text-primary">Give Meaningfully.</span>
              </h1>
              <p className="text-sm md:text-base mb-10 leading-loose max-w-md mx-auto md:mx-0 text-muted-foreground">
                Send beautiful thank-you cards online. Instead of buying stamps, each card carries a
                small donation to a cause you choose.
              </p>
              <div className="flex flex-col items-center md:items-start gap-4">
                <Link to="/signup">
                  <Button variant="hero" size="default">
                    Start sending thank-yous
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <a href="#how-it-works" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
                  See how it works
                </a>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">Free to start · No credit card required</p>
            </div>
            <div className="flex items-center justify-center min-h-[420px]">
              <HeroEnvelope />
            </div>
          </div>
        </div>
      </section>

      {/* Occasions */}
      <section className="band-blush">
        <div className="max-w-5xl mx-auto px-6 sm:px-10">
          <SectionHeading eyebrow="Occasions" title="A thank-you for every moment" />
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-10 mb-14">
            {OCCASIONS.map(({ label, Icon, tone }) => (
              <Link key={label} to="/signup" className="occasion-link flex flex-col items-center gap-3 text-sm text-foreground">
                <IconCircle Icon={Icon} tone={tone} />
                <span className="tracking-wide">{label}</span>
              </Link>
            ))}
          </div>
          <div className="text-center">
            <a href="#card-gallery">
              <Button variant="hero" size="lg">Browse designs</Button>
            </a>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="band-white scroll-mt-20">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">
          <SectionHeading eyebrow="How it works" title="Four quiet steps" intro="From your guest list to a real donation." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {STEPS.map(({ Icon, tone, title, description }, i) => (
              <div key={title} className="text-center">
                <IconCircle Icon={Icon} tone={tone} />
                <p className="eyebrow mt-5 mb-2">Step {i + 1}</p>
                <h3 className="text-xl mb-2 text-foreground" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 400 }}>{title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground max-w-[220px] mx-auto">{description}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link to="/signup"><Button variant="hero" size="lg">Get started</Button></Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="band-blush">
        <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-12">
          <SectionHeading eyebrow="Why it matters" title="Thoughtful. Effortless. Impactful." />
          <div className="grid md:grid-cols-3 gap-14 mb-16">
            {FEATURES.map(({ Icon, tone, title, description }) => (
              <div key={title} className="text-center">
                <IconCircle Icon={Icon} tone={tone} />
                <h3 className="text-xl mt-6 mb-2 text-foreground" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 400 }}>{title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground max-w-[240px] mx-auto">{description}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link to="/gift-tracker"><Button variant="hero" size="lg">Download the gift tracker</Button></Link>
          </div>
        </div>
      </section>

      <div className="gold-divider" aria-hidden="true" />

      {/* Card Design Gallery */}
      <section id="card-gallery" className="band-white scroll-mt-20">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 lg:gap-24 max-w-5xl mx-auto">
            {/* Wedding — shared Rose Garden artwork and monogram */}
            <div
              className="stationery-card stationery-paper stationery-tilt-left group rounded-lg overflow-hidden bg-card border border-border"
            >
              <HeaderArt
                design={weddingGalleryDesign}
                height="240px"
                initials="E & J"
                subtext="Emma & James · June 14, 2027"
              />
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
                    <Heart className="h-3 w-3" strokeWidth={1.5} style={{ color: "#3d5a3a" }} />
                    $4 donated to Rainforest Alliance
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    color: "#2d2420",
                    fontSize: "16px",
                  }}
                >
                  Dear Aunt Rachel,
                </p>
                <p
                  className="mt-2 text-sm leading-relaxed text-muted-foreground"
                >
                  {weddingGalleryDesign.body}
                </p>

              </div>
            </div>

            {/* Card 3 — Baby Showers (Sage + Wildflowers) */}
            <div
              className="stationery-card stationery-paper stationery-tilt-right group rounded-lg overflow-hidden bg-card border border-border"
            >
              <div
                className="stationery-header relative flex items-center justify-center"
                style={{
                  height: "240px",
                  background:
                    "linear-gradient(180deg, #eef2e8 0%, #c5d4bc 100%)",
                }}
              >
                <svg
                  viewBox="0 0 200 120"
                  className="absolute inset-0 w-full h-full opacity-50"
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
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontWeight: 400,
                    fontSize: "32px",
                    color: "#2f4a2c",
                    letterSpacing: "0.06em",
                    lineHeight: 1.1,
                  }}
                >
                  Thank You
                  <span className="block text-lg mt-2">from Baby Lily</span>
                </span>
              </div>
              <div className="p-8 sm:p-10">
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span
                    className="inline-block px-3 py-1 rounded-full text-xs"
                    style={{ backgroundColor: "#eef2e8", color: "#3d5a3a" }}
                  >
                  Baby Gifts & Showers
                  </span>
                  <span
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs"
                    style={{ backgroundColor: "#eef2e8", color: "#3d5a3a" }}
                  >
                    <Heart className="h-3 w-3" strokeWidth={1.5} style={{ color: "#3d5a3a" }} />
                    $3 donated to UNICEF
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
                  Thank you for your thoughtful gift for baby Lily. We are so grateful for your kindness.
                </p>

              </div>
            </div>

          </div>
          <div className="text-center mt-20">
            <Link to="/signup"><Button variant="hero" size="lg">Design your card</Button></Link>
          </div>
        </div>
      </section>


      {/* Closing */}
      <section className="band-blush">
        <div className="max-w-3xl mx-auto text-center px-6 sm:px-10">
          <SectionHeading title="Start your gratitude campaign" intro="Your first 3 cards are on us." />
          <Link to="/signup">
            <Button variant="hero" size="lg">
              Get started free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      <div className="gold-divider" aria-hidden="true" />

      {/* Footer */}
      <footer className="linen-surface py-20">
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
              <Link to="/about" className="hover:text-primary transition-colors">About</Link>
              <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
              <Link to="/help" className="hover:text-primary transition-colors">Help</Link>
              <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
