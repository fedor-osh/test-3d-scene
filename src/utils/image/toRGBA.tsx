type RGBA = {
  r: number;
  g: number;
  b: number;
  a: number;
};

export const toRGBA = (data?: Uint8ClampedArray): RGBA | null =>
  data ? { r: data[0], g: data[1], b: data[2], a: data[3] } : null;
