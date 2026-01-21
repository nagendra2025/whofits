'use client';

import { useDraggable } from '@dnd-kit/core';
import { useGameStore } from '@/store/gameStore';
import type { Person } from '@/types/game';
import { useEffect, useState } from 'react';

interface DraggableCardProps {
  person: Person;
}

export function DraggableCard({ person }: DraggableCardProps) {
  const placed = useGameStore((state) => state.placed);
  const attempts = useGameStore((state) => state.attempts);
  const [shouldShake, setShouldShake] = useState(false);
  
  const isPlaced = placed[person.id] !== null;
  const attemptsUsed = attempts[person.id] || 0;
  const isLocked = isPlaced;

  // Trigger shake animation when attempts increase (wrong drop)
  useEffect(() => {
    if (attemptsUsed > 0 && !isLocked) {
      setShouldShake(true);
      const timer = setTimeout(() => setShouldShake(false), 500);
      return () => clearTimeout(timer);
    }
  }, [attemptsUsed, isLocked]);

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `person:${person.id}`,
    disabled: isLocked,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`
        relative w-32 h-24 flex-shrink-0 rounded-lg
        cursor-grab active:cursor-grabbing
        transition-all duration-200
        ${isDragging ? 'opacity-50 scale-95 z-50' : 'opacity-100'}
        ${isLocked ? 'cursor-not-allowed opacity-60' : 'shadow-lg hover:shadow-xl'}
        ${attemptsUsed > 0 && !isLocked ? 'ring-2 ring-red-300 bg-red-50 dark:bg-red-900/20' : 'bg-white dark:bg-gray-800'}
        ${shouldShake ? 'animate-shake' : ''}
        border-2 ${isLocked ? 'border-green-500' : attemptsUsed > 0 ? 'border-red-300' : 'border-gray-300 dark:border-gray-600'}
      `}
    >
      <div className="flex flex-col items-center justify-center h-full p-2">
        <h3 className="text-sm font-bold text-center text-gray-900 dark:text-gray-100 leading-tight">
          {person.name}
        </h3>
        {person.country && (
          <p className="text-xs text-center text-gray-600 dark:text-gray-400 mt-0.5">
            {person.country}
          </p>
        )}
      </div>
      
      {isLocked && (
        <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center rounded-lg">
          <span className="text-2xl">✓</span>
        </div>
      )}
      
      {attemptsUsed > 0 && !isLocked && (
        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
          {attemptsUsed} wrong
        </div>
      )}
    </div>
  );
}
