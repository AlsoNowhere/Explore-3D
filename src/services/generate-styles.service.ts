export const generateStyles = (object: Record<string, string | number>) => {
  return Object.entries(object).reduce(
    (a, [key, value]) => (a += `${key}: ${value}; `),
    ""
  );
};
