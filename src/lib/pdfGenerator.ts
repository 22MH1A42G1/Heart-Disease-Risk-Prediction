import jsPDF from "jspdf";

/**
 * Interface for patient details used in the prediction form
 */
interface PatientDetails {
  age: string;
  sex: string;
  chestPainType: string;
  restingBP: string;
  cholesterol: string;
  fastingBS: string;
  restingECG: string;
  maxHR: string;
  exerciseAngina: string;
  oldpeak: string;
  stSlope: string;
}

/**
 * Interface for prediction results
 */
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

/**
 * Interface for PDF report data
 */
export interface ReportData {
  doctorName: string;
  hospitalName: string;
  patientDetails: PatientDetails;
  result: PredictionResult;
  timestamp: string;
}

/**
 * Mapping of form field IDs to human-readable labels
 */
const FIELD_LABELS: Record<keyof PatientDetails, string> = {
  age: "Age (years)",
  sex: "Gender",
  chestPainType: "Chest Pain Type",
  restingBP: "Resting Blood Pressure (mm Hg)",
  cholesterol: "Cholesterol Level (mg/dL)",
  fastingBS: "Fasting Blood Sugar",
  restingECG: "ECG Result",
  maxHR: "Maximum Heart Rate",
  exerciseAngina: "Exercise-Induced Angina",
  oldpeak: "Oldpeak (ST Depression)",
  stSlope: "ST Slope",
};

/**
 * Mapping of select field values to human-readable labels
 */
const VALUE_LABELS: Record<string, string> = {
  M: "Male",
  F: "Female",
  ATA: "Atypical Angina (ATA)",
  NAP: "Non-Anginal Pain (NAP)",
  ASY: "Asymptomatic (ASY)",
  TA: "Typical Angina (TA)",
  "0": "No (< 120 mg/dL)",
  "1": "Yes (> 120 mg/dL)",
  Normal: "Normal",
  ST: "ST-T Wave Abnormality",
  LVH: "Left Ventricular Hypertrophy",
  N: "No",
  Y: "Yes",
  Up: "Upsloping",
  Flat: "Flat",
  Down: "Downsloping",
};

/**
 * Generates a PDF report for the heart disease risk prediction
 * @param data - Report data including doctor info, patient details, and prediction results
 * @returns void - Opens/downloads the PDF in the browser
 * @throws Error if required data is missing or PDF generation fails
 */
