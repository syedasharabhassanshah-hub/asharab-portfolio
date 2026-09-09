type Props = {
  domain: string;
  children: React.ReactNode;
  className?: string;
};

/** Chrome around a screenshot, so a thumbnail reads as a real, live site. */
export default function BrowserFrame({ domain, children, className = "" }: Props) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-ink-line bg-ink-raised shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] ${className}`}
    >
      <div className="flex items-center gap-3 border-b border-ink-line bg-ink-raised/90 px-4 py-2.5">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-bone/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-bone/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-bone/15" />
        </div>
        <div className="flex-1 truncate rounded-md bg-ink/60 px-3 py-1 text-center text-[11px] text-muted">
          {domain}
        </div>
      </div>
      <div className="aspect-[4/3] sm:aspect-[16/10]">{children}</div>
    </div>
  );
}
