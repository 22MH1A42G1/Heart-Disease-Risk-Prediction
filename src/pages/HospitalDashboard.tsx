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
  TrendingUp,
} from "lucide-react";

export default function HospitalDashboard() {
  const { user } = useAuth();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isTraining, setIsTraining] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [modelTrained, setModelTrained] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  
  // Patient data entry form state
  const [patientData, setPatientData] = useState({
    age: "",
    gender: "",
    bloodPressure: "",
    cholesterol: "",
    diabetes: "",
    smoking: "",
    bmi: "",
    maxHR: "",
    exerciseAngina: "",
    chestPainType: "",
  });

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      // Automatically start training with fixed optimized model (Logistic Regression)
      handleTrainModel();
    }
  };

  const handleTrainModel = async () => {
    setIsTraining(true);
    setTrainingProgress(0);

    // Simulate training progress with fixed optimized model
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      setTrainingProgress(i);
    }

    setIsTraining(false);
    setModelTrained(true);
  };

  const handlePatientDataChange = (field: string, value: string) => {
    setPatientData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAssessRisk = async (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send data to the local model for prediction
    console.log("Patient data for risk assessment:", patientData);
    alert("Risk assessment completed. Patient data has been queued for local prediction.");
  };

  const sidebarItems = [
    { id: "dashboard", icon: Home, label: "Dashboard" },
    { id: "patient-entry", icon: Activity, label: "Patient Data Entry" },
    { id: "upload", icon: FileUp, label: "Upload Dataset" },
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
              Upload your hospital's local dataset and train models securely. Patient data never leaves this facility.
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
                      Patient data never leaves hospital - Only model gradients are shared
                    </p>
                  </div>
                </div>
              </Card>

              {/* Patient Data Entry Section */}
              {activeTab === "patient-entry" && (
                <Card className="glass-card rounded-3xl p-8 animate-fade-in-up">
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-primary" />
                    Patient Data Entry
                  </h2>
                  
                  <p className="text-sm text-muted-foreground mb-6">
                    Capture structured clinical parameters for local training and cardiovascular risk prediction. All data remains local and secure.
                  </p>

                  <form onSubmit={handleAssessRisk} className="space-y-6">
                    <div className="space-y-8">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-4">
                          Core Clinical Measures
                        </p>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="patientAge">Age</Label>
                            <Input
                              id="patientAge"
                              type="number"
                              placeholder="45"
                              value={patientData.age}
                              onChange={(e) => handlePatientDataChange("age", e.target.value)}
                              className="h-12 bg-background/50"
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="patientGender">Gender</Label>
                            <Select value={patientData.gender} onValueChange={(value) => handlePatientDataChange("gender", value)} required>
                              <SelectTrigger className="h-12 bg-background/50">
                                <SelectValue placeholder="Select gender" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Male">Male</SelectItem>
                                <SelectItem value="Female">Female</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="bloodPressure">Blood Pressure (mm Hg)</Label>
                            <Input
                              id="bloodPressure"
                              type="number"
                              placeholder="120"
                              value={patientData.bloodPressure}
                              onChange={(e) => handlePatientDataChange("bloodPressure", e.target.value)}
                              className="h-12 bg-background/50"
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="cholesterol">Cholesterol (mg/dL)</Label>
                            <Input
                              id="cholesterol"
                              type="number"
                              placeholder="200"
                              value={patientData.cholesterol}
                              onChange={(e) => handlePatientDataChange("cholesterol", e.target.value)}
                              className="h-12 bg-background/50"
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="maxHR">Maximum Heart Rate</Label>
                            <Input
                              id="maxHR"
                              type="number"
                              placeholder="150"
                              value={patientData.maxHR}
                              onChange={(e) => handlePatientDataChange("maxHR", e.target.value)}
                              className="h-12 bg-background/50"
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="chestPainType">Chest Pain Type</Label>
                            <Select value={patientData.chestPainType} onValueChange={(value) => handlePatientDataChange("chestPainType", value)} required>
                              <SelectTrigger className="h-12 bg-background/50">
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Atypical Angina">Atypical Angina</SelectItem>
                                <SelectItem value="Non-Anginal Pain">Non-Anginal Pain</SelectItem>
                                <SelectItem value="Asymptomatic">Asymptomatic</SelectItem>
                                <SelectItem value="Typical Angina">Typical Angina</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-4">
                          Risk Factors & Lifestyle
                        </p>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="diabetes">Diabetes Status</Label>
                            <Select value={patientData.diabetes} onValueChange={(value) => handlePatientDataChange("diabetes", value)} required>
                              <SelectTrigger className="h-12 bg-background/50">
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="No">No</SelectItem>
                                <SelectItem value="Yes">Yes</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="smoking">Smoking Status</Label>
                            <Select value={patientData.smoking} onValueChange={(value) => handlePatientDataChange("smoking", value)} required>
                              <SelectTrigger className="h-12 bg-background/50">
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Never">Never</SelectItem>
                                <SelectItem value="Former">Former</SelectItem>
                                <SelectItem value="Current">Current</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="bmi">BMI (Body Mass Index)</Label>
                            <Input
                              id="bmi"
                              type="number"
                              step="0.1"
                              placeholder="25.0"
                              value={patientData.bmi}
                              onChange={(e) => handlePatientDataChange("bmi", e.target.value)}
                              className="h-12 bg-background/50"
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="exerciseAngina">Exercise-Induced Angina</Label>
                            <Select value={patientData.exerciseAngina} onValueChange={(value) => handlePatientDataChange("exerciseAngina", value)} required>
                              <SelectTrigger className="h-12 bg-background/50">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="No">No</SelectItem>
                                <SelectItem value="Yes">Yes</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4">
                      <GlowingButton
                        type="submit"
                        className="w-full h-14 text-lg"
                        glowColor="primary"
                      >
                        <Activity className="w-5 h-5 mr-2" />
                        Assess Cardiovascular Risk
                      </GlowingButton>
                    </div>

                    <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
                      <p className="text-sm flex items-center gap-2">
                        <Shield className="w-4 h-4 text-primary" />
                        <span>
                          <strong>Privacy Notice:</strong> This system follows privacy-preserving federated learning. Patient data never leaves the hospital.
                        </span>
                      </p>
                    </div>
                  </form>
                </Card>
              )}

              {/* Dataset Upload Section */}
              {activeTab === "upload" && (
                <Card className="glass-card rounded-3xl p-8 animate-fade-in-up">
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Upload className="w-5 h-5 text-primary" />
                    Upload Hospital Dataset
                  </h2>

                  <div className="space-y-6">
                    <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
                      <p className="text-sm text-muted-foreground">
                        <strong className="text-foreground">Important:</strong> Each hospital must upload its own local patient dataset. 
                        The system does not provide any default or centralized datasets. All data remains local and is never shared with other institutions.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-secondary/10 border border-secondary/20">
                      <p className="text-sm text-muted-foreground">
                        <strong className="text-foreground">Automatic Training:</strong> Training starts automatically upon upload using the optimized Logistic Regression model.
                      </p>
                    </div>
                    
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
                          disabled={isTraining}
                        />
                        <p className="text-sm text-muted-foreground mt-2">
                          Upload CSV file with your hospital's patient health records
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Required format: Age, Sex, ChestPainType, RestingBP, Cholesterol, FastingBS, RestingECG, MaxHR, ExerciseAngina, Oldpeak, ST_Slope
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

                    {(isTraining || modelTrained) && (
                      <div className="space-y-4">
                        <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
                          <p className="text-sm font-semibold mb-2">Training with: Logistic Regression (Optimized Model)</p>
                        </div>
                        
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
                          Upload patient data - training starts automatically
                        </p>
                      </button>
                      <button
                        onClick={() => setActiveTab("patient-entry")}
                        className="p-6 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors text-left"
                      >
                        <Activity className="w-8 h-8 text-secondary mb-3" />
                        <h4 className="font-semibold mb-1">Patient Entry</h4>
                        <p className="text-sm text-muted-foreground">
                          Enter patient data for risk assessment
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
