import { site } from "@/lib/site";
import { projects } from "@/lib/projects";
import SiteShot from "@/components/ui/SiteShot";
import BrowserFrame from "@/components/ui/BrowserFrame";
import Reveal from "@/components/ui/Reveal";

function Arrow() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="h-3.5 w-3.5 text-signal transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.5 11.5 11.5 4.5M6 4.5h5.5V10" />
    </svg>
  );
}

export default function Work() {
  const [featured, ...rest] = projects;

  return (
    <section id="work" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-[86rem] px-6 lg:px-10">
        <div className="max-w-3xl">
          <h2 className="type-section">Live client sites</h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
            Most of the {site.totalBuilt} sites I&rsquo;ve built stay private at
            the client&rsquo;s request. These {projects.length} agreed to be
            shown. Every card opens the real site, running today.
          </p>
        </div>

        <Reveal>
          <article className="mt-14 grid items-center gap-8 rounded-2xl border border-ink-line bg-ink-raised/60 p-5 sm:p-8 lg:grid-cols-12 lg:gap-12">
            <a
              href={featured.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${featured.name} in a new tab`}
              className="group block lg:col-span-7"
            >
              <BrowserFrame domain={featured.domain}>
                <SiteShot
                  slug={featured.slug}
                  name={featured.name}
                  tint={featured.tint}
                  priority
                  sizes="(max-width: 1024px) 92vw, 52vw"
                  className="transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                />
              </BrowserFrame>
            </a>

            <div className="lg:col-span-5">
              <p className="text-xs text-signal">
                A UK trade, {featured.sector.toLowerCase()}
              </p>
              <h3 className="type-row mt-3">{featured.name}</h3>
              <p className="mt-5 text-[0.95rem] leading-relaxed text-muted">
                {featured.summary}
              </p>
              <ul className="mt-6 flex flex-col gap-2.5">
                {featured.contributions.map((item) => (
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
              <a
                href={featured.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-7 inline-flex items-center gap-2.5 text-sm font-semibold text-bone"
              >
                <span className="border-b border-signal/40 pb-0.5 transition-colors duration-300 group-hover:border-signal">
                  Visit {featured.domain}
                </span>
                <Arrow />
              </a>
            </div>
          </article>
        </Reveal>

        <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 xl:grid-cols-4">
          {rest.map((project) => (
            <a
              key={project.slug}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.name} in a new tab`}
              className="group block"
            >
              <BrowserFrame
                domain={project.domain}
                className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1"
              >
                <SiteShot
                  slug={project.slug}
                  name={project.name}
                  tint={project.tint}
                  sizes="(max-width: 640px) 92vw, (max-width: 1280px) 46vw, 22vw"
                />
              </BrowserFrame>
              <p className="mt-5 text-xs text-signal">{project.sector}</p>
              <h3 className="mt-1.5 flex items-center gap-2 font-display text-xl font-semibold tracking-tight text-bone">
                {project.name}
                <Arrow />
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {project.contributions[0]}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
