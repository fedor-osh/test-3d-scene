import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { type Material, type Mesh } from "three";

const path = "/paintedCube.glb";
type GLTF = ReturnType<typeof useGLTF> & {
  materials: Record<string, Material>;
  nodes: Record<string, Mesh>;
};
export function PaintedCube(props) {
  const meshRef = useRef();
  const { nodes, materials } = useGLTF(path) as GLTF;

  useFrame((state, delta) => {
    if (!meshRef.current) {
      return;
    }

    meshRef.current.rotation.y += delta;
    // meshRef.current.rotation.x += delta;
    // meshRef.current.rotation.z += delta;
    return;
  });

  return (
    <group {...props} dispose={null} position={[0.56,3.62,-0.9]} scale={-0.34} castShadow={true}>
      <mesh
        ref={meshRef}
        castShadow
        receiveShadow
        geometry={nodes.node_id4.geometry}
        material={materials["55"]}
        position={[0, 0, 0.256]}
        rotation={[-0.271, -0.628, -0.221]}
        scale={[2, 2, 2]}
      />
    </group>
  );
}

useGLTF.preload(path);
