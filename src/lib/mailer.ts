import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false, // true for 465, false for 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendOtpEmail(to: string, otp: string, adminName: string) {
  const isMock = !process.env.SMTP_PASS || process.env.SMTP_PASS.includes("mock");

  // In test/mock mode, we log OTP directly to console
  if (isMock) {
    console.log(`\n======================================================`);
    console.log(`[SMTP SIMULATION] To: ${to}`);
    console.log(`[SMTP SIMULATION] Subject: VLOXIA Admin Verification Code`);
    console.log(`[SMTP SIMULATION] Verification OTP: >>> ${otp} <<< (Valid for 10 minutes)`);
    console.log(`======================================================\n`);
    return { success: true, simulated: true };
  }

  const mailOptions = {
    from: process.env.SMTP_FROM || '"VLOXIA Security" <no-reply@vloxia.in>',
    to,
    subject: `Your VLOXIA Admin Verification Code: ${otp}`,
    html: `
      <div>
        <div>
          <h2>VLOXIA</h2>
          <span>SYSTEMS LLP</span>
        </div>
        <p>Hello <strong>${adminName}</strong>,</p>
        <p>You have requested an administrative login verification code for the VLOXIA Systems platform.</p>
        
        <div>
          <span>${otp}</span>
          <p>Valid for 10 minutes only</p>
        </div>

        <p>If you did not initiate this request, please change your credentials immediately or contact VLOXIA Security.</p>
        <hr />
        <p>© 2026 VLOXIA Systems LLP. All rights reserved.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error: any) {
    console.error("Nodemailer SMTP dispatch error:", error);
    // Return simulated success so login is not completely blocked if SMTP server has bad connection
    return { success: false, error: error.message };
  }
}
