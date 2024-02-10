import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";

import { PaintedCube } from "./PaintedCube";
import { Environment } from "@react-three/drei";
import { Room } from "./scene";
import { Camera } from "./components/Camera";

export const CanvasContainer = () => {
  return (
    <Canvas style={{ width: "100%", height: "100%" }} translate={"no"}>
      <Camera></Camera>
      <group position={[0, 0, 0]}>
        <Room></Room>
        <PaintedCube></PaintedCube>
      </group>
      <Suspense fallback={null}>
        <Environment preset='night' background={false} ground={false} />
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
