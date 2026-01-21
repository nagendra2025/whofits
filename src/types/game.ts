export type RoleCategory = 'politics' | 'business' | 'arts' | 'science' | 'sports' | 'other';

export interface Role {
  id: string;
  label: string;
  category?: RoleCategory;
}

export interface Person {
  id: string;
  name: string;
  roles: string[]; // Role.id values
  country?: string | null;
  company?: string | null;
  difficulty?: 1 | 2 | 3 | 4 | 5;
}

export interface Round {
  id: string;
  people: Person[]; // exactly 3
  placeholders: string[]; // exactly 7 Role.id values
  correctMap: Record<string, string>; // personId -> correct Role.id for this round
}

export interface Player {
  id: string;
  name: string;
  score: number;
  roundScores: number[]; // Scores for each round (index 0 = round 1, etc.)
}

export interface RoundScore {
  roundNumber: number;
  playerScores: Record<string, number>; // playerId -> score for this round
  topperId: string | null; // playerId who scored highest in this round
}

export type AttemptState = Record<string, number>; // personId -> wrong attempts used so far (0..5)

export type PlacedState = Record<string, string | null>; // personId -> roleId where it is placed (null if not placed)
