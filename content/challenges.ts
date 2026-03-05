export type Challenge = {
  id: string;
  title: string;
  description: string;
  dailyAction: string;
  category: string;
  durationDays: number;
};

export const challenges: Challenge[] = [
  {
    id: 'challenge-1',
    title: 'Complimentenweek',
    description:
      'Geef je partner elke dag een oprecht compliment. Niet over uiterlijk, maar over wie ze zijn.',
    dailyAction: 'Geef een specifiek compliment over een eigenschap of actie van je partner.',
    category: 'waardering',
    durationDays: 7,
  },
  {
    id: 'challenge-2',
    title: 'Schermvrije avonden',
    description:
      'Leg elke avond na het eten alle schermen weg en besteed aandacht aan elkaar.',
    dailyAction: 'Telefoons en tablets gaan minimaal een uur op vliegtuigmodus na het eten.',
    category: 'quality time',
    durationDays: 7,
  },
  {
    id: 'challenge-3',
    title: 'Dankbaarheid delen',
    description:
      'Vertel je partner elke dag een ding waar je dankbaar voor bent in jullie relatie.',
    dailyAction: 'Deel voor het slapengaan een moment of eigenschap waar je dankbaar voor bent.',
    category: 'waardering',
    durationDays: 7,
  },
  {
    id: 'challenge-4',
    title: 'Kleine gebaren',
    description:
      'Doe elke dag iets kleins voor je partner zonder dat ze erom vragen.',
    dailyAction: 'Doe een klein gebaar: koffie klaarzetten, een briefje schrijven, de afwas doen.',
    category: 'zorgzaamheid',
    durationDays: 7,
  },
  {
    id: 'challenge-5',
    title: 'Herinneringen ophalen',
    description:
      'Deel elke dag een fijne herinnering aan jullie samen. Van het begin tot nu.',
    dailyAction: 'Vertel een herinnering aan een mooi moment samen en waarom die je is bijgebleven.',
    category: 'verbinding',
    durationDays: 7,
  },
  {
    id: 'challenge-6',
    title: 'Luisterweek',
    description:
      'Oefen actief luisteren. Laat je partner uitpraten en vat samen wat je hoort.',
    dailyAction:
      'Als je partner iets vertelt, luister zonder te onderbreken en herhaal wat je hebt gehoord.',
    category: 'communicatie',
    durationDays: 7,
  },
  {
    id: 'challenge-7',
    title: 'Samen bewegen',
    description:
      'Doe elke dag samen iets actiefs, al is het maar een korte wandeling.',
    dailyAction: 'Beweeg minimaal 15 minuten samen: wandelen, fietsen, dansen of stretchen.',
    category: 'gezondheid',
    durationDays: 7,
  },
  {
    id: 'challenge-8',
    title: 'Nieuwe dingen proberen',
    description:
      'Probeer elke dag iets nieuws samen, hoe klein ook.',
    dailyAction:
      'Doe iets wat jullie nog niet eerder samen hebben gedaan: een nieuw recept, een ander park, een ander muziekgenre.',
    category: 'avontuur',
    durationDays: 7,
  },
  {
    id: 'challenge-9',
    title: 'Knuffelchallenge',
    description:
      'Knuffel je partner elke dag minimaal 20 seconden. Langer knuffelen verlaagt stress.',
    dailyAction: 'Neem een moment voor een knuffel van minimaal 20 seconden. Sta stil en voel het.',
    category: 'intimiteit',
    durationDays: 7,
  },
  {
    id: 'challenge-10',
    title: 'Dromen en wensen',
    description:
      'Deel elke dag een droom of wens voor de toekomst met je partner.',
    dailyAction: 'Vertel over een droom, wens of doel dat je hebt - groot of klein.',
    category: 'toekomst',
    durationDays: 7,
  },
  {
    id: 'challenge-11',
    title: 'Liefdesbrieven',
    description:
      'Schrijf elke dag een kort briefje of berichtje voor je partner.',
    dailyAction: 'Schrijf een kort bericht: in een lunchbox, op de spiegel, of als appje.',
    category: 'waardering',
    durationDays: 7,
  },
  {
    id: 'challenge-12',
    title: 'Loslaten',
    description:
      'Laat elke dag bewust een kleine ergernis los. Kies je gevechten.',
    dailyAction: 'Merk een ergernis op, benoem het voor jezelf en laat het bewust los.',
    category: 'communicatie',
    durationDays: 7,
  },
  {
    id: 'challenge-13',
    title: 'Samen koken',
    description:
      'Kook elke dag samen. Verdeel de taken en maak er een gezamenlijk moment van.',
    dailyAction: 'Kook de maaltijd samen in plaats van alleen. Praat tijdens het koken.',
    category: 'samenwerking',
    durationDays: 7,
  },
  {
    id: 'challenge-14',
    title: 'Oogcontact',
    description:
      'Neem elke dag een moment om elkaar echt aan te kijken zonder te praten.',
    dailyAction: 'Ga tegenover elkaar zitten en kijk elkaar twee minuten in de ogen.',
    category: 'intimiteit',
    durationDays: 7,
  },
  {
    id: 'challenge-15',
    title: 'Vragen stellen',
    description:
      'Stel je partner elke dag een vraag die verder gaat dan "hoe was je dag?".',
    dailyAction:
      'Stel een diepere vraag: "Waar maak je je zorgen over?" of "Wat maakt je op dit moment gelukkig?"',
    category: 'communicatie',
    durationDays: 7,
  },
  {
    id: 'challenge-16',
    title: 'Samen opruimen',
    description:
      'Ruim elke dag samen 15 minuten op. Een opgeruimd huis geeft rust in je hoofd.',
    dailyAction: 'Zet samen een timer van 15 minuten en ruim een deel van het huis op.',
    category: 'samenwerking',
    durationDays: 7,
  },
  {
    id: 'challenge-17',
    title: 'Surprise-week',
    description:
      'Verras je partner elke dag met iets onverwachts. Het hoeft niet groot te zijn.',
    dailyAction:
      'Bedenk een kleine verrassing: favoriete snack meenemen, een lied opzetten, een wandeling voorstellen.',
    category: 'zorgzaamheid',
    durationDays: 7,
  },
  {
    id: 'challenge-18',
    title: 'Grenzen respecteren',
    description:
      'Praat elke dag over een grens of behoefte en respecteer die van de ander.',
    dailyAction:
      'Deel een behoefte of grens en vraag je partner naar die van hen. Luister zonder oordeel.',
    category: 'communicatie',
    durationDays: 7,
  },
  {
    id: 'challenge-19',
    title: 'Lachen',
    description:
      'Zorg elke dag voor een moment waarop jullie samen lachen.',
    dailyAction:
      'Deel een grappig verhaal, kijk samen een comedyshow of haal een gekke herinnering op.',
    category: 'plezier',
    durationDays: 7,
  },
  {
    id: 'challenge-20',
    title: 'Ochtend- en avondritueel',
    description:
      'Maak een vast ritueel voor de ochtend en avond samen.',
    dailyAction:
      'Begin de dag met een kus en een "goedemorgen". Sluit af met een moment samen voor het slapen.',
    category: 'verbinding',
    durationDays: 7,
  },
  {
    id: 'challenge-21',
    title: 'Eerlijkheidsweek',
    description:
      'Deel elke dag iets eerlijks met je partner dat je normaal misschien voor jezelf houdt.',
    dailyAction:
      'Deel een gevoel, gedachte of mening die je normaal niet snel uitspreekt. Wees kwetsbaar.',
    category: 'vertrouwen',
    durationDays: 7,
  },
  {
    id: 'challenge-22',
    title: 'Samen buiten zijn',
    description:
      'Ga elke dag samen minstens 15 minuten naar buiten, ongeacht het weer.',
    dailyAction: 'Ga samen de deur uit voor frisse lucht: een blokje om, naar de tuin, of naar het park.',
    category: 'gezondheid',
    durationDays: 7,
  },
];
