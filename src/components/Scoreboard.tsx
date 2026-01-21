'use client';

import { useGameStore } from '@/store/gameStore';

export function Scoreboard() {
  const players = useGameStore((state) => state.players);
  const activePlayerIndex = useGameStore((state) => state.activePlayerIndex);
  const roundScores = useGameStore((state) => state.roundScores);
  const currentRoundNumber = useGameStore((state) => state.currentRoundNumber);
  const currentRoundScore = useGameStore((state) => state.currentRoundScore);

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

  // Get current round scores (for ongoing round)
  const getCurrentRoundScores = () => {
    return players.map(player => ({
      player,
      score: currentRoundScore[player.id] || 0,
    }));
  };

  // Get round scores for a specific round
  const getRoundScores = (roundIndex: number) => {
    if (roundIndex < roundScores.length) {
      const round = roundScores[roundIndex];
      return players.map(player => ({
        player,
        score: round.playerScores[player.id] || 0,
      }));
    }
    return null;
  };

  // Always show R1, R2, R3, R4 (fixed 4 rounds)
  const displayRounds = [1, 2, 3, 4];

  return (
    <div className="flex gap-2 items-start">
      {/* Label on the left */}
      <div className="flex-shrink-0">
        <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 whitespace-nowrap">
          Scoreboard
        </h3>
      </div>
      
      {/* Card content - Stretches to fit content horizontally */}
      <div className="flex-1 h-[133px] bg-gray-100 dark:bg-gray-800 rounded-lg p-3 border-2 border-blue-300 dark:border-blue-700 flex flex-col overflow-hidden">
        <div 
          className="grid gap-1 flex-1 overflow-hidden"
          style={{ gridTemplateColumns: `repeat(${displayRounds.length + 1}, minmax(0, 1fr))` }}
        >
          {/* Part 1: Player Information */}
          <div className="flex flex-col gap-1">
            <h4 className="text-xs font-bold text-gray-900 dark:text-gray-100 mb-1 sticky top-0 bg-gray-100 dark:bg-gray-800 z-10">Players</h4>
            {players.map((player, index) => (
              <div
                key={player.id}
                className={`flex flex-col px-1 py-0.5 rounded text-[10px] transition-all ${
                  index === activePlayerIndex
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                }`}
              >
                <span className="font-semibold truncate">{player.name}</span>
                <span className="opacity-90">Total: {player.score}</span>
              </div>
            ))}
          </div>

          {/* Dynamic Round Columns */}
          {displayRounds.map((roundNum) => {
            const roundIndex = roundNum - 1; // Convert to 0-based index
            const isCurrentRound = roundNum === currentRoundNumber;
            const isCompleted = roundIndex < roundScores.length;

            return (
              <div key={roundNum} className="flex flex-col gap-1">
                <h4 className="text-xs font-bold text-gray-900 dark:text-gray-100 mb-1 sticky top-0 bg-gray-100 dark:bg-gray-800 z-10">
                  R{roundNum}
                </h4>
                {isCompleted ? (
                  <>
                    {getRoundScores(roundIndex)?.map(({ player, score }) => (
                      <div
                        key={player.id}
                        className={`px-1 py-0.5 rounded text-[10px] text-center ${
                          getTopperName(roundIndex) === player.name
                            ? 'bg-yellow-400 dark:bg-yellow-600 font-bold'
                            : 'bg-white dark:bg-gray-700'
                        }`}
                      >
                        {score}
                        {getTopperName(roundIndex) === player.name && ' 👑'}
                      </div>
                    ))}
                  </>
                ) : isCurrentRound ? (
                  getCurrentRoundScores().map(({ player, score }) => (
                    <div
                      key={player.id}
                      className="px-1 py-0.5 rounded text-[10px] bg-white dark:bg-gray-700 text-center"
                    >
                      {score}
                    </div>
                  ))
                ) : (
                  <div className="px-1 py-0.5 rounded text-[10px] bg-white dark:bg-gray-700 text-gray-500 text-center">
                    -
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
