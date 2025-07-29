import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Heart, ArrowLeft, Send, Loader2, Palette, Plus, Users, Upload, FileText, Download, CheckCircle, AlertTriangle } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { parseCSVFile, validateGuestData, generateCSVTemplate, type GuestGiftData } from "@/lib/csvUtils";

const SendThanks = () => {
  const [formData, setFormData] = useState({
    recipientName: "",
    recipientEmail: "",
    message: "",
    donationAmount: "",
    charity: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [cardDesign, setCardDesign] = useState(null);
  const [batchData, setBatchData] = useState<GuestGiftData[]>([]);
  const [isBatchMode, setIsBatchMode] = useState(false);
  const [isProcessingCSV, setIsProcessingCSV] = useState(false);
  const [validationResults, setValidationResults] = useState<{ valid: GuestGiftData[], invalid: { row: number, errors: string[] }[] } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  // Check if we received data from other pages
  React.useEffect(() => {
    if (location.state?.cardDesign) {
      setCardDesign(location.state.cardDesign);
      // Pre-fill the message if it exists in the design
      if (location.state.cardDesign.message) {
        setFormData(prev => ({ 
          ...prev, 
          message: location.state.cardDesign.message 
        }));
      }
    }
    
    // Check if we received batch data from CSV upload
    if (location.state?.batchData && location.state?.mode === 'batch') {
      setBatchData(location.state.batchData);
      setIsBatchMode(true);
    }
  }, [location.state]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isBatchMode) {
      await handleBatchSubmit();
      return;
    }
    
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

  const handleBatchSubmit = async () => {
    setIsLoading(true);
    
    try {
      // Simulate batch sending
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      toast({
        title: "Batch Campaign Sent!",
        description: `Successfully sent ${batchData.length} thank-you cards with charitable donations.`,
      });
      
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Batch send failed",
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

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.csv')) {
      toast({
        title: "Invalid File Type",
        description: "Please upload a CSV file.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessingCSV(true);
    try {
      const data = await parseCSVFile(file);
      const results = validateGuestData(data);
      
      setBatchData(data);
      setValidationResults(results);
      setIsBatchMode(true);
      
      toast({
        title: "CSV Processed Successfully",
        description: `Found ${results.valid.length} valid entries${results.invalid.length > 0 ? ` and ${results.invalid.length} invalid entries` : ''}.`,
      });
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: error instanceof Error ? error.message : "Failed to process CSV file",
        variant: "destructive",
      });
    } finally {
      setIsProcessingCSV(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDownloadTemplate = () => {
    generateCSVTemplate();
    toast({
      title: "Template Downloaded",
      description: "Check your downloads folder for the CSV template.",
    });
  };

  const switchToSingleMode = () => {
    setIsBatchMode(false);
    setBatchData([]);
    setValidationResults(null);
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
            <span className="text-3xl font-bold text-white">Thank You for Thank You</span>
          </div>
          <p className="text-white/80">
            {isBatchMode 
              ? `Transform ${batchData.length} traditional cards into charitable impact`
              : "Express your gratitude digitally and make a charitable impact"
            }
          </p>
        </div>

        {/* Send Thanks Form */}
        <Card className="bg-white/95 backdrop-blur-sm shadow-glow">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl flex items-center justify-center gap-2">
              <Send className="h-6 w-6" />
              Spread Gratitude
            </CardTitle>
            <CardDescription>
              {isBatchMode 
                ? 'Review and customize your batch thank you campaign - turning traditional card costs into charitable donations'
                : 'Replace traditional thank you cards with digital ones and donate what you would have spent on cards, stamps, and time to charity'
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Value Proposition Callout */}
            <div className="bg-gradient-primary/10 border border-primary/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Heart className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-primary mb-1">
                    Your Thank You, Reimagined
                  </h4>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    Traditional thank you cards cost $3-8 each (card + stamp + time). Instead of that expense, 
                    send a beautiful digital card and donate that money to charity - turning your gratitude into greater good.
                  </p>
                </div>
              </div>
            </div>

            {/* Card Design Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Digital Card Design</h3>
                  <p className="text-sm text-muted-foreground">
                    {cardDesign ? 'Your custom digital card is ready!' : 'Create a beautiful digital card (no paper needed!)'}
                  </p>
                </div>
                <Link to="/design-card">
                  <Button variant="outline" size="sm">
                    <Palette className="h-4 w-4 mr-2" />
                    {cardDesign ? 'Edit Design' : 'Design Card'}
                  </Button>
                </Link>
              </div>
              
              {cardDesign && (
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center gap-4">
                    {cardDesign.photo && (
                      <img 
                        src={cardDesign.photo.preview} 
                        alt="Card preview" 
                        className="w-16 h-20 object-cover rounded shadow-sm"
                      />
                    )}
                    <div className="flex-1">
                      <p className="font-medium text-sm">{cardDesign.template?.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Custom photo • Personalized message • Eco-friendly
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* CSV Upload Section */}
            {!isBatchMode && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Send to Multiple People
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Upload a spreadsheet to send thank you cards to many people at once
                    </p>
                  </div>
                </div>
                
                <div className="bg-muted/50 rounded-lg p-6 border-2 border-dashed border-muted-foreground/25">
                  <div className="text-center space-y-4">
                    <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Upload className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Upload Your Guest List</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        Upload a CSV file with guest names, emails, and personalized messages
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".csv"
                        onChange={handleFileUpload}
                        className="hidden"
                        disabled={isProcessingCSV}
                      />
                      <Button
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isProcessingCSV}
                        className="gap-2"
                      >
                        {isProcessingCSV ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Upload className="h-4 w-4" />
                            Upload CSV
                          </>
                        )}
                      </Button>
                      <Button variant="ghost" onClick={handleDownloadTemplate} className="gap-2">
                        <Download className="h-4 w-4" />
                        Download Template
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Batch Preview Section */}
            {isBatchMode && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Batch Campaign Preview
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {batchData.length} recipients ready to receive thank you cards
                    </p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={switchToSingleMode}>
                    Switch to Single Card
                  </Button>
                </div>

                {/* Validation Results */}
                {validationResults && validationResults.invalid.length > 0 && (
                  <Alert className="border-orange-200 bg-orange-50">
                    <AlertTriangle className="h-4 w-4 text-orange-600" />
                    <AlertDescription className="text-orange-800">
                      {validationResults.invalid.length} entries have issues and will be skipped. 
                      {validationResults.valid.length} valid entries will be processed.
                    </AlertDescription>
                  </Alert>
                )}

                {validationResults && validationResults.valid.length > 0 && (
                  <Alert className="border-green-200 bg-green-50">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">
                      {validationResults.valid.length} recipients are ready to receive digital thank you cards.
                    </AlertDescription>
                  </Alert>
                )}
                
                <div className="bg-muted/50 rounded-lg p-4 max-h-48 overflow-y-auto">
                  <div className="space-y-2">
                    {batchData.slice(0, 5).map((guest, index) => (
                      <div key={index} className="flex justify-between items-center text-sm">
                        <span className="font-medium">{guest.guestName}</span>
                        <span className="text-muted-foreground">{guest.emailAddress}</span>
                      </div>
                    ))}
                    {batchData.length > 5 && (
                      <div className="text-center text-sm text-muted-foreground py-2">
                        ...and {batchData.length - 5} more recipients
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isBatchMode && (
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
              )}

              <div className="space-y-2">
                <Label htmlFor="message">
                  {isBatchMode ? 'Global Thank You Message *' : 'Your Thank You Message *'}
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder={
                    isBatchMode 
                      ? "This message will be sent to all recipients (individual messages from CSV will be used if provided)"
                      : cardDesign ? "Your custom message from card design" : "Write your heartfelt thank you message here..."
                  }
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="min-h-[120px] resize-none"
                />
                {cardDesign && !isBatchMode && (
                  <p className="text-xs text-muted-foreground">
                    💡 This message was imported from your card design. You can edit it here.
                  </p>
                )}
                {isBatchMode && (
                  <p className="text-xs text-muted-foreground">
                    💡 Individual messages from your CSV will be used when available, otherwise this global message will be sent.
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="donationAmount">Charitable Donation Amount</Label>
                  <Input
                    id="donationAmount"
                    name="donationAmount"
                    type="number"
                    placeholder="5"
                    value={formData.donationAmount}
                    onChange={handleInputChange}
                    className="h-11"
                    min="1"
                  />
                  <p className="text-sm text-muted-foreground">
                    Suggested: $5 (typical cost of card + stamp + time)
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="charity">Charity Beneficiary</Label>
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
                    Where should your card savings go to make a difference?
                  </p>
                </div>
              </div>

              <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isBatchMode ? 'Sending Digital Cards & Donations...' : 'Sending Digital Card & Donation...'}
                  </>
                ) : (
                  <>
                    {isBatchMode ? <Users className="mr-2 h-4 w-4" /> : <Send className="mr-2 h-4 w-4" />}
                    {isBatchMode 
                      ? `Send ${batchData.length} Digital Cards & Donations`
                      : 'Send Digital Thank You & Donation'
                    }
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