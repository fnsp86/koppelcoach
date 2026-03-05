import type { Metadata } from "next";
import { Mail, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description: "Neem contact op met het Samen app team. We helpen je graag.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="text-center mb-14">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-nachtblauw mb-4">
          Contact
        </h1>
        <p className="text-base text-leisteen max-w-lg mx-auto">
          Heb je een vraag, suggestie of loop je ergens tegenaan? We horen graag
          van je.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <a
          href="mailto:info@samenapp.nl"
          className="rounded-2xl border border-zand bg-warmwit p-6 text-center transition-all hover:shadow-lg hover:-translate-y-0.5"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-terracotta/10 mx-auto mb-4">
            <Mail className="h-6 w-6 text-terracotta" />
          </div>
          <h2 className="text-base font-bold text-nachtblauw mb-2">
            E-mail
          </h2>
          <p className="text-sm text-leisteen mb-3">
            Stuur ons een bericht en we reageren zo snel mogelijk.
          </p>
          <span className="text-sm font-bold text-terracotta">
            info@samenapp.nl
          </span>
        </a>

        <a
          href="mailto:support@samenapp.nl"
          className="rounded-2xl border border-zand bg-warmwit p-6 text-center transition-all hover:shadow-lg hover:-translate-y-0.5"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-oceaan/10 mx-auto mb-4">
            <MessageCircle className="h-6 w-6 text-oceaan" />
          </div>
          <h2 className="text-base font-bold text-nachtblauw mb-2">
            Support
          </h2>
          <p className="text-sm text-leisteen mb-3">
            Technische problemen? Ons support team helpt je graag.
          </p>
          <span className="text-sm font-bold text-oceaan">
            support@samenapp.nl
          </span>
        </a>
      </div>

      <div className="mt-10 rounded-2xl border border-zand bg-zand-light p-6 text-center">
        <p className="text-sm text-leisteen">
          Voor privacygerelateerde vragen kun je ook terecht bij{" "}
          <a
            href="mailto:privacy@samenapp.nl"
            className="font-bold text-terracotta hover:underline"
          >
            privacy@samenapp.nl
          </a>
        </p>
      </div>
    </div>
  );
}
