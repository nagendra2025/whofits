'use client';

import { useGameStore } from '@/store/gameStore';

export function GameCompleteModal() {
  const showGameComplete = useGameStore((state) => state.showGameComplete);
  const players = useGameStore((state) => state.players);
  const resetGame = useGameStore((state) => state.resetGame);

  if (!showGameComplete) return null;

  // Find winner (player with highest total score)
  const winner = players.reduce((prev, current) => 
    (current.score > prev.score) ? current : prev
  , players[0]);

  const handleNewGame = () => {
    resetGame();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 text-center">
          Game Complete! 🎉
        </h2>
        
        <div className="mb-6">
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3 text-center">
            Final Scores:
          </p>
          <div className="space-y-2">
            {players
              .sort((a, b) => b.score - a.score)
              .map((player, index) => (
                <div
                  key={player.id}
                  className={`flex justify-between items-center p-2 rounded ${
                    player.id === winner.id
                      ? 'bg-yellow-400 dark:bg-yellow-600 font-bold'
                      : 'bg-gray-100 dark:bg-gray-700'
                  }`}
                >
                  <span className="text-gray-900 dark:text-gray-100">
                    {index === 0 && '👑 '}
                    {player.name}
                  </span>
                  <span className="text-gray-900 dark:text-gray-100">
                    {player.score} points
                  </span>
                </div>
              ))}
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={handleNewGame}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors"
          >
            Start New Game
          </button>
        </div>
      </div>
    </div>
  );
}

