
/**
 * AXIOM AUDIT | SECURE EMAIL RELAY (NODE.JS)
 * 
 * To run this backend:
 * 1. Install dependencies: npm install express nodemailer cors dotenv
 * 2. Set environment variables in a .env file:
 *    EMAIL_USER=your-email@gmail.com
 *    EMAIL_APP_PASSWORD=your-16-digit-app-password
 * 3. Start server: node server.js
 */

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;
const TARGET_EMAIL = 'aryanbusiness38@gmail.com';

app.post('/api/contact', async (req, res) => {
  const { company, email, message } = req.body;

  // 1. Server-side Validation
  if (!company || !email || !message) {
    return res.status(400).json({ error: 'Missing forensic fields.' });
  }

  // 2. Configure NodeMailer Transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  // 3. Construct Email Payload
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: TARGET_EMAIL,
    subject: `New Solutions Architect Request | ${company}`,
    text: `
AXIOM AUDIT INQUIRY REPORT
===========================
Company: ${company}
Sender Email: ${email}

Message Body:
---------------------------
${message}
---------------------------
End of Transmission.
    `,
  };

  try {
    // 4. Execute Transmission
    await transporter.sendMail(mailOptions);
    console.log(`[AXIOM] Inquiry relayed for ${company}`);
    res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('[AXIOM ERROR] Relay Failure:', error);
    res.status(500).json({ 
      error: 'Relay failed. Ensure EMAIL_USER and EMAIL_APP_PASSWORD are set correctly.' 
    });
  }
});

app.get('/', (req, res) => {
  res.send('Axiom Audit Backend is running! Use /api/contact for form submissions.');
});

app.listen(PORT, () => {
  console.log(`[AXIOM] Forensic Email Relay active on port ${PORT}`);
});
