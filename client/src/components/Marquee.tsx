import { useRef, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "../styles/Marquee.css";

import img1 from "../assets/img1.jpeg";
import img2 from "../assets/img2.png";
import img3 from "../assets/img3.png";
import img4 from "../assets/img4.jpeg";
import img5 from "../assets/img5.png";
import img6 from "../assets/img6.png";
import mathSuperhighwayLogo from "../assets/math-superhighway.png";
import kkrMahilaLogo from "../assets/kkr-mahila-logo.png";
import priyaanshiiLogo from "../assets/priyaanshii-tasteworks-logo.png";
import shipMyParcelLogo from "../assets/ship-my-parcel-logo.png";
import madeInCartLogo from "../assets/made-in-cart-logo.png";

const AUTO_SCROLL_DURATION = 38;

/* Partner logos with descriptive alt text */
const logos = [
  { src: img1, alt: "Partner company technology logo" },
  { src: img2, alt: "Startup partner brand logo" },
  { src: img3, alt: "Enterprise partner company logo" },
  { src: img4, alt: "Digital product partner logo" },
  { src: img5, alt: "Technology partner company logo" },
  { src: img6, alt: "Cloud services partner logo" },
  {
    src: mathSuperhighwayLogo,
    alt: "MATH SUPERHIGHWAY partner logo",
    name: "MATH SUPERHIGHWAY",
  },
  {
    src: kkrMahilaLogo,
    alt: "KKR Mahila Higher Secondary School partner logo",
    name: "KKR Mahila Higher Secondary School",
  },
  {
    src: priyaanshiiLogo,
    alt: "Priyaanshii Tasteworks Pvt. Ltd. partner logo",
    name: "Priyaanshii Tasteworks Pvt. Ltd.",
  },
  {
    src: shipMyParcelLogo,
    alt: "Ship My Parcel partner logo",
    name: "Ship My Parcel",
  },
  {
    src: madeInCartLogo,
    alt: "Made in Cart partner logo",
    name: "Made in Cart",
  },
];

const repeated = [...logos, ...logos, ...logos];

export default function MarqueeSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const setWidthRef = useRef(0);
  const pausedRef = useRef(false);
  const manualScrollRef = useRef(false);

  const normalizeOffset = useCallback(() => {
    const setWidth = setWidthRef.current;
    if (!setWidth) return;

    while (offsetRef.current <= -setWidth) {
      offsetRef.current += setWidth;
    }
    while (offsetRef.current > 0) {
      offsetRef.current -= setWidth;
    }
  }, []);

  const applyTransform = useCallback((animate = false) => {
    const track = trackRef.current;
    if (!track) return;

    track.style.transition = animate ? "transform 0.45s ease" : "none";
    track.style.transform = `translateX(${offsetRef.current}px)`;
  }, []);

  const measureSetWidth = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setWidthRef.current = track.scrollWidth / 3;
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    measureSetWidth();

    const observer = new ResizeObserver(measureSetWidth);
    observer.observe(track);

    let frameId = 0;
    let lastTime = performance.now();

    const tick = (time: number) => {
      const setWidth = setWidthRef.current;
      const delta = time - lastTime;
      lastTime = time;

      if (setWidth && !pausedRef.current && !manualScrollRef.current) {
        const speed = setWidth / (AUTO_SCROLL_DURATION * 1000);
        offsetRef.current -= speed * delta;
        normalizeOffset();
        applyTransform(false);
      }

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
    };
  }, [applyTransform, measureSetWidth, normalizeOffset]);

  const scroll = (direction: "left" | "right") => {
    const wrap = trackRef.current?.parentElement;
    if (!wrap) return;

    const amount = Math.max(wrap.clientWidth * 0.7, 280);
    manualScrollRef.current = true;
    offsetRef.current += direction === "left" ? amount : -amount;
    normalizeOffset();
    applyTransform(true);

    window.setTimeout(() => {
      manualScrollRef.current = false;
    }, 460);
  };

  return (
    <section
      className="mq-section"
      aria-label="Partner companies and organizations working with Canopux"
    >
      <h2 className="sr-only">
        Technology Partners and Clients of Canopux
      </h2>

      <div className="mq-divider">
        <div className="mq-divider-line" />
        <span className="mq-divider-label">Our Partners</span>
        <div className="mq-divider-line" />
      </div>

      <div
        className="mq-carousel"
        onMouseEnter={() => {
          pausedRef.current = true;
        }}
        onMouseLeave={() => {
          pausedRef.current = false;
        }}
      >
        <button
          type="button"
          className="mq-arrow mq-arrow-left"
          onClick={() => scroll("left")}
          aria-label="View previous partners"
        >
          <ChevronLeft size={22} strokeWidth={2} />
        </button>

        <div className="mq-track-wrap">
          <div className="mq-track" ref={trackRef}>
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

        <button
          type="button"
          className="mq-arrow mq-arrow-right"
          onClick={() => scroll("right")}
          aria-label="View next partners"
        >
          <ChevronRight size={22} strokeWidth={2} />
        </button>
      </div>
    </section>
  );
}
