import atsImage from "../assets/showcase/ats-resume-screening.png";
import indocryptImage from "../assets/showcase/indocrypt-2025.png";
import jjImage from "../assets/showcase/jj-institute.png";
import arogsphereImage from "../assets/showcase/arogsphere.png";
import constructhubImage from "../assets/showcase/constructhub.png";
import mathSuperhighwayImage from "../assets/showcase/math-superhighway.png";
import madeInCartImage from "../assets/showcase/madeincart.png";
import kkrMahilaImage from "../assets/showcase/kkr-mahila.png";
import sriJagannathTradersImage from "../assets/showcase/Sri Jagannath Traders hero.png";

export type FeaturedProduct = {
  id: string;
  name: string;
  description: string;
  image: string;
  imageAlt: string;
  techStack?: string[];
};

export const featuredProducts: FeaturedProduct[] = [
  {
    id: "ats-resume-screening",
    name: "ATS Resume Screening",
    description: "AI-powered resume screening and hiring workflow intelligence.",
    image: atsImage,
    imageAlt: "ATS Resume Screening product dashboard screenshot",
    techStack: ["React", "TypeScript", "AI/ML"],
  },
  {
    id: "indocrypt-2025",
    name: "Indocrypt 2025",
    description: "Conference platform for registrations, schedules, and updates.",
    image: indocryptImage,
    imageAlt: "Indocrypt 2025 website screenshot",
    techStack: ["React", "Node.js", "CMS"],
  },
  {
    id: "jj-institute",
    name: "JJ Institute",
    description: "Education website focused on admissions and student outcomes.",
    image: jjImage,
    imageAlt: "JJ Institute of Science website screenshot",
    techStack: ["React", "Performance SEO"],
  },
  {
    id: "arogsphere",
    name: "ArogSphere",
    description: "Healthcare discovery and medicine comparison experience.",
    image: arogsphereImage,
    imageAlt: "ArogSphere healthcare platform screenshot",
    techStack: ["React", "Search", "Data APIs"],
  },
  {
    id: "constructhub",
    name: "ConstructHub",
    description: "Construction operations dashboard for projects and budgets.",
    image: constructhubImage,
    imageAlt: "ConstructHub product dashboard screenshot",
    techStack: ["React", "Charts", "Workflow"],
  },
  {
    id: "math-superhighway",
    name: "Math SuperHighway",
    description: "Modern learning platform for structured math programs.",
    image: mathSuperhighwayImage,
    imageAlt: "Math SuperHighway website screenshot",
    techStack: ["React", "Animations", "Brand UI"],
  },
  {
    id: "madeincart",
    name: "MadeInCart",
    description: "Commerce platform tailored for local brands and fast discovery.",
    image: madeInCartImage,
    imageAlt: "MadeInCart ecommerce platform screenshot",
    techStack: ["React", "Commerce", "Discovery"],
  },
  {
    id: "kkr-mahila",
    name: "KKR Mahila HS School",
    description: "School website crafted around trust, clarity, and admissions.",
    image: kkrMahilaImage,
    imageAlt: "KKR Mahila school website screenshot",
    techStack: ["React", "Brand UI", "Content"],
  },
  {
    id: "sri-jagannath-traders",
    name: "Sri Jagannath Traders",
    description: "Premium steel distributor website for product catalogues, industries, and bulk supply.",
    image: sriJagannathTradersImage,
    imageAlt: "Sri Jagannath Traders website hero screenshot",
    techStack: ["React", "Brand UI", "Content"],
  },
];
