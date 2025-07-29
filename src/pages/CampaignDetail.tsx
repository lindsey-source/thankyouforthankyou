import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Heart, 
  Users, 
  DollarSign, 
  Calendar, 
  Mail, 
  CheckCircle,
  Clock,
  Download,
  Edit,
  Share2
} from "lucide-react";

const CampaignDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock campaign data - in real app this would come from API based on ID
  const campaignData = {
    "1": {
      id: 1,
      name: "Customer Appreciation 2024",
      description: "A heartfelt thank you campaign for our loyal customers who made this year amazing.",
      recipients: 20,
      donated: 100,
      status: "Completed",
      date: "Dec 20, 2024",
      createdDate: "Dec 18, 2024",
      charity: "Local Food Bank",
      donationPerCard: 5,
      cardTemplate: "Elegant Gold",
      personalMessage: "Thank you for being such an amazing customer this year. Your support means the world to us!",
      recipientList: [
        { name: "John Smith", email: "john@example.com", status: "Delivered", deliveryDate: "Dec 20, 2024" },
        { name: "Sarah Johnson", email: "sarah@example.com", status: "Delivered", deliveryDate: "Dec 20, 2024" },
        { name: "Mike Chen", email: "mike@example.com", status: "Delivered", deliveryDate: "Dec 20, 2024" },
        { name: "Emily Davis", email: "emily@example.com", status: "Delivered", deliveryDate: "Dec 20, 2024" },
        { name: "David Wilson", email: "david@example.com", status: "Delivered", deliveryDate: "Dec 20, 2024" },
      ]
    },
    "2": {
      id: 2,
      name: "Team Holiday Thanks",
      description: "Holiday appreciation for our amazing team members who worked hard all year.",
      recipients: 15,
      donated: 75,
      status: "In Progress",
      date: "Dec 18, 2024",
      createdDate: "Dec 16, 2024",
      charity: "Children's Hospital Foundation",
      donationPerCard: 5,
      cardTemplate: "Winter Wonderland",
      personalMessage: "Wishing you and your family a wonderful holiday season. Thank you for all your hard work!",
      recipientList: [
        { name: "Alice Brown", email: "alice@company.com", status: "Delivered", deliveryDate: "Dec 18, 2024" },
        { name: "Bob Martin", email: "bob@company.com", status: "Delivered", deliveryDate: "Dec 18, 2024" },
        { name: "Carol White", email: "carol@company.com", status: "Scheduled", deliveryDate: "Dec 19, 2024" },
        { name: "Daniel Green", email: "daniel@company.com", status: "Scheduled", deliveryDate: "Dec 19, 2024" },
        { name: "Eva Thompson", email: "eva@company.com", status: "Scheduled", deliveryDate: "Dec 19, 2024" },
      ]
    },
    "3": {
      id: 3,
      name: "Volunteer Recognition",
      description: "Recognizing our dedicated volunteers who give their time to make a difference.",
      recipients: 10,
      donated: 50,
      status: "Completed",
      date: "Dec 15, 2024",
      createdDate: "Dec 13, 2024",
      charity: "Community Garden Project",
      donationPerCard: 5,
      cardTemplate: "Nature Inspired",
      personalMessage: "Your volunteer work has made such a positive impact in our community. Thank you!",
      recipientList: [
        { name: "Grace Lee", email: "grace@volunteer.org", status: "Delivered", deliveryDate: "Dec 15, 2024" },
        { name: "Henry Rodriguez", email: "henry@volunteer.org", status: "Delivered", deliveryDate: "Dec 15, 2024" },
        { name: "Ivy Cooper", email: "ivy@volunteer.org", status: "Delivered", deliveryDate: "Dec 15, 2024" },
        { name: "Jack Parker", email: "jack@volunteer.org", status: "Delivered", deliveryDate: "Dec 15, 2024" },
      ]
    }
  };

  const campaign = id && campaignData[id as keyof typeof campaignData];

  // Debug logging
  console.log("Campaign ID from URL:", id);
  console.log("Available campaign IDs:", Object.keys(campaignData));
  console.log("Found campaign:", campaign);

  if (!campaign) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Campaign Not Found</h1>
          <p className="text-muted-foreground mb-6">The campaign you're looking for doesn't exist.</p>
          <Link to="/dashboard">
            <Button>Return to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed':
        return <Badge className="bg-accent/10 text-accent border-accent/20">Completed</Badge>;
      case 'In Progress':
        return <Badge className="bg-primary/10 text-primary border-primary/20">In Progress</Badge>;
      case 'Scheduled':
        return <Badge className="bg-orange-100 text-orange-700 border-orange-200">Scheduled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getRecipientStatusBadge = (status: string) => {
    switch (status) {
      case 'Delivered':
        return (
          <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
            <CheckCircle className="h-3 w-3 mr-1" />
            Delivered
          </Badge>
        );
      case 'Scheduled':
        return (
          <Badge variant="outline" className="bg-orange-100 text-orange-700 border-orange-200">
            <Clock className="h-3 w-3 mr-1" />
            Scheduled
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Navigation */}
      <nav className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => navigate('/dashboard')} className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center gap-2">
                <Heart className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  Campaign Details
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Edit className="h-4 w-4" />
                Edit
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Campaign Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">{campaign.name}</h1>
              <p className="text-muted-foreground text-lg">{campaign.description}</p>
            </div>
            {getStatusBadge(campaign.status)}
          </div>
        </div>

        {/* Campaign Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-card border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">Recipients</p>
                  <p className="text-3xl font-bold text-primary">{campaign.recipients}</p>
                </div>
                <Users className="h-8 w-8 text-primary/60" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-accent/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">Total Donated</p>
                  <p className="text-3xl font-bold text-accent">${campaign.donated}</p>
                </div>
                <DollarSign className="h-8 w-8 text-accent/60" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-blue-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">Per Card</p>
                  <p className="text-3xl font-bold text-blue-600">${campaign.donationPerCard}</p>
                </div>
                <Heart className="h-8 w-8 text-blue-500/60" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-orange-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">Created</p>
                  <p className="text-lg font-bold text-orange-600">{campaign.createdDate}</p>
                </div>
                <Calendar className="h-8 w-8 text-orange-500/60" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recipients List */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-white">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recipients</CardTitle>
                    <CardDescription>
                      Status and delivery information for each recipient
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Download className="h-4 w-4" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {campaign.recipientList.map((recipient, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white font-semibold">
                          {recipient.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">{recipient.name}</h4>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {recipient.email}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        {getRecipientStatusBadge(recipient.status)}
                        <p className="text-xs text-muted-foreground mt-1">{recipient.deliveryDate}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Campaign Info Sidebar */}
          <div className="space-y-6">
            {/* Campaign Details */}
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Campaign Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Charity Beneficiary</label>
                  <p className="text-foreground font-semibold">{campaign.charity}</p>
                </div>
                <Separator />
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Card Template</label>
                  <p className="text-foreground font-semibold">{campaign.cardTemplate}</p>
                </div>
                <Separator />
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Delivery Date</label>
                  <p className="text-foreground font-semibold">{campaign.date}</p>
                </div>
                <Separator />
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Created Date</label>
                  <p className="text-foreground font-semibold">{campaign.createdDate}</p>
                </div>
              </CardContent>
            </Card>

            {/* Personal Message */}
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Personal Message</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/50 p-4 rounded-lg border-l-4 border-primary">
                  <p className="text-foreground italic">"{campaign.personalMessage}"</p>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="default" className="w-full justify-start gap-3">
                  <Edit className="h-4 w-4" />
                  Edit Campaign
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3">
                  <Download className="h-4 w-4" />
                  Download Report
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3">
                  <Share2 className="h-4 w-4" />
                  Share Campaign
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetail;