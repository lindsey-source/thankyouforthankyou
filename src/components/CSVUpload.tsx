import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, FileText, Download, AlertTriangle, CheckCircle, Users, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { parseCSVFile, validateGuestData, generateCSVTemplate, type GuestGiftData } from '@/lib/csvUtils';
import { useNavigate } from 'react-router-dom';

interface CSVUploadProps {
  onUploadComplete?: (data: GuestGiftData[]) => void;
}

const CSVUpload: React.FC<CSVUploadProps> = ({ onUploadComplete }) => {
  const [uploadedData, setUploadedData] = useState<GuestGiftData[]>([]);
  const [validationResults, setValidationResults] = useState<{ valid: GuestGiftData[], invalid: { row: number, errors: string[] }[] } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

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

    setIsProcessing(true);
    try {
      const data = await parseCSVFile(file);
      const results = validateGuestData(data);
      
      setUploadedData(data);
      setValidationResults(results);
      
      toast({
        title: "CSV Processed",
        description: `Found ${results.valid.length} valid entries${results.invalid.length > 0 ? ` and ${results.invalid.length} invalid entries` : ''}.`,
      });
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: error instanceof Error ? error.message : "Failed to process CSV file",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadTemplate = () => {
    generateCSVTemplate();
    toast({
      title: "Template Downloaded",
      description: "CSV template has been downloaded to your computer.",
    });
  };

  const handleCreateIndividualCards = () => {
    if (!validationResults?.valid.length) return;
    
    // Navigate to batch card creation flow
    navigate('/design-card', { 
      state: { 
        batchData: validationResults.valid,
        mode: 'individual'
      } 
    });
  };

  const handleCreateBatchCampaign = () => {
    if (!validationResults?.valid.length) return;
    
    // Navigate to batch sending flow
    navigate('/send-thanks', { 
      state: { 
        batchData: validationResults.valid,
        mode: 'batch'
      } 
    });
  };

  return (
    <div className="space-y-6">
      {/* Download Template Section */}
      <Card className="bg-white/95 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Download className="h-5 w-5" />
            Step 1: Download Template
          </CardTitle>
          <CardDescription>
            Get our CSV template to organize your guest and gift information
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Button 
            onClick={handleDownloadTemplate}
            variant="outline" 
            size="lg"
            className="gap-2"
          >
            <FileText className="h-4 w-4" />
            Download CSV Template
          </Button>
          <p className="text-sm text-muted-foreground mt-3">
            Fill in your guest names, emails, gifts, and custom messages
          </p>
        </CardContent>
      </Card>

      {/* Upload Section */}
      <Card className="bg-white/95 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Upload className="h-5 w-5" />
            Step 2: Upload Your Completed File
          </CardTitle>
          <CardDescription>
            Upload your filled CSV to create thank-you cards
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="hidden"
            />
            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="hero"
              size="lg"
              disabled={isProcessing}
              className="gap-2"
            >
              {isProcessing ? (
                <>Processing...</>
              ) : (
                <>
                  <Upload className="h-4 w-4" />
                  Choose CSV File
                </>
              )}
            </Button>
            <p className="text-sm text-muted-foreground mt-3">
              Supports CSV files with guest info and gift details
            </p>
          </div>

          {/* Validation Results */}
          {validationResults && (
            <div className="mt-6 space-y-4">
              {validationResults.valid.length > 0 && (
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    <strong>{validationResults.valid.length} valid entries</strong> ready to send
                  </AlertDescription>
                </Alert>
              )}

              {validationResults.invalid.length > 0 && (
                <Alert className="border-orange-200 bg-orange-50">
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                  <AlertDescription className="text-orange-800">
                    <strong>{validationResults.invalid.length} entries need attention:</strong>
                    <ul className="mt-2 space-y-1">
                      {validationResults.invalid.slice(0, 3).map((item, index) => (
                        <li key={index} className="text-sm">
                          Row {item.row}: {item.errors.join(', ')}
                        </li>
                      ))}
                      {validationResults.invalid.length > 3 && (
                        <li className="text-sm">...and {validationResults.invalid.length - 3} more</li>
                      )}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}

              {/* Action Buttons */}
              {validationResults.valid.length > 0 && (
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button
                    onClick={handleCreateIndividualCards}
                    variant="default"
                    className="flex-1 gap-2"
                  >
                    <Users className="h-4 w-4" />
                    Create Individual Cards
                  </Button>
                  <Button
                    onClick={handleCreateBatchCampaign}
                    variant="hero"
                    className="flex-1 gap-2"
                  >
                    <Send className="h-4 w-4" />
                    Create Batch Campaign
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Preview Section */}
      {validationResults?.valid.length > 0 && (
        <Card className="bg-white/95 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Preview Your Data</CardTitle>
            <CardDescription>
              First {Math.min(3, validationResults.valid.length)} entries from your upload
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {validationResults.valid.slice(0, 3).map((guest, index) => (
                <div key={index} className="p-3 border border-border rounded-lg bg-muted/30">
                  <div className="font-medium text-sm">{guest.guestName}</div>
                  <div className="text-sm text-muted-foreground">{guest.emailAddress}</div>
                  <div className="text-sm text-muted-foreground">Gift: {guest.giftDescription}</div>
                  {guest.personalNote && (
                    <div className="text-sm text-muted-foreground mt-1">
                      Note: "{guest.personalNote.substring(0, 60)}..."
                    </div>
                  )}
                </div>
              ))}
              {validationResults.valid.length > 3 && (
                <div className="text-center text-sm text-muted-foreground py-2">
                  ...and {validationResults.valid.length - 3} more entries
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CSVUpload;