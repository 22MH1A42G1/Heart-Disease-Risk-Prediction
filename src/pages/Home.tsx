import { BlurBackground } from "@/components/BlurBackground";
import { GlowingButton } from "@/components/GlowingButton";
import { Link } from "react-router-dom";
import { Heart, Shield, Brain, Database, ArrowRight, Activity, Users } from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: Heart,
      title: "Heart Disease Prediction",
      description:
        "Advanced ML model trained on comprehensive patient data to predict cardiovascular risk with high accuracy.",
      color: "text-secondary",
    },
    {
      icon: Shield,
      title: "Privacy Preserving",
      description:
        "Federated Learning ensures patient data never leaves local hospitals, maintaining complete privacy.",
      color: "text-primary",
    },
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description:
        "Neural networks analyze multiple health parameters to provide comprehensive risk assessment.",
      color: "text-accent",
    },
    {
      icon: Database,
      title: "Decentralized Training",
      description:
        "Model trains across multiple healthcare institutions without centralizing sensitive data.",
      color: "text-health",
    },
  ];

  const stats = [
    { value: "95%", label: "Accuracy Rate", icon: Activity },
    { value: "10K+", label: "Predictions Made", icon: Heart },
    { value: "50+", label: "Partner Hospitals", icon: Users },
  ];

  return (
    <BlurBackground variant="mesh">
      <div className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary mb-6 animate-fade-in">
              <Heart className="w-4 h-4 animate-heart-beat" />
              <span className="text-sm font-medium">Federated Learning Powered</span>
            </div>

            <h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              Heart Disease Risk{" "}
              <span className="text-gradient">Prediction</span>
            </h1>

            <p
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              A privacy-preserving machine learning system that predicts cardiovascular
              disease risk using Federated Learning, ensuring your medical data stays
              secure at local healthcare facilities.
            </p>

            <div
              className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              <Link to="/register">
                <GlowingButton size="lg" className="text-lg px-8">
                  Get Started
                  <ArrowRight className="w-5 h-5 ml-2" />
                </GlowingButton>
              </Link>
              <Link to="/about">
                <GlowingButton variant="outline" size="lg" glowColor="health" className="text-lg px-8 border-2">
                  Learn More
                </GlowingButton>
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="glass-card rounded-2xl p-6 text-center animate-fade-in-up hover:scale-105 transition-transform"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why <span className="text-gradient">Federated Learning?</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Traditional machine learning requires centralizing data, creating privacy
              risks. Our federated approach keeps data where it belongs - with the
              healthcare provider.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="glass-card rounded-2xl p-8 hover:scale-[1.02] transition-all duration-300 animate-fade-in-up group"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 mb-4 group-hover:scale-110 transition-transform ${feature.color}`}
                >
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                How It <span className="text-gradient">Works</span>
              </h2>
            </div>

            <div className="relative">
              {/* Connection line */}
              <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent hidden md:block" />

              <div className="space-y-8">
                {[
                  {
                    step: "01",
                    title: "Register & Login",
                    description:
                      "Create a secure account to access the prediction system. User authentication ensures data privacy.",
                  },
                  {
                    step: "02",
                    title: "Enter Health Data",
                    description:
                      "Input patient health parameters including age, blood pressure, cholesterol levels, and other vital indicators.",
                  },
                  {
                    step: "03",
                    title: "AI Analysis",
                    description:
                      "Our federated ML model analyzes the data using patterns learned from multiple healthcare institutions.",
                  },
                  {
                    step: "04",
                    title: "Get Results",
                    description:
                      "Receive instant risk assessment with probability scores and personalized health recommendations.",
                  },
                ].map((item, index) => (
                  <div
                    key={item.step}
                    className="relative flex gap-6 animate-fade-in-up"
                    style={{ animationDelay: `${0.15 * index}s` }}
                  >
                    <div className="relative z-10 flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary text-primary-foreground font-bold text-xl shrink-0">
                      {item.step}
                    </div>
                    <div className="glass-card rounded-2xl p-6 flex-1">
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto text-center glass-card rounded-3xl p-12">
            <Heart className="w-16 h-16 mx-auto mb-6 text-secondary animate-heart-beat" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Predict Your Heart Health?
            </h2>
            <p className="text-muted-foreground mb-8">
              Join thousands of users who trust our privacy-preserving AI system for
              accurate heart disease risk assessment.
            </p>
            <Link to="/register">
              <GlowingButton size="lg" glowColor="heart" className="text-lg px-10">
                Start Free Prediction
                <ArrowRight className="w-5 h-5 ml-2" />
              </GlowingButton>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border/50 mt-20">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Heart className="w-6 h-6 text-secondary" />
                <span className="font-semibold">HeartFL</span>
              </div>
              <p className="text-sm text-muted-foreground">
                © 2024 Heart Disease Risk Prediction. Privacy-preserving ML for healthcare.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </BlurBackground>
  );
}
