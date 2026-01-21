export function getScoreForAttempt(attemptNumber: number): number {
  const scoreMap: Record<number, number> = {
    1: 100,
    2: 50,
    3: 20,
    4: 10,
    5: 5,
  };
  return scoreMap[Math.min(attemptNumber, 5)] || 0;
}

export function calculateAttemptNumber(attemptsUsed: number): number {
  return Math.min(5, attemptsUsed + 1);
}

