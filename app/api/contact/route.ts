import { NextResponse } from "next/server";
import { contactSchema, type FieldErrors } from "@/lib/contact-schema";
import { site } from "@/lib/site";

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "That request could not be read. Please try again." },
      { status: 400 },
    );
  }

  const parsed = contactSchema.safeParse(payload);

  if (!parsed.success) {
    const fieldErrors: FieldErrors = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof FieldErrors;
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return NextResponse.json(
      { ok: false, error: "Please check the fields below.", fieldErrors },
      { status: 400 },
    );
  }

  const { name, email, business, message, website } = parsed.data;

  // Honeypot filled means a bot. Accept silently so it does not retry.
  if (website) return NextResponse.json({ ok: true });

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? site.email;

  // No key configured: the form still succeeds, and the message is logged
  // server-side so nothing is lost before email delivery is wired up.
  if (!apiKey) {
    console.info("[contact] new enquiry (email delivery not configured)", {
      name,
      email,
      business: business || "—",
      message,
    });
    return NextResponse.json({ ok: true });
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: [to],
      replyTo: email,
      subject: `New enquiry from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Business: ${business || "—"}`,
        "",
        message,
      ].join("\n"),
    });

    if (error) {
      console.error("[contact] resend rejected the message", error);
      return NextResponse.json(
        {
          ok: false,
          error: `That did not send. Please email ${to} directly.`,
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact] unexpected failure", error);
    return NextResponse.json(
      { ok: false, error: `That did not send. Please email ${to} directly.` },
      { status: 500 },
    );
  }
}
