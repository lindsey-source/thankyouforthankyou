import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users, DollarSign, TrendingUp, Plus, BarChart3, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Dashboard = () => {
  const { signOut } = useAuth();
  // Mock data - in real app this would come from API
  const stats = {
    thankYousSent: 45,
    totalDonated: 225,
    peopleReached: 45,
    charitiesSupported: 8
  };

  const recentCampaigns = [
    {
      id: 1,
      name: "Customer Appreciation 2024",
      recipients: 20,
      donated: 100,
      status: "Completed",
      date: "Dec 20, 2024"
    },
    {
      id: 2, 
      name: "Team Holiday Thanks",
      recipients: 15,
      donated: 75,
      status: "In Progress",
      date: "Dec 18, 2024"
    },
    {
      id: 3,
      name: "Volunteer Recognition",
      recipients: 10,
      donated: 50,
      status: "Completed", 
      date: "Dec 15, 2024"
    }
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Navigation */}
      <nav className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Heart className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Thank You for Thank You
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/settings">
                <Button variant="ghost">Settings</Button>
              </Link>
              <Link to="/help">
                <Button variant="ghost">Help</Button>
              </Link>
              <Button variant="outline" onClick={signOut}>Sign Out</Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, Sarah! 👋
          </h1>
          <p className="text-muted-foreground text-lg mb-6">
            Ready to make someone's day? Let's send some gratitude!
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/send-thanks">
              <Button variant="hero" size="lg" className="gap-2">
                <Plus className="h-5 w-5" />
                Send New Thank-You Campaign
              </Button>
            </Link>
            <Button variant="warm" size="lg" className="gap-2">
              <BarChart3 className="h-5 w-5" />
              View All Campaigns
            </Button>
          </div>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-card border-primary/20 hover:shadow-warm transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">Thank-Yous Sent</p>
                  <p className="text-3xl font-bold text-primary">{stats.thankYousSent}</p>
                </div>
                <Heart className="h-8 w-8 text-primary/60" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-accent/20 hover:shadow-soft transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">Total Donated</p>
                  <p className="text-3xl font-bold text-accent">${stats.totalDonated}</p>
                </div>
                <DollarSign className="h-8 w-8 text-accent/60" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-blue-500/20 hover:shadow-soft transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">People Reached</p>
                  <p className="text-3xl font-bold text-blue-600">{stats.peopleReached}</p>
                </div>
                <Users className="h-8 w-8 text-blue-500/60" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-orange-500/20 hover:shadow-soft transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">Charities Supported</p>
                  <p className="text-3xl font-bold text-orange-600">{stats.charitiesSupported}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-orange-500/60" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Campaigns */}
          <div className="lg:col-span-2">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Recent Campaigns</CardTitle>
                <CardDescription>
                  Your latest thank-you campaigns and their impact
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentCampaigns.map((campaign) => (
                    <div key={campaign.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground">{campaign.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {campaign.recipients} recipients • ${campaign.donated} donated • {campaign.date}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          campaign.status === 'Completed' 
                            ? 'bg-accent/10 text-accent' 
                            : 'bg-primary/10 text-primary'
                        }`}>
                          {campaign.status}
                        </span>
                        <Link to={`/campaign/${campaign.id}`}>
                          <Button variant="ghost" size="sm">View Details</Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <Button variant="outline" className="w-full">
                    View All Campaigns
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions & Tips */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/send-thanks">
                  <Button variant="default" className="w-full justify-start gap-3">
                    <Plus className="h-4 w-4" />
                    New Campaign
                  </Button>
                </Link>
                <Link to="/csv-upload">
                  <Button variant="outline" className="w-full justify-start gap-3">
                    <FileText className="h-4 w-4" />
                    Upload Guest List (CSV)
                  </Button>
                </Link>
                <Link to="/analytics">
                  <Button variant="outline" className="w-full justify-start gap-3">
                    <BarChart3 className="h-4 w-4" />
                    View Analytics
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Inspiration Quote */}
            <Card className="bg-gradient-primary text-white">
              <CardContent className="p-6">
                <blockquote className="text-center">
                  <p className="text-lg font-medium mb-3">
                    "No one has ever become poor by giving."
                  </p>
                  <footer className="text-white/80">— Anne Frank</footer>
                </blockquote>
              </CardContent>
            </Card>

            {/* Impact Summary */}
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-lg">Your Impact This Month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Cards Sent</span>
                    <span className="font-semibold">25</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Amount Donated</span>
                    <span className="font-semibold text-accent">$125</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Charities Helped</span>
                    <span className="font-semibold">5</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground text-center">
                    You're making a real difference! 🌟
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;