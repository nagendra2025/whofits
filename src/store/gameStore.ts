'use client';

import { create } from 'zustand';
import type { Player, Round, AttemptState, PlacedState, RoundScore } from '@/types/game';
import { generateRound } from '@/lib/round';
import { people } from '@/data/people';
import { roles } from '@/data/roles';
import { getScoreForAttempt, calculateAttemptNumber } from '@/lib/scoring';

interface GameState {
  // Player setup
  players: Player[];
  activePlayerIndex: number;
  isSetupComplete: boolean;
  
  // Round state
  currentRound: Round | null;
  currentRoundNumber: number;
  roundScores: RoundScore[]; // All completed rounds
  attempts: AttemptState;
  placed: PlacedState;
  currentRoundScore: Record<string, number>; // playerId -> score for current round
  skipCount: Record<string, number>; // playerId -> skip count for current round (max 2)
  
  // UI state
  showRoundComplete: boolean;
  showGameComplete: boolean; // Show prompt for new game after 4 rounds
  
  // Actions
  initializePlayers: (playerNames: string[]) => void;
  startNewRound: (preserveSkipCount?: boolean) => void;
  handleDrop: (personId: string, roleId: string) => void;
  advanceTurn: () => void;
  dismissRoundComplete: () => void;
  resetGame: () => void;
  continueGame: () => void; // Reset round scores but keep players
  skipRound: () => void; // Skip current round and get new name cards
}

