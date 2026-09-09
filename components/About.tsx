import { industries } from "@/lib/content";
import { site } from "@/lib/site";

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[86rem] px-6 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-7">
            <h2 className="type-section">About</h2>

            <div className="mt-8 flex flex-col gap-6 text-base leading-relaxed text-muted sm:text-lg">
              <p className="text-bone">
                I&rsquo;m {site.fullName} — most people call me Asharab. Since{" "}
                {site.since} I&rsquo;ve built more than fifty websites for
                businesses that need them to work, not just look good in a
                portfolio. Only a handful appear on this page; most clients
                prefer their projects stay private, and that is their call to
                make.
              </p>
              <p>
                That work has covered a wide spread: ecommerce brands, medical
                and durable equipment suppliers, technology consultancies,
                marketing agencies, doctors and psychological consultants, and
                local trades like painters, electricians, and carpenters. A
                one-person painting business and a DME distributor have almost
                nothing in common, and the sites shouldn&rsquo;t either.
              </p>
              <p>
                Alongside development I create and manage Google Business
                Profiles, and handle SEO and generative engine optimisation so
                the sites rank in search and get cited by AI assistants. For most
                of my clients that visibility is the difference between a website
                and a phone that rings.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={site.links.fiverr}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-ink-line px-6 py-3 text-sm font-semibold transition-colors duration-300 hover:border-bone/40 hover:bg-bone/5"
              >
                Hire me on Fiverr
              </a>
              <a
                href={site.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-ink-line px-6 py-3 text-sm font-semibold transition-colors duration-300 hover:border-bone/40 hover:bg-bone/5"
              >
                Connect on LinkedIn
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <h3 className="border-b border-ink-line pb-3 font-display text-base font-semibold tracking-tight text-signal">
              Industries I&rsquo;ve built for
            </h3>
            <ul className="mt-2">
              {industries.map((industry) => (
                <li
                  key={industry}
                  className="border-b border-ink-line py-3.5 text-sm text-muted"
                >
                  {industry}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
