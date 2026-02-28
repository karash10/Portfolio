"use client";

import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";

interface FloatingPlanet {
  color: string;
  /** Core size in px */
  size: number;
  /** Horizontal position as % from left */
  x: number;
  /** Vertical position as % from top */
  y: number;
  /** Float animation duration in seconds */
  duration: number;
  /** Float animation delay in seconds */
  delay: number;
  /** Vertical drift range in px */
  drift: number;
  /** Opacity 0-1 */
  opacity: number;
  /** Optional: show a ring around the planet */
  ring?: boolean;
  /** Secondary color for ring or outer glow */
  ringColor?: string;
}

const presets: Record<string, FloatingPlanet[]> = {
  projects: [
    { color: "#22D3EE", size: 14, x: 2, y: 12, duration: 8, delay: 0, drift: 22, opacity: 0.6 },
    { color: "#A78BFA", size: 22, x: 93, y: 35, duration: 10, delay: 1.2, drift: 28, opacity: 0.45, ring: true, ringColor: "#C4B5FD" },
    { color: "#34D399", size: 10, x: 97, y: 78, duration: 7, delay: 0.5, drift: 16, opacity: 0.5 },
    { color: "#C4B5FD", size: 8, x: 5, y: 65, duration: 9, delay: 2, drift: 20, opacity: 0.4 },
    { color: "#67E8F9", size: 6, x: 50, y: 5, duration: 11, delay: 0.8, drift: 12, opacity: 0.3 },
    { color: "#A78BFA", size: 5, x: 15, y: 90, duration: 7.5, delay: 1.5, drift: 14, opacity: 0.35 },
  ],
  skills: [
    { color: "#A78BFA", size: 18, x: 96, y: 8, duration: 9, delay: 0.3, drift: 24, opacity: 0.5, ring: true, ringColor: "#DDD6FE" },
    { color: "#22D3EE", size: 12, x: 2, y: 45, duration: 8, delay: 1, drift: 18, opacity: 0.55 },
    { color: "#6EE7B7", size: 16, x: 90, y: 72, duration: 10.5, delay: 0.8, drift: 22, opacity: 0.4 },
    { color: "#34D399", size: 6, x: 8, y: 85, duration: 7, delay: 2.2, drift: 14, opacity: 0.45 },
    { color: "#C4B5FD", size: 7, x: 55, y: 3, duration: 8.5, delay: 0.5, drift: 10, opacity: 0.3 },
  ],
  experience: [
    { color: "#34D399", size: 16, x: 1, y: 15, duration: 9, delay: 0, drift: 24, opacity: 0.5, ring: true, ringColor: "#6EE7B7" },
    { color: "#C4B5FD", size: 20, x: 95, y: 50, duration: 11, delay: 1.5, drift: 30, opacity: 0.4 },
    { color: "#22D3EE", size: 8, x: 4, y: 80, duration: 7.5, delay: 0.7, drift: 16, opacity: 0.45 },
    { color: "#A78BFA", size: 10, x: 92, y: 6, duration: 8, delay: 2, drift: 18, opacity: 0.5 },
    { color: "#67E8F9", size: 6, x: 45, y: 95, duration: 9.5, delay: 1, drift: 12, opacity: 0.3 },
    { color: "#34D399", size: 5, x: 88, y: 88, duration: 7, delay: 0.3, drift: 14, opacity: 0.35 },
  ],
  footer: [
    { color: "#22D3EE", size: 14, x: 3, y: 20, duration: 8.5, delay: 0.4, drift: 20, opacity: 0.45 },
    { color: "#A78BFA", size: 18, x: 94, y: 55, duration: 10, delay: 1, drift: 26, opacity: 0.4, ring: true, ringColor: "#C4B5FD" },
    { color: "#34D399", size: 7, x: 12, y: 75, duration: 7, delay: 1.8, drift: 14, opacity: 0.4 },
  ],
};

function PlanetOrb({ planet, opacityScale }: { planet: FloatingPlanet; opacityScale: number }) {
  const { color, size, x, y, duration, delay, drift, opacity, ring, ringColor } = planet;
  const scaledOpacity = opacity * opacityScale;

  // Glow radius scales with planet size
  const glowSize = size * 4;
  const outerGlow = size * 6;

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: outerGlow,
        height: outerGlow,
        marginLeft: -outerGlow / 2,
        marginTop: -outerGlow / 2,
      }}
      animate={{
        y: [-drift / 2, drift / 2, -drift / 2],
        x: [-drift * 0.3, drift * 0.3, -drift * 0.3],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      {/* Outer diffuse glow */}
      <div
        className="absolute rounded-full"
        style={{
          inset: 0,
          background: `radial-gradient(circle, ${color}22 0%, transparent 70%)`,
          opacity: scaledOpacity * 0.6,
        }}
      />

      {/* Mid glow */}
      <div
        className="absolute rounded-full"
        style={{
          left: "50%",
          top: "50%",
          width: glowSize,
          height: glowSize,
          marginLeft: -glowSize / 2,
          marginTop: -glowSize / 2,
          background: `radial-gradient(circle, ${color}44 0%, ${color}11 50%, transparent 75%)`,
          opacity: scaledOpacity,
        }}
      />

      {/* Core planet body */}
      <div
        className="absolute rounded-full"
        style={{
          left: "50%",
          top: "50%",
          width: size,
          height: size,
          marginLeft: -size / 2,
          marginTop: -size / 2,
          background: `radial-gradient(circle at 35% 35%, ${color}, ${color}88 60%, ${color}33 100%)`,
          boxShadow: `0 0 ${size * 1.5}px ${size * 0.5}px ${color}66, inset 0 0 ${size * 0.4}px ${color}aa`,
          opacity: scaledOpacity,
        }}
      />

      {/* Highlight dot (fake specular) */}
      <div
        className="absolute rounded-full"
        style={{
          left: `calc(50% - ${size * 0.18}px)`,
          top: `calc(50% - ${size * 0.2}px)`,
          width: size * 0.3,
          height: size * 0.3,
          background: `radial-gradient(circle, rgba(255,255,255,0.7) 0%, transparent 80%)`,
          opacity: scaledOpacity * 0.5,
        }}
      />

      {/* Optional ring */}
      {ring && (
        <div
          className="absolute rounded-full"
          style={{
            left: "50%",
            top: "50%",
            width: size * 2.8,
            height: size * 0.7,
            marginLeft: -(size * 2.8) / 2,
            marginTop: -(size * 0.7) / 2,
            border: `1px solid ${ringColor || color}`,
            borderRadius: "50%",
            opacity: scaledOpacity * 0.5,
            transform: "rotateX(70deg) rotateZ(-15deg)",
          }}
        />
      )}
    </motion.div>
  );
}

export default function FloatingPlanets({ section }: { section: keyof typeof presets }) {
  const planets = presets[section];
  const { theme } = useTheme();
  // In light mode, reduce floating planet visibility
  const opacityScale = theme === "light" ? 0.3 : 1;

  if (!planets) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block" aria-hidden="true">
      {planets.map((p, i) => (
        <PlanetOrb key={i} planet={p} opacityScale={opacityScale} />
      ))}
    </div>
  );
}
