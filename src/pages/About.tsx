import { BlurBackground } from "@/components/BlurBackground";
import { Card } from "@/components/ui/card";
import {
  Heart,
  Target,
  Database,
  Shield,
  Brain,
  Users,
  Code,
  BookOpen,
  Lightbulb,
  CheckCircle,
} from "lucide-react";

export default function About() {
  const objectives = [
    "Develop a heart disease prediction model using federated learning",
    "Ensure patient data privacy through decentralized training",
    "Achieve high prediction accuracy comparable to centralized models",
    "Deliver a practical implementation of privacy-preserving ML",
    "Create an intuitive web interface for healthcare professionals",
  ];

  const tools = [
    { name: "React", category: "Frontend", description: "Modern UI framework" },
    { name: "TypeScript", category: "Language", description: "Type-safe development" },
    { name: "Tailwind CSS", category: "Styling", description: "Utility-first CSS" },
    { name: "Python", category: "Backend", description: "ML model training" },
    { name: "TensorFlow", category: "ML Framework", description: "Neural networks" },
    { name: "Flower", category: "FL Framework", description: "Federated learning" },
  ];

  const datasetFeatures = [
    { name: "Age", description: "Patient age in years" },
    { name: "Sex", description: "Male (M) or Female (F)" },
    { name: "ChestPainType", description: "ATA, NAP, ASY, TA" },
    { name: "RestingBP", description: "Resting blood pressure (mm Hg)" },
    { name: "Cholesterol", description: "Serum cholesterol (mg/dL)" },
    { name: "FastingBS", description: "Fasting blood sugar > 120 mg/dL" },
    { name: "RestingECG", description: "Resting ECG results" },
    { name: "MaxHR", description: "Maximum heart rate achieved" },
    { name: "ExerciseAngina", description: "Exercise-induced angina" },
    { name: "Oldpeak", description: "ST depression induced by exercise" },
    { name: "ST_Slope", description: "Slope of peak exercise ST segment" },
  ];

  return (
    <BlurBackground variant="mesh">
      <div className="min-h-screen pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-5xl">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              About <span className="text-gradient">HeartFL</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Understanding the Heart Disease Risk Prediction system powered by
              Federated Learning technology.
            </p>
          </div>

          {/* Problem Statement */}
          <Card className="glass-card rounded-3xl p-8 mb-8 animate-fade-in-up">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-destructive/10 flex items-center justify-center shrink-0">
                <Heart className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <h2 className="text-xl font-bold mb-3">Problem Statement</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Cardiovascular diseases (CVDs) are the leading cause of death globally,
                  claiming approximately 17.9 million lives each year. Early detection and
                  prediction of heart disease risk can significantly improve patient
                  outcomes. However, training accurate ML models traditionally requires
                  centralizing sensitive patient data, raising serious privacy concerns and
                  regulatory challenges (HIPAA, GDPR).
                </p>
                <p className="text-muted-foreground leading-relaxed mt-3">
                  This project addresses this challenge by implementing a{" "}
                  <span className="text-foreground font-medium">
                    federated learning approach
                  </span>{" "}
                  that enables collaborative model training across multiple healthcare
                  institutions without sharing raw patient data.
                </p>
              </div>
            </div>
          </Card>

          {/* Objectives */}
          <Card className="glass-card rounded-3xl p-8 mb-8 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold mb-4">Project Objectives</h2>
                <div className="space-y-3">
                  {objectives.map((objective, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-success shrink-0 mt-0.5" />
                      <p className="text-muted-foreground">{objective}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Technologies */}
            <Card className="glass-card rounded-3xl p-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Code className="w-5 h-5 text-accent" />
                </div>
                <h2 className="text-xl font-bold">Technologies Used</h2>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {tools.map((tool) => (
                  <div
                    key={tool.name}
                    className="p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <p className="font-medium">{tool.name}</p>
                    <p className="text-xs text-muted-foreground">{tool.description}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Key Features */}
            <Card className="glass-card rounded-3xl p-8 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-secondary" />
                </div>
                <h2 className="text-xl font-bold">Key Features</h2>
              </div>

              <div className="space-y-4">
                {[
                  {
                    icon: Shield,
                    title: "Privacy-Preserving",
                    description: "Data never leaves local hospitals",
                  },
                  {
                    icon: Brain,
                    title: "AI-Powered",
                    description: "Neural network-based prediction",
                  },
                  {
                    icon: Users,
                    title: "Collaborative",
                    description: "Multi-institution training",
                  },
                  {
                    icon: Database,
                    title: "Scalable",
                    description: "Supports growing data sources",
                  },
                ].map((feature) => (
                  <div key={feature.title} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center">
                      <feature.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{feature.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Dataset Information */}
          <Card className="glass-card rounded-3xl p-8 mt-8 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-health/10 flex items-center justify-center">
                <Database className="w-5 h-5 text-health" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Dataset Information</h2>
                <p className="text-sm text-muted-foreground">
                  UCI Heart Disease Dataset - 918 observations, 11 features
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {datasetFeatures.map((feature) => (
                <div
                  key={feature.name}
                  className="p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <p className="font-medium text-sm">{feature.name}</p>
                  <p className="text-xs text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Federated Learning Explanation */}
          <Card className="glass-card rounded-3xl p-8 mt-8 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Brain className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-xl font-bold">What is Federated Learning?</h2>
            </div>

            <div className="prose prose-sm max-w-none text-muted-foreground">
              <p className="mb-4">
                Federated Learning (FL) is a machine learning approach that trains
                algorithms across multiple decentralized devices or servers holding local
                data samples, without exchanging them. This approach stands in contrast to
                traditional centralized machine learning techniques where all local
                datasets are uploaded to one server.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                  <h4 className="font-semibold text-foreground mb-2">
                    Traditional ML Approach
                  </h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Requires centralizing all data</li>
                    <li>• Privacy concerns with data transfer</li>
                    <li>• Regulatory compliance challenges</li>
                    <li>• Single point of failure</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-success/5 border border-success/10">
                  <h4 className="font-semibold text-foreground mb-2">
                    Federated Learning Approach
                  </h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Data stays at local institutions</li>
                    <li>• Only model updates are shared</li>
                    <li>• Privacy-preserving by design</li>
                    <li>• Decentralized & robust</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </BlurBackground>
  );
}
