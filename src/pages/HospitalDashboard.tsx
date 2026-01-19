import { useState } from "react";
import { BlurBackground } from "@/components/BlurBackground";
import { Card } from "@/components/ui/card";
import { GlowingButton } from "@/components/GlowingButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import {
  Upload,
  Database,
  Brain,
  Shield,
  Activity,
  CheckCircle,
  BarChart3,
  Clock,
  Home,
  FileUp,
  PlayCircle,
  TrendingUp,
} from "lucide-react";

export default function HospitalDashboard() {
  const { user } = useAuth();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isTraining, setIsTraining] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [modelTrained, setModelTrained] = useState(false);
  const [algorithm, setAlgorithm] = useState("logistic");
  const [activeTab, setActiveTab] = useState("dashboard");

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleTrainModel = async () => {
    if (!selectedFile) return;

    setIsTraining(true);
    setTrainingProgress(0);

    // Simulate training progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      setTrainingProgress(i);
    }

    setIsTraining(false);
    setModelTrained(true);
  };

  const sidebarItems = [
    { id: "dashboard", icon: Home, label: "Dashboard" },
    { id: "upload", icon: FileUp, label: "Upload Dataset" },
    { id: "training", icon: PlayCircle, label: "Local Training" },
    { id: "status", icon: Activity, label: "Model Status" },
  ];

  return (
    <BlurBackground variant="mesh">
      <div className="min-h-screen pt-20 pb-12 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
              <Database className="w-4 h-4" />
              <span className="text-sm font-medium">Hospital - FL Client</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Hospital <span className="text-gradient">Dashboard</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Local Model Training - Your patient data never leaves this facility
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Left Sidebar */}
            <Card className="glass-card rounded-3xl p-6 lg:col-span-1 h-fit">
              <h2 className="text-lg font-bold mb-4">Navigation</h2>
              <nav className="space-y-2">
                {sidebarItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      activeTab === item.id
                        ? "bg-primary/20 text-primary"
                        : "hover:bg-muted/50 text-muted-foreground"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </nav>
            </Card>

            {/* Main Panel */}
            <div className="lg:col-span-3 space-y-6">
              {/* Privacy Indicator */}
              <Card className="glass-card rounded-3xl p-6 bg-health/10 border-health/20">
                <div className="flex items-center gap-4">
                  <Shield className="w-8 h-8 text-health" />
                  <div>
                    <h3 className="font-semibold text-lg">Privacy Protected</h3>
                    <p className="text-sm text-muted-foreground">
                      ✅ Patient data never leaves hospital - Only model gradients are shared
                    </p>
                  </div>
                </div>
              </Card>

              {/* Dataset Upload Section */}
              {activeTab === "upload" && (
                <Card className="glass-card rounded-3xl p-8 animate-fade-in-up">
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Upload className="w-5 h-5 text-primary" />
                    Dataset Upload
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="dataset">Upload CSV (Patient Data)</Label>
                      <div className="mt-2 border-2 border-dashed border-muted rounded-xl p-8 text-center hover:border-primary/50 transition-colors">
                        <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                        <Input
                          id="dataset"
                          type="file"
                          accept=".csv"
                          onChange={handleFileUpload}
                          className="max-w-xs mx-auto"
                        />
                        <p className="text-sm text-muted-foreground mt-2">
                          Upload CSV file with patient health records
                        </p>
                      </div>
                    </div>

                    {selectedFile && (
                      <div className="p-6 rounded-xl bg-muted/50">
                        <div className="flex items-start gap-4">
                          <CheckCircle className="w-6 h-6 text-success mt-1" />
                          <div className="flex-1">
                            <p className="font-semibold">{selectedFile.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Size: {(selectedFile.size / 1024).toFixed(2)} KB
                            </p>
                            <div className="mt-4 grid grid-cols-2 gap-4">
                              <div className="p-3 rounded-lg bg-background">
                                <p className="text-sm text-muted-foreground">Records Count</p>
                                <p className="text-2xl font-bold">1,250</p>
                              </div>
                              <div className="p-3 rounded-lg bg-background">
                                <p className="text-sm text-muted-foreground">Features Used</p>
                                <p className="text-2xl font-bold">11</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              )}

              {/* Local Model Training Section */}
              {activeTab === "training" && (
                <Card className="glass-card rounded-3xl p-8 animate-fade-in-up">
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Brain className="w-5 h-5 text-primary" />
                    Local Model Training
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="algorithm">Select Algorithm</Label>
                      <Select value={algorithm} onValueChange={setAlgorithm}>
                        <SelectTrigger className="h-12 bg-background/50">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="logistic">Logistic Regression</SelectItem>
                          <SelectItem value="random_forest">Random Forest</SelectItem>
                          <SelectItem value="neural_net">Neural Network</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <GlowingButton
                      onClick={handleTrainModel}
                      disabled={!selectedFile || isTraining}
                      className="w-full h-14 text-lg"
                      glowColor="primary"
                    >
                      {isTraining ? "Training..." : "Train Local Model"}
                      <PlayCircle className="w-5 h-5 ml-2" />
                    </GlowingButton>

                    {(isTraining || modelTrained) && (
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium">Training Progress</span>
                            <span className="text-sm font-semibold">{trainingProgress}%</span>
                          </div>
                          <Progress value={trainingProgress} className="h-3" />
                        </div>

                        {modelTrained && (
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="p-6 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10">
                              <div className="flex items-center gap-3 mb-2">
                                <TrendingUp className="w-5 h-5 text-primary" />
                                <span className="text-sm text-muted-foreground">Local Accuracy</span>
                              </div>
                              <p className="text-3xl font-bold">94.2%</p>
                            </div>
                            <div className="p-6 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10">
                              <div className="flex items-center gap-3 mb-2">
                                <BarChart3 className="w-5 h-5 text-secondary" />
                                <span className="text-sm text-muted-foreground">Loss</span>
                              </div>
                              <p className="text-3xl font-bold">0.142</p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </Card>
              )}

              {/* Dashboard Overview */}
              {activeTab === "dashboard" && (
                <div className="space-y-6 animate-fade-in-up">
                  <div className="grid md:grid-cols-3 gap-6">
                    <Card className="glass-card rounded-2xl p-6">
                      <Database className="w-8 h-8 text-primary mb-3" />
                      <p className="text-sm text-muted-foreground">Total Samples</p>
                      <p className="text-3xl font-bold">1,250</p>
                    </Card>
                    <Card className="glass-card rounded-2xl p-6">
                      <Brain className="w-8 h-8 text-secondary mb-3" />
                      <p className="text-sm text-muted-foreground">Model Status</p>
                      <p className="text-3xl font-bold">{modelTrained ? "Ready" : "Pending"}</p>
                    </Card>
                    <Card className="glass-card rounded-2xl p-6">
                      <Clock className="w-8 h-8 text-accent mb-3" />
                      <p className="text-sm text-muted-foreground">Last Training</p>
                      <p className="text-3xl font-bold">{modelTrained ? "Just now" : "N/A"}</p>
                    </Card>
                  </div>

                  <Card className="glass-card rounded-3xl p-8">
                    <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <button
                        onClick={() => setActiveTab("upload")}
                        className="p-6 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors text-left"
                      >
                        <FileUp className="w-8 h-8 text-primary mb-3" />
                        <h4 className="font-semibold mb-1">Upload Dataset</h4>
                        <p className="text-sm text-muted-foreground">
                          Upload patient data for local training
                        </p>
                      </button>
                      <button
                        onClick={() => setActiveTab("training")}
                        className="p-6 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors text-left"
                      >
                        <PlayCircle className="w-8 h-8 text-secondary mb-3" />
                        <h4 className="font-semibold mb-1">Start Training</h4>
                        <p className="text-sm text-muted-foreground">
                          Train model on local data securely
                        </p>
                      </button>
                    </div>
                  </Card>
                </div>
              )}

              {/* Model Status */}
              {activeTab === "status" && (
                <Card className="glass-card rounded-3xl p-8 animate-fade-in-up">
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-primary" />
                    Model Status
                  </h2>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30">
                      <div>
                        <p className="font-semibold">Training Status</p>
                        <p className="text-sm text-muted-foreground">
                          {modelTrained ? "Model trained successfully" : "No model trained yet"}
                        </p>
                      </div>
                      {modelTrained ? (
                        <CheckCircle className="w-6 h-6 text-success" />
                      ) : (
                        <Clock className="w-6 h-6 text-warning" />
                      )}
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30">
                      <div>
                        <p className="font-semibold">Data Privacy</p>
                        <p className="text-sm text-muted-foreground">
                          All data remains local and secure
                        </p>
                      </div>
                      <Shield className="w-6 h-6 text-health" />
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30">
                      <div>
                        <p className="font-semibold">Ready for Aggregation</p>
                        <p className="text-sm text-muted-foreground">
                          {modelTrained ? "Model gradients ready to share" : "Train model first"}
                        </p>
                      </div>
                      {modelTrained ? (
                        <CheckCircle className="w-6 h-6 text-success" />
                      ) : (
                        <Clock className="w-6 h-6 text-warning" />
                      )}
                    </div>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </BlurBackground>
  );
}
