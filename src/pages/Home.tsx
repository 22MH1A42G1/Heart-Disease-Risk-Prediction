import { BlurBackground } from "@/components/BlurBackground";
import { GlowingButton } from "@/components/GlowingButton";
import { Link } from "react-router-dom";
import { Activity, Shield, Brain, Database, ArrowRight, Users, Lock, BarChart3, FileText, Settings, Building2, Github, Mail, Info, Stethoscope } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function Home() {
  const features = [
    {
      icon: Shield,
      title: "Secure Data",
      description:
        "No data sharing - Patient data never leaves local hospitals, ensuring complete privacy and HIPAA compliance.",
      color: "text-health",
    },
    {
      icon: Users,
      title: "Collaborative Learning",
      description:
        "Multiple healthcare institutions collaborate to train a global model without centralizing sensitive data.",
      color: "text-primary",
    },
    {
      icon: Activity,
      title: "Accurate Prediction",
      description:
        "Advanced ML models achieve 95%+ accuracy in heart disease risk prediction through federated learning.",
      color: "text-secondary",
    },
  ];

  return (
    <BlurBackground variant="mesh">
      <div className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary mb-6 animate-fade-in">
              <Stethoscope className="w-4 h-4" />
              <span className="text-sm font-medium">Production-Level Medical Platform</span>
            </div>

            <h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              Federated Learning–Based{" "}
              <span className="text-gradient">Heart Disease Risk Prediction</span>
            </h1>

            <p
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              Privacy-Preserving Collaborative AI for Healthcare
            </p>

            <div
              className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              <Link to="/hospital-dashboard">
                <GlowingButton size="lg" className="text-lg px-8">
                  Cardiovascular Risk Assessment
                  <ArrowRight className="w-5 h-5 ml-2" />
                </GlowingButton>
              </Link>
              <Link to="/login">
                <GlowingButton variant="outline" size="lg" glowColor="primary" className="text-lg px-8 border-2">
                  Login
                </GlowingButton>
              </Link>
            </div>
          </div>
        </section>

        {/* Three Feature Cards Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <Card
                key={feature.title}
                className="glass-card rounded-2xl p-8 hover:scale-[1.02] transition-all duration-300 animate-fade-in-up group"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 mb-4 group-hover:scale-110 transition-transform ${feature.color}`}
                >
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
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
                    title: "Hospital Login",
                    description:
                      "Secure authentication for authorized hospital staff to access the federated learning system.",
                  },
                  {
                    step: "02",
                    title: "Enter Patient Health Data",
                    description:
                      "Input patient health parameters including age, blood pressure, cholesterol levels, and clinical indicators.",
                  },
                  {
                    step: "03",
                    title: "Federated AI Analysis",
                    description:
                      "The federated ML model analyzes data using knowledge learned collaboratively from multiple institutions.",
                  },
                  {
                    step: "04",
                    title: "Risk Assessment Report",
                    description:
                      "Receive detailed cardiovascular risk assessment with probability scores and evidence-based recommendations.",
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

        {/* Quick Actions Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Quick <span className="text-gradient">Actions</span>
              </h2>
              <p className="text-muted-foreground">
                Access key features and dashboards
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link to="/hospital-dashboard">
                <Card className="glass-card rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300 group cursor-pointer">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-health/20 to-secondary/20 mb-4 group-hover:scale-110 transition-transform">
                    <Activity className="w-7 h-7 text-health" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Cardiovascular Risk Assessment</h3>
                  <p className="text-muted-foreground text-sm">
                    AI-powered heart disease risk prediction and analysis
                  </p>
                </Card>
              </Link>

              <Link to="/hospital-dashboard">
                <Card className="glass-card rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300 group cursor-pointer">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 mb-4 group-hover:scale-110 transition-transform">
                    <Building2 className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Hospital Dashboard</h3>
                  <p className="text-muted-foreground text-sm">
                    Local training, patient data entry, and model performance
                  </p>
                </Card>
              </Link>

              <Link to="/admin-dashboard">
                <Card className="glass-card rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300 group cursor-pointer">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-warning/20 to-destructive/20 mb-4 group-hover:scale-110 transition-transform">
                    <Settings className="w-7 h-7 text-warning" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Admin Panel</h3>
                  <p className="text-muted-foreground text-sm">
                    Oversee global model and system administration
                  </p>
                </Card>
              </Link>

              <Link to="/fl-dashboard">
                <Card className="glass-card rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300 group cursor-pointer">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-secondary/20 to-primary/20 mb-4 group-hover:scale-110 transition-transform">
                    <BarChart3 className="w-7 h-7 text-secondary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Model Performance</h3>
                  <p className="text-muted-foreground text-sm">
                    View federated learning metrics and accuracy
                  </p>
                </Card>
              </Link>

              <Link to="/predict">
                <Card className="glass-card rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300 group cursor-pointer">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-accent/20 to-health/20 mb-4 group-hover:scale-110 transition-transform">
                    <FileText className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Clinical History</h3>
                  <p className="text-muted-foreground text-sm">
                    View assessment history and clinical reports
                  </p>
                </Card>
              </Link>

              <Link to="/about">
                <Card className="glass-card rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300 group cursor-pointer">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 mb-4 group-hover:scale-110 transition-transform">
                    <Info className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">About Project</h3>
                  <p className="text-muted-foreground text-sm">
                    Learn about federated learning and our technology
                  </p>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        {/* Federated Learning Visual Diagram */}
        <section className="container mx-auto px-4 py-20">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Federated Learning <span className="text-gradient">Architecture</span>
              </h2>
              <p className="text-muted-foreground">
                Privacy-preserving collaborative training without data sharing
              </p>
            </div>

            <Card className="glass-card rounded-3xl p-8 md:p-12">
              <div className="space-y-8">
                {/* Local Hospitals */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {["Hospital A", "Hospital B", "Hospital C"].map((hospital, idx) => (
                    <div key={hospital} className="text-center animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 mb-3">
                        <Building2 className="w-8 h-8 text-primary" />
                      </div>
                      <h4 className="font-semibold mb-2">{hospital}</h4>
                      <div className="glass-card rounded-xl p-4 text-sm text-muted-foreground">
                        <Lock className="w-5 h-5 mx-auto mb-2 text-success" />
                        <p className="font-medium text-success">Local Training</p>
                        <p className="text-xs mt-1">Data stays secure</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Arrow Down */}
                <div className="flex justify-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="text-primary font-semibold">Model Updates Only ↓</div>
                    <div className="text-xs text-muted-foreground">(No Raw Data Shared)</div>
                  </div>
                </div>

                {/* Global Model */}
                <div className="text-center">
                  <div className="inline-block glass-card rounded-2xl p-8 border-2 border-primary/30">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary mb-4">
                      <Brain className="w-10 h-10 text-primary-foreground" />
                    </div>
                    <h4 className="text-xl font-bold mb-2">Global Model</h4>
                    <p className="text-sm text-muted-foreground">
                      Aggregated intelligence from all hospitals
                    </p>
                    <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 text-success">
                      <Shield className="w-4 h-4" />
                      <span className="text-xs font-medium">Privacy Preserved</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Security & Compliance Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Security & <span className="text-gradient">Compliance</span>
              </h2>
              <p className="text-muted-foreground">
                Industry-grade security for healthcare data
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="glass-card rounded-2xl p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center shrink-0">
                    <Shield className="w-6 h-6 text-success" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">HIPAA-Aligned Architecture</h3>
                    <p className="text-sm text-muted-foreground">
                      Our federated learning approach aligns with HIPAA requirements by ensuring patient data never leaves local healthcare facilities.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="glass-card rounded-2xl p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Lock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">End-to-End Encryption</h3>
                    <p className="text-sm text-muted-foreground">
                      All model updates and communications are encrypted during transmission, ensuring data security throughout the learning process.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="glass-card rounded-2xl p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-health/10 flex items-center justify-center shrink-0">
                    <Database className="w-6 h-6 text-health" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">No Raw Patient Data Sharing</h3>
                    <p className="text-sm text-muted-foreground">
                      Only model parameters are exchanged between institutions. Individual patient records remain completely private and local.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="glass-card rounded-2xl p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                    <Brain className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Secure Aggregation in FL</h3>
                    <p className="text-sm text-muted-foreground">
                      Advanced cryptographic techniques ensure that even model updates cannot reveal individual patient information.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto text-center glass-card rounded-3xl p-12">
            <Activity className="w-16 h-16 mx-auto mb-6 text-secondary" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready for Cardiovascular Risk Assessment?
            </h2>
            <p className="text-muted-foreground mb-8">
              Trusted by healthcare professionals for accurate heart disease risk assessment using privacy-preserving federated learning.
            </p>
            <Link to="/login">
              <GlowingButton size="lg" glowColor="heart" className="text-lg px-10">
                Access Hospital Dashboard
                <ArrowRight className="w-5 h-5 ml-2" />
              </GlowingButton>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border/50 mt-20">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              {/* Brand */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Activity className="w-6 h-6 text-secondary" />
                  <span className="font-semibold text-lg">HeartFL</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Privacy-preserving heart disease risk prediction using federated learning.
                </p>
              </div>

              {/* Project */}
              <div>
                <h4 className="font-semibold mb-4">Project</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <Link to="/about" className="hover:text-primary transition-colors">
                      About Project
                    </Link>
                  </li>
                  <li>
                    <a 
                      href="https://github.com/22MH1A42G1/Heart-Disease-Risk-Prediction" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-primary transition-colors flex items-center gap-2"
                    >
                      <Github className="w-4 h-4" />
                      GitHub Repository
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://archive.ics.uci.edu/ml/datasets/heart+disease" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-primary transition-colors"
                    >
                      Dataset Source
                    </a>
                  </li>
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h4 className="font-semibold mb-4">Resources</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <Link to="/fl-dashboard" className="hover:text-primary transition-colors">
                      FL Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link to="/predict" className="hover:text-primary transition-colors">
                      Prediction Tool
                    </Link>
                  </li>
                  <li>
                    <Link to="/about" className="hover:text-primary transition-colors">
                      Documentation
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h4 className="font-semibold mb-4">Team & Contact</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <a href="mailto:contact@heartfl.com" className="hover:text-primary transition-colors">
                      Contact Us
                    </a>
                  </li>
                  <li>Team: Final Year Project</li>
                  <li>University Research Initiative</li>
                </ul>
              </div>
            </div>

            <div className="pt-8 border-t border-border/50">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-sm text-muted-foreground">
                  © 2024 HeartFL - Heart Disease Risk Prediction. Privacy-preserving ML for healthcare.
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Shield className="w-4 h-4 text-success" />
                  <span>HIPAA-Aligned Architecture</span>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </BlurBackground>
  );
}
