'use client';

import { create } from 'zustand';
import type { Player, Round, AttemptState, PlacedState, RoundScore } from '@/types/game';
import { generateRound } from '@/lib/round';
import { people } from '@/data/people';
import { roles } from '@/data/roles';
import { getScoreForAttempt, calculateAttemptNumber } from '@/lib/scoring';

// Helper functions to calculate rounds and skip counts based on player count
function getTotalRounds(playerCount: number): number {
  // 1 player = 4 rounds, 2 players = 8 rounds, 3 players = 9 rounds, 4 players = 12 rounds, 5 players = 20 rounds
  if (playerCount === 1) return 4;
  if (playerCount === 2) return 8;
  if (playerCount === 5) return 20;
  return playerCount * 3;
}

function getSkipCountPerPlayer(playerCount: number): number {
  // 1-2 players = 2 skips each, 3-4 players = 1 skip each, 5 players = 2 skips each
  if (playerCount <= 2) return 2;
  if (playerCount === 5) return 2;
  return 1;
}

interface GameState {
  // Player setup
  players: Player[];
  activePlayerIndex: number;
  isSetupComplete: boolean;
  
  // Round state
  currentRound: Round | null;
  currentRoundNumber: number;
  totalRounds: number; // Total rounds for this game based on player count
  roundScores: RoundScore[]; // All completed rounds
  attempts: AttemptState;
  placed: PlacedState;
  currentRoundScore: Record<string, number>; // playerId -> score for current round
  skipCount: Record<string, number>; // playerId -> skip count for current round
  maxSkipCount: number; // Maximum skip count per player for this game
  hasStartedPlaying: Record<string, boolean>; // playerId -> whether player has started playing (made a move)
  
  // UI state
  showRoundComplete: boolean;
  showGameComplete: boolean; // Show prompt for new game after all rounds complete
  
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
  totalRounds: 4, // Default to 4 rounds
  roundScores: [],
  attempts: {},
  placed: {},
  currentRoundScore: {},
  skipCount: {},
  maxSkipCount: 2, // Default to 2 skips
  hasStartedPlaying: {}, // Track which players have started playing
  showRoundComplete: false,
  showGameComplete: false,

