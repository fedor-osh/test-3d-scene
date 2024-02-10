import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";

import { PaintedCube } from "./PaintedCube";
import { Environment } from "@react-three/drei";
import { PaintedCubeCopy } from "./PaintedCubeCopy";
import { Room } from "./scene";

export const CanvasContainer = () => {
  return (
    <Canvas style={{ width: "100%", height: "100%" }}>
      <Suspense fallback={null}>
        <PaintedCube />
        <Room></Room>
        <PaintedCubeCopy />
        <Environment preset='night' background={false} />
      </Suspense>
      <ambientLight intensity={Math.PI / 2} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI}
      />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
    </Canvas>
  );
};
