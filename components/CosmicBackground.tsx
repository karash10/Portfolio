"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "./ThemeProvider";

/*
  Global background that renders behind every section:
  - Canvas layer: twinkling stars of varying sizes and brightness
  - CSS layer: soft nebula / galaxy blurs positioned at intervals down the page

  Fixed-position, covers full viewport, sits at z-0 behind all content.
  In light mode, opacity is heavily reduced via CSS variable --cosmic-opacity.
*/

/* ────────── Star colours for variety ────────── */
const STAR_COLORS = [
  "rgba(255,255,255,",    // white
  "rgba(165,243,252,",    // cyan tint
  "rgba(221,214,254,",    // violet tint
  "rgba(209,250,229,",    // emerald tint
];

const STAR_COLORS_LIGHT = [
  "rgba(15,23,42,",       // slate-900
  "rgba(8,145,178,",      // cyan-600
  "rgba(124,58,237,",     // violet-600
  "rgba(5,150,105,",      // emerald-600
];

interface Star {
  x: number;
  y: number;
  r: number;         // radius
  baseAlpha: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  colorIdx: number;  // index into color array
}

function StarsCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const themeRef = useRef(theme);
  themeRef.current = theme;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let stars: Star[] = [];
    let prevWidth = 0;
    let prevHeight = 0;

    /* Density: how many stars per pixel of area */
    const DENSITY = 1 / 3500;
    const MAX_STARS = 1200;

    function makeStar(xMax: number, yMin: number, yMax: number): Star {
      const r = Math.random();
      return {
        x: Math.random() * xMax,
        y: yMin + Math.random() * (yMax - yMin),
        r: r < 0.85 ? 0.4 + Math.random() * 0.6 : 1 + Math.random() * 1.2,
        baseAlpha: 0.25 + Math.random() * 0.65,
        twinkleSpeed: 0.3 + Math.random() * 1.8,
        twinkleOffset: Math.random() * Math.PI * 2,
        colorIdx: Math.floor(Math.random() * STAR_COLORS.length),
      };
    }

    function resize() {
      const newW = window.innerWidth;
      const newH = document.documentElement.scrollHeight;
      canvas!.width = newW;
      canvas!.height = newH;

      if (prevWidth === 0 || prevHeight === 0) {
        // First render — generate all stars from scratch
        const count = Math.min(Math.floor(newW * newH * DENSITY), MAX_STARS);
        stars = [];
        for (let i = 0; i < count; i++) {
          stars.push(makeStar(newW, 0, newH));
        }
      } else {
        // Width changed — redistribute x positions proportionally
        if (newW !== prevWidth) {
          const scale = newW / prevWidth;
          for (const s of stars) {
            s.x *= scale;
          }
        }

        // Height increased — keep existing stars, add new ones for the extended area
        if (newH > prevHeight) {
          const extraArea = newW * (newH - prevHeight);
          const targetTotal = Math.min(Math.floor(newW * newH * DENSITY), MAX_STARS);
          const newCount = Math.max(0, targetTotal - stars.length);
          for (let i = 0; i < newCount; i++) {
            stars.push(makeStar(newW, prevHeight, newH));
          }
        }

        // Height decreased — remove stars that are now below the visible area
        if (newH < prevHeight) {
          stars = stars.filter((s) => s.y <= newH);
        }
      }

      prevWidth = newW;
      prevHeight = newH;
    }

    /* ── Throttle to ~30fps & pause when tab is hidden ── */
    const FRAME_INTERVAL = 1000 / 30; // ~33.3ms
    let lastDrawTime = 0;

    function draw(time: number) {
      animId = requestAnimationFrame(draw);

      // Skip if tab is hidden
      if (document.hidden) return;

      // Throttle: only draw if enough time has elapsed
      const delta = time - lastDrawTime;
      if (delta < FRAME_INTERVAL) return;
      lastDrawTime = time - (delta % FRAME_INTERVAL);

      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      const t = time * 0.001;
      const isLight = themeRef.current === "light";
      const colors = isLight ? STAR_COLORS_LIGHT : STAR_COLORS;
      // In light mode, reduce star visibility significantly
      const globalAlphaMultiplier = isLight ? 0.15 : 1;

      for (const s of stars) {
        const twinkle = 0.5 + 0.5 * Math.sin(t * s.twinkleSpeed + s.twinkleOffset);
        const alpha = s.baseAlpha * (0.4 + twinkle * 0.6) * globalAlphaMultiplier;
        ctx!.beginPath();
        ctx!.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx!.fillStyle = colors[s.colorIdx] + alpha.toFixed(3) + ")";
        ctx!.fill();

        // Larger stars get a soft glow
        if (s.r > 1) {
          ctx!.beginPath();
          ctx!.arc(s.x, s.y, s.r * 3, 0, Math.PI * 2);
          ctx!.fillStyle = colors[s.colorIdx] + (alpha * 0.12).toFixed(3) + ")";
          ctx!.fill();
        }
      }
    }

    resize();
    animId = requestAnimationFrame(draw);

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 200);
    };
    window.addEventListener("resize", onResize);

    const observer = new ResizeObserver(() => {
      const newH = document.documentElement.scrollHeight;
      if (canvas && Math.abs(canvas.height - newH) > 50) {
        resize();
      }
    });
    observer.observe(document.body);

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      style={{ width: "100%", height: "100%" }}
      aria-hidden="true"
    />
  );
}

