"use client";

import Image from "next/image";
import { useState } from "react";
import { site } from "@/lib/site";

type Example = {
  slug: string;
  trade: string;
  name: string;
  town: string;
  idea: string;
  points: string[];
  height: number;
  swatch: [string, string];
};

/** Example designs for fictional businesses. `height` is the pixel height of
 *  public/work/example-<slug>-full.webp at 1200px wide. */
const examples: Example[] = [
  {
    slug: "electrician",
    trade: "Electrician",
    name: "Brightwell Electrical",
    town: "Stockport",
    idea: "Prices an EV charger on the page, so the customer arrives already sold.",
    points: [
      "Call-back form in the first screen",
      "Fixed prices listed job by job",
      "Owner's photo and words, not stock copy",
    ],
    height: 4042,
    swatch: ["#ffd60a", "#111210"],
  },
  {
    slug: "plasterer",
    trade: "Plasterer",
    name: "Hale & Float Plastering",
    town: "Derby",
    idea: "Shows each finish up close and prices a room from two sliders.",
    points: [
      "Finish picker with close-up samples",
      "Drying timeline that answers when to paint",
      "Quote from three photos on WhatsApp",
    ],
    height: 4288,
    swatch: ["#ece3da", "#b5806b"],
  },
  {
    slug: "plumber",
    trade: "Plumbing & heating",
    name: "Harbour Plumbing & Heating",
    town: "Leeds",
    idea: "Books an engineer in three taps and checks the postcode before anyone calls.",
    points: [
      "Emergency number never leaves the screen",
      "Open price list for common jobs",
      "Guarantees stated in plain words",
    ],
    height: 3696,
    swatch: ["#06242a", "#e0914f"],
  },
  {
    slug: "painter",
    trade: "Painter & decorator",
    name: "Alder & Lime Decorators",
    town: "York",
    idea: "Sells the finish first, with a before and after you drag yourself.",
    points: [
      "Colours shown as paint chips with customer quotes",
      "Interior, exterior and specialist work split clearly",
      "Five-year guarantee given its own section",
    ],
    height: 4242,
    swatch: ["#efe2d6", "#5b3a4e"],
  },
  {
    slug: "joiner",
    trade: "Joiner",
    name: "Thornfield Joinery",
    town: "Gateshead",
    idea: "Leads with finished projects and timber, the way a workshop talks.",
    points: [
      "Full-screen photography, very little text",
      "Project list that swaps the photo as you move",
      "Four-step path from first visit to fitting",
    ],
    height: 4552,
    swatch: ["#dfe0d8", "#a87848"],
  },
];

export default function Showcase() {
  const [active, setActive] = useState(0);
  const current = examples[active];
  const href = `/examples/${current.slug}.html`;

  return (
    <section
      id="examples"
      className="relative border-t border-ink-line py-20 sm:py-28"
    >
      <div className="mx-auto max-w-[86rem] px-6 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="type-section">Five trades, five different sites</h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
              No template with the colours swapped. Each example below was
              designed around how that trade actually wins work. They are for
              made-up businesses, so open them and click everything.
            </p>
          </div>
          <a
            href={`${site.links.whatsapp}?text=${encodeURIComponent(
              "Hi Asharab, I'd like a free preview of a website for my business.",
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-signal px-7 py-3.5 text-sm font-semibold text-ink transition-transform duration-300 hover:-translate-y-0.5"
          >
            Get a free preview of yours
          </a>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div
            role="tablist"
            aria-label="Example designs"
            aria-orientation="vertical"
            className="-mx-6 flex snap-x gap-3 overflow-x-auto px-6 pb-2 lg:col-span-4 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0"
          >
            {examples.map((example, index) => {
              const selected = index === active;
              return (
                <button
                  key={example.slug}
                  type="button"
                  role="tab"
                  id={`example-tab-${example.slug}`}
                  aria-selected={selected}
                  aria-controls="example-panel"
                  onClick={() => setActive(index)}
                  className={`group min-w-[15.5rem] shrink-0 snap-start rounded-xl border p-5 text-left transition-colors duration-300 lg:min-w-0 ${
                    selected
                      ? "border-signal/70 bg-ink-raised"
                      : "border-ink-line hover:border-bone/30"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="h-7 w-7 shrink-0 rounded-full border border-bone/20"
                      style={{
                        backgroundImage: `linear-gradient(135deg, ${example.swatch[0]} 50%, ${example.swatch[1]} 50%)`,
                      }}
                    />
                    <span className="font-display text-lg font-semibold tracking-tight text-bone">
                      {example.trade}
                    </span>
                  </span>
                  <span
                    className={`mt-3 block text-sm leading-relaxed ${
                      selected ? "text-bone/80" : "text-muted"
                    }`}
                  >
                    {example.idea}
                  </span>
                  {selected && (
                    <ul className="mt-4 hidden flex-col gap-2 border-t border-ink-line pt-4 lg:flex">
                      {example.points.map((point) => (
                        <li
                          key={point}
                          className="flex gap-3 text-sm leading-snug text-bone/70"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-[0.55em] h-px w-4 shrink-0 bg-signal/70"
                          />
                          {point}
                        </li>
                      ))}
                    </ul>
                  )}
                </button>
              );
            })}
          </div>

          <div
            id="example-panel"
            role="tabpanel"
            aria-labelledby={`example-tab-${current.slug}`}
            className="lg:col-span-8"
          >
            <div className="overflow-hidden rounded-xl border border-ink-line bg-ink-raised shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]">
              <div className="flex items-center gap-3 border-b border-ink-line px-4 py-2.5">
                <div className="flex gap-1.5" aria-hidden="true">
                  <span className="h-2.5 w-2.5 rounded-full bg-bone/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-bone/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-bone/15" />
                </div>
                <div className="flex-1 truncate rounded-md bg-ink/60 px-3 py-1 text-center text-[11px] text-muted">
                  {current.name}, {current.town} (example)
                </div>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden shrink-0 text-xs font-semibold text-signal underline-offset-4 hover:underline sm:block"
                >
                  Open full site
                </a>
              </div>
              <div
                key={current.slug}
                tabIndex={0}
                aria-label={`Scrollable preview of the ${current.name} example`}
                className="h-[62vh] max-h-[640px] min-h-[380px] overflow-y-auto overscroll-contain"
              >
                <Image
                  src={`/work/example-${current.slug}-full.webp`}
                  alt={`Full page design for ${current.name}, an example ${current.trade.toLowerCase()} website`}
                  width={1200}
                  height={current.height}
                  sizes="(max-width: 1024px) 92vw, 56vw"
                  quality={80}
                  priority={active === 0}
                  className="h-auto w-full"
                />
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm text-muted">
                Scroll inside the preview, or open it to try the forms and
                calculators.
              </p>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-ink-line px-6 py-3 text-sm font-semibold text-bone transition-colors duration-300 hover:border-bone/40 hover:bg-bone/5"
              >
                Open the {current.trade.toLowerCase()} example
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
