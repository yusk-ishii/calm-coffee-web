export function easeOutSine(x: number): number {
  return Math.sin((x * Math.PI) / 2);
}

export const easeOutQuart = (x: number) => {
  return 1 - Math.pow(1 - x, 4);
};
