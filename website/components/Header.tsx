"use client";

import Link from "next/link";
import { useState } from "react";
import { Heart, Menu, X, Smartphone } from "lucide-react";

const NAV_LINKS = [
  { href: "/#features", label: "Features" },
  { href: "/#hoe-werkt-het", label: "Hoe werkt het" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-warmwit/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-terracotta transition-transform group-hover:scale-95">
            <Heart className="h-4.5 w-4.5 text-white" strokeWidth={2.5} />
          </div>
          <span className="text-lg font-extrabold text-nachtblauw">Samen</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-leisteen transition-colors hover:text-nachtblauw"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/download"
            className="inline-flex items-center gap-2 rounded-xl bg-nachtblauw px-5 py-2.5 text-sm font-bold text-white transition-all hover:scale-[0.97] hover:shadow-lg"
          >
            <Smartphone className="h-4 w-4" />
            Download
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden rounded-xl p-2 text-leisteen hover:bg-zand-light transition-colors"
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <nav className="border-t border-zand/50 bg-warmwit px-4 pb-5 pt-2 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-base font-medium text-nachtblauw"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/download"
            onClick={() => setOpen(false)}
            className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-nachtblauw px-5 py-3.5 text-sm font-bold text-white"
          >
            <Smartphone className="h-4 w-4" />
            Download gratis
          </Link>
        </nav>
      )}
    </header>
  );
}
