export type Feeling = {
  id: string;
  label: string;
  icon: string;
};

export type Need = {
  id: string;
  label: string;
  icon: string;
};

export const feelings: Feeling[] = [
  { id: 'boos', label: 'Boos', icon: 'flame' },
  { id: 'verdrietig', label: 'Verdrietig', icon: 'cloud-rain' },
  { id: 'teleurgesteld', label: 'Teleurgesteld', icon: 'frown' },
  { id: 'onbegrepen', label: 'Onbegrepen', icon: 'help-circle' },
  { id: 'bang', label: 'Bang', icon: 'shield-alert' },
  { id: 'gefrustreerd', label: 'Gefrustreerd', icon: 'zap' },
  { id: 'overweldigd', label: 'Overweldigd', icon: 'waves' },
  { id: 'eenzaam', label: 'Eenzaam', icon: 'user' },
];

export const needs: Need[] = [
  { id: 'gehoord-worden', label: 'Gehoord worden', icon: 'ear' },
  { id: 'ruimte', label: 'Ruimte', icon: 'expand' },
  { id: 'bevestiging', label: 'Bevestiging', icon: 'check-circle' },
  { id: 'begrip', label: 'Begrip', icon: 'heart-handshake' },
  { id: 'een-knuffel', label: 'Een knuffel', icon: 'hand-heart' },
  { id: 'samen-oplossen', label: 'Samen oplossen', icon: 'puzzle' },
  { id: 'rust', label: 'Rust', icon: 'moon' },
  { id: 'veiligheid', label: 'Veiligheid', icon: 'shield' },
];

export const breathingConfig = {
  inhale: 4,
  exhale: 4,
  rounds: 3,
};

export const iMessageTemplate =
  'Ik voel me {feeling} omdat {situation}. Wat ik nodig heb is {need}.';
