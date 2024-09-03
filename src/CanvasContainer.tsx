import { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";

import { Environment, OrbitControls } from "@react-three/drei";
import { ImagePlane } from "./components/ImagePlane";

import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

function CameraControls() {
  const {
    camera,
    gl: { domElement },
  } = useThree();

  const controlsRef = useRef<OrbitControlsImpl>(null!);
  useFrame(() => {
    if (controlsRef.current) {
      return controlsRef.current.update();
    }
  });

  return <OrbitControls ref={controlsRef} args={[camera, domElement]} />;
}

export const CanvasContainer = () => {
  return (
    <Canvas
      style={{ width: "100%", height: "100%" }}
      translate={"no"}
      dpr={Math.max(window.devicePixelRatio, 2)}
    >
      <CameraControls />
      {/* <Camera></Camera> */}
      {/* <group position={[0, 0, 0]}>
        <PaintedCube></PaintedCube>
      </group> */}
      <ImagePlane />
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
