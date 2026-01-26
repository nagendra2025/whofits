'use client';

import { DndContext, DragEndEvent, DragStartEvent, DragOverlay, closestCenter } from '@dnd-kit/core';
import { useGameStore } from '@/store/gameStore';
import { roles } from '@/data/roles';
import { DraggableCard } from './DraggableCard';
import { DropZone } from './DropZone';
import { GameCompletePrompt } from './GameCompletePrompt';
import { SkipButton } from './SkipButton';
import { useState } from 'react';

export function GameBoard() {
  const currentRound = useGameStore((state) => state.currentRound);
  const placed = useGameStore((state) => state.placed);
  const handleDrop = useGameStore((state) => state.handleDrop);
  const showRoundComplete = useGameStore((state) => state.showRoundComplete);
  const showGameComplete = useGameStore((state) => state.showGameComplete);
  const players = useGameStore((state) => state.players);
  const [activeId, setActiveId] = useState<string | null>(null);

  // Determine the winner (player with highest total score)
  const getWinner = () => {
    if (players.length === 0) return null;
    let winner = players[0];
    let maxScore = players[0].score;
    
    for (const player of players) {
      if (player.score > maxScore) {
        maxScore = player.score;
        winner = player;
      }
    }
    
    // Check for ties
    const winners = players.filter(p => p.score === maxScore);
    return winners.length === 1 ? winner : null; // Return null if there's a tie
  };
  
  const winner = getWinner();

  if (!currentRound) {
    return (
      <div className="text-center text-gray-600 dark:text-gray-400">
        Loading game...
      </div>
    );
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const activeIdStr = active.id as string;
    const overIdStr = over.id as string;

    // Parse IDs
    if (!activeIdStr.startsWith('person:') || !overIdStr.startsWith('role:')) {
      return;
    }

    const personId = activeIdStr.replace('person:', '');
    const roleId = overIdStr.replace('role:', '');

    // Check if drop zone is already occupied
    const isOccupied = Object.values(placed).some((pRoleId) => pRoleId === roleId);
    if (isOccupied) {
      return; // Reject drop
    }

    handleDrop(personId, roleId);
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const getPlacedPersonId = (roleId: string): string | null => {
    for (const [personId, placedRoleId] of Object.entries(placed)) {
      if (placedRoleId === roleId) {
        return personId;
      }
    }
    return null;
  };

  const activePerson = activeId
    ? currentRound.people.find((p) => `person:${p.id}` === activeId)
    : null;

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex flex-col gap-4">
        {/* Drop Zones Card */}
        <div className="flex gap-2 items-start">
          {/* Label on the left - Fixed width for alignment */}
          <div className="flex-shrink-0 w-24">
            <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 whitespace-nowrap">
              Drop Zones
            </h3>
          </div>
          
          {/* Card content - Stretches to fit content horizontally */}
          <div className="flex-1 h-[133px] bg-gray-100 dark:bg-gray-800 rounded-lg p-3 border-2 border-violet-300 dark:border-violet-500 flex flex-col overflow-hidden shadow-md">
            {/* Drop zones inside card - horizontal layout */}
            <div className="flex flex-nowrap gap-2 justify-start items-center overflow-hidden flex-1">
              {currentRound.placeholders.map((roleId) => {
                const role = roles.find((r) => r.id === roleId);
                if (!role) return null;

                const placedPersonId = getPlacedPersonId(roleId);
                const isOccupied = placedPersonId !== null;

                return (
                  <DropZone
                    key={roleId}
                    role={role}
                    roleId={roleId}
                    isOccupied={isOccupied}
                    placedPersonId={placedPersonId}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Name Cards Card */}
        <div className="flex gap-2 items-start">
          {/* Label on the left - Fixed width for alignment */}
          <div className="flex-shrink-0 w-24">
            <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 whitespace-nowrap">
              Name Cards
            </h3>
          </div>
          
          {/* Card content - Stretches to fit content horizontally */}
          <div className="flex-1 h-[133px] bg-gray-100 dark:bg-gray-800 rounded-lg p-3 border-2 border-emerald-300 dark:border-emerald-500 flex flex-col overflow-hidden shadow-md">
            {/* Name cards inside - horizontal layout with skip button */}
            <div className="flex flex-nowrap gap-2 justify-center items-center overflow-hidden flex-1 relative">
              {currentRound.people.map((person) => (
                <DraggableCard key={person.id} person={person} />
              ))}
              
              {/* Skip button on the right */}
              <div className="absolute right-2 flex items-center">
                <SkipButton />
              </div>
            </div>
          </div>
        </div>

        {/* Status Message - Below Name Cards */}
        {showRoundComplete && (
          <div className="flex gap-2 items-start">
            {/* Spacer to align with labels - Fixed width */}
            <div className="flex-shrink-0 w-24">
            </div>
            
            {/* Status message - Same width as cards */}
            <div className="flex-1 p-3 bg-green-500 text-white rounded-lg text-center font-semibold animate-pulse text-sm">
              Round Complete! Moving to next player...
            </div>
          </div>
        )}

        {/* Game Complete Prompt - Below Name Cards */}
        <GameCompletePrompt />

        {/* Winner Section - Below Game Complete Prompt */}
        {showGameComplete && (
          <div className="flex gap-2 items-start">
            {/* Spacer to align with labels - Fixed width */}
            <div className="flex-shrink-0 w-24">
            </div>
            
            {/* Winner display - Same width as cards */}
            <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-4 border-2 border-rose-300 dark:border-rose-500 shadow-md">
              <div className="text-center">
                {winner ? (
                  <>
                    <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">
                      🏆 Winner 🏆
                    </div>
                    <div className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                      {winner.name}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Total Score: {winner.score}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">
                      🏆 It's a Tie! 🏆
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Multiple players tied with the highest score
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <DragOverlay>
        {activePerson ? (
          <div className="w-32 h-24 rounded-lg shadow-2xl opacity-90 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600">
            <div className="flex flex-col items-center justify-center h-full p-2">
              <h3 className="text-sm font-bold text-center text-gray-900 dark:text-gray-100 leading-tight">
                {activePerson.name}
              </h3>
              {activePerson.country && (
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  {activePerson.country}
                </p>
              )}
            </div>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
