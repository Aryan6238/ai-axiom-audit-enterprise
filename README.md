# Axiom Audit | The Forensic Standard for LLMs

**Axiom Audit** is an enterprise-grade evaluation engine designed to scrutinize Large Language Model (LLM) outputs. Unlike standard chat interfaces, Axiom treats AI as a source of forensic data, providing the mission-critical infrastructure required to transition models from experimental labs to high-scrutiny production environments.

Website - https://ai-axiom-audit-enterprise-83mgej9fb-aryan-jalaks-projects.vercel.app/

---

## 🏛 What the Project is About

In regulated industries such as Finance, Legal, and Healthcare, LLM "hallucinations" or "logical collapse" can have catastrophic consequences. Axiom Audit was designed to provide a deterministic layer of verification for non-deterministic models. It allows AI Engineers and Risk Officers to:
- **Quantify Risk:** Assign objective scores to model reasoning.
- **Detect Anomalies:** Identify "Confident Hallucinations" where a model is certain but factually incorrect.
- **Ensure Compliance:** Generate legally defensible audit trails for institutional logging and regulatory oversight.

---

## 🚀 Features

- **Forensic Scrutiny Engine:** Leverages Gemini 3 Pro to map candidate responses against derived "Gold Standard" truths.
- **6-Dimensional Scoring:** Evaluates every response across Accuracy, Relevance, Completeness, Clarity, Hallucination Risk, and Safety.
- **Neural Drift Mapping:** Visual identification of factual contradictions and logic breaches.
- **Certified PDF Export:** Generates professional, boardroom-ready audit reports using `jsPDF`.
- **Qualitative Persona Feedback:** Provides developer-focused critiques on model strengths and optimization paths.
- **Secure SMTP Relay:** Integrated Node.js backend for institutional contact requests via `Nodemailer`.
- **Institutional Auth:** Secure local authentication using `bcryptjs` for forensic record persistence.
- **High-Fidelity UI:** A "Glassmorphism" obsidian-themed dashboard built for professional auditors.

---

## ⚙️ How It Works

Axiom Audit operates as a full-stack coordination layer:

1.  **Frontend (React/Vite):** The "Forensic Console" captures the User Prompt (Context) and the Model Output (Payload).
2.  **Logic Layer (Gemini API):** The app initiates a multi-stage audit. It first derives a "Ground Truth" for the prompt, then critiques the candidate response against that truth.
3.  **Relay Backend (Express):** When an institutional inquiry is made, the frontend communicates with a Node.js relay server. This server uses SMTP to securely transmit forensic inquiries to solutions architects.
4.  **Persistence:** Forensic reports and user credentials are encrypted and managed via a combination of `bcryptjs` and local persistence, simulating an enterprise database environment.

---

## 🛠 Tech Stack

- **React 19 & Vite:** For a high-performance, reactive auditor workspace.
- **Tailwind CSS:** For a precise, enterprise-grade obsidian aesthetic.
- **Google Gemini API (@google/genai):** Used as the "Judge-Engine" for logical and factual mapping.
- **Node.js & Express:** Providing the secure backend relay for SMTP transmissions.
- **Nodemailer:** Handles institutional email communication.
- **jsPDF & AutoTable:** Powering the certified forensic report generation.
- **Bcrypt.js:** Ensures secure hashing of auditor credentials.

---

## 📦 Installation & Setup

### 1. Prerequisites
- Node.js (v18+)
- A Google Gemini API Key ([Get it here](https://aistudio.google.com/))
- A Gmail account with an **App Password** (for SMTP Relay)

### 2. Local Configuration
Clone the repository and install dependencies:
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory:
```env
# Frontend API Access
API_KEY=your_gemini_api_key_here

# Backend Relay Access (server.js)
EMAIL_USER=your_email@gmail.com
EMAIL_APP_PASSWORD=your_16_digit_app_password
PORT=3001
```

### 4. Running the App
Open two terminal windows:

**Terminal 1 (Backend Relay):**
```bash
node server.js
```

**Terminal 2 (Frontend Console):**
```bash
npm start
```

---

## 🖱 Usage Instructions

1.  **Provision Access:** Create an Auditor ID on the Signup page.
2.  **Initialize Audit:** Navigate to the **Forensic Console**.
3.  **Input Context:** Paste the prompt you gave to your LLM in the "Context Query" field.
4.  **Input Payload:** Paste the model's response in the "Candidate Payload" field.
5.  **Execute Scan:** Click "Execute Forensic Scan". Axiom will now establish a baseline truth and map the candidate's logic.
6.  **Download Report:** Once the audit is signed, click "Download Report" to receive a certified PDF ledger.

---

## 🌐 Deployment Notes

### Backend (Render/Railway/Railway)
- Deploy `server.js`.
- Set `EMAIL_USER` and `EMAIL_APP_PASSWORD` as environment variables in the hosting dashboard.
- Ensure the `PORT` is dynamically handled (the provided `server.js` already does this).

### Frontend (Vercel/Netlify)
- Deploy the React application.
- Set `API_KEY` in the environment variables.
- **Crucial:** Set `RELAY_URL` to the URL of your deployed backend (e.g., `https://axiom-relay.onrender.com`).

---

## ⚠️ Important Notes

- **Security:** The `.gitignore` file is configured to hide your `.env` file. **Never** commit your `.env` or hardcode your Gmail App Password.
- **Gmail SMTP:** You must use a "Google App Password," not your standard Gmail login. Enable 2FA on your Google account to generate one.
- **API Quotas:** High-fidelity fact-checking uses Gemini 3 Pro. Ensure your API quota accommodates multiple logic-heavy requests.

---

© 2025 Axiom Forensic Audit System. Made with precision for the future of AI Alignment.
