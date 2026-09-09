/**
 * Reads the recorded enquiries.
 *
 *   npm run leads             list every lead, newest first
 *   npm run leads -- --csv    write data/leads.csv for Excel or Sheets
 *   npm run leads -- --json   print raw JSON
 *
 * Wrapped in main() rather than using top-level await: the package is CommonJS,
 * so tsx compiles this to CJS where top-level await is not available.
 */
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { readLeads, toCsv, LEADS_FILE } from "../lib/leads";

const statusLabel: Record<string, string> = {
  sent: "emailed",
  failed: "EMAIL FAILED",
  not_configured: "not emailed (no API key)",
};

async function main() {
  const args = process.argv.slice(2);
  const leads = (await readLeads()).reverse(); // newest first

  if (leads.length === 0) {
    console.log("No enquiries recorded yet.");
    console.log(`Nothing has been written to ${LEADS_FILE} so far.`);
    return;
  }

  if (args.includes("--json")) {
    console.log(JSON.stringify(leads, null, 2));
    return;
  }

  if (args.includes("--csv")) {
    const target = path.join(process.cwd(), "data", "leads.csv");
    await writeFile(target, toCsv(leads), "utf8");
    console.log(`Wrote ${leads.length} lead(s) to ${target}`);
    return;
  }

  console.log(`\n${leads.length} enquiry(s) recorded, newest first:\n`);

  for (const lead of leads) {
    const when = new Date(lead.receivedAt).toLocaleString("en-GB", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    console.log("-".repeat(72));
    console.log(`${lead.name}  <${lead.email}>`);
    console.log(`${when}${lead.business ? `  ·  ${lead.business}` : ""}`);
    console.log(`delivery: ${statusLabel[lead.emailStatus] ?? lead.emailStatus}`);
    if (lead.emailError) console.log(`  reason: ${lead.emailError}`);
    console.log("");
    console.log(
      lead.message
        .split("\n")
        .map((line) => `  ${line}`)
        .join("\n"),
    );
    console.log("");
  }

  console.log("-".repeat(72));
  console.log("Reply to any of these by emailing the address shown.\n");
}

main().catch((error) => {
  console.error("[leads] could not read the enquiries:", error);
  process.exit(1);
});
