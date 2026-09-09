import { skillGroups } from "@/lib/content";

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[86rem] px-6 lg:px-10">
        <div className="max-w-3xl">
          <h2 className="type-section">Tools and capabilities</h2>
        </div>

        <div className="mt-16 grid gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group) => (
            <div key={group.label}>
              <h3 className="border-b border-ink-line pb-3 font-display text-base font-semibold tracking-tight text-signal">
                {group.label}
              </h3>
              <ul className="mt-5 flex flex-col gap-2.5">
                {group.items.map((item) => (
                  <li key={item} className="text-sm text-muted">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
