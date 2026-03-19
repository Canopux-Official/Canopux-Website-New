import '../styles/Terms.css';

function Terms() {
  return (
    <>

      <div className="legal-wrapper">
        <div className="legal-container">

          <h1>Legal Terms</h1>
          <div className="legal-meta">Last Updated: March 2026 &nbsp;·&nbsp; Canopux</div>

          <p className="legal-intro">
            By accessing or using our website and services, you agree to these Terms &amp; Conditions.
            Please read them carefully. If you do not agree, please discontinue use.
          </p>

          <div className="legal-section">
            <h2>1. Services</h2>
            <p>
              Canopux provides software development, AI solutions, web &amp; mobile development,
              cloud infrastructure, DevOps, and digital product engineering.
            </p>
          </div>



          <div className="legal-section">
            <h2>2. Use of Website</h2>
            <ul>
              <li>Use this website for lawful purposes only.</li>
              <li>Do not attempt to disrupt, harm, or gain unauthorized access to the platform.</li>
              <li>Automated scraping or data mining without written consent is prohibited.</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>3. Intellectual Property</h2>
            <p>
              All content, branding, and materials on this website are owned by Canopux unless
              otherwise stated. You may not reproduce or distribute them without prior written permission.
            </p>
          </div>

          <div className="legal-section">
            <h2>4. Client Engagement</h2>
            <ul>
              <li>All projects are governed by a separate signed agreement (SOW or contract).</li>
              <li>Scope, deliverables, and timelines are defined in those agreements.</li>
              <li>Any scope changes must be agreed upon in writing.</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>5. Payments &amp; Refunds</h2>
            <ul>
              <li>Payment terms are outlined in individual project agreements.</li>
              <li>All fees are non-refundable unless explicitly stated otherwise.</li>
              <li>Late payments may result in service suspension.</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>6. Privacy &amp; Data</h2>
            <p>
              Your use of our services is governed by our{" "}
              <a href="/privacy" style={{ color: "#3a7bd5" }}>Privacy Policy</a>.
              We take reasonable measures to protect your data but cannot guarantee absolute security.
            </p>
          </div>
          <div className="legal-section">
            <h2>7. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <p>
               <a href="mailto:support@canopux.org" style={{ color: "#3a7bd5" }}>
                support@canopux.org
              </a>
            </p>
          </div>
        </div>


      </div>
    </>
  );
};

export default Terms;