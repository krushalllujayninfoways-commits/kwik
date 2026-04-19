const sections = [
  {
    title: "1. Information We Collect",
    content: `We collect information you provide directly to us when you register for an account, including your name, email address, phone number, city, and professional position. We also collect information about how you interact with our services, such as login timestamps and activity logs.`,
  },
  {
    title: "2. How We Use Your Information",
    content: `We use the information we collect to provide, maintain, and improve our services; to process transactions; to send you verification codes and technical notices; to respond to your comments and questions; and to send you information about new features, if you opt in.`,
  },
  {
    title: "3. Email Verification",
    content: `As part of our registration process, we send a one-time password (OTP) to the email address you provide. This is a security measure to confirm that you own the email address. OTPs expire after 10 minutes and are deleted immediately upon use.`,
  },
  {
    title: "4. Data Security",
    content: `We implement industry-standard security measures including bcrypt password hashing (12 rounds), JWT-based authentication with expiry, rate limiting on all authentication endpoints, and HTTPS in transit. Passwords are never stored in plain text.`,
  },
  {
    title: "5. Data Retention",
    content: `We retain your account information for as long as your account is active. You may delete your account at any time by contacting us. Upon deletion, we remove your personal data within 30 days, except where retention is required by law.`,
  },
  {
    title: "6. Sharing of Information",
    content: `We do not sell, trade, or rent your personal information to third parties. We may share information with trusted service providers who assist us in operating our platform, provided they agree to keep this information confidential.`,
  },
  {
    title: "7. Cookies",
    content: `We use local storage to persist your authenticated session token. We do not use tracking cookies or third-party analytics cookies. You may clear your browser's local storage at any time to log out of all sessions.`,
  },
  {
    title: "8. Your Rights",
    content: `Depending on your location, you may have the right to access, correct, or delete your personal data; to object to or restrict our processing of your data; and to data portability. To exercise these rights, contact us at privacy@myapp.com.`,
  },
  {
    title: "9. Changes to This Policy",
    content: `We may update this Privacy Policy from time to time. We will notify you of significant changes by email or by posting a prominent notice on our website. Continued use of our services after changes constitutes acceptance of the updated policy.`,
  },
  {
    title: "10. Contact Us",
    content: `If you have questions about this Privacy Policy, please contact us at privacy@myapp.com or by mail at 123 Tech Street, San Francisco, CA 94105.`,
  },
];

export default function PrivacyPolicy() {
  return (
    <div className="animate-fade-in section pt-32">
      <div className="container-xl max-w-3xl mx-auto">
        <div className="mb-10">
          <span className="badge bg-primary/10 border border-primary/20 text-primary mb-4 inline-flex">Legal</span>
          <h1 className="font-display text-4xl font-bold text-white mb-3">Privacy Policy</h1>
          <p className="text-gray-400 text-sm">Last updated: December 15, 2024</p>
        </div>

        <div className="card-elevated p-8 space-y-8">
          <p className="text-gray-400 leading-relaxed border-b border-white/10 pb-6">
            At MyApp, your privacy is paramount. This policy explains what data we collect, why we collect it,
            and how we protect it. We believe in full transparency — no legalese, no surprises.
          </p>

          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="font-display text-xl font-semibold text-white mb-3">{s.title}</h2>
              <p className="text-gray-400 leading-relaxed text-sm">{s.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
