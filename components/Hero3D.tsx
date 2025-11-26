'use client';

import { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// --- Reusable Logic for Floating Animation ---
function useFloat(
  ref: React.RefObject<THREE.Mesh | null>,
  speed: number,
  amplitude: number,
  offset: number
) {
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime();
      ref.current.position.y += Math.sin(t * speed + offset) * 0.002;
      ref.current.rotation.x = Math.sin(t * (speed * 0.5) + offset) * (amplitude * 0.1);
      ref.current.rotation.y += 0.002;
    }
  });
}

// --- 3D Components ---

function AbstractVase({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFloat(meshRef, 0.8, 0.2, 0);

  return (
    <mesh ref={meshRef} position={position} castShadow receiveShadow>
      {/* A Lathe geometry to create a vase-like shape */}
      <torusKnotGeometry args={[0.8, 0.25, 128, 16]} />
      <meshPhysicalMaterial
        color={color}
        roughness={0.15}
        metalness={0.1}
        transmission={0.2} // Slight glass feel
        thickness={2}
        clearcoat={1}
        clearcoatRoughness={0.1}
      />
    </mesh>
  );
}

function FloatingOrb({ position, scale }: { position: [number, number, number]; scale: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFloat(meshRef, 0.5, 0.1, 2);

  return (
    <mesh ref={meshRef} position={position} scale={scale} castShadow>
      <sphereGeometry args={[1, 64, 64]} />
      <meshPhysicalMaterial
        color="#ffffff"
        roughness={0.4}
        metalness={0.1}
        transmission={0.1}
      />
    </mesh>
  );
}

function ArchitecturalRing({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.001;
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={position} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
      <torusGeometry args={[3.5, 0.05, 16, 100]} />
      <meshStandardMaterial color="#D4AF37" metalness={0.8} roughness={0.2} />
    </mesh>
  );
}

// --- Rig for subtle mouse interaction ---
function CameraRig() {
  const { camera, pointer } = useThree();
  const vec = new THREE.Vector3();

  useFrame(() => {
    // Smoothly interpolate camera position based on mouse pointer
    // We keep the original Z position (8) and modify x/y slightly
    camera.position.lerp(vec.set(pointer.x * 0.5, pointer.y * 0.5, 8), 0.05);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

function Scene() {
  return (
    <>
      <CameraRig />

      {/* Lighting Setup for "Studio" Look */}
      <ambientLight intensity={0.5} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#D4AF37" />

      {/* Objects */}
      <group position={[1, 0, 0]}>
        <AbstractVase position={[1.5, 0.5, 0]} color="#8FA89B" /> {/* Sage Green tone */}
        <FloatingOrb position={[-2, -1, 1]} scale={0.6} />
        <FloatingOrb position={[2.5, -2, -2]} scale={0.4} />
        <ArchitecturalRing position={[0, 0, -2]} />
      </group>

      {/* Background fill (optional, if canvas is transparent this isn't needed, but adds depth) */}
      <fog attach="fog" args={['#F9F9F5', 5, 20]} />
    </>
  );
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ alpha: true, antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
        className="bg-transparent"
      >
        <Scene />
      </Canvas>
    </div>
  );
}