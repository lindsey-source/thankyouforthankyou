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
      <section className="py-16 lg:py-20" style={{ backgroundColor: "#faf7f2" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Headline + CTAs */}
            <div className="text-center lg:text-left" style={{ color: "#2d2420" }}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/15 text-secondary text-sm font-medium mb-6">
                <Sparkles className="h-3.5 w-3.5" />
                Gratitude that gives back
              </div>
              <h1 className="text-5xl xl:text-6xl font-bold mb-6 leading-[1.05] tracking-tight" style={{ color: "#2d2420" }}>
                Thank Differently.
                <br />
                <span className="text-primary">Give Meaningfully.</span>
              </h1>
              <p className="text-lg lg:text-xl mb-8 leading-relaxed max-w-xl lg:max-w-none mx-auto" style={{ color: "#2d2420", opacity: 0.75 }}>
                Send personalized thank-you e-cards at scale. The money you'd have spent
                on paper, printing, and postage becomes a charitable donation instead.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/signup">
                  <Button variant="hero" size="xl">
                    Create Your Card Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button variant="outline" size="xl">
                  See How It Works
                </Button>
              </div>
            </div>

            {/* Right: Custom SVG illustration */}
            <div className="relative flex items-center justify-center">
              <svg
                viewBox="0 0 560 420"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="An e-card with a heart turning into a charitable donation"
                className="w-full h-auto max-w-[560px]"
              >
                {/* Soft background blob */}
                <ellipse cx="280" cy="220" rx="240" ry="170" fill="#fdf6f3" />
                <ellipse cx="430" cy="150" rx="90" ry="60" fill="#8faa8b" opacity="0.12" />
                <ellipse cx="130" cy="290" rx="80" ry="55" fill="#c17b8a" opacity="0.10" />

                {/* LEFT: Envelope */}
                <g transform="translate(40 170)">
                  {/* envelope body */}
                  <rect
                    x="0"
                    y="0"
                    width="180"
                    height="130"
                    rx="10"
                    fill="#ffffff"
                    stroke="#2d2420"
                    strokeWidth="2.5"
                  />
                  {/* inner crease */}
                  <path
                    d="M 0 10 L 90 80 L 180 10"
                    fill="none"
                    stroke="#2d2420"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* open flap (folded back) */}
                  <path
                    d="M 0 0 L 90 -55 L 180 0 Z"
                    fill="#fdf6f3"
                    stroke="#2d2420"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                  />
                  {/* card peeking out */}
                  <rect
                    x="22"
                    y="-30"
                    width="136"
                    height="86"
                    rx="6"
                    fill="#fdf6f3"
                    stroke="#2d2420"
                    strokeWidth="2.5"
                  />
                  <line x1="40" y1="-12" x2="140" y2="-12" stroke="#c17b8a" strokeWidth="3" strokeLinecap="round" />
                  <line x1="40" y1="2" x2="120" y2="2" stroke="#2d2420" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
                  <line x1="40" y1="14" x2="130" y2="14" stroke="#2d2420" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
                  <line x1="40" y1="26" x2="100" y2="26" stroke="#2d2420" strokeWidth="2" strokeLinecap="round" opacity="0.55" />

                  {/* Heart rising out of envelope */}
                  <g transform="translate(70 -110)">
                    <path
                      d="M20 36 C 4 22, 4 4, 20 4 C 28 4, 32 10, 36 16 C 40 10, 44 4, 52 4 C 68 4, 68 22, 52 36 L 36 52 Z"
                      fill="#c17b8a"
                      stroke="#2d2420"
                      strokeWidth="2.5"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M28 14 C 26 18, 28 22, 32 22"
                      fill="none"
                      stroke="#fdf6f3"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      opacity="0.85"
                    />
                  </g>
                  {/* trail dots from envelope to heart */}
                  <circle cx="90" cy="-50" r="3" fill="#c17b8a" opacity="0.5" />
                  <circle cx="90" cy="-65" r="2.5" fill="#c17b8a" opacity="0.7" />
                  <circle cx="90" cy="-78" r="2" fill="#c17b8a" opacity="0.85" />
                </g>

                {/* MIDDLE: Hand-drawn arrow */}
                <g transform="translate(240 200)">
                  <path
                    d="M 0 30 C 30 0, 60 60, 90 30"
                    fill="none"
                    stroke="#2d2420"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeDasharray="0"
                  />
                  <path
                    d="M 78 22 L 92 30 L 80 40"
                    fill="none"
                    stroke="#2d2420"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>

                {/* RIGHT: Hands holding a heart */}
                <g transform="translate(360 160)">
                  {/* Left hand */}
                  <path
                    d="M 10 110 C 10 70, 30 60, 50 70 L 70 100 L 50 130 C 30 130, 10 130, 10 110 Z"
                    fill="#8faa8b"
                    stroke="#2d2420"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                  />
                  {/* finger lines left */}
                  <path d="M 28 78 L 36 92" stroke="#2d2420" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
                  <path d="M 38 72 L 46 86" stroke="#2d2420" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
                  {/* Right hand */}
                  <path
                    d="M 150 110 C 150 70, 130 60, 110 70 L 90 100 L 110 130 C 130 130, 150 130, 150 110 Z"
                    fill="#8faa8b"
                    stroke="#2d2420"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                  />
                  <path d="M 132 78 L 124 92" stroke="#2d2420" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
                  <path d="M 122 72 L 114 86" stroke="#2d2420" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
                  {/* Wrist base */}
                  <rect x="0" y="125" width="160" height="20" rx="8" fill="#8faa8b" stroke="#2d2420" strokeWidth="2.5" />
                  {/* Heart held above */}
                  <g transform="translate(50 10)">
                    <path
                      d="M30 56 C 4 36, 4 8, 30 8 C 42 8, 50 18, 60 28 C 70 18, 78 8, 90 8 C 116 8, 116 36, 90 56 L 60 84 Z"
                      fill="#c17b8a"
                      stroke="#2d2420"
                      strokeWidth="2.5"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 40 22 C 36 28, 38 36, 44 38"
                      fill="none"
                      stroke="#fdf6f3"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      opacity="0.85"
                    />
                  </g>
                </g>

                {/* Sparkles */}
                <g stroke="#2d2420" strokeWidth="2" strokeLinecap="round" fill="none">
                  <g transform="translate(100 80)">
                    <line x1="0" y1="-8" x2="0" y2="8" />
                    <line x1="-8" y1="0" x2="8" y2="0" />
                  </g>
                  <g transform="translate(290 90)" opacity="0.8">
                    <line x1="0" y1="-6" x2="0" y2="6" />
                    <line x1="-6" y1="0" x2="6" y2="0" />
                  </g>
                  <g transform="translate(490 100)">
                    <line x1="0" y1="-7" x2="0" y2="7" />
                    <line x1="-7" y1="0" x2="7" y2="0" />
                  </g>
                  <g transform="translate(220 340)" opacity="0.7">
                    <line x1="0" y1="-5" x2="0" y2="5" />
                    <line x1="-5" y1="0" x2="5" y2="0" />
                  </g>
                  <g transform="translate(470 320)">
                    <line x1="0" y1="-6" x2="0" y2="6" />
                    <line x1="-6" y1="0" x2="6" y2="0" />
                  </g>
                </g>
                <circle cx="60" cy="140" r="3" fill="#c17b8a" />
                <circle cx="510" cy="240" r="3" fill="#8faa8b" />
                <circle cx="180" cy="350" r="3" fill="#8faa8b" opacity="0.7" />
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
