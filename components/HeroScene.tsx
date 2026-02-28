"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "./ThemeProvider";

/* ──── Hook: skip rendering on mobile ──── */
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return isDesktop;
}

/* ──── Hook: pause canvas when hero scrolls out of view ──── */
function useHeroVisible(ref: React.RefObject<HTMLDivElement | null>) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);

  return visible;
}

/* ─────────────────────────── Glowing Sun ─────────────────────────── */
function Sun() {
  const mesh = useRef<THREE.Mesh>(null!);
  const glowMesh = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    // gentle breathing pulse
    const scale = 1 + Math.sin(t * 0.8) * 0.04;
    mesh.current.scale.setScalar(scale);
    glowMesh.current.scale.setScalar(scale * 1.6);
    mesh.current.rotation.y = t * 0.08;
  });

  return (
    <group>
      {/* Core sphere */}
      <mesh ref={mesh}>
        <sphereGeometry args={[0.45, 64, 64]} />
        <meshStandardMaterial
          color="#22D3EE"
          emissive="#22D3EE"
          emissiveIntensity={3.5}
          roughness={0.1}
          metalness={0.0}
        />
      </mesh>

      {/* Soft glow shell */}
      <mesh ref={glowMesh}>
        <sphereGeometry args={[0.45, 32, 32]} />
        <meshBasicMaterial
          color="#22D3EE"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Point light emanating from sun */}
      <pointLight color="#22D3EE" intensity={5} distance={15} decay={2} />
      <pointLight color="#A78BFA" intensity={1.2} distance={10} decay={2} />
    </group>
  );
}

/* ────────────────────────── Orbit Ring ────────────────────────── */
function OrbitPath({ radius, opacity = 0.12 }: { radius: number; opacity?: number }) {
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const segments = 128;
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
    }
    return pts;
  }, [radius]);

  const lineObj = useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    const mat = new THREE.LineBasicMaterial({ color: "#A78BFA", transparent: true, opacity });
    return new THREE.Line(geo, mat);
  }, [points, opacity]);

  return <primitive object={lineObj} />;
}

/* ────────────────────────── Planet ────────────────────────── */
interface PlanetProps {
  orbitRadius: number;
  size: number;
  color: string;
  emissiveColor: string;
  speed: number;       // radians per second
  startAngle: number;  // offset in radians
  tilt: number;        // orbit plane tilt in radians
  hasRing?: boolean;
  ringColor?: string;
  moons?: number;
}

function Planet({
  orbitRadius,
  size,
  color,
  emissiveColor,
  speed,
  startAngle,
  tilt,
  hasRing = false,
  ringColor = "#ffffff",
  moons = 0,
}: PlanetProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const planetRef = useRef<THREE.Mesh>(null!);
  const moonRefs = useRef<THREE.Mesh[]>([]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const angle = startAngle + t * speed;

    // orbit position
    groupRef.current.position.x = Math.cos(angle) * orbitRadius;
    groupRef.current.position.z = Math.sin(angle) * orbitRadius;
    groupRef.current.position.y = Math.sin(angle) * Math.sin(tilt) * orbitRadius * 0.15;

    // self rotation
    planetRef.current.rotation.y = t * 0.5;

    // moons
    moonRefs.current.forEach((moon, i) => {
      if (!moon) return;
      const moonAngle = t * (1.5 + i * 0.4) + (i * Math.PI * 2) / moons;
      const moonOrbit = size * 2.5 + i * 0.15;
      moon.position.x = Math.cos(moonAngle) * moonOrbit;
      moon.position.z = Math.sin(moonAngle) * moonOrbit;
      moon.position.y = Math.sin(moonAngle * 0.7) * 0.05;
    });
  });

  return (
    <group ref={groupRef}>
      {/* Planet body */}
      <mesh ref={planetRef}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={emissiveColor}
          emissiveIntensity={1.8}
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>

      {/* Optional ring */}
      {hasRing && (
        <mesh rotation={[Math.PI / 2.5, 0, 0]}>
          <ringGeometry args={[size * 1.4, size * 2, 64]} />
          <meshBasicMaterial
            color={ringColor}
            transparent
            opacity={0.45}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* Moons */}
      {Array.from({ length: moons }).map((_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) moonRefs.current[i] = el;
          }}
        >
          <sphereGeometry args={[size * 0.2, 16, 16]} />
          <meshStandardMaterial
            color="#e2e8f0"
            emissive="#e2e8f0"
            emissiveIntensity={0.8}
            roughness={0.4}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ────────────────────── Dust Ring (orbital debris) ────────────────────── */
function DustRing({ radius = 3.5, count = 80 }: { radius?: number; count?: number }) {
  const ref = useRef<THREE.Points>(null!);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.3;
      const r = radius + (Math.random() - 0.5) * 0.6;
      pos[i * 3] = Math.cos(angle) * r;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.15;
      pos[i * 3 + 2] = Math.sin(angle) * r;
    }
    return pos;
  }, [count, radius]);

  useFrame((state) => {
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.04;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#22D3EE"
        transparent
        opacity={0.3}
        sizeAttenuation
      />
    </points>
  );
}

