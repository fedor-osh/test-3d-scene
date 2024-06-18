import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

import image from "../images/Trough the noise 09.jpg";
import { getPixelColor, getImageContext } from "../utils/image";

const IMG_SRC = image;

export function ImagePlane() {
  const texture = useLoader(THREE.TextureLoader, IMG_SRC);

  const imageContext = getImageContext(IMG_SRC);

  const pixelColor = getPixelColor({
    imageContext,
    x: 0,
    y: 0,
  });

  console.log("🚀 ~ ImagePlane ~ pixelColor:", pixelColor);

  return (
    <mesh>
      <planeGeometry attach='geometry' args={[12, 8]} />
      <meshBasicMaterial attach='material' map={texture} />
    </mesh>
  );
}