  initializePlayers: (playerNames: string[]) => {
    const newPlayers: Player[] = playerNames.map((name, i) => ({
      id: `player-${i + 1}`,
      name: name.trim() || `Player ${i + 1}`,
      score: 0,
      roundScores: [],
    }));

    const playerCount = newPlayers.length;
    const totalRounds = getTotalRounds(playerCount);
    const maxSkipCount = getSkipCountPerPlayer(playerCount);

    // Initialize skip count for each player
    const initialSkipCount: Record<string, number> = {};
    const initialHasStartedPlaying: Record<string, boolean> = {};
    newPlayers.forEach(player => {
      initialSkipCount[player.id] = 0; // Start with 0 skips used
      initialHasStartedPlaying[player.id] = false; // No player has started playing yet
    });

    set({
      players: newPlayers,
      activePlayerIndex: 0,
      isSetupComplete: true,
      currentRoundNumber: 1,
      currentRoundScore: {},
      totalRounds: totalRounds,
      maxSkipCount: maxSkipCount,
      skipCount: initialSkipCount,
      hasStartedPlaying: initialHasStartedPlaying,
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

    // ALWAYS preserve skip count across rounds - skip count persists for the entire game
    // Skip count is tracked per player and only resets when a new game starts
    // If skip count doesn't exist for a player, initialize it to 0
    const preservedSkipCount: Record<string, number> = {};
    state.players.forEach(player => {
      preservedSkipCount[player.id] = state.skipCount[player.id] || 0;
    });
    updateData.skipCount = preservedSkipCount;

    // Reset hasStartedPlaying for all players when starting a new round
    // This allows each player to skip at the start of their turn (if they have skips remaining)
    const resetHasStartedPlaying: Record<string, boolean> = {};
    state.players.forEach(player => {
      resetHasStartedPlaying[player.id] = false;
    });
    updateData.hasStartedPlaying = resetHasStartedPlaying;

    set(updateData);
  },

  handleDrop: (personId: string, roleId: string) => {
    const state = get();
    const { currentRound, attempts, placed, players, activePlayerIndex, currentRoundScore, hasStartedPlaying } = state;

    if (!currentRound) return;

    // If already placed correctly, ignore
    if (placed[personId] !== null) return;

    // Check if correct
    const correctRoleId = currentRound.correctMap[personId];
    const isCorrect = roleId === correctRoleId;

    // Mark the active player as having started playing (they made a move)
    const activePlayerId = players[activePlayerIndex]?.id;
    const updatedHasStartedPlaying = activePlayerId && !hasStartedPlaying[activePlayerId]
      ? {
          ...hasStartedPlaying,
          [activePlayerId]: true,
        }
      : hasStartedPlaying;

    if (isCorrect) {
      // Calculate score
      const attemptsUsed = attempts[personId] || 0;
      const attemptNumber = calculateAttemptNumber(attemptsUsed);
      const points = getScoreForAttempt(attemptNumber);

      // Update player total score
      const updatedPlayers = [...players];
      updatedPlayers[activePlayerIndex].score += points;

      // Update current round score
      const activePlayerIdForScore = updatedPlayers[activePlayerIndex].id;
      const updatedRoundScore = {
        ...currentRoundScore,
        [activePlayerIdForScore]: (currentRoundScore[activePlayerIdForScore] || 0) + points,
      };

      // Lock the card
      const updatedPlaced = { ...placed, [personId]: roleId };

      set({
        players: updatedPlayers,
        placed: updatedPlaced,
        currentRoundScore: updatedRoundScore,
        hasStartedPlaying: updatedHasStartedPlaying,
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

        // Check if we've completed all rounds (based on player count)
        const isGameComplete = updatedRoundScores.length >= stateAfter.totalRounds;

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
      
      // Mark the active player as having started playing (they made a move, even if wrong)
      const activePlayerIdForWrong = players[activePlayerIndex]?.id;
      const updatedHasStartedPlayingForWrong = activePlayerIdForWrong && !hasStartedPlaying[activePlayerIdForWrong]
        ? {
            ...hasStartedPlaying,
            [activePlayerIdForWrong]: true,
          }
        : hasStartedPlaying;
      
      set({ 
        attempts: updatedAttempts,
        hasStartedPlaying: updatedHasStartedPlayingForWrong,
      });
    }
  },

  advanceTurn: () => {
    const state = get();
    const { players, activePlayerIndex, currentRoundNumber, totalRounds, roundScores } = state;
    
    // Cycle through players: works for any number of players (2, 3, 4, 5, etc.)
    const nextPlayerIndex = (activePlayerIndex + 1) % players.length;
    
    // New round starts when we cycle back to player 0 (first player)
    // This works correctly for any number of players
    const nextRoundNumber = nextPlayerIndex === 0 
      ? currentRoundNumber + 1 
      : currentRoundNumber;
    
    const isNewRound = nextRoundNumber > currentRoundNumber;

    // Check if we've completed all rounds and it's time for a new game prompt
    if (roundScores.length >= totalRounds && nextRoundNumber > totalRounds) {
      set({
        showRoundComplete: false,
        showGameComplete: true, // Trigger game complete prompt
      });
      return;
    }
    
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
      totalRounds: 4,
      roundScores: [],
      attempts: {},
      placed: {},
      currentRoundScore: {},
      skipCount: {},
      maxSkipCount: 2,
      hasStartedPlaying: {},
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
    
    // Reset skip count for all players
    const resetSkipCount: Record<string, number> = {};
    updatedPlayers.forEach(player => {
      resetSkipCount[player.id] = 0;
    });
    
    // Reset hasStartedPlaying for all players
    const resetHasStartedPlaying: Record<string, boolean> = {};
    updatedPlayers.forEach(player => {
      resetHasStartedPlaying[player.id] = false;
    });
    
    set({
      players: updatedPlayers,
      roundScores: [],
      currentRoundNumber: 1,
      activePlayerIndex: 0,
      showGameComplete: false,
      showRoundComplete: false,
      currentRoundScore: {},
      skipCount: resetSkipCount,
      hasStartedPlaying: resetHasStartedPlaying,
    });
    // Start first round of new game
    get().startNewRound();
  },

  skipRound: () => {
    const state = get();
    const { players, activePlayerIndex, skipCount: currentSkipCount, maxSkipCount } = state;
    
    if (!players[activePlayerIndex]) return;
    
    // Get the currently active player (works for any number of players)
    const activePlayerId = players[activePlayerIndex].id;
    const currentSkips = currentSkipCount[activePlayerId] || 0;
    
    // Check if player has skips remaining (based on maxSkipCount for this game)
    if (currentSkips >= maxSkipCount) {
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
