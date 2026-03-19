import React from "react";
import '../styles/Privacy.css';

const Privacy: React.FC = () => {
  return (
    <>
      <style>{`

      `}</style>

      <div className="privacy-wrapper">
        <div className="privacy-container">

          <h1>Privacy Policy</h1>
          <div className="privacy-meta">Last Updated: March 2026 &nbsp;·&nbsp; Canopux</div>

          <p className="privacy-intro">
            At Canopux, we respect your privacy. This policy explains what information we collect,
            how we use it, and how we protect it. By using our website or services, you agree to
            this policy.
          </p>

          <div className="privacy-section">
            <h2>1. Information We Collect</h2>
            <ul>
              <li><strong>Contact details</strong> — name, email, phone number when you reach out to us.</li>
              <li><strong>Project information</strong> — details shared during client onboarding or discovery.</li>
              <li><strong>Usage data</strong> — pages visited, browser type, and IP address via analytics tools.</li>
              <li><strong>Cookies</strong> — small files stored on your device to improve site experience.</li>
            </ul>
          </div>

          <div className="privacy-section">
            <h2>2. How We Use Your Information</h2>
            <ul>
              <li>To respond to inquiries and deliver our services.</li>
              <li>To manage client projects and communications.</li>
              <li>To improve our website and user experience.</li>
              <li>To send relevant updates (you may opt out at any time).</li>
            </ul>
          </div>

          <div className="privacy-section">
            <h2>3. Sharing of Information</h2>
            <p>
              We do not sell or rent your personal data. We may share information with trusted
              third-party service providers (e.g., hosting, analytics) strictly to operate our
              services, and only under confidentiality obligations.
            </p>
          </div>

          <div className="privacy-section">
            <h2>4. Cookies</h2>
            <p>
              We use essential and analytics cookies. You can disable cookies in your browser
              settings, though some parts of the site may not function properly as a result.
            </p>
          </div>

          <div className="privacy-section">
            <h2>5. Data Retention</h2>
            <p>
              We retain your data only as long as necessary to fulfill the purposes described in
              this policy, or as required by law. Client project data is retained for the duration
              of the engagement and a reasonable period thereafter.
            </p>
          </div>

          <div className="privacy-section">
            <h2>6. Data Security</h2>
            <p>
              We implement reasonable technical and organizational measures to protect your data.
              However, no method of transmission over the internet is 100% secure, and we cannot
              guarantee absolute security.
            </p>
          </div>

          <div className="privacy-section">
            <h2>7. Your Rights</h2>
            <ul>
              <li>Access or request a copy of your personal data.</li>
              <li>Request correction of inaccurate information.</li>
              <li>Request deletion of your data, subject to legal obligations.</li>
              <li>Opt out of marketing communications at any time.</li>
            </ul>
          </div>

          <hr className="privacy-divider" />


        </div>
      </div>
    </>
  );
};

export default Privacy;