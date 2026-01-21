'use client';

import { useGameStore } from '@/store/gameStore';
import { useState } from 'react';

export function SkipButton() {
  const players = useGameStore((state) => state.players);
  const activePlayerIndex = useGameStore((state) => state.activePlayerIndex);
  const skipCount = useGameStore((state) => state.skipCount);
  const skipRound = useGameStore((state) => state.skipRound);
  const [isPressed, setIsPressed] = useState(false);

  if (players.length === 0) return null;

  // Get the currently active player (works for any number of players: 2, 3, 4, 5, etc.)
  const activePlayer = players[activePlayerIndex];
  if (!activePlayer) return null;

  // Each player has their own independent skip count tracked by player ID
  const currentSkips = skipCount[activePlayer.id] || 0;
  const skipsRemaining = 2 - currentSkips;

  // Hide button if this player has used all 2 skips
  // Each player's skip count is independent, so button visibility is per-player
  if (currentSkips >= 2 || skipsRemaining <= 0) return null;

  const handleClick = () => {
    setIsPressed(true);
    setTimeout(() => {
      setIsPressed(false);
      skipRound();
    }, 150);
  };

  return (
    <button
      onClick={handleClick}
      disabled={skipsRemaining <= 0}
      className={`
        relative flex items-center justify-center
        w-12 h-12 rounded-full
        bg-gradient-to-br from-teal-400 to-teal-600
        hover:from-teal-500 hover:to-teal-700
        active:from-teal-600 active:to-teal-800
        shadow-lg hover:shadow-xl
        transition-all duration-150
        border-2 border-teal-300 dark:border-teal-500
        ${isPressed ? 'scale-90' : 'scale-100'}
        ${skipsRemaining <= 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        group
      `}
      title={`Skip (${skipsRemaining} remaining)`}
    >
      {/* Arrow icon */}
      <svg
        className={`w-6 h-6 text-white transition-transform duration-150 ${
          isPressed ? 'translate-x-0.5' : 'group-hover:translate-x-1'
        }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2.5}
          d="M13 7l5 5m0 0l-5 5m5-5H6"
        />
      </svg>
      
      {/* Skip count badge */}
      <span className="absolute -top-1 -right-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border border-yellow-500">
        {skipsRemaining}
      </span>
      
      {/* Ripple effect on click */}
      {isPressed && (
        <span className="absolute inset-0 rounded-full bg-white opacity-30 animate-ping" />
      )}
    </button>
  );
}

