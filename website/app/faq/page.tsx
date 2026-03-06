import type { Metadata } from "next";
import { ChevronDown } from "lucide-react";

export const metadata: Metadata = {
  title: "Veelgestelde vragen",
  description: "Antwoorden op veelgestelde vragen over de Samen app voor koppels.",
  alternates: { canonical: "/faq" },
};

const FAQS = [
  {
    category: "Algemeen",
    questions: [
      {
        q: "Wat is de Samen app?",
        a: "Samen is een app voor koppels die hun relatie willen versterken. Met dagelijkse check-ins, quizzen, gespreksstarters, spellen en een gedeeld dagboek helpen wij jullie om dichter bij elkaar te komen.",
      },
      {
        q: "Voor wie is Samen bedoeld?",
        a: "Voor alle koppels die bewust willen werken aan hun relatie. Of jullie nu net samen zijn of al jaren bij elkaar: Samen biedt activiteiten voor elke fase van jullie relatie.",
      },
      {
        q: "Is Samen een vervanging voor relatietherapie?",
        a: "Nee. Samen is een hulpmiddel voor persoonlijke groei en verbinding. Bij ernstige relatieproblemen raden wij altijd aan om professionele hulp te zoeken.",
      },
    ],
  },
  {
    category: "Kosten",
    questions: [
      {
        q: "Is de app gratis?",
        a: "Ja, de basisfuncties zijn gratis. Je kunt dagelijkse check-ins doen, vragen beantwoorden en spellen spelen zonder te betalen. Met Samen Premium krijg je toegang tot alle functies.",
      },
      {
        q: "Wat kost Samen Premium?",
        a: "Samen Premium is een eenmalige aankoop. Geen abonnementen of verborgen kosten. Je betaalt een keer en krijgt permanent toegang tot alle functies.",
      },
      {
        q: "Kan ik Premium delen met mijn partner?",
        a: "Als je partner gekoppeld is aan jouw account, krijgt je partner automatisch ook toegang tot de premium functies.",
      },
    ],
  },
  {
    category: "Functionaliteit",
    questions: [
      {
        q: "Hoe verbind ik mijn partner?",
        a: "Na het aanmaken van je profiel krijg je een persoonlijke koppelcode. Deel deze met je partner via SMS, WhatsApp of mondeling. Je partner voert de code in en jullie zijn direct verbonden.",
      },
      {
        q: "Wat is de dagelijkse check-in?",
        a: "Een kort moment van reflectie over hoe het met jullie relatie gaat. Je beantwoordt een paar vragen over je stemming, verbinding en dankbaarheid. Na verloop van tijd zie je trends in jullie relatiepols.",
      },
      {
        q: "Wat zijn de koppelspellen?",
        a: "Leuke en lichte activiteiten die jullie samen doen. Denk aan 'wie kent wie beter' of keuze-dilemma's. De spellen zijn ontworpen om gesprekken op gang te brengen en samen te lachen.",
      },
      {
        q: "Hoe werkt de date roulette?",
        a: "Stel jullie budget, beschikbare tijd en voorkeur (thuis of buitenshuis) in, en de app geeft jullie een passend date-idee. Met meer dan 200 ideeen is er altijd iets nieuws.",
      },
      {
        q: "Kan ik elkaars antwoorden zien?",
        a: "Ja, na het beantwoorden van vragen en quizzen kun je elkaars antwoorden vergelijken in het Bespreek-scherm. Dit is een mooie manier om gesprekken te starten.",
      },
    ],
  },
  {
    category: "Privacy en veiligheid",
    questions: [
      {
        q: "Is mijn data veilig?",
        a: "Absoluut. Jullie gegevens worden versleuteld opgeslagen en we delen nooit persoonlijke informatie met derden. Lees ons volledige privacybeleid voor meer details.",
      },
      {
        q: "Wie kan mijn antwoorden zien?",
        a: "Alleen jij en je gekoppelde partner. Niemand anders heeft toegang tot jullie persoonlijke gegevens.",
      },
      {
        q: "Kan ik mijn account verwijderen?",
        a: "Ja, je kunt je account op elk moment verwijderen via de instellingen in de app. Al je persoonlijke gegevens worden dan permanent verwijderd.",
      },
    ],
  },
  {
    category: "Technisch",
    questions: [
      {
        q: "Op welke apparaten werkt Samen?",
        a: "Samen is beschikbaar voor iPhone (iOS 15 en hoger) en Android (versie 10 en hoger).",
      },
      {
        q: "Werkt het ook als mijn partner de app niet heeft?",
        a: "Je kunt de app solo gebruiken, maar de meeste functies zijn het leukst als je partner ook de app heeft. Je kunt je partner op elk moment uitnodigen.",
      },
      {
        q: "Heb ik internet nodig?",
        a: "Voor het synchroniseren met je partner heb je internet nodig. Sommige functies werken ook offline, maar voor de beste ervaring raden we een internetverbinding aan.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="text-center mb-14">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-nachtblauw mb-4">
          Veelgestelde vragen
        </h1>
        <p className="text-base text-leisteen max-w-lg mx-auto">
          Alles wat je wilt weten over de Samen app. Staat je vraag er niet
          tussen? Neem dan contact met ons op.
        </p>
      </div>

      <div className="space-y-10">
        {FAQS.map((section) => (
          <div key={section.category}>
            <h2 className="text-lg font-bold text-terracotta mb-4">
              {section.category}
            </h2>
            <div className="space-y-3">
              {section.questions.map((faq) => (
                <details
                  key={faq.q}
                  className="group rounded-2xl border border-zand bg-warmwit"
                >
                  <summary className="flex cursor-pointer items-center justify-between px-6 py-4 text-base font-bold text-nachtblauw list-none [&::-webkit-details-marker]:hidden">
                    {faq.q}
                    <ChevronDown className="h-5 w-5 text-leisteen transition-transform group-open:rotate-180 shrink-0 ml-4" />
                  </summary>
                  <div className="px-6 pb-4 text-sm text-leisteen leading-relaxed">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQS.flatMap((s) =>
              s.questions.map((faq) => ({
                "@type": "Question",
                name: faq.q,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.a,
                },
              }))
            ),
          }),
        }}
      />
    </div>
  );
}
