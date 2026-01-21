import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BlurBackground } from "@/components/BlurBackground";
import { GlowingButton } from "@/components/GlowingButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { Activity, IdCard, Loader2, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const [registrationId, setRegistrationId] = useState("");
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const success = await login(registrationId);

    if (success) {
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
      
      navigate("/hospital-dashboard");
    } else {
      toast({
        title: "Login failed",
        description: "Invalid Registration ID. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <BlurBackground variant="gradient">
      <div className="min-h-screen pt-20 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 mb-4">
              <Activity className="w-8 h-8 text-secondary" />
            </div>
            <h1 className="text-3xl font-bold">Welcome Back</h1>
            <p className="text-muted-foreground mt-2">
              Login to access HeartFL Hospital System
            </p>
          </div>

          {/* Login Form */}
          <div className="glass-card rounded-3xl p-8 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="registrationId">Registration ID</Label>
                <div className="relative">
                  <IdCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="registrationId"
                    type="text"
                    placeholder="HOSP-12345"
                    value={registrationId}
                    onChange={(e) => setRegistrationId(e.target.value)}
                    className="pl-10 h-12 bg-background/50"
                    required
                  />
                </div>
              </div>

              <GlowingButton
                type="submit"
                className="w-full h-12 text-lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  <>
                    Login
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </GlowingButton>
            </form>

            <div className="mt-6 text-center">
              <p className="text-muted-foreground">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-primary font-semibold hover:underline"
                >
                  Register here
                </Link>
              </p>
            </div>
          </div>

        </div>
      </div>
    </BlurBackground>
  );
}
