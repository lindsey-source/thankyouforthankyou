import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, Gift, TrendingUp, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Heart className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                GiveThanks
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link to="/signup">
                <Button variant="hero" size="lg">
                  Get Started Free
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Send Thanks,
                <br />
                <span className="text-yellow-200">Spread Good</span>
              </h1>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                GiveThanks helps you send personalized thank-you eCards in bulk – and donate to charity with each one. 
                Upload your contacts, write a note, and we do the rest. Every 'thank you' includes a $5 donation to a charity, 
                making your gratitude twice as meaningful.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button variant="hero" size="xl" className="bg-white text-primary hover:bg-white/90">
                  Get Started for Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="xl" className="border-white text-white hover:bg-white/10">
                  See How It Works
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src={heroImage} 
                alt="People sharing gratitude and giving to charity" 
                className="w-full h-auto rounded-2xl shadow-glow"
              />
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
                title: "Upload Your Thanks List",
                description: "Quickly import a list of people you want to thank from a CSV or add them manually"
              },
              {
                icon: <Heart className="h-8 w-8" />,
                title: "Write a Heartfelt Message", 
                description: "Compose one message for all or customize each one. Pick a beautiful e-card design"
              },
              {
                icon: <Gift className="h-8 w-8" />,
                title: "Choose the Giving",
                description: "Decide on a charity or let recipients choose. You donate $5 per person securely"
              },
              {
                icon: <TrendingUp className="h-8 w-8" />,
                title: "Send & Make Impact",
                description: "Hit send and each person gets your e-card. Together you've supported great causes!"
              }
            ].map((step, index) => (
              <Card key={index} className="relative bg-gradient-card border-primary/10 hover:shadow-warm transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  <div className="absolute top-4 right-4 bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
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
            <h2 className="text-4xl font-bold text-foreground mb-4">Why Choose GiveThanks?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The perfect blend of convenience, personalization, and positive impact
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Effortless Bulk Sending",
                description: "Save time by thanking dozens or hundreds at once. No more writing individual emails or cards by hand.",
                icon: "⚡"
              },
              {
                title: "Personal & Customizable", 
                description: "Each message greets the recipient by name. Use our thoughtful card designs or your own branding.",
                icon: "🎨"
              },
              {
                title: "Charitable Impact",
                description: "Every card delivers not just gratitude, but a real donation to charity. It's a thank-you that pays it forward.",
                icon: "💝"
              },
              {
                title: "Track Your Gratitude",
                description: "Get feedback on who opened your card and which charities benefited. See your impact grow.",
                icon: "📊"
              },
              {
                title: "Free & No-Fuss",
                description: "The platform is free to use – you only pay the donations. No ads, no spam, just meaningful connections.",
                icon: "🆓"
              },
              {
                title: "Secure & Trusted",
                description: "Your data is protected, payments are secure, and we never spam your contacts or sell their information.",
                icon: "🔒"
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">Ready to Spread Gratitude?</h2>
          <p className="text-xl mb-8 text-white/90">
            Join thousands who are making gratitude meaningful. Start your first thank-you campaign today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button variant="hero" size="xl" className="bg-white text-primary hover:bg-white/90">
                Start Your First Campaign
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="xl" className="border-white text-white hover:bg-white/10">
              Try Your First Thank-You On Us
            </Button>
          </div>
          <div className="flex items-center justify-center gap-6 mt-8 text-white/80">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              <span>Free to start</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              <span>No hidden fees</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              <span>Instant impact</span>
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
              <span className="text-xl font-bold">GiveThanks</span>
            </div>
            <p className="text-muted-foreground mb-6">
              Making every "thank you" a force for good
            </p>
            <div className="flex justify-center gap-8 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">About Us</a>
              <a href="#" className="hover:text-primary transition-colors">Contact</a>
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