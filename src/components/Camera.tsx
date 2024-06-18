import { useThree } from "@react-three/fiber";
import { useRef } from "react";

export function Camera() {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null!);

  useThree(({ camera }) => {
    camera.rotation.set(0, 0, 0);
    camera.position.set(0, 0, 6);
  });

  return (
    <perspectiveCamera
      ref={cameraRef}
      position={[0, 0, 5]}
      rotation={[0, 0, 0]}
    />
  );
}
