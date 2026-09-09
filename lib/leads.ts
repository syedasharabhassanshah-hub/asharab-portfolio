import { appendFile, mkdir, readFile } from "node:fs/promises";
import path from "node:path";

/**
 * Every enquiry that reaches the contact endpoint is appended here as one
 * JSON object per line (JSONL). Append-only on purpose: a single write call
 * per lead, so two submissions landing at once cannot clobber each other the
 * way a read-modify-write on a JSON array would.
 */
const LEADS_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(LEADS_DIR, "leads.jsonl");

export type EmailStatus =
  /** No RESEND_API_KEY set, so delivery was never attempted. */
  | "not_configured"
  /** Handed to Resend and accepted. */
  | "sent"
  /** Attempted and rejected or errored. The lead is still recorded. */
  | "failed";

export type Lead = {
  id: string;
  receivedAt: string;
  name: string;
  email: string;
  business: string;
  message: string;
  emailStatus: EmailStatus;
  /** Present only when delivery failed, to explain why. */
  emailError?: string;
  userAgent?: string;
  referer?: string;
};

export type NewLead = Omit<Lead, "id" | "receivedAt">;

function makeId(receivedAt: string): string {
  const stamp = receivedAt.replace(/[-:.TZ]/g, "").slice(0, 14);
  const random = Math.random().toString(36).slice(2, 8);
  return `${stamp}-${random}`;
}

/**
 * Appends a lead to the log. Never throws: a storage problem must not turn a
 * visitor's successful submission into an error on their screen. Returns the
 * stored record, or null if writing failed.
 */
export async function recordLead(input: NewLead): Promise<Lead | null> {
  const receivedAt = new Date().toISOString();
  const lead: Lead = { id: makeId(receivedAt), receivedAt, ...input };

  try {
    await mkdir(LEADS_DIR, { recursive: true });
    await appendFile(LEADS_FILE, `${JSON.stringify(lead)}\n`, "utf8");
    return lead;
  } catch (error) {
    // Last resort so the enquiry still exists somewhere the operator can find.
    console.error("[leads] could not write to disk — lead follows", error);
    console.error("[leads] unsaved lead", JSON.stringify(lead));
    return null;
  }
}

/** Reads every recorded lead, newest last. Malformed lines are skipped. */
export async function readLeads(): Promise<Lead[]> {
  let raw: string;

  try {
    raw = await readFile(LEADS_FILE, "utf8");
  } catch (error) {
    // No file yet simply means no enquiries have come in.
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }

  const leads: Lead[] = [];
  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    try {
      leads.push(JSON.parse(trimmed) as Lead);
    } catch {
      console.warn("[leads] skipping unreadable line:", trimmed.slice(0, 80));
    }
  }
  return leads;
}

function csvCell(value: string): string {
  // Guard against a leading =, +, - or @ being run as a formula in Excel.
  const safe = /^[=+\-@]/.test(value) ? `'${value}` : value;
  return `"${safe.replace(/"/g, '""')}"`;
}

/** Renders leads as CSV for opening in Excel or Google Sheets. */
export function toCsv(leads: Lead[]): string {
  const header = [
    "Received",
    "Name",
    "Email",
    "Business",
    "Message",
    "Email status",
  ];
  const rows = leads.map((lead) =>
    [
      lead.receivedAt,
      lead.name,
      lead.email,
      lead.business || "",
      lead.message,
      lead.emailStatus,
    ]
      .map(csvCell)
      .join(","),
  );
  return [header.map(csvCell).join(","), ...rows].join("\n");
}

export { LEADS_FILE };
