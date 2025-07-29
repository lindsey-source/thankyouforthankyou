import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Heart, ArrowLeft, HelpCircle, MessageSquare, Mail, Phone, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Help = () => {
  const { toast } = useToast();
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would send the support request to your backend
    toast({
      title: "Message sent!",
      description: "We'll get back to you within 24 hours.",
    });
    setContactForm({ name: '', email: '', subject: '', message: '' });
  };

  const faqs = [
    {
      question: "How do I create my first thank-you card campaign?",
      answer: "Start by clicking 'Create New Campaign' on your dashboard. Upload your guest list via CSV, design your card using our templates, and customize your message. We'll handle the rest!"
    },
    {
      question: "How does the charity donation feature work?",
      answer: "When you send thank-you cards, a portion of the cost goes to charities of your choice. You can select which charities to support during campaign creation, and track your total impact in the Analytics page."
    },
    {
      question: "Can I upload my own photos for card designs?",
      answer: "Absolutely! Our card designer allows you to upload personal photos. We also offer background removal tools to help your photos look professional on the cards."
    },
    {
      question: "What file format should my guest list be in?",
      answer: "We accept CSV files with columns for name, email, address, and gift received. Download our template from the CSV Upload page to ensure compatibility."
    },
    {
      question: "How long does it take for cards to be delivered?",
      answer: "Physical cards are typically printed and mailed within 2-3 business days. Digital cards are sent immediately upon campaign launch."
    },
    {
      question: "Can I track who has received their cards?",
      answer: "Yes! Your Analytics page shows delivery status, response rates, and engagement metrics for all your campaigns."
    },
    {
      question: "Is there a limit to how many cards I can send?",
      answer: "No limits! Whether you're sending 10 cards or 1,000, our platform scales with your needs. Pricing is based on the number of cards sent."
    },
    {
      question: "Can I schedule campaigns to send later?",
      answer: "Yes, you can schedule campaigns to launch at a specific date and time during the campaign creation process."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Heart className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Thank You for Thank You
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/dashboard">
                <Button variant="ghost" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Dashboard
                </Button>
              </Link>
              <Button variant="outline">Sign Out</Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Help & Support</h1>
          <p className="text-xl text-white/90">
            We're here to help you spread gratitude effectively
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Help Options */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <HelpCircle className="h-5 w-5" />
                  Quick Help
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="secondary" className="w-full justify-start gap-3">
                  <MessageSquare className="h-4 w-4" />
                  Video Tutorials
                </Button>
                <Button variant="secondary" className="w-full justify-start gap-3">
                  <Mail className="h-4 w-4" />
                  Email Support
                </Button>
                <Button variant="secondary" className="w-full justify-start gap-3">
                  <Phone className="h-4 w-4" />
                  Schedule a Call
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Contact Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-white/90">
                <p className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  support@thankyouforthank.you
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  1-800-GRATITUDE
                </p>
                <p className="text-sm text-white/70">
                  Monday - Friday: 9 AM - 6 PM EST
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* FAQs */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Frequently Asked Questions</CardTitle>
                <CardDescription className="text-white/70">
                  Find answers to common questions about our platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="space-y-2">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="border-white/20">
                      <AccordionTrigger className="text-white hover:text-white/80">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-white/80">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>

            {/* Contact Form */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Send us a Message</CardTitle>
                <CardDescription className="text-white/70">
                  Can't find what you're looking for? We'd love to help!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="help-name" className="text-white">Name</Label>
                      <Input
                        id="help-name"
                        value={contactForm.name}
                        onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="help-email" className="text-white">Email</Label>
                      <Input
                        id="help-email"
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="help-subject" className="text-white">Subject</Label>
                    <Input
                      id="help-subject"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm(prev => ({ ...prev, subject: e.target.value }))}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      placeholder="How can we help you?"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="help-message" className="text-white">Message</Label>
                    <Textarea
                      id="help-message"
                      value={contactForm.message}
                      onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-[120px]"
                      placeholder="Please describe your question or issue in detail..."
                      required
                    />
                  </div>
                  <Button type="submit" className="gap-2">
                    <Send className="h-4 w-4" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;