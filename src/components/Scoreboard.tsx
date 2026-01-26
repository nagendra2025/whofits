'use client';

import { useGameStore } from '@/store/gameStore';

export function Scoreboard() {
  const players = useGameStore((state) => state.players);
  const activePlayerIndex = useGameStore((state) => state.activePlayerIndex);
  const roundScores = useGameStore((state) => state.roundScores);
  const currentRoundNumber = useGameStore((state) => state.currentRoundNumber);
  const currentRoundScore = useGameStore((state) => state.currentRoundScore);
  const totalRounds = useGameStore((state) => state.totalRounds);

  if (players.length === 0) return null;

  // Get topper for each round
  const getTopperName = (roundIndex: number): string | null => {
    if (roundIndex < roundScores.length) {
      const round = roundScores[roundIndex];
      if (round.topperId) {
        const topper = players.find(p => p.id === round.topperId);
        return topper?.name || null;
      }
    }
    return null;
  };

  // Get current turn scores (for ongoing turn) - each player's score for the current turn
  const getCurrentRoundScores = () => {
    return players.map(player => ({
      player,
      score: currentRoundScore[player.id] || 0, // Turn score for current turn
    }));
  };

  // Get turn scores for a specific completed turn - each player's score for that turn
  const getRoundScores = (roundIndex: number) => {
    if (roundIndex < roundScores.length) {
      const round = roundScores[roundIndex];
      return players.map(player => ({
        player,
        score: round.playerScores[player.id] || 0, // Turn score for this specific turn
      }));
    }
    return null;
  };

  // Show rounds dynamically based on totalRounds (1 player = 4, 2 players = 6, 3 players = 9, 4 players = 12)
  const displayRounds = Array.from({ length: totalRounds }, (_, i) => i + 1);

  // Calculate maximum score for progress bar scaling
  // Use the highest score among players, or theoretical max, whichever is higher
  // This ensures all progress bars scale proportionately
  const maxCurrentScore = players.length > 0 ? Math.max(...players.map(p => p.score), 0) : 100;
  const theoreticalMaxScore = totalRounds * 100 * 3; // 3 name cards per turn, 100 points max each
  // Use the higher of current max or theoretical max to ensure proportional scaling
  const progressMaxScore = Math.max(maxCurrentScore, theoreticalMaxScore, 100);

  return (
    <div className="flex gap-2 items-start">
      {/* Label on the left - Fixed width for alignment */}
      <div className="flex-shrink-0 w-24">
        <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 whitespace-nowrap">
          Scoreboard
        </h3>
      </div>
      
      {/* Card content - Stretches to fit content horizontally, expands vertically for players */}
      <div className="flex-1 min-h-[133px] bg-gray-100 dark:bg-gray-800 rounded-lg p-3 border-2 border-sky-300 dark:border-sky-500 flex flex-col shadow-md">
        <div 
          className="grid gap-1 flex-1"
          style={{ 
            gridTemplateColumns: `auto ${displayRounds.map(() => '30px').join(' ')}`
          }}
        >
          {/* Part 1: Player Information with Progress Bars */}
          <div className="flex flex-col gap-2 min-w-0">
            <h4 className="text-xs font-bold text-gray-900 dark:text-gray-100 mb-1 sticky top-0 bg-gray-100 dark:bg-gray-800 z-10">Players</h4>
            {players.map((player, index) => {
              const isActive = index === activePlayerIndex;
              const progressPercentage = Math.min((player.score / progressMaxScore) * 100, 100);
              
              return (
                <div
                  key={player.id}
                  className={`px-2 py-1.5 rounded text-[10px] transition-all ${
                    isActive
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                  }`}
                >
                  {/* Player name and total score on first line */}
                  <div className="mb-1.5">
                    <span className="font-semibold truncate block">
                      {player.name} (Total: {player.score})
                    </span>
                  </div>
                  
                  {/* Progress bar on second line */}
                  <div className="relative h-5 bg-gray-200 dark:bg-gray-600 rounded overflow-hidden">
                    {/* Progress bar that moves right as score increases - professional gradient */}
                    <div
                      className={`h-full rounded transition-all duration-300 ${
                        isActive 
                          ? 'bg-gradient-to-r from-indigo-500 to-indigo-600' 
                          : 'bg-gradient-to-r from-slate-400 to-slate-500'
                      }`}
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dynamic Turn Columns - Each column shows one cell with the turn score (only after turn is completed) */}
          {displayRounds.map((roundNum) => {
            const roundIndex = roundNum - 1; // Convert to 0-based index
            const isCompleted = roundIndex < roundScores.length;
            // Current turn is the next turn after all completed turns
            // If we've completed 4 turns (roundScores.length = 4), we're on turn 5
            const actualCurrentTurn = roundScores.length + 1;
            const isCurrentRound = roundNum === actualCurrentTurn;

            // Get turn score - only show after turn is completed (after placing 3 name cards)
            let turnScore: number | null = null;
            let hasTopper = false;
            let topperName: string | null = null;

            if (isCompleted) {
              const round = roundScores[roundIndex];
              topperName = getTopperName(roundIndex);
              hasTopper = topperName !== null;
              
              // Show the topper's (winner's) score for this turn, or the highest score if no topper
              if (topperName) {
                const topper = players.find(p => p.name === topperName);
                if (topper) {
                  turnScore = round.playerScores[topper.id] || 0;
                }
              } else {
                // If no topper, show the highest score
                const scores = Object.values(round.playerScores);
                turnScore = scores.length > 0 ? Math.max(...scores) : 0;
              }
            }
            // For current or future turns, don't show score (show "-")

            return (
              <div key={roundNum} className="flex flex-col gap-1 min-w-[30px] max-w-[30px]">
                <h4 className={`text-[9px] font-bold mb-1 sticky top-0 z-10 text-center leading-tight ${
                  isCurrentRound
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-800'
                }`}>
                  T{roundNum}
                </h4>
                {/* Single cell showing turn score only after turn is completed */}
                <div
                  className={`px-1 py-1 rounded text-center min-h-[40px] flex items-center justify-center transition-all ${
                    isCurrentRound
                      ? 'bg-blue-500 text-white shadow-lg'
                      : isCompleted && hasTopper
                      ? 'bg-yellow-100 dark:bg-yellow-900/30'
                      : isCompleted
                      ? 'bg-white dark:bg-gray-700'
                      : 'bg-white dark:bg-gray-700 text-gray-500'
                  }`}
                >
                  {isCompleted && turnScore !== null ? (
                    <span className={`font-bold text-sm ${
                      isCurrentRound ? 'text-white' : ''
                    }`}>
                      {turnScore}
                    </span>
                  ) : (
                    <span className={`text-[10px] ${
                      isCurrentRound ? 'text-white' : ''
                    }`}>-</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
