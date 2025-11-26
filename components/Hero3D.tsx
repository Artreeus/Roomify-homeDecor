'use client';

import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function FloatingTorus({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const timeRef = useRef(0);

  useFrame((state, delta) => {
    if (meshRef.current) {
      timeRef.current += delta;
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.x += 0.003;
      meshRef.current.position.y = position[1] + Math.sin(timeRef.current * 0.5) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <torusGeometry args={[1, 0.4, 16, 100]} />
      <meshStandardMaterial
        color="#d4af37"
        metalness={0.8}
        roughness={0.2}
        opacity={0.3}
        transparent={true}
      />
    </mesh>
  );
}

function FloatingSphere({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const timeRef = useRef(0);

  useFrame((state, delta) => {
    if (meshRef.current) {
      timeRef.current += delta;
      meshRef.current.rotation.y += 0.004;
      meshRef.current.rotation.x += 0.002;
      meshRef.current.position.y = position[1] + Math.sin(timeRef.current * 0.7) * 0.25;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.8, 32, 32]} />
      <meshStandardMaterial
        color="#0f4c3a"
        metalness={0.6}
        roughness={0.3}
        opacity={0.3}
        transparent={true}
      />
    </mesh>
  );
}

function FloatingCylinder({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const timeRef = useRef(0);

  useFrame((state, delta) => {
    if (meshRef.current) {
      timeRef.current += delta;
      meshRef.current.rotation.y += 0.006;
      meshRef.current.rotation.z += 0.002;
      meshRef.current.position.y = position[1] + Math.sin(timeRef.current * 0.6) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <cylinderGeometry args={[0.5, 0.5, 1.5, 32]} />
      <meshStandardMaterial
        color="#d4af37"
        metalness={0.7}
        roughness={0.25}
        opacity={0.3}
        transparent={true}
      />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={0.8}
      />
      <pointLight position={[-5, 5, -5]} intensity={0.3} color="#d4af37" />

      <FloatingTorus position={[-3, 0, -4]} />
      <FloatingSphere position={[3.5, 1, -5]} />
      <FloatingCylinder position={[0, -1.5, -4.5]} />
    </>
  );
}

export default function Hero3D() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="absolute inset-0 w-full h-full" />;
  }

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        className="bg-transparent"
        style={{ pointerEvents: 'none' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
