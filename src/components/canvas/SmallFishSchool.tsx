"use client";

import { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { scrollProgressRef } from "@/hooks/useScrollStory";

interface AutonomousFishState {
  id: number;
  pos: THREE.Vector3;
  target: THREE.Vector3;
  currentYaw: number;
  targetYaw: number;
  currentPitch: number;
  currentRoll: number;
  speed: number;
  targetSpeed: number;
  baseSpeed: number;
  tailFreq: number;
  scale: number;
  isUTurning: boolean;
  uTurnTimer: number;
  timeUntilNextUTurn: number;
  waypointTimer: number;
}

// Exactly 3 deep-sea fish
const INITIAL_FISH_CONFIGS = [
  {
    id: 1,
    initialPos: new THREE.Vector3(-2.2, -1.0, -2.2),
    baseSpeed: 0.55,
    scale: 0.26,
    initialYaw: 0.3,
  },
  {
    id: 2,
    initialPos: new THREE.Vector3(1.8, 0.4, -2.6),
    baseSpeed: 0.48,
    scale: 0.22,
    initialYaw: -Math.PI * 0.7,
  },
  {
    id: 3,
    initialPos: new THREE.Vector3(-0.5, -2.2, -3.0),
    baseSpeed: 0.52,
    scale: 0.24,
    initialYaw: Math.PI * 0.5,
  },
];

function SingleAutonomousFish({
  config,
  fadeOpacityRef,
}: {
  config: (typeof INITIAL_FISH_CONFIGS)[0];
  fadeOpacityRef: React.MutableRefObject<number>;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const tailRef = useRef<THREE.Group>(null);
  const pecLeftRef = useRef<THREE.Mesh>(null);
  const pecRightRef = useRef<THREE.Mesh>(null);

  // Autonomous state tracking for random movement and U-turns
  const state = useRef<AutonomousFishState>({
    id: config.id,
    pos: config.initialPos.clone(),
    target: new THREE.Vector3(0, 0, config.initialPos.z),
    currentYaw: config.initialYaw,
    targetYaw: config.initialYaw,
    currentPitch: 0,
    currentRoll: 0,
    speed: config.baseSpeed,
    targetSpeed: config.baseSpeed,
    baseSpeed: config.baseSpeed,
    tailFreq: 5.5,
    scale: config.scale,
    isUTurning: false,
    uTurnTimer: 0,
    timeUntilNextUTurn: 6 + config.id * 3, // Staggered initial U-turn countdown
    waypointTimer: 0,
  });

  // Pick a new random target waypoint within deep-sea volume
  const pickNewWaypoint = (currentPos: THREE.Vector3) => {
    // Random destination within comfortable viewport bounds
    const tx = (Math.random() - 0.5) * 7.5;
    const ty = (Math.random() - 0.5) * 5.5;
    const tz = -1.8 - Math.random() * 1.6;

    state.current.target.set(tx, ty, tz);

    const dir = new THREE.Vector3().subVectors(state.current.target, currentPos);
    state.current.targetYaw = Math.atan2(-dir.z, dir.x);
    state.current.waypointTimer = 4.0 + Math.random() * 4.0;
  };

  // Initiate an organic U-turn (smooth 180° banking reverse)
  const initiateUTurn = () => {
    state.current.isUTurning = true;
    state.current.uTurnTimer = 2.2; // Takes ~2.2 seconds to complete the arc
    // Turn around by ~180° with a slight organic angle offset
    const turnDirection = Math.random() > 0.5 ? 1 : -1;
    const angleDelta = (Math.PI + (Math.random() - 0.5) * 0.4) * turnDirection;
    state.current.targetYaw = state.current.currentYaw + angleDelta;
    // Next U-turn scheduled in 7 to 13 seconds
    state.current.timeUntilNextUTurn = 7.0 + Math.random() * 6.0;
  };

  // Procedural hydrodynamic fish geometries
  const { bodyGeom, tailGeom, dorsalGeom, pecGeom, eyeGeom } = useMemo(() => {
    const body = new THREE.SphereGeometry(0.5, 16, 12);
    body.scale(1.8, 0.46, 0.22);

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

    const dorsal = new THREE.BufferGeometry();
    const dorsalVertices = new Float32Array([
      -0.1, 0.22, 0,
      -0.32, 0.46, 0,
      -0.42, 0.22, 0,
    ]);
    dorsal.setAttribute("position", new THREE.BufferAttribute(dorsalVertices, 3));
    dorsal.computeVertexNormals();

    const pec = new THREE.BufferGeometry();
    const pecVertices = new Float32Array([
      0, 0, 0,
      -0.25, -0.15, 0.08,
      -0.28, 0, 0,
    ]);
    pec.setAttribute("position", new THREE.BufferAttribute(pecVertices, 3));
    pec.computeVertexNormals();

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

  // Main autonomous swim loop
  useFrame((stateContext, delta) => {
    if (!groupRef.current) return;

    const clampedDelta = Math.min(delta, 0.05);
    const s = state.current;
    const t = stateContext.clock.getElapsedTime();

    // 1. Check Hero Page Visibility: Fade out completely on Hero page
    const currentOpacity = fadeOpacityRef.current;
    if (currentOpacity <= 0.005) {
      groupRef.current.visible = false;
      return;
    }
    groupRef.current.visible = true;

    // Apply smooth fade to materials
    skinMat.opacity = 0.82 * currentOpacity;
    finMat.opacity = 0.56 * currentOpacity;
    eyeMat.opacity = 0.95 * currentOpacity;

    // 2. Boundary detection for automatic U-turns
    const BOUND_X = 4.2;
    const BOUND_Y = 3.0;
    const isNearBoundary =
      Math.abs(s.pos.x) > BOUND_X || Math.abs(s.pos.y) > BOUND_Y;

    // 3. U-Turn Timer & Decision Engine
    s.timeUntilNextUTurn -= clampedDelta;
    s.waypointTimer -= clampedDelta;

    if (!s.isUTurning && (s.timeUntilNextUTurn <= 0 || isNearBoundary)) {
      initiateUTurn();
    }

    if (s.isUTurning) {
      s.uTurnTimer -= clampedDelta;
      if (s.uTurnTimer <= 0) {
        s.isUTurning = false;
        pickNewWaypoint(s.pos);
      }
    } else if (s.waypointTimer <= 0) {
      pickNewWaypoint(s.pos);
    }

    // 4. Smooth Rotation & Heading Interpolation
    let angleDiff = s.targetYaw - s.currentYaw;
    while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
    while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;

    const turnRate = s.isUTurning ? 2.4 : 1.2;
    const angularSpeed = THREE.MathUtils.clamp(angleDiff * turnRate, -2.8, 2.8);
    s.currentYaw += angularSpeed * clampedDelta;

    // Bank into the turn (roll angle proportional to angular velocity)
    const targetRoll = -angularSpeed * 0.35;
    s.currentRoll = THREE.MathUtils.lerp(s.currentRoll, targetRoll, clampedDelta * 3.5);

    // 5. Forward Movement & Cruising Velocity
    // Slightly decelerate entering a U-turn, accelerate during stroke
    const speedFactor = s.isUTurning ? 0.65 : 1.0;
    const currentSpeed = s.baseSpeed * speedFactor;

    const forwardX = Math.cos(s.currentYaw);
    const forwardZ = -Math.sin(s.currentYaw);

    s.pos.x += forwardX * currentSpeed * clampedDelta;
    s.pos.z += forwardZ * (currentSpeed * 0.4) * clampedDelta;

    // Subtle sinusoidal vertical glide
    const verticalFloat = Math.sin(t * 0.8 + s.id) * 0.008;
    s.pos.y += verticalFloat;

    // Target vertical gentle steering
    const dy = s.target.y - s.pos.y;
    s.pos.y += THREE.MathUtils.clamp(dy * 0.25, -0.2, 0.2) * clampedDelta;
    s.currentPitch = THREE.MathUtils.clamp(-dy * 0.12, -0.25, 0.25);

    // Keep Z bounded in comfortable background range
    s.pos.z = THREE.MathUtils.clamp(s.pos.z, -3.6, -1.8);

    // 6. Dynamic Tail Undulation (beats faster during U-turns)
    const dynamicTailFreq = s.isUTurning ? 8.5 : 4.2;
    const tailAngle = Math.sin(t * dynamicTailFreq + s.id) * (s.isUTurning ? 0.55 : 0.35);
    if (tailRef.current) {
      tailRef.current.rotation.y = tailAngle;
    }

    // Pectoral fin gentle fluttering
    if (pecLeftRef.current && pecRightRef.current) {
      const flutter = Math.sin(t * 3.5 + s.id) * 0.16;
      pecLeftRef.current.rotation.z = 0.18 + flutter;
      pecRightRef.current.rotation.z = -0.18 - flutter;
    }

    // 7. Update Transform
    groupRef.current.position.copy(s.pos);
    groupRef.current.rotation.set(s.currentPitch, s.currentYaw, s.currentRoll);
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
  // Master opacity ref that fades to 0 on Hero and 1 on other sections
  const fadeOpacityRef = useRef(0);

  useFrame((_, delta) => {
    const clampedDelta = Math.min(delta, 0.05);

    // Remove fish on Hero page: target 0 when in hero section, 1 when exploring other sections
    const isHero =
      scrollProgressRef.activeSection === "hero" ||
      scrollProgressRef.currentProgress < 0.06;

    const targetOpacity = isHero ? 0.0 : 1.0;
    fadeOpacityRef.current = THREE.MathUtils.lerp(
      fadeOpacityRef.current,
      targetOpacity,
      clampedDelta * 3.2
    );
  });

  return (
    <group name="autonomous-small-fish-pod">
      {INITIAL_FISH_CONFIGS.map((cfg) => (
        <SingleAutonomousFish
          key={cfg.id}
          config={cfg}
          fadeOpacityRef={fadeOpacityRef}
        />
      ))}
    </group>
  );
}
