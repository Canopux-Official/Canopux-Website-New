import { useState } from "react";
import '../styles//Marquee.css';

import img1 from "../assets/img1.jpeg";
import img2 from "../assets/img2.png";
import img3 from "../assets/img3.png";
import img4 from "../assets/img4.jpeg";
import img5 from "../assets/img5.png";
import img6 from "../assets/img6.png";

const allLogos = [img1, img2, img3, img4, img5, img6];
const repeated = [...allLogos, ...allLogos, ...allLogos];

export default function MarqueeSection() {
  const [paused, setPaused] = useState(false);

  return (
    <>
      <section className="mq-section">

        <div className="mq-divider">
          <div className="mq-divider-line" />
          <span className="mq-divider-label">Our Partners</span>
          <div className="mq-divider-line" />
        </div>

        <div
          className="mq-rows"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="mq-track-wrap">
            <div className={`mq-track forward${paused ? " paused" : ""}`}>
              {repeated.map((logo, i) => (
                <div key={i} className="logo-card">
                  <img src={logo} alt="company logo" draggable={false} />
                </div>
              ))}
            </div>
          </div>
        </div>

      </section>
    </>
  );
}