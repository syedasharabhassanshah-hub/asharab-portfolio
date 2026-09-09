import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-ink-line py-12">
      <div className="mx-auto flex max-w-[86rem] flex-col gap-6 px-6 sm:flex-row sm:items-center sm:justify-between lg:px-10">
        <p className="text-sm text-muted">
          &copy; {new Date().getFullYear()} {site.fullName}
        </p>

        <nav className="flex flex-wrap gap-x-7 gap-y-2" aria-label="Footer">
          <a
            href={site.links.fiverr}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted transition-colors duration-300 hover:text-bone"
          >
            Fiverr
          </a>
          <a
            href={site.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted transition-colors duration-300 hover:text-bone"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${site.email}`}
            className="text-sm text-muted transition-colors duration-300 hover:text-bone"
          >
            Email
          </a>
          <a
            href="#top"
            className="text-sm text-muted transition-colors duration-300 hover:text-bone"
          >
            Back to top
          </a>
        </nav>
      </div>
    </footer>
  );
}
