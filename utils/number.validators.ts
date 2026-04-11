export const isPositive = (value?: number): boolean => {
  return typeof value === "number" && value > 0;
};

export const minValue = (min: number) => (value?: number): boolean => {
  return typeof value === "number" && value >= min;
};

export const maxValue = (max: number) => (value?: number): boolean => {
  return typeof value === "number" && value <= max;
};
