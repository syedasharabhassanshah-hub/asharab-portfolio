import { NextResponse } from "next/server";
import { contactSchema, type FieldErrors } from "@/lib/contact-schema";
import { recordLead, type EmailStatus } from "@/lib/leads";
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

  // Honeypot filled means a bot. Accept silently so it does not retry, and
  // keep it out of the lead log.
  if (website) return NextResponse.json({ ok: true });

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? site.email;

  let emailStatus: EmailStatus = "not_configured";
  let emailError: string | undefined;
  let response: NextResponse;

  if (!apiKey) {
    // No key configured. The lead is still recorded below, so nothing is lost
    // before email delivery is wired up.
    response = NextResponse.json({ ok: true });
  } else {
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
        emailStatus = "failed";
        emailError = error.message ?? String(error);
        response = NextResponse.json(
          { ok: false, error: `That did not send. Please email ${to} directly.` },
          { status: 502 },
        );
      } else {
        emailStatus = "sent";
        response = NextResponse.json({ ok: true });
      }
    } catch (error) {
      console.error("[contact] unexpected failure", error);
      emailStatus = "failed";
      emailError = error instanceof Error ? error.message : String(error);
      response = NextResponse.json(
        { ok: false, error: `That did not send. Please email ${to} directly.` },
        { status: 500 },
      );
    }
  }

  // Recorded on every path, including a failed send — a lead that could not be
  // emailed is exactly the one most worth keeping.
  await recordLead({
    name,
    email,
    business: business || "",
    message,
    emailStatus,
    ...(emailError ? { emailError } : {}),
    userAgent: request.headers.get("user-agent") ?? undefined,
    referer: request.headers.get("referer") ?? undefined,
  });

  return response;
}