export const useGameStore = create<GameState>((set, get) => ({
  players: [],
  activePlayerIndex: 0,
  isSetupComplete: false,
  currentRound: null,
  currentRoundNumber: 0,
  roundScores: [],
  attempts: {},
  placed: {},
  currentRoundScore: {},
  skipCount: {},
  showRoundComplete: false,
  showGameComplete: false,

  initializePlayers: (playerNames: string[]) => {
    const newPlayers: Player[] = playerNames.map((name, i) => ({
      id: `player-${i + 1}`,
      name: name.trim() || `Player ${i + 1}`,
      score: 0,
      roundScores: [],
    }));

    set({
      players: newPlayers,
      activePlayerIndex: 0,
      isSetupComplete: true,
      currentRoundNumber: 1,
      currentRoundScore: {},
    });

    // Start first round
    get().startNewRound();
  },

  startNewRound: (preserveSkipCount: boolean = false) => {
    const roleIds = roles.map((r) => r.id);
    const round = generateRound(people, roles, roleIds);

    if (!round) {
      console.error('Failed to generate round');
      return;
    }

    // Initialize attempts and placed state for this round
    const newAttempts: AttemptState = {};
    const newPlaced: PlacedState = {};
    
    round.people.forEach((person) => {
      newAttempts[person.id] = 0;
      newPlaced[person.id] = null;
    });

    const state = get();
    const updateData: any = {
      currentRound: round,
      attempts: newAttempts,
      placed: newPlaced,
      showRoundComplete: false,
      currentRoundScore: {},
    };

    // Only reset skip count if not preserving it (i.e., it's a new round, not a skip)
    if (preserveSkipCount) {
      // Explicitly preserve the current skip count
      updateData.skipCount = state.skipCount;
    } else {
      // Reset skip count for new round
      updateData.skipCount = {};
    }

    set(updateData);
  },

  handleDrop: (personId: string, roleId: string) => {
    const state = get();
    const { currentRound, attempts, placed, players, activePlayerIndex, currentRoundScore } = state;

    if (!currentRound) return;

    // If already placed correctly, ignore
    if (placed[personId] !== null) return;

    // Check if correct
    const correctRoleId = currentRound.correctMap[personId];
    const isCorrect = roleId === correctRoleId;

    if (isCorrect) {
      // Calculate score
      const attemptsUsed = attempts[personId] || 0;
      const attemptNumber = calculateAttemptNumber(attemptsUsed);
      const points = getScoreForAttempt(attemptNumber);

      // Update player total score
      const updatedPlayers = [...players];
      updatedPlayers[activePlayerIndex].score += points;

      // Update current round score
      const activePlayerId = updatedPlayers[activePlayerIndex].id;
      const updatedRoundScore = {
        ...currentRoundScore,
        [activePlayerId]: (currentRoundScore[activePlayerId] || 0) + points,
      };

      // Lock the card
      const updatedPlaced = { ...placed, [personId]: roleId };

      set({
        players: updatedPlayers,
        placed: updatedPlaced,
        currentRoundScore: updatedRoundScore,
      });

      // Check if round is complete (all 3 portraits placed)
      const allPlaced = currentRound.people.every((p) => updatedPlaced[p.id] !== null);
      
      if (allPlaced) {
        // Determine topper for this round
        const roundScoreEntries = Object.entries(updatedRoundScore);
        let topperId: string | null = null;
        let maxScore = -1;
        
        roundScoreEntries.forEach(([playerId, score]) => {
          if (score > maxScore) {
            maxScore = score;
            topperId = playerId;
          } else if (score === maxScore && score > 0) {
            // If tie, keep first one (or could be null if all 0)
            if (topperId === null) {
              topperId = playerId;
            }
          }
        });

        // Save round score
        const stateAfter = get();
        const newRoundScore: RoundScore = {
          roundNumber: stateAfter.currentRoundNumber,
          playerScores: updatedRoundScore,
          topperId: topperId,
        };

        // Update players with round scores
        const playersWithRoundScores = updatedPlayers.map((player) => {
          const roundIndex = stateAfter.currentRoundNumber - 1;
          const newRoundScores = [...player.roundScores];
          newRoundScores[roundIndex] = updatedRoundScore[player.id] || 0;
          return { ...player, roundScores: newRoundScores };
        });

        const updatedRoundScores = [...stateAfter.roundScores, newRoundScore];

        // Check if we've completed 4 rounds
        const isGameComplete = updatedRoundScores.length >= 4;

        set({
          players: playersWithRoundScores,
          roundScores: updatedRoundScores,
          showRoundComplete: !isGameComplete, // Only show round complete if game is not complete
          showGameComplete: isGameComplete, // Show game complete prompt if 4 rounds done
        });

        // Auto-advance after a brief delay (only if game is not complete)
        if (!isGameComplete) {
          setTimeout(() => {
            get().advanceTurn();
          }, 2000);
        }
      }
    } else {
      // Wrong drop - increment attempts
      const updatedAttempts = {
        ...attempts,
        [personId]: Math.min(5, (attempts[personId] || 0) + 1),
      };
      set({ attempts: updatedAttempts });
    }
  },

  advanceTurn: () => {
    const state = get();
    const { players, activePlayerIndex, currentRoundNumber } = state;
    
    // Cycle through players: works for any number of players (2, 3, 4, 5, etc.)
    const nextPlayerIndex = (activePlayerIndex + 1) % players.length;
    
    // New round starts when we cycle back to player 0 (first player)
    // This works correctly for any number of players
    const nextRoundNumber = nextPlayerIndex === 0 
      ? currentRoundNumber + 1 
      : currentRoundNumber;
    
    const isNewRound = nextRoundNumber > currentRoundNumber;
    
    set({
      activePlayerIndex: nextPlayerIndex,
      currentRoundNumber: nextRoundNumber,
      showRoundComplete: false,
    });

    // Start new round - preserve skip count if just switching players (not a new round)
    // Skip count is tracked per player ID, so it works independently for each player
    get().startNewRound(!isNewRound);
  },

  resetGame: () => {
    // Reset all game state - go back to player setup
    set({
      players: [],
      activePlayerIndex: 0,
      isSetupComplete: false,
      currentRound: null,
      currentRoundNumber: 0,
      roundScores: [],
      attempts: {},
      placed: {},
      currentRoundScore: {},
      skipCount: {},
      showRoundComplete: false,
      showGameComplete: false,
    });
  },

  continueGame: () => {
    // Reset round scores but keep players and total scores
    const state = get();
    const updatedPlayers = state.players.map(player => ({
      ...player,
      roundScores: [], // Reset round-by-round scores
    }));
    
    set({
      players: updatedPlayers,
      roundScores: [],
      currentRoundNumber: 1,
      activePlayerIndex: 0,
      showGameComplete: false,
      showRoundComplete: false,
      currentRoundScore: {},
      skipCount: {},
    });
    // Start first round of new game
    get().startNewRound();
  },

  skipRound: () => {
    const state = get();
    const { players, activePlayerIndex, skipCount: currentSkipCount } = state;
    
    if (!players[activePlayerIndex]) return;
    
    // Get the currently active player (works for any number of players)
    const activePlayerId = players[activePlayerIndex].id;
    const currentSkips = currentSkipCount[activePlayerId] || 0;
    
    // Check if player has skips remaining (each player gets 2 skips per round)
    if (currentSkips >= 2) {
      return; // No more skips allowed for this player
    }
    
    // Increment skip count for the active player only
    // Skip count is tracked per player ID, so each player has independent skip count
    const updatedSkipCount = {
      ...currentSkipCount,
      [activePlayerId]: currentSkips + 1,
    };
    
    // Set skip count before generating new round
    set({ skipCount: updatedSkipCount });
    
    // Generate new round with new people, but preserve skip count for all players
    get().startNewRound(true);
  },

  dismissRoundComplete: () => {
    set({ showRoundComplete: false });
  },
}));
