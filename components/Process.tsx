import { process } from "@/lib/content";

export default function Process() {
  return (
    <section id="process" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[86rem] px-6 lg:px-10">
        <div className="max-w-3xl">
          <h2 className="type-section">How a project runs</h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
            Five stages, in order. You always know which one we&rsquo;re in.
          </p>
        </div>

        <ol className="mt-16 max-w-4xl">
          {process.map((step, index) => (
            <li key={step.title} className="relative flex gap-6 sm:gap-10">
              {/* Connector line, stopping at the last step. */}
              <div className="flex flex-col items-center">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink-line bg-ink-raised font-display text-sm font-bold text-signal">
                  {index + 1}
                </span>
                {index < process.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="w-px flex-1 bg-gradient-to-b from-ink-line to-ink-line/20"
                  />
                )}
              </div>

              <div className={index < process.length - 1 ? "pb-12" : "pb-1"}>
                <h3 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-xl text-[0.95rem] leading-relaxed text-muted">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
