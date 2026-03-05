export type GameTrait = {
  id: string;
  trait: string;
  category: string;
};

export const gameTraits: GameTrait[] = [
  // ============================================================
  // PERSOONLIJKHEID
  // ============================================================
  { id: 'trait-1', trait: 'Creatief', category: 'persoonlijkheid' },
  { id: 'trait-2', trait: 'Geduldig', category: 'persoonlijkheid' },
  { id: 'trait-3', trait: 'Koppig', category: 'persoonlijkheid' },
  { id: 'trait-4', trait: 'Romantisch', category: 'persoonlijkheid' },
  { id: 'trait-14', trait: 'De avonturier', category: 'persoonlijkheid' },
  { id: 'trait-15', trait: 'De planner', category: 'persoonlijkheid' },
  { id: 'trait-19', trait: 'De perfectionist', category: 'persoonlijkheid' },
  { id: 'trait-20', trait: 'De optimist', category: 'persoonlijkheid' },
  { id: 'trait-36', trait: 'De dierenliefhebber', category: 'persoonlijkheid' },
  { id: 'trait-41', trait: 'De realist', category: 'persoonlijkheid' },
  { id: 'trait-42', trait: 'De dromer', category: 'persoonlijkheid' },
  { id: 'trait-43', trait: 'De spontaanste', category: 'persoonlijkheid' },
  { id: 'trait-44', trait: 'De meest besluitvaardige', category: 'persoonlijkheid' },
  { id: 'trait-45', trait: 'De grootste boekenwurm', category: 'persoonlijkheid' },

  // ============================================================
  // HUMOR
  // ============================================================
  { id: 'trait-5', trait: 'De grappigste', category: 'humor' },
  { id: 'trait-6', trait: 'Lacht het hardst om eigen grappen', category: 'humor' },
  { id: 'trait-16', trait: 'Steelt het dekbed', category: 'humor' },
  { id: 'trait-18', trait: 'De bankhanger', category: 'humor' },
  { id: 'trait-21', trait: 'Lacht om de slechtste grappen', category: 'humor' },
  { id: 'trait-22', trait: 'Maakt de beste geluidseffecten', category: 'humor' },
  { id: 'trait-35', trait: 'De dramaqueen', category: 'humor' },
  { id: 'trait-46', trait: 'Heeft de gekste dansmoves', category: 'humor' },
  { id: 'trait-47', trait: 'Praat in zijn of haar slaap', category: 'humor' },
  { id: 'trait-48', trait: 'Zingt het hardst onder de douche', category: 'humor' },
  { id: 'trait-49', trait: 'Heeft de slechtste richtingsgevoel', category: 'humor' },
  { id: 'trait-50', trait: 'Is het vaakst de afstandsbediening kwijt', category: 'humor' },

  // ============================================================
  // DAGELIJKS
  // ============================================================
  { id: 'trait-7', trait: 'De beste kok', category: 'dagelijks' },
  { id: 'trait-8', trait: 'Altijd te laat', category: 'dagelijks' },
  { id: 'trait-9', trait: 'De langste doucher', category: 'dagelijks' },
  { id: 'trait-11', trait: 'De grootste shopaholic', category: 'dagelijks' },
  { id: 'trait-13', trait: 'Het meest vergeetachtig', category: 'dagelijks' },
  { id: 'trait-23', trait: 'De snooze-kampioen', category: 'dagelijks' },
  { id: 'trait-24', trait: 'Eet het vaakst snacks voor het eten', category: 'dagelijks' },
  { id: 'trait-37', trait: 'Laat overal lichten aanstaan', category: 'dagelijks' },
  { id: 'trait-51', trait: 'De eerste die in slaap valt', category: 'dagelijks' },
  { id: 'trait-52', trait: 'Het langst op de telefoon', category: 'dagelijks' },
  { id: 'trait-53', trait: 'De opruimer van het stel', category: 'dagelijks' },
  { id: 'trait-54', trait: 'Spendeert het meest aan eten bestellen', category: 'dagelijks' },

  // ============================================================
  // KARAKTER
  // ============================================================
  { id: 'trait-10', trait: 'Het snelst geirriteerd', category: 'karakter' },
  { id: 'trait-12', trait: 'De beste luisteraar', category: 'karakter' },
  { id: 'trait-17', trait: 'De sociale vlinder', category: 'karakter' },
  { id: 'trait-25', trait: 'Huilt het snelst bij een film', category: 'karakter' },
  { id: 'trait-26', trait: 'Het meest behulpzaam voor anderen', category: 'karakter' },
  { id: 'trait-38', trait: 'De grootste piekeraar', category: 'karakter' },
  { id: 'trait-40', trait: 'De meest competitieve', category: 'karakter' },
  { id: 'trait-55', trait: 'De rustigste in een crisis', category: 'karakter' },
  { id: 'trait-56', trait: 'De meest emotionele', category: 'karakter' },
  { id: 'trait-57', trait: 'De eerlijkste van het stel', category: 'karakter' },
  { id: 'trait-58', trait: 'Het meest diplomatieke', category: 'karakter' },

  // ============================================================
  // RELATIE
  // ============================================================
  { id: 'trait-27', trait: 'De meest jaloerse', category: 'relatie' },
  { id: 'trait-28', trait: 'Zegt het vaakst sorry', category: 'relatie' },
  { id: 'trait-29', trait: 'Neemt het initiatief voor dates', category: 'relatie' },
  { id: 'trait-30', trait: 'De meest aanhankelijke', category: 'relatie' },
  { id: 'trait-31', trait: 'Stuurt de liefste berichtjes', category: 'relatie' },
  { id: 'trait-32', trait: 'Geeft het vaakst toe in een discussie', category: 'relatie' },
  { id: 'trait-33', trait: 'Zegt het vaakst "ik hou van je"', category: 'relatie' },
  { id: 'trait-34', trait: 'De beste knuffelaar', category: 'relatie' },
  { id: 'trait-39', trait: 'Herinnert altijd verjaardagen', category: 'relatie' },
  { id: 'trait-59', trait: 'De meest attente', category: 'relatie' },
  { id: 'trait-60', trait: 'Plant de leukste verrassingen', category: 'relatie' },
  { id: 'trait-61', trait: 'De beste in cadeaus uitzoeken', category: 'relatie' },

  // ============================================================
  // VAKANTIE & VRIJE TIJD
  // ============================================================
  { id: 'trait-62', trait: 'Pakt de koffer het volledigst', category: 'vakantie' },
  { id: 'trait-63', trait: 'Wordt het snelst zenuwachtig op het vliegveld', category: 'vakantie' },
  { id: 'trait-64', trait: 'Plant de vakantie tot in detail', category: 'vakantie' },
  { id: 'trait-65', trait: 'Ligt het liefst aan het zwembad', category: 'vakantie' },
  { id: 'trait-66', trait: 'Wil altijd alles zien en doen', category: 'vakantie' },
  { id: 'trait-67', trait: 'De navigator op roadtrips', category: 'vakantie' },
  { id: 'trait-68', trait: 'Boekt op het laatste moment', category: 'vakantie' },
  { id: 'trait-69', trait: 'Neemt de meeste souvenirs mee', category: 'vakantie' },

  // ============================================================
  // FAMILIE & SOCIAAL
  // ============================================================
  { id: 'trait-70', trait: 'Praat het langst met de schoonfamilie', category: 'familie' },
  { id: 'trait-71', trait: 'Is de favoriet bij de kinderen', category: 'familie' },
  { id: 'trait-72', trait: 'Organiseert het vaakst iets met vrienden', category: 'familie' },
  { id: 'trait-73', trait: 'De strengste opvoeder', category: 'familie' },
  { id: 'trait-74', trait: 'Brengt de meeste energie naar een feest', category: 'familie' },
  { id: 'trait-75', trait: 'Wil als eerste naar huis van een feestje', category: 'familie' },
  { id: 'trait-76', trait: 'Is altijd de fotograaf', category: 'familie' },
  { id: 'trait-77', trait: 'De beste gastvrouw/gastheer', category: 'familie' },

  // ============================================================
  // WERK & AMBITIE
  // ============================================================
  { id: 'trait-78', trait: 'De hardste werker', category: 'werk' },
  { id: 'trait-79', trait: 'Neemt werk het vaakst mee naar huis', category: 'werk' },
  { id: 'trait-80', trait: 'De meest ambitieuze', category: 'werk' },
  { id: 'trait-81', trait: 'Heeft de meeste bijbanen gehad', category: 'werk' },
  { id: 'trait-82', trait: 'Klaagt het meest over collega\'s', category: 'werk' },
  { id: 'trait-83', trait: 'Kan het slechtst stilzitten', category: 'werk' },
  { id: 'trait-84', trait: 'De beste multitasker', category: 'werk' },
  { id: 'trait-85', trait: 'Heeft de wildste carriere-ideeën', category: 'werk' },
];
