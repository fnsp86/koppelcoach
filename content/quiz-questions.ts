export type QuizStatement = {
  id: string;
  text: string;
  area: string;
};

export const quizStatements: QuizStatement[] = [
  {
    id: 'quiz-1',
    text: 'Ik voel me gehoord als ik mijn gevoelens deel',
    area: 'communicatie',
  },
  {
    id: 'quiz-2',
    text: 'We maken regelmatig tijd voor elkaar vrij',
    area: 'quality time',
  },
  {
    id: 'quiz-3',
    text: 'Ik voel me veilig om kwetsbaar te zijn bij mijn partner',
    area: 'vertrouwen',
  },
  {
    id: 'quiz-4',
    text: 'We zijn het vaak eens over hoe we met geld omgaan',
    area: 'financien',
  },
  {
    id: 'quiz-5',
    text: 'Ik ben tevreden over de fysieke intimiteit in onze relatie',
    area: 'intimiteit',
  },
  {
    id: 'quiz-6',
    text: 'We kunnen goed samenwerken als het gaat om huishouden en taken',
    area: 'samenwerking',
  },
  {
    id: 'quiz-7',
    text: 'Ik voel me gesteund door mijn partner in moeilijke periodes',
    area: 'steun',
  },
  {
    id: 'quiz-8',
    text: 'We hebben plezier samen en kunnen goed lachen met elkaar',
    area: 'plezier',
  },
  {
    id: 'quiz-9',
    text: 'We praten openlijk over onze wensen en dromen voor de toekomst',
    area: 'toekomst',
  },

  // Communicatie (extra)
  {
    id: 'quiz-10',
    text: 'Mijn partner begrijpt wat ik bedoel, ook als ik het niet goed onder woorden kan brengen',
    area: 'communicatie',
  },
  {
    id: 'quiz-11',
    text: 'Ik houd soms dingen voor mezelf omdat ik bang ben voor de reactie',
    area: 'communicatie',
  },
  {
    id: 'quiz-12',
    text: 'We kunnen het oneens zijn zonder dat het een ruzie wordt',
    area: 'communicatie',
  },

  // Quality time (extra)
  {
    id: 'quiz-13',
    text: 'We zijn vaak in dezelfde ruimte maar toch met ons eigen ding bezig',
    area: 'quality time',
  },
  {
    id: 'quiz-14',
    text: 'Ik kijk uit naar onze momenten samen',
    area: 'quality time',
  },
  {
    id: 'quiz-15',
    text: 'We hebben moeite om tijd te vinden die echt van ons samen is',
    area: 'quality time',
  },

  // Vertrouwen (extra)
  {
    id: 'quiz-16',
    text: 'Ik twijfel soms of mijn partner helemaal eerlijk tegen me is',
    area: 'vertrouwen',
  },
  {
    id: 'quiz-17',
    text: 'Ik kan mijn partner mijn telefoon geven zonder me zorgen te maken',
    area: 'vertrouwen',
  },
  {
    id: 'quiz-18',
    text: 'Na een fout kan mijn partner mijn vertrouwen terugwinnen',
    area: 'vertrouwen',
  },

  // Financien (extra)
  {
    id: 'quiz-19',
    text: 'Geld is een onderwerp dat spanning oplevert tussen ons',
    area: 'financien',
  },
  {
    id: 'quiz-20',
    text: 'We hebben duidelijke afspraken over sparen en uitgeven',
    area: 'financien',
  },
  {
    id: 'quiz-21',
    text: 'Ik voel me vrij om geld uit te geven zonder me schuldig te voelen',
    area: 'financien',
  },

  // Intimiteit (extra)
  {
    id: 'quiz-22',
    text: 'Ik durf mijn wensen en grenzen op het gebied van intimiteit te bespreken',
    area: 'intimiteit',
  },
  {
    id: 'quiz-23',
    text: 'Ik voel soms druk om intiem te zijn terwijl ik daar geen behoefte aan heb',
    area: 'intimiteit',
  },
  {
    id: 'quiz-24',
    text: 'Kleine aanrakingen in het dagelijks leven zijn belangrijk voor ons',
    area: 'intimiteit',
  },

  // Samenwerking (extra)
  {
    id: 'quiz-25',
    text: 'De verdeling van taken thuis voelt soms oneerlijk',
    area: 'samenwerking',
  },
  {
    id: 'quiz-26',
    text: 'We kunnen goed beslissingen nemen als team',
    area: 'samenwerking',
  },
  {
    id: 'quiz-27',
    text: 'Als een van ons het druk heeft, springt de ander bij zonder dat je hoeft te vragen',
    area: 'samenwerking',
  },

  // Steun (extra)
  {
    id: 'quiz-28',
    text: 'Ik weet niet altijd hoe ik mijn partner het beste kan steunen',
    area: 'steun',
  },
  {
    id: 'quiz-29',
    text: 'Mijn partner viert mijn successen oprecht mee',
    area: 'steun',
  },
  {
    id: 'quiz-30',
    text: 'Ik kan huilen of boos zijn zonder dat mijn partner het probeert op te lossen',
    area: 'steun',
  },

  // Plezier (extra)
  {
    id: 'quiz-31',
    text: 'We doen te weinig leuke dingen samen vergeleken met vroeger',
    area: 'plezier',
  },
  {
    id: 'quiz-32',
    text: "We delen hobby's of interesses waar we allebei energie van krijgen",
    area: 'plezier',
  },
  {
    id: 'quiz-33',
    text: 'Mijn partner kan me altijd aan het lachen maken, zelfs op een slechte dag',
    area: 'plezier',
  },

  // Toekomst (extra)
  {
    id: 'quiz-34',
    text: 'Ik maak me soms zorgen dat we verschillende dingen willen in het leven',
    area: 'toekomst',
  },
  {
    id: 'quiz-35',
    text: 'We hebben concrete plannen gemaakt voor onze gezamenlijke toekomst',
    area: 'toekomst',
  },
  {
    id: 'quiz-36',
    text: 'Ik voel me zeker over de toekomst van onze relatie',
    area: 'toekomst',
  },

  // Communicatie (extra 2)
  {
    id: 'quiz-37',
    text: 'We nemen de tijd om na een drukke dag echt bij te praten',
    area: 'communicatie',
  },
  {
    id: 'quiz-38',
    text: 'Ik weet hoe mijn partner zich voelt, ook als die het niet uitspreekt',
    area: 'communicatie',
  },

  // Quality time (extra 2)
  {
    id: 'quiz-39',
    text: 'We proberen regelmatig iets nieuws samen te ondernemen',
    area: 'quality time',
  },
  {
    id: 'quiz-40',
    text: 'Ik voel me verbonden met mijn partner, ook op gewone doordeweekse dagen',
    area: 'quality time',
  },

  // Vertrouwen (extra 2)
  {
    id: 'quiz-41',
    text: 'Ik durf mijn onzekerheden te delen met mijn partner',
    area: 'vertrouwen',
  },
  {
    id: 'quiz-42',
    text: 'We spreken eerlijk over wat ons dwarszit, ook als het moeilijk is',
    area: 'vertrouwen',
  },

  // Financien (extra 2)
  {
    id: 'quiz-43',
    text: 'We overleggen over grote aankopen voordat we ze doen',
    area: 'financien',
  },
  {
    id: 'quiz-44',
    text: 'Ik weet hoe mijn partner over onze financiele toekomst denkt',
    area: 'financien',
  },

  // Intimiteit (extra 2)
  {
    id: 'quiz-45',
    text: 'We zoeken bewust momenten van fysieke nabijheid in het dagelijks leven',
    area: 'intimiteit',
  },
  {
    id: 'quiz-46',
    text: 'Ik voel me aantrekkelijk en gewenst door mijn partner',
    area: 'intimiteit',
  },

  // Samenwerking (extra 2)
  {
    id: 'quiz-47',
    text: 'We bespreken regelmatig hoe de taakverdeling thuis loopt',
    area: 'samenwerking',
  },
  {
    id: 'quiz-48',
    text: 'Bij tegenslag staan we samen sterk in plaats van elkaar de schuld te geven',
    area: 'samenwerking',
  },

  // Steun (extra 2)
  {
    id: 'quiz-49',
    text: 'Mijn partner moedigt me aan om mijn dromen na te jagen',
    area: 'steun',
  },
  {
    id: 'quiz-50',
    text: 'Ik voel me niet veroordeeld als ik een fout maak',
    area: 'steun',
  },

  // Plezier (extra 2)
  {
    id: 'quiz-51',
    text: 'We verrassen elkaar af en toe met iets leuks of liefs',
    area: 'plezier',
  },
  {
    id: 'quiz-52',
    text: 'Ik kijk ernaar uit om weekenden samen door te brengen',
    area: 'plezier',
  },

  // Toekomst (extra 2)
  {
    id: 'quiz-53',
    text: 'We hebben het regelmatig over wat we samen willen bereiken',
    area: 'toekomst',
  },
  {
    id: 'quiz-54',
    text: 'Ik weet wat mijn partner over vijf jaar wil doen of bereikt wil hebben',
    area: 'toekomst',
  },
];
