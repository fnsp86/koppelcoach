import Link from "next/link";
import { Heart } from "lucide-react";

const FOOTER_LINKS = {
  App: [
    { href: "/download", label: "Download" },
    { href: "/#features", label: "Features" },
    { href: "/#hoe-werkt-het", label: "Hoe werkt het" },
  ],
  Support: [
    { href: "/faq", label: "Veelgestelde vragen" },
    { href: "/contact", label: "Contact" },
  ],
  Juridisch: [
    { href: "/privacy", label: "Privacybeleid" },
    { href: "/voorwaarden", label: "Algemene voorwaarden" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-nachtblauw">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-terracotta">
                <Heart className="h-4 w-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-base font-extrabold text-white">
                Samen
              </span>
            </div>
            <p className="text-sm text-white/50 leading-relaxed max-w-[200px]">
              De app voor koppels die samen willen groeien.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-xs font-bold text-white/30 uppercase tracking-wider mb-4">
                {title}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} Samen App
          </span>
          <span className="text-xs text-white/30">
            Gemaakt met{" "}
            <Heart className="inline h-3 w-3 text-terracotta" /> in Nederland
          </span>
        </div>
      </div>
    </footer>
  );
}
