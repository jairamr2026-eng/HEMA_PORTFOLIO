"use client";

import { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

interface SlowFishConfig {
  id: number;
  direction: 1 | -1; // 1 = left-to-right, -1 = right-to-left
  baseY: number;
  depthZ: number;
  scale: number;
  verticalAmp: number;
  verticalFreq: number;
  tailFreq: number;
  timeOffset: number; // Staggered entry across the 40-second periodic cycle
}

// Exactly 3 solitary/paired deep-sea fish on a slow ~40s transit cycle
const SLOW_FISH_CONFIGS: SlowFishConfig[] = [
  {
    id: 1,
    direction: 1,
    baseY: -1.2,
    depthZ: -2.2,
    scale: 0.25,
    verticalAmp: 0.2,
    verticalFreq: 0.25,
    tailFreq: 3.6,
    timeOffset: 6.0, // Visible early on first load, then repeats every 40s
  },
  {
    id: 2,
    direction: 1,
    baseY: -0.7,
    depthZ: -2.6,
    scale: 0.21,
    verticalAmp: 0.16,
    verticalFreq: 0.28,
    tailFreq: 4.0,
    timeOffset: 3.5, // Accompanies fish 1 in a loose gentle pair
  },
  {
    id: 3,
    direction: -1,
    baseY: 1.5,
    depthZ: -3.0,
    scale: 0.22,
    verticalAmp: 0.22,
    verticalFreq: 0.22,
    tailFreq: 3.2,
    timeOffset: 24.0, // Swims in the opposite direction on the alternate half of the 40s cycle
  },
];

// 40-second transit cycle parameters
const CYCLE_DURATION = 40.0; // Repeat every 40 seconds
const TRANSIT_DURATION = 32.0; // Takes 32 seconds to slowly cross the screen
const ENTRY_X = 7.6; // Edge of active viewport
const EXIT_X = -7.6;

function SingleSlowFish({ config }: { config: SlowFishConfig }) {
  const groupRef = useRef<THREE.Group>(null);
  const tailRef = useRef<THREE.Group>(null);
  const pecLeftRef = useRef<THREE.Mesh>(null);
  const pecRightRef = useRef<THREE.Mesh>(null);

  // Procedural hydrodynamic fish geometries
  const { bodyGeom, tailGeom, dorsalGeom, pecGeom, eyeGeom } = useMemo(() => {
    // 1. Sleek, hydrodynamic fuselage
    const body = new THREE.SphereGeometry(0.5, 16, 12);
    body.scale(1.8, 0.46, 0.22);

    // 2. Crescent caudal tail fin
    const tail = new THREE.BufferGeometry();
    const tailVertices = new Float32Array([
      0, 0, 0,
      -0.45, 0.36, 0,
      -0.34, 0, 0,

      0, 0, 0,
      -0.34, 0, 0,
      -0.45, -0.36, 0,
    ]);
    tail.setAttribute("position", new THREE.BufferAttribute(tailVertices, 3));
    tail.computeVertexNormals();

    // 3. Small translucent dorsal fin
    const dorsal = new THREE.BufferGeometry();
    const dorsalVertices = new Float32Array([
      -0.1, 0.22, 0,
      -0.32, 0.46, 0,
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

  // Translucent silvery deep-sea materials with soft bioluminescent glow
  const { skinMat, finMat, eyeMat } = useMemo(() => {
    const skin = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#A8C8ED"),
      roughness: 0.16,
      metalness: 0.26,
      transparent: true,
      opacity: 0.82,
      emissive: new THREE.Color("#2C486C"),
      emissiveIntensity: 0.35,
      side: THREE.DoubleSide,
      depthWrite: false,
    });

    const fin = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#B8D4F6"),
      roughness: 0.25,
      metalness: 0.15,
      transparent: true,
      opacity: 0.56,
      emissive: new THREE.Color("#243D5C"),
      emissiveIntensity: 0.22,
      side: THREE.DoubleSide,
      depthWrite: false,
    });

    const eye = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#D8EBFF"),
      transparent: true,
      opacity: 0.95,
    });

    return { skinMat: skin, finMat: fin, eyeMat: eye };
  }, []);

  // Slow 40-second autonomous passage — completely independent of cursor
  useFrame((state) => {
    if (!groupRef.current) return;

    const t = state.clock.getElapsedTime();

    // Calculate progression along the 40-second cycle
    const cycleTime = (t + config.timeOffset) % CYCLE_DURATION;

    // Start and end coordinates based on swimming direction
    const startX = config.direction === 1 ? -ENTRY_X : ENTRY_X;
    const endX = config.direction === 1 ? ENTRY_X : -ENTRY_X;

    let posX: number;
    let isVisible = true;

    if (cycleTime < TRANSIT_DURATION) {
      // Very slow, peaceful crossing over 32 seconds
      const progress = cycleTime / TRANSIT_DURATION;
      posX = startX + (endX - startX) * progress;
    } else {
      // 8-second calm pause between transits (parked off-screen)
      posX = startX;
      isVisible = false;
    }

    groupRef.current.visible = isVisible;
    if (!isVisible) return;

    // Gentle vertical glide (calm sinusoidal oscillation)
    const currentY =
      config.baseY +
      Math.sin(t * config.verticalFreq + config.id) * config.verticalAmp;

    // Depth placement
    const currentZ = config.depthZ + Math.cos(t * 0.2 + config.id) * 0.12;

    // Very slow, serene tail beat (0.5 to 0.6 beats per sec)
    const tailAngle = Math.sin(t * config.tailFreq + config.id) * 0.38;
    if (tailRef.current) {
      tailRef.current.rotation.y = tailAngle;
    }

    // Gentle pectoral fin flutter
    if (pecLeftRef.current && pecRightRef.current) {
      const flutter = Math.sin(t * 2.2 + config.id) * 0.14;
      pecLeftRef.current.rotation.z = 0.18 + flutter;
      pecRightRef.current.rotation.z = -0.18 - flutter;
    }

    groupRef.current.position.set(posX, currentY, currentZ);

    // Orientation: face swim direction with subtle body pitch and yaw
    const facingYaw = config.direction === 1 ? 0 : Math.PI;
    const bodyPitch = Math.cos(t * config.verticalFreq + config.id) * 0.05 * config.direction;
    const bodyYaw = -tailAngle * 0.12; // Natural body reaction to slow tail stroke
    groupRef.current.rotation.set(bodyPitch, facingYaw + bodyYaw, 0);

    // Soft opacity fade near boundaries for seamless emergence
    const edgeDist = Math.abs(posX);
    let edgeFade = 1.0;
    if (edgeDist > 6.0) {
      edgeFade = Math.max(0, 1.0 - (edgeDist - 6.0) / 1.6);
    }
    skinMat.opacity = 0.82 * edgeFade;
    finMat.opacity = 0.56 * edgeFade;
    eyeMat.opacity = 0.95 * edgeFade;
  });

  return (
    <group ref={groupRef} scale={config.scale}>
      {/* Main Fish Body */}
      <mesh geometry={bodyGeom} material={skinMat} />

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
    <group name="slow-small-fish-pod">
      {SLOW_FISH_CONFIGS.map((cfg) => (
        <SingleSlowFish key={cfg.id} config={cfg} />
      ))}
    </group>
  );
}
