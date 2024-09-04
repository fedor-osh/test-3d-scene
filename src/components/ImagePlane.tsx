import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

import image from "../images/Trough the noise 09.jpg";
import { getPixelColor, getImageContext } from "../utils/image";
import { useCallback, useMemo, useRef } from "react";
import circleImg from "../images/circle.png";

const IMG_SRC = image;

type PointsProps = {};

function Points({}: PointsProps) {
  const imgTex = useLoader(THREE.TextureLoader, circleImg);
  const bufferRef = useRef<THREE.BufferAttribute>(null!);

  const imageContext = getImageContext(IMG_SRC);

  let t = 0;
  const f = 0.002;
  const a = 0.4;
  const graph = useCallback(
    (x: number, y: number) => {
      return 3.5 + Math.sin(f * ((x * 20) ** 2 + (y * 20) ** 2 + t)) * a;
    },
    [t, f, a]
  );

  const countX = 1080;
  const countY = 722;
  const sep = 0.008;

  const colors: number[] = useMemo(() => [], []);
  const positions = useMemo(() => {
    const positions = [];

    for (let xi = 0; xi < countX; xi++) {
      for (let yi = 0; yi < countY; yi++) {
        const random = {
          x: Math.random(),
          y: Math.random(),
          z: Math.random(),
        };
        const x = sep * (xi - countX / 2) + sep * random.x;
        const y = sep * (yi - countY / 2) + sep * random.y;
        const z = graph(x, y) + sep * random.z;
        positions.push(x, y, z);

        const pixelColor = getPixelColor({
          imageContext,
          x: xi,
          y: yi,
        });

        colors.push(
          (pixelColor?.r ?? 0) / 255,
          (pixelColor?.g ?? 0) / 255,
          (pixelColor?.b ?? 0) / 255
        );
      }
    }
    console.log("🚀 ~ positions ~ positions:", positions);

    return new Float32Array(positions);
  }, [graph, imageContext, colors]);

  console.log("🚀 ~ Points ~ colors:", new Float32Array(colors));

  useFrame(() => {
    t += 15;

    if (!bufferRef.current) {
      return;
    }

    const positions = bufferRef.current.array;

    let i = 0;
    for (let xi = 0; xi < countX; xi++) {
      for (let yi = 0; yi < countY; yi++) {
       

        const x = sep * (xi - countX / 2) ;
        const y = sep * (yi - countY / 2) ;

        positions[i + 2] = graph(x, y);
        i += 3;
      }
    }

    bufferRef.current.needsUpdate = true;
  });

  return (
    <points>
      <bufferGeometry attach='geometry'>
        <bufferAttribute
          ref={bufferRef}
          attach='attributes-position'
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach={"attributes-color"}
          array={new Float32Array(colors)}
          count={colors.length / 3}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        attach='material'
        map={imgTex}
        vertexColors={true}
        size={0.01}
        sizeAttenuation
        transparent={false}
        alphaTest={0.5}
        opacity={1.0}
      />
    </points>
  );
}

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
      {/* <planeGeometry attach='geometry' args={[12, 8]} /> */}
      {/* <meshBasicMaterial attach='material' map={texture} /> */}
      <Points />
    </mesh>
  );
}
