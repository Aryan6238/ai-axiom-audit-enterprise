
/**
 * Forensic Inquiry Ledger & Relay Service
 * Manages institutional contact requests via SMTP Relay and Local Persistence.
 */

export interface ContactInquiry {
  id: string;
  company: string;
  email: string;
  message: string;
  timestamp: number;
}

const INQUIRY_DB_KEY = 'axiom_inquiry_ledger';
// Point this to your local server.js instance
const RELAY_ENDPOINT = 'http://localhost:3001/api/contact';

export const contactService = {
  /**
   * Save a new architect inquiry to the local ledger and relay via SMTP.
   */
  submitInquiry: async (company: string, email: string, message: string): Promise<void> => {
    // 1. Basic Sanitization
    const sanitize = (str: string) => str.replace(/<[^>]*>?/gm, '').trim();
    
    const cleanCompany = sanitize(company);
    const cleanEmail = sanitize(email);
    const cleanMessage = sanitize(message);

    if (!cleanCompany || !cleanEmail || !cleanMessage) {
      throw new Error("All forensic fields are required.");
    }

    // 2. Local Persistence (Forensic Backup)
    const ledger: ContactInquiry[] = contactService.getInquiries();
    const newEntry: ContactInquiry = {
      id: `REQ-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      company: cleanCompany,
      email: cleanEmail,
      message: cleanMessage,
      timestamp: Date.now()
    };

    ledger.push(newEntry);
    localStorage.setItem(INQUIRY_DB_KEY, JSON.stringify(ledger));

    // 3. Attempt SMTP Relay via Backend
    try {
      const response = await fetch(RELAY_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company: cleanCompany,
          email: cleanEmail,
          message: cleanMessage
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Uplink to relay server failed.");
      }
    } catch (err: any) {
      console.warn("[AXIOM] Email relay unavailable. Inquiries saved to local forensic ledger only.", err);
      // We throw error here only if we want to force SMTP for the UI "success" state
      // For this student demo, we'll throw if the relay fails so the user knows they need the backend.
      throw new Error("SMTP Relay Offline. Ensure the Axiom backend server is active with valid credentials.");
    }
  },

  /**
   * Retrieve all inquiries for administrative review.
   */
  getInquiries: (): ContactInquiry[] => {
    const data = localStorage.getItem(INQUIRY_DB_KEY);
    return data ? JSON.parse(data) : [];
  },

  /**
   * Wipe the local ledger.
   */
  clearInquiries: () => {
    localStorage.removeItem(INQUIRY_DB_KEY);
  }
};
