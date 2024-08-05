import type { PixelValue } from "../types";

export const toPixelString = (value: PixelValue): string => {
  return typeof value === "number" ? `${value}px` : value;
};
