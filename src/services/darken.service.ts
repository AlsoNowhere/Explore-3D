export const darken = (rgb: string, amount = 0.2) => {
  const [r, g, b] = rgb
    .replace(/[\srgb\(\)]/g, "")
    .split(",")
    .map(Number);
  const [_r, _g, _b] = [r, g, b].map((x) => Math.round(x * (1 - amount)));
  return `rgb(${_r}, ${_g}, ${_b})`;
};
