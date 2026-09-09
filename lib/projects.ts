export type Project = {
  slug: string;
  name: string;
  url: string;
  domain: string;
  sector: string;
  headline: string;
  summary: string;
  contributions: string[];
  stack: string[];
  /** Two-stop gradient used for the loading plate behind the screenshot. */
  tint: [string, string];
};

export const projects: Project[] = [
  {
    slug: "lifeline-med-care",
    name: "Life Line Med Care",
    url: "https://lifelinemedcarellc.com/",
    domain: "lifelinemedcarellc.com",
    sector: "Home Health Equipment",
    headline: "Proactive care starts here",
    summary:
      "A retail storefront for clinical-grade home health equipment — blood pressure and glucose monitors, mobility aids, and orthopedic braces. The catalogue had to stay legible for older shoppers without looking like a hospital form.",
    contributions: [
      "Product catalogue and category architecture",
      "Accessibility-first type scale and contrast",
      "Trust layer: certifications, testimonials, support",
    ],
    stack: ["WordPress", "WooCommerce", "Responsive UI", "On-page SEO"],
    tint: ["#0E3A5B", "#1C7A6B"],
  },
  {
    slug: "vitalfort",
    name: "VitalFort",
    url: "https://vitalfortllc.com/",
    domain: "vitalfortllc.com",
    sector: "Durable Medical Equipment",
    headline: "Diagnostics, mobility, and orthotics",
    summary:
      "A DME distributor selling into a market where credibility closes the sale. The build leads with the three-step quality promise and FDA compliance rather than discount badges, and makes insurance and billing support a first-class part of the pitch.",
    contributions: [
      "Curation → Certification → Support narrative",
      "Product grid with clinical specification detail",
      "Insurance and billing enquiry funnel",
    ],
    stack: ["WordPress", "WooCommerce", "Schema Markup", "Core Web Vitals"],
    tint: ["#12284D", "#26507F"],
  },
  {
    slug: "intertec-system",
    name: "Intertec System",
    url: "https://intertecsystemllc.com/",
    domain: "intertecsystemllc.com",
    sector: "Smart Home Automation",
    headline: "Your smart home specialists",
    summary:
      "Installation, customisation, and repair for connected homes — lighting, security, climate, and video monitoring. Products and services sit side by side, so a visitor can buy a device or book an installer from the same page.",
    contributions: [
      "Combined product + service booking flow",
      "Device category system across five verticals",
      "Hardware photography art direction",
    ],
    stack: ["WordPress", "WooCommerce", "Custom Layouts", "Speed Optimisation"],
    tint: ["#0B2E53", "#1E6FA8"],
  },
  {
    slug: "quick-route",
    name: "Quick Route",
    url: "https://quickroutellc.com/",
    domain: "quickroutellc.com",
    sector: "Mobility & Fleet Technology",
    headline: "High-velocity mobility solutions",
    summary:
      "An entrepreneur-led firm in Towaco, NJ promising 48-hour storefront launches, privacy-first local smart home hubs, and fleet dashboards. Speed is the product, so the interface had to feel fast before a single claim was read.",
    contributions: [
      "Positioning around a 48-hour delivery promise",
      "Four service tracks under one navigation",
      "Fleet dashboard and security audit pages",
    ],
    stack: ["WordPress", "WooCommerce", "Conversion Copy", "Analytics"],
    tint: ["#0A2540", "#1D8FD1"],
  },
  {
    slug: "fusion-processing-hub",
    name: "Fusion Processing Hub",
    url: "https://fusionprocessinghubllc.com/",
    domain: "fusionprocessinghubllc.com",
    sector: "Software & Digital Transformation",
    headline: "Your partner in digital transformation",
    summary:
      "Custom software, web applications, CRM automation, and content production sold into banking, healthcare, education, and manufacturing. Five industries, one site, without the navigation collapsing under its own weight.",
    contributions: [
      "Information architecture across five industries",
      "Service capability and expertise sections",
      "Lead capture and consultation booking",
    ],
    stack: ["WordPress", "Custom Theming", "CRM Integration", "Technical SEO"],
    tint: ["#0D3B4A", "#16A0A5"],
  },
  {
    slug: "tech-processings",
    name: "Tech Processings",
    url: "https://techprocessingsllc.com/",
    domain: "techprocessingsllc.com",
    sector: "Technology Consulting",
    headline: "Seamless technology, endless possibilities",
    summary:
      "Consulting for businesses and individuals covering strategic planning, cost analysis, creative design, and market research. Corporate credibility with enough whitespace that the services stay scannable.",
    contributions: [
      "Corporate identity carried through the layout",
      "Service grid with clear engagement paths",
      "Distributed calls to action per section",
    ],
    stack: ["WordPress", "Elementor", "Responsive UI", "On-page SEO"],
    tint: ["#101C36", "#2B4C86"],
  },
  {
    slug: "digital-spades",
    name: "Digital Spades",
    url: "https://digitalspadesllc.com/",
    domain: "digitalspadesllc.com",
    sector: "Digital Marketing Agency",
    headline: "Create jaw-dropping websites",
    summary:
      "An agency selling web development, ecommerce, content marketing, and conversion optimisation. The brand runs on stark black and white, so the work had to hold attention through structure and typography instead of colour.",
    contributions: [
      "Monochrome brand system and layout rhythm",
      "Eight service lines organised into a growth story",
      "Security, analytics, and CRO offer pages",
    ],
    stack: ["WordPress", "WooCommerce", "CRO", "Site Security"],
    tint: ["#141414", "#3D3D3D"],
  },
];
