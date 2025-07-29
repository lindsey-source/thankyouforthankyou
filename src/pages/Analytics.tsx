import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, ArrowLeft, TrendingUp, Users, Mail, DollarSign, Calendar, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

const Analytics = () => {
  // Mock data - will be replaced with real data once backend is fully connected
  const analyticsData = {
    totalSent: 1247,
    totalDonated: 15680,
    peopleReached: 892,
    responseRate: 67,
    campaignStats: [
      { name: 'Wedding Thank You', sent: 340, donated: 4500, date: '2024-01-15' },
      { name: 'Birthday Celebration', sent: 156, donated: 2100, date: '2024-01-20' },
      { name: 'Baby Shower', sent: 89, donated: 1200, date: '2024-01-25' },
    ],
    monthlyTrends: [
      { month: 'Jan', sent: 245, donated: 3200 },
      { month: 'Feb', sent: 312, donated: 4100 },
      { month: 'Mar', sent: 389, donated: 5200 },
      { month: 'Apr', sent: 301, donated: 3100 },
    ]
  };

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Your Impact Analytics
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Track your gratitude journey and see the difference you're making
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white/90">Thank-Yous Sent</CardTitle>
              <Mail className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{analyticsData.totalSent}</div>
              <p className="text-xs text-white/70">+23% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white/90">Total Donated</CardTitle>
              <DollarSign className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">${analyticsData.totalDonated.toLocaleString()}</div>
              <p className="text-xs text-white/70">+18% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white/90">People Reached</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{analyticsData.peopleReached}</div>
              <p className="text-xs text-white/70">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white/90">Response Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{analyticsData.responseRate}%</div>
              <p className="text-xs text-white/70">+5% from last month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Campaign Performance */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Campaign Performance</CardTitle>
              <CardDescription className="text-white/70">
                Your recent campaign results
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.campaignStats.map((campaign, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-white/5">
                    <div>
                      <h4 className="font-medium text-white">{campaign.name}</h4>
                      <p className="text-sm text-white/70">{campaign.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-white/70">{campaign.sent} sent</p>
                      <p className="font-medium text-white">${campaign.donated}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Monthly Trends */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Monthly Trends</CardTitle>
              <CardDescription className="text-white/70">
                Your gratitude impact over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.monthlyTrends.map((month, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-white/5">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span className="font-medium text-white">{month.month}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-white/70">{month.sent} cards</p>
                      <p className="font-medium text-white">${month.donated}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Export Options */}
        <div className="mt-12 text-center">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 inline-block">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Export Your Data</h3>
              <div className="flex gap-4">
                <Button variant="secondary" className="gap-2">
                  <Download className="h-4 w-4" />
                  Export CSV
                </Button>
                <Button variant="outline" className="gap-2 border-white/20 text-white hover:bg-white/10">
                  <Download className="h-4 w-4" />
                  Generate Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Analytics;