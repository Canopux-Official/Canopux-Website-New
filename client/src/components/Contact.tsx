import '../styles/Contact.css'
import { useState, useEffect, useRef, type FormEvent } from "react"

type FormState = {
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  message: string;
};

const WHATSAPP_NUMBER = "918260783152";

function buildWhatsAppMessage(form: FormState) {
  return [
    "Hi Canopux, I'd like to enquire about a project.",
    "",
    `Name: ${form.name}`,
    `Email: ${form.email}`,
    form.company ? `Company / Project: ${form.company}` : null,
    form.service ? `Service needed: ${form.service}` : null,
    form.budget ? `Estimated budget: ${form.budget}` : null,
    "",
    "Message:",
    form.message,
  ]
    .filter((line): line is string => line !== null)
    .join("\n");
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function useInView(threshold = 0.06) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setVisible(true);
    }, { threshold });

    if (ref.current) obs.observe(ref.current);

    return () => obs.disconnect();
  }, [threshold]);

  return [ref, visible] as const;
}

const CONTACT_METHODS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="url(#cg1)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <defs><linearGradient id="cg1" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#5F86A5" /><stop offset="100%" stopColor="#5F86A5" /></linearGradient></defs>
      </svg>
    ),
    label: "Email Us",
    value: "hello@canopux.org",
    sub: "We reply within 30 minutes",
    href: "mailto:hello@canopux.org",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
        <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" stroke="url(#cg2)" strokeWidth="1.6" />
        <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" stroke="url(#cg2)" strokeWidth="1.6" />
        <defs><linearGradient id="cg2" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#5F86A5" /><stop offset="100%" stopColor="#5F86A5" /></linearGradient></defs>
      </svg>
    ),
    label: "Headquarters",
    value: "Bhubaneswar, Odisha 751003",
    sub: " · India",
    href: null,
  },

];

const SERVICES = [
  "Full-Stack Development",
  "AI / ML Integration",
  "DevOps & Cloud",
  "Mobile Apps",
  "Technical Consulting",
];

const BUDGETS = ["< ₹10k", "₹10k–₹50k", "₹50k–₹150k", "₹150k+"];

const SOCIALS_ROW1 = [
  { icon: "𝕏", label: "Twitter", href: "https://x.com/Canopux_team" },
  { icon: "in", label: "LinkedIn", href: "https://www.linkedin.com/company/canopux/" },
  { icon: "gh", label: "GitHub", href: "https://github.com/Canopux-Official" },
];

const SOCIALS_ROW2 = [
  { icon: "ig", label: "instagram", href: "https://www.instagram.com/canopux_team/" },
  { icon: "fb", label: "Facebook", href: " https://www.facebook.com/profile.php?id=61573815500432" },
];

