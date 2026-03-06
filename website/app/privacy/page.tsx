import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacybeleid",
  description: "Privacybeleid van de Samen app. Lees hoe wij omgaan met jullie gegevens.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-nachtblauw mb-8">
        Privacybeleid
      </h1>
      <p className="text-sm text-leisteen mb-8">Laatst bijgewerkt: maart 2026</p>

      <div className="prose prose-sm max-w-none text-leisteen [&_h2]:text-nachtblauw [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-nachtblauw [&_h3]:font-bold [&_h3]:mt-6 [&_h3]:mb-2 [&_p]:mb-4 [&_p]:leading-relaxed [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mb-1">
        <h2>1. Inleiding</h2>
        <p>
          Samen (&quot;wij&quot;, &quot;ons&quot;, &quot;onze&quot;) hecht veel waarde aan de privacy van onze gebruikers.
          Dit privacybeleid legt uit welke gegevens wij verzamelen, hoe wij deze gebruiken en welke rechten
          je hebt met betrekking tot je persoonlijke gegevens.
        </p>

        <h2>2. Welke gegevens verzamelen wij?</h2>
        <h3>Accountgegevens</h3>
        <ul>
          <li>E-mailadres (voor inloggen en accountherstel)</li>
          <li>Naam of bijnaam (optioneel, voor weergave in de app)</li>
          <li>Profielfoto (optioneel)</li>
        </ul>

        <h3>Relatiegegevens</h3>
        <ul>
          <li>Koppelcode (om met je partner te verbinden)</li>
          <li>Relatiedatum (optioneel)</li>
          <li>Antwoorden op check-ins, quizzen en vragen</li>
          <li>Dagboeknotities</li>
        </ul>

        <h3>Technische gegevens</h3>
        <ul>
          <li>Apparaattype en besturingssysteem</li>
          <li>App-versie</li>
          <li>Anonieme gebruiksstatistieken</li>
        </ul>

        <h2>3. Hoe gebruiken wij je gegevens?</h2>
        <p>Wij gebruiken je gegevens uitsluitend voor:</p>
        <ul>
          <li>Het leveren en verbeteren van de Samen app</li>
          <li>Het synchroniseren van gegevens tussen jou en je partner</li>
          <li>Het genereren van persoonlijke inzichten over jullie relatie</li>
          <li>Technische ondersteuning en probleemoplossing</li>
        </ul>
        <p>
          Wij verkopen nooit je persoonlijke gegevens aan derden. Wij gebruiken je gegevens
          niet voor advertenties of marketing aan derden.
        </p>

        <h2>4. Opslag en beveiliging</h2>
        <p>
          Je gegevens worden veilig opgeslagen via Supabase, met versleuteling in transit (TLS)
          en in rust. Onze servers bevinden zich in de Europese Unie, in overeenstemming met de AVG.
        </p>

        <h2>5. Gegevens delen</h2>
        <p>
          Bepaalde gegevens worden gedeeld met je partner binnen de app (zoals check-in antwoorden
          en quizresultaten). Dit is een kernfunctie van de app en gebeurt alleen na het koppelen
          via de koppelcode.
        </p>
        <p>
          Wij delen geen gegevens met externe partijen, behalve:
        </p>
        <ul>
          <li>Vercel (hosting en analytics, anoniem)</li>
          <li>Supabase (database en authenticatie)</li>
          <li>Wanneer wettelijk vereist</li>
        </ul>

        <h2>6. Je rechten (AVG)</h2>
        <p>Je hebt recht op:</p>
        <ul>
          <li>Inzage in je persoonlijke gegevens</li>
          <li>Correctie van onjuiste gegevens</li>
          <li>Verwijdering van je account en alle gegevens</li>
          <li>Overdracht van je gegevens (dataportabiliteit)</li>
          <li>Bezwaar tegen verwerking</li>
        </ul>
        <p>
          Om gebruik te maken van deze rechten, neem contact met ons op via het contactformulier
          of stuur een e-mail naar privacy@samenapp.nl.
        </p>

        <h2>7. Bewaartermijn</h2>
        <p>
          Wij bewaren je gegevens zolang je een actief account hebt. Bij verwijdering van je account
          worden alle persoonlijke gegevens binnen 30 dagen permanent verwijderd.
        </p>

        <h2>8. Cookies</h2>
        <p>
          De Samen website gebruikt alleen strikt noodzakelijke cookies en Vercel Analytics
          (privacyvriendelijk, zonder cookies). Wij gebruiken geen tracking cookies van derden.
        </p>

        <h2>9. Kinderen</h2>
        <p>
          De Samen app is niet bedoeld voor personen onder de 16 jaar. Wij verzamelen niet
          bewust gegevens van minderjarigen.
        </p>

        <h2>10. Wijzigingen</h2>
        <p>
          Wij kunnen dit privacybeleid van tijd tot tijd bijwerken. Bij belangrijke wijzigingen
          informeren wij je via de app of per e-mail. De laatste versie is altijd beschikbaar op deze pagina.
        </p>

        <h2>11. Contact</h2>
        <p>
          Heb je vragen over dit privacybeleid? Neem contact met ons op via privacy@samenapp.nl.
        </p>
      </div>
    </div>
  );
}
