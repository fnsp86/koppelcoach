export type Budget = 'gratis' | 'goedkoop' | 'uitgebreid';
export type Duration = '1-uur' | 'halve-dag' | 'hele-dag';
export type Setting = 'thuis' | 'buiten' | 'uit';

export type DateIdea = {
  id: string;
  title: string;
  description: string;
  budget: Budget;
  duration: Duration;
  setting: Setting;
  season?: 'lente' | 'zomer' | 'herfst' | 'winter' | 'altijd';
  kidFriendly?: boolean;
  category?: 'romantisch' | 'avontuurlijk' | 'creatief' | 'ontspannen' | 'sociaal';
};

export const dateIdeas: DateIdea[] = [
  {
    id: 'date-1',
    title: 'Kook een nieuw recept samen',
    description:
      'Kies een gerecht dat jullie nog nooit hebben gemaakt en ga samen de keuken in. Verdeel de taken en geniet van het resultaat.',
    budget: 'goedkoop',
    duration: '1-uur',
    setting: 'thuis',
  },
  {
    id: 'date-2',
    title: 'Zonsondergang wandeling',
    description:
      'Zoek een mooi plekje in de buurt en maak samen een wandeling rond zonsondergang. Telefoons blijven in je zak.',
    budget: 'gratis',
    duration: '1-uur',
    setting: 'buiten',
  },
  {
    id: 'date-3',
    title: 'Filmavond met een twist',
    description:
      'De een kiest de film, de ander regelt de snacks. Bouw een gezellig fort van dekens op de bank.',
    budget: 'goedkoop',
    duration: '1-uur',
    setting: 'thuis',
  },
  {
    id: 'date-4',
    title: 'Ga naar een markt',
    description:
      'Bezoek een lokale markt en koop samen ingredienten voor een maaltijd. Proef alles wat je tegenkomt.',
    budget: 'goedkoop',
    duration: 'halve-dag',
    setting: 'uit',
  },
  {
    id: 'date-5',
    title: 'Picknick in het park',
    description:
      'Pak een kleed, wat lekkers en een fles water of wijn. Zoek een rustig plekje en geniet van elkaar.',
    budget: 'goedkoop',
    duration: 'halve-dag',
    setting: 'buiten',
  },
  {
    id: 'date-6',
    title: 'Sterren kijken',
    description:
      'Rij naar een plek met weinig lichtvervuiling en kijk samen naar de sterren. Neem een deken en warme chocolademelk mee.',
    budget: 'gratis',
    duration: '1-uur',
    setting: 'buiten',
  },
  {
    id: 'date-7',
    title: 'Fotoalbum maken',
    description:
      'Duik samen in oude fotos en stel een album samen van jullie mooiste momenten. Haal herinneringen op.',
    budget: 'gratis',
    duration: '1-uur',
    setting: 'thuis',
  },
  {
    id: 'date-8',
    title: 'Museum of tentoonstelling bezoeken',
    description:
      'Kies een museum dat jullie allebei aanspreekt en neem de tijd om alles rustig te bekijken.',
    budget: 'goedkoop',
    duration: 'halve-dag',
    setting: 'uit',
  },
  {
    id: 'date-9',
    title: 'Spelletjesavond voor twee',
    description:
      'Pak de bordspellen erbij of download een leuk spel. Maak er een competitie van met een beloning voor de winnaar.',
    budget: 'gratis',
    duration: '1-uur',
    setting: 'thuis',
  },
  {
    id: 'date-10',
    title: 'Dagje fietsen',
    description:
      'Plan een mooie fietsroute door de natuur. Stop onderweg bij een terras voor koffie of lunch.',
    budget: 'goedkoop',
    duration: 'halve-dag',
    setting: 'buiten',
  },
  {
    id: 'date-11',
    title: 'Samen naar een concert',
    description:
      'Boek kaartjes voor een concert of festival. Of zoek een gratis optreden in de buurt.',
    budget: 'uitgebreid',
    duration: 'halve-dag',
    setting: 'uit',
  },
  {
    id: 'date-12',
    title: 'Dansles volgen',
    description:
      'Probeer samen een dansles: salsa, tango of swing. Het maakt niet uit of jullie twee linkerbenen hebben.',
    budget: 'goedkoop',
    duration: '1-uur',
    setting: 'uit',
  },
  {
    id: 'date-13',
    title: 'Ontbijt op bed',
    description:
      'Verras je partner met een uitgebreid ontbijt op bed. Verse croissants, fruit en koffie.',
    budget: 'goedkoop',
    duration: '1-uur',
    setting: 'thuis',
  },
  {
    id: 'date-14',
    title: 'Doe-het-zelf sushi avond',
    description:
      'Koop de ingredienten en maak samen sushi. Het gaat niet om perfectie, maar om het plezier.',
    budget: 'goedkoop',
    duration: '1-uur',
    setting: 'thuis',
  },
  {
    id: 'date-15',
    title: 'Stadswandeling in een nieuwe wijk',
    description:
      'Kies een wijk waar jullie nog nooit zijn geweest en ga op ontdekking. Stap ergens binnen voor koffie.',
    budget: 'gratis',
    duration: 'halve-dag',
    setting: 'uit',
  },
  {
    id: 'date-16',
    title: 'Wellnessavond thuis',
    description:
      'Gezichtsmaskers, kaarsen, rustige muziek en een warm bad. Verwennen hoeft niet duur te zijn.',
    budget: 'goedkoop',
    duration: '1-uur',
    setting: 'thuis',
  },
  {
    id: 'date-17',
    title: 'Workshop volgen',
    description:
      'Boek een workshop samen: aardewerk, schilderen, wijn proeven of chocolade maken.',
    budget: 'uitgebreid',
    duration: 'halve-dag',
    setting: 'uit',
  },
  {
    id: 'date-18',
    title: 'Brieven schrijven aan elkaar',
    description:
      'Schrijf allebei een brief over wat je waardeert aan de ander. Lees ze hardop aan elkaar voor.',
    budget: 'gratis',
    duration: '1-uur',
    setting: 'thuis',
  },
  {
    id: 'date-19',
    title: 'Dagje strand',
    description:
      'Ga naar het strand, ongeacht het seizoen. In de zomer zwemmen, in de winter strandwandelen met warme chocomel.',
    budget: 'gratis',
    duration: 'hele-dag',
    setting: 'buiten',
  },
  {
    id: 'date-20',
    title: 'Escape room',
    description:
      'Los samen puzzels op onder tijdsdruk. Een goede test voor jullie samenwerking en communicatie.',
    budget: 'uitgebreid',
    duration: '1-uur',
    setting: 'uit',
  },
  {
    id: 'date-21',
    title: 'Karaoke avond',
    description:
      'Thuis of in een karaokebar: zing jullie favoriete nummers. Hoe slechter, hoe leuker.',
    budget: 'gratis',
    duration: '1-uur',
    setting: 'thuis',
  },
  {
    id: 'date-22',
    title: 'Samen tuinieren of planten verpotten',
    description:
      'Ga naar het tuincentrum, kies samen plantjes uit en geef ze een mooi plekje thuis of op het balkon.',
    budget: 'goedkoop',
    duration: 'halve-dag',
    setting: 'thuis',
  },
  {
    id: 'date-23',
    title: 'Boswandeling met thermosfles',
    description:
      'Maak een lange wandeling door het bos met warme thee of koffie. Geniet van de stilte en de natuur.',
    budget: 'gratis',
    duration: 'halve-dag',
    setting: 'buiten',
  },
  {
    id: 'date-24',
    title: 'Thema-diner thuis',
    description:
      'Kies een land en kook een compleet menu uit die keuken. Zet de juiste muziek op voor de sfeer.',
    budget: 'goedkoop',
    duration: '1-uur',
    setting: 'thuis',
  },
  {
    id: 'date-25',
    title: 'Boekwinkel bezoeken',
    description:
      'Ga samen naar een boekwinkel en kies een boek voor de ander uit. Lees het en bespreek het later samen.',
    budget: 'goedkoop',
    duration: '1-uur',
    setting: 'uit',
  },
  {
    id: 'date-26',
    title: 'Roadtrip zonder plan',
    description:
      'Stap in de auto en rij een richting op. Stop waar het leuk lijkt. Geen GPS, geen verwachtingen.',
    budget: 'goedkoop',
    duration: 'hele-dag',
    setting: 'buiten',
  },
  {
    id: 'date-27',
    title: 'Samen hardlopen of sporten',
    description:
      'Ga samen een rondje hardlopen, naar de sportschool of doe een workout in het park.',
    budget: 'gratis',
    duration: '1-uur',
    setting: 'buiten',
  },
  {
    id: 'date-28',
    title: 'Wijnproeverij of brouwerij bezoek',
    description:
      'Bezoek een lokale brouwerij of wijnboer en proef samen verschillende smaken.',
    budget: 'uitgebreid',
    duration: 'halve-dag',
    setting: 'uit',
  },
  {
    id: 'date-29',
    title: 'Puzzel samen leggen',
    description:
      'Koop een mooie puzzel van 1000 stukjes en werk er samen aan, verspreid over meerdere avonden.',
    budget: 'goedkoop',
    duration: '1-uur',
    setting: 'thuis',
  },
  {
    id: 'date-30',
    title: 'Kano of supboard huren',
    description:
      'Huur een kano of supboard en ga samen het water op. Ideaal voor een actieve date op een zonnige dag.',
    budget: 'goedkoop',
    duration: 'halve-dag',
    setting: 'buiten',
  },
  {
    id: 'date-31',
    title: 'Samen vrijwilligerswerk doen',
    description:
      'Geef samen iets terug aan de gemeenschap. Help bij een voedselbank, dierenasiel of buurtinitiatief.',
    budget: 'gratis',
    duration: 'halve-dag',
    setting: 'uit',
  },
  {
    id: 'date-32',
    title: 'Droomreisplanning',
    description:
      'Plan samen jullie droomreis, ook als die pas over jaren kan. Zoek bestemmingen, hotels en activiteiten.',
    budget: 'gratis',
    duration: '1-uur',
    setting: 'thuis',
  },
  // Romantisch
  {
    id: 'date-33',
    title: 'Massage-avond',
    description:
      'Dim het licht, zet rustgevende muziek op en geef elkaar om de beurt een ontspannende massage. Gebruik een fijne olie en neem de tijd.',
    budget: 'goedkoop',
    duration: '1-uur',
    setting: 'thuis',
    season: 'altijd',
    kidFriendly: false,
    category: 'romantisch',
  },
  {
    id: 'date-34',
    title: 'Kaarsenlicht diner thuis',
    description:
      'Dek de tafel alsof je in een restaurant zit: kaarsen, mooi servies en een zelfgekookt driegangenmenu. Telefoons gaan uit.',
    budget: 'goedkoop',
    duration: '1-uur',
    setting: 'thuis',
    season: 'altijd',
    kidFriendly: false,
    category: 'romantisch',
  },
  {
    id: 'date-35',
    title: 'Zonsopgang samen bekijken',
    description:
      'Zet de wekker vroeg, pak warme kleding en rij naar een mooi uitzichtpunt. Kijk samen hoe de zon opkomt terwijl jullie koffie drinken.',
    budget: 'gratis',
    duration: '1-uur',
    setting: 'buiten',
    season: 'altijd',
    kidFriendly: false,
    category: 'romantisch',
  },
  {
    id: 'date-36',
    title: 'Een gedicht voorlezen',
    description:
      'Kies allebei een gedicht dat jullie raakt en lees het hardop voor aan de ander. Praat daarna over waarom je dat gedicht koos.',
    budget: 'gratis',
    duration: '1-uur',
    setting: 'thuis',
    season: 'altijd',
    kidFriendly: false,
    category: 'romantisch',
  },
  {
    id: 'date-37',
    title: 'Dans in de woonkamer',
    description:
      'Maak een afspeellijst van jullie favoriete nummers en dans samen in de woonkamer. Geen regels, gewoon bewegen op de muziek.',
    budget: 'gratis',
    duration: '1-uur',
    setting: 'thuis',
    season: 'altijd',
    kidFriendly: false,
    category: 'romantisch',
  },
  {
    id: 'date-38',
    title: 'Verrassingsdate',
    description:
      'De een plant de hele date zonder dat de ander weet wat er gaat gebeuren. Het enige dat je hoeft te doen is meegaan en genieten.',
    budget: 'goedkoop',
    duration: 'halve-dag',
    setting: 'uit',
    season: 'altijd',
    kidFriendly: false,
    category: 'romantisch',
  },
  {
    id: 'date-39',
    title: 'Liefdesbrieven schrijven',
    description:
      'Ga tegenover elkaar zitten en schrijf een brief over jullie mooiste herinnering samen. Wissel daarna de brieven uit en lees ze in stilte.',
    budget: 'gratis',
    duration: '1-uur',
    setting: 'thuis',
    season: 'altijd',
    kidFriendly: false,
    category: 'romantisch',
  },
  {
    id: 'date-40',
    title: 'Samen in bad',
    description:
      'Vul het bad met warm water en badschuim. Steek een paar kaarsen aan, zet rustige muziek op en geniet samen van de rust.',
    budget: 'gratis',
    duration: '1-uur',
    setting: 'thuis',
    season: 'altijd',
    kidFriendly: false,
    category: 'romantisch',
  },
  // Avontuurlijk
  {
    id: 'date-41',
    title: 'Klimhal bezoeken',
    description:
      'Ga samen naar een klimhal en daag elkaar uit op de wand. Je hoeft geen ervaring te hebben, want er is altijd begeleiding aanwezig.',
    budget: 'goedkoop',
    duration: 'halve-dag',
    setting: 'uit',
    season: 'altijd',
    kidFriendly: true,
    category: 'avontuurlijk',
  },
  {
    id: 'date-42',
    title: 'Survivaltocht',
    description:
      'Boek een survivaltocht in de natuur en leer samen vuur maken, touw knopen en orienteren met een kompas. Een avontuur dat jullie dichter bij elkaar brengt.',
    budget: 'uitgebreid',
    duration: 'hele-dag',
    setting: 'buiten',
    season: 'zomer',
    kidFriendly: false,
    category: 'avontuurlijk',
  },
  {
    id: 'date-43',
    title: 'Fietstocht nieuwe route',
    description:
      'Kies een fietsroute die jullie nog nooit hebben gereden. Volg de knooppunten en laat je verrassen door wat je tegenkomt.',
    budget: 'gratis',
    duration: 'halve-dag',
    setting: 'buiten',
    season: 'altijd',
    kidFriendly: true,
    category: 'avontuurlijk',
  },
  {
    id: 'date-44',
    title: 'Geocaching',
    description:
      'Download een geocaching-app en ga samen op schattenjacht in jullie omgeving. Er liggen overal verborgen schatten die wachten om gevonden te worden.',
    budget: 'gratis',
    duration: 'halve-dag',
    setting: 'buiten',
    season: 'altijd',
    kidFriendly: true,
    category: 'avontuurlijk',
  },
  {
    id: 'date-45',
    title: 'Nachtelijke wandeling',
    description:
      'Trek er in het donker op uit met een zaklamp en ontdek hoe anders je buurt of een bos eruitziet bij nacht. Luister naar de geluiden van de avond.',
    budget: 'gratis',
    duration: '1-uur',
    setting: 'buiten',
    season: 'altijd',
    kidFriendly: false,
    category: 'avontuurlijk',
  },
  {
    id: 'date-46',
    title: 'Urban exploring',
    description:
      'Ga op verkenning in een stad die jullie niet goed kennen. Loop door steegjes, ontdek street art en stap binnen bij plekken die jullie aandacht trekken.',
    budget: 'goedkoop',
    duration: 'halve-dag',
    setting: 'uit',
    season: 'altijd',
    kidFriendly: false,
    category: 'avontuurlijk',
  },
  {
    id: 'date-47',
    title: 'Stand-up paddleboarden',
    description:
      'Huur een supboard en probeer samen in balans te blijven op het water. Lachen is gegarandeerd, nat worden ook.',
    budget: 'goedkoop',
    duration: 'halve-dag',
    setting: 'buiten',
    season: 'zomer',
    kidFriendly: false,
    category: 'avontuurlijk',
  },
  {
    id: 'date-48',
    title: 'Treinreis naar een willekeurige bestemming',
    description:
      'Ga naar het station en pak de eerstvolgende trein, ongeacht de bestemming. Ontdek samen een plek waar jullie nog nooit zijn geweest.',
    budget: 'goedkoop',
    duration: 'hele-dag',
    setting: 'uit',
    season: 'altijd',
    kidFriendly: false,
    category: 'avontuurlijk',
  },
  // Creatief
  {
    id: 'date-49',
    title: 'Samen schilderen',
    description:
      'Koop een paar canvassen en acrylverf en schilder hetzelfde onderwerp, ieder op jullie eigen manier. Vergelijk het resultaat aan het eind.',
    budget: 'goedkoop',
    duration: '1-uur',
    setting: 'thuis',
    season: 'altijd',
    kidFriendly: true,
    category: 'creatief',
  },
  {
    id: 'date-50',
    title: 'Muziek maken',
    description:
      'Pak een gitaar, keyboard of gewoon een paar pannen en maak samen muziek. Het hoeft niet mooi te klinken, als het maar leuk is.',
    budget: 'gratis',
    duration: '1-uur',
    setting: 'thuis',
    season: 'altijd',
    kidFriendly: true,
    category: 'creatief',
  },
  {
    id: 'date-51',
    title: 'Fotowandeling',
    description:
      'Ga samen naar buiten met jullie telefoons of een camera en geef elkaar een thema om te fotograferen. Bekijk elkaars foto s achteraf en kies de mooiste.',
    budget: 'gratis',
    duration: 'halve-dag',
    setting: 'buiten',
    season: 'altijd',
    kidFriendly: true,
    category: 'creatief',
  },
  {
    id: 'date-52',
    title: 'Samen knutselen',
    description:
      'Maak samen iets met jullie handen: een fotolijstje, een kaart voor iemand of een decoratie voor in huis. Alles mag, zolang het zelfgemaakt is.',
    budget: 'goedkoop',
    duration: '1-uur',
    setting: 'thuis',
    season: 'altijd',
    kidFriendly: true,
    category: 'creatief',
  },
  {
    id: 'date-53',
    title: 'Pottenbakken',
    description:
      'Volg samen een pottenbakworkshop en maak jullie eigen bord of mok. Na een paar weken halen jullie het gebakken resultaat op.',
    budget: 'uitgebreid',
    duration: 'halve-dag',
    setting: 'uit',
    season: 'altijd',
    kidFriendly: true,
    category: 'creatief',
  },
  {
    id: 'date-54',
    title: 'Samen iets bouwen',
    description:
      'Bouw samen een plantenbak, een kastje of een vogelhuisje. Teken eerst een plan en ga dan aan de slag met hout en gereedschap.',
    budget: 'goedkoop',
    duration: 'halve-dag',
    setting: 'thuis',
    season: 'altijd',
    kidFriendly: true,
    category: 'creatief',
  },
  {
    id: 'date-55',
    title: 'Tekenwedstrijd',
    description:
      'Geef elkaar om de beurt een onderwerp en teken het binnen twee minuten. De ander raadt wat het is. Hoe slechter de tekening, hoe grappiger.',
    budget: 'gratis',
    duration: '1-uur',
    setting: 'thuis',
    season: 'altijd',
    kidFriendly: true,
    category: 'creatief',
  },
  {
    id: 'date-56',
    title: 'Samen een lied schrijven',
    description:
      'Schrijf samen een lied over jullie relatie, jullie huisdier of iets totaal onzinnigs. De tekst is belangrijker dan de melodie.',
    budget: 'gratis',
    duration: '1-uur',
    setting: 'thuis',
    season: 'altijd',
    kidFriendly: true,
    category: 'creatief',
  },
  // Ontspannen
  {
    id: 'date-57',
    title: 'Spa-dag thuis',
    description:
      'Maak van jullie badkamer een spa: gezichtsmaskers, nagelverzorging, voetenbad en ontspannende muziek. Verwennen kan prima zonder dure behandelingen.',
    budget: 'goedkoop',
    duration: 'halve-dag',
    setting: 'thuis',
    season: 'altijd',
    kidFriendly: false,
    category: 'ontspannen',
  },
  {
    id: 'date-58',
    title: 'Yoga samen',
    description:
      'Zoek een beginnersvideo op en doe samen een yogasessie in de woonkamer. Help elkaar met de houdingen en lach om de wankelende balans.',
    budget: 'gratis',
    duration: '1-uur',
    setting: 'thuis',
    season: 'altijd',
    kidFriendly: true,
    category: 'ontspannen',
  },
  {
    id: 'date-59',
    title: 'Voorlezen aan elkaar',
    description:
      'Kies allebei een kort verhaal of een hoofdstuk uit een boek en lees het voor aan de ander. Maak het gezellig met thee en een deken op de bank.',
    budget: 'gratis',
    duration: '1-uur',
    setting: 'thuis',
    season: 'altijd',
    kidFriendly: false,
    category: 'ontspannen',
  },
  {
    id: 'date-60',
    title: 'Sauna bezoek',
    description:
      'Ga samen naar een sauna en wissel af tussen warmte en afkoeling. Neem de tijd en geniet van de rust en stilte samen.',
    budget: 'uitgebreid',
    duration: 'halve-dag',
    setting: 'uit',
    season: 'herfst',
    kidFriendly: false,
    category: 'ontspannen',
  },
  {
    id: 'date-61',
    title: 'Mediteren samen',
    description:
      'Zoek een geleide meditatie op en doe die samen. Begin met tien minuten en bouw het langzaam op. Het geeft rust en verbinding.',
    budget: 'gratis',
    duration: '1-uur',
    setting: 'thuis',
    season: 'altijd',
    kidFriendly: false,
    category: 'ontspannen',
  },
  {
    id: 'date-62',
    title: 'Legpuzzel marathon',
    description:
      'Kies een uitdagende puzzel en werk er de hele middag samen aan. Zet een podcast of rustige muziek op en geniet van het samenwerken.',
    budget: 'goedkoop',
    duration: 'halve-dag',
    setting: 'thuis',
    season: 'winter',
    kidFriendly: true,
    category: 'ontspannen',
  },
  {
    id: 'date-63',
    title: 'Theeceremonie',
    description:
      'Koop een paar bijzondere theesoorten en neem de tijd om ze bewust te proeven. Geen haast, geen schermen, alleen aandacht voor de smaak en voor elkaar.',
    budget: 'goedkoop',
    duration: '1-uur',
    setting: 'thuis',
    season: 'altijd',
    kidFriendly: false,
    category: 'ontspannen',
  },
  {
    id: 'date-64',
    title: 'Zonnen in het park',
    description:
      'Neem een kleed, zonnebrand en een goed boek mee naar het park. Lig samen in de zon en geniet van een rustige middag zonder verplichtingen.',
    budget: 'gratis',
    duration: 'halve-dag',
    setting: 'buiten',
    season: 'zomer',
    kidFriendly: true,
    category: 'ontspannen',
  },
  // Sociaal
  {
    id: 'date-65',
    title: 'Dubbeldate',
    description:
      'Nodig een bevriend stel uit voor een gezamenlijke date. Ga samen uit eten, bowlen of doe een activiteit die jullie allebei leuk vinden.',
    budget: 'goedkoop',
    duration: 'halve-dag',
    setting: 'uit',
    season: 'altijd',
    kidFriendly: false,
    category: 'sociaal',
  },
  {
    id: 'date-66',
    title: 'Kookavond voor vrienden',
    description:
      'Nodig vrienden uit en kook samen een uitgebreid diner. Verdeel de gangen en maak er een gezellige avond van met goed eten en goede gesprekken.',
    budget: 'goedkoop',
    duration: 'halve-dag',
    setting: 'thuis',
    season: 'altijd',
    kidFriendly: false,
    category: 'sociaal',
  },
  {
    id: 'date-67',
    title: 'Burenborrel organiseren',
    description:
      'Organiseer een informele borrel voor jullie buren. Een paar hapjes en drankjes zijn genoeg. Het is een mooie manier om samen jullie sociale kring te versterken.',
    budget: 'goedkoop',
    duration: '1-uur',
    setting: 'thuis',
    season: 'altijd',
    kidFriendly: true,
    category: 'sociaal',
  },
  {
    id: 'date-68',
    title: 'Spelletjesavond met anderen',
    description:
      'Nodig een paar vrienden uit en organiseer een avond vol bordspellen. Kies spellen waar iedereen aan mee kan doen en maak er een traditie van.',
    budget: 'gratis',
    duration: '1-uur',
    setting: 'thuis',
    season: 'altijd',
    kidFriendly: true,
    category: 'sociaal',
  },
  {
    id: 'date-69',
    title: 'Samen naar een feest',
    description:
      'Ga samen naar een verjaardag, buurtfeest of festival. Spreek van tevoren af dat jullie het als een date behandelen en geniet van elkaars gezelschap.',
    budget: 'gratis',
    duration: 'halve-dag',
    setting: 'uit',
    season: 'altijd',
    kidFriendly: false,
    category: 'sociaal',
  },
  {
    id: 'date-70',
    title: 'Pubquiz met vrienden',
    description:
      'Ga samen naar een pubquiz of organiseer er zelf een. Stel een team samen en test jullie kennis. De competitie maakt het extra leuk.',
    budget: 'goedkoop',
    duration: '1-uur',
    setting: 'uit',
    season: 'altijd',
    kidFriendly: false,
    category: 'sociaal',
  },
  // Met kinderen
  {
    id: 'date-71',
    title: 'Familiespeurtocht',
    description:
      'Maak een speurtocht door de buurt met aanwijzingen en opdrachten voor het hele gezin. Verstop een kleine schat op de eindlocatie.',
    budget: 'gratis',
    duration: 'halve-dag',
    setting: 'buiten',
    season: 'altijd',
    kidFriendly: true,
    category: 'avontuurlijk',
  },
  {
    id: 'date-72',
    title: 'Samen bakken met de kinderen',
    description:
      'Bak koekjes, een taart of cupcakes met het hele gezin. Laat de kinderen helpen met versieren. Het gaat om het plezier, niet om perfectie.',
    budget: 'goedkoop',
    duration: '1-uur',
    setting: 'thuis',
    season: 'altijd',
    kidFriendly: true,
    category: 'creatief',
  },
  {
    id: 'date-73',
    title: 'Natuur ontdekken met kinderen',
    description:
      'Ga met het gezin het bos in en zoek bijzondere bladeren, insecten of paddenstoelen. Neem een vergrootglas mee en maak er een ontdekkingsreis van.',
    budget: 'gratis',
    duration: 'halve-dag',
    setting: 'buiten',
    season: 'lente',
    kidFriendly: true,
    category: 'avontuurlijk',
  },
  {
    id: 'date-74',
    title: 'Kunstproject met kinderen',
    description:
      'Leg een groot vel papier op de grond en maak samen een kunstwerk. Gebruik verf, stiften, stickers en alles wat jullie kunnen vinden.',
    budget: 'goedkoop',
    duration: '1-uur',
    setting: 'thuis',
    season: 'altijd',
    kidFriendly: true,
    category: 'creatief',
  },
  {
    id: 'date-75',
    title: 'Boomhut of hut bouwen',
    description:
      'Bouw samen met de kinderen een hut van takken in het bos of een tent van lakens in de woonkamer. Gebruik fantasie in plaats van een handleiding.',
    budget: 'gratis',
    duration: 'halve-dag',
    setting: 'buiten',
    season: 'zomer',
    kidFriendly: true,
    category: 'creatief',
  },
  // Seizoensgebonden
  {
    id: 'date-76',
    title: 'Schaatsen',
    description:
      'Ga samen naar een ijsbaan en probeer overeind te blijven. Houd elkaars hand vast en sluit af met warme chocolademelk aan de rand.',
    budget: 'goedkoop',
    duration: 'halve-dag',
    setting: 'uit',
    season: 'winter',
    kidFriendly: true,
    category: 'avontuurlijk',
  },
  {
    id: 'date-77',
    title: 'Stranddag',
    description:
      'Pak handdoeken, zonnebrand en een koelbox in en breng een hele dag door op het strand. Zwem, bouw een zandkasteel en geniet van de zomer.',
    budget: 'gratis',
    duration: 'hele-dag',
    setting: 'buiten',
    season: 'zomer',
    kidFriendly: true,
    category: 'ontspannen',
  },
  {
    id: 'date-78',
    title: 'Herfstwandeling met warme chocolademelk',
    description:
      'Wandel door een bos vol herfstkleuren en trap door de gevallen bladeren. Neem een thermosfles warme chocolademelk mee en geniet van het seizoen.',
    budget: 'gratis',
    duration: 'halve-dag',
    setting: 'buiten',
    season: 'herfst',
    kidFriendly: true,
    category: 'ontspannen',
  },
  {
    id: 'date-79',
    title: 'Lente picknick',
    description:
      'Zoek een plek waar de eerste bloemen bloeien en spreid een kleed uit. Neem verse broodjes, fruit en sap mee en geniet van het nieuwe seizoen.',
    budget: 'goedkoop',
    duration: 'halve-dag',
    setting: 'buiten',
    season: 'lente',
    kidFriendly: true,
    category: 'ontspannen',
  },
  {
    id: 'date-80',
    title: 'Kerstmarkt bezoeken',
    description:
      'Wandel samen over een kerstmarkt, proef gluhwein en oliebollen en bekijk de kraampjes. De sfeer maakt het al de moeite waard.',
    budget: 'goedkoop',
    duration: 'halve-dag',
    setting: 'uit',
    season: 'winter',
    kidFriendly: true,
    category: 'sociaal',
  },
  // === GRATIS / 1-UUR / UIT ===
  {
    id: 'date-81',
    title: 'Gratis stadswandeling',
    description:
      'Veel steden bieden gratis rondleidingen aan. Sluit je aan bij een groep en ontdek verborgen verhalen over jullie eigen stad.',
    budget: 'gratis',
    duration: '1-uur',
    setting: 'uit',
    season: 'altijd',
    category: 'avontuurlijk',
  },
  {
    id: 'date-82',
    title: 'Open podium bezoeken',
    description:
      'Zoek een cafe of theater met een open podium en geniet van onbekende muzikanten, dichters of comedians. Elke avond is anders.',
    budget: 'gratis',
    duration: '1-uur',
    setting: 'uit',
    season: 'altijd',
    category: 'sociaal',
  },
  {
    id: 'date-83',
    title: 'Gratis museum op zondag',
    description:
      'Veel musea hebben gratis avonden of dagen. Check welke musea in jullie buurt dit aanbieden en plan een bezoek.',
    budget: 'gratis',
    duration: '1-uur',
    setting: 'uit',
    season: 'altijd',
    category: 'creatief',
  },
  {
    id: 'date-84',
    title: 'Kerkje of kapel bezoeken',
    description:
      'Ga samen een bijzonder kerkje of kapel binnen. Geniet van de stilte, de architectuur en het gevoel van rust.',
    budget: 'gratis',
    duration: '1-uur',
    setting: 'uit',
    season: 'altijd',
    category: 'ontspannen',
  },
  {
    id: 'date-85',
    title: 'Window shopping avond',
    description:
      'Loop samen langs de etalages in de binnenstad en vertel elkaar wat je zou kopen als geld geen rol speelde.',
    budget: 'gratis',
    duration: '1-uur',
    setting: 'uit',
    season: 'altijd',
    category: 'romantisch',
  },
  {
    id: 'date-86',
    title: 'Openbare bibliotheek verkennen',
    description:
      'Breng een uurtje door in de bibliotheek. Zoek boeken voor elkaar uit en lees samen in een rustig hoekje.',
    budget: 'gratis',
    duration: '1-uur',
    setting: 'uit',
    season: 'altijd',
    category: 'ontspannen',
  },
  // === GRATIS / HALVE-DAG / THUIS ===
  {
    id: 'date-87',
    title: 'Filmmarathon',
    description:
      'Kies een filmreeks en kijk meerdere delen achter elkaar. Maak popcorn, dim de lichten en maak er een echte bioscoopervaring van.',
    budget: 'gratis',
    duration: 'halve-dag',
    setting: 'thuis',
    season: 'winter',
    category: 'ontspannen',
  },
  {
    id: 'date-88',
    title: 'Grote schoonmaak als team',
    description:
      'Pak samen een kamer aan die al lang opgeruimd moet worden. Zet goede muziek op en maak er een uitdaging van. Het resultaat geeft voldoening.',
    budget: 'gratis',
    duration: 'halve-dag',
    setting: 'thuis',
    kidFriendly: true,
    category: 'sociaal',
  },
  {
    id: 'date-89',
    title: 'Samen een taal leren',
    description:
      'Kies een taal die jullie allebei willen leren en volg gratis lessen online. Oefen met elkaar en lach om de uitspraak.',
    budget: 'gratis',
    duration: 'halve-dag',
    setting: 'thuis',
    season: 'altijd',
    category: 'creatief',
  },
  {
    id: 'date-90',
    title: 'Documentairemarathon',
    description:
      'Kies een onderwerp dat jullie boeit en kijk meerdere documentaires achter elkaar. Bespreek tussendoor wat jullie raakt.',
    budget: 'gratis',
    duration: 'halve-dag',
    setting: 'thuis',
    season: 'altijd',
    category: 'ontspannen',
  },
  {
    id: 'date-91',
    title: 'Inrichting herschikken',
    description:
      'Verplaats meubels en geef een kamer een compleet nieuwe uitstraling. Experimenteer met opstelling en kijk wat het beste voelt.',
    budget: 'gratis',
    duration: 'halve-dag',
    setting: 'thuis',
    season: 'altijd',
    kidFriendly: true,
    category: 'creatief',
  },
  {
    id: 'date-92',
    title: 'Kookwedstrijd thuis',
    description:
      'Gebruik dezelfde ingredienten en maak allebei een eigen gerecht. Proef blind en kies de winnaar. De verliezer doet de afwas.',
    budget: 'gratis',
    duration: 'halve-dag',
    setting: 'thuis',
    season: 'altijd',
    kidFriendly: true,
    category: 'avontuurlijk',
  },
  // === GRATIS / HALVE-DAG / UIT (2 extra) ===
  {
    id: 'date-93',
    title: 'Gratis festival bezoeken',
    description:
      'Zoek een gratis festival in de buurt: muziek, kunst of food. Loop rond, geniet van de sfeer en ontdek nieuwe dingen.',
    budget: 'gratis',
    duration: 'halve-dag',
    setting: 'uit',
    season: 'zomer',
    category: 'sociaal',
  },
  {
    id: 'date-94',
    title: 'Open monumentendag',
    description:
      'Tijdens Open Monumentendag kun je gratis bijzondere gebouwen bezoeken. Plan een route langs de mooiste locaties in jullie regio.',
    budget: 'gratis',
    duration: 'halve-dag',
    setting: 'uit',
    season: 'herfst',
    category: 'avontuurlijk',
  },
  // === GRATIS / HELE-DAG / THUIS ===
  {
    id: 'date-95',
    title: 'Seriemarathon',
    description:
      'Begin samen aan een nieuwe serie en kijk een heel seizoen op een dag. Kook tussendoor en maak het extra gezellig.',
    budget: 'gratis',
    duration: 'hele-dag',
    setting: 'thuis',
    season: 'winter',
    category: 'ontspannen',
  },
  {
    id: 'date-96',
    title: 'Opruimdag en herinneringen ophalen',
    description:
      'Ga samen door oude spullen, dozen en kasten. Haal herinneringen op bij alles wat je vindt en beslis samen wat blijft en wat weggaat.',
    budget: 'gratis',
    duration: 'hele-dag',
    setting: 'thuis',
    season: 'altijd',
    category: 'ontspannen',
  },
  {
    id: 'date-97',
    title: 'DIY-dag: pimp je huis',
    description:
      'Gebruik materialen die je al hebt om iets nieuws te maken voor in huis. Schilder een muur, maak een collage of bouw een schap van restjes hout.',
    budget: 'gratis',
    duration: 'hele-dag',
    setting: 'thuis',
    season: 'altijd',
    kidFriendly: true,
    category: 'creatief',
  },
  {
    id: 'date-98',
    title: 'Samen een online cursus volgen',
    description:
      'Kies een gratis online cursus over een onderwerp dat jullie allebei boeit. Volg de modules samen en wissel ideeën uit.',
    budget: 'gratis',
    duration: 'hele-dag',
    setting: 'thuis',
    season: 'altijd',
    category: 'creatief',
  },
  {
    id: 'date-99',
    title: 'Mega-bordspellendag',
    description:
      'Haal alle bordspellen uit de kast en speel ze een voor een. Houd een scorebord bij en kroon aan het eind de kampioen.',
    budget: 'gratis',
    duration: 'hele-dag',
    setting: 'thuis',
    season: 'altijd',
    kidFriendly: true,
    category: 'sociaal',
  },
  {
    id: 'date-100',
    title: 'Fotoboek maken van jullie relatie',
    description:
      'Verzamel digitale fotos van jullie hele relatie en maak er samen een online fotoboek van. Kies de mooiste momenten en schrijf er teksten bij.',
    budget: 'gratis',
    duration: 'hele-dag',
    setting: 'thuis',
    season: 'altijd',
    category: 'romantisch',
  },
  // === GRATIS / HELE-DAG / BUITEN (5 extra) ===
  {
    id: 'date-101',
    title: 'Dagwandeling in een natuurgebied',
    description:
      'Kies een uitdagende wandelroute in een nationaal park of natuurgebied. Neem boterhammen mee en maak er een hele dag van.',
    budget: 'gratis',
    duration: 'hele-dag',
    setting: 'buiten',
    season: 'altijd',
    kidFriendly: true,
    category: 'avontuurlijk',
  },
  {
    id: 'date-102',
    title: 'Zwemmen in een natuurplas',
    description:
      'Zoek een mooie zwemplas op en breng er de hele dag door. Neem een picknick mee en wissel af tussen zwemmen en zonnen.',
    budget: 'gratis',
    duration: 'hele-dag',
    setting: 'buiten',
    season: 'zomer',
    kidFriendly: true,
    category: 'ontspannen',
  },
  {
    id: 'date-103',
    title: 'Fietsen langs de rivier',
    description:
      'Volg een hele dag een rivier per fiets. Stop onderweg voor pauzes op mooie plekken langs het water.',
    budget: 'gratis',
    duration: 'hele-dag',
    setting: 'buiten',
    season: 'lente',
    kidFriendly: true,
    category: 'avontuurlijk',
  },
  {
    id: 'date-104',
    title: 'Vogelspotten',
    description:
      'Ga naar een vogelkijkhut of natuurgebied en probeer zo veel mogelijk soorten te spotten. Neem een verrekijker en vogelgids mee.',
    budget: 'gratis',
    duration: 'hele-dag',
    setting: 'buiten',
    season: 'lente',
    kidFriendly: true,
    category: 'ontspannen',
  },
  {
    id: 'date-105',
    title: 'Kamperen in de achtertuin',
    description:
      'Zet een tent op in de tuin en breng de nacht buiten door. Maak een kampvuur als het kan, kijk naar de sterren en slaap in de buitenlucht.',
    budget: 'gratis',
    duration: 'hele-dag',
    setting: 'buiten',
    season: 'zomer',
    kidFriendly: true,
    category: 'avontuurlijk',
  },
  // === GRATIS / HELE-DAG / UIT ===
  {
    id: 'date-106',
    title: 'Stadsverkenning als toerist',
    description:
      'Doe alsof jullie toeristen zijn in je eigen stad. Bezoek alle bezienswaardigheden, maak fotos en eet ergens een ijsje.',
    budget: 'gratis',
    duration: 'hele-dag',
    setting: 'uit',
    season: 'altijd',
    kidFriendly: true,
    category: 'avontuurlijk',
  },
  {
    id: 'date-107',
    title: 'Vrijwilligersdag samen',
    description:
      'Meld je aan voor een dag vrijwilligerswerk: een opruimactie in de natuur, helpen bij een evenement of koken voor anderen.',
    budget: 'gratis',
    duration: 'hele-dag',
    setting: 'uit',
    season: 'altijd',
    category: 'sociaal',
  },
  {
    id: 'date-108',
    title: 'Gratis workshops op een markt',
    description:
      'Veel markten en evenementen bieden gratis workshops aan. Loop langs de kraampjes en doe mee waar jullie zin in hebben.',
    budget: 'gratis',
    duration: 'hele-dag',
    setting: 'uit',
    season: 'zomer',
    category: 'creatief',
  },
  {
    id: 'date-109',
    title: 'Museumkaart-dag',
    description:
      'Bezoek met een museumkaart meerdere gratis musea op een dag. Maak er een culturele marathon van en lunch tussendoor in een parkje.',
    budget: 'gratis',
    duration: 'hele-dag',
    setting: 'uit',
    season: 'altijd',
    category: 'creatief',
  },
  {
    id: 'date-110',
    title: 'Openluchtconcert of theater',
    description:
      'In de zomer zijn er veel gratis openluchtconcerten en theatervoorstellingen. Neem een kleed mee en geniet van cultuur onder de blote hemel.',
    budget: 'gratis',
    duration: 'hele-dag',
    setting: 'uit',
    season: 'zomer',
    category: 'ontspannen',
  },
  {
    id: 'date-111',
    title: 'Braderie of rommelmarkt bezoeken',
    description:
      'Loop samen over een braderie of rommelmarkt. Zoek naar schatten, proef de lokale hapjes en geniet van de drukte.',
    budget: 'gratis',
    duration: 'hele-dag',
    setting: 'uit',
    season: 'zomer',
    kidFriendly: true,
    category: 'sociaal',
  },
  // === GOEDKOOP / 1-UUR / BUITEN ===
  {
    id: 'date-112',
    title: 'IJsje eten bij zonsondergang',
    description:
      'Koop een ijsje bij een ijssalon en ga samen op een bankje zitten met uitzicht. Simpel, maar heerlijk.',
    budget: 'goedkoop',
    duration: '1-uur',
    setting: 'buiten',
    season: 'zomer',
    kidFriendly: true,
    category: 'romantisch',
  },
  {
    id: 'date-113',
    title: 'Vlieger oplaten',
    description:
      'Koop een vlieger en ga naar een open veld of het strand. Probeer hem zo hoog mogelijk te krijgen en geniet van de wind.',
    budget: 'goedkoop',
    duration: '1-uur',
    setting: 'buiten',
    season: 'herfst',
    kidFriendly: true,
    category: 'avontuurlijk',
  },
  {
    id: 'date-114',
    title: 'Jeu de boules in het park',
    description:
      'Neem een jeu-de-boulesset mee naar het park en speel een paar potjes. Simpel, ontspannen en perfect voor een zomerse avond.',
    budget: 'goedkoop',
    duration: '1-uur',
    setting: 'buiten',
    season: 'zomer',
    kidFriendly: true,
    category: 'ontspannen',
  },
  {
    id: 'date-115',
    title: 'Picknicken aan het water',
    description:
      'Koop wat broodjes en fruit en ga samen aan een meer, rivier of kanaal zitten. Voeten in het water en nergens naartoe hoeven.',
    budget: 'goedkoop',
    duration: '1-uur',
    setting: 'buiten',
    season: 'zomer',
    kidFriendly: true,
    category: 'ontspannen',
  },
  {
    id: 'date-116',
    title: 'Eendjes voeren bij de vijver',
    description:
      'Koop geschikt eendenvoer en ga samen naar een vijver. Voer de eendjes en geniet van de rust. Simpel en ontspannend.',
    budget: 'goedkoop',
    duration: '1-uur',
    setting: 'buiten',
    season: 'altijd',
    kidFriendly: true,
    category: 'ontspannen',
  },
  {
    id: 'date-117',
    title: 'Frisbee of badminton in het park',
    description:
      'Pak een frisbee of badmintonset en ga naar het park. Lekker bewegen in de buitenlucht zonder sportschool.',
    budget: 'goedkoop',
    duration: '1-uur',
    setting: 'buiten',
    season: 'zomer',
    kidFriendly: true,
    category: 'avontuurlijk',
  },
  // === GOEDKOOP / HELE-DAG / THUIS ===
  {
    id: 'date-118',
    title: 'Samen een meubelstuk opknappen',
    description:
      'Koop een pot verf en geef een oud meubelstuk een nieuw leven. Schuren, verven en bewonderen - samen is het leuker.',
    budget: 'goedkoop',
    duration: 'hele-dag',
    setting: 'thuis',
    season: 'altijd',
    category: 'creatief',
  },
  {
    id: 'date-119',
    title: 'Kookdag: maaltijden voorbereiden',
    description:
      'Koop ingredienten voor een hele week en kook samen meerdere maaltijden. Zet muziek op en maak er een gezellige kookdag van.',
    budget: 'goedkoop',
    duration: 'hele-dag',
    setting: 'thuis',
    season: 'altijd',
    kidFriendly: true,
    category: 'creatief',
  },
  {
    id: 'date-120',
    title: 'Homebrew bierdag',
    description:
      'Koop een startersset voor bier brouwen en maak samen jullie eerste batch. Het duurt een dag, maar het resultaat is uniek.',
    budget: 'goedkoop',
    duration: 'hele-dag',
    setting: 'thuis',
    season: 'altijd',
    kidFriendly: false,
    category: 'creatief',
  },
  {
    id: 'date-121',
    title: 'Tuin- of balkonproject',
    description:
      'Koop plantjes, aarde en potten en maak van jullie tuin of balkon een groene oase. Plan, plant en geniet van het resultaat.',
    budget: 'goedkoop',
    duration: 'hele-dag',
    setting: 'thuis',
    season: 'lente',
    kidFriendly: true,
    category: 'creatief',
  },
  {
    id: 'date-122',
    title: 'Bakmarathon',
    description:
      'Bak een hele dag lang: brood, taart, koekjes en meer. Vul het huis met heerlijke geuren en deel de resultaten met de buren.',
    budget: 'goedkoop',
    duration: 'hele-dag',
    setting: 'thuis',
    season: 'winter',
    kidFriendly: true,
    category: 'creatief',
  },
  {
    id: 'date-123',
    title: 'Gamendag',
    description:
      'Koop een nieuw videospel of haal een klassieker tevoorschijn en speel samen de hele dag. Bestel pizza voor de lunch.',
    budget: 'goedkoop',
    duration: 'hele-dag',
    setting: 'thuis',
    season: 'altijd',
    kidFriendly: true,
    category: 'ontspannen',
  },
  // === GOEDKOOP / HELE-DAG / BUITEN (6 extra) ===
  {
    id: 'date-124',
    title: 'Dagje vissen',
    description:
      'Koop aas, pak de hengels in en zoek een rustig plekje aan het water. Het gaat niet om de vangst, maar om de rust samen.',
    budget: 'goedkoop',
    duration: 'hele-dag',
    setting: 'buiten',
    season: 'zomer',
    kidFriendly: true,
    category: 'ontspannen',
  },
  {
    id: 'date-125',
    title: 'Mountainbiken in het bos',
    description:
      'Huur of pak de mountainbikes en zoek een route door het bos. Modder en heuvels maken het extra spannend.',
    budget: 'goedkoop',
    duration: 'hele-dag',
    setting: 'buiten',
    season: 'altijd',
    category: 'avontuurlijk',
  },
  {
    id: 'date-126',
    title: 'Kamperen bij een boerderij',
    description:
      'Boek een goedkope kampeerplek bij een boerderij en breng een nacht door in de natuur. Simpel, rustig en romantisch.',
    budget: 'goedkoop',
    duration: 'hele-dag',
    setting: 'buiten',
    season: 'zomer',
    kidFriendly: true,
    category: 'avontuurlijk',
  },
  {
    id: 'date-127',
    title: 'Wandelpicknick langs een langeafstandspad',
    description:
      'Kies een etappe van een langeafstandspad en loop die samen uit. Neem een picknick mee en lunch onderweg op een mooie plek.',
    budget: 'goedkoop',
    duration: 'hele-dag',
    setting: 'buiten',
    season: 'lente',
    kidFriendly: true,
    category: 'avontuurlijk',
  },
  {
    id: 'date-128',
    title: 'Sneeuwdag',
    description:
      'Als het sneeuwt: ga eropuit. Bouw een sneeuwpop, maak een sneeuwengel en gooi sneeuwballen. Sluit af met warme chocomel.',
    budget: 'goedkoop',
    duration: 'hele-dag',
    setting: 'buiten',
    season: 'winter',
    kidFriendly: true,
    category: 'avontuurlijk',
  },
  {
    id: 'date-129',
    title: 'Strandjutten',
    description:
      'Loop een hele dag langs het strand en zoek naar schelpen, zeegeweide dingen en bijzondere stenen. Maak er thuis iets moois van.',
    budget: 'goedkoop',
    duration: 'hele-dag',
    setting: 'buiten',
    season: 'herfst',
    kidFriendly: true,
    category: 'creatief',
  },
  // === GOEDKOOP / HELE-DAG / UIT (4 extra) ===
  {
    id: 'date-130',
    title: 'Dagje dierentuin',
    description:
      'Bezoek een dierentuin en neem de tijd om bij elk dier stil te staan. Neem een lunchpakket mee om kosten te besparen.',
    budget: 'goedkoop',
    duration: 'hele-dag',
    setting: 'uit',
    season: 'altijd',
    kidFriendly: true,
    category: 'ontspannen',
  },
  {
    id: 'date-131',
    title: 'Dagje naar een nieuw stadje',
    description:
      'Kies een klein stadje dat jullie niet kennen en breng er de dag door. Loop rond, eet ergens en ontdek verborgen pareltjes.',
    budget: 'goedkoop',
    duration: 'hele-dag',
    setting: 'uit',
    season: 'altijd',
    category: 'avontuurlijk',
  },
  {
    id: 'date-132',
    title: 'Vlooienmarkt hoppen',
    description:
      'Bezoek meerdere vlooienmarkten of kringloopwinkels op een dag. Zoek naar bijzondere vondsten en koop iets leuks voor de ander.',
    budget: 'goedkoop',
    duration: 'hele-dag',
    setting: 'uit',
    season: 'altijd',
    kidFriendly: true,
    category: 'avontuurlijk',
  },
  {
    id: 'date-133',
    title: 'Open tuinendag bezoeken',
    description:
      'Bezoek samen open tuinen in de buurt en laat je inspireren door andermans groene creaties. Ideaal als jullie van planten houden.',
    budget: 'goedkoop',
    duration: 'hele-dag',
    setting: 'uit',
    season: 'lente',
    kidFriendly: true,
    category: 'ontspannen',
  },
  {
    id: 'date-134',
    title: 'Dagje pretpark',
    description:
      'Ga naar een pretpark en ga in alle attracties. Schreeuw samen in de achtbaan en win een knuffel bij de kermiskraampjes.',
    budget: 'goedkoop',
    duration: 'hele-dag',
    setting: 'uit',
    season: 'zomer',
    kidFriendly: true,
    category: 'avontuurlijk',
  },
  // === UITGEBREID / 1-UUR / THUIS ===
  {
    id: 'date-135',
    title: 'Thuisproeverij met delicatessen',
    description:
      'Bestel bijzondere kazen, charcuterie en wijn en maak een luxe proeverij thuis. Presenteer alles op mooie plankjes.',
    budget: 'uitgebreid',
    duration: '1-uur',
    setting: 'thuis',
    season: 'altijd',
    kidFriendly: false,
    category: 'romantisch',
  },
  {
    id: 'date-136',
    title: 'Cocktails maken met barkit',
    description:
      'Koop een cocktailset en premium ingredienten en maak thuis professionele cocktails. Volg recepten of experimenteer zelf.',
    budget: 'uitgebreid',
    duration: '1-uur',
    setting: 'thuis',
    season: 'altijd',
    kidFriendly: false,
    category: 'creatief',
  },
  {
    id: 'date-137',
    title: 'Sushi maken met verse vis',
    description:
      'Koop sashimi-kwaliteit vis bij een goede visboer en maak thuis luxe sushi. Investeer in een bamboe matje en noribladen.',
    budget: 'uitgebreid',
    duration: '1-uur',
    setting: 'thuis',
    season: 'altijd',
    category: 'creatief',
  },
  {
    id: 'date-138',
    title: 'Parfum maken',
    description:
      'Bestel een parfummaakset en stel samen jullie eigen geuren samen. Geef elkaars creatie een naam.',
    budget: 'uitgebreid',
    duration: '1-uur',
    setting: 'thuis',
    season: 'altijd',
    kidFriendly: false,
    category: 'creatief',
  },
  {
    id: 'date-139',
    title: 'Luxe fondue-avond',
    description:
      'Koop een mooie kaasfondue- of chocoladefondueset en de beste ingredienten. Geniet van een avond dippen en praten.',
    budget: 'uitgebreid',
    duration: '1-uur',
    setting: 'thuis',
    season: 'winter',
    kidFriendly: true,
    category: 'romantisch',
  },
  {
    id: 'date-140',
    title: 'Online privekookles',
    description:
      'Boek een online kookles bij een professionele chef en kook mee vanuit jullie eigen keuken. Leer nieuwe technieken en eet het resultaat samen op.',
    budget: 'uitgebreid',
    duration: '1-uur',
    setting: 'thuis',
    season: 'altijd',
    category: 'creatief',
  },
  // === UITGEBREID / 1-UUR / BUITEN ===
  {
    id: 'date-141',
    title: 'Paardenkoetsrit',
    description:
      'Boek een ritje in een paardenkoets door een mooi landschap of park. Romantisch en onvergetelijk.',
    budget: 'uitgebreid',
    duration: '1-uur',
    setting: 'buiten',
    season: 'altijd',
    category: 'romantisch',
  },
  {
    id: 'date-142',
    title: 'Rondvaart met privesloep',
    description:
      'Huur een elektrische sloep en vaar samen over de grachten of een meer. Neem wat drinken mee en geniet van het water.',
    budget: 'uitgebreid',
    duration: '1-uur',
    setting: 'buiten',
    season: 'zomer',
    category: 'romantisch',
  },
  {
    id: 'date-143',
    title: 'Segway-tour',
    description:
      'Boek een segway-tour door een stad of natuurgebied. Het is een unieke manier om samen iets nieuws te ontdekken.',
    budget: 'uitgebreid',
    duration: '1-uur',
    setting: 'buiten',
    season: 'altijd',
    kidFriendly: false,
    category: 'avontuurlijk',
  },
  {
    id: 'date-144',
    title: 'Paardrijden op het strand',
    description:
      'Boek een strandrit te paard en galoppeer samen langs de vloedlijn. Een date die je niet snel vergeet.',
    budget: 'uitgebreid',
    duration: '1-uur',
    setting: 'buiten',
    season: 'altijd',
    category: 'avontuurlijk',
  },
  {
    id: 'date-145',
    title: 'Outdoor lasergamen',
    description:
      'Boek een outdoor lasergame-sessie en neem het tegen elkaar op in de natuur. Actief, spannend en hilarisch.',
    budget: 'uitgebreid',
    duration: '1-uur',
    setting: 'buiten',
    season: 'altijd',
    kidFriendly: true,
    category: 'avontuurlijk',
  },
  // === UITGEBREID / 1-UUR / UIT (4 extra) ===
  {
    id: 'date-146',
    title: 'Cocktailbar met uitzicht',
    description:
      'Bezoek een rooftopbar of cocktailbar met een mooi uitzicht. Bestel iets bijzonders en geniet van de sfeer.',
    budget: 'uitgebreid',
    duration: '1-uur',
    setting: 'uit',
    season: 'altijd',
    kidFriendly: false,
    category: 'romantisch',
  },
  {
    id: 'date-147',
    title: 'VR-experience',
    description:
      'Ga naar een VR-arcade en beleef samen een virtueel avontuur. Van achtbanen tot onderwaterwerelden - alles is mogelijk.',
    budget: 'uitgebreid',
    duration: '1-uur',
    setting: 'uit',
    season: 'altijd',
    kidFriendly: true,
    category: 'avontuurlijk',
  },
  {
    id: 'date-148',
    title: 'Wijnbar met proeverij',
    description:
      'Ga naar een wijnbar die proeverijen aanbiedt. Leer samen over druivensoorten terwijl jullie de wijnen proberen.',
    budget: 'uitgebreid',
    duration: '1-uur',
    setting: 'uit',
    season: 'altijd',
    kidFriendly: false,
    category: 'ontspannen',
  },
  {
    id: 'date-149',
    title: 'Improvisatietheater bezoeken',
    description:
      'Ga naar een improvisatietheatershow en lach je een avond lang suf. De interactie met het publiek maakt het extra leuk.',
    budget: 'uitgebreid',
    duration: '1-uur',
    setting: 'uit',
    season: 'altijd',
    category: 'sociaal',
  },
  // === UITGEBREID / HALVE-DAG / THUIS ===
  {
    id: 'date-150',
    title: 'Privechef aan huis',
    description:
      'Boek een privechef die bij jullie thuis een meergangenmenu bereidt. Jullie hoeven alleen maar te genieten.',
    budget: 'uitgebreid',
    duration: 'halve-dag',
    setting: 'thuis',
    season: 'altijd',
    kidFriendly: false,
    category: 'romantisch',
  },
  {
    id: 'date-151',
    title: 'Luxe spa-ervaring thuis',
    description:
      'Bestel professionele verzorgingsproducten, badbommen en een massageoliesset. Maak van jullie badkamer een echte spa met handdoekverwarmer en al.',
    budget: 'uitgebreid',
    duration: 'halve-dag',
    setting: 'thuis',
    season: 'winter',
    kidFriendly: false,
    category: 'ontspannen',
  },
  {
    id: 'date-152',
    title: 'Whisky- of ginproeverij thuis',
    description:
      'Koop vijf tot zes bijzondere whisky- of ginsoorten en organiseer een thuisproeverij. Gebruik proefnotities en rate elke soort.',
    budget: 'uitgebreid',
    duration: 'halve-dag',
    setting: 'thuis',
    season: 'altijd',
    kidFriendly: false,
    category: 'ontspannen',
  },
  {
    id: 'date-153',
    title: 'Samen kunst kopen en ophangen',
    description:
      'Koop samen een kunstwerk online of bij een galerie en hang het die middag op. Bespreek wat jullie mooi vinden en waarom.',
    budget: 'uitgebreid',
    duration: 'halve-dag',
    setting: 'thuis',
    season: 'altijd',
    category: 'creatief',
  },
  {
    id: 'date-154',
    title: 'High tea thuis',
    description:
      'Bestel een luxe high-tea-pakket en dek de tafel met mooi servies. Geniet van scones, sandwiches en thee alsof jullie in een hotel zitten.',
    budget: 'uitgebreid',
    duration: 'halve-dag',
    setting: 'thuis',
    season: 'altijd',
    kidFriendly: true,
    category: 'romantisch',
  },
  {
    id: 'date-155',
    title: 'Gamesetup upgraden en spelen',
    description:
      'Koop een nieuw spel of accessoire voor jullie setup en speel samen de hele middag. Maak er een echt evenement van met snacks.',
    budget: 'uitgebreid',
    duration: 'halve-dag',
    setting: 'thuis',
    season: 'altijd',
    kidFriendly: true,
    category: 'ontspannen',
  },
  // === UITGEBREID / HALVE-DAG / BUITEN ===
  {
    id: 'date-156',
    title: 'Ballonvaart',
    description:
      'Boek een ballonvaart en zweef samen over het landschap. Een onvergetelijke ervaring met adembenemend uitzicht.',
    budget: 'uitgebreid',
    duration: 'halve-dag',
    setting: 'buiten',
    season: 'zomer',
    kidFriendly: false,
    category: 'avontuurlijk',
  },
  {
    id: 'date-157',
    title: 'Zeilboot huren',
    description:
      'Huur een kleine zeilboot en ga samen het water op. Leer zeilen of geniet simpelweg van de wind en de golven.',
    budget: 'uitgebreid',
    duration: 'halve-dag',
    setting: 'buiten',
    season: 'zomer',
    category: 'avontuurlijk',
  },
  {
    id: 'date-158',
    title: 'Solex- of e-chopperroute',
    description:
      'Huur een solex of e-chopper en rij samen een mooie route door het platteland. Stop bij een terras onderweg.',
    budget: 'uitgebreid',
    duration: 'halve-dag',
    setting: 'buiten',
    season: 'zomer',
    kidFriendly: false,
    category: 'avontuurlijk',
  },
  {
    id: 'date-159',
    title: 'Outdoor kookworkshop',
    description:
      'Boek een kookworkshop in de buitenlucht waar jullie leren koken op vuur. Denk aan pizza uit een houtoven of barbecue-technieken.',
    budget: 'uitgebreid',
    duration: 'halve-dag',
    setting: 'buiten',
    season: 'zomer',
    category: 'creatief',
  },
  {
    id: 'date-160',
    title: 'Luxe picknick met bediening',
    description:
      'Boek een luxe picknick die voor jullie wordt ingericht op een mooie locatie. Kussens, champagne en hapjes - jullie hoeven alleen op te komen dagen.',
    budget: 'uitgebreid',
    duration: 'halve-dag',
    setting: 'buiten',
    season: 'lente',
    kidFriendly: false,
    category: 'romantisch',
  },
  {
    id: 'date-161',
    title: 'Duikles of snorkelen',
    description:
      'Boek een introductieduikles of snorkelervaring in een meer of de zee. Ontdek samen de onderwaterwereld.',
    budget: 'uitgebreid',
    duration: 'halve-dag',
    setting: 'buiten',
    season: 'zomer',
    kidFriendly: false,
    category: 'avontuurlijk',
  },
  // === UITGEBREID / HELE-DAG / THUIS ===
  {
    id: 'date-162',
    title: 'Kamer restylen',
    description:
      'Koop nieuwe accessoires, verf of meubels en geef samen een kamer een complete make-over. Van plan tot resultaat op een dag.',
    budget: 'uitgebreid',
    duration: 'hele-dag',
    setting: 'thuis',
    season: 'altijd',
    category: 'creatief',
  },
  {
    id: 'date-163',
    title: 'Gastronomische kookdag',
    description:
      'Koop de beste ingredienten en kook samen een sterrenwaardige maaltijd. Volg een uitgebreid recept van een topchef en neem er de hele dag de tijd voor.',
    budget: 'uitgebreid',
    duration: 'hele-dag',
    setting: 'thuis',
    season: 'altijd',
    category: 'creatief',
  },
  {
    id: 'date-164',
    title: 'Home cinema bouwen',
    description:
      'Koop een projector of upgrade jullie thuisbioscoopervaring. Installeer alles samen, maak popcorn en kijk jullie favoriete film op groot scherm.',
    budget: 'uitgebreid',
    duration: 'hele-dag',
    setting: 'thuis',
    season: 'altijd',
    kidFriendly: true,
    category: 'creatief',
  },
  {
    id: 'date-165',
    title: 'Wijnkelder opzetten',
    description:
      'Koop samen een selectie wijnen bij een wijnhandel en richt een wijnopslag in. Proef een paar flessen en bewaar de rest voor bijzondere momenten.',
    budget: 'uitgebreid',
    duration: 'hele-dag',
    setting: 'thuis',
    season: 'altijd',
    kidFriendly: false,
    category: 'ontspannen',
  },
  {
    id: 'date-166',
    title: 'Samen een aquarium inrichten',
    description:
      'Koop een aquarium, planten en vissen en richt het samen in. Een gezamenlijk project dat jullie huis verrijkt.',
    budget: 'uitgebreid',
    duration: 'hele-dag',
    setting: 'thuis',
    season: 'altijd',
    kidFriendly: true,
    category: 'creatief',
  },
  // === UITGEBREID / HELE-DAG / BUITEN (6 extra) ===
  {
    id: 'date-167',
    title: 'Dagje waterskien of wakeboarden',
    description:
      'Boek een les waterskien of wakeboarden en daag elkaar uit op het water. Adrenaline en lachbuien gegarandeerd.',
    budget: 'uitgebreid',
    duration: 'hele-dag',
    setting: 'buiten',
    season: 'zomer',
    category: 'avontuurlijk',
  },
  {
    id: 'date-168',
    title: 'Dagje surfen',
    description:
      'Boek een surfles aan de kust en leer samen de golven te bedwingen. Val, sta op en probeer het opnieuw.',
    budget: 'uitgebreid',
    duration: 'hele-dag',
    setting: 'buiten',
    season: 'zomer',
    category: 'avontuurlijk',
  },
  {
    id: 'date-169',
    title: 'Glamping-ervaring',
    description:
      'Boek een glamping-tent op een mooie locatie en geniet van luxe kamperen. Kampvuur, sterrenhemel en een comfortabel bed.',
    budget: 'uitgebreid',
    duration: 'hele-dag',
    setting: 'buiten',
    season: 'zomer',
    kidFriendly: true,
    category: 'romantisch',
  },
  {
    id: 'date-170',
    title: 'Boomkroonpad of klimbos',
    description:
      'Ga naar een klimbos of boomkroonpad en klim samen door de boomtoppen. Spannend, actief en een mooie uitdaging.',
    budget: 'uitgebreid',
    duration: 'hele-dag',
    setting: 'buiten',
    season: 'altijd',
    kidFriendly: true,
    category: 'avontuurlijk',
  },
  {
    id: 'date-171',
    title: 'Huifkartocht met lunch',
    description:
      'Boek een huifkartocht door een mooi landschap, inclusief een lunch onderweg. Een bijzondere manier om samen de natuur te beleven.',
    budget: 'uitgebreid',
    duration: 'hele-dag',
    setting: 'buiten',
    season: 'lente',
    kidFriendly: true,
    category: 'avontuurlijk',
  },
  {
    id: 'date-172',
    title: 'Kajakken door een natuurgebied',
    description:
      'Huur een tweepersoonskajak en peddel samen door een rivier of natuurgebied. Neem een lunchpakket mee en stop bij mooie plekken.',
    budget: 'uitgebreid',
    duration: 'hele-dag',
    setting: 'buiten',
    season: 'zomer',
    category: 'avontuurlijk',
  },
  // === UITGEBREID / HELE-DAG / UIT ===
  {
    id: 'date-173',
    title: 'Dagje wellness en spa',
    description:
      'Boek een dagje in een luxe spa met sauna, stoombad en massagebehandelingen. De ultieme ontspanning voor jullie samen.',
    budget: 'uitgebreid',
    duration: 'hele-dag',
    setting: 'uit',
    season: 'altijd',
    kidFriendly: false,
    category: 'ontspannen',
  },
  {
    id: 'date-174',
    title: 'Michelin-restaurant bezoeken',
    description:
      'Reserveer bij een sterrenrestaurant en geniet van een uitgebreide lunch of diner. Kleed je mooi aan en maak er een bijzondere ervaring van.',
    budget: 'uitgebreid',
    duration: 'hele-dag',
    setting: 'uit',
    season: 'altijd',
    kidFriendly: false,
    category: 'romantisch',
  },
  {
    id: 'date-175',
    title: 'Dagje pretpark of attractiepark',
    description:
      'Ga naar een groot pretpark en geniet de hele dag van attracties, shows en lekker eten. Laat je innerlijke kind los.',
    budget: 'uitgebreid',
    duration: 'hele-dag',
    setting: 'uit',
    season: 'zomer',
    kidFriendly: true,
    category: 'avontuurlijk',
  },
  {
    id: 'date-176',
    title: 'Musicalbezoek met diner',
    description:
      'Boek kaartjes voor een musical en combineer het met een diner vooraf. Een avond vol cultuur en goed eten.',
    budget: 'uitgebreid',
    duration: 'hele-dag',
    setting: 'uit',
    season: 'altijd',
    kidFriendly: true,
    category: 'romantisch',
  },
  {
    id: 'date-177',
    title: 'Dagje paintballen',
    description:
      'Boek een paintballsessie en neem het samen op tegen anderen. Strategisch samenwerken en adrenaline op zijn best.',
    budget: 'uitgebreid',
    duration: 'hele-dag',
    setting: 'uit',
    season: 'altijd',
    kidFriendly: false,
    category: 'avontuurlijk',
  },
  {
    id: 'date-178',
    title: 'Citytrip per trein',
    description:
      'Pak de trein naar een stad in de buurt of net over de grens. Bezoek bezienswaardigheden, eet lokaal en kom s avonds weer thuis.',
    budget: 'uitgebreid',
    duration: 'hele-dag',
    setting: 'uit',
    season: 'altijd',
    category: 'avontuurlijk',
  },
  {
    id: 'date-179',
    title: 'Dagje golfen',
    description:
      'Boek een ronde op een golfbaan, ook als jullie beginners zijn. Veel banen bieden introductiepakketten aan met les.',
    budget: 'uitgebreid',
    duration: 'hele-dag',
    setting: 'uit',
    season: 'zomer',
    category: 'ontspannen',
  },
  // === EXTRA: meer variatie in bestaande dunne combinaties ===
  // goedkoop / 1-uur / uit (extra)
  {
    id: 'date-180',
    title: 'Koffie proeven bij een specialty zaak',
    description:
      'Ga naar een specialty koffiebar en probeer samen verschillende bereidingswijzen. Leer het verschil tussen pour-over, aeropress en espresso.',
    budget: 'goedkoop',
    duration: '1-uur',
    setting: 'uit',
    season: 'altijd',
    category: 'ontspannen',
  },
  {
    id: 'date-181',
    title: 'Bioscoop met onbekende film',
    description:
      'Ga naar de bioscoop en kies bewust een film waar jullie niks van weten. Geen trailer, geen reviews - laat je verrassen.',
    budget: 'goedkoop',
    duration: '1-uur',
    setting: 'uit',
    season: 'altijd',
    category: 'avontuurlijk',
  },
  // gratis / 1-uur / buiten (extra)
  {
    id: 'date-182',
    title: 'Blote-voetenpad lopen',
    description:
      'Zoek een blotevoetenpad in de buurt en loop samen over verschillende ondergronden. Het voelt raar maar is heerlijk.',
    budget: 'gratis',
    duration: '1-uur',
    setting: 'buiten',
    season: 'zomer',
    kidFriendly: true,
    category: 'avontuurlijk',
  },
  // gratis / halve-dag / uit (extra)
  {
    id: 'date-183',
    title: 'Straatkunst-tour',
    description:
      'Zoek online naar street art in jullie stad en maak er een wandeling langs. Maak fotos van de mooiste werken.',
    budget: 'gratis',
    duration: 'halve-dag',
    setting: 'uit',
    season: 'altijd',
    category: 'creatief',
  },
  // goedkoop / halve-dag / thuis (extra)
  {
    id: 'date-184',
    title: 'Terrariumworkshop thuis',
    description:
      'Koop glazen potten, aarde, mos en kleine plantjes en maak samen een mini-ecosysteem. Een groen kunstwerk voor in huis.',
    budget: 'goedkoop',
    duration: 'halve-dag',
    setting: 'thuis',
    season: 'altijd',
    kidFriendly: true,
    category: 'creatief',
  },
  // uitgebreid / halve-dag / uit (extra)
  {
    id: 'date-185',
    title: 'Food tour door de stad',
    description:
      'Boek een culinaire tour en proef samen de lekkerste hapjes van verschillende restaurants en kraampjes in de stad.',
    budget: 'uitgebreid',
    duration: 'halve-dag',
    setting: 'uit',
    season: 'altijd',
    category: 'sociaal',
  },
  // gratis / hele-dag / buiten (extra)
  {
    id: 'date-186',
    title: 'Hardlooproute verkennen',
    description:
      'Plan een hele dag rond een lange hardloop- of trailroute in de natuur. Neem het rustig aan, geniet van het landschap en picknick onderweg.',
    budget: 'gratis',
    duration: 'hele-dag',
    setting: 'buiten',
    season: 'altijd',
    category: 'avontuurlijk',
  },
  // goedkoop / halve-dag / buiten (extra)
  {
    id: 'date-187',
    title: 'Bloemen plukken bij een pluktuin',
    description:
      'Ga naar een pluktuin en stel samen een boeket samen. Een kleurrijke en geurende activiteit voor een mooie middag.',
    budget: 'goedkoop',
    duration: 'halve-dag',
    setting: 'buiten',
    season: 'zomer',
    kidFriendly: true,
    category: 'romantisch',
  },
  // goedkoop / 1-uur / thuis (extra om de balans op te krikken)
  {
    id: 'date-188',
    title: 'Blinde wijntest',
    description:
      'Koop een paar betaalbare wijnen, doe ze in zakken en proef blind. Raad het land, de druif en het jaar. Hoe minder jullie weten, hoe leuker.',
    budget: 'goedkoop',
    duration: '1-uur',
    setting: 'thuis',
    season: 'altijd',
    kidFriendly: false,
    category: 'ontspannen',
  },
  // uitgebreid / 1-uur / uit (extra)
  {
    id: 'date-189',
    title: 'Sterrenrestaurant lunchformule',
    description:
      'Veel sterrenrestaurants bieden een betaalbaardere lunchformule aan. Reserveer en geniet van haute cuisine in een ontspannen sfeer.',
    budget: 'uitgebreid',
    duration: '1-uur',
    setting: 'uit',
    season: 'altijd',
    kidFriendly: false,
    category: 'romantisch',
  },
  // gratis / hele-dag / thuis (extra)
  {
    id: 'date-190',
    title: 'Naaien of kleding vermaken',
    description:
      'Pak de naaimachine erbij en maak samen kleding die je al lang wilt vermaken. Of maak iets nieuws van oude stof.',
    budget: 'gratis',
    duration: 'hele-dag',
    setting: 'thuis',
    season: 'altijd',
    category: 'creatief',
  },
  // uitgebreid / hele-dag / uit (extra)
  {
    id: 'date-191',
    title: 'Dagje kartbaan',
    description:
      'Ga naar een kartbaan en race tegen elkaar. Boek meerdere sessies en houd een scorebord bij. De winnaar trakteert op koffie.',
    budget: 'uitgebreid',
    duration: 'hele-dag',
    setting: 'uit',
    season: 'altijd',
    kidFriendly: true,
    category: 'avontuurlijk',
  },
  // goedkoop / hele-dag / uit (extra)
  {
    id: 'date-192',
    title: 'Dagje naar het buitenland',
    description:
      'Woon je dicht bij de grens? Rij naar Belgie of Duitsland en beleef een dagje buitenland. Andere sfeer, andere snacks, andere taal.',
    budget: 'goedkoop',
    duration: 'hele-dag',
    setting: 'uit',
    season: 'altijd',
    category: 'avontuurlijk',
  },
  // gratis / hele-dag / uit (extra)
  {
    id: 'date-193',
    title: 'Dagje wandelen met OV',
    description:
      'Pak de trein naar het beginpunt van een mooie wandelroute en loop naar het volgende station. Geen auto nodig, wel avontuur.',
    budget: 'gratis',
    duration: 'hele-dag',
    setting: 'uit',
    season: 'altijd',
    kidFriendly: true,
    category: 'avontuurlijk',
  },
  // uitgebreid / halve-dag / buiten (extra)
  {
    id: 'date-194',
    title: 'Paragliden of parachutespringen',
    description:
      'Boek een tandemvlucht en ervaar samen de ultieme adrenalinekick. Een onvergetelijk avontuur hoog boven het landschap.',
    budget: 'uitgebreid',
    duration: 'halve-dag',
    setting: 'buiten',
    season: 'zomer',
    kidFriendly: false,
    category: 'avontuurlijk',
  },
  // uitgebreid / hele-dag / thuis (extra)
  {
    id: 'date-195',
    title: 'Kunstworkshop aan huis',
    description:
      'Boek een kunstenaar die bij jullie thuis een schilderworkshop geeft. Leer technieken en maak samen een kunstwerk.',
    budget: 'uitgebreid',
    duration: 'hele-dag',
    setting: 'thuis',
    season: 'altijd',
    category: 'creatief',
  },
  // goedkoop / hele-dag / buiten (extra)
  {
    id: 'date-196',
    title: 'Lange fietstocht met picknick',
    description:
      'Plan een fietstocht van 50 km of meer door afwisselend landschap. Stop halverwege voor een picknick en geniet van de rit.',
    budget: 'goedkoop',
    duration: 'hele-dag',
    setting: 'buiten',
    season: 'lente',
    kidFriendly: false,
    category: 'avontuurlijk',
  },
  // goedkoop / 1-uur / buiten (extra)
  {
    id: 'date-197',
    title: 'Avondwandeling met streetfood',
    description:
      'Koop onderweg een snack bij een kraam of foodtruck en wandel samen door de avond. Simpel, lekker en gezellig.',
    budget: 'goedkoop',
    duration: '1-uur',
    setting: 'buiten',
    season: 'altijd',
    category: 'ontspannen',
  },
  // uitgebreid / hele-dag / buiten (extra)
  {
    id: 'date-198',
    title: 'Quad rijden door de natuur',
    description:
      'Huur een quad en rij samen over onverharde paden door bossen en velden. Vuil worden hoort erbij.',
    budget: 'uitgebreid',
    duration: 'hele-dag',
    setting: 'buiten',
    season: 'altijd',
    category: 'avontuurlijk',
  },
  // gratis / hele-dag / buiten (extra)
  {
    id: 'date-199',
    title: 'Overnachten onder de sterren',
    description:
      'Slaap een nacht buiten zonder tent, alleen met slaapzakken en een matje. Kijk naar de sterren en luister naar de natuur om je heen.',
    budget: 'gratis',
    duration: 'hele-dag',
    setting: 'buiten',
    season: 'zomer',
    kidFriendly: false,
    category: 'romantisch',
  },
  // uitgebreid / hele-dag / uit (extra)
  {
    id: 'date-200',
    title: 'Dagje races of motorsport',
    description:
      'Bezoek een racedag op een circuit. Het geluid, de snelheid en de spanning maken het een bijzondere ervaring.',
    budget: 'uitgebreid',
    duration: 'hele-dag',
    setting: 'uit',
    season: 'zomer',
    category: 'avontuurlijk',
  },
];
