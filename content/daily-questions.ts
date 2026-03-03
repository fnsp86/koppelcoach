export type DailyQuestion = {
  id: string;
  text: string;
  category: string;
  followUp?: string;
};

export const dailyQuestions: DailyQuestion[] = [
  // ============================================================
  // COMMUNICATIE (communication)
  // ============================================================
  {
    id: "dq-001",
    text: "Wat is iets dat je partner doet waar je nog steeds blij van wordt?",
    category: "communicatie",
    followUp: "Vertel je partner wanneer dit voor het laatst gebeurde.",
  },
  {
    id: "dq-002",
    text: "Wanneer voelde je je het meest gehoord door je partner deze week?",
    category: "communicatie",
  },
  {
    id: "dq-003",
    text: "Welk compliment zou je je partner vandaag willen geven?",
    category: "communicatie",
    followUp: "Geef het compliment nu hardop aan je partner.",
  },
  {
    id: "dq-004",
    text: "Op welk moment van de dag praten jullie het makkelijkst met elkaar?",
    category: "communicatie",
  },
  {
    id: "dq-005",
    text: "Wat zou je vaker tegen je partner willen zeggen, maar vergeet je steeds?",
    category: "communicatie",
    followUp: "Spreek het nu uit. Wat weerhoudt je er normaal van?",
  },
  {
    id: "dq-006",
    text: "Hoe merk je dat je partner echt naar je luistert?",
    category: "communicatie",
  },
  {
    id: "dq-007",
    text: "Wat is het beste gesprek dat jullie de afgelopen maand hebben gehad?",
    category: "communicatie",
  },
  {
    id: "dq-008",
    text: "Als je partner je iets moeilijks wil vertellen, hoe kan die dat het beste aanpakken?",
    category: "communicatie",
    followUp: "Vraag je partner of dit herkenbaar is.",
  },
  {
    id: "dq-009",
    text: "Welk onderwerp vermijden jullie weleens, terwijl het goed zou zijn om erover te praten?",
    category: "communicatie",
  },
  {
    id: "dq-010",
    text: "Wat is de fijnste manier waarop je partner je een slecht-nieuwsgesprek kan brengen?",
    category: "communicatie",
  },
  {
    id: "dq-011",
    text: "Wanneer voel je je het meest vrij om eerlijk te zijn tegen je partner?",
    category: "communicatie",
  },
  {
    id: "dq-012",
    text: "Wat heb je de afgelopen tijd geleerd over hoe je partner communiceert?",
    category: "communicatie",
    followUp: "Deel dit met je partner en vraag of het klopt.",
  },
  {
    id: "dq-013",
    text: "Hoe zou je het gesprek omschrijven dat jullie relatie het meest heeft versterkt?",
    category: "communicatie",
  },
  {
    id: "dq-014",
    text: "Welke vraag zou je partner vaker aan je mogen stellen?",
    category: "communicatie",
  },
  {
    id: "dq-015",
    text: "Op welke manier laat je partner merken dat die om je geeft, zonder woorden te gebruiken?",
    category: "communicatie",
    followUp: "Herken je dit bij jezelf ook? Hoe laat jij het zien zonder woorden?",
  },

  // ============================================================
  // INTIMITEIT (emotional intimacy)
  // ============================================================
  {
    id: "dq-016",
    text: "Wanneer voelde je je het meest verbonden met je partner deze week?",
    category: "intimiteit",
  },
  {
    id: "dq-017",
    text: "Wat geeft jou het gevoel van thuiskomen bij je partner?",
    category: "intimiteit",
    followUp: "Praat hierover door: wat maakt dit zo belangrijk voor je?",
  },
  {
    id: "dq-018",
    text: "Welk klein gebaar van je partner raakt je het meest?",
    category: "intimiteit",
  },
  {
    id: "dq-019",
    text: "Wanneer voel je je het meest kwetsbaar bij je partner, en voelt dat veilig?",
    category: "intimiteit",
    followUp: "Wat heeft je partner gedaan waardoor die veiligheid er is?",
  },
  {
    id: "dq-020",
    text: "Hoe ziet een perfect moment van samen zijn eruit voor jou?",
    category: "intimiteit",
  },
  {
    id: "dq-021",
    text: "Welke aanraking van je partner maakt je het meest rustig?",
    category: "intimiteit",
  },
  {
    id: "dq-022",
    text: "Wat maakt jullie relatie anders dan alle andere relaties die je kent?",
    category: "intimiteit",
    followUp: "Vraag je partner hoe die dit ervaart.",
  },
  {
    id: "dq-023",
    text: "Wanneer had je voor het laatst het gevoel dat jullie echt op dezelfde golflengte zaten?",
    category: "intimiteit",
  },
  {
    id: "dq-024",
    text: "Wat is iets dat je alleen met je partner deelt en met niemand anders?",
    category: "intimiteit",
  },
  {
    id: "dq-025",
    text: "Hoe wil je het liefst getroost worden als je een slechte dag hebt?",
    category: "intimiteit",
    followUp: "Vraag je partner: hoe kan ik je hierbij helpen?",
  },
  {
    id: "dq-026",
    text: "Welk moment uit jullie relatie zou je willen herbeleven?",
    category: "intimiteit",
  },
  {
    id: "dq-027",
    text: "Wanneer ben je het meest trots dat je bij je partner bent?",
    category: "intimiteit",
  },
  {
    id: "dq-028",
    text: "Wat weet je partner van je dat verder niemand weet?",
    category: "intimiteit",
  },
  {
    id: "dq-029",
    text: "Hoe is de manier waarop jullie intimiteit beleven veranderd door de jaren heen?",
    category: "intimiteit",
    followUp: "Wat vind je van die verandering? Mis je iets, of is er juist iets bij gekomen?",
  },

  // ============================================================
  // DROMEN (dreams/aspirations)
  // ============================================================
  {
    id: "dq-030",
    text: "Welke droom heb je nog niet hardop uitgesproken?",
    category: "dromen",
    followUp: "Wat houdt je tegen om deze droom na te jagen?",
  },
  {
    id: "dq-031",
    text: "Als geld geen rol speelde, wat zou je dan morgen gaan doen?",
    category: "dromen",
  },
  {
    id: "dq-032",
    text: "Welke vaardigheid zou je graag nog willen leren?",
    category: "dromen",
  },
  {
    id: "dq-033",
    text: "Wat is een plek op de wereld die je samen wilt bezoeken, en waarom juist die plek?",
    category: "dromen",
    followUp: "Wat zou de eerste stap zijn om dit echt te plannen?",
  },
  {
    id: "dq-034",
    text: "Hoe ziet jouw ideale dag eruit over tien jaar?",
    category: "dromen",
  },
  {
    id: "dq-035",
    text: "Welk project zou je willen starten als je wist dat het niet kon mislukken?",
    category: "dromen",
  },
  {
    id: "dq-036",
    text: "Als je een jaar vrij zou krijgen, waar zou je het aan besteden?",
    category: "dromen",
    followUp: "Hoe zou je partner in dat jaar passen?",
  },
  {
    id: "dq-037",
    text: "Welke droom van je partner zou je het liefst helpen waarmaken?",
    category: "dromen",
  },
  {
    id: "dq-038",
    text: "Wat wilde je als kind worden, en wat is daarvan overgebleven?",
    category: "dromen",
  },
  {
    id: "dq-039",
    text: "Welke gezamenlijke droom hebben jullie nog niet besproken?",
    category: "dromen",
  },
  {
    id: "dq-040",
    text: "Als je een boek zou schrijven, waar zou het over gaan?",
    category: "dromen",
  },
  {
    id: "dq-041",
    text: "Welk avontuur zou je samen willen beleven voordat jullie oud zijn?",
    category: "dromen",
    followUp: "Maak er samen een plan van. Wat is de eerste stap?",
  },
  {
    id: "dq-042",
    text: "Is er een droom die je hebt losgelaten? Denk je er nog weleens aan?",
    category: "dromen",
  },

  // ============================================================
  // GEZIN (family)
  // ============================================================
  {
    id: "dq-043",
    text: "Welke traditie uit je eigen jeugd zou je graag in jullie gezin willen voortzetten?",
    category: "gezin",
    followUp: "Hoe zou je dit concreet kunnen vormgeven?",
  },
  {
    id: "dq-044",
    text: "Wat heb je van je eigen ouders geleerd over relaties?",
    category: "gezin",
  },
  {
    id: "dq-045",
    text: "Hoe zou je het liefst willen dat jullie gezin over twintig jaar terugkijkt op deze periode?",
    category: "gezin",
  },
  {
    id: "dq-046",
    text: "Welke waarde vind je het belangrijkst om door te geven aan de volgende generatie?",
    category: "gezin",
    followUp: "Hoe laten jullie die waarde nu al zien in het dagelijks leven?",
  },
  {
    id: "dq-047",
    text: "Wat vind je het moeilijkst aan het combineren van jullie beide families?",
    category: "gezin",
  },
  {
    id: "dq-048",
    text: "Welk familieritueel maakt je het meest gelukkig?",
    category: "gezin",
  },
  {
    id: "dq-049",
    text: "Hoe verdelen jullie de zorgtaken, en ben je daar tevreden mee?",
    category: "gezin",
  },
  {
    id: "dq-050",
    text: "Wat waardeer je het meest in hoe je partner omgaat met jullie familie?",
    category: "gezin",
    followUp: "Vertel dit ook aan je partner.",
  },
  {
    id: "dq-051",
    text: "Welk familieverhaal vertellen jullie het vaakst aan anderen?",
    category: "gezin",
  },
  {
    id: "dq-052",
    text: "Hoe zorgen jullie ervoor dat je als koppel niet verdwijnt in de drukte van het gezinsleven?",
    category: "gezin",
  },
  {
    id: "dq-053",
    text: "Welke les uit je eigen opvoeding wil je bewust anders doen?",
    category: "gezin",
  },
  {
    id: "dq-054",
    text: "Wat is het grappigste dat er ooit in jullie familie is gebeurd?",
    category: "gezin",
  },
  {
    id: "dq-055",
    text: "Hoe ga je om met verwachtingen van je schoonfamilie?",
    category: "gezin",
    followUp: "Bespreek samen: hoe kunnen jullie elkaar hierin steunen?",
  },

  // ============================================================
  // GELD (money/finances)
  // ============================================================
  {
    id: "dq-056",
    text: "Wat heb je van je ouders geleerd over geld?",
    category: "geld",
  },
  {
    id: "dq-057",
    text: "Waar geef je het liefst geld aan uit, en waarom?",
    category: "geld",
    followUp: "Vraag je partner hetzelfde en vergelijk jullie antwoorden.",
  },
  {
    id: "dq-058",
    text: "Hoe zou je jullie financiele situatie over vijf jaar willen zien?",
    category: "geld",
  },
  {
    id: "dq-059",
    text: "Welke uitgave uit het afgelopen jaar heeft je het meest geluk gebracht?",
    category: "geld",
  },
  {
    id: "dq-060",
    text: "Hoe open zijn jullie naar elkaar over geld, en kan dat beter?",
    category: "geld",
  },
  {
    id: "dq-061",
    text: "Wat is een financieel doel waar jullie samen naartoe zouden kunnen werken?",
    category: "geld",
    followUp: "Wat zou een eerste kleine stap zijn?",
  },
  {
    id: "dq-062",
    text: "Wanneer voel je je onzeker over geld, en hoe ga je daarmee om?",
    category: "geld",
  },
  {
    id: "dq-063",
    text: "Hoe vind je de balans tussen sparen en genieten?",
    category: "geld",
  },
  {
    id: "dq-064",
    text: "Welke financiele beslissing zijn jullie het meest blij mee?",
    category: "geld",
  },
  {
    id: "dq-065",
    text: "Wat zou je doen met een onverwachte meevaller van duizend euro?",
    category: "geld",
    followUp: "Wat zou je partner kiezen? Bespreek het verschil.",
  },
  {
    id: "dq-066",
    text: "Hoe bespreek je het liefst grote financiele beslissingen?",
    category: "geld",
  },
  {
    id: "dq-067",
    text: "Welke rol speelt geld in hoe veilig je je voelt?",
    category: "geld",
  },
  {
    id: "dq-068",
    text: "Is er iets dat je graag zou kopen of investeren, maar waar je twijfels over hebt?",
    category: "geld",
  },

  // ============================================================
  // PLEZIER (fun/recreation)
  // ============================================================
  {
    id: "dq-069",
    text: "Wanneer hebben jullie voor het laatst samen echt gelachen?",
    category: "plezier",
  },
  {
    id: "dq-070",
    text: "Welke activiteit zouden jullie vaker samen moeten doen?",
    category: "plezier",
    followUp: "Plan het in. Wanneer zou het kunnen?",
  },
  {
    id: "dq-071",
    text: "Wat is het leukste uitje dat jullie ooit samen hebben gehad?",
    category: "plezier",
  },
  {
    id: "dq-072",
    text: "Welke hobby van je partner vind je stiekem heel leuk om te zien?",
    category: "plezier",
  },
  {
    id: "dq-073",
    text: "Als jullie een hele dag vrij zijn zonder verplichtingen, wat zou je willen doen?",
    category: "plezier",
  },
  {
    id: "dq-074",
    text: "Welk spel of welke activiteit deden jullie vroeger veel samen en nu niet meer?",
    category: "plezier",
    followUp: "Waarom zijn jullie daarmee gestopt? Zouden jullie het weer oppakken?",
  },
  {
    id: "dq-075",
    text: "Hoe zou je ideale weekendochtend eruitzien over vijf jaar?",
    category: "plezier",
  },
  {
    id: "dq-076",
    text: "Wat is iets geks of onverwachts dat jullie samen zouden kunnen proberen?",
    category: "plezier",
  },
  {
    id: "dq-077",
    text: "Welke serie, film of podcast heeft jullie allebei geraakt?",
    category: "plezier",
  },
  {
    id: "dq-078",
    text: "Wat doe je het liefst om te ontspannen na een drukke week?",
    category: "plezier",
  },
  {
    id: "dq-079",
    text: "Welk recept zouden jullie samen eens moeten uitproberen?",
    category: "plezier",
    followUp: "Prik een datum en ga ervoor!",
  },
  {
    id: "dq-080",
    text: "Wat is jullie favoriete manier om een verjaardag te vieren?",
    category: "plezier",
  },
  {
    id: "dq-081",
    text: "Wanneer heb je je partner voor het laatst verrast, en hoe reageerde die?",
    category: "plezier",
  },

  // ============================================================
  // GROEI (personal growth)
  // ============================================================
  {
    id: "dq-082",
    text: "Hoe ben je de afgelopen jaren veranderd als partner?",
    category: "groei",
    followUp: "Vraag je partner wat die gemerkt heeft van die verandering.",
  },
  {
    id: "dq-083",
    text: "Welke eigenschap van jezelf zou je graag verder willen ontwikkelen?",
    category: "groei",
  },
  {
    id: "dq-084",
    text: "Wat heeft je partner je geleerd dat je nergens anders had kunnen leren?",
    category: "groei",
  },
  {
    id: "dq-085",
    text: "Welke uitdaging heeft jullie relatie sterker gemaakt?",
    category: "groei",
    followUp: "Wat hebben jullie daarvan geleerd voor de toekomst?",
  },
  {
    id: "dq-086",
    text: "Waar ben je het meest trots op in je persoonlijke ontwikkeling?",
    category: "groei",
  },
  {
    id: "dq-087",
    text: "Hoe help je je partner om te groeien, en hoe helpt je partner jou?",
    category: "groei",
  },
  {
    id: "dq-088",
    text: "Welk boek, gesprek of ervaring heeft je kijk op relaties veranderd?",
    category: "groei",
  },
  {
    id: "dq-089",
    text: "Wat is een fout die je hebt gemaakt waar je achteraf veel van hebt geleerd?",
    category: "groei",
  },
  {
    id: "dq-090",
    text: "Hoe ga je om met kritiek van je partner?",
    category: "groei",
    followUp: "Is er iets dat je partner anders kan doen bij het geven van feedback?",
  },
  {
    id: "dq-091",
    text: "Welke gewoonte zou je willen veranderen, en wat heb je daarvoor nodig?",
    category: "groei",
  },
  {
    id: "dq-092",
    text: "Hoe is jullie relatie het afgelopen jaar gegroeid?",
    category: "groei",
  },
  {
    id: "dq-093",
    text: "Wat bewonder je in hoe je partner met tegenslagen omgaat?",
    category: "groei",
    followUp: "Vertel dit aan je partner. Dit soort erkenning betekent veel.",
  },
  {
    id: "dq-094",
    text: "Waarin zou je graag meer moed willen tonen?",
    category: "groei",
  },

  // ============================================================
  // CONFLICT (conflict resolution)
  // ============================================================
  {
    id: "dq-095",
    text: "Hoe weet je dat een ruzie echt is bijgelegd?",
    category: "conflict",
    followUp: "Herken je partner dit ook zo? Bespreek jullie signalen.",
  },
  {
    id: "dq-096",
    text: "Wat doe je als eerste na een meningsverschil - en helpt dat?",
    category: "conflict",
  },
  {
    id: "dq-097",
    text: "Welk terugkerend onderwerp levert de meeste spanning op?",
    category: "conflict",
  },
  {
    id: "dq-098",
    text: "Hoe kun je je partner het beste laten merken dat je spijt hebt?",
    category: "conflict",
    followUp: "Vraag je partner wat voor hem of haar het meest helpt na een conflict.",
  },
  {
    id: "dq-099",
    text: "Wat heb je geleerd van jullie laatste meningsverschil?",
    category: "conflict",
  },
  {
    id: "dq-100",
    text: "Wanneer is het beter om even afstand te nemen voor je ergens op reageert?",
    category: "conflict",
  },
  {
    id: "dq-101",
    text: "Wat is iets kleins dat je irriteert maar dat je nooit uitspreekt?",
    category: "conflict",
  },
  {
    id: "dq-102",
    text: "Hoe kunnen jullie beter omgaan met momenten waarop je het echt oneens bent?",
    category: "conflict",
  },
  {
    id: "dq-103",
    text: "Wanneer is het moeilijk voor je om sorry te zeggen?",
    category: "conflict",
    followUp: "Wat maakt het lastig? Is het trots, angst, of iets anders?",
  },
  {
    id: "dq-104",
    text: "Hoe reageer je als je partner iets zegt wat je kwetst?",
    category: "conflict",
  },
  {
    id: "dq-105",
    text: "Welke afspraak over ruzies zou jullie relatie verbeteren?",
    category: "conflict",
  },
  {
    id: "dq-106",
    text: "Wat was een conflict dat achteraf gezien nergens over ging?",
    category: "conflict",
  },
  {
    id: "dq-107",
    text: "Hoe zorg je ervoor dat je luistert in plaats van verdedigt tijdens een gesprek?",
    category: "conflict",
  },

  // ============================================================
  // HERINNERINGEN (memories)
  // ============================================================
  {
    id: "dq-108",
    text: "Wat is je allereerste herinnering aan je partner?",
    category: "herinneringen",
  },
  {
    id: "dq-109",
    text: "Welk moment in jullie relatie zou je als een foto willen bewaren?",
    category: "herinneringen",
    followUp: "Beschrijf het moment zo gedetailleerd mogelijk aan je partner.",
  },
  {
    id: "dq-110",
    text: "Wanneer wist je dat je partner de juiste persoon voor je was?",
    category: "herinneringen",
  },
  {
    id: "dq-111",
    text: "Welk avontuur samen zul je nooit vergeten?",
    category: "herinneringen",
  },
  {
    id: "dq-112",
    text: "Wat is het grappigste misverstand dat jullie ooit hebben gehad?",
    category: "herinneringen",
  },
  {
    id: "dq-113",
    text: "Welk moment uit jullie begin voelt nu heel ver weg?",
    category: "herinneringen",
    followUp: "Wat is er sindsdien veranderd, en wat is hetzelfde gebleven?",
  },
  {
    id: "dq-114",
    text: "Wat is de mooiste vakantie die jullie samen hebben gehad, en waarom juist die?",
    category: "herinneringen",
  },
  {
    id: "dq-115",
    text: "Welk cadeau van je partner heeft de meeste indruk op je gemaakt?",
    category: "herinneringen",
  },
  {
    id: "dq-116",
    text: "Wat is een klein moment uit het afgelopen jaar dat je wilt onthouden?",
    category: "herinneringen",
  },
  {
    id: "dq-117",
    text: "Welk nummer horen jullie allebei en denken dan meteen aan elkaar?",
    category: "herinneringen",
  },
  {
    id: "dq-118",
    text: "Wat was de moeilijkste periode in jullie relatie, en hoe zijn jullie erdoorheen gekomen?",
    category: "herinneringen",
    followUp: "Wat heeft jullie toen het meest geholpen?",
  },
  {
    id: "dq-119",
    text: "Welke gewoonte hebben jullie samen ontwikkeld die je niet meer zou willen missen?",
    category: "herinneringen",
  },
  {
    id: "dq-120",
    text: "Wat is een gesprek uit jullie verleden dat je bijgebleven is?",
    category: "herinneringen",
  },

  // ============================================================
  // TOEKOMST (future)
  // ============================================================
  {
    id: "dq-121",
    text: "Hoe zien jullie je leven samen over tien jaar?",
    category: "toekomst",
    followUp: "Komen jullie beelden overeen? Waar zitten de verschillen?",
  },
  {
    id: "dq-122",
    text: "Welke mijlpaal zou je samen willen bereiken in het komende jaar?",
    category: "toekomst",
  },
  {
    id: "dq-123",
    text: "Hoe wil je dat jullie relatie voelt als je oud bent?",
    category: "toekomst",
  },
  {
    id: "dq-124",
    text: "Welke verandering in jullie leven zou je het liefst willen doorvoeren?",
    category: "toekomst",
    followUp: "Wat is de eerste stap? Wanneer zou je beginnen?",
  },
  {
    id: "dq-125",
    text: "Waar wil je over vijf jaar wonen, en waarom?",
    category: "toekomst",
  },
  {
    id: "dq-126",
    text: "Welke traditie willen jullie nog samen starten?",
    category: "toekomst",
  },
  {
    id: "dq-127",
    text: "Hoe willen jullie je pensioen doorbrengen?",
    category: "toekomst",
  },
  {
    id: "dq-128",
    text: "Wat is iets dat je hoopt dat jullie relatie over drie jaar anders is?",
    category: "toekomst",
    followUp: "Wat kun je daar nu al aan bijdragen?",
  },
  {
    id: "dq-129",
    text: "Welke reizen staan er nog op jullie verlanglijstje?",
    category: "toekomst",
  },
  {
    id: "dq-130",
    text: "Hoe zie je jullie rol als koppel binnen de bredere familie in de toekomst?",
    category: "toekomst",
  },
  {
    id: "dq-131",
    text: "Welk gezamenlijk project zou je samen willen oppakken?",
    category: "toekomst",
  },
  {
    id: "dq-132",
    text: "Waar maak je je zorgen over als je aan de toekomst denkt?",
    category: "toekomst",
    followUp: "Vraag je partner: hoe kan ik je hierin geruststellen?",
  },
  {
    id: "dq-133",
    text: "Welke levensles wil je doorgeven aan de mensen om je heen?",
    category: "toekomst",
  },

  // ============================================================
  // DAGELIJKS (daily life)
  // ============================================================
  {
    id: "dq-134",
    text: "Wat is het fijnste onderdeel van jullie dagelijkse routine samen?",
    category: "dagelijks",
  },
  {
    id: "dq-135",
    text: "Hoe was je dag vandaag echt - niet het standaardantwoord, maar eerlijk?",
    category: "dagelijks",
    followUp: "Luister aandachtig naar het antwoord van je partner zonder advies te geven.",
  },
  {
    id: "dq-136",
    text: "Welk klein ding maakt jouw ochtend goed?",
    category: "dagelijks",
  },
  {
    id: "dq-137",
    text: "Wat zou je veranderen aan hoe jullie de avonden doorbrengen?",
    category: "dagelijks",
  },
  {
    id: "dq-138",
    text: "Hoe verdelen jullie de dagelijkse klusjes, en voelt dat eerlijk?",
    category: "dagelijks",
    followUp: "Is er iets dat je liever anders zou zien? Bespreek het zonder verwijten.",
  },
  {
    id: "dq-139",
    text: "Wat is het eerste dat je denkt als je je partner 's ochtends ziet?",
    category: "dagelijks",
  },
  {
    id: "dq-140",
    text: "Hoe ziet een ideale doordeweekse avond voor jou eruit?",
    category: "dagelijks",
  },
  {
    id: "dq-141",
    text: "Welke kleine verbetering in jullie huis zou veel verschil maken?",
    category: "dagelijks",
  },
  {
    id: "dq-142",
    text: "Wanneer voel je de meeste stress op een dag, en hoe kan je partner daarbij helpen?",
    category: "dagelijks",
  },
  {
    id: "dq-143",
    text: "Wat eten jullie het liefst samen?",
    category: "dagelijks",
  },
  {
    id: "dq-144",
    text: "Hoe brengen jullie het moment van thuiskomen door?",
    category: "dagelijks",
    followUp: "Zou je daar iets aan willen veranderen?",
  },
  {
    id: "dq-145",
    text: "Welk huishoudelijk klusje vind je stiekem niet zo erg?",
    category: "dagelijks",
  },
  {
    id: "dq-146",
    text: "Hoe vind je de balans tussen tijd voor jezelf en tijd samen?",
    category: "dagelijks",
  },

  // ============================================================
  // Extra vragen - COMMUNICATIE (verdieping)
  // ============================================================
  {
    id: "dq-147",
    text: "Welk onderwerp zou je graag eens rustig met je partner willen bespreken?",
    category: "communicatie",
  },
  {
    id: "dq-148",
    text: "Hoe laat je merken dat je het ergens niet mee eens bent, zonder een ruzie te starten?",
    category: "communicatie",
    followUp: "Vraag je partner of dit ook zo overkomt als je het bedoelt.",
  },
  {
    id: "dq-149",
    text: "Wat is het moedigste dat je ooit tegen je partner hebt gezegd?",
    category: "communicatie",
  },
  {
    id: "dq-150",
    text: "Hoe reageer je als je partner stil is - geef je ruimte of vraag je door?",
    category: "communicatie",
  },
  {
    id: "dq-151",
    text: "Welk gesprek stel je al een tijdje uit?",
    category: "communicatie",
    followUp: "Wat is het ergste dat er kan gebeuren als je het wel voert?",
  },

  // ============================================================
  // Extra vragen - INTIMITEIT (verdieping)
  // ============================================================
  {
    id: "dq-152",
    text: "Wanneer voel je je het dichtst bij je partner, zonder dat er iets speciaals gebeurt?",
    category: "intimiteit",
  },
  {
    id: "dq-153",
    text: "Hoe zorg je ervoor dat jullie verbonden blijven in drukke periodes?",
    category: "intimiteit",
    followUp: "Welke afspraak zouden jullie hierover kunnen maken?",
  },
  {
    id: "dq-154",
    text: "Wat zou je partner meer mogen doen dat jou een veilig gevoel geeft?",
    category: "intimiteit",
  },
  {
    id: "dq-155",
    text: "Welk ritueel hebben jullie dat van niemand anders is?",
    category: "intimiteit",
  },

  // ============================================================
  // Extra vragen - DROMEN (verdieping)
  // ============================================================
  {
    id: "dq-156",
    text: "Wat is een kleine droom die je deze maand nog zou kunnen waarmaken?",
    category: "dromen",
    followUp: "Daag jezelf uit: wat als je het gewoon doet?",
  },
  {
    id: "dq-157",
    text: "Welke droom van je partner begrijp je het beste?",
    category: "dromen",
  },
  {
    id: "dq-158",
    text: "Als jullie samen iets konden uitvinden of creeren, wat zou het zijn?",
    category: "dromen",
  },
  {
    id: "dq-159",
    text: "Welke levenswijze van iemand anders inspireert je?",
    category: "dromen",
  },

  // ============================================================
  // Extra vragen - GEZIN (verdieping)
  // ============================================================
  {
    id: "dq-160",
    text: "Hoe zorg je ervoor dat je eigen behoeften niet verdwijnen in het gezinsleven?",
    category: "gezin",
  },
  {
    id: "dq-161",
    text: "Welke rol speelt humor in jullie gezin?",
    category: "gezin",
    followUp: "Wat is de laatste keer dat jullie er samen heel hard om moesten lachen?",
  },
  {
    id: "dq-162",
    text: "Hoe willen jullie omgaan met grote beslissingen die het hele gezin raken?",
    category: "gezin",
  },
  {
    id: "dq-163",
    text: "Welke kwaliteit van je partner maakt die een goede ouder of familielid?",
    category: "gezin",
  },

  // ============================================================
  // Extra vragen - GELD (verdieping)
  // ============================================================
  {
    id: "dq-164",
    text: "Wat is een aankoop waar je achteraf spijt van had?",
    category: "geld",
  },
  {
    id: "dq-165",
    text: "Hoe praten jullie over geld als er spanning is?",
    category: "geld",
    followUp: "Wat zou een betere manier zijn om dit gesprek te voeren?",
  },
  {
    id: "dq-166",
    text: "Welke financiele gewoonte zou je graag van je partner overnemen?",
    category: "geld",
  },
  {
    id: "dq-167",
    text: "Hoeveel financiele vrijheid heeft ieder van jullie nodig?",
    category: "geld",
  },

  // ============================================================
  // Extra vragen - PLEZIER (verdieping)
  // ============================================================
  {
    id: "dq-168",
    text: "Welk seizoen is jullie beste seizoen als koppel, en waarom?",
    category: "plezier",
  },
  {
    id: "dq-169",
    text: "Wat is jullie favoriete spontane uitstapje geweest?",
    category: "plezier",
    followUp: "Kunnen jullie dit weekend iets soortgelijks doen?",
  },
  {
    id: "dq-170",
    text: "Welk talent van je partner vind je ondergewaardeerd?",
    category: "plezier",
  },
  {
    id: "dq-171",
    text: "Wat is een guilty pleasure die jullie samen delen?",
    category: "plezier",
  },

  // ============================================================
  // Extra vragen - GROEI (verdieping)
  // ============================================================
  {
    id: "dq-172",
    text: "Welke angst heb je overwonnen dankzij je partner?",
    category: "groei",
  },
  {
    id: "dq-173",
    text: "Hoe ga je om met periodes waarin je het gevoel hebt dat je stilstaat?",
    category: "groei",
    followUp: "Wat kan je partner op zulke momenten het beste voor je doen?",
  },
  {
    id: "dq-174",
    text: "Welke kwaliteit van je partner zou je graag meer bij jezelf zien?",
    category: "groei",
  },
  {
    id: "dq-175",
    text: "Wat is het belangrijkste dat je hebt geleerd in jullie relatie?",
    category: "groei",
  },

  // ============================================================
  // Extra vragen - CONFLICT (verdieping)
  // ============================================================
  {
    id: "dq-176",
    text: "Wat is jouw eerste reactie als je je aangevallen voelt, en helpt die reactie?",
    category: "conflict",
  },
  {
    id: "dq-177",
    text: "Hoe herken je bij jezelf dat een gesprek op het punt staat te escaleren?",
    category: "conflict",
    followUp: "Maak samen een afspraak over wat jullie dan doen.",
  },
  {
    id: "dq-178",
    text: "Welke zin van je partner werkt kalmerend als je gefrustreerd bent?",
    category: "conflict",
  },
  {
    id: "dq-179",
    text: "Wat wil je dat je partner weet over hoe jij ruzie ervaart?",
    category: "conflict",
  },

  // ============================================================
  // Extra vragen - HERINNERINGEN (verdieping)
  // ============================================================
  {
    id: "dq-180",
    text: "Welke geur doet je meteen denken aan een mooi moment met je partner?",
    category: "herinneringen",
  },
  {
    id: "dq-181",
    text: "Wat is het meest romantische dat je partner ooit voor je heeft gedaan?",
    category: "herinneringen",
    followUp: "Weet je partner dat dit moment zo belangrijk voor je is?",
  },
  {
    id: "dq-182",
    text: "Welk moment uit jullie relatie zou je in een film willen zien?",
    category: "herinneringen",
  },
  {
    id: "dq-183",
    text: "Wat is een klein detail uit het begin van jullie relatie dat je nooit bent vergeten?",
    category: "herinneringen",
  },

  // ============================================================
  // Extra vragen - TOEKOMST (verdieping)
  // ============================================================
  {
    id: "dq-184",
    text: "Wat wil je over jezelf kunnen zeggen als je terugkijkt op dit jaar?",
    category: "toekomst",
  },
  {
    id: "dq-185",
    text: "Hoe willen jullie grote veranderingen in de toekomst samen aanpakken?",
    category: "toekomst",
    followUp: "Hebben jullie hier al eens een goed gesprek over gehad?",
  },
  {
    id: "dq-186",
    text: "Welke versie van jullie relatie kijk je het meest naar uit?",
    category: "toekomst",
  },
  {
    id: "dq-187",
    text: "Wat hoop je dat jullie samen nog meemaken?",
    category: "toekomst",
  },

  // ============================================================
  // Extra vragen - DAGELIJKS (verdieping)
  // ============================================================
  {
    id: "dq-188",
    text: "Welk moment van de dag is het meest van jullie samen?",
    category: "dagelijks",
  },
  {
    id: "dq-189",
    text: "Hoe begin je het liefst de dag: alleen of samen?",
    category: "dagelijks",
    followUp: "Klopt dit met wat je partner denkt? Bespreek het.",
  },
  {
    id: "dq-190",
    text: "Welk dagelijks ritueel maakt je gelukkig zonder dat je het beseft?",
    category: "dagelijks",
  },
  {
    id: "dq-191",
    text: "Wat zou je vandaag voor je partner willen doen waar die blij van wordt?",
    category: "dagelijks",
  },

  // ============================================================
  // Diepe vragen - mix van categorieen
  // ============================================================
  {
    id: "dq-192",
    text: "Als je een brief zou schrijven aan je partner die pas over tien jaar geopend wordt, wat zou erin staan?",
    category: "intimiteit",
    followUp: "Overweeg om die brief echt te schrijven.",
  },
  {
    id: "dq-193",
    text: "Welke herinnering aan jullie begin maakt je het meest emotioneel?",
    category: "herinneringen",
  },
  {
    id: "dq-194",
    text: "Wat is het moeilijkste dat je ooit hebt moeten loslaten voor jullie relatie?",
    category: "groei",
  },
  {
    id: "dq-195",
    text: "Hoe zou je in drie woorden omschrijven wat je partner voor je betekent?",
    category: "communicatie",
    followUp: "Zeg die drie woorden tegen je partner en leg uit waarom juist die.",
  },
  {
    id: "dq-196",
    text: "Wat is een stille afspraak die jullie hebben zonder die ooit te hebben uitgesproken?",
    category: "dagelijks",
  },
  {
    id: "dq-197",
    text: "Welk aspect van jullie relatie zou je willen beschermen tegen de drukte van het leven?",
    category: "toekomst",
    followUp: "Hoe kunnen jullie dat samen bewaken?",
  },
  {
    id: "dq-198",
    text: "Als jullie relatie een seizoen was, welk seizoen zou het nu zijn en waarom?",
    category: "intimiteit",
  },
  {
    id: "dq-199",
    text: "Wanneer was de laatste keer dat je partner je echt verraste met iets dat die zei?",
    category: "communicatie",
  },
  {
    id: "dq-200",
    text: "Hoe voel je je als je partner trots over je praat tegen anderen?",
    category: "intimiteit",
  },
  {
    id: "dq-201",
    text: "Welk moment uit deze week wil je bewaren?",
    category: "herinneringen",
  },
  {
    id: "dq-202",
    text: "Wat is iets waar je partner goed in is, maar zelf niet beseft?",
    category: "groei",
    followUp: "Zeg het vandaag nog tegen je partner.",
  },
  {
    id: "dq-203",
    text: "Hoe vieren jullie kleine overwinningen?",
    category: "plezier",
  },
  {
    id: "dq-204",
    text: "Als je kon kiezen: een week samen op reis of een week samen thuis zonder verplichtingen?",
    category: "plezier",
  },
  {
    id: "dq-205",
    text: "Wat wil je dat je kinderen of naasten later zeggen over jullie relatie?",
    category: "gezin",
    followUp: "Wat doen jullie nu al dat bijdraagt aan dat beeld?",
  },
  {
    id: "dq-206",
    text: "Wanneer voel je je het meest gesteund door je partner?",
    category: "communicatie",
  },
  {
    id: "dq-207",
    text: "Welke kleine moeite van je partner waardeer je enorm?",
    category: "dagelijks",
  },
  {
    id: "dq-208",
    text: "Hoe ga je om met het gevoel dat jullie uit balans zijn?",
    category: "conflict",
    followUp: "Wat is het eerste signaal dat de balans zoek is?",
  },
  {
    id: "dq-209",
    text: "Welke gemeenschappelijke waarde bindt jullie het sterkst?",
    category: "groei",
  },
  {
    id: "dq-210",
    text: "Wat is het mooiste dat je ooit over jullie relatie hebt gehoord van iemand anders?",
    category: "herinneringen",
  },
  {
    id: "dq-211",
    text: "Hoe laat je je partner weten dat je aan die denkt als jullie niet bij elkaar zijn?",
    category: "communicatie",
  },
  {
    id: "dq-212",
    text: "Welke verrassing zou je partner het meest blij maken?",
    category: "plezier",
    followUp: "Kun je dit de komende week regelen?",
  },
  {
    id: "dq-213",
    text: "Wat betekent trouw zijn voor jou, verder dan het voor de hand liggende?",
    category: "intimiteit",
  },
  {
    id: "dq-214",
    text: "Hoe wil je herinnerd worden door de mensen die je het meest dierbaar zijn?",
    category: "toekomst",
  },
  {
    id: "dq-215",
    text: "Welke weekenddagjes hebben jullie ooit gedaan die je nog eens wilt overdoen?",
    category: "herinneringen",
  },
  {
    id: "dq-216",
    text: "Wat is een moment waarop je je partner miste terwijl die vlakbij was?",
    category: "intimiteit",
    followUp: "Wat had je op dat moment nodig?",
  },
  {
    id: "dq-217",
    text: "Hoe reageer je als je merkt dat je partner gestrest is?",
    category: "dagelijks",
  },
  {
    id: "dq-218",
    text: "Welke nieuwe gewoonte zouden jullie samen kunnen beginnen?",
    category: "dagelijks",
    followUp: "Kies er een en probeer het een week lang.",
  },
  {
    id: "dq-219",
    text: "Wat is het beste advies dat jullie ooit over relaties hebben gekregen?",
    category: "groei",
  },
  {
    id: "dq-220",
    text: "Hoe ziet jullie ideale zondagmiddag eruit?",
    category: "plezier",
  },
  {
    id: "dq-221",
    text: "Welk obstakel hebben jullie samen overwonnen waar je trots op bent?",
    category: "groei",
    followUp: "Wat heeft jullie toen de kracht gegeven om door te gaan?",
  },
  {
    id: "dq-222",
    text: "Hoe belangrijk is het voor jou om dingen apart te doen, en begrijpt je partner dat?",
    category: "communicatie",
  },
  {
    id: "dq-223",
    text: "Welk liefdestaal spreken jullie het meest: woorden, tijd, cadeaus, hulp of aanraking?",
    category: "intimiteit",
  },
  {
    id: "dq-224",
    text: "Wat is iets dat jullie altijd samen doen en nooit alleen?",
    category: "dagelijks",
  },
  {
    id: "dq-225",
    text: "Welke financiele les zou je je jongere zelf willen meegeven?",
    category: "geld",
  },
  {
    id: "dq-226",
    text: "Hoe vind je het om hulp te vragen aan je partner?",
    category: "communicatie",
    followUp: "Vraag je partner hoe die het ervaart als jij om hulp vraagt.",
  },
  {
    id: "dq-227",
    text: "Waar kijk je het meest naar uit in het komende seizoen?",
    category: "toekomst",
  },
  {
    id: "dq-228",
    text: "Wat is iets nieuws dat je de laatste tijd over je partner hebt ontdekt?",
    category: "intimiteit",
  },
  {
    id: "dq-229",
    text: "Hoe vieren jullie het liefst goed nieuws?",
    category: "plezier",
  },
  {
    id: "dq-230",
    text: "Welke investering in jullie relatie heeft het meeste opgeleverd?",
    category: "groei",
  },
  {
    id: "dq-231",
    text: "Als je een dag kon overdoen uit jullie relatie, welke zou je kiezen?",
    category: "herinneringen",
    followUp: "Zou je iets anders doen, of wil je het precies zo herbeleven?",
  },
  {
    id: "dq-232",
    text: "Hoe merkt je partner dat je moe bent, en wat heeft dan het meeste effect?",
    category: "dagelijks",
  },
  {
    id: "dq-233",
    text: "Wat is een ongezonde gewoonte die jullie allebei herkennen maar moeilijk doorbreken?",
    category: "conflict",
  },
  {
    id: "dq-234",
    text: "Welke kwaliteit bewonderde je het eerste bij je partner?",
    category: "herinneringen",
  },
  {
    id: "dq-235",
    text: "Hoe ga je ermee om als je partner iets anders wil dan jij?",
    category: "conflict",
    followUp: "Wat werkt het best: compromis, afwisselen, of iets anders?",
  },
  {
    id: "dq-236",
    text: "Welk huis- of kamerproject zouden jullie samen leuk vinden?",
    category: "plezier",
  },
  {
    id: "dq-237",
    text: "Hoe spreken jullie waardering uit voor de onzichtbare dingen die de ander doet?",
    category: "communicatie",
  },
  {
    id: "dq-238",
    text: "Wat geeft je vertrouwen in de toekomst van jullie relatie?",
    category: "toekomst",
    followUp: "Deel dit met je partner. Vertrouwen benoemen versterkt het.",
  },
  {
    id: "dq-239",
    text: "Wat is iets dat je van je partner hebt geleerd over geduld?",
    category: "groei",
  },
  {
    id: "dq-240",
    text: "Hoe gaan jullie om met verschil in energielevel op dezelfde avond?",
    category: "dagelijks",
  },
  {
    id: "dq-241",
    text: "Welke maaltijd brengt jullie samen het meeste plezier?",
    category: "plezier",
  },
  {
    id: "dq-242",
    text: "Wat is een belofte die je stil aan je partner hebt gedaan?",
    category: "intimiteit",
    followUp: "Spreek het uit - beloftes worden sterker als je ze deelt.",
  },
  {
    id: "dq-243",
    text: "Hoe ga je om met teleurstelling in je partner?",
    category: "conflict",
  },
  {
    id: "dq-244",
    text: "Welk familiemoment van het afgelopen jaar koester je het meest?",
    category: "gezin",
  },
  {
    id: "dq-245",
    text: "Wat is iets dat je partner gerust vaker mag vragen?",
    category: "communicatie",
  },
  {
    id: "dq-246",
    text: "Als jullie morgen ergens opnieuw konden beginnen, waar zou dat zijn?",
    category: "dromen",
    followUp: "Wat trekt je aan dat beeld? Zit daar een concrete wens achter?",
  },
  {
    id: "dq-247",
    text: "Hoe belangrijk is stilte in jullie relatie?",
    category: "dagelijks",
  },
  {
    id: "dq-248",
    text: "Welk risico zou je durven nemen als je wist dat je partner achter je stond?",
    category: "dromen",
  },
  {
    id: "dq-249",
    text: "Wat doet je partner dat je aan het lachen maakt, iedere keer weer?",
    category: "plezier",
  },
  {
    id: "dq-250",
    text: "Hoe gaan jullie om met periodes waarin je weinig quality time hebt?",
    category: "communicatie",
    followUp: "Wat zou helpen om toch verbonden te blijven in drukke tijden?",
  },
];
