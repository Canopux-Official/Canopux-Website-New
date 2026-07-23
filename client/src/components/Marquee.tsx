import { useRef, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "../styles/Marquee.css";

import img1 from "../assets/img1.jpeg";
import img3 from "../assets/img3.png";
import img4 from "../assets/img4.jpeg";
import img6 from "../assets/img6.png";
import mathSuperhighwayLogo from "../assets/math-superhighway.png";
import kkrMahilaLogo from "../assets/kkr-mahila-logo.png";
import priyaanshiiLogo from "../assets/priyaanshii-tasteworks-logo.png";
import shipMyParcelLogo from "../assets/ship-my-parcel-logo.png";
import madeInCartLogo from "../assets/made-in-cart-logo.png";
import jagannathTradersLogo from "../assets/sri-jagannath-traders-logo.png";
import darshanJewelleryLogo from "../assets/New-Darshan-Jewellery-logo.png";

const AUTO_SCROLL_DURATION = 38;

type PartnerLogo = {
  src: string;
  name: string;
  alt: string;
  url?: string;
};

/* Partner logos with descriptive alt text */
const logos: PartnerLogo[] = [
  {
    src: jagannathTradersLogo,
    name: "Sri Jagannath Traders",
    alt: "Sri Jagannath Traders logo",
    url: "https://www.srijagannathtraders.in/",
  },
  {
    src: img4,
    name: "IEEE",
    alt: "IEEE partner logo",
    url: "https://www.indocrypt2025.in/",
  },
  {
    src: img1,
    name: "IEEE InGARSS 2025",
    alt: "IEEE InGARSS 2025 partner logo",
    url: "https://www.ingarss-2025.in/",
  },
  {
    src: img3,
    name: "IIIT Bhubaneswar",
    alt: "IIIT Bhubaneswar partner logo",
    url: "https://www.indocrypt2025.in/",
  },
  {
    src: img6,
    name: "JJ Institute of Science",
    alt: "JJ Institute of Science partner logo",
    url: "https://www.jjinstitute.in/",
  },
  {
    src: kkrMahilaLogo,
    name: "KKR Mahila Higher Secondary School",
    alt: "KKR Mahila Higher Secondary School partner logo",
    url: "https://www.kkrmahilahsschool.in/",
  },
  {
    src: madeInCartLogo,
    name: "Made in Cart",
    alt: "Made in Cart partner logo",
    url: "https://www.madeincart.in/",
  },
  {
    src: darshanJewelleryLogo,
    name: "New Darshan Jewellery",
    alt: "New Darshan Jewellery logo",
    url: "https://www.newdarshanjewellery.com/",
  },
  {
    src: mathSuperhighwayLogo,
    name: "MATH SUPERHIGHWAY",
    alt: "MATH SUPERHIGHWAY partner logo",
    url: "https://www.mathsuperhighway.com/",
  },
  {
    src: priyaanshiiLogo,
    name: "Priyaanshii Tasteworks Pvt. Ltd.",
    alt: "Priyaanshii Tasteworks Pvt. Ltd. partner logo",
    url: "https://www.priyaanshiitasteworks.in/",
  },
  {
    src: shipMyParcelLogo,
    name: "Ship My Parcel",
    alt: "Ship My Parcel partner logo",
    url: "https://www.shipmyparcel.in/",
  },
].sort((a, b) => a.name.localeCompare(b.name));

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
            {repeated.map((logo, i) => {
              const image = (
                <img
                  src={logo.src}
                  alt={logo.alt}
                  loading="lazy"
                  draggable={false}
                />
              );

              return (
                <figure
                  key={i}
                  className="logo-card"
                  aria-hidden={i >= logos.length}
                >
                  {logo.url ? (
                    <a
                      href={logo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit ${logo.name} website`}
                    >
                      {image}
                    </a>
                  ) : (
                    image
                  )}
                </figure>
              );
            })}
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
