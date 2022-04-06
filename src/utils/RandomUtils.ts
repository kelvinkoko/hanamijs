const seedrandom = require("seedrandom");
// TODO: Use seed here
const random = seedrandom();

export const getRandomBetween = (min: number, max: number): number => {
  return random() * (max - min) + min;
};

export const getRandomInt = (max: number): number => {
  return Math.floor(random() * max);
};

/**
 * Probability should be in range from 0 to 1, 1 mean
 * 100% must do, 0.5 mean 50% chance to do.
 */
export const shouldDo = (probability: number): boolean => {
  return random() >= 1 - probability;
};
