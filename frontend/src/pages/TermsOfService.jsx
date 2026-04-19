const sections = [
  {
    title: "1. Acceptance of Terms",
    content: `By creating an account or using MyApp's services, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree, please do not use our services.`,
  },
  {
    title: "2. Account Registration",
    content: `You must provide accurate, current, and complete information during registration. You are responsible for maintaining the confidentiality of your password and for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account.`,
  },
  {
    title: "3. Email Verification Requirement",
    content: `To access protected features, you must verify your email address using the OTP we send upon registration. Accounts that fail to complete email verification within a reasonable period may be subject to deletion. Do not share your OTP with anyone.`,
  },
  {
    title: "4. Acceptable Use",
    content: `You agree not to use our services to: violate any applicable laws; transmit spam or unsolicited communications; attempt to gain unauthorized access to our systems; upload malware or harmful code; impersonate any person or entity; or interfere with the proper working of the platform.`,
  },
  {
    title: "5. Intellectual Property",
    content: `The MyApp platform, including its design, code, and content, is owned by MyApp and protected by copyright and other intellectual property laws. You may not copy, modify, or distribute our code or design without explicit written permission.`,
  },
  {
    title: "6. Disclaimers",
    content: `Our services are provided "as is" without warranties of any kind. We do not warrant that our services will be uninterrupted, error-free, or free of harmful components. To the fullest extent permitted by law, we disclaim all warranties, express or implied.`,
  },
  {
    title: "7. Limitation of Liability",
    content: `In no event shall MyApp be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services, even if we have been advised of the possibility of such damages. Our total liability shall not exceed the amount you paid us in the past 12 months.`,
  },
  {
    title: "8. Termination",
    content: `We may suspend or terminate your account at our discretion if you violate these Terms. You may terminate your account at any time by contacting us. Upon termination, your right to use the services ceases immediately.`,
  },
  {
    title: "9. Governing Law",
    content: `These Terms are governed by the laws of the State of California, without regard to conflict of law principles. Any disputes shall be resolved in the courts of San Francisco County, California.`,
  },
  {
    title: "10. Changes to Terms",
    content: `We reserve the right to modify these Terms at any time. We will notify you of material changes via email at least 30 days before they take effect. Continued use of our services constitutes acceptance of the new Terms.`,
  },
];

export default function TermsOfService() {
  return (
    <div className="animate-fade-in section pt-32">
      <div className="container-xl max-w-3xl mx-auto">
        <div className="mb-10">
          <span className="badge bg-primary/10 border border-primary/20 text-primary mb-4 inline-flex">Legal</span>
          <h1 className="font-display text-4xl font-bold text-white mb-3">Terms of Service</h1>
          <p className="text-gray-400 text-sm">Last updated: December 15, 2024</p>
        </div>

        <div className="card-elevated p-8 space-y-8">
          <p className="text-gray-400 leading-relaxed border-b border-white/10 pb-6">
            These Terms of Service govern your use of MyApp's platform. Please read them carefully before
            registering. By using MyApp, you are entering into a binding legal agreement.
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
