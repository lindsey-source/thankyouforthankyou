import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, ArrowRight, CheckCircle, Upload, PenLine, Send, Sparkles, Users, Gift, TrendingUp, Palette, Leaf, BarChart2 } from "lucide-react";
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
                Send personalized thank-you e-cards at scale. The money you'd have spent
                on paper, printing, and postage becomes a charitable donation instead.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <Link to="/signup">
                  <Button variant="hero" size="default">
                    Create Your Card Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="outline" size="default">
                  See How It Works
                </Button>
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

              {/* Front card (rotated -3deg) */}
              <div
                className="relative w-[280px] sm:w-[300px] aspect-[3/4] rounded-2xl bg-white border overflow-hidden shadow-warm"
                style={{
                  transform: "rotate(-3deg)",
                  borderColor: "rgba(45, 36, 32, 0.08)",
                }}
                role="img"
                aria-label="Example thank-you e-card preview"
              >
                {/* Top blush watercolor header */}
                <div
                  className="relative flex flex-col items-center justify-center"
                  style={{
                    height: "180px",
                    background:
                      "linear-gradient(135deg, #f9ece8 0%, #f0d8d0 50%, #e8c4b8 100%)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Dancing Script', cursive",
                      fontSize: "48px",
                      color: "#8b4a5a",
                      letterSpacing: "0.05em",
                      lineHeight: 1.1,
                    }}
                  >
                    Thank You
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
                    <div style={{ width: "30px", height: "1px", backgroundColor: "#c17b8a" }} />
                    <div
                      style={{
                        width: "4px",
                        height: "4px",
                        backgroundColor: "#c17b8a",
                        transform: "rotate(45deg)",
                      }}
                    />
                    <div style={{ width: "30px", height: "1px", backgroundColor: "#c17b8a" }} />
                  </div>
                </div>

                {/* Card body */}
                <div className="p-5 flex flex-col h-[58%]">
                  <p
                    className="text-xl mb-2"
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      color: "#2d2420",
                    }}
                  >
                    Dear Sarah,
                  </p>
                  <p
                    className="text-sm leading-relaxed flex-1"
                    style={{ color: "#2d2420", opacity: 0.72 }}
                  >
                    Thank you so much for being part of our special day. Your
                    presence meant the world to us.
                  </p>

                  {/* Donation badge */}
                  <div className="mt-3">
                    <div
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                      style={{
                        backgroundColor: "rgba(143, 170, 139, 0.18)",
                        color: "#5a7257",
                      }}
                    >
                      <span aria-hidden="true">💚</span>
                      $3 donated to WWF
                    </div>
                  </div>
                </div>
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
