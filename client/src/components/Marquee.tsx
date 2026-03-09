import { useState } from "react";
import "../styles/Marquee.css";

import img1 from "../assets/img1.jpeg";
import img2 from "../assets/img2.png";
import img3 from "../assets/img3.png";
import img4 from "../assets/img4.jpeg";
import img5 from "../assets/img5.png";
import img6 from "../assets/img6.png";

/* Partner logos with descriptive alt text */
const logos = [
  { src: img1, alt: "Partner company technology logo" },
  { src: img2, alt: "Startup partner brand logo" },
  { src: img3, alt: "Enterprise partner company logo" },
  { src: img4, alt: "Digital product partner logo" },
  { src: img5, alt: "Technology partner company logo" },
  { src: img6, alt: "Cloud services partner logo" },
];

/* Duplicate for infinite scroll animation */
const repeated = [...logos, ...logos, ...logos];

export default function MarqueeSection() {
  const [paused, setPaused] = useState(false);

  return (
    <section
      className="mq-section"
      aria-label="Partner companies and organizations working with Canopux"
    >

      {/* Hidden SEO heading */}
      <h2 className="sr-only">
        Technology Partners and Clients of Canopux
      </h2>

      {/* Divider */}
      <div className="mq-divider">
        <div className="mq-divider-line" />
        <span className="mq-divider-label">Our Partners</span>
        <div className="mq-divider-line" />
      </div>

      {/* Logo marquee */}
      <div
        className="mq-rows"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="mq-track-wrap">
          <div className={`mq-track forward${paused ? " paused" : ""}`}>

            {repeated.map((logo, i) => (
              <figure
                key={i}
                className="logo-card"
                aria-hidden={i >= logos.length}
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  loading="lazy"
                  draggable={false}
                />
              </figure>
            ))}

          </div>
        </div>
      </div>

    </section>
  );
}