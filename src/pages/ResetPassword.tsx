import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") {
        setReady(true);
      }
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setReady(true);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (password !== confirm) {
      toast.error("Passwords don't match");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Password updated. You're signed in.");
    navigate("/dashboard", { replace: true });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: "#faf7f2" }}
    >
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-sm hover:opacity-70 transition-opacity"
            style={{ color: "#8b4a5a" }}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Sign In
          </Link>
        </div>
        <div
          className="rounded-2xl bg-white p-8"
          style={{
            border: "1px solid #ede8e3",
            boxShadow: "0 12px 40px -16px rgba(45,36,32,0.15)",
          }}
        >
          <div className="flex justify-center mb-6">
            <img
              src="/logo.png"
              alt="Thank You for Thank You"
              style={{ height: "80px", mixBlendMode: "multiply" }}
              className="w-auto"
            />
          </div>
          <h1
            className="text-2xl mb-2 text-center"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 500,
              color: "#2d2420",
            }}
          >
            Reset your password
          </h1>
          <p className="text-sm text-muted-foreground text-center mb-6">
            {ready ? "Enter a new password for your account." : "Open the link from your email to continue."}
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} disabled={!ready} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm">Confirm Password</Label>
              <Input id="confirm" type="password" required value={confirm} onChange={(e) => setConfirm(e.target.value)} disabled={!ready} />
            </div>
            <button
              type="submit"
              disabled={loading || !ready}
              className="w-full py-2.5 rounded-md text-sm font-medium transition-opacity hover:opacity-90 disabled:opacity-60"
              style={{ backgroundColor: "#c17b8a", color: "#ffffff" }}
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
