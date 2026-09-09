"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";

const links = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#about", label: "About" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled || open
          ? "border-b border-ink-line bg-ink/85 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[86rem] items-center justify-between px-6 sm:h-20 lg:px-10">
        <a
          href="#top"
          onClick={() => setOpen(false)}
          className="font-display text-base font-bold tracking-tight text-bone sm:text-lg"
        >
          {site.name}
          <span className="text-signal">.</span>
        </a>

        <nav className="hidden items-center gap-9 md:flex" aria-label="Primary">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition-colors duration-300 hover:text-bone"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-full bg-signal px-5 py-2.5 text-sm font-semibold text-ink transition-transform duration-300 hover:-translate-y-0.5"
          >
            Start a project
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`h-px w-6 bg-bone transition-transform duration-300 ${
              open ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-6 bg-bone transition-transform duration-300 ${
              open ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="flex h-[calc(100dvh-4rem)] flex-col justify-between border-t border-ink-line px-6 py-10 md:hidden"
        >
          <nav className="flex flex-col gap-2" aria-label="Mobile">
            {[...links, { href: "#contact", label: "Contact" }].map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-display text-4xl font-bold tracking-tight text-bone"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <a
            href={`mailto:${site.email}`}
            className="text-sm text-muted underline decoration-ink-line underline-offset-4"
          >
            {site.email}
          </a>
        </div>
      )}
    </header>
  );
}
