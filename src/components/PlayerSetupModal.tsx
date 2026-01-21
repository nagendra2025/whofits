'use client';

import { useState } from 'react';
import { useGameStore } from '@/store/gameStore';

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
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Welcome to WhoFits?
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
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
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Start Game
        </button>
      </div>
    </div>
  );
}
