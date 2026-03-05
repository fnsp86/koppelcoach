import type { Metadata } from "next";
import { Heart, CheckCircle, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Download",
  description: "De Samen app komt binnenkort beschikbaar voor iPhone en Android.",
};

export default function DownloadPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="text-center mb-14">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-terracotta mx-auto mb-6">
          <Heart className="h-8 w-8 text-white" strokeWidth={2.5} />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-nachtblauw mb-4">
          Samen komt eraan
        </h1>
        <p className="text-base text-leisteen max-w-lg mx-auto">
          We werken hard om Samen klaar te maken voor iPhone en Android. Houd deze pagina in de gaten voor de lancering.
        </p>
      </div>

      {/* Coming soon notice */}
      <div className="flex justify-center mb-14">
        <div className="inline-flex items-center justify-center gap-2 rounded-2xl bg-nachtblauw/10 px-8 py-4 text-base font-bold text-nachtblauw">
          <Clock className="h-5 w-5" />
          Binnenkort beschikbaar
        </div>
      </div>

      {/* What you get */}
      <div className="rounded-2xl border border-zand bg-zand-light p-8">
        <h2 className="text-xl font-bold text-nachtblauw mb-6 text-center">
          Wat krijg je met Samen?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            "Dagelijkse check-ins",
            "Diepgaande gespreksstarters",
            "Koppel quizzen en spellen",
            "Gedeeld dagboek",
            "Date roulette met 200+ ideeen",
            "Persoonlijke relatiepols",
            "Vergelijk elkaars antwoorden",
            "Dankbaarheidsberichten",
          ].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-salie shrink-0" />
              <span className="text-sm text-nachtblauw">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Device requirements */}
      <div className="mt-8 text-center">
        <p className="text-xs text-leisteen">
          Vereist iOS 15+ of Android 10+. De app wordt gratis te downloaden.
        </p>
      </div>
    </div>
  );
}
