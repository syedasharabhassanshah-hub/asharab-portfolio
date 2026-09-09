export const services = [
  {
    title: "Business & ecommerce websites",
    body: "Storefronts and service sites built to sell, not just to exist. Product catalogues, booking and enquiry flows, payment setup, and a structure your customers can actually navigate.",
    tags: ["WordPress", "WooCommerce", "Landing pages", "Payments"],
  },
  {
    title: "Local SEO & Google Business Profile",
    body: "Creating and managing Google Business Profiles so local searches turn into phone calls. Categories, service areas, posts, photos, and reviews handled as ongoing work rather than a one-time setup.",
    tags: ["Google Business Profile", "Local pack", "Citations", "Reviews"],
  },
  {
    title: "SEO & generative engine optimisation",
    body: "Ranking in Google and getting cited by AI search. Technical fixes, structured data, and content shaped so that both crawlers and language models can quote you accurately.",
    tags: ["Technical SEO", "Schema", "GEO", "Content structure"],
  },
  {
    title: "Redesigns & performance work",
    body: "Rebuilding sites that look dated or load slowly. Core Web Vitals, mobile behaviour, accessibility, and the conversion path from first screen to enquiry.",
    tags: ["Core Web Vitals", "Accessibility", "CRO", "Migrations"],
  },
  {
    title: "Ongoing care & management",
    body: "Updates, backups, security, content changes, and analytics reporting. The part most freelancers skip and most business owners do not want to think about.",
    tags: ["Maintenance", "Security", "Analytics", "Support"],
  },
] as const;

export const process = [
  {
    title: "Understand the business",
    body: "Before any design, I need to know who buys from you, what they search for, and what a good week looks like. A medical equipment distributor and a painter need very different sites.",
  },
  {
    title: "Structure and design",
    body: "Sitemap first, then layouts. You see the real structure and the visual direction early, while changes are still cheap.",
  },
  {
    title: "Build",
    body: "The site gets built responsive from the start, with performance and search structure handled as I go rather than bolted on at the end.",
  },
  {
    title: "Launch",
    body: "Testing across devices, analytics and search console connected, Google Business Profile aligned, then the domain goes live.",
  },
  {
    title: "Rank and maintain",
    body: "The launch is the midpoint. Ongoing SEO, profile management, and reporting are what turn a finished site into a source of customers.",
  },
] as const;

export const skillGroups = [
  {
    label: "Build",
    items: ["WordPress", "WooCommerce", "Elementor", "HTML5", "CSS3", "JavaScript", "Tailwind CSS", "Next.js", "Responsive UI"],
  },
  {
    label: "Search",
    items: ["Technical SEO", "On-page SEO", "Local SEO", "Google Business Profile", "GEO / AI search", "Schema markup", "Keyword research", "Google Search Console"],
  },
  {
    label: "Commerce & conversion",
    items: ["Product catalogues", "Payment gateways", "Checkout optimisation", "Landing pages", "CRO", "Copy structure"],
  },
  {
    label: "Operations",
    items: ["Core Web Vitals", "Site security", "Backups & migrations", "Google Analytics 4", "Hosting & domains", "Ongoing maintenance"],
  },
] as const;

export const industries = [
  "Medical & durable equipment",
  "Ecommerce brands",
  "Smart home & automation",
  "Technology consulting",
  "Digital marketing agencies",
  "Doctors & psychological consultants",
  "Painters, electricians & carpenters",
  "Logistics & fleet services",
] as const;
