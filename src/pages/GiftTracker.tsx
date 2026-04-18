import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, FileSpreadsheet, CheckCircle, Calendar, Heart } from "lucide-react";
import { generateCSVTemplate } from "@/lib/csvUtils";
import { toast } from "sonner";

const GiftTracker = () => {
  const handleDownload = () => {
    try {
      generateCSVTemplate();
      toast.success("Template downloaded — happy planning!");
    } catch {
      toast.error("Couldn't start the download. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="bg-background/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center">
              <img
                src="/logo.png"
                alt="Thank You for Thank You"
                style={{ height: "72px", mixBlendMode: "multiply" }}
                className="w-auto"
              />
            </Link>
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-1.5" />
                Back home
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-12 md:py-16" style={{ backgroundColor: "#faf7f2" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/15 text-secondary text-xs font-medium mb-4">
            <Calendar className="h-3.5 w-3.5" />
            Plan ahead
          </div>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight tracking-tight"
            style={{ color: "#2d2420" }}
          >
            The Gift Tracker Template
          </h1>
          <p
            className="text-base md:text-lg mb-8 leading-relaxed max-w-2xl mx-auto"
            style={{ color: "#2d2420", opacity: 0.75 }}
          >
            Bring this to your event. Jot down who gave what as gifts arrive — then come back and
            we'll turn it into beautiful, meaningful thank-you cards in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Button variant="hero" size="lg" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download Template (CSV)
            </Button>
            <Link to="/create-card/step1">
              <Button variant="outline" size="lg">
                Already had your event? Start your cards →
              </Button>
            </Link>
          </div>
          <p className="text-xs mt-3" style={{ color: "#2d2420", opacity: 0.55 }}>
            Opens in Excel, Numbers, or Google Sheets · No signup needed
          </p>
        </div>
      </section>

      {/* What's in it */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="rounded-2xl p-8 md:p-10 border"
            style={{ backgroundColor: "#ffffff", borderColor: "#ede8e3" }}
          >
            <div className="flex items-start gap-4 mb-6">
              <div
                className="h-12 w-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "rgba(143, 170, 139, 0.18)" }}
              >
                <FileSpreadsheet className="h-6 w-6" style={{ color: "#5a7257" }} />
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-1" style={{ color: "#2d2420" }}>
                  What's inside
                </h2>
                <p className="text-sm" style={{ color: "#2d2420", opacity: 0.7 }}>
                  Pre-filled with sample rows so you can see exactly how it works.
                </p>
              </div>
            </div>

            <ul className="space-y-3">
              {[
                "Guest Name — who the thank-you is for",
                "Email Address — where we'll send their card",
                "Gift Description — flowers, kitchen mixer, gift card…",
                "Gift Amount — optional, but helpful for context",
                "Relationship — cousin, friend, colleague…",
                "Personal Note — a one-line memory to make their card sing",
                "Send? (YES/NO) — easy way to skip rows later",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle
                    className="h-5 w-5 flex-shrink-0 mt-0.5"
                    style={{ color: "#8faa8b" }}
                  />
                  <span className="text-sm md:text-base" style={{ color: "#2d2420", opacity: 0.85 }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* How to use it */}
      <section className="py-16" style={{ backgroundColor: "#f5ede9" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3" style={{ color: "#2d2420" }}>
              How to use it
            </h2>
            <p className="text-base" style={{ color: "#2d2420", opacity: 0.7 }}>
              Three simple steps from your event day to sent thank-yous.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "1",
                title: "Download & print",
                body: "Grab the template, print a copy, and bring it to your event.",
              },
              {
                step: "2",
                title: "Fill it in",
                body: "As gifts arrive, jot down the guest, the gift, and a quick note.",
              },
              {
                step: "3",
                title: "Come back & send",
                body: "Upload your filled list, pick a card, and we'll handle the rest.",
              },
            ].map((s) => (
              <div
                key={s.step}
                className="rounded-2xl p-6 border"
                style={{ backgroundColor: "#ffffff", borderColor: "rgba(45, 36, 32, 0.08)" }}
              >
                <div
                  className="h-9 w-9 rounded-full flex items-center justify-center text-sm font-bold mb-4"
                  style={{ backgroundColor: "#c17b8a", color: "#ffffff" }}
                >
                  {s.step}
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: "#2d2420" }}>
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#2d2420", opacity: 0.7 }}>
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart className="h-8 w-8 mx-auto mb-4" style={{ color: "#c17b8a" }} />
          <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: "#2d2420" }}>
            Ready when you are
          </h2>
          <p className="text-base mb-6" style={{ color: "#2d2420", opacity: 0.7 }}>
            When the event's done and your list is full, create a free account to send your cards
            and turn gratitude into giving.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="hero" size="default" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download Template
            </Button>
            <Link to="/signup">
              <Button variant="outline" size="default">
                Create Free Account
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GiftTracker;
