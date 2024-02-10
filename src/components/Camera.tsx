import { useThree } from "@react-three/fiber";
import { useRef } from "react";
import { MathUtils } from "three";

export function Camera() {
  const cameraRef = useRef();

  useThree(({ camera }) => {
    camera.rotation.set(MathUtils.degToRad(-15), 0, 0);
    camera.position.set(0.16, 4.3, 3.36);
  });

  return (
    <perspectiveCamera
      ref={cameraRef}
      position={[0, 0, 5]}
      rotation={[0, 0, 0]}
    />
  );
}