/* ─────────────────── Scene content (inside Canvas) ─────────────────── */
function SolarSystem({ isLight }: { isLight: boolean }) {
  return (
    <>
      {/* Ambient fill — raised in light mode so planets remain visible */}
      <ambientLight intensity={isLight ? 0.4 : 0.08} />
      <directionalLight position={[5, 8, 5]} intensity={isLight ? 0.6 : 0.3} color="#ffffff" />

      {/* Offset the whole system to the right so text stays clear, scaled to fill nicely */}
      <group position={[1.8, -0.3, 0]} scale={[0.72, 0.72, 0.72]}>
        {/* Sun */}
        <Sun />

        {/* Orbit paths */}
        <group rotation={[0.15, 0, 0.05]}>
          <OrbitPath radius={1.3} opacity={0.15} />
          <OrbitPath radius={2.0} opacity={0.18} />
          <OrbitPath radius={2.7} opacity={0.16} />
          <OrbitPath radius={3.4} opacity={0.13} />
          <OrbitPath radius={4.1} opacity={0.10} />
          <OrbitPath radius={4.9} opacity={0.08} />
        </group>

        {/* Planets — each skill domain */}
        {/* Languages & Core */}
        <Planet
          orbitRadius={1.3}
          size={0.12}
          color="#22D3EE"
          emissiveColor="#22D3EE"
          speed={0.45}
          startAngle={0}
          tilt={0.1}
        />

        {/* AI & ML — ringed, prominent */}
        <Planet
          orbitRadius={2.0}
          size={0.2}
          color="#A78BFA"
          emissiveColor="#A78BFA"
          speed={0.3}
          startAngle={1.2}
          tilt={0.15}
          hasRing
          ringColor="#C4B5FD"
        />

        {/* Security & Adversarial */}
        <Planet
          orbitRadius={2.7}
          size={0.16}
          color="#34D399"
          emissiveColor="#34D399"
          speed={0.22}
          startAngle={2.8}
          tilt={0.08}
          moons={1}
        />

        {/* Backend & Data */}
        <Planet
          orbitRadius={3.4}
          size={0.14}
          color="#67E8F9"
          emissiveColor="#22D3EE"
          speed={0.17}
          startAngle={4.5}
          tilt={0.12}
        />

        {/* Systems & Networking */}
        <Planet
          orbitRadius={4.1}
          size={0.18}
          color="#6EE7B7"
          emissiveColor="#34D399"
          speed={0.12}
          startAngle={0.8}
          tilt={0.2}
          moons={2}
        />

        {/* Tools & Workflow — outer orbit */}
        <Planet
          orbitRadius={4.9}
          size={0.1}
          color="#94A3B8"
          emissiveColor="#64748B"
          speed={0.08}
          startAngle={3.6}
          tilt={0.05}
        />

        {/* Dust ring between inner and outer planets */}
        <DustRing radius={3.0} count={100} />
        <DustRing radius={4.5} count={60} />
      </group>
    </>
  );
}

/* ─────────────────── Main exported component ─────────────────── */
export default function HeroScene() {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const isDesktop = useIsDesktop();
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = useHeroVisible(containerRef);

  // Don't render the 3D canvas at all on mobile — saves GPU/memory
  if (!isDesktop) return null;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-10 transition-opacity duration-500"
      style={{ pointerEvents: "none", opacity: isLight ? 0.55 : 1 }}
    >
      <Canvas
        camera={{ position: [2, 3, 9], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ pointerEvents: "none" }}
        frameloop={isVisible ? "always" : "never"}
      >
        <SolarSystem isLight={isLight} />
      </Canvas>
    </div>
  );
}
