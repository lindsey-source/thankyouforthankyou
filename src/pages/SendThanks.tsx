import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Heart, ArrowLeft, Send, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const SendThanks = () => {
  const [formData, setFormData] = useState({
    recipientName: "",
    recipientEmail: "",
    message: "",
    donationAmount: "",
    charity: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.recipientName.trim() || !formData.recipientEmail.trim() || !formData.message.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate sending thank you
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Thank You Sent!",
        description: `Your gratitude message has been sent to ${formData.recipientName}${formData.donationAmount ? ` with a $${formData.donationAmount} donation` : ""}.`,
      });
      
      // Navigate to dashboard
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/dashboard" className="inline-flex items-center gap-2 text-white hover:text-white/80 transition-colors mb-6">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="h-8 w-8 text-white" />
            <span className="text-3xl font-bold text-white">Thank you for Thank you</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Send a Thank You</h1>
          <p className="text-white/80">Express your gratitude and make a difference</p>
        </div>

        {/* Send Thanks Form */}
        <Card className="bg-white/95 backdrop-blur-sm shadow-glow">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl flex items-center justify-center gap-2">
              <Send className="h-6 w-6" />
              Spread Gratitude
            </CardTitle>
            <CardDescription>
              Send a heartfelt thank you message and optionally make a charitable donation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="recipientName">Recipient Name *</Label>
                  <Input
                    id="recipientName"
                    name="recipientName"
                    type="text"
                    placeholder="Who are you thanking?"
                    value={formData.recipientName}
                    onChange={handleInputChange}
                    required
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="recipientEmail">Recipient Email *</Label>
                  <Input
                    id="recipientEmail"
                    name="recipientEmail"
                    type="email"
                    placeholder="their@email.com"
                    value={formData.recipientEmail}
                    onChange={handleInputChange}
                    required
                    className="h-11"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Your Thank You Message *</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Write your heartfelt thank you message here..."
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="min-h-[120px] resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="donationAmount">Donation Amount (Optional)</Label>
                  <Input
                    id="donationAmount"
                    name="donationAmount"
                    type="number"
                    placeholder="25"
                    value={formData.donationAmount}
                    onChange={handleInputChange}
                    className="h-11"
                    min="1"
                  />
                  <p className="text-sm text-muted-foreground">
                    Make a charitable donation in their honor
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="charity">Preferred Charity (Optional)</Label>
                  <Input
                    id="charity"
                    name="charity"
                    type="text"
                    placeholder="e.g., Red Cross, Local Food Bank"
                    value={formData.charity}
                    onChange={handleInputChange}
                    className="h-11"
                  />
                  <p className="text-sm text-muted-foreground">
                    Suggest a charity for the donation
                  </p>
                </div>
              </div>

              <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending Thank You...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Thank You & Donation
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SendThanks;