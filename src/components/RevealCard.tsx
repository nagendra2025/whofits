'use client';

import type { Person, Role } from '@/types/game';
import { roles } from '@/data/roles';

interface RevealCardProps {
  person: Person;
  roleId: string;
}

export function RevealCard({ person, roleId }: RevealCardProps) {
  const role = roles.find((r) => r.id === roleId);
  const roleLabel = role?.label || roleId;

  const isPolitical = roleId === 'president' || roleId === 'prime_minister';
  const isBusiness = roleId === 'ceo' || roleId === 'cto';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 border-2 border-green-500 min-w-[200px]">
      <h4 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-2">
        {person.name}
      </h4>
      <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-2">
        {roleLabel}
      </p>
      {isPolitical && person.country && (
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Country: {person.country}
        </p>
      )}
      {isBusiness && person.company && (
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Company: {person.company}
        </p>
      )}
      {!isPolitical && !isBusiness && person.country && (
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Country: {person.country}
        </p>
      )}
    </div>
  );
}

