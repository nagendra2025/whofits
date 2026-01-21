import type { Person, Role, Round } from '@/types/game';
import { shuffle, randomPickN, randomPick, generateId } from './utils';

export function generateRound(
  people: Person[],
  roles: Role[],
  roleIds: string[]
): Round | null {
  if (people.length < 3) {
    return null;
  }

  // Try to find 3 people with unique roles that can be matched
  // We'll try multiple times if needed to find a valid combination
  let attempts = 0;
  const maxAttempts = 100;

  while (attempts < maxAttempts) {
    attempts++;

    // Select 3 distinct people
    const selectedPeople = randomPickN(people, 3);
    if (selectedPeople.length < 3) {
      continue;
    }

    const [person1, person2, person3] = selectedPeople;

    // Get valid roles for each person (roles that exist in the roles list)
    const person1Roles = person1.roles.filter((roleId) => roleIds.includes(roleId));
    const person2Roles = person2.roles.filter((roleId) => roleIds.includes(roleId));
    const person3Roles = person3.roles.filter((roleId) => roleIds.includes(roleId));

    // Ensure each person has at least one valid role
    if (person1Roles.length === 0 || person2Roles.length === 0 || person3Roles.length === 0) {
      continue;
    }

    // CRITICAL: Find 3 UNIQUE roles, one for each person
    // Strategy: Try random combinations until we find 3 unique roles
    let correctRole1: string | null = null;
    let correctRole2: string | null = null;
    let correctRole3: string | null = null;

    // Try up to 50 combinations for these 3 people
    for (let i = 0; i < 50; i++) {
      const role1 = randomPick(person1Roles);
      const role2 = randomPick(person2Roles);
      const role3 = randomPick(person3Roles);

      // Check if all 3 roles are unique
      if (role1 !== role2 && role1 !== role3 && role2 !== role3) {
        correctRole1 = role1;
        correctRole2 = role2;
        correctRole3 = role3;
        break;
      }
    }

    // If we couldn't find 3 unique roles for these people, try different people
    if (!correctRole1 || !correctRole2 || !correctRole3) {
      continue;
    }

    // Verify all 3 roles are unique (double-check)
    const correctRoleIds = [correctRole1, correctRole2, correctRole3];
    const uniqueCorrectRoles = Array.from(new Set(correctRoleIds));
    
    if (uniqueCorrectRoles.length !== 3) {
      // This should never happen, but if it does, try again
      continue;
    }

    // Get all roles that are NOT in the correct roles (for wrong placeholders)
    const availableWrongRoles = roleIds.filter((roleId) => !uniqueCorrectRoles.includes(roleId));

    // We need exactly 4 wrong roles (7 total - 3 correct = 4 wrong)
    if (availableWrongRoles.length < 4) {
      // Not enough wrong roles available, try different people/roles
      continue;
    }

    // Select exactly 4 wrong roles randomly
    const selectedWrongRoles = randomPickN(availableWrongRoles, 4);

    // Combine: 3 unique correct roles + 4 wrong roles = 7 total
    const allPlaceholders = [...uniqueCorrectRoles, ...selectedWrongRoles];

    // Verify we have exactly 7 unique placeholders
    const uniquePlaceholders = Array.from(new Set(allPlaceholders));
    
    if (uniquePlaceholders.length !== 7) {
      // This shouldn't happen, but if it does, try again
      continue;
    }

    // Verify all 3 correct roles are present
    const hasAllCorrect = uniqueCorrectRoles.every((roleId) => uniquePlaceholders.includes(roleId));
    if (!hasAllCorrect) {
      continue;
    }

    // SUCCESS! We have a valid round with:
    // - 3 people
    // - 3 unique correct roles (one for each person)
    // - 4 wrong/distractor roles
    // - Total: 7 placeholders
    // - Guarantee: Each person has exactly one unique matching placeholder
    return {
      id: generateId(),
      people: selectedPeople,
      placeholders: shuffle(uniquePlaceholders),
      correctMap: {
        [person1.id]: correctRole1,
        [person2.id]: correctRole2,
        [person3.id]: correctRole3,
      },
    };
  }

  // If we couldn't find a valid combination after maxAttempts, return null
  console.error('Failed to generate round: Could not find 3 people with unique matching roles');
  return null;
}
