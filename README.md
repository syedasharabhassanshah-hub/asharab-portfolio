# Asharab Hassan — Portfolio

Portfolio site for Syed Asharab Hassan Shah, web developer and digital solutions
partner. Built with Next.js 15 (App Router), TypeScript, and Tailwind CSS v4.

## Running it

```bash
npm install
npm run dev        # http://localhost:3000
```

Other commands:

| Command | What it does |
| --- | --- |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run typecheck` | TypeScript, no emit |
| `npm run lint` | ESLint |
| `npm run shots` | Re-capture the project screenshots |

## Editing the content

Almost everything is data, not markup. You should rarely need to touch a
component.

| File | Holds |
| --- | --- |
| `lib/site.ts` | Name, role, email, links, site URL, total sites built |
| `lib/projects.ts` | The client projects shown publicly |
| `lib/content.ts` | Services, process steps, skills, industries |

### Adding a project

Append an entry to the array in `lib/projects.ts`:

```ts
{
  slug: "new-client",           // becomes public/work/new-client.webp
  name: "New Client",
  url: "https://newclient.com/",
  domain: "newclient.com",
  sector: "Industry",
  headline: "Their tagline",
  summary: "A paragraph on what the site needed to do.",
  contributions: ["What you built", "What you built", "What you built"],
  stack: ["WordPress", "WooCommerce"],
  tint: ["#0E3A5B", "#1C7A6B"],  // gradient shown while the image loads
}
```

Then run `npm run shots` to capture its screenshot. The site picks it up
everywhere — hero marquee, work section, and the structured data.

### Screenshots

`npm run shots` captures every URL in `lib/projects.ts` and writes a compressed
WebP to `public/work/<slug>.webp`. Screenshots are captured ahead of time rather
than proxied live, so no page load ever waits on a third-party service. All
nine currently total 588 KB, and the image optimizer serves them as AVIF at
roughly 40–70 KB each.

Capture services occasionally shoot before a page has painted and return a
blank frame. The script measures pixel variation and rejects those
automatically, retrying and then falling back to a second provider. Re-run it
whenever a client site is redesigned.

## Contact form

`POST /api/contact` validates with Zod on both the client and the server, and
sends through [Resend](https://resend.com).

**It works with no configuration.** Without `RESEND_API_KEY` the endpoint logs
the enquiry server-side and returns success, so nothing breaks before email is
wired up. To receive real email:

1. Create a Resend account and an API key.
2. Set the environment variables (see `.env.example`):

   ```
   RESEND_API_KEY=re_xxxxxxxx
   CONTACT_TO_EMAIL=syedasharabhassanshah@gmail.com
   ```

3. To send from your own domain rather than Resend's shared sender, verify the
   domain in Resend and change the `from` address in `app/api/contact/route.ts`.

A hidden honeypot field silently drops bot submissions.

## Deploying to Vercel

```bash
npm i -g vercel
vercel            # preview
vercel --prod     # production
```

Add `RESEND_API_KEY` and `CONTACT_TO_EMAIL` under Project Settings →
Environment Variables, or with `vercel env add`.

After connecting a custom domain, update `site.url` in `lib/site.ts` — it is
the base for the canonical URL, Open Graph tags, and the JSON-LD.

## Notes

- **Accessibility**: skip link, visible focus rings, labelled form fields with
  `aria-invalid` and `aria-describedby`, and `prefers-reduced-motion` honoured
  throughout (the hero marquee stops entirely).
- **SEO**: per-page metadata, Open Graph and Twitter cards, and `Person`
  JSON-LD listing every shown project.
- **Still to add**: an Open Graph share image at `public/og.png`
  (1200×630), referenced from `app/layout.tsx`.
