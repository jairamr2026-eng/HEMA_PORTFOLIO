"use client";

import { useEffect, useRef, useMemo } from "react";
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
  const { size } = useThree();

  // Load the GLB asset
  const gltf = useGLTF("/jellyfish_animated_3d.glb");
  const { actions, names } = useAnimations(gltf.animations, groupRef);

  const isMobile = size.width < 768;

  // Emergence animation factor (0 = darkness, 1 = fully visible)
  const emergenceRef = useRef(0);

  // Position, rotation and scale smoothing
  const currentPos = useRef(new THREE.Vector3(1.7, 0.1, 0.2));
  const currentRot = useRef(new THREE.Euler(0.08, -0.28, 0.04));
  const currentScale = useRef(0.9);

  // Cursor offset smoothing with organic aquatic lag
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
      action.timeScale = 0.92; // Natural, steady rhythmic pulse
    }
  }, [actions, names]);

  // Refine materials for pure translucent silver-grey & white specular reflections
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

          const name = mesh.name.toLowerCase();

          if (name.includes("edge") || name.includes("highlight") || name.includes("ridge")) {
            // Bright white highlights
            if ("color" in originalMat) originalMat.color = new THREE.Color("#FFFFFF");
            originalMat.opacity = 0.88;
          } else if (name.includes("canal") || name.includes("gonad")) {
            // Inner canal organs in silver-lavender
            if ("color" in originalMat) originalMat.color = new THREE.Color("#B5B5C8");
            originalMat.opacity = 0.62;
          } else if (name.includes("tentacle") || name.includes("arm")) {
            // Flowing tentacles in translucent silver
            if ("color" in originalMat) originalMat.color = new THREE.Color("#A8A8C0");
            originalMat.opacity = 0.54;
          } else {
            // Outer bell membrane
            if ("color" in originalMat) originalMat.color = new THREE.Color("#9E9EB6");
            originalMat.opacity = 0.48;
          }

          if ("roughness" in originalMat) {
            originalMat.roughness = 0.24;
          }
          if ("metalness" in originalMat) {
            originalMat.metalness = 0.06;
          }
        }
      }
    });
  }, [gltf.scene]);

  // 3D hotspots positioned in gentle orbit around the creature for the Projects section
  const hotspots = useMemo(() => {
    return PROJECTS.map((proj, idx) => {
      const angle = (idx / PROJECTS.length) * Math.PI * 2;
      const radius = 1.35 + (idx % 2) * 0.15;
      const yOffset = -0.35 - idx * 0.35;
      return {
        project: proj,
        position: [
          Math.cos(angle) * radius,
          yOffset,
          Math.sin(angle) * 0.75
        ] as [number, number, number]
      };
    });
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current || !creatureInnerRef.current) return;

    const time = state.clock.elapsedTime;
    const clampedDelta = Math.min(delta, 0.1);

    // 1. Initial emergence from deep darkness
    if (emergenceRef.current < 1) {
      emergenceRef.current = THREE.MathUtils.lerp(emergenceRef.current, 1, clampedDelta * 1.5);
    }

    // 2. Fetch section target coordinates
    const targetConfig = scrollProgressRef.targetConfig || SECTION_TARGETS.hero;

    let targetX = targetConfig.x;
    let targetY = targetConfig.y;
    let targetZ = targetConfig.z;
    let targetRotX = targetConfig.rotX;
    let targetRotY = targetConfig.rotY;
    let targetRotZ = targetConfig.rotZ;
    let targetBaseScale = targetConfig.scale;

    // Responsive scaling and positioning on mobile viewports
    if (isMobile) {
      targetX = targetX * 0.3;
      targetY = targetY - 0.2;
      targetBaseScale = targetBaseScale * 0.65;
    }

    // 3. Pointer tracking with organic lag (clamped to never obscure text)
    const maxOffsetX = isMobile ? 0.22 : 0.48;
    const maxOffsetY = 0.30;
    const targetOffsetX = THREE.MathUtils.clamp(pointerState.x * maxOffsetX, -maxOffsetX, maxOffsetX);
    const targetOffsetY = THREE.MathUtils.clamp(pointerState.y * maxOffsetY, -maxOffsetY, maxOffsetY);

    const lagFactor = clampedDelta * 2.5;
    cursorOffset.current.x = THREE.MathUtils.lerp(cursorOffset.current.x, targetOffsetX, lagFactor);
    cursorOffset.current.y = THREE.MathUtils.lerp(cursorOffset.current.y, targetOffsetY, lagFactor);

    // Velocity estimation for gentle banking
    creatureVelocity.current.x = (targetOffsetX - cursorOffset.current.x) * 1.2;
    creatureVelocity.current.y = (targetOffsetY - cursorOffset.current.y) * 1.2;

    // 4. Slow, restrained idle floating
    const idleY = Math.sin(time * 0.7) * 0.07;
    const idleRotX = Math.cos(time * 0.5) * 0.02;
    const idleRotZ = Math.sin(time * 0.6) * 0.025;

    // 5. Compute blended final coordinates
    const finalTargetX = targetX + cursorOffset.current.x;
    const finalTargetY = targetY + cursorOffset.current.y + idleY;
    const finalTargetZ = targetZ - (1 - emergenceRef.current) * 2.8;

    // Creature leans gently into motion & faces pointer
    const finalRotX = targetRotX - cursorOffset.current.y * 0.2 + idleRotX;
    const finalRotY = targetRotY + cursorOffset.current.x * 0.38;
    const finalRotZ = targetRotZ - creatureVelocity.current.x * 0.45 + idleRotZ;

    // Smooth position and rotation interpolation
    currentPos.current.x = THREE.MathUtils.lerp(currentPos.current.x, finalTargetX, clampedDelta * 3.0);
    currentPos.current.y = THREE.MathUtils.lerp(currentPos.current.y, finalTargetY, clampedDelta * 3.0);
    currentPos.current.z = THREE.MathUtils.lerp(currentPos.current.z, finalTargetZ, clampedDelta * 3.0);

    currentRot.current.x = THREE.MathUtils.lerp(currentRot.current.x, finalRotX, clampedDelta * 2.8);
    currentRot.current.y = THREE.MathUtils.lerp(currentRot.current.y, finalRotY, clampedDelta * 2.8);
    currentRot.current.z = THREE.MathUtils.lerp(currentRot.current.z, finalRotZ, clampedDelta * 2.8);

    const finalScale = targetBaseScale * emergenceRef.current;
    currentScale.current = THREE.MathUtils.lerp(currentScale.current, finalScale, clampedDelta * 2.8);

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

      {/* Understated 3D interaction points in Projects section */}
      {hotspots.map((item) => {
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
            {/* Outer thin ring */}
            <mesh>
              <ringGeometry args={[0.05, 0.062, 32]} />
              <meshBasicMaterial
                color={isActive ? "#FFFFFF" : "#A6A6AE"}
                transparent
                opacity={isActive ? 0.9 : 0.35}
                side={THREE.DoubleSide}
              />
            </mesh>
            {/* Minimal core dot */}
            <mesh>
              <sphereGeometry args={[0.024, 16, 16]} />
              <meshBasicMaterial
                color="#FFFFFF"
                transparent
                opacity={isActive ? 1.0 : 0.65}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

useGLTF.preload("/jellyfish_animated_3d.glb");
