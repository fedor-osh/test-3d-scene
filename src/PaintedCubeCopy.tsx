import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
// import { useFrame } from "@react-three/fiber";
import { type Material, type Mesh } from "three";
import { GroupProps } from "@react-three/fiber";

const path = "/paintedCube.glb";

type GLTF = ReturnType<typeof useGLTF> & {
  materials: Record<string, Material>;
  nodes: Record<string, Mesh>;
};

export function PaintedCubeCopy(props: GroupProps) {
  const meshRef = useRef<Mesh>(null);
  const { nodes, materials } = useGLTF(path) as GLTF;

  return (
    <group {...props} dispose={null}>
      <mesh
        ref={meshRef}
        castShadow
        receiveShadow
        geometry={nodes.node_id4.geometry}
        material={materials["55"]}
        position={[6, -3, 0]}
        rotation={[0, 0, 0]}
        scale={[2, 2, 2]}
      />
    </group>
  );
}

useGLTF.preload(path);
