'use client';

import { useGameStore } from '@/store/gameStore';

export function GameCompletePrompt() {
  const showGameComplete = useGameStore((state) => state.showGameComplete);
  const players = useGameStore((state) => state.players);
  const totalRounds = useGameStore((state) => state.totalRounds);
  const continueGame = useGameStore((state) => state.continueGame);
  const resetGame = useGameStore((state) => state.resetGame);

  if (!showGameComplete) return null;

  const handleContinue = () => {
    continueGame();
  };

  const handleExit = () => {
    resetGame();
  };

  return (
    <div className="flex gap-2 items-start">
      {/* Spacer to align with labels - Fixed width */}
      <div className="flex-shrink-0 w-24">
      </div>
      
      {/* Prompt - Same width as cards */}
      <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-4 border-2 border-orange-300 dark:border-orange-500 shadow-md">
        <div className="text-center mb-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
            Game Complete! 🎉
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            All {totalRounds} turns completed. What would you like to do?
          </p>
        </div>
        
        <div className="flex gap-3 justify-center">
          <button
            onClick={handleContinue}
            className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors text-sm"
          >
            Continue (Reset Rounds)
          </button>
          <button
            onClick={handleExit}
            className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors text-sm"
          >
            Exit (New Game)
          </button>
        </div>
      </div>
    </div>
  );
}


