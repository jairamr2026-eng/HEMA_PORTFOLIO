"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import { pointerState } from "@/hooks/usePointerTracking";
import { scrollProgressRef, SECTION_TARGETS } from "@/hooks/useScrollStory";
import { PROJECTS, Project } from "@/data/portfolio-data";

interface JellyfishProps {
  onSelectProject?: (project: Project) => void;
  activeProjectId?: string | null;
}

export function Jellyfish({ onSelectProject, activeProjectId }: JellyfishProps) {
  const groupRef = useRef<THREE.Group>(null);
  const creatureInnerRef = useRef<THREE.Group>(null);
  const { viewport, size } = useThree();

  // Load the GLB asset
  const gltf = useGLTF("/jellyfish_animated_3d.glb");
  const { actions, names } = useAnimations(gltf.animations, groupRef);

  // Responsive state
  const isMobile = size.width < 768;

  // Emergence animation factor (0 = hidden in darkness, 1 = fully emerged)
  const emergenceRef = useRef(0);

  // Position & rotation velocity smoothing
  const currentPos = useRef(new THREE.Vector3(1.8, 0.15, 0.2));
  const currentRot = useRef(new THREE.Euler(0.1, -0.3, 0.05));
  const currentScale = useRef(1);

  // Cursor offset smoothing (lag for organic feel)
  const cursorOffset = useRef(new THREE.Vector2(0, 0));
  const creatureVelocity = useRef(new THREE.Vector2(0, 0));

  // Initialize and play the swim loop animation
  useEffect(() => {
    const swimActionName = names.find((name) =>
      name.toLowerCase().includes("swim") || name.toLowerCase().includes("loop")
    ) || names[0];

    if (swimActionName && actions[swimActionName]) {
      const action = actions[swimActionName];
      action.reset().fadeIn(1.2).play();
      action.timeScale = 0.95; // Natural rhythmic aquatic pulse
    }
  }, [actions, names]);

  // Refine materials to adhere to strict monochromatic silver-grey / white palette
  useMemo(() => {
    gltf.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = false;
        mesh.receiveShadow = false;

        const rawMat = Array.isArray(mesh.material)
          ? mesh.material[0]
          : mesh.material;

        if (rawMat) {
          const originalMat = rawMat as THREE.MeshStandardMaterial;
          originalMat.transparent = true;
          originalMat.depthWrite = true;
          originalMat.side = THREE.DoubleSide;

          // Enforce strict palette: #9595B0 to #B5B5C8 and pure white highlights
          if (mesh.name.toLowerCase().includes("edge") || mesh.name.toLowerCase().includes("highlight") || mesh.name.toLowerCase().includes("ridge")) {
            // Bright white highlights
            if ("color" in originalMat) originalMat.color = new THREE.Color("#FFFFFF");
            originalMat.opacity = 0.9;
          } else if (mesh.name.toLowerCase().includes("canal") || mesh.name.toLowerCase().includes("gonad")) {
            // Inner canal organs
            if ("color" in originalMat) originalMat.color = new THREE.Color("#B5B5C8");
            originalMat.opacity = 0.65;
          } else if (mesh.name.toLowerCase().includes("tentacle") || mesh.name.toLowerCase().includes("arm")) {
            // Flowing tentacles
            if ("color" in originalMat) originalMat.color = new THREE.Color("#A8A8C0");
            originalMat.opacity = 0.6;
          } else {
            // Outer and inner bell shell
            if ("color" in originalMat) originalMat.color = new THREE.Color("#9E9EB6");
            originalMat.opacity = 0.52;
          }

          if ("roughness" in originalMat) {
            originalMat.roughness = 0.22;
          }
          if ("metalness" in originalMat) {
            originalMat.metalness = 0.08;
          }
        }
      }
    });
  }, [gltf.scene]);

  // Interaction hotspots relative to the jellyfish bell and tentacles
  const hotspots = useMemo(() => {
    return PROJECTS.map((proj, idx) => {
      // Form an organic orbit around the creature
      const angle = (idx / PROJECTS.length) * Math.PI * 2;
      const radius = 1.35 + (idx % 2) * 0.2;
      const yOffset = -0.4 - (idx * 0.35);
      return {
        project: proj,
        position: [
          Math.cos(angle) * radius,
          yOffset,
          Math.sin(angle) * 0.8
        ] as [number, number, number]
      };
    });
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current || !creatureInnerRef.current) return;

    const time = state.clock.elapsedTime;
    const clampedDelta = Math.min(delta, 0.1);

    // 1. Emergence animation (gentle fade-in from darkness)
    if (emergenceRef.current < 1) {
      emergenceRef.current = THREE.MathUtils.lerp(emergenceRef.current, 1, clampedDelta * 1.8);
    }

    // 2. Fetch scroll story targets
    const activeSec = scrollProgressRef.activeSection;
    const targetConfig = scrollProgressRef.targetConfig || SECTION_TARGETS.hero;

    let targetX = targetConfig.x;
    let targetY = targetConfig.y;
    let targetZ = targetConfig.z;
    let targetRotX = targetConfig.rotX;
    let targetRotY = targetConfig.rotY;
    let targetRotZ = targetConfig.rotZ;
    let targetBaseScale = targetConfig.scale;

    // Mobile viewport adjustments
    if (isMobile) {
      targetX = targetX * 0.35; // Center more on small screens
      targetY = targetY - 0.2;
      targetBaseScale = targetBaseScale * 0.68;
    }

    // 3. Pointer tracking with organic lag and damping
    // Target cursor offsets clamped to prevent obscuring text or leaving viewport
    const maxOffset = isMobile ? 0.25 : 0.55;
    const targetOffsetX = THREE.MathUtils.clamp(pointerState.x * maxOffset, -maxOffset, maxOffset);
    const targetOffsetY = THREE.MathUtils.clamp(pointerState.y * 0.35, -0.35, 0.35);

    // Organic movement lag interpolation (lerp)
    const lagFactor = clampedDelta * 2.8;
    cursorOffset.current.x = THREE.MathUtils.lerp(cursorOffset.current.x, targetOffsetX, lagFactor);
    cursorOffset.current.y = THREE.MathUtils.lerp(cursorOffset.current.y, targetOffsetY, lagFactor);

    // Creature velocity (used for natural banking/tilting)
    creatureVelocity.current.x = (targetOffsetX - cursorOffset.current.x) * 1.5;
    creatureVelocity.current.y = (targetOffsetY - cursorOffset.current.y) * 1.5;

    // 4. Idle floating motion (natural aquatic drift when pointer is still)
    const idleY = Math.sin(time * 0.85) * 0.09;
    const idleRotX = Math.cos(time * 0.65) * 0.03;
    const idleRotZ = Math.sin(time * 0.75) * 0.04;

    // 5. Combine scroll target + cursor offset + idle float
    const finalTargetX = targetX + cursorOffset.current.x;
    const finalTargetY = targetY + cursorOffset.current.y + idleY;
    const finalTargetZ = targetZ - (1 - emergenceRef.current) * 3.0; // Emerges forward from darkness

    // Creature leans/banks into movement direction + faces cursor
    const finalRotX = targetRotX - cursorOffset.current.y * 0.25 + idleRotX;
    const finalRotY = targetRotY + cursorOffset.current.x * 0.45;
    const finalRotZ = targetRotZ - creatureVelocity.current.x * 0.6 + idleRotZ;

    // Smooth position and rotation updates
    currentPos.current.x = THREE.MathUtils.lerp(currentPos.current.x, finalTargetX, clampedDelta * 3.2);
    currentPos.current.y = THREE.MathUtils.lerp(currentPos.current.y, finalTargetY, clampedDelta * 3.2);
    currentPos.current.z = THREE.MathUtils.lerp(currentPos.current.z, finalTargetZ, clampedDelta * 3.2);

    currentRot.current.x = THREE.MathUtils.lerp(currentRot.current.x, finalRotX, clampedDelta * 3.0);
    currentRot.current.y = THREE.MathUtils.lerp(currentRot.current.y, finalRotY, clampedDelta * 3.0);
    currentRot.current.z = THREE.MathUtils.lerp(currentRot.current.z, finalRotZ, clampedDelta * 3.0);

    const finalScale = targetBaseScale * emergenceRef.current;
    currentScale.current = THREE.MathUtils.lerp(currentScale.current, finalScale, clampedDelta * 3.0);

    // Apply to group
    groupRef.current.position.set(currentPos.current.x, currentPos.current.y, currentPos.current.z);
    groupRef.current.rotation.set(currentRot.current.x, currentRot.current.y, currentRot.current.z);
    groupRef.current.scale.setScalar(currentScale.current);
  });

  const isProjectsSection = scrollProgressRef.activeSection === "projects";

  return (
    <group ref={groupRef} dispose={null}>
      <group ref={creatureInnerRef}>
        <primitive object={gltf.scene} />
      </group>

      {/* 3D Interaction Hotspots around the Jellyfish in Projects Section */}
      {hotspots.map((item, idx) => {
        const isActive = activeProjectId === item.project.id;
        return (
          <group
            key={item.project.id}
            position={item.position}
            visible={isProjectsSection}
            onClick={(e) => {
              e.stopPropagation();
              onSelectProject?.(item.project);
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              document.body.style.cursor = "pointer";
            }}
            onPointerOut={() => {
              document.body.style.cursor = "auto";
            }}
          >
            {/* Pulsing outer ring */}
            <mesh>
              <ringGeometry args={[0.07, 0.085, 32]} />
              <meshBasicMaterial
                color={isActive ? "#FFFFFF" : "#B5B5C8"}
                transparent
                opacity={isActive ? 0.95 : 0.45}
                side={THREE.DoubleSide}
              />
            </mesh>
            {/* Core glowing dot */}
            <mesh>
              <sphereGeometry args={[0.035, 16, 16]} />
              <meshBasicMaterial
                color="#FFFFFF"
                transparent
                opacity={isActive ? 1.0 : 0.75}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

// Preload the GLB model for smooth instant loading
useGLTF.preload("/jellyfish_animated_3d.glb");
