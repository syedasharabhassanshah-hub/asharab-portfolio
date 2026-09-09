"use client";

import { useState } from "react";
import { site } from "@/lib/site";
import { contactSchema, type FieldErrors } from "@/lib/contact-schema";

type Status = "idle" | "sending" | "sent" | "error";

const fieldClass =
  "w-full rounded-lg border border-ink-line bg-ink-raised px-4 py-3 text-sm text-bone placeholder:text-muted/55 transition-colors duration-300 focus:border-signal/60 focus:outline-none";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));

    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const errors: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FieldErrors;
        if (key && !errors[key]) errors[key] = issue.message;
      }
      setFieldErrors(errors);
      setFormError("Please check the fields below.");
      setStatus("error");
      return;
    }

    setStatus("sending");
    setFormError("");
    setFieldErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const result = await response.json();

      if (!response.ok || !result.ok) {
        setFieldErrors(result.fieldErrors ?? {});
        setFormError(result.error ?? "That did not send. Please try again.");
        setStatus("error");
        return;
      }

      form.reset();
      setStatus("sent");
    } catch {
      setFormError(
        `No connection. Please email ${site.email} directly and it will reach me.`,
      );
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[86rem] px-6 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <h2 className="type-section">Start a project</h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
              Tell me what your business does and what the site needs to
              achieve. I reply to every enquiry, usually within a day.
            </p>

            <dl className="mt-10 border-t border-ink-line">
              {[
                {
                  label: "Email",
                  value: site.email,
                  href: `mailto:${site.email}`,
                },
                {
                  label: "Fiverr",
                  value: "asharabhassa279",
                  href: site.links.fiverr,
                },
                {
                  label: "LinkedIn",
                  value: "Asharab Hassan",
                  href: site.links.linkedin,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-baseline justify-between gap-6 border-b border-ink-line py-4"
                >
                  <dt className="text-xs text-muted">{item.label}</dt>
                  <dd className="min-w-0">
                    <a
                      href={item.href}
                      target={
                        item.href.startsWith("mailto:") ? undefined : "_blank"
                      }
                      rel="noopener noreferrer"
                      className="block truncate text-sm text-bone transition-colors duration-300 hover:text-signal"
                    >
                      {item.value}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="lg:col-span-7">
            {status === "sent" ? (
              <div className="flex h-full flex-col justify-center rounded-xl border border-signal/25 bg-signal/[0.04] p-10">
                <h3 className="font-display text-2xl font-bold tracking-tight">
                  Message sent
                </h3>
                <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-muted">
                  Thanks for getting in touch. I&rsquo;ll read it and reply to
                  you by email, usually within a day.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-8 self-start rounded-full border border-ink-line px-6 py-3 text-sm font-semibold transition-colors duration-300 hover:border-bone/40 hover:bg-bone/5"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                noValidate
                className="flex flex-col gap-5"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    name="name"
                    label="Your name"
                    placeholder="Jane Cooper"
                    error={fieldErrors.name}
                  />
                  <Field
                    name="email"
                    type="email"
                    label="Email"
                    placeholder="jane@business.com"
                    error={fieldErrors.email}
                  />
                </div>

                <Field
                  name="business"
                  label="Business or website"
                  placeholder="Cooper Electrical"
                  error={fieldErrors.business}
                  optional
                />

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm text-bone"
                  >
                    What do you need?
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    placeholder="A new site, a redesign, better rankings — whatever you have in mind."
                    aria-invalid={Boolean(fieldErrors.message)}
                    aria-describedby={
                      fieldErrors.message ? "message-error" : undefined
                    }
                    className={`${fieldClass} resize-y`}
                  />
                  {fieldErrors.message && (
                    <p id="message-error" className="mt-2 text-xs text-ember">
                      {fieldErrors.message}
                    </p>
                  )}
                </div>

                {/* Honeypot, hidden from people and assistive tech. */}
                <div aria-hidden="true" className="hidden">
                  <label htmlFor="website">Leave this empty</label>
                  <input
                    id="website"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {formError && (
                  <p role="alert" className="text-sm text-ember">
                    {formError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="self-start rounded-full bg-signal px-8 py-3.5 text-sm font-semibold text-ink transition-transform duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  {status === "sending" ? "Sending…" : "Send message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  name,
  label,
  placeholder,
  error,
  type = "text",
  optional = false,
}: {
  name: string;
  label: string;
  placeholder: string;
  error?: string;
  type?: string;
  optional?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm text-bone">
        {label}
        {optional && <span className="ml-2 text-xs text-muted">optional</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className={fieldClass}
      />
      {error && (
        <p id={`${name}-error`} className="mt-2 text-xs text-ember">
          {error}
        </p>
      )}
    </div>
  );
}
