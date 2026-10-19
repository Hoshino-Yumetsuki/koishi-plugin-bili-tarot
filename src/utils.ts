import crypto from 'crypto';

export const isUpright = (): boolean => crypto.randomInt(0, 2) === 0;

export const drawCard = (): number => crypto.randomInt(0, 22);

export function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
