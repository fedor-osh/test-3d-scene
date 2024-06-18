export const getImageContext = (
  imageSource: string
): CanvasRenderingContext2D | null => {
  const img = new Image();
  img.src = imageSource;

  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;

  const ctx = canvas.getContext("2d");

  ctx?.drawImage(img, 0, 0);

  return ctx;
};