/* ────────── Nebula / galaxy blurs (pure CSS) ────────── */
function NebulaBlurs() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden transition-opacity duration-500"
      style={{ opacity: "var(--cosmic-opacity)" }}
      aria-hidden="true"
    >
      {/* Top-left nebula — cyan */}
      <div
        className="absolute"
        style={{
          width: 600,
          height: 600,
          left: "-8%",
          top: "5%",
          background: "radial-gradient(circle, rgba(34,211,238,0.07) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      {/* Top-right nebula — violet */}
      <div
        className="absolute"
        style={{
          width: 500,
          height: 500,
          right: "-5%",
          top: "2%",
          background: "radial-gradient(circle, rgba(167,139,250,0.08) 0%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />
      {/* Mid-page galaxy swirl — mixed */}
      <div
        className="absolute"
        style={{
          width: 800,
          height: 400,
          left: "15%",
          top: "35%",
          background: "radial-gradient(ellipse at 40% 50%, rgba(34,211,238,0.05) 0%, rgba(167,139,250,0.04) 40%, transparent 70%)",
          filter: "blur(70px)",
          transform: "rotate(-12deg)",
        }}
      />
      {/* Mid-right emerald cloud */}
      <div
        className="absolute"
        style={{
          width: 500,
          height: 500,
          right: "5%",
          top: "50%",
          background: "radial-gradient(circle, rgba(52,211,153,0.06) 0%, transparent 70%)",
          filter: "blur(85px)",
        }}
      />
      {/* Bottom galaxy band */}
      <div
        className="absolute"
        style={{
          width: 1000,
          height: 300,
          left: "30%",
          top: "72%",
          background: "radial-gradient(ellipse at 50% 50%, rgba(167,139,250,0.05) 0%, rgba(34,211,238,0.03) 50%, transparent 75%)",
          filter: "blur(60px)",
          transform: "rotate(8deg)",
        }}
      />
      {/* Bottom-left faint nebula */}
      <div
        className="absolute"
        style={{
          width: 450,
          height: 450,
          left: "-3%",
          top: "85%",
          background: "radial-gradient(circle, rgba(52,211,153,0.05) 0%, transparent 65%)",
          filter: "blur(75px)",
        }}
      />
    </div>
  );
}

export default function CosmicBackground() {
  return (
    <>
      <NebulaBlurs />
      <StarsCanvas />
    </>
  );
}
