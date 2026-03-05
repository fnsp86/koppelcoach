export const dailyAppreciations: string[] = [
  'Bedankt dat je er altijd bent',
  'Ik waardeer je geduld',
  'Je maakt mijn dag beter',
  'Dankjewel voor je steun',
  'Ik voel me veilig bij jou',
  'Je bent mijn rustige plek',
  'Bedankt dat je naar me luistert',
  'Ik waardeer hoe hard je werkt',
  'Je lach maakt alles lichter',
  'Dankjewel dat je me laat zijn wie ik ben',
  'Ik ben blij dat we samen zijn',
  'Bedankt voor de kleine dingen die je doet',
  'Je maakt ons huis een thuis',
  'Ik waardeer je eerlijkheid',
  'Dankjewel voor je warmte',
  'Je bent sterker dan je denkt',
  'Bedankt dat je me uitdaagt',
  'Ik waardeer hoe je voor ons zorgt',
  'Je maakt het gewone bijzonder',
  'Dankjewel voor je humor',
  'Ik voel me gelukkig met jou',
  'Bedankt dat je me begrijpt',
  'Je creativiteit inspireert me',
  'Ik waardeer je rust',
  'Dankjewel voor alles wat je doet',
  'Je bent mijn favoriete persoon',
  'Bedankt voor je aandacht',
  'Ik waardeer dat je moeite doet',
  'Je maakt moeilijke dingen makkelijker',
  'Dankjewel dat je er bent',
  'Ik waardeer je optimisme',
  'Je bent een geweldige partner',
];

export function getTodayAppreciations(count: number = 6): string[] {
  const today = new Date();
  const startOfYear = new Date(today.getFullYear(), 0, 0);
  const diff = today.getTime() - startOfYear.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));

  const result: string[] = [];
  for (let i = 0; i < count; i++) {
    const index = (dayOfYear * 7 + i * 5) % dailyAppreciations.length;
    result.push(dailyAppreciations[index]);
  }
  return result;
}
