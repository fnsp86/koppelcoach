export type TipCategory =
  | 'communicatie'
  | 'intimiteit'
  | 'conflict'
  | 'dagelijks'
  | 'groei'
  | 'plezier';

export type RelationshipTip = {
  id: string;
  title: string;
  content: string;
  category: TipCategory;
  actionable: string;
};

export const CATEGORY_LABELS: Record<TipCategory, string> = {
  communicatie: 'Communicatie',
  intimiteit: 'Intimiteit',
  conflict: 'Conflict',
  dagelijks: 'Dagelijks',
  groei: 'Groei',
  plezier: 'Plezier',
};

export const RELATIONSHIP_TIPS: RelationshipTip[] = [
  // === COMMUNICATIE ===
  {
    id: 'tip-1',
    title: 'Luister om te begrijpen, niet om te antwoorden',
    content:
      'Vaak zijn we al bezig met een reactie voordat de ander is uitgepraat. Probeer echt te luisteren zonder in je hoofd alvast een antwoord te formuleren. Herhaal in je eigen woorden wat je hebt gehoord.',
    category: 'communicatie',
    actionable:
      'Stel vanavond een open vraag en luister het volledige antwoord af zonder te onderbreken.',
  },
  {
    id: 'tip-2',
    title: 'Begin met "ik" in plaats van "jij"',
    content:
      'Zinnen die beginnen met "jij doet altijd..." voelen als een aanval. Draai het om: "ik merk dat ik me... voel als..." maakt hetzelfde punt, maar zonder dat de ander in de verdediging schiet.',
    category: 'communicatie',
    actionable:
      'Oefen vandaag met het omzetten van een "jij"-zin naar een "ik voel me"-zin.',
  },
  {
    id: 'tip-3',
    title: 'Check in bij elkaar',
    content:
      'Een simpel "hoe gaat het echt met je?" kan veel betekenen. Neem even de tijd om oprecht naar elkaars dag te vragen, zonder afleiding. Je hoeft niet te wachten tot er iets aan de hand is.',
    category: 'communicatie',
    actionable:
      'Vraag vanavond hoe de dag echt was, leg je telefoon weg en luister.',
  },
  {
    id: 'tip-4',
    title: 'Zeg wat je nodig hebt',
    content:
      'Je partner kan niet gedachten lezen. In plaats van te hopen dat de ander het begrijpt, spreek duidelijk uit wat je nodig hebt. Dat is geen zwakte, maar kracht.',
    category: 'communicatie',
    actionable:
      'Benoem vandaag een concrete behoefte aan je partner.',
  },
  {
    id: 'tip-5',
    title: 'Stel open vragen',
    content:
      'Ja/nee-vragen sluiten een gesprek af. Open vragen nodigen uit om meer te delen. In plaats van "Was het leuk?" kun je vragen "Wat was het leukste aan vandaag?" Het verschil is klein, maar het effect is groot.',
    category: 'communicatie',
    actionable:
      'Stel vandaag minstens twee open vragen aan je partner over iets wat hem of haar bezighoudt.',
  },
  {
    id: 'tip-6',
    title: 'Leg je telefoon weg als je partner praat',
    content:
      'Gedeelde aandacht is een van de simpelste vormen van respect. Je hoeft niet uren te praten, maar als je partner iets deelt, leg dan even je telefoon weg en maak oogcontact.',
    category: 'communicatie',
    actionable:
      'Maak er vanavond een gewoonte van om tijdens het eten alle telefoons in een andere kamer te leggen.',
  },

  // === INTIMITEIT ===
  {
    id: 'tip-7',
    title: 'Raak elkaar vaker aan',
    content:
      'Aanraking hoeft niet altijd seksueel te zijn. Een hand op een schouder, even door het haar strijken of naast elkaar op de bank met je benen tegen elkaar. Kleine aanrakingen door de dag heen houden de fysieke verbinding levend.',
    category: 'intimiteit',
    actionable:
      'Raak je partner vandaag bewust drie keer liefdevol aan op een onverwacht moment.',
  },
  {
    id: 'tip-8',
    title: 'Maak oogcontact',
    content:
      'In het dagelijks leven kijken we vaak langs elkaar heen. Neem bewust even de tijd om je partner echt aan te kijken als jullie praten. Het verdiept de verbinding meer dan je zou verwachten.',
    category: 'intimiteit',
    actionable:
      'Kijk je partner vandaag bij het praten bewust in de ogen.',
  },
  {
    id: 'tip-9',
    title: 'Praat over wat je fijn vindt',
    content:
      'Wensen en voorkeuren veranderen met de tijd. Regelmatig het gesprek aangaan over wat jullie fijn vinden houdt de intimiteit fris en eerlijk. Het hoeft geen groot gesprek te zijn.',
    category: 'intimiteit',
    actionable:
      'Deel vandaag iets specifieks wat je de laatste tijd fijn vond, hoe klein ook.',
  },
  {
    id: 'tip-10',
    title: 'Hou de spanning erin met kleine gebaren',
    content:
      'Een onverwachte kus in de keuken, een briefje in een jaszak, of even achter je partner gaan staan en je armen om hem of haar heen slaan. Het zijn de onverwachte momenten die de spanning levend houden.',
    category: 'intimiteit',
    actionable:
      'Verras je partner vandaag met een onverwacht lief gebaar op een willekeurig moment.',
  },
  {
    id: 'tip-11',
    title: 'Plan bewust quality time',
    content:
      'Intimiteit begint met samen tijd doorbrengen zonder afleiding. Als jullie agenda vol zit, plan dan bewust momenten in. Het klinkt misschien niet spontaan, maar het werkt beter dan hopen dat het vanzelf komt.',
    category: 'intimiteit',
    actionable:
      'Plan deze week een avond waarop jullie samen iets doen zonder schermen.',
  },

  // === CONFLICT ===
  {
    id: 'tip-12',
    title: 'Neem een pauze als het escaleert',
    content:
      'Als emoties hoog oplopen, zeg je dingen die je niet meent. Spreek af dat jullie een pauze mogen nemen en later terugkomen op het gesprek. Gebruik die tijd om af te koelen, niet om argumenten te verzamelen.',
    category: 'conflict',
    actionable:
      'Spreek samen een pauze-signaal af dat jullie kunnen gebruiken bij spanning.',
  },
  {
    id: 'tip-13',
    title: 'Het gaat niet om winnen',
    content:
      'In een relatie is er geen winnaar of verliezer. Als de een wint en de ander verliest, verliezen jullie allebei. Zoek samen naar een oplossing die voor allebei werkt.',
    category: 'conflict',
    actionable:
      'Zeg bij het volgende meningsverschil hardop: "Hoe lossen we dit samen op?"',
  },
  {
    id: 'tip-14',
    title: 'Laat oude ruzies los',
    content:
      'Oude conflicten oprakelen in een nieuwe discussie helpt niemand. Als iets is uitgepraat, laat het dan ook echt los. Komt het toch steeds terug, dan is het misschien niet echt afgesloten.',
    category: 'conflict',
    actionable:
      'Denk na over een oud conflict dat je soms nog oprakelt. Bespreek rustig met je partner of het echt is afgesloten.',
  },
  {
    id: 'tip-15',
    title: 'Erken het gevoel, ook als je het oneens bent',
    content:
      'Je hoeft het niet eens te zijn om iemands gevoel serieus te nemen. "Ik snap dat je je zo voelt" is geen toegeven, het is laten zien dat je om de ander geeft. Erkenning is vaak al de helft van de oplossing.',
    category: 'conflict',
    actionable:
      'Oefen vandaag met het erkennen van een gevoel van je partner zonder er meteen een oordeel of oplossing aan te koppelen.',
  },
  {
    id: 'tip-16',
    title: 'Kom terug op een ruzie',
    content:
      'Na een conflict is het belangrijk om er rustig op terug te komen. Niet om gelijk te halen, maar om te begrijpen wat er werkelijk speelde. Vraag: wat had jij nodig op dat moment?',
    category: 'conflict',
    actionable:
      'Bespreek een eerder meningsverschil met de vraag: wat had jij eigenlijk nodig?',
  },

  // === DAGELIJKS ===
  {
    id: 'tip-17',
    title: 'Kleine gebaren, grote impact',
    content:
      'Een kopje thee zonder dat erom gevraagd wordt, de auto alvast warmdraaien, een briefje in een tas. Kleine gebaren laten zien dat je aan de ander denkt en kosten bijna geen moeite.',
    category: 'dagelijks',
    actionable:
      'Doe vandaag iets kleins voor je partner zonder dat erom gevraagd wordt.',
  },
  {
    id: 'tip-18',
    title: 'Bewuste overgangsmomenten',
    content:
      'Het moment dat je thuiskomt is belangrijk. Neem even de tijd om je partner te begroeten, in plaats van meteen door te lopen naar je eigen bezigheden. Die eerste minuut zet de toon.',
    category: 'dagelijks',
    actionable:
      'Begroet je partner vandaag bewust als een van jullie thuiskomt. Pauzeer even, kijk aan, en zeg gedag.',
  },
  {
    id: 'tip-19',
    title: 'Eet samen, zonder schermen',
    content:
      'Een gezamenlijke maaltijd is een van de oudste manieren om te verbinden. Probeer minstens een paar keer per week samen te eten zonder televisie, telefoons of andere afleiding.',
    category: 'dagelijks',
    actionable:
      'Plan vanavond een maaltijd samen zonder schermen. Vraag naar het hoogtepunt en het moeilijkste moment van de dag.',
  },
  {
    id: 'tip-20',
    title: 'Zeg vaker dankjewel',
    content:
      'Het is makkelijk om dagelijkse dingen vanzelfsprekend te vinden. Boodschappen doen, koken, de was opvouwen. Door af en toe hardop te zeggen dat je het waardeert, voelt de ander zich gezien.',
    category: 'dagelijks',
    actionable:
      'Bedank je partner vandaag voor iets wat normaal gesproken onopgemerkt blijft.',
  },
  {
    id: 'tip-21',
    title: 'Geef een compliment bij het weggaan',
    content:
      'Begin de dag met iets positiefs. Een compliment, een lief woord, of simpelweg "Fijn dat je er bent." Het zet de toon voor de hele dag en zorgt dat je partner met een goed gevoel de deur uit gaat.',
    category: 'dagelijks',
    actionable:
      'Geef je partner morgenochtend een specifiek compliment voordat jullie uit elkaar gaan.',
  },
  {
    id: 'tip-22',
    title: 'Maak een ochtend- of avondritueel',
    content:
      'Een kort dagelijks ritueel geeft structuur aan jullie verbinding. Samen koffie drinken, even op de bank bijpraten, of een vaste manier van welterusten zeggen. Het hoeft maar vijf minuten te duren.',
    category: 'dagelijks',
    actionable:
      'Kies een moment van de dag en maak er een vast ritueel van. Begin vandaag.',
  },

  // === GROEI ===
  {
    id: 'tip-23',
    title: 'Groei samen, maar ook apart',
    content:
      'Een sterke relatie bestaat uit twee individuen die ook los van elkaar groeien. Steun elkaars persoonlijke ontwikkeling en deel wat je leert. Twee sterke individuen maken een sterk koppel.',
    category: 'groei',
    actionable:
      'Vraag je partner waar hij of zij zich op dit moment in wil ontwikkelen.',
  },
  {
    id: 'tip-24',
    title: 'Leer van je conflicten',
    content:
      'Elk conflict bevat informatie over wat jullie nodig hebben. In plaats van conflicten alleen te vermijden of te doorstaan, gebruik ze als groeikansen. Wat zegt het over jullie behoeften?',
    category: 'groei',
    actionable:
      'Bedenk wat het laatste conflict je heeft geleerd over jezelf.',
  },
  {
    id: 'tip-25',
    title: 'Vier jullie vooruitgang',
    content:
      'We zijn vaak zo bezig met wat er beter kan dat we vergeten stil te staan bij wat er al goed gaat. Neem de tijd om kleine successen te vieren. Een goed gesprek gehad? Erken dat.',
    category: 'groei',
    actionable:
      'Benoem vandaag iets waarin jullie als koppel zijn gegroeid, hoe klein ook.',
  },
  {
    id: 'tip-26',
    title: 'Wees nieuwsgierig naar je partner',
    content:
      'Mensen veranderen voortdurend. Ga er niet vanuit dat je alles al weet over je partner. Blijf vragen stellen en ontdekken. Na jaren samen is er altijd nog iets nieuws te leren.',
    category: 'groei',
    actionable:
      'Stel je partner een vraag die je nog nooit eerder hebt gesteld.',
  },
  {
    id: 'tip-27',
    title: 'Evalueer jullie relatie regelmatig',
    content:
      'Je hoeft niet te wachten tot er problemen zijn. Plan af en toe een gesprek over hoe het gaat met jullie. Wat loopt goed? Wat kan beter? Niet als kritiek, maar als onderhoud.',
    category: 'groei',
    actionable:
      'Plan dit weekend een moment om samen te bespreken: wat gaat goed en wat willen we verbeteren?',
  },

  // === PLEZIER ===
  {
    id: 'tip-28',
    title: 'Plan regelmatig een date',
    content:
      'Een vaste date-avond hoeft niet duur of ingewikkeld te zijn. Het gaat erom dat jullie bewust tijd vrijmaken voor elkaar, los van verplichtingen. Wissel af: de ene keer plant de een, de volgende keer de ander.',
    category: 'plezier',
    actionable:
      'Plan vandaag een date voor de komende week.',
  },
  {
    id: 'tip-29',
    title: 'Doe iets spontaans',
    content:
      'Sleur is de vijand van plezier. Doorbreek de routine af en toe met iets onverwachts. Een spontaan uitje, een verrassing, of gewoon iets anders doen dan normaal op een doordeweekse avond.',
    category: 'plezier',
    actionable:
      'Bedenk iets onverwachts voor vandaag of morgen. Het hoeft niet groots te zijn, als het maar anders is dan normaal.',
  },
  {
    id: 'tip-30',
    title: 'Lach samen',
    content:
      'Humor is een van de sterkste verbinders in een relatie. Kijk samen een grappige serie, deel grappige momenten of haal gekke herinneringen op. Samen lachen vermindert stress en brengt jullie dichter bij elkaar.',
    category: 'plezier',
    actionable:
      'Zoek vanavond samen een komedie of grappig filmpje uit om naar te kijken.',
  },
  {
    id: 'tip-31',
    title: 'Ga terug naar het begin',
    content:
      'Doe iets wat jullie in het begin van de relatie deden. Ga naar de plek van jullie eerste date, kook het gerecht dat jullie vroeger altijd maakten, of luister naar de muziek van toen.',
    category: 'plezier',
    actionable:
      'Kies een activiteit of plek uit het begin van jullie relatie en plan die opnieuw in.',
  },
  {
    id: 'tip-32',
    title: 'Verras zonder reden',
    content:
      'Verrassingen hoeven niet groots te zijn of een aanleiding te hebben. Een onverwachte bos bloemen, een favoriet snack of een lief berichtje tussendoor werkt net zo goed.',
    category: 'plezier',
    actionable:
      'Verras je partner vandaag met iets kleins, zonder aanleiding.',
  },

  // === COMMUNICATIE (extra) ===
  {
    id: 'tip-33',
    title: 'Vat samen wat je hoort',
    content:
      'Na een belangrijk gesprek, vat kort samen wat je hebt begrepen. "Dus als ik het goed begrijp, voel je..." Dit voorkomt misverstanden en laat zien dat je echt luistert.',
    category: 'communicatie',
    actionable:
      'Probeer vandaag na een gesprek met je partner in je eigen woorden samen te vatten wat die zei.',
  },
  {
    id: 'tip-34',
    title: 'Timing is alles',
    content:
      'Niet elk moment is geschikt voor een serieus gesprek. Als je partner net thuiskomt of gestrest is, wacht dan even. Vraag: "Is dit een goed moment om iets te bespreken?"',
    category: 'communicatie',
    actionable:
      'Vraag vandaag voordat je iets belangrijks bespreekt of het een goed moment is.',
  },
  {
    id: 'tip-35',
    title: 'Deel je dag in drie zinnen',
    content:
      'Maak er een gewoonte van om elke dag in drie zinnen te vertellen hoe het was: het beste moment, het lastigste, en waar je aan dacht. Kort maar krachtig.',
    category: 'communicatie',
    actionable:
      'Vertel vanavond je dag in precies drie zinnen en vraag je partner hetzelfde te doen.',
  },
  {
    id: 'tip-36',
    title: 'Schrijf het op als praten moeilijk is',
    content:
      'Soms is een brief of berichtje makkelijker dan een gesprek. Het geeft je de tijd om je woorden te kiezen en je partner de ruimte om het in eigen tempo te verwerken.',
    category: 'communicatie',
    actionable:
      'Schrijf een kort briefje aan je partner over iets wat je bezighoudt maar moeilijk vindt om te zeggen.',
  },

  // === INTIMITEIT (extra) ===
  {
    id: 'tip-37',
    title: 'Wees aanwezig, niet perfect',
    content:
      'Intimiteit draait niet om perfectie maar om aanwezigheid. Het gaat erom dat je er bent, met aandacht, ook als het ongemakkelijk of kwetsbaar voelt.',
    category: 'intimiteit',
    actionable:
      'Wees vanavond bewust aanwezig bij je partner zonder je druk te maken over hoe het "hoort".',
  },
  {
    id: 'tip-38',
    title: 'Begin de dag met verbinding',
    content:
      'Een knuffel, kus of even tegen elkaar aanliggen voordat de dag begint geeft een warm gevoel dat de hele dag meedraagt.',
    category: 'intimiteit',
    actionable:
      'Neem morgenochtend bewust een minuut de tijd om even dicht bij je partner te zijn voordat jullie opstaan.',
  },
  {
    id: 'tip-39',
    title: 'Vraag wat de ander nodig heeft',
    content:
      'In plaats van te raden wat je partner wil, vraag het gewoon. "Wat heb je nu nodig: een knuffel, een luisterend oor, of even rust?" Dat bespaart frustratie en toont betrokkenheid.',
    category: 'intimiteit',
    actionable:
      'Vraag je partner vandaag wat die op dit moment het meest nodig heeft.',
  },
  {
    id: 'tip-40',
    title: 'Deel een herinnering',
    content:
      'Haal samen een mooi moment op uit jullie relatie. Welke details herinneren jullie je? Gedeelde herinneringen versterken de band en brengen warmte terug.',
    category: 'intimiteit',
    actionable:
      'Vertel je partner vandaag een favoriet moment uit jullie relatie en vraag wat die zich ervan herinnert.',
  },
  {
    id: 'tip-41',
    title: 'Respecteer elkaars grenzen',
    content:
      'Intimiteit vereist veiligheid. Dat betekent dat een "nee" of "nu even niet" altijd gerespecteerd wordt, zonder schuld of druk. Dat vertrouwen maakt de momenten die er wel zijn juist mooier.',
    category: 'intimiteit',
    actionable:
      'Bevestig bij je partner dat het altijd oké is om nee te zeggen, zonder uitleg.',
  },

  // === CONFLICT (extra) ===
  {
    id: 'tip-42',
    title: 'Kies je gevechten',
    content:
      'Niet alles hoeft een discussie te worden. Vraag jezelf af: is dit over een week nog belangrijk? Zo niet, laat het dan misschien gaan. Bewaar je energie voor wat er echt toe doet.',
    category: 'conflict',
    actionable:
      'Laat vandaag bewust iets kleins gaan dat je normaal zou benoemen.',
  },
  {
    id: 'tip-43',
    title: 'Zoek het patroon, niet het probleem',
    content:
      'Terugkerende conflicten gaan zelden over het onderwerp zelf. Er zit vaak een dieper patroon onder: behoefte aan erkenning, angst om afgewezen te worden, of verschil in verwachtingen.',
    category: 'conflict',
    actionable:
      'Bedenk bij een terugkerend conflict: wat is de onderliggende behoefte die niet wordt vervuld?',
  },
  {
    id: 'tip-44',
    title: 'Repareer na een conflict',
    content:
      'Na een ruzie is het belangrijk om de verbinding te herstellen. Dat kan een knuffel zijn, samen koffie drinken, of simpelweg zeggen: "Het spijt me dat het zo liep." Repareren is sterker dan vermijden.',
    category: 'conflict',
    actionable:
      'Maak na het volgende meningsverschil een bewust herstelgebaar, hoe klein ook.',
  },
  {
    id: 'tip-45',
    title: 'Vermijd de vier ruiters',
    content:
      'Relatieonderzoeker John Gottman identificeerde vier schadelijke patronen: kritiek, minachting, defensiviteit en stonewalling. Herken je een van deze bij jezelf? Bewustwording is de eerste stap.',
    category: 'conflict',
    actionable:
      'Let vandaag op of je een van de vier patronen herkent in jullie communicatie.',
  },
  {
    id: 'tip-46',
    title: 'Ga naast elkaar staan, niet tegenover',
    content:
      'Probeer bij een meningsverschil letterlijk naast elkaar te gaan zitten in plaats van tegenover. Het verandert de dynamiek: jullie zijn een team dat samen een probleem bekijkt.',
    category: 'conflict',
    actionable:
      'Bespreek het volgende verschil van mening terwijl jullie naast elkaar zitten.',
  },

  // === DAGELIJKS (extra) ===
  {
    id: 'tip-47',
    title: 'Stuur een berichtje tussendoor',
    content:
      'Een kort lief berichtje midden op de dag laat zien dat je aan de ander denkt. Het hoeft niet ingewikkeld: "Ik dacht net aan je" of "Hoop dat je een goede dag hebt" is al genoeg.',
    category: 'dagelijks',
    actionable:
      'Stuur je partner vandaag een spontaan berichtje om te laten weten dat je aan hem of haar denkt.',
  },
  {
    id: 'tip-48',
    title: 'Vraag om hulp, bied hulp aan',
    content:
      'Hulp vragen is geen zwakte, het is vertrouwen tonen. En hulp aanbieden zonder dat erom gevraagd wordt toont aandacht. Beide richtingen versterken de samenwerking.',
    category: 'dagelijks',
    actionable:
      'Vraag vandaag om hulp bij iets kleins, of bied het aan voordat je partner erom vraagt.',
  },
  {
    id: 'tip-49',
    title: 'Maak samen een playlist',
    content:
      'Muziek verbindt. Maak samen een playlist met nummers die voor jullie relatie belangrijk zijn. Luister ernaar tijdens het koken, autorijden of opruimen.',
    category: 'dagelijks',
    actionable:
      'Begin vandaag met het aanmaken van een gedeelde playlist. Voeg allebei minstens drie nummers toe.',
  },
  {
    id: 'tip-50',
    title: 'Neem taken van elkaar over',
    content:
      'Doe af en toe iets wat normaal de taak van je partner is. Niet omdat je moet, maar om te laten zien dat je het team versterkt. Het wordt gewaardeerd, juist omdat het niet verwacht wordt.',
    category: 'dagelijks',
    actionable:
      'Neem vandaag een taak van je partner over zonder er iets over te zeggen.',
  },

  // === GROEI (extra) ===
  {
    id: 'tip-51',
    title: 'Lees of luister samen',
    content:
      'Lees samen een boek, luister een podcast, of volg een online cursus. Het geeft jullie gedeelde taal en nieuwe inzichten om over te praten.',
    category: 'groei',
    actionable:
      'Kies samen een boek of podcast die jullie allebei interessant vinden en begin deze week.',
  },
  {
    id: 'tip-52',
    title: 'Stel jaardoelen als koppel',
    content:
      'Waar willen jullie over een jaar staan als koppel? Niet alleen financieel of praktisch, maar ook emotioneel. Hebben jullie doelen voor jullie relatie, net als voor werk of gezondheid?',
    category: 'groei',
    actionable:
      'Schrijf allebei drie dingen op die jullie dit jaar als koppel willen bereiken en vergelijk.',
  },
  {
    id: 'tip-53',
    title: 'Accepteer dat groei oncomfortabel is',
    content:
      'Verandering voelt niet altijd prettig. Soms betekent groeien dat je oude patronen loslaat of moeilijke gesprekken voert. Dat is normaal en het is het waard.',
    category: 'groei',
    actionable:
      'Benoem een verandering die je graag wilt maken maar die je ook spannend vindt.',
  },
  {
    id: 'tip-54',
    title: 'Geef constructieve feedback met liefde',
    content:
      'Feedback geven aan je partner is kwetsbaar voor allebei. Begin met wat goed gaat, wees specifiek over wat je anders wilt, en eindig met waardering. Het gaat niet om kritiek maar om samen beter worden.',
    category: 'groei',
    actionable:
      'Geef je partner vandaag een compliment gevolgd door een zachte suggestie voor verbetering.',
  },
  {
    id: 'tip-55',
    title: 'Vier ook de kleine mijlpalen',
    content:
      'Je hoeft niet te wachten op jubilea of grote gebeurtenissen. Vier ook de kleine dingen: een goed gesprek, een week zonder ruzie, of gewoon dat jullie er voor elkaar zijn.',
    category: 'groei',
    actionable:
      'Benoem vandaag een kleine mijlpaal in jullie relatie en markeer het moment.',
  },

  // === PLEZIER (extra) ===
  {
    id: 'tip-56',
    title: 'Leer samen iets nieuws',
    content:
      'Volg samen een workshop, leer een nieuwe sport, of probeer een recept uit een ander land. Samen iets nieuws leren creëert gedeelde herinneringen en houdt de relatie fris.',
    category: 'plezier',
    actionable:
      'Kies samen iets nieuws om te proberen dit weekend, iets wat jullie allebei nog nooit gedaan hebben.',
  },
  {
    id: 'tip-57',
    title: 'Maak een bucketlist als koppel',
    content:
      'Schrijf samen een lijst met dingen die jullie ooit willen doen. Van grote dromen tot kleine avonturen. Het proces alleen al is leuk en geeft jullie iets om naar uit te kijken.',
    category: 'plezier',
    actionable:
      'Begin vanavond met een gedeelde bucketlist. Schrijf allebei vijf ideeën op.',
  },
  {
    id: 'tip-58',
    title: 'Creëer een eigen traditie',
    content:
      'Elke maand naar dezelfde plek, een jaarlijks uitje, of een wekelijkse filmavond. Tradities geven jullie relatie structuur en iets om naar uit te kijken.',
    category: 'plezier',
    actionable:
      'Bedenk samen een nieuwe traditie die jullie elke week of maand willen doen.',
  },
  {
    id: 'tip-59',
    title: 'Wees speels met elkaar',
    content:
      'Speelsheid houdt de lichtheid in je relatie. Plaag elkaar (liefdevol), maak grapjes, of doe een spelletje. Het hoeft niet altijd serieus te zijn.',
    category: 'plezier',
    actionable:
      'Daag je partner vandaag uit voor een kort spelletje of een speelse wedstrijd.',
  },
  {
    id: 'tip-60',
    title: 'Ontdek elkaars wereld',
    content:
      'Toon interesse in iets waar je partner enthousiast over is, ook als het niet jouw ding is. Vraag om uitleg, kijk mee, of probeer het samen. Het toont respect voor wie de ander is.',
    category: 'plezier',
    actionable:
      'Vraag je partner om iets te laten zien of te vertellen over een hobby of interesse waar jij weinig van weet.',
  },
];

export function getTipOfTheDay(): RelationshipTip {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000,
  );
  const index = dayOfYear % RELATIONSHIP_TIPS.length;
  return RELATIONSHIP_TIPS[index];
}

export function getTipsByCategory(
  category: TipCategory | null,
): RelationshipTip[] {
  if (!category) return RELATIONSHIP_TIPS;
  return RELATIONSHIP_TIPS.filter((tip) => tip.category === category);
}
