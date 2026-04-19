const nodemailer = require("nodemailer");

// Build transporter — falls back to Ethereal (fake SMTP) if not configured
function createTransporter() {
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT) || 587,
      secure: false, // TLS
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  // Demo mode: log OTP to console
  return null;
}

const OTP_TEMPLATE = (name, otp, expiresMin) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Email Verification</title>
</head>
<body style="margin:0;padding:0;font-family:'Segoe UI',Arial,sans-serif;background:#f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.08);">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%);padding:40px 40px 32px;text-align:center;">
              <h1 style="margin:0;color:#e94560;font-size:28px;letter-spacing:2px;text-transform:uppercase;">MyApp</h1>
              <p style="margin:8px 0 0;color:#a0aec0;font-size:13px;letter-spacing:1px;">SECURE VERIFICATION</p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              <p style="margin:0 0 16px;color:#2d3748;font-size:16px;">Hi <strong>${name}</strong>,</p>
              <p style="margin:0 0 28px;color:#4a5568;font-size:15px;line-height:1.6;">
                Thank you for registering! Use the verification code below to confirm your email address.
              </p>
              <!-- OTP Box -->
              <div style="background:#f7fafc;border:2px dashed #e94560;border-radius:12px;padding:28px;text-align:center;margin:0 0 28px;">
                <p style="margin:0 0 8px;color:#718096;font-size:13px;text-transform:uppercase;letter-spacing:2px;">Your OTP Code</p>
                <p style="margin:0;font-size:44px;font-weight:700;letter-spacing:12px;color:#1a1a2e;">${otp}</p>
                <p style="margin:12px 0 0;color:#e94560;font-size:13px;">⏱ Expires in ${expiresMin} minutes</p>
              </div>
              <p style="margin:0 0 8px;color:#718096;font-size:13px;">
                If you did not create an account, please ignore this email.
              </p>
              <p style="margin:0;color:#718096;font-size:13px;">
                For security, never share this code with anyone.
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background:#f7fafc;padding:20px 40px;text-align:center;border-top:1px solid #e2e8f0;">
              <p style="margin:0;color:#a0aec0;font-size:12px;">© 2025 MyApp. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

async function sendOtpEmail(to, name, otp) {
  const expiresMin = parseInt(process.env.OTP_EXPIRES_MINUTES) || 10;
  const transporter = createTransporter();

  if (!transporter) {
    // Demo / dev mode — print to console
    console.log("\n" + "═".repeat(50));
    console.log(`📧 DEMO MODE — OTP for ${to}`);
    console.log(`   Name : ${name}`);
    console.log(`   OTP  : ${otp}`);
    console.log(`   Exp  : ${expiresMin} min`);
    console.log("═".repeat(50) + "\n");
    return { demo: true };
  }

  const info = await transporter.sendMail({
    from: `"${process.env.FROM_NAME || "MyApp"}" <${process.env.FROM_EMAIL || process.env.SMTP_USER}>`,
    to,
    subject: `${otp} — Your MyApp Verification Code`,
    html: OTP_TEMPLATE(name, otp, expiresMin),
  });

  console.log(`📧 Email sent: ${info.messageId}`);
  return info;
}

async function sendContactEmail({ name, email, subject, message }) {
  const transporter = createTransporter();
  const inbox = process.env.CONTACT_RECEIVER_EMAIL || process.env.FROM_EMAIL || process.env.SMTP_USER;

  if (!inbox) {
    console.log("\n" + "═".repeat(50));
    console.log("📨 DEMO MODE — Contact message received");
    console.log(`   From   : ${name} <${email}>`);
    console.log(`   Subject: ${subject}`);
    console.log(`   Message: ${message}`);
    console.log("═".repeat(50) + "\n");
    return { demo: true };
  }

  if (!transporter) {
    console.log("\n" + "═".repeat(50));
    console.log("📨 CONTACT MESSAGE");
    console.log(`   To     : ${inbox}`);
    console.log(`   From   : ${name} <${email}>`);
    console.log(`   Subject: ${subject}`);
    console.log(`   Message: ${message}`);
    console.log("═".repeat(50) + "\n");
    return { demo: true };
  }

  const info = await transporter.sendMail({
    from: `"${process.env.FROM_NAME || "MyApp"}" <${process.env.FROM_EMAIL || process.env.SMTP_USER}>`,
    to: inbox,
    replyTo: email,
    subject: `[Contact] ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#1f2937;">
        <h2 style="margin-bottom:16px;">New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <div style="margin-top:20px;padding:16px;background:#f3f4f6;border-radius:8px;white-space:pre-wrap;">${message}</div>
      </div>
    `,
  });

  console.log(`📨 Contact email sent: ${info.messageId}`);
  return info;
}

module.exports = { sendOtpEmail, sendContactEmail };
