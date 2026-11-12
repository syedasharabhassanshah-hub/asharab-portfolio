import { site } from "@/lib/site";

/** Always-reachable WhatsApp link, so a visitor never has to scroll to the
 *  contact section to start a conversation. */
export default function WhatsAppButton() {
  return (
    <a
      href={`${site.links.whatsapp}?text=${encodeURIComponent(
        "Hi Asharab, I'd like a free preview of a website for my business.",
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Message Asharab on WhatsApp, ${site.whatsappDisplay}`}
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2.5 rounded-full bg-[#1faf54] py-3 pl-3.5 pr-5 text-sm font-semibold text-white shadow-[0_12px_30px_-8px_rgba(0,0,0,0.7)] transition-transform duration-300 hover:-translate-y-0.5"
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.5 11.5a8.500 8.500 0 0 1-12.600 7.450L3.500 20.500l1.600-4.300A8.500 8.500 0 1 1 20.500 11.500z" />
        <path d="M9 9.500c0 3 2.500 5.500 5.500 5.500" />
      </svg>
      <span className="hidden sm:inline">Free preview on WhatsApp</span>
      <span className="sm:hidden">WhatsApp</span>
    </a>
  );
}
