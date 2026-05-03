"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { personal } from "@/data/portfolio";
import { SectionReveal, Reveal, stagger } from "./Motion";
import Link from "next/link";
import { useMediaQuery } from "@/hooks/useMediaQuery";

// Lazy-load the 3D scene so it doesn't block SSR or first paint
// Only load on desktop (≥768px) for performance
const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => null,
});

export default function Hero() {
  const shouldLoadScene = useMediaQuery("(min-width: 768px)", true);
  
  return (
    <SectionReveal
      className="relative min-h-[100dvh] flex items-center"
    >
      {/* 3D Scene (behind text) - only on desktop */}
      {shouldLoadScene && <HeroScene />}

      {/* Soft vignette behind text for readability — no hard edges */}
      <div
        className="absolute inset-0 z-20 pointer-events-none"
        aria-hidden="true"
        style={{
          background: `radial-gradient(ellipse 55% 60% at 50% 50%, var(--vignette-color) 0%, transparent 100%)`,
        }}
      />

      <div className="relative site-container z-30">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div variants={stagger(0.1)}>
            <Reveal>
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--good)] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--good)]" />
                </span>
                <span className="kbd text-[0.72rem] text-[var(--muted)]">Available for opportunities</span>
              </div>
            </Reveal>

            <Reveal as="h1" className="mt-8 section-title text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-[var(--text-strong)] leading-[1.02]" style={{ filter: "drop-shadow(var(--hero-text-shadow))" }}>
              <>
                I build{" "}
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(to right, var(--gradient-start), var(--gradient-mid), var(--gradient-end))" }}>
                  secure
                </span>
                <br />
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(to right, var(--gradient-mid), var(--gradient-end), var(--gradient-start))" }}>
                  intelligent
                </span>{" "}
                systems.
              </>
            </Reveal>

            <Reveal as="p" className="mt-6 max-w-xl mx-auto text-lg sm:text-xl text-[var(--muted)] leading-relaxed" style={{ filter: "drop-shadow(var(--hero-subtitle-shadow))" }}>
              <>
                <span className="text-[var(--text-strong)] font-semibold">{personal.name}</span> &mdash; {personal.role}.
                Building at the intersection of backend engineering and AI security with scalable async APIs,
                RAG pipelines, and prompt injection defense.
              </>
            </Reveal>

            <Reveal>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/projects" className="btn btn-primary shine w-full sm:w-auto">
                  View my work
                  <span aria-hidden="true">&rarr;</span>
                </Link>
                <Link href="/skills" className="btn btn-primary shine w-full sm:w-auto">
                  View Skills
                  <span aria-hidden="true">&rarr;</span>
                </Link>
                <a
                  href={personal.resumeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary shine w-full sm:w-auto"
                >
                  View Resume
                  <span aria-hidden="true">&#8599;</span>
                </a>
              </div>
            </Reveal>

          </motion.div>
        </div>
      </div>

    </SectionReveal>
  );
}
