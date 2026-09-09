import { services } from "@/lib/content";

export default function Services() {
  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[86rem] px-6 lg:px-10">
        <div className="max-w-3xl">
          <h2 className="type-section">What I do</h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
            Building the site is half the job. Getting it found is the other
            half, and most developers stop before that.
          </p>
        </div>

        <div className="mt-16 border-t border-ink-line">
          {services.map((service) => (
            <div
              key={service.title}
              className="group grid gap-4 border-b border-ink-line py-8 transition-colors duration-500 hover:bg-bone/[0.025] lg:grid-cols-12 lg:gap-10 lg:py-10"
            >
              <h3 className="font-display text-xl font-semibold tracking-tight text-bone transition-colors duration-500 group-hover:text-signal lg:col-span-5 lg:text-2xl">
                {service.title}
              </h3>

              <div className="lg:col-span-7">
                <p className="max-w-2xl text-[0.95rem] leading-relaxed text-muted">
                  {service.body}
                </p>
                <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                  {service.tags.map((tag) => (
                    <li key={tag} className="text-xs text-bone/45">
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
