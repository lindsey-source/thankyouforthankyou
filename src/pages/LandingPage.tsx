import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, ArrowRight, CheckCircle, Upload, PenLine, Send, Sparkles, Users, Gift, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import cardBlushBotanical from "@/assets/card-blush-botanical.jpg";
import cardSageAbstract from "@/assets/card-sage-abstract.jpg";
import cardWildflowerInk from "@/assets/card-wildflower-ink.jpg";

const LandingPage = () => {
  const { isLoaded, isSignedIn } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-background/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Heart className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-primary">
                Thank You for Thank You
              </span>
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
                      Get Started Free
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-10 lg:py-14" style={{ backgroundColor: "#faf7f2" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Left: Headline + CTAs */}
            <div className="text-center lg:text-left" style={{ color: "#2d2420" }}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/15 text-secondary text-sm font-medium mb-4">
                <Sparkles className="h-3.5 w-3.5" />
                Gratitude that gives back
              </div>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 leading-[1.05] tracking-tight" style={{ color: "#2d2420" }}>
                Thank Differently.
                <br />
                <span className="text-primary">Give Meaningfully.</span>
              </h1>
              <p className="text-base lg:text-lg mb-6 leading-relaxed max-w-xl lg:max-w-none mx-auto" style={{ color: "#2d2420", opacity: 0.75 }}>
                Send personalized thank-you e-cards at scale. The money you'd have spent
                on paper, printing, and postage becomes a charitable donation instead.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Link to="/signup">
                  <Button variant="hero" size="lg">
                    Create Your Card Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg">
                  See How It Works
                </Button>
              </div>
            </div>

            {/* Right: Custom SVG illustration */}
            <div className="relative flex items-center justify-center">
              <svg
                viewBox="0 0 600 360"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="A thank-you card transforming into a charitable donation"
                className="w-full h-auto"
                style={{ maxHeight: "380px" }}
              >
                <defs>
                  <linearGradient id="cardShine" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#fdf6f3" />
                  </linearGradient>
                  <linearGradient id="charityFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#a8bfa3" />
                    <stop offset="100%" stopColor="#8faa8b" />
                  </linearGradient>
                  <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#2d2420" floodOpacity="0.10" />
                  </filter>
                </defs>

                {/* Soft background blobs */}
                <ellipse cx="300" cy="195" rx="280" ry="150" fill="#fdf6f3" />
                <circle cx="475" cy="120" r="55" fill="#8faa8b" opacity="0.13" />
                <circle cx="120" cy="260" r="48" fill="#c17b8a" opacity="0.12" />

                {/* ============ LEFT: Envelope with card ============ */}
                <g transform="translate(60 110)" filter="url(#softShadow)">
                  {/* Card behind */}
                  <rect
                    x="14"
                    y="-18"
                    width="132"
                    height="98"
                    rx="8"
                    fill="url(#cardShine)"
                    stroke="#2d2420"
                    strokeWidth="2"
                  />
                  {/* card content lines */}
                  <line x1="32" y1="2" x2="128" y2="2" stroke="#c17b8a" strokeWidth="3" strokeLinecap="round" />
                  <line x1="32" y1="18" x2="112" y2="18" stroke="#2d2420" strokeWidth="1.8" strokeLinecap="round" opacity="0.45" />
                  <line x1="32" y1="30" x2="120" y2="30" stroke="#2d2420" strokeWidth="1.8" strokeLinecap="round" opacity="0.45" />
                  <line x1="32" y1="42" x2="96" y2="42" stroke="#2d2420" strokeWidth="1.8" strokeLinecap="round" opacity="0.45" />
                  {/* tiny heart on card */}
                  <path
                    d="M112 56 c -5 -5 -5 -12 1 -12 c 3 0 4 2 5 4 c 1 -2 2 -4 5 -4 c 6 0 6 7 1 12 l -6 6 z"
                    fill="#c17b8a"
                  />

                  {/* Envelope body in front */}
                  <rect
                    x="0"
                    y="56"
                    width="160"
                    height="86"
                    rx="8"
                    fill="#ffffff"
                    stroke="#2d2420"
                    strokeWidth="2"
                  />
                  {/* envelope flap creases */}
                  <path
                    d="M 0 60 L 80 110 L 160 60"
                    fill="none"
                    stroke="#2d2420"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 0 142 L 60 100"
                    fill="none"
                    stroke="#2d2420"
                    strokeWidth="2"
                    strokeLinecap="round"
                    opacity="0.5"
                  />
                  <path
                    d="M 160 142 L 100 100"
                    fill="none"
                    stroke="#2d2420"
                    strokeWidth="2"
                    strokeLinecap="round"
                    opacity="0.5"
                  />
                </g>

                {/* ============ MIDDLE: Curved arrow with floating heart ============ */}
                <g>
                  {/* Floating heart above arrow */}
                  <g transform="translate(285 90)">
                    <path
                      d="M15 30 C 0 18, 2 4, 14 4 C 20 4, 24 8, 27 13 C 30 8, 34 4, 40 4 C 52 4, 54 18, 39 30 L 27 44 Z"
                      fill="#c17b8a"
                      stroke="#2d2420"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 20 14 C 18 17, 19 21, 22 22"
                      fill="none"
                      stroke="#fdf6f3"
                      strokeWidth="2"
                      strokeLinecap="round"
                      opacity="0.85"
                    />
                  </g>
                  {/* Curved dashed arrow */}
                  <path
                    d="M 250 200 Q 305 145 365 200"
                    fill="none"
                    stroke="#2d2420"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeDasharray="2 8"
                  />
                  <path
                    d="M 355 188 L 368 202 L 354 212"
                    fill="none"
                    stroke="#2d2420"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>

                {/* ============ RIGHT: Charity circle ($ → ♥) ============ */}
                <g transform="translate(400 110)" filter="url(#softShadow)">
                  {/* Outer ring */}
                  <circle cx="80" cy="80" r="78" fill="url(#charityFill)" stroke="#2d2420" strokeWidth="2" />
                  {/* Inner cream disc */}
                  <circle cx="80" cy="80" r="62" fill="#fdf6f3" stroke="#2d2420" strokeWidth="1.5" opacity="0.95" />

                  {/* Dollar sign (left, fading) */}
                  <g transform="translate(36 50)" opacity="0.45">
                    <text
                      x="0"
                      y="40"
                      fontFamily="Georgia, serif"
                      fontSize="46"
                      fontWeight="700"
                      fill="#2d2420"
                    >
                      $
                    </text>
                  </g>

                  {/* Tiny arrow $ -> heart */}
                  <path
                    d="M 64 80 L 84 80"
                    fill="none"
                    stroke="#2d2420"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 80 76 L 86 80 L 80 84"
                    fill="none"
                    stroke="#2d2420"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Heart (right, prominent) */}
                  <g transform="translate(92 56)">
                    <path
                      d="M18 38 C 0 22, 2 4, 18 4 C 26 4, 30 10, 34 16 C 38 10, 42 4, 50 4 C 66 4, 68 22, 50 38 L 34 54 Z"
                      fill="#c17b8a"
                      stroke="#2d2420"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 24 16 C 22 20, 24 24, 28 25"
                      fill="none"
                      stroke="#fdf6f3"
                      strokeWidth="2"
                      strokeLinecap="round"
                      opacity="0.85"
                    />
                  </g>

                  {/* Outer ring tick marks for "polish" */}
                  <g stroke="#2d2420" strokeWidth="1.5" strokeLinecap="round" opacity="0.55">
                    <line x1="80" y1="6" x2="80" y2="12" />
                    <line x1="80" y1="148" x2="80" y2="154" />
                    <line x1="6" y1="80" x2="12" y2="80" />
                    <line x1="148" y1="80" x2="154" y2="80" />
                  </g>
                </g>

                {/* Sparkles */}
                <g stroke="#2d2420" strokeWidth="2" strokeLinecap="round" fill="none">
                  <g transform="translate(40 70)">
                    <line x1="0" y1="-7" x2="0" y2="7" />
                    <line x1="-7" y1="0" x2="7" y2="0" />
                  </g>
                  <g transform="translate(220 70)" opacity="0.8">
                    <line x1="0" y1="-5" x2="0" y2="5" />
                    <line x1="-5" y1="0" x2="5" y2="0" />
                  </g>
                  <g transform="translate(560 90)">
                    <line x1="0" y1="-6" x2="0" y2="6" />
                    <line x1="-6" y1="0" x2="6" y2="0" />
                  </g>
                  <g transform="translate(180 300)" opacity="0.75">
                    <line x1="0" y1="-5" x2="0" y2="5" />
                    <line x1="-5" y1="0" x2="5" y2="0" />
                  </g>
                  <g transform="translate(540 290)">
                    <line x1="0" y1="-6" x2="0" y2="6" />
                    <line x1="-6" y1="0" x2="6" y2="0" />
                  </g>
                </g>
                <circle cx="100" cy="305" r="3" fill="#c17b8a" opacity="0.8" />
                <circle cx="350" cy="295" r="3" fill="#8faa8b" />
                <circle cx="260" cy="60" r="2.5" fill="#c17b8a" opacity="0.7" />
              </svg>
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
                icon: "✨"
              },
              {
                title: "Artist-Designed Cards", 
                description: "Choose from elegant designs created by talented artists, many partnered with the charities you support.",
                icon: "🎨"
              },
              {
                title: "Redirect Savings to Good",
                description: "Skip paper, printing, envelopes, and postage. Redirect those savings into meaningful charitable donations.",
                icon: "💝"
              },
              {
                title: "Recipient Choice",
                description: "Let recipients choose their favorite charity from your curated list, making the gift even more personal.",
                icon: "🎯"
              },
              {
                title: "Time & Impact Tracking",
                description: "See your gratitude's reach with delivery confirmations, charity selections, and cumulative impact reports.",
                icon: "📊"
              },
              {
                title: "Premium Experience",
                description: "No ads, no spam, just beautiful digital-with-soul experiences that recipients will treasure.",
                icon: "🌟"
              }
            ].map((feature, index) => (
              <Card key={index} className="bg-card hover:shadow-soft transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-4 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Beautiful Gallery Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Card Design Gallery</h2>
            <p className="text-xl text-muted-foreground">Beautiful thank you cards that make an impact</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="overflow-hidden hover:shadow-soft transition-all duration-300 group">
              <div className="relative">
                <img 
                  src={cardSageAbstract} 
                  alt="Modern sage abstract brushstroke card" 
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-semibold">Modern Abstract</h3>
                  <p className="text-white/90">Artist-designed brushstrokes</p>
                </div>
              </div>
            </Card>
            <Card className="overflow-hidden hover:shadow-soft transition-all duration-300 group">
              <div className="relative">
                <img 
                  src={cardWildflowerInk} 
                  alt="Whimsical wildflower ink illustration card" 
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-semibold">Wildflower Ink</h3>
                  <p className="text-white/90">Hand-drawn organic details</p>
                </div>
              </div>
            </Card>
            <Card className="overflow-hidden hover:shadow-soft transition-all duration-300 group">
              <div className="relative">
                <img 
                  src={cardBlushBotanical} 
                  alt="Minimalist blush botanical card" 
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-semibold">Blush Botanical</h3>
                  <p className="text-white/90">Soft watercolor elegance</p>
                </div>
              </div>
            </Card>
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
