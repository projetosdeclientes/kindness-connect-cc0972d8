import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import type { Group, Mesh } from "three";

type IconKind = "bulb" | "camera";

const Bulb = () => {
  const group = useRef<Group>(null);
  const glass = useRef<Mesh>(null);
  useFrame((state, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.6;
    if (glass.current) {
      const t = state.clock.elapsedTime;
      const mat = glass.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 1.6 + Math.sin(t * 3) * 0.4;
    }
  });
  return (
    <group ref={group} position={[0, -0.1, 0]}>
      {/* Glass bulb */}
      <mesh ref={glass} position={[0, 0.35, 0]}>
        <sphereGeometry args={[0.55, 48, 48]} />
        <meshStandardMaterial
          color="#fff4c2"
          emissive="#ffd86b"
          emissiveIntensity={1.8}
          roughness={0.15}
          metalness={0.1}
          transparent
          opacity={0.92}
        />
      </mesh>
      {/* Filament glow */}
      <pointLight position={[0, 0.35, 0]} intensity={1.2} distance={2} color="#ffd166" />
      {/* Neck */}
      <mesh position={[0, -0.15, 0]}>
        <cylinderGeometry args={[0.28, 0.36, 0.2, 32]} />
        <meshStandardMaterial color="#d9d9d9" metalness={0.9} roughness={0.25} />
      </mesh>
      {/* Screw base */}
      <mesh position={[0, -0.38, 0]}>
        <cylinderGeometry args={[0.26, 0.22, 0.28, 32]} />
        <meshStandardMaterial color="#9a9a9a" metalness={1} roughness={0.35} />
      </mesh>
      <mesh position={[0, -0.55, 0]}>
        <cylinderGeometry args={[0.18, 0.12, 0.08, 32]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.6} roughness={0.6} />
      </mesh>
    </group>
  );
};

const Camera = () => {
  const group = useRef<Group>(null);
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.6;
  });
  return (
    <group ref={group} rotation={[0.15, 0.4, 0]}>
      {/* Body */}
      <mesh>
        <boxGeometry args={[1.25, 0.85, 0.75]} />
        <meshStandardMaterial color="#1a1a1d" metalness={0.7} roughness={0.35} />
      </mesh>
      {/* Top viewfinder hump */}
      <mesh position={[0, 0.55, 0]}>
        <boxGeometry args={[0.45, 0.25, 0.55]} />
        <meshStandardMaterial color="#0f0f12" metalness={0.7} roughness={0.4} />
      </mesh>
      {/* Lens barrel */}
      <mesh position={[0, -0.05, 0.5]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.42, 0.42, 0.55, 48]} />
        <meshStandardMaterial color="#222226" metalness={0.85} roughness={0.3} />
      </mesh>
      {/* Lens ring */}
      <mesh position={[0, -0.05, 0.78]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.46, 0.46, 0.08, 48]} />
        <meshStandardMaterial color="#3a3a3f" metalness={1} roughness={0.2} />
      </mesh>
      {/* Glass */}
      <mesh position={[0, -0.05, 0.83]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.34, 0.34, 0.02, 48]} />
        <meshStandardMaterial
          color="#5ad1ff"
          emissive="#1e88ff"
          emissiveIntensity={0.9}
          metalness={0.6}
          roughness={0.1}
        />
      </mesh>
      {/* Shutter button */}
      <mesh position={[0.42, 0.48, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.08, 24]} />
        <meshStandardMaterial color="#e94e77" metalness={0.5} roughness={0.4} emissive="#e94e77" emissiveIntensity={0.4} />
      </mesh>
    </group>
  );
};

interface Props {
  kind: IconKind;
  className?: string;
}

const Hero3DIcon = ({ kind, className = "" }: Props) => {
  return (
    <span
      className={`inline-block align-middle ${className}`}
      style={{ width: "1em", height: "1em" }}
      aria-hidden
    >
      <Canvas
        camera={{ position: [0, 0, 2.6], fov: 35 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.55} />
        <directionalLight position={[3, 4, 3]} intensity={1.1} />
        <directionalLight position={[-2, -1, -2]} intensity={0.35} color="#7ab8ff" />
        <Suspense fallback={null}>
          {kind === "bulb" ? <Bulb /> : <Camera />}
        </Suspense>
      </Canvas>
    </span>
  );
};

export default Hero3DIcon;
