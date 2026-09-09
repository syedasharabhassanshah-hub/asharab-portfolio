import { site } from "@/lib/site";
import { projects } from "@/lib/projects";
import SiteShot from "@/components/ui/SiteShot";
import BrowserFrame from "@/components/ui/BrowserFrame";
import Reveal from "@/components/ui/Reveal";

export default function Work() {
  return (
    <section id="work" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[86rem] px-6 lg:px-10">
        <div className="max-w-3xl">
          <h2 className="type-section">Selected work</h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
            Most of the {site.totalBuilt} sites I&rsquo;ve built stay private at
            the client&rsquo;s request. These {projects.length} agreed to be
            shown, and every link opens the real site, running in production
            today.
          </p>
        </div>

        <div className="mt-20 flex flex-col gap-24 sm:gap-32">
          {projects.map((project, index) => {
            const flipped = index % 2 === 1;

            return (
              <Reveal key={project.slug}>
                <article className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
                  <div
                    className={`lg:col-span-7 ${
                      flipped ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${project.name} in a new tab`}
                      className="group block"
                    >
                      <BrowserFrame
                        domain={project.domain}
                        className="transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1.5"
                      >
                        <SiteShot
                          slug={project.slug}
                          name={project.name}
                          tint={project.tint}
                          priority={index === 0}
                          sizes="(max-width: 1024px) 92vw, 58vw"
                          className="transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                        />
                      </BrowserFrame>
                    </a>
                  </div>

                  <div
                    className={`lg:col-span-5 ${
                      flipped ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <p className="text-xs text-signal">{project.sector}</p>

                    <h3 className="type-row mt-3">{project.name}</h3>

                    <p className="mt-4 font-display text-lg font-medium leading-snug text-bone/70">
                      &ldquo;{project.headline}&rdquo;
                    </p>

                    <p className="mt-6 text-[0.95rem] leading-relaxed text-muted">
                      {project.summary}
                    </p>

                    <ul className="mt-7 flex flex-col gap-2.5">
                      {project.contributions.map((item) => (
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

                    <ul className="mt-7 flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <li
                          key={tech}
                          className="rounded-full border border-ink-line px-3 py-1.5 text-xs text-muted"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>

                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group mt-8 inline-flex items-center gap-2.5 text-sm font-semibold text-bone"
                    >
                      <span className="border-b border-signal/40 pb-0.5 transition-colors duration-300 group-hover:border-signal">
                        Visit {project.domain}
                      </span>
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
                    </a>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
