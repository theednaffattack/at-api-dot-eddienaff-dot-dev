export function randomNumber(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function randomInteger(min: number, max: number): number {
  return Math.round(Math.random() * (max - min) + min);
}
