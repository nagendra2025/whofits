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
  const [activeId, setActiveId] = useState<string | null>(null);

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
          {/* Label on the left */}
          <div className="flex-shrink-0">
            <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 whitespace-nowrap">
              Drop Zones
            </h3>
          </div>
          
          {/* Card content - Stretches to fit content horizontally */}
          <div className="flex-1 h-[133px] bg-gray-100 dark:bg-gray-800 rounded-lg p-3 border-2 border-purple-300 dark:border-purple-700 flex flex-col overflow-hidden">
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
          {/* Label on the left */}
          <div className="flex-shrink-0">
            <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 whitespace-nowrap">
              Name Cards
            </h3>
          </div>
          
          {/* Card content - Stretches to fit content horizontally */}
          <div className="flex-1 h-[133px] bg-gray-100 dark:bg-gray-800 rounded-lg p-3 border-2 border-teal-300 dark:border-teal-700 flex flex-col overflow-hidden">
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
            {/* Spacer to align with labels */}
            <div className="flex-shrink-0">
              <div className="text-sm font-bold text-transparent whitespace-nowrap">
                Name Cards
              </div>
            </div>
            
            {/* Status message - Same width as cards */}
            <div className="flex-1 p-3 bg-green-500 text-white rounded-lg text-center font-semibold animate-pulse text-sm">
              Round Complete! Moving to next player...
            </div>
          </div>
        )}

        {/* Game Complete Prompt - Below Name Cards */}
        <GameCompletePrompt />
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
