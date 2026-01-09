import { BlurBackground } from "@/components/BlurBackground";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import {
  Network,
  Database,
  Server,
  ArrowRight,
  Shield,
  Brain,
  Building2,
  RefreshCw,
  CheckCircle,
} from "lucide-react";

export default function FLDashboard() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const hospitals = [
    { name: "City General Hospital", patients: 2450, status: "active", accuracy: 94.2 },
    { name: "Metro Healthcare Center", patients: 1890, status: "active", accuracy: 93.8 },
    { name: "Regional Medical Institute", patients: 3120, status: "active", accuracy: 95.1 },
    { name: "University Hospital", patients: 2780, status: "syncing", accuracy: 94.5 },
    { name: "Community Health Clinic", patients: 1560, status: "active", accuracy: 92.9 },
  ];

  const trainingRounds = [
    { round: 1, globalAccuracy: 78.5, avgLoss: 0.45, participants: 5 },
    { round: 2, globalAccuracy: 82.3, avgLoss: 0.38, participants: 5 },
    { round: 3, globalAccuracy: 86.1, avgLoss: 0.31, participants: 5 },
    { round: 4, globalAccuracy: 89.4, avgLoss: 0.24, participants: 5 },
    { round: 5, globalAccuracy: 91.8, avgLoss: 0.19, participants: 5 },
    { round: 6, globalAccuracy: 93.2, avgLoss: 0.15, participants: 5 },
    { round: 7, globalAccuracy: 94.1, avgLoss: 0.12, participants: 5 },
  ];

  return (
    <BlurBackground variant="mesh">
      <div className="min-h-screen pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent mb-4">
              <Network className="w-4 h-4" />
              <span className="text-sm font-medium">Federated Learning</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              FL Training <span className="text-gradient">Dashboard</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Visualizing the federated learning process - how multiple hospitals
              collaborate to train a global model without sharing patient data.
            </p>
          </div>

          {/* FL Architecture Visualization */}
          <Card className="glass-card rounded-3xl p-8 mb-8 animate-fade-in-up">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Brain className="w-5 h-5 text-primary" />
              Federated Learning Architecture
            </h2>

            <div className="grid md:grid-cols-3 gap-8 items-center">
              {/* Local Hospitals */}
              <div className="space-y-4">
                <h3 className="font-semibold text-center mb-4">Local Hospitals</h3>
                {hospitals.slice(0, 3).map((hospital, index) => (
                  <div
                    key={hospital.name}
                    className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 animate-fade-in"
                    style={{ animationDelay: `${0.1 * index}s` }}
                  >
                    <Building2 className="w-5 h-5 text-primary shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{hospital.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {hospital.patients.toLocaleString()} patients
                      </p>
                    </div>
                    <Database className="w-4 h-4 text-muted-foreground" />
                  </div>
                ))}
              </div>

              {/* Aggregation Flow */}
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <ArrowRight className="w-6 h-6 animate-pulse" />
                  <span className="text-sm">Send Gradients</span>
                </div>

                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center animate-pulse-glow">
                    <Server className="w-12 h-12 text-primary" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                    <RefreshCw className="w-4 h-4 text-accent-foreground animate-spin" />
                  </div>
                </div>

                <div className="text-center">
                  <p className="font-semibold">Central Server</p>
                  <p className="text-xs text-muted-foreground">
                    Aggregates model updates
                  </p>
                </div>

                <div className="flex items-center gap-2 text-muted-foreground">
                  <ArrowRight className="w-6 h-6 rotate-180 animate-pulse" />
                  <span className="text-sm">Send Global Model</span>
                </div>
              </div>

              {/* Global Model */}
              <div className="space-y-4">
                <h3 className="font-semibold text-center mb-4">Global Model</h3>
                <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 text-center">
                  <Brain className="w-12 h-12 mx-auto text-primary mb-3" />
                  <p className="font-semibold">Heart Disease Model</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Accuracy: 94.1%
                  </p>
                  <div className="mt-4 flex items-center justify-center gap-2 text-sm text-success">
                    <CheckCircle className="w-4 h-4" />
                    <span>Trained & Ready</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-muted/50 flex items-start gap-3">
                  <Shield className="w-5 h-5 text-health shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Privacy Preserved</p>
                    <p className="text-xs text-muted-foreground">
                      Raw patient data never leaves hospitals
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Participating Hospitals */}
            <Card className="glass-card rounded-3xl p-8 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary" />
                Participating Hospitals
              </h2>

              <div className="space-y-4">
                {hospitals.map((hospital, index) => (
                  <div
                    key={hospital.name}
                    className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          hospital.status === "active"
                            ? "bg-success animate-pulse"
                            : "bg-warning animate-pulse"
                        }`}
                      />
                      <div>
                        <p className="font-medium">{hospital.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {hospital.patients.toLocaleString()} training samples
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{hospital.accuracy}%</p>
                      <p className="text-xs text-muted-foreground">Local Accuracy</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Training Progress */}
            <Card className="glass-card rounded-3xl p-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-primary" />
                Training Rounds
              </h2>

              <div className="space-y-3">
                {trainingRounds.map((round, index) => (
                  <div
                    key={round.round}
                    className="flex items-center gap-4 p-3 rounded-xl bg-muted/30"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                      {round.round}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Global Accuracy</span>
                        <span className="text-sm font-semibold">
                          {round.globalAccuracy}%
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
                          style={{ width: `${round.globalAccuracy}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-right text-sm text-muted-foreground">
                      <p>Loss: {round.avgLoss}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 rounded-xl bg-success/10 border border-success/20">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-success" />
                  <div>
                    <p className="font-semibold">Training Complete</p>
                    <p className="text-sm text-muted-foreground">
                      Model converged after 7 federated rounds
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Key Concepts */}
          <Card className="glass-card rounded-3xl p-8 mt-8 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <h2 className="text-xl font-bold mb-6">Key Federated Learning Concepts</h2>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Data Privacy",
                  description:
                    "Patient data never leaves the local hospital. Only model gradients are shared, ensuring complete privacy compliance.",
                  icon: Shield,
                  color: "text-health",
                },
                {
                  title: "Model Aggregation",
                  description:
                    "The central server aggregates model updates using FedAvg algorithm, combining insights from all hospitals.",
                  icon: RefreshCw,
                  color: "text-primary",
                },
                {
                  title: "Global Model",
                  description:
                    "The final model benefits from diverse datasets across institutions, improving generalization and accuracy.",
                  icon: Brain,
                  color: "text-secondary",
                },
              ].map((concept, index) => (
                <div
                  key={concept.title}
                  className="p-6 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <concept.icon className={`w-8 h-8 ${concept.color} mb-4`} />
                  <h3 className="font-semibold mb-2">{concept.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {concept.description}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </BlurBackground>
  );
}
