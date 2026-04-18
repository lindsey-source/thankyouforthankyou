import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, DollarSign, Mail, Plus, LogOut, Sparkles, Download, Palette, Calendar } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from "date-fns";
import { generateCSVTemplate } from "@/lib/csvUtils";
import { toast } from "sonner";

interface CampaignRow {
  id: string;
  message_headline: string | null;
  created_at: string | null;
  sent_at: string | null;
  donation_amount: number | null;
}

const Dashboard = () => {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [campaigns, setCampaigns] = useState<CampaignRow[]>([]);
  const [totalDonated, setTotalDonated] = useState(0);

  const handleSignOut = async () => {
    await signOut();
    navigate("/", { replace: true });
  };

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    (async () => {
      setLoading(true);
      const { data: cards } = await supabase
        .from("user_cards")
        .select("id, message_headline, created_at, sent_at, donation_amount")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (cancelled) return;
      const list = (cards ?? []) as CampaignRow[];
      setCampaigns(list);

      // Sum confirmed transactions for these cards
      const cardIds = list.map((c) => c.id);
      let donated = 0;
      if (cardIds.length > 0) {
        const { data: txs } = await supabase
          .from("transactions")
          .select("amount, status, user_card_id")
          .in("user_card_id", cardIds);
        donated = (txs ?? [])
          .filter((t) => t.status !== "failed")
          .reduce((sum, t) => sum + Number(t.amount ?? 0), 0);
      }
      // Fallback: use donation_amount on cards if no transactions yet
      if (donated === 0) {
        donated = list.reduce((s, c) => s + Number(c.donation_amount ?? 0), 0);
      }
      setTotalDonated(donated);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [user]);

  const sentCount = campaigns.filter((c) => c.sent_at).length;
  const totalCards = campaigns.length;
  const firstName = user?.user_metadata?.name?.split(" ")[0];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-background/80 backdrop-blur-sm border-b border-border sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/dashboard" className="flex items-center gap-2">
              <Heart className="h-7 w-7 text-primary" fill="currentColor" />
              <span className="text-xl font-bold text-foreground">
                Thank You for Thank You
              </span>
            </Link>
            <div className="flex items-center gap-2">
              <Link to="/settings" className="hidden sm:inline">
                <Button variant="ghost" size="sm">Settings</Button>
              </Link>
              {user?.email && (
                <span className="text-sm text-muted-foreground hidden md:inline mr-2">
                  {user.email}
                </span>
              )}
              <Button variant="ghost" size="sm" onClick={handleSignOut} className="gap-2">
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Sign Out</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Welcome */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-secondary mb-2">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium tracking-wide uppercase">
              Welcome back
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-3 tracking-tight">
            Hello{firstName ? `, ${firstName}` : ""} 👋
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            {user?.email && (
              <>Signed in as <span className="font-medium text-foreground">{user.email}</span>. </>
            )}
            Ready to spread a little gratitude today?
          </p>
          <div className="mt-6">
            <Link to="/create">
              <Button variant="hero" size="lg" className="gap-2">
                <Plus className="h-5 w-5" />
                Create New Campaign
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          <Card className="border-primary/20 bg-gradient-card hover:shadow-warm transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium mb-1">
                    Total Cards Sent
                  </p>
                  {loading ? (
                    <Skeleton className="h-9 w-16" />
                  ) : (
                    <p className="text-4xl font-bold text-primary">{sentCount}</p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    {totalCards > sentCount
                      ? `${totalCards - sentCount} in draft`
                      : "All caught up"}
                  </p>
                </div>
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mail className="h-7 w-7 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-secondary/30 bg-gradient-card hover:shadow-soft transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium mb-1">
                    Charity Donations
                  </p>
                  {loading ? (
                    <Skeleton className="h-9 w-24" />
                  ) : (
                    <p className="text-4xl font-bold text-secondary">
                      ${totalDonated.toFixed(2)}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    Given on your behalf
                  </p>
                </div>
                <div className="h-14 w-14 rounded-full bg-secondary/15 flex items-center justify-center">
                  <DollarSign className="h-7 w-7 text-secondary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Past Campaigns */}
        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="text-2xl">Your Campaigns</CardTitle>
            <CardDescription>
              A history of every thank-you you've sent.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">
                {[0, 1, 2].map((i) => (
                  <Skeleton key={i} className="h-20 w-full" />
                ))}
              </div>
            ) : campaigns.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent/40 mb-5">
                  <Heart className="h-8 w-8 text-primary" fill="currentColor" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Your gratitude journey starts here
                </h3>
                <p className="text-muted-foreground max-w-sm mx-auto mb-6">
                  You haven't sent any thank-yous yet. Create your first campaign and
                  brighten someone's day.
                </p>
                <Link to="/create">
                  <Button variant="hero" size="lg" className="gap-2">
                    <Plus className="h-5 w-5" />
                    Create Your First Campaign
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {campaigns.map((c) => (
                  <Link
                    key={c.id}
                    to={`/campaign/${c.id}`}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted hover:border-primary/30 transition-all"
                  >
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-foreground truncate">
                        {c.message_headline || "Untitled campaign"}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {c.created_at
                          ? `Created ${formatDistanceToNow(new Date(c.created_at), { addSuffix: true })}`
                          : "Recently created"}
                        {c.donation_amount && Number(c.donation_amount) > 0 && (
                          <> • ${Number(c.donation_amount).toFixed(2)} donated</>
                        )}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        c.sent_at
                          ? "bg-secondary/15 text-secondary"
                          : "bg-accent/40 text-accent-foreground"
                      }`}
                    >
                      {c.sent_at ? "Sent" : "Draft"}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
