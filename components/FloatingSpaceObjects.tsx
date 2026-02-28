"use client";

import { useTheme } from "./ThemeProvider";

/*
  Three small space objects that drift across the entire page:
  1. Rocket — diagonal path from bottom-left to top-right
  2. Space station — slow horizontal drift mid-page
  3. Satellite — gentle arc from top-right to bottom-left

  Each is an inline SVG, absolutely positioned with CSS keyframe animations.
  Hidden on mobile (< sm) to match FloatingPlanets behavior.
  Opacity reduced in light mode via theme context.
*/

function Rocket({ opacity }: { opacity: number }) {
  return (
    <div
      className="fixed pointer-events-none z-[5] hidden sm:block"
      style={{
        animation: "rocketDrift 50s linear infinite",
        opacity,
      }}
    >
      <svg
        width="52"
        height="52"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: "rotate(-45deg)" }}
      >
        {/* Body */}
        <ellipse cx="32" cy="26" rx="8" ry="18" fill="#e2e8f0" />
        {/* Nose cone */}
        <path d="M28 10 L32 2 L36 10 Z" fill="#22D3EE" />
        {/* Window */}
        <circle cx="32" cy="20" r="3.5" fill="#0f172a" stroke="#67E8F9" strokeWidth="1" />
        <circle cx="31" cy="19" r="1" fill="rgba(103,232,249,0.5)" />
        {/* Left fin */}
        <path d="M24 36 L20 46 L28 40 Z" fill="#A78BFA" />
        {/* Right fin */}
        <path d="M40 36 L44 46 L36 40 Z" fill="#A78BFA" />
        {/* Flame */}
        <ellipse cx="32" cy="46" rx="4" ry="7" fill="#f59e0b" opacity="0.8" />
        <ellipse cx="32" cy="48" rx="2.5" ry="5" fill="#fbbf24" opacity="0.9" />
        <ellipse cx="32" cy="50" rx="1.5" ry="3" fill="#fef3c7" />
      </svg>
    </div>
  );
}

function SpaceStation({ opacity }: { opacity: number }) {
  return (
    <div
      className="fixed pointer-events-none z-[5] hidden sm:block"
      style={{
        animation: "stationDrift 70s linear infinite",
        opacity,
      }}
    >
      <svg
        width="64"
        height="36"
        viewBox="0 0 80 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Central module */}
        <rect x="30" y="16" width="20" height="12" rx="3" fill="#cbd5e1" />
        {/* Docking port left */}
        <rect x="22" y="19" width="10" height="6" rx="1.5" fill="#94a3b8" />
        {/* Docking port right */}
        <rect x="48" y="19" width="10" height="6" rx="1.5" fill="#94a3b8" />
        {/* Left solar panel arm */}
        <rect x="10" y="21" width="14" height="2" fill="#64748b" />
        {/* Left solar panel */}
        <rect x="2" y="14" width="12" height="16" rx="1" fill="#3b82f6" opacity="0.7" />
        <line x1="8" y1="14" x2="8" y2="30" stroke="#60a5fa" strokeWidth="0.5" opacity="0.5" />
        <line x1="2" y1="22" x2="14" y2="22" stroke="#60a5fa" strokeWidth="0.5" opacity="0.5" />
        {/* Right solar panel arm */}
        <rect x="56" y="21" width="14" height="2" fill="#64748b" />
        {/* Right solar panel */}
        <rect x="66" y="14" width="12" height="16" rx="1" fill="#3b82f6" opacity="0.7" />
        <line x1="72" y1="14" x2="72" y2="30" stroke="#60a5fa" strokeWidth="0.5" opacity="0.5" />
        <line x1="66" y1="22" x2="78" y2="22" stroke="#60a5fa" strokeWidth="0.5" opacity="0.5" />
        {/* Top module */}
        <rect x="36" y="10" width="8" height="7" rx="2" fill="#a78bfa" opacity="0.6" />
        {/* Antenna */}
        <line x1="40" y1="10" x2="40" y2="4" stroke="#e2e8f0" strokeWidth="1" />
        <circle cx="40" cy="3" r="1.5" fill="#22D3EE" opacity="0.8" />
      </svg>
    </div>
  );
}

function Satellite({ opacity }: { opacity: number }) {
  return (
    <div
      className="fixed pointer-events-none z-[5] hidden sm:block"
      style={{
        animation: "satelliteDrift 60s linear infinite",
        opacity,
      }}
    >
      <svg
        width="42"
        height="42"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: "rotate(20deg)" }}
      >
        {/* Body */}
        <rect x="18" y="18" width="12" height="12" rx="2" fill="#cbd5e1" />
        {/* Lens / dish */}
        <circle cx="24" cy="24" r="4" fill="#0f172a" stroke="#34D399" strokeWidth="1.2" />
        <circle cx="23" cy="23" r="1.2" fill="rgba(52,211,153,0.5)" />
        {/* Left solar panel */}
        <rect x="2" y="20" width="15" height="8" rx="1" fill="#6EE7B7" opacity="0.5" />
        <rect x="16" y="22" width="3" height="4" fill="#64748b" />
        {/* Right solar panel */}
        <rect x="31" y="20" width="15" height="8" rx="1" fill="#6EE7B7" opacity="0.5" />
        <rect x="29" y="22" width="3" height="4" fill="#64748b" />
        {/* Antenna arm */}
        <line x1="24" y1="18" x2="24" y2="8" stroke="#e2e8f0" strokeWidth="0.8" />
        <line x1="20" y1="10" x2="28" y2="6" stroke="#e2e8f0" strokeWidth="0.8" />
        {/* Signal dots */}
        <circle cx="29" cy="5" r="0.8" fill="#22D3EE" opacity="0.7" />
      </svg>
    </div>
  );
}

export default function FloatingSpaceObjects() {
  const { theme } = useTheme();
  const baseOpacity = theme === "light" ? 0.35 : 0.7;

  return (
    <>
      <Rocket opacity={baseOpacity} />
      <SpaceStation opacity={baseOpacity * 0.85} />
      <Satellite opacity={baseOpacity * 0.9} />
    </>
  );
}
