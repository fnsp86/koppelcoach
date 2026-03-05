import type { LoveLanguage } from '@/lib/types';

export type LoveLanguagePair = {
  id: number;
  optionA: { text: string; language: LoveLanguage };
  optionB: { text: string; language: LoveLanguage };
};

/**
 * 30 A/B paren voor de liefdestaal quiz.
 * Elke taal komt 12 keer voor (6 als A, 6 als B).
 * Elke combinatie van twee talen komt 3 keer voor.
 */
export const loveLanguagePairs: LoveLanguagePair[] = [
  // woorden vs quality-time (1-3)
  {
    id: 1,
    optionA: { text: 'Ik voel me geliefd als mijn partner zegt dat ik er goed uitzie', language: 'woorden' },
    optionB: { text: 'Ik voel me geliefd als mijn partner alles opzij zet om samen te zijn', language: 'quality-time' },
  },
  {
    id: 2,
    optionA: { text: 'Ik vind het belangrijk dat mijn partner me regelmatig complimenten geeft', language: 'woorden' },
    optionB: { text: 'Ik vind het belangrijk dat mijn partner echt naar me luistert tijdens een gesprek', language: 'quality-time' },
  },
  {
    id: 3,
    optionA: { text: 'Een lief berichtje tussendoor maakt mijn dag', language: 'woorden' },
    optionB: { text: 'Een avond samen zonder telefoon maakt mijn dag', language: 'quality-time' },
  },

  // woorden vs cadeaus (4-6)
  {
    id: 4,
    optionA: { text: 'Ik word blij van een handgeschreven brief van mijn partner', language: 'woorden' },
    optionB: { text: 'Ik word blij van een onverwacht cadeautje van mijn partner', language: 'cadeaus' },
  },
  {
    id: 5,
    optionA: { text: 'Het betekent veel voor me als mijn partner zegt hoe trots die op me is', language: 'woorden' },
    optionB: { text: 'Het betekent veel voor me als mijn partner iets koopt dat me doet denken aan een fijn moment', language: 'cadeaus' },
  },
  {
    id: 6,
    optionA: { text: 'Ik voel me speciaal als mijn partner lieve dingen over me zegt tegen anderen', language: 'woorden' },
    optionB: { text: 'Ik voel me speciaal als mijn partner een doordacht cadeau voor me uitzoekt', language: 'cadeaus' },
  },

  // woorden vs hulpvaardigheid (7-9)
  {
    id: 7,
    optionA: { text: 'Ik wil graag horen dat mijn partner van me houdt', language: 'woorden' },
    optionB: { text: 'Ik voel me geliefd als mijn partner klusjes doet zonder dat ik het vraag', language: 'hulpvaardigheid' },
  },
  {
    id: 8,
    optionA: { text: 'Een bemoedigend woord geeft me energie', language: 'woorden' },
    optionB: { text: 'Het ontlast me als mijn partner taken van me overneemt', language: 'hulpvaardigheid' },
  },
  {
    id: 9,
    optionA: { text: 'Ik stel het op prijs als mijn partner uitspreekt wat die waardeert aan mij', language: 'woorden' },
    optionB: { text: 'Ik stel het op prijs als mijn partner helpt met dingen die ik moet doen', language: 'hulpvaardigheid' },
  },

  // woorden vs aanraking (10-12)
  {
    id: 10,
    optionA: { text: 'Ik voel me verbonden als mijn partner me een lief bericht stuurt', language: 'woorden' },
    optionB: { text: 'Ik voel me verbonden als mijn partner dicht tegen me aan zit', language: 'aanraking' },
  },
  {
    id: 11,
    optionA: { text: 'Het maakt me blij als mijn partner zegt hoe belangrijk ik ben', language: 'woorden' },
    optionB: { text: 'Het maakt me blij als mijn partner mijn hand pakt tijdens het wandelen', language: 'aanraking' },
  },
  {
    id: 12,
    optionA: { text: 'Als ik een zware dag heb, wil ik graag bemoedigende woorden horen', language: 'woorden' },
    optionB: { text: 'Als ik een zware dag heb, wil ik graag vastgehouden worden', language: 'aanraking' },
  },

  // quality-time vs cadeaus (13-15)
  {
    id: 13,
    optionA: { text: 'Ik geniet het meest van een hele dag samen doorbrengen', language: 'quality-time' },
    optionB: { text: 'Ik geniet het meest van een verrassing die mijn partner voor me heeft gekocht', language: 'cadeaus' },
  },
  {
    id: 14,
    optionA: { text: 'Ik voel me geliefd als mijn partner tijd vrijmaakt voor een goed gesprek', language: 'quality-time' },
    optionB: { text: 'Ik voel me geliefd als mijn partner bloemen voor me meebrengt', language: 'cadeaus' },
  },
  {
    id: 15,
    optionA: { text: 'Het mooiste wat mijn partner kan doen is een wandeling met me maken', language: 'quality-time' },
    optionB: { text: 'Het mooiste wat mijn partner kan doen is iets kopen waarvan die weet dat ik het mooi vind', language: 'cadeaus' },
  },

  // quality-time vs hulpvaardigheid (16-18)
  {
    id: 16,
    optionA: { text: 'Ik vind het fijn als mijn partner samen met mij kookt', language: 'quality-time' },
    optionB: { text: 'Ik vind het fijn als mijn partner het avondeten voor me klaarmaakt', language: 'hulpvaardigheid' },
  },
  {
    id: 17,
    optionA: { text: 'Ik waardeer het als mijn partner een activiteit plant die we samen kunnen doen', language: 'quality-time' },
    optionB: { text: 'Ik waardeer het als mijn partner de auto wast of een klusje in huis afmaakt', language: 'hulpvaardigheid' },
  },
  {
    id: 18,
    optionA: { text: 'Onverdeelde aandacht van mijn partner is het beste geschenk', language: 'quality-time' },
    optionB: { text: 'Mijn partner die de boodschappen doet is het beste geschenk', language: 'hulpvaardigheid' },
  },

  // quality-time vs aanraking (19-21)
  {
    id: 19,
    optionA: { text: 'Ik voel me het meest geliefd tijdens een diep gesprek met mijn partner', language: 'quality-time' },
    optionB: { text: 'Ik voel me het meest geliefd als mijn partner me stevig knuffelt', language: 'aanraking' },
  },
  {
    id: 20,
    optionA: { text: 'Samen een film kijken zonder afleiding betekent veel voor me', language: 'quality-time' },
    optionB: { text: 'Op de bank tegen mijn partner aan liggen betekent veel voor me', language: 'aanraking' },
  },
  {
    id: 21,
    optionA: { text: 'Ik geniet ervan als mijn partner en ik samen iets nieuws ontdekken', language: 'quality-time' },
    optionB: { text: 'Ik geniet ervan als mijn partner mijn schouders masseert na een lange dag', language: 'aanraking' },
  },

  // cadeaus vs hulpvaardigheid (22-24)
  {
    id: 22,
    optionA: { text: 'Ik word blij als mijn partner iets voor me meebrengt uit de winkel', language: 'cadeaus' },
    optionB: { text: 'Ik word blij als mijn partner de afwas doet zonder dat ik het vraag', language: 'hulpvaardigheid' },
  },
  {
    id: 23,
    optionA: { text: 'Een attentie bij een speciale gelegenheid laat me voelen dat mijn partner aan me denkt', language: 'cadeaus' },
    optionB: { text: 'Als mijn partner iets repareert dat kapot is, laat dat me voelen dat die aan me denkt', language: 'hulpvaardigheid' },
  },
  {
    id: 24,
    optionA: { text: 'Ik voel me geliefd als mijn partner een cadeautje geeft dat bij mij past', language: 'cadeaus' },
    optionB: { text: 'Ik voel me geliefd als mijn partner mijn auto volgetankt heeft', language: 'hulpvaardigheid' },
  },

  // cadeaus vs aanraking (25-27)
  {
    id: 25,
    optionA: { text: 'Een onverwacht cadeautje toont me dat mijn partner aan me heeft gedacht', language: 'cadeaus' },
    optionB: { text: 'Een onverwachte omhelzing toont me dat mijn partner om me geeft', language: 'aanraking' },
  },
  {
    id: 26,
    optionA: { text: 'Ik voel me speciaal als mijn partner iets moois voor me uitzoekt', language: 'cadeaus' },
    optionB: { text: 'Ik voel me speciaal als mijn partner met de vingers door mijn haar gaat', language: 'aanraking' },
  },
  {
    id: 27,
    optionA: { text: 'Het maakt me blij als mijn partner mijn favoriete snack meeneemt', language: 'cadeaus' },
    optionB: { text: 'Het maakt me blij als mijn partner me een zoen geeft als die thuiskomt', language: 'aanraking' },
  },

  // hulpvaardigheid vs aanraking (28-30)
  {
    id: 28,
    optionA: { text: 'Ik voel me geliefd als mijn partner me helpt met een moeilijke taak', language: 'hulpvaardigheid' },
    optionB: { text: 'Ik voel me geliefd als mijn partner mijn hand vasthoudt', language: 'aanraking' },
  },
  {
    id: 29,
    optionA: { text: 'Het ontroert me als mijn partner iets voor me regelt waar ik tegenop zag', language: 'hulpvaardigheid' },
    optionB: { text: 'Het ontroert me als mijn partner me even stevig vastpakt', language: 'aanraking' },
  },
  {
    id: 30,
    optionA: { text: 'Na een drukke dag waardeer ik het als mijn partner het huishouden heeft gedaan', language: 'hulpvaardigheid' },
    optionB: { text: 'Na een drukke dag waardeer ik het als mijn partner naast me komt liggen', language: 'aanraking' },
  },
];

export const loveLanguageInfo: Record<LoveLanguage, { title: string; description: string; icon: string }> = {
  'woorden': {
    title: 'Woorden van bevestiging',
    description: 'Je voelt je geliefd door complimenten, aanmoediging en lieve woorden.',
    icon: 'MessageCircleHeart',
  },
  'quality-time': {
    title: 'Quality time',
    description: 'Je voelt je geliefd als je partner onverdeelde aandacht aan je geeft.',
    icon: 'Clock',
  },
  'cadeaus': {
    title: 'Cadeaus',
    description: 'Je voelt je geliefd door doordachte cadeaus en attenties.',
    icon: 'Gift',
  },
  'hulpvaardigheid': {
    title: 'Hulpvaardigheid',
    description: 'Je voelt je geliefd als je partner dingen voor je doet.',
    icon: 'HandHelping',
  },
  'aanraking': {
    title: 'Fysieke aanraking',
    description: 'Je voelt je geliefd door knuffels, zoenen en fysiek contact.',
    icon: 'Hand',
  },
};
