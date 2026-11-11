/**
 * Generates the three example trade websites shown in the "For UK trades"
 * section. Each is a self-contained HTML page written to public/examples.
 *
 * These are example designs for fictional businesses, labelled as such on the
 * page. Phone numbers use Ofcom's reserved drama ranges, so they reach nobody.
 *
 *   node scripts/build-examples.mjs
 */
import { mkdir, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "examples");

const sites = [
  {
    slug: "electrician",
    name: "Brightwell Electrical",
    mark: "B",
    trade: "Electricians",
    town: "Stockport",
    phone: "0161 496 0142",
    fonts: "Archivo:wght@400;500;600;800;900",
    display: "'Archivo', sans-serif",
    body: "'Archivo', sans-serif",
    c: { bg: "#0b1626", surface: "#12213a", line: "#223555", text: "#eef3fb", muted: "#93a4c0", accent: "#ffd23f", onAccent: "#0b1626", band: "#ffd23f", onBand: "#0b1626" },
    radius: "6px",
    hero: "split",
    kicker: "NICEIC approved · Stockport & South Manchester",
    h1: "Electrical work done properly, <em>first time.</em>",
    lead: "Rewires, consumer units, EV chargers and fault finding for homes and landlords. Fixed prices agreed before we start, and a certificate for every job.",
    stats: [["4.9★", "from 86 Google reviews"], ["12 yrs", "trading locally"], ["24 hr", "emergency call-out"]],
    services: [
      ["Full and partial rewires", "Old wiring replaced room by room, with the house kept liveable while we work."],
      ["Consumer unit upgrades", "Modern fuse boards with RCD and surge protection, tested and certified."],
      ["EV charger installation", "Home chargers fitted and registered, usually in half a day."],
      ["Fault finding", "Tripping circuits, dead sockets and flickering lights traced and fixed."],
      ["Landlord certificates", "EICR inspections with clear reports and fast remedial work."],
      ["Lighting and sockets", "Extra sockets, downlights, garden and security lighting."],
    ],
    work: [
      ["Full rewire", "1930s semi, Heaton Moor", "5 days"],
      ["EV charger", "Driveway install, Bramhall", "4 hours"],
      ["Consumer unit", "18-way board, Cheadle Hulme", "1 day"],
      ["Kitchen lighting", "Downlights and under-cabinet, Marple", "2 days"],
    ],
    reviews: [
      ["Turned up when he said, explained everything and left the place spotless. The new board passed first time.", "Karen M.", "Heaton Moor"],
      ["Charger fitted in a morning and he registered it for us. Price was exactly what was quoted.", "Dev P.", "Bramhall"],
      ["Found a fault two other electricians missed. Honest about what did and did not need doing.", "Tom R.", "Cheadle"],
    ],
    areas: ["Stockport", "Heaton Moor", "Bramhall", "Cheadle", "Cheadle Hulme", "Marple", "Hazel Grove", "Didsbury", "Poynton", "Romiley"],
    badges: ["NICEIC Approved Contractor", "Part P registered", "£5m public liability", "12-month workmanship guarantee"],
    jobs: ["Rewire", "Consumer unit", "EV charger", "Fault or repair", "Landlord certificate", "Something else"],
  },
  {
    slug: "plumber",
    name: "Harbour Plumbing & Heating",
    mark: "H",
    trade: "Plumbers & heating engineers",
    town: "Leeds",
    phone: "0113 496 0178",
    fonts: "Outfit:wght@400;500;600;700;800",
    display: "'Outfit', sans-serif",
    body: "'Outfit', sans-serif",
    c: { bg: "#f6fafb", surface: "#ffffff", line: "#d9e6ea", text: "#0f2a33", muted: "#557079", accent: "#ff6b4a", onAccent: "#ffffff", band: "#0e6b7c", onBand: "#ffffff" },
    radius: "18px",
    hero: "centre",
    kicker: "Gas Safe registered · Leeds & Wakefield",
    h1: "Boilers, bathrooms and leaks sorted <em>without the runaround.</em>",
    lead: "A local family firm for repairs, boiler installs and full bathroom refits. You speak to the engineer who does the job, and we tell you the price before we lift a spanner.",
    stats: [["4.8★", "from 132 Google reviews"], ["Same day", "for most emergencies"], ["10 yr", "boiler warranties"]],
    services: [
      ["Boiler installation", "New A-rated boilers fitted in a day, with warranties of up to ten years."],
      ["Boiler service and repair", "Annual servicing and breakdown repairs for all major makes."],
      ["Emergency plumbing", "Burst pipes, leaks and no hot water. We answer the phone evenings and weekends."],
      ["Bathroom refits", "Design, plumbing, tiling and finishing handled by one team."],
      ["Central heating", "Radiators, power flushing and smart controls."],
      ["Landlord gas safety", "CP12 certificates and reminders so you never miss a renewal."],
    ],
    work: [
      ["Boiler swap", "Combi upgrade, Headingley", "1 day"],
      ["Bathroom refit", "Walk-in shower, Roundhay", "8 days"],
      ["Emergency repair", "Burst pipe, Morley", "90 minutes"],
      ["Heating upgrade", "9 radiators and controls, Pudsey", "3 days"],
    ],
    reviews: [
      ["Boiler died on a Friday night. They had heating back on by Saturday lunchtime and did not charge silly money.", "Sarah L.", "Headingley"],
      ["Our bathroom looks like a hotel. On time, on budget, and they tidied up every evening.", "Imran K.", "Roundhay"],
      ["Clear quote, turned up on the dot, job done in an hour. Would not use anyone else now.", "Janet W.", "Morley"],
    ],
    areas: ["Leeds", "Headingley", "Roundhay", "Morley", "Pudsey", "Horsforth", "Garforth", "Wakefield", "Rothwell", "Otley"],
    badges: ["Gas Safe registered", "Worcester Bosch accredited", "Fully insured", "No call-out charge"],
    jobs: ["New boiler", "Boiler repair or service", "Leak or emergency", "Bathroom refit", "Heating", "Something else"],
  },
  {
    slug: "builder",
    name: "Stonegate Builders",
    mark: "S",
    trade: "Builders",
    town: "Bristol",
    phone: "0117 496 0155",
    fonts: "Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600",
    display: "'Fraunces', serif",
    body: "'Inter', sans-serif",
    c: { bg: "#f5f0e8", surface: "#fffdf9", line: "#e0d6c6", text: "#26221d", muted: "#6f665a", accent: "#b4532a", onAccent: "#ffffff", band: "#26221d", onBand: "#f5f0e8" },
    radius: "2px",
    hero: "editorial",
    kicker: "Extensions · Lofts · Renovations · Bristol & Bath",
    h1: "Extensions and renovations built to <em>last a lifetime.</em>",
    lead: "A small, careful building team that takes on a handful of projects a year. One site manager from first drawing to final snag, and a written schedule you can hold us to.",
    stats: [["140+", "projects completed"], ["4.9★", "from 58 Google reviews"], ["10 yr", "structural guarantee"]],
    services: [
      ["House extensions", "Single and double storey extensions, from planning drawings to decoration."],
      ["Loft conversions", "Dormer, hip-to-gable and Velux conversions with building control sign-off."],
      ["Full renovations", "Whole-house refurbishment, managed as one project with one point of contact."],
      ["Kitchens and knock-throughs", "Structural openings, steelwork and fitted kitchens."],
      ["Brickwork and repointing", "Period brick and stone repaired to match the original."],
      ["Garden rooms and garages", "Insulated outbuildings and garage conversions."],
    ],
    work: [
      ["Rear extension", "Victorian terrace, Bishopston", "14 weeks"],
      ["Loft conversion", "Dormer with ensuite, Redland", "9 weeks"],
      ["Full renovation", "Four-bed semi, Clifton", "6 months"],
      ["Kitchen knock-through", "Open-plan living, Southville", "5 weeks"],
    ],
    reviews: [
      ["They finished a week early and the final bill matched the quote to the pound. We did not think that was possible.", "Helen & Mark D.", "Bishopston"],
      ["Tidy, polite and proud of their work. Our neighbours have since hired them too.", "Priya S.", "Redland"],
      ["A weekly update every Friday meant we always knew where things stood. Superb finish.", "Andrew B.", "Clifton"],
    ],
    areas: ["Bristol", "Clifton", "Redland", "Bishopston", "Southville", "Bedminster", "Westbury-on-Trym", "Keynsham", "Bath", "Portishead"],
    badges: ["Federation of Master Builders", "TrustMark registered", "£10m public liability", "10-year structural guarantee"],
    jobs: ["Extension", "Loft conversion", "Full renovation", "Kitchen or knock-through", "Brickwork", "Something else"],
  },
];

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/&lt;(\/?)em&gt;/g, "<$1em>");

