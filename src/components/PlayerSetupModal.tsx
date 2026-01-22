'use client';

import { useState } from 'react';
import { useGameStore } from '@/store/gameStore';

// Helper function to get skip count based on player count (same as in gameStore)
function getSkipCountPerPlayer(playerCount: number): number {
  if (playerCount <= 2) return 2;
  if (playerCount === 5) return 2;
  return 1;
}

// Helper function to get total rounds based on player count
function getTotalRounds(playerCount: number): number {
  if (playerCount === 1) return 4;
  if (playerCount === 2) return 8;
  if (playerCount === 5) return 20;
  return playerCount * 3;
}

export function PlayerSetupModal() {
  const [playerCount, setPlayerCount] = useState(1);
  const [playerNames, setPlayerNames] = useState<string[]>(['']);
  const initializePlayers = useGameStore((state) => state.initializePlayers);

  const handlePlayerCountChange = (count: number) => {
    setPlayerCount(count);
    const names = Array.from({ length: count }, (_, i) => playerNames[i] || '');
    setPlayerNames(names);
  };

  const handleNameChange = (index: number, name: string) => {
    const newNames = [...playerNames];
    newNames[index] = name;
    setPlayerNames(newNames);
  };

  const handleStart = () => {
    if (playerCount >= 1 && playerCount <= 5) {
      const names = playerNames.slice(0, playerCount).map((name, index) => name.trim() || `Player ${index + 1}`);
      initializePlayers(names);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 max-w-7xl w-full mx-4 max-h-[90vh] overflow-y-auto border-2 border-gray-300 dark:border-gray-600">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100 text-center">
          Welcome to WhoFits?
        </h2>
        
        <div className="grid grid-cols-3 gap-6 items-stretch">
          {/* Player Setup */}
          <div className="min-w-0 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              How many players are playing?
            </p>
            <div className="mb-6">
              <input
                type="range"
                min="1"
                max="5"
                value={playerCount}
                onChange={(e) => handlePlayerCountChange(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between mt-2 text-sm text-gray-500">
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
              </div>
              <div className="text-center mt-4">
                <span className="text-3xl font-bold text-gray-900 dark:text-gray-100">{playerCount}</span>
                <span className="text-gray-600 dark:text-gray-400 ml-2">
                  {playerCount === 1 ? 'player' : 'players'}
                </span>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                Enter player names:
              </p>
              <div className="space-y-3">
                {Array.from({ length: playerCount }).map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    placeholder={`Player ${index + 1} name`}
                    value={playerNames[index] || ''}
                    onChange={(e) => handleNameChange(index, e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ))}
              </div>
            </div>

            <button
              onClick={handleStart}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-auto"
            >
              Start Game
            </button>
          </div>

          {/* Game Rules */}
          <div className="min-w-0 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 flex flex-col">
              <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-gray-100">
                Game Rules
              </h3>
              
              {/* Scoring Rules */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold mb-2 text-gray-800 dark:text-gray-200">
                  Scoring:
                </h4>
                <ul className="text-xs text-gray-700 dark:text-gray-300 space-y-1 ml-4 list-disc">
                  <li>1st attempt: <span className="font-bold">100 points</span></li>
                  <li>2nd attempt: <span className="font-bold">50 points</span></li>
                  <li>3rd attempt: <span className="font-bold">20 points</span></li>
                  <li>4th attempt: <span className="font-bold">10 points</span></li>
                  <li>5th attempt: <span className="font-bold">5 points</span></li>
                </ul>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                  Points are awarded when you correctly match a name card to its role. Fewer attempts = more points!
                </p>
              </div>

              {/* Gameplay Instructions */}
              <div>
                <h4 className="text-sm font-semibold mb-2 text-gray-800 dark:text-gray-200">
                  How to Play:
                </h4>
                <ul className="text-xs text-gray-700 dark:text-gray-300 space-y-1 ml-4 list-disc">
                  <li>Drag name cards to the matching role drop zones</li>
                  <li>Match all 3 name cards correctly to complete the round</li>
                  <li>Take turns with other players</li>
                  <li>Player with highest total score wins!</li>
                </ul>
              </div>
            </div>

          {/* Game Rules Continued */}
          <div className="min-w-0 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden">
              <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-gray-100">
                Game Rules Continued
              </h3>
              
              <h4 className="text-sm font-semibold mb-3 text-gray-800 dark:text-gray-200">
                Additional Details:
              </h4>

              {/* Skip Rules */}
              <div className="flex-1 flex flex-col min-h-0">
                <h4 className="text-sm font-semibold mb-2 text-gray-800 dark:text-gray-200">
                  Skip Feature:
                </h4>
                <p className="text-xs text-gray-700 dark:text-gray-300 mb-3">
                  Each player can skip a round to get new name cards. Skip is only available <span className="font-semibold">before you make your first move</span> in a round.
                </p>
                
                {/* Game Configuration Table */}
                <div className="flex-1 overflow-hidden">
                  <div className="h-full overflow-auto">
                    <table className="w-full text-xs border-collapse">
                    <thead>
                      <tr className="bg-gray-200 dark:bg-gray-800">
                        <th className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-left font-semibold text-gray-900 dark:text-gray-100">
                          Players
                        </th>
                        <th className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-center font-semibold text-gray-900 dark:text-gray-100">
                          Rounds
                        </th>
                        <th className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-center font-semibold text-gray-900 dark:text-gray-100">
                          Skips/Player
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[1, 2, 3, 4, 5].map((count) => {
                        const isCurrentCount = count === playerCount;
                        return (
                          <tr
                            key={count}
                            className={`${
                              isCurrentCount
                                ? 'bg-blue-100 dark:bg-blue-900/30 font-semibold'
                                : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
                            } transition-colors`}
                          >
                            <td className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-gray-900 dark:text-gray-100">
                              {count} {count === 1 ? 'Player' : 'Players'}
                              {isCurrentCount && (
                                <span className="ml-2 text-blue-600 dark:text-blue-400">← Current</span>
                              )}
                            </td>
                            <td className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-center text-gray-900 dark:text-gray-100">
                              {getTotalRounds(count)}
                            </td>
                            <td className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-center text-gray-900 dark:text-gray-100">
                              {getSkipCountPerPlayer(count)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
