import { useState } from "react";
import { BlurBackground } from "@/components/BlurBackground";
import { Card } from "@/components/ui/card";
import { GlowingButton } from "@/components/GlowingButton";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import {
  Server,
  Building2,
  CheckCircle,
  Clock,
  RefreshCw,
  TrendingUp,
  BarChart3,
  Network,
  Activity,
  AlertCircle,
} from "lucide-react";

export default function AdminDashboard() {
  const { user } = useAuth();
  const [isAggregating, setIsAggregating] = useState(false);
  const [aggregationComplete, setAggregationComplete] = useState(false);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const hospitals = [
    { name: "City General Hospital", status: "received", patients: 2450, accuracy: 94.2 },
    { name: "Metro Healthcare Center", status: "received", patients: 1890, accuracy: 93.8 },
    { name: "Regional Medical Institute", status: "received", patients: 3120, accuracy: 95.1 },
    { name: "University Hospital", status: "waiting", patients: 2780, accuracy: 94.5 },
    { name: "Community Health Clinic", status: "received", patients: 1560, accuracy: 92.9 },
  ];

  const systemLogs = [
    { time: "10:45:23", message: "Hospital A → Model received", type: "success" },
    { time: "10:45:18", message: "Hospital B → Model received", type: "success" },
    { time: "10:45:12", message: "Hospital C → Model received", type: "success" },
    { time: "10:44:55", message: "Aggregation → Success", type: "success" },
    { time: "10:44:48", message: "Global model → Distributed", type: "info" },
    { time: "10:44:30", message: "Training round 7 completed", type: "info" },
  ];

  const handleAggregate = async () => {
    setIsAggregating(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setIsAggregating(false);
    setAggregationComplete(true);
  };

  const receivedCount = hospitals.filter((h) => h.status === "received").length;
  const waitingCount = hospitals.filter((h) => h.status === "waiting").length;

  return (
    <BlurBackground variant="mesh">
      <div className="min-h-screen pt-20 pb-12 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent mb-4">
              <Server className="w-4 h-4" />
              <span className="text-sm font-medium">Central Server - FL Core</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Admin <span className="text-gradient">Dashboard</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Model Aggregation using FedAvg - Combining insights from all hospitals
            </p>
          </div>

          {/* Top Widgets */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="glass-card rounded-3xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Connected Hospitals</p>
                  <p className="text-4xl font-bold">{hospitals.length}</p>
                </div>
                <Network className="w-8 h-8 text-primary" />
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span className="text-muted-foreground">All systems online</span>
              </div>
            </Card>

            <Card className="glass-card rounded-3xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Models Received</p>
                  <p className="text-4xl font-bold text-success">{receivedCount}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-success" />
              </div>
              <div className="text-sm text-muted-foreground">
                Ready for aggregation
              </div>
            </Card>

            <Card className="glass-card rounded-3xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Waiting Clients</p>
                  <p className="text-4xl font-bold text-warning">{waitingCount}</p>
                </div>
                <Clock className="w-8 h-8 text-warning" />
              </div>
              <div className="text-sm text-muted-foreground">
                Pending model submission
              </div>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Participating Hospitals */}
              <Card className="glass-card rounded-3xl p-8">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-primary" />
                  Participating Hospitals
                </h2>

                <div className="space-y-3">
                  {hospitals.map((hospital) => (
                    <div
                      key={hospital.name}
                      className="flex items-center justify-between p-4 rounded-xl bg-muted/30"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            hospital.status === "received"
                              ? "bg-success animate-pulse"
                              : "bg-warning animate-pulse"
                          }`}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{hospital.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {hospital.patients.toLocaleString()} samples
                          </p>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        {hospital.status === "received" ? (
                          <CheckCircle className="w-5 h-5 text-success" />
                        ) : (
                          <Clock className="w-5 h-5 text-warning" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Aggregate Models Button */}
              <Card className="glass-card rounded-3xl p-8">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <RefreshCw className="w-5 h-5 text-primary" />
                  Model Aggregation
                </h2>

                <GlowingButton
                  onClick={handleAggregate}
                  disabled={isAggregating || receivedCount === 0}
                  className="w-full h-14 text-lg"
                  glowColor="primary"
                >
                  {isAggregating ? (
                    <>
                      <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                      Aggregating Models (FedAvg)...
                    </>
                  ) : (
                    <>
                      <Server className="w-5 h-5 mr-2" />
                      Aggregate Models (FedAvg)
                    </>
                  )}
                </GlowingButton>

                {aggregationComplete && (
                  <div className="mt-4 p-4 rounded-xl bg-success/10 border border-success/20">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-success" />
                      <div>
                        <p className="font-semibold">Aggregation Complete!</p>
                        <p className="text-sm text-muted-foreground">
                          Global model updated and distributed
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-6 p-4 rounded-xl bg-muted/30">
                  <p className="text-sm text-muted-foreground mb-2">
                    <strong>FedAvg Algorithm:</strong> Combines local model gradients from all
                    hospitals using weighted averaging based on dataset size.
                  </p>
                </div>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Global Metrics */}
              <Card className="glass-card rounded-3xl p-8">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  Global Model Metrics
                </h2>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-primary" />
                      <p className="text-sm text-muted-foreground">Global Accuracy</p>
                    </div>
                    <p className="text-3xl font-bold">94.1%</p>
                  </div>

                  <div className="p-6 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10">
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="w-4 h-4 text-secondary" />
                      <p className="text-sm text-muted-foreground">Precision</p>
                    </div>
                    <p className="text-3xl font-bold">93.8%</p>
                  </div>

                  <div className="p-6 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10">
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="w-4 h-4 text-accent" />
                      <p className="text-sm text-muted-foreground">Recall</p>
                    </div>
                    <p className="text-3xl font-bold">94.5%</p>
                  </div>

                  <div className="p-6 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10">
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="w-4 h-4 text-health" />
                      <p className="text-sm text-muted-foreground">F1-Score</p>
                    </div>
                    <p className="text-3xl font-bold">94.1%</p>
                  </div>
                </div>

              </Card>

              {/* System Log */}
              <Card className="glass-card rounded-3xl p-8">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary" />
                  System Log
                </h2>

                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {systemLogs.map((log, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <span className="text-xs text-muted-foreground font-mono mt-1">
                        {log.time}
                      </span>
                      <div className="flex items-start gap-2 flex-1">
                        {log.type === "success" ? (
                          <CheckCircle className="w-4 h-4 text-success mt-0.5" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-primary mt-0.5" />
                        )}
                        <p className="text-sm">{log.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </BlurBackground>
  );
}
