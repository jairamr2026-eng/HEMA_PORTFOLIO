"use client";

import { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { scrollProgressRef } from "@/hooks/useScrollStory";

const LEFT_BOUND = -4.2;
const RIGHT_BOUND = 4.2;
const SWIM_SPEED = 0.52; // Very slow, serene cruising speed
const U_TURN_DURATION = 2.2; // Seconds to complete the smooth 180° banking arc

export function SmallFishSchool() {
  const groupRef = useRef<THREE.Group>(null);
  const tailRef = useRef<THREE.Group>(null);
  const pecLeftRef = useRef<THREE.Mesh>(null);
  const pecRightRef = useRef<THREE.Mesh>(null);

  // Master opacity ref: 0 on Hero section, 1 on subsequent sections
  const fadeOpacityRef = useRef(0);

  // Single fish state tracking: swimming left-to-right, U-turn, right-to-left, U-turn
  const fishState = useRef({
    posX: -3.0,
    baseY: -0.8,
    depthZ: -2.4,
    direction: 1 as 1 | -1, // 1 = moving left-to-right, -1 = moving right-to-left
    isTurning: false,
    turnProgress: 0,
    currentYaw: 0, // 0 = facing right, Math.PI = facing left
    currentRoll: 0,
    currentPitch: 0,
    scale: 0.26,
  });

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

  // Render loop
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const clampedDelta = Math.min(delta, 0.05);
    const t = state.clock.getElapsedTime();
    const s = fishState.current;

    // 1. Hero Page Isolation: Fade out completely on Hero page, fade in on deeper sections
    const isHero =
      scrollProgressRef.activeSection === "hero" ||
      scrollProgressRef.currentProgress < 0.06;

    const targetOpacity = isHero ? 0.0 : 1.0;
    fadeOpacityRef.current = THREE.MathUtils.lerp(
      fadeOpacityRef.current,
      targetOpacity,
      clampedDelta * 3.2
    );

    const currentOpacity = fadeOpacityRef.current;
    if (currentOpacity <= 0.005) {
      groupRef.current.visible = false;
      return;
    }
    groupRef.current.visible = true;

    // Apply smooth opacity fade to materials
    skinMat.opacity = 0.82 * currentOpacity;
    finMat.opacity = 0.56 * currentOpacity;
    eyeMat.opacity = 0.95 * currentOpacity;

    // 2. Swimming & U-Turn State Machine
    if (!s.isTurning) {
      // Normal cruising: move horizontally in current direction
      s.posX += s.direction * SWIM_SPEED * clampedDelta;

      // Heading is strictly aligned with travel direction
      s.currentYaw = s.direction === 1 ? 0 : Math.PI;
      s.currentRoll = THREE.MathUtils.lerp(s.currentRoll, 0, clampedDelta * 4.0);

      // Check boundary triggers to initiate U-turn
      if (s.direction === 1 && s.posX >= RIGHT_BOUND) {
        s.isTurning = true;
        s.turnProgress = 0;
      } else if (s.direction === -1 && s.posX <= LEFT_BOUND) {
        s.isTurning = true;
        s.turnProgress = 0;
      }
    } else {
      // Executing smooth banking 180° U-turn
      s.turnProgress += clampedDelta / U_TURN_DURATION;

      if (s.turnProgress >= 1.0) {
        // Complete the turn
        s.isTurning = false;
        s.turnProgress = 0;
        s.direction = (s.direction === 1 ? -1 : 1) as 1 | -1;
        s.currentYaw = s.direction === 1 ? 0 : Math.PI;
        s.currentRoll = 0;
      } else {
        // Smooth sine ease for U-turn arc
        const progress = s.turnProgress;
        const ease = Math.sin(progress * Math.PI * 0.5);

        if (s.direction === 1) {
          // Turning from facing right (0) to facing left (Math.PI)
          s.currentYaw = ease * Math.PI;
          // Bank inward into the turn
          s.currentRoll = -Math.sin(progress * Math.PI) * 0.38;
          // Decelerate and curve slightly forward during turn
          s.posX += Math.cos(s.currentYaw) * SWIM_SPEED * 0.35 * clampedDelta;
        } else {
          // Turning from facing left (Math.PI) to facing right (2 * Math.PI or 0)
          s.currentYaw = Math.PI + ease * Math.PI;
          // Bank inward into the turn
          s.currentRoll = Math.sin(progress * Math.PI) * 0.38;
          // Decelerate and curve slightly forward during turn
          s.posX += Math.cos(s.currentYaw) * SWIM_SPEED * 0.35 * clampedDelta;
        }
      }
    }

    // 3. Gentle Vertical Glide
    const verticalFloat = Math.sin(t * 0.45) * 0.16;
    const currentY = s.baseY + verticalFloat;
    s.currentPitch = Math.cos(t * 0.45) * 0.05 * s.direction;

    // Depth placement
    const currentZ = s.depthZ + Math.sin(t * 0.25) * 0.1;

    // 4. Articulated Tail Undulation
    // Tail beats faster during U-turns to simulate turning torque
    const dynamicTailFreq = s.isTurning ? 7.8 : 4.4;
    const tailAmplitude = s.isTurning ? 0.52 : 0.36;
    const tailAngle = Math.sin(t * dynamicTailFreq) * tailAmplitude;
    if (tailRef.current) {
      tailRef.current.rotation.y = tailAngle;
    }

    // 5. Pectoral Fin Flutter
    if (pecLeftRef.current && pecRightRef.current) {
      const flutter = Math.sin(t * 3.5) * 0.15;
      pecLeftRef.current.rotation.z = 0.18 + flutter;
      pecRightRef.current.rotation.z = -0.18 - flutter;
    }

    // 6. Update Transform
    groupRef.current.position.set(s.posX, currentY, currentZ);
    groupRef.current.rotation.set(s.currentPitch, s.currentYaw, s.currentRoll);
  });

  return (
    <group name="single-deep-sea-fish">
      <group ref={groupRef} scale={fishState.current.scale}>
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
    </group>
  );
}