export function generatePDFReport(data: ReportData): void {
  try {
    // Validate required data
    if (!data.doctorName || !data.hospitalName) {
      throw new Error("Doctor name and hospital name are required");
    }
    if (!data.patientDetails) {
      throw new Error("Patient details are required");
    }
    if (!data.result) {
      throw new Error("Prediction result is required");
    }
    if (!data.timestamp) {
      throw new Error("Timestamp is required");
    }

    // Initialize jsPDF with A4 format
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  let yPosition = margin;

  // Helper function to add text with automatic line wrapping
  const addText = (
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    fontSize: number = 10
  ): number => {
    doc.setFontSize(fontSize);
    const lines = doc.splitTextToSize(text, maxWidth);
    doc.text(lines, x, y);
    return y + lines.length * fontSize * 0.4; // Return new Y position
  };

  // ============ HEADER SECTION ============
  // Title
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(220, 38, 38); // Red color for header
  doc.text("Heart Disease Risk Assessment Report", pageWidth / 2, yPosition, {
    align: "center",
  });
  yPosition += 10;

  // Add a line separator
  doc.setDrawColor(220, 38, 38);
  doc.setLineWidth(0.5);
  doc.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 8;

  // Doctor and Hospital Information
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(0, 0, 0);
  doc.text(`Doctor: ${data.doctorName}`, margin, yPosition);
  yPosition += 6;
  doc.text(`Hospital: ${data.hospitalName}`, margin, yPosition);
  yPosition += 6;
  doc.text(`Report Date: ${data.timestamp}`, margin, yPosition);
  yPosition += 12;

  // ============ PATIENT DETAILS SECTION ============
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(59, 130, 246); // Blue color for section headers
  doc.text("Patient Clinical Parameters", margin, yPosition);
  yPosition += 8;

  // Create a table for patient details
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(0, 0, 0);

  const tableStartY = yPosition;
  const col1X = margin;
  const col2X = margin + 80;
  const rowHeight = 7;

  // Add table headers with background
  doc.setFillColor(240, 240, 240);
  doc.rect(col1X, tableStartY - 5, 160, rowHeight, "F");
  doc.setFont("helvetica", "bold");
  doc.text("Parameter", col1X + 2, tableStartY);
  doc.text("Value", col2X + 2, tableStartY);
  doc.setFont("helvetica", "normal");
  yPosition = tableStartY + rowHeight;

  // Add patient details rows
  let rowIndex = 0;
  for (const [key, value] of Object.entries(data.patientDetails)) {
    const label = FIELD_LABELS[key as keyof PatientDetails];
    const displayValue = VALUE_LABELS[value] || value;

    // Alternate row background for better readability
    if (rowIndex % 2 === 0) {
      doc.setFillColor(250, 250, 250);
      doc.rect(col1X, yPosition - 5, 160, rowHeight, "F");
    }

    doc.text(label, col1X + 2, yPosition);
    doc.text(displayValue, col2X + 2, yPosition);
    yPosition += rowHeight;
    rowIndex++;
  }

  yPosition += 8;

  // ============ PREDICTION RESULTS SECTION ============
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(59, 130, 246);
  doc.text("Prediction Results", margin, yPosition);
  yPosition += 8;

  // Risk Level Box
  const riskBoxY = yPosition;
  const riskBoxHeight = 20;
  
  // Set color based on risk level
  let riskColor: [number, number, number];
  if (data.result.risk === "High") {
    riskColor = [220, 38, 38]; // Red
  } else if (data.result.risk === "Medium") {
    riskColor = [234, 179, 8]; // Yellow/Warning
  } else {
    riskColor = [34, 197, 94]; // Green
  }

  doc.setFillColor(...riskColor);
  doc.setDrawColor(...riskColor);
  doc.setLineWidth(1);
  doc.rect(margin, riskBoxY, 160, riskBoxHeight, "FD");

  // Risk text
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  doc.text(
    `Risk Level: ${data.result.risk.toUpperCase()}`,
    pageWidth / 2,
    riskBoxY + 8,
    { align: "center" }
  );
  doc.setFontSize(12);
  doc.text(
    `Risk Probability: ${data.result.probability.toFixed(1)}%`,
    pageWidth / 2,
    riskBoxY + 15,
    { align: "center" }
  );

  yPosition = riskBoxY + riskBoxHeight + 10;

  // ============ FEATURE IMPORTANCE SECTION ============
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(0, 0, 0);
  doc.text("Key Contributing Factors (XAI Analysis)", margin, yPosition);
  yPosition += 6;

  doc.setFontSize(9);
  doc.setFont("helvetica", "italic");
  doc.setTextColor(100, 100, 100);
  yPosition = addText(
    "Explainable AI analysis showing which clinical factors contribute most to the risk assessment:",
    margin,
    yPosition,
    pageWidth - 2 * margin,
    9
  );
  yPosition += 3;

  // Display top 3 features
  doc.setFont("helvetica", "normal");
  doc.setTextColor(0, 0, 0);
  data.result.featureImportance.slice(0, 3).forEach((item, index) => {
    const rank = index === 0 ? "①" : index === 1 ? "②" : "③";
    doc.text(
      `${rank} ${item.feature}: ${item.importance.toFixed(0)}%`,
      margin + 5,
      yPosition
    );
    yPosition += 6;
  });

  yPosition += 4;

  // ============ CLINICAL RECOMMENDATIONS SECTION ============
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(0, 0, 0);
  doc.text("Clinical Recommendations", margin, yPosition);
  yPosition += 6;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");

  // Add suggestions as bullet points
  data.result.suggestions.forEach((suggestion) => {
    // Check if we need a new page
    if (yPosition > pageHeight - 30) {
      doc.addPage();
      yPosition = margin;
    }

    doc.text("•", margin + 2, yPosition);
    yPosition = addText(
      suggestion,
      margin + 7,
      yPosition,
      pageWidth - 2 * margin - 7,
      10
    );
    yPosition += 2;
  });

  // ============ FOOTER SECTION ============
  yPosition = pageHeight - 20;
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.3);
  doc.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 5;

  doc.setFontSize(8);
  doc.setFont("helvetica", "italic");
  doc.setTextColor(100, 100, 100);
  doc.text(
    "This report is generated using Federated Learning AI Model for educational purposes.",
    pageWidth / 2,
    yPosition,
    { align: "center" }
  );
  yPosition += 4;
  doc.text(
    "Please consult with a qualified healthcare professional for medical advice.",
    pageWidth / 2,
    yPosition,
    { align: "center" }
  );

  // ============ SAVE PDF ============
  // Generate filename with timestamp
  const fileName = `Heart_Risk_Report_${new Date().getTime()}.pdf`;
  
  // Save and open the PDF in browser
  doc.save(fileName);
  } catch (error) {
    console.error("Error generating PDF report:", error);
    throw new Error("Failed to generate PDF report. Please try again.");
  }
}