export default function Contact() {
  const [rootRef, visible] = useInView(0.04);
  const [form, setForm] = useState({
    name: "", email: "", company: "", service: "", budget: "", message: "",
  });
  const [focused, setFocused] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [error, setError] = useState("");

  const handleChange = (field: keyof FormState, val: string) => {
    setForm((p) => ({ ...p, [field]: val }));
    if (error) setError("");

    if (field === "message") {
      setCharCount(val.length);
    }
  };

  const openWhatsApp = (message: string) => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    const popup = window.open(url, "_blank", "noopener,noreferrer");

    // Fallback if popup is blocked
    if (!popup) {
      window.location.href = url;
      return;
    }

    setSubmitted(true);
  };

  const handleSubmit = (e?: FormEvent) => {
    e?.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Please fill in your name, email, and message to continue.");
      return;
    }

    openWhatsApp(buildWhatsAppMessage(form));
  };

  return (
    <>

      <section
        id="contact"
        className="ct-root"
        ref={rootRef}
        aria-label="Contact Canopux software development company for AI development web development cloud DevOps and digital engineering projects"
      >
        <h2 className="sr-only">
          Contact Canopux Software Development Company for AI, Web Development, Cloud DevOps, Mobile App Development and Digital Engineering Services
        </h2>
        {/* ── BACKGROUND ── */}
        <div className="ct-bg-base" />
        <div className="ct-noise" />
        <div className="ct-aurora ct-aurora-1" />
        <div className="ct-aurora ct-aurora-2" />
        <div className="ct-aurora ct-aurora-3" />

        <svg className="ct-rings" viewBox="0 0 280 280">
          <circle cx="140" cy="140" r="52" />
          <circle cx="140" cy="140" r="78" />
          <circle cx="140" cy="140" r="104" />
          <circle cx="140" cy="140" r="130" />
        </svg>
        <svg className="ct-rings-r" viewBox="0 0 220 220">
          <circle cx="110" cy="110" r="40" />
          <circle cx="110" cy="110" r="62" />
          <circle cx="110" cy="110" r="84" />
          <circle cx="110" cy="110" r="106" />
        </svg>

        <div className="ct-wrap">

          {/* ── HEADER ── */}
          <div className={`ct-header${visible ? " in" : ""}`}>
            <div>
              <div className="ct-eyebrow">
                <div className="ct-eyebrow-line" />
                <span className="ct-eyebrow-text">Get In Touch</span>
              </div>
              <h2 className="ct-big-text">
                Let's build<br />
                <span className="grad">something great.</span>
              </h2>
            </div>
            <div className="ct-header-right">
              <p className="ct-header-sub">
                Have a project in mind? We'd love to hear about it. Tell us what you're building and we'll get back to you with <strong>a free scoping call</strong>.
              </p>
              <div className="ct-response-badge">
                <div className="ct-resp-pulse" />
                <span className="ct-resp-text">Average response time: under 30 minutes</span>
              </div>
            </div>
          </div>

          <div className="ct-divider" style={{ opacity: visible ? 1 : 0, transition: "opacity .6s .25s ease" }} />

          {/* ── MAIN GRID ── */}
          <div className="ct-main">

            {/* ── FORM CARD ── */}
            <form
              className={`ct-form-card${visible ? " in" : ""}`}
              aria-label="Project inquiry form"
              onSubmit={handleSubmit}
            >
              {submitted ? (
              <div className="ct-success">
                <div className="ct-success-icon">✓</div>
                <div className="ct-success-title">Opening WhatsApp…</div>
                <p className="ct-success-sub">
                  Your enquiry is ready to send. Confirm in WhatsApp and we’ll reply as soon as we can.
                </p>
                <div className="ct-success-badge">
                  <span>•</span> Prefills to <strong>+91 82607 83152</strong>
                </div>
                <button
                  type="button"
                  className="ct-btn-submit"
                  onClick={() => openWhatsApp(buildWhatsAppMessage(form))}
                >
                  <span>
                    <WhatsAppIcon />
                    Open WhatsApp again
                  </span>
                </button>
              </div>
            ) : (
              <>
                <div className="ct-form-title">Start a conversation</div>
                <div className="ct-form-sub">All fields marked * are required. We never share your info.</div>

                {/* Name + Email */}
                <div className="ct-field-row">
                  <div className={`ct-field${focused === "name" ? " focused" : ""}`}>
                    <label className="ct-label">Your Name *</label>
                    <input
                      name="name"
                      autoComplete="name"
                      className="ct-input"
                      placeholder="Ashish Mittal"
                      value={form.name}
                      onChange={e => handleChange("name", e.target.value)}
                      onFocus={() => setFocused("name")}
                      onBlur={() => setFocused("")}
                    />
                  </div>
                  <div className={`ct-field${focused === "email" ? " focused" : ""}`}>
                    <label className="ct-label">Work Email *</label>
                    <input
                      className="ct-input"
                      type="email"
                      autoComplete="email"
                      placeholder="you@company.com"
                      value={form.email}
                      onChange={e => handleChange("email", e.target.value)}
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused("")}
                    />
                  </div>
                </div>

                {/* Company */}
                <div className="ct-field-col">
                  <div className={`ct-field${focused === "company" ? " focused" : ""}`}>
                    <label className="ct-label">Company / Project</label>
                    <input
                      className="ct-input"
                      placeholder="Canopux Inc."
                      value={form.company}
                      onChange={e => handleChange("company", e.target.value)}
                      onFocus={() => setFocused("company")}
                      onBlur={() => setFocused("")}
                    />
                  </div>
                </div>

                {/* Service chips */}
                <div className="ct-field-col">
                  <label className="ct-label" style={{ display: "block", marginBottom: 10 }}>What do you need?</label>
                  <div className="ct-chips">
                    {SERVICES.map(s => (
                      <div
                        key={s}
                        className={`ct-chip${form.service === s ? " selected" : ""}`}
                        onClick={() => handleChange("service", form.service === s ? "" : s)}
                      >{s}</div>
                    ))}
                  </div>
                </div>

                {/* Budget chips */}
                <div className="ct-field-col" style={{ marginTop: 16 }}>
                  <label className="ct-label" style={{ display: "block", marginBottom: 10 }}>Estimated Budget</label>
                  <div className="ct-chips">
                    {BUDGETS.map(b => (
                      <div
                        key={b}
                        className={`ct-chip${form.budget === b ? " selected" : ""}`}
                        onClick={() => handleChange("budget", form.budget === b ? "" : b)}
                      >{b}</div>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div className="ct-field-col" style={{ marginTop: 16 }}>
                  <div className={`ct-field${focused === "message" ? " focused" : ""}`} style={{ position: "relative" }}>
                    <label className="ct-label">Your Message *</label>
                    <textarea
                      className="ct-textarea"
                      placeholder="Tell us about your project — what you're building, the challenges you're facing, and what success looks like..."
                      value={form.message}
                      onChange={e => handleChange("message", e.target.value)}
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused("")}
                      maxLength={500}
                    />
                    <span className={`ct-char${charCount > 420 ? " warn" : ""}`}>{charCount}/500</span>
                  </div>
                </div>

                {/* Submit row */}
                <div className="ct-submit-row">
                  <p className="ct-privacy">
                    Your data is never sold or shared.
                    {error ? <span className="ct-form-error"> {error}</span> : null}
                  </p>
                  <button
                    type="submit"
                    className="ct-btn-submit"
                  >
                    <span>
                      <WhatsAppIcon />
                      Send on WhatsApp
                      <span className="ct-btn-arr">→</span>
                    </span>
                  </button>
                </div>
              </>
            )}
            </form>

            {/* ── SIDEBAR ── */}
            <div className={`ct-sidebar${visible ? " in" : ""}`}>

              {/* Contact method cards */}
              {CONTACT_METHODS.map((m, i) => (
                <a
                  key={i}
                  className="ct-method-card"
                  href={m.href || undefined}
                  style={{ transitionDelay: `${0.05 + i * 0.07}s` }}
                >
                  <div className="ct-method-icon">{m.icon}</div>
                  <div>
                    <div className="ct-method-label">{m.label}</div>
                    <strong className="ct-method-value">{m.value}</strong>
                    <div className="ct-method-sub">{m.sub}</div>
                  </div>
                </a>
              ))}

              {/* Team expertise card */}
              <div className="ct-avail-card">
                <div className="ct-avail-title">Team Expertise</div>

                <div className="ct-avail-rows">
                  {[
                    { domain: "Full Stack", fill: "90%", members: "8 Devs" },
                    { domain: "AI / ML", fill: "70%", members: "5 Engineers" },
                    { domain: "App Developers", fill: "75%", members: "6 Devs" },
                    { domain: "Cloud / DevOps", fill: "60%", members: "4 Engineers" },
                    { domain: "Cyber Security", fill: "70%", members: "3 Engineers" },
                  ].map((r, i) => (
                    <div className="ct-avail-row" key={i}>
                      <span className="ct-avail-day">{r.domain}</span>

                      <div className="ct-avail-bar-wrap">
                        <div
                          className="ct-avail-bar"
                          style={{
                            width: visible ? r.fill : "0%",
                            transition: `width .8s ${0.4 + i * 0.1}s ease`,
                          }}
                        />
                      </div>

                      <span className="ct-avail-status">{r.members}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social card — 3-2 layout */}
              <div className="ct-social-card">
                <div className="ct-social-title">Find us online</div>

                {/* Row 1: 3 buttons */}
                <div className="ct-social-row">
                  {SOCIALS_ROW1.map(s => (
                    <a key={s.label} className="ct-social-btn" href={s.href}>
                      <span className="ct-social-icon">{s.icon}</span>
                      {s.label}
                    </a>
                  ))}
                </div>

                {/* Row 2: 2 buttons centred */}
                <div className="ct-social-row-2">
                  {SOCIALS_ROW2.map(s => (
                    <a key={s.label} className="ct-social-btn" href={s.href}>
                      <span className="ct-social-icon">{s.icon}</span>
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Trust bar — grows to fill remaining height */}
              <div className={`ct-trust-bar${visible ? " in" : ""}`}>
                <div className="ct-nda-badge">
                  <span className="ct-nda-icon">🔒</span>
                  Your conversation is 100% confidential
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>
    </>
  );
}