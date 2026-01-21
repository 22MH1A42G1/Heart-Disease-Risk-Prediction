import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BlurBackground } from "@/components/BlurBackground";
import { GlowingButton } from "@/components/GlowingButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { Activity, Building2, User, IdCard, Loader2, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Register() {
  const [hospitalName, setHospitalName] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [registrationId, setRegistrationId] = useState("");
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const success = await register(hospitalName, doctorName, registrationId);

    if (success) {
      toast({
        title: "Registration successful!",
        description: "Please login with your Registration ID.",
      });
      navigate("/login");
    } else {
      toast({
        title: "Registration failed",
        description: "Registration ID already exists.",
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
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary/20 to-primary/20 mb-4">
              <Activity className="w-8 h-8 text-secondary" />
            </div>
            <h1 className="text-3xl font-bold">Create Account</h1>
            <p className="text-muted-foreground mt-2">
              Join HeartFL for accurate heart disease predictions
            </p>
          </div>

          {/* Register Form */}
          <div className="glass-card rounded-3xl p-8 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="hospitalName">Hospital Name</Label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="hospitalName"
                    type="text"
                    placeholder="City General Hospital"
                    value={hospitalName}
                    onChange={(e) => setHospitalName(e.target.value)}
                    className="pl-10 h-12 bg-background/50"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="doctorName">Doctor Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="doctorName"
                    type="text"
                    placeholder="Dr. John Smith"
                    value={doctorName}
                    onChange={(e) => setDoctorName(e.target.value)}
                    className="pl-10 h-12 bg-background/50"
                    required
                  />
                </div>
              </div>

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
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </GlowingButton>
            </form>

            <div className="mt-6 text-center">
              <p className="text-muted-foreground">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-primary font-semibold hover:underline"
                >
                  Login here
                </Link>
              </p>
            </div>
          </div>

        </div>
      </div>
    </BlurBackground>
  );
}
