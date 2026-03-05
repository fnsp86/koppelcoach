export type ActivityType = 'vraag' | 'quiz' | 'spel';

export interface TopicActivity {
  id: string;
  topic: string;
  type: ActivityType;
  title: string;
  description: string;
}

export const TOPIC_ACTIVITIES: TopicActivity[] = [
  // Communicatie
  { id: 'com-1', topic: 'communicatie', type: 'vraag', title: 'Wat zou je willen dat ik vaker zeg?', description: 'Deel wat je graag zou horen van je partner' },
  { id: 'com-2', topic: 'communicatie', type: 'quiz', title: 'Empathie oefenen', description: 'Hoe goed begrijp je elkaars gevoelens?' },
  { id: 'com-3', topic: 'communicatie', type: 'spel', title: 'Jij of Ik? Complimenten', description: 'Wie geeft de beste complimenten?' },
  { id: 'com-4', topic: 'communicatie', type: 'quiz', title: 'Vriendelijke verzoeken', description: 'Leer vragen zonder eisen te stellen' },
  { id: 'com-5', topic: 'communicatie', type: 'vraag', title: 'Wat is een verandering die je zelf zou willen maken?', description: 'Reflecteer op je eigen communicatiestijl' },
  { id: 'com-6', topic: 'communicatie', type: 'spel', title: 'Jij of Ik? Beslissingen', description: 'Wie neemt welke beslissingen?' },
  { id: 'com-7', topic: 'communicatie', type: 'quiz', title: 'Delen vs. ventileren', description: 'Het verschil tussen delen en klagen' },
  { id: 'com-8', topic: 'communicatie', type: 'vraag', title: 'Wat is een compromis waar je trots op bent?', description: 'Herinner een moment van samenwerking' },
  { id: 'com-9', topic: 'communicatie', type: 'vraag', title: 'Wanneer voel je je het minst begrepen?', description: 'Ontdek blinde vlekken in jullie communicatie' },
  { id: 'com-10', topic: 'communicatie', type: 'spel', title: 'Raad mijn stemming', description: 'Lees elkaars lichaamstaal en gezichtsuitdrukkingen' },
  { id: 'com-11', topic: 'communicatie', type: 'quiz', title: 'Actief luisteren', description: 'Hoe goed luister je echt naar je partner?' },
  { id: 'com-12', topic: 'communicatie', type: 'vraag', title: 'Welk gesprek stel je steeds uit?', description: 'Maak ruimte voor het ongemakkelijke' },
  { id: 'com-13', topic: 'communicatie', type: 'spel', title: 'Vertaal mijn gevoel', description: 'Je partner zegt iets, jij herformuleert het als gevoel. Klopt het? Wissel om.' },
  { id: 'com-14', topic: 'communicatie', type: 'quiz', title: 'Ik-boodschappen', description: 'Herken het verschil tussen een verwijt en een ik-boodschap' },
  { id: 'com-15', topic: 'communicatie', type: 'vraag', title: 'Op welk moment van de dag praten wij het beste?', description: 'Ontdek wanneer jullie het meest open naar elkaar zijn' },

  // Conflict
  { id: 'con-1', topic: 'conflict', type: 'spel', title: 'Samen rustig worden', description: 'Oefening om samen te de-escaleren' },
  { id: 'con-2', topic: 'conflict', type: 'spel', title: 'Weer toenadering zoeken', description: 'Hoe maak je het goed na een ruzie?' },
  { id: 'con-3', topic: 'conflict', type: 'spel', title: 'Herstellen of terugtrekken?', description: 'Wat doe jij als het moeilijk wordt?' },
  { id: 'con-4', topic: 'conflict', type: 'quiz', title: 'Wrok voorkomen', description: 'Herken de signalen van opgebouwde frustratie' },
  { id: 'con-5', topic: 'conflict', type: 'spel', title: 'Jij of Ik? Stilte', description: 'Wie trekt zich het eerst terug?' },
  { id: 'con-6', topic: 'conflict', type: 'spel', title: 'De weg naar vergeven', description: 'Stappen naar vergeving en herstel' },
  { id: 'con-7', topic: 'conflict', type: 'quiz', title: 'Spanning ombuigen', description: 'Van spanning naar begrip' },
  { id: 'con-8', topic: 'conflict', type: 'vraag', title: 'Wat is een uitdaging in onze communicatie?', description: 'Identificeer een groeipunt' },
  { id: 'con-9', topic: 'conflict', type: 'vraag', title: 'Wat triggert je het snelst?', description: 'Leer elkaars gevoelige punten kennen' },
  { id: 'con-10', topic: 'conflict', type: 'quiz', title: 'Conflictstijlen herkennen', description: 'Ben je een vechter, vluchter of prater?' },
  { id: 'con-11', topic: 'conflict', type: 'spel', title: 'Sorry zeggen', description: 'Oefen met oprecht je excuses aanbieden' },
  { id: 'con-12', topic: 'conflict', type: 'vraag', title: 'Welke ruzie heeft ons sterker gemaakt?', description: 'Vind de groei in moeilijke momenten' },
  { id: 'con-13', topic: 'conflict', type: 'quiz', title: 'Pauzeknop herkennen', description: 'Weet je wanneer je een time-out moet nemen voordat het escaleert?' },
  { id: 'con-14', topic: 'conflict', type: 'vraag', title: 'Waar gaat onze terugkerende discussie eigenlijk over?', description: 'Graaf dieper dan het oppervlak van jullie vaste meningsverschil' },
  { id: 'con-15', topic: 'conflict', type: 'spel', title: 'Ruil van perspectief', description: 'Verdedig allebei het standpunt van de ander. Wie doet het het overtuigendst?' },

  // Sex & Intimiteit
  { id: 'int-1', topic: 'intimiteit', type: 'vraag', title: 'Wat is iets nieuws dat je zou willen proberen?', description: 'Open het gesprek over wensen' },
  { id: 'int-2', topic: 'intimiteit', type: 'quiz', title: 'Gesprekken over intimiteit', description: 'Hoe bespreek je intimiteit?' },
  { id: 'int-3', topic: 'intimiteit', type: 'quiz', title: 'Verder dan het fysieke', description: 'Emotionele en fysieke verbinding' },
  { id: 'int-4', topic: 'intimiteit', type: 'spel', title: 'Dit of Dat? Voorspel', description: 'Leuke voorkeuren ontdekken' },
  { id: 'int-5', topic: 'intimiteit', type: 'spel', title: 'Jij of Ik? Kussen', description: 'Wie geeft de beste kusjes?' },
  { id: 'int-6', topic: 'intimiteit', type: 'vraag', title: 'Wanneer voel je je het meest verbonden?', description: 'Ontdek elkaars momenten van verbinding' },
  { id: 'int-7', topic: 'intimiteit', type: 'spel', title: 'Complimenten over elkaars lichaam', description: 'Geef drie oprechte fysieke complimenten' },
  { id: 'int-8', topic: 'intimiteit', type: 'quiz', title: 'Grenzen en wensen', description: 'Hoe goed ken je elkaars grenzen?' },
  { id: 'int-9', topic: 'intimiteit', type: 'vraag', title: 'Wat maakt een aanraking bijzonder?', description: 'Praat over de kleine fysieke gebaren die ertoe doen' },
  { id: 'int-10', topic: 'intimiteit', type: 'spel', title: '5 minuten alleen aanraken', description: 'Zet een timer en raak elkaar aan zonder te praten. Bespreek daarna wat je voelde.' },
  { id: 'int-11', topic: 'intimiteit', type: 'vraag', title: 'Wat zou je vaker willen initiëren?', description: 'Bespreek wie het initiatief neemt en hoe jullie dat kunnen balanceren' },
  { id: 'int-12', topic: 'intimiteit', type: 'quiz', title: 'Romantiek vs. passie', description: 'Wat heeft je partner op dit moment meer nodig: tederheid of spanning?' },

  // Connectie
  { id: 'cnx-1', topic: 'connectie', type: 'vraag', title: 'Wat maakt ons als koppel uniek?', description: 'Reflecteer op jullie bijzondere band' },
  { id: 'cnx-2', topic: 'connectie', type: 'quiz', title: 'Liefdestalen begrijpen', description: 'Ken je elkaars liefdestaal?' },
  { id: 'cnx-3', topic: 'connectie', type: 'spel', title: 'Herinner je dit moment?', description: 'Test jullie gedeelde herinneringen' },
  { id: 'cnx-4', topic: 'connectie', type: 'vraag', title: 'Wat is je favoriete herinnering aan ons?', description: 'Deel je mooiste moment samen' },
  { id: 'cnx-5', topic: 'connectie', type: 'spel', title: 'Jij of Ik? Romantisch', description: 'Wie is de meest romantische?' },
  { id: 'cnx-6', topic: 'connectie', type: 'quiz', title: 'Dagelijkse rituelen', description: 'Welke gewoonten verbinden jullie?' },
  { id: 'cnx-7', topic: 'connectie', type: 'vraag', title: 'Wanneer voelde je je het meest trots op ons?', description: 'Deel een moment waarop jullie samen sterk waren' },
  { id: 'cnx-8', topic: 'connectie', type: 'spel', title: 'Ken je mijn favorieten?', description: 'Test of je elkaars voorkeuren echt kent' },
  { id: 'cnx-9', topic: 'connectie', type: 'quiz', title: 'Kleine gebaren, grote impact', description: 'Welke dagelijkse gewoonten versterken jullie band?' },
  { id: 'cnx-10', topic: 'connectie', type: 'vraag', title: 'Wat mis je als we even niet samen zijn?', description: 'Ontdek wat jullie verbinding voedt' },
  { id: 'cnx-11', topic: 'connectie', type: 'spel', title: 'Schrijf een briefje', description: 'Schrijf allebei in stilte een kort briefje aan de ander. Lees ze daarna hardop voor.' },
  { id: 'cnx-12', topic: 'connectie', type: 'quiz', title: 'Weet je wat ik denk?', description: 'Krijg allebei dezelfde vraag en raad het antwoord van de ander' },
  { id: 'cnx-13', topic: 'connectie', type: 'vraag', title: 'Waarin ben je de laatste tijd veranderd?', description: 'Praat over hoe jullie als persoon groeien en of de ander dat merkt' },

  // Groei
  { id: 'gro-1', topic: 'groei', type: 'vraag', title: 'Waar wil je over 5 jaar staan?', description: 'Deel je persoonlijke ambities' },
  { id: 'gro-2', topic: 'groei', type: 'quiz', title: 'Elkaars dromen steunen', description: 'Hoe help je je partner groeien?' },
  { id: 'gro-3', topic: 'groei', type: 'spel', title: 'Jij of Ik? Doorzetter', description: 'Wie geeft het minst snel op?' },
  { id: 'gro-4', topic: 'groei', type: 'vraag', title: 'Wat heb je van mij geleerd?', description: 'Reflecteer op elkaars invloed' },
  { id: 'gro-5', topic: 'groei', type: 'quiz', title: 'Grenzen stellen', description: 'Gezonde grenzen in een relatie' },
  { id: 'gro-6', topic: 'groei', type: 'spel', title: 'Toekomst bouwen', description: 'Plan samen aan jullie dromen' },
  { id: 'gro-7', topic: 'groei', type: 'vraag', title: 'Welke eigenschap van mij bewonder je?', description: 'Benoem elkaars sterke kanten' },
  { id: 'gro-8', topic: 'groei', type: 'quiz', title: 'Omgaan met verandering', description: 'Hoe flexibel zijn jullie als koppel?' },
  { id: 'gro-9', topic: 'groei', type: 'spel', title: 'Bucketlist als koppel', description: 'Stel samen een lijst op van dromen en doelen' },
  { id: 'gro-10', topic: 'groei', type: 'vraag', title: 'Welke gewoonte zou je willen doorbreken?', description: 'Bespreek een patroon dat je niet meer dient en hoe je partner je kan helpen' },
  { id: 'gro-11', topic: 'groei', type: 'spel', title: 'Leermeester voor een dag', description: 'Leer je partner iets wat jij goed kunt. Wissel daarna om.' },
  { id: 'gro-12', topic: 'groei', type: 'quiz', title: 'Comfortzone verlaten', description: 'Hoe moedig je elkaar aan om nieuwe dingen te proberen?' },

  // Geld & Financien
  { id: 'gel-1', topic: 'geld', type: 'vraag', title: 'Wat is jouw grootste financiele doel?', description: 'Bespreek jullie gelddromen' },
  { id: 'gel-2', topic: 'geld', type: 'quiz', title: 'Spaarder of uitgever?', description: 'Ontdek jullie financiele stijlen' },
  { id: 'gel-3', topic: 'geld', type: 'spel', title: 'Jij of Ik? Spontane aankopen', description: 'Wie koopt er vaker impulsief?' },
  { id: 'gel-4', topic: 'geld', type: 'vraag', title: 'Hoe gingen jullie ouders om met geld?', description: 'Begrijp elkaars financiele achtergrond' },
  { id: 'gel-5', topic: 'geld', type: 'quiz', title: 'Budget als team', description: 'Samen financiele doelen bereiken' },
  { id: 'gel-6', topic: 'geld', type: 'spel', title: 'Wat zou je doen met...', description: 'Leuke hypothetische geldsituaties' },
  { id: 'gel-7', topic: 'geld', type: 'vraag', title: 'Waar geef je stiekem te veel aan uit?', description: 'Wees eerlijk over je guilty pleasure-uitgaven' },
  { id: 'gel-8', topic: 'geld', type: 'quiz', title: 'Financiele eerlijkheid', description: 'Hoe open zijn jullie over geldzaken?' },
  { id: 'gel-9', topic: 'geld', type: 'spel', title: 'Budget challenge', description: 'Plan samen een leuk weekend met een klein budget' },
  { id: 'gel-10', topic: 'geld', type: 'spel', title: 'Raad de prijs', description: 'Noem om de beurt een recente aankoop. Kan de ander de prijs raden?' },
  { id: 'gel-11', topic: 'geld', type: 'vraag', title: 'Welke uitgave was achteraf elke cent waard?', description: 'Deel een aankoop of ervaring die jullie relatie rijker maakte' },
  { id: 'gel-12', topic: 'geld', type: 'quiz', title: 'Samen of apart betalen?', description: 'Hoe verdelen jullie kosten en past dat nog bij jullie situatie?' },

  // Plezier
  { id: 'ple-1', topic: 'plezier', type: 'spel', title: 'Zou je liever...', description: 'Hilarische dilemmas voor koppels' },
  { id: 'ple-2', topic: 'plezier', type: 'vraag', title: 'Wat is de grappigste herinnering aan ons?', description: 'Lach samen om het verleden' },
  { id: 'ple-3', topic: 'plezier', type: 'spel', title: 'Date-idee generator', description: 'Laat het toeval jullie date bepalen' },
  { id: 'ple-4', topic: 'plezier', type: 'quiz', title: 'Avontuur of rust?', description: 'Ontdek jullie ideale weekend' },
  { id: 'ple-5', topic: 'plezier', type: 'vraag', title: 'Welk avontuur wil je samen beleven?', description: 'Droom samen over iets wat jullie nog nooit gedaan hebben' },
  { id: 'ple-6', topic: 'plezier', type: 'spel', title: 'Jij of Ik? Feestbeest', description: 'Wie is de meest spontane?' },
  { id: 'ple-7', topic: 'plezier', type: 'vraag', title: 'Wat is het gekste dat we samen hebben meegemaakt?', description: 'Haal een hilarisch avontuur op' },
  { id: 'ple-8', topic: 'plezier', type: 'spel', title: 'Twee waarheden, een leugen', description: 'Ken je je partner goed genoeg om de leugen te raden?' },
  { id: 'ple-9', topic: 'plezier', type: 'quiz', title: 'Humor in de relatie', description: 'Hoe belangrijk is lachen voor jullie?' },
  { id: 'ple-10', topic: 'plezier', type: 'spel', title: 'Teken je partner', description: 'Teken allebei een portret van de ander in 60 seconden. Vergelijk de resultaten.' },
  { id: 'ple-11', topic: 'plezier', type: 'vraag', title: 'Als wij een film waren, welk genre zou het zijn?', description: 'Beschrijf jullie relatie als een filmscenario en vergelijk elkaars versie' },
  { id: 'ple-12', topic: 'plezier', type: 'quiz', title: 'Ken je mijn guilty pleasures?', description: 'Raad elkaars stiekeme genoegens - van snacks tot tv-series' },

  // Huis & Werk
  { id: 'wer-1', topic: 'werk', type: 'vraag', title: 'Hoe kan ik je beter steunen na een drukke werkdag?', description: 'Ontdek wat je partner nodig heeft' },
  { id: 'wer-2', topic: 'werk', type: 'quiz', title: 'Taakverdeling in huis', description: 'Is de verdeling eerlijk?' },
  { id: 'wer-3', topic: 'werk', type: 'spel', title: 'Jij of Ik? Opruimer', description: 'Wie is de netste thuis?' },
  { id: 'wer-4', topic: 'werk', type: 'vraag', title: 'Wat is je droom-werk-privebalans?', description: 'Bespreek jullie ideale ritme' },
  { id: 'wer-5', topic: 'werk', type: 'quiz', title: 'Stress herkennen', description: 'Signalen van stress bij je partner' },
  { id: 'wer-6', topic: 'werk', type: 'spel', title: 'Huishoudquiz', description: 'Ken je elkaars huishoudvoorkeuren?' },
  { id: 'wer-7', topic: 'werk', type: 'vraag', title: 'Wat zou je veranderen aan onze dagelijkse routine?', description: 'Bespreek verbeterpunten in jullie ritme' },
  { id: 'wer-8', topic: 'werk', type: 'quiz', title: 'Mentale lading verdelen', description: 'Wie draagt de meeste onzichtbare taken?' },
  { id: 'wer-9', topic: 'werk', type: 'spel', title: 'Rollenwissel', description: 'Wissel een dag van taken en ontdek wat de ander doet' },
  { id: 'wer-10', topic: 'werk', type: 'vraag', title: 'Wat is het lastigste aan thuiswerken voor onze relatie?', description: 'Bespreek hoe werk en thuis door elkaar lopen en wat jullie daaraan kunnen doen' },
  { id: 'wer-11', topic: 'werk', type: 'spel', title: 'Klussenveiling', description: 'Schrijf huishoudtaken op briefjes en verdeel ze door erop te bieden met punten' },
  { id: 'wer-12', topic: 'werk', type: 'quiz', title: 'Energiegevers en -vreters', description: 'Welke taken kosten je partner energie en welke geven juist energie?' },

  // Familie & Vrienden
  { id: 'fam-1', topic: 'familie', type: 'vraag', title: 'Wat vind je het moeilijkste aan schoonfamilie?', description: 'Open gesprek over familiedynamiek' },
  { id: 'fam-2', topic: 'familie', type: 'quiz', title: 'Grenzen met familie', description: 'Hoe stel je gezonde grenzen?' },
  { id: 'fam-3', topic: 'familie', type: 'spel', title: 'Jij of Ik? Sociaal', description: 'Wie is de meest sociale?' },
  { id: 'fam-4', topic: 'familie', type: 'vraag', title: 'Welke tradities willen we overnemen?', description: 'Bouw jullie eigen familietradities' },
  { id: 'fam-5', topic: 'familie', type: 'quiz', title: 'Opvoedstijlen', description: 'Wat voor ouders willen jullie zijn?' },
  { id: 'fam-6', topic: 'familie', type: 'spel', title: 'Vriendschapsquiz', description: 'Ken je elkaars beste vrienden?' },
  { id: 'fam-7', topic: 'familie', type: 'vraag', title: 'Welke waarde van jouw familie wil je doorgeven?', description: 'Deel wat je van thuis hebt meegekregen' },
  { id: 'fam-8', topic: 'familie', type: 'quiz', title: 'Balans tussen ons en anderen', description: 'Hoeveel ruimte geven jullie aan familie en vrienden?' },
  { id: 'fam-9', topic: 'familie', type: 'spel', title: 'Familieverhalen raden', description: 'Ken je de verhalen uit elkaars jeugd?' },
  { id: 'fam-10', topic: 'familie', type: 'vraag', title: 'Op welke vriend of vriendin van mij zou je zelf ook willen lijken?', description: 'Ontdek welke eigenschappen jullie waarderen in elkaars vriendenkring' },
  { id: 'fam-11', topic: 'familie', type: 'spel', title: 'Feestdagen plannen', description: 'Verdeel de feestdagen over beide families. Lukt het zonder gedoe?' },
  { id: 'fam-12', topic: 'familie', type: 'quiz', title: 'Hoe goed ken je mijn familie?', description: 'Vragen over elkaars familieleden: namen, hobby\'s, eigenaardigheden' },
];

export function getActivitiesForTopic(topicId: string): TopicActivity[] {
  return TOPIC_ACTIVITIES.filter((a) => a.topic === topicId);
}
