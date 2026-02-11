'use client';

import { useGameStore } from '@/store/gameStore';
import { PlayerSetupModal } from '@/components/PlayerSetupModal';
import { Scoreboard } from '@/components/Scoreboard';
import { GameBoard } from '@/components/GameBoard';
import { DeviceCheck } from '@/components/DeviceCheck';

export default function Home() {
  const isSetupComplete = useGameStore((state) => state.isSetupComplete);
  const showRoundComplete = useGameStore((state) => state.showRoundComplete);

  return (
    <DeviceCheck>
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
        {!isSetupComplete && <PlayerSetupModal />}
        
        {isSetupComplete && (
          <div className="max-w-7xl mx-auto">
            <div className="mb-4">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                WhoFits?
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Match each celebrity to their professional role.
              </p>
            </div>

            <div className="flex gap-4 items-start">
              {/* Left Side - Cards Stacked Vertically */}
              <div className="flex flex-col gap-4 flex-shrink-0">
                <Scoreboard />
                <GameBoard />
              </div>
              
              {/* Right Side - Empty for now, can add game area later */}
              <div className="flex-1"></div>
            </div>
          </div>
        )}
      </main>
    </DeviceCheck>
  );
}
