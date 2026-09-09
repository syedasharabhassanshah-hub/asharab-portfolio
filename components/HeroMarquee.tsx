import { projects } from "@/lib/projects";
import SiteShot from "@/components/ui/SiteShot";

const columns = [projects.slice(0, 4), projects.slice(3, 7)];

/**
 * Two slowly counter-scrolling columns of the real client sites. This is the
 * page's one piece of ambient motion — the work itself, always in view.
 */
export default function HeroMarquee() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to bottom, transparent 0%, black 18%, black 72%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, black 18%, black 72%, transparent 100%)",
      }}
    >
      <div className="absolute -right-[14%] top-1/2 flex h-[135%] w-[112%] -translate-y-1/2 gap-5 rotate-[-8deg] sm:-right-[6%] sm:w-[88%] lg:right-[-4%] lg:w-[62%]">
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} className="relative flex-1 overflow-hidden">
            <div
              className={
                columnIndex % 2 === 0 ? "marquee-track" : "marquee-track-reverse"
              }
              style={
                {
                  "--marquee-duration": columnIndex % 2 === 0 ? "72s" : "88s",
                } as React.CSSProperties
              }
            >
              {[...column, ...column].map((project, i) => (
                <div
                  key={`${project.slug}-${i}`}
                  className="mb-5 overflow-hidden rounded-lg border border-ink-line/80 shadow-[0_20px_60px_-25px_rgba(0,0,0,0.95)]"
                >
                  <div className="aspect-[16/11]">
                    <SiteShot
                      slug={project.slug}
                      name={project.name}
                      tint={project.tint}
                      priority={i < 2}
                      sizes="(max-width: 1024px) 45vw, 30vw"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Keeps the headline readable over the moving plates. */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/92 to-ink/45 lg:via-ink/75 lg:to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/60" />
    </div>
  );
}
