
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { EvalTrial } from "../types";

export const exportAuditToPDF = (trial: EvalTrial) => {
  const doc = new jsPDF({
    orientation: "p",
    unit: "mm",
    format: "a4",
    putOnlyUsedFonts: true,
  }) as any;

  const dateObj = new Date(trial.timestamp);
  const timestamp = dateObj.toLocaleString();
  const fileDate = dateObj.toISOString().split('T')[0].replace(/-/g, '');
  
  // Set Document Metadata
  doc.setProperties({
    title: `Axiom Audit Report - ${trial.id}`,
    subject: `Forensic Evaluation: ${trial.userQuestion.substring(0, 50)}...`,
    author: "Axiom Forensic Engine",
    keywords: "LLM, Evaluation, Forensic, AI Audit, Compliance",
    creator: "Axiom Audit Platform"
  });

  // --- PAGE 1: COVER & EXECUTIVE SUMMARY ---

  // 1. Header Section (Obsidian Brand Bar)
  doc.setFillColor(5, 7, 10); 
  doc.rect(0, 0, 210, 45, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(26);
  doc.setFont("helvetica", "bold");
  doc.text("AXIOM", 14, 22);
  doc.setTextColor(99, 102, 241); // Indigo-500
  doc.text("AUDIT", 48, 22);
  
  doc.setTextColor(148, 163, 184); // slate-400
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.text("CERTIFIED LLM FORENSIC LEDGER • SECURE AUDIT TRAIL", 14, 30);
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.text(`AUDIT ID: ${trial.id}`, 14, 38);
  doc.text(`TIMESTAMP: ${timestamp}`, 145, 38);

  // 2. Executive Summary Header
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("1. EXECUTIVE SUMMARY", 14, 60);

  // Verdict Box
  const verdict = trial.evaluation?.finalVerdict || "PENDING";
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(14, 65, 182, 30, 3, 3, 'F');
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 116, 139);
  doc.text("Final Audit Verdict:", 20, 75);
  
  // Color code verdict
  if (verdict === 'Excellent') doc.setTextColor(16, 185, 129); // Emerald-500
  else if (verdict === 'Critical Failure') doc.setTextColor(244, 63, 94); // Rose-500
  else if (verdict === 'Needs Improvement') doc.setTextColor(245, 158, 11); // Amber-500
  else doc.setTextColor(99, 102, 241);
  
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text(verdict.toUpperCase(), 20, 85);

  // Overall Score
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Calibration Score:", 140, 75);
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text(`${trial.evaluation?.overallScore || 0}/30`, 140, 85);

  // 3. Quantitative Scoring Grid
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text("DETAILED METRICS", 14, 110);

  if (trial.evaluation) {
    doc.autoTable({
      startY: 115,
      head: [['DIMENSION', 'SCORE', 'FORENSIC JUSTIFICATION']],
      body: [
        ['Accuracy', `${trial.evaluation.accuracy.score}/5`, trial.evaluation.accuracy.justification],
        ['Relevance', `${trial.evaluation.relevance.score}/5`, trial.evaluation.relevance.justification],
        ['Completeness', `${trial.evaluation.completeness.score}/5`, trial.evaluation.completeness.justification],
        ['Clarity', `${trial.evaluation.clarity.score}/5`, trial.evaluation.clarity.justification],
        ['Safety & Bias', `${trial.evaluation.safetyAndBias.score}/5`, trial.evaluation.safetyAndBias.justification],
        ['Hallucination Risk', `${trial.evaluation.hallucinationRisk.score}/5`, trial.evaluation.hallucinationRisk.justification],
      ],
      theme: 'grid',
      headStyles: { fillColor: [5, 7, 10], fontSize: 9, fontStyle: 'bold' },
      styles: { fontSize: 8, cellPadding: 5, overflow: 'linebreak' },
      columnStyles: {
        0: { cellWidth: 40, fontStyle: 'bold' },
        1: { cellWidth: 20, halign: 'center' },
        2: { cellWidth: 'auto' }
      }
    });
  }

  // --- PAGE 2: FORENSICS & ROADMAP ---
  doc.addPage();
  
  // Forensic Findings
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("2. FORENSIC FINDINGS", 14, 25);

  if (trial.factCheck && trial.factCheck.issues.length > 0) {
    doc.autoTable({
      startY: 32,
      head: [['TYPE', 'EVIDENCE QUOTE', 'ANOMALY ANALYSIS', 'SEVERITY']],
      body: trial.factCheck.issues.map(i => [i.type, `"${i.quote}"`, i.finding, i.severity.toUpperCase()]),
      styles: { fontSize: 8 },
      headStyles: { fillColor: [51, 65, 85] },
      columnStyles: {
        0: { cellWidth: 25 },
        1: { fontStyle: 'italic', textColor: [153, 27, 27], cellWidth: 55 },
        2: { cellWidth: 'auto' },
        3: { fontStyle: 'bold', halign: 'center', cellWidth: 20 }
      }
    });
  } else {
    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(100, 116, 139);
    doc.text("No forensic breaches or hallucinations detected in the candidate payload.", 14, 38);
  }

  // 4. STRATEGIC ROADMAP
  let currentY = (doc as any).lastAutoTable?.finalY + 20 || 50;
  if (currentY > 180) { doc.addPage(); currentY = 25; }

  doc.setTextColor(15, 23, 42);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("3. STRATEGIC ROADMAP", 14, currentY);

  if (trial.humanFeedback) {
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("Structural Strengths:", 14, currentY + 10);
    doc.setFont("helvetica", "normal");
    const strengthLines = doc.splitTextToSize(trial.humanFeedback.strengths, 182);
    doc.text(strengthLines, 14, currentY + 16);
    
    currentY += 16 + (strengthLines.length * 5);
    
    doc.setFont("helvetica", "bold");
    doc.text("Optimization Roadmap:", 14, currentY + 10);
    doc.setFont("helvetica", "normal");
    trial.humanFeedback.improvementSuggestions.forEach((suggestion, i) => {
      doc.text(`${i + 1}. ${suggestion}`, 14, currentY + 18 + (i * 7));
    });
    
    currentY += 20 + (trial.humanFeedback.improvementSuggestions.length * 7);
  } else {
    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    doc.text("Advanced optimization data pending for this session.", 14, currentY + 12);
  }

  // --- PAGE 3: RAW AUDIT DATA ---
  doc.addPage();
  
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("4. RAW AUDIT DATA", 14, 25);

  doc.setFillColor(248, 250, 252);
  doc.rect(14, 32, 182, 230, 'F');

  doc.setFontSize(8);
  doc.setFont("courier", "bold");
  doc.setTextColor(71, 85, 105);
  doc.text("PROMPT_CONTEXT_START", 20, 42);
  
  doc.setFont("courier", "normal");
  const promptLines = doc.splitTextToSize(trial.userQuestion, 170);
  doc.text(promptLines, 20, 48);
  
  let respY = 48 + (promptLines.length * 4) + 10;
  doc.setFont("courier", "bold");
  doc.text("CANDIDATE_PAYLOAD_START", 20, respY);
  
  doc.setFont("courier", "normal");
  const respLines = doc.splitTextToSize(trial.candidateResponse, 170);
  doc.text(respLines, 20, respY + 6);

  // Pagination Footer
  const pageCount = (doc as any).internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(7);
    doc.setTextColor(148, 163, 184);
    doc.text(`AXIOM FORENSIC ENGINE • CONFIDENTIAL • ${trial.id}`, 14, 287);
    doc.text(`PAGE ${i} OF ${pageCount}`, 190, 287, { align: 'right' });
    
    // Add "Signed" watermark logic
    doc.setGState(new (doc as any).GState({opacity: 0.1}));
    doc.setFontSize(40);
    doc.setFont("helvetica", "bold");
    doc.text("CERTIFIED AUDIT", 40, 150, { angle: 45 });
    doc.setGState(new (doc as any).GState({opacity: 1.0}));
  }

  doc.save(`AXIOM_AUDIT_${trial.id}_${fileDate}.pdf`);
};
