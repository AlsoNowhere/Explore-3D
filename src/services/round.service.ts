export const round = (n: number) => {
  // return Math.round(n * 1e14) / 1e14;
  // return Math.round(n * 1e4) / 1e4;
  return Math.round(n * 1000) / 1000;
};
