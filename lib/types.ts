// User profile
export type Profile = {
  id: string;
  email: string;
  name: string;
  avatar_url: string | null;
  couple_id: string | null;
  push_token: string | null;
  love_language: LoveLanguage | null;
  is_premium: boolean;
  created_at: string;
};

// Couple
export type Couple = {
  id: string;
  partner_a: string;
  partner_b: string;
  relationship_start: string | null;
  invite_code: string;
  status: 'pending' | 'active';
  created_at: string;
};

// Daily check-in
export type CheckIn = {
  id: string;
  user_id: string;
  couple_id: string;
  mood: 1 | 2 | 3 | 4 | 5;
  pulse: 1 | 2 | 3 | 4 | 5;
  date: string; // YYYY-MM-DD
  created_at: string;
};

// Question (daily or from pack)
export type Question = {
  id: string;
  text: string;
  category: QuestionCategory;
  pack_id: string | null;
  is_free: boolean;
};

export type QuestionCategory =
  | 'communicatie'
  | 'intimiteit'
  | 'dromen'
  | 'gezin'
  | 'geld'
  | 'plezier'
  | 'groei'
  | 'conflict'
  | 'herinneringen'
  | 'toekomst'
  | 'dagelijks';

// Question response (mutual reveal)
export type QuestionResponse = {
  id: string;
  question_id: string;
  user_id: string;
  couple_id: string;
  answer: string;
  revealed: boolean;
  date: string;
  created_at: string;
};

// Question pack
export type QuestionPack = {
  id: string;
  name: string;
  description: string;
  category: QuestionCategory;
  icon: string;
  question_count: number;
  is_free: boolean;
  questions: Question[];
};

// Game round
export type GameRound = {
  id: string;
  couple_id: string;
  question: string;
  about_user_id: string;
  prediction: string | null;
  actual_answer: string | null;
  predicted_by: string | null;
  is_correct: boolean | null;
  created_at: string;
};

// Gratitude entry
export type GratitudeEntry = {
  id: string;
  couple_id: string;
  user_id: string;
  text: string;
  category: 'klein' | 'groot' | 'grappig' | 'wie-je-bent';
  photo_url: string | null;
  created_at: string;
};

// Moment (BeReal-style)
export type Moment = {
  id: string;
  couple_id: string;
  user_id: string;
  photo_url: string;
  story: string;
  location: string | null;
  is_favorite: boolean;
  created_at: string;
};

// Date plan
export type DatePlan = {
  id: string;
  couple_id: string;
  planner_id: string;
  title: string;
  description: string | null;
  scheduled_date: string;
  is_revealed: boolean;
  rating: number | null;
  review: string | null;
  created_at: string;
};

// Journey/Traject
export type Journey = {
  id: string;
  name: string;
  description: string;
  weeks: number;
  category: string;
  steps: JourneyStep[];
};

export type JourneyStep = {
  id: string;
  journey_id: string;
  week: number;
  title: string;
  content: string;
  exercise: string;
  prompts: string[];
};

export type JourneyProgress = {
  id: string;
  couple_id: string;
  journey_id: string;
  current_step: number;
  started_at: string;
  completed_at: string | null;
};

// Milestone
export type Milestone = {
  id: string;
  couple_id: string;
  title: string;
  date: string;
  type:
    | 'eerste-date'
    | 'samenwonen'
    | 'trouwen'
    | 'kind'
    | 'verjaardag'
    | 'custom';
  photo_url: string | null;
  note: string | null;
};

// Love language
export type LoveLanguage =
  | 'woorden'
  | 'quality-time'
  | 'cadeaus'
  | 'hulpvaardigheid'
  | 'aanraking';

// Coach message
export type CoachMessage = {
  id: string;
  couple_id: string;
  user_id: string;
  role: 'user' | 'coach';
  content: string;
  created_at: string;
};

// Momentje (private story for partner)
export type Momentje = {
  id: string;
  image_uri: string | null;
  text: string | null;
  created_at: string;
  expires_at: string;
  saved_to_verhaal: boolean;
  seen_by_partner: boolean;
};

// Timeline entry (union type for Ons Verhaal)
export type TimelineEntry = {
  id: string;
  created_at: string;
} & (
  | { type: 'moment'; data: { photo_url: string; story: string; location?: string } }
  | { type: 'milestone'; data: { title: string; date: string; milestone_type: Milestone['type']; photo_url?: string; note?: string } }
  | { type: 'gratitude'; data: { text: string; category: GratitudeEntry['category'] } }
  | { type: 'checkin'; data: { mood: 1 | 2 | 3 | 4 | 5; pulse: 1 | 2 | 3 | 4 | 5 } }
  | { type: 'activity'; data: { title: string; activityType: string; summary?: string } }
  | { type: 'reflection'; data: { text: string; mood_tag?: string } }
);
