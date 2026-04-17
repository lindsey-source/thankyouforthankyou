import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
        data: { name },
      },
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Account created!");
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
            to="/"
            className="inline-flex items-center gap-2 text-sm hover:opacity-70 transition-opacity"
            style={{ color: "#8b4a5a" }}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
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
            className="text-2xl mb-6 text-center"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 500,
              color: "#2d2420",
            }}
          >
            Create your account
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" required value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-md text-sm font-medium transition-opacity hover:opacity-90 disabled:opacity-60"
              style={{ backgroundColor: "#c17b8a", color: "#ffffff" }}
            >
              {loading ? "Creating account..." : "Sign Up"}
            </button>
          </form>
          <p className="text-sm text-center mt-6 text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="font-medium hover:underline" style={{ color: "#8b4a5a" }}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
