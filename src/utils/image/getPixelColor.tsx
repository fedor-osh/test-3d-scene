import { toRGBA } from "./toRGBA";

type getPixelColorParams = {
  imageContext: CanvasRenderingContext2D | null;
  x: number;
  y: number;
};
export const getPixelColor = ({ imageContext, x, y }: getPixelColorParams) => {
  return toRGBA(imageContext?.getImageData(x, y, 1, 1).data);
};
