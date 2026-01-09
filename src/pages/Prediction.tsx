import { useState } from "react";
import { BlurBackground } from "@/components/BlurBackground";
import { GlowingButton } from "@/components/GlowingButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Heart, Activity, Loader2, AlertTriangle, CheckCircle, Info } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

interface PredictionResult {
  risk: "High" | "Low";
  probability: number;
  suggestions: string[];
}

export default function Prediction() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
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

    // Simulate ML prediction
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Generate mock prediction based on some inputs
    const age = parseInt(formData.age) || 50;
    const cholesterol = parseInt(formData.cholesterol) || 200;
    const bp = parseInt(formData.restingBP) || 120;

    // Simple mock logic for demonstration
    const riskScore =
      (age > 55 ? 0.3 : 0.1) +
      (cholesterol > 240 ? 0.3 : cholesterol > 200 ? 0.15 : 0) +
      (bp > 140 ? 0.2 : bp > 130 ? 0.1 : 0) +
      (formData.exerciseAngina === "Y" ? 0.2 : 0);

    const probability = Math.min(0.95, Math.max(0.05, riskScore + Math.random() * 0.2));
    const isHighRisk = probability > 0.5;

    const suggestions = isHighRisk
      ? [
          "Consult a cardiologist for detailed evaluation",
          "Consider lifestyle modifications including diet and exercise",
          "Monitor blood pressure and cholesterol regularly",
          "Avoid smoking and limit alcohol consumption",
          "Schedule a stress test for further assessment",
        ]
      : [
          "Maintain your current healthy lifestyle",
          "Continue regular exercise routine",
          "Keep monitoring cholesterol levels annually",
          "Stay hydrated and maintain a balanced diet",
        ];

    setResult({
      risk: isHighRisk ? "High" : "Low",
      probability: probability * 100,
      suggestions,
    });

    setIsLoading(false);
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
              <span className="text-sm font-medium">ML-Powered Analysis</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Heart Disease <span className="text-gradient">Risk Prediction</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Enter patient health parameters below. Our federated learning model will
              analyze the data and provide a risk assessment.
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
                          <Heart className="w-5 h-5 mr-2" />
                          Predict Heart Disease Risk
                        </>
                      )}
                    </GlowingButton>
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
                              : "bg-success/20"
                          }`}
                        >
                          {result.risk === "High" ? (
                            <AlertTriangle className="w-10 h-10 text-destructive" />
                          ) : (
                            <CheckCircle className="w-10 h-10 text-success" />
                          )}
                        </div>
                        <h3 className="text-2xl font-bold">
                          {result.risk} Risk
                        </h3>
                        <p className="text-muted-foreground">
                          Heart Disease Prediction
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
                                : "bg-gradient-to-r from-health to-success"
                            }`}
                            style={{ width: `${result.probability}%` }}
                          />
                        </div>
                      </div>

                      {/* Suggestions */}
                      <div className="space-y-3">
                        <h4 className="font-semibold flex items-center gap-2">
                          <Info className="w-4 h-4 text-primary" />
                          Recommendations
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
                      <Heart className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
                      <h3 className="text-lg font-semibold mb-2">
                        No Prediction Yet
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Fill in the form and click predict to see results
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