function quoteForm(s) {
  return `<form class="quote" onsubmit="event.preventDefault();this.querySelector('.sent').hidden=false">
    <h3>Get a free quote</h3>
    <p class="small">Tell us about the job and we will call you back the same day.</p>
    <label>Your name<input type="text" placeholder="Jane Cooper"></label>
    <label>Phone<input type="tel" placeholder="07..."></label>
    <label>What do you need?<select>${s.jobs.map((j) => `<option>${esc(j)}</option>`).join("")}</select></label>
    <label>Postcode<input type="text" placeholder="e.g. ${s.slug === "plumber" ? "LS6" : s.slug === "builder" ? "BS7" : "SK4"}"></label>
    <button class="btn" type="submit">Request my quote</button>
    <p class="sent small" hidden>This is an example design, so nothing was sent.</p>
  </form>`;
}

function page(s) {
  const tel = s.phone.replace(/\s/g, "");
  const stats = s.stats.map(([a, b]) => `<div><strong>${esc(a)}</strong><span>${esc(b)}</span></div>`).join("");
  const heroText = `<p class="kicker">${esc(s.kicker)}</p>
      <h1>${esc(s.h1)}</h1>
      <p class="lead">${esc(s.lead)}</p>
      <div class="cta"><a class="btn" href="#quote">Get a free quote</a><a class="btn ghost" href="tel:${tel}">Call ${esc(s.phone)}</a></div>`;
  const hero =
    s.hero === "split"
      ? `<section class="hero split wrap"><div>${heroText}<div class="stats">${stats}</div></div><div>${quoteForm(s)}</div></section>`
      : s.hero === "centre"
        ? `<section class="hero centre wrap"><div class="alert">Emergency? Call <a href="tel:${tel}">${esc(s.phone)}</a>, answered until 10pm</div>${heroText}<div class="stats">${stats}</div></section>`
        : `<section class="hero editorial wrap"><div>${heroText}</div><aside><div class="stats">${stats}</div><p class="small">Now booking projects for spring. Site visits are free and there is never any pressure.</p></aside></section>`;

  return `<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(s.name)} | ${esc(s.trade)} in ${esc(s.town)} (example design)</title>
<meta name="description" content="Example website design for a ${esc(s.trade.toLowerCase())} business, by Asharab Hassan.">
<meta name="robots" content="noindex">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=${s.fonts}&display=swap" rel="stylesheet">
<style>
:root{--bg:${s.c.bg};--surface:${s.c.surface};--line:${s.c.line};--text:${s.c.text};--muted:${s.c.muted};--accent:${s.c.accent};--on-accent:${s.c.onAccent};--band:${s.c.band};--on-band:${s.c.onBand};--r:${s.radius};--display:${s.display};--body:${s.body}}
*{box-sizing:border-box;margin:0}
html{scroll-behavior:smooth}
body{background:var(--bg);color:var(--text);font-family:var(--body);font-size:17px;line-height:1.6;-webkit-font-smoothing:antialiased}
a{color:inherit}
.wrap{max-width:1160px;margin:0 auto;padding:0 20px}
h1,h2,h3{font-family:var(--display);line-height:1.05;letter-spacing:-.02em;text-wrap:balance}
h1{font-size:clamp(2.3rem,6vw,4.4rem);font-weight:800}
h1 em{font-style:normal;color:var(--accent)}
h2{font-size:clamp(1.8rem,4vw,2.8rem);font-weight:700}
h3{font-size:1.2rem;font-weight:700}
.small{font-size:.875rem;color:var(--muted)}
.demo{background:#111;color:#fff;font:500 13px/1.4 system-ui,sans-serif;padding:9px 20px;text-align:center}
.demo a{color:#ffd23f;font-weight:700;white-space:nowrap}
header{border-bottom:1px solid var(--line);background:var(--surface);position:sticky;top:0;z-index:5}
header .wrap{display:flex;align-items:center;justify-content:space-between;gap:16px;height:72px}
.logo{display:flex;align-items:center;gap:10px;font-family:var(--display);font-weight:800;font-size:1.15rem;text-decoration:none}
.logo span{display:grid;place-items:center;width:38px;height:38px;border-radius:var(--r);background:var(--accent);color:var(--on-accent);font-size:1.25rem}
nav{display:flex;gap:26px;font-size:.95rem}
nav a{text-decoration:none;color:var(--muted)}
nav a:hover{color:var(--text)}
.btn{display:inline-block;background:var(--accent);color:var(--on-accent);font-weight:700;font-family:var(--body);font-size:1rem;padding:14px 24px;border-radius:var(--r);border:2px solid var(--accent);text-decoration:none;cursor:pointer}
.btn.ghost{background:transparent;color:var(--text);border-color:var(--line)}
.btn.sm{padding:9px 16px;font-size:.9rem}
.kicker{font-size:.85rem;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--accent);margin-bottom:18px}
.lead{font-size:1.15rem;color:var(--muted);max-width:36em;margin-top:22px}
.cta{display:flex;flex-wrap:wrap;gap:12px;margin-top:30px}
.hero{padding-top:64px;padding-bottom:72px}
.hero.split{display:grid;grid-template-columns:1.25fr .9fr;gap:56px;align-items:center}
.hero.centre{text-align:center}
.hero.centre .lead{margin-left:auto;margin-right:auto}
.hero.centre .cta,.hero.centre .stats{justify-content:center}
.hero.editorial{display:grid;grid-template-columns:1.6fr .8fr;gap:64px;align-items:end}
.hero.editorial h1{font-weight:600;font-size:clamp(2.5rem,6.4vw,5rem)}
.hero.editorial h1 em{font-style:italic}
.hero.editorial aside{border-left:1px solid var(--line);padding-left:32px}
.hero.editorial aside .stats{flex-direction:column;gap:22px;margin:0 0 24px}
.alert{display:inline-block;background:var(--band);color:var(--on-band);font-weight:600;font-size:.95rem;padding:9px 20px;border-radius:999px;margin-bottom:28px}
.stats{display:flex;flex-wrap:wrap;gap:36px;margin-top:44px}
.stats strong{display:block;font-family:var(--display);font-size:1.9rem;line-height:1.1}
.stats span{font-size:.875rem;color:var(--muted)}
.quote{background:var(--surface);border:1px solid var(--line);border-radius:var(--r);padding:28px;display:grid;gap:14px}
.quote label{display:grid;gap:6px;font-size:.85rem;font-weight:600}
.quote input,.quote select{font:inherit;font-weight:400;padding:12px;border:1px solid var(--line);border-radius:var(--r);background:var(--bg);color:var(--text);width:100%}
.band{background:var(--band);color:var(--on-band)}
.band ul{list-style:none;padding:20px;display:flex;flex-wrap:wrap;justify-content:center;gap:10px 40px;font-weight:600;font-size:.95rem;max-width:1160px;margin:0 auto}
.band li::before{content:"✓ "}
section.block{padding-block:84px}
.head{max-width:40em;margin-bottom:44px}
.head p{color:var(--muted);margin-top:14px}
.grid{display:grid;gap:18px;grid-template-columns:repeat(3,1fr)}
.card{background:var(--surface);border:1px solid var(--line);border-radius:var(--r);padding:26px}
.card p{color:var(--muted);font-size:.95rem;margin-top:10px}
.card .n{font-family:var(--display);font-weight:700;color:var(--accent);font-size:.9rem;margin-bottom:14px}
.work{grid-template-columns:repeat(4,1fr)}
.job{border-radius:var(--r);overflow:hidden;border:1px solid var(--line);background:var(--surface)}
.job .art{aspect-ratio:4/3;background:linear-gradient(135deg,color-mix(in srgb,var(--accent) 80%,#000),color-mix(in srgb,var(--band) 70%,var(--accent)));position:relative}
.job .art::after{content:"";position:absolute;inset:0;background:repeating-linear-gradient(45deg,transparent 0 22px,rgba(255,255,255,.09) 22px 23px)}
.job .art b{position:absolute;left:14px;bottom:12px;z-index:1;color:#fff;font-family:var(--display);font-size:1.25rem}
.job div.t{padding:16px}
.job div.t p{font-size:.9rem;color:var(--muted)}
.job div.t span{font-size:.8rem;font-weight:600;color:var(--accent)}
.alt{background:var(--surface);border-top:1px solid var(--line);border-bottom:1px solid var(--line)}
blockquote{font-size:1.02rem}
.card cite{display:block;margin-top:16px;font-style:normal;font-weight:600;font-size:.9rem}
.card cite span{font-weight:400;color:var(--muted)}
.stars{color:var(--accent);letter-spacing:2px;margin-bottom:12px}
.areas{display:flex;flex-wrap:wrap;gap:10px}
.areas span{border:1px solid var(--line);background:var(--surface);border-radius:999px;padding:8px 16px;font-size:.92rem}
.two{display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:start}
footer{background:var(--band);color:var(--on-band);padding:44px 0;font-size:.92rem}
footer .wrap{display:flex;flex-wrap:wrap;justify-content:space-between;gap:20px}
footer a{font-weight:700}
@media(max-width:900px){nav{display:none}.hero.split,.hero.editorial,.two{grid-template-columns:1fr;gap:36px}.hero.editorial aside{border-left:0;padding-left:0;border-top:1px solid var(--line);padding-top:28px}.hero.editorial aside .stats{flex-direction:row}.grid{grid-template-columns:1fr}.work{grid-template-columns:1fr 1fr}.hero{padding-top:44px;padding-bottom:52px}section.block{padding-block:60px}.stats{gap:24px}}
@media(max-width:480px){header .btn{display:none}.work{grid-template-columns:1fr}}
</style>
</head>
<body>
<div class="demo">Example design for a fictional business, not a real company. <a href="/#trades">Websites for UK trades by Asharab Hassan &rarr;</a></div>
<header><div class="wrap">
  <a class="logo" href="#"><span>${esc(s.mark)}</span>${esc(s.name)}</a>
  <nav><a href="#services">Services</a><a href="#work">Recent work</a><a href="#reviews">Reviews</a><a href="#areas">Areas</a></nav>
  <a class="btn sm" href="tel:${tel}">${esc(s.phone)}</a>
</div></header>
<main>
${hero}
<div class="band"><ul>${s.badges.map((b) => `<li>${esc(b)}</li>`).join("")}</ul></div>
<section class="block wrap" id="services">
  <div class="head"><h2>What we do</h2><p>Clear prices, tidy work and a proper guarantee on every job, large or small.</p></div>
  <div class="grid">${s.services.map(([t, d], i) => `<div class="card"><p class="n">0${i + 1}</p><h3>${esc(t)}</h3><p>${esc(d)}</p></div>`).join("")}</div>
</section>
<section class="block alt" id="work"><div class="wrap">
  <div class="head"><h2>Recent work</h2><p>A few of the jobs we have finished around ${esc(s.town)} lately. Your own photos go here.</p></div>
  <div class="grid work">${s.work.map(([t, d, l]) => `<div class="job"><div class="art"><b>${esc(t)}</b></div><div class="t"><p>${esc(d)}</p><span>Completed in ${esc(l)}</span></div></div>`).join("")}</div>
</div></section>
<section class="block wrap" id="reviews">
  <div class="head"><h2>What customers say</h2><p>Pulled straight from your Google reviews, so new customers see them before they call.</p></div>
  <div class="grid">${s.reviews.map(([q, n, a]) => `<div class="card"><div class="stars">★★★★★</div><blockquote>&ldquo;${esc(q)}&rdquo;</blockquote><cite>${esc(n)} <span>· ${esc(a)}</span></cite></div>`).join("")}</div>
</section>
<section class="block alt" id="areas"><div class="wrap two">
  <div><div class="head"><h2>Areas we cover</h2><p>Based in ${esc(s.town)} and working within about ten miles.</p></div><div class="areas">${s.areas.map((a) => `<span>${esc(a)}</span>`).join("")}</div></div>
  <div id="quote">${quoteForm(s)}</div>
</div></section>
</main>
<footer><div class="wrap"><div><strong>${esc(s.name)}</strong><br>${esc(s.trade)} in ${esc(s.town)}</div><div>Call <a href="tel:${tel}">${esc(s.phone)}</a><br>Mon to Sat, 7am to 6pm</div><div>Example design by <a href="/#trades">Asharab Hassan</a></div></div></footer>
</body>
</html>
`;
}

await mkdir(outDir, { recursive: true });
for (const s of sites) {
  await writeFile(join(outDir, `${s.slug}.html`), page(s));
  console.log(`wrote public/examples/${s.slug}.html`);
}
