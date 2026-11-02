"use client";

import { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

interface FishConfig {
  id: number;
  initialPos: [number, number, number];
  direction: 1 | -1; // 1 = swimming right, -1 = swimming left
  speed: number;
  scale: number;
  verticalAmp: number;
  verticalFreq: number;
  tailFreq: number;
  phase: number;
  depthZ: number;
}

// Small count (8 fish) in a loose deep-sea pod cruising organically across varying ocean depths
const FISH_CONFIGS: FishConfig[] = [
  {
    id: 1,
    initialPos: [-4.2, -1.2, -2.0],
    direction: 1,
    speed: 0.65,
    scale: 0.28,
    verticalAmp: 0.22,
    verticalFreq: 0.6,
    tailFreq: 9.5,
    phase: 0.2,
    depthZ: -2.0,
  },
  {
    id: 2,
    initialPos: [-3.0, -1.5, -2.4],
    direction: 1,
    speed: 0.72,
    scale: 0.24,
    verticalAmp: 0.18,
    verticalFreq: 0.75,
    tailFreq: 10.5,
    phase: 1.1,
    depthZ: -2.4,
  },
  {
    id: 3,
    initialPos: [-2.1, -0.9, -1.8],
    direction: 1,
    speed: 0.68,
    scale: 0.26,
    verticalAmp: 0.2,
    verticalFreq: 0.65,
    tailFreq: 10.0,
    phase: 2.3,
    depthZ: -1.8,
  },
  {
    id: 4,
    initialPos: [3.8, 1.8, -2.8],
    direction: -1,
    speed: 0.58,
    scale: 0.22,
    verticalAmp: 0.16,
    verticalFreq: 0.55,
    tailFreq: 9.0,
    phase: 3.5,
    depthZ: -2.8,
  },
  {
    id: 5,
    initialPos: [4.9, 1.4, -3.2],
    direction: -1,
    speed: 0.62,
    scale: 0.2,
    verticalAmp: 0.24,
    verticalFreq: 0.6,
    tailFreq: 9.8,
    phase: 4.2,
    depthZ: -3.2,
  },
  {
    id: 6,
    initialPos: [-1.2, 2.5, -2.2],
    direction: 1,
    speed: 0.6,
    scale: 0.25,
    verticalAmp: 0.25,
    verticalFreq: 0.7,
    tailFreq: 9.2,
    phase: 5.1,
    depthZ: -2.2,
  },
  {
    id: 7,
    initialPos: [2.5, -2.8, -2.6],
    direction: -1,
    speed: 0.54,
    scale: 0.23,
    verticalAmp: 0.18,
    verticalFreq: 0.5,
    tailFreq: 8.8,
    phase: 0.8,
    depthZ: -2.6,
  },
  {
    id: 8,
    initialPos: [1.2, -3.2, -3.0],
    direction: -1,
    speed: 0.56,
    scale: 0.19,
    verticalAmp: 0.2,
    verticalFreq: 0.58,
    tailFreq: 9.4,
    phase: 2.7,
    depthZ: -3.0,
  },
];

function SingleSmallFish({ config }: { config: FishConfig }) {
  const groupRef = useRef<THREE.Group>(null);
  const tailRef = useRef<THREE.Group>(null);
  const pecLeftRef = useRef<THREE.Mesh>(null);
  const pecRightRef = useRef<THREE.Mesh>(null);

  const posX = useRef(config.initialPos[0]);
  const basePosY = useRef(config.initialPos[1]);

  // Create shared procedural geometries for this fish
  const { bodyGeom, tailGeom, dorsalGeom, pecGeom, eyeGeom } = useMemo(() => {
    // 1. Hydrodynamic streamlined fish fuselage: elongated tapered sphere
    const body = new THREE.SphereGeometry(0.5, 16, 12);
    body.scale(1.8, 0.48, 0.22);

    // 2. Crescent caudal tail fin
    const tail = new THREE.BufferGeometry();
    const tailVertices = new Float32Array([
      0, 0, 0,
      -0.45, 0.38, 0,
      -0.34, 0, 0,

      0, 0, 0,
      -0.34, 0, 0,
      -0.45, -0.38, 0,
    ]);
    tail.setAttribute("position", new THREE.BufferAttribute(tailVertices, 3));
    tail.computeVertexNormals();

    // 3. Small translucent dorsal fin along the back
    const dorsal = new THREE.BufferGeometry();
    const dorsalVertices = new Float32Array([
      -0.1, 0.22, 0,
      -0.32, 0.48, 0,
      -0.42, 0.22, 0,
    ]);
    dorsal.setAttribute("position", new THREE.BufferAttribute(dorsalVertices, 3));
    dorsal.computeVertexNormals();

    // 4. Delicate pectoral fin
    const pec = new THREE.BufferGeometry();
    const pecVertices = new Float32Array([
      0, 0, 0,
      -0.25, -0.15, 0.08,
      -0.28, 0, 0,
    ]);
    pec.setAttribute("position", new THREE.BufferAttribute(pecVertices, 3));
    pec.computeVertexNormals();

    // 5. Bioluminescent photophore eye
    const eye = new THREE.SphereGeometry(0.065, 12, 12);

    return { bodyGeom: body, tailGeom: tail, dorsalGeom: dorsal, pecGeom: pec, eyeGeom: eye };
  }, []);

  // Fish materials: translucent silvery deep-sea skin with delicate bioluminescent shimmer
  const { fishSkinMat, finMat, eyeMat } = useMemo(() => {
    const skin = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#A8C8ED"),
      roughness: 0.16,
      metalness: 0.28,
      transparent: true,
      opacity: 0.82,
      emissive: new THREE.Color("#2C486C"),
      emissiveIntensity: 0.38,
      side: THREE.DoubleSide,
      depthWrite: false,
    });

    const fin = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#B8D4F6"),
      roughness: 0.25,
      metalness: 0.15,
      transparent: true,
      opacity: 0.58,
      emissive: new THREE.Color("#243D5C"),
      emissiveIntensity: 0.25,
      side: THREE.DoubleSide,
      depthWrite: false,
    });

    const eye = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#D8EBFF"),
      transparent: true,
      opacity: 0.95,
    });

    return { fishSkinMat: skin, finMat: fin, eyeMat: eye };
  }, []);

  // Autonomous cruising animation - strictly independent of cursor movement
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const t = state.clock.getElapsedTime();
    const clampedDelta = Math.min(delta, 0.05);

    // 1. Horizontal cruising
    posX.current += config.direction * config.speed * clampedDelta;

    // Boundary wrapping: seamless ocean migration
    const HORIZONTAL_BOUND = 7.2;
    if (config.direction === 1 && posX.current > HORIZONTAL_BOUND) {
      posX.current = -HORIZONTAL_BOUND;
    } else if (config.direction === -1 && posX.current < -HORIZONTAL_BOUND) {
      posX.current = HORIZONTAL_BOUND;
    }

    // 2. Gentle sinusoidal vertical glide
    const currentY =
      basePosY.current +
      Math.sin(t * config.verticalFreq + config.phase) * config.verticalAmp;

    // 3. Subtle depth drift
    const currentZ = config.depthZ + Math.cos(t * 0.4 + config.phase) * 0.15;

    // 4. Undulating fish tail stroke
    const tailAngle = Math.sin(t * config.tailFreq + config.phase) * 0.42;
    if (tailRef.current) {
      tailRef.current.rotation.y = tailAngle;
    }

    // 5. Pectoral fin gentle fluttering
    if (pecLeftRef.current && pecRightRef.current) {
      const flutter = Math.sin(t * 5.0 + config.phase) * 0.18;
      pecLeftRef.current.rotation.z = 0.2 + flutter;
      pecRightRef.current.rotation.z = -0.2 - flutter;
    }

    // Set position
    groupRef.current.position.set(posX.current, currentY, currentZ);

    // Dynamic rotation: face swimming direction with subtle pitch & body yaw
    const facingYaw = config.direction === 1 ? 0 : Math.PI;
    const bodyPitch = Math.cos(t * config.verticalFreq + config.phase) * 0.08 * config.direction;
    const bodyYaw = -tailAngle * 0.15; // Realistic reaction to tail beat
    groupRef.current.rotation.set(bodyPitch, facingYaw + bodyYaw, 0);
  });

  return (
    <group ref={groupRef} scale={config.scale}>
      {/* Main Fish Body */}
      <mesh geometry={bodyGeom} material={fishSkinMat} />

      {/* Bioluminescent Eyes (Left & Right) */}
      <mesh geometry={eyeGeom} material={eyeMat} position={[0.55, 0.08, 0.12]} />
      <mesh geometry={eyeGeom} material={eyeMat} position={[0.55, 0.08, -0.12]} />

      {/* Dorsal Fin along spine */}
      <mesh geometry={dorsalGeom} material={finMat} />

      {/* Pectoral Fins (Left & Right) */}
      <mesh ref={pecLeftRef} geometry={pecGeom} material={finMat} position={[0.2, -0.06, 0.14]} />
      <mesh ref={pecRightRef} geometry={pecGeom} material={finMat} position={[0.2, -0.06, -0.14]} scale={[1, 1, -1]} />

      {/* Articulated Caudal Tail Fin */}
      <group ref={tailRef} position={[-0.8, 0, 0]}>
        <mesh geometry={tailGeom} material={finMat} />
      </group>
    </group>
  );
}

export function SmallFishSchool() {
  return (
    <group name="small-fish-school">
      {FISH_CONFIGS.map((cfg) => (
        <SingleSmallFish key={cfg.id} config={cfg} />
      ))}
    </group>
  );
}
