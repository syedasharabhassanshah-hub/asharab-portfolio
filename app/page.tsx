import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Skills from "@/components/Skills";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";
import { projects } from "@/lib/projects";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.fullName,
  alternateName: site.name,
  jobTitle: site.role,
  email: `mailto:${site.email}`,
  url: site.url,
  description: site.description,
  sameAs: [site.links.fiverr, site.links.linkedin],
  knowsAbout: [
    "Web development",
    "WordPress",
    "WooCommerce",
    "Ecommerce",
    "Search engine optimisation",
    "Local SEO",
    "Google Business Profile management",
    "Generative engine optimisation",
  ],
  subjectOf: projects.map((project) => ({
    "@type": "WebSite",
    name: project.name,
    url: project.url,
    about: project.sector,
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Nav />
      <main>
        <Hero />
        <Work />
        <Services />
        <Process />
        <Skills />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
