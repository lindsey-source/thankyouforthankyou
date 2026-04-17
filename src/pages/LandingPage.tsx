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
      <section className="py-10 lg:py-12" style={{ backgroundColor: "#faf7f2" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Left: Headline + CTAs */}
            <div className="text-center lg:text-left lg:col-span-4" style={{ color: "#2d2420" }}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/15 text-secondary text-sm font-medium mb-6">
                <Sparkles className="h-3.5 w-3.5" />
                Gratitude that gives back
              </div>
              <h1 className="text-4xl xl:text-5xl font-bold mb-6 leading-[1.05] tracking-tight" style={{ color: "#2d2420" }}>
                Thank Differently.
                <br />
                <span className="text-primary">Give Meaningfully.</span>
              </h1>
              <p className="text-base lg:text-lg mb-8 leading-relaxed" style={{ color: "#2d2420", opacity: 0.75 }}>
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

            {/* Middle: Photo */}
            <div className="lg:col-span-4 order-first lg:order-none">
              <div className="relative rounded-3xl overflow-hidden shadow-warm aspect-[3/4] bg-muted">
                <img
                  src="https://images.unsplash.com/photo-1543269664-76bc3997d9ea?w=600&q=80"
                  alt="Friends celebrating together"
                  loading="eager"
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(45,36,32,0) 60%, rgba(45,36,32,0.15) 100%)",
                  }}
                />
              </div>
            </div>

            {/* Right: 4-step workflow */}
            <div className="relative lg:col-span-4">
              <ol className="space-y-4">
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
                    <li key={index} className="relative">
                      <div
                        className="flex items-start gap-4 p-5 rounded-2xl border transition-all duration-300 hover:shadow-warm hover:-translate-y-0.5"
                        style={{
                          backgroundColor: "#ffffff",
                          borderColor: "rgba(45, 36, 32, 0.08)",
                        }}
                      >
                        {/* Numbered icon badge */}
                        <div className="relative shrink-0">
                          <div
                            className="h-14 w-14 rounded-xl flex items-center justify-center text-primary"
                            style={{ backgroundColor: "rgba(193, 123, 138, 0.12)" }}
                          >
                            <Icon className="h-6 w-6" strokeWidth={1.75} />
                          </div>
                          <div className="absolute -top-2 -left-2 h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shadow-sm">
                            {index + 1}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0 pt-0.5">
                          <h3
                            className="text-base font-semibold mb-1"
                            style={{ color: "#2d2420" }}
                          >
                            {step.title}
                          </h3>
                          <p
                            className="text-sm leading-relaxed"
                            style={{ color: "#2d2420", opacity: 0.65 }}
                          >
                            {step.description}
                          </p>
                        </div>
                      </div>
                      {/* Connector arrow between steps */}
                      {index < arr.length - 1 && (
                        <div className="flex justify-start pl-7 py-1" aria-hidden="true">
                          <div className="flex flex-col items-center text-secondary/60">
                            <div className="h-3 w-px bg-current" />
                            <ArrowRight className="h-3.5 w-3.5 rotate-90 -my-0.5" strokeWidth={2} />
                            <div className="h-3 w-px bg-current" />
                          </div>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Express your gratitude and make a difference in just four simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: <Users className="h-8 w-8" />,
                title: "Download & Fill Template",
                description: "Download our CSV template and fill in your guest names, emails, gifts, and custom thank-you messages"
              },
              {
                icon: <Heart className="h-8 w-8" />,
                title: "Write a Heartfelt Message", 
                description: "Compose one message for all or customize each one. Pick a beautiful e-card design"
              },
               {
                 icon: <Gift className="h-8 w-8" />,
                 title: "Redirect Card Costs",
                 description: "Instead of paying for paper, printing, envelopes, and stamps, that same money becomes charitable donations"
               },
              {
                icon: <TrendingUp className="h-8 w-8" />,
                title: "Send & Make Impact",
                description: "Hit send and each person gets your e-card. Together you've supported great causes!"
              }
            ].map((step, index) => (
              <Card key={index} className="relative bg-gradient-card border-primary/10 hover:shadow-warm transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="bg-accent w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-accent-foreground">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  <div className="absolute top-4 right-4 bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                </CardContent>
              </Card>
            ))}
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
