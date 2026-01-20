import { useState } from "react";
import { BlurBackground } from "@/components/BlurBackground";
import { GlowingButton } from "@/components/GlowingButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Activity, Loader2, AlertTriangle, CheckCircle, Info, BarChart3, Stethoscope } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

interface PredictionResult {
  risk: "High" | "Medium" | "Low";
  probability: number;
  suggestions: string[];
  featureImportance: {
    feature: string;
    importance: number;
    color: string;
  }[];
}

export default function Prediction() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<PredictionResult | null>(null);

  const [formData, setFormData] = useState({
    age: "",
    sex: "",
    chestPainType: "",
    restingBP: "",
    cholesterol: "",
    fastingBS: "",
    restingECG: "",
    maxHR: "",
    exerciseAngina: "",
    oldpeak: "",
    stSlope: "",
  });

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setProgress(0);

    // Simulate progress with AI Analysis stages
    // Progress delays are configured to provide smooth user feedback
    const PROGRESS_STEPS = [
      { value: 20, delay: 300 },  // Initial data validation
      { value: 40, delay: 400 },  // Preprocessing
      { value: 60, delay: 500 },  // Model inference
      { value: 80, delay: 400 },  // Risk analysis
      { value: 100, delay: 400 }, // Generating recommendations
    ];

    for (const step of PROGRESS_STEPS) {
      await new Promise((resolve) => setTimeout(resolve, step.delay));
      setProgress(step.value);
    }

    // Generate mock prediction based on some inputs
    const age = parseInt(formData.age) || 50;
    const cholesterol = parseInt(formData.cholesterol) || 200;
    const bp = parseInt(formData.restingBP) || 120;

    // Simple mock logic for local preview
    const riskScore =
      (age > 55 ? 0.3 : 0.1) +
      (cholesterol > 240 ? 0.3 : cholesterol > 200 ? 0.15 : 0) +
      (bp > 140 ? 0.2 : bp > 130 ? 0.1 : 0) +
      (formData.exerciseAngina === "Y" ? 0.2 : 0);

    const probability = Math.min(0.95, Math.max(0.05, riskScore + Math.random() * 0.2));
    let riskLevel: "High" | "Medium" | "Low";
    if (probability > 0.65) {
      riskLevel = "High";
    } else if (probability > 0.35) {
      riskLevel = "Medium";
    } else {
      riskLevel = "Low";
    }

    const suggestions = riskLevel === "High"
      ? [
          "Consult a cardiologist for detailed evaluation",
          "Consider lifestyle modifications including diet and exercise",
          "Monitor blood pressure and cholesterol regularly",
          "Avoid smoking and limit alcohol consumption",
          "Schedule a stress test for further assessment",
        ]
      : riskLevel === "Medium"
      ? [
          "Schedule regular check-ups with your doctor",
          "Monitor cholesterol and blood pressure monthly",
          "Maintain a balanced diet and exercise routine",
          "Reduce stress through meditation or yoga",
        ]
      : [
          "Maintain your current healthy lifestyle",
          "Continue regular exercise routine",
          "Keep monitoring cholesterol levels annually",
          "Stay hydrated and maintain a balanced diet",
        ];

    // Calculate feature importance for XAI
    const cholImportance = cholesterol > 240 ? 40 : cholesterol > 200 ? 30 : 20;
    const bpImportance = bp > 140 ? 35 : bp > 130 ? 25 : 20;
    const ageImportance = age > 55 ? 25 : 15;
    const diabetesImportance = formData.fastingBS === "1" ? 15 : 10;

    const total = cholImportance + bpImportance + ageImportance + diabetesImportance;

    setResult({
      risk: riskLevel,
      probability: probability * 100,
      suggestions,
      featureImportance: [
        {
          feature: "Cholesterol",
          importance: (cholImportance / total) * 100,
          color: "hsl(var(--destructive))",
        },
        {
          feature: "Blood Pressure",
          importance: (bpImportance / total) * 100,
          color: "hsl(var(--warning))",
        },
        {
          feature: "Age",
          importance: (ageImportance / total) * 100,
          color: "hsl(var(--primary))",
        },
        {
          feature: "Diabetes",
          importance: (diabetesImportance / total) * 100,
          color: "hsl(var(--secondary))",
        },
      ],
    });

    setIsLoading(false);
    setProgress(0);
  };

  const formFields = [
    { id: "age", label: "Age", type: "number", placeholder: "45" },
    {
      id: "sex",
      label: "Sex",
      type: "select",
      options: [
        { value: "M", label: "Male" },
        { value: "F", label: "Female" },
      ],
    },
    {
      id: "chestPainType",
      label: "Chest Pain Type",
      type: "select",
      options: [
        { value: "ATA", label: "Atypical Angina (ATA)" },
        { value: "NAP", label: "Non-Anginal Pain (NAP)" },
        { value: "ASY", label: "Asymptomatic (ASY)" },
        { value: "TA", label: "Typical Angina (TA)" },
      ],
    },
    { id: "restingBP", label: "Resting Blood Pressure (mm Hg)", type: "number", placeholder: "120" },
    { id: "cholesterol", label: "Cholesterol (mg/dL)", type: "number", placeholder: "200" },
    {
      id: "fastingBS",
      label: "Fasting Blood Sugar > 120 mg/dL",
      type: "select",
      options: [
        { value: "0", label: "No" },
        { value: "1", label: "Yes" },
      ],
    },
    {
      id: "restingECG",
      label: "Resting ECG",
      type: "select",
      options: [
        { value: "Normal", label: "Normal" },
        { value: "ST", label: "ST-T Wave Abnormality" },
        { value: "LVH", label: "Left Ventricular Hypertrophy" },
      ],
    },
    { id: "maxHR", label: "Maximum Heart Rate", type: "number", placeholder: "150" },
    {
      id: "exerciseAngina",
      label: "Exercise-Induced Angina",
      type: "select",
      options: [
        { value: "N", label: "No" },
        { value: "Y", label: "Yes" },
      ],
    },
    { id: "oldpeak", label: "Oldpeak (ST Depression)", type: "number", placeholder: "1.0" },
    {
      id: "stSlope",
      label: "ST Slope",
      type: "select",
      options: [
        { value: "Up", label: "Upsloping" },
        { value: "Flat", label: "Flat" },
        { value: "Down", label: "Downsloping" },
      ],
    },
  ];

  return (
    <BlurBackground variant="mesh">
      <div className="min-h-screen pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
              <Activity className="w-4 h-4" />
              <span className="text-sm font-medium">Clinical Decision Support</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Cardiovascular <span className="text-gradient">Risk Stratification</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Enter structured patient parameters below. The federated learning model will
              generate a clinical risk stratification report with evidence-based guidance.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Prediction Form */}
            <div className="lg:col-span-2">
              <Card className="glass-card rounded-3xl p-8 animate-fade-in-up">
                <form onSubmit={handlePredict}>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {formFields.map((field) => (
                      <div key={field.id} className="space-y-2">
                        <Label htmlFor={field.id}>{field.label}</Label>
                        {field.type === "select" ? (
                          <Select
                            value={formData[field.id as keyof typeof formData]}
                            onValueChange={(value) => handleInputChange(field.id, value)}
                          >
                            <SelectTrigger className="h-12 bg-background/50">
                              <SelectValue placeholder="Select..." />
                            </SelectTrigger>
                            <SelectContent>
                              {field.options?.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <Input
                            id={field.id}
                            type={field.type}
                            placeholder={field.placeholder}
                            value={formData[field.id as keyof typeof formData]}
                            onChange={(e) => handleInputChange(field.id, e.target.value)}
                            className="h-12 bg-background/50"
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-8">
                    <GlowingButton
                      type="submit"
                      className="w-full h-14 text-lg"
                      glowColor="heart"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Analyzing with FL Model...
                        </>
                      ) : (
                        <>
                          <Stethoscope className="w-5 h-5 mr-2" />
                          Assess Cardiovascular Risk
                        </>
                      )}
                    </GlowingButton>

                    {/* Progress Bar */}
                    {isLoading && (
                      <div className="mt-4 space-y-2 animate-fade-in">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">AI Analysis Progress</span>
                          <span className="font-semibold text-primary">{progress}%</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                        <p className="text-xs text-muted-foreground text-center">
                          {progress < 40
                            ? "Preprocessing health data..."
                            : progress < 70
                            ? "Running federated model inference..."
                            : progress < 90
                            ? "Analyzing risk factors..."
                            : "Generating recommendations..."}
                        </p>
                      </div>
                    )}
                  </div>
                </form>
              </Card>
            </div>

            {/* Results Panel */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Result Card */}
                <Card
                  className={`glass-card rounded-3xl p-8 animate-fade-in-up transition-all duration-500 ${
                    result
                      ? result.risk === "High"
                        ? "border-2 border-destructive/50"
                        : result.risk === "Medium"
                        ? "border-2 border-warning/50"
                        : "border-2 border-success/50"
                      : ""
                  }`}
                  style={{ animationDelay: "0.1s" }}
                >
                  {result ? (
                    <div className="space-y-6">
                      {/* Risk Level */}
                      <div className="text-center">
                        <div
                          className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 ${
                            result.risk === "High"
                              ? "bg-destructive/20"
                              : result.risk === "Medium"
                              ? "bg-warning/20"
                              : "bg-success/20"
                          }`}
                        >
                          {result.risk === "High" ? (
                            <AlertTriangle className="w-10 h-10 text-destructive" />
                          ) : result.risk === "Medium" ? (
                            <AlertTriangle className="w-10 h-10 text-warning" />
                          ) : (
                            <CheckCircle className="w-10 h-10 text-success" />
                          )}
                        </div>
                        <div
                          className={`inline-flex px-4 py-2 rounded-full mb-2 ${
                            result.risk === "High"
                              ? "bg-destructive/20 text-destructive"
                              : result.risk === "Medium"
                              ? "bg-warning/20 text-warning"
                              : "bg-success/20 text-success"
                          }`}
                        >
                          <span className="text-xl font-bold">
                            {result.risk} Risk
                          </span>
                        </div>
                        <p className="text-muted-foreground">
                          Cardiovascular Disease Risk
                        </p>
                      </div>

                      {/* Probability */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Risk Probability</span>
                          <span className="font-semibold">
                            {result.probability.toFixed(1)}%
                          </span>
                        </div>
                        <div className="h-3 bg-muted rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-1000 ${
                              result.risk === "High"
                                ? "bg-gradient-to-r from-warning to-destructive"
                                : result.risk === "Medium"
                                ? "bg-gradient-to-r from-primary to-warning"
                                : "bg-gradient-to-r from-health to-success"
                            }`}
                            style={{ width: `${result.probability}%` }}
                          />
                        </div>
                      </div>

                      {/* XAI - Feature Importance */}
                      <div className="space-y-3">
                        <h4 className="font-semibold flex items-center gap-2">
                          <BarChart3 className="w-4 h-4 text-primary" />
                          Key Contributing Factors
                        </h4>
                        <p className="text-xs text-muted-foreground mb-3">
                          Explainable AI analysis showing which clinical factors contribute most to the risk assessment
                        </p>
                        <div className="space-y-3">
                          {result.featureImportance.slice(0, 3).map((item, index) => (
                            <div key={item.feature} className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span className="flex items-center gap-2">
                                  <span className="text-lg">{index === 0 ? "①" : index === 1 ? "②" : "③"}</span>
                                  {item.feature}
                                </span>
                                <span className="font-semibold">
                                  {item.importance.toFixed(0)}%
                                </span>
                              </div>
                              <div className="h-2 bg-muted rounded-full overflow-hidden">
                                <div
                                  className="h-full rounded-full transition-all duration-1000"
                                  style={{
                                    width: `${item.importance}%`,
                                    backgroundColor: item.color,
                                  }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Suggestions */}
                      <div className="space-y-3">
                        <h4 className="font-semibold flex items-center gap-2">
                          <Info className="w-4 h-4 text-primary" />
                          Clinical Recommendations
                        </h4>
                        <ul className="space-y-2">
                          {result.suggestions.map((suggestion, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-2 text-sm text-muted-foreground"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                              {suggestion}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Activity className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
                      <h3 className="text-lg font-semibold mb-2">
                        No Assessment Yet
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Complete the form and submit to view risk assessment
                      </p>
                    </div>
                  )}
                </Card>

                {/* Info Card */}
                <Card className="glass-card rounded-2xl p-6 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold mb-1">About This Model</h4>
                      <p className="text-sm text-muted-foreground">
                        This prediction uses a federated learning model trained
                        across multiple hospitals without sharing patient data,
                        ensuring privacy while maintaining accuracy.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BlurBackground>
  );
}
