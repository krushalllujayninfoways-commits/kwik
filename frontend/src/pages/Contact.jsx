import { useState } from "react";
import toast from "react-hot-toast";
import api from "../utils/api";
import { validators, validateForm } from "../utils/validators";

const contactInfo = [
  { icon: "📧", label: "Email", value: "hello@myapp.com" },
  { icon: "📞", label: "Phone", value: "+1 (555) 123-4567" },
  { icon: "📍", label: "Address", value: "123 Tech Street, San Francisco, CA" },
  { icon: "⏰", label: "Hours", value: "Mon–Fri, 9am – 6pm PST" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const rules = {
    name: validators.minLength(2, "Name"),
    email: validators.email,
    subject: (value) => (value && value.trim().length > 120 ? "Subject must be 120 characters or fewer" : ""),
    message: validators.minLength(10, "Message"),
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) {
      setErrors((p) => ({ ...p, [name]: rules[name](value) }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { errors: nextErrors, isValid } = validateForm(rules, form);
    if (!isValid) {
      setErrors(nextErrors);
      return;
    }

    setLoading(true);
    try {
      const { data } = await api.post("/contact", form);
      toast.success(data.message);
      setForm({ name: "", email: "", subject: "", message: "" });
      setErrors({});
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <section className="section pt-32">
        <div className="container-xl max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-14">
            <span className="badge bg-primary/10 border border-primary/20 text-primary mb-4 inline-flex">
              Get in Touch
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
              We'd Love to Hear From You
            </h1>
            <p className="text-gray-400 max-w-xl mx-auto">
              Have a question, feedback, or business inquiry? Send us a message and we'll respond within one business day.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Contact info */}
            <div className="lg:col-span-2 space-y-4">
              {contactInfo.map((c) => (
                <div key={c.label} className="card flex items-start gap-4 hover:border-primary/30 transition-all">
                  <span className="text-2xl">{c.icon}</span>
                  <div>
                    <p className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-0.5">{c.label}</p>
                    <p className="text-white text-sm">{c.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <div className="lg:col-span-3 card-elevated p-8">
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="input-label">Name <span className="text-primary">*</span></label>
                    <input name="name" value={form.name} onChange={handleChange} placeholder="John Doe" className="input-field" required />
                    {errors.name && <p className="input-error">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="input-label">Email <span className="text-primary">*</span></label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="john@example.com" className="input-field" required />
                    {errors.email && <p className="input-error">{errors.email}</p>}
                  </div>
                </div>
                <div>
                  <label className="input-label">Subject</label>
                  <input name="subject" value={form.subject} onChange={handleChange} placeholder="How can we help?" className="input-field" />
                  {errors.subject && <p className="input-error">{errors.subject}</p>}
                </div>
                <div>
                  <label className="input-label">Message <span className="text-primary">*</span></label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Write your message here…"
                    className="input-field resize-none"
                    required
                  />
                  {errors.message && <p className="input-error">{errors.message}</p>}
                </div>
                <button type="submit" disabled={loading} className="btn-primary w-full py-3.5">
                  {loading ? "Sending…" : "Send Message →"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
