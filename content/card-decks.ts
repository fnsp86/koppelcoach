export type DeckCard = {
  id: string;
  text: string;
  followUp?: string;
};

export type CardDeck = {
  id: string;
  title: string;
  description: string;
  color: string;
  cardCount: number;
  cards: DeckCard[];
};

export const CARD_DECKS: CardDeck[] = [
  {
    id: 'dieper-verbinden',
    title: 'Dieper Verbinden',
    description:
      'Vragen die jullie helpen om elkaar beter te leren kennen, ook na jaren samen.',
    color: '#C4704B',
    cardCount: 18,
    cards: [
      {
        id: 'dv-1',
        text: 'Wat is een herinnering aan mij die je koestert, maar waar je nooit over hebt verteld?',
        followUp: 'Waarom heb je het nooit eerder genoemd?',
      },
      {
        id: 'dv-2',
        text: 'Wanneer voelde je je de afgelopen maand het meest verbonden met mij?',
      },
      {
        id: 'dv-3',
        text: 'Wat is iets wat je bewondert aan hoe ik met tegenslagen omga?',
        followUp: 'Herken je dat ook in jezelf?',
      },
      {
        id: 'dv-4',
        text: 'Is er iets waar je mee rondloopt dat je graag zou willen delen?',
      },
      {
        id: 'dv-5',
        text: 'Wat maakt dat je je veilig voelt bij mij? En wat zou dat gevoel nog kunnen versterken?',
      },
      {
        id: 'dv-6',
        text: 'Als je een moment uit onze relatie opnieuw kon beleven, welk zou dat zijn?',
        followUp: 'Wat maakte dat moment zo bijzonder?',
      },
      {
        id: 'dv-7',
        text: 'Welk klein gebaar van mij heeft ooit veel voor je betekend?',
      },
      {
        id: 'dv-8',
        text: 'Waar maak je je op dit moment zorgen over, ook als het niets met ons te maken heeft?',
        followUp: 'Hoe kan ik je daarin steunen?',
      },
      {
        id: 'dv-9',
        text: 'Wat wist je over mij toen we net samen waren, dat nu nog steeds klopt?',
      },
      {
        id: 'dv-10',
        text: 'In welk opzicht ben ik veranderd sinds we samen zijn? En hoe vind je dat?',
      },
      {
        id: 'dv-11',
        text: 'Wat is iets wat je nodig hebt van mij, maar wat je moeilijk vindt om te vragen?',
      },
      {
        id: 'dv-12',
        text: 'Wanneer voel je je het meest jezelf in onze relatie?',
        followUp: 'Is er ook een moment dat je je minder vrij voelt?',
      },
      {
        id: 'dv-13',
        text: 'Wat zou je willen dat ik beter begreep over hoe jij liefde ervaart?',
      },
      {
        id: 'dv-14',
        text: 'Welk compliment van mij heeft het langst bijgebleven?',
      },
      {
        id: 'dv-15',
        text: 'Als onze relatie een boek was, welke titel zou het huidige hoofdstuk hebben?',
        followUp: 'En welke titel zou je het volgende hoofdstuk willen geven?',
      },
      {
        id: 'dv-16',
        text: 'Wat heb je van mij geleerd over jezelf?',
      },
      {
        id: 'dv-17',
        text: 'Is er een onderwerp waar we het nog nooit over hebben gehad, maar waar je wel nieuwsgierig naar bent?',
      },
      {
        id: 'dv-18',
        text: 'Wat maakt onze relatie anders dan wat je je vroeger had voorgesteld?',
        followUp: 'Op welke manier is het beter dan verwacht?',
      },
    ],
  },
  {
    id: 'lekker-lachen',
    title: 'Lekker Lachen',
    description:
      'Luchtige en grappige vragen die voor verbinding zorgen zonder dat het zwaar hoeft te zijn.',
    color: '#7A9E7E',
    cardCount: 17,
    cards: [
      {
        id: 'll-1',
        text: 'Als je mij moest beschrijven als een gerecht, welk gerecht zou ik zijn en waarom?',
      },
      {
        id: 'll-2',
        text: 'Wat is het genantste dat ik ooit heb gedaan waar jij bij was?',
        followUp: 'En wat is het genantste dat jij hebt gedaan?',
      },
      {
        id: 'll-3',
        text: 'Als wij samen een bedrijf zouden starten, wat voor bedrijf zou dat zijn?',
      },
      {
        id: 'll-4',
        text: 'Welke irritante gewoonte van mij zou je missen als ik die plotseling niet meer had?',
      },
      {
        id: 'll-5',
        text: 'Als je mijn zoekgeschiedenis kon zien, wat verwacht je dan te vinden?',
        followUp: 'Hoe dicht zit je bij de waarheid?',
      },
      {
        id: 'll-6',
        text: 'Als wij samen in een realityshow zaten, hoe zou die heten?',
      },
      {
        id: 'll-7',
        text: 'Welk dier lijkt het meest op mij als ik net wakker ben?',
      },
      {
        id: 'll-8',
        text: 'Als je voor een dag in mijn lichaam zou zitten, wat zou je als eerste doen?',
      },
      {
        id: 'll-9',
        text: 'Wat is de slechtste date-outfit die ik ooit heb gedragen?',
        followUp: 'En de beste?',
      },
      {
        id: 'll-10',
        text: 'Als je een wet kon invoeren die alleen voor ons huishouden geldt, wat zou het zijn?',
      },
      {
        id: 'll-11',
        text: 'Welk liedje beschrijft onze relatie het beste? Zing het refrein.',
      },
      {
        id: 'll-12',
        text: 'Als ik een superheld was, wat zou mijn kracht zijn? En mijn zwakke plek?',
      },
      {
        id: 'll-13',
        text: 'Wat is het raarste cadeau dat je ooit hebt gekregen of gegeven?',
      },
      {
        id: 'll-14',
        text: 'Als buitenaardse wezens onze relatie zouden observeren, wat zouden ze het vreemdst vinden?',
      },
      {
        id: 'll-15',
        text: 'Welke filmrol zou je aan mij geven? En welke aan jezelf?',
      },
      {
        id: 'll-16',
        text: 'Als we op een onbewoond eiland strandden, wie van ons zou het langst overleven en waarom?',
        followUp: 'Wat zou de ander als eerste verkeerd doen?',
      },
      {
        id: 'll-17',
        text: 'Wat is het kinderachtigste dat we samen hebben gedaan, waar je achteraf blij mee bent?',
      },
    ],
  },
  {
    id: 'dromen-wensen',
    title: 'Dromen & Wensen',
    description:
      'Verken samen jullie dromen, wensen en verlangens. Van groot tot klein.',
    color: '#D4A843',
    cardCount: 16,
    cards: [
      {
        id: 'dw-1',
        text: 'Als geld geen rol speelde, hoe zou een doordeweekse dag er voor jou uitzien?',
        followUp: 'Welk onderdeel daarvan kunnen we nu al realiseren?',
      },
      {
        id: 'dw-2',
        text: 'Welke vaardigheid zou je willen leren en waarom?',
      },
      {
        id: 'dw-3',
        text: 'Als je een jaar vrij kon nemen, wat zou je met die tijd doen?',
        followUp: 'Zou je dat alleen willen doen of samen?',
      },
      {
        id: 'dw-4',
        text: 'Waar zou je over vijf jaar willen wonen? Beschrijf het huis, de omgeving, het leven.',
      },
      {
        id: 'dw-5',
        text: 'Wat is een droom die je als kind had en waar je stiekem nog steeds aan denkt?',
      },
      {
        id: 'dw-6',
        text: 'Welke reis staat al lang op je verlanglijst?',
        followUp: 'Wat houdt ons tegen om die te plannen?',
      },
      {
        id: 'dw-7',
        text: 'Wat wil je bereikt hebben als je 80 bent?',
      },
      {
        id: 'dw-8',
        text: 'Als je een heel andere carriere kon kiezen zonder risico, wat zou je doen?',
      },
      {
        id: 'dw-9',
        text: 'Welke traditie zouden we samen willen beginnen?',
        followUp: 'Kunnen we daar volgende week al mee starten?',
      },
      {
        id: 'dw-10',
        text: 'Wat is een klein ding dat je leven een stuk fijner zou maken?',
      },
      {
        id: 'dw-11',
        text: 'Als je een boek, film of serie kon maken over wat dan ook, waarover zou het gaan?',
      },
      {
        id: 'dw-12',
        text: 'Wat zou je willen dat mensen over tien jaar over jou zeggen?',
      },
      {
        id: 'dw-13',
        text: 'Is er iets wat je al lang wilt proberen, maar steeds uitstelt?',
        followUp: 'Wat zou een eerste kleine stap zijn?',
      },
      {
        id: 'dw-14',
        text: 'Hoe ziet jouw ideale vrije dag eruit, van begin tot eind?',
      },
      {
        id: 'dw-15',
        text: 'Als je een maatschappelijk probleem kon oplossen, welk zou je kiezen?',
      },
      {
        id: 'dw-16',
        text: 'Welke ervaring zou je minstens een keer in je leven willen hebben?',
        followUp: 'Zullen we het op de planning zetten?',
      },
    ],
  },
  {
    id: 'grenzen-behoeften',
    title: 'Grenzen & Behoeften',
    description:
      'Leer elkaars grenzen en behoeften beter kennen, zodat jullie daar rekening mee kunnen houden.',
    color: '#5B8FA8',
    cardCount: 16,
    cards: [
      {
        id: 'gb-1',
        text: 'Hoeveel alleen-tijd heb je nodig om je goed te voelen? Krijg je dat op dit moment genoeg?',
      },
      {
        id: 'gb-2',
        text: 'Hoe merk je aan jezelf dat je een grens bereikt? Wat zijn jouw signalen?',
        followUp: 'Hoe kan ik die signalen beter herkennen?',
      },
      {
        id: 'gb-3',
        text: 'Is er iets waar je "ja" op zegt terwijl je eigenlijk "nee" bedoelt? Waarom is dat moeilijk?',
      },
      {
        id: 'gb-4',
        text: 'Wat heb je nodig na een drukke werkdag om bij te komen?',
        followUp: 'Hoe kan ik je daarbij helpen?',
      },
      {
        id: 'gb-5',
        text: 'Hoe ga je het liefst om met stress? Wil je erover praten, afleiding, of rust?',
      },
      {
        id: 'gb-6',
        text: 'Op welk vlak voel je je soms niet gehoord in onze relatie?',
      },
      {
        id: 'gb-7',
        text: 'Wat is voor jou een klein gebaar dat laat zien dat ik aan je denk?',
      },
      {
        id: 'gb-8',
        text: 'Zijn er taken in huis waarvan je vindt dat de verdeling niet eerlijk is?',
        followUp: 'Hoe zouden we dat anders kunnen doen?',
      },
      {
        id: 'gb-9',
        text: 'Hoe wil je het liefst steun krijgen als je verdrietig bent? Vastgehouden worden, praten, of met rust gelaten worden?',
      },
      {
        id: 'gb-10',
        text: 'Is er iets in onze dagelijkse routine dat je energie kost in plaats van geeft?',
      },
      {
        id: 'gb-11',
        text: 'Welke behoefte van jou is de afgelopen tijd ondergesneeuwd?',
        followUp: 'Wat zou een eerste stap zijn om daar verandering in te brengen?',
      },
      {
        id: 'gb-12',
        text: 'Hoe vind je het als ik ongevraagd advies geef? Wil je dat soms liever niet?',
      },
      {
        id: 'gb-13',
        text: 'Wat heb je nodig om je gewaardeerd te voelen in onze relatie?',
      },
      {
        id: 'gb-14',
        text: 'Is er een situatie waarin je je ongemakkelijk voelt, maar waar je nog niet over hebt gesproken?',
      },
      {
        id: 'gb-15',
        text: 'Hoe belangrijk is fysiek contact voor jou door de dag heen? Krijg je daar genoeg van?',
      },
      {
        id: 'gb-16',
        text: 'Wat is een manier waarop ik beter voor je kan zorgen zonder dat je erom hoeft te vragen?',
        followUp: 'En andersom: wat kan ik beter aan jou overlaten?',
      },
    ],
  },
  {
    id: 'herinneren-waarderen',
    title: 'Herinneren & Waarderen',
    description:
      'Haal mooie herinneringen op en spreek uit wat je aan elkaar waardeert.',
    color: '#D4728C',
    cardCount: 17,
    cards: [
      {
        id: 'hw-1',
        text: 'Wat is het eerste dat je opviel toen je mij leerde kennen?',
        followUp: 'Is dat nog steeds iets wat je aan mij waardeert?',
      },
      {
        id: 'hw-2',
        text: 'Welk moment in onze relatie maakte je het meest trots op ons?',
      },
      {
        id: 'hw-3',
        text: 'Beschrijf een gewone dag met mij die je bijzonder vond, zonder dat er iets speciaals gebeurde.',
      },
      {
        id: 'hw-4',
        text: 'Wat is iets wat ik doe voor anderen dat je mooi vindt om te zien?',
      },
      {
        id: 'hw-5',
        text: 'Wat is het mooiste dat we samen hebben meegemaakt het afgelopen jaar?',
      },
      {
        id: 'hw-6',
        text: 'Welke eigenschap van mij zou je aan iedereen willen vertellen?',
      },
      {
        id: 'hw-7',
        text: 'Wanneer heb je voor het eerst gedacht: met deze persoon wil ik verder?',
        followUp: 'Wat was de aanleiding?',
      },
      {
        id: 'hw-8',
        text: 'Wat is een moeilijke periode die we samen hebben doorstaan? Wat heeft dat ons geleerd?',
      },
      {
        id: 'hw-9',
        text: 'Noem drie dingen die je vandaag aan mij waardeert.',
      },
      {
        id: 'hw-10',
        text: 'Wat is de grappigste herinnering die je aan ons hebt?',
      },
      {
        id: 'hw-11',
        text: 'Welke vakantie of uitje samen was jouw favoriet?',
        followUp: 'Wat maakte het zo bijzonder?',
      },
      {
        id: 'hw-12',
        text: 'Is er een keer geweest dat ik je verraste met iets kleins, maar dat veel voor je betekende?',
      },
      {
        id: 'hw-13',
        text: 'Op welke manier zijn we gegroeid als koppel sinds het begin?',
      },
      {
        id: 'hw-14',
        text: 'Wat is een gewoonte van mij die je stiekem heel lief vindt?',
      },
      {
        id: 'hw-15',
        text: 'Welk advies zou je ons van vijf jaar geleden willen geven?',
      },
      {
        id: 'hw-16',
        text: 'Wat waardeer je aan hoe wij als team functioneren?',
        followUp: 'Waarin vullen we elkaar het beste aan?',
      },
      {
        id: 'hw-17',
        text: 'Als je een foto kon maken van een gevoel dat je bij mij hebt, welk gevoel zou je kiezen?',
      },
    ],
  },
  {
    id: 'toekomst-samen',
    title: 'Toekomst Samen',
    description:
      'Praat over jullie gezamenlijke toekomst. Groot en klein, concreet en abstract.',
    color: '#8B7EC8',
    cardCount: 16,
    cards: [
      {
        id: 'ts-1',
        text: 'Hoe ziet een perfecte zondag eruit als we over tien jaar vooruitkijken?',
      },
      {
        id: 'ts-2',
        text: 'Welke gezamenlijke doelen zouden we dit jaar kunnen stellen?',
        followUp: 'Wat is een eerste concrete stap?',
      },
      {
        id: 'ts-3',
        text: 'Hoe willen we omgaan met grote beslissingen in de toekomst?',
      },
      {
        id: 'ts-4',
        text: 'Wat voor soort oud stel willen we worden?',
        followUp: 'Wat moeten we nu al doen om dat te worden?',
      },
      {
        id: 'ts-5',
        text: 'Is er iets dat je wilt veranderen aan hoe we onze tijd samen besteden?',
      },
      {
        id: 'ts-6',
        text: 'Hoe kijken we aan tegen de rol van familie en vrienden in ons leven?',
      },
      {
        id: 'ts-7',
        text: 'Welk avontuur willen we samen nog beleven?',
        followUp: 'Wat houdt ons tegen?',
      },
      {
        id: 'ts-8',
        text: 'Hoe willen we omgaan met geld op de lange termijn? Sparen, investeren, uitgeven?',
      },
      {
        id: 'ts-9',
        text: 'Waar willen we over een jaar staan als koppel?',
      },
      {
        id: 'ts-10',
        text: 'Hoe houden we onze relatie fris als de sleur toeslaat?',
        followUp: 'Wat werkt daar nu al goed voor?',
      },
      {
        id: 'ts-11',
        text: 'Welke waarden willen we centraal zetten in ons leven samen?',
      },
      {
        id: 'ts-12',
        text: 'Als we samen iets zouden opbouwen - een project, een plek, een traditie - wat zou het zijn?',
      },
      {
        id: 'ts-13',
        text: 'Hoe gaan we om met periodes waarin een van ons het moeilijk heeft?',
        followUp: 'Zijn er afspraken die we daarover kunnen maken?',
      },
      {
        id: 'ts-14',
        text: 'Wat willen we vaker samen doen dan we nu doen?',
      },
      {
        id: 'ts-15',
        text: 'Hoe zorgen we ervoor dat we allebei blijven groeien, als individu en als koppel?',
      },
      {
        id: 'ts-16',
        text: 'Als je een brief kon schrijven aan ons toekomstige zelf over vijf jaar, wat zou erin staan?',
        followUp: 'Zullen we dat echt doen en de brief bewaren?',
      },
    ],
  },
  {
    id: 'ouderschap-gezin',
    title: 'Ouderschap & Gezin',
    description:
      'Gesprekken over opvoeding, rolverdeling en het gezinsleven dat jullie samen vormgeven.',
    color: '#E8927C',
    cardCount: 16,
    cards: [
      {
        id: 'og-1',
        text: 'Welke waarde uit je eigen opvoeding wil je absoluut meegeven aan onze kinderen?',
        followUp: 'En welke zou je juist anders willen doen?',
      },
      {
        id: 'og-2',
        text: 'Hoe vind je dat we de taken rondom de kinderen verdelen? Voelt het eerlijk?',
      },
      {
        id: 'og-3',
        text: 'Wanneer was je het laatst echt trots op hoe wij samen als ouders iets oplosten?',
      },
      {
        id: 'og-4',
        text: 'Wat vind je het moeilijkst aan het combineren van ouder zijn en partner zijn?',
        followUp: 'Hoe kunnen we daar samen beter mee omgaan?',
      },
      {
        id: 'og-5',
        text: 'Welk moment met de kinderen gaf je onlangs een warm gevoel?',
      },
      {
        id: 'og-6',
        text: 'Zijn er dingen waarover we als ouders verschillend denken? Hoe gaan we daarmee om?',
      },
      {
        id: 'og-7',
        text: 'Wat is een gezinstraditie die je graag zou willen beginnen of behouden?',
        followUp: 'Hoe maken we daar ruimte voor?',
      },
      {
        id: 'og-8',
        text: 'Hoe zorgen we ervoor dat we genoeg quality time hebben als gezin, los van de dagelijkse drukte?',
      },
      {
        id: 'og-9',
        text: 'Waarin bewonder je de ander als ouder?',
      },
      {
        id: 'og-10',
        text: 'Hoe gaan we om met schermtijd, bedtijden en regels? Zitten we op een lijn?',
        followUp: 'Waar zouden we betere afspraken over kunnen maken?',
      },
      {
        id: 'og-11',
        text: 'Wat doe je het liefst samen met de kinderen?',
      },
      {
        id: 'og-12',
        text: 'Voel je je weleens alleen staan in het ouderschap? Wanneer is dat het sterkst?',
      },
      {
        id: 'og-13',
        text: 'Hoe houden we onze relatie levendig terwijl het gezinsleven zo druk is?',
        followUp: 'Wat zouden we deze week al anders kunnen doen?',
      },
      {
        id: 'og-14',
        text: 'Welk soort gesprekken wil je dat onze kinderen later over hun jeugd voeren?',
      },
      {
        id: 'og-15',
        text: 'Hoe betrekken we allebei onze eigen ouders en schoonfamilie bij de opvoeding?',
      },
      {
        id: 'og-16',
        text: 'Als je een ding kon veranderen aan ons dagelijks ritme als gezin, wat zou dat zijn?',
        followUp: 'Wat is een eerste stap om dat te realiseren?',
      },
    ],
  },
  {
    id: 'intimiteit-verlangen',
    title: 'Intimiteit & Verlangen',
    description:
      'Open het gesprek over nabijheid, verlangen en wat jullie fysiek en emotioneel verbindt.',
    color: '#D4728C',
    cardCount: 16,
    cards: [
      {
        id: 'iv-1',
        text: 'Wanneer voel jij je het meest aangetrokken tot mij?',
      },
      {
        id: 'iv-2',
        text: 'Wat betekent intimiteit voor jou, los van het fysieke?',
        followUp: 'Krijg je daar genoeg van in onze relatie?',
      },
      {
        id: 'iv-3',
        text: 'Is er iets wat je graag zou willen uitproberen samen, maar wat je moeilijk vindt om te zeggen?',
      },
      {
        id: 'iv-4',
        text: 'Welke aanraking of welk gebaar geeft jou het meeste gevoel van nabijheid?',
      },
      {
        id: 'iv-5',
        text: 'Hoe makkelijk vind je het om over intimiteit te praten? Wat zou dat makkelijker maken?',
      },
      {
        id: 'iv-6',
        text: 'Wanneer voel je je het meest op je gemak in je eigen lichaam?',
        followUp: 'Hoe kan ik bijdragen aan dat gevoel?',
      },
      {
        id: 'iv-7',
        text: 'Wat maakt een kus voor jou bijzonder?',
      },
      {
        id: 'iv-8',
        text: 'Hoe belangrijk is spontaniteit voor jou als het gaat om fysieke nabijheid?',
      },
      {
        id: 'iv-9',
        text: 'Is er een periode in onze relatie waarin je de intimiteit als bijzonder fijn hebt ervaren? Wat maakte dat zo?',
        followUp: 'Hoe kunnen we dat gevoel terughalen?',
      },
      {
        id: 'iv-10',
        text: 'Hoe laat je mij weten dat je behoefte hebt aan nabijheid? En hoe zou je willen dat ik dat doe?',
      },
      {
        id: 'iv-11',
        text: 'Wat is voor jou het verschil tussen seks en echt intiem zijn?',
      },
      {
        id: 'iv-12',
        text: 'Zijn er momenten waarop je je verlangen onderdrukt? Waarom?',
        followUp: 'Hoe kunnen we daar meer ruimte voor maken?',
      },
      {
        id: 'iv-13',
        text: 'Welke sfeer of omgeving brengt jou het meest in een romantische stemming?',
      },
      {
        id: 'iv-14',
        text: 'Hoe ga je om met verschil in verlangen? Is dat iets waar je over wilt praten?',
      },
      {
        id: 'iv-15',
        text: 'Wat is de mooiste manier waarop ik je het gevoel geef dat je gewenst bent?',
        followUp: 'Wat zou je daar nog aan toe willen voegen?',
      },
      {
        id: 'iv-16',
        text: 'Als je een avond helemaal voor ons tweeen kon plannen, gericht op nabijheid, hoe zou die eruitzien?',
      },
    ],
  },
  {
    id: 'geld-toekomst',
    title: 'Geld & Toekomst',
    description:
      'Bespreek samen hoe jullie omgaan met geld, prioriteiten stellen en financieel vooruitkijken.',
    color: '#B8902E',
    cardCount: 16,
    cards: [
      {
        id: 'gt-1',
        text: 'Hoe werd er thuis over geld gepraat toen je opgroeide? Welk effect heeft dat nog op je?',
      },
      {
        id: 'gt-2',
        text: 'Ben je meer een spaarder of een uitgever? Hoe botst of matcht dat met de ander?',
        followUp: 'Hoe vinden we daar een balans in?',
      },
      {
        id: 'gt-3',
        text: 'Welke grote aankoop of investering zou je de komende jaren willen doen?',
      },
      {
        id: 'gt-4',
        text: 'Is er iets waar je financieel onzeker of bang voor bent?',
        followUp: 'Hoe kunnen we dat samen aanpakken?',
      },
      {
        id: 'gt-5',
        text: 'Vind je dat we genoeg openheid hebben over geld? Of zijn er dingen waar we het vaker over moeten hebben?',
      },
      {
        id: 'gt-6',
        text: 'Aan welke uitgave heb je het minste spijt? En aan welke het meeste?',
      },
      {
        id: 'gt-7',
        text: 'Hoe zouden we het aanpakken als een van ons plotseling veel minder zou verdienen?',
      },
      {
        id: 'gt-8',
        text: 'Waar geven we als koppel geld aan uit dat ons echt gelukkig maakt?',
        followUp: 'Zijn er uitgaven die we juist kunnen schrappen?',
      },
      {
        id: 'gt-9',
        text: 'Hoe kijk je aan tegen samen budgetteren? Spreekt dat je aan of voelt het beklemmend?',
      },
      {
        id: 'gt-10',
        text: 'Wat is voor jou belangrijker: financiele zekerheid of financiele vrijheid?',
      },
      {
        id: 'gt-11',
        text: 'Hoe willen we omgaan met geld lenen aan of van familie en vrienden?',
      },
      {
        id: 'gt-12',
        text: 'Als we over twintig jaar terugkijken, welke financiele beslissing zou je nu willen nemen?',
        followUp: 'Wat houdt ons tegen om die stap te zetten?',
      },
      {
        id: 'gt-13',
        text: 'Hebben we het weleens over pensioen of later? Hoe ziet jouw ideale oude dag eruit?',
      },
      {
        id: 'gt-14',
        text: 'Hoeveel geld zou je willen uitgeven aan cadeaus, vakanties of uitjes per jaar?',
      },
      {
        id: 'gt-15',
        text: 'Vind je het belangrijk dat we alles financieel delen, of houd je graag iets apart voor jezelf?',
        followUp: 'Waar ligt voor jou de grens?',
      },
      {
        id: 'gt-16',
        text: 'Wat is het beste financiele advies dat je ooit hebt gekregen?',
      },
    ],
  },
  {
    id: 'dankbaarheid',
    title: 'Dankbaarheid',
    description:
      'Sta samen stil bij wat jullie aan elkaar hebben en spreek waardering uit voor het grote en het kleine.',
    color: '#C4704B',
    cardCount: 16,
    cards: [
      {
        id: 'dk-1',
        text: 'Waar ben je op dit moment het meest dankbaar voor in onze relatie?',
      },
      {
        id: 'dk-2',
        text: 'Welk klein gebaar van je partner uit de afgelopen week waardeer je, maar heb je niet uitgesproken?',
        followUp: 'Zeg het nu tegen hem of haar.',
      },
      {
        id: 'dk-3',
        text: 'Wat doet je partner in het dagelijks leven dat jouw leven makkelijker maakt?',
      },
      {
        id: 'dk-4',
        text: 'Welke eigenschap van je partner bewonder je het meest?',
        followUp: 'Heb je dat weleens gezegd?',
      },
      {
        id: 'dk-5',
        text: 'Wat heb je van je partner geleerd dat je leven heeft veranderd?',
      },
      {
        id: 'dk-6',
        text: 'Noem drie kleine dingen in jullie dagelijks leven waar je blij mee bent.',
      },
      {
        id: 'dk-7',
        text: 'Wanneer heeft je partner je voor het laatst positief verrast?',
      },
      {
        id: 'dk-8',
        text: 'Welk moment samen uit de afgelopen maand koester je het meest?',
        followUp: 'Waarom juist dat moment?',
      },
      {
        id: 'dk-9',
        text: 'Waar ben je dankbaar voor dat je vroeger als vanzelfsprekend beschouwde?',
      },
      {
        id: 'dk-10',
        text: 'Op welke manier maakt je partner je een beter mens?',
      },
      {
        id: 'dk-11',
        text: 'Wat waardeer je aan hoe jullie samen door moeilijke periodes komen?',
        followUp: 'Wat maakt jullie als team sterk?',
      },
      {
        id: 'dk-12',
        text: 'Welk offer heeft je partner ooit voor jou gebracht dat je nooit bent vergeten?',
      },
      {
        id: 'dk-13',
        text: 'Waar ben je dankbaar voor als je kijkt naar jullie thuissituatie?',
      },
      {
        id: 'dk-14',
        text: 'Hoe laat je partner zien dat hij of zij om je geeft, zonder woorden?',
        followUp: 'Welk van die gebaren raakt je het meest?',
      },
      {
        id: 'dk-15',
        text: 'Als je een bedankbrief aan je partner zou schrijven, wat zou de eerste zin zijn?',
      },
      {
        id: 'dk-16',
        text: 'Welk compliment zou je je partner vaker willen geven?',
      },
    ],
  },
  {
    id: 'eerste-keer',
    title: 'Eerste Keer',
    description:
      'Haal het begin van jullie relatie op. Van de eerste blik tot de eerste sleutel.',
    color: '#5B8FA8',
    cardCount: 16,
    cards: [
      {
        id: 'ek-1',
        text: 'Wat was je allereerste indruk van mij? En klopte die achteraf?',
      },
      {
        id: 'ek-2',
        text: 'Beschrijf onze eerste date. Wat herinner je je het best?',
        followUp: 'Wat weet je nog dat de ander waarschijnlijk vergeten is?',
      },
      {
        id: 'ek-3',
        text: 'Wanneer dacht je voor het eerst: hier zou iets moois uit kunnen groeien?',
      },
      {
        id: 'ek-4',
        text: 'Wat was het eerste dat je aan je vrienden vertelde over mij?',
      },
      {
        id: 'ek-5',
        text: 'Herinner je je de eerste keer dat je bij mij bleef slapen? Hoe voelde dat?',
        followUp: 'Was er iets gênants of grappigs?',
      },
      {
        id: 'ek-6',
        text: 'Wanneer zei een van ons voor het eerst "ik hou van je"? Hoe ging dat?',
      },
      {
        id: 'ek-7',
        text: 'Wat is het grappigste misverstand uit onze beginperiode?',
      },
      {
        id: 'ek-8',
        text: 'Waar gingen jullie eerste ruzie over? Hoe kijken we daar nu op terug?',
        followUp: 'Maken we daar nu nog steeds ruzie over?',
      },
      {
        id: 'ek-9',
        text: 'Wat was de eerste vakantie of het eerste uitje dat we samen maakten?',
      },
      {
        id: 'ek-10',
        text: 'Welk nummer, welke film of welke plek verbind je met het begin van onze relatie?',
      },
      {
        id: 'ek-11',
        text: 'Wanneer stelde je mij voor het eerst voor aan je familie? Hoe was dat?',
        followUp: 'Wat had je van tevoren bedacht of gevreesd?',
      },
      {
        id: 'ek-12',
        text: 'Was er een moment in het begin waarop je twijfelde? Wat gaf de doorslag?',
      },
      {
        id: 'ek-13',
        text: 'Wat droeg ik op onze eerste date? Of weet je dat niet meer?',
      },
      {
        id: 'ek-14',
        text: 'Welk appje of berichtje uit het begin zou je nog steeds kunnen terughalen uit je geheugen?',
        followUp: 'Zoek het op als je het nog hebt.',
      },
      {
        id: 'ek-15',
        text: 'Wat vond je in het begin spannend of zenuwslopend aan onze relatie?',
      },
      {
        id: 'ek-16',
        text: 'Als je ons begin zou beschrijven als een filmscene, hoe zou die eruitzien?',
      },
    ],
  },
  {
    id: 'moeilijke-gesprekken',
    title: 'Moeilijke Gesprekken',
    description:
      'Maak gevoelige onderwerpen bespreekbaar. Niet altijd makkelijk, maar wel waardevol.',
    color: '#6B7C8F',
    cardCount: 16,
    cards: [
      {
        id: 'mg-1',
        text: 'Is er iets wat je me al een tijdje wilt zeggen, maar waarvoor je het juiste moment afwacht?',
      },
      {
        id: 'mg-2',
        text: 'Wanneer voelde je je voor het laatst niet gehoord in onze relatie? Wat gebeurde er?',
        followUp: 'Wat had je op dat moment nodig?',
      },
      {
        id: 'mg-3',
        text: 'Welke onzekerheid over jezelf speelt soms mee in hoe je je gedraagt naar mij?',
      },
      {
        id: 'mg-4',
        text: 'Is er iets uit het verleden - van voor of tijdens onze relatie - waar je nog steeds mee zit?',
      },
      {
        id: 'mg-5',
        text: 'Hoe gaan we om met verschil van mening? Vind je dat we dat goed doen?',
        followUp: 'Wat zou je willen dat we anders doen bij een meningsverschil?',
      },
      {
        id: 'mg-6',
        text: 'Heb je weleens het gevoel dat je jezelf kleiner maakt om een conflict te vermijden?',
      },
      {
        id: 'mg-7',
        text: 'Wat is het moeilijkste dat je ooit tegen mij hebt gezegd? En hoe voelde dat?',
      },
      {
        id: 'mg-8',
        text: 'Is er een teleurstelling in onze relatie die je nog niet hebt verwerkt?',
        followUp: 'Wat zou je nodig hebben om dat los te laten?',
      },
      {
        id: 'mg-9',
        text: 'Wanneer voel je je kwetsbaar bij mij? En is dat een fijn of een ongemakkelijk gevoel?',
      },
      {
        id: 'mg-10',
        text: 'Zijn er patronen in onze ruzies die je herkent? Wat zit daar volgens jou onder?',
        followUp: 'Hoe zouden we die patronen kunnen doorbreken?',
      },
      {
        id: 'mg-11',
        text: 'Is er iets waar je bang voor bent als het gaat om onze toekomst samen?',
      },
      {
        id: 'mg-12',
        text: 'Hoe makkelijk vind je het om sorry te zeggen? En hoe is het om sorry te ontvangen?',
      },
      {
        id: 'mg-13',
        text: 'Zijn er verwachtingen die je van mij hebt waar we het nooit expliciet over hebben gehad?',
        followUp: 'Waarom is het moeilijk om die uit te spreken?',
      },
      {
        id: 'mg-14',
        text: 'Wanneer voel je je het meest alleen, ook al ben ik erbij?',
      },
      {
        id: 'mg-15',
        text: 'Is er iets wat je mij wilt vergeven, maar waar je moeite mee hebt?',
      },
      {
        id: 'mg-16',
        text: 'Wat is de belangrijkste les die een moeilijk moment ons als koppel heeft geleerd?',
        followUp: 'Hoe zorgen we ervoor dat we die les niet vergeten?',
      },
    ],
  },
];
