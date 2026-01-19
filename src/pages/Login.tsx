import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BlurBackground } from "@/components/BlurBackground";
import { GlowingButton } from "@/components/GlowingButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { Heart, Lock, User, Loader2, ArrowRight, Building2, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"patient" | "hospital" | "admin">("patient");
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const success = await login(username, password);

    if (success) {
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
      
      // Navigate based on selected role
      // TODO: In production, implement proper role-based access control (RBAC)
      // - Validate selected role against user's actual role from backend
      // - Store role in user context/session
      // - Implement middleware to protect dashboard routes
      // Current implementation is for demonstration purposes only
      if (role === "hospital") {
        navigate("/hospital-dashboard");
      } else if (role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/predict");
      }
    } else {
      toast({
        title: "Login failed",
        description: "Invalid username or password.",
        variant: "destructive",
      });
    }
  };

  const roles = [
    {
      id: "patient" as const,
      icon: User,
      label: "Patient",
      description: "Access predictions and health reports",
    },
    {
      id: "hospital" as const,
      icon: Building2,
      label: "Hospital",
      description: "Manage local training and data",
    },
    {
      id: "admin" as const,
      icon: Settings,
      label: "Admin",
      description: "System administration and oversight",
    },
  ];

  return (
    <BlurBackground variant="gradient">
      <div className="min-h-screen pt-20 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 mb-4">
              <Heart className="w-8 h-8 text-secondary animate-heart-beat" />
            </div>
            <h1 className="text-3xl font-bold">Welcome Back</h1>
            <p className="text-muted-foreground mt-2">
              Login to access heart disease prediction
            </p>
          </div>

          {/* Login Form */}
          <div className="glass-card rounded-3xl p-8 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            {/* Role Selector */}
            <div className="mb-6">
              <Label className="mb-3 block">Select Role</Label>
              <div className="grid grid-cols-3 gap-3">
                {roles.map((roleOption) => (
                  <Card
                    key={roleOption.id}
                    className={`cursor-pointer p-4 text-center transition-all hover:scale-105 ${
                      role === roleOption.id
                        ? "bg-primary/10 border-2 border-primary"
                        : "glass-card hover:bg-muted/50"
                    }`}
                    onClick={() => setRole(roleOption.id)}
                  >
                    <roleOption.icon
                      className={`w-6 h-6 mx-auto mb-2 ${
                        role === roleOption.id ? "text-primary" : "text-muted-foreground"
                      }`}
                    />
                    <p
                      className={`text-sm font-medium ${
                        role === roleOption.id ? "text-primary" : ""
                      }`}
                    >
                      {roleOption.label}
                    </p>
                  </Card>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                {roles.find((r) => r.id === role)?.description}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="johndoe"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10 h-12 bg-background/50"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

          {/* Demo credentials */}
          <div className="mt-6 p-4 glass-card rounded-xl animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <p className="text-sm text-center text-muted-foreground">
              <span className="font-medium text-foreground">Demo:</span> Register a new account to test the system
            </p>
          </div>
        </div>
      </div>
    </BlurBackground>
  );
}
