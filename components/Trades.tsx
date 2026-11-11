import { site } from "@/lib/site";
import SiteShot from "@/components/ui/SiteShot";
import BrowserFrame from "@/components/ui/BrowserFrame";
import Reveal from "@/components/ui/Reveal";

const packages = [
  {
    name: "Local Launch",
    price: "£750",
    fit: "For a trade that needs a proper site, fast.",
    delivery: "Live in 3 to 7 working days",
    features: [
      "Up to 5 pages: Home, Services, About, Work & Reviews, Contact",
      "Click-to-call, WhatsApp and a quote form",
      "Your Google reviews and accreditations on show",
      "Set up to be found in local Google searches",
      "12 months of hosting included",
      "2 rounds of changes and 60 days of support",
    ],
  },
  {
    name: "Local Growth",
    price: "£1,350",
    fit: "For a business that wants more enquiries from search.",
    delivery: "Live in 10 to 15 working days",
    features: [
      "Up to 8 pages, with a page for each main service",
      "Project case studies with before and after photos",
      "4 articles written for launch",
      "Detailed quote form and online booking link",
      "Deeper local search setup and enquiry tracking",
      "12 months of hosting and technical care included",
    ],
  },
];

const examples = [
  {
    slug: "example-electrician",
    href: "/examples/electrician.html",
    trade: "Electrician",
    name: "Brightwell Electrical",
    tint: ["#0b1626", "#ffd23f"] as [string, string],
  },
  {
    slug: "example-plumber",
    href: "/examples/plumber.html",
    trade: "Plumbing & heating",
    name: "Harbour Plumbing & Heating",
    tint: ["#0e6b7c", "#ff6b4a"] as [string, string],
  },
  {
    slug: "example-builder",
    href: "/examples/builder.html",
    trade: "Builder",
    name: "Stonegate Builders",
    tint: ["#26221d", "#b4532a"] as [string, string],
  },
];

export default function Trades() {
  return (
    <section
      id="trades"
      className="relative border-y border-ink-line bg-ink-raised/60 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-[86rem] px-6 lg:px-10">
        <div className="max-w-3xl">
          <p className="text-xs text-signal">For UK trades</p>
          <h2 className="type-section mt-3">
            A website that gets your phone ringing
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
            Electricians, plumbers, builders, roofers, joiners and decorators.
            When someone searches for your trade in your town, they should find
            you, see your reviews and be able to call in one tap. Fixed prices,
            and nothing to pay until you have seen and approved your site.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {packages.map((pack) => (
            <Reveal key={pack.name}>
              <div className="flex h-full flex-col rounded-xl border border-ink-line bg-ink p-8 sm:p-10">
                <div className="flex flex-wrap items-baseline justify-between gap-4">
                  <h3 className="font-display text-2xl font-semibold tracking-tight">
                    {pack.name}
                  </h3>
                  <p className="font-display text-4xl font-bold tracking-tight text-signal">
                    {pack.price}
                  </p>
                </div>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">
                  {pack.fit}
                </p>

                <ul className="mt-7 flex flex-col gap-3">
                  {pack.features.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-sm leading-snug text-bone/80"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[0.55em] h-px w-4 shrink-0 bg-signal/70"
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                <p className="mt-8 border-t border-ink-line pt-5 text-xs text-bone/60">
                  {pack.delivery}, once I have your photos and details
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
          <a
            href={`${site.links.whatsapp}?text=${encodeURIComponent(
              "Hi Asharab, I'd like a free preview of a website for my business.",
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-signal px-8 py-3.5 text-sm font-semibold text-ink transition-transform duration-300 hover:-translate-y-0.5"
          >
            Get a free homepage preview on WhatsApp
          </a>
          <p className="text-sm text-muted">
            Or message {site.whatsappDisplay}. I&rsquo;ll mock up your homepage
            with your own photos and reviews, free, before you decide anything.
          </p>
        </div>

        <div className="mt-24">
          <h3 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            Example designs for trades
          </h3>
          <p className="mt-4 max-w-xl text-[0.95rem] leading-relaxed text-muted">
            These three are design examples for made-up businesses, to show
            what a trade site from me looks like. Open any of them and click
            around. For real client work, see{" "}
            <a
              href="#work"
              className="text-bone underline decoration-signal/40 underline-offset-4 hover:decoration-signal"
            >
              the sites above
            </a>
            .
          </p>

          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {examples.map((example, index) => (
              <Reveal key={example.slug} delay={index * 80}>
                <a
                  href={example.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open the ${example.name} example design in a new tab`}
                  className="group block"
                >
                  <BrowserFrame
                    domain="example design"
                    className="transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1.5"
                  >
                    <SiteShot
                      slug={example.slug}
                      name={`${example.name} example`}
                      tint={example.tint}
                      sizes="(max-width: 768px) 92vw, 30vw"
                    />
                  </BrowserFrame>
                  <p className="mt-5 text-xs text-signal">{example.trade}</p>
                  <p className="mt-1.5 font-display text-lg font-semibold tracking-tight text-bone">
                    {example.name}
                    <span className="ml-2 text-sm font-normal text-muted">
                      example
                    </span>
                  </p>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
