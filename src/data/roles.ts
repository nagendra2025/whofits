import type { Role } from '@/types/game';

export const roles: Role[] = [
  { id: 'president', label: 'President', category: 'politics' },
  { id: 'prime_minister', label: 'Prime Minister', category: 'politics' },
  { id: 'ceo', label: 'CEO', category: 'business' },
  { id: 'cto', label: 'CTO', category: 'business' },
  { id: 'scientist', label: 'Scientist', category: 'science' },
  { id: 'chemist', label: 'Chemist', category: 'science' },
  { id: 'physicist', label: 'Physicist', category: 'science' },
  { id: 'mathematician', label: 'Mathematician', category: 'science' },
  { id: 'nobel_prize_winner', label: 'Nobel Prize Winner', category: 'science' },
  { id: 'actor', label: 'Actor', category: 'arts' },
  { id: 'actress', label: 'Actress', category: 'arts' },
  { id: 'singer', label: 'Singer', category: 'arts' },
  { id: 'player', label: 'Player', category: 'sports' },
  { id: 'captain', label: 'Captain', category: 'sports' },
];
