import { site } from "@/lib/site";
import { projects } from "@/lib/projects";
import HeroMarquee from "@/components/HeroMarquee";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-20 pt-32 sm:pb-28 sm:pt-36"
    >
      <HeroMarquee />

      <div className="relative z-10 mx-auto w-full max-w-[86rem] px-6 lg:px-10">
        <div className="max-w-[46rem] lg:max-w-[42rem]">
          <h1 className="type-mega font-extrabold">
            I build websites businesses run on.
          </h1>

          <div className="mt-8 h-px w-20 bg-signal" />

          <p className="mt-8 max-w-[38rem] text-base leading-relaxed text-muted sm:text-lg">
            {site.fullName}, web developer and digital solutions partner. Since
            2020 I&rsquo;ve built storefronts, service sites, and search
            visibility for medical equipment suppliers, ecommerce brands,
            consultancies, and the local trades.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#work"
              className="rounded-full bg-signal px-7 py-3.5 text-sm font-semibold text-ink transition-transform duration-300 hover:-translate-y-0.5"
            >
              See the work
            </a>
            <a
              href="#contact"
              className="rounded-full border border-ink-line px-7 py-3.5 text-sm font-semibold text-bone transition-colors duration-300 hover:border-bone/40 hover:bg-bone/5"
            >
              Start a project
            </a>
          </div>

          <dl className="mt-16 grid max-w-lg grid-cols-3 gap-6 border-t border-ink-line pt-8">
            {[
              { value: `${projects.length}`, label: "Client sites shipped" },
              { value: "2020", label: "Building since" },
              { value: "8+", label: "Industries served" },
            ].map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-3xl font-bold tracking-tight text-bone sm:text-4xl">
                  {stat.value}
                </dd>
                <p className="mt-1.5 text-xs leading-snug text-muted">
                  {stat.label}
                </p>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
