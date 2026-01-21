'use client';

import { useDroppable } from '@dnd-kit/core';
import { useGameStore } from '@/store/gameStore';
import type { Role } from '@/types/game';

interface DropZoneProps {
  role: Role;
  roleId: string;
  isOccupied: boolean;
  placedPersonId: string | null;
}

export function DropZone({ role, roleId, isOccupied, placedPersonId }: DropZoneProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: `role:${roleId}`,
  });

  const currentRound = useGameStore((state) => state.currentRound);
  const placedPerson = placedPersonId
    ? currentRound?.people.find((p) => p.id === placedPersonId)
    : null;
  
  const isCorrect = placedPersonId && currentRound?.correctMap[placedPersonId] === roleId;

  return (
    <div
      ref={setNodeRef}
      className={`
        relative w-32 h-24 flex-shrink-0 border-2 border-dashed rounded-lg p-2
        flex flex-col items-center justify-center
        transition-all duration-200
        ${
          isCorrect
            ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
            : isOver && !isOccupied
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 scale-105'
            : isOccupied
            ? 'border-gray-400 bg-gray-100 dark:bg-gray-700'
            : 'border-gray-300 bg-white dark:bg-gray-800'
        }
      `}
    >
      {isOccupied && placedPerson ? (
        <>
          <p className="text-sm font-bold text-center text-gray-900 dark:text-gray-100 leading-tight">
            {placedPerson.name}
          </p>
          <p className="text-xs text-center text-gray-600 dark:text-gray-400 mt-0.5">
            {role.label}
          </p>
          {placedPerson.country && (
            <p className="text-xs text-center text-gray-500 dark:text-gray-500 mt-0.5">
              {placedPerson.country}
            </p>
          )}
          {placedPerson.company && (
            <p className="text-xs text-center text-gray-500 dark:text-gray-500 mt-0.5">
              {placedPerson.company}
            </p>
          )}
          {isCorrect && (
            <span className="absolute top-1 right-1 text-green-600 dark:text-green-400 text-xs">✓</span>
          )}
        </>
      ) : (
        <p
          className={`text-sm font-semibold ${
            isOver
              ? 'text-blue-600 dark:text-blue-400'
              : 'text-gray-600 dark:text-gray-400'
          }`}
        >
          {role.label}
        </p>
      )}
    </div>
  );
}
