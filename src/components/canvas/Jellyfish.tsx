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
  const internalLightRef = useRef<THREE.PointLight>(null);
  const auraLightRef = useRef<THREE.PointLight>(null);
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
      action.setEffectiveTimeScale(0.88); // Natural, graceful deep-ocean cadence
    }
  }, [actions, names]);

  // Give each anatomical layer a realistic deep-ocean translucent response:
  // soft subsurface scattering, subtle internal glow, and crisp rim highlights
  useEffect(() => {
    gltf.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = false;
        mesh.receiveShadow = false;
        mesh.renderOrder = 2;

        const rawMat = Array.isArray(mesh.material)
          ? mesh.material[0]
          : mesh.material;

        if (rawMat) {
          const originalMat = rawMat as THREE.MeshStandardMaterial;
          originalMat.transparent = true;
          originalMat.depthWrite = false;
          originalMat.side = THREE.DoubleSide;

          const name = mesh.name.toLowerCase();

          if (name.includes("edge") || name.includes("highlight") || name.includes("ridge") || name.includes("fringes")) {
            // The outer rim ridges and fringes catch the strongest surface caustic & rim light
            if ("color" in originalMat) originalMat.color = new THREE.Color("#F0F6FF");
            originalMat.opacity = 0.92;
            originalMat.emissive = new THREE.Color("#8FAEDB");
            originalMat.emissiveIntensity = 0.24;
            originalMat.roughness = 0.12;
          } else if (name.includes("canal") || name.includes("gonad")) {
            // The radial canals and gonads retain a delicate bioluminescent internal pulse
            if ("color" in originalMat) originalMat.color = new THREE.Color("#B4C4E8");
            originalMat.opacity = 0.78;
            originalMat.emissive = new THREE.Color("#586FB5");
            originalMat.emissiveIntensity = 0.28;
            originalMat.roughness = 0.25;
          } else if (name.includes("tentacle") || name.includes("arm")) {
            // Tentacles and frilled oral arms: soft translucent silver-lavender ribbons
            if ("color" in originalMat) originalMat.color = new THREE.Color("#A8B8D4");
            originalMat.opacity = 0.65;
            originalMat.emissive = new THREE.Color("#35476D");
            originalMat.emissiveIntensity = 0.14;
            originalMat.roughness = 0.3;
          } else {
            // The main bell is thin living gelatinous tissue: soft icy-silver tone,
            // translucent enough to reveal the internal canals and glowing organs
            if ("color" in originalMat) originalMat.color = new THREE.Color("#B8CAE4");
            originalMat.opacity = 0.44;
            originalMat.emissive = new THREE.Color("#2E3D5E");
            originalMat.emissiveIntensity = 0.1;
            originalMat.roughness = 0.15;
          }

          if ("roughness" in originalMat) {
            originalMat.roughness = Math.min(originalMat.roughness, 0.28);
          }
          if ("metalness" in originalMat) {
            originalMat.metalness = 0.04;
          }
          if (originalMat instanceof THREE.MeshPhysicalMaterial) {
            originalMat.clearcoat = 0.45;
            originalMat.clearcoatRoughness = 0.15;
            originalMat.transmission = 0.6;
            originalMat.ior = 1.34;
          }
          originalMat.needsUpdate = true;
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

    // 1. Initial emergence from deep oceanic darkness
    if (emergenceRef.current < 1) {
      emergenceRef.current = THREE.MathUtils.lerp(emergenceRef.current, 1, clampedDelta * 1.5);
    }

    // 2. Fetch section target coordinates
    const targetConfig = scrollProgressRef.targetConfig || SECTION_TARGETS.hero;

    let targetX = targetConfig.x;
    let targetY = targetConfig.y;
    const targetZ = targetConfig.z;
    let targetRotX = targetConfig.rotX;
    const targetRotY = targetConfig.rotY;
    const targetRotZ = targetConfig.rotZ;
    let targetBaseScale = targetConfig.scale;

    // Check if user is scrolling into the closing statement (last slide)
    // The big jellyfish swims upward toward the surface and is disabled (fades out)
    const lastSlideProgress = THREE.MathUtils.clamp(
      (scrollProgressRef.currentProgress - 0.82) / 0.12,
      0,
      1
    );

    if (lastSlideProgress > 0) {
      // Upward departure: swim straight upwards far above the viewport so no tentacles are visible
      targetY = THREE.MathUtils.lerp(targetY, 18.0, lastSlideProgress);
      // Bell pitches upwards to propel towards the surface
      targetRotX = THREE.MathUtils.lerp(targetRotX, -0.65, lastSlideProgress);
    }

    // Disable factor: rapidly drops to 0 so the creature is completely faded and disabled
    const activeVisibilityFactor = Math.max(0, 1.0 - lastSlideProgress * 1.5);

    // Responsive scaling and positioning on mobile viewports
    if (isMobile) {
      targetX = targetX * 0.3;
      targetY = targetY - 0.2;
      targetBaseScale = targetBaseScale * 0.65;
    }

    // 3. Global pointer tracking with aquatic hydrodynamics
    const maxOffsetX = isMobile ? 0.38 : 0.82;
    const maxOffsetY = isMobile ? 0.34 : 0.58;
    const targetOffsetX = THREE.MathUtils.clamp(pointerState.x * maxOffsetX, -maxOffsetX, maxOffsetX);
    const targetOffsetY = THREE.MathUtils.clamp(pointerState.y * maxOffsetY, -maxOffsetY, maxOffsetY);

    const lagFactor = Math.min(clampedDelta * 3.8, 1);
    cursorOffset.current.x = THREE.MathUtils.lerp(cursorOffset.current.x, targetOffsetX, lagFactor);
    cursorOffset.current.y = THREE.MathUtils.lerp(cursorOffset.current.y, targetOffsetY, lagFactor);

    // Velocity estimation for gentle banking into turns
    creatureVelocity.current.x = (targetOffsetX - cursorOffset.current.x) * 1.4;
    creatureVelocity.current.y = (targetOffsetY - cursorOffset.current.y) * 1.4;

    // 4. Multi-frequency deep ocean currents & organic swimming drift
    const currentDriftY = Math.sin(time * 0.65) * 0.08 + Math.cos(time * 1.3) * 0.02;
    const currentDriftX = Math.sin(time * 0.42) * 0.04;
    const idleRotX = Math.cos(time * 0.5) * 0.025;
    const idleRotZ = Math.sin(time * 0.58) * 0.03;

    // 5. Compute blended final coordinates
    const finalTargetX = targetX + cursorOffset.current.x + currentDriftX;
    const finalTargetY = targetY + cursorOffset.current.y + currentDriftY;
    const finalTargetZ = targetZ - (1 - emergenceRef.current) * 2.8;

    // Creature leans gently into motion & tilts bell toward pointer
    const finalRotX = targetRotX - cursorOffset.current.y * 0.22 + idleRotX;
    const finalRotY = targetRotY + cursorOffset.current.x * 0.42;
    const finalRotZ = targetRotZ - creatureVelocity.current.x * 0.5 + idleRotZ;

    // Smooth position and rotation interpolation
    currentPos.current.x = THREE.MathUtils.lerp(currentPos.current.x, finalTargetX, clampedDelta * 2.8);
    currentPos.current.y = THREE.MathUtils.lerp(currentPos.current.y, finalTargetY, clampedDelta * 2.8);
    currentPos.current.z = THREE.MathUtils.lerp(currentPos.current.z, finalTargetZ, clampedDelta * 2.8);

    currentRot.current.x = THREE.MathUtils.lerp(currentRot.current.x, finalRotX, clampedDelta * 2.6);
    currentRot.current.y = THREE.MathUtils.lerp(currentRot.current.y, finalRotY, clampedDelta * 2.6);
    currentRot.current.z = THREE.MathUtils.lerp(currentRot.current.z, finalRotZ, clampedDelta * 2.6);

    const finalScale = targetBaseScale * emergenceRef.current * activeVisibilityFactor;
    currentScale.current = THREE.MathUtils.lerp(currentScale.current, finalScale, clampedDelta * 3.8);

    if (activeVisibilityFactor <= 0.02 || currentScale.current < 0.03) {
      groupRef.current.visible = false;
    } else {
      groupRef.current.visible = true;
    }

    groupRef.current.position.set(currentPos.current.x, currentPos.current.y, currentPos.current.z);
    groupRef.current.rotation.set(currentRot.current.x, currentRot.current.y, currentRot.current.z);
    groupRef.current.scale.setScalar(currentScale.current);

    // 6. Subtle procedural breathing rhythm synced with the swim pulse
    const pulseFactor = Math.sin(time * 1.6) * 0.025;
    creatureInnerRef.current.scale.set(1 + pulseFactor, 1 + pulseFactor * 1.5, 1 + pulseFactor);

    // 7. Modulate bioluminescent internal heart light & ambient water aura
    if (internalLightRef.current) {
      internalLightRef.current.intensity =
        (0.35 + Math.sin(time * 1.6) * 0.18) * activeVisibilityFactor;
    }
    if (auraLightRef.current) {
      auraLightRef.current.intensity =
        (0.25 + Math.sin(time * 1.6 + 0.5) * 0.12) * activeVisibilityFactor;
    }
  });

  const isProjectsSection = scrollProgressRef.activeSection === "projects";

  return (
    <group ref={groupRef} dispose={null}>
      <group ref={creatureInnerRef}>
        {/* Core bioluminescent internal organ glow: soft lavender-blue */}
        <pointLight
          ref={internalLightRef}
          color="#8BAEFF"
          intensity={0.42}
          distance={3.2}
          decay={2}
          position={[0, 0.18, 0.2]}
        />

        {/* Ambient oceanic water illumination aura cast onto surrounding particles */}
        <pointLight
          ref={auraLightRef}
          color="#5278C6"
          intensity={0.28}
          distance={5.5}
          decay={2}
          position={[0, -0.4, 0.5]}
        />

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
