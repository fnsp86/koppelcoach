import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Algemene Voorwaarden",
  description: "Algemene voorwaarden van de Samen app.",
};

export default function VoorwaardenPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-nachtblauw mb-8">
        Algemene Voorwaarden
      </h1>
      <p className="text-sm text-leisteen mb-8">Laatst bijgewerkt: maart 2026</p>

      <div className="prose prose-sm max-w-none text-leisteen [&_h2]:text-nachtblauw [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-10 [&_h2]:mb-4 [&_p]:mb-4 [&_p]:leading-relaxed [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mb-1">
        <h2>1. Definities</h2>
        <p>
          &quot;Samen&quot; verwijst naar de mobiele applicatie en bijbehorende website (samenapp.nl).
          &quot;Gebruiker&quot; verwijst naar iedere persoon die de app downloadt en/of gebruikt.
          &quot;Dienst&quot; verwijst naar alle functies en content die via de app beschikbaar worden gesteld.
        </p>

        <h2>2. Toepasselijkheid</h2>
        <p>
          Door het downloaden, installeren of gebruiken van de Samen app ga je akkoord met deze
          algemene voorwaarden. Als je niet akkoord gaat, verzoeken wij je de app niet te gebruiken.
        </p>

        <h2>3. Gebruik van de app</h2>
        <p>De Samen app is bedoeld voor:</p>
        <ul>
          <li>Personen van 16 jaar en ouder</li>
          <li>Persoonlijk, niet-commercieel gebruik</li>
          <li>Het versterken van jullie relatie via check-ins, quizzen, gesprekken en activiteiten</li>
        </ul>
        <p>
          Je bent verantwoordelijk voor het vertrouwelijk houden van je inloggegevens en voor
          alle activiteiten die onder je account plaatsvinden.
        </p>

        <h2>4. Account en koppeling</h2>
        <p>
          Om de app te gebruiken maak je een account aan met een geldig e-mailadres.
          Je kunt je account koppelen aan dat van je partner via een koppelcode.
          Door te koppelen geef je toestemming om bepaalde gegevens (zoals check-in antwoorden
          en quizresultaten) te delen met je partner.
        </p>

        <h2>5. Content en eigendom</h2>
        <p>
          Alle content in de app (teksten, vragen, quizzen, illustraties) is eigendom van Samen
          en beschermd door auteursrecht. Je mag deze content niet kopieren, distribueren of
          commercieel gebruiken zonder schriftelijke toestemming.
        </p>
        <p>
          Content die je zelf aanmaakt (dagboeknotities, antwoorden) blijft van jou.
          Je geeft ons toestemming om deze content op te slaan en weer te geven binnen de app.
        </p>

        <h2>6. Beschikbaarheid</h2>
        <p>
          Wij streven naar een zo hoog mogelijke beschikbaarheid van de app, maar kunnen geen
          100% uptime garanderen. Wij zijn niet aansprakelijk voor schade als gevolg van
          onbeschikbaarheid of technische storingen.
        </p>

        <h2>7. Aansprakelijkheid</h2>
        <p>
          De Samen app biedt geen professioneel relatie- of therapieadvies. De app is bedoeld
          als hulpmiddel voor persoonlijke groei binnen een relatie. Bij ernstige
          relatieproblemen raden wij aan professionele hulp te zoeken.
        </p>
        <p>
          Onze aansprakelijkheid is beperkt tot het bedrag dat je eventueel aan ons hebt betaald
          voor premium functies.
        </p>

        <h2>8. Betalingen en premium</h2>
        <p>
          Bepaalde functies zijn beschikbaar via een eenmalige aankoop (Samen Premium).
          Betalingen worden verwerkt via de App Store (Apple) of Google Play Store.
          Het retourbeleid van het betreffende platform is van toepassing.
        </p>

        <h2>9. Beeindiging</h2>
        <p>
          Je kunt je account op elk moment verwijderen via de instellingen in de app.
          Bij verwijdering worden al je persoonlijke gegevens permanent verwijderd conform
          ons privacybeleid.
        </p>
        <p>
          Wij behouden ons het recht voor om accounts te beeindigen bij misbruik of
          schending van deze voorwaarden.
        </p>

        <h2>10. Wijzigingen</h2>
        <p>
          Wij kunnen deze voorwaarden van tijd tot tijd wijzigen. Bij belangrijke wijzigingen
          informeren wij je via de app. Voortgezet gebruik na een wijziging geldt als acceptatie
          van de nieuwe voorwaarden.
        </p>

        <h2>11. Toepasselijk recht</h2>
        <p>
          Op deze voorwaarden is Nederlands recht van toepassing. Geschillen worden voorgelegd
          aan de bevoegde rechter in Nederland.
        </p>

        <h2>12. Contact</h2>
        <p>
          Vragen over deze voorwaarden? Neem contact met ons op via info@samenapp.nl.
        </p>
      </div>
    </div>
  );
}
