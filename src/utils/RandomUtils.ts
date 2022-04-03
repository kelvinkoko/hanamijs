export const getRandomBetween = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

export const getRandomInt = (max: number): number => {
  return Math.floor(Math.random() * max);
};

/**
 * Probability should be in range from 0 to 1, 1 mean
 * 100% must do, 0.5 mean 50% chance to do.
 */
export const shouldDo = (probability: number): boolean => {
  return Math.random() >= 1 - probability;
};
